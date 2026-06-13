import { Tabs } from 'expo-router';
import { CircleUser, Compass, House, MonitorPlay, Ticket } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
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

const PAD = 6; // inner padding of the pill container

function PreppaTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [pillW, setPillW] = useState(0);

  // Web ≥768px: sidebar handles navigation; don't render the tab bar.
  if (Platform.OS === 'web' && width >= 768) return null;

  const tabW = pillW > 0 ? (pillW - PAD * 2) / TABS.length : 0;
  const ai = state.index;

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: Math.max(insets.bottom, 16),
        paddingTop: 8,
        backgroundColor: 'transparent',
      }}>
      <View
        onLayout={(e) => setPillW(e.nativeEvent.layout.width)}
        style={{
          flexDirection: 'row',
          backgroundColor: Palette.surface,
          borderRadius: 36,
          padding: PAD,
          // Rich directional shadow — floats above content
          shadowColor: '#1A0A00',
          shadowOpacity: 0.14,
          shadowRadius: 30,
          shadowOffset: { width: 0, height: 12 },
          elevation: 18,
        }}>

        {/* Sliding brand slab — spring-animated under the active tab */}
        {tabW > 0 && (
          <MotiView
            animate={{ translateX: ai * tabW }}
            transition={{ type: 'spring', damping: 26, stiffness: 320, mass: 0.85 }}
            style={{
              position: 'absolute',
              top: PAD,
              left: PAD,
              width: tabW,
              bottom: PAD,
              borderRadius: 30,
              backgroundColor: Palette.brand,
            }}
          />
        )}

        {TABS.map((tab, i) => {
          const focused = i === ai;
          const iconColor = focused ? '#fff' : Palette.textSecondary;

          return (
            <PressableScale
              key={tab.name}
              onPress={() => { feedback.tap(); navigation.navigate(tab.name); }}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={tab.label}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 11,
                gap: 3,
              }}>

              <tab.Icon
                size={21}
                color={iconColor}
                strokeWidth={focused ? 2.2 : 1.6}
              />

              {/* Always rendered — transparent when inactive so height stays locked */}
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
                style={{
                  fontFamily: focused ? Font.semibold : Font.medium,
                  fontSize: 9.5,
                  letterSpacing: 0.3,
                  color: focused ? '#fff' : 'transparent',
                }}>
                {tab.label}
              </Text>
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
