// Captures the Stripe PaymentIntent hold placed at home cook booking confirmation.
// Called by the prepper after the customer verifies their PIN and the session completes.
// Idempotent — safe to call even if already captured.
import Stripe from 'https://esm.sh/stripe@14.21.0?target=denonext';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    const token = (req.headers.get('Authorization') ?? '').replace('Bearer ', '');
    const { data: { user }, error: uerr } = await supabase.auth.getUser(token);
    if (uerr || !user) return json({ error: 'Not authenticated' }, 401);

    const { orderId } = await req.json().catch(() => ({}));
    if (!orderId) return json({ error: 'Missing orderId' }, 400);

    // Verify caller is the prepper for this order
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .select('id, prepper_id, total, fulfillment_type, status')
      .eq('id', orderId)
      .single();
    if (orderErr || !order) return json({ error: 'Order not found' }, 404);

    const { data: pp } = await supabase
      .from('prepper_profiles')
      .select('id')
      .eq('id', order.prepper_id)
      .eq('user_id', user.id)
      .maybeSingle();
    if (!pp) return json({ error: 'Forbidden' }, 403);

    if (order.fulfillment_type !== 'home_cook') return json({ error: 'Not a home cook order' }, 400);

    // Get payment intent from home_cook_requests
    const { data: hcr } = await supabase
      .from('home_cook_requests')
      .select('id, payment_intent_id')
      .eq('order_id', orderId)
      .maybeSingle();

    if (!hcr?.payment_intent_id) return json({ error: 'No payment intent on record for this order' }, 404);

    // Idempotent — if already captured, return success
    const intent = await stripe.paymentIntents.retrieve(hcr.payment_intent_id);
    if (intent.status === 'succeeded') {
      return json({ captured: true, paymentIntentId: intent.id, idempotent: true });
    }
    if (intent.status !== 'requires_capture') {
      return json({ error: `Payment intent in unexpected state: ${intent.status}` }, 409);
    }

    const captured = await stripe.paymentIntents.capture(hcr.payment_intent_id);

    await supabase.rpc('record_payment', {
      p_order_id: orderId,
      p_txn: captured.id,
      p_status: 'succeeded',
      p_amount: Number(order.total),
    });

    return json({ captured: true, paymentIntentId: captured.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal error';
    return json({ error: msg }, 500);
  }
});
