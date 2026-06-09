import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Check, ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';
import { useCart, usePlaceOrder, useUpdateCartItem } from '@/lib/queries/cart';
import { useAuth } from '@/providers/auth-provider';

const ORANGE = Palette.brand;
const INK = Palette.ink;
const money = (n: number) => `$${n.toFixed(2)}`;

export default function CartScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: cart, isLoading } = useCart(user?.id);
  const updateItem = useUpdateCartItem(user?.id);
  const placeOrder = usePlaceOrder();
  const [placed, setPlaced] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }

  function checkout() {
    if (!user) return router.push('/auth?mode=signin');
    setErr(null);
    placeOrder.mutate(
      { userId: user.id },
      { onSuccess: () => setPlaced(true), onError: (e) => setErr(e instanceof Error ? e.message : 'Could not place order.') },
    );
  }

  const subtotal = cart?.subtotal ?? 0;
  const total = subtotal; // create_order charges subtotal (+ tip); fees/tax layer on at confirmation

  // Order-placed confirmation
  if (placed) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 14 }}>
          <View style={{ width: 76, height: 76, borderRadius: 24, backgroundColor: Palette.success + '1F', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={36} color={Palette.success} strokeWidth={3} />
          </View>
          <Text style={{ fontFamily: Font.display, fontSize: 24, color: INK, textAlign: 'center' }}>Order placed!</Text>
          <Text style={{ fontFamily: Font.body, fontSize: 15, color: Palette.textSecondary, textAlign: 'center', lineHeight: 22, maxWidth: 300 }}>
            Your order is in. The prepper will confirm shortly — track it in your orders.
          </Text>
          <PressableScale onPress={() => router.replace('/orders')} accessibilityRole="button" accessibilityLabel="Track your order" style={{ marginTop: 6, paddingHorizontal: 24, height: 52, borderRadius: Radius.sm, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>Track your order</Text>
          </PressableScale>
          <PressableScale onPress={() => router.replace('/')} accessibilityRole="button" accessibilityLabel="Back to home" style={{ paddingHorizontal: 24, height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: Font.semibold, fontSize: 15, color: Palette.textSecondary }}>Back to home</Text>
          </PressableScale>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}>
          <PressableScale onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={22} color={INK} />
          </PressableScale>
          <Text style={{ fontFamily: Font.display, fontSize: 24, color: INK, letterSpacing: -0.6 }}>your cart</Text>
        </View>

        {!user ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
            <ShoppingBag size={28} color={Palette.textMuted} />
            <Text style={{ fontFamily: Font.body, fontSize: 14, color: Palette.textSecondary, textAlign: 'center' }}>Sign in to start an order.</Text>
            <PressableScale onPress={() => router.push('/auth?mode=signin')} accessibilityRole="button" accessibilityLabel="Sign in" style={{ marginTop: 4, paddingHorizontal: 22, height: 48, borderRadius: Radius.sm, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 15, color: '#fff' }}>Sign in</Text>
            </PressableScale>
          </View>
        ) : isLoading ? (
          <ActivityIndicator color={ORANGE} style={{ marginTop: 40 }} />
        ) : !cart?.items.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 10 }}>
            <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={28} color={Palette.textMuted} />
            </View>
            <Text style={{ fontFamily: Font.heading, fontSize: 16, color: INK }}>Your cart is empty</Text>
            <PressableScale onPress={() => router.replace('/explore')} accessibilityRole="button" accessibilityLabel="Browse meals" style={{ marginTop: 4, paddingHorizontal: 22, height: 48, borderRadius: Radius.sm, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 15, color: '#fff' }}>Browse meals</Text>
            </PressableScale>
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 20 }}>
              {cart.items.map((it) => (
                <View key={it.id} style={{ backgroundColor: '#fff', borderRadius: Radius.md, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  {it.image ? <Image source={it.image} style={{ width: 64, height: 64, borderRadius: 12 }} contentFit="cover" /> : <View style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: Palette.canvas }} />}
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: Font.heading, fontSize: 15, color: INK }} numberOfLines={1}>{it.title}</Text>
                    <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textSecondary, marginTop: 1 }}>by {it.prepper}</Text>
                    <Text style={{ fontFamily: Font.display, fontSize: 16, color: ORANGE, marginTop: 4 }}>{money(it.price_snapshot)}</Text>
                  </View>
                  {/* Qty stepper */}
                  <View style={{ alignItems: 'center', gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Palette.canvas, borderRadius: Radius.pill, paddingHorizontal: 6, paddingVertical: 4 }}>
                      <PressableScale onPress={() => updateItem.mutate({ itemId: it.id, quantity: it.quantity - 1 })} accessibilityRole="button" accessibilityLabel="Decrease quantity" style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                        {it.quantity <= 1 ? <Trash2 size={14} color="#ef4444" /> : <Minus size={14} color={INK} />}
                      </PressableScale>
                      <Text style={{ fontFamily: Font.heading, fontSize: 15, color: INK, minWidth: 18, textAlign: 'center', fontVariant: ['tabular-nums'] }}>{it.quantity}</Text>
                      <PressableScale onPress={() => updateItem.mutate({ itemId: it.id, quantity: it.quantity + 1 })} accessibilityRole="button" accessibilityLabel="Increase quantity" style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={14} color="#fff" />
                      </PressableScale>
                    </View>
                  </View>
                </View>
              ))}
              {err ? <Text style={{ fontFamily: Font.medium, fontSize: 13.5, color: '#ef4444', textAlign: 'center' }}>{err}</Text> : null}
            </ScrollView>

            {/* Summary + checkout */}
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingHorizontal: 20, paddingTop: 14 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontFamily: Font.body, fontSize: 13, color: Palette.textSecondary }}>Subtotal</Text>
                <Text style={{ fontFamily: Font.medium, fontSize: 13, color: INK, fontVariant: ['tabular-nums'] }}>{money(subtotal)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                <Text style={{ fontFamily: Font.heading, fontSize: 16, color: INK }}>Total</Text>
                <Text style={{ fontFamily: Font.display, fontSize: 20, color: INK, fontVariant: ['tabular-nums'] }}>{money(total)}</Text>
              </View>
              <PressableScale onPress={checkout} disabled={placeOrder.isPending} accessibilityRole="button" accessibilityLabel="Place order"
                style={{ height: 54, borderRadius: 16, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', opacity: placeOrder.isPending ? 0.7 : 1 }}>
                {placeOrder.isPending ? <ActivityIndicator color="#fff" /> : <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>Place order · {money(total)}</Text>}
              </PressableScale>
              <Text style={{ fontFamily: Font.body, fontSize: 11, color: Palette.textMuted, textAlign: 'center', marginTop: 8 }}>
                Payment is collected when the prepper confirms.
              </Text>
            </SafeAreaView>
          </>
        )}
      </SafeAreaView>
    </View>
  );
}
