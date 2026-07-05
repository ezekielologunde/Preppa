import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { otpSchema } from '@preppa/types';
import { Input, Button, useTheme } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';
import { supabase } from '@/lib/supabase';

export default function Verify() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    const parsed = otpSchema.safeParse(code);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Enter the 6-digit code');
      return;
    }
    setError(undefined);
    setLoading(true);
    const { error: err } = await supabase.auth.verifyOtp({
      email: email ?? '',
      token: parsed.data,
      type: 'email',
    });
    setLoading(false);
    if (err) {
      setError('That code is incorrect or expired. Request a new one.');
      return;
    }
    // Session is set; the gate re-evaluates and routes by server-derived role.
    router.replace('/');
  };

  const resend = async () => {
    if (email == null) return;
    await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    setError(undefined);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: th.bg }}>
      <View style={{ flex: 1, paddingTop: insets.top + space.s2, paddingHorizontal: space.s3 }}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" style={{ width: 40, height: 40, justifyContent: 'center' }}>
          <ChevronLeft size={26} color={th.text} />
        </Pressable>

        <View style={{ gap: space.s2, marginTop: space.s4 }}>
          <Text style={{ color: th.text, fontSize: t.size.displayXl, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tighter }}>
            enter your code
          </Text>
          <Text style={{ color: th.textSecondary, fontSize: t.size.body, fontFamily: t.family.body }}>
            Sent to {email ?? 'your email'}.
          </Text>
        </View>

        <View style={{ marginTop: space.s4, gap: space.s3 }}>
          <Input
            label="6-digit code"
            placeholder="000000"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            value={code}
            onChangeText={(v) => { setCode(v.replace(/\D/g, '')); if (error) setError(undefined); }}
            error={error}
            onSubmitEditing={verify}
          />
          <Button label={loading ? 'Verifying…' : 'Verify'} onPress={verify} loading={loading} fullWidth />
          <Button label="Resend code" variant="ghost" onPress={resend} fullWidth />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
