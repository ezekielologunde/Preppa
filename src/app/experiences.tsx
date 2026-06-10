import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  CalendarCheck,
  ChefHat,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  HandPlatter,
  MapPin,
  MessageSquareQuote,
  PartyPopper,
  Plus,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from 'lucide-react-native';
import { Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { experienceTypes, featuredExperiences, type Experience } from '@/constants/mock';
import { Palette, Radius, Shadow } from '@/constants/theme';
import { useMyExperienceRequests } from '@/lib/queries/experiences';
import { useAuth } from '@/providers/auth-provider';

const ORANGE = Palette.brand;
const INK = Palette.ink;

const TYPE_ICONS: Record<string, LucideIcon> = { UtensilsCrossed, ChefHat, GraduationCap, Wine, HandPlatter, Sparkles };
const STEPS: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: ClipboardList, title: 'Post a request', body: 'Tell us your event, date and budget' },
  { Icon: MessageSquareQuote, title: 'Compare bids', body: 'Local preppers send quotes to you' },
  { Icon: PartyPopper, title: 'Book & enjoy', body: 'Pick your favourite and confirm' },
];

function ExperienceCard({ exp, onPress }: { exp: Experience; onPress: () => void }) {
  return (
    <PressableScale onPress={onPress} accessibilityRole="button" accessibilityLabel={`${exp.title} by ${exp.host}, from $${exp.from} ${exp.per}`} style={{ width: 260, backgroundColor: '#fff', borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.card }}>
      <Image source={exp.image} style={{ width: '100%', height: 150 }} contentFit="cover" transition={200} />
      <View style={{ padding: 14 }}>
        <Text style={{ fontFamily: Font.heading, fontSize: 15, color: INK }} numberOfLines={1}>{exp.title}</Text>
        <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textSecondary, marginTop: 2 }}>by {exp.host}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
          <Star size={13} color="#f59e0b" fill="#f59e0b" />
          <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: INK }}>{exp.rating.toFixed(1)}</Text>
          <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textMuted }}>({exp.reviews})</Text>
          <MapPin size={12} color={Palette.textMuted} style={{ marginLeft: 6 }} />
          <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textMuted }} numberOfLines={1}>{exp.location}</Text>
        </View>
        <Text style={{ fontFamily: Font.body, fontSize: 13, color: INK, marginTop: 8 }}>
          <Text style={{ fontFamily: Font.display, fontSize: 16, color: ORANGE }}>${exp.from}</Text> {exp.per}
        </Text>
      </View>
    </PressableScale>
  );
}

