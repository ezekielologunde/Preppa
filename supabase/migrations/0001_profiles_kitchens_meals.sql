-- ============================================================================
-- 0001 — identity, kitchens, meals
-- Foundations of the two-sided marketplace. RLS is added in 0004; this migration
-- defines tables, enums, and the guard triggers that make trust-critical columns
-- (role, verification, balance) non-client-writable.
-- ============================================================================

create extension if not exists "pgcrypto"; -- gen_random_uuid, digest for COD hashing
create extension if not exists "citext";

-- ── enums ───────────────────────────────────────────────────────────────────
create type user_role            as enum ('customer', 'prepper', 'admin');
create type verification_status  as enum ('unverified', 'pending', 'verified', 'rejected');
create type kitchen_availability as enum ('open', 'paused');
create type meal_status          as enum ('live', 'paused', 'sold_out');

-- ── updated_at helper ───────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- ============================================================================
-- profiles — one row per auth user.
-- role/verification are NOT user-writable (see guard trigger + 0004 RLS).
-- A user is a 'customer' by default; becoming a 'prepper' happens only through a
-- verification-gated SECURITY DEFINER function, never a client UPDATE.
-- ============================================================================
create table profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,
  role                user_role not null default 'customer',
  verification_status verification_status not null default 'unverified',
  display_name        text not null,
  first_name          text,
  avatar_url          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();

-- Reject any attempt to change privileged columns from a non-service context.
-- service_role (Edge Functions / admin RPC) bypasses this by setting a GUC.
create or replace function guard_profile_privileged_columns()
returns trigger language plpgsql as $$
begin
  if current_setting('request.jwt.claim.role', true) is distinct from 'service_role'
     and coalesce(current_setting('app.privileged', true), 'off') <> 'on' then
    if new.role is distinct from old.role
       or new.verification_status is distinct from old.verification_status then
      raise exception 'role/verification_status are not client-writable (use the verification RPC)';
    end if;
  end if;
  return new;
end $$;
create trigger profiles_guard_privileged before update on profiles
  for each row execute function guard_profile_privileged_columns();

-- Auto-create a profile when an auth user is created.
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, display_name, first_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'first_name'
  )
  on conflict (id) do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================================
-- kitchens — a prepper's storefront. Ownership is THE trust boundary for every
-- prepper capability (RLS gates on owner_id, never on profiles.role).
-- Only APPROXIMATE location lives here; the exact street address is in `addresses`
-- (0003) and is revealed to a customer only after an order is accepted.
-- ============================================================================
create table kitchens (
  id                  uuid primary key default gen_random_uuid(),
  owner_id            uuid not null references profiles (id) on delete cascade,
  name                text not null,
  slug                citext not null unique,
  cuisine             text,
  bio                 text,
  approx_area         text,                 -- e.g. "Hillcrest, San Diego" — safe to show pre-purchase
  approx_lat          numeric(9,6),         -- coarsened centroid, NOT the home address
  approx_lng          numeric(9,6),
  availability        kitchen_availability not null default 'paused',
  verification_status verification_status not null default 'unverified',
  approved_at         timestamptz,
  cod_enabled         boolean not null default false, -- COD is opt-in per verified cook
  cod_paused          boolean not null default false, -- auto-paused if the cook is in arrears
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index kitchens_owner_idx on kitchens (owner_id);
create trigger kitchens_updated_at before update on kitchens
  for each row execute function set_updated_at();

-- verification_status/approved_at/cod_* are platform-controlled, not owner-writable.
create or replace function guard_kitchen_privileged_columns()
returns trigger language plpgsql as $$
begin
  if current_setting('request.jwt.claim.role', true) is distinct from 'service_role'
     and coalesce(current_setting('app.privileged', true), 'off') <> 'on' then
    if new.verification_status is distinct from old.verification_status
       or new.approved_at is distinct from old.approved_at
       or new.cod_enabled is distinct from old.cod_enabled
       or new.cod_paused is distinct from old.cod_paused then
      raise exception 'kitchen verification/COD flags are platform-controlled, not client-writable';
    end if;
  end if;
  return new;
end $$;
create trigger kitchens_guard_privileged before update on kitchens
  for each row execute function guard_kitchen_privileged_columns();

-- Is the current user the owner of this kitchen? The prepper trust boundary.
create or replace function is_kitchen_owner(kid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from kitchens k
    where k.id = kid and k.owner_id = auth.uid()
  );
$$;

-- A kitchen is orderable only when verified AND open.
create or replace function is_kitchen_orderable(kid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from kitchens k
    where k.id = kid
      and k.verification_status = 'verified'
      and k.availability = 'open'
  );
$$;

-- ============================================================================
-- meals — listings owned by a kitchen. price_cents (integer) — never floats for money.
-- ============================================================================
create table meals (
  id           uuid primary key default gen_random_uuid(),
  kitchen_id   uuid not null references kitchens (id) on delete cascade,
  name         text not null,
  description  text,
  price_cents  integer not null check (price_cents >= 0),
  serves       smallint not null default 1 check (serves >= 1),
  kcal         integer check (kcal is null or kcal >= 0),
  image_path   text,                 -- storage object path; deterministic gradient fallback in-app
  status       meal_status not null default 'paused',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index meals_kitchen_idx on meals (kitchen_id);
create index meals_live_idx on meals (kitchen_id) where status = 'live';
create trigger meals_updated_at before update on meals
  for each row execute function set_updated_at();
