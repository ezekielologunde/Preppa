# Resend — outbound (transactional + marketing) email

This is the setup for **outbound** email the app sends (welcome, order updates,
payout notices, waitlist confirmation, etc.). It needs a Resend account and DNS
records added in Cloudflare. Claude Code cannot verify the domain or send real mail
without the API key and DNS — this runbook is what a human runs.

## 1. Dedicated sending subdomain

Use `mail.preppa.live` for sending (keep the root domain's reputation and its
Cloudflare **inbound** MX untouched). In Resend → **Domains** → add
`mail.preppa.live`.

Resend generates records to add in Cloudflare DNS (values come from Resend, do not
guess them):

- `MX` on `mail.preppa.live` → Resend's inbound-for-bounce host
- `TXT` SPF on `mail.preppa.live` (`v=spf1 include:...`)
- `TXT`/`CNAME` DKIM record(s)
- Return-Path / bounce `CNAME`

Add a DMARC policy on the root once SPF+DKIM pass:
`_dmarc.preppa.live` `TXT` → `v=DMARC1; p=quarantine; rua=mailto:dmarc@preppa.live; adkim=s; aspf=s`
(start with `p=none` to monitor, move to `quarantine`/`reject` after a clean week).

Wait for Resend to show the domain **Verified**. Confirm SPF and DKIM pass with a
mail tester before sending real volume.

## 2. Secrets — server only

```
RESEND_API_KEY=...        # server env only, never NEXT_PUBLIC_*, never in the browser
RESEND_WEBHOOK_SECRET=... # to verify inbound webhook signatures
```

Send only from server routes / Edge Functions / trusted workers. If a template render
or send helper is ever imported into client code, that is a bug — the key would leak.

## 3. Sender identities + reply-to

Send from `mail.preppa.live`, reply to the root aliases (which Cloudflare forwards to
Gmail — see `cloudflare-routing.md`):

| From                                        | replyTo                  |
| ------------------------------------------- | ------------------------ |
| `Preppa <notifications@mail.preppa.live>`   | `support@preppa.live`    |
| `Preppa Support <support@mail.preppa.live>` | `support@preppa.live`    |
| `Preppa Legal <legal@mail.preppa.live>`     | `legal@preppa.live`      |
| `Preppa Payouts <payouts@mail.preppa.live>` | `payouts@preppa.live`    |
| `Preppa Safety <safety@mail.preppa.live>`   | `safety@preppa.live`     |

Do not use a `no-reply` identity where a reply is useful.

## 4. Webhooks → delivery logging + suppression

Point a Resend webhook at a server route and verify the signature. Handle events
idempotently (store `resend_email_id` + an `idempotency_key`; accept out-of-order):
`sent`, `delivered`, `delayed`, `failed`, `bounced`, `complained`, `suppressed`.

- Hard bounces → add to a suppression list; never send to them again.
- Complaints → suppress from **marketing** immediately.
- Alert if bounce/complaint rate spikes. Never retry permanent failures forever.

Suggested tables (not yet created — build alongside the send pipeline):
`email_delivery_log`, `email_suppressions`, `email_preferences`. Store a
**hash** of the recipient, not the raw address, plus `template_key`, `category`,
`status`, timestamps.

## 5. Consent + unsubscribe (marketing)

Do not add users to marketing merely for creating an account. Record
`marketing_email_opt_in` + `_at` + `_source`. Every marketing email needs an accurate
sender, a real postal address, and an unsubscribe + preference link using **signed,
expiring tokens** (never a raw user id in the URL). Users can never disable safety,
security, account, payment, or active-transaction email.

## Status in this repo

- Frontend that will consume this: the waitlist capture (`WaitlistForm`) and the
  public support/safety forms already write to Supabase. Their **confirmation emails**
  are the first thing to wire once `RESEND_API_KEY` + verified domain exist.
- Nothing sends today. There is no `RESEND_API_KEY` in the codebase and no send path,
  so no mail is dispatched — by design, until the domain is verified.
