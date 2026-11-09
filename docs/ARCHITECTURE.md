# 架构与代码地图

纯静态单页游戏：经典 `<script>`、无构建步骤、运行时不发网络请求。本文件说明新关卡体系的边界、数据流和测试。

## 1. 核心约束

- `index.html` 直接可玩（`file://`）；模块是 IIFE + `window.RSL`。
- 运行时只加载 14 个脚本（见下），没有 set.mm 重放/archive/logic 旧体系。
- 关卡内容手写在 `campaign/`，`src/levels.js` 是编译器产物。

## 2. 加载顺序

`index.html` 与 `scripts/build-toy.js` 的 `RUNTIME_JS` 必须一致：

```
term → levels → campaign-meta → modules → engine → wire → achievements → save
     → ui → audio → catalog → screens → board → main
```

| 文件 | 职责 |
| --- | --- |
| `src/term.js` | **唯一表达式核心**：canonical set.mm token（首 token 类型码）；解析/格式化、key/eq、原子代入、捕获规避变元替换、read 派生结构 |
| `src/modules.js` | **唯一模块注册表**：构造（原子/个体/谓词/∈/¬/→/∀/∃/∧/∨/↔）+ 公理 A1–A5 + 集合公理（外延/空集/配对/并集）+ 代入/分离/全称推广/全称引入/全称例化/存在推广/存在消去/等词自反/Leibniz/连接词公理形式/定理 `*NN`；完整清单以 `MODULES` 为准 |
| `src/engine.js` | **唯一求值器**：拓扑、逐节点 apply、目标精确比较、来源反作弊、定理引用越界校验 |
| `src/catalog.js` | 关卡目录：章节、band、解锁链、`palette` → 元件栏条目 |
| `src/screens.js` | 选关/帮助/成就/通关面板 |
| `src/board.js` / `src/main.js` | 棋盘交互与关卡流程（一条 `loadLevel/refresh/check/win`） |
| `src/levels.js` | 编译器产物：96 主线 + 18 教学关（`targetTokens / palette / initialNodes / solution`） |
| `campaign/` | 手写内容源：目标、顺序、提示、允许模块、参考证明项；`tutorials.json` 是教学关 |

## 3. 数据流

```
campaign/*.json + scripts/build-campaign.js
  └─ 证明项 → 棋盘电路（公式用构造模块搭、自动布局、Engine 验证）
       └─ src/levels.js
            └─ loadLevel(i) → Board.setData(initialNodes/存档) → Engine.evaluate
                 → check → win
```

- 目标比较用 `Term.eq`（canonical token；没有定义展开，因为不再有定义式模块）。
- 定理模块按关卡号查找，且引擎拒绝 `n >= 当前关卡`。
- 存档在 localStorage（版本 3 key 保留），重进关卡可恢复自己的电路。

## 4. 作者链路

- `campaign/chapter1..4.json` 是 96 主线关的内容源：目标/顺序/标题/提示手写；`campaign/tutorials.json`
  是各章教学关（小写罗马数字，不占 *NN 编号）；`campaign/index.js` 按“教学 → 普通 → 进阶”拼成完整关卡表。
  `scripts/authoring/harden-*.js` 用演绎定理引擎把个别关卡升级为组合证明（改完后必须重跑
  `build-campaign` 与测试），`make-tutorials.js` 生成教学关。
- 第Ⅰ/Ⅱ章的参考证明历史上来自 set.mm 真实证明（ax-1…ax-gen 与 a1i/mpd 等推理式引理的内联展开），
  生成工具已随旧重放体系一起移除；仓库只保留已编译好的参考证明，不再引入 archive/重放模块。
- 等词章用 Leibniz 规则（抽象/直接替换两种模式）+ 等词自反，与第Ⅰ/Ⅱ章定理组合。

## 5. 测试

| 命令 | 内容 |
| --- | --- |
| `npm test` | 114 关 schema（96 主线 + 18 教学）、模块表、参考证明逐关真实 Engine 求值、`*NN` 越界拒绝 |
| `npm run test:ui` | Edge headless：加载 114 关、选关/教学分带/合并元件、帮助/成就面板、无 JS 错误 |
| `npm run test:acceptance` | dist 清单与源码一致；正式模式 dist 加载 114 关；维护模式只发布维护页 |

## 6. 维护模式

仓库根有 `.maintenance` 时 `build-toy.js` 只产出维护页（9 个文件，不含游戏脚本）；删除标记重新构建即恢复。
