// deno-lint-ignore-file no-explicit-any
/**
 * connect-payout — cash out a cook's settled balance.
 *
 * The amount is SERVER-DERIVED from the append-only ledger (kitchen_balance_cents) —
 * never a client-supplied number, so a cook can never withdraw more than earned. Paid
 * only to the cook's OWN verified connected account (payouts_enabled). Records a payout
 * row + a negative 'payout' ledger entry so the balance nets to zero.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import Stripe from 'https://esm.sh/stripe@16.12.0?target=deno';
import { corsHeaders, json } from '../_shared/cors.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

function admin() {
  return createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', { auth: { persistSession: false } });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json(405, { error: 'method not allowed' });

  try {
    const db = admin();
    const jwt = (req.headers.get('Authorization') ?? '').replace('Bearer ', '');
    const { data: userData } = await db.auth.getUser(jwt);
    const userId = userData.user?.id;
    if (!userId) return json(401, { error: 'unauthorized' });

    const { kitchenId } = await req.json();
    if (typeof kitchenId !== 'string') return json(400, { error: 'kitchenId required' });

    const { data: kitchen } = await db.from('kitchens').select('id, owner_id').eq('id', kitchenId).single();
    if (!kitchen || kitchen.owner_id !== userId) return json(403, { error: 'not your kitchen' });

    const { data: acct } = await db.from('stripe_accounts').select('stripe_account_id, payouts_enabled').eq('kitchen_id', kitchenId).maybeSingle();
    if (!acct || !acct.payouts_enabled) return json(400, { error: 'Finish payout setup first.' });

    // Server-derived available balance. Never trust a client amount.
    const { data: balance, error: balErr } = await db.rpc('kitchen_balance_cents', { kid: kitchenId });
    if (balErr) throw balErr;
    const amount = Number(balance) || 0;
    if (amount <= 0) return json(400, { error: 'Nothing to cash out yet.' });

    const transfer = await stripe.transfers.create({
      amount,
      currency: 'usd',
      destination: acct.stripe_account_id,
      metadata: { kitchen_id: kitchenId },
    });

    await db.from('payouts').insert({ kitchen_id: kitchenId, amount_cents: amount, stripe_transfer_id: transfer.id, status: 'paid' });
    await db.from('ledger_entries').insert({ kitchen_id: kitchenId, kind: 'payout', amount_cents: -amount, memo: 'Payout to your account' });
    await db.from('audit_log').insert({ actor_id: userId, action: 'payout_created', entity: 'kitchen', entity_id: kitchenId, meta: { transfer: transfer.id, amount_cents: amount } });

    return json(200, { amountCents: amount });
  } catch (_e) {
    return json(500, { error: 'Payout failed. Please try again.' });
  }
});
