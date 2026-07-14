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

## Blocked — needs your accounts / counsel (cannot be completed here)

| Gate | Why it is blocked | Owner |
| --- | --- | --- |
| Cloudflare inbound aliases forward to Gmail | No access to your Cloudflare account/DNS | You (runbook: `cloudflare-routing.md`) |
| Resend domain verified; SPF/DKIM/DMARC pass | Needs `mail.preppa.live` DNS + Resend account | You (runbook: `resend.md`) |
| Transactional + marketing email actually sends | Needs `RESEND_API_KEY` (server) + verified domain | You + build pass 2 |
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
- No outbound email yet. Risk: users submit the waitlist/support and get no
  confirmation email. Mitigation: acknowledge on-screen with a reference code today;
  wire Resend confirmation as the first pass-2 task.
- Merchant-of-record wording appears in the footer/legal. Risk: mismatch with the
  actual Stripe/tax setup. Mitigation: verify before relying on it (gate above).

## Verdict

NO GO for the full spec (email delivery, inbound routing, and legal publication are
not yet live, and counsel has not signed off).

GO for the public web surfaces as a **pre-launch, waitlist-first site**: the landing,
Help Center, legal drafts, and support/safety intake are shippable and are live —
provided the drafts keep their "draft / not legal advice" labels and the forms are not
heavily promoted until Turnstile and outbound confirmation email are added.
