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

## Project pages (W1 Rev-D — card-grid rebuild, 2026-06-27)
- **Restructured to a masonry card-grid** (structural lesson from Julia's Lovable reference — *structure only, BB Strata type kept, not Lovable's fonts*). Main column is a 2-up masonry of hairline cards, each with a red tracked label header: CLASSIFICATION, PROPERTIES (2 spec columns), MATERIAL CONDITIONS, COLLABORATORS, and **labeled image slots** `IMG-01`/`IMG-02`. Left rail = persistent identity + index (code/title, readout box, constellation, nav of all labelled nodes — content ones live, the rest muted, + pager).
- **Image slots are designed, not filler:** missing photos render as a labeled slot stating the exact shot needed + "PHOTO PENDING" (no black void, no stripes). The one real photo (`marquee.jpg`) sits inline in MATERIAL CONDITIONS.
- **Richer content** adopted from Julia's Lovable reference into `content/nightmare-kart.json` (full classification, 2 real PROPERTIES specs, material descriptions, shot-described image slots). Marked sample-grade pending Matt's confirmation. `code` kept **P-04** to match the live roster (not the mockup's P-07).
- **Interactions:** nav scroll-to + scroll-synced active state (IntersectionObserver), constellation node hover-highlight + click-to-jump, card/link hover, staggered card load (reduced-motion respected). White bg + BB Strata confirmed headless, zero console errors.
- Intact: `loadProject()` boundary, media-by-URL, Vimeo, accent = `colors.core`, only-if-content rule (non-content nodes appear muted in nav/constellation, no cards), prev/next, back-to-home, iOS workaround; `index.html` untouched.

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
