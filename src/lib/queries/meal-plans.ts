import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

export type MealPlan = {
  id: string;
  prepper_id: string;
  name: string;
  description: string | null;
  frequency: string;
  price: number;
  meals_per_cycle: number;
  serves: number;
  image_url: string | null;
  tags: string[] | null;
  prepper: string;
};

type Row = MealPlan & { prepper_profiles?: { display_name: string } | { display_name: string }[] | null };

/** Active meal plans for the browse catalog (live; empty until plans exist). */
export function useMealPlans() {
  return useQuery({
    queryKey: ['meal-plans', 'active'],
    queryFn: async (): Promise<MealPlan[]> => {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('id,prepper_id,name,description,frequency,price,meals_per_cycle,serves,image_url,tags,prepper_profiles(display_name)')
        .eq('active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return ((data ?? []) as unknown as Row[]).map((r) => {
        const pp = Array.isArray(r.prepper_profiles) ? r.prepper_profiles[0] : r.prepper_profiles;
        return { ...r, prepper: pp?.display_name ?? 'prepper' };
      });
    },
  });
}

export type MySubscription = {
  id: string;
  plan_name: string;
  frequency: string;
  status: string;
  next_billing_at: string | null;
  prepper: { display_name: string } | null;
};

/** The signed-in customer's meal-plan subscriptions. */
export function useMySubscriptions(userId?: string | null) {
  return useQuery({
    queryKey: ['subscriptions', 'mine', userId ?? 'anon'],
    enabled: !!userId,
    queryFn: async (): Promise<MySubscription[]> => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('id,plan_name,frequency,status,next_billing_at,prepper:prepper_profiles(display_name)')
        .eq('customer_id', userId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return ((data ?? []) as unknown as (Omit<MySubscription, 'prepper'> & { prepper: MySubscription['prepper'] | MySubscription['prepper'][] })[]).map(
        (s) => ({ ...s, prepper: Array.isArray(s.prepper) ? s.prepper[0] ?? null : s.prepper }),
      );
    },
  });
}

/** Subscribe to a meal plan (creates a subscriptions row). */
export function useSubscribeToPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { userId: string; planId: string; prepperId: string; planName: string; frequency: string }) => {
      const { error } = await supabase.from('subscriptions').insert({
        customer_id: v.userId,
        prepper_id: v.prepperId,
        plan_id: v.planId,
        plan_name: v.planName,
        frequency: v.frequency,
      });
      if (error) throw error;
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ['subscriptions', 'mine', v.userId] }),
  });
}
