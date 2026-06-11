-- 0043 — Order dispute / issue reporting.
-- Customers can flag a completed or cancelled order; admins review and resolve.
-- Disputes feed into the trust & safety layer — repeated issues against a
-- prepper should surface in the admin console as a suspension signal.
create table if not exists public.order_disputes (
  id          uuid        primary key default gen_random_uuid(),
  order_id    uuid        not null references public.orders(id),
  reporter_id uuid        not null references public.profiles(id),
  reason      text        not null check (char_length(reason) between 5 and 1000),
  status      text        not null default 'open'
                          check (status in ('open', 'resolved', 'dismissed')),
  admin_note  text,
  resolved_at timestamptz,
  created_at  timestamptz not null default now()
);

alter table public.order_disputes enable row level security;

-- One dispute per order (customers cannot spam-report the same order).
create unique index if not exists order_disputes_order_id_key on public.order_disputes(order_id);

-- Customers can file a dispute for their own orders.
create policy "reporter_insert" on public.order_disputes
  for insert to authenticated
  with check (
    reporter_id = auth.uid() and
    exists (select 1 from orders where id = order_id and customer_id = auth.uid())
  );

-- Reporters can read their own disputes.
create policy "reporter_select" on public.order_disputes
  for select to authenticated
  using (reporter_id = auth.uid() or is_admin());

-- Admins can update (resolve / dismiss).
create policy "admin_update" on public.order_disputes
  for update to authenticated
  using (is_admin()) with check (is_admin());

-- Admin RPC: resolve or dismiss a dispute with an optional note.
create or replace function public.admin_resolve_dispute(
  p_dispute    uuid,
  p_resolution text,          -- 'resolved' | 'dismissed'
  p_note       text default null
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if not is_admin() then raise exception 'Admin only'; end if;
  if p_resolution not in ('resolved', 'dismissed') then
    raise exception 'Resolution must be resolved or dismissed';
  end if;
  update order_disputes
    set status       = p_resolution,
        admin_note   = p_note,
        resolved_at  = now()
    where id = p_dispute;
  if not found then raise exception 'Dispute not found'; end if;
end;
$$;
revoke all on function public.admin_resolve_dispute(uuid, text, text) from public, anon;
grant execute on function public.admin_resolve_dispute(uuid, text, text) to authenticated, service_role;

-- Admin read: all disputes with reporter + order context.
create or replace function public.admin_list_disputes(p_status text default 'open')
returns table (
  id          uuid,
  order_id    uuid,
  reason      text,
  status      text,
  admin_note  text,
  created_at  timestamptz,
  reporter_name  text,
  reporter_email text,
  order_total    numeric,
  order_status   text,
  prepper_name   text
)
language sql
stable security definer
set search_path to 'public'
as $function$
  select
    d.id, d.order_id, d.reason, d.status, d.admin_note, d.created_at,
    p.full_name          as reporter_name,
    p.email              as reporter_email,
    o.total              as order_total,
    o.status::text       as order_status,
    pp.display_name      as prepper_name
  from order_disputes d
  join profiles p          on p.id = d.reporter_id
  join orders o            on o.id = d.order_id
  join prepper_profiles pp on pp.id = o.prepper_id
  where (p_status = 'all' or d.status = p_status)
  order by d.created_at desc
  limit 200;
$function$;
revoke all on function public.admin_list_disputes(text) from public, anon;
grant execute on function public.admin_list_disputes(text) to authenticated, service_role;
