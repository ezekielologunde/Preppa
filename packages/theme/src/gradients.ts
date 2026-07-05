import { gradient, type GradientKey } from './theme.js';

const KEYS = Object.keys(gradient) as GradientKey[];

/** Stable string hash (djb2) — same id always yields the same gradient. */
function hash(id: string): number {
  let h = 5381;
  for (let i = 0; i < id.length; i++) h = ((h << 5) + h + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Deterministic placeholder gradient for a listing, keyed by a stable id (meal id,
 * kitchen id). The DS mandates a per-item gradient fallback — never a static image
 * that could be mistaken for a real photo. Returns [start, end] for a linear gradient.
 */
export function gradientFor(id: string): readonly [string, string] {
  const key = KEYS[hash(id) % KEYS.length]!;
  return gradient[key];
}
