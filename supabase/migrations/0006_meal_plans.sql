-- ============================================================================
-- Preppa — Meal Plans (additive, re-runnable)
--
-- A browsable catalog of subscription meal plans (weekly / monthly / family),
-- created by approved preppers. Customers subscribe via the existing
-- `subscriptions` table from 0001 — this migration adds the catalog the
-- subscription points at, plus a plan_id link so a subscription knows its plan.
-- ============================================================================

set check_function_bodies = off;

do $$ begin
  create type plan_frequency as enum ('weekly','biweekly','monthly');
exception when duplicate_object then null; end $$;

create table if not exists meal_plans (
  id             uuid primary key default gen_random_uuid(),
  prepper_id     uuid not null references prepper_profiles(id) on delete cascade,
  name           text not null,
  description    text,
  frequency      plan_frequency not null default 'weekly',
  price          numeric not null check (price >= 0),
  meals_per_cycle int not null default 5 check (meals_per_cycle > 0),
  serves         int not null default 1 check (serves > 0),
  image_url      text,
  tags           text[],
  active         boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_meal_plans_prepper on meal_plans(prepper_id);
create index if not exists idx_meal_plans_active  on meal_plans(active);

-- Link a subscription to the catalog plan it was created from (nullable for
-- legacy/ad-hoc subscriptions).
alter table subscriptions add column if not exists plan_id uuid references meal_plans(id);

drop trigger if exists t_meal_plans_updated on meal_plans;
create trigger t_meal_plans_updated before update on meal_plans
  for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- RLS — active plans are public; the owning prepper (or admin) manages theirs.
-- ----------------------------------------------------------------------------
alter table meal_plans enable row level security;
drop policy if exists p_meal_plans_read  on meal_plans;
drop policy if exists p_meal_plans_write on meal_plans;
create policy p_meal_plans_read on meal_plans for select
  using (active or prepper_id = my_prepper_id() or is_admin());
create policy p_meal_plans_write on meal_plans for all
  using (prepper_id = my_prepper_id() or is_admin())
  with check (prepper_id = my_prepper_id()
    and exists (select 1 from prepper_profiles pp where pp.id = prepper_id and pp.status = 'approved'));
