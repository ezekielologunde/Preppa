-- ============================================================================
-- 0016 — Seed published meals across the under-populated categories so the
-- Home/Explore category filters return results everywhere (breakfast, lunch,
-- snacks, desserts were empty → filters looked broken). Demo data, idempotent.
-- ============================================================================

insert into meals (id, prepper_id, category_id, title, description, base_price, prep_time_min, status) values
  ('00000000-0000-0000-0000-0000000000d1','00000000-0000-0000-0000-0000000000b2',1,'Avocado Toast Stack','Sourdough, smashed avocado, chili crunch & a soft egg.',9.99,15,'published'),
  ('00000000-0000-0000-0000-0000000000d2','00000000-0000-0000-0000-0000000000b1',1,'Berry Protein Pancakes','Fluffy oat pancakes, fresh berries & maple.',10.49,20,'published'),
  ('00000000-0000-0000-0000-0000000000d3','00000000-0000-0000-0000-0000000000b3',2,'Spicy Chicken Wrap','Grilled jerk chicken, slaw & house sauce in a warm wrap.',11.49,20,'published'),
  ('00000000-0000-0000-0000-0000000000d4','00000000-0000-0000-0000-0000000000b2',2,'Mediterranean Quinoa Bowl','Quinoa, falafel, hummus, olives & lemon dressing.',11.99,20,'published'),
  ('00000000-0000-0000-0000-0000000000d5','00000000-0000-0000-0000-0000000000b3',4,'Mango Sticky Rice Cups','Sweet coconut sticky rice with fresh mango.',6.49,10,'published'),
  ('00000000-0000-0000-0000-0000000000d6','00000000-0000-0000-0000-0000000000b2',4,'Loaded Nacho Box','Tortilla chips, cheese, jalapeños, salsa & guac.',8.99,15,'published'),
  ('00000000-0000-0000-0000-0000000000d7','00000000-0000-0000-0000-0000000000b1',5,'Molten Chocolate Lava Cake','Warm dark-chocolate cake with a gooey center.',7.99,15,'published'),
  ('00000000-0000-0000-0000-0000000000d8','00000000-0000-0000-0000-0000000000b2',5,'Tiramisu Jar','Espresso-soaked layers, mascarpone & cocoa.',6.99,10,'published')
on conflict (id) do nothing;

insert into meal_images (meal_id, url, order_index) values
  ('00000000-0000-0000-0000-0000000000d1','https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000d2','https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000d3','https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000d4','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000d5','https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000d6','https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000d7','https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=60',0),
  ('00000000-0000-0000-0000-0000000000d8','https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=60',0)
on conflict do nothing;