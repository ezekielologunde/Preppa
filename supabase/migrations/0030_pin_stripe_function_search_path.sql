-- ============================================================================
-- 0030 — Security hardening (advisor: function_search_path_mutable). The
-- Stripe-sync helper/trigger functions had no pinned search_path. They fully
-- qualify every object they touch (stripe._rate_limits) or use pg_catalog
-- builtins, so an empty search_path is safe and clears the warning. ALTER
-- (not CREATE OR REPLACE) so the bodies are untouched.
-- ============================================================================
alter function stripe.check_rate_limit(text, integer, integer) set search_path = '';
alter function stripe.set_updated_at() set search_path = '';
alter function stripe.set_updated_at_metadata() set search_path = '';
