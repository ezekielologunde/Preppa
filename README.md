# Preppa

A two-sided marketplace for **homemade food** — customers order fresh meals from
vetted local home cooks ("Preppers"). Trust & safety is the whole thesis:
ID-verified cooks, Preppa as merchant of record, and a cash-on-delivery handoff
secured by a server-issued code.

This repo is being built from the design prototype (the loose `*.jsx`/`*.css`/`*.html`
at the root, kept as a **design reference only**) following a project-council review.
The council's verdict was **APPROVE WITH CHANGES**; what's implemented so far is the
**trust foundation** — the smallest coherent slice that *proves* two-sided data
isolation before any feature screen touches data.

---

## What's built (the trust-foundation slice)

| Area | Files | What it does |
|---|---|---|
| Workspace | `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json` | pnpm workspaces (Turborepo deferred). |
| Guardrails | `scripts/check-forbidden.mjs`, `gitleaks.toml`, `.github/workflows/ci.yml` | CI fails if the killed bidding feature reappears or a secret is committed. |
| Schema | `supabase/migrations/0001…0003` | profiles, kitchens, meals, orders/order_items, and the trust tables (verifications, addresses, cod_handoffs, reviews, stripe mapping, **append-only** ledger, payouts, notifications, audit log). |
| Isolation | `supabase/migrations/0004_rls.sql` | Two-sided **ownership-based** Row-Level Security. |
| Proof | `supabase/tests/rls_isolation.test.sql`, `supabase/seed.sql` | pgTAP suite proving customer A can't read B and cook X can't touch cook Y. |
| Shared types | `packages/types` | Zod validators (reused by app **and** Edge Functions) + generated DB types. |
| Design tokens | `packages/theme` | Canonical WARM v3 palette (one source), motion tokens, a11y fixes. |
| Design system | `packages/ui` | Themed RN component library (Button, MealCard, …) on the tokens. See `DESIGN_SYSTEM.md`. |
| App | `apps/app` | Expo Router scaffold — auth gate, `(consumer)`/`(prepper)` route groups, discovery feed, meal detail, preview-only screens. |

### Key trust properties already encoded

- **Ownership is the boundary, not role.** RLS gates on `kitchens.owner_id = auth.uid()`.
  `profiles.role`, `verification_status`, and balances are **not client-writable**
  (guard triggers) — a customer can't flip to "prepper" and bypass verification.
- **Money is server-authoritative.** Order money columns are integer cents, frozen by
  the (forthcoming) create-order Edge Function; the ledger is **append-only** (no
  UPDATE/DELETE) and read-own; balances are *derived*, never client-supplied.
- **One order = one kitchen.** DB trigger enforces it (backs the single-kitchen cart).
- **Bidding is dead.** No bids/catering/quote tables anywhere; a CI lint fails the
  build if the identifiers or a preview-only purchase path reappear.
- **PII is owner-only.** Addresses and KYC docs are never public; exact addresses are
  revealed only post-acceptance (enforced as features land).

---

## Marketing + help site (`landing/`)

One Next.js app, one Vercel project, **two domains** — `preppa.live` and
`help.preppa.live` are the same deployment, split by `landing/middleware.ts`
rewriting requests by hostname:

- `preppa.live` → the single-screen marketing homepage (`src/app/page.tsx`).
- `help.preppa.live` → `src/app/help-site/*` (guides, Terms, Privacy, Cook
  Agreement), served via a host-based rewrite to `/help-site`. Every link inside
  `help-site/` uses public paths (`/`, `/guides/x`, `/legal/y`) — the middleware
  maps those transparently on every request, including client-side navigations,
  so nothing in there needs to know about the `/help-site` prefix.

`landing/` lives alongside the workspace, deliberately excluded from it — see
`pnpm-workspace.yaml`.

```bash
cd landing && npm install && npm run dev   # http://localhost:3000
# locally, http://localhost:3000/help-site previews the help site directly
# (the hostname-based rewrite only fires for host === "help.preppa.live")
```

**Vercel setup (one-time, manual):** in the existing Vercel project that owns
`preppa.live`, go to Project Settings → Git and connect it to this repository
(Root Directory `landing`), then add `help.preppa.live` as a **second domain**
on that same project under Settings → Domains — no second project needed.

