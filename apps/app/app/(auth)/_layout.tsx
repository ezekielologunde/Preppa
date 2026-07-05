import { Stack } from 'expo-router';
import { ThemeProvider } from '@preppa/ui';

export default function AuthLayout() {
  // Auth screens use the warm consumer theme (onboarding paints its own dark hero).
  return (
    <ThemeProvider name="consumer">
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
