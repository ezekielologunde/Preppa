/**
 * Motion tokens (spring/timing presets) for Reanimated 3, plus the reduced-motion
 * contract. Every animation in the app MUST have a static/crossfade fallback when
 * `useReducedMotion()` is true — the council flagged the prototype's spinners, the
 * QR "scan" sweep, the live blip pulse, and the fade/"layer in" transitions as
 * having no reduced-motion path.
 */
export const motion = {
  spring: {
    default: { damping: 18, stiffness: 180, mass: 1 },
    gentle: { damping: 22, stiffness: 120, mass: 1 },
    snappy: { damping: 20, stiffness: 260, mass: 1 },
  },
  timing: {
    fast: { duration: 140 },
    base: { duration: 220 },
    slow: { duration: 360 },
  },
  /** Staggered entrance: fade + translateY 20 → 0, ~30–40ms per item. */
  entrance: { translateY: 20, perItemDelayMs: 34 },
  /** Press feedback: scale to ~0.97. */
  pressScale: 0.97,
} as const;
