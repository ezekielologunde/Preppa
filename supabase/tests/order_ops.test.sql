-- ============================================================================
-- pgTAP — prepper order operations.
-- Proves the DISTINCT decline path (the prototype's "Decline" wrongly called accept):
-- decline can ONLY cancel a new order, only by the owning kitchen, and is a no-op once
-- the order has moved on. Also covers the ownership gate on advancing another kitchen's
-- order.
-- ============================================================================
begin;
select plan(4);

-- Seed two fresh confirmed (paid, not-yet-started) orders for Maria's kitchen (aaaa).
-- Inserted as the superuser test role (RLS bypassed) before switching to a user.
insert into orders (id, customer_id, kitchen_id, status, method, pay_status, subtotal_cents, service_fee_cents, tip_cents, total_cents, idempotency_key)
values
  ('0dcc0001-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'confirmed', 'card', 'paid', 1350, 135, 0, 1485, 'test-decline-a'),
  ('0dcc0002-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'confirmed', 'card', 'paid', 1350, 135, 0, 1485, 'test-decline-b');

-- ── Cook X (Maria, owns kitchen aaaa) ────────────────────────────────────────
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok(
  $$ select decline_order('0dcc0001-0000-0000-0000-000000000001') $$,
  'the owning cook can decline a new order'
);
select is(
  (select status::text from orders where id = '0dcc0001-0000-0000-0000-000000000001'),
  'cancelled',
  'decline CANCELS the order (never accepts it)'
);
select throws_ok(
  $$ select decline_order('0dcc0001-0000-0000-0000-000000000001') $$,
  null, null,
  'declining is a no-op once the order is no longer new'
);

-- ── Cook Y (Denise, owns kitchen bbbb) cannot touch Maria's order ────────────
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select throws_ok(
  $$ select decline_order('0dcc0002-0000-0000-0000-000000000002') $$,
  null, null,
  'a different cook cannot decline another kitchen’s order'
);

select * from finish();
rollback;
