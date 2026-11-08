# 架构与代码地图

公理板是**纯静态**的单页游戏：没有后端、没有构建步骤（源码目录直接可玩）、运行时不发网络请求。
本文件说明模块边界、加载顺序、数据流和测试方式，改代码前先看这里。

## 1. 设计约束

| 约束 | 原因 | 影响 |
| --- | --- | --- |
| 经典 `<script>`，不用 ES module | 需要直接双击 `index.html`（`file://`）可玩；ES module 在 `file://` 下会被 CORS 拦截 | 模块用 IIFE + `window.RSL` 命名空间；加载顺序写在 `index.html` 与 `scripts/build-toy.js` |
| 无运行时网络、无后端 | GitHub Pages / bilibili Toy 静态托管 | 数据在 `src/*.js`；字体、音频、图标都本地化 |
| 源码目录 = 可玩版本 | 改完不用构建即可验证 | `dist/` 只是给 bilibili Toy 的拷贝产物，不参与开发 |
| 关卡与档案由脚本生成 | 240 关 + 993 条 set.mm 条目不手写 | `scripts/gen-levels.js` 产出 `src/archive.js`、`src/levels-generated.js`，不要手改 |

## 2. 模块与加载顺序

`index.html` 末尾按下列顺序加载（`scripts/build-toy.js` 的 `RUNTIME_JS` 必须同步）：

```
logic → archive → library → levels → levels-generated
      → mm/flags → mm/proofs → mm/levels → mm/expr → mm/verify
      → engine → route → achievements → save → ui
      → mm/panel → audio → coach → catalog → screens → board → main
```

`mm/*` 是并行的 set.mm 证明重放子系统（见 [MM-REPLAY.md](MM-REPLAY.md)）：它有自己的
token 公式层与校验器，不进入 `Logic` 的 AST，也不改现有 240 关。

| 文件 | 命名空间 | 职责 | 依赖 |
| --- | --- | --- | --- |
| `src/logic.js` | `RSL.Logic` | 公式 AST、解析/格式化、展开、代入、定义置换、分离、匹配。纯函数 | 无 |
| `src/archive.js` | `RSL.ARCHIVE` | set.mm 档案条目（生成） | 无 |
| `src/library.js` | `RSL.AXIOMS` / `DEFINITIONS` / `PARTS` / `CHAPTERS` | 20 条公理、4 个定义、调色板条目、章节元数据 | 无 |
| `src/levels.js` | `RSL.LEVELS` | 手工关（含参考电路） | 无 |
| `src/levels-generated.js` | `RSL.LEVELS` | 生成关（生成） | 无 |
| `src/mm/flags.js` | `RSL.MM.Flags` | 重放子系统特性开关（默认关闭） | 无 |
| `src/mm/proofs.js` | `RSL.MM_PROOFS` | 31 个自包含证明 DAG（生成，< 400 KB） | 无 |
| `src/mm/levels.js` | `RSL.MM_LEVELS` | 31 个 `mm-proof` 关卡（生成） | 无 |
| `src/mm/expr.js` | `RSL.MM.Expr` | token 公式：替换、$e 比对、断言应用、DV、显示。纯函数 | 无 |
| `src/mm/verify.js` | `RSL.MM.Verify` | 压缩证明重放、DAG 构造与离线校验 | Expr |
| `src/mm/panel.js` | `RSL.MM.Panel` | 只读重放面板（步骤列表 / 当前步骤 / 前后导航） | 无（DOM 由调用方给） |
| `src/engine.js` | `RSL.Engine` | 模块元数据 + 电路拓扑求值 + 反作弊（目标上游必须有来源） | Logic |
| `src/route.js` | `RSL.Route` | 纯几何：A* 走线、正交化、45° 倒角、线段避障。无 DOM | 无 |
| `src/achievements.js` | `RSL.Achievements` | 20 个成就定义与纯条件判定 | 无 |
| `src/save.js` | `RSL.Save` | 存档 schema（版本 2）：清洗、payload、localStorage 读写 | 无 |
| `src/ui.js` | `RSL.UI` | 元素表、全括号公式 HTML、toast、面板生命周期/滚动条/焦点陷阱、彩带 | Logic |
| `src/audio.js` | `RSL.Audio` | 首次交互后解锁的 BGM 与音效 | 无 |
| `src/coach.js` | `RSL.Coach` | 规则提示窗（输入→模块→输出示意） | UI、Audio |
| `src/catalog.js` | `RSL.Catalog` | 关卡目录派生：章节分组、关号排序、解锁链、调色板解析。纯函数 | Logic |
| `src/screens.js` | `RSL.Screens` | 选关/帮助/成就/通关/重放通关面板的 HTML 与面板内交互 | UI、Catalog、Achievements、Audio |
| `src/board.js` | `RSL.Board` | DOM 图编辑器：视图变换、节点/导线交互、框选、长按删除、渲染与走线调用 | Engine、Route、UI |
| `src/main.js` | `RSL.APP` | 应用状态、存档、主题/声音、关卡流程、重放层挂载、调色板拖放、参数弹层、全局事件、启动 | 以上全部 |

