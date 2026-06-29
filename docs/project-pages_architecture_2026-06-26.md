# MODE MODE — Project pages + CMS architecture

> **Status (2026-06-28): the design below is now implemented.** The recommended stack shipped — Supabase backend (jsonb document-per-project), the `loadProject()` flip with JSON fallback, the `editor/` CMS, and the `project-media` bucket. This doc is the design record + rationale; `STATUS.md` is the current state. §7 decisions hold; the one open architectural item is the **split-spine** (single source of truth for node geometry — see `ROADMAP.md` Phase 9).

_Synthesis of the project-page mockups (mode-mode.pdf, inline notes) and the Jun 26 voice memo, plus a phased plan and stack recommendation. Written to drive decisions, not to be exhaustive._

---

## 1. What we're building (organized)

Two layers, one data spine.

**Homepage** = the field map (built). Projects as metaball fields; labelled nodes = disciplines/specializations. No order — "a vibe." It is also the *authoring surface*: plotting a project and its nodes here is what defines a project's existence, palette, and section list.

**Project / case-study page** = one per project. From the mockups, a fixed **3-zone layout**:

- **Left — anchored side nav** (always on screen): project title in the accent colour · a **minimap** of that project's node constellation (the homepage blob, compressed to fit) · the coordinate readout · the **section nav**: `CLASSIFICATION` (overview) + one entry per specialization node · `Back to main MODE MODE`.
- **Middle — content** for the active section (stacked content blocks).
- **Right — focal image** (the section's hero/cover image).
- **Footer** — `Previous Project` / `Next Project`.

**CLASSIFICATION** is the project's overview section (hero image + intro copy + collaborators). It's the default/landing section of every project page.

Each **specialization node** that has content becomes a section (Cabinet Design & Fabrication, 3D Modeling & Printing, Interface Feedback System, etc.).

### Content blocks (each has a title)
1. **Text** — H1 + body.
2. **Column** — 2-up, each column a title + body (e.g. `PROPERTIES`: W×L×H + spec).
3. **Image** — single image (+ optional caption).
4. **Image + paragraph** — repeating rows of title + body + thumbnail (e.g. `MATERIAL CONDITIONS`: Faux Stained Glass Marquee, Shou Sugi Ban).
5. **Collaborators** — name · role · link (LWMedia, Arcade Commons, Wonderville).
6. (implied) **Full-bleed image / video** for hero + heavy media.

### System rules — the load-bearing IA
- **Homepage dictates the skeleton.** Plotting on the homepage auto-populates a project page's section list ("home page dictate/populates sections, i.e. classification").
- **Nodes become sections only if they have content** (the "XOR"). A labelled node with no case-study content shows nothing — so you can plot freely for the vibe without being forced to write content. Add content later and the section appears.
- **Two-way / reverse-engineered.** Homepage generates the skeleton; the case-study page is where you add content, **reorder (drag-and-drop)**, and **hide/show** sections. Homepage has no order; the case page is ordered.
- **Accent colour per page = the project's core ("center") node colour** from the homepage palette.
- **Node cover image is context-aware.** Each node holds images; a checkbox marks one as that node's cover, pulling only from that node's uploads. Cover images drive the focal-image swap when navigating nodes (hover top-left node → focal image becomes that node's cover).
- **The homepage hover/magnet interaction carries onto the page** as node navigation.

---

## 2. The CMS question — how to make this editable + frictionless

The studio already is a de-facto CMS for the *plot* (projects, nodes, colours, positions) and exports JSON. What's new is a **content layer** (per-node blocks, cover images, collaborators) and an editor for it. Three ways to host a "CMS-driven" site:

**A — Data-in-repo / git-as-CMS (recommended for now).** All structure + content lives as JSON in the repo; media as files (images) + external embeds (video). Edited in the studio's own UI, exported, committed → Pages rebuilds. **Free, static, fits Pages today, zero backend.** Cost: editing ends in a git commit; large video can't live in-repo.

**B — Headless CMS / DB (Supabase or Sanity).** Content + media in a hosted backend; the static site fetches at load (or at build). Nicer non-technical editing UI, real media hosting, auth. Cost: a backend, a bill, and auth to manage. Right when you want to edit without touching git, or have multiple editors.

**C — Hybrid.** Structure in-repo (A), media on a dedicated host (Cloudflare R2 / Bunny / Cloudinary, or Vimeo for video). The pragmatic middle once video shows up.

### Recommendation
Stay on **GitHub Pages + data-in-repo (A)** for the prototype/UX phase — your instinct is right. It's free, fast to iterate, and the studio UI extends naturally into the content editor. Treat **video as external from day one** (Vimeo/Cloudflare Stream/Bunny) — that's the real cost driver you flagged, and it doesn't belong in a git repo. Keep images in-repo while small. Defer Supabase/Sanity until the UX is proven *and* you want a no-git admin or a second editor — at which point the JSON schema we define now ports over cleanly.

**Two honest caveats on Pages:** (1) no server, so any editing is client-side or commit-based — fine for a solo operator, a wall if you want a hosted admin panel; (2) Pages won't host video. Both are "later" problems, not "now" problems.

---

## 3. Data model (the spine)

Extend the existing schema; don't fork it.

```
Project { id, code, name, colors:{edge, core},      // core = accent
          nodes:[Node], classification:{…}, order }
Node    { id, label, x, y, r, i, f, core,           // field-map geometry (exists)
          content:{ cover, blocks:[Block], hidden, order } }   // NEW case layer
Block   text       { title, h1, body }
        column     { title, columns:[{title, body}] }
        image      { title, src, caption }
        imagePara  { title, rows:[{title, body, image}] }
        media      { title, src|embed, kind:image|video, fullbleed }
classification { hero, intro:[Block], collaborators:[{name, role, url}] }
```
- Section renders **iff** `content.blocks.length > 0 && !hidden` (CLASSIFICATION always renders).
- Stored schema stays clean: media is referenced by path/URL, not embedded.

---

## 4. Phased plan

**Phase 0 — Architecture & schema (decide + lock).** This doc + sample JSON for one real project (NIGHTMARE KART, fully populated from the mockup). Settle storage (data-in-repo), routing, media-for-video.

**Phase 1 — Project page template, read-only.** Build the 3-zone case-study page as a static template that renders a project from JSON: side nav, minimap (reuse the field render at small scale), content blocks, accent colour, prev/next, back-to-home. One project fully built. Proves the UX with real content. No editing yet.

**Phase 2 — Homepage ↔ project wiring.** Click/lock a project on the homepage → navigate to its page; node hover swaps the focal image; the minimap reuses the field renderer. The two halves become one site.

**Phase 3 — Content editor (the CMS layer).** Extend the studio with a per-node content editor: blocks (text/column/image/image+paragraph/media), node cover checkbox, collaborators, classification overview; section reorder + hide/show; the "only-if-content" rule. Export full content JSON. Optional inline/WYSIWYG editing.

**Phase 4 — Media pipeline.** Image handling (in-repo, sized) + video embeds (external host). Decide host.

**Phase 5 — Polish + ship.** Custom domain (TBD), transitions/fades, responsive/mobile, prev-next, SEO/meta/OG.

**Phase 6 — (optional) hosted CMS.** If/when you want no-git editing or a second editor, migrate the data + media to Supabase or Sanity. The schema from Phase 0 ports directly.

---

## 5. Working model — one chat vs dedicated instances

This is a multi-week, multidimensional build, and a single thread will eventually hit context limits and degrade (this one is already long). Recommended pattern — the same handoff discipline that rescued this project:

- **Lock architecture + schema here** (this doc), commit it to the repo.
- Then run **focused, sequential Cowork instances per workstream**, each seeded from the repo + this doc + project memory: (1) **Project-page template/front-end**, (2) **Content editor / CMS layer**, (3) **Media + deploy + domain**. Each has a tight, testable scope.
- Keep the **homepage field studio** in its own lane (it's stable; touch it only to add the content-layer hooks).

For a solo operator, *sequential* focused instances beat many parallel ones (less coordination). The repo, memory, and a short handoff per instance are the glue. I keep deep context on the build; a fresh focused instance keeps each session sharp.

---

## 6. Tools / connectors that would help

- **GitHub connector** — would let edits be committed/pushed directly instead of the manual `git push` dance. Highest day-to-day friction win. (Not seen in the registry scan; worth checking.)
- **frontend-design skill** — to build the project-page template to a high visual bar.
- **Supabase** (registry) — the backend if/when you go hosted (DB + storage + auth in one; matches your instinct). For Phase 6.
- **Cloudflare** (registry) — R2 for media, edge hosting; alternative media/host path.
- **Sanity** (registry) — purpose-built headless CMS if you want a polished content UI later.
- **Netlify / Vercel** (registry) — hosting upgrade from Pages when you need serverless/forms/identity.
- Video: **Vimeo / Cloudflare Stream / Bunny** embeds — no MCP needed.

---

## 7. Decisions (locked Jun 26)
1. **CMS approach** — **data-in-repo now**, built for a clean port. Port target: **Supabase** (Postgres + Storage + Auth). Design rule: each project = one self-contained JSON doc = one future DB row; all data access through a single `loadProject()` boundary; media referenced by URL. Flipping the switch is then a one-function change. See `handoff_project-page-template.md`.
2. **Working model** — **focused, sequential Cowork instances** per workstream, seeded from the repo + these docs + project memory.
3. **First build** — **NIGHTMARE KART project page** (read-only template from `content/nightmare-kart.json`).
4. **Video** — **Vimeo embeds** (external; never in the repo).
5. **Project page scope** — full case study (content blocks) with the hero + node focal-image-swap sitting **on top of** the block content.

### Still open
- **Domain** — not yet decided. What domain should the site live on (and is it registered / where)? Needed only for the Phase 5 deploy. Until then it runs on the GitHub Pages URL.

---

## 8. Template additions — folded back from W-LP (Nexus-reconciled, 2026-06-28)
The left-panel/minimap worker also made Julia-directed template changes; the renderer (`project.html`) is the source of truth, but they're recorded here so the schema stays canonical:
- **New block type `cardgrid`** — `{ type:"cardgrid", title, aspect:"9:16"|…, images:[{src,caption,alt}] }`. Renders a spread of cards at true aspect (no crop), framed, tactile hover. The reusable pattern for any portrait/asset set (e.g. the tarot deck). A strong candidate primitive for the W2 content editor.
- **Hero is now a header**, not a card — full-width banner at the top of the content column (template-wide). **Caveat (Nexus QA):** great for raster/landscape heroes (Eyeknow, MASSIVE, GIF, 65 PORTER), but it **crops portrait/SVG heroes** — NIGHTMARE KART's elevation drawing reads badly as a banner. Fix pending (see STATUS): banner only real landscape photos; `contain` or fall back to a card for SVG/portrait.
- **Stat cards (`stats`) are `wide` by default** — full-width, 4-up, collapsing to a stacked list when narrow.
- **Legible-accent (contrast floor):** rail text + minimap markers get an ink floor so low-contrast cores (SELECTED ARCADE yellow) read on white; the **blob keeps the true edge→core palette**. Applied uniformly (Nexus decision — it's a legibility rule, not a brand-colour change).
- **Minimap framing** now fits the metaball's true content box (no edge-node clipping); labels are edge-aware (flip near the right edge).
- **Homepage:** `PAGES`/`PREVIEW` extended to all 6; the hover preview is now a clickable case-study link and caps its height against the INDEX legend. `index.html` renderer otherwise untouched (its readout/legend still render P-06 raw yellow — port the contrast floor later).
- **Eyeknow exception:** per Julia, its content JSON was edited (collaborators dropped, tarot → `cardgrid`) even though it's an "existing" page — a sanctioned, page-scoped redesign, not a rule change.
