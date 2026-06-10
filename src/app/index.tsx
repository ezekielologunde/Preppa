import { Image } from 'expo-image';
import { MotiView } from 'moti';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Bell,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  Coffee,
  Gift,
  Leaf,
  MapPin,
  MoreHorizontal,
  RefreshCw,
  Salad,
  Search,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Ticket,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react-native';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MealCard } from '@/components/meal-card';
import { PreppaLogo } from '@/components/preppa-logo';
import { Font } from '@/constants/fonts';
import { categories, recommendedMeals } from '@/constants/mock';
import { PressableScale } from '@/components/ui/pressable-scale';
import { CardRowSkeleton } from '@/components/ui/skeleton';
import { Palette, Radius } from '@/constants/theme';
import { greeting } from '@/lib/greeting';
import { useFeaturedMeals } from '@/lib/queries/meals';
import { useFeatureFlags } from '@/lib/queries/feature-flags';
import { useMyOrders } from '@/lib/queries/orders';
import { useNotifications } from '@/lib/queries/notifications';
import { useRewards } from '@/lib/queries/rewards';
import { usePersonalizedMeals } from '@/lib/queries/recommend';
import { useContentWidth } from '@/lib/layout';
import { useAuth } from '@/providers/auth-provider';

const ORANGE = Palette.brand;
const INK = Palette.ink;
const MUTED = Palette.textMuted;

