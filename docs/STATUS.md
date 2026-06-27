# MODE MODE — status (fact-checked 2026-06-27)

Provenance is labeled. **Verified** = I read it from the live file/git or tested it. **Known** = from your own files/mockup. **Decided** = your explicit choice. **Placeholder** = I generated it; not ground truth. **Unconfirmed** = needs you.

## Repo / live
- **Verified:** remote `git@github.com:jalulia/modemode.git`, branch `main`, pushed through commit `36553ed` (`origin/main` == `HEAD`). Tracked files: `index.html`, `README.md`, `.gitignore`, `modemode-withbgnodes.txt`, `content/nightmare-kart.json`, `docs/` (architecture, handoff, feedback, this file, `mockups/mode-mode.pdf`), `assets/nightmare-kart/`.
- **Unconfirmed:** GitHub **Pages** enabled / serving, and the public URL. (Can't see GitHub from here — confirm in repo Settings → Pages.)

## Homepage build (`index.html`)
**Verified** (headless tests, zero console errors; several you've also confirmed live):
- 7-project roster incl. the BG layer, `color-burn`, your tuned fx baked as defaults — sourced from your `modemode-withbgnodes.txt` export.
- Node animation (undulation / asymmetric breathing) **on by default**.
- Cursor magnet with asymmetric **snap-back ease** (you confirmed the feel).
- Effect panel + blend **persist** to localStorage (save/load round-trip verified).
- Present mode: unfocused-opacity full range, **black labels no outline**, **view-only** (no label drag), unlabeled nodes show no dot.
- Drag-reorder projects, GLOBAL-tab de-focus, metaball curvature, hover fade.

## Project pages (Phase 0 only — nothing built yet)
- **Decided:** data-in-repo CMS now, engineered to port to **Supabase** later (my recommendation); **focused Cowork instances** per workstream; **NIGHTMARE KART** page first; **Vimeo** for video.
- **Known (from mockup `mode-mode.pdf`):** the 3-zone layout; block types (text, column, image+paragraph, image, media); the rules (homepage dictates sections, node→section only if it has content, accent = core-node colour, anchored left side-nav, drag-reorder + hide/show per page, prev/next); collaborators, PROPERTIES copy, MATERIAL-CONDITIONS labels.
- **Known (from live roster):** NIGHTMARE KART = `P-04`, accent `[196,0,33]`, 5 nodes with real labels + geometry.
- **Placeholder (in `content/nightmare-kart.json`, flagged in its `_note`):** all non-mockup body copy, captions, image filenames, the Vimeo id, prev/next order, and which nodes have content. Matt supplies the real values. **No page or renderer exists yet** — only the scaffold data + the build handoff.

## Corrected this pass
- Removed `normalo.studio` everywhere — it was a garbled voice-memo transcription, never a confirmed domain. Production domain is **undecided**.
- Stripped invented NIGHTMARE KART copy → explicit placeholders.

## Open / needs you
1. Confirm Pages is enabled + the URL.
2. Domain: which one, and is it registered?
3. Matt: real copy + images per node in `content/nightmare-kart.json`.
