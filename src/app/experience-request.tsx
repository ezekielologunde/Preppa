import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check, ChevronLeft, Minus, Plus, ShoppingBag, X } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { ListSkeleton } from '@/components/ui/skeleton';
import { feedback } from '@/lib/feedback';
import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';
import { useAcceptBid, useCreateExperienceRequest, useMyExperienceRequests } from '@/lib/queries/experiences';
import { useFeatureEnabled } from '@/lib/queries/feature-flags';
import { useAuth } from '@/providers/auth-provider';
import type { ExperienceKind } from '@/types/database.types';

const ORANGE = Palette.brand;
const INK = Palette.ink;
const KINDS: { key: ExperienceKind; label: string }[] = [
  { key: 'catering', label: 'Catering' },
  { key: 'private_chef', label: 'Private chef' },
  { key: 'food_service', label: 'Food service' },
  { key: 'cleaning', label: 'Cleaning' },
  { key: 'class', label: 'Cooking class' },
  { key: 'tasting', label: 'Tasting menu' },
];
const BUDGET_PRESETS = [500, 1000, 2000, 5000, 10000];
const money = (n: number | null) => (n == null ? '—' : `$${n.toLocaleString('en-US')}`);

const cleanLine = (s: string) => s.replace(/[\x00-\x1F\x7F]/g, ' ').replace(/\s+/g, ' ');
const cleanBlock = (s: string) => s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

function GuestStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18, backgroundColor: Palette.canvas, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderColor: Palette.border }}>
      <PressableScale onPress={() => { feedback.tap(); onChange(Math.max(1, value - 1)); }} disabled={value <= 1}
        style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: Palette.surface, alignItems: 'center', justifyContent: 'center', opacity: value <= 1 ? 0.35 : 1 }}>
        <Minus size={15} color={INK} />
      </PressableScale>
      <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, minWidth: 34, textAlign: 'center', fontVariant: ['tabular-nums'] }}>{value}</Text>
      <PressableScale onPress={() => { feedback.tap(); onChange(Math.min(500, value + 1)); }} disabled={value >= 500}
        style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: ORANGE + '1A', alignItems: 'center', justifyContent: 'center', opacity: value >= 500 ? 0.35 : 1 }}>
        <Plus size={15} color={ORANGE} />
      </PressableScale>
    </View>
  );
}

function BudgetPicker({ value, onChange }: { value: number | null; onChange: (n: number | null) => void }) {
  const [custom, setCustom] = useState(value != null && !BUDGET_PRESETS.includes(value));
  const [raw, setRaw] = useState(value != null && !BUDGET_PRESETS.includes(value) ? String(value) : '');
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {BUDGET_PRESETS.map((p) => {
          const on = !custom && value === p;
          return (
            <PressableScale key={p} onPress={() => { feedback.tap(); setCustom(false); onChange(p); }}
              style={{ paddingHorizontal: 14, height: 40, borderRadius: Radius.pill, borderWidth: 1.5, borderColor: on ? ORANGE : Palette.border, backgroundColor: on ? Palette.brandTint : Palette.canvas, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: on ? ORANGE : INK }}>${(p / 1000).toFixed(p < 1000 ? 0 : 1)}k</Text>
            </PressableScale>
          );
        })}
        <PressableScale onPress={() => { feedback.tap(); setCustom(true); onChange(null); }}
          style={{ paddingHorizontal: 14, height: 40, borderRadius: Radius.pill, borderWidth: 1.5, borderColor: custom ? ORANGE : Palette.border, backgroundColor: custom ? Palette.brandTint : Palette.canvas, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: custom ? ORANGE : INK }}>Custom</Text>
        </PressableScale>
      </View>
      {custom ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Palette.canvas, borderRadius: 14, borderWidth: 1, borderColor: Palette.border, overflow: 'hidden' }}>
          <View style={{ paddingHorizontal: 12, height: 50, backgroundColor: Palette.surface, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: Palette.border }}>
            <Text style={{ fontFamily: Font.heading, fontSize: 15, color: Palette.textSecondary }}>$</Text>
          </View>
          <TextInput value={raw} onChangeText={(t) => { const n = t.replace(/[^0-9.]/g, ''); setRaw(n); const v = parseFloat(n); onChange(!isNaN(v) && v > 0 ? v : null); }}
            placeholder="enter amount" placeholderTextColor={Palette.textMuted} keyboardType="numeric" maxLength={8}
            style={{ flex: 1, height: 50, paddingHorizontal: 12, fontFamily: Font.body, fontSize: 15, color: INK }}
            accessibilityLabel="Custom budget" />
        </View>
      ) : null}
    </View>
  );
}

