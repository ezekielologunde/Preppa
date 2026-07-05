import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { prepperApplicationInput } from '@preppa/types';
import { Input, Button, Badge, useTheme } from '@preppa/ui';
import { color, space, typography as t } from '@preppa/theme';
import { supabase } from '@/lib/supabase';
import { useSession } from '@/api/session';

/**
 * Cook application. Calls the verification-gated RPC — it creates a DRAFT (unverified,
 * paused) kitchen + a pending verification. It does NOT grant the prepper role; that
 * happens only when an admin approves. Honest about that: the success state says
 * "under review", never "you're live".
 */
export default function ApplyCook() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { session } = useSession();

  const [kitchenName, setKitchenName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [approxArea, setApproxArea] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (session == null) {
    return (
      <Centered insetTop={insets.top}>
        <Text style={{ color: th.text, fontSize: t.size.title, fontFamily: t.family.display, fontWeight: t.weight.bold, textAlign: 'center' }}>
          Sign in to apply
        </Text>
        <Button label="Sign in" onPress={() => router.push('/sign-in')} />
      </Centered>
    );
  }

  if (submitted) {
    return (
      <Centered insetTop={insets.top}>
        <ShieldCheck size={48} color={color.success} strokeWidth={2} />
        <Badge label="under review" tone="warning" />
        <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, textAlign: 'center' }}>
          Application received
        </Text>
        <Text style={{ color: th.textSecondary, fontSize: t.size.body, textAlign: 'center', fontFamily: t.family.body, lineHeight: t.size.body * t.lineHeight.body }}>
          Every Preppa is ID-verified before selling a single plate. We'll review your
          kitchen and let you know — you'll get cook tools once you're approved.
        </Text>
        <Button label="Done" onPress={() => router.replace('/home')} />
      </Centered>
    );
  }

  const submit = async () => {
    const parsed = prepperApplicationInput.safeParse({ kitchenName, cuisine: cuisine || undefined, approxArea });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    const { error } = await supabase.rpc('request_prepper_application', {
      p_kitchen_name: parsed.data.kitchenName,
      p_cuisine: parsed.data.cuisine ?? null,
      p_approx_area: parsed.data.approxArea,
    });
    setLoading(false);
    if (error) {
      setErrors({ kitchenName: error.message.includes('pending') ? 'You already have a pending application.' : "Couldn't submit. Try again." });
      return;
    }
    setSubmitted(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: th.bg }}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + space.s2, paddingHorizontal: space.s3, paddingBottom: space.s6, gap: space.s3 }}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" style={{ width: 40, height: 40, justifyContent: 'center' }}>
          <ChevronLeft size={26} color={th.text} />
        </Pressable>
        <Text style={{ color: th.text, fontSize: t.size.displayXl, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tighter }}>
          become a cook
        </Text>
        <Text style={{ color: th.textSecondary, fontSize: t.size.body, fontFamily: t.family.body }}>
          Tell us about your kitchen. We verify every cook before you can list — this
          starts your application.
        </Text>

        <Input label="Kitchen name" placeholder="Maria's Kitchen" value={kitchenName} onChangeText={setKitchenName} error={errors.kitchenName} />
        <Input label="Cuisine (optional)" placeholder="Italian comfort" value={cuisine} onChangeText={setCuisine} error={errors.cuisine} />
        <Input label="Approximate area" placeholder="Hillcrest, San Diego" value={approxArea} onChangeText={setApproxArea} error={errors.approxArea} />

        <Button label={loading ? 'Submitting…' : 'Submit application'} onPress={submit} loading={loading} fullWidth />
      </ScrollView>
    </View>
  );
}

function Centered({ children, insetTop }: { children: React.ReactNode; insetTop: number }) {
  const th = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insetTop, alignItems: 'center', justifyContent: 'center', gap: space.s3, padding: space.s4 }}>
      {children}
    </View>
  );
}
