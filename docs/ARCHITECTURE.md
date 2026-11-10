# 架构与代码地图

纯静态单页游戏：经典 `<script>`、无构建步骤、运行时不发网络请求。本文件说明新关卡体系的边界、数据流和测试。

## 1. 核心约束

- `index.html` 直接可玩（`file://`）；模块是 IIFE + `window.RSL`。
- 运行时只加载 17 个脚本（见下），没有 set.mm 重放/archive/logic 旧体系。
- 关卡内容手写在 `campaign/`，`src/levels.js` 是编译器产物。
- `∧ / ∨ / ↔` 是表面语法：显示照旧，比较/定理引用/参考解验证前统一按定义展开；`∃` 也按 `¬∀¬` 参与定义展开。定义入口只有 `D / D⁻` 两个模块，**不再有** 6 个 `*-ax` 派生公理模块。

## 2. 加载顺序

`index.html` 与 `scripts/build-toy.js` 的 `RUNTIME_JS` 必须一致：

```
term → levels → campaign-meta → modules → engine → wire → achievements → save
     → hints → cloudsave → leaderboard → ui → audio → catalog → screens → board → main
```

| 文件 | 职责 |
| --- | --- |
| `src/term.js` | **唯一表达式核心**：canonical set.mm token（首 token 类型码）；解析/格式化、key/eq（定义展开 + α 规范化）、原子代入、捕获规避变元替换、read 派生结构，以及 `expandDefinitions` / `contractDefinitions`（`D` 的公开接口） |
| `src/modules.js` | **唯一模块注册表**：构造（原子/个体/谓词/∈/¬/→/∀/∃/∧/∨/↔）+ 公理 A1–A5 + 集合公理（外延/空集/配对/并集）+ 代入/分离/全称推广/全称引入/全称例化/存在推广/存在消去/等词自反/Leibniz + **D 定义展开 / D⁻ 定义收缩**（断言→断言，`construct:false`）+ 定理 `theorem`（只引用更早关卡）；完整清单以 `MODULES` 为准。∧/∨/↔ 的引入/消去不再是模块，而是第Ⅰ章 Ⅰ-11…Ⅰ-19 的引理关 |
| `src/engine.js` | **唯一求值器**：拓扑、逐节点 apply、目标精确比较（`Term.eq`，定义展开后比较）、来源反作弊、定理引用越界校验 |
| `src/catalog.js` | 关卡目录：章节、band（tutorial/base/lemma/challenge）、解锁链、`palette` → 元件栏条目 |
| `src/screens.js` | 选关/帮助/提示/成就/通关面板；选关页第Ⅰ章会多出 `.band.lemma` 一行 |
| `src/hints.js` | 三页提示：方向 / 思路 / 参考接线；Toy 内按点赞视频与关注状态解锁 |
| `src/cloudsave.js` | Toy 云存档：按账号分片写入、自动同步；网页版仍用 localStorage |
| `src/leaderboard.js` | Toy 排行榜：通关数优先 + 模块效率加权的单整数分数、提交与榜单读取 |
| `src/board.js` / `src/main.js` | 棋盘交互与关卡流程（一条 `loadLevel/refresh/check/win`） |
| `src/levels.js` | 重组产物：每章 10 普通 + 24 困难，第Ⅰ章另有 9 引理关；另 21 教学关；共 **166** 关，关卡号 `Ⅰ-01` 形式 |
| `campaign/` | 手写内容源：目标、顺序、提示、允许模块、参考证明项；`tutorials.json` 是已有教学关，`lemma-levels.json` 是 9 个引理关 |

## 3. 数据流

```
campaign/*.json + scripts/build-campaign.js / scripts/restructure-levels.js
  └─ 证明项 → 棋盘电路（公式用构造模块搭、自动布局、Engine 验证）
       └─ src/levels.js
            └─ loadLevel(i) → Board.setData(initialNodes/存档) → Engine.evaluate
                 → check → win
```

