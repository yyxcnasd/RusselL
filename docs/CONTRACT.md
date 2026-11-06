# 公理板 / AXIOM BOARD — build contract

A static, offline-first web game about assembling formal proofs as if they were circuits on a
printed circuit board. No framework, no build step, no CDN. Classic scripts sharing `window.RSL`.
Must work from `file://`, a local static server, and the bilibili Toy container (mobile touch too).

## Product

- Name: **公理板 / AXIOM BOARD**. Brand line: `RUSSELL · 形式逻辑工作台`.
- One level = one assertion (a theorem schema). The player places electrical modules, wires
  assertion/formula outputs into rule inputs, and routes the final assertion into the target pad.
- Every module performs exactly one inference / transformation.
- Four primitive propositions are available at the start:
  - A1 `(P∨P)→P`
  - A2 `P→(P∨Q)`
  - A3 `(P∨Q)→(Q∨P)`
  - A4 `(Q→R)→((P∨Q)→(P∨R))`
- Definitions D1 `A→B := ¬A∨B`, D2 `A∧B := ¬(¬A∨¬B)`, D3 `A↔B := (A→B)∧(B→A)`.
- Transformation modules: substitution, detachment, definition replacement.
- Later archive-theorem modules provide results already proved in *Principia Mathematica*
  (e.g. `*2.14 ¬¬P→P`, `*3.26 (P∧Q)→P`). These are explicitly labelled as **引用定理**.
- Predicate chapter adds quantifier/predicate modules and rules, credited to PM *9–*10.
- Metamath's `pmproofs-orig.txt` is the source for the complete **PM theorem index** (193
  propositional theorems). All 193 are browsable in the game's theorem library; a curated subset
  (including `*2.14`) becomes insertable archive-theorem modules. Show PM number, name, proof
  length and source. Do not claim these were re-proved from the four primitive propositions in
  this game; label them as archived results from PM / Metamath.

## Visual direction — industrial PCB, dark solder mask

Dealt app style: `data-terminal`, seed `994157066`, with the palette redrawn to a PCB's own
materials (record this redraw in the final report). Move kept: **every selection is a 1px accent
line exactly as wide as its label**, here drawn as a copper trace. No fills on selected chrome.

Tokens (visual owner may refine but keep this world):

```css
:root{
  --ground:#0a0e0c; --board:#0e1611; --surface:#121b15; --surface-2:#16231b;
  --line:#243229; --line-strong:#35483a; --control:#4b5f50;
  --ink:#ece7d8; --muted:#9aa89b; --faint:#738273;
  --copper:#d68a4b; --copper-dim:#7b4f2f; --gold:#d3ad68;
  --positive:#78c89b; --negative:#e47866;
  --radius:4px;
  --font-ui:"IBM Plex Sans", "Microsoft YaHei", system-ui, sans-serif;
  --font-math:"STIX Two Text", "Cambria Math", "Times New Roman", serif;
  --font-code:"IBM Plex Mono", "Cascadia Mono", Consolas, monospace;
}
```

Rules: flat surfaces; 1px hairline borders; no gradients, glows, glass or drop shadows except
floating sheets/menus; square-ish 4px corners; copper is the only accent and under 3% of pixels;
green/red only for proof state; formulas set in the math face with italic variables; numbers
tabular. Silkscreen labels may be small but readable (>=11px, >=4.5:1). No emoji. No bordered
"cards with icon on top". The board is the hero: a real work surface, not a card grid.

The signature element is the **copper trace**: wires are orthogonal/45° copper paths with round
solder pads, and the active/selected wiring mode shows a thin copper line under its label.

## Files and ownership

- `index.html` — Lead only.
- `src/app.js`, `src/graph.js`, `src/levels.js`, `src/library.js` — Lead.
- `src/logic.js` — `logic-smith`; pure functions; no DOM.
- `tests/logic.test.mjs` — `logic-smith`; run with `node --test`.
- `src/styles.css`, `design/preview.html`, `assets/fonts/*` — `visual-smith`.
- `src/predicate.js`, `docs/predicate.md` — `predicate-smith`.
- Do not edit another owner's files. If an interface change is needed, message the Lead.

