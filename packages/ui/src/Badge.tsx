import { View, Text } from 'react-native';
import { color, radius, space, typography as t } from '@preppa/theme';
import { useTheme } from './ThemeProvider.js';

export type BadgeTone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral';

const TONES: Record<BadgeTone, { bg: string; fg: string }> = {
  brand: { bg: color.brandTint, fg: color.brandPressed },
  success: { bg: color.successTint, fg: color.successDark },
  warning: { bg: color.amberTint, fg: color.amberDeep },
  danger: { bg: color.dangerTint, fg: color.dangerDeep },
  neutral: { bg: color.chip, fg: color.textSecondary },
};

/** Small status pill. Badge labels are lowercase per the DS voice (`popular`, `new`). */
export function Badge({ label, tone = 'neutral' }: { label: string; tone?: BadgeTone }) {
  const th = useTheme();
  const c = th.name === 'prepper' ? { bg: th.accentTint, fg: th.accentText } : TONES[tone];
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: c.bg,
        borderRadius: radius.pill,
        paddingHorizontal: space.s2,
        paddingVertical: space.half + 1,
      }}
    >
      <Text style={{ color: c.fg, fontSize: t.size.micro, fontFamily: t.family.body, fontWeight: t.weight.bold }}>
        {label}
      </Text>
    </View>
  );
}
