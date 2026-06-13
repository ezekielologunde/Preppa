import { Tabs } from 'expo-router';
import { CircleUser, Compass, House, MonitorPlay, Ticket } from 'lucide-react-native';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { feedback } from '@/lib/feedback';
import { Palette } from '@/constants/theme';

const TABS = [
  { name: 'index',       label: 'home',        Icon: House },
  { name: 'explore',     label: 'explore',     Icon: Compass },
  { name: 'feeds',       label: 'feeds',       Icon: MonitorPlay },
  { name: 'experiences', label: 'experiences', Icon: Ticket },
  { name: 'profile',     label: 'profile',     Icon: CircleUser },
] as const;

type TabBarProps = {
  state: { index: number; routes: { name: string; key: string }[] };
  navigation: { navigate: (name: string) => void };
};

function PreppaTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Only hide on web ≥768px where WebSidebar renders inside ResponsiveFrame.
  // Native tablet (iPad) keeps the bottom tab bar — no sidebar exists there.
  if (Platform.OS === 'web' && width >= 768) return null;

  return (
    <View style={{
      backgroundColor: Palette.surface,
      borderTopWidth: 1,
      borderTopColor: Palette.border,
      paddingTop: 10,
      paddingBottom: Math.max(insets.bottom, 10),
    }}>
      <View style={{ flexDirection: 'row' }}>
        {TABS.map((tab) => {
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
              style={{ flex: 1, alignItems: 'center', gap: 4 }}>

              <tab.Icon
                size={26}
                color={color}
                strokeWidth={focused ? 2.2 : 1.6}
              />

              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                style={{
                  fontFamily: focused ? Font.semibold : Font.medium,
                  fontSize: 10,
                  color,
                  letterSpacing: 0.1,
                }}>
                {tab.label}
              </Text>

              <View style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: focused ? Palette.brand : 'transparent',
              }} />
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <PreppaTabBar {...(props as unknown as TabBarProps)} />}
      backBehavior="history"
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="feeds" />
      <Tabs.Screen name="experiences" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
