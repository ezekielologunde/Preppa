import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  BadgeCheck,
  CalendarDays,
  ChefHat,
  ChevronLeft,
  DollarSign,
  Menu,
  MessageSquare,
  Plus,
  Radio,
  Scan,
  ShoppingBag,
  Star,
  UtensilsCrossed,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react-native';
import { Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';

const ORANGE = '#f15f22';
const CARD = '#13161d';
const BG = '#0c0e13';

function Stat({ Icon, value, label, sub, color }: { Icon: LucideIcon; value: string; label: string; sub: string; color: string }) {
  return (
    <View style={{ flex: 1, gap: 6 }}>
      <Icon size={20} color={color} />
      <Text style={{ fontFamily: Font.display, fontSize: 24, color: '#fff', letterSpacing: -0.5 }}>{value}</Text>
      <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: '#9ca3af' }}>{label}</Text>
      <Text style={{ fontFamily: Font.body, fontSize: 11, color }}>{sub}</Text>
    </View>
  );
}

const actions: { label: string; Icon: LucideIcon; color: string; bg: string; badge?: string; live?: boolean }[] = [
  { label: 'new orders', Icon: ShoppingBag, color: ORANGE, bg: '#2a1810', badge: '2' },
  { label: 'manage meals', Icon: UtensilsCrossed, color: '#34d399', bg: '#0e2018' },
  { label: 'my schedule', Icon: CalendarDays, color: '#a78bfa', bg: '#1a1626' },
  { label: 'payouts', Icon: Wallet, color: '#fbbf24', bg: '#241e0e' },
  { label: 'go live', Icon: Radio, color: '#f472b6', bg: '#2a1020', live: true },
];

