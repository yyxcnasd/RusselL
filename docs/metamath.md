# Metamath / PM theorem archive (`src/theorems.js`)

The archive index behind the 公理板 theorem library and the insertable **引用定理** modules.

## Source

- URL: <https://us.metamath.org/mmsolitaire/pmproofs-orig.txt>
- Retrieved: **2026-11-06** (`Invoke-WebRequest`), stored verbatim at
  [`assets/data/pm-proofs.md`](../assets/data/pm-proofs.md).
- File facts: 40,296 bytes, 951 lines, SHA-256
  `7B165F68427FF19ABAA6D34115D99F1222640835DA6AF12E3D493EF675BBD5E4`.
- Deliberately the `-orig` file: the Metamath site also maintains a newer `pmproofs.txt`, and its
  Solitaire page notes that shorter proofs were later found for many of the 193 theorems (67+).
  The build contract specifies `pmproofs-orig.txt`, so every `proof` / `steps` value here follows
  that frozen file; switching sources would change those fields for many entries.
- Author: **Norman Megill**, Metamath Solitaire proof collection (`pmproofs-orig.txt`). The file
  header describes these as "the shortest direct proofs I could find" for all 193
  propositional-calculus theorems of Whitehead & Russell's *Principia Mathematica*.
- Licensing / attribution: *Principia Mathematica* (1910–1913) is public domain; the Metamath
  Solitaire collection is freely redistributable Metamath source material. The original attribution
  is kept in the data file and in the header of `src/theorems.js`. Do not strip it.

## File format

Lines 1–45 are the source file's own prose preamble (proof-notation explanation, history of
condensed detachment). The first theorem starts on line 47. Entries are separated by blank lines:

```
((P v (Q v R)) -> (Q v (P v R))); ! *1.5 Assoc
DD2D1DD22D11DD2D112; ! 19 steps
```

- A **formula line** ends with the marker `; ! *<section>.<number> <Name>`; the name is optional.
- The next line is a **proof-code line**, ending with `; ! <N> steps` (`1 step` for a one-step proof).
- Both formulas and proof codes may wrap over several physical lines (formula wrap happens only in
  `*4.87`, over two lines; long proof codes wrap routinely).
- Proof codes use **condensed detachment** (Meredith notation): `1` = ax-1, `2` = ax-2,
  `3` = ax-3, `D` = ax-mp. The applet enters a code in reverse order; the file stores the canonical
  forward order.
- `steps` is the length of the proof code, i.e. the number of axiom/detachment steps.

## Parser notes

- Preamble is ignored; entries are located by the `; ! *<code>` marker, then the formula block is
  collected backwards to the previous blank/step-marker line and the proof block forwards to the
  `; ! <N> steps` marker.
- Continuation lines are concatenated with no separator; whitespace runs are then collapsed to a
  single space. This is safe for every entry (checked: all 193 proofs satisfy `steps === proof.length`
  and `/^[123D]+$/`).
- Conversion to Unicode, longest tokens first: `~` → `¬`, `v` → `∨`, `->` → `→`, `^` → `∧`,
  `<->` → `↔`. `v` is converted only as a standalone token (`(?<![A-Za-z])v(?![A-Za-z])`); variables
  are only `P/Q/R/S`, so this is unambiguous.
- Round-trip check (Unicode → ASCII == original `formulaAscii`) passes for all 193 entries.
- Spacing follows the source, so double negation is rendered `¬ ¬ P` rather than `¬¬P`.
- Output: `src/theorems.js` is a classic script (`window.RSL`), no build step, no runtime fetch.

### Entry shape

```js
{
  code: '*2.14',                      // PM theorem number, unique
  name: '',                           // PM short name when the source gives one (21 of 193)
  formula: '(¬ ¬ P → P)',             // Unicode statement
  formulaText: '(¬ ¬ P → P)',         // alias of formula (display text)
  formulaAscii: '(~ ~ P -> P)',       // original source notation
  proof: 'DD2DD2D13DD2D1311',         // condensed-detachment proof code
  steps: 17,                          // proof-code length
  source: 'Metamath Solitaire · pmproofs-orig.txt'
}
```

Helpers: `window.RSL.getTheorem(code)` accepts `*2.14`, `2.14`, or `*2.1` and returns the entry or
`null`. `window.RSL.THEOREM_META` carries counts, section distribution, total steps, longest/shortest
proofs, notable entries, attribution and the caveat string.

## Count and coverage

- **193 entries**, matching both the source header ("all 193 theorems of propositional calculus")
  and the build contract. No duplicates; first `*1.2`, last `*5.75`.
