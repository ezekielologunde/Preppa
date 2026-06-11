import { useRouter } from 'expo-router';
import { ChevronLeft, Clock, DollarSign, Plus, Users } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';
import { feedback } from '@/lib/feedback';
import { useMyPrepperApplication } from '@/lib/queries/preppers';
import { useAuth } from '@/providers/auth-provider';

const ORANGE = Palette.brand;
const INK = Palette.ink;

// Placeholder data — replace with useQuery once meal_requests table is migrated
const MOCK_REQUESTS = [
  { id: '1', title: 'Jerk chicken meal prep', description: 'Need 10 portions of jerk chicken with rice & peas for a team lunch on Friday.', servings: 10, budget: 15, cuisine: 'Caribbean', deadline: '2026-06-14', bids: 3, poster: 'Marcus T.' },
  { id: '2', title: 'High-protein batch bowls', description: 'Looking for weekly high-protein grain bowls (chicken or tofu) for 2 people, 5 days/week.', servings: 10, budget: 12, cuisine: 'Healthy', deadline: '2026-06-16', bids: 1, poster: 'Priya K.' },
  { id: '3', title: 'Nigerian party food', description: 'Party for 25 people — rice, stew, fried plantain, puff puff. Saturday evening.', servings: 25, budget: 22, cuisine: 'Nigerian', deadline: '2026-06-15', bids: 5, poster: 'Adaeze N.' },
  { id: '4', title: 'Vegan birthday cake', description: 'Need a 3-tier vegan celebration cake, no nuts, pick up Sunday.', servings: 20, budget: 8, cuisine: 'Desserts', deadline: '2026-06-22', bids: 0, poster: 'Sam L.' },
];

type Request = typeof MOCK_REQUESTS[number];

