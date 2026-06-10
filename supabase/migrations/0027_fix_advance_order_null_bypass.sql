-- ============================================================================
-- 0027 — SECURITY FIX: advance_order had the same NULL three-valued-logic
-- bypass found in the handoff RPCs (0026). The guard was
--   if not (is_admin() or v_prepper = my_prepper_id())
-- For a non-prepper caller my_prepper_id() is NULL, so when is_admin() is
-- false the OR is NULL, `not NULL` is NULL, and the reject branch is skipped →
-- any authenticated user could advance any order's status (privilege
-- escalation). Coalesce both predicates to false.
--
-- Audited siblings: cancel_order is fail-closed (its elsif/else falls through
-- to 'Not authorized'); accept_experience_bid compares two non-null uuids
-- (auth.uid() + customer_id) — both safe. Verified: random user blocked,
-- prepper allowed.
-- ============================================================================
create or replace function advance_order(p_order_id uuid, p_next order_status)
returns void language plpgsql security definer set search_path to 'public' as $function$
declare v_cur order_status; v_prepper uuid;
begin
  select status, prepper_id into v_cur, v_prepper from orders where id = p_order_id;
  if v_cur is null then raise exception 'Order not found'; end if;
  if not (coalesce(is_admin(), false) or coalesce(v_prepper = my_prepper_id(), false)) then
    raise exception 'Not authorized';
  end if;
  if not (
    (v_cur='pending'          and p_next='confirmed') or
    (v_cur='confirmed'        and p_next='preparing') or
    (v_cur='preparing'        and p_next='ready') or
    (v_cur='ready'            and p_next in ('out_for_delivery','completed')) or
    (v_cur='out_for_delivery' and p_next='completed')
  ) then raise exception 'Illegal transition % -> %', v_cur, p_next; end if;
  update orders set status = p_next where id = p_order_id;
end $function$;
