import { View, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';

/** Cook storefront. Exact pickup address is intentionally NOT shown here — it's
 *  revealed only post-acceptance to the paying customer (security review: no home-cook
 *  doxxing pre-purchase). Full listing grid lands in build-order step 7. */
export default function CookStore() {
  const { kitchenId } = useLocalSearchParams<{ kitchenId: string }>();
  const th = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top + space.s3, padding: space.s3, gap: space.s3 }}>
      <ChevronLeft size={26} color={th.text} onPress={() => router.back()} />
      <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold }}>
        Kitchen
      </Text>
      <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label }}>#{kitchenId}</Text>
    </View>
  );
}
