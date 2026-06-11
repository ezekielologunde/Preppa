-- Limited / timed drops on meals.
-- is_limited   — true when the prepper marks this a drop (badge shown on card)
-- limited_qty  — optional max orders before the meal auto-pauses
-- drops_at     — optional future timestamp when it becomes discoverable
-- expires_at   — optional timestamp when it disappears from discovery
alter table public.meals
  add column if not exists is_limited   boolean    not null default false,
  add column if not exists limited_qty  integer    check (limited_qty > 0),
  add column if not exists drops_at     timestamptz,
  add column if not exists expires_at   timestamptz;

comment on column public.meals.is_limited   is 'Prepper-flagged limited / timed drop';
comment on column public.meals.limited_qty  is 'Max order count before meal auto-pauses (null = unlimited)';
comment on column public.meals.drops_at     is 'Earliest time the meal appears in discovery (null = now)';
comment on column public.meals.expires_at   is 'Time after which the meal disappears from discovery (null = never)';

-- Breakfast meal category
insert into public.meal_categories (key, name)
values ('breakfast', 'Breakfast')
on conflict (key) do nothing;
