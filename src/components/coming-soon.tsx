import type { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';

export function ComingSoon({ Icon, title, subtitle }: { Icon: LucideIcon; title: string; subtitle: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: Palette.canvas }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 }}>
        <View style={{ width: 88, height: 88, borderRadius: 28, backgroundColor: Palette.brandTint, alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={40} color={Palette.brand} />
        </View>
        <Text style={{ fontFamily: Font.display, fontSize: 30, color: Palette.ink, letterSpacing: -0.6 }}>{title}</Text>
        <Text style={{ fontFamily: Font.body, fontSize: 15, color: Palette.textSecondary, textAlign: 'center', maxWidth: 290, lineHeight: 22 }}>{subtitle}</Text>
        <View style={{ backgroundColor: Palette.ink, borderRadius: Radius.pill, paddingHorizontal: 16, paddingVertical: 8, marginTop: 4 }}>
          <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: '#fff' }}>coming soon</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
