#!/usr/bin/env node
/**
 * CI staleness guard for the generated Supabase types.
 *
 * packages/types/src/database.types.ts is GENERATED (`pnpm types:gen`), never hand-authored.
 * This regenerates into a temp buffer and fails if it differs from what's committed —
 * so the app's types can never silently drift from the live schema.
 *
 * Requires the Supabase CLI + a running local db (CI starts one before this step).
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const COMMITTED = 'packages/types/src/database.types.ts';

let fresh;
try {
  fresh = execSync('supabase gen types typescript --local', { encoding: 'utf8' });
} catch (e) {
  console.error('✗ Could not run `supabase gen types` — is the local db up? (`supabase start`)');
  console.error(String(e.message || e));
  process.exit(2);
}

const committed = readFileSync(COMMITTED, 'utf8');
const norm = (s) => s.replace(/\r\n/g, '\n').trimEnd();

if (norm(fresh) !== norm(committed)) {
  console.error(`✗ ${COMMITTED} is STALE. Run \`pnpm types:gen\` and commit the result.`);
  process.exit(1);
}
console.log('✓ Generated Supabase types are fresh.');
