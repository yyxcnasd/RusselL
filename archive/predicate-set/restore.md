# 还原与检视：冻结的 152 关完整游戏

标签 **`archive/predicate-set-v1`**（annotated）指向提交 `8987493e3be7c8fe2c917d3cf0d54a531ba42c5d`，
那是「152 关 / 四章」版本的完整可玩状态。下面所有命令都是**只读还原**：不会改动 tag，也不会
改动你当前的主工作区（除非你显式 `git worktree remove` 之类的清理操作）。

> 约定：`<repo>` 指本项目仓库路径（本文按 `D:/Random Things/RusselL` 写），`<out>` 指你要还原到的
> 独立目录（不要还原进主工作区）。

## 0. 先确认 tag 指向

```powershell
cd "<repo>"
git rev-parse "archive/predicate-set-v1^{commit}"
# 期望：8987493e3be7c8fe2c917d3cf0d54a531ba42c5d

git for-each-ref refs/tags/archive/predicate-set-v1 --format="%(refname:short) %(objecttype) -> %(*objectname)"
# 期望：archive/predicate-set-v1 tag -> 8987493e3be7c8fe2c917d3cf0d54a531ba42c5d

git tag -n99 archive/predicate-set-v1   # 看标注信息
git cat-file -t archive/predicate-set-v1  # 期望：tag（annotated，不是 commit）
```

## 1. 方式 A（推荐）：克隆一份独立 checkout

```powershell
cd "<repo 的上一级目录>"
git clone "D:/Random Things/RusselL" "RusselL-predicate-set"
cd "RusselL-predicate-set"
git checkout -b predicate-set-frozen "archive/predicate-set-v1"

# 校验：HEAD 必须就是冻结提交
git rev-parse HEAD
# 期望：8987493e3be7c8fe2c917d3cf0d54a531ba42c5d
```

克隆会把 `src/levels.js`（761 KB 生成产物）和 `campaign/campaign2-levels.json`（152 关）一起带下来，
所以**不需要先构建**就能玩：直接起静态服务器打开 `index.html`。

## 2. 方式 B：在现有仓库里开一个独立 worktree（不复制 .git）

```powershell
cd "<repo>"
git worktree add -b predicate-set-frozen "..\RusselL-predicate-set-wt" "archive/predicate-set-v1"
# 用完清理（只删 worktree 目录，不碰 tag）：
# git worktree remove "..\RusselL-predicate-set-wt"
```

## 3. 方式 C：不 checkout，只导出文件

```powershell
cd "<repo>"
# 只导出一棵干净的树（不含 .git）
git archive --format=zip -o "$env:TEMP\predicate-set-frozen.zip" "archive/predicate-set-v1"
# 或直接读某个文件
git show "archive/predicate-set-v1:src/levels.js" | Select-Object -First 5
git ls-tree -r --name-only "archive/predicate-set-v1" | Select-String "src/levels.js|campaign2-levels.json|campaign2.js"
```

## 4. 运行冻结版本

任何静态服务器都可以（不要用 `file://`，模块/资源路径会挂）：

```powershell
# 在还原出来的目录里
npx --yes serve .            # 或：python -m http.server 8080
# 打开 http://localhost:3000 （serve）或 http://localhost:8080 （python）
```

- 入口：`index.html`
- 该版本是经典脚本 + `window.RSL`，无打包步骤。
- 验收脚本（可选，需要 Node）：`npm test`、`npm run test:wire`、`npm run test:leaderboard`、`node tests/game-ui.js`。
- **不要**在还原目录里跑 `npm run build`：构建依赖 `campaign/campaign2.js` → `scripts/build-campaign2.js` →
  `scripts/lib/mm-bridge.js` → 本地 `assets/data/set.mm`，而 `assets/data/` 已 gitignore，**tag 里没有**。
  缺 `set.mm` 构建会失败；但已提交的 `src/levels.js` 让游玩不受影响。

## 5. 检视关卡数据（114 关归档副本）

`archive/predicate-set/levels-ii-iv.json` 是一个对象，关卡数组在 `.levels`：

```powershell
cd "<repo>/archive/predicate-set"

# 结构：{ archivedAt, sourceFile, sourceCommit, tag, chapterGroups, total, counts, codesByChapter, levels[] }
node -e "const d=require('./levels-ii-iv.json'); console.log(d.total); console.log(d.counts.byChapter); console.log(d.levels[0].code, d.levels[0].title);"

# 每章每带计数（期望 tutorial 4 / base 10 / challenge 24，共 114）
node -e "const d=require('./levels-ii-iv.json');const m={};for(const l of d.levels){const k=l.chapterGroup+'/'+l.band;m[k]=(m[k]||0)+1}console.table(m)"

# 按章列出关卡 code
node -e "const d=require('./levels-ii-iv.json');for(const c of ['Ⅱ','Ⅲ','Ⅳ'])console.log(c, d.levels.filter(l=>l.chapterGroup===c).map(l=>l.code).join(' '))"

# 找某一关的完整定义（含 solution / palette / depCodes）
node -e "const d=require('./levels-ii-iv.json');const l=d.levels.find(x=>x.code==='Ⅲ-01');console.log(JSON.stringify(l,null,2))"
```

从冻结提交取**全量 152 关**（而不是本目录的 114 关切片）：

```powershell
cd "<repo>"
git show "archive/predicate-set-v1:campaign/campaign2-levels.json" > "$env:TEMP\campaign2-levels-152.json"
node -e "const d=require(process.env.TEMP+'/campaign2-levels-152.json');console.log(d.length)"
```

从冻结提交取 **Ⅱ/Ⅲ/Ⅳ 的编译数据**（已验证与 `levels-ii-iv.json` 的 `levels` 一致）：

```powershell
node -e "const a=require('./campaign/campaign2-levels.json').filter(l=>['Ⅱ','Ⅲ','Ⅳ'].includes(l.chapterGroup));const b=require('./archive/predicate-set/levels-ii-iv.json').levels;console.log('same:',JSON.stringify(a)===JSON.stringify(b),'n:',a.length)"
```

> 注意：本归档的 JSON 是**包装对象**（带计数与元数据），不是裸数组。要让主游戏把它当关卡表用，
> 取 `.levels`，不要整份塞进 `campaign2-levels.json` 的位置。

## 6. 校验归档完整性

```powershell
cd "<repo>/archive/predicate-set"
node -e "const m=require('./manifest.json');const fs=require('fs'),crypto=require('crypto');let bad=0;for(const f of m.files){const h=crypto.createHash('sha256').update(fs.readFileSync(f.path.replace('archive/predicate-set/',''))).digest('hex');const ok=h===f.sha256;if(!ok)bad++;console.log(ok?'OK  ':'FAIL',f.path)}console.log(bad?'MISMATCH':( 'all '+m.files.length+' files match manifest'))"
```

期望输出 `all 7 files match manifest`。

## 7. 常见问题

| 现象 | 原因 / 处理 |
| --- | --- |
| `git checkout archive/predicate-set-v1` 提示 detached HEAD | 正常；方式 A 用 `-b` 建了分支，方式 B/C 是只读检视，不要在那里提交 |
| `npm run build` 失败，报缺 `set.mm` | 预期限制：`assets/data/` 是 gitignore 的本地开发参考，不在任何 tag 中；游玩不需要构建 |
| 想改冻结内容 | 不要移动 tag；在还原出的独立分支上改，或另打新 tag（如 `archive/predicate-set-v2`） |
| 关卡拉不出来 / 黑屏 | 用静态服务器而非 `file://`；确认还原的是 tag 提交而不是主工作区当前 HEAD（主游戏改造中） |
