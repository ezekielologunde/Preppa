import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';

import { feedback } from '@/lib/feedback';

// Global dark-mode store (persisted). The web app applies it as a smart-invert
// on the app frame (see PhoneFrame in _layout): light surfaces flip dark,
// photos/videos are counter-inverted so food still looks like food, and the
// intentionally-dark screens (kitchen dashboard, admin) are left alone.

const KEY = 'preppa.darkmode.v1';
let dark = false;
const listeners = new Set<() => void>();

let hydrated = false;
function hydrate() {
  if (hydrated) return;
  hydrated = true;
  AsyncStorage.getItem(KEY)
    .then((v) => {
      if (v === '1') {
        dark = true;
        listeners.forEach((l) => l());
      }
    })
    .catch(() => {
      /* default light */
    });
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleDarkMode() {
  dark = !dark;
  feedback.tap();
  AsyncStorage.setItem(KEY, dark ? '1' : '0').catch(() => {
    /* non-fatal */
  });
  listeners.forEach((l) => l());
}

export function useDarkMode(): boolean {
  return useSyncExternalStore(subscribe, () => dark);
}

// Counter-invert media inside the inverted frame so photos keep true colors.
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent =
    '[data-preppadark="true"] img, [data-preppadark="true"] video { filter: invert(1) hue-rotate(180deg); }';
  document.head.appendChild(style);
}