Content notes: `help-site/legal/cook-agreement` mirrors the cook-agreement copy
from the live `preppa-app` repo's approval flow (`src/lib/cookAgreement.ts`)
verbatim — keep both in sync if it changes; `help-site/legal/terms` and
`.../privacy` are drafted templates, not reviewed legal advice.

---

## Bring it to life

**Prerequisites:** Node ≥ 20, [pnpm](https://pnpm.io) 9, the
[Supabase CLI](https://supabase.com/docs/guides/cli), and Docker (for local Postgres).

```bash
pnpm install

# stand up local Postgres, apply ALL migrations + seed
supabase start
supabase db reset

# THE proof — cross-tenant isolation must pass green
supabase test db

# generate DB types from the live schema, then guardrails + quality
pnpm types:gen
pnpm verify:foundation   # forbidden-identifier lint + oxlint + typecheck
```

> The `pnpm run check:forbidden` guardrail runs today without Docker/Supabase
> (it's pure Node) and is already verified passing.

**Run the app** (needs an EAS dev client — maps + Stripe SDKs don't run in Expo Go):

```bash
cp .env.example .env.local   # fill EXPO_PUBLIC_SUPABASE_URL + ANON_KEY (from `supabase start`)
pnpm --filter @preppa/app start
```

---

## Non-negotiable conditions (from the final verdict)

These must hold continuously as building proceeds, or the trust thesis is bypassable:

1. **Server authority** — no client-supplied price/total is ever charged; `paid`
   status is written only by the signature-verified, idempotent Stripe webhook; the
   COD code is always server-issued, hashed, single-use, TTL-bound, dual-confirmed.
2. **RLS ownership** — all access gates on `auth.uid()`/`owner_id`; the pgTAP suite is
   green on every PR; Realtime is verified to run as the authenticated role.
3. **Bidding stays dead** — physically absent; CI lint enforces it.
4. **Preview-only = zero transaction path** — subscriptions/experiences have no
   orders-shaped table, RLS write-path, or Edge Function; notify-me is the max.
5. **Secrets are server-only** — `service_role` + Stripe keys live only in Edge
   Function env; gitleaks in CI; never bundled in the app or the landing site.
6. **PII minimization** — exact addresses only post-acceptance; analytics replay off on
   checkout/COD/payout; Sentry scrubs address/code/name/bank/email.
7. **Single-kitchen invariant** — held in both the cart and the DB constraint.
8. **Honesty** — every async/payment flow has loading/error/empty states; never render
   a fabricated stat — omit it.
9. **COD is hard-gated** — the COD slice does not start until the commission-
   reconciliation design (cook-liability netting, arrears pause) is written & reviewed.
   **The card path is not blocked by this.**

---

## What's deferred (not in MVP)

Free-text 1:1 chat · favorites · live-GPS map tracking (status-step tracking instead) ·
live-video reels · paid delivery (pickup + COD first) · deep prepper analytics ·
Style Dictionary pipeline · Turborepo · PostHog session replay · tablet/desktop app
layouts. **Rejected entirely:** the bidding/auction marketplace, live subscription/
experience purchase, cross-kitchen carts, and any client-authoritative money.

---

## Next build steps

Done so far: trust foundation, `packages/theme`+`ui`, the Expo scaffold (auth gate,
route groups, discovery feed, meal detail, single-kitchen cart, preview-only screens),
**email-OTP auth + verification-gated role**, and the **card payment path** —
`create-order` (server-authoritative pricing) + checkout with a payment state machine +
the `stripe-webhook` (sole writer of paid status + ledger).

Also built: **Realtime status-step tracking** + order history; the **Prepper Hub**
(queue with the distinct `declineOrder` path, menu status toggles, availability,
server-aggregated earnings); and **Stripe Connect onboarding + payout** (server-derived
amount, own verified account).

Remaining, in approved build order:
1. **Environment bring-up** — nothing has been executed yet; stand up Supabase locally
   + an EAS dev client + Stripe test keys, run the migrations/pgTAP, and drive the flow.
   This is the real next milestone (surfaces typecheck + behavior the guardrail can't).
2. **COD slice** — *only after* the commission-reconciliation design is written & reviewed.
3. **Refunds** — Stripe refund + ledger reversal (decline of a paid order, chargebacks);
   tip partial-refund clawback protection lives here.
4. Observability (Sentry + consent-gated PostHog) → landing on its own Vercel deploy.