export default function ExperienceRequestScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ kind?: string }>();
  const { data: requests, isLoading, refetch } = useMyExperienceRequests(user?.id);
  const [refreshing, setRefreshing] = useState(false);
  async function handleRefresh() { setRefreshing(true); await refetch(); setRefreshing(false); }
  const create = useCreateExperienceRequest();
  const accept = useAcceptBid();
  const paymentsOn = useFeatureEnabled('payments');

  type PendingBid = { id: string; prepperName: string; amount: number | null; message?: string | null; requestTitle: string };
  const [pendingBid, setPendingBid] = useState<PendingBid | null>(null);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  const initialKind = (KINDS.find((k) => k.key === params.kind)?.key ?? 'catering') as ExperienceKind;
  const [kind, setKind] = useState<ExperienceKind>(initialKind);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [guests, setGuests] = useState(10);
  const [budget, setBudget] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [titleTouched, setTitleTouched] = useState(false);
  type PostedExp = { title: string; kind: ExperienceKind; guests: number; budget: number | null };
  const [postSuccess, setPostSuccess] = useState<PostedExp | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const myRequestsY = useRef(0);

  function goBack() {
    feedback.tap();
    if (router.canGoBack()) { router.back(); } else { router.replace('/experiences'); }
  }

  function submit() {
    setErr(null);
    if (!user) return router.push('/auth?mode=signup');
    const cleanTitle = cleanLine(title).trim();
    if (cleanTitle.length < 3) { setTitleTouched(true); return setErr('Give your request a short title (at least 3 characters).'); }
    feedback.tap();
    create.mutate(
      {
        userId: user.id,
        kind,
        title: cleanTitle.slice(0, 100),
        details: cleanBlock(details).trim().slice(0, 500),
        guests,
        budget,
        location: cleanLine(location).trim().slice(0, 200),
      },
      {
        onSuccess: () => {
          feedback.success();
          setPostSuccess({ title: cleanTitle.slice(0, 100), kind, guests, budget });
          setTitle(''); setDetails(''); setGuests(10); setBudget(null); setLocation('');
          setTitleTouched(false);
          setTimeout(() => scrollRef.current?.scrollTo({ y: myRequestsY.current, animated: true }), 500);
        },
        onError: (e) => setErr(e instanceof Error ? e.message : 'Could not post request.'),
      },
    );
  }

  const inputStyle = { height: 50, borderRadius: 14, backgroundColor: Palette.canvas, paddingHorizontal: 14, fontSize: 15, fontFamily: Font.body, color: INK, borderWidth: 1, borderColor: Palette.border } as const;

  return (
    <View style={{ flex: 1, backgroundColor: Palette.surface }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}>
          <PressableScale onPress={goBack} accessibilityRole="button" accessibilityLabel="Go back"
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Palette.canvas, alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={22} color={INK} />
          </PressableScale>
          <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, letterSpacing: -0.5 }}>Post a request</Text>
        </View>

        <ScrollView ref={scrollRef} style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={ORANGE} colors={[ORANGE]} />}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

          {/* Kind selector */}
          <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 300 }}>
          <Text style={{ fontFamily: Font.heading, fontSize: 13, color: INK, marginTop: 8, marginBottom: 8 }}>What do you need?</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {KINDS.map((k) => {
              const on = kind === k.key;
              return (
                <MotiView key={k.key} animate={{ backgroundColor: on ? Palette.brandTint : Palette.canvas, borderColor: on ? ORANGE : Palette.border }}
                  transition={{ type: 'timing', duration: 180 }}
                  style={{ borderRadius: Radius.pill, borderWidth: 1, overflow: 'hidden' }}>
                  <PressableScale onPress={() => { feedback.tap(); setKind(k.key); }} accessibilityRole="button"
                    accessibilityState={{ selected: on }} accessibilityLabel={k.label} style={{ paddingHorizontal: 14, paddingVertical: 9 }}>
                    <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: on ? ORANGE : Palette.inkSoft }}>{k.label}</Text>
                  </PressableScale>
                </MotiView>
              );
            })}
          </View>
          </MotiView>

          {postSuccess ? (
            <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 300 }}
              style={{ marginTop: 20, backgroundColor: Palette.canvas, borderRadius: 20, padding: 22, gap: 16, alignItems: 'center' }}>
              <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: Palette.success + '18', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={30} color={Palette.success} strokeWidth={2.5} />
                </View>
              </MotiView>
              <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, letterSpacing: -0.5, textAlign: 'center' }}>Request sent!</Text>
              <View style={{ width: '100%', backgroundColor: Palette.surface, borderRadius: 16, padding: 14, gap: 8, borderWidth: 1, borderColor: Palette.border }}>
                <Text style={{ fontFamily: Font.heading, fontSize: 11, color: Palette.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {KINDS.find((k) => k.key === postSuccess.kind)?.label ?? postSuccess.kind}
                </Text>
                <Text style={{ fontFamily: Font.heading, fontSize: 15, color: INK }}>{postSuccess.title}</Text>
                <Text style={{ fontFamily: Font.body, fontSize: 13, color: Palette.textSecondary }}>
                  {postSuccess.guests} guests{postSuccess.budget != null ? ` · budget ${money(postSuccess.budget)}` : ''}
                </Text>
                <View style={{ backgroundColor: Palette.brandTint, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', marginTop: 2 }}>
                  <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: ORANGE }}>Open · accepting bids</Text>
                </View>
              </View>
              <Text style={{ fontFamily: Font.body, fontSize: 13, color: Palette.textSecondary, textAlign: 'center', lineHeight: 19 }}>
                Preppers near you will bid on your request. Scroll down to review bids as they arrive.
              </Text>
              <PressableScale onPress={() => setPostSuccess(null)} accessibilityRole="button" accessibilityLabel="Post another request"
                style={{ height: 46, borderRadius: Radius.pill, backgroundColor: Palette.surface, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, borderWidth: 1, borderColor: Palette.border }}>
                <Text style={{ fontFamily: Font.semibold, fontSize: 14, color: INK }}>Post another request</Text>
              </PressableScale>
            </MotiView>
          ) : (
            <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 300, delay: 80 }}>
            <View style={{ gap: 14, marginTop: 16 }}>
              <View style={{ gap: 4 }}>
                <Text style={{ fontFamily: Font.medium, fontSize: 13.5, color: INK }}>
                  Title <Text style={{ color: Palette.danger }}>*</Text>
                </Text>
                <TextInput
                  style={[inputStyle, { borderColor: titleTouched && title.trim().length < 3 ? Palette.danger : Palette.border, borderWidth: 1.5 }]}
                  placeholder="e.g. Birthday dinner for 8"
                  placeholderTextColor={Palette.textMuted}
                  value={title}
                  onChangeText={(t) => setTitle(cleanLine(t))}
                  onBlur={() => setTitleTouched(true)}
                  maxLength={100}
                />
                {titleTouched && title.trim().length < 3 ? (
                  <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.danger }}>At least 3 characters required</Text>
                ) : (
                  <Text style={{ fontFamily: Font.body, fontSize: 11.5, color: Palette.textMuted, textAlign: 'right' }}>{title.length}/100</Text>
                )}
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontFamily: Font.medium, fontSize: 13.5, color: INK }}>
                  Details <Text style={{ fontFamily: Font.body, color: Palette.textMuted }}>(optional)</Text>
                </Text>
                <TextInput
                  style={[inputStyle, { height: 90, paddingTop: 14, textAlignVertical: 'top' }]}
                  placeholder="Cuisine preferences, dietary needs, vibe…"
                  placeholderTextColor={Palette.textMuted}
                  value={details}
                  onChangeText={(t) => setDetails(cleanBlock(t))}
                  multiline
                  maxLength={500}
                />
                <Text style={{ fontFamily: Font.body, fontSize: 11.5, color: Palette.textMuted, textAlign: 'right' }}>{details.length}/500</Text>
              </View>

              <View style={{ gap: 6 }}>
                <Text style={{ fontFamily: Font.medium, fontSize: 13.5, color: INK }}>Number of guests</Text>
                <GuestStepper value={guests} onChange={setGuests} />
              </View>

              <View style={{ gap: 6 }}>
                <Text style={{ fontFamily: Font.medium, fontSize: 13.5, color: INK }}>
                  Approximate budget <Text style={{ fontFamily: Font.body, color: Palette.textMuted }}>(optional)</Text>
                </Text>
                <BudgetPicker value={budget} onChange={setBudget} />
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontFamily: Font.medium, fontSize: 13.5, color: INK }}>
                  Location <Text style={{ fontFamily: Font.body, color: Palette.textMuted }}>(optional)</Text>
                </Text>
                <TextInput
                  style={inputStyle}
                  placeholder="Neighbourhood or address"
                  placeholderTextColor={Palette.textMuted}
                  value={location}
                  onChangeText={(t) => setLocation(cleanLine(t))}
                  maxLength={200}
                />
              </View>
            </View>
            </MotiView>
          )}

          {!postSuccess && err ? (
            <MotiView from={{ opacity: 0, translateY: -4 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 200 }}>
              <View style={{ backgroundColor: '#FEF2F2', borderRadius: 12, padding: 12, marginTop: 14, borderWidth: 1, borderColor: '#FECACA' }}>
                <Text style={{ fontFamily: Font.medium, fontSize: 13.5, color: '#991B1B' }}>{err}</Text>
              </View>
            </MotiView>
          ) : null}

          {!postSuccess ? (
            <MotiView from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 280, delay: 160 }}>
            <PressableScale onPress={submit} disabled={create.isPending || title.trim().length < 3} accessibilityRole="button" accessibilityLabel="Post request"
              style={{ height: 52, borderRadius: Radius.pill, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', marginTop: 18, opacity: create.isPending || title.trim().length < 3 ? 0.5 : 1 }}>
              {create.isPending ? <ActivityIndicator color="#fff" /> : <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>Post request</Text>}
            </PressableScale>
            </MotiView>
          ) : null}

          {/* My requests */}
          <MotiView from={{ opacity: 0, translateY: 6 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 260, delay: 200 }}
            onLayout={(e) => { myRequestsY.current = e.nativeEvent.layout.y; }}>
            <Text style={{ fontFamily: Font.display, fontSize: 15, color: INK, letterSpacing: -0.3, marginTop: 24, marginBottom: 10 }}>my requests</Text>
          </MotiView>
          {isLoading ? (
            <ListSkeleton count={2} rowHeight={100} />
          ) : !requests?.length ? (
            <View style={{ backgroundColor: Palette.canvas, borderRadius: Radius.md, padding: 20, alignItems: 'center' }}>
              <Text style={{ fontFamily: Font.body, fontSize: 13, color: Palette.textSecondary, textAlign: 'center' }}>
                {user ? 'No requests yet. Post one above to start receiving bids.' : 'Sign in to post a request and track bids.'}
              </Text>
            </View>
          ) : (
            <View style={{ gap: 12 }}>
              {requests.map((r, i) => (
                <MotiView key={r.id} from={{ opacity: 0, translateY: 8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 260, delay: i * 45 }}>
                <View style={{ backgroundColor: Palette.surface, borderWidth: 1, borderColor: Palette.border, borderRadius: Radius.md, padding: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontFamily: Font.heading, fontSize: 15, color: INK, flex: 1 }}>{r.title}</Text>
                    <View style={{ backgroundColor: r.status === 'open' ? Palette.brandTint : Palette.success + '1A', borderRadius: Radius.pill, paddingHorizontal: 9, paddingVertical: 3 }}>
                      <Text style={{ fontFamily: Font.semibold, fontSize: 11, color: r.status === 'open' ? ORANGE : Palette.success, textTransform: 'capitalize' }}>{r.status}</Text>
                    </View>
                  </View>
                  <Text style={{ fontFamily: Font.body, fontSize: 12.5, color: Palette.textSecondary, marginTop: 4 }}>
                    {r.guests ? `${r.guests} guests · ` : ''}{r.budget ? `budget ${money(r.budget)} · ` : ''}{r.location ?? ''}
                  </Text>
                  <Text style={{ fontFamily: Font.heading, fontSize: 12, color: Palette.textMuted, marginTop: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {r.bids.length ? `${r.bids.length} bid${r.bids.length === 1 ? '' : 's'}` : 'No bids yet'}
                  </Text>
                  {r.bids.map((b) => (
                    <View key={b.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Palette.border }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: Font.heading, fontSize: 14, color: INK }}>{b.prepper?.display_name ?? 'Prepper'} · {money(b.amount)}</Text>
                        {b.message ? <Text style={{ fontFamily: Font.body, fontSize: 12.5, color: Palette.textSecondary, marginTop: 1 }} numberOfLines={2}>{b.message}</Text> : null}
                      </View>
                      {b.status === 'accepted' ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <Check size={15} color={Palette.success} strokeWidth={3} />
                          <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: Palette.success }}>Booked</Text>
                        </View>
                      ) : r.status === 'open' && b.status === 'pending' ? (
                        <PressableScale onPress={() => { feedback.tap(); setPendingBid({ id: b.id, prepperName: b.prepper?.display_name ?? 'Prepper', amount: b.amount ?? null, message: b.message, requestTitle: r.title }); }}
                          accessibilityRole="button" accessibilityLabel={`Review bid from ${b.prepper?.display_name ?? 'prepper'}`}
                          style={{ paddingHorizontal: 14, height: 38, borderRadius: Radius.pill, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontFamily: Font.heading, fontSize: 13, color: '#fff' }}>Review</Text>
                        </PressableScale>
                      ) : (
                        <Text style={{ fontFamily: Font.medium, fontSize: 12, color: Palette.textMuted, textTransform: 'capitalize' }}>{b.status}</Text>
                      )}
                    </View>
                  ))}
                </View>
                </MotiView>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Agreement modal */}
        <Modal visible={!!pendingBid} transparent animationType="slide" onRequestClose={() => { setPendingBid(null); setAcceptError(null); }}>
          <Pressable onPress={() => { setPendingBid(null); setAcceptError(null); }} style={{ flex: 1, backgroundColor: Palette.overlay, justifyContent: 'flex-end' }}>
            <Pressable onPress={(e) => e.stopPropagation()} style={{ backgroundColor: Palette.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '85%' }}>
              <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 24, gap: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ fontFamily: Font.display, fontSize: 20, color: INK, letterSpacing: -0.5 }}>review & agree</Text>
                    <Text style={{ fontFamily: Font.body, fontSize: 13, color: Palette.textSecondary, marginTop: 2 }}>Bid from {pendingBid?.prepperName}</Text>
                  </View>
                  <PressableScale onPress={() => { feedback.tap(); setPendingBid(null); setAcceptError(null); }} accessibilityRole="button" accessibilityLabel="Close"
                    style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Palette.canvas, alignItems: 'center', justifyContent: 'center' }}>
                    <X size={18} color={Palette.inkSoft} />
                  </PressableScale>
                </View>
                <View style={{ backgroundColor: Palette.canvas, borderRadius: 16, padding: 16, gap: 8 }}>
                  <Text style={{ fontFamily: Font.heading, fontSize: 12, color: Palette.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>request</Text>
                  <Text style={{ fontFamily: Font.semibold, fontSize: 15, color: INK }}>{pendingBid?.requestTitle}</Text>
                  <View style={{ height: 1, backgroundColor: Palette.divider, marginVertical: 4 }} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontFamily: Font.body, fontSize: 14, color: Palette.textSecondary }}>Bid amount</Text>
                    <Text style={{ fontFamily: Font.display, fontSize: 20, color: ORANGE, letterSpacing: -0.4 }}>
                      {pendingBid?.amount != null ? `$${pendingBid.amount.toLocaleString('en-US')}` : 'To be confirmed'}
                    </Text>
                  </View>
                </View>
                {pendingBid?.message ? (
                  <View style={{ backgroundColor: Palette.canvas, borderRadius: 14, padding: 14 }}>
                    <Text style={{ fontFamily: Font.heading, fontSize: 12, color: Palette.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Note from prepper</Text>
                    <Text style={{ fontFamily: Font.body, fontSize: 13.5, color: Palette.textSecondary, lineHeight: 20 }}>{pendingBid.message}</Text>
                  </View>
                ) : null}
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: paymentsOn ? Palette.brandTint : Palette.canvas, borderRadius: 14, padding: 14 }}>
                  <ShoppingBag size={16} color={paymentsOn ? ORANGE : Palette.textMuted} style={{ marginTop: 1 }} />
                  <Text style={{ flex: 1, fontFamily: Font.body, fontSize: 13, color: paymentsOn ? ORANGE : Palette.textSecondary, lineHeight: 19 }}>
                    {paymentsOn ? 'Payment is secured via Stripe and only collected when you tap Agree & Pay.' : 'Pay when confirmed — settle directly with the prepper once they confirm.'}
                  </Text>
                </View>
                {acceptError ? (
                  <View style={{ backgroundColor: '#FEF2F2', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#FECACA' }}>
                    <Text style={{ fontFamily: Font.medium, fontSize: 13, color: '#991B1B' }}>{acceptError}</Text>
                  </View>
                ) : null}
                <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textMuted, textAlign: 'center', lineHeight: 17 }}>
                  By tapping below you agree to Preppa's Terms of Service. Both parties are bound to fulfil this agreement.
                </Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <PressableScale onPress={() => { feedback.tap(); setPendingBid(null); setAcceptError(null); }} accessibilityRole="button" accessibilityLabel="Cancel"
                    style={{ flex: 1, height: 52, borderRadius: Radius.pill, backgroundColor: Palette.canvas, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Palette.divider }}>
                    <Text style={{ fontFamily: Font.semibold, fontSize: 15, color: Palette.textSecondary }}>Cancel</Text>
                  </PressableScale>
                  <PressableScale
                    onPress={async () => {
                      if (!pendingBid) return;
                      setAcceptError(null);
                      try {
                        await accept.mutateAsync(pendingBid.id);
                        feedback.success();
                        setPendingBid(null);
                      } catch (e) {
                        feedback.error();
                        const msg = e instanceof Error ? e.message : '';
                        if (msg.includes('bid_already_processed')) setAcceptError('This bid has already been processed.');
                        else if (msg.includes('request_not_open')) setAcceptError('This request has already been booked.');
                        else setAcceptError('Could not book. Please try again.');
                      }
                    }}
                    disabled={accept.isPending} accessibilityRole="button" accessibilityLabel={paymentsOn ? 'Agree and pay' : 'Agree and book'}
                    style={{ flex: 2, height: 52, borderRadius: Radius.pill, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', opacity: accept.isPending ? 0.7 : 1 }}>
                    {accept.isPending ? <ActivityIndicator color="#fff" /> : <Text style={{ fontFamily: Font.heading, fontSize: 15, color: '#fff' }}>{paymentsOn ? 'Agree & Pay' : 'Agree & Book'}</Text>}
                  </PressableScale>
                </View>
              </ScrollView>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