function RequestCard({ r, isPrepper, onBid }: { r: Request; isPrepper: boolean; onBid: (r: Request) => void }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 220 }}
      style={{ backgroundColor: '#fff', borderRadius: 20, padding: 16, gap: 10, marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: Font.heading, fontSize: 16, color: INK }}>{r.title}</Text>
          <Text style={{ fontFamily: Font.body, fontSize: 13, color: Palette.textSecondary, marginTop: 3, lineHeight: 19 }}>{r.description}</Text>
        </View>
        {r.bids > 0 ? (
          <View style={{ backgroundColor: Palette.brandTint, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
            <Text style={{ fontFamily: Font.semibold, fontSize: 12, color: ORANGE }}>{r.bids} bid{r.bids === 1 ? '' : 's'}</Text>
          </View>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Users size={13} color={Palette.textMuted} />
          <Text style={{ fontFamily: Font.medium, fontSize: 12.5, color: Palette.textSecondary }}>{r.servings} servings</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <DollarSign size={13} color={Palette.textMuted} />
          <Text style={{ fontFamily: Font.medium, fontSize: 12.5, color: Palette.textSecondary }}>${r.budget}/serving budget</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Clock size={13} color={Palette.textMuted} />
          <Text style={{ fontFamily: Font.medium, fontSize: 12.5, color: Palette.textSecondary }}>by {new Date(r.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
        <Text style={{ fontFamily: Font.body, fontSize: 12, color: Palette.textMuted }}>from {r.poster} · {r.cuisine}</Text>
        {isPrepper ? (
          <PressableScale onPress={() => onBid(r)} accessibilityRole="button" accessibilityLabel={`Bid on ${r.title}`}
            style={{ height: 38, paddingHorizontal: 18, borderRadius: 12, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: Font.semibold, fontSize: 13.5, color: '#fff' }}>place bid</Text>
          </PressableScale>
        ) : null}
      </View>
    </MotiView>
  );
}

export default function BidRequestsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: prepper } = useMyPrepperApplication(user?.id);
  const isPrepper = prepper?.status === 'approved';

  const [showPost, setShowPost] = useState(false);
  const [bidTarget, setBidTarget] = useState<Request | null>(null);

  // Post request form state
  const [reqTitle, setReqTitle] = useState('');
  const [reqDesc, setReqDesc] = useState('');
  const [reqServings, setReqServings] = useState('');
  const [reqBudget, setReqBudget] = useState('');
  const [posting, setPosting] = useState(false);

  // Bid form state
  const [bidPrice, setBidPrice] = useState('');
  const [bidNote, setBidNote] = useState('');
  const [bidding, setBidding] = useState(false);

  async function submitRequest() {
    if (!reqTitle.trim()) return;
    setPosting(true);
    try {
      // TODO: insert into meal_requests once table is migrated
      feedback.success();
      setShowPost(false);
      setReqTitle(''); setReqDesc(''); setReqServings(''); setReqBudget('');
    } finally {
      setPosting(false);
    }
  }

  async function submitBid() {
    if (!bidPrice || !bidTarget) return;
    setBidding(true);
    try {
      // TODO: insert into meal_request_bids once table is migrated
      feedback.success();
      setBidTarget(null);
      setBidPrice(''); setBidNote('');
    } finally {
      setBidding(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6, gap: 12 }}>
          <PressableScale onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Back"
            style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={24} color={INK} />
          </PressableScale>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: Font.display, fontSize: 24, color: INK, letterSpacing: -0.6 }}>meal requests</Text>
            <Text style={{ fontFamily: Font.body, fontSize: 12.5, color: Palette.textSecondary }}>
              {isPrepper ? 'bid on open requests from customers' : 'post a request — preppers will bid'}
            </Text>
          </View>
          {!isPrepper ? (
            <PressableScale onPress={() => { feedback.tap(); setShowPost(true); }} accessibilityRole="button" accessibilityLabel="Post a request"
              style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={20} color="#fff" />
            </PressableScale>
          ) : null}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
          {MOCK_REQUESTS.map((r, i) => (
            <MotiView key={r.id} from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: i * 50 }}>
              <RequestCard r={r} isPrepper={isPrepper} onBid={(req) => { feedback.tap(); setBidTarget(req); }} />
            </MotiView>
          ))}
        </ScrollView>

        {/* Post request modal */}
        <Modal visible={showPost} transparent animationType="slide" onRequestClose={() => setShowPost(false)}>
          <Pressable onPress={() => setShowPost(false)} style={{ flex: 1, backgroundColor: 'rgba(17,24,39,0.5)', justifyContent: 'flex-end' }}>
            <Pressable onPress={(e) => e.stopPropagation()} style={{ backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 14 }}>
              <Text style={{ fontFamily: Font.display, fontSize: 22, color: INK, letterSpacing: -0.5 }}>post a meal request</Text>
              <TextInput value={reqTitle} onChangeText={setReqTitle} placeholder="What do you need? (e.g. Jerk chicken meal prep)" placeholderTextColor="#9ca3af"
                style={{ height: 50, backgroundColor: '#F4F4F6', borderRadius: 14, paddingHorizontal: 14, fontFamily: Font.body, fontSize: 15, color: INK }} />
              <TextInput value={reqDesc} onChangeText={setReqDesc} placeholder="Details — servings, dietary needs, deadline…" placeholderTextColor="#9ca3af" multiline
                style={{ minHeight: 80, backgroundColor: '#F4F4F6', borderRadius: 14, padding: 14, fontFamily: Font.body, fontSize: 14, color: INK, textAlignVertical: 'top' }} />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TextInput value={reqServings} onChangeText={setReqServings} placeholder="Servings" placeholderTextColor="#9ca3af" keyboardType="number-pad"
                  style={{ flex: 1, height: 50, backgroundColor: '#F4F4F6', borderRadius: 14, paddingHorizontal: 14, fontFamily: Font.body, fontSize: 15, color: INK }} />
                <TextInput value={reqBudget} onChangeText={setReqBudget} placeholder="$ budget / serving" placeholderTextColor="#9ca3af" keyboardType="decimal-pad"
                  style={{ flex: 1, height: 50, backgroundColor: '#F4F4F6', borderRadius: 14, paddingHorizontal: 14, fontFamily: Font.body, fontSize: 15, color: INK }} />
              </View>
              <PressableScale onPress={submitRequest} disabled={posting || !reqTitle.trim()} accessibilityRole="button" accessibilityLabel="Submit request"
                style={{ height: 54, borderRadius: 16, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', opacity: posting || !reqTitle.trim() ? 0.6 : 1 }}>
                {posting ? <ActivityIndicator color="#fff" /> : <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>post request</Text>}
              </PressableScale>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Bid modal */}
        <Modal visible={!!bidTarget} transparent animationType="slide" onRequestClose={() => setBidTarget(null)}>
          <Pressable onPress={() => setBidTarget(null)} style={{ flex: 1, backgroundColor: 'rgba(17,24,39,0.5)', justifyContent: 'flex-end' }}>
            <Pressable onPress={(e) => e.stopPropagation()} style={{ backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: Font.display, fontSize: 20, color: INK, letterSpacing: -0.4, flex: 1 }} numberOfLines={1}>{bidTarget?.title}</Text>
                <PressableScale onPress={() => setBidTarget(null)} accessibilityRole="button" accessibilityLabel="Close" style={{ padding: 4 }}>
                  <ChevronLeft size={22} color={Palette.textMuted} style={{ transform: [{ rotate: '180deg' }] }} />
                </PressableScale>
              </View>
              <Text style={{ fontFamily: Font.body, fontSize: 13, color: Palette.textSecondary, lineHeight: 19 }}>{bidTarget?.description}</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: Font.medium, fontSize: 13, color: INK, marginBottom: 6 }}>your price per serving ($)</Text>
                  <TextInput value={bidPrice} onChangeText={setBidPrice} placeholder={`budget: $${bidTarget?.budget}`} placeholderTextColor="#9ca3af" keyboardType="decimal-pad"
                    style={{ height: 50, backgroundColor: '#F4F4F6', borderRadius: 14, paddingHorizontal: 14, fontFamily: Font.body, fontSize: 15, color: INK }} />
                </View>
              </View>
              <TextInput value={bidNote} onChangeText={setBidNote} placeholder="Message to the customer (optional)" placeholderTextColor="#9ca3af" multiline
                style={{ minHeight: 70, backgroundColor: '#F4F4F6', borderRadius: 14, padding: 14, fontFamily: Font.body, fontSize: 14, color: INK, textAlignVertical: 'top' }} />
              <PressableScale onPress={submitBid} disabled={bidding || !bidPrice} accessibilityRole="button" accessibilityLabel="Submit bid"
                style={{ height: 54, borderRadius: 16, backgroundColor: ORANGE, alignItems: 'center', justifyContent: 'center', opacity: bidding || !bidPrice ? 0.6 : 1 }}>
                {bidding ? <ActivityIndicator color="#fff" /> : <Text style={{ fontFamily: Font.heading, fontSize: 16, color: '#fff' }}>submit bid</Text>}
              </PressableScale>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
