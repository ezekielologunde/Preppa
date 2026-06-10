-- ============================================================================
-- 0028 — Performance (advisor: unindexed_foreign_keys). Covering indexes on
-- every FK column lacking one — speeds joins, FK-cascade deletes, and reverse
-- lookups as the catalog and order volume grow.
-- ============================================================================
create index if not exists cart_items_meal_id_idx on cart_items (meal_id);
create index if not exists cart_items_variant_id_idx on cart_items (variant_id);
create index if not exists certifications_verified_by_idx on certifications (verified_by);
create index if not exists delivery_tracking_driver_id_idx on delivery_tracking (driver_id);
create index if not exists delivery_zones_prepper_id_idx on delivery_zones (prepper_id);
create index if not exists feature_flags_updated_by_idx on feature_flags (updated_by);
create index if not exists meal_allergens_allergen_id_idx on meal_allergens (allergen_id);
create index if not exists meal_ingredients_ingredient_id_idx on meal_ingredients (ingredient_id);
create index if not exists meal_videos_meal_id_idx on meal_videos (meal_id);
create index if not exists messages_sender_id_idx on messages (sender_id);
create index if not exists order_items_meal_id_idx on order_items (meal_id);
create index if not exists order_items_variant_id_idx on order_items (variant_id);
create index if not exists orders_address_id_idx on orders (address_id);
create index if not exists orders_coupon_id_idx on orders (coupon_id);
create index if not exists pickup_locations_prepper_id_idx on pickup_locations (prepper_id);
create index if not exists prepper_profiles_reviewed_by_idx on prepper_profiles (reviewed_by);
create index if not exists refunds_payment_id_idx on refunds (payment_id);
create index if not exists refunds_processed_by_idx on refunds (processed_by);
create index if not exists reviews_author_id_idx on reviews (author_id);
create index if not exists reviews_meal_id_idx on reviews (meal_id);
create index if not exists subscriptions_plan_id_idx on subscriptions (plan_id);
create index if not exists subscriptions_prepper_id_idx on subscriptions (prepper_id);
create index if not exists user_roles_role_id_idx on user_roles (role_id);
