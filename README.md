# MODE MODE

Studio site for MODE MODE — a field-map homepage plus a case-study page per project, backed by a small CMS.

## Surfaces
- `index.html` — the homepage field map. Projects are plotted as multi-node metaball fields across two axes (X: Digital ↔ Physical, Y: Object ↔ Spatial); a project occupies a cloud of positions, not a point, and overlap reads as field density rather than colour mixing. Present mode by default; the field studio (author geometry / palettes / effects) is at `?studio`.
- `project.html?p=<slug>` — one case-study page per project, rendered from that project's JSON document. Left rail (logo, identity, a minimap mirrored from the homepage blob, section nav, prev/next) + content cards (text, image, specs, stats, galleries, video). Full-screen image lightbox.
- `editor/` — the CMS. Password-gated; edit any project's content and images, save to the backend, preview live. (`admin.html` redirects here.)

## Data
One self-contained JSON document per project. Live data is in **Supabase** (`projects` table, one `jsonb` row per project); `project.html` reads it through a single `loadProject()` boundary and falls back to the bundled `content/<slug>.json` if the backend is unreachable. Media is referenced by URL; video is Vimeo. Backend setup + schema: `docs/supabase/`.

## Run
Serve over HTTP — GitHub Pages or a local server; the pages fetch their data, so `file://` won't work. No build step, no dependencies.

## Deploy
GitHub Pages serves the repository root. Live at `https://jalulia.github.io/modemode/`.

## Docs
`docs/STATUS.md` — current state · `docs/ROADMAP.md` — the arc · `docs/ORCHESTRATION.md` — how work runs and how to onboard.
