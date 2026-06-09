import { useQuery } from '@tanstack/react-query';

import type { Meal } from '@/components/meal-card';
import { supabase } from '@/lib/supabase';

/** Shape returned by the meals select with embedded prepper + rating + images. */
type MealRow = {
  id: string;
  title: string;
  base_price: number;
  prep_time_min: number | null;
  prepper: {
    display_name: string;
    verified: boolean;
    rating: { average_rating: number; total_reviews: number } | { average_rating: number; total_reviews: number }[] | null;
  } | { display_name: string; verified: boolean; rating: unknown }[] | null;
  images: { url: string }[];
};

const SELECT =
  'id,title,base_price,prep_time_min,' +
  'prepper:prepper_profiles(display_name,verified,rating:prepper_rating_summary(average_rating,total_reviews)),' +
  'images:meal_images(url)';

function one<T>(v: T | T[] | null | undefined): T | undefined {
  return Array.isArray(v) ? v[0] : (v ?? undefined);
}

function mapMeal(row: MealRow): Meal {
  const prepper = one(row.prepper as never);
  const rating = one((prepper as { rating?: unknown } | undefined)?.rating as never) as
    | { average_rating: number; total_reviews: number }
    | undefined;
  const prep = row.prep_time_min;
  return {
    id: row.id,
    title: row.title,
    prepper: (prepper as { display_name?: string } | undefined)?.display_name ?? 'preppa',
    rating: rating?.average_rating ?? 0,
    reviews: rating?.total_reviews ?? 0,
    price: row.base_price,
    time: prep ? `${Math.max(prep - 5, 5)}–${prep + 5} min` : '20–30 min',
    image: row.images?.[0]?.url ?? '',
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
