import { Pressable, Text } from 'react-native';
import { radius, space, typography as t } from '@preppa/theme';
import { useTheme } from './ThemeProvider.js';

/**
 * Category chip / filter tag. Selected uses the brand-tint fill + brand-pressed text
 * the DS specifies for active category chips; unselected is a bordered surface pill.
 */
export function Tag({
  label, selected = false, onPress,
}: { label: string; selected?: boolean; onPress?: () => void }) {
  const th = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        height: 36,
        paddingHorizontal: space.s3,
        borderRadius: radius.pill,
        justifyContent: 'center',
        backgroundColor: selected ? th.accentTint : th.surface,
        borderWidth: selected ? 0 : 1,
        borderColor: th.border,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text
        style={{
          color: selected ? th.accentText : th.textSecondary,
          fontSize: t.size.body,
          fontFamily: t.family.body,
          fontWeight: selected ? t.weight.semibold : t.weight.medium,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
