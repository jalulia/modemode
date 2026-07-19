# MODE MODE — holistic roadmap

The arc, phase by phase. `STATUS.md` is the live snapshot; this is the trajectory. Both are kept current as work lands.

Principle: **the homepage field map is the spine; each project page is one node-constellation, read.** Data is a self-contained JSON document per project, now living in Supabase with a bundled-JSON fallback. No asset blocks a phase — on-brand stand-ins are produced in-house and swapped for real media when it lands.

---

## Foundation — ✅ shipped
- **Phase 0 · Architecture & schema** — frozen schema, `loadProject()` boundary, media-by-URL, Vimeo for video, the three port invariants. (`project-pages_architecture_2026-06-26.md`.)
- **Phase 1 · Homepage field map** — two-layer topographic metaballs; node animation, cursor magnet, present-default, axis system, click-a-blob → case study. Stable.
- **Phase 2 · Project-page template** — `project.html` masonry card-grid: locked left rail (identity + animated/textured ambient minimap per Julia's mock #2 + flex nav + pager), all block types, full-screen lightbox, prev/next.
- **Phase 3 · Homepage ↔ project wiring** — round-trip live: homepage lock → case study → back-link reopens the homepage focused. `PAGES`/`PREVIEW` maps cover all six.
- **Phase 6 · Multi-project rollout** — all six roster projects have pages, real geometry/palette, closed 6-loop.
- **Phase 4 · CMS editor** — `editor/index.html`: Supabase-auth login, structured per-node block editor for every block type (add/remove/move), image upload, raw-JSON, live preview, change-password. Writes RLS-locked to editor emails. Replaced the hand-edit-JSON workflow.
- **Phase 8 · Supabase backend** — `projects` table (jsonb doc per row), RLS, `project-media` bucket; 6 rows seeded; `loadProject()` reads Supabase with JSON fallback. The one-function port the architecture was designed for. **Done.**
- **Chrome rethink** — studio controls (EDIT/PRESENT + light-dark) gated behind `?studio`; the public homepage is clean.

## The frontier

### Phase 9 — Content + the spine (current)
The structure is done; now it gets real and coherent.
1. **Split-spine resolution (architecture — surface to Julia first).** Node geometry/labels/colours are duplicated between the homepage roster (`seed()`/`localStorage`, flat) and each project doc's `nodes[].geom` (nested copy), joined only by `code`, with no live link. Pick one source of truth: (a) the field-studio writes geometry to Supabase and both surfaces read it, or (b) keep the homepage as geometry-master with an explicit "sync to projects" step. This is the last structural seam.
2. **Real content from Matt** — replace sample-grade copy; fill the muted disciplines; supply the full 22-card tarot deck; decide Eyeknow's event photos (designed placeholders today, Kyle's links purged).
3. **Media own-hosting** — migrate Matt's ~35 Squarespace hotlinks into `project-media`; repoint `src`. Sources per `media-sourcing-policy`: Matt's site / Julia's drive / Drive portfolio — never Kyle.
4. **Editor v2** — image crop (non-destructive rect), drag-drop reorder, the `embed` block.
5. **Per-project background colour (editor control).** Julia's ask: a colour picker + hex field in the editor, saved per project, where changing the ground re-derives everything reactively — `--panel`, `--ink`, `--grey`/`--grey-2`, `--hair`/`--hair-2`, `--scrim` and `--accent` all computed from the one input so contrast holds at any colour — and the metaball edge re-anchors to the ground instead of dissolving into a white that is no longer there. Groundwork done: split ground/panel tokens, `--scrim`, and a ground-aware `legibleInk()` that darkens or lightens as needed. Remaining: the derivation chain, the editor control + `colors.ground` in the doc (**schema change**), live re-render on both surfaces, and the blob edge (touches the READ-ONLY minimap mirror — scope it alone). `color-scheme:light` (frozen invariant, the iOS light-render workaround) has to be settled before any non-light ground ships publicly.

### Phase 10 — Ship
Custom domain (TBD) · SEO/OG meta · optional prerender to static `/<slug>/index.html` for crawlers · accessibility + perf pass · transitions/fades · the homepage cursor → "view project" tab.

### Phase 11 — Hardening (as needed)
Lock down open signup (restrict to editor emails) · per-editor audit if more authors join · Supabase Pro (always-on, before the free-tier idle-pause).

---

### Immediate next moves
1. **Phase 9.1** — bring the split-spine decision to Julia (it gates clean content edits), then implement the chosen source of truth.
2. **Phase 9.2/9.3** — as Matt's real copy + photos arrive, author them in `editor/` and own-host media into the bucket.
3. Upgrade Supabase to Pro before the free-tier idle-pause; settle the domain (Phase 10).