依赖只允许**向下**（右侧列出的依赖），UI 层不得反向读取 `RSL.APP`。
需要跨层动作时由 `main.js` 通过 `Screens.init(ctx)` 注入回调（`loadLevel`、`isUnlocked`、`exportSave`…）。

## 3. 数据流

```
关卡数据（levels* + library）
  └─ Catalog.build() → state.levels（排序、解锁链、subst 关自动补构造模块）
       └─ loadLevel(i) → Board.setData(目标 + 存档电路) → Engine.evaluate()
            ├─ Board.paint(results)  节点状态/公式
            ├─ Route._route(...)     A* 走线 → SVG path
            └─ 通关 → Save.payload → localStorage；Screens.openWin
```

- 公式比较用 `Logic.eq`（定义展开 + α 等价），显示用两条路径：
  `Logic.fmt` = 最小括号（存档/测试/日志）；`UI.formulaHTML` = 全括号（界面）。
- 过关条件：目标焊盘 `complete`，且目标上游真的包含公理/规则/档案/已证结论（见 `Engine.evaluate` 反作弊段）。
- 存档只存解出的关卡、最佳长度、通关电路等；电路在 `save.clean` 里按白名单清洗。

### 3.0 重放关的数据流（并行分支）

`mm-proof` 关卡不经过 `Engine`/`Board`，走独立的 token 公式与证明数据：

```
selectedLevel.mode === 'mm-proof'
  └─ loadLevel() → main.js 的 loadMmLevel()
       ├─ 隐藏 .board 与元件栏，懒挂 #mmRoot（.stage 里的兄弟节点）
       ├─ goal 用 MM.Expr.toHTML(token 公式) 渲染（不是 Logic AST）
       └─ MM.Panel.mount(#mmRoot, { level, proof })   // proof = MM_PROOFS[level.proofId]
            ├─ 步骤列表 + 当前步骤详情（label / 替换 map / 结论）
            ├─ ←/→/Home/End、分页（>80 步）、0 步公理分支
            └─ 到 finalStep → onSolved → main.js mmWin() → Screens.openMmWin
```

- 菜单与解锁：`RSL.MM_LEVELS` 只在 `MM.Flags.enabled()`（`?mm=1` 或
  `localStorage['axiom-simple:mm']==='on'`）时由 `Catalog.build()` 追加到目录末尾，
  `chapterGroup:'MM'`、`requires:[]`；关闭时目录与现有 240 关逐字段不变。
- 顶栏「校验」按钮在重放关里变成「下一步」（`main.js` 里 `check()` 分支）。
- 面板不读 `RSL.APP`，只通过 mount 参数与 `onSolved/onProgress/sfx` 回调通信。
- 重放关**不计入** 240 关的成就体系（`achievements.evaluate` 过滤 `mode:'mm-proof'`），
  只登记 `solved` / `bestLen`，不写 `circuits`。

### 3.1 走线算法

- 12px 网格 A*：每步 1，拐弯 +8，反向 +4；不同输出网络复用同一段 +64（同源端口可以共享 trunk）。
- 占用表使用**全局网格坐标**（旧实现按每条走线自己的局部 origin 记录，跨走线对不上，等于没有避让）。
- 每条走线按「先短后长」顺序路由；A* 完成后先做正交 shortcut，**shortcut 会拒绝压到其它
  网络已占用的共线区间**；最终渲染路径（而不是 A* 原始阶梯）再登记进占用表，供后续网络避让。
- 节点自动放置用真实端口数估算高度（S 元件最多 11 个输入端口），渲染后再做一次重叠检查，
  加组变高时也会重新让位。
- 这是可增量协作的最小版本，不是全局最优布线；参考思路是迷宫路由（Lee / A*）、协商拥塞
  （negotiated congestion / rip-up & reroute）与正交连接器布线中的 nudging，但本作只实现
  了适合即时交互的简化版本。

## 4. 关卡与内容生成

```
research/setmm-data.json (+ setmm-set-extra.json)
  └─ scripts/gen-levels.js → src/archive.js（993 条）
                           → src/levels-generated.js（每章 48 关）
       └─ tests/levels.test.js 逐关用真实引擎求值参考电路
```

改生成器后：`node scripts/gen-levels.js`，然后 `git diff src/archive.js src/levels-generated.js` 应为你预期的变化（纯重构应为空）。
`src/levels.js` 是手工关，可直接改；四章各 12 关手工 + 48 关生成。
生成关的前若干关是**推理关**：把 set.mm 的难证定理/公理当作已证引理，用代入/全称闭包/定义置换推出新目标，不使用 archive 直连；难证定理仍会作为引理出现在关卡里。
档案公式的命题变元统一归一化到 `PQRSTUVWXYZABC`；每关的 `allowed` 由参考电路收敛而来（只含真正用到的模块 + 目标），命题章不再出现谓词/量词元件。

