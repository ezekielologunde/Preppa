import { type ReactNode } from 'react';
import { Pressable, Text, ActivityIndicator, View, type ViewStyle } from 'react-native';
import { radius, space, typography as t } from '@preppa/theme';
import { useTheme } from './ThemeProvider.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode; // leading icon
  fullWidth?: boolean;
  style?: ViewStyle;
}

const SIZES: Record<ButtonSize, { h: number; px: number; font: number }> = {
  sm: { h: 36, px: space.s3, font: t.size.label },
  md: { h: 48, px: space.s5, font: t.size.body },
  lg: { h: 56, px: space.s4, font: 16 },
};

export function Button({
  label, onPress, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon, fullWidth, style,
}: ButtonProps) {
  const th = useTheme();
  const dim = SIZES[size];
  const isDisabled = disabled || loading;

  const bg: Record<ButtonVariant, string> = {
    primary: th.accent,
    secondary: th.surfaceAlt,
    ghost: 'transparent',
    danger: '#DC2626',
  };
  const fg: Record<ButtonVariant, string> = {
    primary: '#FFFFFF',
    secondary: th.text,
    ghost: th.text,
    danger: '#FFFFFF',
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: dim.h,
          paddingHorizontal: dim.px,
          borderRadius: radius.sm,
          backgroundColor: bg[variant],
          borderWidth: variant === 'ghost' ? 1.5 : 0,
          borderColor: th.border,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: space.s2,
          opacity: isDisabled ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          transform: [{ scale: pressed && !isDisabled ? 0.97 : 1 }],
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg[variant]} />
      ) : (
        <>
          {icon != null && <View>{icon}</View>}
          <Text
            style={{
              color: fg[variant],
              fontSize: dim.font,
              fontFamily: t.family.body,
              fontWeight: t.weight.bold,
              letterSpacing: t.letterSpacing.tight,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
