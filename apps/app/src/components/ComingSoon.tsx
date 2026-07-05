import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Button, Badge, useTheme } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';

/**
 * Preview-only surface (subscriptions / experiences). PER THE GUARDRAIL there is NO
 * purchase, booking, or price-commit action here — the maximum interaction is a
 * notify-me capture. No transactable table or Edge Function sits behind this screen.
 */
export function ComingSoon({ title, blurb }: { title: string; blurb: string }) {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top + space.s3, padding: space.s3 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s2 }}>
        <ChevronLeft size={26} color={th.text} onPress={() => router.back()} />
        <Text style={{ color: th.text, fontSize: t.size.title, fontFamily: t.family.display, fontWeight: t.weight.bold }}>{title}</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.s3, paddingHorizontal: space.s3 }}>
        <Badge label="coming soon" tone="brand" />
        <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, textAlign: 'center', letterSpacing: t.letterSpacing.tight }}>
          {title}
        </Text>
        <Text style={{ color: th.textSecondary, fontSize: t.size.body, textAlign: 'center', fontFamily: t.family.body, lineHeight: t.size.body * t.lineHeight.body }}>
          {blurb}
        </Text>
        <Button
          label="Notify me when it's live"
          variant="secondary"
          onPress={() => Alert.alert("You're on the list", "We'll let you know the moment this goes live.")}
        />
      </View>
    </View>
  );
}
