# Preppa launch gates, residual risks, and verdict

Scope of this document: the public web surfaces (preppa.live landing + help.preppa.live
Help Center / Legal / Support) and the email + support plumbing around them. It does
**not** cover the in-app marketplace, which ships separately.

## What is done (built + verified in this repo)

- Landing page: single-section, themeable (warm-orange default ⇄ burnt-orange dark
  toggle), licensed food video with poster + reduced-motion fallback, waitlist capture
  writing to the real `waitlist` table, no web-app links, no emoji, AA contrast in both
  themes.
- Help Center: dark Learning Center with search, filters, guide cards, legal section,
  resources, support rail. All guide/legal pages written (legal marked "draft for
  review").
- Public support intake: `/support` and `/report-safety` forms writing to the new
  `public_support_requests` table (anon-insert RLS mirroring the waitlist, admin-read
  only), honeypot + minimum-fill-time bot deterrents, human-readable reference codes.
- Legal wording: "verifies cooks" corrected to "reviews cook applications" on the
  Help index and the safety guide; safety guide now states review is not an inspection
  or guarantee. Support copy no longer promises 7-day / 10-minute response.
- Branded email aliases displayed in the Help footer (`support@ legal@ privacy@
  safety@ accessibility@preppa.live`) and contextually on `/support` and
  `/report-safety`.
- Setup runbooks written: `docs/email/cloudflare-routing.md` (inbound),
  `docs/email/resend.md` (outbound).
- Outbound email pipeline built and ready: a server-only send helper
  (`src/lib/email.ts`, no-ops without a key), accessible HTML+text waitlist and
  support confirmation templates, and `/api/subscribe` (server-side waitlist insert +
  best-effort confirmation, basic rate limit). The waitlist form now posts to it
  (insert verified end-to-end). Sending activates automatically once a valid
  `RESEND_API_KEY` is set in Vercel — the DNS is already verified.

## Blocked — needs your accounts / counsel (cannot be completed here)

| Gate | Why it is blocked | Owner |
| --- | --- | --- |
| Cloudflare inbound aliases forward to Gmail | No access to your Cloudflare account/DNS | You (runbook: `cloudflare-routing.md`) |
| Resend domain verified; SPF/DKIM/DMARC pass | DONE — preppa.live DKIM + send.preppa.live SPF verified, DMARC p=none published | — |
| Outbound email actually sends | Blocked: the exported `RESEND_API_KEY` is invalid (~14 chars, Resend rejects it), and it must be set in Vercel env | You: fresh key + add to Vercel |
| Bounce/complaint webhooks + suppression | Depends on Resend being live | Build pass 2 |
| Legal documents published as final | Counsel must approve; docs are drafts today | Counsel |
| Legal-entity name confirmed ("Preppa, Inc.") | Business/legal fact to confirm | You / counsel |
| Merchant-of-record claim verified vs Stripe config | Payments architecture review | Payments + counsel |
| Legal acceptance evidence (`legal_document_acceptances`) | App-side capture at signup/checkout | App team |
| Strong bot protection (Cloudflare Turnstile) on public forms | Needs a Turnstile site/secret key | You + small build |

## Launch-gate checklist

Public web (this repo):

- [x] Landing CTAs and links resolve; no `#` placeholders; no web-app links
- [x] Social handles are `@preppa.live`
- [x] All Learn routes resolve; no placeholder guides
- [x] All Legal routes resolve and show version/effective/last-updated + draft status
- [x] Support form works; safety reporting works; both store a reference
- [x] Cook-review wording corrected; no over-claim of food/kitchen verification
- [x] No promise of live chat / 7-day / 10-minute response
- [x] Landing meets reduced-motion, keyboard, contrast, 44px-target requirements
- [x] No secret in client code; no personal Gmail address is public
- [x] Production build passes

Email + legal (gated):

- [ ] Cloudflare aliases forward and are labeled in Gmail
- [ ] Resend domain verified; SPF + DKIM pass; DMARC published
- [ ] Reply-To aliases thread correctly
- [ ] Bounce + complaint webhooks handled; suppression works
- [ ] Marketing consent recorded; unsubscribe works; postal address configured
- [ ] Counsel-approved documents marked published; entity + merchant-of-record verified
- [ ] Turnstile added to public forms before heavy promotion

## Residual-risk register

- Public forms use honeypot + time-trap only (no CAPTCHA yet). Risk: spam to
  `public_support_requests`. Mitigation now: anon can insert but not read; admin-read
  only; add Turnstile before promoting the forms.
- Legal pages are labeled drafts. Risk: a visitor treats them as final. Mitigation:
  each carries a visible "draft for legal review / not legal advice" note; do not
  remove it until counsel approves.
- Outbound email is built but not active. The send pipeline (`src/lib/email.ts` +
  `/api/subscribe`) and the waitlist/support confirmation templates exist and are
  wired; sending is best-effort and no-ops until a valid `RESEND_API_KEY` is set in
  Vercel. Risk until then: users get the on-screen acknowledgement + reference code
  but no email. Mitigation: provide a valid key (the exported one is invalid).
- Merchant-of-record wording appears in the footer/legal. Risk: mismatch with the
  actual Stripe/tax setup. Mitigation: verify before relying on it (gate above).

## Verdict

NO GO for the full spec (email delivery, inbound routing, and legal publication are
not yet live, and counsel has not signed off).

GO for the public web surfaces as a **pre-launch, waitlist-first site**: the landing,
Help Center, legal drafts, and support/safety intake are shippable and are live —
provided the drafts keep their "draft / not legal advice" labels and the forms are not
heavily promoted until Turnstile and outbound confirmation email are added.
