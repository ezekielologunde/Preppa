import { type ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientFor } from '@preppa/theme';

/**
 * Food imagery is the app's primary visual. When a real photo exists it fills the
 * frame; otherwise a DETERMINISTIC gradient (keyed by the item id) stands in — the DS
 * forbids a static placeholder that could be mistaken for a real dish.
 */
export function ListingImage({
  id, uri, style, radius = 0, children,
}: { id: string; uri?: string | null; style?: ViewStyle; radius?: number; children?: ReactNode }) {
  const [start, end] = gradientFor(id);
  return (
    <View style={[{ borderRadius: radius, overflow: 'hidden' }, style]}>
      {uri ? (
        <Image source={{ uri }} style={{ flex: 1 }} contentFit="cover" transition={200} />
      ) : (
        <LinearGradient colors={[start, end]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
      )}
      {children}
    </View>
  );
}
