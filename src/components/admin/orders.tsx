import { ChevronDown, ChevronUp, Receipt } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { useAdminOrders } from '@/lib/queries/admin';
import { Admin, Card, money, Pill, SectionState } from './ui';

function ReceiptLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: strong ? 8 : 4 }}>
      <Text style={{ fontFamily: strong ? Font.heading : Font.body, fontSize: strong ? 14 : 12, color: strong ? Admin.text : Admin.textDim }}>{label}</Text>
      <Text style={{ fontFamily: strong ? Font.heading : Font.medium, fontSize: strong ? 14 : 12, color: strong ? Admin.text : Admin.textDim, fontVariant: ['tabular-nums'] }}>{value}</Text>
    </View>
  );
}

export function AdminOrders() {
  const { data, isLoading, isError } = useAdminOrders();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <View style={{ gap: 12 }}>
      <SectionState loading={isLoading} error={isError} empty={!data?.length} emptyText="No orders yet. Receipts appear here once customers check out." Icon={Receipt} />

      {(data ?? []).map((o) => {
        const expanded = open === o.id;
        const customer = o.customer?.full_name ?? o.customer?.email?.split('@')[0] ?? 'guest';
        const date = new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return (
          <Card key={o.id} style={{ padding: 0, overflow: 'hidden' }}>
            <PressableScale
              onPress={() => setOpen(expanded ? null : o.id)}
              accessibilityRole="button"
              accessibilityLabel={`Order from ${customer}, ${money(o.total)}`}
              style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontFamily: Font.heading, fontSize: 15, color: Admin.text }}>{money(o.total)}</Text>
                  <Pill label={o.status} />
                </View>
                <Text style={{ fontFamily: Font.body, fontSize: 12, color: Admin.textDim, marginTop: 3 }}>
                  {customer} → {o.prepper?.display_name ?? 'prepper'} · {date}
                </Text>
              </View>
              {expanded ? <ChevronUp size={18} color={Admin.textMuted} /> : <ChevronDown size={18} color={Admin.textMuted} />}
            </PressableScale>

            {expanded ? (
              <View style={{ paddingHorizontal: 16, paddingBottom: 16, borderTopWidth: 1, borderTopColor: Admin.border, paddingTop: 12 }}>
                {o.items.map((it, i) => (
                  <ReceiptLine key={i} label={`${it.quantity}× ${it.meal?.title ?? 'item'}`} value={money(it.total)} />
                ))}
                <View style={{ height: 1, backgroundColor: Admin.border, marginVertical: 10 }} />
                <ReceiptLine label="Subtotal" value={money(o.subtotal)} />
                {o.tax ? <ReceiptLine label="Tax" value={money(o.tax)} /> : null}
                {o.delivery_fee ? <ReceiptLine label="Delivery" value={money(o.delivery_fee)} /> : null}
                {o.service_fee ? <ReceiptLine label="Service" value={money(o.service_fee)} /> : null}
                {o.tip ? <ReceiptLine label="Tip" value={money(o.tip)} /> : null}
                <ReceiptLine label="Total" value={money(o.total)} strong />
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontFamily: Font.medium, fontSize: 12, color: Admin.textMuted }}>Payment</Text>
                  <Pill label={o.payment?.status ?? 'unpaid'} />
                  {o.payment ? <Text style={{ fontFamily: Font.body, fontSize: 12, color: Admin.textMuted }}>· {o.payment.provider}</Text> : null}
                </View>
              </View>
            ) : null}
          </Card>
        );
      })}
    </View>
  );
}
