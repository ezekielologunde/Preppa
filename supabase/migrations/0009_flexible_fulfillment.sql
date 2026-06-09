-- ============================================================================
-- 0009 — Flexible fulfillment: delivery / pickup / meetup.
-- Additive + idempotent. Adds the 'meetup' option, a free-text fulfillment note
-- (drop address, meetup spot + time, pickup instructions), and rewrites
-- create_order to take the fulfillment choice and charge a delivery fee only
-- for delivery. Pickup and meetup are free.
-- ============================================================================

-- New fulfillment option (PG15 allows ADD VALUE in a tx; we never use it here).
alter type fulfillment_type add value if not exists 'meetup';

alter table orders add column if not exists fulfillment_note text;

-- Replace the old 2-arg create_order with a fulfillment-aware version.
drop function if exists create_order(uuid, numeric);

create or replace function create_order(
  p_fulfillment fulfillment_type default 'delivery',
  p_address_id  uuid default null,
  p_note        text default null,
  p_tip         numeric default 0
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_user     uuid := auth.uid();
  v_cart     uuid;
  v_prepper  uuid;
  v_count    int;
  v_order    uuid := gen_random_uuid();
  v_subtotal numeric := 0;
  v_delivery numeric := 0;
begin
  if v_user is null then raise exception 'Not authenticated'; end if;
  select id into v_cart from carts where user_id = v_user;
  if v_cart is null then raise exception 'No cart for user'; end if;

  select count(distinct m.prepper_id), min(m.prepper_id)
    into v_count, v_prepper
    from cart_items ci join meals m on m.id = ci.meal_id
    where ci.cart_id = v_cart;

  if coalesce(v_count,0) = 0 then raise exception 'Cart is empty'; end if;
  if v_count > 1 then raise exception 'Cart has items from multiple preppers'; end if;
  if exists (select 1 from cart_items ci join meals m on m.id = ci.meal_id
             where ci.cart_id = v_cart and m.status <> 'published') then
    raise exception 'Cart contains an unavailable meal';
  end if;

  -- Delivery carries a flat fee; pickup and meetup are free.
  if p_fulfillment = 'delivery' then v_delivery := 3.99; end if;

  insert into orders (id, customer_id, prepper_id, status, fulfillment_type,
                      address_id, fulfillment_note, delivery_fee, tip)
    values (v_order, v_user, v_prepper, 'pending', p_fulfillment,
            p_address_id, nullif(btrim(p_note), ''), v_delivery,
            greatest(coalesce(p_tip,0),0));

  insert into order_items (order_id, meal_id, variant_id, quantity, unit_price, total)
    select v_order, ci.meal_id, ci.variant_id, ci.quantity,
           (m.base_price + coalesce(v.price_delta,0)),
           (m.base_price + coalesce(v.price_delta,0)) * ci.quantity
    from cart_items ci
    join meals m on m.id = ci.meal_id
    left join meal_variants v on v.id = ci.variant_id
    where ci.cart_id = v_cart;

  select coalesce(sum(total),0) into v_subtotal from order_items where order_id = v_order;
  update orders set subtotal = v_subtotal, total = v_subtotal + v_delivery + tip
    where id = v_order;

  delete from cart_items where cart_id = v_cart;
  return v_order;
end $$;

grant execute on function create_order(fulfillment_type, uuid, text, numeric) to authenticated;
