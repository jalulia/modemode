# MODE MODE — holistic roadmap

Where the whole site is going, phase by phase. Status as of 2026-06-27. The Nexus keeps this current; `STATUS.md` is the live snapshot, this is the arc.

Principle: **the homepage field map is the spine; each project page is one node-constellation, read.** Data-in-repo JSON now, engineered to port to Supabase in one move. No asset ever blocks a phase — stand-ins are produced in-house and swapped for real media when it lands.

---

## Phase 0 — Architecture & schema · ✅ done
Schema frozen, storage decided (data-in-repo → Supabase-ready), `loadProject()` boundary, media-by-URL, Vimeo for video. (`project-pages_architecture_2026-06-26.md`.)

## Phase 1 — Homepage field map · ✅ done
Two-layer topographic metaballs; the Jun-26 audio notes all shipped — cursor magnet (additive attraction), unfocused-opacity full range, black labels no chip, present-mode view-only, unlabeled-node rule, node animation on by default. Stable; touched only to add content-layer hooks.

## Phase 2 — Project page template · 🟡 in progress (current focus)
A single `project.html` renders a project from its JSON as a masonry **card-grid**: persistent left rail (identity + constellation index + nav + pager) and labeled content cards (CLASSIFICATION, PROPERTIES, MATERIAL CONDITIONS, COLLABORATORS, IMG-NN). BB Strata type, white, the studio's hairline system.
- **2a. Structure** ✅ — card-grid, scroll-synced nav, constellation hover/click, staggered load.
- **2b. Assets (in-house)** 🟡 — I produce on-brand stand-ins (technical elevations/detail drawings, material studies) so every slot is designed, not "pending"; real photos swap in by URL when available. **I never wait on Matt.**
- **2c. Refinement** 🟡 — tighten against the original notes: hover-to-expand node info ("portraits"), focal/preview interaction carried from the homepage, type hierarchy, spacing, motion, full responsive/mobile.

## Phase 3 — Homepage ↔ project wiring (W3) · 🟡 started
Make the two halves one site. **Done:** the round-trip — homepage (present) lock → CASE STUDY → project page → back-link → `index.html?focus=<code>` reopens the homepage in present mode locked on that project. **Remaining:** node-hover cross-preview, a more discoverable CASE STUDY affordance, shared constellation polish.

## Phase 4 — Content editor / CMS layer (W2)
Extend the studio into the authoring tool: per-node block editor (text/column/image/image+paragraph/media), node cover, collaborators, classification overview; the only-if-content rule; drag-reorder + hide/show per page; export full content JSON. (Removes hand-editing JSON.)

## Phase 5 — Media pipeline (W4)
Image sizing/optimization + responsive `srcset`, the in-house stand-in system, Vimeo embeds, lazy loading, an asset/shot manifest per project so swapping real media is drop-in.

## Phase 6 — Multi-project rollout · 🟡 started
Build the remaining roster pages from data. **Done (rough):** GIF (P-03), EYEKNOW MANOR (P-01), 65 PORTER (P-05) — real copy/credits/images pulled from mattfryed.com, real node geometry from the roster, palette per project; all wired into the homepage `PAGES` map and rendering with zero JS errors. **Remaining:** MASSIVE (P-02), SELECTED ARCADE (P-06); fill the muted disciplines with content; **migrate hotlinked Squarespace images to own-host/repo** (Phase 5 — current images depend on Matt's live site).

## Phase 7 — Polish + ship
Transitions/fades, accessibility pass, SEO/OG meta, optional prerender to static `/<slug>/index.html` for crawlers, custom domain (TBD), perf budget.

## Phase 8 — Supabase port (later)
Flip data-in-repo → Supabase: create the table, upload JSON rows + media, swap `loadProject()`. No renderer rewrite (the three port invariants hold).

---

### Immediate next moves
1. **Phase 2b/2c now:** generate the cabinet stand-in art in-house, wire it in; refine the page against the original notes (hover-expand, focal interaction, responsive).
2. Then **Phase 3** (homepage↔page wiring) to make it one navigable site for the Matt review.
3. Confirm Pages is serving + the live URL (open item); domain still TBD (Phase 7).
