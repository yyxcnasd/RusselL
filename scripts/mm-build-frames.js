#!/usr/bin/env node
'use strict';
/*
 * 从 assets/data/set.mm 提取完整 Metamath frame（math tokens、$f/$e、$d、proofTokens），
 * 产出 research/mm-frames.json 供 scripts/mm-verify.js 重放 set.mm 证明。
 *
 * 与 research/parse-setmm.cjs 的区别：
 *   - 保留 statement 的完整帧与证明 token（不依赖 research/setmm-data.json）；
 *   - mandatory 假设按 Metamath 规则重算（$e 全部 + 结论/$e 里出现的变元的 $f），
 *     并且它就是压缩证明编码里的 H：应用断言时按它**全量**弹栈；
 *   - 记录 $f 的类型码，得到 varKinds，供 DV 与显示使用。
 *
 * 用法：
 *   node scripts/mm-build-frames.js              # 构建 + 报告
 *   node scripts/mm-build-frames.js --quiet      # 只写文件
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'assets', 'data', 'set.mm');
const OUT_DEFAULT = path.join(ROOT, 'research', 'mm-frames.json');

const WANTED_MODULES = new Set(['set-pred.mm', 'set-class.mm', 'set-zf.mm', 'set-zfc.mm']);

/* 重放目标清单的唯一来源（章节/中文名/说明都在那里）。 */
const { HARD_LABELS } = require('./mm-targets.js');

const isSpace = (c) => c === ' ' || c === '\t' || c === '\n' || c === '\r';

/* ---------------------------------------------------------------------------
 * 词法：comment（$( … $)）与 token
 * ------------------------------------------------------------------------- */
