# MODE MODE — Field map · feedback plan

_Parsed from the Jun 26 audio review. Ordered by impact. "Intent" = what was said; "Action" = the concrete build step; "Open" = needs a call before/while building._

---

## 1. Cursor magnet — the headline interaction

**Intent.** The current cursor effect reads wrong — "sucking the life out," "deflating it." The wanted behavior is the inverse: hovering should *tug* the field toward you, like a gentle magnet. "An imperceptible center-point attraction to the nearest node to the mouse." Super Mario-ish, but nowhere near 1:1 — subtle, enticing, "it's asking you to learn about the little portraits."

**Action.** In present mode, nodes whose centers fall inside the cursor radius get pulled toward the mouse. Pull strength is a product of:
- **proximity** — ramps up after the node center crosses the cursor-radius threshold (closer = stronger), and
- **node intensity** — higher-intensity nodes react more, and
- a **global strength multiplier** (user-set).

It's purely *additive* on top of the existing undulation/breathing — every other simulation factor stays the same. Two controls: **cursor radius** + **attraction strength**.

**Knock-on (desired, leave alone).** Because the nodes physically move, the field colors shift on their own — that natural shift *is* the reveal, and it's the good part. So do **not** also manually recolor on hover; explicit recoloring "might look like you're forcing it."

**Open:**
- The existing point-field cursor effect (repel / inflate / "both") is the thing that looks like deflating. Replace it with this attraction, or keep both as separate options?
- Present mode only, or also previewable in edit?

---

## 2. Unfocused dim → full range, relabel as opacity

**Intent.** "Why did it cap it? Because I said 25% less." The 70% cap is an artifact of that original "25% less" phrasing. Unfocused projects should be able to drop to ~30% or fainter — all the way down.

**Action.** Open the range to the full **0–100%**, and **relabel it "Unfocused opacity"** so the value *is* the opacity the unfocused projects fade to (lower = fainter, which reads correctly). Focused project stays full.

---

## 3. Unlabeled nodes show no center point — automatic, by rule

**Intent.** A lot of nodes exist purely for the blob's *shape and full spread*, not tied to a nameable concept ("a lot of undefinables… great in our work"). He doesn't want a dot sitting there with no label, because it makes people wonder if something's missing — "no, because I don't want people to think… is that missing?" He explicitly wants to be able to **add labels later** without forcing content now.

**Action.** Make it a **rule, not a toggle** (the label field *is* the control): in present mode a node renders its center marker **only if it has label text**. No text → **no dot and no hover response** on that node (nothing to surface, so it shouldn't fire a null hover) — but the node still shapes the blob and can still be tugged by the magnet (#1) as part of the field. Add a label later and the dot reappears automatically. "The point *is* the text." Let the eye flow from one labeled zone bleeding into the next.

---

## 4. Labels: real black text, no outline, no chip

**Intent.** "I meant black. Only black. No white outline. No outline."

**Action.** Note the current **"black" option is a black *chip* with *white* text** — so this is a change, not a confirm. Make it **actual black text**: no chip, no outline/stroke. Font/exact treatment otherwise his TBD.

**Open:** pure black with zero outline can get hard to read on darker/saturated blobs — accept, or allow a barely-there shadow as a fallback?

---

## 5. Present mode must be view-only (bug)

**Intent.** He found he could drag the label around in present mode and right-click → copy image. "That's present mode, it shouldn't be able to do that."

**Action.** Disable label/node dragging in **present** mode — editing belongs to edit mode only. (The right-click "copy image" is just native `<canvas>` behavior, not a real bug; note only — unless you actually want a proper "export PNG" button, which is a separate ask.)

---

## 6. Edge-color hover breakthrough — deferred / probably folded into #1

**Intent.** Early idea: the cursor radius could reveal the project's **edge color** (vs. the center color) breaking through where you hover — "a little bit of [edge color]… it becomes more pink where the hover."

**Action.** Likely **unnecessary once the magnet (#1) lands**, since the attraction already shifts colors naturally, and explicit recoloring risks the "forcing it" look. Hold; revisit only if the natural shift isn't enough.

---

## Build order
**#1 magnet first** (the big one), then the quick corrections #2 / #4 / #5, then #3 (unlabeled-node rule). #6 stays parked until the magnet's natural color shift is visible.

## Needs your call before I build
1. **Magnet vs. existing cursor effect** — the point-field's current repel/inflate cursor mode is the "deflating" feeling you didn't like. Replace it with the new attraction, or keep both as separate options?
2. **Magnet scope** — present only, or also previewable in edit?
3. **Black labels** — accept pure black with no outline everywhere, or allow a barely-there shadow as a fallback on dark blobs?
