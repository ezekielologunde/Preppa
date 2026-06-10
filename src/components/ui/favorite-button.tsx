import { Heart } from 'lucide-react-native';
import { MotiView } from 'moti';
import { Pressable } from 'react-native';

import { toggleFavorite, useFavorite } from '@/lib/favorites';

/**
 * The heart that lives on every card. Persistent (favorites store), springs
 * when toggled, and stops touch propagation so hearting never opens the card.
 */
export function FavoriteButton({ id, size = 30 }: { id: string; size?: number }) {
  const on = useFavorite(id);
  return (
    <Pressable
      onPress={(e) => {
        e.stopPropagation();
        toggleFavorite(id);
      }}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      accessibilityLabel={on ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: 'rgba(255,255,255,0.92)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MotiView
        key={on ? 'on' : 'off'}
        from={{ scale: on ? 0.6 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 260 }}>
        <Heart size={size * 0.53} color={on ? '#ef4444' : '#9ca3af'} fill={on ? '#ef4444' : 'transparent'} />
      </MotiView>
    </Pressable>
  );
}
