import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryClient } from '@/lib/queryClient';

export interface ConnectStatus { payouts_enabled: boolean }

/** Whether the cook's connected account can receive payouts (RLS: own kitchen only). */
export function useConnectStatus(kitchenId: string | undefined) {
  return useQuery({
    queryKey: ['connect', kitchenId],
    enabled: kitchenId != null,
    queryFn: async (): Promise<ConnectStatus | null> => {
      const { data, error } = await supabase.from('stripe_accounts').select('payouts_enabled').eq('kitchen_id', kitchenId!).maybeSingle();
      if (error) throw error;
      return (data as ConnectStatus) ?? null;
    },
  });
}

async function parseFnError(error: unknown): Promise<string> {
  try {
    const body = await (error as { context?: { json?: () => Promise<{ error?: string }> } }).context?.json?.();
    if (body?.error) return body.error;
  } catch {
    /* fall through */
  }
  return 'Something went wrong. Please try again.';
}

/** Returns a hosted Stripe onboarding URL to open in a browser. */
export async function startConnectOnboarding(kitchenId: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('connect-onboard', { body: { kitchenId } });
  if (error) throw new Error(await parseFnError(error));
  return (data as { url: string }).url;
}

/** Cash out the settled balance. Amount is server-derived; we just trigger it. */
export async function cashOut(kitchenId: string): Promise<{ amountCents: number }> {
  const { data, error } = await supabase.functions.invoke('connect-payout', { body: { kitchenId } });
  if (error) throw new Error(await parseFnError(error));
  await queryClient.invalidateQueries({ queryKey: ['earnings'] });
  await queryClient.invalidateQueries({ queryKey: ['connect'] });
  return data as { amountCents: number };
}
