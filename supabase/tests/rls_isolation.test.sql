-- ============================================================================
-- pgTAP — two-sided isolation. THE highest-value suite for a trust marketplace.
-- Proves (not asserts) that customer A cannot read customer B, and cook X cannot
-- read or mutate cook Y — plus role self-escalation and PII leakage are blocked.
-- Run: `supabase test db`. Fixtures come from seed.sql.
--
-- Actors (from seed):
--   Maria  cook X   1111…  owns kitchen aaaa…   Denise cook Y  2222…  owns bbbb…
--   Jordan cust A   3333…  ordered from Maria   Priya  cust B  4444…  ordered from Denise
-- ============================================================================
begin;
select plan(12);

-- helper: authenticate as a specific user for subsequent statements
create or replace function tests_login(uid uuid) returns void
language plpgsql as $$
begin
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, true);
end $$;

create or replace function tests_logout_anon() returns void
language plpgsql as $$
begin
  perform set_config('role', 'anon', true);
  perform set_config('request.jwt.claims', '', true);
end $$;

-- ── Customer A (Jordan) ──────────────────────────────────────────────────────
set local role authenticated;
select tests_login('33333333-3333-3333-3333-333333333333');

select is((select count(*)::int from orders), 1,
  'customer A sees exactly their own 1 order');
select is((select count(*)::int from orders
           where customer_id = '44444444-4444-4444-4444-444444444444'), 0,
  'customer A cannot see customer B''s orders');
select is((select count(*)::int from addresses), 1,
  'customer A sees exactly their own 1 address');
select throws_ok(
  $$ update profiles set role = 'prepper' where id = auth.uid() $$,
  null,
  null,
  'customer A cannot self-escalate role to prepper (guard trigger blocks it)');

-- ── Customer B (Priya) ───────────────────────────────────────────────────────
select tests_login('44444444-4444-4444-4444-444444444444');

select is((select count(*)::int from addresses), 0,
  'customer B cannot read customer A''s address (PII isolation)');
select is((select count(*)::int from order_items), 1,
  'customer B sees only their own order''s items (EXISTS-join RLS)');

-- ── Cook X (Maria) ───────────────────────────────────────────────────────────
select tests_login('11111111-1111-1111-1111-111111111111');

select is((select count(*)::int from orders), 1,
  'cook X sees exactly the 1 order to their own kitchen');
select is((select count(*)::int from ledger_entries), 1,
  'cook X sees only their own ledger entries');
select is((select count(*)::int from ledger_entries
           where kitchen_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'), 0,
  'cook X cannot read cook Y''s ledger');

-- cook X cannot mutate their own ledger (no write policy → 0 rows; append-only)
update ledger_entries set amount_cents = 999999
  where kitchen_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
select is(kitchen_balance_cents('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), 1350,
  'cook X cannot alter their ledger balance (read-only RLS + append-only)');

-- ── Anonymous (pre-auth discovery) ───────────────────────────────────────────
select tests_logout_anon();

select is((select count(*)::int from meals), 2,
  'anon discovers exactly the 2 live meals of verified kitchens');
select is((select count(*)::int from addresses), 0,
  'anon cannot read any addresses (PII)');

select * from finish();
rollback;
