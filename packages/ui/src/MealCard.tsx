import { View, Text, Pressable } from 'react-native';
import { Clock, MapPin, Plus, ShieldCheck, Star } from 'lucide-react-native';
import { color, radius, shadow, space, typography as t } from '@preppa/theme';
import { useTheme } from './ThemeProvider.js';
import { ListingImage } from './ListingImage.js';
import { formatMoney, formatRating } from './format.js';

export interface Meal {
  id: string;
  name: string;
  priceCents: number;
  imageUri?: string | null;
  rating?: number;
  timeLabel?: string; // e.g. "Ready 5:30" / "25m"
  distanceLabel?: string; // e.g. "0.6 mi"
  kitchenName?: string;
  verified?: boolean;
}

/** Standard meal listing tile. `hero` widens the media for a featured slot. */
export function MealCard({
  meal, onPress, onAdd, hero = false,
}: { meal: Meal; onPress?: () => void; onAdd?: () => void; hero?: boolean }) {
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
      <ListingImage id={meal.id} uri={meal.imageUri} style={{ height: hero ? 180 : 132 }}>
        {meal.verified && (
          <View style={{ position: 'absolute', left: space.s2, bottom: space.s2, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(28,26,24,0.72)', paddingHorizontal: space.s2, paddingVertical: 3, borderRadius: radius.pill }}>
            <ShieldCheck size={13} color={color.leafGreen} strokeWidth={2.2} />
            <Text style={{ color: '#fff', fontSize: t.size.micro, fontWeight: t.weight.semibold, fontFamily: t.family.body }}>Verified cook</Text>
          </View>
        )}
        {onAdd != null && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Add ${meal.name}`}
            onPress={onAdd}
            style={{ position: 'absolute', right: space.s2, bottom: space.s2, width: 34, height: 34, borderRadius: radius.pill, backgroundColor: th.accent, alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus size={20} color="#fff" strokeWidth={2.4} />
          </Pressable>
        )}
      </ListingImage>

      <View style={{ padding: space.s3, gap: space.s1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: space.s2 }}>
          <Text numberOfLines={1} style={{ flex: 1, color: th.text, fontSize: t.size.title, fontFamily: t.family.display, fontWeight: t.weight.bold, letterSpacing: t.letterSpacing.tight }}>
            {meal.name}
          </Text>
          <Text style={{ color: th.text, fontSize: t.size.title, fontFamily: t.family.display, fontWeight: t.weight.extrabold }}>
            {formatMoney(meal.priceCents)}
          </Text>
        </View>
        {meal.kitchenName != null && (
          <Text numberOfLines={1} style={{ color: th.textSecondary, fontSize: t.size.label, fontFamily: t.family.body }}>
            by {meal.kitchenName}
          </Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s3, marginTop: 2 }}>
          {meal.rating != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Star size={13} color={color.amber} fill={color.amber} strokeWidth={0} />
              <Text style={metaTxt(th.textSecondary)}>{formatRating(meal.rating)}</Text>
            </View>
          )}
          {meal.timeLabel != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Clock size={13} color={th.textSecondary} strokeWidth={2} />
              <Text style={metaTxt(th.textSecondary)}>{meal.timeLabel}</Text>
            </View>
          )}
          {meal.distanceLabel != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <MapPin size={13} color={th.textSecondary} strokeWidth={2} />
              <Text style={metaTxt(th.textSecondary)}>{meal.distanceLabel}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

// Meta text uses textSecondary (AA), never the sub-3:1 muted token — the a11y fix.
const metaTxt = (c: string) => ({ color: c, fontSize: t.size.label, fontFamily: t.family.body, fontWeight: t.weight.medium });
