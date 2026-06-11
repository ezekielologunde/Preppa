-- 0042 — Admin identity verification toggle.
-- Admins can mark a prepper as verified (trusted identity confirmed) or
-- unverified (flag removed) from the admin console. The verified badge is
-- separate from the approval status — a prepper can be approved but not yet
-- identity-verified, and vice versa.
create or replace function public.admin_verify_prepper(
  p_prepper uuid,
  p_verified boolean
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if not is_admin() then raise exception 'Admin only'; end if;
  update prepper_profiles set verified = p_verified where id = p_prepper;
  if not found then raise exception 'Prepper not found'; end if;
end;
$$;
revoke all on function public.admin_verify_prepper(uuid, boolean) from public, anon;
grant execute on function public.admin_verify_prepper(uuid, boolean) to authenticated, service_role;
