-- 0054 — Application document uploads for prepper onboarding.
-- Stores Supabase Storage paths (not public URLs) for private verification docs:
-- government ID, food safety certificates, and kitchen showcase photos.
alter table public.prepper_profiles
  add column if not exists application_documents text[] not null default '{}';

-- RLS: only owner + admin can read/write these paths.
-- (Cert bucket already enforces this at the storage layer; this column mirrors it.)
comment on column public.prepper_profiles.application_documents is
  'Storage paths (certifications bucket) for verification docs uploaded at application time.';
