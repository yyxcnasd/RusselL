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
logic → archive → library → levels → levels-generated → engine → route
      → achievements → save → ui → audio → coach → catalog → screens
      → board → main
```

| 文件 | 命名空间 | 职责 | 依赖 |
| --- | --- | --- | --- |
| `src/logic.js` | `RSL.Logic` | 公式 AST、解析/格式化、展开、代入、定义置换、分离、匹配。纯函数 | 无 |
| `src/archive.js` | `RSL.ARCHIVE` | set.mm 档案条目（生成） | 无 |
| `src/library.js` | `RSL.AXIOMS` / `DEFINITIONS` / `PARTS` / `CHAPTERS` | 20 条公理、4 个定义、调色板条目、章节元数据 | 无 |
| `src/levels.js` | `RSL.LEVELS` | 手工关（含参考电路） | 无 |
| `src/levels-generated.js` | `RSL.LEVELS` | 生成关（生成） | 无 |
| `src/engine.js` | `RSL.Engine` | 模块元数据 + 电路拓扑求值 + 反作弊（目标上游必须有来源） | Logic |
| `src/route.js` | `RSL.Route` | 纯几何：A* 走线、正交化、45° 倒角、线段避障。无 DOM | 无 |
| `src/achievements.js` | `RSL.Achievements` | 20 个成就定义与纯条件判定 | 无 |
| `src/save.js` | `RSL.Save` | 存档 schema（版本 2）：清洗、payload、localStorage 读写 | 无 |
| `src/ui.js` | `RSL.UI` | 元素表、全括号公式 HTML、toast、面板生命周期/滚动条/焦点陷阱、彩带 | Logic |
| `src/audio.js` | `RSL.Audio` | 首次交互后解锁的 BGM 与音效 | 无 |
| `src/coach.js` | `RSL.Coach` | 规则提示窗（输入→模块→输出示意） | UI、Audio |
| `src/catalog.js` | `RSL.Catalog` | 关卡目录派生：章节分组、关号排序、解锁链、调色板解析。纯函数 | Logic |
| `src/screens.js` | `RSL.Screens` | 选关/帮助/成就/通关面板的 HTML 与面板内交互 | UI、Catalog、Achievements、Audio |
| `src/board.js` | `RSL.Board` | DOM 图编辑器：视图变换、节点/导线交互、框选、长按删除、渲染与走线调用 | Engine、Route、UI |
| `src/main.js` | `RSL.APP` | 应用状态、存档、主题/声音、关卡流程、调色板拖放、参数弹层、全局事件、启动 | 以上全部 |

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

## 4. 关卡与内容生成

```
research/setmm-data.json (+ setmm-set-extra.json)
  └─ scripts/gen-levels.js → src/archive.js（993 条）
                           → src/levels-generated.js（每章 48 关）
       └─ tests/levels.test.js 逐关用真实引擎求值参考电路
```

改生成器后：`node scripts/gen-levels.js`，然后 `git diff src/archive.js src/levels-generated.js` 应为你预期的变化（纯重构应为空）。
`src/levels.js` 是手工关，可直接改；四章各 12 关手工 + 48 关生成。

## 5. 视觉与交互约定

- 节点宽 232px（`CSS .node width` 与 `Board` 常量一致）、目标焊盘 160px；拖动吸附 16px 网格。
- 端口类型 `formula` / `assertion` / `atom` 决定颜色与可否连接；CSS 与 `Board.connect` 共用类型名。
- 所有面板内容通过 `RSL.UI.openSheet(html)` 注入 `#sheet`；点击 `[data-close]` 或遮罩关闭，`Tab` 焦点陷阱，关闭后焦点回到触发按钮。
- 规则提示窗只画规则形态，不显示本关答案；`level.coach` 字段决定弹一次。
- 主题：`html[data-theme="dark"]` + `localStorage` 的 `axiom-simple:settings`。

## 6. 测试

| 命令 | 覆盖 |
| --- | --- |
| `npm test` | 41 项单测：逻辑 17、成就 4、存档 2、走线 10、关卡目录 8；加上 240 关参考电路 |
| `npm run test:ui` | Edge headless 真浏览器：放置/连线/通关/拖放/暗色/移动端/多选等 |
| `npm run test:acceptance` | 先构建 `dist/`，再跑独立验收（含 dist 产物 file:// 冒烟与清单核对） |
| `npm run capture:screens` | 重新采集 `screenshots/` 的 12 张文档图（`--repo`） |
| `node .research/perf.js` | 大电路（18 节点 20 边）走线与渲染耗时（开发用，`.research/` 不进仓库） |

浏览器测试走 CDP；Edge 路径固定在 `tests/lib/browser.js`。无 Edge 的机器只能跑 `npm test`。
测试与脚本统一用 `scripts/lib/load-runtime.js` 在 Node 里按 `index.html` 的顺序加载经典脚本。

## 7. 已知边界

- 没有完整 set.mm 证明器，也不重证 set.mm 定理；目标是 set.mm 公式。
- DV（distinct variable）条件没有完整检查，`ax-5` 等的限制写在注记里。
- `ax-rep` 的 φ 用原子 P 占位，属于简化。
- 集合论章只用 `∈` / `=` 原始语言，没有类抽象。
- 存档版本 2；改 schema 时要同时改 `save.js` 的 `clean` 与 `README` 的说明。
