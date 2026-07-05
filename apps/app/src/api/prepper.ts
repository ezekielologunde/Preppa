import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryClient } from '@/lib/queryClient';
import type { OrderStatus } from '@/api/orders';

export interface MyKitchen {
  id: string;
  name: string;
  availability: 'open' | 'paused';
  verification_status: string;
  cod_enabled: boolean;
}

/** The signed-in cook's own kitchen (RLS returns own regardless of verification). */
export function useMyKitchen(userId: string | undefined) {
  return useQuery({
    queryKey: ['myKitchen', userId],
    enabled: userId != null,
    queryFn: async (): Promise<MyKitchen | null> => {
      const { data, error } = await supabase
        .from('kitchens')
        .select('id, name, availability, verification_status, cod_enabled')
        .eq('owner_id', userId!)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as MyKitchen) ?? null;
    },
  });
}

export interface QueueOrder {
  id: string;
  status: OrderStatus;
  total_cents: number;
  created_at: string;
  order_items: { name_snapshot: string; qty: number }[];
}

/** Active queue: confirmed → preparing → ready (completed/cancelled drop off). */
export function useKitchenQueue(kitchenId: string | undefined) {
  return useQuery({
    queryKey: ['queue', kitchenId],
    enabled: kitchenId != null,
    staleTime: 5_000,
    queryFn: async (): Promise<QueueOrder[]> => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, status, total_cents, created_at, order_items ( name_snapshot, qty )')
        .eq('kitchen_id', kitchenId!)
        .in('status', ['confirmed', 'preparing', 'ready'])
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data as unknown as QueueOrder[];
    },
  });
}

export interface Earnings { todayCents: number; weekCents: number; lifetimeCents: number; availableCents: number; ordersToday: number }

export function useEarnings(kitchenId: string | undefined) {
  return useQuery({
    queryKey: ['earnings', kitchenId],
    enabled: kitchenId != null,
    queryFn: async (): Promise<Earnings> => {
      const { data, error } = await supabase.rpc('kitchen_earnings_summary', { p_kitchen: kitchenId! });
      if (error) throw error;
      return data as Earnings;
    },
  });
}

export type MealStatus = 'live' | 'paused' | 'sold_out';
export interface MyMeal { id: string; name: string; price_cents: number; status: MealStatus }

export function useMyMeals(kitchenId: string | undefined) {
  return useQuery({
    queryKey: ['myMeals', kitchenId],
    enabled: kitchenId != null,
    queryFn: async (): Promise<MyMeal[]> => {
      const { data, error } = await supabase
        .from('meals').select('id, name, price_cents, status').eq('kitchen_id', kitchenId!).order('created_at', { ascending: true });
      if (error) throw error;
      return data as unknown as MyMeal[];
    },
  });
}

/** Live queue updates for this kitchen (RLS-scoped to the owner via Realtime). */
export function useKitchenChannel(kitchenId: string | undefined) {
  useEffect(() => {
    if (!kitchenId) return;
    const channel = supabase
      .channel(`kitchen:${kitchenId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `kitchen_id=eq.${kitchenId}` }, () => {
        queryClient.invalidateQueries({ queryKey: ['queue', kitchenId] });
        queryClient.invalidateQueries({ queryKey: ['earnings', kitchenId] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [kitchenId]);
}

// ── Mutations — status transitions are enforced server-side by the RPCs ──────────
async function refreshOps() {
  await queryClient.invalidateQueries({ queryKey: ['queue'] });
  await queryClient.invalidateQueries({ queryKey: ['earnings'] });
  await queryClient.invalidateQueries({ queryKey: ['order'] });
}

/** Advance an order along the legal state machine (server-validated). */
export async function advanceOrder(orderId: string, to: OrderStatus) {
  const { error } = await supabase.rpc('advance_order_status', { p_order: orderId, p_to: to });
  if (error) throw new Error(error.message);
  await refreshOps();
}

/** Decline a NEW order — a distinct path that can only cancel, never accept. */
export async function declineOrder(orderId: string) {
  const { error } = await supabase.rpc('decline_order', { p_order: orderId });
  if (error) throw new Error(error.message);
  await refreshOps();
}

export async function setAvailability(kitchenId: string, open: boolean) {
  const { error } = await supabase.from('kitchens').update({ availability: open ? 'open' : 'paused' }).eq('id', kitchenId);
  if (error) throw new Error(error.message);
  await queryClient.invalidateQueries({ queryKey: ['myKitchen'] });
}

export async function setMealStatus(mealId: string, status: MealStatus) {
  const { error } = await supabase.from('meals').update({ status }).eq('id', mealId);
  if (error) throw new Error(error.message);
  await queryClient.invalidateQueries({ queryKey: ['myMeals'] });
}
