import type { ExpoConfig } from 'expo/config';

/**
 * Public config only. Secrets (service_role, Stripe secret) are NEVER here — they
 * live in Edge Function env. The app ships only the Supabase URL + anon key, read
 * from EXPO_PUBLIC_* at build time; RLS is the trust boundary.
 */
const config: ExpoConfig = {
  name: 'Preppa',
  slug: 'preppa',
  scheme: 'preppa',
  version: '0.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    backgroundColor: '#0E0E10',
    resizeMode: 'contain',
  },
  ios: { supportsTablet: false, bundleIdentifier: 'live.preppa.app' },
  android: { package: 'live.preppa.app' },
  plugins: [
    'expo-router',
    'expo-secure-store',
    ['expo-splash-screen', { backgroundColor: '#0E0E10' }],
    ['@stripe/stripe-react-native', { enableGooglePay: false }],
  ],
  experiments: { typedRoutes: true },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};

export default config;
