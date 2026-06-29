# MODE MODE — how the build runs

How work happens on MODE MODE and how to bring a fresh chat up to speed.

> **Current mode: one standing chat.** Julia runs build + coordination through a single ongoing chat; we spin up a separate focused chat only when a chunk is big enough to isolate (Julia calls it). The handoff discipline below applies either way.

## Who does what
- **Julia** makes the product/creative calls, pushes commits, and owns the Supabase project + accounts.
- **The assistant (this chat)** orients, builds, verifies headless, reviews its own output, and keeps the docs current. It hands Julia exact commit commands and never runs git on the mounted repo.
- **A focused side-chat (optional)** takes one scoped piece from a `handoff_*.md`, builds + tests it, and reports back for Julia to commit.

## Source of truth
- **Repo** `git@github.com:jalulia/modemode.git` → live at `https://jalulia.github.io/modemode/`. Nothing is real until committed + pushed.
- **`docs/STATUS.md`** — the live snapshot (read first). `ROADMAP.md` — the arc.
- **Supabase** (`vjvjparfulrtsxdslrpg`) — the live project data (the `projects` table). The repo's `content/*.json` are the seed + offline fallback; the editor writes Supabase. `docs/supabase/` documents schema/seed.
- **`project-pages_architecture_2026-06-26.md`** — architecture + data model (design record). The schema/invariants are frozen — change them deliberately, not casually.
- **Auto-memory** bridges sessions (Supabase ref, media policy, the split-spine, build notes).

## What's done / what's open
**Done:** project-page template · left panel + minimap · homepage↔project wiring · homepage interaction + chrome-gate · the CMS content editor (`editor/`) · the Supabase backend (table + RLS + bucket + seed + the `loadProject` flip).

**Open (Phase 9+ in `ROADMAP.md`):**
- **Split-spine** — single source of truth for node geometry/labels/colours across the homepage roster and the project docs. *Architecture — settle the decision with Julia before building.*
- **Media own-hosting** — migrate Matt's Squarespace images into `project-media`; repoint `src`.
- **Content** — author Matt's real copy/photos in `editor/` as they arrive.
- **Editor v2** — image crop · drag-drop reorder · `embed` block.
- **Ship** — domain · SEO/OG · prerender · accessibility/perf · the homepage cursor → "view project" tab.

## Standards (hold these everywhere)
- One self-contained JSON doc per project = one Supabase row; **all reads via the single `loadProject()` boundary** (Supabase, JSON fallback). Media by URL.
- The homepage metaball is the source of truth for the project minimap — **mirror it READ-ONLY; never refactor `index.html`'s renderer.**
- Reuse the brand system: BB Strata type, white bg, JetBrains-Mono hairlines/greys/corner-marks; the iOS light-render workaround (`meta color-scheme:light` + light bg) on all HTML output.
- The public homepage shows no studio chrome — edit affordances live behind `?studio` / the `editor/` login.
- **Verify before "done":** render headless (Playwright in the sandbox; run node with `LD_LIBRARY_PATH=$HOME/xdlibs`; the chromium dep `libXdamage` is staged there), screenshot visual changes and look at them, zero console errors, measure JS self-time not headless FPS.
- No fabricated content — sourced or explicitly marked placeholder. Never hotlink Kyle's site (see `media-sourcing-policy`).
- Cosmetic/interaction/polish → just do it. Architecture (data model, auth/utility flow, the split-spine) → flag + settle with Julia, don't rabbit-hole.

## Forking a focused side-chat
1. Write the scope + acceptance + the files it may touch (disjoint where possible) in `docs/handoff_*.md`.
2. Julia opens the side-chat and points it at the handoff.
3. It builds, tests headless (0 console errors), reports; Julia commits/pushes.
4. Reconcile its output back into the canon — update `STATUS.md` + `ROADMAP.md`, flag any drift.

## Onboarding prompt (paste into a fresh chat)
> You're my standing partner on MODE MODE — my studio site (a field-map homepage `index.html` plus per-project case-study pages `project.html`, each rendered from one JSON document), in the "Matt / Mode Mode" Cowork project. Orient first: read the repo at `_Mode Mode/modemode` (request the `modemode` folder if you can't read it) — `docs/STATUS.md`, `docs/ROADMAP.md`, `docs/ORCHESTRATION.md`, `docs/project-pages_architecture_2026-06-26.md`, `docs/cms-plan.md`, `docs/supabase/README.md`, the `docs/handoff_*.md` — and your saved memory. Then `index.html` / `project.html` / `editor/index.html` as needed. Confirm current state before acting. The site is live on GitHub Pages; **project data lives in Supabase** (`vjvjparfulrtsxdslrpg`, edited via `editor/`), with `content/*.json` as fallback. Keep the docs current, keep the schema/invariants frozen, build + verify headless (0 console errors), and hand me exact commit/push commands (never run git on the mounted repo). Match how I work — terse, decisive, high-craft, verify-before-done. Start by confirming current state from `STATUS.md` and proposing the next moves.

## Scoped side-chat prompt (paste when forking)
> You're on a focused MODE MODE task — **<task>**, in the "Matt / Mode Mode" Cowork project. Read first: `_Mode Mode/modemode/docs/<handoff>.md`, then `STATUS.md` + the architecture doc + any data it points to. Build only that task, honoring the standards + invariants in `ORCHESTRATION.md`. Test headless (zero console errors). Don't touch files outside your scope. Report the build + test results for Julia to commit, plus a one-paragraph summary.
