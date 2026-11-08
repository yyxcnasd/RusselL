/* Build a bilibili Toy-compatible static folder: dist/. */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');

/*
 * 运行时脚本的加载顺序必须与 index.html 完全一致：
 * 数据 → mm-replay（开关/证明/关卡）→ 引擎 → 纯逻辑（route）→ 存档/成就
 * → UI 基础件 → 重放面板 → 编辑器 → 应用。
 */
const RUNTIME_JS = [
  'logic.js', 'term.js', 'archive.js', 'library.js', 'levels.js', 'levels-generated.js',
  'mm/flags.js', 'mm/proofs.js', 'mm/levels.js', 'mm/expr.js', 'mm/verify.js',
  'modules.js', 'engine.js', 'route.js', 'achievements.js', 'save.js',
  'ui.js', 'mm/graph.js', 'audio.js', 'coach.js', 'catalog.js', 'screens.js',
  'board.js', 'main.js'
];

const ALLOWED = new Set(['.html','.htm','.css','.js','.json','.wasm','.data','.md','.csv','.tsv','.png','.jpg','.jpeg','.gif','.svg','.webp','.ico','.woff2','.woff','.ttf','.eot','.mp3','.wav','.ogg','.m4a','.mp4','.webm']);

function copy(from, to) {
  const dest = path.join(out, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(from, dest);
}
function walk(dir, base) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.posix.join(base, name);
    if (fs.statSync(full).isDirectory()) walk(full, rel);
    else {
      const ext = path.extname(name).toLowerCase();
      if (!ALLOWED.has(ext)) throw new Error('Not allowed: ' + rel);
      copy(full, rel);
    }
  }
}

/* 维护模式：仓库根存在 .maintenance 时，Pages 只发布维护页（不发布任何游戏脚本），
   本地开发/测试仍直接打开源码 index.html。升级完成后删掉 .maintenance 重新构建即可恢复。 */
const MAINTENANCE = fs.existsSync(path.join(root, '.maintenance'));

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

if (MAINTENANCE) {
  fs.writeFileSync(
    path.join(out, 'index.html'),
    fs.readFileSync(path.join(root, 'scripts', 'maintenance.html'), 'utf8'),
    'utf8'
  );
  copy(path.join(root, 'assets', 'favicon.svg'), 'assets/favicon.svg');
  walk(path.join(root, 'assets', 'fonts'), 'assets/fonts');
  copy(path.join(root, 'CREDITS.md'), 'CREDITS.md');
  fs.writeFileSync(path.join(out, 'BUILD.md'), '# 公理板（维护中）\n\nPages 当前只发布维护页；游戏源码未包含在本产物里。\n删除仓库根的 .maintenance 后重新运行 node scripts/build-toy.js 即可恢复游戏。\n', 'utf8');
} else {
  copy(path.join(root, 'index.html'), 'index.html');
  for (const f of RUNTIME_JS) copy(path.join(root, 'src', f), 'src/' + f);
  copy(path.join(root, 'src', 'simple.css'), 'src/simple.css');
  copy(path.join(root, 'src', 'mm', 'mm.css'), 'src/mm/mm.css');
  copy(path.join(root, 'CREDITS.md'), 'CREDITS.md');
  for (const dir of ['fonts', 'audio']) walk(path.join(root, 'assets', dir), 'assets/' + dir);
  copy(path.join(root, 'assets', 'favicon.svg'), 'assets/favicon.svg');
  fs.writeFileSync(path.join(out, 'BUILD.md'), '# 公理板\n\nStatic build for bilibili Toy and GitHub Pages.\n\n- Open `index.html`; no server or network needed.\n- Upload the contents of this folder for Toy.\n- Game state saves to localStorage; no runtime network.\n- Music: "lvl 3 - the grassland" by YannZ, CC BY 4.0 (see CREDITS.md).\n', 'utf8');
}

let count = 0, bytes = 0;
(function audit(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) audit(full);
    else {
      const ext = path.extname(name).toLowerCase();
      if (!ALLOWED.has(ext)) throw new Error('Audit failed: ' + full);
      count++;
      bytes += fs.statSync(full).size;
    }
  }
})(out);
console.log('dist ready:', count, 'files,', (bytes / 1024).toFixed(1), 'KB', MAINTENANCE ? '（维护模式：只发布维护页）' : '');
