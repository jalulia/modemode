# MODE MODE — status (fact-checked 2026-06-27)

Provenance is labeled. **Verified** = I read it from the live file/git or tested it. **Known** = from your own files/mockup. **Decided** = your explicit choice. **Placeholder** = I generated it; not ground truth. **Unconfirmed** = needs you.

## Repo / live
- **Verified (this session):** remote `git@github.com:jalulia/modemode.git`, branch `main`, pushed through commit `c52f2ae` — `origin/main` == `HEAD`, **working tree clean** (`git status --porcelain` empty). Three commits landed since the last STATUS write: `9c0d2ed` (fact-check + this file), `212bd78` + `c52f2ae` (NIGHTMARE KART scaffold — real mockup images/copy + orchestration model).
- **Verified:** tracked files: `index.html`, `README.md`, `.gitignore`, `modemode-withbgnodes.txt`, `content/nightmare-kart.json`, `docs/` (`ORCHESTRATION.md`, architecture, handoff, feedback, this file, `mockups/mode-mode.pdf`), `assets/nightmare-kart/` (cabinet-hero, cabinet, marquee, lighting + README.txt).
- **Unconfirmed:** GitHub **Pages** enabled / serving, and the public URL. (Can't see GitHub from here — confirm in repo Settings → Pages.)

## Homepage build (`index.html`)
**Verified** (headless tests, zero console errors; several you've also confirmed live):
- 7-project roster incl. the BG layer, `color-burn`, your tuned fx baked as defaults — sourced from your `modemode-withbgnodes.txt` export.
- Node animation (undulation / asymmetric breathing) **on by default**.
- Cursor magnet with asymmetric **snap-back ease** (you confirmed the feel).
- Effect panel + blend **persist** to localStorage (save/load round-trip verified).
- Present mode: unfocused-opacity full range, **black labels no outline**, **view-only** (no label drag), unlabeled nodes show no dot.
- Drag-reorder projects, GLOBAL-tab de-focus, metaball curvature, hover fade.

## Project pages (W1 Rev-C — design rebuild on white + brand type, 2026-06-27)
- **Rebuilt to Julia's direction:** **white** background (the cream is gone), self-hosted **BB Strata** type (`BB Strata Pro` display / `BB Strata ML` text, in `assets/fonts/`, woff2 + ttf/otf fallback) replacing JetBrains Mono, and a **content-driven layout** — a section composes its blocks with a **lead image only when a real photo exists**; otherwise it is text-led at reading measure. **No filler/placeholder boxes are ever drawn.** Headless: white bg confirmed, fonts loaded, zero console errors.
- **Honest assets:** of the 4 supplied images, only `marquee.jpg` is a real photo; `cabinet-hero.png`, `cabinet.png`, `lighting.png` are all screenshots of the mockup. The renderer now points only at `marquee.jpg` (inline in MATERIAL CONDITIONS); the screenshots are nulled in `content/nightmare-kart.json`. Result: CLASSIFICATION + Cabinet are text-led with the one real image where it belongs. **Matt's real photos are what fill the page out** — the lead-image composition is built and activates the moment a real `cover`/`hero` is supplied.
- **Section list now honest:** CLASSIFICATION + Cabinet Design & Fabrication (lighting dropped — its only content was a screenshot; returns when Matt gives a real image/copy).
- Intact: `loadProject()` boundary, media-by-URL, Vimeo, accent = `colors.core`, only-if-content rule, prev/next, back-to-home, iOS workaround; `index.html` untouched.

## Homepage ↔ project (minimal hook landed)
- **Done:** `index.html` present-mode locked-project readout now shows a **CASE STUDY →** link (in the project core colour) → `project.html?p=<slug>` for projects in the new `PAGES` code→slug map (only `P-04` → `nightmare-kart` today). Headless-verified: link renders, correct href, NK locked. Full W3 wiring (node hover → focal swap, minimap reuse on the homepage) still pending.
- **Decided:** data-in-repo CMS now, engineered to port to **Supabase** later (my recommendation); **focused Cowork instances** per workstream; **NIGHTMARE KART** page first; **Vimeo** for video.
- **Known (from mockup `mode-mode.pdf`):** the 3-zone layout; block types (text, column, image+paragraph, image, media); the rules (homepage dictates sections, node→section only if it has content, accent = core-node colour, anchored left side-nav, drag-reorder + hide/show per page, prev/next); collaborators, PROPERTIES copy, MATERIAL-CONDITIONS labels.
- **Known (from live roster):** NIGHTMARE KART = `P-04`, accent `[196,0,33]`, 5 nodes with real labels + geometry. Scaffold renders to **CLASSIFICATION + 2 sections** (cabinet = 2 blocks, lighting = 1 block; 3d + interface have empty `blocks:[]`; welding `content:null`). A 3rd section appears only when Matt adds copy to one of the empty nodes.
- **Placeholder (in `content/nightmare-kart.json`, flagged in its `_note`):** all non-mockup body copy, captions, the Vimeo id, prev/next order, and which nodes have content. Matt supplies the real values. **No `project.html` / renderer exists yet** — only the scaffold data + the W1 build handoff. W1 is the immediate next workstream.

## Schema coherence (frozen — Nexus-owned)
- **Canonical node geometry is nested under `nodes[].geom`** (`{x,y,r,i,f,core}`), per the fixture + `handoff_project-page-template.md`. The architecture doc §3 still shows these flat on `Node`; the fixture + handoff are the build target. Low-priority doc cleanup; not a blocker.
- **Accent = `colors.core`** (single source of truth). The fixture also carries a redundant top-level `accent` mirror; W1 should key off `colors.core` and ignore/drop the duplicate to avoid drift.

## Corrected this pass
- Removed `normalo.studio` everywhere — it was a garbled voice-memo transcription, never a confirmed domain. Production domain is **undecided**.
- Stripped invented NIGHTMARE KART copy → explicit placeholders.

## Open / needs you
1. Confirm Pages is enabled + the URL.
2. Domain: which one, and is it registered?
3. Matt: real copy + images per node in `content/nightmare-kart.json`.
