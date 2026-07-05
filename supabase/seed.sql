-- ============================================================================
-- seed.sql — deterministic local/dev + test fixtures (fixed UUIDs).
-- Two cooks (each owns a verified kitchen), two customers, and one completed
-- card order per customer against their respective cook. Used by the pgTAP suite
-- to prove cross-tenant isolation. Inserts run as the migration/service role, so
-- they bypass RLS. The privileged column guard (profiles.role) is satisfied inside
-- the DO block below (set_config ... local works within its implicit transaction).
-- ============================================================================

-- ── auth users (minimal; the on_auth_user_created trigger makes profiles) ────
insert into auth.users (id, email, raw_user_meta_data)
values
  ('11111111-1111-1111-1111-111111111111', 'cook.maria@example.com',  '{"display_name":"Chef Maria","first_name":"Maria"}'),
  ('22222222-2222-2222-2222-222222222222', 'cook.denise@example.com', '{"display_name":"Denise R.","first_name":"Denise"}'),
  ('33333333-3333-3333-3333-333333333333', 'cust.jordan@example.com', '{"display_name":"Jordan A.","first_name":"Jordan"}'),
  ('44444444-4444-4444-4444-444444444444', 'cust.priya@example.com',  '{"display_name":"Priya S.","first_name":"Priya"}')
on conflict (id) do nothing;

-- ── promote the two cooks (privileged; mirrors the verification RPC) ─────────
do $$
begin
  perform set_config('app.privileged', 'on', true);
  update profiles set role = 'prepper', verification_status = 'verified'
  where id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
end $$;

-- ── kitchens (verified + open so their live meals are discoverable) ──────────
insert into kitchens (id, owner_id, name, slug, cuisine, approx_area, availability, verification_status, approved_at, cod_enabled)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Maria''s Kitchen', 'marias-kitchen', 'Italian comfort', 'Hillcrest, San Diego', 'open', 'verified', now(), true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Denise''s Soul Food', 'denises-soul-food', 'Soul food', 'North Park, San Diego', 'open', 'verified', now(), false)
on conflict (id) do nothing;

-- ── meals ────────────────────────────────────────────────────────────────────
insert into meals (id, kitchen_id, name, price_cents, serves, status)
values
  ('a0000001-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Family Lasagna Tray', 1350, 2, 'live'),
  ('b0000001-0000-0000-0000-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Slow-Braised Short Rib', 1650, 1, 'live')
on conflict (id) do nothing;

-- ── one completed order per customer against their cook ──────────────────────
insert into orders (id, customer_id, kitchen_id, status, method, pay_status, subtotal_cents, service_fee_cents, tip_cents, total_cents, idempotency_key)
values
  ('0d000001-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'completed', 'card', 'paid', 1350, 200, 200, 1750, 'seed-jordan-1'),
  ('0d000002-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'completed', 'card', 'paid', 1650, 200, 0,   1850, 'seed-priya-1')
on conflict (id) do nothing;

insert into order_items (order_id, meal_id, kitchen_id, name_snapshot, unit_price_cents, qty)
values
  ('0d000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Family Lasagna Tray', 1350, 1),
  ('0d000002-0000-0000-0000-000000000002', 'b0000001-0000-0000-0000-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Slow-Braised Short Rib', 1650, 1)
on conflict do nothing;

-- ── a customer delivery address (PII) for isolation tests ────────────────────
insert into addresses (id, owner_id, kind, label, line1, city, region, is_default)
values ('ad000001-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333',
        'customer_delivery', 'Home', '10 Palm Ave', 'San Diego', 'CA', true)
on conflict (id) do nothing;

-- ── ledger: a sale credit for each kitchen (append-only; server-written) ─────
insert into ledger_entries (kitchen_id, order_id, kind, amount_cents, memo)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0d000001-0000-0000-0000-000000000001', 'sale', 1350, 'Family Lasagna Tray'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '0d000002-0000-0000-0000-000000000002', 'sale', 1650, 'Slow-Braised Short Rib');
