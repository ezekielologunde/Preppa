// deno-lint-ignore-file no-explicit-any
/**
 * stripe-webhook — the SOLE writer of paid status + the money ledger.
 *
 * Signature-verified (an attacker cannot forge "payment succeeded"). Idempotent: the
 * paid-status guard means replayed events are no-ops. Runs with verify_jwt = false
 * (Stripe calls it, not a logged-in user) — see supabase/config.toml. Tips are credited
 * to the cook whole (100% to cook); the platform keeps only the service fee (never
 * ledgered to the kitchen), so the cook's balance = subtotal + tips.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import Stripe from 'https://esm.sh/stripe@16.12.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});
const WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

function admin() {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } },
  );
}

Deno.serve(async (req) => {
  const sig = req.headers.get('stripe-signature');
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig ?? '', WEBHOOK_SECRET);
  } catch {
    return new Response('invalid signature', { status: 400 });
  }

  const db = admin();

  try {
    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object as any;
      const orderId = pi.metadata?.order_id as string | undefined;
      if (!orderId) return ok();

      const { data: order } = await db.from('orders').select('*').eq('id', orderId).single();
      // Idempotent: only act on the first transition to paid.
      if (order && order.pay_status !== 'paid') {
        await db.from('orders').update({ pay_status: 'paid', status: 'confirmed' }).eq('id', orderId);

        const entries: any[] = [
          { kitchen_id: order.kitchen_id, order_id: orderId, kind: 'sale', amount_cents: order.subtotal_cents, memo: 'Order sale' },
        ];
        if (order.tip_cents > 0) {
          entries.push({ kitchen_id: order.kitchen_id, order_id: orderId, kind: 'tip', amount_cents: order.tip_cents, memo: 'Tip — 100% to cook' });
        }
        await db.from('ledger_entries').insert(entries);
        await db.from('payment_intents').update({ status: 'succeeded' }).eq('stripe_payment_intent_id', pi.id);
        await db.from('audit_log').insert({ action: 'order_paid', entity: 'order', entity_id: orderId, meta: { payment_intent: pi.id } });
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const pi = event.data.object as any;
      const orderId = pi.metadata?.order_id as string | undefined;
      if (orderId) await db.from('orders').update({ pay_status: 'failed' }).eq('id', orderId).eq('pay_status', 'unpaid');
    } else if (event.type === 'account.updated') {
      // Connect onboarding progress — the ONLY writer of these flags (never the client).
      const acct = event.data.object as any;
      await db.from('stripe_accounts')
        .update({ charges_enabled: !!acct.charges_enabled, payouts_enabled: !!acct.payouts_enabled })
        .eq('stripe_account_id', acct.id);
    }
  } catch {
    // Return 500 so Stripe retries; never ack an event we failed to record.
    return new Response('processing error', { status: 500 });
  }

  return ok();
});

function ok(): Response {
  return new Response(JSON.stringify({ received: true }), { status: 200, headers: { 'content-type': 'application/json' } });
}
