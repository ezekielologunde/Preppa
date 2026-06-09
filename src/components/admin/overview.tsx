import { ClipboardList, DollarSign, ShoppingBag, Store, TrendingUp, Users } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Font } from '@/constants/fonts';
import { usePlatformStats } from '@/lib/queries/admin';
import { Admin, Card, money, compact, SectionState, StatCard } from './ui';

export function AdminOverview({ onReviewPreppers }: { onReviewPreppers: () => void }) {
  const { data, isLoading, isError } = usePlatformStats();
  const s = data;

  return (
    <View style={{ gap: 12 }}>
      <SectionState loading={isLoading} error={isError} empty={!s} emptyText="No platform data yet." />
      {s ? (
        <>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            <StatCard label="Total revenue" value={money(s.gmv)} sub={`${money(s.gmv_today)} today`} Icon={DollarSign} tone="success" />
            <StatCard label="Orders" value={compact(s.total_orders)} sub={`${compact(s.orders_today)} today · ${compact(s.open_orders)} open`} Icon={ShoppingBag} tone="brand" />
            <StatCard label="Customers" value={compact(s.total_users)} Icon={Users} tone="brand" />
            <StatCard label="Preppers" value={compact(s.approved_preppers)} sub={`${compact(s.total_preppers)} total`} Icon={Store} tone="success" />
          </View>

          {s.pending_preppers > 0 ? (
            <Card style={{ borderColor: Admin.warn + '55', backgroundColor: Admin.warn + '14' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: Admin.warn + '22', alignItems: 'center', justifyContent: 'center' }}>
                  <ClipboardList size={20} color={Admin.warn} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: Font.heading, fontSize: 15, color: Admin.text }}>
                    {s.pending_preppers} prepper{s.pending_preppers === 1 ? '' : 's'} awaiting approval
                  </Text>
                  <Text onPress={onReviewPreppers} style={{ fontFamily: Font.semibold, fontSize: 13, color: Admin.warn, marginTop: 2 }}>
                    Review applications →
                  </Text>
                </View>
              </View>
            </Card>
          ) : null}

          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <TrendingUp size={16} color={Admin.success} />
              <Text style={{ fontFamily: Font.heading, fontSize: 14, color: Admin.text }}>Platform health</Text>
            </View>
            <Text style={{ fontFamily: Font.body, fontSize: 12, color: Admin.textDim, lineHeight: 18 }}>
              {compact(s.open_orders)} orders in flight, {compact(s.approved_preppers)} active kitchens.
              {s.gmv === 0 ? ' No completed sales yet — revenue appears here once orders complete.' : ''}
            </Text>
          </Card>
        </>
      ) : null}
    </View>
  );
}
