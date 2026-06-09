import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

export type CartItem = {
  id: string;
  meal_id: string;
  quantity: number;
  price_snapshot: number;
  title: string;
  image: string | null;
  prepper: string;
};

type Row = {
  id: string;
  meal_id: string;
  quantity: number;
  price_snapshot: number;
  meal: {
    title: string;
    images: { url: string }[] | null;
    prepper: { display_name: string } | { display_name: string }[] | null;
  } | null;
};

const one = <T,>(v: T | T[] | null | undefined): T | undefined => (Array.isArray(v) ? v[0] : v ?? undefined);

/** Get (or look up) the signed-in user's cart id. */
async function getCartId(userId: string): Promise<string | null> {
  const { data } = await supabase.from('carts').select('id').eq('user_id', userId).maybeSingle();
  return data?.id ?? null;
}

export type Cart = { items: CartItem[]; subtotal: number; count: number };

/** The user's cart with line items + computed subtotal. */
export function useCart(userId?: string | null) {
  return useQuery({
    queryKey: ['cart', userId ?? 'anon'],
    enabled: !!userId,
    queryFn: async (): Promise<Cart> => {
      const cartId = await getCartId(userId!);
      if (!cartId) return { items: [], subtotal: 0, count: 0 };
      const { data, error } = await supabase
        .from('cart_items')
        .select('id,meal_id,quantity,price_snapshot,meal:meals(title,images:meal_images(url),prepper:prepper_profiles(display_name))')
        .eq('cart_id', cartId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      const items: CartItem[] = ((data ?? []) as unknown as Row[]).map((r) => {
        const prepper = one(r.meal?.prepper);
        return {
          id: r.id,
          meal_id: r.meal_id,
          quantity: r.quantity,
          price_snapshot: r.price_snapshot,
          title: r.meal?.title ?? 'meal',
          image: r.meal?.images?.[0]?.url ?? null,
          prepper: prepper?.display_name ?? 'preppa',
        };
      });
      const subtotal = items.reduce((s, i) => s + i.price_snapshot * i.quantity, 0);
      const count = items.reduce((s, i) => s + i.quantity, 0);
      return { items, subtotal, count };
    },
  });
}

/** Add a meal to the cart (or bump quantity if already present). */
export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { userId: string; mealId: string; price: number; quantity?: number }) => {
      const cartId = await getCartId(v.userId);
      if (!cartId) throw new Error('No cart found for this account.');
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id,quantity')
        .eq('cart_id', cartId)
        .eq('meal_id', v.mealId)
        .maybeSingle();
      if (existing) {
        const { error } = await supabase.from('cart_items').update({ quantity: existing.quantity + (v.quantity ?? 1) }).eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('cart_items').insert({
          cart_id: cartId,
          meal_id: v.mealId,
          quantity: v.quantity ?? 1,
          price_snapshot: v.price,
        });
        if (error) throw error;
      }
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ['cart', v.userId] }),
  });
}

/** Set a line item's quantity (0 removes it). */
export function useUpdateCartItem(userId?: string | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { itemId: string; quantity: number }) => {
      if (v.quantity <= 0) {
        const { error } = await supabase.from('cart_items').delete().eq('id', v.itemId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('cart_items').update({ quantity: v.quantity }).eq('id', v.itemId);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart', userId ?? 'anon'] }),
  });
}

/** Place the order from the cart via the create_order RPC (server-priced). */
export function usePlaceOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: {
      userId: string;
      fulfillment: import('@/types/database.types').FulfillmentType;
      note?: string | null;
      tip?: number;
    }): Promise<string> => {
      const { data, error } = await supabase.rpc('create_order', {
        p_fulfillment: v.fulfillment,
        p_note: v.note ?? null,
        p_tip: v.tip ?? 0,
      });
      if (error) throw error;
      return data as string;
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['cart', v.userId] });
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
