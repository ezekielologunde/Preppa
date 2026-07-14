# Cloudflare Email Routing — inbound aliases for preppa.live

This is the setup for **inbound** email (people writing to `support@preppa.live` etc.).
It must be done by someone with access to the Cloudflare account that holds the
`preppa.live` zone. Claude Code cannot do this step — it has no access to your
Cloudflare account or DNS.

> Do NOT put the destination Gmail address anywhere in source code or public docs.
> It lives only in Cloudflare's routing config and this private runbook.

## 1. Enable Email Routing

Cloudflare dashboard → `preppa.live` → **Email** → **Email Routing** → enable.
Cloudflare adds the required inbound `MX` and a routing `TXT` record automatically.

> These MX records are for **inbound**. They do not conflict with Resend's
> **outbound** records, which live on the `mail.preppa.live` subdomain (see
> `resend.md`). Never point the root `MX` at Resend.

## 2. Verify the destination address

Add your operations Gmail address as a **destination** and click the verification
link Cloudflare emails to it. Only verified destinations can receive forwards.

## 3. Create exact routing rules (not a catch-all at launch)

Create one **custom address** rule per alias, each forwarding to the verified Gmail:

| Alias                         | Forward to (verified Gmail) |
| ----------------------------- | --------------------------- |
| `support@preppa.live`         | ops Gmail                   |
| `legal@preppa.live`           | ops Gmail                   |
| `privacy@preppa.live`         | ops Gmail                   |
| `safety@preppa.live`          | ops Gmail                   |
| `abuse@preppa.live`           | ops Gmail                   |
| `payouts@preppa.live`         | ops Gmail                   |
| `accessibility@preppa.live`   | ops Gmail                   |
| `hello@preppa.live`           | ops Gmail                   |

Optional later: `partnerships@`, `press@`, `billing@`, `security@`.

Leave **catch-all** disabled during launch (it invites spam). Turn it on later only
if you want to capture typos, routed to a low-priority label.

## 4. Gmail labels + filters

In Gmail, create labels and filters that key off the **original recipient** (the
alias), because forwarded mail arrives at one inbox:

Labels: `Preppa/Support`, `Preppa/Legal`, `Preppa/Privacy`, `Preppa/Safety`,
`Preppa/Abuse`, `Preppa/Payouts`, `Preppa/Accessibility`, `Preppa/General`.

Filter example (repeat per alias): Gmail → Settings → Filters → Create →
**Has the words:** `to:safety@preppa.live` → Apply label `Preppa/Safety`
(and star / mark important as you like).

## 5. Test

From an email account that is **not** the destination Gmail, send a message to each
alias and confirm it arrives with the correct label. Record pass/fail per alias in
`LAUNCH.md`.

## Notes

- Cloudflare Email Routing is forward-only; you cannot *send* from these aliases via
  Cloudflare. Outbound is Resend's job (see `resend.md`), and replies use the
  `replyTo: *@preppa.live` aliases so a human reply from Gmail still threads correctly.
- If you later want shared team handling instead of a single Gmail, forward to a
  Google Group or a helpdesk inbox instead of a personal address.
