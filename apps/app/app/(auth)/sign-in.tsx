import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Mail } from 'lucide-react-native';
import { emailSchema } from '@preppa/types';
import { Input, Button, useTheme } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';
import { supabase } from '@/lib/supabase';

export default function SignIn() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Enter a valid email');
      return;
    }
    setError(undefined);
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithOtp({
      email: parsed.data,
      options: { shouldCreateUser: true },
    });
    setLoading(false);
    if (err) {
      setError("Couldn't send the code. Check your connection and try again.");
      return;
    }
    router.push({ pathname: '/verify', params: { email: parsed.data } });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: th.bg }}>
      <View style={{ flex: 1, paddingTop: insets.top + space.s2, paddingHorizontal: space.s3 }}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" style={{ width: 40, height: 40, justifyContent: 'center' }}>
          <ChevronLeft size={26} color={th.text} />
        </Pressable>

        <View style={{ gap: space.s2, marginTop: space.s4 }}>
          <Text style={{ color: th.text, fontSize: t.size.displayXl, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tighter }}>
            what's your email?
          </Text>
          <Text style={{ color: th.textSecondary, fontSize: t.size.body, fontFamily: t.family.body }}>
            We'll text a 6-digit code to sign you in. No password to remember.
          </Text>
        </View>

        <View style={{ marginTop: space.s4, gap: space.s3 }}>
          <Input
            label="Email"
            icon={<Mail size={18} color={th.textSecondary} />}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoFocus
            value={email}
            onChangeText={(v) => { setEmail(v); if (error) setError(undefined); }}
            error={error}
            onSubmitEditing={send}
          />
          <Button label={loading ? 'Sending…' : 'Send code'} onPress={send} loading={loading} fullWidth />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
