// TODO: replace with supabase addresses table once migrated
import { useRouter } from 'expo-router';
import { MapPin, Pencil, Plus, Trash2, X } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Radius, Shadow, Spacing, Type } from '@/constants/theme';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Address {
  id: string;
  label: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface FormState {
  label: string;
  customLabel: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface FormErrors {
  street1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

// ─── Initial mock data ────────────────────────────────────────────────────────

const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    label: 'Home',
    street1: '123 Maple Street',
    street2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    street1: '350 Fifth Avenue',
    city: 'New York',
    state: 'NY',
    postalCode: '10118',
    country: 'United States',
    isDefault: false,
  },
];

const PRESET_LABELS = ['Home', 'Work', 'Other'];

const EMPTY_FORM: FormState = {
  label: 'Home',
  customLabel: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
  isDefault: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.street1.trim() || form.street1.trim().length < 5) {
    errors.street1 = 'Street address must be at least 5 characters';
  }
  if (!form.city.trim() || form.city.trim().length < 2) {
    errors.city = 'City is required';
  }
  if (!form.state.trim()) {
    errors.state = 'State / Province is required';
  }
  if (!form.postalCode.trim() || form.postalCode.trim().length < 3) {
    errors.postalCode = 'Postal code must be at least 3 characters';
  }
  return errors;
}

function resolvedLabel(form: FormState): string {
  if (form.label === 'Other' && form.customLabel.trim()) return form.customLabel.trim();
  if (form.label === 'Other') return 'Other';
  return form.label;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <Text
      style={{ fontFamily: Font.body, fontSize: Type.micro, color: Palette.danger, marginTop: 4 }}
      accessibilityRole="alert">
      {msg}
    </Text>
  );
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  optional,
  autoCapitalize,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  error?: string;
  optional?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'numeric';
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
        {optional && (
          <Text style={{ color: Palette.textMuted, fontFamily: Font.body }}> (optional)</Text>
        )}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? label}
        placeholderTextColor={Palette.textMuted}
        autoCapitalize={autoCapitalize ?? 'sentences'}
        keyboardType={keyboardType ?? 'default'}
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

// ─── Add / Edit Sheet ─────────────────────────────────────────────────────────

