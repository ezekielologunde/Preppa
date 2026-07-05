import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { color } from '@preppa/theme';
import { useSession, useRole } from '@/api/session';

/**
 * App gate. Role is derived from the SERVER (`profiles.role`) — never a client toggle —
 * and decides which route group (and theme) the user lands in. RLS enforces the real
 * boundary; this is only navigation.
 */
export default function Index() {
  const { session, loading } = useSession();
  const role = useRole(session?.user.id);

  if (loading || (session != null && role.isLoading)) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0E0E10' }}>
        <ActivityIndicator color={color.brand} />
      </View>
    );
  }

  if (session == null) return <Redirect href="/onboarding" />;
  if (role.data === 'prepper') return <Redirect href="/hub" />;
  return <Redirect href="/home" />;
}
