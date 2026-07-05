import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame } from 'lucide-react-native';
import { Button } from '@preppa/ui';
import { color, space, typography as t } from '@preppa/theme';

/**
 * Honest onboarding. Every goal offered must route to a real MVP path — no "book a
 * chef" / "meal-prep the week" primary goal that dead-ends (council I2). For now this
 * is a welcome + guest browse; real email-OTP auth and verification-gated role are the
 * next slice. Nothing here promises a feature that isn't live.
 */
export default function Onboarding() {
  return (
    <LinearGradient colors={['#0E0E10', '#1a120c']} style={{ flex: 1, padding: space.s5, justifyContent: 'flex-end' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.s4 }}>
        <View style={{ width: 84, height: 84, borderRadius: 26, backgroundColor: color.brand, alignItems: 'center', justifyContent: 'center' }}>
          <Flame size={44} color="#fff" fill="#fff" />
        </View>
        <Text style={{ color: '#fff', fontSize: t.size.displayXl, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tighter }}>
          preppa
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: t.size.title, textAlign: 'center', maxWidth: 300, fontFamily: t.family.body }}>
          Home-cooked food from a local you trust.
        </Text>
      </View>

      <View style={{ gap: space.s2, paddingBottom: space.s5 }}>
        <Button label="Get started" fullWidth onPress={() => router.push('/sign-in')} />
        <Button label="Browse as guest" variant="ghost" fullWidth onPress={() => router.replace('/home')} />
      </View>
    </LinearGradient>
  );
}
