-- Fix 1: admin_list_disputes lacked is_admin() gate — any authenticated user
-- could enumerate all disputes + reporter PII. Add WHERE is_admin() guard and
-- drop reporter_email from the projection (name is sufficient for triage).
-- Return type changes (reporter_email removed), so drop first.
drop function if exists public.admin_list_disputes(text);

create function public.admin_list_disputes(p_status text default 'open')
returns table (
  id uuid, order_id uuid, reason text, status text, admin_note text, created_at timestamptz,
  reporter_name text, order_total numeric, order_status text, prepper_name text
)
language sql
stable security definer
set search_path to 'public'
as $function$
  select d.id, d.order_id, d.reason, d.status, d.admin_note, d.created_at,
         p.full_name  as reporter_name,
         o.total      as order_total,
         o.status::text as order_status,
         pp.display_name as prepper_name
  from   order_disputes d
  join   profiles       p  on p.id  = d.reporter_id
  join   orders         o  on o.id  = d.order_id
  join   prepper_profiles pp on pp.id = o.prepper_id
  where  is_admin() and (p_status = 'all' or d.status = p_status)
  order  by d.created_at desc
  limit  200;
$function$;

revoke all   on function public.admin_list_disputes(text) from public, anon;
grant execute on function public.admin_list_disputes(text) to authenticated, service_role;

-- Fix 2: reporter_insert policy permitted disputes on ANY order status.
-- Restrict to completed/cancelled so pending/in-flight orders can't be disputed.
drop policy if exists "reporter_insert" on public.order_disputes;
create policy "reporter_insert" on public.order_disputes
  for insert to authenticated
  with check (
    reporter_id = auth.uid() and
    exists (
      select 1 from orders
      where id         = order_id
        and customer_id = auth.uid()
        and status     in ('completed', 'cancelled')
    )
  );

-- Fix 3: Give reporter_id a server-side default so the client never needs to
-- supply it. The RLS WITH CHECK still enforces reporter_id = auth.uid().
alter table public.order_disputes
  alter column reporter_id set default auth.uid();
