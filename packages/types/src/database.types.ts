/**
 * GENERATED FILE — do not edit by hand.
 *
 * Regenerate from the live schema with:
 *     pnpm types:gen        (runs `supabase gen types typescript --local`)
 *
 * CI runs `pnpm types:check` (scripts/check-types-fresh.mjs) and fails the build
 * if this file drifts from the migrations — so the app's types can never lie
 * about the schema. Until the first `types:gen` runs, this placeholder keeps the
 * workspace type-checkable.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// Placeholder until `pnpm types:gen` overwrites this file with the real schema.
export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
