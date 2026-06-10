// Stripe webhook → keeps payment state in sync with Stripe.
// Verifies the signature, then records paid / refunded outcomes.
// Deploy with verify_jwt = false (Stripe does not send a Supabase JWT).
import Stripe from 'https://esm.sh/stripe@14.21.0?target=denonext';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});
const whsec = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

Deno.serve(async (req) => {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig!, whsec);
  } catch (e) {
    return new Response(`Bad signature: ${e instanceof Error ? e.message : 'error'}`, { status: 400 });
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session;
        const orderId = s.metadata?.order_id ?? s.client_reference_id ?? undefined;
        if (orderId && s.payment_status === 'paid') {
          await supabase.rpc('record_payment', {
            p_order_id: orderId,
            p_txn: String(s.payment_intent),
            p_status: 'succeeded',
            p_amount: (s.amount_total ?? 0) / 100,
          });
        }
        break;
      }
      case 'charge.refunded': {
        const ch = event.data.object as Stripe.Charge;
        const { data: p } = await supabase
          .from('payments')
          .select('order_id')
          .eq('transaction_id', String(ch.payment_intent))
          .maybeSingle();
        if (p?.order_id) {
          await supabase.rpc('record_refund', {
            p_order_id: p.order_id,
            p_amount: (ch.amount_refunded ?? 0) / 100,
            p_reason: 'stripe refund',
          });
        }
        break;
      }
    }
    return new Response('ok', { status: 200 });
  } catch (e) {
    return new Response(e instanceof Error ? e.message : 'error', { status: 500 });
  }
});
