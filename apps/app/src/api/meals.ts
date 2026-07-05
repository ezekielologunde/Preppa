import { useQuery } from '@tanstack/react-query';
import type { Meal } from '@preppa/ui';
import { supabase } from '@/lib/supabase';

/**
 * Discovery feed — live meals of verified, open kitchens. RLS already restricts what
 * comes back (public sees only orderable listings), so this is a plain select; no
 * client-side trust filtering. Shapes are mapped to the DS `Meal` type.
 *
 * (Typed loosely until `pnpm types:gen` produces packages/types/database.types.ts;
 * then the supabase client gets the `Database` generic and these casts go away.)
 */
interface MealRow {
  id: string;
  name: string;
  price_cents: number;
  image_path: string | null;
  kitchens: { id: string; name: string; verification_status: string } | null;
}

function toMeal(row: MealRow): Meal & { kitchenId: string } {
  return {
    id: row.id,
    name: row.name,
    priceCents: row.price_cents,
    imageUri: null, // resolved from storage in a later slice
    kitchenName: row.kitchens?.name,
    kitchenId: row.kitchens?.id ?? '',
    verified: row.kitchens?.verification_status === 'verified',
  };
}

export function useDiscoveryFeed() {
  return useQuery({
    queryKey: ['meals', 'discovery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meals')
        .select('id, name, price_cents, image_path, kitchens ( id, name, verification_status )')
        .eq('status', 'live')
        .limit(50);
      if (error) throw error;
      return (data as unknown as MealRow[]).map(toMeal);
    },
  });
}

export function useMeal(id: string) {
  return useQuery({
    queryKey: ['meal', id],
    enabled: id.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meals')
        .select('id, name, price_cents, image_path, description, serves, kcal, kitchens ( id, name, verification_status, cuisine, approx_area )')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as unknown as MealRow & {
        description: string | null;
        serves: number;
        kcal: number | null;
        kitchens: MealRow['kitchens'] & { cuisine: string | null; approx_area: string | null };
      };
    },
  });
}
