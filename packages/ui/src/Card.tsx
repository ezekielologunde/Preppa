import { type ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { radius, shadow, space } from '@preppa/theme';
import { useTheme } from './ThemeProvider.js';

/** Generic surface card — white on the warm canvas, subtle lift, 18px corners. */
export function Card({
  children, padding = space.s3, style, elevated = true,
}: { children: ReactNode; padding?: number; style?: ViewStyle; elevated?: boolean }) {
  const th = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: th.surface,
          borderRadius: radius.card,
          padding,
          borderWidth: th.name === 'prepper' ? 1 : 0,
          borderColor: th.border,
        },
        elevated && th.name === 'consumer' ? shadow.card : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}
