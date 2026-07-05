# Preppa design system — in code

The prototype's design system (`_ds/.../`) is CSS tokens + a component spec. This is
its faithful implementation as typed, themeable React Native — one source of truth,
per the council's I7 verdict (single hand-authored source now; Style Dictionary
pipeline deferred until a second consumer diverges).

## ⚠ The `_ds_manifest.json` is stale — do not read values from it

While implementing I confirmed the readme's warning: `_ds_manifest.json` and the
guideline/UI-kit cards still describe the **pre-correction** system —

| | Stale manifest | Corrected (authoritative) |
|---|---|---|
| Brand | `#F15F22` | **`#E8611A`** |
| Fonts | Bricolage Grotesque + Plus Jakarta Sans | **Poppins** (Clash Display = wordmark only) |
| Ink / canvas | `#111827` / `#F7F7F8` (cool) | **`#1C1A18` / `#F7F3EE`** (warm) |
| Radius | `md 20 / lg 24 / input 16 / icon 13` | **`md 12 / lg 16 / card 18 / avatar 20`** |

Only `tokens/*.css` + the readme prose were re-verified against the live `theme.ts`.
**`packages/theme` mirrors those, not the manifest.**

## Packages

### `@preppa/theme` — tokens (zero dependencies, pure TS)
`color` · `gradient` (`--g1…g8`) + `gradientFor(id)` · `radius` · `space` (4px grid) ·
`layout` · `z` · `typography` (Poppins, full type scale, line-heights, letter-spacing) ·
`shadow` (RN shape) · `motion` · `themes.consumer` / `themes.prepper`.

Safe to import anywhere (landing/web too) — it pulls in no React Native.

### `@preppa/ui` — components (React Native)
Built entirely on the tokens, themed via context:

- **Context/hooks** — `ThemeProvider` (one per route group), `useTheme`, `useReducedMotion`.
- **Core** — `Button` (primary/secondary/ghost/danger × sm/md/lg, loading, press-scale 0.97),
  `Badge`, `Tag` (brand-tint selected state), `Card`, `Avatar` (initials-on-gradient fallback),
  `Input` (icon + error state), `Stepper`, `Stars`.
- **Content** — `ListingImage` (deterministic gradient when no photo), `MealCard`
  (standard + `hero`), `PrepperCard` (rank badge).
- **Helpers** — `formatMoney` ($XX.XX), `formatMoneyShort` ($1.2k), `formatRating` (one decimal).

## How the council's fixes are baked in

- **One source, no drift** — the prototype's two naming systems (`--primary`/`--muted`/
  `--g1..8` vs `--color-*`) are reconciled into one typed shape; no hardcoded hex.
- **Accessibility** — load-bearing secondary text uses `textSecondary` (AA); `textMuted`
  is marked decorative/disabled only. `useReducedMotion()` is provided for every animation.
- **Theme is cosmetic, never a boundary** — `ThemeProvider` carries the two worlds; access
  is gated server-side by RLS, never by which theme is mounted.
- **Honest imagery** — `ListingImage`/`Avatar` fall back to a deterministic gradient, never
  a static image that could pass for a real dish.

## Status & next steps

The **token layer is pure TS**; the **RN components are written but not yet typechecked/
rendered** — that needs the Expo/React Native toolchain, which arrives when the app is
scaffolded (build-order step 6). At that point `pnpm typecheck` validates them and they
render in the first screens. Peer deps: `expo-image`, `expo-linear-gradient`,
`lucide-react-native` (the DS icon library — Lucide, 2px stroke, rounded caps).

Deferred (council I7): the Style Dictionary build pipeline and Reanimated-driven motion
components — added when the landing page needs generated CSS from the same source.