export default function ExperiencesScreen() {
  const router = useRouter();
  const { user } = useAuth();
  // Live feedback loop: posted requests show their bid count right on the tab.
  const { data: myRequests } = useMyExperienceRequests(user?.id);
  const activeRequests = (myRequests ?? []).filter((r) => r.status === 'open').slice(0, 2);
  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: Platform.OS === 'web' ? 16 : 8, paddingBottom: 130 }}>
          {/* Header */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontFamily: Font.display, fontSize: 32, color: INK, letterSpacing: -1 }}>experiences</Text>
            <Text style={{ fontFamily: Font.body, fontSize: 14, color: Palette.textSecondary, marginTop: 2 }}>
              catering, private chefs, classes & tastings near you
            </Text>
          </View>

          {/* Primary action — post a request */}
          <PressableScale
            onPress={() => router.push('/experience-request')}
            accessibilityRole="button"
            accessibilityLabel="Post an experience request"
            style={{ marginHorizontal: 20, marginTop: 16, backgroundColor: ORANGE, borderRadius: Radius.lg, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, ...Shadow.floating, shadowColor: ORANGE, shadowOpacity: 0.35 }}>
            <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={24} color="#fff" strokeWidth={2.6} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>Post a request</Text>
              <Text style={{ fontFamily: Font.body, fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 1 }}>Describe your event — get bids from local preppers</Text>
            </View>
          </PressableScale>

          {/* Live status of my open requests — the post→bids feedback loop */}
          {activeRequests.map((r) => {
            const pending = r.bids.filter((b) => b.status === 'pending').length;
            return (
              <PressableScale
                key={r.id}
                onPress={() => router.push('/experience-request')}
                accessibilityRole="button"
                accessibilityLabel={`Your request ${r.title}: ${pending ? `${pending} bids received, compare now` : 'waiting for bids'}`}
                style={{ marginHorizontal: 20, marginTop: 12, backgroundColor: '#fff', borderRadius: Radius.md, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: pending ? ORANGE + '55' : Palette.border }}>
                <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: pending ? Palette.brandTint : Palette.chip, alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquareQuote size={18} color={pending ? ORANGE : Palette.textSecondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: Font.heading, fontSize: 13.5, color: INK }} numberOfLines={1}>{r.title}</Text>
                  <Text style={{ fontFamily: Font.body, fontSize: 12.5, color: pending ? Palette.brandPressed : Palette.textSecondary, marginTop: 1 }}>
                    {pending ? `${pending} bid${pending === 1 ? '' : 's'} received — compare & book` : 'request posted · waiting for bids'}
                  </Text>
                </View>
                {pending ? (
                  <View style={{ minWidth: 24, height: 24, borderRadius: 12, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 7 }}>
                    <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: '#fff' }}>{pending}</Text>
                  </View>
                ) : null}
              </PressableScale>
            );
          })}

          {/* Meal plans live here too — weekly/family subscriptions */}
          <PressableScale
            onPress={() => router.push('/meal-plans')}
            accessibilityRole="button"
            accessibilityLabel="Meal plans — weekly and family subscriptions"
            style={{ marginHorizontal: 20, marginTop: 12, backgroundColor: '#fff', borderRadius: Radius.md, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: Palette.brandTint, alignItems: 'center', justifyContent: 'center' }}>
              <CalendarCheck size={18} color={ORANGE} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 13.5, color: INK }}>meal plans & subscriptions</Text>
              <Text style={{ fontFamily: Font.body, fontSize: 12.5, color: Palette.textSecondary, marginTop: 1 }}>weekly, monthly & family — delivered on repeat</Text>
            </View>
            <ChevronRight size={18} color={Palette.textMuted} />
          </PressableScale>

          {/* Experience types */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 22 }}>
            {experienceTypes.map((t) => {
              const Icon = TYPE_ICONS[t.icon] ?? UtensilsCrossed;
              return (
                <PressableScale key={t.key} onPress={() => router.push(`/experience-request?kind=${t.key}`)} accessibilityRole="button" accessibilityLabel={t.label} style={{ flex: 1, alignItems: 'center', gap: 8, backgroundColor: '#fff', borderRadius: Radius.md, paddingVertical: 14 }}>
                  <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: Palette.brandTint, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color={ORANGE} />
                  </View>
                  <Text style={{ fontFamily: Font.semibold, fontSize: 11.5, color: INK, textAlign: 'center' }}>{t.label}</Text>
                </PressableScale>
              );
            })}
          </View>

          {/* How it works */}
          <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, letterSpacing: -0.5, paddingHorizontal: 20, marginTop: 30, marginBottom: 14 }}>how it works</Text>
          <View style={{ marginHorizontal: 20, backgroundColor: '#fff', borderRadius: Radius.lg, padding: 16, gap: 4 }}>
            {STEPS.map((s, i) => (
              <View key={s.title} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: '#f3f4f6' }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: Palette.brandTint, alignItems: 'center', justifyContent: 'center' }}>
                  <s.Icon size={19} color={ORANGE} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: Font.heading, fontSize: 14, color: INK }}>{s.title}</Text>
                  <Text style={{ fontFamily: Font.body, fontSize: 12.5, color: Palette.textSecondary, marginTop: 1 }}>{s.body}</Text>
                </View>
                <Text style={{ fontFamily: Font.display, fontSize: 18, color: '#E5E7EB' }}>{i + 1}</Text>
              </View>
            ))}
          </View>

          {/* Featured */}
          <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, letterSpacing: -0.5, paddingHorizontal: 20, marginTop: 30, marginBottom: 14 }}>featured experiences</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {featuredExperiences.map((e) => (
              <ExperienceCard key={e.id} exp={e} onPress={() => router.push(`/experience-request?kind=${e.type}`)} />
            ))}
          </ScrollView>

          {/* My requests entry */}
          <PressableScale onPress={() => router.push('/experience-request')} accessibilityRole="button" accessibilityLabel="View my requests" style={{ marginHorizontal: 20, marginTop: 24, alignItems: 'center', paddingVertical: 15, borderRadius: Radius.sm, borderWidth: 1, borderColor: Palette.border, backgroundColor: '#fff' }}>
            <Text style={{ fontFamily: Font.heading, fontSize: 14, color: INK }}>view my requests & bids</Text>
          </PressableScale>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
