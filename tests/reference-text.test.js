'use strict';
/* 参考解文本 English-only：
 *   - Hints.pages(level)[2]（提示第三页 / 参考接线）不含汉字，且必有 modules: / wires: 两段；
 *   - docs/SOLUTIONS.md 的 ```text 参考电路代码块里不出现汉字节点标签，标签/箭头用 ASCII。
 * 周围 Markdown 标题、提示文字仍可以是中文；本测试只管“参考电路块”本身。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { loadRuntime } = require('../scripts/lib/load-runtime');

const ROOT = path.join(__dirname, '..');
const CJK = /[\u4e00-\u9fa5]/;
const CJK_SOURCE = '[\\u4e00-\\u9fa5]';

const RSL = loadRuntime({
  files: ['src/term.js', 'src/levels.js', 'src/modules.js', 'src/engine.js', 'src/hints.js'],
  globals: { location: { hostname: 'localhost', pathname: '/' } }
});

function cjkExcerpt(text) {
  const m = new RegExp('.{0,14}' + CJK_SOURCE + '.{0,14}').exec(text);
  return m ? m[0].replace(/\n/g, '\\n') : '';
}

test('Hints.pages(level)[2] 是 English-only，并包含 modules: / wires:', () => {
  const levels = RSL.LEVELS;
  assert.ok(Array.isArray(levels) && levels.length > 0, '关卡数据已加载');
  const failures = [];
  levels.forEach((lv) => {
    const tag = lv.code || lv.id || ('#' + lv.id);
    const page = RSL.Hints.pages(lv)[2];
    assert.strictEqual(typeof page, 'string', tag + ' 第三页是文本');
    if (page.indexOf('modules:') < 0) failures.push(tag + '：缺少 modules:');
    if (page.indexOf('wires:') < 0) failures.push(tag + '：缺少 wires:');
    if (CJK.test(page)) failures.push(tag + '：含汉字「' + cjkExcerpt(page) + '」');
    /* Unicode 箭头不属于 English/ASCII 标签；接线一律用 -> */
    if (/→|←/.test(page)) failures.push(tag + '：仍使用 Unicode 箭头');
  });
  assert.deepStrictEqual(failures, []);
});

test('docs/SOLUTIONS.md 的参考电路代码块无汉字、标签 ASCII、无 *undefined', () => {
  const file = path.join(ROOT, 'docs', 'SOLUTIONS.md');
  assert.ok(fs.existsSync(file), 'docs/SOLUTIONS.md 存在（先跑 node scripts/export-solutions.js）');
  const md = fs.readFileSync(file, 'utf8');
  const blocks = Array.from(md.matchAll(/```text\n([\s\S]*?)```/g)).map((m) => m[1]);
  assert.ok(blocks.length > 0, '至少有一个参考电路代码块');

  const failures = [];
  blocks.forEach((block, i) => {
    const tag = '代码块#' + (i + 1);
    if (CJK.test(block)) failures.push(tag + '：含汉字「' + cjkExcerpt(block) + '」');
    if (!/^modules:$/m.test(block)) failures.push(tag + '：缺少 modules: 行');
    if (!/^wires:$/m.test(block)) failures.push(tag + '：缺少 wires: 行');
    if (/\*undefined/.test(block)) failures.push(tag + '：出现 *undefined');
    if (/→|←/.test(block)) failures.push(tag + '：接线仍用 Unicode 箭头');
    if (!/^\S+\s{2}target$/m.test(block)) failures.push(tag + '：缺少 target 行');
    /* 允许的 English 节点标签前缀（theorem/axiom/atom/term/pred/subst/mp/def-expand/def-contract 等）。 */
    const badLines = block.split('\n').filter((line) => {
      if (!line.trim()) return false;
      if (/^(modules:|wires:|target)$/.test(line)) return false;
      if (/^[A-Za-z0-9_]+\./.test(line)) return false;              // wire: n1.out -> n2.a
      if (/^[A-Za-z0-9_]+\s{2}/.test(line)) return false;           // module: id  label
      return true;
    });
    if (badLines.length) failures.push(tag + '：无法识别的行「' + badLines[0] + '」');
  });
  assert.deepStrictEqual(failures, []);
});
