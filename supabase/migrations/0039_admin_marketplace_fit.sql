-- 0039 — The marketplace-fit signal: do customers REORDER from the same prepper?
-- admin_platform_stats tracks volume/GMV; this tracks RETENTION — the metric that
-- separates a real marketplace from a fragile one-time-transaction app. Admin-only
-- (in-body is_admin() guard, same pattern as admin_platform_stats), EXECUTE revoked
-- from public/anon and granted only to authenticated + service_role.
create or replace function public.admin_marketplace_fit()
returns json
language sql
security definer
set search_path to 'public'
as $function$
  with pair as ( -- completed orders per (customer, prepper) relationship
    select customer_id, prepper_id, count(*) as orders
    from orders where status = 'completed'
    group by customer_id, prepper_id
  ),
  cust as (
    select customer_id, max(orders) as max_from_one_prepper, sum(orders) as total_orders
    from pair group by customer_id
  ),
  agg as (
    select
      (select count(*) from cust)                                   as buyers,
      (select count(*) from cust where max_from_one_prepper >= 2)   as repeat_buyers,
      (select coalesce(sum(orders), 0) from pair)                   as completed_orders,
      (select count(*) from pair)                                   as relationships, -- distinct cust×prepper
      (select count(distinct prepper_id) from orders
         where status = 'completed' and created_at >= now() - interval '30 days') as active_preppers_30d
  )
  select case when not is_admin() then null else (
    select json_build_object(
      'buyers', buyers,
      'repeat_buyers', repeat_buyers,
      -- THE signal: % of buyers who reordered from the same kitchen
      'repeat_buyer_rate', case when buyers = 0 then null else round(repeat_buyers::numeric / buyers * 100) end,
      'completed_orders', completed_orders,
      -- share of all completed orders that are a repeat (orders beyond the first in each relationship)
      'repeat_order_share', case when completed_orders = 0 then null
                                 else round((completed_orders - relationships)::numeric / completed_orders * 100) end,
      'active_preppers_30d', active_preppers_30d
    ) from agg
  ) end;
$function$;

revoke all on function public.admin_marketplace_fit() from public, anon;
grant execute on function public.admin_marketplace_fit() to authenticated, service_role;
