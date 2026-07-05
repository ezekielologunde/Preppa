import { useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Lock } from 'lucide-react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { Button, useTheme, formatMoney } from '@preppa/ui';
import { color, space, typography as t } from '@preppa/theme';
import { useCart, cartSubtotalCents } from '@/store/cart';
import { useSession } from '@/api/session';
import { createOrder } from '@/api/orders';

const TIPS = [0, 200, 300, 500];

/**
 * Card checkout with an EXPLICIT payment state machine. Amounts shown are display-only;
 * the create-order Edge Function recomputes and freezes the real charge server-side. The
 * order is created pending BEFORE the charge; it becomes paid only via the Stripe webhook.
 */
type Phase = 'idle' | 'creating' | 'confirming' | 'succeeded' | 'failed';

export default function Checkout() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const cart = useCart();
  const [tip, setTip] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | undefined>(undefined);
  // Stable across retries so the server dedupes rather than double-creating.
  const idempotencyKey = useRef(`${Date.now()}-${Math.random().toString(36).slice(2, 10)}`).current;

  const subtotal = cartSubtotalCents(cart.items);
  const displayTotal = subtotal + tip; // service fee is computed & shown by the server

  if (cart.items.length === 0) {
    return (
      <Centered insetTop={insets.top}>
        <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.body }}>Your cart is empty.</Text>
        <Button label="Find food" onPress={() => router.replace('/home')} />
      </Centered>
    );
  }
  if (session == null) {
    return (
      <Centered insetTop={insets.top}>
        <Text style={{ color: th.text, fontSize: t.size.title, fontFamily: t.family.display, fontWeight: t.weight.bold }}>Sign in to check out</Text>
        <Button label="Sign in" onPress={() => router.push('/sign-in')} />
      </Centered>
    );
  }

  const pay = async () => {
    setError(undefined);
    setPhase('creating');
    try {
      const res = await createOrder({
        kitchenId: cart.kitchenId!,
        items: cart.items.map((l) => ({ mealId: l.mealId, qty: l.qty })),
        fulfillment: 'pickup',
        method: 'card',
        tipCents: tip,
        idempotencyKey,
      });
      if (!res.clientSecret) throw new Error('Payment could not be started.');

      const init = await initPaymentSheet({ paymentIntentClientSecret: res.clientSecret, merchantDisplayName: 'Preppa' });
      if (init.error) throw new Error(init.error.message);

      setPhase('confirming');
      const { error: sheetErr } = await presentPaymentSheet();
      if (sheetErr) {
        // A user cancel returns to idle, not an error state.
        if (sheetErr.code === 'Canceled') { setPhase('idle'); return; }
        throw new Error(sheetErr.message);
      }

      // Success on the client only means "confirmed with Stripe" — the order becomes
      // paid when the webhook fires. Clear the cart and hand off to LIVE tracking, which
      // reflects the webhook + the cook advancing status over Realtime.
      setPhase('succeeded');
      cart.clear();
      router.replace({ pathname: '/order/[id]', params: { id: res.orderId } });
    } catch (e) {
      setPhase('failed');
      setError(e instanceof Error ? e.message : 'Payment failed. Please try again.');
    }
  };

  const busy = phase === 'creating' || phase === 'confirming';

  return (
    <View style={{ flex: 1, backgroundColor: th.bg }}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + space.s2, paddingHorizontal: space.s3, paddingBottom: 160, gap: space.s3 }}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" style={{ width: 40, height: 40, justifyContent: 'center' }}>
          <ChevronLeft size={26} color={th.text} />
        </Pressable>
        <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>
          checkout
        </Text>
        {cart.kitchenName != null && (
          <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.body }}>from {cart.kitchenName}</Text>
        )}

        {cart.items.map((l) => (
          <View key={l.mealId} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: space.s1 }}>
            <Text style={{ color: th.text, fontFamily: t.family.body, fontSize: t.size.body }}>{l.qty}× {l.name}</Text>
            <Text style={{ color: th.text, fontFamily: t.family.body, fontSize: t.size.body, fontWeight: t.weight.semibold }}>{formatMoney(l.priceCents * l.qty)}</Text>
          </View>
        ))}

        <View style={{ height: 1, backgroundColor: th.divider }} />
        <Text style={{ color: th.text, fontFamily: t.family.body, fontWeight: t.weight.semibold }}>Add a tip — 100% goes to your cook</Text>
        <View style={{ flexDirection: 'row', gap: space.s2 }}>
          {TIPS.map((amt) => (
            <Pressable
              key={amt}
              onPress={() => setTip(amt)}
              style={{ flex: 1, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: tip === amt ? th.accentTint : th.surface, borderWidth: 1, borderColor: tip === amt ? 'transparent' : th.border }}
            >
              <Text style={{ color: tip === amt ? th.accentText : th.textSecondary, fontFamily: t.family.body, fontWeight: t.weight.bold }}>
                {amt === 0 ? 'None' : formatMoney(amt)}
              </Text>
            </Pressable>
          ))}
        </View>

        {error != null && (
          <Text style={{ color: color.dangerDeep, fontFamily: t.family.body, fontSize: t.size.label }}>{error}</Text>
        )}
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: space.s3, paddingBottom: insets.bottom + space.s3, backgroundColor: th.surface, borderTopWidth: 1, borderTopColor: th.border, gap: space.s2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label }}>Subtotal + tip (fees shown at payment)</Text>
          <Text style={{ color: th.text, fontFamily: t.family.body, fontWeight: t.weight.bold }}>{formatMoney(displayTotal)}</Text>
        </View>
        <Button
          label={phase === 'creating' ? 'Starting…' : phase === 'confirming' ? 'Confirming…' : 'Pay with card'}
          icon={<Lock size={16} color="#fff" />}
          loading={busy}
          onPress={pay}
          fullWidth
        />
      </View>
    </View>
  );
}

function Centered({ children, insetTop }: { children: React.ReactNode; insetTop: number }) {
  const th = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insetTop, alignItems: 'center', justifyContent: 'center', gap: space.s3, padding: space.s4 }}>
      {children}
    </View>
  );
}
