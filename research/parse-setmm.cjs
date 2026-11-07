#!/usr/bin/env node
'use strict';
/*
 * Parser for assets/data/set.mm (Metamath database, metamath/set.mm develop).
 * Extracts axioms / definitions / theorems of the logic (set-pred.mm),
 * class / set theory (set-class.mm, set-zf.mm, set-zfc.mm) regions,
 * converts formulas to a Unicode rendering and decodes compressed proofs.
 *
 * Usage:
 *   node research/parse-setmm.cjs            # stats only
 *   node research/parse-setmm.cjs --json     # write research/setmm-data.json + report
 *   node research/parse-setmm.cjs --all-json # write full catalogue (every $a/$p)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'assets', 'data', 'set.mm');
const OUT_JSON = path.join(__dirname, 'setmm-data.json');

const WANTED_MODULES = new Set(['set-pred.mm', 'set-class.mm', 'set-zf.mm', 'set-zfc.mm']);

const isSpace = (c) => c === ' ' || c === '\t' || c === '\n' || c === '\r';

// ---------------------------------------------------------------------------
// Lexer: yields {t:'comment'|'token', text, line}
// Metamath comments are $( ... $) and are not nested (set.mm follows this).
// ---------------------------------------------------------------------------
function* lex(src) {
  let i = 0, line = 1;
  const n = src.length;
  while (i < n) {
    const ch = src[i];
    if (ch === '$' && src[i + 1] === '(') {
      let j = src.indexOf('$)', i + 2);
      if (j < 0) j = n;
      const text = src.slice(i + 2, j);
      yield { t: 'comment', text, line };
      for (let k = i; k < j + 2; k++) if (src.charCodeAt(k) === 10) line++;
      i = j + 2;
    } else if (ch === '\n') {
      line++; i++;
    } else if (isSpace(ch)) {
      i++;
    } else {
      let j = i;
      while (j < n && !isSpace(src[j])) j++;
      yield { t: 'token', text: src.slice(i, j), line };
      i = j;
    }
  }
}

// ---------------------------------------------------------------------------
// Header detection (set.mm uses # chapter, #*# section, = subsection, -= subsub)
// ---------------------------------------------------------------------------
const HEADER_RES = [
  { level: 1, re: /^#{10,}$/ },
  { level: 2, re: /^(?:#\*){10,}#?$/ },
  { level: 3, re: /^={10,}$/ },
  { level: 4, re: /^[-=]{20,}$/ },
];

function parseHeader(text) {
  const lines = text.split('\n').map((s) => s.trim());
  let level = 0;
  const marks = [];
  for (let k = 0; k < lines.length; k++) {
    const l = lines[k];
    if (!l) continue;
    for (const h of HEADER_RES) {
      if (h.re.test(l)) {
        if (!level) level = h.level;
        // only accept marker lines of the same family; '-' runs are level 4
        if (h.level === level) marks.push(k);
        break;
      }
    }
  }
  if (!level || marks.length < 2) return null;
  const title = lines.slice(marks[0] + 1, marks[1]).filter(Boolean).join(' ').trim();
  if (!title) return null;
  return { level, title };
}

// ---------------------------------------------------------------------------
// Formula rendering
// ---------------------------------------------------------------------------
// Only real Metamath tokens are mapped.  NB: a bare `v` is a *setvar* in
// set.mm (e.g. ax-ac uses `v`), so it must NOT be mapped to ∨.
const UNI = new Map([
  ['-.', '¬'], ['->', '→'], ['<->', '↔'], ['/\\', '∧'], ['\\/', '∨'],
  ['A.', '∀'], ['E.', '∃'], ['e.', '∈'], ['|-', '⊢'], ['=/=', '≠'],
  ['E!', '∃!'], ['E*', '∃*'], ['iota', 'ι'], ['_om', 'ω'],
  ['~P', '𝒫'], ['i^i', '∩'], ['u.', '∪'], ['U.', '⋃'], ['|^|', '⋂'],
  ['U_', '⋃_'], ['|^|_', '⋂_'], ['X.', '×'], ['_V', 'V'], ['(/)', '∅'],
  ['C_', '⊆'], ['C.', '⊂'], ['<.', '⟨'], ['>.', '⟩'], ['_|_', '⊥'],
  ['T.', '⊤'], ['F.', '⊥'], ['suc', 'suc'], ['On', 'On'],
]);

function toUnicode(tokens) {
  return tokens.map((t) => (UNI.has(t) ? UNI.get(t) : t)).join(' ');
}

// ---------------------------------------------------------------------------
// Comment first sentence
// ---------------------------------------------------------------------------
function firstSentence(text) {
  let s = text.replace(/\r/g, ' ').replace(/\s+/g, ' ').trim();
  // drop leading markup-only comment ($j etc.)
  if (s.startsWith('$j')) return '';
  // Cut at first sentence stop followed by space+capital/backtick/~, avoiding
  // common abbreviations (e.g., i.e., cf., vs., etc.).
  let cut = -1;
  const re = /[.!?](?=\s)/g;
  let m;
  while ((m = re.exec(s))) {
    const i = m.index;
    const before = s.slice(Math.max(0, i - 6), i + 1);
    if (/\b(e\.g|i\.e|cf|vs|etc|p|pp|no|fig|Thm|Sec|Ch|vol)\.$/i.test(before)) continue;
    cut = i + 1;
    break;
  }
  if (cut > 0) s = s.slice(0, cut);
  if (s.length > 400) s = s.slice(0, 397) + '...';
  return s;
}

// ---------------------------------------------------------------------------
// Compressed proof decoding
// ---------------------------------------------------------------------------
// index space: 0..H-1 mandatory hypotheses, H..H+L-1 labels, H+L.. stack (Z)
function decodeCompressedProof(proofTokens, mandatory, arityOf, hypLabelSet) {
  const errors = [];
  let i = 0;
  const labels = [];
  if (proofTokens[0] === '(') {
    i = 1;
    while (i < proofTokens.length && proofTokens[i] !== ')') labels.push(proofTokens[i++]);
    if (i >= proofTokens.length) errors.push('label list not closed');
    i++; // skip ')'
  }
  const enc = proofTokens.slice(i).join('');
  const H = mandatory.length;
  const L = labels.length;
  const base = H + L;
  const refs = [];
  const saved = [];
  let last = null; // entry produced by the previous proof step
  let steps = 0;
  let j = 0;

  while (j < enc.length) {
    const c = enc[j];
    if (c === 'Z') {
      if (!last) errors.push('Z with no previous step');
      saved.push(last);
      j++;
      continue;
    }
    if (c < 'A' || c > 'Y') {
      errors.push(`bad proof char ${JSON.stringify(c)} at ${j}`);
      break;
    }
    let acc = 0;
    while (j < enc.length && enc[j] >= 'U' && enc[j] <= 'Y') {
      acc = acc * 5 + (enc.charCodeAt(j) - 85 + 1); // U..Y -> 1..5
      j++;
    }
    if (j >= enc.length) { errors.push('truncated number'); break; }
    const d = enc.charCodeAt(j) - 65; // A..T -> 0..19
    if (d < 0 || d > 19) { errors.push(`bad digit ${enc[j]} at ${j}`); break; }
    j++;
    const num = acc * 20 + d;
    steps++;
    if (num < H) {
      last = { label: mandatory[num].label, kind: 'hyp' };
    } else if (num < base) {
      const lb = labels[num - H];
      last = { label: lb, kind: 'assert' };
      refs.push(lb);
    } else {
      const k = num - base;
      if (k < 0 || k >= saved.length) {
        errors.push(`stack ref out of range ${num} (saved=${saved.length})`);
        break;
      }
      last = saved[k];
    }
  }

  // Stack-height validation (needs only arities, no substitution replay).
  let h = 0;
  const saved2 = [];
  let lastEntry = null;
  const errs2 = [];
  let step2 = 0;
  j = 0;
  while (j < enc.length && errs2.length === 0) {
    const c = enc[j];
    if (c === 'Z') {
      saved2.push(lastEntry);
      j++;
      continue;
    }
    let acc = 0;
    while (j < enc.length && enc[j] >= 'U' && enc[j] <= 'Y') {
      acc = acc * 5 + (enc.charCodeAt(j) - 85 + 1);
      j++;
    }
    if (j >= enc.length) { errs2.push('truncated number'); break; }
    const num = acc * 20 + (enc.charCodeAt(j) - 65);
    j++;
    step2++;
    if (num < H) {
      h++; lastEntry = { label: mandatory[num].label, kind: 'hyp' };
    } else if (num < base) {
      const lb = labels[num - H];
      const ar = arityOf.get(lb);
      if (ar === undefined) {
        if (hypLabelSet && hypLabelSet.has(lb)) {
          h++;
          lastEntry = { label: lb, kind: 'hyp' };
        } else {
          errs2.push(`unknown label ${lb}`);
          break;
        }
      } else {
        if (h < ar) { errs2.push(`stack underflow applying ${lb} (h=${h}, arity=${ar})`); break; }
        h = h - ar + 1;
        lastEntry = { label: lb, kind: 'assert' };
      }
    } else {
      const k = num - base;
      if (k < 0 || k >= saved2.length) { errs2.push(`stack ref out of range ${num}`); break; }
      lastEntry = saved2[k];
      h++;
    }
  }
  if (errs2.length === 0 && h !== 1) errs2.push(`final stack height ${h} != 1`);
  if (errs2.length) errors.push(...errs2);

  return { ok: errors.length === 0, errors, labels, refs, proofLength: steps, encLength: enc.length };
}

// ---------------------------------------------------------------------------
// Main parse
// ---------------------------------------------------------------------------
function parseDatabase(src) {
  const statements = [];
  const arityOf = new Map();
  const hypLabelSet = new Set();
  const scopes = [{ hyps: [], dvs: [] }];
  let module = null;
  const headerPath = []; // index 1..4
  let pendingComments = [];
  let buf = [];

  const newEntry = (label, kind, math, line) => {
    const allHyps = [];
    for (const fr of scopes) for (const h of fr.hyps) allHyps.push(h);
    const mandatory = mandatoryHyps(allHyps, math);
    const dvs = [];
    for (const fr of scopes) for (const p of fr.dvs) dvs.push(p);
    const entry = {
      label, kind, math, line, module,
      chapter: headerPath[1] || '',
      section: headerPath[2] || headerPath[1] || '',
      subsection: headerPath[3] || headerPath[4] || '',
      mandatory, allHyps, dv: dvs,
      comment: '',
    };
    return entry;
  };

  for (const item of lex(src)) {
    if (item.t === 'comment') {
      const trimmed = item.text.trim();
      const mm = trimmed.match(/^(Begin|End|Skip)\s+\$\[\s*([^\s\]]+)\s*\$\]$/);
      if (mm) {
        if (mm[1] === 'Begin') module = mm[2];
        else if (mm[1] === 'End') module = null;
        pendingComments = [];
        continue;
      }
      const hdr = parseHeader(item.text);
      if (hdr) {
        headerPath[hdr.level] = hdr.title;
        for (let l = hdr.level + 1; l <= 4; l++) delete headerPath[l];
        pendingComments = [];
        continue;
      }
      pendingComments.push(item.text);
      continue;
    }
    // token
    const t = item.text;
    if (t === '${') {
      scopes.push({ hyps: [], dvs: [] });
      continue;
    }
    if (t === '$}') {
      if (scopes.length > 1) scopes.pop();
      continue;
    }
    buf.push({ text: t, line: item.line });
    if (t === '$.') {
      const st = buf;
      buf = [];
      processStatement(st.slice(0, -1));
    }
  }

  function processStatement(st) {
    if (!st.length) return;
    const head = st[0].text;
    if (head === '$c' || head === '$v' || head === '$j') {
      pendingComments = [];
      return;
    }
    if (head === '$d') {
      const vars = st.slice(1).map((x) => x.text);
      const fr = scopes[scopes.length - 1];
      for (let a = 0; a < vars.length; a++)
        for (let b = a + 1; b < vars.length; b++) fr.dvs.push([vars[a], vars[b]]);
      pendingComments = [];
      return;
    }
    const label = st[0].text;
    const kw = st[1] && st[1].text;
    const desc = pendingComments.length ? pendingComments[pendingComments.length - 1] : '';
    pendingComments = [];

    if (kw === '$f' || kw === '$e') {
      const math = st.slice(2).map((x) => x.text);
      const hyp = { label, kind: kw, math, var: math[math.length - 1], line: st[0].line };
      scopes[scopes.length - 1].hyps.push(hyp);
      hypLabelSet.add(label);
      return;
    }

    if (kw === '$a' || kw === '$p') {
      let eq = -1;
      for (let k = 2; k < st.length; k++) if (st[k].text === '$=') { eq = k; break; }
      const math = (eq >= 0 ? st.slice(2, eq) : st.slice(2)).map((x) => x.text);
      const entry = newEntry(label, kw, math, st[0].line);
      entry.comment = firstSentence(desc);
      if (kw === '$p' && eq >= 0) {
        entry.proofTokens = st.slice(eq + 1).map((x) => x.text);
      }
      statements.push(entry);
      arityOf.set(label, entry.mandatory.length);
      return;
    }
    // unknown statement type: keep for diagnostics
    statements.push({ label, kind: kw || '?', math: st.slice(2).map((x) => x.text), line: st[0].line, module, error: 'unknown kw' });
  }

  return { statements, arityOf, hypLabelSet, headerPath };
}

function mandatoryHyps(allHyps, conclusion) {
  const vars = new Set(conclusion);
  for (const h of allHyps) if (h.kind === '$e') for (const tk of h.math) vars.add(tk);
  return allHyps.filter((h) => h.kind === '$e' || vars.has(h.var));
}

// ---------------------------------------------------------------------------
// Stats / targets
// ---------------------------------------------------------------------------
const TARGETS = [
  'ax-1', 'ax-2', 'ax-3', 'ax-mp', 'df-or', 'df-an', 'df-bi', 'dfbi2', 'df-ex',
  'id', 'pm2.27', 'con1', 'imim1', 'pm2.04', 'pm2.43', 'con2', 'pm2.18', '2a1', 'ax1w',
  'ax-gen', 'ax-4', 'ax-5', 'ax-10', 'ax-11', 'ax-12', 'ax-13',
  'ax-6', 'ax-7', 'ax-8', 'ax-9',
  'equid', 'equcomi', 'equcom', 'equtr', 'equtr2', 'equequ1', 'eqid',
  'ax-ext', 'ax-rep', 'ax-pow', 'ax-un', 'ax-reg', 'ax-inf', 'ax-ac',
  'df-ss', 'df-cleq', 'df-clel',
];

function main() {
  const src = fs.readFileSync(FILE, 'utf8');
  const t0 = Date.now();
  const { statements, arityOf, hypLabelSet } = parseDatabase(src);
  const ms = Date.now() - t0;

  const byModule = new Map();
  for (const s of statements) {
    const k = s.module || '(none)';
    if (!byModule.has(k)) byModule.set(k, { a: 0, p: 0, f: 0, e: 0, other: 0 });
    const c = byModule.get(k);
    if (s.kind === '$a') c.a++; else if (s.kind === '$p') c.p++; else c.other++;
  }
  console.log(`parse: ${ms} ms, statements=${statements.length}, labels(arity)=${arityOf.size}`);
  console.log('by module:', JSON.stringify(Object.fromEntries([...byModule].filter(([k]) => WANTED_MODULES.has(k) || k === '(none)'))));

  const inWanted = statements.filter((s) => WANTED_MODULES.has(s.module));
  const aList = inWanted.filter((s) => s.kind === '$a');
  const pList = inWanted.filter((s) => s.kind === '$p');
  console.log(`wanted modules: $a=${aList.length}, $p=${pList.length}`);
  const assertForm = pList.filter((s) => s.mandatory.every((h) => h.kind !== '$e'));
  console.log(`assertion-form $p in wanted: ${assertForm.length}`);
  for (const m of WANTED_MODULES) {
    const xs = inWanted.filter((s) => s.module === m);
    const ap = xs.filter((s) => s.kind === '$a').length;
    const pp = xs.filter((s) => s.kind === '$p');
    const af = pp.filter((s) => s.mandatory.every((h) => h.kind !== '$e')).length;
    console.log(`  ${m}: $a=${ap}, $p=${pp.length}, assertion-form=${af}`);
  }

  // decode all proofs
  const decT0 = Date.now();
  let decodeErrors = [];
  for (const s of pList) {
    if (!s.proofTokens) { decodeErrors.push([s.label, 'no proof tokens']); continue; }
    const dec = decodeCompressedProof(s.proofTokens, s.mandatory, arityOf, hypLabelSet);
    s.decode = dec;
    if (!dec.ok) decodeErrors.push([s.label, dec.errors.join('; ')]);
  }
  console.log(`decode all: ${Date.now() - decT0} ms, errors=${decodeErrors.length}`);
  for (const e of decodeErrors.slice(0, 20)) console.log('  DECODE ERROR', e[0], '::', e[1]);

  // target details
  const byLabel = new Map(statements.map((s) => [s.label, s]));
  for (const t of TARGETS) {
    const s = byLabel.get(t);
    if (!s) { console.log(`TARGET MISSING: ${t}`); continue; }
    const un = toUnicode(s.math);
    const af = s.mandatory ? s.mandatory.every((h) => h.kind !== '$e') : null;
    const dec = s.decode;
    console.log(`\n[${t}] kind=${s.kind} mod=${s.module} line=${s.line} section=${s.section} | subsection=${s.subsection}`);
    console.log(`  hyps=${s.mandatory ? s.mandatory.length : '?'} dv=${JSON.stringify(s.dv)} assertionForm=${af}`);
    console.log(`  ${s.math.join(' ')}`);
    console.log(`  ${un}`);
    if (dec) console.log(`  refs(${dec.refs.length}): ${dec.refs.join(' ')}  proofLength=${dec.proofLength} ok=${dec.ok}${dec.ok ? '' : ' errors=' + dec.errors.join('; ')}`);
    if (s.comment) console.log(`  comment: ${s.comment}`);
  }

  // section header dump for wanted modules (level 1/2/3)
  console.log('\n=== headers in wanted regions ===');
  let lastKey = '';
  for (const s of statements) {
    if (!WANTED_MODULES.has(s.module)) continue;
    const key = `${s.module}|${s.chapter}|${s.section}|${s.subsection}`;
    if (key !== lastKey) {
      lastKey = key;
      console.log(`${s.line}: ${s.module} | ${s.chapter} || ${s.section} || ${s.subsection}`);
    }
  }
  console.log('statement kinds not a/p:', JSON.stringify(statements.filter((s) => s.kind !== '$a' && s.kind !== '$p').slice(0, 10)));
  console.log('total time', Date.now() - t0, 'ms');
}

// ---------------------------------------------------------------------------
// JSON deliverable: research/setmm-data.json
// ---------------------------------------------------------------------------
const INCLUDE_MODULES = new Set(['set-pred.mm', 'set-class.mm', 'set-zf.mm', 'set-zfc.mm']);
const TARGET_LABELS = new Set(TARGETS);

function kindOfStatement(s) {
  if (s.kind === '$p') return 'theorem';
  if (/^ax/.test(s.label)) return 'axiom';
  if (/^df/.test(s.label)) return 'definition';
  return 'syntax';
}

function uniqDv(dv) {
  const seen = new Set();
  const out = [];
  for (const [a, b] of dv || []) {
    const key = [a, b].sort().join('\u0000');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(a <= b ? [a, b] : [b, a]);
  }
  return out;
}

function buildEntry(s, arityOf, hypLabelSet) {
  // DV pairs that are relevant to the assertion itself: keep only pairs whose
  // two variables occur in the conclusion or in a mandatory hypothesis
  // (dummy-variable pairs that only the proof needs are dropped).
  const stmtVars = new Set(s.math);
  for (const h of s.mandatory || []) for (const tk of h.math) stmtVars.add(tk);
  const dv = uniqDv(s.dv).filter(([a, b]) => stmtVars.has(a) && stmtVars.has(b));

  const entry = {
    label: s.label,
    kind: kindOfStatement(s),
    section: s.section,
    formulaAscii: s.math.join(' '),
    formulaUnicode: toUnicode(s.math),
    hypotheses: (s.mandatory || []).map((h) => ({
      label: h.label,
      kind: h.kind,
      formulaAscii: h.math.join(' '),
      formulaUnicode: toUnicode(h.math),
    })),
    proofRefs: [],
    proofLength: 0,
    dv,
    comment: s.comment || '',
    assertionForm: (s.mandatory || []).every((h) => h.kind !== '$e'),
    // extra (not required, useful for navigation)
    subsection: s.subsection || '',
    module: s.module,
    line: s.line,
  };
  if (s.kind === '$p' && s.proofTokens) {
    const dec = decodeCompressedProof(s.proofTokens, s.mandatory, arityOf, hypLabelSet);
    if (!dec.ok) entry.decodeErrors = dec.errors;
    entry.proofRefs = dec.refs.filter((lb) => !hypLabelSet.has(lb));
    entry.proofLength = dec.proofLength;
  }
  return entry;
}

function includeStatement(s, full) {
  if (!INCLUDE_MODULES.has(s.module)) return false;
  if (s.kind === '$a') return true;
  if (s.kind === '$p') {
    if (full) return true;
    if (s.module === 'set-pred.mm') return true;
    return TARGET_LABELS.has(s.label);
  }
  return false;
}

function runJson(full) {
  const src = fs.readFileSync(FILE, 'utf8');
  const t0 = Date.now();
  const { statements, arityOf, hypLabelSet } = parseDatabase(src);

  // Selection + transitive closure over decoded proof references so that a
  // consumer can resolve every label in proofRefs (e.g. eqid -> eqriv ...).
  const byLabel = new Map(statements.map((s) => [s.label, s]));
  const selected = new Map();
  for (const s of statements) if (includeStatement(s, full)) selected.set(s.label, s);
  let changed = true;
  while (changed) {
    changed = false;
    for (const s of [...selected.values()]) {
      if (s.kind !== '$p' || !s.proofTokens) continue;
      const dec = decodeCompressedProof(s.proofTokens, s.mandatory, arityOf, hypLabelSet);
      for (const lb of dec.refs) {
        if (hypLabelSet.has(lb) || selected.has(lb) || !byLabel.has(lb)) continue;
        selected.set(lb, byLabel.get(lb));
        changed = true;
      }
    }
  }
  const chosen = [...selected.values()].sort((a, b) => a.line - b.line);
  const entries = chosen.map((s) => buildEntry(s, arityOf, hypLabelSet));
  const body = entries.map((e) => JSON.stringify(e)).join(',\n');
  fs.writeFileSync(OUT_JSON, '[\n' + body + '\n]\n', 'utf8');

  // self-check: JSON must round-trip
  const roundTrip = JSON.parse(fs.readFileSync(OUT_JSON, 'utf8'));
  const bytes = fs.statSync(OUT_JSON).size;
  const kinds = {};
  const perModule = {};
  for (const e of entries) {
    kinds[e.kind] = (kinds[e.kind] || 0) + 1;
    perModule[e.module] = perModule[e.module] || { entries: 0, assertionForm: 0, theorems: 0, withProof: 0 };
    const pm = perModule[e.module];
    pm.entries++;
    if (e.assertionForm) pm.assertionForm++;
    if (e.kind === 'theorem') pm.theorems++;
    if (e.proofLength > 0) pm.withProof++;
  }
  const decodeErrors = entries.filter((e) => e.decodeErrors);
  console.log(`wrote ${OUT_JSON} (${bytes} bytes), entries=${entries.length}, parsed back=${roundTrip.length}`);
  console.log('kinds:', JSON.stringify(kinds));
  console.log('per module:', JSON.stringify(perModule));
  console.log(`decode errors: ${decodeErrors.length}`);
  for (const e of decodeErrors.slice(0, 30)) console.log('  DECODE ERROR', e.label, JSON.stringify(e.decodeErrors));
  console.log(`total ${Date.now() - t0} ms`);
  return entries;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--json')) runJson(args.includes('--full'));
  else main();
}
