# Handoff — Project page template (Phase 1)

For a fresh Cowork instance. Goal: build the case-study/project page as a static template that renders a project from its JSON, matching the mockup. Start with **NIGHTMARE KART** — `content/nightmare-kart.json` is a **scaffold/test fixture**: node geometry + colours are real (from the live roster) and the collaborators / PROPERTIES / MATERIAL-CONDITIONS labels are from the mockup, but all other copy, captions, images, and the Vimeo id are placeholders for Matt to fill. Build the renderer against the structure; don't treat the placeholder copy as final.

## Read first
- `docs/project-pages_architecture_2026-06-26.md` — the architecture + IA + data model + rules.
- `docs/mockups/mode-mode.pdf` — the 3-zone layout + inline notes (NIGHTMARE KART).
- `content/nightmare-kart.json` — the sample data to render (real node geometry + mockup content).
- `index.html` — the homepage field studio. **Reuse its metaball renderer read-only** for the minimap; do not refactor it.

## Build (Phase 1, read-only template)
A single `project.html` that takes `?p=<slug>` (or hash), fetches `content/<slug>.json`, and renders the 3-zone layout:

- **Left — anchored side nav:** project name in the **accent colour** (`colors.core`); a **minimap** of the project's node constellation (render `nodes[].geom` with the field renderer, scaled to fit — start with a direct resize, refine later); coord readout; **section nav** = `CLASSIFICATION` + one entry per node **that has content**; `Back to main MODE MODE`.
- **Middle — content blocks** for the active section.
- **Right — focal image** = the active section's cover (or hero for CLASSIFICATION).
- **Footer** — `Previous Project` / `Next Project` (`prev` / `next` slugs).

### Section rule
Render a node as a section **iff** `content && content.blocks.length > 0 && !content.hidden`. `CLASSIFICATION` always renders first. (Sample: 5 nodes → **2 sections + CLASSIFICATION** — `nk-cabinet` (2 blocks) and `nk-lighting` (1 block) render; `nk-3d` + `nk-interface` have empty `blocks:[]` and `nk-welding` has `content:null`, so all three show nothing. The expected NIGHTMARE KART nav is exactly: CLASSIFICATION · Cabinet Design & Fabrication · Interactive Lighting System.)

### Block renderers (each has an optional `title`)
- `text` — title + `body` (newline-aware).
- `column` — title + `columns[]` of `{title, body}` (2-up).
- `imagePara` — title + `rows[]` of `{title, body, image}` (text left, thumb right).
- `image` — `{src, caption}`.
- `media` — `kind:"image"` (`src`) or `kind:"video"` (`embed` → Vimeo iframe); `fullbleed` flag; `caption`.
- `collaborators` (in `classification`) — `{name, role, url}` list.

### Interactions
- Hovering/clicking a node in the side nav or minimap swaps the **focal image** to that node's `cover` and activates its section (this is the homepage hover effect carried onto the page).
- Accent colour drives section headers, the title, active-nav state, hairlines.

### Routing / media / constraints
- **Routing:** one `project.html`, `?p=<slug>`, client-side fetch of the JSON. No build step for now. (Later: a small prerender script can emit static `/<slug>/index.html` for SEO.)
- **Media:** images at `assets/<slug>/…` in the repo; **video = Vimeo embeds** (`media.embed`). Keep video out of the repo.
- Keep the **iOS light-render workaround** on all output (`<meta name="color-scheme" content="light">` + explicit light bg on html/body).
- Match the homepage's type/palette/hairline system (JetBrains Mono, the greys, the corner marks).