function AddressSheet({
  visible,
  initial,
  onClose,
  onSave,
}: {
  visible: boolean;
  initial?: Address;
  onClose: () => void;
  onSave: (form: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>(() => {
    if (initial) {
      const presetMatch = PRESET_LABELS.includes(initial.label);
      return {
        label: presetMatch ? initial.label : 'Other',
        customLabel: presetMatch ? '' : initial.label,
        street1: initial.street1,
        street2: initial.street2 ?? '',
        city: initial.city,
        state: initial.state,
        postalCode: initial.postalCode,
        country: initial.country,
        isDefault: initial.isDefault,
      };
    }
    return { ...EMPTY_FORM };
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const set = (key: keyof FormState) => (val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(form);
    setErrors({});
  };

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
          {/* Sheet header */}
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
              {initial ? 'edit address' : 'add address'}
            </Text>
            <PressableScale
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close"
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
            contentContainerStyle={{ padding: Spacing.three }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            {/* Label chips */}
            <Text
              style={{
                fontFamily: Font.medium,
                fontSize: Type.label,
                color: Palette.inkSoft,
                marginBottom: 8,
              }}>
              label
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: Spacing.three }}>
              {PRESET_LABELS.map((lbl) => (
                <PressableScale
                  key={lbl}
                  onPress={() => set('label')(lbl)}
                  accessibilityRole="button"
                  accessibilityLabel={`Label: ${lbl}`}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: Radius.pill,
                    minHeight: 44,
                    justifyContent: 'center',
                    backgroundColor: form.label === lbl ? Palette.brand : Palette.chip,
                  }}>
                  <Text
                    style={{
                      fontFamily: Font.medium,
                      fontSize: Type.label,
                      color: form.label === lbl ? Palette.surface : Palette.inkSoft,
                    }}>
                    {lbl}
                  </Text>
                </PressableScale>
              ))}
            </View>

            {form.label === 'Other' && (
              <FormField
                label="custom label"
                value={form.customLabel}
                onChangeText={set('customLabel')}
                placeholder="e.g. Gym, Parents..."
              />
            )}

            <FormField
              label="street address"
              value={form.street1}
              onChangeText={(v) => {
                set('street1')(v);
                if (errors.street1) setErrors((e) => ({ ...e, street1: undefined }));
              }}
              placeholder="123 Main Street"
              error={errors.street1}
            />

            <FormField
              label="apt / unit"
              value={form.street2}
              onChangeText={set('street2')}
              placeholder="Apt 4B"
              optional
            />

            <FormField
              label="city"
              value={form.city}
              onChangeText={(v) => {
                set('city')(v);
                if (errors.city) setErrors((e) => ({ ...e, city: undefined }));
              }}
              error={errors.city}
            />

            <View style={{ flexDirection: 'row', gap: Spacing.two }}>
              <View style={{ flex: 1 }}>
                <FormField
                  label="state / province"
                  value={form.state}
                  onChangeText={(v) => {
                    set('state')(v);
                    if (errors.state) setErrors((e) => ({ ...e, state: undefined }));
                  }}
                  autoCapitalize="characters"
                  error={errors.state}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormField
                  label="postal / ZIP"
                  value={form.postalCode}
                  onChangeText={(v) => {
                    set('postalCode')(v);
                    if (errors.postalCode) setErrors((e) => ({ ...e, postalCode: undefined }));
                  }}
                  keyboardType="default"
                  autoCapitalize="characters"
                  error={errors.postalCode}
                />
              </View>
            </View>

            <FormField
              label="country"
              value={form.country}
              onChangeText={set('country')}
            />

            {/* Default toggle */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: Palette.canvas,
                borderRadius: Radius.sm,
                paddingHorizontal: Spacing.three,
                paddingVertical: 14,
                marginBottom: Spacing.three,
              }}>
              <Text
                style={{ fontFamily: Font.medium, fontSize: Type.body, color: Palette.ink }}>
                set as default
              </Text>
              <Switch
                value={form.isDefault}
                onValueChange={(v) => set('isDefault')(v)}
                trackColor={{ false: Palette.border, true: Palette.brand }}
                thumbColor={Palette.surface}
                accessibilityRole="switch"
                accessibilityLabel="Set as default address"
              />
            </View>

            {/* Save button */}
            <PressableScale
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel="Save address"
              style={{
                backgroundColor: Palette.brand,
                borderRadius: Radius.md,
                paddingVertical: 16,
                alignItems: 'center',
                marginBottom: Spacing.four,
                minHeight: 54,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Font.heading,
                  fontSize: Type.body,
                  color: Palette.surface,
                }}>
                save address
              </Text>
            </PressableScale>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ─── Address Card ─────────────────────────────────────────────────────────────

function AddressCard({
  address,
  index,
  pendingDelete,
  onEdit,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
  onSetDefault,
}: {
  address: Address;
  index: number;
  pendingDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onSetDefault: () => void;
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 260, delay: index * 40 }}>
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
            delete this address?
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <PressableScale
              onPress={onCancelDelete}
              accessibilityRole="button"
              accessibilityLabel="Cancel delete"
              style={{
                paddingHorizontal: 16,
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
              accessibilityLabel="Confirm delete address"
              style={{
                paddingHorizontal: 16,
                height: 44,
                borderRadius: Radius.pill,
                backgroundColor: Palette.danger,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ fontFamily: Font.medium, fontSize: Type.label, color: Palette.surface }}>
                delete
              </Text>
            </PressableScale>
          </View>
        </View>
      ) : (
        <PressableScale
          onPress={address.isDefault ? undefined : onSetDefault}
          accessibilityRole="button"
          accessibilityLabel={`${address.label} address${address.isDefault ? ', default' : ', tap to set as default'}`}
          style={{
            backgroundColor: Palette.surface,
            borderRadius: Radius.md,
            padding: Spacing.three,
            flexDirection: 'row',
            alignItems: 'center',
            gap: Spacing.three,
            ...Shadow.card,
          }}>
          {/* Icon chip */}
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: Palette.brandTint,
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
            <MapPin size={20} color={Palette.brand} />
          </View>

          {/* Content */}
          <View style={{ flex: 1, gap: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text
                style={{ fontFamily: Font.heading, fontSize: Type.body, color: Palette.ink }}>
                {address.label}
              </Text>
              {address.isDefault && (
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
              }}
              numberOfLines={2}>
              {address.street1}
              {address.street2 ? `, ${address.street2}` : ''}
              {'\n'}
              {address.city}, {address.state} {address.postalCode}
            </Text>
          </View>

          {/* Actions */}
          <View style={{ flexDirection: 'row', gap: 4, flexShrink: 0 }}>
            <TouchableOpacity
              onPress={onEdit}
              accessibilityRole="button"
              accessibilityLabel={`Edit ${address.label} address`}
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: Palette.chip,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pencil size={16} color={Palette.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${address.label} address`}
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: '#FEF2F2',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Trash2 size={16} color={Palette.danger} />
            </TouchableOpacity>
          </View>
        </PressableScale>
      )}
    </MotiView>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [editing, setEditing] = useState<Address | undefined>(undefined);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Auto-clear delete confirmation after 3 s
  const triggerDelete = (id: string) => {
    setPendingDeleteId(id);
    setTimeout(() => setPendingDeleteId((prev) => (prev === id ? null : prev)), 3000);
  };

  const confirmDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setPendingDeleteId(null);
  };

  const openAdd = () => {
    setEditing(undefined);
    setSheetVisible(true);
  };

  const openEdit = (address: Address) => {
    setEditing(address);
    setSheetVisible(true);
  };

  const handleSave = (form: FormState) => {
    const label = resolvedLabel(form);
    if (editing) {
      setAddresses((prev) =>
        prev.map((a) => {
          if (a.id !== editing.id) {
            return form.isDefault ? { ...a, isDefault: false } : a;
          }
          return { ...a, ...form, label };
        }),
      );
    } else {
      const newAddr: Address = {
        id: Date.now().toString(),
        label,
        street1: form.street1,
        street2: form.street2 || undefined,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country,
        isDefault: form.isDefault,
      };
      setAddresses((prev) => {
        const updated = form.isDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev;
        return [...updated, newAddr];
      });
    }
    setSheetVisible(false);
  };

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id })),
    );
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
            addresses
          </Text>
          <PressableScale
            onPress={openAdd}
            accessibilityRole="button"
            accessibilityLabel="Add new address"
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: Palette.brand,
              alignItems: 'center',
              justifyContent: 'center',
              ...Shadow.card,
            }}>
            <Plus size={20} color={Palette.surface} />
          </PressableScale>
        </View>

        {/* Content */}
        {addresses.length === 0 ? (
          /* Empty state */
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 300 }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.four }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: Palette.chip,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Spacing.three,
              }}>
              <MapPin size={36} color={Palette.textMuted} />
            </View>
            <Text
              style={{
                fontFamily: Font.heading,
                fontSize: Type.title,
                color: Palette.ink,
                marginBottom: 8,
                textAlign: 'center',
              }}>
              no addresses yet
            </Text>
            <Text
              style={{
                fontFamily: Font.body,
                fontSize: Type.body,
                color: Palette.textSecondary,
                textAlign: 'center',
                marginBottom: Spacing.four,
              }}>
              save your delivery spots so checkout is a breeze.
            </Text>
            <PressableScale
              onPress={openAdd}
              accessibilityRole="button"
              accessibilityLabel="Add your first address"
              style={{
                backgroundColor: Palette.brand,
                borderRadius: Radius.md,
                paddingHorizontal: Spacing.four,
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                minHeight: 48,
              }}>
              <Plus size={18} color={Palette.surface} />
              <Text
                style={{
                  fontFamily: Font.heading,
                  fontSize: Type.body,
                  color: Palette.surface,
                }}>
                add your first address
              </Text>
            </PressableScale>
          </MotiView>
        ) : (
          <ScrollView
            contentContainerStyle={{
              padding: Spacing.three,
              gap: Spacing.three,
              paddingBottom: 120,
            }}
            showsVerticalScrollIndicator={false}>
            {addresses.map((address, index) => (
              <AddressCard
                key={address.id}
                address={address}
                index={index}
                pendingDelete={pendingDeleteId === address.id}
                onEdit={() => openEdit(address)}
                onDelete={() => triggerDelete(address.id)}
                onConfirmDelete={() => confirmDelete(address.id)}
                onCancelDelete={() => setPendingDeleteId(null)}
                onSetDefault={() => setDefault(address.id)}
              />
            ))}
          </ScrollView>
        )}
      </SafeAreaView>

      <AddressSheet
        visible={sheetVisible}
        initial={editing}
        onClose={() => setSheetVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}
