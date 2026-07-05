#!/usr/bin/env node
/**
 * Guardrail enforcement — the council's "bidding stays dead" condition, mechanised.
 *
 * The open-bidding / gig / catering-auction marketplace was DELIBERATELY KILLED
 * (fraud exposure + conflict with Preppa's trust-and-relationship positioning).
 * This fails the build if the killed feature's identifiers — or a transactable path
 * behind the preview-only surfaces — reappear in real CODE.
 *
 * It scans source under apps/, packages/, supabase/. Comments and string literals
 * are stripped BEFORE matching, so explanatory prose ("no catering tables exist")
 * is fine — only live identifiers trip it. Line numbers are preserved.
 *
 * Exit non-zero on any hit so CI blocks the merge.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, sep } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['apps', 'packages', 'supabase'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.sql', '.mjs', '.cjs']);

// The killed-feature vocabulary, as identifiers. Letter-only boundaries so that
// snake_case identifiers like CATER_OPEN and MY_BIDS are caught (underscore/digit
// counts as a delimiter, unlike \b), while letter-embedded words (forBIDden) don't.
const FORBIDDEN = [
  /(?<![A-Za-z])(BID|BIDS|BIDDER|BIDDING|CATER|CATERING|AUCTION|QUOTE|QUOTES|QUOTED)(?![A-Za-z])/i,
];
// A preview-only surface must never call a purchase/checkout/charge path. Names are
// purchase-shaped and specific — NOT bare `subscribe` (that's Realtime/event channels).
const PREVIEW_TXN = /\b(createSubscription|subscribeToPlan|startSubscription|purchasePlan|checkoutPlan|reserveSeat|bookExperience|payForExperience)\s*\(/i;

// This enforcement script legitimately names the banned words; skip it.
const allowFile = (p) => p.endsWith(join('scripts', 'check-forbidden.mjs'));

/** Blank out block comments (preserving newlines), then per line strip line
 *  comments (// and --) and string literals, so only code tokens remain. */
function stripToCode(src) {
  const noBlock = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  return noBlock.split(/\r?\n/).map((line) => {
    let l = line
      .replace(/'(?:[^'\\]|\\.)*'/g, "''")
      .replace(/"(?:[^"\\]|\\.)*"/g, '""')
      .replace(/`(?:[^`\\]|\\.)*`/g, '``');
    l = l.replace(/--.*$/, '').replace(/\/\/.*$/, ''); // SQL + JS line comments
    return l;
  });
}

function* walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (SCAN_EXT.has(extname(name))) yield full;
  }
}

const hits = [];
for (const d of SCAN_DIRS) {
  for (const file of walk(join(ROOT, d))) {
    if (allowFile(file)) continue;
    const rel = file.slice(ROOT.length + 1).split(sep).join('/');
    stripToCode(readFileSync(file, 'utf8')).forEach((code, i) => {
      for (const re of FORBIDDEN) {
        if (re.test(code)) hits.push({ rel, n: i + 1, why: `killed-feature identifier ${re}`, line: code.trim() });
      }
      if (PREVIEW_TXN.test(code)) hits.push({ rel, n: i + 1, why: 'transaction path behind a preview-only surface', line: code.trim() });
    });
  }
}

if (hits.length) {
  console.error('\n✗ Forbidden-identifier check FAILED — the killed bidding feature or a preview-only purchase path reappeared:\n');
  for (const h of hits) console.error(`  ${h.rel}:${h.n}  (${h.why})\n    ${h.line}`);
  console.error(`\n${hits.length} violation(s). Bidding was deliberately killed; subscriptions/experiences are preview-only.\n`);
  process.exit(1);
}
console.log('✓ Forbidden-identifier check passed — no bidding/auction/quote identifiers or preview-only purchase paths in code.');
