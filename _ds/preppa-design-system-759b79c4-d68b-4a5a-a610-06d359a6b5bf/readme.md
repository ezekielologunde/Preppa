# Preppa Design System

> "real food from real local preppas"

*Corrected 2026-07-03 against the live codebase (`App Development/mobile/`) — the
previous version of this file described colors, fonts, and product features
that had drifted from what's actually built and actually decided. See the
inline notes below for what changed and why.*

## Overview

**Preppa** is a two-sided marketplace connecting food-lovers ("customers") with talented local home cooks and meal-preppers ("Preppers"). Customers order single meals on demand today. Weekly meal-subscriptions and prep experiences (private chef, catering, cooking classes) are the product's next-priority roadmap items — real, honest "coming soon" preview surfaces exist for these in the app, but there is no live purchase path for either yet, so do not design or prototype them as already-transactable.

Preppers get a fully-featured seller toolkit: menu management, order flow, earnings analytics, a "Kitchen Hub" with insider tips, and a ranking/badge system tied to performance.

> **Removed in this correction:** the previous version of this overview stated customers can "post bid requests that Preppers compete on." An open-bidding/gig marketplace was deliberately decided against after an extensive product/engineering review — it structurally conflicts with Preppa's trust-and-relationship-based positioning (an auction rewards lowest price over trusted-cook relationships) and carries real fraud/scam exposure. Dead code from an earlier, abandoned attempt at this was found and removed from a live payment webhook. **Do not design, prototype, or reference a bidding/gig feature for Preppa** unless a future, separate decision explicitly reverses this.

### Surfaces

| Surface | Description | Tech |
|---|---|---|
| **Consumer mobile app** | Browse/order meals, meal plans, experiences | React Native (Expo), Supabase backend |
| **Prepper dashboard** | Manage orders, earnings, listings, analytics | Same RN app, dark theme |
| **Marketing landing page** | Waitlist / brand acquisition | Vanilla HTML/CSS/JS at preppa.live |
| **Email templates** | Transactional brand touchpoints | — |

### Sources

- **Codebase**: `App Development/mobile/` — Expo RN app (TypeScript, Supabase backend)
- **Design tokens authority**: `App Development/mobile/src/constants/theme.ts` and `fonts.ts` — this design system's `tokens/*.css` files are a CSS mirror of those files, not an independent source. If the two ever disagree, `theme.ts`/`fonts.ts` win.
- **Screenshots**: `App Development/*.png` — live app captures
- **Landing page**: `App Development/mobile/landing/index.html`

---

## Content Fundamentals

### Voice & Tone
- **Warm, direct, lowercase-first.** UI headings and labels use sentence-style lowercase: "what are you craving today?", "join preppa", "explore", "kitchen hub".
- **Second person, never first.** "your cart", "your orders", not "my cart".
- **Conversational but never sloppy.** Short punchy phrases; no filler copy.
- **Inclusive & community-centric.** "real food from real local preppas" — celebrates the human behind the food.
- **Time-aware.** The app surfaces contextual copy: "🌅 morning prep", "🔥 lunch rush", "🌆 dinner window".
- **Honest about what's not built yet.** Any preview/discovery surface for a not-yet-live feature (subscriptions, experiences) must say so explicitly — "coming soon" / "preview" language, never an active-looking state, a fake price commitment, or a purchase flow that doesn't actually work.

### Casing Rules
- **Section headers / nav labels**: all lowercase (`explore`, `meal plans`, `see all`)
- **Prepper names / kitchen names**: lowercase brand names OK (`kelsi's kitchen`, `spice haus`)
- **CTA buttons**: sentence case (`Create account`, `Order again`)
- **Error/status messages**: sentence case (`Couldn't load meals. Tap to retry.`)
- **Badge labels**: all lowercase (`popular`, `trending`, `new`)

### Emoji
- Used sparingly and only in **body copy or notifications**, never in button labels or nav.
- Functional emoji only: 👋 greeting, 🎉 confirmation, 🔥 🌅 🌆 time-of-day labels.
- No decorative emoji in cards, badges, or section headers.

### Numbers & Currency
- Prices always `$XX.XX` (two decimal places), right-aligned in tables.
- Ratings: one decimal place (`4.8`, not `4.80`).
- Earnings/totals above $1 000: abbreviated (`$1.2k`).
- **Never fabricate a count, rating, or balance.** A stat with no real backing data is omitted, not shown as zero or as a plausible-looking placeholder.

