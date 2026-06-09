import { BadgeCheck, Wallet } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Font } from '@/constants/fonts';
import { usePrepperEarnings } from '@/lib/queries/admin';
import { Admin, Card, money, compact, Pill, SectionState } from './ui';

export function AdminEarnings() {
  const { data, isLoading, isError } = usePrepperEarnings();
  const rows = data ?? [];
  const top = rows[0]?.completed_sales ?? 0;
  const totalGmv = rows.reduce((sum, r) => sum + Number(r.completed_sales ?? 0), 0);

  return (
    <View style={{ gap: 12 }}>
      <SectionState loading={isLoading} error={isError} empty={!rows.length} emptyText="No prepper earnings yet." Icon={Wallet} />

      {rows.length ? (
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: Admin.success + '22', alignItems: 'center', justifyContent: 'center' }}>
            <Wallet size={20} color={Admin.success} />
          </View>
          <View>
            <Text style={{ fontFamily: Font.body, fontSize: 12, color: Admin.textDim }}>Total prepper earnings (completed)</Text>
            <Text style={{ fontFamily: Font.display, fontSize: 24, color: Admin.text, fontVariant: ['tabular-nums'] }}>{money(totalGmv)}</Text>
          </View>
        </Card>
      ) : null}

      {rows.map((r) => {
        const pct = top > 0 ? Math.max(4, (Number(r.completed_sales) / top) * 100) : 0;
        return (
          <Card key={r.prepper_id}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 15, color: Admin.text, flex: 1 }} numberOfLines={1}>{r.display_name}</Text>
              {r.verified ? <BadgeCheck size={15} color={Admin.brand} /> : null}
              <Pill label={r.status} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10 }}>
              <View>
                <Text style={{ fontFamily: Font.display, fontSize: 22, color: Admin.success, fontVariant: ['tabular-nums'] }}>{money(r.completed_sales)}</Text>
                <Text style={{ fontFamily: Font.body, fontSize: 11, color: Admin.textMuted }}>completed sales</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontFamily: Font.heading, fontSize: 14, color: Admin.text, fontVariant: ['tabular-nums'] }}>{compact(r.completed_orders)}/{compact(r.total_orders)}</Text>
                <Text style={{ fontFamily: Font.body, fontSize: 11, color: Admin.textMuted }}>orders · avg {money(r.avg_order)}</Text>
              </View>
            </View>

            <View style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)', marginTop: 12, overflow: 'hidden' }}>
              <View style={{ width: `${pct}%`, height: 6, borderRadius: 3, backgroundColor: Admin.brand }} />
            </View>
          </Card>
        );
      })}
    </View>
  );
}
