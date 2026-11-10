# 架构与代码地图

纯静态单页游戏：经典 `<script>`、无构建步骤、运行时不发网络请求。本文件说明新关卡体系的边界、数据流和测试。

## 1. 核心约束

- `index.html` 直接可玩（`file://`）；模块是 IIFE + `window.RSL`。
- 运行时只加载 18 个脚本（见下），没有 set.mm 重放/archive/logic 旧体系。
- 关卡内容手写在 `campaign/`，`src/levels.js` 是编译器产物。
- `∧ / ∨ / ↔` 是表面语法：显示照旧，比较/定理引用/参考解验证前统一按定义展开；`∃` 也按 `¬∀¬` 参与定义展开。定义入口只有 `D / D⁻` 两个模块，**不再有** 6 个 `*-ax` 派生公理模块。

## 2. 加载顺序

`index.html` 与 `scripts/build-toy.js` 的 `RUNTIME_JS` 必须一致：

```
term → levels → campaign-meta → modules → engine → wire → achievements
     → legacy-targets → save → hints → cloudsave → leaderboard → ui → audio
     → catalog → screens → board → main
```

| 文件 | 职责 |
| --- | --- |
| `src/term.js` | **唯一表达式核心**：canonical set.mm token（首 token 类型码）；解析/格式化、key/eq（定义展开 + α 规范化）、原子代入、捕获规避变元替换、read 派生结构，以及 `expandDefinitions` / `contractDefinitions`（`D` 的公开接口） |
| `src/modules.js` | **唯一模块注册表**。主线只用构造（原子/¬/→/∧/∨/↔）、A1–A3、S/M、**D 定义展开 / D⁻ 定义收缩**、定理 `theorem`；引擎仍保留谓词/等词/集合模块，供归档版本与未来扩展使用，但主线关卡不出现 |
| `src/engine.js` | **唯一求值器**：拓扑、逐节点 apply、目标精确比较（`Term.eq`，定义展开后比较）、来源反作弊、定理引用越界校验 |
| `src/catalog.js` | 关卡目录：单章顺序、band（tutorial/base/challenge）、解锁链、`palette` → 元件栏条目 |
| `src/screens.js` | 选关/帮助/提示/成就/通关面板；选关页只有教学/普通/困难三条带 |
| `src/hints.js` | 三页提示：方向 / 思路 / 参考接线；Toy 内按点赞视频与关注状态解锁 |
| `src/cloudsave.js` | Toy 云存档：按账号分片写入、自动同步；网页版仍用 localStorage |
| `src/leaderboard.js` | Toy 排行榜：通关数优先 + 模块效率加权的单整数分数、提交与榜单读取 |
| `src/board.js` / `src/main.js` | 棋盘交互与关卡流程（一条 `loadLevel/refresh/check/win`） |
| `src/levels.js` | 编译器产物：8 教学 + 32 普通 + 56 困难，共 **96** 关；教学号 i–viii，编号关 01–88 |
| `campaign/` | 内容源：`campaign2.js` 是唯一编排入口；`mm/proofs/` 是 set.mm 证明 DAG；旧 152/166 关素材保留供对照 |

## 3. 数据流

```
campaign/campaign2.js（set.mm 定理 + 手写关 + 教学关）
  └─ scripts/build-campaign2.js（编译 + 去重 + 中间结论 + 按模块数排阶梯 + 门禁）
       └─ campaign/campaign2-levels.json
            └─ scripts/write-levels.js → src/levels.js + src/campaign-meta.js
```

- 一条命令重建：`npm run build`（= build-campaign2 && write-levels）。
- 单章：8 教学 + 32 普通（5–21 模块）+ 56 困难（22–200 模块、hint=null）；共 96 关。
- 普通关不能引用更晚的关卡；困难关可以引用更早关卡。
- ∧/∨/↔ 规则关用真实证明内联；定义展开/收缩用 D/D⁻。
- 49 条 set.mm 命题定理导入；大证明的中间结论按模块数拆成普通/困难关。
- 存档在 localStorage（v4，带 campaign 指纹；旧档按目标公式迁移）。

## 4. 作者链路

- `campaign/campaign2.js` 是唯一课程编排入口：set.mm 导入关、手写 ∧/∨/↔ 关与 5 个 legacy 电路。
- `scripts/lib/circuit-dedupe.js` 合并参考解里断言完全相同的节点（含 theorem 占位符），构建器每关都调用。
- `scripts/mm-import.js` 用本地 `assets/data/set.mm` 重放证明并导出证明 DAG（开发期工具，
  构建时不需要 set.mm）。
- `scripts/lib/mm-bridge.js` 把 set.mm 证明翻译成我们的证明项；只把目标里出现的变元传给 theorem 代入。
- `scripts/lib/proof-dt.js` 是演绎定理工具（当前不用于主线，DT 证明项容易指数膨胀）。
- 旧的 `build-campaign.js` / `restructure-levels.js` 管线已删除；旧四章内容在 `archive/predicate-set/`。

## 5. 测试

| 命令 | 内容 |
| --- | --- |
| `npm test` | 96 关 schema（8 教学 + 32 普通 + 56 困难）、目标不重复、参考证明逐关真实 Engine 求值、定理只引更早 |
| `npm run test:wire` | 端口布线纯函数 |
| `npm run test:leaderboard` | 排行榜分数 |
| `node tests/game-ui.js` | Edge headless：加载 96 关、三条分带/帮助/提示/排行榜面板、无 JS 错误 |
| `npm run test:acceptance` | dist 清单与源码一致；dist 直接加载完整 96 关 |
| `node tests/screenshots.js` | 浅色/深色截图 |
| `npm run test:save` | v1–v3 存档迁移、campaign 指纹、云存档合并 |
| `npm run test:dedupe` | 参考解同断言节点合并、环安全、真实关卡回归 |
