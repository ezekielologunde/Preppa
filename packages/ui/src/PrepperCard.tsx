import { View, Text, Pressable } from 'react-native';
import { MapPin, ShieldCheck, Star } from 'lucide-react-native';
import { color, radius, shadow, space, typography as t } from '@preppa/theme';
import { useTheme } from './ThemeProvider.js';
import { ListingImage } from './ListingImage.js';
import { formatRating } from './format.js';

export interface Kitchen {
  id: string;
  name: string;
  cuisine?: string;
  imageUri?: string | null;
  rating?: number;
  reviews?: number;
  distanceLabel?: string;
  verified?: boolean;
  rank?: number; // e.g. top-cook ranking → "#3" badge
}

/** Kitchen listing card with an optional rank badge. */
export function PrepperCard({ kitchen, onPress }: { kitchen: Kitchen; onPress?: () => void }) {
  const th = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        { backgroundColor: th.surface, borderRadius: radius.card, overflow: 'hidden', transform: [{ scale: pressed ? 0.99 : 1 }] },
        th.name === 'consumer' ? shadow.card : { borderWidth: 1, borderColor: th.border },
      ]}
    >
      <ListingImage id={kitchen.id} uri={kitchen.imageUri} style={{ height: 110 }}>
        {kitchen.rank != null && (
          <View style={{ position: 'absolute', top: space.s2, left: space.s2, backgroundColor: th.accent, paddingHorizontal: space.s2, paddingVertical: 3, borderRadius: radius.pill }}>
            <Text style={{ color: '#fff', fontSize: t.size.micro, fontWeight: t.weight.extrabold, fontFamily: t.family.body }}>#{kitchen.rank}</Text>
          </View>
        )}
      </ListingImage>

      <View style={{ padding: space.s3, gap: space.s1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text numberOfLines={1} style={{ flex: 1, color: th.text, fontSize: t.size.title, fontFamily: t.family.display, fontWeight: t.weight.bold, letterSpacing: t.letterSpacing.tight }}>
            {kitchen.name}
          </Text>
          {kitchen.verified && <ShieldCheck size={15} color={color.success} strokeWidth={2.2} />}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s3 }}>
          {kitchen.cuisine != null && <Text style={metaTxt(th.textSecondary)}>{kitchen.cuisine}</Text>}
          {kitchen.rating != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Star size={13} color={color.amber} fill={color.amber} strokeWidth={0} />
              <Text style={metaTxt(th.textSecondary)}>
                {formatRating(kitchen.rating)}{kitchen.reviews != null ? ` (${kitchen.reviews})` : ''}
              </Text>
            </View>
          )}
          {kitchen.distanceLabel != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <MapPin size={13} color={th.textSecondary} strokeWidth={2} />
              <Text style={metaTxt(th.textSecondary)}>{kitchen.distanceLabel}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const metaTxt = (c: string) => ({ color: c, fontSize: t.size.label, fontFamily: t.family.body, fontWeight: t.weight.medium });
