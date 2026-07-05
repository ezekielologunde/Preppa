import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

/**
 * The app ships ONLY the anon key; Row-Level Security is the trust boundary. The
 * service_role key and every Stripe secret live exclusively in Edge Function env.
 *
 * The session is persisted in the device keychain via SecureStore — NOT plain
 * AsyncStorage (the security review flagged token-at-rest exposure). Values are
 * chunked because SecureStore caps individual values at ~2KB and Supabase sessions
 * can exceed that.
 */
const extra = (Constants.expoConfig?.extra ?? {}) as {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
};

const SUPABASE_URL = extra.supabaseUrl ?? process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = extra.supabaseAnonKey ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

const CHUNK = 2000;

const SecureStoreAdapter = {
  async getItem(key: string): Promise<string | null> {
    const meta = await SecureStore.getItemAsync(key);
    if (meta == null) return null;
    const count = Number(meta);
    if (!Number.isInteger(count)) return meta; // legacy single value
    const parts: string[] = [];
    for (let i = 0; i < count; i++) {
      const part = await SecureStore.getItemAsync(`${key}.${i}`);
      if (part == null) return null;
      parts.push(part);
    }
    return parts.join('');
  },
  async setItem(key: string, value: string): Promise<void> {
    const chunks = Math.ceil(value.length / CHUNK);
    await SecureStore.setItemAsync(key, String(chunks));
    for (let i = 0; i < chunks; i++) {
      await SecureStore.setItemAsync(`${key}.${i}`, value.slice(i * CHUNK, (i + 1) * CHUNK));
    }
  },
  async removeItem(key: string): Promise<void> {
    const meta = await SecureStore.getItemAsync(key);
    const count = Number(meta);
    if (Number.isInteger(count)) {
      for (let i = 0; i < count; i++) await SecureStore.deleteItemAsync(`${key}.${i}`);
    }
    await SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: SecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
