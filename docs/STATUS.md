# MODE MODE — status (current as of 2026-07-19)

The live snapshot of where the site is. The arc is in `ROADMAP.md`; how work runs + how to onboard is in `ORCHESTRATION.md`. Provenance: **Verified** = read from the live file/git or headless-tested · **Decided** = Julia's call · **Open** = needs Julia/Matt.

## Last touched
- **2026-07-19** — Dropped the auto `VIMEO`/`MP4`/`VIDEO` source tag from public video cards (`0d2df00`). Source type stays a backend fact (derived from `embed` vs `videoSrc`, still drives the player) but is no longer printed on the page. Card tags in general are auto-derived + not editable — noted as a possible future "optional editable tag" field.
- **2026-07-19** — Image crop tool (`60070a7`). Non-destructive crop — **aspect + draggable focal point + zoom** — on standalone image blocks, media-image blocks, and image+text rows. Editor gets an aspect/zoom picker with a WYSIWYG focal-point drag; the renderer wraps the image in a fixed-aspect box (`object-fit:cover` + `object-position`), so height locks and grid cards baseline-align. Original files untouched. Render verified headless (0 errors); editor parses clean.
- **2026-07-19** — Video + titles (session "Mode Mode project status review"). Editor `media` video blocks now take a native **MP4 upload** with **Loop / Autoplay (muted)** toggles; the renderer emits a native `<video>`, Vimeo still works alongside. Image / media-image cards now show their **Title** instead of the `IMG-NN` auto-label; untitled cards keep auto-numbering (untitled-only count). Renderer verified headless (0 console errors); pushed `b60ca88`. Repo now cloned locally at `~/Documents/GitHub/modemode`.
- **2026-06-28** — Initial snapshot: CMS live, six case-study pages, Supabase backend.

## One line
The full site is live and CMS-driven — a field-map homepage + six case-study pages reading from a **Supabase** backend, edited through a password-gated **studio editor**. Remaining work is real content/photos from Matt, the geometry single-source-of-truth ("split-spine"), media own-hosting, and ship polish.

