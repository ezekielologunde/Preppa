import { Tabs } from 'expo-router';
import { ChefHat, ClipboardList, Wallet } from 'lucide-react-native';
import { ThemeProvider } from '@preppa/ui';
import { color, themes, typography as t } from '@preppa/theme';

/** The dark prepper "operations tool". Separate ThemeProvider; theme is cosmetic —
 *  access is gated server-side by RLS on kitchen ownership, never by which group mounts. */
export default function PrepperLayout() {
  const dark = themes.prepper;
  return (
    <ThemeProvider name="prepper">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: color.brandLight,
          tabBarInactiveTintColor: dark.textSecondary,
          tabBarStyle: { backgroundColor: dark.surface, borderTopColor: dark.border },
          tabBarLabelStyle: { fontFamily: t.family.body, fontSize: 11, fontWeight: t.weight.semibold },
        }}
      >
        <Tabs.Screen name="hub" options={{ title: 'Hub', tabBarIcon: ({ color: c, size }) => <ChefHat color={c} size={size} /> }} />
        <Tabs.Screen name="queue" options={{ title: 'Orders', tabBarIcon: ({ color: c, size }) => <ClipboardList color={c} size={size} /> }} />
        <Tabs.Screen name="money" options={{ title: 'Money', tabBarIcon: ({ color: c, size }) => <Wallet color={c} size={size} /> }} />
        <Tabs.Screen name="menu" options={{ href: null }} />
      </Tabs>
    </ThemeProvider>
  );
}
