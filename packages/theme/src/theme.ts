/**
 * Preppa — canonical design tokens (WARM v3). THE single source of truth.
 *
 * A faithful, typed mirror of the corrected design-system token files
 * (`_ds/.../tokens/*.css`, "WARM v3", synced from the live `theme.ts` 2026-07-03).
 *
 * AUTHORITY NOTE: `_ds_manifest.json` and the guideline cards are STALE — they still
 * describe the pre-correction system (brand #F15F22, Bricolage/Jakarta fonts, the
 * md20/lg24 radius scale). The readme says only `tokens/*.css` + the readme prose
 * were re-verified and win. This file follows those, not the manifest.
 *
 * The full Style Dictionary pipeline is DEFERRED (council I7) until a second consumer
 * (generated CSS for the landing) actually diverges. Until then this hand-authored
 * file is the one source, reconciling the prototype's two naming systems
 * (--primary/--muted/--g1..8 vs --color-*) into one typed shape.
 *
 * ACCESSIBILITY: `textMuted` is < 3:1 contrast — DECORATIVE/DISABLED ONLY. Load-bearing
 * secondary text (timestamps, meta, fine print) MUST use `textSecondary` (AA on surface).
 * Semantic colors are always paired with a text/icon label, never color alone.
 */

export const color = {
  // ── Brand — used sparingly: CTAs, active nav, key accents. Never a full-screen fill.
  brand: '#E8611A',
  brandLight: '#FF814A', // gradient start, logo glow, warm tint wash
  brandTint: '#FAE5D3', // chip bg, icon wells
  brandPressed: '#C84E10', // pressed CTA + AA-safe orange for text/links on white
  heroWash: '#FDF1E4',

  // ── Warm neutral ink ramp (taupe-leaning, not cool slate)
  ink: '#1C1A18',
  inkSoft: '#44403C',
  textSecondary: '#78716C', // ~4.8:1 on white (AA) — USE for load-bearing secondary copy
  textMuted: '#B8B0A8', // ⚠ DECORATIVE/DISABLED ONLY — < 3:1, never load-bearing

  // ── Customer (light) surfaces — warm cream canvas framing white cards
  surface: '#FFFFFF',
  canvas: '#F7F3EE',
  border: '#EDE8E2',
  chip: '#F2ECE6',
  chipOff: '#F0EDEA',
  divider: '#DDD6CE',

  // ── Semantic accents — pair with text/icon, never color alone
  success: '#16A34A',
  successTint: '#DCFCE7',
  successDark: '#15803D',
  amber: '#F59E0B', // star ratings, "popular" badges
  amberTint: '#FEF3C7',
  amberDeep: '#92400E',
  danger: '#DC2626',
  dangerTint: '#FEF2F2',
  dangerBorder: '#FECACA',
  dangerDeep: '#991B1B',

  // ── Home-cook feature accent
  homeCook: '#5B21B6',
  homeCookTint: '#EDE9FE',
  homeCookDeep: '#4C1D95',

  // ── Order-status chip pairs
  confirmedTint: '#DBEAFE',
  confirmedDark: '#1D4ED8',
  preparingTint: '#FED7AA',
  preparingDark: '#9A3412',
  cancelledTint: '#FEE2E2',

  // ── Feature accent triad — delivery / meetup-social / vegan
  cyan: '#06B6D4',
  violet: '#A78BFA',
  leafGreen: '#22C55E',

  // ── Prepper (dark) — deliberately an "operations tool", separate from the warm side
  prepperBg: '#0C0E13',
  prepperCard: '#13161D',
  prepperBorder: '#242A33',

  overlay: 'rgba(28, 26, 24, 0.55)',
} as const;

/**
 * ListingImage placeholder gradients (`--g1..--g8`). The design system's rule:
 * a deterministic gradient per item — never a static placeholder that looks like a
 * real photo. Stored as [start, end] for expo-linear-gradient. Decorative, not brand.
 */
