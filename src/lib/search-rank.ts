/**
 * Search ranking engine.
 *
 * Weighted full-text search with:
 *  - Token overlap (exact and prefix match)
 *  - Positional bonus (title hit > description hit)
 *  - Fuzzy edit-distance fallback for typos
 *  - Context boosting from match signals (cuisine affinities, prior orders)
 *
 * Returns items sorted by relevance score with highlighted match spans.
 * Generic over any record type — works for meals, preppers, cuisines, etc.
 */

import type { MatchSignals } from '@/lib/match';

// ─── Tokeniser ────────────────────────────────────────────────────────────────

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

// ─── Fuzzy Scoring (Levenshtein, bounded) ─────────────────────────────────────

/**
 * Returns an edit-distance similarity in [0, 1].
 * Caps at MAX_DIST so we don't do O(n²) on long strings.
 */
const MAX_DIST = 3;

export function editSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (Math.abs(a.length - b.length) > MAX_DIST) return 0;
  const la = a.length;
  const lb = b.length;
  const dp: number[][] = Array.from({ length: la + 1 }, (_, i) => [i, ...Array(lb).fill(0)]);
  for (let j = 0; j <= lb; j++) dp[0][j] = j;
  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  const dist = dp[la][lb];
  if (dist > MAX_DIST) return 0;
  return 1 - dist / Math.max(la, lb, 1);
}

// ─── Field Weights ────────────────────────────────────────────────────────────

export type FieldSpec<T> = {
  key: keyof T;
  /** Multiplier applied to match score for this field. Higher = more important. */
  weight: number;
};

// ─── Scoring ──────────────────────────────────────────────────────────────────

export type SearchResult<T> = T & {
  _score: number;
  /** Human-readable reason for why this result ranked here. */
  _reason: string | null;
  /** The query tokens that matched. */
  _matchedTokens: string[];
};

function scoreField(queryTokens: string[], fieldValue: unknown): { score: number; matched: string[] } {
  const text = String(fieldValue ?? '').toLowerCase();
  const fieldTokens = tokenize(text);
  let score = 0;
  const matched: string[] = [];

  queryTokens.forEach((qt) => {
    // Exact prefix match (highest)
    if (fieldTokens.some((ft) => ft.startsWith(qt))) { score += 1; matched.push(qt); return; }
    // Substring match
    if (text.includes(qt)) { score += 0.8; matched.push(qt); return; }
    // Fuzzy fallback
    const best = Math.max(...fieldTokens.map((ft) => editSimilarity(qt, ft)));
    if (best > 0.7) { score += best * 0.6; matched.push(qt); }
  });

  return { score, matched };
}

/**
 * Ranks items by relevance to `query` across the specified fields.
 * Items with zero score are excluded from results.
 */
export function rankSearchResults<T extends Record<string, unknown>>(
  query: string,
  items: T[],
  fields: FieldSpec<T>[],
): SearchResult<T>[] {
  if (!query.trim()) return items.map((item) => ({ ...item, _score: 0, _reason: null, _matchedTokens: [] }));

  const queryTokens = tokenize(query);
  if (!queryTokens.length) return [];

  const scored = items.map((item): SearchResult<T> => {
    let totalScore = 0;
    const allMatched: string[] = [];

    fields.forEach(({ key, weight }) => {
      const { score, matched } = scoreField(queryTokens, item[key]);
      totalScore += score * weight;
      allMatched.push(...matched);
    });

    return {
      ...item,
      _score: totalScore,
      _reason: null,
      _matchedTokens: [...new Set(allMatched)],
    };
  });

  return scored.filter((r) => r._score > 0).sort((a, b) => b._score - a._score);
}

// ─── Context Booster ─────────────────────────────────────────────────────────

type HasCuisine = { cuisine?: string | null };
type HasName = { name?: string | null; prepper?: string | null };

/**
 * Applies a second-pass boost to search results using the user's match signals.
 * Mutates `_score` in place — call AFTER `rankSearchResults`.
 */
export function boostBySignals<T extends HasCuisine & HasName>(
  results: SearchResult<T>[],
  signals: MatchSignals,
): SearchResult<T>[] {
  return results.map((r) => {
    let boost = 0;

    // Cuisine affinity boost
    const cuisine = r.cuisine ?? '';
    signals.cuisineAffinities.forEach((affinity, name) => {
      if (cuisine.toLowerCase().includes(name.toLowerCase())) boost += affinity * 1.5;
    });

    // Previously-ordered prepper boost
    const prepperName = r.prepper ?? r.name ?? '';
    if (signals.orderedPreppers.has(prepperName)) boost += 1.2;

    // Favourited prepper boost
    const prepperKey = `prepper:${(r as any).id ?? ''}`;
    if (signals.favPrepperKeys.has(prepperKey)) boost += 0.8;

    return { ...r, _score: r._score + boost };
  }).sort((a, b) => b._score - a._score);
}

// ─── Presets ──────────────────────────────────────────────────────────────────

/** Field spec for meal search. */
export const MEAL_FIELDS = <T extends Record<string, unknown>>(): FieldSpec<T>[] => [
  { key: 'name' as keyof T, weight: 3 },
  { key: 'category' as keyof T, weight: 2 },
  { key: 'prepper' as keyof T, weight: 1.5 },
  { key: 'description' as keyof T, weight: 1 },
];

/** Field spec for prepper/kitchen search. */
export const PREPPER_FIELDS = <T extends Record<string, unknown>>(): FieldSpec<T>[] => [
  { key: 'name' as keyof T, weight: 3 },
  { key: 'cuisine' as keyof T, weight: 2.5 },
  { key: 'bio' as keyof T, weight: 1 },
  { key: 'location' as keyof T, weight: 1 },
];

/** Field spec for cuisine/category search. */
export const CUISINE_FIELDS = <T extends Record<string, unknown>>(): FieldSpec<T>[] => [
  { key: 'name' as keyof T, weight: 3 },
  { key: 'region' as keyof T, weight: 1.5 },
  { key: 'story' as keyof T, weight: 0.8 },
];

// ─── Suggestion Engine ────────────────────────────────────────────────────────

const POPULAR_QUERIES = [
  'jollof rice', 'suya', 'chicken', 'pasta', 'vegan', 'healthy bowls',
  'burger', 'pizza', 'curry', 'ramen', 'meal plan', 'breakfast',
  'lunch box', 'family pack', 'keto', 'Nigerian', 'Italian', 'Mexican',
];

/**
 * Returns autocomplete suggestions for a partial query.
 * Draws from popular queries + any prepper/meal names passed in.
 */
export function getSuggestions(partial: string, contextItems: string[] = []): string[] {
  if (partial.length < 2) return [];
  const p = partial.toLowerCase();
  const all = [...POPULAR_QUERIES, ...contextItems];
  return [...new Set(all.filter((q) => q.toLowerCase().includes(p)))].slice(0, 6);
}
