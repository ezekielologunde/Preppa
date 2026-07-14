import { createClient } from "@supabase/supabase-js";

/** These are the project's publishable anon keys — meant to ship in client bundles;
 * the `waitlist` table's RLS only allows anonymous INSERT, never SELECT/UPDATE/DELETE.
 * Real secrets (service_role, Stripe) never appear in this app. */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://fwidhpzwldneeaphrxgg.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_an9UYFEKkeI7unuZZq8suQ_Edkqu4Zp";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
