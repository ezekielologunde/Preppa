-- ============================================================================
-- pgTAP — verification-gated role transitions.
-- Proves a customer cannot become a prepper by their own action: applying creates a
-- pending draft kitchen but does NOT grant the role, and only an admin/service caller
-- can approve. (Direct UPDATE of profiles.role is already blocked by the 0001 guard
-- trigger and covered in rls_isolation.test.sql.)
-- ============================================================================
begin;
select plan(4);

-- act as customer Priya (from seed)
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);

select lives_ok(
  $$ select request_prepper_application('Priya Test Kitchen', 'Desi', 'North Park') $$,
  'a customer can submit a cook application'
);

select is(
  (select role::text from profiles where id = '44444444-4444-4444-4444-444444444444'),
  'customer',
  'applying does NOT grant the prepper role (stays customer until approved)'
);

select is(
  (select count(*)::int from kitchens
   where owner_id = '44444444-4444-4444-4444-444444444444' and verification_status = 'pending'),
  1,
  'a pending, unverified draft kitchen was created'
);

select throws_ok(
  $$ select approve_kitchen(
       (select id from kitchens
        where owner_id = '44444444-4444-4444-4444-444444444444' and verification_status = 'pending' limit 1)) $$,
  null, null,
  'a non-admin/non-service caller cannot approve a kitchen'
);

select * from finish();
rollback;
