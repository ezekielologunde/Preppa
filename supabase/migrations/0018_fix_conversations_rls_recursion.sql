-- ============================================================================
-- 0018 — Fix infinite RLS recursion on the messaging tables.
-- The conversation_participants SELECT policy selected from
-- conversation_participants itself → Postgres "infinite recursion detected in
-- policy" → every messages/conversations query 500'd (the Messages inbox was
-- silently broken). Break it with a SECURITY DEFINER membership check that runs
-- as owner (bypassing RLS), and route all three read policies through it.
-- ============================================================================

create or replace function is_conversation_member(p_conversation uuid)
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from conversation_participants
    where conversation_id = p_conversation and user_id = auth.uid()
  );
$$;
revoke all on function is_conversation_member(uuid) from public, anon;
grant execute on function is_conversation_member(uuid) to authenticated;

drop policy if exists p_convpart_read on conversation_participants;
create policy p_convpart_read on conversation_participants for select
  using (is_conversation_member(conversation_id));

drop policy if exists p_conv_read on conversations;
create policy p_conv_read on conversations for select
  using (is_conversation_member(id));

drop policy if exists p_messages_read on messages;
create policy p_messages_read on messages for select
  using (is_conversation_member(conversation_id));
