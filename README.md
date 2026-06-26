# MODE MODE — Field map

Interactive portfolio map. Each project is plotted as a multi-node metaball field across two axes:

- X — Digital ↔ Physical
- Y — Object ↔ Spatial

A project occupies a cloud of positions rather than a single point. Overlap reads as field density, not colour mixing.

## Run

Open `index.html` in a browser. Self-contained — no build step, no dependencies.

## Modes

- Edit — author projects, palettes, nodes, and global effects (left/right panel).
- Present — portfolio view. Hover or click a project to focus it.

## Data

Projects export and import as JSON from the Edit panel (`EXPORT DATA`). The current roster is embedded as the default. Working state persists in the browser via localStorage.

## Deployment

`index.html` is the repository root; GitHub Pages serves it directly.

## Docs

- `docs/field-map_feedback_2026-06-26.md` — change log / open feedback.
