-- Preppa demo seed — 3 verified preppers + published meals.
-- Inserting into auth.users fires handle_new_user() (profile + customer role +
-- cart + notif prefs). We disable the verified-guard so demo preppers can be
-- verified, then re-enable it. Idempotent.
begin;

alter table prepper_profiles disable trigger t_guard_prepper;

-- Demo auth users (password is a throwaway; these are display-only accounts).
insert into auth.users (instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin)
values
  ('00000000-0000-0000-0000-000000000000','00000000-0000-0000-0000-0000000000a1','authenticated','authenticated','chef.kelsey@preppa.demo', crypt('preppa-demo', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}','{"full_name":"Chef Kelsey","avatar_url":"https://images.unsplash.com/photo-1583394293214-28a5b0f5a5b8?auto=format&fit=crop&w=200&q=60"}', false),
  ('00000000-0000-0000-0000-000000000000','00000000-0000-0000-0000-0000000000a2','authenticated','authenticated','island.bites@preppa.demo', crypt('preppa-demo', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}','{"full_name":"Island Bites","avatar_url":"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=60"}', false),
  ('00000000-0000-0000-0000-000000000000','00000000-0000-0000-0000-0000000000a3','authenticated','authenticated','spice.haus@preppa.demo', crypt('preppa-demo', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}','{"full_name":"Spice Haus","avatar_url":"https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=200&q=60"}', false)
on conflict (id) do nothing;

-- Grant prepper role
insert into user_roles (user_id, role_id)
  select v.uid, (select id from roles where key='prepper')
  from (values ('00000000-0000-0000-0000-0000000000a1'::uuid),
               ('00000000-0000-0000-0000-0000000000a2'::uuid),
               ('00000000-0000-0000-0000-0000000000a3'::uuid)) v(uid)
on conflict do nothing;

-- Prepper profiles (verified)
insert into prepper_profiles (id, user_id, display_name, bio, verified, specialties) values
  ('00000000-0000-0000-0000-0000000000b1','00000000-0000-0000-0000-0000000000a1','Chef Kelsey','Soulful comfort food, made fresh in Harlem.', true, array['American','Soul']),
  ('00000000-0000-0000-0000-0000000000b2','00000000-0000-0000-0000-0000000000a2','Island Bites','Bold Caribbean flavors from Queens.', true, array['Caribbean','Jerk']),
  ('00000000-0000-0000-0000-0000000000b3','00000000-0000-0000-0000-0000000000a3','Spice Haus','Big spice, bigger portions. Brooklyn.', true, array['Fusion','Spicy'])
on conflict (id) do nothing;

-- Rating summaries (async read-model)
insert into prepper_rating_summary (prepper_id, average_rating, total_reviews, five_star) values
  ('00000000-0000-0000-0000-0000000000b1', 4.9, 128, 110),
  ('00000000-0000-0000-0000-0000000000b2', 4.8, 96, 80),
  ('00000000-0000-0000-0000-0000000000b3', 4.9, 74, 66)
on conflict (prepper_id) do nothing;

-- Meals (published)
insert into meals (id, prepper_id, category_id, title, description, base_price, prep_time_min, status) values
  ('00000000-0000-0000-0000-0000000000c1','00000000-0000-0000-0000-0000000000b1',(select id from meal_categories where key='dinner'),'Honey Garlic Salmon Bowl','Glazed salmon over jasmine rice with greens.',14.99,35,'published'),
  ('00000000-0000-0000-0000-0000000000c2','00000000-0000-0000-0000-0000000000b1',(select id from meal_categories where key='healthy'),'Wellness Bowl','Chickpeas, avocado, roasted veg, tahini.',12.49,25,'published'),
  ('00000000-0000-0000-0000-0000000000c3','00000000-0000-0000-0000-0000000000b2',(select id from meal_categories where key='dinner'),'Creamy Jerk Pasta','Rasta pasta with jerk-spiced cream sauce.',13.49,30,'published'),
  ('00000000-0000-0000-0000-0000000000c4','00000000-0000-0000-0000-0000000000b3',(select id from meal_categories where key='dinner'),'Jerk Chicken Bowl','Smoky jerk chicken, rice & peas, slaw.',13.99,25,'published'),
  ('00000000-0000-0000-0000-0000000000c5','00000000-0000-0000-0000-0000000000b3',(select id from meal_categories where key='vegan'),'Vegan Buddha Bowl','Quinoa, roasted chickpeas, rainbow veg.',12.49,25,'published')
on conflict (id) do nothing;

insert into meal_images (meal_id, url, order_index) values
  ('00000000-0000-0000-0000-0000000000c1','https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000c2','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000c3','https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000c4','https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000c5','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=60',0)
on conflict do nothing;

alter table prepper_profiles enable trigger t_guard_prepper;

commit;
