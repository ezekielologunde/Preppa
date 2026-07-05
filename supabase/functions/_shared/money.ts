/**
 * Server-authoritative money. These functions run ONLY in the Edge Function (trusted)
 * context — the client never computes a charge amount. All values are integer cents.
 */
export const SERVICE_FEE_BPS = 1000; // 10% platform service fee

/** Platform service fee on the subtotal. (Founder-waiver hook: return 0 for founding
 *  kitchens once that flag exists — computed here server-side, never client-supplied.) */
export function computeServiceFeeCents(subtotalCents: number): number {
  return Math.round((subtotalCents * SERVICE_FEE_BPS) / 10000);
}

export const MAX_TIP_CENTS = 100_000;

export function clampTipCents(tip: number): number {
  if (!Number.isFinite(tip) || tip < 0) return 0;
  return Math.min(Math.round(tip), MAX_TIP_CENTS);
}
