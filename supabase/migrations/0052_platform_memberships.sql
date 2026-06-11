-- Prepper Pro and Prep+ customer platform memberships.
-- A row only exists when someone has an active paid tier.
-- No row = free tier. Simplest possible billing integration surface.

create table if not exists prepper_memberships (
  id                     uuid primary key default gen_random_uuid(),
  prepper_id             uuid not null unique references prepper_profiles(id) on delete cascade,
  tier                   text not null default 'pro',      -- pro (only paid tier for now)
  billing_period         text not null default 'monthly',  -- monthly | yearly
  stripe_subscription_id text,
  current_period_end     timestamptz,
  status                 text not null default 'active',   -- active | cancelled | past_due
  created_at             timestamptz not null default now()
);

create table if not exists customer_memberships (
  id                     uuid primary key default gen_random_uuid(),
  customer_id            uuid not null unique references auth.users(id) on delete cascade,
  tier                   text not null default 'plus',     -- plus (only paid tier for now)
  billing_period         text not null default 'monthly',
  stripe_subscription_id text,
  current_period_end     timestamptz,
  status                 text not null default 'active',
  created_at             timestamptz not null default now()
);

-- RLS: each party reads/manages only their own row; admin reads all
alter table prepper_memberships enable row level security;
alter table customer_memberships enable row level security;

create policy "pm_select" on prepper_memberships for select using (
  auth.uid() = (select user_id from prepper_profiles where id = prepper_id)
);
create policy "pm_insert" on prepper_memberships for insert with check (
  auth.uid() = (select user_id from prepper_profiles where id = prepper_id)
);
create policy "pm_update" on prepper_memberships for update using (
  auth.uid() = (select user_id from prepper_profiles where id = prepper_id)
);

create policy "cm_select" on customer_memberships for select using (auth.uid() = customer_id);
create policy "cm_insert" on customer_memberships for insert with check (auth.uid() = customer_id);
create policy "cm_update" on customer_memberships for update using (auth.uid() = customer_id);
