# PREPPA — Launch Readiness Audit

_Senior eng/design/QA org review. Live: app.preppa.live (SPA) + preppa.live (landing). Updated continuously._

## P0 — Launch Blockers (cannot ship without)

| # | Blocker | Owner | Status |
| --- | --- | --- | --- |
| B1 | **`.env` DB password wiped** by IDE (`YOUR-PASSWORD`) → no migrations, no data fixes, no payments wiring | **User** | 🔴 blocked |
| B2 | **No payments** — Stripe not integrated; checkout/`create_order` RPC not wired to UI | Eng (needs B1 + Stripe keys) | 🔴 not started |
| B3 | **Auth not testable** — email confirmation ON; seeded users broken (NULL GoTrue token cols) | User (toggle) + Eng (B1 fix) | 🟠 partial |
| B4 | **No checkout flow** — cart UI + order placement absent | Eng | 🔴 not started |
| B5 | **Admin dashboard** — not built | Eng | 🔴 not started |

## P1 — High (UX/correctness, mostly shippable now)

| # | Issue | Phase | Status |
| --- | --- | --- | --- |
| H1 | No loading/empty/error states — carousels render blank while fetching | 9 | 🟡 fixing |
| H2 | No press feedback on cards/buttons; no entrance motion | 8 | 🟡 fixing |
| H3 | Search bars are fake (static Text, not inputs); no search | 3 | 🔴 |
| H4 | Category/cuisine taps + "see all" are dead (no nav/filter) | 3 | 🔴 |
| H5 | Meal detail screen missing — can't view/add a meal | 3 | 🔴 |
| H6 | Profile data 100% static demo (rewards/orders/plans not from DB) | 3 | 🔴 |
| H7 | Dashboard 100% static demo (no real prepper orders/revenue) | 4 | 🔴 |
| H8 | Meal Plans system not built (schema partial) | 5 | 🔴 |
| H9 | Experiences/gig marketplace not built | 6 | 🔴 |
| H10 | Messaging / notifications / reviews UI not built (schema exists) | 2 | 🔴 |

## P2 — Medium (polish/craft)

| # | Issue | Status |
| --- | --- | --- |
| M1 | Emoji used as icons/accents (ui-ux-pro-max: use SVG) | 🟡 |
| M2 | Prices not tabular figures (layout shift risk) | 🟡 |
| M3 | a11y: icon-only buttons lack accessibilityLabel | 🟡 fixing |
| M4 | Material Symbols font 404 on web (cosmetic) | ⚪ |
| M5 | No dark mode on customer screens | ⚪ |

## Architecture chain status (User→Order→Payment→Messaging→Review→Analytics)

`User ✅ → Order ⚠️(RPC exists, no UI) → Payment 🔴 → Messaging 🔴(schema only) → Review 🔴(schema only) → Analytics 🔴`

The data model + RLS are production-grade; the **transaction + comms chain has no UI yet**. That's the bulk of remaining launch work, and most of it depends on **B1 (DB password)**.