### 4.1 set.mm 证明重放数据（mm-replay）

```
assets/data/set.mm（仓库外，51 MB）
  └─ scripts/mm-build-frames.js → research/mm-frames.json（重放闭包，约 160 KB）
       └─ scripts/mm-verify.js   → research/mm-proofs/<label>.json × 31
                                → research/mm-report.json（成功/失败与步骤统计）
            └─ scripts/mm-to-levels.js → src/mm/proofs.js   （RSL.MM_PROOFS，约 386 KB）
                                       → src/mm/levels.js   （RSL.MM_LEVELS，31 关）
                 └─ tests/mm-replay.test.js / tests/mm-ui.js 逐关校验与真浏览器重放
```

一条命令重建全部产物：`npm run build:mm`（需要 `assets/data/set.mm`）。
`src/mm/*` 的接口契约、压缩证明语义、DV 覆盖范围都写在 [MM-REPLAY.md](MM-REPLAY.md)，
数学来源与提取器细节见 [metamath.md](metamath.md)。

## 5. 视觉与交互约定

完整设计规范见 [DESIGN.md](DESIGN.md)（颜色角色、字体、圆角/投影/图标 token、组件状态与记法）。

- 节点宽 232px（`CSS .node width` 与 `Board` 常量一致）、目标焊盘 160px；拖动吸附 16px 网格。
- 端口类型 `formula` / `assertion` / `atom` 决定颜色与可否连接；CSS 与 `Board.connect` 共用类型名。
- 所有面板内容通过 `RSL.UI.openSheet(html)` 注入 `#sheet`；点击 `[data-close]` 或遮罩关闭，`Tab` 焦点陷阱，关闭后焦点回到触发按钮。
- 规则提示窗只画规则形态，不显示本关答案；`level.coach` 字段决定弹一次。
- 重放面板 `#mmRoot` 与 `.board` 同级（`.stage` 的 flex 子项），自带 `flex-direction:column`
  才能横向拉满；样式全部在 `src/mm/mm.css`，只复用 `simple.css` 的 token。
- 主题：`html[data-theme="dark"]` + `localStorage` 的 `axiom-simple:settings`。

## 6. 测试

| 命令 | 覆盖 |
| --- | --- |
| `npm test` | 65 项单测：逻辑 17、成就 4、存档 2、走线 11、关卡目录 9、mm flags 14、mm 重放 8；加上 240 关参考电路 |
| `npm run test:ui` | Edge headless 真浏览器：放置/连线/通关/拆线/拖回删除/拖放/暗色/移动端/多选 + 重放关端到端 47 checks |
| `npm run test:acceptance` | 先构建 `dist/`，再跑独立验收（脚本/样式清单按 index.html 顺序逐项核对 + dist 产物 file:// 冒烟） |
| `npm run capture:screens` | 重新采集 `screenshots/` 的文档图（`--repo`） |
| `node .research/perf.js` | 大电路（18 节点 20 边）走线与渲染耗时（开发用，`.research/` 不进仓库） |
| `node scripts/mm-verify.js` | 重放 31 个 hard label，失败给出可定位原因（CLI 报告） |

浏览器测试走 CDP；Edge 路径固定在 `tests/lib/browser.js`。无 Edge 的机器只能跑 `npm test`。
测试与脚本统一用 `scripts/lib/load-runtime.js` 在 Node 里按 `index.html` 的顺序加载经典脚本。

## 7. 已知边界

- 主游戏没有完整 set.mm 证明器，也不重证 set.mm 定理；游戏目标是 set.mm 公式。
- mm-replay 子系统**只重放 31 个 hard label 的局部证明**：引用是断言级的（不展开被引定理
  自己的证明），所以它是「按 set.mm 规则重放并校验这 31 个证明」，不是完整 set.mm 验证器
  （不校验全部 40k+ 定理，也不做完整的 DV 全量证明）。
- DV 覆盖：只检查「两个变元都在该断言 mandatory 假设里」的 $d 对，且比对的是替换后表达式
  共享变量；涉及假元变量（dummy variable）的 $d 对按 Metamath 语义忽略。
- 现有 240 关的公式比较仍用 `Logic` 的定义展开 + α 等价；`ax-rep` 的 φ 用原子 P 占位，属于简化。
- 集合论章只用 `∈` / `=` 原始语言，没有类抽象；重放关的公式是原始 token，不走 `Logic`。
- 存档版本 2；改 schema 时要同时改 `save.js` 的 `clean` 与 `README` 的说明。重放关只登记
  `solved`/`bestLen`，不写 `circuits`。
