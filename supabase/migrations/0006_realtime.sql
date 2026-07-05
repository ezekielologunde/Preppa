-- ============================================================================
-- 0006 — Realtime for live order tracking
-- Adds `orders` to the supabase_realtime publication so the consumer tracker and the
-- prepper queue receive live status changes. RLS STILL APPLIES to Realtime: a client
-- subscribes with its own JWT and postgres_changes runs as the authenticated role, so a
-- customer only receives their own order rows and a cook only their kitchen's — the same
-- two-sided isolation the pgTAP suite proves for reads (council condition).
--
-- replica identity full ships the full old+new row on UPDATE so the client can diff
-- status transitions without a refetch.
-- ============================================================================
alter table orders replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table orders;
  end if;
end $$;
