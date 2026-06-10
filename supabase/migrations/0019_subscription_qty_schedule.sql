-- ============================================================================
-- 0019 — Subscriptions get real ordering controls: how many of each meal
-- (qty 1–6) and which day of the week the cycle delivers (delivery_day).
-- ============================================================================

alter table subscriptions add column if not exists qty int not null default 1 check (qty between 1 and 6);
alter table subscriptions add column if not exists delivery_day text check (delivery_day in ('mon','tue','wed','thu','fri','sat','sun'));
