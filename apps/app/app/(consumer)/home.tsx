import { View, Text, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { MealCard, Button, useTheme, formatMoney, type Meal } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';
import { useDiscoveryFeed } from '@/api/meals';
import { useCart, cartSubtotalCents, cartCount } from '@/store/cart';

export default function Home() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError, refetch } = useDiscoveryFeed();
  const addItem = useCart((s) => s.addItem);
  const items = useCart((s) => s.items);
  const count = cartCount(items);

  const openMeal = (id: string) => router.push({ pathname: '/meal/[id]', params: { id } });

  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: space.s3, paddingVertical: space.s3 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MapPin size={16} color={th.accent} strokeWidth={2} />
          <Text style={{ color: th.textSecondary, fontSize: t.size.label, fontFamily: t.family.body, fontWeight: t.weight.semibold }}>
            Deliver to Hillcrest
          </Text>
        </View>
        <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight, marginTop: 2 }}>
          what are you craving?
        </Text>
      </View>

      <FlashList<Meal & { kitchenId: string }>
        data={data ?? []}
        keyExtractor={(m) => m.id}
        estimatedItemSize={200}
        contentContainerStyle={{ padding: space.s3 }}
        ItemSeparatorComponent={() => <View style={{ height: space.s3 }} />}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => openMeal(item.id)}
            onAdd={() => addItem(item.kitchenId, item.kitchenName ?? '', { mealId: item.id, name: item.name, priceCents: item.priceCents })}
          />
        )}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator color={th.accent} style={{ marginTop: space.s6 }} />
          ) : isError ? (
            <EmptyState title="Couldn't load meals" body="Tap to retry." onPress={() => refetch()} />
          ) : (
            <EmptyState title="No cooks open near you yet" body="Check back at the next meal window." />
          )
        }
      />

      {count > 0 && (
        <View style={{ position: 'absolute', left: space.s3, right: space.s3, bottom: space.s3 }}>
          <Button
            label={`View cart · ${count} ${count === 1 ? 'item' : 'items'} · ${formatMoney(cartSubtotalCents(items))}`}
            fullWidth
            onPress={() => router.push('/checkout')}
          />
        </View>
      )}
    </View>
  );
}

function EmptyState({ title, body, onPress }: { title: string; body: string; onPress?: () => void }) {
  const th = useTheme();
  return (
    <Text onPress={onPress} style={{ textAlign: 'center', color: th.textSecondary, marginTop: space.s6, fontFamily: t.family.body, fontSize: t.size.body }}>
      {title}
      {'\n'}
      {body}
    </Text>
  );
}
