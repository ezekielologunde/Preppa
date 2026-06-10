import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Star } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { FavoriteButton } from '@/components/ui/favorite-button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';

export type Meal = {
  id: string;
  title: string;
  prepper: string;
  rating: number;
  reviews: number;
  price: number;
  time: string;
  image: string;
  badge?: { label: string; color: string };
};

/** Recommended-style meal card (image, badge, title, prepper, rating, time/price). */
export function MealCard({ meal, width = 200 }: { meal: Meal; width?: number }) {
  const router = useRouter();
  return (
    <PressableScale
      onPress={() => router.push(`/meal?id=${meal.id}`)}
      style={{ width }}
      accessibilityRole="button"
      accessibilityLabel={`${meal.title} by ${meal.prepper}, $${meal.price.toFixed(2)}`}>
      <View style={{ borderRadius: 20, overflow: 'hidden', backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 2 }}>
        <View style={{ height: 130, backgroundColor: '#FCE9DD' }}>
          <Image source={meal.image} style={{ flex: 1 }} contentFit="cover" transition={250} />
          {meal.badge ? (
            <View style={{ position: 'absolute', top: 10, left: 10, backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: meal.badge.color, marginRight: 5 }} />
              <Text style={{ fontFamily: Font.semibold, fontSize: 11, color: '#1f2937' }}>{meal.badge.label}</Text>
            </View>
          ) : null}
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <FavoriteButton id={`meal:${meal.id}`} />
          </View>
        </View>
        <View style={{ padding: 12, gap: 3 }}>
          <Text numberOfLines={1} style={{ fontFamily: Font.heading, fontSize: 15, color: '#111827' }}>{meal.title}</Text>
          <Text style={{ fontFamily: Font.body, fontSize: 12, color: '#9ca3af' }}>by {meal.prepper}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6 }}>
            <Star size={13} color="#f59e0b" fill="#f59e0b" />
            <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: '#374151' }}>{meal.rating.toFixed(1)}</Text>
            <Text style={{ fontFamily: Font.body, fontSize: 12, color: '#9ca3af', fontVariant: ['tabular-nums'] }}>· {meal.time} · ${meal.price.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </PressableScale>
  );
}
