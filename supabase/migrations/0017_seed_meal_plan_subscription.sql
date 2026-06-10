-- ============================================================================
-- 0017 — Seed a demo meal plan + an active subscription so the profile's
-- "meal plans & subscriptions" section is populated (matches the mockup).
-- Demo data, idempotent.
-- ============================================================================

insert into meal_plans (id, prepper_id, name, description, frequency, price, meals_per_cycle, serves, image_url, tags, active) values
  ('00000000-0000-0000-0000-0000000000e1','00000000-0000-0000-0000-0000000000b1','Weekly Wellness Plan','Four balanced chef meals delivered every week — high-protein, fresh, ready to heat.','weekly',59.99,4,1,'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=60', array['healthy','balanced','high-protein'], true)
on conflict (id) do nothing;

insert into subscriptions (customer_id, prepper_id, plan_name, frequency, plan_id, status, next_billing_at)
select '78bd323e-80f1-4d64-aa17-4bd07d2df86c','00000000-0000-0000-0000-0000000000b1','Weekly Wellness Plan','weekly','00000000-0000-0000-0000-0000000000e1','active', now() + interval '5 days'
where not exists (
  select 1 from subscriptions where customer_id='78bd323e-80f1-4d64-aa17-4bd07d2df86c' and plan_id='00000000-0000-0000-0000-0000000000e1'
);
