import { useRouter } from 'expo-router';
import { ChevronDown, Headset, MessageCircle, Search } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useMemo, useState } from 'react';
import { Linking, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsHeader } from '@/components/settings-ui';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Shadow } from '@/constants/theme';
import { feedback } from '@/lib/feedback';

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  { q: 'What if my meals come from two different chefs?', a: 'Each chef prepares and hands off their own meals, so a single plan can span multiple kitchens. You will see a separate delivery or pickup window per chef on your tracker, and you only pay each chef for what they cook.' },
  { q: 'How do I skip a week?', a: 'Open My Subscriptions, pick the plan, and tap “Skip” on any upcoming delivery before that week’s cutoff. Skipped weeks are not charged, and your plan resumes automatically the following cycle.' },
  { q: 'What is the order cutoff time?', a: 'Most chefs set a cutoff the day before cooking — commonly 6:00 PM local time. The exact cutoff for each plan is shown on the delivery calendar; changes after cutoff move to the next available window.' },
  { q: 'Can I mix one-off meals with a subscription?', a: 'Yes. Subscription meals arrive on your schedule, and you can add à-la-carte preorders from any local kitchen at checkout. They are billed separately from your plan.' },
  { q: 'How does billing work across chefs?', a: 'Individual preorders are charged at checkout. Subscription plans are charged per cycle. Your billing history (in Payment & Invoicing) itemizes each chef and each plan so corporate stipends reconcile cleanly.' },
  { q: 'A meal was late or wrong — what do I do?', a: 'For anything about a specific meal or delivery, message the chef directly from the Support hub below — they can fix it fastest. For payment or app issues, contact Preppa support.' },
];

function FaqAccordion({ faq, open, onToggle }: { faq: Faq; open: boolean; onToggle: () => void }) {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Palette.border }}>
      <PressableScale
        onPress={() => { feedback.tap(); onToggle(); }}
        accessibilityRole="button"
        accessibilityLabel={faq.q}
        accessibilityState={{ expanded: open }}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 15 }}>
        <Text style={{ flex: 1, fontFamily: Font.heading, fontSize: 14.5, color: Palette.ink, lineHeight: 20 }}>{faq.q}</Text>
        <MotiView animate={{ rotate: open ? '180deg' : '0deg' }} transition={{ type: 'timing', duration: 200 }}>
          <ChevronDown size={18} color={Palette.textSecondary} />
        </MotiView>
      </PressableScale>
      {open ? (
        <MotiView from={{ opacity: 0, translateY: -4 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220 }}
          style={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 0 }}>
          <Text style={{ fontFamily: Font.body, fontSize: 13.5, color: Palette.textSecondary, lineHeight: 21 }}>{faq.a}</Text>
        </MotiView>
      ) : null}
    </View>
  );
}

function SupportCard({ Icon, tint, title, sub, onPress }: { Icon: typeof MessageCircle; tint: string; title: string; sub: string; onPress: () => void }) {
  return (
    <PressableScale
      onPress={() => { feedback.tap(); onPress(); }}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${sub}`}
      style={{ flex: 1, backgroundColor: Palette.surface, borderRadius: 18, padding: 16, gap: 10, ...Shadow.card }}>
      <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: tint + '1A', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={21} color={tint} />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={{ fontFamily: Font.heading, fontSize: 14.5, color: Palette.ink }}>{title}</Text>
        <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textMuted, lineHeight: 16 }}>{sub}</Text>
      </View>
    </PressableScale>
  );
}

export default function HelpKnowledgeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <View style={{ flex: 1, backgroundColor: Palette.canvas }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <SettingsHeader title="help & knowledge" subtitle="Answers to common multi-chef questions — and a fast line to a human." />
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: 8, paddingBottom: 40, gap: 20 }}>
          {/* Search */}
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 50, borderRadius: 16, backgroundColor: Palette.surface, paddingHorizontal: 14, ...Shadow.card }}>
              <Search size={18} color={Palette.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search FAQs…"
                placeholderTextColor={Palette.textMuted}
                style={{ flex: 1, fontFamily: Font.body, fontSize: 14.5, color: Palette.ink }}
                accessibilityLabel="Search frequently asked questions"
                returnKeyType="search"
              />
            </View>
          </View>

          {/* FAQ accordions */}
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontFamily: Font.semibold, fontSize: 11.5, color: Palette.textMuted, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8, paddingHorizontal: 4 }}>frequently asked</Text>
            <View style={{ backgroundColor: Palette.surface, borderRadius: 20, overflow: 'hidden', ...Shadow.card }}>
              {filtered.length === 0 ? (
                <Text style={{ fontFamily: Font.body, fontSize: 13.5, color: Palette.textMuted, padding: 18, textAlign: 'center' }}>
                  No answers match “{query.trim()}”. Try the support options below.
                </Text>
              ) : (
                filtered.map((faq, i) => (
                  <FaqAccordion key={faq.q} faq={faq} open={openIdx === i} onToggle={() => setOpenIdx((cur) => (cur === i ? null : i))} />
                ))
              )}
            </View>
          </View>

          {/* Support hub */}
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontFamily: Font.semibold, fontSize: 11.5, color: Palette.textMuted, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8, paddingHorizontal: 4 }}>still need help?</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <SupportCard
                Icon={MessageCircle}
                tint={Palette.brand}
                title="Message your chef"
                sub="Meal or delivery issues — fastest fix"
                onPress={() => router.push('/messages?tab=messages')}
              />
              <SupportCard
                Icon={Headset}
                tint="#0EA5E9"
                title="Contact Preppa"
                sub="Payments or technical bugs"
                onPress={() => { Linking.openURL('mailto:support@preppa.live?subject=Preppa%20Support').catch(() => {}); }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
