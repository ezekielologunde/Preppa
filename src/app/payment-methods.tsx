// TODO: replace with Stripe payment methods API
import { useRouter } from 'expo-router';
import { Lock, Plus, Trash2, X } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Radius, Shadow, Spacing, Type } from '@/constants/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

type CardBrand = 'visa' | 'mastercard' | 'amex' | 'other';

interface PaymentMethod {
  id: string;
  brand: CardBrand;
  last4: string;
  expMonth: string;
  expYear: string;
  cardholderName: string;
  isDefault: boolean;
}

interface CardForm {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface CardErrors {
  cardholderName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

// ─── Brand config ─────────────────────────────────────────────────────────────

const BRAND_CONFIG: Record<CardBrand, { label: string; bg: string; textColor: string }> = {
  visa: { label: 'Visa', bg: '#1A1F71', textColor: '#FFFFFF' },
  mastercard: { label: 'Mastercard', bg: '#EB001B', textColor: '#FFFFFF' },
  amex: { label: 'Amex', bg: '#007B5E', textColor: '#FFFFFF' },
  other: { label: 'Card', bg: Palette.chip, textColor: Palette.inkSoft },
};

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

const EMPTY_FORM: CardForm = {
  cardholderName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

// ─── Luhn algorithm ───────────────────────────────────────────────────────────

function luhnCheck(digits: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function detectBrand(digits: string): CardBrand {
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  return 'other';
}

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function getCurrentYY(): number {
  return new Date().getFullYear() % 100;
}

function validateCard(form: CardForm): CardErrors {
  const errors: CardErrors = {};

  if (!/^[a-zA-Z\s\-]{2,60}$/.test(form.cardholderName.trim())) {
    errors.cardholderName = 'Enter a valid name (letters, spaces, hyphens)';
  }

  const digits = form.cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(digits)) {
    errors.cardNumber = 'Card number must be 13–19 digits';
  } else if (!luhnCheck(digits)) {
    errors.cardNumber = 'Card number is invalid';
  }

  const expiryMatch = form.expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!expiryMatch) {
    errors.expiry = 'Enter expiry as MM/YY';
  } else {
    const mm = parseInt(expiryMatch[1], 10);
    const yy = parseInt(expiryMatch[2], 10);
    if (mm < 1 || mm > 12) {
      errors.expiry = 'Month must be 01–12';
    } else if (yy < getCurrentYY()) {
      errors.expiry = 'Card has expired';
    }
  }

  if (!/^\d{3,4}$/.test(form.cvv)) {
    errors.cvv = 'CVV must be 3–4 digits';
  }

  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <Text
      style={{
        fontFamily: Font.body,
        fontSize: Type.micro,
        color: Palette.danger,
        marginTop: 4,
      }}
      accessibilityRole="alert">
      {msg}
    </Text>
  );
}

function CardFormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType,
  maxLength,
  secureTextEntry,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: 'default' | 'numeric' | 'number-pad';
  maxLength?: number;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'characters';
}) {
  return (
    <View style={{ marginBottom: Spacing.three }}>
      <Text
        style={{
          fontFamily: Font.medium,
          fontSize: Type.label,
          color: Palette.inkSoft,
          marginBottom: 6,
        }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? label}
        placeholderTextColor={Palette.textMuted}
        keyboardType={keyboardType ?? 'default'}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize ?? 'sentences'}
        accessibilityLabel={label}
        style={{
          fontFamily: Font.body,
          fontSize: Type.body,
          color: Palette.ink,
          backgroundColor: Palette.canvas,
          borderRadius: Radius.sm,
          borderWidth: 1,
          borderColor: error ? Palette.danger : Palette.border,
          paddingHorizontal: Spacing.three,
          paddingVertical: 13,
          minHeight: 44,
        }}
      />
      <FieldError msg={error} />
    </View>
  );
}

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

// ─── Add Card Sheet ───────────────────────────────────────────────────────────

function AddCardSheet({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (form: CardForm) => void;
}) {
  const [form, setForm] = useState<CardForm>({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<CardErrors>({});

  const set = (key: keyof CardForm) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleCardNumberChange = (raw: string) => {
    set('cardNumber')(formatCardNumber(raw));
    if (errors.cardNumber) setErrors((e) => ({ ...e, cardNumber: undefined }));
  };

  const handleExpiryChange = (raw: string) => {
    set('expiry')(formatExpiry(raw));
    if (errors.expiry) setErrors((e) => ({ ...e, expiry: undefined }));
  };

  const handleSave = () => {
    const errs = validateCard(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(form);
    setForm({ ...EMPTY_FORM });
    setErrors({});
  };

  const detectedBrand = detectBrand(form.cardNumber.replace(/\s/g, ''));
  const brandCfg = BRAND_CONFIG[detectedBrand];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: Palette.surface }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: Spacing.three,
              paddingVertical: Spacing.two,
              borderBottomWidth: 1,
              borderBottomColor: Palette.border,
            }}>
            <Text
              style={{ fontFamily: Font.heading, fontSize: Type.title, color: Palette.ink }}>
              add card
            </Text>
            <PressableScale
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close add card"
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: Palette.chip,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <X size={18} color={Palette.inkSoft} />
            </PressableScale>
          </View>

          <ScrollView
            contentContainerStyle={{ padding: Spacing.three, paddingBottom: Spacing.six }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            {/* Brand preview pill */}
            {form.cardNumber.replace(/\s/g, '').length >= 4 && (
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 200 }}
                style={{ marginBottom: Spacing.three }}>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: Radius.pill,
                    backgroundColor: brandCfg.bg,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.heading,
                      fontSize: Type.label,
                      color: brandCfg.textColor,
                    }}>
                    {brandCfg.label}
                  </Text>
                </View>
              </MotiView>
            )}

            <CardFormField
              label="cardholder name"
              value={form.cardholderName}
              onChangeText={(v) => {
                set('cardholderName')(v);
                if (errors.cardholderName) setErrors((e) => ({ ...e, cardholderName: undefined }));
              }}
              placeholder="Alex Johnson"
              autoCapitalize="words"
              error={errors.cardholderName}
            />

            <CardFormField
              label="card number"
              value={form.cardNumber}
              onChangeText={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              keyboardType="number-pad"
              maxLength={23}
              error={errors.cardNumber}
            />

            <View style={{ flexDirection: 'row', gap: Spacing.two }}>
              <View style={{ flex: 1 }}>
                <CardFormField
                  label="expiry"
                  value={form.expiry}
                  onChangeText={handleExpiryChange}
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                  maxLength={5}
                  error={errors.expiry}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CardFormField
                  label="CVV"
                  value={form.cvv}
                  onChangeText={(v) => {
                    set('cvv')(v.replace(/\D/g, '').slice(0, 4));
                    if (errors.cvv) setErrors((e) => ({ ...e, cvv: undefined }));
                  }}
                  placeholder="•••"
                  keyboardType="number-pad"
                  maxLength={4}
                  secureTextEntry
                  error={errors.cvv}
                />
              </View>
            </View>

            {/* Save button */}
            <PressableScale
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel="Save card"
              style={{
                backgroundColor: Palette.brand,
                borderRadius: Radius.md,
                paddingVertical: 16,
                alignItems: 'center',
                marginTop: Spacing.two,
                minHeight: 54,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Font.heading,
                  fontSize: Type.body,
                  color: Palette.surface,
                }}>
                save card
              </Text>
            </PressableScale>

            {/* Security note */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                marginTop: Spacing.three,
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
      </KeyboardAvoidingView>
    </Modal>
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
