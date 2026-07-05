import { createContext, useContext, type ReactNode } from 'react';
import { themes, type Theme, type ThemeName } from '@preppa/theme';

const ThemeContext = createContext<Theme>(themes.consumer);

/**
 * Provides the active theme to the subtree. The app mounts ONE provider per Expo
 * Router route group — `(consumer)` with the warm theme, `(prepper)` with the dark
 * "operations" theme — so the two worlds never leak tokens across a runtime toggle.
 *
 * IMPORTANT: theme is COSMETIC only. It is never a security boundary — access is
 * gated server-side by RLS on kitchen ownership, never by which theme is mounted.
 */
export function ThemeProvider({ name, children }: { name: ThemeName; children: ReactNode }) {
  return <ThemeContext.Provider value={themes[name]}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
