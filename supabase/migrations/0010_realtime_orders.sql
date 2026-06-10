-- ============================================================================
-- 0010 — Live order updates.
-- Put `orders` on the supabase_realtime publication so customers and preppers
-- see status changes the instant they happen (no polling lag). Realtime still
-- enforces RLS per subscriber, so each side only receives its own orders.
-- Idempotent.
-- ============================================================================

-- Full row image on change, so UPDATE events carry enough for RLS filtering.
alter table orders replica identity full;

-- Add to the realtime publication only if not already a member.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table orders;
  end if;
end $$;
