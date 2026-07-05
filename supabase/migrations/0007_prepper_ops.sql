-- ============================================================================
-- 0007 — prepper operations: decline path + server-aggregated earnings
-- ============================================================================

-- Declining an order is a DISTINCT path from accepting it. The prototype's cook queue
-- had "Decline" call acceptOrder (a charge-on-refuse bug the council flagged); here
-- decline can only CANCEL a new order, never advance/accept it. Scoped to the owning
-- kitchen and only valid from 'confirmed' (a freshly paid, not-yet-started order).
-- (The Stripe refund + ledger reversal for a declined paid order is the refunds slice.)
create or replace function decline_order(p_order uuid)
returns orders
language plpgsql
security definer
set search_path = public
as $$
declare
  cur orders;
begin
  select * into cur from orders where id = p_order for update;
  if not found then raise exception 'order not found'; end if;

  if not is_kitchen_owner(cur.kitchen_id)
     and current_setting('request.jwt.claim.role', true) is distinct from 'service_role' then
    raise exception 'only the owning kitchen may decline this order';
  end if;

  if cur.status <> 'confirmed' then
    raise exception 'only a new (confirmed) order can be declined';
  end if;

  update orders set status = 'cancelled' where id = p_order returning * into cur;
  insert into audit_log (actor_id, action, entity, entity_id)
  values (auth.uid(), 'order_declined', 'order', p_order);
  return cur;
end $$;

-- Server-aggregated earnings. Balance is DERIVED from the append-only ledger — never a
-- client number. Scoped to the owning kitchen. Real values only (0 is a real fact; the
-- app omits a tile only when there is genuinely no backing concept, never fabricates one).
create or replace function kitchen_earnings_summary(p_kitchen uuid)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today int; v_week int; v_lifetime int; v_orders_today int; v_available int;
begin
  if not is_kitchen_owner(p_kitchen)
     and current_setting('request.jwt.claim.role', true) is distinct from 'service_role' then
    raise exception 'not your kitchen';
  end if;

  -- gross earnings = sale + tip credits (never includes fees or payouts)
  select
    coalesce(sum(amount_cents) filter (where created_at >= date_trunc('day', now())), 0),
    coalesce(sum(amount_cents) filter (where created_at >= date_trunc('week', now())), 0),
    coalesce(sum(amount_cents), 0)
  into v_today, v_week, v_lifetime
  from ledger_entries
  where kitchen_id = p_kitchen and kind in ('sale', 'tip');

  -- available to cash out = the whole ledger balance (credits minus prior payouts)
  v_available := kitchen_balance_cents(p_kitchen);

  select count(*) into v_orders_today
  from orders
  where kitchen_id = p_kitchen and pay_status = 'paid' and created_at >= date_trunc('day', now());

  return json_build_object(
    'todayCents', v_today, 'weekCents', v_week, 'lifetimeCents', v_lifetime,
    'availableCents', v_available, 'ordersToday', v_orders_today
  );
end $$;

grant execute on function decline_order(uuid) to authenticated;
grant execute on function kitchen_earnings_summary(uuid) to authenticated;
