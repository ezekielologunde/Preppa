import { useQuery } from '@tanstack/react-query';

import type { Meal } from '@/components/meal-card';
import { supabase } from '@/lib/supabase';

/** Shape returned by the meals select with embedded prepper + rating + images. */
type MealRow = {
  id: string;
  title: string;
  base_price: number;
  prep_time_min: number | null;
  created_at: string | null;
  prepper: {
    display_name: string;
    verified: boolean;
    rating: { average_rating: number; total_reviews: number } | { average_rating: number; total_reviews: number }[] | null;
  } | { display_name: string; verified: boolean; rating: unknown }[] | null;
  images: { url: string }[];
  category: { key: string } | { key: string }[] | null;
};

const SELECT =
  'id,title,base_price,prep_time_min,created_at,' +
  'prepper:prepper_profiles(display_name,verified,rating:prepper_rating_summary(average_rating,total_reviews)),' +
  'images:meal_images(url),' +
  'category:meal_categories(key)';

const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

// One badge per card, mockup-style. Priority: social proof > diet > freshness
// (everything is "new" in a young catalog — popular/diet badges say more).
function deriveBadge(row: MealRow, rating?: { average_rating: number; total_reviews: number }): Meal['badge'] {
  if ((rating?.average_rating ?? 0) >= 4.85 && (rating?.total_reviews ?? 0) >= 90) return { label: 'popular', color: '#f15f22' };
  const cat = one(row.category as never) as { key: string } | undefined;
  if (cat?.key === 'healthy') return { label: 'healthy', color: '#16a34a' };
  if (cat?.key === 'vegan') return { label: 'vegan', color: '#8b5cf6' };
  const created = row.created_at ? new Date(row.created_at).getTime() : 0;
  if (created && Date.now() - created < TWO_WEEKS) return { label: 'new', color: '#22c55e' };
  return undefined;
}

function one<T>(v: T | T[] | null | undefined): T | undefined {
  return Array.isArray(v) ? v[0] : (v ?? undefined);
}

function mapMeal(row: MealRow): Meal {
  const prepper = one(row.prepper as never);
  const rating = one((prepper as { rating?: unknown } | undefined)?.rating as never) as
    | { average_rating: number; total_reviews: number }
    | undefined;
  const prep = row.prep_time_min;
  const images = (row.images ?? []).map((i) => i.url).filter(Boolean);
  const cat = one(row.category as never) as { key: string } | undefined;
  return {
    id: row.id,
    title: row.title,
    prepper: (prepper as { display_name?: string } | undefined)?.display_name ?? 'preppa',
    rating: rating?.average_rating ?? 0,
    reviews: rating?.total_reviews ?? 0,
    price: row.base_price,
    time: prep ? `${Math.max(prep - 5, 5)}–${prep + 5} min` : '20–30 min',
    image: images[0] ?? '',
    images,
    category: cat?.key ?? null,
    badge: deriveBadge(row, rating),
  };
}

/** Live published meals for the Home/Explore carousels (RLS: public read). */
export function useFeaturedMeals(limit = 10) {
  return useQuery({
    queryKey: ['meals', 'featured', limit],
    queryFn: async (): Promise<Meal[]> => {
      const { data, error } = await supabase
        .from('meals')
        .select(SELECT)
        .eq('status', 'published')
        .limit(limit);
      if (error) throw error;
      return ((data ?? []) as unknown as MealRow[]).map(mapMeal);
    },
  });
}

/** Live published meals filtered by category key (e.g. "dinner"); "all"/undefined = no filter. */
export function useMealsByCategory(categoryKey?: string, limit = 40) {
  const key = categoryKey && categoryKey !== 'all' ? categoryKey : undefined;
  return useQuery({
    queryKey: ['meals', 'category', key ?? 'all', limit],
    queryFn: async (): Promise<Meal[]> => {
      // Inner-join meal_categories so we can filter on its key; falls back to all when no key.
      const select = key
        ? SELECT.replace('category:meal_categories(key)', 'category:meal_categories!inner(key)')
        : SELECT;
      let q = supabase.from('meals').select(select).eq('status', 'published');
      if (key) q = q.eq('category.key', key);
      const { data, error } = await q.limit(limit);
      if (error) throw error;
      return ((data ?? []) as unknown as MealRow[]).map(mapMeal);
    },
  });
}

