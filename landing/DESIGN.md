# Design

Visual system for preppa.live. Modern food-brand energy (Graza / Omsom / Oatly) with premium, cinematic craft. One full-viewport section, a real chef-at-work video under a rich warm-dark overlay, bold bragging copy. Never the SaaS/AI default kit (no plain glass cards as decoration, chip rows, phone mockups, or tiny uppercase eyebrows as section grammar).

## Theme

Single-section, cinematic, and themeable. The DEFAULT (main) theme is warm orange — a warm near-white/cream wash over the food video with dark ink text. A header toggle switches to a burnt-orange dark mode (espresso overlay, cream text) for a moody night-kitchen feel. Both read from `--hero-*` tokens (light on `:root`, dark on `:root[data-theme="dark"]`); the choice persists in localStorage with a no-flash script. No emoji anywhere — cuisine marks are letter monograms, ticker separators are dots, the toggle uses inline SVG.

## Color

Committed + a touch of full-palette. Warm-dark ground, cream text, with two owned pops:

- `--orange` #F26B1D — the brand (the flame, the primary CTA, the glow).
- `--acid` #CBF24A — bright lime-green, the surprise pop: the accent word in the headline, the "launching soon" dot, the "your block" highlight. Small doses, high impact.
- `--cream` #FFF3E4 — body and headline text on the dark video.
- `--ember` #A62E08 / `#180B05` espresso — the dark ground and shadow depth.
- Warm-white `--paper` and `--ink` remain for the light help.preppa.live surfaces.

Text on the video overlay clears AA (cream on the darkened warm base). Never muted-gray body text.

## Typography

One characterful family, committed weight and size contrast — deliberately NOT the reflex faces (Inter, Plus Jakarta, DM, Instrument, Fraunces, Playfair are banned).

- Display + body: Bricolage Grotesque (Google Fonts). Headlines at 800, huge; body 400–500.
- Scale: fluid `clamp()`, hero display ~clamp(44px, 7.6vw, 86px), letter-spacing ≥ -0.035em, `text-wrap: balance` on the headline. The headline is a lead actor and carries a bragging claim.

## Imagery

Food-led → real food imagery is required. Full-bleed licensed food video (`/hero-chef.mp4` + `/hero-chef-poster.jpg`, "Video by cottonbro studio from Pexels") with a poster fallback for reduced-motion and slow loads. Real verified cuisines (West African, Soul food, Oaxacan, Halal & Desi, Italian comfort, Healthy & seafood) as content and marquee texture — with honest example dishes, never invented stats.

## Layout

One cohesive full-viewport section: header (logo + "Launching soon" status), a two-column hero (bragging headline + subcopy + waitlist | cuisine cards), a cuisine marquee, and a compact compliance/social strip folded into the same section (no separate footer). Fluid `clamp()` spacing; stacks cleanly to a single column on mobile.

## Motion

One orchestrated page-load — headline, subcopy, form, and cards reveal with a short stagger (visible by default, motion only enhances). A slow cuisine marquee. Honor `prefers-reduced-motion`: static poster instead of video, marquee paused, entrance transitions collapsed. Ease-out curves only.
