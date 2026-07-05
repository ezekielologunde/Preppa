import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Check } from 'lucide-react-native';
import { Badge, useTheme, formatMoney } from '@preppa/ui';
import { color, space, typography as t } from '@preppa/theme';
import { useOrder, useOrderChannel, type OrderStatus } from '@/api/orders';

const STEPS: { keys: OrderStatus[]; label: string }[] = [
  { keys: ['pending', 'confirmed'], label: 'Order confirmed' },
  { keys: ['preparing'], label: 'Cook is preparing' },
  { keys: ['ready'], label: 'Ready for handoff' },
  { keys: ['completed'], label: 'Completed' },
];

function activeIndex(status: OrderStatus): number {
  if (status === 'pending' || status === 'confirmed') return 0;
  if (status === 'preparing') return 1;
  if (status === 'ready') return 2;
  if (status === 'completed') return 3;
  return -1; // cancelled
}

export default function OrderTracking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const th = useTheme();
  const insets = useSafeAreaInsets();
  useOrderChannel(id ?? '');
  const { data: order, isLoading } = useOrder(id ?? '');

  if (isLoading || order == null) {
    return (
      <View style={{ flex: 1, backgroundColor: th.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={th.accent} />
      </View>
    );
  }

  const cancelled = order.status === 'cancelled';
  const active = activeIndex(order.status);

  return (
    <View style={{ flex: 1, backgroundColor: th.bg }}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + space.s2, paddingHorizontal: space.s3, paddingBottom: space.s6, gap: space.s3 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s2 }}>
          <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/orders')} accessibilityLabel="Back" style={{ width: 40, height: 40, justifyContent: 'center' }}>
            <ChevronLeft size={26} color={th.text} />
          </Pressable>
          {!cancelled && <Badge label="live" tone="success" />}
        </View>

        <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>
          {cancelled ? 'Order cancelled' : 'Your order'}
        </Text>
        {order.kitchens != null && (
          <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.body }}>from {order.kitchens.name}</Text>
        )}

        {order.pay_status !== 'paid' && !cancelled && (
          <Text style={{ color: color.amberDeep, fontFamily: t.family.body, fontSize: t.size.label }}>
            Confirming your payment…
          </Text>
        )}

        {/* Status steps */}
        {!cancelled && (
          <View style={{ gap: 0, marginTop: space.s2 }}>
            {STEPS.map((step, i) => {
              const done = i < active;
              const current = i === active;
              const on = done || current;
              return (
                <View key={step.label} style={{ flexDirection: 'row', gap: space.s3, alignItems: 'flex-start' }}>
                  <View style={{ alignItems: 'center' }}>
                    <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: on ? th.accent : th.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
                      {done ? <Check size={16} color="#fff" strokeWidth={3} /> : <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: current ? '#fff' : th.textMuted }} />}
                    </View>
                    {i < STEPS.length - 1 && <View style={{ width: 2, height: 28, backgroundColor: done ? th.accent : th.border }} />}
                  </View>
                  <Text style={{ color: on ? th.text : th.textSecondary, fontFamily: t.family.body, fontSize: t.size.body, fontWeight: current ? t.weight.bold : t.weight.medium, paddingTop: 3 }}>
                    {step.label}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Items */}
        <View style={{ height: 1, backgroundColor: th.divider, marginTop: space.s2 }} />
        {order.order_items.map((it, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: th.text, fontFamily: t.family.body, fontSize: t.size.body }}>{it.qty}× {it.name_snapshot}</Text>
            <Text style={{ color: th.text, fontFamily: t.family.body, fontSize: t.size.body }}>{formatMoney(it.unit_price_cents * it.qty)}</Text>
          </View>
        ))}
        <Row label="Subtotal" value={formatMoney(order.subtotal_cents)} th={th} />
        <Row label="Service fee" value={formatMoney(order.service_fee_cents)} th={th} />
        {order.tip_cents > 0 && <Row label="Tip (100% to cook)" value={formatMoney(order.tip_cents)} th={th} />}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: space.s1 }}>
          <Text style={{ color: th.text, fontFamily: t.family.display, fontWeight: t.weight.extrabold, fontSize: t.size.title }}>Total</Text>
          <Text style={{ color: th.text, fontFamily: t.family.display, fontWeight: t.weight.extrabold, fontSize: t.size.title }}>{formatMoney(order.total_cents)}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Row({ label, value, th }: { label: string; value: string; th: ReturnType<typeof useTheme> }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label }}>{label}</Text>
      <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label }}>{value}</Text>
    </View>
  );
}
