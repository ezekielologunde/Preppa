import { Tabs } from 'expo-router';
import { CircleUser, Compass, House, MonitorPlay, Menu, Ticket, X } from 'lucide-react-native';
import { MotiView } from 'moti';
import { Platform, Text, useWindowDimensions, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { feedback } from '@/lib/feedback';
import { Palette } from '@/constants/theme';

const TABS = [
  { name: 'index',       label: 'Home',        Icon: House },
  { name: 'explore',     label: 'Explore',     Icon: Compass },
  { name: 'feeds',       label: 'Feeds',       Icon: MonitorPlay },
  { name: 'experiences', label: 'Experiences', Icon: Ticket },
  { name: 'profile',     label: 'Profile',     Icon: CircleUser },
] as const;

type TabBarProps = {
  state: { index: number; routes: { name: string; key: string }[] };
  navigation: { navigate: (name: string) => void };
};

function TabBarIcon({ tab, focused }: { tab: (typeof TABS)[number]; focused: boolean }) {
  const color = focused ? Palette.brand : Palette.textSecondary;

  return (
    <MotiView
      animate={{ scale: focused ? 1.08 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <tab.Icon
        size={24}
        color={color}
        strokeWidth={focused ? 2.2 : 1.6}
      />
    </MotiView>
  );
}

function TabBarLabel({ label, focused }: { label: string; focused: boolean }) {
  const color = focused ? Palette.brand : Palette.textSecondary;

  return (
    <Text
      numberOfLines={1}
      style={{
        fontFamily: focused ? Font.semibold : Font.medium,
        fontSize: 12,
        color,
        letterSpacing: 0.2,
      }}>
      {label}
    </Text>
  );
}

function PreppaTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (Platform.OS === 'web' && width >= 768) return null;

  // Extra small mobile (< 340px) - icon only with hamburger menu
  const isExtraSmall = width < 340;
  // Small mobile (340-480px) - vertical scrollable tabs
  const isSmall = width < 480;

  if (isExtraSmall) {
    return (
      <>
        {/* Hamburger menu for extra small screens */}
        <View style={{
          backgroundColor: Palette.surface,
          borderTopWidth: 1,
          borderTopColor: Palette.border,
          paddingBottom: Math.max(insets.bottom + 4, 16),
          paddingHorizontal: 16,
          paddingTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text style={{ fontFamily: Font.semibold, fontSize: 14, color: Palette.ink }}>Preppa</Text>
          <PressableScale
            onPress={() => { feedback.tap(); setMobileMenuOpen(!mobileMenuOpen); }}
            accessibilityRole="button"
            accessibilityLabel={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ padding: 8 }}>
            {mobileMenuOpen ? (
              <X size={24} color={Palette.ink} strokeWidth={2} />
            ) : (
              <Menu size={24} color={Palette.ink} strokeWidth={2} />
            )}
          </PressableScale>
        </View>

        {/* Dropdown menu for extra small screens */}
        {mobileMenuOpen && (
          <View style={{
            backgroundColor: Palette.canvas,
            borderTopWidth: 1,
            borderTopColor: Palette.border,
            paddingBottom: insets.bottom,
          }}>
            {TABS.map((tab) => {
              const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
              const focused = routeIndex >= 0 && state.index === routeIndex;
              const color = focused ? Palette.brand : Palette.textSecondary;

              return (
                <PressableScale
                  key={tab.name}
                  onPress={() => { feedback.tap(); navigation.navigate(tab.name); setMobileMenuOpen(false); }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: focused }}
                  accessibilityLabel={tab.label}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: Palette.border,
                  }}>
                  <tab.Icon size={22} color={color} strokeWidth={focused ? 2.2 : 1.6} />
                  <Text style={{
                    fontFamily: focused ? Font.semibold : Font.medium,
                    fontSize: 16,
                    color,
                    letterSpacing: 0.2,
                  }}>
                    {tab.label}
                  </Text>
                </PressableScale>
              );
            })}
          </View>
        )}
      </>
    );
  }

  if (isSmall) {
    // Scrollable tab bar for small screens
    return (
      <View style={{
        backgroundColor: Palette.surface,
        borderTopWidth: 1,
        borderTopColor: Palette.border,
        paddingBottom: Math.max(insets.bottom + 4, 16),
      }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
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
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 16,
                    paddingTop: 12,
                    minWidth: 100,
                    gap: 6,
                  }}>

                  <MotiView
                    animate={{ width: focused ? 28 : 0, opacity: focused ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      height: 3,
                      borderBottomLeftRadius: 2,
                      borderBottomRightRadius: 2,
                      backgroundColor: Palette.brand,
                    }}
                  />

                  <TabBarIcon tab={tab} focused={focused} />
                  <TabBarLabel label={tab.label} focused={focused} />
                </PressableScale>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  // Standard tab bar for medium+ screens
  return (
    <View style={{
      backgroundColor: Palette.surface,
      borderTopWidth: 1,
      borderTopColor: Palette.border,
      paddingBottom: Math.max(insets.bottom + 4, 16),
    }}>
      <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
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
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 12, gap: 5 }}>

              <MotiView
                animate={{ width: focused ? 28 : 0, opacity: focused ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  height: 3,
                  borderBottomLeftRadius: 2,
                  borderBottomRightRadius: 2,
                  backgroundColor: Palette.brand,
                }}
              />

              <TabBarIcon tab={tab} focused={focused} />
              <TabBarLabel label={tab.label} focused={focused} />
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
