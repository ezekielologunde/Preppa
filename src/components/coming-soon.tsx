import type { LucideIcon } from 'lucide-react-native';
import { MotiView } from 'moti';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';

export function ComingSoon({ Icon, title, subtitle }: { Icon: LucideIcon; title: string; subtitle: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: Palette.canvas }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 }}>
        <MotiView from={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 16, stiffness: 140 }}>
          <View style={{ width: 88, height: 88, borderRadius: 28, backgroundColor: Palette.brandTint, alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={40} color={Palette.brand} />
          </View>
        </MotiView>
        <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 100 }}>
          <Text style={{ fontFamily: Font.display, fontSize: 30, color: Palette.ink, letterSpacing: -0.6 }}>{title}</Text>
        </MotiView>
        <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 260, delay: 160 }}>
          <Text style={{ fontFamily: Font.body, fontSize: 15, color: Palette.textSecondary, textAlign: 'center', maxWidth: 290, lineHeight: 22 }}>{subtitle}</Text>
        </MotiView>
        <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 240, delay: 220 }}>
          <View style={{ backgroundColor: Palette.ink, borderRadius: Radius.pill, paddingHorizontal: 16, paddingVertical: 8, marginTop: 4 }}>
            <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: '#fff' }}>coming soon</Text>
          </View>
        </MotiView>
      </SafeAreaView>
    </View>
  );
}
