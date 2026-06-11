import { BadgeCheck, Check, Store, X } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Font } from '@/constants/fonts';
import { Radius } from '@/constants/theme';
import { useAdminPreppers, useSetPrepperStatus, useVerifyPrepper } from '@/lib/queries/admin';
import type { PrepperStatus } from '@/types/database.types';
import { Admin, Avatar, Card, Pill, SectionState } from './ui';

const FILTERS: { key: PrepperStatus; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'suspended', label: 'Suspended' },
];

export function AdminPreppers() {
  const [filter, setFilter] = useState<PrepperStatus>('pending');
  const { data, isLoading, isError } = useAdminPreppers(filter);
  const setStatus = useSetPrepperStatus();
  const verifyPrepper = useVerifyPrepper();

  function act(prepperId: string, status: PrepperStatus) {
    setStatus.mutate({ prepperId, status });
  }

  return (
    <View style={{ gap: 12 }}>
      {/* Status filter */}
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <PressableScale
              key={f.key}
              onPress={() => setFilter(f.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${f.label} preppers`}
              style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.pill, backgroundColor: active ? Admin.brand : Admin.card, borderWidth: 1, borderColor: active ? Admin.brand : Admin.border }}>
              <Text style={{ fontFamily: Font.semibold, fontSize: 13, color: active ? '#fff' : Admin.textDim }}>{f.label}</Text>
            </PressableScale>
          );
        })}
      </View>

      <SectionState loading={isLoading} error={isError} empty={!data?.length} emptyText={`No ${filter} preppers.`} Icon={Store} />

      {(data ?? []).map((p) => (
        <Card key={p.id}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Avatar name={p.display_name} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: Font.heading, fontSize: 15, color: Admin.text }}>{p.display_name}</Text>
              <Text style={{ fontFamily: Font.body, fontSize: 12, color: Admin.textDim }} numberOfLines={1}>
                {p.user?.email ?? p.user?.full_name ?? 'no contact'}
              </Text>
            </View>
            <Pill label={p.status} />
          </View>

          {p.bio ? (
            <Text style={{ fontFamily: Font.body, fontSize: 13, color: Admin.textDim, marginTop: 10, lineHeight: 19 }} numberOfLines={3}>
              {p.bio}
            </Text>
          ) : null}
          {p.rejection_note ? (
            <Text style={{ fontFamily: Font.body, fontSize: 12, color: Admin.danger, marginTop: 6 }}>Note: {p.rejection_note}</Text>
          ) : null}

          {/* Identity verification (approved preppers only) */}
          {p.status === 'approved' ? (
            <PressableScale
              onPress={() => verifyPrepper.mutate({ prepperId: p.id, verified: !p.verified })}
              disabled={verifyPrepper.isPending}
              accessibilityRole="button"
              accessibilityLabel={p.verified ? `Remove verification from ${p.display_name}` : `Verify ${p.display_name}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, paddingHorizontal: 12, height: 36, borderRadius: Radius.pill, alignSelf: 'flex-start', backgroundColor: p.verified ? Admin.success + '22' : Admin.card, borderWidth: 1, borderColor: p.verified ? Admin.success + '66' : Admin.border }}>
              <BadgeCheck size={14} color={p.verified ? Admin.success : Admin.textDim} />
              <Text style={{ fontFamily: Font.semibold, fontSize: 12.5, color: p.verified ? Admin.success : Admin.textDim }}>{p.verified ? 'Verified' : 'Mark as verified'}</Text>
            </PressableScale>
          ) : null}

          {/* Actions depend on current status */}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
            {p.status !== 'approved' ? (
              <PressableScale
                onPress={() => act(p.id, 'approved')}
                disabled={setStatus.isPending}
                accessibilityRole="button"
                accessibilityLabel={`Approve ${p.display_name}`}
                style={{ flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', height: 44, borderRadius: Radius.sm, backgroundColor: Admin.success }}>
                <Check size={16} color="#fff" strokeWidth={3} />
                <Text style={{ fontFamily: Font.heading, fontSize: 14, color: '#fff' }}>Approve</Text>
              </PressableScale>
            ) : (
              <PressableScale
                onPress={() => act(p.id, 'suspended')}
                disabled={setStatus.isPending}
                accessibilityRole="button"
                accessibilityLabel={`Suspend ${p.display_name}`}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 44, borderRadius: Radius.sm, borderWidth: 1, borderColor: Admin.border }}>
                <Text style={{ fontFamily: Font.heading, fontSize: 14, color: Admin.textDim }}>Suspend</Text>
              </PressableScale>
            )}
            {p.status !== 'rejected' && p.status !== 'approved' ? (
              <PressableScale
                onPress={() => act(p.id, 'rejected')}
                disabled={setStatus.isPending}
                accessibilityRole="button"
                accessibilityLabel={`Reject ${p.display_name}`}
                style={{ width: 52, alignItems: 'center', justifyContent: 'center', height: 44, borderRadius: Radius.sm, borderWidth: 1, borderColor: Admin.danger + '55' }}>
                <X size={18} color={Admin.danger} />
              </PressableScale>
            ) : null}
          </View>
        </Card>
      ))}
    </View>
  );
}
