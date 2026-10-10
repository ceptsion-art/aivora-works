-- Run once in Supabase SQL Editor. Cloud state for existing Aivora tools.
create table if not exists public.app_state (
 user_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now()
);
alter table public.app_state enable row level security;
drop policy if exists "Aivora own state" on public.app_state;
create policy "Aivora own state" on public.app_state for all to authenticated
 using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
grant select,insert,update,delete on public.app_state to authenticated;