## `window.RSL.Logic` API (logic-smith)

AST nodes, all plain objects:

```js
{k:'atom', name:'P'}                       // propositional atom or 0-ary predicate
{k:'pred', name:'F', args:[term,...]}       // predicate application (F(x), R(x,y))
{k:'var', name:'x'}                         // individual variable term
{k:'not', a}
{k:'or', a, b}
{k:'imp', a, b}                             // defined
{k:'and', a, b}                             // defined
{k:'iff', a, b}                             // defined
{k:'all', v:'x', a}
{k:'exists', v:'x', a}
```

Exports (all synchronous):

- `parse(text)` — accepts Unicode `¬ ∨ → ∧ ↔ ∀ ∃` and ASCII `~ v -> ^ <-> forall exists`; returns AST; throws on bad input.
- `fmt(ast)` — canonical text with minimal parentheses.
- `toHTML(ast)` — escaped HTML for the formula renderer: spans `.f-var`, `.f-op`, `.f-paren`, `.f-quant`, `.f-name`. No external math library.
- `key(ast)` — stable string key after definitional expansion and alpha-renaming bound vars; used for equality.
- `eq(a,b)` — definitional + alpha equality.
- `expand(ast)` — fully expand D1–D3 into `atom/pred/not/or/all/exists`.
- `substitute(ast, atomName, replacementAst)` — replace every free occurrence of a 0-ary atom; capture-avoiding if quantified.
- `freeVars(ast)`, `atomsOf(ast)`, `predicatesOf(ast)`.
- `isAtom(ast)`.
- `replaceOptions(ast)` — list every single definitional replacement occurrence/direction, at most 24, each:
  `{id, def:'D1'|'D2'|'D3', dir:'expand'|'fold', path:[...], label, before, after, result}`.
- `applyReplacement(ast, id)` — returns result AST or throws.
- `detach(a,b)` — accepts two assertion ASTs; if one is `imp(X,Y)` and `eq(X, other)`, returns
  `{ok:true, out:Y, form:'A→B + A'}`; else `{ok:false, reason}`.
- `instantiate(schemaAst, map)` — map atom names to ASTs, capture-avoiding.
- `match(schemaAst, formulaAst)` — one-way matching (schema vars bind; formula vars rigid), returns map or null.
- `quantify(kind, v, ast)` — `all`/`exists` constructor.
- `substituteVar(ast, varName, termAst)` — capture-avoiding individual-variable substitution.
- `freshVar(ast, preferred)` — pick a variable not occurring.
- `pretty(ast)` — display text.

Predicate ASTs must be supported by all of the above. Normalization/equality must treat
`∀x F(x)` and `∀y F(y)` as equal. `key` must be deterministic.

Tests should cover: parse/fmt round trip, D1/D2/D3 replacement, substitution capture, detachment,
alpha equality, quantifier substitution, and 10 known propositional equalities.

## Graph/evaluator (Lead)

