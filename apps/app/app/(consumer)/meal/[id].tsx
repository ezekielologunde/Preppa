import { ScrollView, View, Text, Alert, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { ListingImage, Button, useTheme, formatMoney } from '@preppa/ui';
import { color, space, typography as t } from '@preppa/theme';
import { useMeal } from '@/api/meals';
import { useCart } from '@/store/cart';

export default function MealDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { data: meal, isLoading } = useMeal(id ?? '');
  const cart = useCart();

  if (isLoading || meal == null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: th.bg }}>
        <ActivityIndicator color={th.accent} />
      </View>
    );
  }

  const kitchen = meal.kitchens;
  const line = { mealId: meal.id, name: meal.name, priceCents: meal.price_cents };

  const add = () => {
    const kid = kitchen?.id ?? '';
    const res = cart.addItem(kid, kitchen?.name ?? '', line);
    if (res.conflict) {
      // Single-kitchen invariant: offer to replace rather than mixing cooks.
      Alert.alert(
        'Start a new cart?',
        `Your cart has items from ${cart.kitchenName}. Replace them with ${meal.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Replace', style: 'destructive', onPress: () => cart.replaceWith(kid, kitchen?.name ?? '', line) },
        ],
      );
      return;
    }
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: th.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <ListingImage id={meal.id} uri={null} style={{ height: 280 }}>
          <Pressable
            onPress={() => router.back()}
            accessibilityLabel="Back"
            style={{ position: 'absolute', top: insets.top + 8, left: space.s3, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronLeft size={22} color={color.ink} />
          </Pressable>
        </ListingImage>

        <View style={{ padding: space.s3, gap: space.s2 }}>
          <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>
            {meal.name}
          </Text>
          {kitchen != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ color: th.textSecondary, fontSize: t.size.body, fontFamily: t.family.body }}>by {kitchen.name}</Text>
              {kitchen.verification_status === 'verified' && <ShieldCheck size={15} color={color.success} strokeWidth={2.2} />}
            </View>
          )}
          {meal.description != null && (
            <Text style={{ color: th.textSecondary, fontSize: t.size.body, lineHeight: t.size.body * t.lineHeight.body, fontFamily: t.family.body, marginTop: space.s1 }}>
              {meal.description}
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: space.s3, paddingBottom: insets.bottom + space.s3, backgroundColor: th.surface, borderTopWidth: 1, borderTopColor: th.border, flexDirection: 'row', alignItems: 'center', gap: space.s3 }}>
        <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold }}>
          {formatMoney(meal.price_cents)}
        </Text>
        <Button label="Add to cart" onPress={add} fullWidth style={{ flex: 1 }} />
      </View>
    </View>
  );
}
