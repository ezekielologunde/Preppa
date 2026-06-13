-- ============================================================================
-- 0056 — Request system: home cook requests, atomic bid→order RPCs,
--         fraud prevention, payment hooks. Idempotent.
-- ============================================================================

set check_function_bodies = off;

-- ─── Enum additions ──────────────────────────────────────────────────────────

alter type public.fulfillment_type add value if not exists 'home_cook';

-- ─── prepper_profiles: home cook toggle (idempotent) ─────────────────────────

alter table public.prepper_profiles
  add column if not exists home_cook_available boolean not null default false;

-- ─── home_cook_requests ───────────────────────────────────────────────────────
-- Central table for the private-chef booking negotiation.
-- Address is PII: prepper may read it at all active statuses (they need it to
-- quote travel). It is excluded from the confirmed cancelled row via RLS so
-- ex-parties cannot re-read after a booking is closed.

create table if not exists public.home_cook_requests (
  id                  uuid          primary key default gen_random_uuid(),
  customer_id         uuid          not null references public.profiles(id) on delete cascade,
  prepper_id          uuid          not null references public.prepper_profiles(id) on delete cascade,
  requested_date      date          not null,
  requested_time      text          not null
                        check (requested_time in ('morning','afternoon','evening','late_night')),
  address             text          not null,
  guest_count         smallint      not null default 2
                        check (guest_count >= 1 and guest_count <= 50),
  cuisine             text,
  menu_ideas          text,
  ingredient_budget   numeric(10,2) not null check (ingredient_budget >= 20),
  -- prepper-proposed fees; null until propose_home_cook_terms is called
  cooking_fee         numeric(10,2) check (cooking_fee >= 0),
  travel_fee          numeric(10,2) check (travel_fee >= 0),
  status              text          not null default 'pending'
                        check (status in ('pending','negotiating','confirmed','cancelled')),
  order_id            uuid          references public.orders(id),
  conversation_id     uuid          references public.conversations(id),
  -- Stripe PaymentIntent id set after customer confirms (manual-capture hold)
  payment_intent_id   text,
  cancellation_reason text,
  confirmed_at        timestamptz,
  cancelled_at        timestamptz,
  created_at          timestamptz   not null default now()
);

create index if not exists hcr_customer_idx  on public.home_cook_requests(customer_id);
create index if not exists hcr_prepper_idx   on public.home_cook_requests(prepper_id);
create index if not exists hcr_convo_idx     on public.home_cook_requests(conversation_id);
create index if not exists hcr_status_idx    on public.home_cook_requests(status, created_at desc);

alter table public.home_cook_requests enable row level security;

-- Customer: read + soft-cancel own requests
create policy "hcr_customer_select" on public.home_cook_requests
  for select using (auth.uid() = customer_id);

-- Prepper: read requests directed at them (address visible; needed to quote travel)
create policy "hcr_prepper_select" on public.home_cook_requests
  for select using (
    prepper_id = (select id from public.prepper_profiles where user_id = auth.uid())
    and status in ('pending','negotiating','confirmed')
  );

-- ─── Fraud signals ────────────────────────────────────────────────────────────