The Lead builds `src/engine.js` (not in this contract's write scope) with modules:

- `atom` — config `{name}`; output formula.
- `formula-not`, `formula-or` — synthesis.
- `axiom` — config `{axiomId}`; output schema AST.
- `theorem` — config `{theoremId}`; output archived theorem schema AST.
- `subst` — inputs `assertion`, `targetAtom`, `replacement`; output assertion.
- `detach` — inputs `a`, `b`; output assertion.
- `replace` — input `assertion`; config `{optionId}`; output assertion.
- `target` — input `proof`; no output; level completion sink.
- predicate modules: `pred`, `term`, `quant`, `all-elim`, `all-intro`, `exists-intro`, `exists-elim`, `pred-axiom`.

A module's output is recomputed from wired inputs; cycles invalid. Every node has `ref` like `U01`
and a status (`idle`, `valid`, `error`). The target is complete only when its proof input is
definitionally equal to the level assertion.

## Level data (Lead)

```js
{
  id:'RU-02', chapter:'transform', code:'RU-02', title:'代入',
  kicker:'SUBSTITUTION', target:'(¬P∨¬P)→¬P',
  brief:'把公理 1 里的 P 全部换成 ¬P。',
  hint:'先合成 ¬P，再把它和原子 P 一起接到代入模块。',
  teaches:['subst'],
  allowed:['atom','formula-not','formula-or','axiom:A1','subst','target'],
  reward:'定理模块 · *2.08',
  solution:{ nodes:[...], edges:[...] } // optional reference for tests / "看解法"
}
```

## `src/predicate.js` (predicate-smith)

Expose `window.RSL.PREDICATE` with:
`symbols`, `formation`, `axioms` (id, code, name, schema, note), `theorems`, `rules`, `levels`.
Levels follow the same shape but may set `chapter:'predicate'`. Include at least 3 playable
levels that are honest about what is primitive vs. archived theorem. Cite PM section numbers in
notes (`*9.1`, `*10.1`, etc.) — verify against public-domain PM text where possible, and mark
uncertain references as "参《数学原理》相应章节" rather than inventing numbers.

## Visual contract / class map (visual-smith)

Build `src/styles.css` against this markup (Lead will emit it). Also build `design/preview.html`
with a static shell, three module types, a target node, a wire, the side inspector, level drawer,
codex sheet and win sheet at desktop + phone.

```
.app
  .topbar
    .brand > .brand-mark, .brand-word, .brand-sub
    .level-switch > .level-chip > .level-code, .level-name, .level-caret
    .target-strip > .target-kicker, .formula, .target-state[data-state]
    .top-actions > .btn.btn-primary, .icon-btn
  .workspace
    .parts-panel
      .panel-head > h2, .panel-meta
      .parts-search
      .parts-tabs > .tab[aria-selected]
      .parts-list > .part-card > .part-icon, .part-text > .part-name, .part-desc, .part-ref
      .parts-foot
    .board-shell
      .board-toolbar > .board-label, .board-tools, .icon-btn
      .board > .board-world > .wire-layer(svg) + .node-layer
        .module[data-state][data-selected]
          .module-head > .module-ref, .module-kind, .module-status
          .module-title
          .module-formula > .formula
          .module-meta
          .port.port-in / .port.port-out (absolutely positioned)
        .wire[data-state]
        .board-hud
        .board-corner
      .board-empty
    .side-panel
      .side-head
      .side-tabs
      .side-body
  .statusbar > .status-group, .status-cell
  .overlay / .sheet / .modal
    .sheet-head, .sheet-body, .sheet-close
    .level-grid > .level-card[data-state]
    .codex-block, .axiom-row
    .win-sheet
  .toast
```

CSS needs:
- 1440/1280/1024 desktop, 768 tablet, 390 phone. On <=1100 the side panel becomes a right
  sheet; <=900 parts become a left sheet; <=640 both become full-screen bottom sheets with a
  visible tab bar; board remains usable.
- `prefers-reduced-motion` support.
- focus-visible states; touch targets >=44px on phone; no horizontal page overflow.
- formula sizes: node formula 17px math, target strip 17–20px, side inspector 20px, codex 18px.
- `.module` width 270px; head 28px; formula min-height 44px; ports 14px with 2px pad ring.
- selected module: 1px copper border + corner trace marks, no fill.
- wires: `.wire` 2px copper, round caps; `.wire[data-state="error"]` negative dashed.
- board grid: two repeating-linear-gradients are allowed here (the only gradient exception: 1px
  grid lines on the work surface), plus sparse copper pad dots.
- Use flat fills only otherwise.

## Acceptance

- `node --test tests/logic.test.mjs` passes.
- Opening `index.html` directly works, no console errors.
- At 1440 and 390: target readable, palette usable, canvas pan/zoom/drag/wire works, no overflow.
- Level 1 can be completed with axiom A1 → target; verify button shows a clear success state.
- `design/preview.html` must render the full visual language with no broken layout.
- No external network requests at runtime.
