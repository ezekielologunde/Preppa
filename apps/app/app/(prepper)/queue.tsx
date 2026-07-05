import { useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Badge, formatMoney, type BadgeTone } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';
import { useSession } from '@/api/session';
import { useMyKitchen, useKitchenQueue, useKitchenChannel, advanceOrder, declineOrder, type QueueOrder } from '@/api/prepper';
import type { OrderStatus } from '@/api/orders';

const STATUS: Record<string, { label: string; tone: BadgeTone }> = {
  confirmed: { label: 'new', tone: 'brand' },
  preparing: { label: 'preparing', tone: 'warning' },
  ready: { label: 'ready', tone: 'success' },
};

export default function Queue() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const { data: kitchen } = useMyKitchen(session?.user.id);
  const kitchenId = kitchen?.id;
  useKitchenChannel(kitchenId);
  const { data: queue, isLoading } = useKitchenQueue(kitchenId);

  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top + space.s3 }}>
      <Text style={{ paddingHorizontal: space.s3, color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>
        orders
      </Text>
      <FlashList<QueueOrder>
        data={queue ?? []}
        keyExtractor={(o) => o.id}
        estimatedItemSize={140}
        contentContainerStyle={{ padding: space.s3 }}
        ItemSeparatorComponent={() => <View style={{ height: space.s2 }} />}
        renderItem={({ item }) => <OrderCard order={item} />}
        ListEmptyComponent={
          isLoading ? <ActivityIndicator color={th.accent} style={{ marginTop: space.s6 }} />
            : <Text style={{ textAlign: 'center', color: th.textSecondary, marginTop: space.s6, fontFamily: t.family.body }}>No active orders right now.</Text>
        }
      />
    </View>
  );
}

function OrderCard({ order }: { order: QueueOrder }) {
  const th = useTheme();
  const [busy, setBusy] = useState(false);
  const s = STATUS[order.status] ?? { label: order.status, tone: 'neutral' as BadgeTone };
  const itemsLabel = order.order_items.map((i) => `${i.qty}× ${i.name_snapshot}`).join(', ');

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try { await fn(); } catch (e) { Alert.alert('Could not update order', e instanceof Error ? e.message : 'Try again.'); } finally { setBusy(false); }
  };

  // Only a NEW (confirmed) order can be declined — a distinct path from accepting.
  const primary: { label: string; to: OrderStatus } | null =
    order.status === 'confirmed' ? { label: 'Start preparing', to: 'preparing' }
      : order.status === 'preparing' ? { label: 'Mark ready', to: 'ready' }
        : order.status === 'ready' ? { label: 'Complete', to: 'completed' }
          : null;

  return (
    <View style={{ backgroundColor: th.surface, borderRadius: 16, borderWidth: 1, borderColor: th.border, padding: space.s3, gap: space.s2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label }}>#{order.id.slice(0, 6)}</Text>
        <Badge label={s.label} tone={s.tone} />
      </View>
      <Text style={{ color: th.text, fontFamily: t.family.body, fontSize: t.size.body, fontWeight: t.weight.semibold }}>{itemsLabel}</Text>
      <Text style={{ color: th.text, fontFamily: t.family.display, fontWeight: t.weight.extrabold, fontSize: t.size.title }}>{formatMoney(order.total_cents)}</Text>

      <View style={{ flexDirection: 'row', gap: space.s2, marginTop: space.s1 }}>
        {order.status === 'confirmed' && (
          <ActionBtn label="Decline" onPress={() => run(() => declineOrder(order.id))} disabled={busy} th={th} ghost />
        )}
        {primary != null && (
          <ActionBtn label={primary.label} onPress={() => run(() => advanceOrder(order.id, primary.to))} disabled={busy} th={th} />
        )}
      </View>
    </View>
  );
}

function ActionBtn({ label, onPress, disabled, th, ghost = false }: { label: string; onPress: () => void; disabled: boolean; th: ReturnType<typeof useTheme>; ghost?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        flex: 1, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
        backgroundColor: ghost ? 'transparent' : th.accent,
        borderWidth: ghost ? 1.5 : 0, borderColor: th.border,
        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
      })}
    >
      <Text style={{ color: ghost ? th.text : '#fff', fontFamily: t.family.body, fontWeight: t.weight.bold, fontSize: t.size.body }}>{label}</Text>
    </Pressable>
  );
}