const ICONS: Record<string, LucideIcon> = {
  Coffee,
  Salad,
  UtensilsCrossed,
  Leaf,
  Sprout,
  MoreHorizontal,
  RefreshCw,
};

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14 }}>
      <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, letterSpacing: -0.5 }}>{title}</Text>
      {onSeeAll ? (
        <PressableScale onPress={onSeeAll} accessibilityRole="button" accessibilityLabel={`See all ${title}`}>
          <Text style={{ fontFamily: Font.semibold, fontSize: 14, color: ORANGE }}>see all</Text>
        </PressableScale>
      ) : null}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  // Greet by first name only when a real name exists — never the email handle.
  const rawFirst = (user?.user_metadata?.full_name as string | undefined)?.trim().split(/\s+/)[0];
  const firstName = rawFirst ? rawFirst.toLowerCase() : null;
  // Live meals from Supabase (RLS-scoped); fall back to mock if the query is empty.
  const { data: liveMeals, isLoading: mealsLoading } = useFeaturedMeals();
  const meals = liveMeals && liveMeals.length > 0 ? liveMeals : recommendedMeals;
  const { data: flags } = useFeatureFlags();
  const showPlans = flags?.meal_plans !== false;
  const showExperiences = flags?.experiences !== false;
  // "Order again" = the user's most recent delivered order (hidden until one exists).
  const { data: myOrders } = useMyOrders(user?.id);
  const lastDone = myOrders?.find((o) => o.status === 'completed');
  const { data: notifications } = useNotifications(user?.id);
  const rewards = useRewards(user?.id);
  // Preppa AI: rank meals from real signals (time of day, favorites, history).
  const contentWidth = useContentWidth();
  const ranked = usePersonalizedMeals(meals, user?.id);
  const [aiIdx, setAiIdx] = useState(0);
  const topPicks = ranked.slice(0, Math.min(5, ranked.length));
  const aiPick = topPicks.length ? topPicks[aiIdx % topPicks.length] : null;
  // Bell badge = orders in motion + unread notifications (real, actionable).
  const activeOrders = (myOrders ?? []).filter(
    (o) => o.status !== 'completed' && o.status !== 'cancelled',
  ).length;
  const unreadNotifs = (notifications ?? []).filter((n) => !n.read).length;
  const badgeCount = activeOrders + unreadNotifs;

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Platform.OS === 'web' ? 16 : 8, paddingBottom: 130 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, gap: 12 }}>
            <PressableScale
              onPress={() => router.push('/profile')}
              accessibilityRole="button"
              accessibilityLabel="Your profile"
              style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
              <MotiView
                from={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'timing', duration: 1500, loop: true, repeatReverse: true }}>
                <PreppaLogo size={48} glow />
              </MotiView>
            </PressableScale>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.medium, fontSize: 14, color: Palette.textSecondary }}>{greeting()}{firstName ? `, ${firstName}` : ''} 👋</Text>
              <Text style={{ fontFamily: Font.display, fontSize: 24, color: INK, letterSpacing: -0.6, lineHeight: 28 }}>
                what are you{'\n'}
                <Text style={{ color: ORANGE }}>craving today?</Text>
              </Text>
            </View>
            <PressableScale onPress={() => router.push('/messages')} accessibilityRole="button" accessibilityLabel={badgeCount ? `Inbox, ${badgeCount} updates` : 'Inbox'} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={20} color={INK} />
              {badgeCount > 0 ? (
                <View style={{ position: 'absolute', top: 8, right: 9, minWidth: 16, height: 16, borderRadius: 8, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 }}>
                  <Text style={{ fontFamily: Font.semibold, fontSize: 9, color: '#fff' }}>{badgeCount}</Text>
                </View>
              ) : null}
            </PressableScale>
          </View>

          {/* Location — right-aligned pill */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, marginTop: 10 }}>
            <PressableScale accessibilityRole="button" accessibilityLabel="Change location, New York, NY" style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 }}>
              <MapPin size={14} color={ORANGE} />
              <Text style={{ fontFamily: Font.medium, fontSize: 13, color: '#374151' }}>New York, NY</Text>
              <ChevronDown size={14} color="#6b7280" />
            </PressableScale>
          </View>

          {/* Search */}
          <PressableScale
            onPress={() => router.push('/search')}
            accessibilityRole="search"
            accessibilityLabel="Search meals, cuisines, or preppers"
            style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 16, backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 16, height: 54, gap: 10 }}>
            <Search size={20} color={MUTED} />
            <Text style={{ flex: 1, fontFamily: Font.body, fontSize: 15, color: MUTED }}>Search meals, cuisines, or preppers…</Text>
            <SlidersHorizontal size={20} color={ORANGE} />
          </PressableScale>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 18, paddingVertical: 20 }}>
            {categories.map((c) => {
              const Icon = ICONS[c.icon] ?? MoreHorizontal;
              const onPress = () =>
                c.key === 'more'
                  ? router.push('/explore')
                  : router.push(`/category?key=${c.key}&label=${encodeURIComponent(c.label)}`);
              return (
                <PressableScale key={c.key} onPress={onPress} accessibilityRole="button" accessibilityLabel={`${c.label} meals`} style={{ alignItems: 'center', gap: 8, width: 58 }}>
                  <View style={{ width: 58, height: 58, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={24} color={c.color} />
                  </View>
                  <Text style={{ fontFamily: Font.medium, fontSize: 12, color: '#374151' }}>{c.label}</Text>
                </PressableScale>
              );
            })}
          </ScrollView>

          {/* Primary products — Meal Plans + Experiences, surfaced (not hidden) */}
          {showPlans || showExperiences ? (
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 26 }}>
              {showPlans ? (
                <PressableScale onPress={() => router.push('/meal-plans')} accessibilityRole="button" accessibilityLabel="Meal plans"
                  style={{ flex: 1, backgroundColor: '#fff', borderRadius: Radius.lg, padding: 16, gap: 10 }}>
                  <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: Palette.brandTint, alignItems: 'center', justifyContent: 'center' }}>
                    <CalendarCheck size={20} color={ORANGE} />
                  </View>
                  <Text style={{ fontFamily: Font.heading, fontSize: 15, color: INK }}>meal plans</Text>
                  <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textSecondary, lineHeight: 16 }}>weekly & family, on repeat</Text>
                </PressableScale>
              ) : null}
              {showExperiences ? (
                <PressableScale onPress={() => router.push('/experiences')} accessibilityRole="button" accessibilityLabel="Experiences"
                  style={{ flex: 1, backgroundColor: '#fff', borderRadius: Radius.lg, padding: 16, gap: 10 }}>
                  <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: Palette.brandTint, alignItems: 'center', justifyContent: 'center' }}>
                    <Ticket size={20} color={ORANGE} />
                  </View>
                  <Text style={{ fontFamily: Font.heading, fontSize: 15, color: INK }}>experiences</Text>
                  <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textSecondary, lineHeight: 16 }}>catering, chefs & classes</Text>
                </PressableScale>
              ) : null}
            </View>
          ) : null}

          {/* Recommended — personalized, dynamic mix of a big hero + carousel */}
          <SectionHeader title="recommended for you" onSeeAll={() => router.push('/category?key=all&label=recommended')} />
          {mealsLoading ? (
            <View style={{ paddingBottom: 26 }}>
              <CardRowSkeleton count={3} />
            </View>
          ) : (
            <>
              {aiPick ? (
                <View style={{ paddingHorizontal: 20, marginBottom: 14 }}>
                  <MealCard meal={aiPick.meal} variant="big" width={contentWidth - 40} />
                </View>
              ) : null}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14, paddingBottom: 26 }}>
                {(aiPick ? ranked.slice(1) : ranked).map((s) => (
                  <MealCard key={s.meal.id} meal={s.meal} />
                ))}
              </ScrollView>
            </>
          )}

          {/* Preppa AI — a personalized pick that learns from your taste */}
          {aiPick ? (
            <View style={{ marginHorizontal: 20, marginBottom: 26, backgroundColor: '#11151C', borderRadius: Radius.lg, padding: 18, gap: 12, overflow: 'hidden' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: ORANGE }}>
                  <Sparkles size={14} color="#fff" />
                </View>
                <Text style={{ fontFamily: Font.heading, fontSize: 14, color: '#fff', flex: 1 }}>Preppa AI · picked for you</Text>
                <PressableScale onPress={() => setAiIdx((i) => i + 1)} accessibilityRole="button" accessibilityLabel="Suggest another meal" hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, height: 30, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.12)' }}>
                  <RefreshCw size={13} color="#fff" />
                  <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: '#fff' }}>shuffle</Text>
                </PressableScale>
              </View>
              <PressableScale onPress={() => router.push(`/meal?id=${aiPick.meal.id}`)} accessibilityRole="button" accessibilityLabel={`${aiPick.meal.title} — ${aiPick.reason}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <Image source={aiPick.meal.image} style={{ width: 76, height: 76, borderRadius: 16 }} contentFit="cover" transition={200} />
                <View style={{ flex: 1, gap: 3 }}>
                  <Text numberOfLines={1} style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>{aiPick.meal.title}</Text>
                  <Text style={{ fontFamily: Font.body, fontSize: 12.5, color: ORANGE }} numberOfLines={1}>{aiPick.reason}</Text>
                  <Text style={{ fontFamily: Font.body, fontSize: 12, color: '#9ca3af' }} numberOfLines={1}>by {aiPick.meal.prepper} · ${aiPick.meal.price.toFixed(2)}</Text>
                </View>
                <ChevronRight size={20} color="#6b7280" />
              </PressableScale>
            </View>
          ) : null}

          {/* Points banner — real points from completed orders */}
          <PressableScale onPress={() => router.push('/rewards')} accessibilityRole="button" accessibilityLabel={`Rewards, ${rewards.points} points, ${rewards.tier.name} tier`} style={{ marginHorizontal: 20, marginBottom: 28, backgroundColor: '#E7F6EC', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#22c55e', alignItems: 'center', justifyContent: 'center' }}>
              <Gift size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 15, color: '#14532d' }}>
                {rewards.points > 0 ? `you have ${rewards.points.toLocaleString()} points` : 'start earning rewards'}
              </Text>
              <Text style={{ fontFamily: Font.body, fontSize: 12, color: '#3f6212' }}>
                {rewards.nextTier ? `${rewards.tier.name} · $${rewards.toNext.toFixed(0)} to ${rewards.nextTier.name}` : `${rewards.tier.name} member · top tier 🎉`}
              </Text>
            </View>
            <View style={{ backgroundColor: INK, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: '#fff' }}>view rewards</Text>
              <ChevronRight size={13} color="#fff" />
            </View>
          </PressableScale>

          {/* Order again — the user's real last delivered order */}
          {lastDone ? (
            <>
              <SectionHeader title="order again" />
              <View style={{ marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 20, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {lastDone.items[0]?.image ? (
                  <Image source={lastDone.items[0].image} style={{ width: 60, height: 60, borderRadius: 14 }} contentFit="cover" />
                ) : (
                  <View style={{ width: 60, height: 60, borderRadius: 14, backgroundColor: '#FCE9DD' }} />
                )}
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={{ fontFamily: Font.heading, fontSize: 15, color: INK }}>{lastDone.items[0]?.title ?? 'Your order'}</Text>
                  <Text style={{ fontFamily: Font.body, fontSize: 12, color: MUTED, marginTop: 2 }}>by {lastDone.prepper}</Text>
                  <Text style={{ fontFamily: Font.medium, fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                    ${lastDone.total.toFixed(2)} · delivered {new Date(lastDone.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
                <PressableScale
                  onPress={() => lastDone.firstMealId && router.push(`/meal?id=${lastDone.firstMealId}`)}
                  accessibilityRole="button"
                  accessibilityLabel="Order again"
                  style={{ backgroundColor: ORANGE, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 }}>
                  <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: '#fff' }}>order again</Text>
                </PressableScale>
              </View>
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
