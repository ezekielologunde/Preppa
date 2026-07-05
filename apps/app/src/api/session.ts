import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

/** The current auth session, kept live via Supabase's auth state listener. */
export function useSession(): { session: Session | null; loading: boolean } {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}

export type Role = 'customer' | 'prepper' | 'admin';

/**
 * The user's role is read from the server (`profiles.role`) — NEVER a client toggle.
 * Route grouping and theme follow this value; RLS enforces the real access boundary.
 */
export function useRole(userId: string | undefined) {
  return useQuery({
    queryKey: ['role', userId],
    enabled: userId != null,
    queryFn: async (): Promise<Role> => {
      const { data, error } = await supabase.from('profiles').select('role').eq('id', userId!).single();
      if (error) throw error;
      return (data?.role as Role) ?? 'customer';
    },
  });
}
