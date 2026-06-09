import { useRouter } from 'expo-router';
import { ChevronLeft, Search, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MealCard } from '@/components/meal-card';
import { PressableScale } from '@/components/ui/pressable-scale';
import { CardSkeleton } from '@/components/ui/skeleton';
import { Font } from '@/constants/fonts';
import { useMealSearch } from '@/lib/queries/meals';

const ORANGE = '#f15f22';
const INK = '#111827';
const CARD_W = (Dimensions.get('window').width - 52) / 2;

export default function SearchScreen() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [debounced, setDebounced] = useState('');
  const { data: results, isLoading, isFetching } = useMealSearch(debounced);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(text), 250);
    return () => clearTimeout(t);
  }, [text]);

  const active = debounced.trim().length >= 2;
  const loading = active && (isLoading || isFetching);

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {/* Search bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 8 }}>
          <PressableScale onPress={() => router.back()} accessibilityLabel="Back" style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={24} color={INK} />
          </PressableScale>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 14, height: 50, gap: 8 }}>
            <Search size={19} color="#9ca3af" />
            <TextInput
              autoFocus
              value={text}
              onChangeText={setText}
              placeholder="search meals, cuisines, preppers"
              placeholderTextColor="#9ca3af"
              returnKeyType="search"
              style={{ flex: 1, fontFamily: Font.body, fontSize: 15, color: INK }}
            />
            {text.length > 0 ? (
              <Pressable onPress={() => setText('')} accessibilityLabel="Clear" hitSlop={8}>
                <X size={18} color="#9ca3af" />
              </Pressable>
            ) : null}
          </View>
        </View>

        {/* Results */}
        {!active ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 10 }}>
            <Search size={40} color="#d1d5db" />
            <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#6b7280' }}>find your next meal</Text>
            <Text style={{ fontFamily: Font.body, fontSize: 14, color: '#9ca3af', textAlign: 'center' }}>type at least 2 letters to search</Text>
          </View>
        ) : loading ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 20 }}>
            {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} width={CARD_W} />)}
          </View>
        ) : results && results.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
            <Text style={{ fontFamily: Font.medium, fontSize: 13, color: '#6b7280', marginBottom: 14 }}>{results.length} result{results.length === 1 ? '' : 's'}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {results.map((m) => <MealCard key={m.id} meal={m} width={CARD_W} />)}
            </View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 8 }}>
            <Text style={{ fontFamily: Font.heading, fontSize: 16, color: INK }}>no meals found</Text>
            <Text style={{ fontFamily: Font.body, fontSize: 14, color: '#9ca3af', textAlign: 'center' }}>try a different search — like &quot;bowl&quot; or &quot;pasta&quot;</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
