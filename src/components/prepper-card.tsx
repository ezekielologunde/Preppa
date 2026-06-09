import { Image } from 'expo-image';
import { BadgeCheck, Heart, Star } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Font } from '@/constants/fonts';
import type { TopPrepper } from '@/lib/queries/preppers';

const ORANGE = '#f15f22';

/** "Top preppers near you" card — chef hero, rating, tags, starting price. */
export function PrepperCard({ prepper }: { prepper: TopPrepper }) {
  return (
    <Pressable style={{ width: 210 }}>
      <View style={{ borderRadius: 20, overflow: 'hidden', backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 2 }}>
        <View style={{ height: 130, backgroundColor: '#FCE9DD' }}>
          {prepper.image ? <Image source={prepper.image} style={{ flex: 1 }} contentFit="cover" transition={250} /> : null}
          <View style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={16} color="#9ca3af" />
          </View>
        </View>
        <View style={{ padding: 12, gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text numberOfLines={1} style={{ fontFamily: Font.heading, fontSize: 15, color: '#111827', flexShrink: 1 }}>{prepper.name}</Text>
            {prepper.verified ? <BadgeCheck size={15} color={ORANGE} fill={ORANGE} stroke="#fff" /> : null}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Star size={13} color="#f59e0b" fill="#f59e0b" />
            <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: '#374151' }}>{prepper.rating.toFixed(1)}</Text>
            <Text style={{ fontFamily: Font.body, fontSize: 12, color: '#9ca3af' }}>({prepper.reviews})</Text>
          </View>
          {prepper.tags.length ? (
            <Text numberOfLines={1} style={{ fontFamily: Font.body, fontSize: 12, color: '#9ca3af' }}>{prepper.tags.join(' · ')}</Text>
          ) : null}
          {prepper.from != null ? (
            <View style={{ alignSelf: 'flex-start', backgroundColor: '#FDEDE4', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, marginTop: 2 }}>
              <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: ORANGE }}>from ${prepper.from.toFixed(0)}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
