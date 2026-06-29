# MODE MODE — Supabase backend

> **Status: LIVE (2026-06-28).** Project ref `vjvjparfulrtsxdslrpg`. Schema applied, all 6 rows seeded, and `loadProject()` in `project.html` reads Supabase with a bundled-`content/*.json` fallback. Authoring: Supabase Table editor → `projects` → `data`. Free-tier project idle-pauses after 7 days → upgrade the org to Pro for always-on. The setup steps below are kept for reference / rebuilds.

The CMS backend, set up the way the architecture was designed for: **one row per project, the content document stored as `jsonb`.** No relational shredding of the block schema, no renderer rewrite. Flipping data-in-repo → Supabase is a one-function change in `project.html`.

Why Supabase Pro (~$25/mo): the free tier pauses a project after 7 days idle, which would take a live site down. At this volume you're paying for uptime + a hosted editor, not capacity.

## Setup (once)

1. **Project.** Create a Supabase project (or let the Supabase MCP create it). Note the Project URL, the `anon` public key, and the `service_role` key.
2. **Schema.** Run [`schema.sql`](./schema.sql) in the SQL editor (or via the MCP). Creates the `projects` table, RLS (public read / authenticated write), and the `project-media` storage bucket.
3. **Seed.** Load the six current documents:
   ```bash
   npm i @supabase/supabase-js
   SUPABASE_URL=https://xxxx.supabase.co \
   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
   node docs/supabase/seed_projects.mjs
   ```
   (`node docs/supabase/seed_projects.mjs --dry` reads + shapes the rows and prints a summary without writing — verified to read all 6.)

## Flip the data source (one function)

`loadProject()` in `project.html` is the only thing that knows where data comes from. Add a config block and a Supabase branch; the local-file path stays as the fallback, so an unconfigured build behaves exactly as today.

```js
// near the top of the <script>
const SUPABASE = { url: '', anon: '' };   // fill both to read from Supabase

async function loadProject(slug){
  if (SUPABASE.url) {
    const res = await fetch(
      `${SUPABASE.url}/rest/v1/projects?slug=eq.${encodeURIComponent(slug)}&select=data`,
      { headers: { apikey: SUPABASE.anon, Authorization: `Bearer ${SUPABASE.anon}` }, cache: 'no-cache' });
    if (!res.ok) throw new Error(`Supabase projects/${slug} → HTTP ${res.status}`);
    const rows = await res.json();
    if (!rows.length) throw new Error(`No project "${slug}" in Supabase`);
    return rows[0].data;
  }
  const res = await fetch(`content/${slug}.json`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`content/${slug}.json → HTTP ${res.status}`);
  return await res.json();
}
```

The `anon` key is safe in client code — RLS makes it read-only. (The homepage `index.html` roster is a separate store; collapsing the duplicated node geometry into this same backend is the "split-spine" follow-up, tracked separately — not part of this flip.)

## Authoring (the "table UI now" path)

Once seeded, edit a project in **Supabase → Table editor → `projects` → `data`** (the JSON cell). Saves are live; the page re-reads on next load. This is the zero-build interim editor — the on-brand studio block-editor comes later and writes to the same table through an authenticated `saveProject()`.

## Media (later)

Own-host images in the `project-media` bucket and repoint each `src` to its public URL (`${SUPABASE_URL}/storage/v1/object/public/project-media/<path>`). Sources: Matt's site export, local drive, Drive portfolio. Kyle's URLs get dropped in this same pass. Video stays on Vimeo.