create table if not exists public.request_fraud_signals (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.profiles(id) on delete cascade,
  signal_type text        not null,   -- rate_limited | duplicate | invalid_prepper | membership_bypass
  context     jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists rfs_user_idx on public.request_fraud_signals(user_id, created_at desc);
create index if not exists rfs_type_idx on public.request_fraud_signals(signal_type);

alter table public.request_fraud_signals enable row level security;

create policy "admins_read_fraud_signals" on public.request_fraud_signals
  for select using (is_admin());

-- ─── Helper: log a fraud signal (service use only) ───────────────────────────

create or replace function log_fraud_signal(
  p_user_id    uuid,
  p_type       text,
  p_context    jsonb default null
) returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.request_fraud_signals (user_id, signal_type, context)
  values (p_user_id, p_type, p_context);
end $$;

-- ─── RPC: create_home_cook_request ───────────────────────────────────────────
-- Guards: rate-limit (3/24h), Prep+ membership, prepper eligibility,
--         future-date, no duplicate active request.
-- Creates a conversation and first system message atomically.

create or replace function create_home_cook_request(
  p_prepper_id        uuid,
  p_requested_date    date,
  p_requested_time    text,
  p_address           text,
  p_guest_count       smallint,
  p_cuisine           text    default null,
  p_menu_ideas        text    default null,
  p_ingredient_budget numeric default 20
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_me          uuid := auth.uid();
  v_request_id  uuid;
  v_convo_id    uuid;
  v_prepper_uid uuid;
  v_daily_count int;
begin
  if v_me is null then raise exception 'auth_required'; end if;

  -- ① Rate limit: 3 non-cancelled requests per customer per 24 h
  select count(*) into v_daily_count
  from public.home_cook_requests
  where customer_id = v_me
    and status != 'cancelled'
    and created_at > now() - interval '24 hours';
  if v_daily_count >= 3 then
    perform log_fraud_signal(v_me, 'rate_limited', jsonb_build_object('prepper_id', p_prepper_id));
    raise exception 'rate_limited: max 3 requests per 24 hours';
  end if;

  -- ② Prep+ membership required
  if not exists (
    select 1 from public.customer_memberships
    where customer_id = v_me and tier = 'plus' and status = 'active'
  ) then
    perform log_fraud_signal(v_me, 'membership_bypass', jsonb_build_object('prepper_id', p_prepper_id));
    raise exception 'membership_required: Prep+ required for home cook bookings';
  end if;

  -- ③ Prepper must be approved + home cook enabled
  if not exists (
    select 1 from public.prepper_profiles
    where id = p_prepper_id
      and status = 'approved'
      and home_cook_available = true
  ) then
    raise exception 'prepper_unavailable: this prepper does not offer home cook';
  end if;

  -- ④ Booking must be at least 24 h in the future
  if p_requested_date <= (now() at time zone 'utc')::date then
    raise exception 'invalid_date: booking must be at least 24 h in advance';
  end if;

  -- ⑤ No duplicate active request to the same prepper
  if exists (
    select 1 from public.home_cook_requests
    where customer_id = v_me
      and prepper_id = p_prepper_id
      and status in ('pending','negotiating')
  ) then
    perform log_fraud_signal(v_me, 'duplicate', jsonb_build_object('prepper_id', p_prepper_id));
    raise exception 'duplicate_request: active request already exists with this prepper';
  end if;

  -- ⑥ Create conversation + add both participants
  insert into public.conversations default values returning id into v_convo_id;
  select user_id into v_prepper_uid from public.prepper_profiles where id = p_prepper_id;
  insert into public.conversation_participants (conversation_id, user_id)
  values (v_convo_id, v_me), (v_convo_id, v_prepper_uid);

  -- ⑦ Create the request row
  insert into public.home_cook_requests (
    customer_id, prepper_id, requested_date, requested_time, address,
    guest_count, cuisine, menu_ideas, ingredient_budget, conversation_id
  ) values (
    v_me, p_prepper_id, p_requested_date, p_requested_time, p_address,
    p_guest_count, p_cuisine, p_menu_ideas, p_ingredient_budget, v_convo_id
  ) returning id into v_request_id;

  -- ⑧ Opening system message in the chat thread
  insert into public.messages (conversation_id, sender_id, body)
  values (v_convo_id, v_me,
    format(
      'Home cook request submitted — %s guests, %s budget for ingredients. Waiting for fee proposal.',
      p_guest_count, '$' || p_ingredient_budget::text
    )
  );

  return v_request_id;
end $$;

grant execute on function create_home_cook_request(uuid,date,text,text,smallint,text,text,numeric)
  to authenticated;

-- ─── RPC: propose_home_cook_terms ────────────────────────────────────────────
-- Prepper sets their cooking fee + travel fee; moves status → 'negotiating'.

create or replace function propose_home_cook_terms(
  p_request_id  uuid,
  p_cooking_fee numeric,
  p_travel_fee  numeric
) returns void language plpgsql security definer set search_path = public as $$
declare
  v_me      uuid := auth.uid();
  v_prep_id uuid;
  v_req     record;
begin
  if v_me is null then raise exception 'auth_required'; end if;
  if p_cooking_fee < 0 or p_travel_fee < 0 then
    raise exception 'invalid_fee: fees cannot be negative';
  end if;

  select id into v_prep_id from public.prepper_profiles where user_id = v_me;
  if v_prep_id is null then raise exception 'not_a_prepper'; end if;

  select * into v_req from public.home_cook_requests where id = p_request_id;
  if not found                    then raise exception 'not_found'; end if;
  if v_req.prepper_id != v_prep_id then raise exception 'forbidden'; end if;
  if v_req.status not in ('pending','negotiating') then
    raise exception 'invalid_status: can only propose on pending or negotiating requests';
  end if;

  update public.home_cook_requests
  set cooking_fee = p_cooking_fee,
      travel_fee  = p_travel_fee,
      status      = 'negotiating'
  where id = p_request_id;

  -- Notify customer in the thread
  insert into public.messages (conversation_id, sender_id, body)
  values (
    v_req.conversation_id, v_me,
    format(
      'Fee proposal: cooking fee $%s + travel $%s. Grand total = $%s (ingredient budget + fees). Reply to discuss, or tap below to confirm.',
      p_cooking_fee, p_travel_fee,
      (v_req.ingredient_budget + p_cooking_fee + p_travel_fee)
    )
  );
end $$;

grant execute on function propose_home_cook_terms(uuid,numeric,numeric) to authenticated;

-- ─── RPC: confirm_home_cook_booking ──────────────────────────────────────────
-- Customer accepts terms → atomically creates a confirmed order and marks
-- the request confirmed. Payment capture happens client-side via Stripe after
-- this returns the order_id.

create or replace function confirm_home_cook_booking(
  p_request_id uuid
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_me       uuid := auth.uid();
  v_req      record;
  v_order_id uuid;
  v_total    numeric;
begin
  if v_me is null then raise exception 'auth_required'; end if;

  -- Row lock to prevent double-confirm race
  select * into v_req
  from public.home_cook_requests
  where id = p_request_id
  for update;

  if not found                    then raise exception 'not_found'; end if;
  if v_req.customer_id != v_me    then raise exception 'forbidden'; end if;
  if v_req.status != 'negotiating' then
    raise exception 'invalid_status: can only confirm a negotiating request';
  end if;
  if v_req.cooking_fee is null then
    raise exception 'terms_not_set: prepper has not proposed fees yet';
  end if;

  -- Total = ingredients + cooking + travel
  v_total := v_req.ingredient_budget
             + v_req.cooking_fee
             + coalesce(v_req.travel_fee, 0);

  -- Create the order (home_cook fulfillment; address in fulfillment_note)
  insert into public.orders (
    customer_id, prepper_id, status,
    subtotal, tip, total, delivery_fee,
    fulfillment_type, fulfillment_note
  ) values (
    v_me, v_req.prepper_id, 'confirmed',
    v_req.ingredient_budget + v_req.cooking_fee,
    0,
    v_total,
    coalesce(v_req.travel_fee, 0),
    'home_cook',
    v_req.address
  ) returning id into v_order_id;

  -- Stamp request
  update public.home_cook_requests
  set status       = 'confirmed',
      order_id     = v_order_id,
      confirmed_at = now()
  where id = p_request_id;

  -- Confirmation message
  insert into public.messages (conversation_id, sender_id, body)
  values (
    v_req.conversation_id, v_me,
    format(
      'Booking confirmed. Date: %s (%s). Total: $%s. Payment is held — released when the session is complete.',
      v_req.requested_date, v_req.requested_time, v_total
    )
  );

  return v_order_id;
end $$;

grant execute on function confirm_home_cook_booking(uuid) to authenticated;

-- ─── RPC: cancel_home_cook_request ───────────────────────────────────────────
-- Either the customer or the prepper can cancel a pending/negotiating request.

create or replace function cancel_home_cook_request(
  p_request_id uuid,
  p_reason     text default null
) returns void language plpgsql security definer set search_path = public as $$
declare
  v_me      uuid := auth.uid();
  v_prep_id uuid;
  v_req     record;
begin
  if v_me is null then raise exception 'auth_required'; end if;

  select * into v_req from public.home_cook_requests where id = p_request_id for update;
  if not found then raise exception 'not_found'; end if;
  if v_req.status not in ('pending','negotiating') then
    raise exception 'invalid_status: can only cancel pending or negotiating requests';
  end if;

  select id into v_prep_id from public.prepper_profiles where user_id = v_me;
  if v_req.customer_id != v_me and v_req.prepper_id is distinct from v_prep_id then
    raise exception 'forbidden';
  end if;

  update public.home_cook_requests
  set status              = 'cancelled',
      cancelled_at        = now(),
      cancellation_reason = p_reason
  where id = p_request_id;

  if v_req.conversation_id is not null then
    insert into public.messages (conversation_id, sender_id, body)
    values (
      v_req.conversation_id, v_me,
      case
        when p_reason is not null then 'Request cancelled: ' || p_reason
        else 'Request cancelled.'
      end
    );
  end if;
end $$;

grant execute on function cancel_home_cook_request(uuid,text) to authenticated;

-- ─── RPC: create_order_from_meal_bid ─────────────────────────────────────────
-- Atomic: accepts the bid, rejects all competing bids, marks request fulfilled,
-- creates a confirmed order. Row-locks bid + request to prevent races.

create or replace function create_order_from_meal_bid(
  p_bid_id uuid
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_me       uuid := auth.uid();
  v_bid      record;
  v_req      record;
  v_order_id uuid;
  v_total    numeric;
begin
  if v_me is null then raise exception 'auth_required'; end if;

  -- Lock bid row first to prevent concurrent accepts
  select * into v_bid
  from public.meal_request_bids
  where id = p_bid_id
  for update;
  if not found             then raise exception 'bid_not_found'; end if;
  if v_bid.status != 'pending' then raise exception 'bid_already_processed'; end if;

  select * into v_req
  from public.meal_requests
  where id = v_bid.request_id
  for update;
  if not found               then raise exception 'request_not_found'; end if;
  if v_req.status != 'open'  then raise exception 'request_not_open'; end if;
  if v_req.customer_id != v_me then raise exception 'forbidden'; end if;

  v_total := v_bid.price_per_serving * v_req.servings;

  -- Create the order
  insert into public.orders (
    customer_id, prepper_id, status,
    subtotal, tip, total, delivery_fee, fulfillment_type
  ) values (
    v_me, v_bid.prepper_id, 'confirmed',
    v_total, 0, v_total, 0, 'pickup'
  ) returning id into v_order_id;

  -- Accept chosen bid; reject all others on this request
  update public.meal_request_bids
  set status = case when id = p_bid_id then 'accepted' else 'rejected' end
  where request_id = v_bid.request_id;

  -- Close the request
  update public.meal_requests set status = 'fulfilled' where id = v_bid.request_id;

  return v_order_id;
end $$;

grant execute on function create_order_from_meal_bid(uuid) to authenticated;

-- ─── RPC: accept_experience_bid ──────────────────────────────────────────────
-- Fully atomic: accepts bid + declines others + sets request to 'booked' +
-- creates confirmed order. Replaces the old two-call pattern.

create or replace function accept_experience_bid(
  p_bid uuid
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_me       uuid := auth.uid();
  v_bid      record;
  v_req      record;
  v_order_id uuid;
begin
  if v_me is null then raise exception 'auth_required'; end if;

  select * into v_bid from public.experience_bids where id = p_bid for update;
  if not found               then raise exception 'bid_not_found'; end if;
  if v_bid.status != 'pending' then raise exception 'bid_already_processed'; end if;

  select * into v_req from public.experience_requests where id = v_bid.request_id for update;
  if not found             then raise exception 'request_not_found'; end if;
  if v_req.status != 'open' then raise exception 'request_not_open'; end if;
  if v_req.customer_id != v_me then raise exception 'forbidden'; end if;

  -- Create order (meetup fulfillment for experience/catering)
  insert into public.orders (
    customer_id, prepper_id, status,
    subtotal, tip, total, delivery_fee, fulfillment_type
  ) values (
    v_me, v_bid.prepper_id, 'confirmed',
    v_bid.amount, 0, v_bid.amount, 0, 'meetup'
  ) returning id into v_order_id;

  -- Accept this bid, decline all others on this request
  update public.experience_bids
  set status = case when id = p_bid then 'accepted' else 'declined' end
  where request_id = v_bid.request_id;

  -- Close the request
  update public.experience_requests set status = 'booked' where id = v_bid.request_id;

  return v_order_id;
end $$;

grant execute on function accept_experience_bid(uuid) to authenticated;

-- ─── Record payment_intent_id on home cook request ───────────────────────────
-- Called by the client-side payment hook after Stripe confirms the hold.

create or replace function set_home_cook_payment_intent(
  p_request_id       uuid,
  p_payment_intent_id text
) returns void language plpgsql security definer set search_path = public as $$
declare
  v_me uuid := auth.uid();
  v_req record;
begin
  if v_me is null then raise exception 'auth_required'; end if;
  select * into v_req from public.home_cook_requests where id = p_request_id;
  if not found               then raise exception 'not_found'; end if;
  if v_req.customer_id != v_me then raise exception 'forbidden'; end if;
  if v_req.status != 'confirmed' then raise exception 'not_confirmed'; end if;

  update public.home_cook_requests
  set payment_intent_id = p_payment_intent_id
  where id = p_request_id;

  -- Note: the payments row is written by the Stripe webhook (service_role),
  -- not here, to keep record_payment out of the client surface.
end $$;

grant execute on function set_home_cook_payment_intent(uuid,text) to authenticated;
