# Preppa — bring-up runbook

Goal: take the repo from "written but never executed" to a **running app you can drive
end-to-end** (discover → pay → track → cook fulfils → payout). Follow the steps in order;
each ends with a check. Where something is expected to surface fixes on first run, it says so.

> Everything here is local/test. No production keys, no real charges.

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node | ≥ 20 | |
| pnpm | 9.x | `npm i -g pnpm` |
| Docker Desktop | latest | Supabase local runs in Docker — must be running |
| Supabase CLI | latest | `npm i -g supabase` or scoop/brew |
| Stripe CLI | latest | for webhook forwarding + test events |
| Expo / EAS | latest | `npm i -g eas-cli`; an Expo account |
| Xcode or Android Studio | — | to run a local dev build (or use EAS build) |

A Stripe **test-mode** account with **Connect enabled** (Dashboard → Connect → Get started).

---

## 0 · Install & commit the lockfile

```bash
pnpm install          # first run resolves versions and writes pnpm-lock.yaml
git add pnpm-lock.yaml && git commit -m "chore: lockfile"
```

CI runs `--frozen-lockfile`, so the lockfile must be committed. If install fails on a
version, relax the offending pin in the relevant `package.json` and re-run.

**Check:** `node_modules/` exists at root and in `apps/app`.

---

## 1 · Supabase: schema, RLS, tests

```bash
supabase start            # boots Postgres, Auth, Realtime, Storage, Edge runtime (Docker)
supabase db reset         # applies migrations 0001–0007 + seed.sql
supabase test db          # runs the pgTAP suites
```

`supabase start` prints your local **API URL** (`http://localhost:54321`), **anon key**,
and **service_role key** — copy them for step 3. Local mail (OTP codes) is at
**http://localhost:54324** (Inbucket).

**Check:** `supabase test db` reports the isolation, role-transition, and order-ops suites
green — this is the two-sided-isolation proof. If a migration errors, fix the SQL and
`supabase db reset` again (this is the first time the SQL actually runs).

---

## 2 · Generate types & typecheck

```bash
pnpm types:gen            # supabase gen types → packages/types/src/database.types.ts
pnpm -r typecheck         # first real TS check of the whole workspace
```

**Expect fixes here.** Until now the RN/Edge code was written but never compiled. Likely
first-run items: the generated `Database` type replaces the placeholder, so a few
`as unknown as X` casts in `apps/app/src/api/*` can become real typed selects; confirm the
`@/*` path alias resolves. Fix what tsc reports, re-run until clean.

**Check:** `pnpm -r typecheck` exits 0. Then `pnpm run check:forbidden` (already green) and
`pnpm lint`.

---

## 3 · Environment variables

**App** — create `.env.local` at the repo root (Expo reads `EXPO_PUBLIC_*`):

```bash
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon key from step 1>
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_<from Stripe dashboard>
```

**Edge Functions** — create `supabase/functions/.env` (git-ignored). `SUPABASE_URL`,
`SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are auto-injected locally; you only
add the Stripe secrets:

```bash
STRIPE_SECRET_KEY=sk_test_<from Stripe dashboard>
STRIPE_WEBHOOK_SECRET=whsec_<filled in step 4>
```

> Never commit either file. `service_role` and `sk_test` are server-only; the app ships
> only the anon + publishable keys.

---

## 4 · Stripe: webhook forwarding

```bash
stripe login
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
```

`stripe listen` prints a **`whsec_…`** signing secret — paste it into
`supabase/functions/.env` as `STRIPE_WEBHOOK_SECRET`, then restart the functions (step 5).
Leave `stripe listen` running; it forwards `payment_intent.succeeded`, `payment_intent.
payment_failed`, and `account.updated` to your local webhook.

**Check:** the terminal shows "Ready! Your webhook signing secret is whsec_…".

---

## 5 · Serve the Edge Functions

```bash
supabase functions serve --env-file supabase/functions/.env
```

Serves `create-order`, `stripe-webhook`, `connect-onboard`, `connect-payout`.
`stripe-webhook` runs with `verify_jwt = false` (per `supabase/config.toml`); the others
require a user JWT, which the app sends automatically.

**Check:** all four functions listed as served; no boot errors.

---

## 6 · Run the app (dev client)

The app uses native modules (`@stripe/stripe-react-native`, `expo-secure-store`), so **Expo
Go won't work** — you need a dev build.

**Simplest (local build):**
```bash
cd apps/app
npx expo run:ios       # or: npx expo run:android
```

**Or an EAS dev client** (device testing):
```bash
cd apps/app
eas login
eas build --profile development --platform ios   # then install the artifact
pnpm --filter @preppa/app start                  # Metro; open in the dev client
```

> Networking: an iOS **simulator** reaches `localhost` directly. A **physical device**
> can't — set `EXPO_PUBLIC_SUPABASE_URL` to your machine's LAN IP (e.g. `http://192.168.x.x:54321`)
> and forward the webhook accordingly.

