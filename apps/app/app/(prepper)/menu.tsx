import { useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme, formatMoney } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';
import { useSession } from '@/api/session';
import { useMyKitchen, useMyMeals, setMealStatus, type MyMeal, type MealStatus } from '@/api/prepper';

const OPTIONS: { key: MealStatus; label: string }[] = [
  { key: 'live', label: 'Live' },
  { key: 'paused', label: 'Pause' },
  { key: 'sold_out', label: 'Sold out' },
];

export default function Menu() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const { data: kitchen } = useMyKitchen(session?.user.id);
  const { data: meals, isLoading } = useMyMeals(kitchen?.id);

  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top + space.s2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s2, paddingHorizontal: space.s3 }}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" style={{ width: 40, height: 40, justifyContent: 'center' }}>
          <ChevronLeft size={26} color={th.text} />
        </Pressable>
        <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>menu</Text>
      </View>
      <FlashList<MyMeal>
        data={meals ?? []}
        keyExtractor={(m) => m.id}
        estimatedItemSize={110}
        contentContainerStyle={{ padding: space.s3 }}
        ItemSeparatorComponent={() => <View style={{ height: space.s2 }} />}
        renderItem={({ item }) => <MealRow meal={item} />}
        ListEmptyComponent={
          isLoading ? <ActivityIndicator color={th.accent} style={{ marginTop: space.s6 }} />
            : <Text style={{ textAlign: 'center', color: th.textSecondary, marginTop: space.s6, fontFamily: t.family.body }}>No meals yet. Add your first dish to start selling.</Text>
        }
      />
    </View>
  );
}

function MealRow({ meal }: { meal: MyMeal }) {
  const th = useTheme();
  const [busy, setBusy] = useState(false);

  const change = async (status: MealStatus) => {
    if (status === meal.status) return;
    setBusy(true);
    try { await setMealStatus(meal.id, status); } catch (e) { Alert.alert('Could not update', e instanceof Error ? e.message : 'Try again.'); } finally { setBusy(false); }
  };

  return (
    <View style={{ backgroundColor: th.surface, borderRadius: 16, borderWidth: 1, borderColor: th.border, padding: space.s3, gap: space.s2 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ flex: 1, color: th.text, fontFamily: t.family.body, fontSize: t.size.body, fontWeight: t.weight.semibold }}>{meal.name}</Text>
        <Text style={{ color: th.text, fontFamily: t.family.display, fontWeight: t.weight.extrabold }}>{formatMoney(meal.price_cents)}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: space.s2 }}>
        {OPTIONS.map((o) => {
          const active = meal.status === o.key;
          return (
            <Pressable
              key={o.key}
              onPress={() => change(o.key)}
              disabled={busy}
              style={{ flex: 1, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: active ? th.accentTint : 'transparent', borderWidth: 1, borderColor: active ? 'transparent' : th.border, opacity: busy ? 0.6 : 1 }}
            >
              <Text style={{ color: active ? th.accentText : th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label, fontWeight: t.weight.semibold }}>{o.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
