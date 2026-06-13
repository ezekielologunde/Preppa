import { useMemo } from 'react';

import type { Meal } from '@/components/meal-card';
import { useFavoriteKeys } from '@/lib/favorites';
import { useMyOrders } from '@/lib/queries/orders';

export type Scored = { meal: Meal; score: number; reason: string };

// Which category suits the current hour — the strongest "learned about you"
// signal even before any history exists.
function hourSlot(hour: number): { cat: string | null; label: string } {
  if (hour >= 5 && hour < 11) return { cat: 'breakfast', label: 'for breakfast' };
  if (hour >= 11 && hour < 15) return { cat: 'lunch', label: 'for lunch' };
  if (hour >= 17 && hour < 22) return { cat: 'dinner', label: 'for dinner tonight' };
  if (hour >= 22 || hour < 5) return { cat: 'desserts', label: 'for a late-night treat' };
  return { cat: 'snacks', label: 'for a snack' };
}

const CATEGORY_WORD: Record<string, string> = {
  breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', snacks: 'snacks',
  desserts: 'sweet treats', vegan: 'vegan food', healthy: 'healthy eats',
};

/** Deterministic 0–1 jitter from an id, so ordering is stable between renders. */
function jitter(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 1000;
  return h / 1000;
}

// Map Preppa dietary preference labels to meal category keys.
const DIETARY_TO_CAT: Record<string, string> = {
  vegan: 'vegan', vegetarian: 'healthy', 'gluten-free': 'healthy', keto: 'healthy',
  paleo: 'healthy', healthy: 'healthy',
};

/**
 * Rank meals for a specific person from real signals: time of day, favorited
 * categories, categories/preppers they've ordered before, and dietary preferences.
 * Returns a sorted list with a human-readable reason for the top pick.
 */
export function rankMeals(
  meals: Meal[],
  opts: {
    favKeys: string[];
    orderedMealIds: string[];
    orderedPreppers: string[];
    hour: number;
    dietaryPrefs?: string[];
    cuisinePrefs?: string[];
  },
): Scored[] {
  const { favKeys, orderedMealIds, orderedPreppers, hour, dietaryPrefs = [], cuisinePrefs = [] } = opts;
  const byId = new Map(meals.map((m) => [m.id, m]));

  const favMealIds = favKeys.filter((k) => k.startsWith('meal:')).map((k) => k.slice(5));
  const favCats = new Set(favMealIds.map((id) => byId.get(id)?.category).filter(Boolean) as string[]);
  const orderedCats = new Set(orderedMealIds.map((id) => byId.get(id)?.category).filter(Boolean) as string[]);
  const slot = hourSlot(hour);

  // Build a set of category keys implied by dietary prefs (e.g. Vegan → 'vegan')
  const prefCats = new Set(dietaryPrefs.map((d) => DIETARY_TO_CAT[d.toLowerCase()]).filter(Boolean) as string[]);
  // Lowercase cuisine terms for title-based matching
  const cuisineTerms = cuisinePrefs.map((c) => c.toLowerCase());

  const scored = meals.map((m): Scored => {
    let score = m.rating; // 0–5 quality base
    let reason = m.rating >= 4.8 ? 'a top-rated pick for you' : 'worth a try';

    if (m.category && m.category === slot.cat) { score += 3; reason = `perfect ${slot.label}`; }
    if (m.category && orderedCats.has(m.category)) { score += 2.5; reason = `more ${CATEGORY_WORD[m.category] ?? m.category} you've enjoyed`; }
    if (m.category && favCats.has(m.category)) { score += 2.2; reason = `because you love ${CATEGORY_WORD[m.category] ?? m.category}`; }
    if (orderedPreppers.includes(m.prepper)) { score += 1.6; reason = `from ${m.prepper}, who you've ordered before`; }
    if (m.badge?.label === 'popular') score += 1;

    // Dietary preference boost
    if (m.category && prefCats.has(m.category)) { score += 2.8; reason = `matches your dietary preferences`; }

    // Cuisine preference boost — title-based text match
    if (cuisineTerms.length) {
      const haystack = m.title.toLowerCase();
      if (cuisineTerms.some((c) => haystack.includes(c))) { score += 2.4; reason = `matches your cuisine preferences`; }
    }

    score += jitter(m.id) * 0.6; // tiny tiebreaker, deterministic
    return { meal: m, score, reason };
  });

  return scored.sort((a, b) => b.score - a.score);
}

/** Personalized ranking for the signed-in user — combines history, favorites, and dietary preferences. */
export function usePersonalizedMeals(meals: Meal[], userId?: string | null, userMeta?: Record<string, unknown> | null): Scored[] {
  const favKeys = useFavoriteKeys();
  const { data: orders } = useMyOrders(userId);
  return useMemo(() => {
    const orderedMealIds = (orders ?? []).map((o) => o.firstMealId).filter(Boolean) as string[];
    const orderedPreppers = [...new Set((orders ?? []).map((o) => o.prepper))];
    const hour = new Date().getHours();
    const dietaryPrefs = (userMeta?.dietary as string[] | undefined) ?? [];
    const cuisinePrefs = (userMeta?.cuisines as string[] | undefined) ?? [];
    return rankMeals(meals, { favKeys, orderedMealIds, orderedPreppers, hour, dietaryPrefs, cuisinePrefs });
  }, [meals, favKeys, orders, userMeta]);
}
