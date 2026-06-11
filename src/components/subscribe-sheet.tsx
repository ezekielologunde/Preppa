import { Minus, Plus, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';
import { feedback } from '@/lib/feedback';
import { nextDeliveryDate, useSubscribeToPlan, type DeliveryDay, type MealPlan } from '@/lib/queries/meal-plans';

const DAYS: { key: DeliveryDay; label: string }[] = [
  { key: 'mon', label: 'Mon' }, { key: 'tue', label: 'Tue' }, { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' }, { key: 'fri', label: 'Fri' }, { key: 'sat', label: 'Sat' }, { key: 'sun', label: 'Sun' },
];

const ORANGE = Palette.brand;
const INK = Palette.ink;
const money = (n: number) => `$${n.toLocaleString('en-US')}`;

/**
 * Bottom-sheet to subscribe to a meal plan — servings + delivery-day schedule.
 * Shared by the meal-plans catalog and the kitchen storefront. Pass `plan=null`
 * to keep it closed; `userId` must be set (callers gate sign-in before opening).
 */
export function SubscribePlanSheet({ plan, userId, onClose }: { plan: MealPlan | null; userId: string; onClose: () => void }) {
  const subscribe = useSubscribeToPlan();
  const [qty, setQty] = useState(1);
  const [day, setDay] = useState<DeliveryDay>('mon');

  // Reset the form each time a new plan opens the sheet.
  useEffect(() => { if (plan) { setQty(1); setDay('mon'); } }, [plan?.id]);

  function confirm() {
    if (!plan) return;
    subscribe.mutate(
      { userId, planId: plan.id, prepperId: plan.prepper_id, planName: plan.name, frequency: plan.frequency, qty, deliveryDay: day },
      { onSuccess: () => { feedback.success(); onClose(); }, onError: () => feedback.error() },
    );
  }

  return (
    <Modal visible={!!plan} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: 'rgba(17,24,39,0.5)', justifyContent: 'flex-end' }}>
        <Pressable onPress={(e) => e.stopPropagation()} style={{ backgroundColor: '#fff', borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 34, gap: 16, alignSelf: 'center', width: '100%', maxWidth: 480 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.display, fontSize: 21, color: INK, letterSpacing: -0.4 }}>{plan?.name}</Text>
              <Text style={{ fontFamily: Font.body, fontSize: 13, color: Palette.textSecondary, marginTop: 2 }}>
                by {plan?.prepper} · {plan?.meals_per_cycle} meals / {plan?.frequency}
              </Text>
            </View>
            <PressableScale onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Palette.canvas, alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} color={INK} />
            </PressableScale>
          </View>

          {/* Servings */}
          <View style={{ gap: 8 }}>
            <Text style={{ fontFamily: Font.heading, fontSize: 14.5, color: INK }}>Servings of each meal</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <PressableScale onPress={() => setQty((q) => Math.max(1, q - 1))} accessibilityRole="button" accessibilityLabel="Fewer servings" style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Palette.canvas, alignItems: 'center', justifyContent: 'center' }}>
                <Minus size={17} color={INK} />
              </PressableScale>
              <Text style={{ fontFamily: Font.display, fontSize: 24, color: INK, minWidth: 32, textAlign: 'center', fontVariant: ['tabular-nums'] }}>{qty}</Text>
              <PressableScale onPress={() => setQty((q) => Math.min(6, q + 1))} accessibilityRole="button" accessibilityLabel="More servings" style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={17} color="#fff" />
              </PressableScale>
              <Text style={{ flex: 1, fontFamily: Font.body, fontSize: 12.5, color: Palette.textSecondary }}>
                {qty === 1 ? 'Just for you' : `Feeds ${qty} people per meal`}
              </Text>
            </View>
          </View>

          {/* Delivery day */}
          <View style={{ gap: 8 }}>
            <Text style={{ fontFamily: Font.heading, fontSize: 14.5, color: INK }}>Delivery day</Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {DAYS.map((d) => {
                const on = day === d.key;
                return (
                  <PressableScale key={d.key} onPress={() => setDay(d.key)} accessibilityRole="button" accessibilityState={{ selected: on }} accessibilityLabel={d.label}
                    style={{ flex: 1, height: 40, borderRadius: 12, backgroundColor: on ? ORANGE : Palette.canvas, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: Font.semibold, fontSize: 12.5, color: on ? '#fff' : INK }}>{d.label}</Text>
                  </PressableScale>
                );
              })}
            </View>
            <Text style={{ fontFamily: Font.body, fontSize: 12.5, color: Palette.textSecondary }}>
              First delivery {nextDeliveryDate(day).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} · renews {plan?.frequency}
            </Text>
          </View>

          {/* Confirm */}
          <PressableScale
            onPress={confirm}
            disabled={subscribe.isPending}
            accessibilityRole="button"
            accessibilityLabel="Start plan"
            style={{ height: 54, borderRadius: 16, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', opacity: subscribe.isPending ? 0.7 : 1 }}>
            {subscribe.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>
                Start plan · {money((plan?.price ?? 0) * qty)}/{plan?.frequency}
              </Text>
            )}
          </PressableScale>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
