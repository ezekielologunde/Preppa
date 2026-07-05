// deno-lint-ignore-file no-explicit-any
/**
 * create-order — the server-authoritative order + payment intent.
 *
 * TRUST BOUNDARY: the client sends meal ids + quantities only. This function RECOMPUTES
 * subtotal, service fee, and total from the `meals` table — a client-supplied price or
 * total is never trusted. It creates the order in `pending`/`unpaid` state and a Stripe
 * PaymentIntent for the server-frozen amount. `paid` status is written ONLY by the
 * webhook, never here. Idempotent by (customer_id, idempotencyKey).
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import Stripe from 'https://esm.sh/stripe@16.12.0?target=deno';
import { corsHeaders, json } from '../_shared/cors.ts';
import { createOrderInput } from '../_shared/validation.ts';
import { clampTipCents, computeServiceFeeCents } from '../_shared/money.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

function admin() {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } },
  );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json(405, { error: 'method not allowed' });

  try {
    const db = admin();

    // Identify the caller from their JWT (never trust a client-supplied user id).
    const jwt = (req.headers.get('Authorization') ?? '').replace('Bearer ', '');
    const { data: userData, error: userErr } = await db.auth.getUser(jwt);
    if (userErr || !userData.user) return json(401, { error: 'unauthorized' });
    const customerId = userData.user.id;

    const parsed = createOrderInput.safeParse(await req.json());
    if (!parsed.success) return json(400, { error: 'invalid input', issues: parsed.error.issues });
    const input = parsed.data;

    // COD is gated until the commission-reconciliation design is approved.
    if (input.method === 'cod') return json(400, { error: 'Cash on delivery isn’t available yet.' });

    // Idempotency: return the existing order (and its PaymentIntent secret) on retry.
    const { data: existing } = await db
      .from('orders').select('id').eq('customer_id', customerId).eq('idempotency_key', input.idempotencyKey).maybeSingle();
    if (existing) {
      const { data: piRow } = await db
        .from('payment_intents').select('stripe_payment_intent_id').eq('order_id', existing.id)
        .order('created_at', { ascending: false }).limit(1).maybeSingle();
      let clientSecret: string | null = null;
      if (piRow) clientSecret = (await stripe.paymentIntents.retrieve(piRow.stripe_payment_intent_id)).client_secret;
      return json(200, { orderId: existing.id, clientSecret, reused: true });
    }

    // Load the real meals; validate single-kitchen + availability from the DB.
    const mealIds = [...new Set(input.items.map((i) => i.mealId))];
    const { data: meals, error: mErr } = await db
      .from('meals').select('id, name, price_cents, kitchen_id, status').in('id', mealIds);
    if (mErr) throw mErr;
    if (!meals || meals.length !== mealIds.length) return json(400, { error: 'Some items are unavailable.' });
    for (const m of meals as any[]) {
      if (m.kitchen_id !== input.kitchenId) return json(400, { error: 'All items must be from one kitchen.' });
      if (m.status !== 'live') return json(409, { error: `${m.name} is no longer available.` });
    }

    const { data: kitchen } = await db
      .from('kitchens').select('id, verification_status, availability').eq('id', input.kitchenId).single();
    if (!kitchen || kitchen.verification_status !== 'verified' || kitchen.availability !== 'open') {
      return json(409, { error: 'This kitchen isn’t taking orders right now.' });
    }

    // ── Recompute all money from DB prices. Never from the client. ──
    const priceById = new Map((meals as any[]).map((m) => [m.id, m.price_cents as number]));
    const nameById = new Map((meals as any[]).map((m) => [m.id, m.name as string]));
    let subtotal = 0;
    for (const it of input.items) subtotal += (priceById.get(it.mealId) ?? 0) * it.qty;
    const serviceFee = computeServiceFeeCents(subtotal);
    const tip = clampTipCents(input.tipCents);
    const total = subtotal + serviceFee + tip;

    // Create the order pending (a client callback can never mark it paid).
    const { data: order, error: oErr } = await db
      .from('orders')
      .insert({
        customer_id: customerId, kitchen_id: input.kitchenId, status: 'pending', method: 'card',
        pay_status: 'unpaid', fulfillment: input.fulfillment, subtotal_cents: subtotal,
        service_fee_cents: serviceFee, tip_cents: tip, total_cents: total, idempotency_key: input.idempotencyKey,
      })
      .select('id').single();
    if (oErr) {
      if ((oErr as any).code === '23505') return json(409, { error: 'Duplicate order; please retry.' });
      throw oErr;
    }

    const itemRows = input.items.map((it) => ({
      order_id: order.id, meal_id: it.mealId, kitchen_id: input.kitchenId,
      name_snapshot: nameById.get(it.mealId) ?? 'Item', unit_price_cents: priceById.get(it.mealId) ?? 0, qty: it.qty,
    }));
    const { error: iErr } = await db.from('order_items').insert(itemRows);
    if (iErr) throw iErr;

    // PaymentIntent for the SERVER amount. Preppa is merchant of record; the cook's
    // cut (subtotal + tip) is credited to their ledger by the webhook on success and
    // paid out separately — tips stay whole (fee applies only to the service fee).
    const pi = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { order_id: order.id, customer_id: customerId, kitchen_id: input.kitchenId, tip_cents: String(tip), subtotal_cents: String(subtotal) },
    });
    await db.from('payment_intents').insert({ order_id: order.id, stripe_payment_intent_id: pi.id, amount_cents: total, status: pi.status });

    return json(200, {
      orderId: order.id, clientSecret: pi.client_secret,
      subtotalCents: subtotal, serviceFeeCents: serviceFee, tipCents: tip, totalCents: total,
    });
  } catch (_e) {
    return json(500, { error: 'Could not create the order. Please try again.' });
  }
});
