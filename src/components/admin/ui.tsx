import type { ReactNode } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { Font } from '@/constants/fonts';
import { Palette, Radius } from '@/constants/theme';

/** Dark admin surface tokens — restrained, premium, derived from Palette. */
export const Admin = {
  bg: Palette.prepperBg,
  card: Palette.prepperCard,
  cardAlt: '#1B1F28',
  border: 'rgba(255,255,255,0.08)',
  text: '#F4F5F7',
  textDim: '#9AA1AD',
  textMuted: '#6B7280',
  brand: Palette.brand,
  success: Palette.success,
  danger: '#EF4444',
  warn: '#F59E0B',
} as const;

export const money = (n: number | null | undefined) =>
  `$${(n ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const compact = (n: number | null | undefined) => (n ?? 0).toLocaleString('en-US');

export function Card({ children, style }: { children: ReactNode; style?: object }) {
  return (
    <View style={[{ backgroundColor: Admin.card, borderRadius: Radius.md, borderWidth: 1, borderColor: Admin.border, padding: 16 }, style]}>
      {children}
    </View>
  );
}

export function StatCard({ label, value, sub, Icon, tone = 'brand' }: { label: string; value: string; sub?: string; Icon?: LucideIcon; tone?: 'brand' | 'success' | 'danger' | 'warn' }) {
  const tint = Admin[tone];
  return (
    <Card style={{ flex: 1, minWidth: 150 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: Font.medium, fontSize: 12, color: Admin.textDim }}>{label}</Text>
        {Icon ? (
          <View style={{ width: 28, height: 28, borderRadius: 9, backgroundColor: tint + '22', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={15} color={tint} />
          </View>
        ) : null}
      </View>
      <Text style={{ fontFamily: Font.display, fontSize: 26, color: Admin.text, marginTop: 8, fontVariant: ['tabular-nums'], letterSpacing: -0.5 }}>{value}</Text>
      {sub ? <Text style={{ fontFamily: Font.body, fontSize: 12, color: Admin.textMuted, marginTop: 2 }}>{sub}</Text> : null}
    </Card>
  );
}

const PILL_TONES: Record<string, { bg: string; fg: string }> = {
  pending: { bg: '#F59E0B22', fg: '#F59E0B' },
  approved: { bg: '#16A34A22', fg: '#22C55E' },
  rejected: { bg: '#EF444422', fg: '#F87171' },
  suspended: { bg: '#6B728022', fg: '#9CA3AF' },
  active: { bg: '#16A34A22', fg: '#22C55E' },
  completed: { bg: '#16A34A22', fg: '#22C55E' },
  confirmed: { bg: '#F15F2222', fg: '#F15F22' },
  preparing: { bg: '#F15F2222', fg: '#F15F22' },
  ready: { bg: '#F15F2222', fg: '#F15F22' },
  out_for_delivery: { bg: '#F15F2222', fg: '#F15F22' },
  cancelled: { bg: '#EF444422', fg: '#F87171' },
  deleted: { bg: '#EF444422', fg: '#F87171' },
};

export function Pill({ label }: { label: string }) {
  const tone = PILL_TONES[label] ?? { bg: 'rgba(255,255,255,0.08)', fg: Admin.textDim };
  return (
    <View style={{ alignSelf: 'flex-start', backgroundColor: tone.bg, borderRadius: Radius.pill, paddingHorizontal: 9, paddingVertical: 3 }}>
      <Text style={{ fontFamily: Font.semibold, fontSize: 11, color: tone.fg, textTransform: 'capitalize' }}>{label.replace(/_/g, ' ')}</Text>
    </View>
  );
}

export function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() || '?';
  return (
    <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: Admin.brand + '22', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: Font.heading, fontSize: 14, color: Admin.brand }}>{initials}</Text>
    </View>
  );
}

export function SectionState({ loading, error, empty, emptyText, Icon }: { loading: boolean; error: boolean; empty: boolean; emptyText: string; Icon?: LucideIcon }) {
  if (loading) return <View style={{ paddingVertical: 48, alignItems: 'center' }}><ActivityIndicator color={Admin.brand} /></View>;
  if (error)
    return (
      <Card style={{ alignItems: 'center', paddingVertical: 28 }}>
        <Text style={{ fontFamily: Font.heading, fontSize: 14, color: Admin.text }}>Couldn&apos;t load this</Text>
        <Text style={{ fontFamily: Font.body, fontSize: 12, color: Admin.textDim, marginTop: 4, textAlign: 'center' }}>
          You may not have admin access yet, or the database migration hasn&apos;t run.
        </Text>
      </Card>
    );
  if (empty)
    return (
      <Card style={{ alignItems: 'center', paddingVertical: 32 }}>
        {Icon ? <Icon size={26} color={Admin.textMuted} /> : null}
        <Text style={{ fontFamily: Font.body, fontSize: 13, color: Admin.textDim, marginTop: 8, textAlign: 'center' }}>{emptyText}</Text>
      </Card>
    );
  return null;
}
