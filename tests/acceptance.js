'use strict';
/* dist 验收：构建产物与源码一致，dist 能直接加载完整 114 关。 */
const fs = require('fs');
const path = require('path');
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal } = require('./lib/expect');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

runTest('acceptance', async ({ openPage }) => {
  ok(fs.existsSync(path.join(DIST, 'index.html')), 'dist/index.html 存在（先 build:toy）');
  const distHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const srcHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  const scriptsOf = (html) => Array.from(html.matchAll(/<script src="src\/([^"]+)"><\/script>/g)).map((m) => m[1]);
  const srcScripts = scriptsOf(srcHtml);
  const distScripts = scriptsOf(distHtml);
  equal(distScripts, srcScripts, 'dist 脚本清单/顺序与源码一致');
  ok(srcScripts.length >= 12, '运行时脚本数量合理：' + srcScripts.length);
  for (const rel of srcScripts) {
    const a = fs.statSync(path.join(DIST, 'src', rel));
    const b = fs.statSync(path.join(ROOT, 'src', rel));
    equal(a.size, b.size, 'dist/src/' + rel + ' 完整');
  }
  ok(fs.existsSync(path.join(DIST, 'src', 'simple.css')), 'dist 包含 src/simple.css');
  ok(fs.existsSync(path.join(DIST, 'assets', 'favicon.svg')), 'dist 包含 favicon');

  const page = await openPage({ width: 1440, height: 900, url: fileUrl('dist/index.html'), shotDir: '.research/shots' });
  await page.ready();
  equal(await page.js('window.RSL.APP.state.levels.length'), 114, 'dist 加载 114 关');
  equal(await page.js('window.RSL.APP.state.level.code'), 'i', 'dist 首关是教学关 i');
  equal(await page.js('!!window.RSL.Term && !window.RSL.Logic'), true, 'dist 只加载新表达式核心');
  equal(page.problems().length, 0, 'dist 页面无 JS 错误');
  await page.shot('dist-game');
  await page.close();
});
