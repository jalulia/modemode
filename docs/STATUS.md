# MODE MODE — status (fact-checked 2026-06-27)

Provenance is labeled. **Verified** = I read it from the live file/git or tested it. **Known** = from your own files/mockup. **Decided** = your explicit choice. **Placeholder** = I generated it; not ground truth. **Unconfirmed** = needs you.

## Project page — ambient field rebuild (2026-06-28 evening, pre-CMS feedback round)
Rebuilt the left-rail constellation per Julia's mock #2. The blob is now a **large, borderless ambient field** that fills the rail and **bleeds behind the logo + title** (was a small boxed thumbnail with an `OBJECT FIELD` caption — both removed). It **animates** (undulation + asymmetric breathing) and carries a **perlin cloud texture**, ported READ-ONLY from `index.html`'s renderer (`nodeSeeds`/`nodePert` + fBm value-noise) into `project.html` — `index.html` untouched. Adaptive 3:2 flex split keeps the field large while the nav still fits any node count. **Verified headless (chromium):** selected-arcade / eyeknow (15 nodes) / gif (2 nodes) → **0 console errors, rail overflow 0px** on all, animation confirmed (frame deltas), low-res field recompute throttled to 28fps so JS self-time stays negligible. Touches `project.html` (left-rail CSS + minimap engine only) — disjoint from the in-flight lightbox (main-content region). Pending Julia's eye + commit. Homepage feedback (cursor→view-project tab; axis hashmarks stop short of labels) deferred to after the in-flight `index.html` push.

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
- **Image slots filled in-house (no deferring to Matt):** `IMG-01`/`IMG-02` now carry on-brand **technical drawings I produced** — `cabinet-elevation.svg` (dimensioned front elevation) and `controldeck-detail.svg` (two-player Sanwa plan) — honest fabrication-style stand-ins, swapped for real photos by URL whenever they exist. The real `marquee.jpg` photo sits inline in MATERIAL CONDITIONS. The empty-slot/"PHOTO PENDING" treatment remains only as a fallback for slots with no stand-in yet.
- **Holistic roadmap** written to `docs/ROADMAP.md` (Phase 0–8). Current focus: Phase 2 (project page) refinement + in-house assets; then Phase 3 wiring.
- **Left rail is now genuinely locked** (`position:sticky; top:0; height:100vh` full-height panel — proven: rail title holds screen position through scroll; the earlier `sticky` never engaged because the grid row stretched it). Wordmark + studio descriptor moved into the rail so it's self-contained.
- **Size pass:** corrected the cramped/tiny defaults — body 14px, card padding 24px, spec values 23px, larger labels/nav/constellation, 22px gutters, generous rhythm. (Open: keep pushing scale/range; this is the dimension where Lovable still reads more confident.)
- **Hover-to-expand "portraits"** (from the original notes): hovering a node — in the constellation or the nav — highlights it and reveals a portrait panel below the field (label + one-line `blurb` + status: live → "Case study — open ▸", muted → "Discipline · no case study yet"). Resting state follows the scrolled-into section. Per-node `blurb` descriptors added to `content/nightmare-kart.json`. Verified headless (3 states, zero console errors).
- **Rhythm pass:** CLASSIFICATION now renders as a **full-width lead card** (`column-span:all`) with a larger opening statement, so the masonry has a strong top beat instead of a uniform field (verified: lead card 960px vs 469px cards).

## Other project pages (Phase 6 — rough buildout, 2026-06-27)
- **3 more pages built from data + mattfryed.com:** `gif.json` (P-03), `eyeknow-manor.json` (P-01), `65porter.json` (P-05). Real copy/credits, real node geometry from the roster, per-project palette; content sits on the nodes that have real material, the rest show muted in nav. All render with **zero JS errors** and the real photos load.
- **Renderer generalized:** unlabeled "shape-only" roster nodes now contribute to the metaball but are hidden from nav + draw no dot (matches the homepage rule).
- **Wired:** `index.html` `PAGES` map now has P-04/P-03/P-01/P-05; the prev/next chain loops nightmare-kart → gif → eyeknow-manor → 65porter → nightmare-kart.
- **Eyeknow Manor now fully built** from Kyle Calian's producer page (mattfryed + kyleacalian.com/home/fernet-halloween-2024, permission granted): real story (Fernet Branca Halloween 2024, New Orleans), 22 cards, real photos, and corrected credits — Kyle Calian (producer), Millwright (fab), Madwell (code), **Diego Patiño (tarot illustration)**, Wlabs (TV array), Event Marketer (press). Most disciplines now carry content.
- **Caveats:** (1) images **hotlinked from Squarespace CDNs** (Matt's + Kyle's) — fine now, migrate to own-host/repo in Phase 5; Julia OK'd direct linking for now. (2) Copy is sample-grade pending Matt's final.

