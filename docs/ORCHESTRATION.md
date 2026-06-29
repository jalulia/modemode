# MODE MODE — orchestration

How the build runs and how any instance onboards. **The Nexus instance maintains this file.**

> **Current mode: consolidated.** Julia runs build + coordination through a standing Nexus chat; we re-fork a focused worker instance only when a workstream is big enough to isolate (Julia calls it). The roles/handoff discipline below stays valid either way.

## Roles
- **Nexus (orchestrator + builder).** Standing partner. Owns the roadmap, `STATUS.md`, this file, the frozen schema/invariants, and consistency. Orients, builds, verifies headless, reviews, keeps the docs straight. Julia's single point of contact for "where are we / what's next / is this right." Hands Julia exact commit commands — never runs git on the mounted repo.
- **Worker instance (optional).** A focused, scoped build from a `handoff_*.md`; reports back; Julia commits.
- **Julia (human hub).** Makes product/creative calls, pushes commits, owns the Supabase project + accounts.

## Source of truth
- **Repo** `git@github.com:jalulia/modemode.git` → live at `https://jalulia.github.io/modemode/`. Nothing is real until committed + pushed.
- **`docs/STATUS.md`** — the live snapshot (read this first). `ROADMAP.md` — the arc.
- **Supabase** (`vjvjparfulrtsxdslrpg`) — the **live project data** (the `projects` table). The repo's `content/*.json` are the seed + offline fallback; the editor writes Supabase. `docs/supabase/` documents the schema/seed.
- **`project-pages_architecture_2026-06-26.md`** — architecture + data model (design record; §9 notes what shipped). **The schema/invariants are frozen; only the Nexus changes them, deliberately.**
- **Auto-memory** bridges sessions (Supabase project ref, media policy, split-spine, build notes).

## Workstreams
**Done:** W1 project-page template · W-LP left panel/minimap · W3 homepage↔project wiring · homepage interaction + chrome-gate · **W2 CMS content editor** (`editor/`) · **Supabase backend** (table + RLS + bucket + seed + `loadProject` flip).

**Open (Phase 9+ in `ROADMAP.md`):**
- **W-Spine** — resolve the split-spine (single source of truth for node geometry/labels/colours across the homepage roster and the project docs). *Architecture — Nexus surfaces the decision to Julia before building.*
- **W-Media** — own-host Matt's Squarespace images into `project-media`; repoint `src`.
- **W-Content** — author Matt's real copy/photos in `editor/` as they arrive.
- **W-EditorV2** — image crop · drag-drop reorder · `embed` block.
- **W-Ship** — domain · SEO/OG · prerender · accessibility/perf · homepage cursor→view-project tab.

## Consistency standards (every instance honors)
- One self-contained JSON doc per project = one Supabase row; **all reads via the single `loadProject()` boundary** (Supabase, JSON fallback). Media by URL.
- The homepage metaball is the source of truth for the project minimap — **mirror it READ-ONLY; never refactor `index.html`'s renderer.**
- Reuse the brand system: BB Strata type, white bg, JetBrains-Mono hairlines/greys/corner-marks; the iOS light-render workaround (`meta color-scheme:light` + light bg) on all HTML output.
- Public homepage shows no studio chrome — edit affordances live behind `?studio` / the `editor/` login.
- **Verify before "done":** render headless (Playwright in the sandbox; run node with `LD_LIBRARY_PATH=$HOME/xdlibs`; the chromium dep `libXdamage` is staged there), screenshot visual changes and look at them, zero console errors, measure JS self-time not headless FPS.
- No fabricated content — sourced or explicitly marked placeholder. Never hotlink Kyle's site (see `media-sourcing-policy`).
- Cosmetic/interaction/polish → just do it. Architecture (data model, auth/utility flow, the split-spine) → flag + surface to Julia, don't rabbit-hole.

## Coordination protocol (when forking a worker)
1. Nexus writes the scope + acceptance + the files it may touch (disjoint where possible) in `docs/handoff_*.md`.
2. Julia opens a worker, points it at the handoff.
3. Worker builds, tests headless (0 console errors), reports; Julia commits/pushes.
4. Nexus reviews against acceptance + invariants, updates `STATUS.md` + `ROADMAP.md`, flags drift.

## Kickoff prompts (reusable)

### Nexus
> You are the MODE MODE **Nexus** — standing partner for the MODE MODE studio site, in the "Matt / Mode Mode" Cowork project. Orient first: read the repo at `_Mode Mode/modemode` (request the `modemode` folder if you can't read it) — `docs/STATUS.md`, `docs/ROADMAP.md`, `docs/ORCHESTRATION.md`, `docs/project-pages_architecture_2026-06-26.md`, `docs/cms-plan.md`, `docs/supabase/README.md`, the `docs/handoff_*.md` — and your saved memory. Then `index.html` / `project.html` / `editor/index.html` as needed. Confirm current state before acting. The site is live at GitHub Pages; **project data lives in Supabase** (`vjvjparfulrtsxdslrpg`, edited via `editor/`), with `content/*.json` as fallback. Keep the docs current, keep the schema/invariants frozen, build + verify headless (0 console errors), and hand Julia exact commit/push commands (never run git on the mounted repo). Match how Julia works (terse, decisive, high-craft, verify-before-done). Start by confirming current state from `STATUS.md` and proposing the next moves.

### Worker (template)
> You are a focused MODE MODE worker on **<workstream>**, in the "Matt / Mode Mode" Cowork project. Read first: `_Mode Mode/modemode/docs/<handoff>.md`, then `STATUS.md` + the architecture doc + any data it points to. Build only that workstream, honoring the consistency standards + invariants in `ORCHESTRATION.md`. Test headless (zero console errors). Don't touch files outside your scope. Report the build + test results for Julia to commit, plus a one-paragraph summary for the Nexus.
