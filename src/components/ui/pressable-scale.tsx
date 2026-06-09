import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import { useState, type ReactNode } from 'react';
import { Platform, Pressable, type GestureResponderEvent, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

type Props = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Scale at full press. Emil: keep subtle (0.95–0.98). */
  scaleTo?: number;
  haptic?: boolean;
};

/**
 * Pressable with subtle scale-on-press feedback + selection haptic.
 * The single primitive for every tappable card/button — gives the UI the
 * "it heard me" responsiveness (Emil Kowalski's interaction craft).
 */
export function PressableScale({
  children,
  style,
  scaleTo = 0.97,
  haptic = true,
  onPress,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPressIn={(e) => {
        setPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOut?.(e);
      }}
      onPress={(e: GestureResponderEvent) => {
        if (haptic && Platform.OS !== 'web') Haptics.selectionAsync();
        onPress?.(e);
      }}
      {...rest}>
      <MotiView
        animate={{ scale: pressed ? scaleTo : 1 }}
        transition={{ type: 'timing', duration: 120 }}
        style={style}>
        {children}
      </MotiView>
    </Pressable>
  );
}