- 目标比较用 `Term.eq`：定义展开（∧/∨/↔/∃ → 只用 ¬/→/∀）+ α 规范化后比较；**显示**仍用 `Term.fmt/toHTML` 的表面语法，所以 `∧/∨/↔` 不会在棋盘上被拆成原始公式。
- `D`（def-expand）把断言重写成原始公式，`D⁻`（def-contract）折叠回表面语法；两者只重写公式、需要 `⊢` 输入，不能凭空产生结论。引理关的参考解统一是“原始语言证明 → def-contract → 目标焊盘”。
- 证明编译先做结构哈希共享，再按“输出断言相同”合并证明节点，并清掉因此失效的构造支路；空 S 代换直接短路，S 的引脚组按实际代入组生成；原子 P/Q/R 与所有 wff 构造节点按 canonical token 全局共享；输出命中前面关卡目标的子证明改为直接引用该关定理。所有关卡参考解仍逐关经过真实 Engine 求值。
- 定理模块按关卡号查找，且引擎拒绝 `index >= 当前关卡`（只能引用数组里更早的关卡，教学关同样适用）。
- 存档在 localStorage（版本 3 key 保留），重进关卡可恢复自己的电路。
- B 站 Toy 版在 localStorage 之外把精简存档分片写入 Toy 云存储；网页版/本地不加载 SDK，仍只读本地存档。

## 4. 作者链路

- `campaign/legacy-levels.json` 保留原 114 关素材；`scripts/migrate-derived-modules.js`（幂等）把其中的
  6 个派生公理节点改写成 `theorem{引理关} → subst`；`scripts/restructure-levels.js` 生成第Ⅰ章
  10 普通 + 9 引理 + 24 困难与其它章的 10 普通 + 24 困难；`campaign/tutorials.json`
  是已有教学关，另有 3 个 D 定义 / 原始语法 / 引用已证定理的教学关由 restructure 生成。
  困难关可使用前面编号关的定理，引用形如 `Ⅰ-13`。
  `scripts/authoring/harden-*.js` 用演绎定理引擎把个别关卡升级为组合证明（改完后必须重跑
  `build-campaign` 与测试），`make-tutorials.js` 生成教学关。
- 第Ⅰ/Ⅱ章的参考证明历史上来自 set.mm 真实证明（ax-1…ax-gen 与 a1i/mpd 等推理式引理的内联展开），
  生成工具已随旧重放体系一起移除；仓库只保留已编译好的参考证明，不再引入 archive/重放模块。
- 第Ⅰ章的 9 个引理关（析取引入左/右、合取引入、合取消去左/右、析取消去、等值引入、等值消去左/右）
  的参考解只用 A1–A3 + S/M + 更早引理关 theorem + def-contract，禁止任何已删除的派生公理。
- 等词章用 Leibniz 规则（抽象/直接替换两种模式）+ 等词自反，与第Ⅰ/Ⅱ章定理组合。

## 5. 测试

| 命令 | 内容 |
| --- | --- |
| `npm test` | 166 关 schema（40 普通 + 9 引理 + 96 困难 + 21 教学）、模块表（无 6 个派生公理、有 D）、定理引用只指向更早关卡、参考证明逐关真实 Engine 求值、编号越界拒绝 |
| `npm run test:wire` | 端口布线纯函数：直线、障碍绕行、近端口、并行车道 |
| `npm run test:leaderboard` | 排行榜分数：通关数优先、效率次之，落在 Toy 分数范围 |
| `npm run test:ui` | Edge headless：加载 166 关、选关/教学分带/第Ⅰ章引理分带、点击引理关加载、合并元件、帮助/提示/排行榜面板、无 JS 错误 |
| `npm run test:acceptance` | dist 清单与源码一致；dist 直接加载完整 166 关 |
| `node tests/screenshots.js` | 深色模式截图：`screenshots/*-dark.png`（选关/教学/引理/普通关/帮助） |
