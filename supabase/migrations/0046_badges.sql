-- Computed badge RPCs — no storage, derived from live data.
-- Prepper badges
create or replace function public.prepper_badges(p_prepper uuid)
returns jsonb language sql stable security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(b order by b), '[]'::jsonb)
  from (
    select 'first_order'::text as b
      where exists (
        select 1 from orders where prepper_id = p_prepper and status = 'completed'
      )
    union all
    select '100_meals'
      where (select count(*) from orders where prepper_id = p_prepper and status = 'completed') >= 100
    union all
    select '1000_meals'
      where (select count(*) from orders where prepper_id = p_prepper and status = 'completed') >= 1000
    union all
    select 'five_star'
      where exists (
        select 1 from prepper_rating_summary
        where prepper_id = p_prepper and average_rating >= 4.8 and total_reviews >= 10
      )
    union all
    select 'local_legend'
      where (select count(distinct customer_id) from orders where prepper_id = p_prepper and status = 'completed') >= 50
    union all
    select 'protein_king'
      where exists (select 1 from prepper_profiles where id = p_prepper and 'High-Protein' = any(specialties))
    union all
    select 'vegan_wizard'
      where exists (select 1 from prepper_profiles where id = p_prepper and 'Vegan-Friendly' = any(specialties))
    union all
    select 'heat_master'
      where exists (select 1 from prepper_profiles where id = p_prepper and 'Spicy' = any(specialties))
    union all
    select 'family_fav'
      where exists (
        select 1 from prepper_profiles
        where id = p_prepper
          and (specialties && array['Family Meals','Family-Friendly'])
      )
  ) badges
$$;
revoke all   on function public.prepper_badges(uuid) from public, anon;
grant execute on function public.prepper_badges(uuid) to authenticated, service_role;

-- Customer badges
create or replace function public.customer_badges(p_user uuid)
returns jsonb language sql stable security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(b order by b), '[]'::jsonb)
  from (
    select 'first_order'::text as b
      where exists (select 1 from orders where customer_id = p_user and status = 'completed')
    union all
    select 'loyal_regular'
      where exists (
        select prepper_id from orders
        where customer_id = p_user and status = 'completed'
        group by prepper_id having count(*) >= 3
      )
    union all
    select 'local_foodie'
      where (select count(distinct prepper_id) from orders where customer_id = p_user and status = 'completed') >= 3
    union all
    select 'family_provider'
      where (select count(*) from orders where customer_id = p_user and status = 'completed') >= 5
    union all
    select 'macro_hunter'
      where exists (
        select 1 from orders o
        join prepper_profiles pp on pp.id = o.prepper_id
        where o.customer_id = p_user
          and o.status = 'completed'
          and 'High-Protein' = any(pp.specialties)
      )
    union all
    select 'early_supporter'
      where exists (
        select 1 from orders
        where customer_id = p_user
          and status = 'completed'
          and created_at < '2026-12-31'::timestamptz
      )
  ) badges
$$;
revoke all   on function public.customer_badges(uuid) from public, anon;
grant execute on function public.customer_badges(uuid) to authenticated, service_role;
