/* Build a bilibili Toy-compatible static folder: dist/.
   Only whitelisted file extensions are emitted. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
const RUNTIME_JS = [
  'logic.js', 'theorems.js', 'metamath.js', 'predicate.js', 'library.js',
  'levels.js', 'engine.js', 'graph.js', 'app.js'
];
const ALLOWED = new Set([
  '.html', '.htm', '.css', '.js', '.json', '.wasm', '.data', '.md', '.csv', '.tsv',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',
  '.woff2', '.woff', '.ttf', '.eot', '.mp3', '.wav', '.ogg', '.m4a', '.mp4', '.webm'
]);

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
      if (!ALLOWED.has(ext)) throw new Error('Not allowed by bilibili Toy: ' + rel);
      copy(full, rel);
    }
  }
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
copy(path.join(root, 'index.html'), 'index.html');
for (const f of RUNTIME_JS) copy(path.join(root, 'src', f), 'src/' + f);
copy(path.join(root, 'src', 'styles.css'), 'src/styles.css');
copy(path.join(root, 'src', 'overrides.css'), 'src/overrides.css');
walk(path.join(root, 'assets'), 'assets');

// A tiny manifest for the publisher, .md so it is also whitelisted.
fs.writeFileSync(path.join(out, 'BUILD.md'),
  '# 公理板 / AXIOM BOARD\n\n' +
  'Static build for bilibili Toy.\n\n' +
  '- Open `index.html`; no server or network needed.\n' +
  '- Upload the contents of this folder (not the folder itself) as the game package.\n' +
  '- Runtime sources are classic scripts; fonts are bundled locally.\n' +
  '- Progress is stored in localStorage with a safe in-memory fallback.\n', 'utf8');

// Final whitelist audit.
let count = 0, bytes = 0;
(function audit(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) audit(full);
    else {
      const ext = path.extname(name).toLowerCase();
      if (!ALLOWED.has(ext)) throw new Error('Audit failed: ' + full);
      count++; bytes += fs.statSync(full).size;
    }
  }
})(out);
console.log('dist ready:', count, 'files,', (bytes / 1024).toFixed(1), 'KB');