---

## Visual Foundations

### Colors
The color system is **intentionally restrained**: ONE brand orange + semantic accents. Food photography is the primary visual, so surfaces stay clean and neutral.

*Values corrected below to match the live `Palette` in `theme.ts` ("WARM v3") — the prior version of this doc described an earlier, colder iteration (`#F15F22` brand / `#111827` ink / `#F7F7F8` canvas).*

- **Brand orange** `#E8611A` — CTAs, active nav, key accents. Never a full-screen fill.
- **Brand light** `#FF814A` — gradient start, logo glow, warm tint wash.
- **Brand tint** `#FAE5D3` — icon wells, chip backgrounds, gentle brand washes.
- **Brand pressed** `#C84E10` — pressed CTA + AA-safe orange for text/links on white.
- **Hero wash** `#FDF1E4` — near-white warm cream, middle stop for hero-card gradient washes.
- **Ink** `#1C1A18` — all primary text and dark buttons. Warm near-black (not cool slate).
- **Canvas** `#F7F3EE` — screen/page background (consumer app). Warm off-white to frame white cards.
- **Surface** `#FFFFFF` — card backgrounds, sheets, modals.
- **Prepper dark** `#0C0E13` / `#13161D` — the prepper dashboard is deliberately a dark "operations tool", separate from the warm consumer side.
- **Landing page** adds: acid lime `#D8FF3E`, hot pink `#FF4D7D`, warm cream `#FFF7EF` against `#0B0604` — a different, bolder marketing palette. *(Unverified against a live landing-page codebase as of this correction — carried forward from the prior version of this file.)*

### Typography
*Corrected below — the prior version of this doc specified Bricolage Grotesque + Plus Jakarta Sans, which does not match the live app.*

- **Poppins ExtraBold/Bold** — display headings, section titles, card headers.
- **Poppins Regular/Medium/SemiBold** — all body copy, labels, UI text.
- **Clash Display 600–800** — wordmark only (`preppa` logotype), web only. Native builds fall back to Poppins-ExtraBold for the wordmark. Never used for body or UI text.

### Spacing
4px base grid. Standard page horizontal padding: 20px (mobile), 32px (tablet+). Section spacing via 26px bottom padding on most sections.

### Cards
White (`#FFFFFF`) on the `#F7F3EE` canvas. Rounded corners: `18px` (standard/content cards). Box shadow: `0 6px 12px rgba(0,0,0,0.06)` — very subtle lift. No borders on standard cards (shadow does the work). Dark theme cards: `#13161D`.

### Radius
*Corrected below to match `Palette.Radius` exactly — the prior scale (`sm14/md20/lg24/input16/icon13`) was a different, unrelated set of values.*

- `sm`: `14px` — small chips, tags
- `md`: `12px` — compact controls, inputs
- `lg`: `16px` — standard cards, sheet sections
- `card`: `18px` — content cards (meal, kitchen, prepper cards)
- `avatar`: `20px` — avatar corner radius
- `pill`: `999px` — pills / FABs

### Animations & Motion
- **Library**: React Native Reanimated, driven by the app's own `Motion` tokens (spring/timing presets in `theme.ts`).
- **Entrance pattern**: staggered fade + translateY from bottom (20px → 0, opacity 0 → 1), ~30–40ms per item delay.
- **Press feedback**: scale to ~0.97 on press.
- **Reduced motion**: respected via `useReducedMotion()` — every animation needs a static/crossfade fallback.
- No aggressive infinite animations on content; only brand-glow-style elements loop, sparingly.

### Backgrounds
- Consumer app: flat `#F7F3EE` canvas, no patterns or textures.
- Landing page: animated gradient treatment; unverified against a live landing-page build as of this correction.
- Dark mode backgrounds are flat — no gradients on the prepper dashboard's base surfaces.

### Hover & Press States
- Links / secondary actions: opacity 0.7 on press.
- Primary CTAs: scale ~0.97 press.
- Active nav tabs: brand orange color swap (icon + label).
- Selected list items: brand-tint (`#FAE5D3`) background + brand-pressed text.

### Borders
- Standard inputs/cards: `#EDE8E2` (1px) when a border is needed.
- Dividers in lists: `#DDD6CE` (1px).
- Active category chips: light brand-tint fill (`#FAE5D3`).

