import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { supabase } from '@/lib/supabase';

/** Which app the user is currently in. Customer and Prepper are two distinct navigators. */
export type ActiveRole = 'customer' | 'prepper';
const ROLE_KEY = 'preppa.activeRole.v1';

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  activeRole: ActiveRole;
  setActiveRole: (role: ActiveRole) => void;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRoleState] = useState<ActiveRole>('customer');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    AsyncStorage.getItem(ROLE_KEY)
      .then((v) => v === 'prepper' && setActiveRoleState('prepper'))
      .catch(() => {});
    return () => sub.subscription.unsubscribe();
  }, []);

  function setActiveRole(role: ActiveRole) {
    setActiveRoleState(role);
    AsyncStorage.setItem(ROLE_KEY, role).catch(() => {});
  }

  const value = useMemo<AuthState>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      activeRole,
      setActiveRole,
      async signIn(email, password) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null };
      },
      async signUp(email, password, fullName) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        // If email confirmation is on, there's a user but no active session yet.
        const needsConfirmation = !error && !!data.user && !data.session;
        return { error: error?.message ?? null, needsConfirmation };
      },
      async signOut() {
        await supabase.auth.signOut();
      },
    }),
    [session, loading, activeRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
