import { View, Text, Switch, Pressable, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClipboardList, UtensilsCrossed, ChevronRight } from 'lucide-react-native';
import { useTheme, formatMoney, formatMoneyShort } from '@preppa/ui';
import { color, space, typography as t } from '@preppa/theme';
import { useSession } from '@/api/session';
import { useMyKitchen, useEarnings, useKitchenQueue, useKitchenChannel, setAvailability } from '@/api/prepper';

export default function Hub() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const userId = session?.user.id;
  const { data: kitchen, isLoading } = useMyKitchen(userId);
  const kitchenId = kitchen?.id;
  useKitchenChannel(kitchenId);
  const { data: earnings } = useEarnings(kitchenId);
  const { data: queue } = useKitchenQueue(kitchenId);

  const open = kitchen?.availability === 'open';

  const toggle = async (next: boolean) => {
    if (!kitchenId) return;
    try { await setAvailability(kitchenId, next); } catch (e) { Alert.alert('Could not update', e instanceof Error ? e.message : 'Try again.'); }
  };

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: th.bg, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={th.accent} /></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top + space.s3, paddingHorizontal: space.s3, gap: space.s3 }}>
      <Text style={{ color: th.textSecondary, fontSize: t.size.label, fontFamily: t.family.body, fontWeight: t.weight.semibold }}>🔥 dinner window</Text>
      <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>
        {kitchen?.name ?? 'kitchen hub'}
      </Text>

      {/* Availability */}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: th.surface, borderRadius: 16, borderWidth: 1, borderColor: th.border, padding: space.s3, gap: space.s3 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: th.text, fontFamily: t.family.body, fontWeight: t.weight.bold, fontSize: t.size.body }}>{open ? "You're open for orders" : 'Kitchen paused'}</Text>
          <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label }}>{open ? 'Customers can order now' : 'Hidden from discovery'}</Text>
        </View>
        <Switch value={open} onValueChange={toggle} trackColor={{ true: color.brand, false: th.surfaceAlt }} thumbColor="#fff" />
      </View>

      {/* Earnings tiles — real ledger-derived values */}
      <View style={{ flexDirection: 'row', gap: space.s2 }}>
        <Tile label="Today" value={earnings ? formatMoney(earnings.todayCents) : '—'} sub={earnings ? `${earnings.ordersToday} orders` : ''} th={th} />
        <Tile label="This week" value={earnings ? formatMoneyShort(earnings.weekCents) : '—'} sub="" th={th} />
      </View>

      {/* Links */}
      <Link icon={<ClipboardList size={20} color={th.text} />} label="Order queue" badge={queue?.length ? String(queue.length) : undefined} onPress={() => router.push('/queue')} th={th} />
      <Link icon={<UtensilsCrossed size={20} color={th.text} />} label="Manage menu" onPress={() => router.push('/menu')} th={th} />
    </View>
  );
}

function Tile({ label, value, sub, th }: { label: string; value: string; sub: string; th: ReturnType<typeof useTheme> }) {
  return (
    <View style={{ flex: 1, backgroundColor: th.surface, borderRadius: 16, borderWidth: 1, borderColor: th.border, padding: space.s3 }}>
      <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.micro, fontWeight: t.weight.semibold, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Text>
      <Text style={{ color: th.text, fontFamily: t.family.display, fontWeight: t.weight.extrabold, fontSize: t.size.displayLg, marginTop: 4 }}>{value}</Text>
      {sub.length > 0 && <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.micro }}>{sub}</Text>}
    </View>
  );
}

function Link({ icon, label, badge, onPress, th }: { icon: React.ReactNode; label: string; badge?: string; onPress: () => void; th: ReturnType<typeof useTheme> }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: space.s3, backgroundColor: th.surface, borderRadius: 16, borderWidth: 1, borderColor: th.border, padding: space.s3, opacity: pressed ? 0.7 : 1 })}>
      {icon}
      <Text style={{ flex: 1, color: th.text, fontFamily: t.family.body, fontWeight: t.weight.semibold, fontSize: t.size.body }}>{label}</Text>
      {badge != null && (
        <View style={{ minWidth: 22, height: 22, borderRadius: 11, backgroundColor: th.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 }}>
          <Text style={{ color: '#fff', fontSize: t.size.micro, fontWeight: t.weight.extrabold }}>{badge}</Text>
        </View>
      )}
      <ChevronRight size={18} color={th.textSecondary} />
    </Pressable>
  );
}
