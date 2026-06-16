-- ─────────────────────────────────────────────────────────────────────────────
-- SPILNO Consortium Builder — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension (usually already enabled)
create extension if not exists "pgcrypto";

-- ─── Profiles (extends auth.users) ────────────────────────────────────────────
create table if not exists profiles (
  id           uuid references auth.users(id) on delete cascade primary key,
  email        text not null,
  name         text not null default '',
  role         text not null default 'observer'
                 check (role in ('coordinator', 'partner', 'observer')),
  organisation text,
  created_at   timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Partner status overrides ─────────────────────────────────────────────────
create table if not exists partner_status (
  node_id    text primary key,
  status     text not null default 'proposed'
               check (status in ('proposed','contacted','in_dialog','confirmed','declined')),
  updated_by uuid references profiles(id),
  updated_at timestamptz default now()
);

-- ─── Comments ─────────────────────────────────────────────────────────────────
create table if not exists comments (
  id          uuid primary key default gen_random_uuid(),
  node_id     text not null,
  author_id   uuid references profiles(id) on delete set null,
  author_name text not null,
  author_role text not null default 'observer',
  text        text not null,
  created_at  timestamptz default now()
);
create index if not exists comments_node_id_idx on comments(node_id);
create index if not exists comments_created_idx on comments(created_at desc);

-- ─── Proposals ────────────────────────────────────────────────────────────────
create table if not exists proposals (
  id              uuid primary key default gen_random_uuid(),
  submitter_id    uuid references profiles(id) on delete set null,
  submitter_name  text not null,
  submitter_org   text,
  name_en         text not null,
  name_uk         text not null default '',
  description_en  text,
  description_uk  text,
  category        text not null,
  review_status   text not null default 'pending'
                    check (review_status in ('pending','approved','rejected')),
  created_at      timestamptz default now()
);
create index if not exists proposals_status_idx on proposals(review_status);

-- ─── Activity log ─────────────────────────────────────────────────────────────
create table if not exists activity_log (
  id          uuid primary key default gen_random_uuid(),
  actor_name  text not null,
  actor_role  text not null default 'observer',
  action      text not null
                check (action in ('comment','proposal','status_change','join')),
  node_id     text,
  node_name   text,
  detail      text,
  created_at  timestamptz default now()
);
create index if not exists activity_created_idx on activity_log(created_at desc);

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table profiles       enable row level security;
alter table partner_status enable row level security;
alter table comments       enable row level security;
alter table proposals      enable row level security;
alter table activity_log   enable row level security;

-- Profiles: users can read all, edit own
create policy "profiles_read_all"  on profiles for select using (true);
create policy "profiles_edit_own"  on profiles for update using (auth.uid() = id);

-- Partner status: all read, coordinator write
create policy "status_read_all"  on partner_status for select using (true);
create policy "status_write_coordinator" on partner_status for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'coordinator'));

-- Comments: all read, authenticated insert (own), coordinator delete
create policy "comments_read_all"  on comments for select using (true);
create policy "comments_insert_auth" on comments for insert
  with check (auth.uid() = author_id);
create policy "comments_delete_own_or_coord" on comments for delete
  using (auth.uid() = author_id or
         exists (select 1 from profiles where id = auth.uid() and role = 'coordinator'));

-- Proposals: all read, authenticated insert
create policy "proposals_read_all"   on proposals for select using (true);
create policy "proposals_insert_auth" on proposals for insert
  with check (auth.uid() = submitter_id);
create policy "proposals_update_coord" on proposals for update
  using (exists (select 1 from profiles where id = auth.uid() and role = 'coordinator'));

-- Activity: all read, server-side insert (use service key for inserts)
create policy "activity_read_all" on activity_log for select using (true);
create policy "activity_insert_auth" on activity_log for insert
  with check (auth.uid() is not null);

-- ─── Realtime ────────────────────────────────────────────────────────────────
-- Enable realtime on comments, proposals, activity_log
-- (Do this in Supabase Dashboard → Database → Replication → enable for each table)
