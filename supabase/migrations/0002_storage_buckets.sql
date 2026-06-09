-- ============================================================================
-- Preppa — Storage buckets + RLS. Run AFTER 0001_core_schema.sql.
-- Separate buckets per asset class (per architecture doc). Images/videos are
-- public-read (CDN-friendly); certifications + chat attachments are private.
-- Convention: objects live under a top folder = the uploader's auth uid,
-- e.g. meal-images/<uid>/<meal_id>/photo.jpg
-- ============================================================================

insert into storage.buckets (id, name, public) values
  ('profile-images',   'profile-images',   true),
  ('meal-images',      'meal-images',      true),
  ('meal-videos',      'meal-videos',      true),
  ('certifications',   'certifications',   false),
  ('chat-attachments', 'chat-attachments', false)
on conflict (id) do nothing;

-- Public read for image/video buckets
create policy "public read images/videos" on storage.objects for select
  using (bucket_id in ('profile-images','meal-images','meal-videos'));

-- Authenticated users write only into their own uid-prefixed folder
create policy "owner upload images/videos" on storage.objects for insert to authenticated
  with check (
    bucket_id in ('profile-images','meal-images','meal-videos')
    and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "owner update images/videos" on storage.objects for update to authenticated
  using (
    bucket_id in ('profile-images','meal-images','meal-videos')
    and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "owner delete images/videos" on storage.objects for delete to authenticated
  using (
    bucket_id in ('profile-images','meal-images','meal-videos')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Certifications: private — owner or admin read; owner writes own folder
create policy "cert read own/admin" on storage.objects for select to authenticated
  using (
    bucket_id = 'certifications'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );
create policy "cert write own" on storage.objects for insert to authenticated
  with check (bucket_id = 'certifications' and (storage.foldername(name))[1] = auth.uid()::text);

-- Chat attachments: private — owner folder only (app serves via signed URLs)
create policy "chat read own" on storage.objects for select to authenticated
  using (bucket_id = 'chat-attachments' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "chat write own" on storage.objects for insert to authenticated
  with check (bucket_id = 'chat-attachments' and (storage.foldername(name))[1] = auth.uid()::text);
