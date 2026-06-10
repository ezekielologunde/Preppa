import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import { feedback } from '@/lib/feedback';

// Tiny persistent favorites store. Keys are namespaced ("meal:<id>",
// "prepper:<id>", "cuisine:<id>") so one store serves every heart in the app.
// Module-level Set + subscribers keeps it dependency-free; AsyncStorage makes
// hearts survive reloads. Server sync can layer on later without touching the
// component API.

const KEY = 'preppa.favorites.v1';
let favorites = new Set<string>();
const listeners = new Set<() => void>();

let hydrated = false;
function hydrate() {
  if (hydrated) return;
  hydrated = true;
  AsyncStorage.getItem(KEY)
    .then((raw) => {
      if (!raw) return;
      favorites = new Set(JSON.parse(raw) as string[]);
      listeners.forEach((l) => l());
    })
    .catch(() => {
      /* first run / storage unavailable — start empty */
    });
}

function persist() {
  AsyncStorage.setItem(KEY, JSON.stringify([...favorites])).catch(() => {
    /* non-fatal: favorites just won't survive this session */
  });
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleFavorite(key: string) {
  if (favorites.has(key)) {
    favorites = new Set(favorites);
    favorites.delete(key);
    feedback.tap();
  } else {
    favorites = new Set(favorites);
    favorites.add(key);
    feedback.success();
  }
  persist();
  listeners.forEach((l) => l());
}

/** Is this item hearted? Re-renders on toggle from anywhere in the app. */
export function useFavorite(key: string): boolean {
  return useSyncExternalStore(subscribe, () => favorites.has(key));
}

// Cached array snapshot — recomputed only when the favorites Set is replaced,
// so useSyncExternalStore gets a stable reference between unrelated renders.
let snapSource: Set<string> | null = null;
let snapKeys: string[] = [];
function favoriteKeysSnapshot(): string[] {
  if (snapSource !== favorites) {
    snapSource = favorites;
    snapKeys = [...favorites];
  }
  return snapKeys;
}

/** All favorited keys (e.g. "meal:<id>"), live. */
export function useFavoriteKeys(): string[] {
  return useSyncExternalStore(subscribe, favoriteKeysSnapshot);
}

/** Live count of favorites with the given namespace prefix (e.g. "meal:"). */
export function useFavoritesCount(prefix = ''): number {
  return useSyncExternalStore(subscribe, () => {
    let n = 0;
    favorites.forEach((k) => {
      if (k.startsWith(prefix)) n++;
    });
    return n;
  });
}
