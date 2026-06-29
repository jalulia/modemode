# MODE MODE — CMS plan (framework + scaffolding)

> **Status: the editor SHIPPED (2026-06-28).** The block inventory in §1 is the live schema contract the editor builds against. The chrome rethink (§4) shipped — studio controls are behind `?studio`. The lightbox (§3) shipped. The "hand-editing JSON" framing below is historical: authoring is now the `editor/` CMS writing Supabase. **Remaining v2:** image crop · drag-drop reorder · the `embed` block.

_Where we are: between authoring and architecting. Six project pages exist, built by hand-editing JSON. This doc inventories what the template can already render, organizes it into a "waterfall" of content patterns, and scopes the editing layer + utility rethink so W2 (the content editor) has a real spec. Nexus-owned; reconcile with `project-pages_architecture_2026-06-26.md` §8._

---

## 1. Block inventory (what the renderer already does)
Each project = one JSON doc. CLASSIFICATION + each content-bearing node → sections of stacked blocks. Current block types:

| Block | Shape | Use today |
|---|---|---|
| `hero` | `{src, alt, caption}` | Full-width banner header at top of the content column (per project). |
| `text` | `{title, body, layout?:"two", wide?}` | Prose; first overview paragraph styles as a **lead**; `layout:"two"` = 2-column. |
| `stats` | `{title, items:[{k,v}]}` | "AT A GLANCE" — wide 4-up figures, stacks when narrow. |
| `column` | `{title, columns:[{spec,value,valueNote,name,body}]}` | "PROPERTIES" — spec pairs (dimensions, materials). |
| `imagePara` | `{title, rows:[{title,body,image}]}` | "MATERIAL CONDITIONS" — annotated rows (text + small image; image optional). |
| `image` | `{src, alt, caption, wide?}` | Single image, inline or full-width; caption distinct from body. |
| `media` | `{kind:"video"\|"image", embed\|src, caption, wide?}` | Vimeo embed or image. |
| `cardgrid` | `{title, aspect, images:[{src,caption,alt}]}` | Spread of cards at true aspect, no crop (e.g. the tarot deck). |
| `collaborators` | `[{name, role, url}]` | Classification-level credits list. |
| `embed` *(future)* | `{source, url}` | **From the memo** — pull in a social/external post (text or image) as a block; reuse the existing content orientation so it lands titled and in order. Not built. |

Empty/missing media → designed placeholder slot (shot description + "pending"), never filler.

## 2. Waterfall logic — pick a block by intent
A decision order from "structural / required" → "expressive / optional", so authoring is a guided descent rather than a blank canvas:

1. **Identify** (always): `hero` (the banner) · project title/code/accent (from the field map) · `stats` (the at-a-glance facts).
2. **Frame** (overview): `text` lead (the CLASSIFICATION statement) · `collaborators`.
3. **Specify** (the make): `column` (PROPERTIES — measurable facts) · `imagePara` (MATERIAL CONDITIONS — annotated detail rows).
4. **Show** (the work): `image` (single, inline vs `wide`) · `media` (motion/Vimeo) · `cardgrid` (a set at one aspect) · gallery/carousel (a run of shots).
5. **Narrate** (connective): `text` (1- or 2-column) between the above.

Rule of thumb baked into the editor: **the more an asset set wants to be seen as a system (decks, panels, frames), the higher up the `cardgrid`/gallery path; the more it's a single statement, the more it's a `wide` image or `hero`.**

## 3. Editing layer — what W2 must add (Julia's notes)
Authoring today = hand-editing JSON. The editor closes that gap:
- **Per-node block editor** in the studio — add/remove/reorder blocks of every type above; the "only-if-content" rule (a node becomes a section iff it has blocks).
- **Drag-and-drop section + block ordering**, hide/show per page.
- **Image crop** (per image, non-destructive — store a crop rect; media stays by URL).
- **Full-screen / lightbox** on every image (a template feature, not just CMS — can ship ahead of the editor).
- Export the full content JSON (the data boundary stays `loadProject` / one-doc-per-project, Supabase-portable).

## 4. Utility / chrome rethink (Julia's note)
The homepage's top-right **EDIT / PRESENT / light-dark** toggle is studio plumbing leaking into the product. It needs to go behind a proper authoring/utility flow:
- **Visitors** see only PRESENT (already the default) — no mode toggle, no studio chrome.
- **Authoring** (edit mode, the field studio, and the new block editor) lives behind a deliberate "enter studio" affordance / route, not a always-visible toggle.
- One coherent utility surface for both the field-map studio and the page content editor — this is the "holistic CMS flow" conversation, to settle before W2 build.

## 5. Sequencing
- **Now / cheap, ship independently:** full-screen image lightbox (template feature); the homepage interaction pass (below).
- **W2 (the editor):** per-node block editor + drag-drop + crop, on the schema above; then the utility/chrome rethink.
- **W6 (later):** Supabase port — unchanged by any of this (one-doc-per-project + `loadProject` boundary hold).

This is the scaffolding. The block schema in §1 is the contract the editor builds against.
