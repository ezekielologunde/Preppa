import { type ReactNode } from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { color, radius, space, typography as t } from '@preppa/theme';
import { useTheme } from './ThemeProvider.js';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  icon?: ReactNode; // leading icon
  error?: string; // shows danger border + message
}

/** Text input with optional leading icon, label, and an error state. */
export function Input({ label, icon, error, ...rest }: InputProps) {
  const th = useTheme();
  const hasError = error != null && error.length > 0;
  return (
    <View style={{ gap: space.s1 }}>
      {label != null && (
        <Text style={{ color: th.textSecondary, fontSize: t.size.label, fontFamily: t.family.body, fontWeight: t.weight.semibold }}>
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.s2,
          height: 48,
          paddingHorizontal: space.s3,
          borderRadius: radius.md,
          backgroundColor: th.surface,
          borderWidth: 1.5,
          borderColor: hasError ? color.danger : th.border,
        }}
      >
        {icon}
        <TextInput
          placeholderTextColor={th.textMuted}
          style={{ flex: 1, color: th.text, fontSize: t.size.body, fontFamily: t.family.body }}
          {...rest}
        />
      </View>
      {hasError && (
        <Text style={{ color: color.dangerDeep, fontSize: t.size.label, fontFamily: t.family.body }}>{error}</Text>
      )}
    </View>
  );
}
