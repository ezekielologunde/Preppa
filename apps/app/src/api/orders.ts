import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { CreateOrderInput } from '@preppa/types';
import { supabase } from '@/lib/supabase';
import { queryClient } from '@/lib/queryClient';

export interface CreateOrderResult {
  orderId: string;
  clientSecret: string | null;
  subtotalCents?: number;
  serviceFeeCents?: number;
  tipCents?: number;
  totalCents?: number;
  reused?: boolean;
}

/**
 * Calls the create-order Edge Function. The body carries meal ids + quantities only —
 * NO amounts. The server recomputes and freezes the charge; we get back a PaymentIntent
 * client secret to confirm. `paid` status is never set from the client.
 */
export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const { data, error } = await supabase.functions.invoke('create-order', { body: input });
  if (error) {
    let msg = 'Could not place the order. Please try again.';
    try {
      const body = await (error as { context?: { json?: () => Promise<{ error?: string }> } }).context?.json?.();
      if (body?.error) msg = body.error;
    } catch {
      /* keep the generic message */
    }
    throw new Error(msg);
  }
  return data as CreateOrderResult;
}

// ── Order status (unified enum shared with the cook queue) ────────────────────
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type PayStatus = 'unpaid' | 'authorized' | 'paid' | 'refunded' | 'failed';

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  pay_status: PayStatus;
  total_cents: number;
  created_at: string;
  kitchens: { name: string } | null;
}

export interface OrderDetail extends OrderSummary {
  method: string;
  fulfillment: string;
  subtotal_cents: number;
  service_fee_cents: number;
  tip_cents: number;
  order_items: { name_snapshot: string; unit_price_cents: number; qty: number }[];
}

/** Order history — RLS returns only the caller's own orders. */
export function useMyOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<OrderSummary[]> => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, status, pay_status, total_cents, created_at, kitchens ( name )')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as OrderSummary[];
    },
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    enabled: id.length > 0,
    // Order status is live; keep it fresh and let Realtime invalidate on change.
    staleTime: 5_000,
    queryFn: async (): Promise<OrderDetail> => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, status, pay_status, method, fulfillment, subtotal_cents, service_fee_cents, tip_cents, total_cents, created_at, kitchens ( name ), order_items ( name_snapshot, unit_price_cents, qty )')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as unknown as OrderDetail;
    },
  });
}

/**
 * Live order updates. Subscribes to Realtime changes on this order (RLS-scoped to the
 * authenticated user) and invalidates the cached order + history so the tracker reflects
 * the cook advancing the status without polling.
 */
export function useOrderChannel(orderId: string) {
  useEffect(() => {
    if (!orderId) return;
    const channel = supabase
      .channel(`order:${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['order', orderId] });
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);
}
