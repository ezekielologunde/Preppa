import { View, Text, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { radius, space, typography as t } from '@preppa/theme';
import { useTheme } from './ThemeProvider.js';

/** Quantity stepper. `sm` variant for compact list rows. */
export function Stepper({
  value, onDec, onInc, sm = false, min = 0,
}: { value: number; onDec: () => void; onInc: () => void; sm?: boolean; min?: number }) {
  const th = useTheme();
  const btn = sm ? 30 : 38;
  const icon = sm ? 15 : 18;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: th.surfaceAlt,
        borderRadius: radius.pill,
        padding: space.s1,
        gap: space.s1,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="decrease"
        onPress={onDec}
        disabled={value <= min}
        style={({ pressed }) => ({
          width: btn, height: btn, borderRadius: radius.pill,
          backgroundColor: th.surface, alignItems: 'center', justifyContent: 'center',
          opacity: value <= min ? 0.4 : pressed ? 0.7 : 1,
        })}
      >
        <Minus size={icon} color={th.text} strokeWidth={2} />
      </Pressable>
      <Text style={{ minWidth: 22, textAlign: 'center', color: th.text, fontSize: t.size.body, fontFamily: t.family.body, fontWeight: t.weight.bold }}>
        {value}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="increase"
        onPress={onInc}
        style={({ pressed }) => ({
          width: btn, height: btn, borderRadius: radius.pill,
          backgroundColor: th.surface, alignItems: 'center', justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Plus size={icon} color={th.text} strokeWidth={2} />
      </Pressable>
    </View>
  );
}
