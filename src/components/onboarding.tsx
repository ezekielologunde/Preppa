import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';
import { PreppaLogo } from './preppa-logo';

type Props = {
  onGetStarted: () => void;
  onSignIn?: () => void;
};

const FONT = {
  display: 'Bricolage-ExtraBold',
  bold: 'Bricolage-Bold',
  body: 'Jakarta-Medium',
  logo: Font.logo,
};

/** A soft, drifting gradient orb for depth/motion behind the content. */
function Orb({
  size,
  color,
  left,
  top,
  delay = 0,
  drift = 28,
}: {
  size: number;
  color: string;
  left: number;
  top: number;
  delay?: number;
  drift?: number;
}) {
  return (
    <MotiView
      from={{ translateY: -drift, translateX: -drift / 2, opacity: 0.9 }}
      animate={{ translateY: drift, translateX: drift / 2, opacity: 1 }}
      transition={{ type: 'timing', duration: 5200, loop: true, repeatReverse: true, delay }}
      pointerEvents="none"
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        borderRadius: size / 2,
        experimental_backgroundImage: `radial-gradient(circle, ${color}, transparent 70%)`,
      }}
    />
  );
}

/** High-end orange brand onboarding — animated gradient, glass, haptics, springs. */
export function Onboarding({ onGetStarted, onSignIn }: Props) {
  function handleStart() {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onGetStarted();
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#FF9A3C', '#F15F22', '#D9430F', '#B5260A']}
        locations={[0, 0.4, 0.74, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Orb size={360} color="rgba(255,205,90,0.55)" left={-90} top={-40} delay={0} />
      <Orb size={300} color="rgba(255,77,125,0.5)" left={210} top={120} delay={700} drift={36} />
      <Orb size={260} color="rgba(255,150,60,0.5)" left={-40} top={520} delay={1200} drift={22} />

      <SafeAreaView style={styles.safe}>
        {/* Brand */}
        <View style={styles.center}>
          <MotiView
            from={{ opacity: 0, translateY: 24, scale: 0.9 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 130, delay: 120 }}
            style={styles.brandBlock}>
            <PreppaLogo size={110} tileColor="rgba(255,255,255,0.16)" />
            <Text style={styles.wordmark}>preppa</Text>
            <Text style={styles.tagline}>Real food from real local Preppas near you.</Text>
          </MotiView>
        </View>

        {/* Actions */}
        <MotiView
          from={{ opacity: 0, translateY: 28 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 320 }}
          style={styles.actions}>
          <BlurView intensity={24} tint="light" style={styles.pill}>
            <View style={styles.avatars}>
              <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.95)' }]} />
              <View style={[styles.avatar, styles.avatarOverlap, { backgroundColor: 'rgba(255,255,255,0.75)' }]} />
              <View style={[styles.avatar, styles.avatarOverlap, { backgroundColor: 'rgba(255,255,255,0.55)' }]} />
            </View>
            <Text style={styles.pillText}>Local Preppas joining now</Text>
          </BlurView>

          <Pressable
            onPress={handleStart}
            accessibilityRole="button"
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
            <Text style={styles.ctaText}>Get Started — It&apos;s Free</Text>
          </Pressable>

          <Pressable onPress={onSignIn} accessibilityRole="button" hitSlop={10}>
            {({ pressed }) => (
              <Text style={[styles.signin, pressed && { opacity: 0.6 }]}>
                Already a member? <Text style={styles.signinBold}>Sign in →</Text>
              </Text>
            )}
          </Pressable>
        </MotiView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1500, overflow: 'hidden' },
  safe: { flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 28, paddingTop: 24, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  brandBlock: { alignItems: 'center', gap: 18 },
  wordmark: { fontFamily: FONT.logo, fontSize: 58, color: '#fff', letterSpacing: -1.5, marginTop: 4 },
  tagline: {
    fontFamily: FONT.body,
    fontSize: 19,
    lineHeight: 27,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    maxWidth: 290,
  },
  actions: { width: '100%', alignItems: 'center', gap: 18 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: Radius.pill,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  avatars: { flexDirection: 'row' },
  avatar: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Palette.brand },
  avatarOverlap: { marginLeft: -9 },
  pillText: { fontFamily: FONT.body, color: '#fff', fontSize: 14 },
  cta: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 17,
    shadowColor: '#7a2200',
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  ctaPressed: { transform: [{ scale: 0.97 }], opacity: 0.95 },
  ctaText: { fontFamily: FONT.bold, fontSize: 18, color: '#D9430F' },
  signin: { fontFamily: FONT.body, color: 'rgba(255,255,255,0.9)', fontSize: 15 },
  signinBold: { fontFamily: FONT.bold, color: '#fff', textDecorationLine: 'underline' },
});
