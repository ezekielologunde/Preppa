-- Customer-curated meal plans (cross-prepper, auto-charge on repeat)
create table if not exists customer_meal_plans (
  id              uuid primary key default gen_random_uuid(),
  customer_id     uuid not null references auth.users(id) on delete cascade,
  name            text not null default 'My Meal Plan',
  frequency       text not null default 'weekly',  -- weekly | biweekly | monthly
  delivery_day    text not null default 'fri',      -- mon | tue | wed | thu | fri | sat | sun
  status          text not null default 'active',   -- active | paused | cancelled
  next_billing_at timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Individual meals inside a customer plan
create table if not exists customer_meal_plan_items (
  id         uuid primary key default gen_random_uuid(),
  plan_id    uuid not null references customer_meal_plans(id) on delete cascade,
  meal_id    uuid not null references meals(id) on delete cascade,
  qty        int not null default 1 check (qty >= 1),
  created_at timestamptz not null default now(),
  unique (plan_id, meal_id)
);

-- Auto-bump updated_at on plan edits
create or replace function update_customer_plan_timestamp()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger customer_meal_plans_updated_at
  before update on customer_meal_plans
  for each row execute function update_customer_plan_timestamp();

-- RLS
alter table customer_meal_plans enable row level security;
alter table customer_meal_plan_items enable row level security;

create policy "cmp_select" on customer_meal_plans for select using (auth.uid() = customer_id);
create policy "cmp_insert" on customer_meal_plans for insert with check (auth.uid() = customer_id);
create policy "cmp_update" on customer_meal_plans for update using (auth.uid() = customer_id);
create policy "cmp_delete" on customer_meal_plans for delete using (auth.uid() = customer_id);

create policy "cmpi_select" on customer_meal_plan_items for select using (
  exists (select 1 from customer_meal_plans p where p.id = plan_id and p.customer_id = auth.uid())
);
create policy "cmpi_insert" on customer_meal_plan_items for insert with check (
  exists (select 1 from customer_meal_plans p where p.id = plan_id and p.customer_id = auth.uid())
);
create policy "cmpi_delete" on customer_meal_plan_items for delete using (
  exists (select 1 from customer_meal_plans p where p.id = plan_id and p.customer_id = auth.uid())
);
