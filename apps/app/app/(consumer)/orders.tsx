import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { Badge, useTheme, formatMoney, type BadgeTone } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';
import { useMyOrders, type OrderStatus, type OrderSummary } from '@/api/orders';

const STATUS: Record<OrderStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: 'awaiting payment', tone: 'warning' },
  confirmed: { label: 'confirmed', tone: 'brand' },
  preparing: { label: 'preparing', tone: 'brand' },
  ready: { label: 'ready', tone: 'success' },
  completed: { label: 'completed', tone: 'neutral' },
  cancelled: { label: 'cancelled', tone: 'danger' },
};

/** Order history — real data via RLS (only your own orders). No fabricated rows. */
export default function Orders() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { data, isLoading } = useMyOrders();

  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top + space.s3 }}>
      <Text style={{ paddingHorizontal: space.s3, color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>
        your orders
      </Text>
      <FlashList<OrderSummary>
        data={data ?? []}
        keyExtractor={(o) => o.id}
        estimatedItemSize={72}
        contentContainerStyle={{ padding: space.s3 }}
        ItemSeparatorComponent={() => <View style={{ height: space.s2 }} />}
        renderItem={({ item }) => {
          const s = STATUS[item.status];
          return (
            <Pressable
              onPress={() => router.push({ pathname: '/order/[id]', params: { id: item.id } })}
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: space.s3, backgroundColor: th.surface, borderRadius: 16, padding: space.s3, borderWidth: 1, borderColor: th.border, opacity: pressed ? 0.7 : 1 })}
            >
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ color: th.text, fontFamily: t.family.body, fontSize: t.size.body, fontWeight: t.weight.semibold }}>
                  {item.kitchens?.name ?? 'Order'}
                </Text>
                <Badge label={s.label} tone={s.tone} />
              </View>
              <Text style={{ color: th.text, fontFamily: t.family.body, fontWeight: t.weight.bold }}>{formatMoney(item.total_cents)}</Text>
              <ChevronRight size={18} color={th.textSecondary} />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator color={th.accent} style={{ marginTop: space.s6 }} />
          ) : (
            <Text style={{ textAlign: 'center', color: th.textSecondary, marginTop: space.s6, fontFamily: t.family.body, fontSize: t.size.body }}>
              No orders yet.{'\n'}Your meals will show up here.
            </Text>
          )
        }
      />
    </View>
  );
}