- Section distribution: `*1` = 5, `*2` = 67, `*3` = 25, `*4` = 58, `*5` = 38.
- 21 entries carry a PM short name (`Taut`, `Add`, `Assoc`, `Sum`, `Simp`, `Comm`, `Syll`,
  `Transp`, `Id`, `Exp`, `Imp`, `Ass`, `Comp`, `Fact`); 172 are unnamed in the source.
- 26,895 proof-code steps in total. Longest: `*4.39` (913 steps). Shortest: six one-step axiom
  instances — `*1.3`, `*2.02`, `*2.07`, `*2.17`, `*2.76`, `*2.77`.
- Gaps in PM numbering (e.g. no `*2.66`) are gaps in the source/PM, not parser losses.

### Notable entries

| Code | Name | Unicode statement | Steps |
| --- | --- | --- | --- |
| `*2.08` | Id | `(P → P)` | 5 |
| `*2.12` | — | `(P → ¬ ¬ P)` | 19 |
| `*2.14` | — | `(¬ ¬ P → P)` | 17 |
| `*3.26` | Simp | `((P ∧ Q) → P)` | 33 |
| `*4.51` | — | `(¬ (P ∧ Q) ↔ (¬ P ∨ ¬ Q))` | 127 |

Also worth knowing: `*4.87` is the only wrapped formula and is itself a composite conjunction of
three equivalences (531 steps); `*4.39` is the longest proof (913 steps).

## Formula conversion caveat

The source preamble says the recorded statements have "all abbreviations expanded", but many
recorded statements still use the surface connectives `→`, `∧` and `↔` (for example `*3.26`,
`*4.6`, `*4.51`). Treat `formula` as **the statement as recorded in the archive**, not as a
definition-expanded proof term. For structural equality in the game, feed the string through
`RSL.Logic.parse(...)` and compare with `RSL.Logic.key(...)` / `RSL.Logic.eq(...)` rather than
comparing display strings. `formulaAscii` preserves the source's exact token sequence (the two
physically wrapped `*4.87` lines are joined and their indentation collapsed to one space).

## Caveat: what these theorems are (and are not)

**These are PM theorem statements and proofs as recorded in Metamath's Solitaire applet, derived
there from a different axiom basis** — Metamath's `ax-1`, `ax-2`, `ax-3` and `ax-mp`, with
definitional abbreviations available — **not re-proved from 公理板's four primitive propositions
A1–A4.** In 公理板 they are **archive / 引用定理 (quoted-theorem) modules**: they can be inserted on
the board as already-established results, always labelled with their PM number, proof length and
source. They must never be presented as derivations produced inside this game, and the game must not
claim to reprove *Principia Mathematica* *1–*5.

## Recommended archive subset (`window.RSL.ARCHIVE_SET`)

16 codes chosen for playability, each with a one-line Chinese gloss in the data file:

- Identity: `*2.08` (`P → P`).
- Double negation: `*2.12` (`P → ¬¬P`), `*2.14` (`¬¬P → P`).
- Conjunction: `*3.26`, `*3.27` (elimination, both directions), `*3.2` (introduction),
  `*4.3` (commutation, biconditional).
- Distribution: `*4.4` (∧ over ∨), `*4.41` (∨ over ∧) — both biconditionals.
- De Morgan: `*4.51`, `*4.56`.
- Implication bridge and laws: `*4.6` (definitional bridge), `*4.1` (contraposition),
  `*2.06` (syllogism), `*2.04` (premise commutation).
- Disjunction: `*4.31` (commutation, biconditional).

Direction matters when wiring modules: `*3.26`, `*3.27`, `*3.2`, `*2.06`, `*2.04` are implications
(one-way), the rest are biconditionals (rewrite in either direction).

## Metamath Atlas (`src/metamath.js`)

Codex data for the wider Metamath ecosystem, exposed as
`window.RSL.METAMATH = {families, highlightTheorems, links, proofTape, tapeFor, getFamily, getHighlight, tokenLegend, caveat}`
(with a `window.RSL.proofTape` convenience alias). Static classic script: **no runtime network, no
proof execution** — URLs are display data, and the tape helper only labels characters.

### Families (URLs re-verified 2026-11-06 against `us.metamath.org`)

| id | title | badge / count | URL | verification |
| --- | --- | --- | --- | --- |
| `mpe` | Metamath Proof Explorer | 40,000+ 定理 | <https://us.metamath.org/mpeuni/mmset.html> | homepage says "Over 40,000 proofs"; theorem list <https://us.metamath.org/mpeuni/mmtheorems.html> |
| `ile` | Intuitionistic Logic Explorer | 构造主义 | <https://us.metamath.org/ileuni/mmil.html> | homepage description; no numeric count claimed |
| `nfe` | New Foundations Explorer | NF 集合论 | <https://us.metamath.org/nfeuni/mmnf.html> | homepage description (Quine's NF); no numeric count claimed |
| `hol` | Higher-Order Logic Explorer | HOL | <https://us.metamath.org/holuni/mmhol.html> | homepage description (HOL/simple type theory); no numeric count claimed |
| `solitaire` | Metamath Solitaire | 193 条定理 | <https://us.metamath.org/mmsolitaire/mms.html> | page names the 193 PM theorems; archive count 193 verified locally |
| `other` | Other Topics / Milpgame | 工具与游戏 | <https://us.metamath.org/other.html> | page links Milpgame and XPuzzle |