## Acceptance
NIGHTMARE KART page reads like the mockup: 3 zones, red accent (`[196,0,33]`), CLASSIFICATION + the 3 content sections in the side nav, real minimap constellation, working focal-image swap, prev/next, back-to-home. Zero console errors. Test headless (Playwright is installed in the sandbox; run with `LD_LIBRARY_PATH=$HOME/xdlibs` — libXdamage is staged there; measure JS self-time, not headless FPS; `file://` localStorage doesn't persist across reload in headless — not a bug).

## Port-readiness (do this so the backend swap is trivial later)
**Recommended target when we flip the switch: Supabase** (Postgres + Storage + Auth in one; matches the studio's instinct; generous free tier). Design rule that makes the port a one-function change:

- **Each project is ONE self-contained JSON document** (`content/<slug>.json`) = one future `projects` table row (`slug` + `data jsonb`). No cross-file joins.
- **All data access goes through a single boundary:** `loadProject(slug)` (and later `saveProject`). Today it `fetch()`es the file; the port replaces only that function with a Supabase query. Nothing else in the renderer knows where data comes from.
- **Media is referenced by path/URL, never inlined.** Today `assets/<slug>/…`; the port repoints the base to Supabase Storage. Video already external (Vimeo).

Keep these three invariants and the migration is: create the table, upload the JSON rows + media, swap `loadProject`. No renderer rewrite.

---

## Revision B — visual interpretation corrections (Nexus, 2026-06-27)
The first pass (`project.html`) is **structurally correct and passes the port invariants**, but it **misreads the mockup's visual language**. Keep the data layer / `loadProject` / routing / block model as-is; redo the layout + styling against `docs/mockups/mode-mode.pdf` (all 5 pages — page 4 is the annotation page; pages 1–3 are the real comps). Side-by-side renders are in the Nexus session. The misread is consistent: **an airy editorial layout was turned into a boxed dashboard, and the signature element was shrunk.** Fix, in priority order:

1. **The field-map blob is the hero of the left rail, not a thumbnail.** The mockup makes the constellation LARGE, soft, and *borderless* — it fills most of the left column and the node labels sit on it. It IS the nav (annotation: "essentially a side nav, always anchored on the left"). The first pass boxed it into a small `.minimap-wrap` panel with an `ADDR · OBJECT` caption. Make it big, borderless, dominant; drop the caption chrome. Reuse the homepage metaball math (already ported).
2. **Strip the panel/dashboard chrome — go editorial.** No bordered cards with filled accent header bars around every block. The mockup uses small **uppercase red section labels** (PROPERTIES, MATERIAL CONDITIONS, CLASSIFICATION, COLLABORATORS) over plain body text, separated by whitespace and at most hairline rules. Remove the `panel`/`panel-h`/`IMG` chrome.
3. **The section image is a large, clean, borderless hero — not a small boxed thumb.** First pass shows a tiny right-rail image with an `IMG` header chip (made worse because `cabinet-hero.png` is itself a screenshot of the mockup — swap that asset). The cabinet/section image should occupy major real estate.
4. **CLASSIFICATION matches mockup page 2:** large hero image with intro copy beside it and COLLABORATORS below — not a near-empty middle column with a thumbnail on the right.
5. **Rebalance proportions.** It's not a rigid equal 3-column grid; the image gets major space, content breathes. Eliminate the dead whitespace the first pass leaves on CLASSIFICATION.

**Keep:** `loadProject()` boundary, media-by-URL, Vimeo, accent = `colors.core`, the section "only-if-content" rule, prev/next, back-to-home, iOS workaround, JetBrains Mono + grey/hairline palette.

**Data note (decide separately — not a renderer bug):** the mockup's nav shows CLASSIFICATION · Cabinet · **3D Modeling** · **Interface Feedback** (3 content nodes). The fixture instead put content on Cabinet + **Interactive Lighting**, so the render shows Cabinet + Lighting. The "only-if-content" rule is working correctly — the *data* is what diverges from the comp. For a faithful demo, move the placeholder content onto the same nodes the mockup populates (or accept Lighting). This is placeholder pending Matt's real copy; flag for Julia.

**Also fix:** the first pass logs one `404` (a missing asset → not "zero console errors"); add the empty-`src` guard to the bare `image` block to match the graceful handling in `imagePara`/`media`.
