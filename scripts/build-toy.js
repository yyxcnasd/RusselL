/* Build a bilibili Toy-compatible static folder: dist/. */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
const RUNTIME_JS = ['logic.js','archive.js','library.js','levels.js','levels-generated.js','engine.js','board.js','main.js'];
const ALLOWED = new Set(['.html','.htm','.css','.js','.json','.wasm','.data','.md','.csv','.tsv','.png','.jpg','.jpeg','.gif','.svg','.webp','.ico','.woff2','.woff','.ttf','.eot','.mp3','.wav','.ogg','.m4a','.mp4','.webm']);
function copy(from,to){const dest=path.join(out,to);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(from,dest)}
function walk(dir,base){for(const name of fs.readdirSync(dir)){const full=path.join(dir,name);const rel=path.posix.join(base,name);if(fs.statSync(full).isDirectory())walk(full,rel);else{const ext=path.extname(name).toLowerCase();if(!ALLOWED.has(ext))throw new Error('Not allowed: '+rel);copy(full,rel)}}}
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
copy(path.join(root,'index.html'),'index.html');
for(const f of RUNTIME_JS)copy(path.join(root,'src',f),'src/'+f);
copy(path.join(root,'src','simple.css'),'src/simple.css');
copy(path.join(root,'CREDITS.md'),'CREDITS.md');
for (const dir of ['fonts','audio']) walk(path.join(root,'assets',dir),'assets/'+dir);
copy(path.join(root,'assets','favicon.svg'),'assets/favicon.svg');
fs.writeFileSync(path.join(out,'BUILD.md'),'# 公理板\n\nStatic build for bilibili Toy and GitHub Pages.\n\n- Open `index.html`; no server or network needed.\n- Upload the contents of this folder for Toy.\n- Game state saves to localStorage; no runtime network.\n- Music: "lvl 3 - the grassland" by YannZ, CC BY 4.0 (see CREDITS.md).\n','utf8');
let count=0,bytes=0;(function audit(dir){for(const name of fs.readdirSync(dir)){const full=path.join(dir,name);if(fs.statSync(full).isDirectory())audit(full);else{const ext=path.extname(name).toLowerCase();if(!ALLOWED.has(ext))throw new Error('Audit failed: '+full);count++;bytes+=fs.statSync(full).size}}})(out);
console.log('dist ready:',count,'files,',(bytes/1024).toFixed(1),'KB');

