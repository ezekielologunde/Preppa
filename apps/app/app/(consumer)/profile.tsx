import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, CalendarClock, Sparkles, ChefHat, LogOut } from 'lucide-react-native';
import { Badge, Button, useTheme } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';
import { supabase } from '@/lib/supabase';
import { useSession } from '@/api/session';

/** Profile. Plans/experiences rows are honest "coming soon" links (no purchase path,
 *  council I6). "Become a cook" starts the verification-gated application — it does not
 *  grant the prepper role; that happens only on admin approval. */
export default function Profile() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { session } = useSession();

  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top + space.s3, paddingHorizontal: space.s3, gap: space.s3 }}>
      <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>
        profile
      </Text>

      {session == null ? (
        <View style={{ gap: space.s2 }}>
          <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.body }}>
            Sign in to order, track meals, and save cooks.
          </Text>
          <Button label="Sign in" onPress={() => router.push('/sign-in')} />
        </View>
      ) : (
        <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label }}>
          Signed in as {session.user.email}
        </Text>
      )}

      <Row icon={<ChefHat size={20} color={th.text} />} label="Become a cook" onPress={() => router.push('/apply-cook')} />
      <Row icon={<CalendarClock size={20} color={th.text} />} label="Meal plans" comingSoon onPress={() => router.push('/coming-soon/plans')} />
      <Row icon={<Sparkles size={20} color={th.text} />} label="Experiences" comingSoon onPress={() => router.push('/coming-soon/experiences')} />

      {session != null && (
        <Pressable
          onPress={async () => { await supabase.auth.signOut(); router.replace('/onboarding'); }}
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: space.s3, padding: space.s3, opacity: pressed ? 0.6 : 1, marginTop: space.s2 })}
        >
          <LogOut size={20} color={th.textSecondary} />
          <Text style={{ color: th.textSecondary, fontSize: t.size.body, fontFamily: t.family.body, fontWeight: t.weight.semibold }}>Sign out</Text>
        </Pressable>
      )}
    </View>
  );
}

function Row({ icon, label, onPress, comingSoon = false }: { icon: React.ReactNode; label: string; onPress: () => void; comingSoon?: boolean }) {
  const th = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: space.s3, backgroundColor: th.surface, borderRadius: 16, padding: space.s3, opacity: pressed ? 0.7 : 1, borderWidth: 1, borderColor: th.border })}
    >
      {icon}
      <Text style={{ flex: 1, color: th.text, fontSize: t.size.body, fontFamily: t.family.body, fontWeight: t.weight.semibold }}>{label}</Text>
      {comingSoon && <Badge label="coming soon" tone="brand" />}
      <ChevronRight size={18} color={th.textSecondary} />
    </Pressable>
  );
}
