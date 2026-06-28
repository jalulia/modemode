# MODE MODE — orchestration

How the build runs across focused Cowork instances: who owns what, how work stays consistent and non-overlapping. **The Nexus instance maintains this file.**

> **Current mode (2026-06-27): consolidated.** Julia is running build + coordination in a single chat for now (the multi-instance fork felt heavier than it was worth at this stage). The roles/handoffs below stay valid and we re-fork when a workstream is big enough to be worth isolating — Julia calls it.

## Roles
- **Nexus (orchestrator).** Standing coordinator. Owns the roadmap, `STATUS.md`, this file, the data schema, and consistency standards. Plans workstreams, writes/updates handoffs, reviews worker output against acceptance criteria, integrates, flags overlap/drift. Does **not** do heavy building. Julia's single point of contact for "where are we / what's next / is this right."
- **Worker instances.** Focused, scoped builds — one workstream each. Read the repo + their handoff, build, test, report; hand changes to Julia to commit.
- **Julia (human hub).** Opens instances, pushes commits, makes product/creative calls.

## Source of truth
- Repo `git@github.com:jalulia/modemode.git` — live at `https://jalulia.github.io/modemode/`. Nothing is real until committed.
- `docs/STATUS.md` — live snapshot; Nexus keeps it current.
- `docs/project-pages_architecture_2026-06-26.md` — architecture + data model. **The schema is frozen; only the Nexus changes it, with worker input.**
- Auto-memory bridges sessions.

## Workstreams (roadmap)
- [x] **W1 — Project page template** — `handoff_project-page-template.md`. `project.html` rebuilt to Julia's direction: white bg, self-hosted BB Strata type, content-driven layout (lead image only when a real photo exists, else text-led — no filler). Screenshot assets dropped; only `marquee.jpg` is real. Passes acceptance + port invariants. Fills out when Matt supplies real photos.
- [ ] **W2 — Content editor (CMS layer)** — per-node block editor in the studio; export full content JSON; the "only-if-content" rule; reorder + hide/show.
- [ ] **W3 — Homepage ↔ project wiring** — click/lock a project → its page; node hover swaps focal image; minimap reuse.
- [ ] **W4 — Media + deploy** — image sizing, Vimeo embeds, optional prerender for SEO, domain (TBD).
- [ ] **W5 — (later) Supabase port** — flip data-in-repo → Supabase per the port invariants.

## Coordination protocol
1. Nexus defines a workstream's scope + acceptance + the files it may touch (disjoint where possible) in a `docs/handoff_*.md`.
2. Julia opens a worker instance, pastes its kickoff prompt, points it at the handoff.
3. Worker builds, tests headless (zero console errors), reports; Julia commits/pushes.
4. Nexus reviews against acceptance + consistency + port invariants, updates `STATUS.md` + this roadmap, flags conflicts.

## Consistency standards (every instance honors)
- Reuse the homepage type/palette/hairline system (JetBrains Mono, the greys, corner marks); don't reinvent.
- Keep the iOS light-render workaround on all HTML output (`meta color-scheme:light` + light bg).
- Data: one self-contained JSON per project; all reads via a single `loadProject()` boundary; media referenced by URL. (Keeps the Supabase port a one-function change.)
- Test headless before "done"; zero console errors; measure JS self-time, not headless FPS.
- No fabricated content — mockup-sourced or explicitly marked placeholder.

## Kickoff prompts (reusable)

### Nexus
> You are the MODE MODE **Nexus** — standing orchestrator/PM for the MODE MODE studio site, in the "Matt / Mode Mode" Cowork project. Read, in order: the repo at `_Mode Mode/modemode` — `docs/ORCHESTRATION.md`, `docs/STATUS.md`, `docs/project-pages_architecture_2026-06-26.md`, `docs/handoff_project-page-template.md` — and your saved memory. Your job is coordination, not heavy building: keep the roadmap and `STATUS.md` current, keep the data schema frozen and coherent, define/update worker handoffs, review each worker's output against its acceptance criteria + the consistency standards + the port invariants, flag overlap/drift, and be Julia's single point of contact for status and next steps. When work is ready, give Julia the exact commit/push commands. Start by confirming current state from the repo + `STATUS.md` and proposing the immediate next moves.

### Worker (template)
> You are a focused MODE MODE worker on **<workstream>**, in the "Matt / Mode Mode" Cowork project. Read first: `_Mode Mode/modemode/docs/<handoff>.md`, then the architecture doc and any data it points to. Build only that workstream, honoring the consistency standards + port invariants in `ORCHESTRATION.md`. Test headless (zero console errors). Don't touch files outside your scope. Report back with the build + test results for Julia to commit, and a one-paragraph summary for the Nexus.
