/**
 * Brand typography. Self-hosted in assets/fonts (not node_modules) so the web
 * build serves them on Vercel. Loaded in the root layout via expo-font.
 *
 * - Bricolage Grotesque: expressive display / headings
 * - Plus Jakarta Sans: clean body / UI text
 */
export const Font = {
  display: 'Bricolage-ExtraBold',
  heading: 'Bricolage-Bold',
  body: 'Jakarta-Regular',
  medium: 'Jakarta-Medium',
  semibold: 'Jakarta-SemiBold',
} as const;

/** require() map for expo-font's useFonts(). */
export const fontAssets = {
  'Bricolage-ExtraBold': require('@/assets/fonts/Bricolage-ExtraBold.ttf'),
  'Bricolage-Bold': require('@/assets/fonts/Bricolage-Bold.ttf'),
  'Jakarta-Regular': require('@/assets/fonts/Jakarta-Regular.ttf'),
  'Jakarta-Medium': require('@/assets/fonts/Jakarta-Medium.ttf'),
  'Jakarta-SemiBold': require('@/assets/fonts/Jakarta-SemiBold.ttf'),
};
