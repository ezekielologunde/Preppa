import type { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Font } from '@/constants/fonts';

export function ComingSoon({ Icon, title, subtitle }: { Icon: LucideIcon; title: string; subtitle: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 }}>
        <View style={{ width: 88, height: 88, borderRadius: 28, backgroundColor: '#FDEDE4', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={40} color="#f15f22" />
        </View>
        <Text style={{ fontFamily: Font.display, fontSize: 30, color: '#111827', letterSpacing: -0.6 }}>{title}</Text>
        <Text style={{ fontFamily: Font.body, fontSize: 15, color: '#6b7280', textAlign: 'center', maxWidth: 290, lineHeight: 22 }}>{subtitle}</Text>
        <View style={{ backgroundColor: '#111827', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8, marginTop: 4 }}>
          <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: '#fff' }}>coming soon 🔥</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
