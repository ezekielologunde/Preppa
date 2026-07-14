# Design

Visual system for preppa.live. Modern food-brand (Graza / Omsom / Oatly energy) with editorial craft. Loud, warm, appetite-first, human — never corporate, never the SaaS/AI default kit (no glassmorphism, chip rows, phone mockups, or tiny uppercase eyebrows).

## Theme

Warm and color-committed. Orange is not an accent on white — it is a major surface the brand owns. Pair a drenched-orange hero with a warm near-black and a crisp cream so the page has editorial pacing (distinct color worlds per section), not one flat wash. Light or dark is chosen per section for drama, not set globally.

## Color

Committed strategy — the brand orange carries the page.

- `--orange` #F26B1D — the brand (the flame). Used as a full surface, not just for buttons.
- `--orange-deep` #D0530F — pressed states, shadows, borders on orange.
- `--ember` #A62E08 — deepest warm tone; hero-on-orange shadows, dark detail.
- `--ink` #201108 — warm near-black. Text on light; background of the dark section.
- `--cream` #FFF3E4 — warm cream. Text/marks on orange and on ink; NOT the body background (that would be the AI-cream default).
- `--paper` #FBEFE0 — the light section ground (a hair warmer than white, low chroma toward orange).
- `--herb` #3FA34D — the one surprise: a fresh cooked-greens green. Tiny doses only (a mark, an underline, "in" states) for modern-food-brand pop and a "fresh" read.

Contrast: cream (#FFF3E4) on orange (#F26B1D) and on ink clears AA for large display type; body copy uses ink on paper / cream on ink at ≥4.5:1. Never muted-gray body text.

## Typography

One characterful family, committed weight and size contrast — deliberately NOT the reflex faces (Plus Jakarta, Inter, DM, Instrument, Fraunces, Playfair are all banned here).

- Display + body: **Bricolage Grotesque** (Google Fonts). Its mixed contrast and slightly quirky terminals read hand-made and modern, not corporate. Headlines at 800 weight, huge; body at 400–500.
- Scale: fluid `clamp()`, ≥1.25 ratio. Hero display clamp max ~clamp(48px, 9vw, 92px); letter-spacing ≥ -0.03em, `text-wrap: balance` on headings.
- Voice in type: the headline is a lead actor — big, confident, a little loud. No tracked uppercase eyebrow above sections.

## Imagery

Food-led brief → real food imagery is required, never colored blocks. Use the licensed food footage already in the repo (`/hero-cook.mp4` + `/hero-cook-poster.jpg`, "Video by Ardina Setiorini from Pexels") treated editorially — full-bleed, integrated into the color composition. Real verified-cuisine names (West African, Soul food, Oaxacan, Halal & Desi, Italian comfort, Healthy & seafood) as typographic content, not invented stats.

## Layout

Editorial and asymmetric. A dominant, drenched-orange hero that holds the headline + the waitlist form + food, then one warm contrasting band (what Preppa is / the cuisines), then a compact footer (help + compliance). Fluid `clamp()` spacing that breathes on desktop. Break the grid for emphasis; let the food go full-bleed.

## Motion

One orchestrated page-load (headline settles in, food/orange reveal), restrained after that — no fade-on-scroll on every element. Honor `prefers-reduced-motion`: static poster instead of video, instant instead of animated. Ease-out curves only.
