import '@/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider, useRouter } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { Platform, useColorScheme, useWindowDimensions, View } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { LoadingSplash } from '@/components/loading-splash';
import { Onboarding } from '@/components/onboarding';
import { fontAssets } from '@/constants/fonts';
import { AppProviders } from '@/providers/app-providers';

const ONBOARDED_KEY = 'preppa.onboarded.v1';

/**
 * On desktop web the app is a phone-class layout — let it stretch across a
 * monitor and every card's proportions break. Frame it as a centered,
 * phone-width column instead (native and small windows are untouched).
 */
function PhoneFrame({ children }: { children: ReactNode }) {
  const { width } = useWindowDimensions();
  if (Platform.OS !== 'web' || width <= 560) return <>{children}</>;
  return (
    <View style={{ flex: 1, backgroundColor: '#E9E7E4', alignItems: 'center' }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 480,
          backgroundColor: '#F7F7F8',
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 32,
          shadowOffset: { width: 0, height: 0 },
        }}>
        {children}
      </View>
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [booting, setBooting] = useState(true);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDED_KEY)
      .then((value) => setOnboarded(value === '1'))
      .catch(() => setOnboarded(false));

    // Minimum splash time so the brand moment doesn't flicker on fast loads.
    const timer = setTimeout(() => setBooting(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Font loading must never block the app — proceed on load OR error.
  const ready = !booting && onboarded !== null && (fontsLoaded || !!fontError);

  async function dismissOnboarding() {
    setOnboarded(true);
    try {
      await AsyncStorage.setItem(ONBOARDED_KEY, '1');
    } catch {
      // Non-fatal: onboarding just shows again next launch.
    }
  }

  async function goToAuth(mode: 'signin' | 'signup') {
    await dismissOnboarding();
    router.push(`/auth?mode=${mode}`);
  }

  return (
    <AppProviders>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <PhoneFrame>
          {/* Navigator always mounted so routing stays valid; overlays sit on top. */}
          <AppTabs />
          {ready && !onboarded && (
            <Onboarding onGetStarted={() => goToAuth('signup')} onSignIn={() => goToAuth('signin')} />
          )}
          {!ready && <LoadingSplash />}
        </PhoneFrame>
      </ThemeProvider>
    </AppProviders>
  );
}