## Architecture (realized)
- **Two surfaces, one data spine.** `index.html` = the field map (and the field-studio authoring surface for node geometry/colours, now behind `?studio`). `project.html` = one case-study page per project, rendered from that project's JSON document.
- **Data lives in Supabase.** One `public.projects` row per project (`slug` pk · `code` · `name` · `data jsonb`). `project.html`'s single `loadProject()` boundary reads it over PostgREST (anon, RLS public-read) and **falls back to the bundled `content/<slug>.json`** if Supabase is unreachable — the site can't break. The `content/*.json` files remain as the seed source + offline fallback + git history.
- **Media by URL.** Images referenced by URL (currently Matt's Squarespace CDN + a few repo assets); video = **native MP4 upload** (`<video>`, loop/autoplay) **or** Vimeo embed. Media uploads land in the public `project-media` Storage bucket — confirm its allowed MIME types + file-size limit permit video (Supabase default ~50 MB/file) before large MP4s.
- **Invariants (frozen):** one self-contained JSON doc per project = one DB row · all reads via `loadProject()` · media by URL · the homepage metaball is mirrored **READ-ONLY** into the project minimap (never refactor `index.html`'s renderer) · BB Strata type + white bg + JetBrains-Mono hairline system + the iOS light-render workaround on all output.

## Live surfaces (all verified headless, 0 console errors)
- **Homepage `index.html`** — field map, present mode by default. 7-project roster (incl. the non-interactive BG layer) baked into `seed()`, overridable via `localStorage mm_field_v2`. Node animation, cursor magnet, click-a-blob → case study, axis hatch-marks running edge-to-edge that **stop at the labels** (knockout). Studio chrome (EDIT/PRESENT + light-dark) is **hidden from the public**; reveal the field studio with `?studio`.
- **Project pages `project.html`** — masonry card-grid: a locked left rail (one fixed logo lockup + identity + a large **animated, textured ambient minimap** that bleeds off-screen left and floats behind the title/content per Julia's mock #2 + flex-fit nav + pager) and content cards. All block types render (text · image · stats · column · imagePara · carousel · cardgrid · media). Full-screen lightbox on every image. prev/next a closed 6-loop. Reads from Supabase.
- **All six projects** live + wired: P-01 EYEKNOW MANOR · P-02 MASSIVE · P-03 GIF · P-04 NIGHTMARE KART · P-05 65 PORTER · P-06 SELECTED ARCADE.
- **CMS editor `editor/index.html`** (supabase-js; `admin.html` redirects here) — email/password login; structured editors for identity, classification (hero/intro/collaborators), and every node (label, blurb, hide, "add content"); all block types with add/remove/move, **each block header labeled by its description + a thumbnail**; image upload to `project-media`; raw-JSON power mode; live Preview ↗; change-password; full-document save. Writes RLS-locked to the editor emails.
- **Backend (Supabase)** — project `modemode` (ref `vjvjparfulrtsxdslrpg`, us-east-1, `https://vjvjparfulrtsxdslrpg.supabase.co`). `projects` table + RLS (public read / editor-email write) + `touch_updated_at` trigger + `project-media` bucket. 6 rows seeded (node counts 15/10/2/5/5/5). Accounts: `comptonjulia@gmail.com`, `mattfryed@gmail.com` (temp pw `modemode2026` — ⚠ committed in this public repo; **rotate immediately** via the editor's **Password** button, then scrub it here).

## File map
- `index.html` — homepage field map (+ field studio behind `?studio`).
- `project.html` — case-study renderer (Supabase read + JSON fallback; `loadProject()` is the data boundary).
- `editor/index.html` — the CMS editor; `admin.html` is a redirect to it.
- `content/<slug>.json` — the 6 project docs. **Now the seed/fallback; Supabase is the live source.** Keep them in sync when editing structure by hand (or just edit in the editor, which writes Supabase).
- `assets/` — fonts (BB Strata), the MODE MODE logo SVG, NK stand-in drawings.
- `modemode-withbgnodes.txt` — homepage roster export (the geometry "master," for now).
- `docs/` — this file · `ROADMAP.md` · `ORCHESTRATION.md` · `project-pages_architecture_2026-06-26.md` · `cms-plan.md` · `handoff_*.md` · `master-prompt.md` · `supabase/` (schema.sql + seed + README) · `mockups/mode-mode.pdf`.

## Open / next  (detail in `ROADMAP.md` Phase 9+)
- **Split-spine** (the real architectural item): node geometry/labels/colours live in the homepage roster AND are copied into each project doc's `nodes[].geom`, joined only by `code`, with **no live link** — move a node on the homepage and the saved minimap goes stale. Decide the single source of truth (field-studio writes geometry to Supabase, vs. homepage-master + a sync step). Surface to Julia before building.
- **Real content/photos from Matt:** copy is sample-grade (his site text); Eyeknow event photos are designed placeholders (Kyle's links purged per Julia's rule); the full 22-card tarot deck (6 in repo). See `media-sourcing-policy` (memory): sources = Matt's site / Julia's drive / her Google Drive portfolio; never Kyle.
- **Media own-hosting:** migrate Matt's ~35 Squarespace hotlinks into the `project-media` bucket; repoint `src`.
- **Editor v2:** ✅ **image crop shipped** (`60070a7`, non-destructive: aspect + focal point + zoom). Remaining: block drag-drop reorder, and the `embed` block (from the memo).
- **Rotate the editor password** — `modemode2026` is in this public repo (see Backend). Change it, then scrub the doc.
- **Content hygiene:** delete leftover placeholder blocks in the live docs — eyeknow-manor currently has a blank-title `description` text block (Installation design node) and a `test`/`test` text block (Possessed Ouija Board node) rendering on the live page.
- **Homepage:** cursor becomes the "view project" tab on blob hover (no hand) — the last item from the Jun-28 notes.
- **Auth hardening:** open signup is still enabled (RLS blocks non-editor writes, but accounts can be created) — lock down if desired.
- **Ship:** custom domain (TBD) · SEO/OG meta · optional prerender to static `/<slug>/index.html` for crawlers.

## Decided / settled
Backend = **Supabase** (jsonb document-per-project, not relational). Editor = the on-brand `editor/` tool (Supabase table-UI was the interim). Video = **uploaded MP4 or Vimeo**. Public chrome behind **`?studio`**. Approved media sources only (Matt/local/Drive); **never hotlink Kyle's site**.

## On Julia (account/billing — not code)
- Supabase project is **free tier → idle-pauses after ~7 days**; a **keep-alive GitHub Action** (`.github/workflows/keepalive.yml`, ~every 2 days) currently prevents the pause. **Pro (~$25/mo)** is the durable always-on fix if you'd rather not depend on the ping.
- Production **domain undecided**; the site serves at `https://jalulia.github.io/modemode/` today (homepage), `/modemode/<slug>` via `project.html?p=`, `/modemode/editor` (CMS).
