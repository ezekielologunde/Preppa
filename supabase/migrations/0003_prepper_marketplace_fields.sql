-- Public marketplace fields for prepper cards (Explore "top preppers near you").
-- prepper_profiles is public-read (RLS p_prepper_read), so these are safe to expose.
alter table prepper_profiles
  add column if not exists avatar_url text,
  add column if not exists city       text,
  add column if not exists delivers   boolean not null default true,
  add column if not exists pickup     boolean not null default true,
  add column if not exists price_from numeric;

-- Backfill the demo preppers.
update prepper_profiles set avatar_url='https://images.unsplash.com/photo-1583394293214-28a5b0f5a5b8?auto=format&fit=crop&w=300&q=60', city='Harlem, NY',   price_from=12, delivers=true, pickup=true  where id='00000000-0000-0000-0000-0000000000b1';
update prepper_profiles set avatar_url='https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=60', city='Queens, NY',   price_from=10, delivers=true, pickup=false where id='00000000-0000-0000-0000-0000000000b2';
update prepper_profiles set avatar_url='https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=300&q=60', city='Brooklyn, NY', price_from=11, delivers=true, pickup=true  where id='00000000-0000-0000-0000-0000000000b3';
