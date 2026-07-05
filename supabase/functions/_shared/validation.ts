// deno-lint-ignore-file
/**
 * Server-side input validation — the actual trust boundary. This MIRRORS
 * `packages/types/src/schemas.ts` (`createOrderInput`): the app validates the same
 * shape for UX, but this Deno copy is what's enforced. Keep the two in sync; they are
 * intentionally one logical schema across two runtimes. Deliberately NO price/total
 * fields — the client sends meal ids + quantities only; the server recomputes amounts.
 */
import { z } from 'https://esm.sh/zod@3.23.8';

export const createOrderInput = z.object({
  kitchenId: z.string().uuid(),
  items: z
    .array(z.object({ mealId: z.string().uuid(), qty: z.number().int().min(1).max(20) }))
    .min(1)
    .max(50),
  fulfillment: z.enum(['pickup', 'delivery']),
  method: z.enum(['card', 'cod']),
  tipCents: z.number().int().min(0).max(100_000).default(0),
  idempotencyKey: z.string().min(8).max(200),
});

export type CreateOrderInput = z.infer<typeof createOrderInput>;