**Check:** the app launches to the onboarding hero.

---

## 7 · Drive the whole loop (manual test)

You'll play both sides. Easiest is **two simulators** (one customer, one cook), or sign out
between roles. OTP codes for every sign-in appear in **Inbucket (http://localhost:54324)**.

### A. Customer: order + pay
1. Onboarding → **Get started** → enter any email (e.g. `me@test.dev`) → **Send code**.
2. Open Inbucket, copy the 6-digit code → **Verify** → lands on the discovery feed showing
   the seeded meals (**Family Lasagna Tray**, **Slow-Braised Short Rib**).
3. Tap a meal → **Add to cart** → tap the **cart bar** → **Checkout** → choose a tip →
   **Pay with card**.
4. In the Stripe sheet use test card **4242 4242 4242 4242**, any future expiry, any CVC,
   any ZIP → pay.
5. You land on **live tracking**. It shows "Confirming your payment…" until the webhook
   fires (watch `stripe listen` + `functions serve` logs), then flips to **Order confirmed**.

**Check:** the order row in `orders` is `pay_status = paid`, and `ledger_entries` has a
`sale` (+ `tip`) credit for the kitchen. (`supabase db` studio at the URL from step 1, or psql.)

### B. Cook: fulfil
1. On the second device, sign in as **`cook.maria@example.com`** (seeded, role = prepper) →
   OTP from Inbucket → lands in the **Kitchen Hub** (dark theme).
2. Toggle **open** if paused. **Order queue** shows the new order.
3. **Start preparing** → **Mark ready** → **Complete**. Each transition goes through the
   server state-machine RPC.

**Check:** the customer's tracking screen advances **live** (Realtime) with each step. Try
**Decline** on a fresh order — it only cancels, never accepts.

### C. Cook: payout
1. Kitchen Hub → **Money** → **Set up payouts** → completes Stripe Connect **Express test
   onboarding** in the browser (use Stripe's test values; phone `000 000 0000`, SSN `0000`,
   test bank `110000000 / 000123456789`).
2. Back in the app, the `account.updated` webhook flips `payouts_enabled` → the button
   becomes **Cash out $X**.
3. Tap it → a Stripe **transfer** is created for the server-derived balance.

**Check:** `payouts` has a `paid` row, `ledger_entries` has a negative `payout` entry, and
`kitchen_earnings_summary.availableCents` is back to 0.

### D. Guardrails hold
- At checkout, COD isn't offered; if you force `method: 'cod'`, `create-order` returns
  "Cash on delivery isn't available yet." (gated — correct).
- Adding a meal from a **different** kitchen prompts "Start a new cart?" (single-kitchen).
- Profile → Meal plans / Experiences show **coming soon** with no purchase path.

---

## 8 · Troubleshooting (known first-run items)

| Symptom | Fix |
|---|---|
| `pnpm install` version error | Relax the pin in the offending `package.json`, re-run, re-commit lockfile |
| `supabase db reset` SQL error | Fix the migration; reset again (first real SQL execution) |
| `typecheck` errors in `api/*` | Generated types replaced the placeholder — tighten the `as unknown as` casts |
| OTP never arrives | It's in **Inbucket** (`:54324`), not a real inbox (local mail is captured) |
| Payment stays "Confirming…" | `stripe listen` not running, or `STRIPE_WEBHOOK_SECRET` stale — refresh + restart `functions serve` |
| Device can't reach backend | Use LAN IP in `EXPO_PUBLIC_SUPABASE_URL`, not `localhost` |
| "Finish payout setup first" | `account.updated` hasn't enabled payouts yet — complete Connect onboarding |

---

## Definition of done

- [ ] `supabase test db` green (isolation proven)
- [ ] `pnpm -r typecheck` + `pnpm lint` + `pnpm run check:forbidden` clean
- [ ] Customer can order and pay (test card); order reaches `paid` via webhook
- [ ] Cook sees the order live, advances it; customer tracking updates over Realtime
- [ ] Cook completes Connect onboarding and cashes out; ledger nets to 0
- [ ] COD gated, single-kitchen enforced, preview surfaces non-transactable

Once this checklist passes, the MVP spine is **proven to run** — then it's safe to build
COD (after the reconciliation decision), refunds, and observability on top.
