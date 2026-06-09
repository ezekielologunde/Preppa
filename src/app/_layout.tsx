import '@/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { LoadingSplash } from '@/components/loading-splash';
import { Onboarding } from '@/components/onboarding';
import { fontAssets } from '@/constants/fonts';
import { AppProviders } from '@/providers/app-providers';

const ONBOARDED_KEY = 'preppa.onboarded.v1';

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
        {/* Navigator always mounted so routing stays valid; overlays sit on top. */}
        <AppTabs />
        {ready && !onboarded && (
          <Onboarding onGetStarted={() => goToAuth('signup')} onSignIn={() => goToAuth('signin')} />
        )}
        {!ready && <LoadingSplash />}
      </ThemeProvider>
    </AppProviders>
  );
}
