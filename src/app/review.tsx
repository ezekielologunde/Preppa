import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check, ChevronLeft, Star } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';
import { feedback } from '@/lib/feedback';
import { useSubmitReview } from '@/lib/queries/reviews';
import { useAuth } from '@/providers/auth-provider';

const ORANGE = Palette.brand;
const INK = Palette.ink;

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
const QUICK_PHRASES: Record<number, string[]> = {
  1: ['Arrived late', 'Wrong order', 'Not as described'],
  2: ['Below expectations', 'Portion was small', 'Needs improvement'],
  3: ['Pretty good', 'As expected', 'Would try again'],
  4: ['Really enjoyed it', 'Fresh and tasty', 'Good portions'],
  5: ['Absolutely delicious!', 'Perfect portions', 'Will order again!', 'Exceeded expectations'],
};

export default function ReviewScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { orderId, prepperId, mealId, prepper } = useLocalSearchParams<{ orderId?: string; prepperId?: string; mealId?: string; prepper?: string }>();
  const submit = useSubmitReview();
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function goBack() {
    feedback.tap();
    try { router.back(); } catch { router.replace('/orders'); }
  }

  function send() {
    if (!user || !orderId || !prepperId || rating < 1) return;
    setErr(null);
    submit.mutate(
      { orderId, authorId: user.id, prepperId, mealId: mealId || null, rating, body },
      { onSuccess: () => setDone(true), onError: (e) => setErr(e instanceof Error ? e.message : 'Could not submit review.') },
    );
  }

  if (done) {
    return (
      <View style={{ flex: 1, backgroundColor: Palette.surface }}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 14 }}>
          <MotiView from={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 12, stiffness: 180 }}>
            <View style={{ width: 76, height: 76, borderRadius: 24, backgroundColor: Palette.success + '1F', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={36} color={Palette.success} strokeWidth={3} />
            </View>
          </MotiView>
          <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 80 }}>
            <Text style={{ fontFamily: Font.display, fontSize: 24, color: INK, textAlign: 'center' }}>Thanks for the review!</Text>
          </MotiView>
          <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 140 }}>
            <Text style={{ fontFamily: Font.body, fontSize: 15, color: Palette.textSecondary, textAlign: 'center', lineHeight: 22, maxWidth: 300 }}>
              Your feedback helps {prepper ?? 'the prepper'} and other customers.
            </Text>
          </MotiView>
          <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 200 }}>
            <PressableScale onPress={() => { feedback.tap(); router.replace('/orders'); }} accessibilityRole="button" accessibilityLabel="Back to orders" style={{ marginTop: 6, paddingHorizontal: 24, height: 52, borderRadius: Radius.sm, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>Back to orders</Text>
            </PressableScale>
          </MotiView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Palette.surface }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}>
          <PressableScale onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back" style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Palette.canvas, alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={22} color={INK} />
          </PressableScale>
          <Text style={{ fontFamily: Font.display, fontSize: 24, color: INK, letterSpacing: -0.6 }}>leave a review</Text>
        </View>

        <View style={{ padding: 24, gap: 20 }}>
          <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 60 }}>
            <Text style={{ fontFamily: Font.body, fontSize: 15, color: Palette.textSecondary, textAlign: 'center' }}>
              How was your order from {prepper ?? 'this prepper'}?
            </Text>
          </MotiView>

          {/* Star picker + rating label */}
          <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 120 }}>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <PressableScale key={n} onPress={() => { feedback.tap(); setRating(n); }} accessibilityRole="button" accessibilityLabel={`${n} star${n > 1 ? 's' : ''}`} style={{ padding: 4 }}>
                    <Star size={40} color={n <= rating ? Palette.amber : Palette.border} fill={n <= rating ? Palette.amber : 'transparent'} />
                  </PressableScale>
                ))}
              </View>
              {rating > 0 ? (
                <MotiView from={{ opacity: 0, translateY: 4 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 180 }}>
                  <Text style={{ fontFamily: Font.semibold, fontSize: 14, color: Palette.amber }}>{RATING_LABELS[rating]}</Text>
                </MotiView>
              ) : null}
            </View>
          </MotiView>

          {/* Quick-phrase chips */}
          {rating > 0 && !body ? (
            <MotiView from={{ opacity: 0, translateY: 6 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 2 }}>
                {(QUICK_PHRASES[rating] ?? []).map((phrase) => (
                  <PressableScale key={phrase} onPress={() => { feedback.tap(); setBody(phrase); }} accessibilityRole="button" accessibilityLabel={phrase}
                    style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: Palette.canvas, borderWidth: 1, borderColor: Palette.border }}>
                    <Text style={{ fontFamily: Font.medium, fontSize: 13, color: Palette.inkSoft }}>{phrase}</Text>
                  </PressableScale>
                ))}
              </ScrollView>
            </MotiView>
          ) : null}

          <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 180 }}>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Share a few words (optional)"
              placeholderTextColor={Palette.textMuted}
              multiline
              style={{ minHeight: 120, borderRadius: Radius.md, backgroundColor: Palette.canvas, padding: 16, fontFamily: Font.body, fontSize: 15, color: INK, textAlignVertical: 'top' }}
            />
          </MotiView>

          {err ? <Text style={{ fontFamily: Font.medium, fontSize: 13.5, color: Palette.danger, textAlign: 'center' }}>{err}</Text> : null}

          <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 240 }}>
            <PressableScale
              onPress={() => { feedback.tap(); send(); }}
              disabled={rating < 1 || submit.isPending}
              accessibilityRole="button"
              accessibilityLabel="Submit review"
              style={{ height: 54, borderRadius: 16, backgroundColor: rating < 1 ? Palette.textMuted : ORANGE, alignItems: 'center', justifyContent: 'center', opacity: submit.isPending ? 0.7 : 1 }}>
              {submit.isPending ? <ActivityIndicator color="#fff" /> : <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>Submit review</Text>}
            </PressableScale>
          </MotiView>
        </View>
      </SafeAreaView>
    </View>
  );
}
