-- ============================================================================
-- Preppa — Admin Console + Feature Flags (additive, re-runnable)
--
-- Builds on 0001's role model (roles / user_roles / is_admin() / has_role()).
-- Adds:
--   1. feature_flags          — global on/off switches the admin can toggle
--   2. prepper_profiles.status — application/approval lifecycle (pending→approved)
--   3. admin_* RPCs           — approve preppers, grant roles, toggle flags
--   4. admin read RPCs        — prepper earnings + platform stats (aggregates)
--
-- All writes are SECURITY DEFINER + admin-guarded so they can never be called
-- by a non-admin even though they bypass RLS internally.
--
-- BOOTSTRAP THE FIRST ADMIN (run once, manually, after picking the account):
--   insert into user_roles (user_id, role_id)
--   select '<AUTH_USER_UUID>', id from roles where key = 'admin'
--   on conflict do nothing;
-- (Find the uuid in Supabase → Authentication → Users.)
-- ============================================================================

set check_function_bodies = off;

-- ----------------------------------------------------------------------------
-- 1. FEATURE FLAGS — platform-wide capability switches
-- ----------------------------------------------------------------------------
create table if not exists feature_flags (
  key         text primary key,
  label       text not null,
  description text,
  category    text not null default 'general',
  enabled     boolean not null default true,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references profiles(id)
);

insert into feature_flags (key, label, description, category, enabled) values
  ('ordering',        'Meal Ordering',      'Customers can add meals to cart and check out',     'commerce', true),
  ('meal_plans',      'Meal Plans',         'Weekly / monthly subscription meal plans',          'commerce', true),
  ('experiences',     'Prep Experiences',   'Book private chefs, catering and food experiences', 'commerce', true),
  ('live_feeds',      'Live & Feeds',       'Livestream commerce and the short-form food feed',  'content',  true),
  ('prepper_signups', 'Prepper Signups',    'Accept new applications to become a Meal Prepper',  'growth',   true),
  ('reviews',         'Ratings & Reviews',  'Customers can rate and review completed orders',    'social',   true),
  ('payments',        'Payments',           'Live Stripe payment processing at checkout',        'commerce', false)
on conflict (key) do nothing;

alter table feature_flags enable row level security;
drop policy if exists p_flags_read  on feature_flags;
drop policy if exists p_flags_write on feature_flags;
-- Everyone may read flags (the client needs them to gate UI); only admins write.
create policy p_flags_read  on feature_flags for select using (true);
create policy p_flags_write on feature_flags for all   using (is_admin()) with check (is_admin());

create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists t_flags_updated on feature_flags;
create trigger t_flags_updated before update on feature_flags
  for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- 2. PREPPER APPLICATION / APPROVAL LIFECYCLE
--    pending  → just applied, awaiting admin review (cannot sell)
--    approved → admin approved (verified badge granted)
--    rejected → admin declined
--    suspended→ admin paused an active prepper
-- ----------------------------------------------------------------------------
do $$ begin
  create type prepper_status as enum ('pending','approved','rejected','suspended');
exception when duplicate_object then null; end $$;

alter table prepper_profiles
  add column if not exists status        prepper_status not null default 'pending',
  add column if not exists reviewed_by    uuid references profiles(id),
  add column if not exists reviewed_at    timestamptz,
  add column if not exists rejection_note text;

-- Backfill: anything already verified was effectively approved already, so we
-- don't hide existing live preppers/meals when this migration runs.
update prepper_profiles set status = 'approved' where verified = true and status = 'pending';

create index if not exists idx_prepper_status on prepper_profiles(status);

-- ----------------------------------------------------------------------------
-- 3. ADMIN WRITE RPCs (admin-guarded, SECURITY DEFINER)
-- ----------------------------------------------------------------------------

-- Approve / reject / suspend / re-open a prepper application.
create or replace function admin_set_prepper_status(p_prepper uuid, p_status prepper_status, p_note text default null)
  returns void language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then raise exception 'Admin only'; end if;
  update prepper_profiles set
    status         = p_status,
    verified       = (p_status = 'approved'),
    reviewed_by    = auth.uid(),
    reviewed_at    = now(),
    rejection_note = case when p_status = 'rejected' then p_note else null end
  where id = p_prepper;
  if not found then raise exception 'Prepper not found'; end if;
end $$;

-- Grant or revoke a role for a user (e.g. promote a chosen account to admin).
create or replace function admin_grant_role(p_user uuid, p_role text)
  returns void language plpgsql security definer set search_path = public as $$