## Homepage ↔ project wiring (Phase 3 — round-trip live)
- **Done:** the project page back-link → `index.html?focus=<code>`; the homepage reads `?focus`, switches to **present mode** and **locks** that project (showing its readout + CASE STUDY link). Full loop verified headless: homepage present → lock NK → CASE STUDY → project page → Back → homepage present + NK locked. `index.html` change is a single isolated handler at the end of init; the rest untouched.
- **Hover-image preview:** in present mode, focusing a project with a `PREVIEW` entry shows its image **top-left, directly under the readout, at the readout's width** (per Julia). Wired for **NIGHTMARE KART → `marquee.jpg`**; extend via the `PREVIEW` map.
- **BG layer (P-07) is non-interactable:** excluded from `projectAt()` hover/lock hit-testing and from the INDEX legend (count now 06). It still renders as the background field — just no hover/lock/click.
- **Real MODE MODE logo** (`assets/mode-mode-logo.svg`, the stacked two-line mark) now replaces the text wordmark on **both** the homepage and the project-page rail — inlined with `fill:currentColor` so it inherits ink (light) / light (dark-bg). Consistent top-left across all pages.
- **Rail top-left alignment (per Julia's mockup):** the back control is a **short ← arrow** in the left margin — tip aligned exactly to the corner mark (both at 16px), an 18px gap before **P-04**, and **vertically on the P-04 line** (centers match). 1px stroke in the corner-mark grey (`--grey-2`). The logo, P-04, and title hold one shared content edge. Rail `overflow:visible` (flex-fit keeps it no-scroll, verified 0px). Logo unified to 94px on homepage + project rail (was 90/94).
## W-LP — delivered + Nexus-reviewed (live, pushed `c63985d`, 2026-06-28)
All six roster projects now have pages (P-02 MASSIVE + P-06 SELECTED ARCADE built from Matt's sources, real copy/images, wired into `PAGES`/`PREVIEW`, prev/next a closed 6-loop). Reviewed against the brief + invariants — **passes**: single `loadProject()`/`fetch` boundary, media-by-URL, `index.html` renderer otherwise untouched; all 6 pages render with **0 console errors + 0px rail overflow** (re-verified). Minimap no-clip framing + edge labels + legible markers confirmed faithful; logo pinned to one fixed lockup (36,30)×94px site-wide.
- **Nexus decisions:** legible-accent → **keep uniform** (legibility rule; blobs keep true palette). Stats 4-col → **keep global**. `cardgrid` → **adopted into the schema** (see architecture §8).
- **NK hero — resolved (Julia's call):** swapped NIGHTMARE KART's hero to the **marquee photo** (the preview image — landscape, banners cleanly); the elevation drawing is preserved as an image in the Cabinet section, not orphaned. (Systematic "banner only landscape / contain SVG" header rule is still a nice-to-have for robustness, but no page needs it now.)
- **Open / flagged:** P-02 + P-06 copy is sample-grade (Matt's site text) → confirm/replace. Homepage readout/legend still render P-06 raw yellow → port the contrast floor (minor). Assets still needed: the purple EYEKNOW MANOR poster URL (for its header) + the full 22-card tarot deck (only 6 in repo).
- **Homepage defaults to PRESENT mode** (the clean viewer); EDIT is one toggle away.
- **Hover = click, consistently:** focusing a project (hover *or* lock) now shows both the **preview image** (top-left under the readout) **and** the **CASE STUDY** link. `PREVIEW` map populated for all four paged projects (NK marquee, GIF neon, Eyeknow manor, 65 Porter exterior).

## Cosmetic pass (2026-06-28, from the voice memo)
- **Axis hatch-marks (homepage):** faint dashed tick-lines now run **edge-to-edge** along the field's two centre-lines, anchored to the browser window (recomputed in `positionAxes()` off the same `cx,cy` as the edge labels, independent of the blobs). Present-only, ~.5 opacity (.32 on dark bg). Verified: `axisH.top` / `axisV.left` track the field centre, both render, 0 console errors.
- **Full-screen image lightbox (project pages):** every content image is now `cursor:zoom-in` → click opens it full-screen on a dark scrim with a `CLOSE ✕`; click-anywhere or **Esc** closes. One delegated handler on `.main img` (so carousel/cardgrid/hero/inline all covered), single `#lightbox` node. Verified on MASSIVE (8 content imgs): opens with correct src, closes on Esc, 0 console errors. (Ships the §3 "lightbox ahead of the editor" item from `cms-plan.md`.)

## Project page — rail + layout system (2026-06-27)
- **Anchored rail that never scrolls:** the left rail is locked full-height (`overflow:hidden`) with consistent back-nav / title / **fixed-box minimap** (constellation contain-fit to the same box on every page). The section nav is **flex-distributed** so any count fits without scrolling — verified 0px overflow at 13 items (Eyeknow), 6, 5, and 2. The whole node **+ its label** is hoverable in the minimap; the portrait now reveals as an overlay on the field (frees rail space).
- **Real layout system (not just 2-col images):** new block types — `stats` (at-a-glance figures), `carousel` (full-width image gallery w/ arrows + counter), full-width `wide` images with **captions distinct from body**, `column` specs, and two-column body (`layout:"two"`). Eyeknow re-authored to exercise all of them (stat card, tarot carousel, full-bleed feature images, two-column copy). Verified headless, zero JS errors.
- **Next in Phase 3:** preview images for the rest, node-level (not just project-level) preview, CASE STUDY discoverability beyond the locked readout.
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
