// deno-lint-ignore-file no-explicit-any
/**
 * connect-onboard — start (or resume) Stripe Connect Express onboarding for a cook.
 * Creates the connected account if none exists (one per kitchen) and returns a hosted
 * onboarding link. Ownership-gated by the caller's JWT: a cook can only onboard their
 * own kitchen. charges_enabled/payouts_enabled are set later by the account.updated
 * webhook — never trusted from the client.
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

    const { data: kitchen } = await db.from('kitchens').select('id, owner_id, name').eq('id', kitchenId).single();
    if (!kitchen || kitchen.owner_id !== userId) return json(403, { error: 'not your kitchen' });

    // Reuse the kitchen's connected account, or create one.
    let acctId: string;
    const { data: existing } = await db.from('stripe_accounts').select('stripe_account_id').eq('kitchen_id', kitchenId).maybeSingle();
    if (existing) {
      acctId = existing.stripe_account_id;
    } else {
      const acct = await stripe.accounts.create({ type: 'express', metadata: { kitchen_id: kitchenId } });
      acctId = acct.id;
      await db.from('stripe_accounts').insert({ kitchen_id: kitchenId, stripe_account_id: acctId });
    }

    const link = await stripe.accountLinks.create({
      account: acctId,
      refresh_url: 'preppa://connect/refresh',
      return_url: 'preppa://connect/return',
      type: 'account_onboarding',
    });

    return json(200, { url: link.url });
  } catch (_e) {
    return json(500, { error: 'Could not start payout setup. Please try again.' });
  }
});
