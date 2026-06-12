-- 0055 — Photo attachments on reviews.
-- Customers can attach up to 3 photos per review (stored in meal-images bucket).
alter table public.reviews
  add column if not exists photos text[] not null default '{}';

comment on column public.reviews.photos is
  'Public storage URLs (meal-images bucket) of photos attached to this review.';
