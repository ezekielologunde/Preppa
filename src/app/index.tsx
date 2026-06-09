import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Coffee,
  Gift,
  Leaf,
  MapPin,
  MoreHorizontal,
  MoreVertical,
  Salad,
  Search,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react-native';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MealCard } from '@/components/meal-card';
import { Font } from '@/constants/fonts';
import { categories, orderAgain, recommendedMeals } from '@/constants/mock';

const ORANGE = '#f15f22';
const INK = '#111827';
const MUTED = '#9ca3af';

const ICONS: Record<string, LucideIcon> = {
  Coffee,
  Salad,
  UtensilsCrossed,
  Leaf,
  Sprout,
  MoreHorizontal,
};

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14 }}>
      <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, letterSpacing: -0.5 }}>{title}</Text>
      <Pressable onPress={onSeeAll}>
        <Text style={{ fontFamily: Font.semibold, fontSize: 14, color: ORANGE }}>see all</Text>
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Platform.OS === 'web' ? 70 : 8, paddingBottom: 130 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, gap: 12 }}>
            <View style={{ width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: ORANGE, padding: 2 }}>
              <Image
                source="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=60"
                style={{ flex: 1, borderRadius: 22 }}
                contentFit="cover"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.medium, fontSize: 14, color: '#6b7280' }}>good morning, alex 👋</Text>
              <Text style={{ fontFamily: Font.display, fontSize: 24, color: INK, letterSpacing: -0.6, lineHeight: 28 }}>
                what are you{'\n'}
                <Text style={{ color: ORANGE }}>craving today?</Text>
              </Text>
            </View>
            <Pressable style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={20} color={INK} />
              <View style={{ position: 'absolute', top: 8, right: 9, minWidth: 16, height: 16, borderRadius: 8, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 }}>
                <Text style={{ fontFamily: Font.semibold, fontSize: 9, color: '#fff' }}>3</Text>
              </View>
            </Pressable>
          </View>

          {/* Location */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 6, gap: 4 }}>
            <MapPin size={14} color={ORANGE} />
            <Text style={{ fontFamily: Font.medium, fontSize: 13, color: '#374151' }}>New York, NY</Text>
            <ChevronDown size={14} color="#6b7280" />
          </View>

          {/* Search */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 16, backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 16, height: 54, gap: 10 }}>
            <Search size={20} color={MUTED} />
            <Text style={{ flex: 1, fontFamily: Font.body, fontSize: 15, color: MUTED }}>Search meals, cuisines, or preppers…</Text>
            <SlidersHorizontal size={20} color={ORANGE} />
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 18, paddingVertical: 20 }}>
            {categories.map((c) => {
              const Icon = ICONS[c.icon] ?? MoreHorizontal;
              return (
                <Pressable key={c.key} style={{ alignItems: 'center', gap: 8, width: 58 }}>
                  <View style={{ width: 58, height: 58, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={24} color={c.color} />
                  </View>
                  <Text style={{ fontFamily: Font.medium, fontSize: 12, color: '#374151' }}>{c.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Chef surprise me */}
          <Pressable style={{ marginHorizontal: 20, marginBottom: 26 }}>
            <LinearGradient colors={['#FFE2C8', '#FFD0AE']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={{ fontFamily: Font.display, fontSize: 20, color: INK, letterSpacing: -0.5 }}>chef surprise me</Text>
                <Text style={{ fontFamily: Font.body, fontSize: 13, color: '#7c5a42', lineHeight: 18 }}>tell us your mood, we&apos;ll pick the perfect meal</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: INK, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10, marginTop: 8, gap: 6 }}>
                  <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: '#fff' }}>surprise me</Text>
                  <Sparkles size={14} color="#FFD27D" fill="#FFD27D" />
                </View>
              </View>
              <Image source="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=60" style={{ width: 110, height: 110, borderRadius: 55 }} contentFit="cover" />
            </LinearGradient>
          </Pressable>

          {/* Recommended */}
          <SectionHeader title="recommended for you" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14, paddingBottom: 26 }}>
            {recommendedMeals.map((m) => (
              <MealCard key={m.id} meal={m} />
            ))}
          </ScrollView>

          {/* Points banner */}
          <View style={{ marginHorizontal: 20, marginBottom: 28, backgroundColor: '#E7F6EC', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#22c55e', alignItems: 'center', justifyContent: 'center' }}>
              <Gift size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 15, color: '#14532d' }}>you have 350 points</Text>
              <Text style={{ fontFamily: Font.body, fontSize: 12, color: '#3f6212' }}>unlock rewards & save on your next order</Text>
            </View>
            <View style={{ backgroundColor: INK, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: '#fff' }}>view rewards</Text>
              <ChevronRight size={13} color="#fff" />
            </View>
          </View>

          {/* Order again */}
          <SectionHeader title="order again" />
          <View style={{ marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 20, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Image source={orderAgain.image} style={{ width: 60, height: 60, borderRadius: 14 }} contentFit="cover" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 15, color: INK }}>{orderAgain.title}</Text>
              <Text style={{ fontFamily: Font.body, fontSize: 12, color: MUTED, marginTop: 2 }}>by {orderAgain.prepper}</Text>
              <Text style={{ fontFamily: Font.medium, fontSize: 12, color: '#6b7280', marginTop: 4 }}>${orderAgain.price.toFixed(2)} · delivered on {orderAgain.date}</Text>
            </View>
            <Pressable style={{ backgroundColor: ORANGE, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 }}>
              <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: '#fff' }}>order again</Text>
            </Pressable>
            <Pressable hitSlop={8}>
              <MoreVertical size={18} color={MUTED} />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
