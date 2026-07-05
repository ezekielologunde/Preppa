import { Tabs } from 'expo-router';
import { Home, ClipboardList, User } from 'lucide-react-native';
import { ThemeProvider } from '@preppa/ui';
import { color, typography as t } from '@preppa/theme';

/** The warm consumer world. Its own ThemeProvider — tokens never leak to the prepper side. */
export default function ConsumerLayout() {
  return (
    <ThemeProvider name="consumer">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: color.brand,
          tabBarInactiveTintColor: color.textSecondary,
          tabBarStyle: { backgroundColor: color.surface, borderTopColor: color.border },
          tabBarLabelStyle: { fontFamily: t.family.body, fontSize: 11, fontWeight: t.weight.semibold },
        }}
      >
        <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color: c, size }) => <Home color={c} size={size} /> }} />
        <Tabs.Screen name="orders" options={{ title: 'Orders', tabBarIcon: ({ color: c, size }) => <ClipboardList color={c} size={size} /> }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color: c, size }) => <User color={c} size={size} /> }} />
        {/* Detail + preview routes live in this group but are hidden from the tab bar. */}
        <Tabs.Screen name="meal/[id]" options={{ href: null }} />
        <Tabs.Screen name="store/[kitchenId]" options={{ href: null }} />
        <Tabs.Screen name="coming-soon/plans" options={{ href: null }} />
        <Tabs.Screen name="coming-soon/experiences" options={{ href: null }} />
        <Tabs.Screen name="apply-cook" options={{ href: null }} />
        <Tabs.Screen name="checkout" options={{ href: null }} />
        <Tabs.Screen name="order/[id]" options={{ href: null }} />
      </Tabs>
    </ThemeProvider>
  );
}
