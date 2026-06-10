-- ============================================================================
-- 0011 — Stripe payments plumbing.
-- The webhook / edge functions (running as service_role) record payment and
-- refund outcomes through these SECURITY DEFINER helpers. Clients never call
-- them directly. Idempotent.
-- ============================================================================

-- One payment row per order (supports upsert from checkout → webhook).
create unique index if not exists payments_order_id_key on payments (order_id);
create index if not exists payments_transaction_id_idx on payments (transaction_id);

-- Upsert a payment for an order. transaction_id moves from the Checkout Session
-- id (at creation) to the PaymentIntent id (once paid); never overwrite with null.
create or replace function record_payment(
  p_order_id uuid,
  p_txn text,
  p_status payment_status,
  p_amount numeric
) returns void language plpgsql security definer set search_path = public as $$
begin
  insert into payments (order_id, provider, transaction_id, status, amount)
  values (p_order_id, 'stripe', p_txn, p_status, coalesce(p_amount, 0))
  on conflict (order_id) do update
    set transaction_id = coalesce(excluded.transaction_id, payments.transaction_id),
        status = excluded.status,
        amount = coalesce(nullif(excluded.amount, 0), payments.amount);
end $$;

-- Record a refund against an order's payment and flip its status.
create or replace function record_refund(
  p_order_id uuid,
  p_amount numeric,
  p_reason text
) returns void language plpgsql security definer set search_path = public as $$
declare
  v_payment uuid;
  v_total numeric;
begin
  select id, amount into v_payment, v_total from payments where order_id = p_order_id;
  if v_payment is null then return; end if;
  insert into refunds (payment_id, amount, reason) values (v_payment, coalesce(p_amount, 0), p_reason);
  update payments
    set status = case when coalesce(p_amount, 0) >= v_total then 'refunded'::payment_status
                      else 'partially_refunded'::payment_status end
    where id = v_payment;
end $$;

-- These are service-role only (called from edge functions); keep them off the client.
revoke all on function record_payment(uuid, text, payment_status, numeric) from public, anon, authenticated;
revoke all on function record_refund(uuid, numeric, text) from public, anon, authenticated;
grant execute on function record_payment(uuid, text, payment_status, numeric) to service_role;
grant execute on function record_refund(uuid, numeric, text) to service_role;
