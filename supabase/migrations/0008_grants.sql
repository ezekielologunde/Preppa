-- ============================================================================
-- 0008 — API role grants
-- RLS decides WHICH ROWS a role may touch; it does NOT grant table-level access.
-- Without these grants, every client query fails with "permission denied for table"
-- before a single RLS policy is evaluated. (Surfaced by running the pgTAP suite
-- against real Postgres — typecheck could never catch it.)
--
-- Model: `anon` may only read; `authenticated` may read + write. RLS policies (0004)
-- remain the actual row-level gate — a table with a grant but no write policy still
-- denies writes. Every public table has RLS enabled (0004), so broad grants are safe.
-- ============================================================================
grant usage on schema public to anon, authenticated;

grant select on all tables in schema public to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

-- Cover objects created after this migration too.
alter default privileges in schema public grant select on tables to anon;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public grant usage, select on sequences to anon, authenticated;

-- Re-assert that approval stays service/admin-only (defence in depth; the function
-- body is the real gate). Revoke from PUBLIC so no role inherits execute by default.
revoke execute on function approve_kitchen(uuid) from public;
