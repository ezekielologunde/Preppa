/**
 * Shared Zod validators — the ONE definition of every money-touching input,
 * consumed by BOTH the Expo app (client UX validation) AND the Supabase Edge
 * Functions (Deno — the actual trust boundary). Client validation is convenience;
 * the Edge Function re-running these is what's enforced.
 *
 * Deliberately ABSENT: any price, subtotal, fee, or total field. The client sends
 * meal ids + quantities only; the create-order Edge Function recomputes every
 * amount from the `meals` table. A client-supplied price is never trusted.
 */
import { z } from 'zod';

export const uuid = z.string().uuid();

// ── Auth ─────────────────────────────────────────────────────────────────────
export const emailSchema = z.string().trim().toLowerCase().email('Enter a valid email');
export const otpSchema = z.string().regex(/^\d{6}$/, 'Enter the 6-digit code');

/** Cook application — creates a draft kitchen + pending verification (server RPC). */
export const prepperApplicationInput = z.object({
  kitchenName: z.string().trim().min(2, 'Name is too short').max(80),
  cuisine: z.string().trim().max(60).optional(),
  approxArea: z.string().trim().min(2, 'Add an approximate area').max(120),
});
export type PrepperApplicationInput = z.infer<typeof prepperApplicationInput>;

/** What the client may send to create an order. No amounts — server-computed. */
export const createOrderInput = z.object({
  kitchenId: uuid,
  items: z
    .array(
      z.object({
        mealId: uuid,
        qty: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(50),
  fulfillment: z.enum(['pickup', 'delivery']),
  method: z.enum(['card', 'cod']),
  tipCents: z.number().int().min(0).max(100_000).default(0),
  /** Client-generated; server dedupes so a retry/reorder can't double-create. */
  idempotencyKey: z.string().min(8).max(200),
});
export type CreateOrderInput = z.infer<typeof createOrderInput>;

/** The 6-digit code the counterparty reads aloud at handoff. Server validates it
 *  against the hashed, single-use, TTL-bound code — this is only the shape check. */
export const codConfirmInput = z.object({
  orderId: uuid,
  code: z.string().regex(/^\d{6}$/, 'must be a 6-digit code'),
});
export type CodConfirmInput = z.infer<typeof codConfirmInput>;

/** A review may be written only for the author's own completed order (RLS enforces). */
export const reviewInput = z.object({
  orderId: uuid,
  kitchenId: uuid,
  rating: z.number().int().min(1).max(5),
  body: z.string().max(2000).optional(),
});
export type ReviewInput = z.infer<typeof reviewInput>;

/** Cook-side order advance — legal transitions are enforced by the DB RPC. */
export const advanceOrderInput = z.object({
  orderId: uuid,
  to: z.enum(['preparing', 'ready', 'completed', 'cancelled']),
});
export type AdvanceOrderInput = z.infer<typeof advanceOrderInput>;
