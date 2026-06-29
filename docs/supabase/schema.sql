-- MODE MODE — Supabase schema for the project-pages CMS
-- Run once in the Supabase SQL editor (or via the Supabase MCP) on a fresh project.
--
-- Design: ONE ROW PER PROJECT. The content/<slug>.json document is stored verbatim
-- in a `jsonb` column, so the open-ended block schema stays flexible and the
-- renderer's contract is unchanged. This is the port the architecture was built for:
-- loadProject() swaps from a file fetch to a REST query; nothing else moves.

-- ───────────────────────────── projects table ─────────────────────────────
create table if not exists public.projects (
  slug        text primary key,           -- 'nightmare-kart', 'eyeknow-manor', …
  code        text,                        -- 'P-01'..'P-07' (mirrored for sort/joins)
  name        text,                        -- 'NIGHTMARE KART' (mirrored for listing)
  data        jsonb not null,              -- the full content document (source of truth)
  updated_at  timestamptz not null default now()
);

-- keep updated_at honest on every write
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists trg_projects_touch on public.projects;
create trigger trg_projects_touch
  before update on public.projects
  for each row execute function public.touch_updated_at();

-- ───────────────────────────── row-level security ─────────────────────────
-- Public site reads anonymously; only signed-in editors (the studio) can write.
alter table public.projects enable row level security;

drop policy if exists "projects public read" on public.projects;
create policy "projects public read"
  on public.projects for select
  using ( true );

drop policy if exists "projects authenticated write" on public.projects;
create policy "projects authenticated write"
  on public.projects for all
  to authenticated
  using ( true ) with check ( true );

-- ───────────────────────────── media storage bucket ───────────────────────
-- Own-host images here later (repoint each src to this bucket's public URL).
-- Video stays external (Vimeo) — never in Storage.
insert into storage.buckets (id, name, public)
  values ('project-media', 'project-media', true)
  on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read"
  on storage.objects for select
  using ( bucket_id = 'project-media' );

drop policy if exists "media authenticated write" on storage.objects;
create policy "media authenticated write"
  on storage.objects for all
  to authenticated
  using ( bucket_id = 'project-media' )
  with check ( bucket_id = 'project-media' );
