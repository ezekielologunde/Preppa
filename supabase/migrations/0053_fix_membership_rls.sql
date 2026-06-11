-- Security fix: authenticated users must not be able to grant themselves
-- Pro or Plus status by writing directly to these billing tables.
-- The Stripe webhook (service role, RLS bypassed) is the sole writer.
drop policy if exists "pm_insert" on prepper_memberships;
drop policy if exists "pm_update" on prepper_memberships;
drop policy if exists "cm_insert" on customer_memberships;
drop policy if exists "cm_update" on customer_memberships;

-- Revoke at the grant level — defense in depth
revoke insert, update on prepper_memberships from authenticated, anon;
revoke insert, update on customer_memberships from authenticated, anon;

-- Constrain valid values so even service-role writes can't introduce garbage
alter table prepper_memberships
  add constraint pm_tier_valid   check (tier   in ('pro')),
  add constraint pm_status_valid check (status in ('active', 'past_due', 'cancelled'));

alter table customer_memberships
  add constraint cm_tier_valid   check (tier   in ('plus')),
  add constraint cm_status_valid check (status in ('active', 'past_due', 'cancelled'));

-- Stripe subscription ID tracking — lets webhooks locate the right row
-- and prevents duplicate provisioning on webhook retries
alter table subscriptions
  add column if not exists stripe_subscription_id text;

alter table customer_meal_plans
  add column if not exists stripe_subscription_id text;
