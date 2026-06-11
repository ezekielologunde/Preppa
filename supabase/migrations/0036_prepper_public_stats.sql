-- 0036 — Public prepper trust stats. SECURITY DEFINER aggregate-only function
-- (completed orders, unique/repeat customers, completion rate, member-since) so
-- customer-facing prepper profiles can show trust signals without exposing any
-- order rows/PII. Granted to anon + authenticated for public discovery.
-- (Superseded by 0038, which adds the follower count.)
create or replace function public.prepper_public_stats(p_prepper uuid)
returns json
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare
  v_completed int; v_cancelled int; v_uniq int; v_repeat int; v_since timestamptz;
begin
  select count(*) filter (where status = 'completed'),
         count(*) filter (where status = 'cancelled')
    into v_completed, v_cancelled
    from orders where prepper_id = p_prepper;

  select count(distinct customer_id),
         count(*) filter (where c >= 2)
    into v_uniq, v_repeat
    from (
      select customer_id, count(*) c
      from orders where prepper_id = p_prepper and status = 'completed'
      group by customer_id
    ) s;

  select created_at into v_since from prepper_profiles where id = p_prepper;

  return json_build_object(
    'completed_orders', coalesce(v_completed, 0),
    'unique_customers', coalesce(v_uniq, 0),
    'repeat_customers', coalesce(v_repeat, 0),
    'completion_rate', case when coalesce(v_completed, 0) + coalesce(v_cancelled, 0) = 0
                            then null
                            else round(v_completed::numeric / (v_completed + v_cancelled) * 100) end,
    'member_since', v_since
  );
end $function$;

grant execute on function public.prepper_public_stats(uuid) to anon, authenticated, service_role;
