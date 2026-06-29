# Handoff — W-LP · Project-page LEFT PANEL + minimap

> ✅ **Delivered + reconciled** — historical record. All six pages + the minimap shipped; the rail was later rebuilt into the animated ambient field (mock #2). See `STATUS.md` / `ROADMAP.md`.

For a dedicated, focused Cowork worker. You report to the **Nexus** (the standing coordinator instance); Julia commits. **Scope discipline is the whole point of this workstream** — read the boundaries carefully.

## Mission
Make the project-page **left rail** — and especially its **minimap** — functioning, well-designed, and UI-perfected, **consistently across every project page**. The minimap must be a *faithful translation of the homepage field map*.

## Read first (in order)
- `docs/ORCHESTRATION.md`, `docs/STATUS.md`, `docs/ROADMAP.md` — where the project is.
- This file.
- `project.html` — the project-page renderer. The rail markup/CSS and `drawMinimap()` / `computeMetaball()` / `bindMinimap()` / `updatePortrait()` live here. **This is your main surface.**
- `index.html` — the homepage field map. Its metaball renderer is the **source of truth** you must faithfully mirror. **Reuse it read-only — do NOT refactor `index.html`.**
- `content/*.json` — node geometry + colours per project.

## In scope (only this)
1. The project-page **rail**: markup + CSS + the constellation/minimap/portrait JS in `project.html`.
2. **Coverage — create the two missing pages** so every interactive roster project has one. Build from Julia's sources, **matching the established content pattern of the existing pages** (real copy/credits, Squarespace images by URL, roster node geometry + colours, the existing block types). Don't over-invest in content — the template is the point; the existing four are the model.
   - **MASSIVE — P-02** → https://mattfryed.com/massive
   - **SELECTED ARCADE — P-06** → a mixture of https://mattfryed.com/hoverburger + https://mattfryed.com/arcade-games
   - Wire both into the homepage `PAGES` map and the prev/next chain.

## Explicitly OUT of scope
- **Do NOT touch the main content area** or the written content/images/blocks of the four existing pages (NIGHTMARE KART, GIF, EYEKNOW MANOR, 65 PORTER). Those are locked and good.
- Do NOT refactor `index.html`'s renderer or homepage behavior.
- Do NOT change the frozen data schema or the `loadProject()` boundary, media-by-URL, or the iOS light workaround.

## The bar — left panel, UI-perfected, per page
1. **Faithful minimap.** Reads as a true miniature of the homepage blob for that project — same two-field metaball math/look, same edge→core palette, same soft falloff. **Visually QA each project's minimap side-by-side against the homepage** blob for that project; it should be recognizably the same shape + colour.
2. **Hover states.** Whole node **and its label** hoverable; hover highlights the node + reveals the portrait; minimap-hover and nav-row-hover stay in sync; active-on-scroll tracking. Crisp, no flicker, correct cursor.
3. **Scalability.** Works for any node count + constellation shape — GIF (2 labelled nodes) → EYEKNOW MANOR (12+). Minimap is a consistent fixed box that contain-fits every shape without distortion; the nav flex-fits so the **rail never scrolls** (verify 0px overflow). Test the extremes.
4. **Visuals.** DPR-crisp canvas, clean anti-aliasing, legible labels, correct accent, the **logo lockup consistent with the homepage** (one size/clear-space/colour), back-arrow + alignment per the current spec (short ← at the corner-mark column, on the P-04 line, 18px gap; logo/code/title on one content edge). Project pages are light-only.
5. **Consistency.** One rail spec and one logo treatment across all pages and the homepage.

## Constraints / invariants
Keep `loadProject()` as the single data boundary; media by URL; BB Strata type; homepage metaball mirrored read-only. Test **headless** (Playwright in the sandbox; run node with `LD_LIBRARY_PATH=$HOME/xdlibs`). Zero console errors. Measure JS self-time, not headless FPS.

## Loop back & review — report to the Nexus in EXACTLY this format
```
## W-LP report — <YYYY-MM-DD>
### Done
- <changes, scoped to rail/minimap + the two new scaffold pages>
### Coverage
- Pages now live: P-01 P-02 P-03 P-04 P-05 P-06  (✓ each renders, wired in PAGES + prev/next)
### Per-project QA (left panel + minimap)
| Project | labelled nodes | rail fits (0px) | minimap faithful to homepage | hover OK | console |
|---------|---------------|-----------------|------------------------------|----------|---------|
| P-01 …  | …             | ✓/✗             | ✓/✗ + note                   | ✓/✗      | 0 / n   |
### Visual QA
- <notes + headless screenshots captured, especially minimap-vs-homepage comparisons per project>
### Invariants
- loadProject boundary intact ✓ · index.html untouched ✓ · existing-4 content unchanged ✓
### Open questions / decisions for the Nexus
- <anything needing a call — surface, don't guess>
### To commit (for Julia)
- <exact git add/commit/push commands, only the files you touched>
```
Build → headless-test → post that report back to the Nexus. When unsure about scope or schema, **stop and ask the Nexus** rather than guessing.