export type SearchFilters = { categoryId?: number | null; priceMin?: number | null; priceMax?: number | null };

/**
 * Search published meals by text and/or filters (RLS: public read).
 * Active with 2+ characters OR any filter — filters alone browse the catalog.
 */
export function useMealSearch(query: string, filters: SearchFilters = {}) {
  // PostgREST or() syntax breaks on commas/parens — strip them from user text.
  const q = query.trim().replace(/[,()]/g, ' ').replace(/\s+/g, ' ').trim();
  const { categoryId = null, priceMin = null, priceMax = null } = filters;
  const hasFilters = categoryId !== null || priceMin !== null || priceMax !== null;
  return useQuery({
    queryKey: ['meals', 'search', q, categoryId, priceMin, priceMax],
    enabled: q.length >= 2 || hasFilters,
    queryFn: async (): Promise<Meal[]> => {
      let req = supabase.from('meals').select(SELECT).eq('status', 'published');
      if (q.length >= 2) req = req.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
      if (categoryId !== null) req = req.eq('category_id', categoryId);
      if (priceMin !== null) req = req.gte('base_price', priceMin);
      if (priceMax !== null) req = req.lte('base_price', priceMax);
      const { data, error } = await req.limit(30);
      if (error) throw error;
      return ((data ?? []) as unknown as MealRow[]).map(mapMeal);
    },
  });
}

export type MealDetail = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  time: string;
  prepperId: string;
  prepperUserId: string | null;
  prepper: string;
  prepperVerified: boolean;
  prepperBio: string | null;
  rating: number;
  reviews: number;
  images: string[];
  nutrition: { calories: number | null; protein: number | null; carbs: number | null; fat: number | null } | null;
};

const DETAIL_SELECT =
  'id,title,description,base_price,prep_time_min,' +
  'prepper:prepper_profiles(id,user_id,display_name,verified,bio,rating:prepper_rating_summary(average_rating,total_reviews)),' +
  'images:meal_images(url,order_index),' +
  'nutrition:nutrition_profiles(calories,protein,carbs,fat)';

/** Full detail for one meal (RLS: published meals are public). */
export function useMeal(id?: string) {
  return useQuery({
    queryKey: ['meal', id],
    enabled: !!id,
    queryFn: async (): Promise<MealDetail> => {
      const { data, error } = await supabase.from('meals').select(DETAIL_SELECT).eq('id', id!).single();
      if (error) throw error;
      const row = data as unknown as Record<string, unknown>;
      const prepper = one(row.prepper as never) as
        | { id: string; user_id: string; display_name: string; verified: boolean; bio: string | null; rating: unknown }
        | undefined;
      const rating = one(prepper?.rating as never) as { average_rating: number; total_reviews: number } | undefined;
      const prep = row.prep_time_min as number | null;
      const images = ((row.images as { url: string; order_index: number }[]) ?? [])
        .sort((a, b) => a.order_index - b.order_index)
        .map((i) => i.url);
      const nutrition = one(row.nutrition as never) as MealDetail['nutrition'] | undefined;
      return {
        id: row.id as string,
        title: row.title as string,
        description: (row.description as string | null) ?? null,
        price: row.base_price as number,
        time: prep ? `${Math.max(prep - 5, 5)}–${prep + 5} min` : '20–30 min',
        prepperId: prepper?.id ?? '',
        prepperUserId: prepper?.user_id ?? null,
        prepper: prepper?.display_name ?? 'preppa',
        prepperVerified: prepper?.verified ?? false,
        prepperBio: prepper?.bio ?? null,
        rating: rating?.average_rating ?? 0,
        reviews: rating?.total_reviews ?? 0,
        images,
        nutrition: nutrition ?? null,
      };
    },
  });
}