### Shadows
- Card: `0 6px 12px rgba(0,0,0,0.06)` — very light lift, matches `Shadow.card` exactly.
- Floating/modal: `0 10px 20px rgba(0,0,0,0.10)`, matches `Shadow.floating` exactly.
- Nav bar: `0 -4px 16px rgba(0,0,0,0.08)`, matches `Shadow.navBar` exactly.
- Brand glow: `0 0 32px rgba(232,97,26,0.55)` — only on the PreppaLogo mark. *(Corrected: previously referenced the stale brand color.)*

### Imagery
- **Food photography** is the primary visual element — always real, warm-toned images.
- Placeholder/fallback: a deterministic gradient chosen per item (see `ListingImage`/`Gradients` in the app), never a static placeholder that looks like a real photo.
- No brand-generated illustrations or decorative SVG artwork.

### Iconography
- Consistent stroke-based icon system throughout the app.
- **Tab icons**: custom PNG sprites at 1×/2×/3× (`home.png`, `explore.png`).
- **Brand mark**: flame icon, white, on a brand-orange rounded tile.
- No emoji icons in UI — text labels accompany all icons.
- No icon fonts; no inline SVG illustrations.

### Color Vibe of Imagery
Warm-toned: golden browns, rich reds, vibrant greens. Food photos lean warm and appetizing. No desaturation, no B&W, no heavy grain on food imagery.

### Transparency & Blur
- Bottom sheets/modals: overlay `rgba(28,26,24,0.55)` — warm-tinted to match the v3 ink (corrected from the prior cool-toned `rgba(17,24,39,0.55)`).
- No backdrop-blur used in the app (reserved for special landing page moments, unverified as of this correction).

---

## Iconography

Preppa uses a consistent stroke-based icon system throughout the consumer app, prepper dashboard, and web surfaces.

- **Style**: consistent stroke weight, rounded line caps.
- **Sizing in app**: 11–24px depending on context (micro labels through nav/category icons).
- **Tab bar icons**: custom PNG assets (`home.png`, `explore.png`) at 1×/2×/3×.
- **Brand mark**: flame icon (white) on brand-orange tile.
- **No custom icon font**; no emoji as icons; no hand-drawn SVG icons.

---

## File Index

```
styles.css                    Root stylesheet (imports only)
tokens/
  fonts.css                   @font-face declarations (Poppins) + Clash Display CDN import
  colors.css                  All color custom properties
  typography.css              Type scale, font-family, weight, line-height tokens
  spacing.css                 Spacing, radius, z-index, layout tokens
  shadows.css                 Shadow token definitions
assets/
  fonts/                      Self-hosted Poppins TTF files
  images/                     Logos, icons, splash assets
    logo-glow.png             Preppa logo with brand glow
    preppa-email-logo.png     Email/OG wordmark
    icon.png                  App icon
    splash-icon.png           Splash screen mark
    tabIcons/home.png         Custom tab bar icons (1x/2x/3x)
    tabIcons/explore.png
guidelines/
  *.card.html                 Foundation specimen cards (colors, type, spacing…)
components/
  core/                       Core UI primitives (Button, Badge, Card, etc.)
ui_kits/
  consumer/                   Consumer app screens (home, explore, meal detail, auth)
  prepper/                    Prepper dashboard screens
readme.md                     This file
SKILL.md                      Agent skill definition
```

### Components
- `Button` — primary/secondary/ghost/danger variants, sizes, loading state
- `Badge` — status/brand/success/warning/danger, pill shape
- `MealCard` — standard + big hero variant with gallery
- `PrepperCard` — kitchen listing card with rank badge
- `Card` — generic surface card
- `Avatar` — user/kitchen avatar with fallback initials
- `Input` — text input with icon support
- `Tag` — category chip / filter tag

### UI Kits
- `ui_kits/consumer/` — Consumer app: home feed, explore, meal detail, auth
- `ui_kits/prepper/` — Prepper dashboard: earnings, order flow, hub

*Note: the guideline cards, components, and UI kit screens listed above have not been individually re-verified against the live app as part of this correction — only the token files (`tokens/*.css`) and this readme's Overview/Colors/Typography/Radius sections were checked against `theme.ts`/`fonts.ts` and the current product decisions. If a guideline card or UI kit screen still shows the old palette/fonts or references bidding, treat it as stale until re-synced.*
