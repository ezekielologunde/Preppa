import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Meal } from '@/components/meal-card';
import { supabase } from '@/lib/supabase';
import type { PrepperStatus } from '@/types/database.types';

export type TopPrepper = {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  reviews: number;
  image: string;
  from: number | null;
  tags: string[];
  /** Reputation rank within the "Top kitchens" rail (1 = best). */
  rank?: number;
};

type RankedRow = {
  id: string;
  display_name: string;
  verified: boolean;
  specialties: string[] | null;
  average_rating: number | string | null;
  total_reviews: number | null;
  from_price: number | string | null;
  image_url: string | null;
  rank: number;
};

type Row = {
  id: string;
  display_name: string;
  verified: boolean;
  specialties: string[] | null;
  rating: { average_rating: number; total_reviews: number } | { average_rating: number; total_reviews: number }[] | null;
  meals: { base_price: number; images: { url: string }[] }[] | null;
};

const SELECT =
  'id,display_name,verified,specialties,' +
  'rating:prepper_rating_summary(average_rating,total_reviews),' +
  'meals(base_price,images:meal_images(url))';

function one<T>(v: T | T[] | null | undefined): T | undefined {
  return Array.isArray(v) ? v[0] : (v ?? undefined);
}

function mapPrepper(row: Row): TopPrepper {
  const rating = one(row.rating as never) as { average_rating: number; total_reviews: number } | undefined;
  const meals = row.meals ?? [];
  const prices = meals.map((m) => m.base_price).filter((p) => typeof p === 'number');
  const image = meals.flatMap((m) => m.images ?? []).map((i) => i.url)[0] ?? '';
  return {
    id: row.id,
    name: row.display_name,
    verified: row.verified,
    rating: rating?.average_rating ?? 0,
    reviews: rating?.total_reviews ?? 0,
    image,
    from: prices.length ? Math.min(...prices) : null,
    tags: row.specialties ?? [],
  };
}

export type PrepperStats = {
  completed_orders: number;
  unique_customers: number;
  repeat_customers: number;
  completion_rate: number | null;
  member_since: string | null;
};

export type PrepperProfile = {
  id: string;
  name: string;
  bio: string | null;
  avatar: string | null;
  city: string | null;
  verified: boolean;
  specialties: string[];
  priceFrom: number | null;
  delivers: boolean;
  pickup: boolean;
  rating: number;
  reviews: number;
  fiveStar: number;
  stats: PrepperStats | null;
  meals: Meal[];
};

/** A public prepper profile: identity, trust stats, and their live menu. */
export function usePrepperProfile(prepperId?: string | null) {
  return useQuery({
    queryKey: ['prepper', 'profile', prepperId ?? 'none'],
    enabled: !!prepperId,
    queryFn: async (): Promise<PrepperProfile> => {
      const [profileRes, mealsRes, statsRes] = await Promise.all([
        supabase
          .from('prepper_profiles')
          .select('id,display_name,bio,avatar_url,city,verified,specialties,price_from,delivers,pickup,rating:prepper_rating_summary(average_rating,total_reviews,five_star)')
          .eq('id', prepperId!)
          .single(),
        supabase
          .from('meals')
          .select('id,title,base_price,prep_time_min,created_at,images:meal_images(url),category:meal_categories(key)')
          .eq('prepper_id', prepperId!)
          .eq('status', 'published')
          .order('created_at', { ascending: false }),
        supabase.rpc('prepper_public_stats', { p_prepper: prepperId! }),
      ]);
      if (profileRes.error) throw profileRes.error;
      const p = profileRes.data as unknown as Record<string, unknown>;
      const rating = one(p.rating as never) as { average_rating: number; total_reviews: number; five_star: number } | undefined;
      const mealRows = (mealsRes.data ?? []) as unknown as {
        id: string; title: string; base_price: number; prep_time_min: number | null;
        images: { url: string }[] | null; category: { key: string } | { key: string }[] | null;
      }[];
      const meals: Meal[] = mealRows.map((m) => {
        const imgs = (m.images ?? []).map((i) => i.url).filter(Boolean);
        const cat = one(m.category as never) as { key: string } | undefined;
        return {
          id: m.id,
          title: m.title,
          prepper: (p.display_name as string) ?? 'preppa',
          rating: rating?.average_rating ?? 0,
          reviews: rating?.total_reviews ?? 0,
          price: m.base_price,
          time: m.prep_time_min ? `${Math.max(m.prep_time_min - 5, 5)}–${m.prep_time_min + 5} min` : '20–30 min',
          image: imgs[0] ?? '',
          images: imgs,
          category: cat?.key ?? null,
        };
      });
      return {
        id: p.id as string,
        name: (p.display_name as string) ?? 'preppa',
        bio: (p.bio as string | null) ?? null,
        avatar: (p.avatar_url as string | null) ?? null,
        city: (p.city as string | null) ?? null,
        verified: !!p.verified,
        specialties: (p.specialties as string[] | null) ?? [],
        priceFrom: (p.price_from as number | null) ?? null,
        delivers: !!p.delivers,
        pickup: !!p.pickup,
        rating: rating?.average_rating ?? 0,
        reviews: rating?.total_reviews ?? 0,
        fiveStar: rating?.five_star ?? 0,
        stats: (statsRes.data as PrepperStats) ?? null,
        meals,
      };
    },
  });
}

