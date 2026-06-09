import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PreppaLogo } from '@/components/preppa-logo';
import { Font } from '@/constants/fonts';
import { useAuth } from '@/providers/auth-provider';

const ORANGE = '#f15f22';
const INK = '#111827';

export default function AuthScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string }>();
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(params.mode === 'signin' ? 'signin' : 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const isSignup = mode === 'signup';

  async function submit() {
    setMsg(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMsg({ text: 'Enter a valid email.', ok: false });
    if (password.length < 6) return setMsg({ text: 'Password must be at least 6 characters.', ok: false });
    if (isSignup && name.trim().length < 2) return setMsg({ text: 'Tell us your name.', ok: false });

    setBusy(true);
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isSignup) {
      const { error, needsConfirmation } = await signUp(email.trim().toLowerCase(), password, name.trim());
      if (error) setMsg({ text: error, ok: false }), setBusy(false);
      else if (needsConfirmation) setMsg({ text: 'Check your email to confirm, then sign in.', ok: true }), setBusy(false);
      else router.replace('/');
    } else {
      const { error } = await signIn(email.trim().toLowerCase(), password);
      if (error) setMsg({ text: error, ok: false }), setBusy(false);
      else router.replace('/');
    }
  }

  const input = {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#F4F4F6',
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: Font.body,
    color: INK,
  } as const;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 24 }}>
        <Pressable onPress={() => router.replace('/')} style={{ alignSelf: 'flex-end', paddingVertical: 12 }}>
          <Text style={{ fontFamily: Font.medium, fontSize: 14, color: '#9ca3af' }}>continue as guest →</Text>
        </Pressable>

        <View style={{ alignItems: 'center', marginTop: 12, marginBottom: 28, gap: 16 }}>
          <PreppaLogo size={72} glow />
          <Text style={{ fontFamily: Font.display, fontSize: 30, color: INK, letterSpacing: -0.8 }}>
            {isSignup ? 'join preppa' : 'welcome back'}
          </Text>
          <Text style={{ fontFamily: Font.body, fontSize: 15, color: '#6b7280', textAlign: 'center', maxWidth: 280 }}>
            {isSignup ? 'Real food from real local Preppas near you.' : 'Sign in to order, save favorites, and more.'}
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {isSignup ? (
            <TextInput style={input} placeholder="full name" placeholderTextColor="#9ca3af" autoCapitalize="words" value={name} onChangeText={setName} />
          ) : null}
          <TextInput style={input} placeholder="you@email.com" placeholderTextColor="#9ca3af" autoCapitalize="none" autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={input} placeholder="password" placeholderTextColor="#9ca3af" secureTextEntry value={password} onChangeText={setPassword} />

          {msg ? (
            <Text style={{ fontFamily: Font.medium, fontSize: 14, color: msg.ok ? '#16a34a' : '#ef4444', paddingHorizontal: 4 }}>{msg.text}</Text>
          ) : null}

          <Pressable
            onPress={submit}
            disabled={busy}
            style={{ height: 54, borderRadius: 16, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', marginTop: 4, opacity: busy ? 0.7 : 1 }}>
            {busy ? <ActivityIndicator color="#fff" /> : (
              <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>{isSignup ? 'Create account' : 'Sign in'}</Text>
            )}
          </Pressable>
        </View>

        <Pressable onPress={() => { setMode(isSignup ? 'signin' : 'signup'); setMsg(null); }} style={{ alignItems: 'center', marginTop: 24 }}>
          <Text style={{ fontFamily: Font.body, fontSize: 14, color: '#6b7280' }}>
            {isSignup ? 'Already a member? ' : "New here? "}
            <Text style={{ fontFamily: Font.heading, color: ORANGE }}>{isSignup ? 'Sign in' : 'Create account'}</Text>
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