export const gradient = {
  g1: ['#FF6B35', '#F7931E'],
  g2: ['#667EEA', '#764BA2'],
  g3: ['#11998E', '#38EF7D'],
  g4: ['#FF8A4C', '#F26B1D'],
  g5: ['#A8E063', '#56AB2F'],
  g6: ['#EF4444', '#F97316'],
  g7: ['#7C3AED', '#A855F7'],
  g8: ['#0EA5E9', '#6366F1'],
} as const;
export type GradientKey = keyof typeof gradient;

// ── Border radii — matches Palette.Radius exactly
export const radius = {
  sm: 14, // small chips, tags
  md: 12, // compact controls, inputs
  lg: 16, // standard cards, sheet sections
  card: 18, // content cards (meal, kitchen, prepper)
  avatar: 20,
  pill: 999,
} as const;

// ── Spacing scale (4px base grid) — the DS named scale, exactly
export const space = {
  half: 2, s1: 4, s2: 8, s3: 16, s4: 24, s5: 32, s6: 64,
} as const;

export const layout = {
  pagePx: 20, // standard horizontal padding
  pagePxLg: 32, // tablet/desktop
  touchMin: 44, // Apple HIG / Material min tap target
  maxContent: 800,
} as const;

// ── Z-index ladder
export const z = { base: 0, card: 1, overlay: 10, modal: 100, toast: 200 } as const;

// ── Typography. Poppins carries the hierarchy by weight; Clash Display is wordmark-only
//    (web) and falls back to Poppins-ExtraBold on native. Never Clash for body/UI.
export const typography = {
  family: {
    display: 'Poppins',
    body: 'Poppins',
    wordmark: 'ClashDisplay',
    mono: 'ui-monospace',
  },
  weight: {
    regular: '400', medium: '500', semibold: '600', bold: '700', extrabold: '800',
  },
  // Type scale (px) — matches Palette.Type exactly
  size: {
    micro: 11, // badges, timestamps, fine print
    label: 13, // supporting labels, captions
    body: 15, // default body copy
    title: 18, // card title, modal header
    display: 22, // section header
    displayLg: 24, // section hero
    displayXl: 32, // hero / page title
    heroLg: 40,
    hero: 48,
  },
  lineHeight: { display: 1.15, body: 1.5, label: 1.4 },
  letterSpacing: { tighter: -0.8, tight: -0.5, normal: 0 },
} as const;

// ── Shadows — subtle (food imagery is the visual hero). RN shape (single-layer
//    approximation of the DS two-layer web shadows; elevation covers Android).
export const shadow = {
  card: { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 2 },
  floating: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 6 },
  navBar: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: -4 }, elevation: 8 },
  brandGlow: { shadowColor: 'rgba(232,97,26,0.55)', shadowOpacity: 1, shadowRadius: 32, shadowOffset: { width: 0, height: 0 }, elevation: 0 },
} as const;

/**
 * The two app worlds. Role/theme is COSMETIC only — never a security boundary (RLS is).
 * Consumer = warm cream; Prepper = dark "operations" surface with a brand-light accent.
 */
export const themes = {
  consumer: {
    name: 'consumer',
    bg: color.canvas,
    surface: color.surface,
    surfaceAlt: color.chip,
    text: color.ink,
    textSecondary: color.textSecondary,
    textMuted: color.textMuted,
    border: color.border,
    divider: color.divider,
    accent: color.brand,
    accentText: color.brandPressed,
    accentTint: color.brandTint,
  },
  prepper: {
    name: 'prepper',
    bg: color.prepperBg,
    surface: color.prepperCard,
    surfaceAlt: '#1B2029',
    text: '#F4F0EA',
    textSecondary: '#CDC7BE',
    textMuted: '#8C857C',
    border: color.prepperBorder,
    divider: color.prepperBorder,
    accent: color.brandLight,
    accentText: '#FF9A6B',
    accentTint: 'rgba(255,129,74,0.13)',
  },
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName];