/** Verified preppers with their rating + a sample meal image / starting price. */
export function useTopPreppers(limit = 10) {
  return useQuery({
    queryKey: ['preppers', 'top', limit],
    queryFn: async (): Promise<TopPrepper[]> => {
      // Reputation-ranked (Bayesian rating + order volume + repeat-buyer rate).
      const { data, error } = await supabase.rpc('top_preppers_ranked', { p_limit: limit });
      if (error) throw error;
      return ((data ?? []) as unknown as RankedRow[]).map((r) => ({
        id: r.id,
        name: r.display_name,
        verified: r.verified,
        rating: Number(r.average_rating ?? 0),
        reviews: r.total_reviews ?? 0,
        image: r.image_url ?? '',
        from: r.from_price != null ? Number(r.from_price) : null,
        tags: r.specialties ?? [],
        rank: r.rank,
      }));
    },
  });
}

/** Search approved preppers by name or specialty (public read). */
export function usePrepperSearch(query: string) {
  const q = query.trim().replace(/[,()]/g, ' ').replace(/\s+/g, ' ').trim();
  return useQuery({
    queryKey: ['preppers', 'search', q],
    enabled: q.length >= 2,
    queryFn: async (): Promise<TopPrepper[]> => {
      const { data, error } = await supabase
        .from('prepper_profiles')
        .select(SELECT)
        .eq('status', 'approved')
        .or(`display_name.ilike.%${q}%,specialties.cs.{${q}}`)
        .limit(12);
      if (error) throw error;
      return ((data ?? []) as unknown as Row[]).map(mapPrepper);
    },
  });
}

export type MyPrepperApplication = {
  id: string;
  display_name: string;
  bio: string | null;
  status: PrepperStatus;
  verified: boolean;
  rejection_note: string | null;
} | null;

/** The signed-in user's own prepper application (null if they haven't applied). */
export function useMyPrepperApplication(userId?: string | null) {
  return useQuery({
    queryKey: ['prepper', 'mine', userId ?? 'anon'],
    enabled: !!userId,
    queryFn: async (): Promise<MyPrepperApplication> => {
      const { data, error } = await supabase
        .from('prepper_profiles')
        .select('id,display_name,bio,status,verified,rejection_note')
        .eq('user_id', userId!)
        .maybeSingle();
      if (error) throw error;
      return (data as MyPrepperApplication) ?? null;
    },
  });
}

/** Submit a prepper application — creates a pending prepper_profiles row. */
export function useApplyAsPrepper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { userId: string; displayName: string; bio: string; specialties: string[] }) => {
      const { error } = await supabase.from('prepper_profiles').insert({
        user_id: v.userId,
        display_name: v.displayName,
        bio: v.bio || null,
        specialties: v.specialties.length ? v.specialties : null,
      });
      if (error) throw error;
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ['prepper', 'mine', v.userId] }),
  });
}
