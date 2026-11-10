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
campaign/campaign2.js（有序课程 + 证明项）
  └─ scripts/build-campaign2.js（编译 + 真实 Engine 求值 + 按模块数排阶梯 + 门禁）
       └─ campaign/campaign2-levels.json
            └─ scripts/write-levels.js → src/levels.js + src/campaign-meta.js
```

- 一条命令重建：`npm run build`（= build-campaign2 && write-levels）。
- 每章：4 教学 + 10 普通（5–21 模块）+ 24 困难（≤200 模块、hint=null）；共 152 关。
- 普通关不能引用更晚的关卡；困难关可以引用前章已选关卡。
- 第Ⅰ章的 ∧/∨/↔ 规则关用原始语言证明、末尾 `def-contract` 折回表面语法。
- 第Ⅱ章含从本地 set.mm 重放导入的量词律（alim / stdpc5v 等）；第Ⅲ/Ⅳ章复用 legacy 已验证电路。
- 存档在 localStorage（版本 3 key 保留）。

## 4. 作者链路

- `campaign/campaign2.js` 是唯一课程编排入口：导入关（set.mm 重放证明，`campaign/mm/proofs/*.json`）
  与手写关（证明项）按依赖拓扑排序；`campaign/legacy-levels.json` 提供已验证的 legacy 电路
  （第Ⅱ/Ⅲ/Ⅳ章内容与第Ⅰ章基座）。
- `scripts/mm-import.js` 用本地 `assets/data/set.mm` 重放证明并导出证明 DAG（开发期工具，
  构建时不需要 set.mm）。
- `scripts/lib/mm-bridge.js` 把 set.mm 证明翻译成我们的证明项；`scripts/lib/proof-dt.js` 提供
  演绎定理工具（手写紧凑普通关用）。
- 旧的 `build-campaign.js` / `restructure-levels.js` 管线已删除。

## 5. 测试

| 命令 | 内容 |
| --- | --- |
| `npm test` | 152 关 schema（每章 4 教学 + 10 普通 + 24 困难）、模块表、参考证明逐关真实 Engine 求值、定理只引更早 |
| `npm run test:wire` | 端口布线纯函数 |
| `npm run test:leaderboard` | 排行榜分数 |
| `node tests/game-ui.js` | Edge headless：加载 152 关、选关/教学分带/帮助/提示/排行榜面板、无 JS 错误 |
| `npm run test:acceptance` | dist 清单与源码一致；dist 直接加载完整 152 关 |
| `node tests/screenshots.js` | 浅色/深色截图 |