Naming note: the task brief said "XProof", but the Metamath "Other Topics" page and the app link
name the product **XPuzzle** (Android app by Filip Cernatescu). No "XProof" entry exists on the
page, so the Atlas uses XPuzzle. Its own site `www.xpuzzle.co` did **not resolve** on 2026-11-06
while control domains did, so the Atlas has no direct XPuzzle link; instead it points at the live
`other.html#mmrelated` anchor and records the outage.

### Highlight theorems (6–10 records, same data as the archive)

| Code | Name | Formula | Steps | Note |
| --- | --- | --- | --- | --- |
| `*1.3` | Add | `(Q → (P ∨ Q))` | 1 | one-step axiom instance |
| `*2.1` | — | `(¬ P ∨ P)` | 17 | PM form of excluded middle |
| `*2.08` | Id | `(P → P)` | 5 | identity |
| `*2.12` | — | `(P → ¬ ¬ P)` | 19 | double-negation introduction |
| `*2.14` | — | `(¬ ¬ P → P)` | 17 | double-negation elimination |
| `*3.26` | Simp | `((P ∧ Q) → P)` | 33 | conjunction simplification |
| `*4.6` | — | `((P → Q) ↔ (¬ P ∨ Q))` | 81 | definition-of-implication bridge |
| `*4.51` | — | `(¬ (P ∧ Q) ↔ (¬ P ∨ ¬ Q))` | 127 | De Morgan |
| `*4.39` | — | `(((P ↔ R) ∧ (Q ↔ S)) → ((P ∨ Q) ↔ (R ∨ S)))` | 913 | longest proof in the archive |
| `*4.87` | — | composite of three equivalences | 531 | only physically wrapped formula |

The Atlas records are cross-checked against `window.RSL.THEOREMS` (code, name, formula and steps
must match exactly) — see the verification command below.

### Proof tape

`window.RSL.METAMATH.proofTape(proof)` maps a condensed-detachment string to display tokens:
`1` → `ax-1`, `2` → `ax-2`, `3` → `ax-3`, `D` → `ax-mp`. Each token is
`{token, index, kind, label}` with a 0-based `index` and `kind` either `'axiom'` or `'detach'`.
It throws on an unknown character (so bad archive data surfaces immediately) and returns `[]` for
an empty string. `tapeFor(code)` returns `{code, formula, steps, tape}` for an archived theorem, or
`null` for an unknown code. This is a **tokenizer only** — it does not replay, verify or search
proofs; any future replay engine belongs to the game's own evaluator, not to this data file.

### Links

`window.RSL.METAMATH.links` holds 8 entries: the Metamath home page, Other Topics, Metamath
Solitaire, the `pmproofs-orig.txt` source, the newer `pmproofs.txt`, the MPE theorem list, Metamath
100, and Milpgame. All `us.metamath.org` URLs returned HTTP 200 on 2026-11-06 (HEAD check); the
XPuzzle entry points at `other.html#mmrelated` because `www.xpuzzle.co` no longer resolved. None are
fetched at runtime.

## Verification

```powershell
node --check src/theorems.js
node --check src/metamath.js
node -e "globalThis.window={};eval(require('fs').readFileSync('src/theorems.js','utf8'));const T=window.RSL.THEOREMS;console.log(T.length, T.every(t=>t.steps===t.proof.length), window.RSL.ARCHIVE_SET.length)"
# => 193 true 16
node -e "globalThis.window={};eval(require('fs').readFileSync('src/theorems.js','utf8'));eval(require('fs').readFileSync('src/metamath.js','utf8'));const T=window.RSL.THEOREMS,M=window.RSL.METAMATH;console.log(M.families.length, M.links.length, M.highlightTheorems.length, M.highlightTheorems.every(h=>{const t=T.find(x=>x.code===h.code);return t&&t.formula===h.formula&&t.steps===h.steps&&t.name===h.name;}), M.proofTape('DD211').length)"
# => 6 8 10 true 5
```

Re-download (only if the archive must be refreshed):

```powershell
Invoke-WebRequest -Uri 'https://us.metamath.org/mmsolitaire/pmproofs-orig.txt' -OutFile 'assets/data/pm-proofs.md' -UseBasicParsing
```

