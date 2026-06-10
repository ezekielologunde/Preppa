/**
 * Brand typography. Self-hosted in assets/fonts (not node_modules) so the web
 * build serves them on Vercel. Loaded in the root layout via expo-font.
 *
 * - Bricolage Grotesque: expressive display / headings
 * - Plus Jakarta Sans: clean body / UI text
 */
import { Platform } from 'react-native';

export const Font = {
  display: 'Bricolage-ExtraBold',
  heading: 'Bricolage-Bold',
  body: 'Jakarta-Regular',
  medium: 'Jakarta-Medium',
  semibold: 'Jakarta-SemiBold',
  // Logo wordmark only. Clash Display on web (loaded via global.css); native
  // falls back to the display face until the .ttf ships in assets/fonts.
  logo: Platform.OS === 'web' ? 'Clash Display' : 'Bricolage-ExtraBold',
} as const;

/** require() map for expo-font's useFonts(). */
export const fontAssets = {
  'Bricolage-ExtraBold': require('@/assets/fonts/Bricolage-ExtraBold.ttf'),
  'Bricolage-Bold': require('@/assets/fonts/Bricolage-Bold.ttf'),
  'Jakarta-Regular': require('@/assets/fonts/Jakarta-Regular.ttf'),
  'Jakarta-Medium': require('@/assets/fonts/Jakarta-Medium.ttf'),
  'Jakarta-SemiBold': require('@/assets/fonts/Jakarta-SemiBold.ttf'),
};
