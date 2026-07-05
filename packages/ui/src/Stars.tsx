import { View } from 'react-native';
import { Star } from 'lucide-react-native';
import { color } from '@preppa/theme';

/** Row of rating stars. `rating` (0–5) fills that many; the rest are outlined. */
export function Stars({ rating = 5, total = 5, size = 15 }: { rating?: number; total?: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <View accessibilityLabel={`${rating} out of ${total} stars`} style={{ flexDirection: 'row', gap: 2 }}>
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          size={size}
          color={color.amber}
          fill={i < filled ? color.amber : 'transparent'}
          strokeWidth={2}
        />
      ))}
    </View>
  );
}
