import { Tabs } from 'expo-router';
import { Clapperboard, Compass, House, Ticket, User } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Font } from '@/constants/fonts';

const ORANGE = '#f15f22';

const TABS = [
  { name: 'index', label: 'home', Icon: House },
  { name: 'explore', label: 'explore', Icon: Compass },
  { name: 'feeds', label: 'feeds', Icon: Clapperboard },
  { name: 'experiences', label: 'experiences', Icon: Ticket },
  { name: 'profile', label: 'profile', Icon: User },
] as const;

type TabBarProps = {
  state: { index: number; routes: { name: string; key: string }[] };
  navigation: { navigate: (name: string) => void };
};

function PreppaTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  // Full-screen modes (prepper dashboard, auth) hide the customer tab bar.
  const active = state.routes[state.index]?.name;
  if (active === 'dashboard' || active === 'auth' || active === 'meal' || active === 'search' || active === 'category') return null;
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: Math.max(insets.bottom, 12),
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: -4 },
        elevation: 12,
      }}>
      {TABS.map((tab) => {
        const index = state.routes.findIndex((r) => r.name === tab.name);
        const focused = index >= 0 && state.index === index;
        const color = focused ? ORANGE : '#9ca3af';
        return (
          <Pressable
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            accessibilityRole="button"
            style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <tab.Icon size={23} color={color} strokeWidth={focused ? 2.4 : 2} />
            <Text style={{ fontFamily: Font.medium, fontSize: 11, color }}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function AppTabs() {
  return (
    <Tabs
      tabBar={(props) => <PreppaTabBar {...(props as unknown as TabBarProps)} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="feeds" />
      <Tabs.Screen name="experiences" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="dashboard" options={{ href: null }} />
      <Tabs.Screen name="auth" options={{ href: null }} />
      <Tabs.Screen name="meal" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="category" options={{ href: null }} />
    </Tabs>
  );
}
