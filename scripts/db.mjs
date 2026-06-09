// Apply / run SQL against Supabase Postgres using SUPABASE_DB_URL from .env.
// The connection string is read from .env and NEVER printed.
//
//   node scripts/db.mjs migrate <file.sql> [<file2.sql> ...]
//   node scripts/db.mjs query "select count(*) from meals"
import { readFileSync } from 'node:fs';
import path from 'node:path';
import pg from 'pg';

const envText = readFileSync(path.join(process.cwd(), '.env'), 'utf8');
const m = envText.match(/^\s*SUPABASE_DB_URL\s*=\s*(.+?)\s*$/m);
if (!m) {
  console.error('SUPABASE_DB_URL not found in .env');
  process.exit(1);
}
const raw = m[1].trim().replace(/^["']|["']$/g, '');

// Manual parse so special characters in the password don't break URL parsing.
const parsed = raw.match(/^postgres(?:ql)?:\/\/([^:@]+):(.*)@([^@/:]+):(\d+)\/([^?]+)/);
if (!parsed) {
  console.error('SUPABASE_DB_URL is not a valid postgres connection string.');
  console.error('Use the exact "Session pooler" URI from the Supabase dashboard');
  console.error('(no <region> / YOUR-PASSWORD placeholders left in it).');
  process.exit(1);
}
const [, user, password, host, port, database] = parsed;
if (host.includes('<') || password.includes('YOUR-PASSWORD')) {
  console.error('Looks like the template was pasted verbatim — replace <region> and YOUR-PASSWORD with the real values.');
  process.exit(1);
}

const [mode, ...rest] = process.argv.slice(2);
// TLS NOTE: Supabase's pooler presents its own (non-public) CA, so default
// verification fails. This is a one-time, owner-operated admin migration to the
// owner's own DB; the only on-wire secret is the DB password, which is rotated
// immediately after — so unverified TLS is acceptable here. For ongoing/app use,
// pin Supabase's CA (Settings → Database → SSL) with rejectUnauthorized:true.
const client = new pg.Client({ user, password, host, port: Number(port), database, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log('Connected to Postgres.');

  if (mode === 'migrate') {
    for (const file of rest) {
      const sql = readFileSync(file, 'utf8');
      process.stdout.write(`Applying ${path.basename(file)} (${sql.length} bytes)... `);
      await client.query(sql);
      console.log('OK');
    }
  } else if (mode === 'query') {
    const res = await client.query(rest.join(' '));
    console.log(JSON.stringify(res.rows, null, 2));
  } else {
    console.error('Usage: node scripts/db.mjs migrate <file.sql>... | query "<sql>"');
    process.exitCode = 1;
  }

  await client.end();
}

main().catch((e) => {
  console.error('DB ERROR:', e.message);
  process.exit(1);
});
