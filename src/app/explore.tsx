import { LinearGradient } from 'expo-linear-gradient';
import {
  CakeSlice,
  ChevronDown,
  Coffee,
  Compass,
  Cookie,
  LayoutGrid,
  Leaf,
  MapPin,
  MoreHorizontal,
  Salad,
  Scan,
  Search,
  Sparkles,
  Sprout,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react-native';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CuisineCard } from '@/components/cuisine-card';
import { MealCard } from '@/components/meal-card';
import { PrepperCard } from '@/components/prepper-card';
import { Font } from '@/constants/fonts';
import { cuisines, exploreCategories } from '@/constants/mock';
import { useFeaturedMeals } from '@/lib/queries/meals';
import { useTopPreppers } from '@/lib/queries/preppers';

const ORANGE = '#f15f22';
const INK = '#111827';
const MUTED = '#9ca3af';

const ICONS: Record<string, LucideIcon> = {
  LayoutGrid, Coffee, Salad, UtensilsCrossed, Cookie, CakeSlice, Leaf, Sprout, MoreHorizontal,
};

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14 }}>
      <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, letterSpacing: -0.5 }}>{title}</Text>
      <Pressable><Text style={{ fontFamily: Font.semibold, fontSize: 14, color: ORANGE }}>see all</Text></Pressable>
    </View>
  );
}

export default function ExploreScreen() {
  const { data: preppers } = useTopPreppers();
  const { data: meals } = useFeaturedMeals();

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: Platform.OS === 'web' ? 16 : 8, paddingBottom: 130 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.display, fontSize: 32, color: INK, letterSpacing: -1 }}>explore</Text>
              <Text style={{ fontFamily: Font.body, fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                amazing meals from <Text style={{ fontFamily: Font.semibold, color: ORANGE }}>local preppers</Text> 👨‍🍳
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 9 }}>
              <MapPin size={14} color={ORANGE} />
              <Text style={{ fontFamily: Font.medium, fontSize: 13, color: '#374151' }}>New York, NY</Text>
              <ChevronDown size={14} color="#6b7280" />
            </View>
          </View>

          {/* Search */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 16, backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 16, height: 54, gap: 10 }}>
            <Search size={20} color={MUTED} />
            <Text style={{ flex: 1, fontFamily: Font.body, fontSize: 15, color: MUTED }}>search meals, cuisines, or preppers</Text>
            <Scan size={20} color={ORANGE} />
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16, paddingVertical: 20 }}>
            {exploreCategories.map((c, i) => {
              const Icon = ICONS[c.icon] ?? MoreHorizontal;
              const active = i === 0;
              return (
                <Pressable key={c.key} style={{ alignItems: 'center', gap: 8, width: 60 }}>
                  <View style={{ width: 60, height: 60, borderRadius: 20, backgroundColor: active ? '#FDEDE4' : '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: active ? 1 : 0, borderColor: '#F8C9B0' }}>
                    <Icon size={24} color={c.color} />
                  </View>
                  <Text style={{ fontFamily: active ? Font.semibold : Font.medium, fontSize: 12, color: active ? ORANGE : '#374151' }}>{c.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Cuisines */}
          <SectionHeader title="cuisines" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 26 }}>
            {cuisines.map((c) => <CuisineCard key={c.id} cuisine={c} />)}
          </ScrollView>

          {/* Top preppers (live) */}
          <SectionHeader title="top preppers near you" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14, paddingBottom: 26 }}>
            {(preppers ?? []).map((p) => <PrepperCard key={p.id} prepper={p} />)}
          </ScrollView>

          {/* Popular (live) */}
          <SectionHeader title="popular right now 🔥" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14, paddingBottom: 26 }}>
            {(meals ?? []).map((m) => <MealCard key={m.id} meal={m} />)}
          </ScrollView>

          {/* Can't decide */}
          <Pressable style={{ marginHorizontal: 20 }}>
            <LinearGradient colors={['#FFE2C8', '#FFD0AE']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 24, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={24} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: Font.heading, fontSize: 16, color: INK }}>can&apos;t decide?</Text>
                <Text style={{ fontFamily: Font.body, fontSize: 13, color: '#7c5a42', marginTop: 2 }}>let our chef assistant find the perfect meal 🍜</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: INK, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9, gap: 5 }}>
                <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: '#fff' }}>surprise me</Text>
                <Sparkles size={13} color="#FFD27D" fill="#FFD27D" />
              </View>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
