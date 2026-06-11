// TODO: replace with Stripe payment methods API
import { useRouter } from 'expo-router';
import { Lock, Plus, Trash2, X } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AddCardSheet,
  BRAND_CONFIG,
  CardBrand,
  CardForm,
  detectBrand,
} from '@/components/add-card-sheet';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Radius, Shadow, Spacing, Type } from '@/constants/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PaymentMethod {
  id: string;
  brand: CardBrand;
  last4: string;
  expMonth: string;
  expYear: string;
  cardholderName: string;
  isDefault: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_CARDS: PaymentMethod[] = [
  {
    id: '1',
    brand: 'visa',
    last4: '4242',
    expMonth: '12',
    expYear: '27',
    cardholderName: 'Alex Johnson',
    isDefault: true,
  },
  {
    id: '2',
    brand: 'mastercard',
    last4: '5100',
    expMonth: '08',
    expYear: '26',
    cardholderName: 'Alex Johnson',
    isDefault: false,
  },
];

// ─── Payment card item ────────────────────────────────────────────────────────

function PaymentCard({
  card,
  index,
  pendingDelete,
  onSetDefault,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
}: {
  card: PaymentMethod;
  index: number;
  pendingDelete: boolean;
  onSetDefault: () => void;
  onDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}) {
  const brand = BRAND_CONFIG[card.brand];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 280, delay: index * 40 }}>
      {pendingDelete ? (
        <View
          style={{
            backgroundColor: '#FEF2F2',
            borderRadius: Radius.md,
            padding: Spacing.three,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: Palette.danger,
          }}>
          <Text
            style={{ fontFamily: Font.medium, fontSize: Type.body, color: Palette.danger }}>
            remove this card?
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <PressableScale
              onPress={onCancelDelete}
              accessibilityRole="button"
              accessibilityLabel="Cancel remove card"
              style={{
                paddingHorizontal: 14,
                height: 44,
                borderRadius: Radius.pill,
                backgroundColor: Palette.chip,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ fontFamily: Font.medium, fontSize: Type.label, color: Palette.inkSoft }}>
                cancel
              </Text>
            </PressableScale>
            <PressableScale
              onPress={onConfirmDelete}
              accessibilityRole="button"
              accessibilityLabel="Confirm remove card"
              style={{
                paddingHorizontal: 14,
                height: 44,
                borderRadius: Radius.pill,
                backgroundColor: Palette.danger,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Font.medium,
                  fontSize: Type.label,
                  color: Palette.surface,
                }}>
                remove
              </Text>
            </PressableScale>
          </View>
        </View>
      ) : (
        <PressableScale
          onPress={card.isDefault ? undefined : onSetDefault}
          accessibilityRole="button"
          accessibilityLabel={`${brand.label} card ending ${card.last4}${card.isDefault ? ', default' : ', tap to set as default'}`}
          style={{
            backgroundColor: Palette.surface,
            borderRadius: Radius.md,
            padding: Spacing.three,
            flexDirection: 'row',
            alignItems: 'center',
            gap: Spacing.three,
            ...Shadow.card,
          }}>
          {/* Brand chip */}
          <View
            style={{
              width: 56,
              height: 40,
              borderRadius: 10,
              backgroundColor: brand.bg,
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
            <Text
              style={{
                fontFamily: Font.heading,
                fontSize: Type.micro,
                color: brand.textColor,
                letterSpacing: 0.5,
              }}>
              {brand.label.toUpperCase()}
            </Text>
          </View>

          {/* Card details */}
          <View style={{ flex: 1, gap: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text
                style={{ fontFamily: Font.heading, fontSize: Type.body, color: Palette.ink }}>
                {`•••• •••• •••• ${card.last4}`}
              </Text>
              {card.isDefault && (
                <View
                  style={{
                    paddingHorizontal: 9,
                    paddingVertical: 3,
                    borderRadius: Radius.pill,
                    backgroundColor: Palette.brandTint,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.semibold,
                      fontSize: Type.micro,
                      color: Palette.brandPressed,
                    }}>
                    default
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontFamily: Font.body,
                fontSize: Type.label,
                color: Palette.textSecondary,
              }}>
              Expires {card.expMonth}/{card.expYear}
            </Text>
          </View>

          {/* Delete */}
          <PressableScale
            onPress={onDelete}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${brand.label} card ending ${card.last4}`}
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: '#FEF2F2',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
            <Trash2 size={16} color={Palette.danger} />
          </PressableScale>
        </PressableScale>
      )}
    </MotiView>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<PaymentMethod[]>(MOCK_CARDS);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const triggerDelete = (id: string) => {
    setPendingDeleteId(id);
    setTimeout(() => setPendingDeleteId((prev) => (prev === id ? null : prev)), 3000);
  };

  const confirmDelete = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setPendingDeleteId(null);
  };

  const setDefault = (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  };

  const handleSave = (form: CardForm) => {
    const digits = form.cardNumber.replace(/\s/g, '');
    const [expMonth, expYear] = form.expiry.split('/');
    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      brand: detectBrand(digits),
      last4: digits.slice(-4),
      expMonth,
      expYear,
      cardholderName: form.cardholderName.trim(),
      isDefault: cards.length === 0,
    };
    setCards((prev) => [...prev, newCard]);
    setSheetVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Palette.canvas }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Spacing.three,
            paddingVertical: Spacing.two,
            gap: Spacing.two,
          }}>
          <PressableScale
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: Palette.surface,
              alignItems: 'center',
              justifyContent: 'center',
              ...Shadow.card,
            }}>
            <X size={18} color={Palette.ink} />
          </PressableScale>
          <Text
            style={{
              flex: 1,
              fontFamily: Font.heading,
              fontSize: Type.title,
              color: Palette.ink,
            }}>
            payment methods
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            padding: Spacing.three,
            gap: Spacing.three,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}>

          {/* Card list */}
          {cards.map((card, index) => (
            <PaymentCard
              key={card.id}
              card={card}
              index={index}
              pendingDelete={pendingDeleteId === card.id}
              onSetDefault={() => setDefault(card.id)}
              onDelete={() => triggerDelete(card.id)}
              onConfirmDelete={() => confirmDelete(card.id)}
              onCancelDelete={() => setPendingDeleteId(null)}
            />
          ))}

          {/* Add new card row */}
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 280, delay: cards.length * 40 }}>
            <PressableScale
              onPress={() => setSheetVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Add new payment card"
              style={{
                backgroundColor: Palette.surface,
                borderRadius: Radius.md,
                padding: Spacing.three,
                flexDirection: 'row',
                alignItems: 'center',
                gap: Spacing.three,
                borderWidth: 1.5,
                borderColor: Palette.border,
                borderStyle: 'dashed',
                minHeight: 68,
              }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: Palette.brandTint,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Plus size={20} color={Palette.brand} />
              </View>
              <Text
                style={{
                  fontFamily: Font.heading,
                  fontSize: Type.body,
                  color: Palette.brand,
                }}>
                add new card
              </Text>
            </PressableScale>
          </MotiView>

          {/* Security note at bottom */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              marginTop: Spacing.two,
            }}>
            <Lock size={13} color={Palette.textMuted} />
            <Text
              style={{
                fontFamily: Font.body,
                fontSize: Type.micro,
                color: Palette.textMuted,
              }}>
              Cards are secured with 256-bit encryption
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <AddCardSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}