function PipelineDot({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  const color = done ? ORANGE : active ? ORANGE : '#3f4451';
  return (
    <View style={{ alignItems: 'center', gap: 4, flex: 1 }}>
      <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: done || active ? ORANGE : '#252a34', alignItems: 'center', justifyContent: 'center' }}>
        {done ? <BadgeCheck size={13} color="#fff" /> : <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: active ? '#fff' : '#5b6170' }} />}
      </View>
      <Text style={{ fontFamily: Font.medium, fontSize: 10, color }}>{label}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: Platform.OS === 'web' ? 16 : 8, paddingBottom: 130 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 12 }}>
            <PressableScale onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Back to customer view" style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: CARD, alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={22} color="#fff" />
            </PressableScale>
            <Image source="https://images.unsplash.com/photo-1583394293214-28a5b0f5a5b8?auto=format&fit=crop&w=120&q=60" style={{ width: 46, height: 46, borderRadius: 23 }} contentFit="cover" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.body, fontSize: 13, color: '#9ca3af' }}>good morning, 👋</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontFamily: Font.display, fontSize: 24, color: '#fff', letterSpacing: -0.6 }}>chef lex</Text>
                <BadgeCheck size={18} color={ORANGE} fill={ORANGE} stroke={BG} />
              </View>
            </View>
            <PressableScale accessibilityRole="button" accessibilityLabel="Scan QR code" style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: CARD, alignItems: 'center', justifyContent: 'center' }}><Scan size={19} color="#fff" /></PressableScale>
          </View>

          {/* Today at a glance */}
          <View style={{ marginHorizontal: 20, marginTop: 18, backgroundColor: CARD, borderRadius: 22, padding: 18 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <ChefHat size={16} color={ORANGE} />
              <Text style={{ fontFamily: Font.heading, fontSize: 14, color: '#fff' }}>today at a glance</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Stat Icon={ShoppingBag} value="14" label="orders" sub="2 new" color={ORANGE} />
              <Stat Icon={DollarSign} value="$642" label="revenue" sub="+18%" color="#34d399" />
              <Stat Icon={Users} value="28" label="customers" sub="3 returning" color="#a78bfa" />
              <Stat Icon={Star} value="4.9" label="rating" sub="127 reviews" color="#fbbf24" />
            </View>
          </View>

          {/* Quick actions */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14, paddingVertical: 20 }}>
            {actions.map((a) => (
              <PressableScale key={a.label} accessibilityRole="button" accessibilityLabel={a.label} style={{ alignItems: 'center', gap: 8, width: 66 }}>
                <View style={{ width: 60, height: 60, borderRadius: 20, backgroundColor: a.bg, alignItems: 'center', justifyContent: 'center' }}>
                  <a.Icon size={24} color={a.color} />
                  {a.badge ? (
                    <View style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
                      <Text style={{ fontFamily: Font.semibold, fontSize: 10, color: '#fff' }}>{a.badge}</Text>
                    </View>
                  ) : null}
                  {a.live ? (
                    <View style={{ position: 'absolute', top: -6, right: -10, backgroundColor: '#f43f5e', borderRadius: 6, paddingHorizontal: 5, paddingVertical: 1 }}>
                      <Text style={{ fontFamily: Font.semibold, fontSize: 8, color: '#fff' }}>LIVE</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={{ fontFamily: Font.medium, fontSize: 11, color: '#d1d5db', textAlign: 'center' }}>{a.label}</Text>
              </PressableScale>
            ))}
          </ScrollView>

          {/* Gamification */}
          <LinearGradient colors={['#FFE2C8', '#FFCFA8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ marginHorizontal: 20, borderRadius: 22, padding: 18, marginBottom: 24 }}>
            <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: ORANGE }}>🔥 you&apos;re on fire!</Text>
            <Text style={{ fontFamily: Font.display, fontSize: 20, color: '#111827', letterSpacing: -0.5, marginTop: 4, maxWidth: 220 }}>20 orders away from top kitchen 🏆</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14 }}>
              <View style={{ flex: 1, height: 9, borderRadius: 5, backgroundColor: 'rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <View style={{ width: '60%', height: 9, borderRadius: 5, backgroundColor: ORANGE }} />
              </View>
              <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: ORANGE }}>30 / 50</Text>
            </View>
          </LinearGradient>

          {/* Up next */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 }}>
            <Text style={{ fontFamily: Font.display, fontSize: 22, color: '#fff', letterSpacing: -0.5 }}>up next</Text>
            <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: '#9ca3af' }}>view all ›</Text>
          </View>
          <View style={{ marginHorizontal: 20, backgroundColor: CARD, borderRadius: 20, padding: 16, gap: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image source="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=60" style={{ width: 44, height: 44, borderRadius: 22 }} contentFit="cover" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: ORANGE }}>pickup in 45 min</Text>
                <Text style={{ fontFamily: Font.heading, fontSize: 15, color: '#fff', marginTop: 2 }}>Jerk Chicken Bowl</Text>
                <Text style={{ fontFamily: Font.body, fontSize: 12, color: '#9ca3af' }}>2x · $34.00</Text>
              </View>
              <View style={{ backgroundColor: '#2a1810', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 }}>
                <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: ORANGE }}>prep</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#232833', paddingTop: 12 }}>
              <PipelineDot label="confirmed" done />
              <PipelineDot label="preparing" active />
              <PipelineDot label="ready" />
              <PipelineDot label="picked up" />
            </View>
          </View>
        </ScrollView>

        {/* Prepper bottom nav (dark) */}
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#15181f', paddingTop: 12, paddingBottom: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          {[{ Icon: ChefHat, label: 'kitchen', active: true }, { Icon: ShoppingBag, label: 'orders', badge: '2' }].map((t) => (
            <PressableScale key={t.label} accessibilityRole="button" accessibilityLabel={t.label} style={{ alignItems: 'center', gap: 3 }}>
              <t.Icon size={22} color={t.active ? ORANGE : '#6b7280'} />
              <Text style={{ fontFamily: Font.medium, fontSize: 10, color: t.active ? ORANGE : '#6b7280' }}>{t.label}</Text>
            </PressableScale>
          ))}
          <PressableScale accessibilityRole="button" accessibilityLabel="Add new meal">
            <LinearGradient colors={[ORANGE, '#f43f5e']} style={{ width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginTop: -20 }}>
              <Plus size={26} color="#fff" />
            </LinearGradient>
          </PressableScale>
          {[{ Icon: MessageSquare, label: 'messages', badge: '3' }, { Icon: Menu, label: 'menu' }].map((t) => (
            <PressableScale key={t.label} accessibilityRole="button" accessibilityLabel={t.label} style={{ alignItems: 'center', gap: 3 }}>
              <t.Icon size={22} color="#6b7280" />
              <Text style={{ fontFamily: Font.medium, fontSize: 10, color: '#6b7280' }}>{t.label}</Text>
            </PressableScale>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}