function* lex(src) {
  let i = 0;
  let line = 1;
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
      line++;
      i++;
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

/* ---------------------------------------------------------------------------
 * 参数 / 头信息（与 parse-setmm 一致：章节、小节、module 边界）
 * ------------------------------------------------------------------------- */
const HEADER_RES = [
  { level: 1, re: /^#{10,}$/ },
  { level: 2, re: /^(?:#\*){10,}#?$/ },
  { level: 3, re: /^={10,}$/ },
  { level: 4, re: /^[-=]{20,}$/ }
];

function parseHeader(text) {
  if (!text) return null;
  const lines = text.split('\n').map((s) => s.trim());
  let level = 0;
  const marks = [];
  for (let k = 0; k < lines.length; k++) {
    const l = lines[k];
    if (!l) continue;
    for (const h of HEADER_RES) {
      if (h.re.test(l)) {
        if (!level) level = h.level;
        if (h.level === level) marks.push(k);
        break;
      }
    }
  }
  if (!level || marks.length < 2) return null;
  const title = lines.slice(marks[0] + 1, marks[1]).filter(Boolean).join(' ').trim();
  return title ? { level, title } : null;
}

function firstSentence(text) {
  let s = String(text || '').replace(/\r/g, ' ').replace(/\s+/g, ' ').trim();
  if (s.startsWith('$j')) return '';
  let cut = -1;
  const re = /[.!?](?=\s)/g;
  let m;
  while ((m = re.exec(s))) {
    const before = s.slice(Math.max(0, m.index - 6), m.index + 1);
    if (/\b(e\.g|i\.e|cf|vs|etc|p|pp|no|fig|Thm|Sec|Ch|vol)\.$/i.test(before)) continue;
    cut = m.index + 1;
    break;
  }
  if (cut > 0) s = s.slice(0, cut);
  if (s.length > 360) s = s.slice(0, 357) + '...';
  return s;
}

function parseMm(src) {
  const scopes = [{ hyps: [], dvs: [] }];
  const frames = new Map();
  const hypFrames = new Map();
  const varKinds = new Map();
  const consts = new Set();
  const headerPath = [];
  let module = null;
  let pendingComments = [];
  let buf = [];
  let order = 0;

  function allHyps() {
    const out = [];
    for (const fr of scopes) for (const h of fr.hyps) out.push(h);
    return out;
  }
  function allDvs() {
    const out = [];
    for (const fr of scopes) for (const p of fr.dvs) out.push(p);
    return out;
  }
  function mandatoryOf(math) {
    const vars = new Set(math);
    const hyps = allHyps();
    for (const h of hyps) if (h.kind === '$e') for (const tk of h.math) vars.add(tk);
    return hyps.filter((h) => h.kind === '$e' || vars.has(h.var)).map((h) => ({
      label: h.label,
      kind: h.kind,
      math: h.math.slice(),
      var: h.var || null
    }));
  }

  function process(st) {
    if (!st.length) return;
    const head = st[0].text;
    if (head === '$c') return;
    if (head === '$v') {
      return;
    }
    if (head === '$d') {
      const vars = st.slice(1).map((x) => x.text);
      const fr = scopes[scopes.length - 1];
      for (let a = 0; a < vars.length; a++) {
        for (let b = a + 1; b < vars.length; b++) fr.dvs.push([vars[a], vars[b]]);
      }
      pendingComments = [];
      return;
    }
    const label = head;
    const kw = st[1] && st[1].text;
    const desc = pendingComments.length ? pendingComments[pendingComments.length - 1] : '';
    pendingComments = [];

    if (kw === '$f' || kw === '$e') {
      const math = st.slice(2).map((x) => x.text);
      const varName = kw === '$f' ? math[math.length - 1] : null;
      const hyp = { label, kind: kw, math, var: varName, line: st[0].line };
      scopes[scopes.length - 1].hyps.push(hyp);
      hypFrames.set(label, hyp);
      if (kw === '$f') varKinds.set(varName, math[0]);
      return;
    }

    if (kw === '$a' || kw === '$p') {
      let eq = -1;
      for (let k = 2; k < st.length; k++) if (st[k].text === '$=') { eq = k; break; }
      const math = (eq >= 0 ? st.slice(2, eq) : st.slice(2)).map((x) => x.text);
      const frame = {
        label,
        kind: kw,
        math,
        mandatory: mandatoryOf(math),
        dv: allDvs(),
        proofTokens: kw === '$p' && eq >= 0 ? st.slice(eq + 1).map((x) => x.text) : null,
        module,
        line: st[0].line,
        order: order++,
        section: headerPath[2] || headerPath[1] || '',
        subsection: headerPath[3] || headerPath[4] || '',
        chapter: headerPath[1] || '',
        comment: firstSentence(desc)
      };
      frames.set(label, frame);
      return;
    }
    /* 未知语句：记下来但不参与重放。 */
  }

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
    const t = item.text;
    if (t === '${') { scopes.push({ hyps: [], dvs: [] }); continue; }
    if (t === '$}') { if (scopes.length > 1) scopes.pop(); continue; }

    buf.push({ text: t, line: item.line });
    if (t === '$.') {
      const st = buf;
      buf = [];
      process(st.slice(0, -1));
    }
  }

  return { frames, hypFrames, varKinds, headerPath };
}

/* ---------------------------------------------------------------------------
 * 传递闭包：31 个目标 + 它们直接引用的 label（引用是断言级的，不展开其证明）
 * ------------------------------------------------------------------------- */
function proofLabels(frame) {
  const toks = frame.proofTokens || [];
  if (!toks.length) return [];
  if (toks[0] !== '(') return toks.slice();
  const out = [];
  for (let i = 1; i < toks.length && toks[i] !== ')'; i++) out.push(toks[i]);
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const quiet = args.includes('--quiet');
  const outIdx = args.indexOf('--out');
  const OUT = outIdx >= 0 && args[outIdx + 1] ? path.resolve(args[outIdx + 1]) : OUT_DEFAULT;
  const t0 = Date.now();
  const src = fs.readFileSync(FILE, 'utf8');
  const { frames, hypFrames, varKinds } = parseMm(src);
  const parseMs = Date.now() - t0;

  const inWanted = [...frames.values()].filter((f) => WANTED_MODULES.has(f.module));
  const allWanted = new Set(inWanted.map((f) => f.label));

  /* 31 个目标必须存在 */
  const missing = HARD_LABELS.filter((l) => !frames.has(l));
  if (missing.length) {
    console.error('缺少 hard label：' + missing.join(', '));
    process.exitCode = 2;
  }

  /* 证明里还会直接引用「假元变量」的 $f 假设（例如 vt、vv），它们不在 mandatory 里，
     必须单独提供 frame，否则重放会报 unknown label。 */
  const hypKeep = {};
  for (const label of HARD_LABELS) {
    const f = frames.get(label);
    if (!f) continue;
    for (const ref of proofLabels(f)) {
      if (frames.has(ref)) continue;
      const h = hypFrames.get(ref);
      if (h) hypKeep[ref] = { label: h.label, kind: h.kind, math: h.math, var: h.var || null };
    }
  }

  /* 默认只保留重放需要的闭包：31 个目标 + 它们证明里直接引用到的断言。
     断言引用是「不透明」的（不会展开该引理自己的证明），所以闭包只有一层。
     --full 时保留 4 个模块的全部断言（约 11 MB，便于人工查询，不进默认产物）。 */
  const full = args.includes('--full');
  const keep = new Set();
  let crossModule = 0;
  for (const label of HARD_LABELS) {
    const f = frames.get(label);
    if (!f) continue;
    keep.add(label);
    for (const ref of proofLabels(f)) {
      if (keep.has(ref)) continue;
      const rf = frames.get(ref);
      if (!rf) continue;
      keep.add(ref);
      if (!WANTED_MODULES.has(rf.module)) crossModule += 1;
    }
  }
  if (full) for (const f of inWanted) keep.add(f.label);
  const inWantedSet = new Set(inWanted.map((f) => f.label));

  const out = {};
  let dvPairs = 0;
  for (const label of keep) {
    const f = frames.get(label);
    if (!f) continue;
    const copy = {
      label: f.label,
      kind: f.kind,
      math: f.math,
      mandatory: f.mandatory,
      dv: f.dv,
      proofTokens: f.proofTokens,
      module: f.module,
      line: f.line,
      section: f.section,
      subsection: f.subsection,
      comment: f.comment
    };
    dvPairs += f.dv.length;
    out[label] = copy;
  }

  const vk = {};
  for (const [name, typecode] of varKinds) vk[name] = typecode;

  const body = {
    generatedAt: new Date().toISOString(),
    source: 'assets/data/set.mm',
    modules: [...WANTED_MODULES],
    counts: {
      frames: Object.keys(out).length,
      moduleFrames: inWanted.length,
      closureFrames: keep.size,
      crossModuleFrames: crossModule,
      assertions: inWanted.filter((f) => f.kind === '$p').length,
      axioms: inWanted.filter((f) => f.kind === '$a').length,
      hypFrames: hypFrames.size,
      dvPairs: dvPairs
    },
    varKinds: vk,
    hardLabels: HARD_LABELS,
    hyps: hypKeep,
    frames: out
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(body), 'utf8');
  const bytes = fs.statSync(OUT).size;

  if (!quiet) {
    console.log('parse  : ' + parseMs + ' ms');
    console.log('frames : ' + Object.keys(out).length + '（闭包 ' + keep.size + '，跨模块引用 ' + crossModule + '）');
    console.log('vars   : ' + varKinds.size + '，DV 对 ' + dvPairs);
    console.log('hyps   : ' + Object.keys(hypKeep).length + ' 个假元假设 frame: ' + Object.keys(hypKeep).join(' '));
    console.log('wrote  : ' + OUT + '（' + (bytes / 1024 / 1024).toFixed(2) + ' MB）');
    console.log('\n31 个 hard label：');
    for (const label of HARD_LABELS) {
      const f = frames.get(label);
      if (!f) { console.log('  ' + label.padEnd(12) + ' MISSING'); continue; }
      const refs = proofLabels(f);
      console.log('  ' + label.padEnd(12) + ' $' + f.kind[1] + ' mod=' + String(f.module).padEnd(13) +
        ' mand=' + String(f.mandatory.length).padStart(2) +
        ' dv=' + String(f.dv.length).padStart(2) +
        ' labels=' + String(refs.length).padStart(3) +
        ' enc=' + String((f.proofTokens || []).slice(refs.length + 2).join('').length).padStart(4) +
        ' | ' + f.math.join(' ').slice(0, 60));
    }
  }
  console.log('\nbuild-frames: frames=' + Object.keys(out).length + ' missing=' + missing.length +
    ' ' + (bytes / 1024 / 1024).toFixed(2) + 'MB ' + (Date.now() - t0) + 'ms');
}

if (require.main === module) main();

module.exports = { parseMm, HARD_LABELS, WANTED_MODULES, proofLabels };
