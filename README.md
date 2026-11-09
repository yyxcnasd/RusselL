# 公理板 · AXIOM BOARD

一个纯静态的逻辑证明游戏：不用打字、靠拖线搭证明。**96 主线关 + 19 教学关**：四章 × 24 主线，
每章先放小写罗马数字的教学关（不计入 *NN 编号），再分普通（*01–*12）与进阶（*13–*24）。

- **第Ⅰ章 命题演算**：A1/A2/A3 + 分离，从同一律走到皮尔士律。
- **第Ⅱ章 谓词与量词**：全称推广 / 引入 / 例化（A4/A5），证明量词定理。
- **第Ⅲ章 等词**：等词自反与 Leibniz 替换，做对称、传递、同余。
- **第Ⅳ章 集合论**：∈、外延/空集/配对/并集，等词替换进入集合关系。

## 只保留一套演算

| 类别 | 模块 |
| --- | --- |
| 构造 | 原子 `P…V`（7 个），个体变元 `x/y/z/u/v/w`，谓词/等词 `F(x)`/`x=y`，`x∈y`，`¬`，`→`，`∀x`，`∃x`，`∧∨↔`；托盘里同类构造合并成一个元件，变体在节点弹层里选 |
| 公理（1 个模块） | A1–A5（命题公理 + ∀ 消去 + ∀ 分配）；集合论：外延/空集/配对/并集 |
| 基本推理 | 代入、分离、全称推广/引入/例化、存在推广/消去、等词自反、Leibniz 等词替换、∧/∨/↔ 规则 |
| 定理 | 只有 `*NN`：只能引用编号更小的关卡，引擎强制校验，保证都已证 |

没有 set.mm 重放关，没有 archive/引理直连，没有 `mpbi` 这类缩写。∧∨↔∃ 也不再是模块。

## 玩

双击 `index.html` 即可（`file://`，无需服务器）。从元件栏拖（或点）模块到棋盘，连端口，接上 ⊢ 通关。
参考证明会显示在通关面板的“模块数 / 参考”里；存档在浏览器 localStorage。

## 作者链路

- `campaign/chapter1..4.json`：手写的 96 主线关卡（顺序、目标、标题、提示与参考证明项）；
- `campaign/tutorials.json`：教学关（小写罗马数字，不占编号；由 `make-tutorials.js` 生成）；
- `campaign/index.js`：章节与关卡顺序，按“教学 → 普通 → 进阶”拼出完整关卡表；
- `scripts/build-campaign.js`：把证明项展开成棋盘电路、自动布局，并用真实 `Engine` 逐关验证；
- `scripts/authoring/`：`dt.js` 是演绎定理引擎，`harden-*.js` 用它把个别关卡升级为组合证明，
  `make-tutorials.js` 生成教学关。第Ⅰ/Ⅱ章参考证明是 set.mm 真实证明的历史编译产物
  （推理式引理已内联到 A1–A5 + 分离 + 全称规则），旧的重放/挖掘工具不再随仓库提供。

改完关卡后：

```bash
node scripts/build-campaign.js     # 生成 src/levels.js，并验证 115 关
npm test                           # 参考证明 + 模块表 + 关卡 schema
npm run test:route                 # 路线/解锁纯函数
npm run test:ui                    # 浏览器端到端（教学/选关/帮助/成就/合并元件）
npm run test:acceptance            # dist 构建产物 + 正式页/维护页
```

## 维护模式

仓库根有 `.maintenance` 时，`node scripts/build-toy.js` 只发布维护页（`scripts/maintenance.html`），
GitHub Pages 不会发布游戏脚本；删掉标记后重新推送即可恢复。本地开发/测试仍直接打开源码 `index.html`。

## 目录

```
src/term.js       唯一表达式核心（canonical token）
src/modules.js    唯一模块注册表
src/engine.js     唯一求值器
src/levels.js     生成产物（115 关棋盘数据，勿手改）
src/campaign-meta.js 章节元数据
src/{ui,screens,board,main}.js  UI 与棋盘
campaign/         手写关卡与参考证明（内容源；tutorials.json 是教学关）
scripts/build-campaign.js       关卡编译器
scripts/authoring/              演绎定理/加难/教学关生成脚本（仅作者用）
```

Design by yyxcnasd. 音乐 “lvl 3 - the grassland” by YannZ, CC BY 4.0（见 `CREDITS.md`）。