declare v_role_id smallint;
begin
  if not is_admin() then raise exception 'Admin only'; end if;
  select id into v_role_id from roles where key = p_role;
  if v_role_id is null then raise exception 'Unknown role %', p_role; end if;
  insert into user_roles (user_id, role_id) values (p_user, v_role_id) on conflict do nothing;
end $$;

create or replace function admin_revoke_role(p_user uuid, p_role text)
  returns void language plpgsql security definer set search_path = public as $$
declare v_role_id smallint;
begin
  if not is_admin() then raise exception 'Admin only'; end if;
  -- Guard: never let the last admin remove their own admin role and lock everyone out.
  if p_role = 'admin' and p_user = auth.uid()
     and (select count(*) from user_roles ur join roles r on r.id = ur.role_id where r.key = 'admin') <= 1
  then raise exception 'Cannot revoke the last admin'; end if;
  delete from user_roles ur using roles r
    where ur.role_id = r.id and ur.user_id = p_user and r.key = p_role;
end $$;

-- Toggle a feature flag.
create or replace function admin_set_feature_flag(p_key text, p_enabled boolean)
  returns void language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then raise exception 'Admin only'; end if;
  update feature_flags set enabled = p_enabled, updated_by = auth.uid() where key = p_key;
  if not found then raise exception 'Unknown flag %', p_key; end if;
end $$;

-- Suspend / reactivate any user account.
create or replace function admin_set_user_status(p_user uuid, p_status user_status)
  returns void language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then raise exception 'Admin only'; end if;
  update profiles set status = p_status where id = p_user;
  if not found then raise exception 'User not found'; end if;
end $$;

-- ----------------------------------------------------------------------------
-- 4. ADMIN READ RPCs (aggregates — admin-guarded)
-- ----------------------------------------------------------------------------

-- Per-prepper earnings: gross GMV, platform-completed revenue, order + meal counts.
create or replace function admin_prepper_earnings()
  returns table (
    prepper_id     uuid,
    display_name   text,
    status         prepper_status,
    verified       boolean,
    total_orders   bigint,
    completed_orders bigint,
    gross_sales    numeric,
    completed_sales numeric,
    avg_order      numeric,
    rating         numeric,
    last_order_at  timestamptz
  )
  language sql security definer set search_path = public as $$
  select
    p.id,
    p.display_name,
    p.status,
    p.verified,
    count(o.id),
    count(o.id) filter (where o.status = 'completed'),
    coalesce(sum(o.total), 0),
    coalesce(sum(o.total) filter (where o.status = 'completed'), 0),
    coalesce(round(avg(o.total) filter (where o.status = 'completed'), 2), 0),
    coalesce(rs.average_rating, 0),
    max(o.created_at)
  from prepper_profiles p
  left join orders o on o.prepper_id = p.id
  left join prepper_rating_summary rs on rs.prepper_id = p.id
  where is_admin()
  group by p.id, p.display_name, p.status, p.verified, rs.average_rating
  order by coalesce(sum(o.total) filter (where o.status = 'completed'), 0) desc;
$$;

-- One-shot platform health snapshot for the admin overview.
create or replace function admin_platform_stats()
  returns json language sql security definer set search_path = public as $$
  select case when not is_admin() then null else json_build_object(
    'total_users',      (select count(*) from profiles),
    'total_preppers',   (select count(*) from prepper_profiles),
    'pending_preppers', (select count(*) from prepper_profiles where status = 'pending'),
    'approved_preppers',(select count(*) from prepper_profiles where status = 'approved'),
    'total_orders',     (select count(*) from orders),
    'orders_today',     (select count(*) from orders where created_at >= current_date),
    'gmv',              (select coalesce(sum(total), 0) from orders where status = 'completed'),
    'gmv_today',        (select coalesce(sum(total), 0) from orders where status = 'completed' and created_at >= current_date),
    'open_orders',      (select count(*) from orders where status in ('pending','confirmed','preparing','ready','out_for_delivery'))
  ) end;
$$;

grant execute on function admin_set_prepper_status(uuid, prepper_status, text) to authenticated;
grant execute on function admin_grant_role(uuid, text)        to authenticated;
grant execute on function admin_revoke_role(uuid, text)       to authenticated;
grant execute on function admin_set_feature_flag(text, boolean) to authenticated;
grant execute on function admin_set_user_status(uuid, user_status) to authenticated;
grant execute on function admin_prepper_earnings()            to authenticated;
grant execute on function admin_platform_stats()              to authenticated;
