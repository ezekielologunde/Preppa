-- ============================================================================
-- 0014 — Email the customer whenever an order's status changes.
-- An AFTER UPDATE trigger on orders fires the `order-status-email` edge function
-- asynchronously via pg_net. This lives at the DB layer so it works no matter
-- which path changes status (prepper app, admin console, future jobs).
-- The shared auth secret is read from Vault at runtime, never embedded in the
-- function source (pg_catalog is world-readable).
-- ============================================================================

create or replace function notify_order_status_email()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_secret text;
  v_url    text := 'https://nfwfnnfbikjxwflpmsnu.supabase.co/functions/v1/order-status-email';
begin
  select decrypted_secret into v_secret
    from vault.decrypted_secrets where name = 'status_email_hook';
  if v_secret is null then
    return new; -- not configured; skip quietly
  end if;

  perform net.http_post(
    url     := v_url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-hook-secret', v_secret),
    body    := jsonb_build_object('order_id', new.id, 'status', new.status::text)
  );
  return new;
end $$;

revoke all on function notify_order_status_email() from public, anon, authenticated;

drop trigger if exists trg_order_status_email on orders;
create trigger trg_order_status_email
  after update of status on orders
  for each row
  when (old.status is distinct from new.status)
  execute function notify_order_status_email();
