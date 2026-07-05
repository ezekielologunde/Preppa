import { useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, useTheme, formatMoney } from '@preppa/ui';
import { space, typography as t } from '@preppa/theme';
import { useSession } from '@/api/session';
import { useMyKitchen, useEarnings } from '@/api/prepper';
import { useConnectStatus, startConnectOnboarding, cashOut } from '@/api/connect';

/** Earnings — all figures DERIVED server-side from the append-only ledger (never a
 *  client number). Payouts go only to the cook's own verified Connect account; the
 *  amount is computed server-side, so a cook can never withdraw more than earned. */
export default function Money() {
  const th = useTheme();
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const { data: kitchen } = useMyKitchen(session?.user.id);
  const kitchenId = kitchen?.id;
  const { data: earnings, isLoading } = useEarnings(kitchenId);
  const { data: connect } = useConnectStatus(kitchenId);
  const [busy, setBusy] = useState(false);

  const payoutsReady = connect?.payouts_enabled === true;
  const available = earnings?.availableCents ?? 0;

  const setupPayouts = async () => {
    if (!kitchenId) return;
    setBusy(true);
    try {
      const url = await startConnectOnboarding(kitchenId);
      await WebBrowser.openBrowserAsync(url);
    } catch (e) { Alert.alert('Payout setup', e instanceof Error ? e.message : 'Try again.'); } finally { setBusy(false); }
  };

  const doCashOut = async () => {
    if (!kitchenId) return;
    setBusy(true);
    try {
      const res = await cashOut(kitchenId);
      Alert.alert('On its way', `${formatMoney(res.amountCents)} is being sent to your account.`);
    } catch (e) { Alert.alert('Cash out', e instanceof Error ? e.message : 'Try again.'); } finally { setBusy(false); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: th.bg, paddingTop: insets.top + space.s3, paddingHorizontal: space.s3, gap: space.s3 }}>
      <Text style={{ color: th.text, fontSize: t.size.displayLg, fontFamily: t.family.display, fontWeight: t.weight.extrabold, letterSpacing: t.letterSpacing.tight }}>
        money
      </Text>

      {isLoading || earnings == null ? (
        <ActivityIndicator color={th.accent} style={{ marginTop: space.s6 }} />
      ) : (
        <>
          <View style={{ backgroundColor: th.surface, borderRadius: 16, borderWidth: 1, borderColor: th.border, padding: space.s4, gap: space.s2 }}>
            <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.label, fontWeight: t.weight.semibold }}>Available to cash out</Text>
            <Text style={{ color: th.text, fontFamily: t.family.display, fontWeight: t.weight.extrabold, fontSize: t.size.displayXl }}>{formatMoney(available)}</Text>

            {payoutsReady ? (
              <Button label={busy ? 'Working…' : `Cash out ${formatMoney(available)}`} onPress={doCashOut} loading={busy} disabled={available <= 0} fullWidth />
            ) : (
              <Button label={busy ? 'Opening…' : 'Set up payouts'} onPress={setupPayouts} loading={busy} fullWidth />
            )}
            {!payoutsReady && (
              <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.micro }}>
                Verify your bank details with Stripe to receive payouts. Tips are always 100% yours.
              </Text>
            )}
          </View>

          <View style={{ flexDirection: 'row', gap: space.s2 }}>
            <Cell label="Today" value={formatMoney(earnings.todayCents)} th={th} />
            <Cell label="This week" value={formatMoney(earnings.weekCents)} th={th} />
            <Cell label="Lifetime" value={formatMoney(earnings.lifetimeCents)} th={th} />
          </View>
        </>
      )}
    </View>
  );
}

function Cell({ label, value, th }: { label: string; value: string; th: ReturnType<typeof useTheme> }) {
  return (
    <View style={{ flex: 1, backgroundColor: th.surface, borderRadius: 16, borderWidth: 1, borderColor: th.border, padding: space.s3 }}>
      <Text style={{ color: th.textSecondary, fontFamily: t.family.body, fontSize: t.size.micro, fontWeight: t.weight.semibold, textTransform: 'uppercase' }}>{label}</Text>
      <Text style={{ color: th.text, fontFamily: t.family.display, fontWeight: t.weight.extrabold, fontSize: t.size.title, marginTop: 4 }}>{value}</Text>
    </View>
  );
}
