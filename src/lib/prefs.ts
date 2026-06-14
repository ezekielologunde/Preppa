import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * A boolean preference that persists across sessions in AsyncStorage.
 * Returns [value, toggle] — the value hydrates from storage on mount and every
 * toggle writes through immediately, so a setting survives navigating away.
 */
export function usePersistedToggle(key: string, defaultValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(`pref:${key}`).then((raw) => {
      if (active && (raw === 'true' || raw === 'false')) setValue(raw === 'true');
    });
    return () => { active = false; };
  }, [key]);

  function toggle() {
    setValue((v) => {
      const next = !v;
      AsyncStorage.setItem(`pref:${key}`, String(next)).catch(() => {});
      return next;
    });
  }

  return [value, toggle];
}
