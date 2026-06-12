import { Tabs } from 'expo-router';
import { Clapperboard, Compass, House, Ticket, User } from 'lucide-react-native';
import { MotiView } from 'moti';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { feedback } from '@/lib/feedback';
import { useFeatureFlags } from '@/lib/queries/feature-flags';
import { Palette, Shadow, TouchTarget } from '@/constants/theme';

const TABS = [
  { name: 'index',       label: 'home',    Icon: House },
  { name: 'explore',     label: 'discover', Icon: Compass },
  { name: 'feeds',       label: 'feeds',   Icon: Clapperboard, flag: 'live_feeds' },
  { name: 'experiences', label: 'events',  Icon: Ticket, flag: 'experiences' },
  { name: 'profile',     label: 'you',     Icon: User },
] as const;

type TabBarProps = {
  state: { index: number; routes: { name: string; key: string }[] };
  navigation: { navigate: (name: string) => void };
};

function PreppaTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { data: flags } = useFeatureFlags();

  const visibleTabs = TABS.filter((t) => !('flag' in t) || flags?.[t.flag] !== false);

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: Palette.surface,
        paddingTop: 8,
        paddingBottom: Math.max(insets.bottom, 12),
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        ...Shadow.navBar,
      }}>
      {visibleTabs.map((tab) => {
        const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
        const focused = routeIndex >= 0 && state.index === routeIndex;
        const color = focused ? Palette.brand : Palette.textSecondary;

        return (
          <PressableScale
            key={tab.name}
            onPress={() => { feedback.tap(); navigation.navigate(tab.name); }}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={tab.label}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: TouchTarget, gap: 3, paddingTop: 4 }}>

            <View style={{ alignItems: 'center', justifyContent: 'center', width: 52, height: 32 }}>
              <MotiView
                animate={{ opacity: focused ? 1 : 0, scale: focused ? 1 : 0.5 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 16,
                  backgroundColor: Palette.brandTint,
                }}
              />
              <tab.Icon size={22} color={color} strokeWidth={focused ? 2.4 : 1.8} />
            </View>

            <Text style={{ fontFamily: focused ? Font.semibold : Font.medium, fontSize: 11, color, letterSpacing: focused ? 0 : 0.1 }}>
              {tab.label}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <PreppaTabBar {...(props as unknown as TabBarProps)} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="feeds" />
      <Tabs.Screen name="experiences" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
