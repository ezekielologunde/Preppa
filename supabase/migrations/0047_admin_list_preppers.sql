-- admin_list_preppers: SECURITY DEFINER RPC so the caller never touches
-- prepper_profiles or profiles RLS directly. Avoids PostgREST FK ambiguity
-- (prepper_profiles has two FKs to profiles: user_id + reviewed_by).
create or replace function public.admin_list_preppers(p_status text default 'pending')
returns table (
  id              uuid,
  display_name    text,
  bio             text,
  verified        boolean,
  status          text,
  rejection_note  text,
  created_at      timestamptz,
  user_full_name  text,
  user_email      text,
  user_phone      text
)
language sql
stable security definer
set search_path to 'public'
as $function$
  select
    pp.id,
    pp.display_name,
    pp.bio,
    pp.verified,
    pp.status::text,
    pp.rejection_note,
    pp.created_at,
    p.full_name  as user_full_name,
    p.email      as user_email,
    p.phone      as user_phone
  from   prepper_profiles pp
  left   join profiles p on p.id = pp.user_id
  where  is_admin()
    and  (p_status = 'all' or pp.status::text = p_status)
  order  by pp.created_at desc
  limit  200;
$function$;

revoke all   on function public.admin_list_preppers(text) from public, anon;
grant execute on function public.admin_list_preppers(text) to authenticated, service_role;
