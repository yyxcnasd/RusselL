<div align="center">
  <img src="assets/favicon.svg" width="88" alt="公理板">
  <h1>公理板</h1>
  <p><b>把形式证明，接成一块板。</b></p>
  <p>一款基于 Metamath <code>set.mm</code> 的接线证明游戏。<br>
     每关给你一块空板、几枚公理或规则模块，以及一个要证的断言。</p>

  <p>
    <a href="https://github.com/yyxcnasd/RusselL"><img alt="源码" src="https://img.shields.io/badge/SOURCE-GitHub-24292f?style=for-the-badge"></a>
    <img alt="版本" src="https://img.shields.io/badge/VERSION-v3.0.0-3f8e65?style=for-the-badge">
    <img alt="主线关卡" src="https://img.shields.io/badge/MAIN-96-4f7fb5?style=for-the-badge">
    <img alt="教学关" src="https://img.shields.io/badge/TUTORIAL-18-d3ad68?style=for-the-badge">
    <img alt="章节" src="https://img.shields.io/badge/CHAPTERS-4-e66f3f?style=for-the-badge">
  </p>

  <p>
    <a href="#怎么玩">怎么玩</a> ·
    <a href="#关卡结构">关卡结构</a> ·
    <a href="#演算与元件">演算与元件</a> ·
    <a href="#成就存档与进度">成就与存档</a> ·
    <a href="#本地运行">本地运行</a> ·
    <a href="#开发">开发</a> ·
    <a href="#致谢">致谢</a>
  </p>
</div>

<p align="center">
  <img src="screenshots/levels.png" width="840" alt="选关界面：每章分教学、普通、进阶三段">
</p>

## 怎么玩

1. **拿模块**：从下栏把模块拖到板上。也可以点一下模块，再点画布放下。
2. **接线**：从模块右侧圆点拖到另一个模块左侧圆点；先点输出、再点输入也可以。
3. **校验**：把最终断言接到右侧的 `⊢`，点顶栏最右边的播放键。

右键删除模块或导线，触屏长按删除；把模块拖回下边栏也能删。已接线的输入端可以按住拖走拆线，拖到别的输入端重接。触屏支持双指缩放，双击空板回到适应视图。

同一类的构造元件只占一个下栏格子：原子、个体、谓词、`∀`、`∃` 都是放下来之后再从弹层里选具体取值。弹层给的是完整取值集合，不会因为本关参考证明只用了 P/Q/R 就只显示这三个。

## 关卡结构

主线 96 关，四章各 24 关；每章另有一组用**小写罗马数字**标号的教学关，共 18 关。教学关不占 `*NN` 编号，也不参与定理引用。

| 章 | 主题 | 教学 | 普通 | 进阶 |
|:---:| --- |:---:|:---:|:---:|
| Ⅰ | 命题演算：A1–A3、代入、分离 | i–v | \*01–\*12 | \*13–\*24 |
| Ⅱ | 谓词与量词：全称/存在规则、A5 | i–v | \*25–\*36 | \*37–\*48 |
| Ⅲ | 等词：等词自反、Leibniz 替换 | i–iv | \*49–\*60 | \*61–\*72 |
| Ⅳ | 集合论：∈、外延/空集/配对/并集 | i–iv | \*73–\*84 | \*85–\*96 |

教学关每关只演示一个元件，参考证明大多一步直连，最长 12 步。进入教学关时，棋盘正中会出现一张浮窗，左边是本关元件的代号，右边是规则式（例如 `A1` 与 `P→(Q→P)`）；点一下棋盘就收起。

<p align="center">
  <img src="screenshots/tutorial.png" width="760" alt="教学关浮窗：只显示元件代号与规则式">
</p>

## 演算与元件

游戏只用一套演算：经典 `<script>`、无构建步骤、运行时不发网络请求。

| 类别 | 模块 |
| --- | --- |
| 构造 | 命题原子 `P…V`，个体变元 `x…w`，谓词/等词 `F(x)`/`x=y`，属于 `x∈y`，`¬`、`→`、`∀x`、`∃x`、`∧∨↔` |
| 公理 | A1–A5（命题公理、全称消去、全称分配）；集合论：外延、空集、配对、并集 |
| 基本推理 | 代入、分离、全称推广/引入/例化、存在推广/消去、等词自反、Leibniz 等词替换，以及 ∧/∨/↔ 的引入/消去公理形式 |
| 定理 | 只有 `*NN`：只能引用编号更小的关卡，引擎会校验 |

帮助页只列推理规则（S、M、∀I、∀*、∀E*、∃I*、∃E、=I、=L），不列变元、连接词和公理。

没有 set.mm 重放关，没有 archive/引理直连，也没有 `mpbi` 这类缩写。

## 成就、存档与进度

- 20 个成就，覆盖章节进度、规则使用、短证明、干净三关和挑战段完成度。
- 存档写在浏览器 `localStorage`，也可以从帮助页导出/导入 JSON。重进已通关的关卡会恢复你自己的电路，包括接到 `⊢` 的那根终点线。
- 每关记录通关电路的模块数。选关格底部的绿条表示你离参考电路有多近，胜利面板会显示本次长度和参考长度。
- 存档结构是 v3；读取旧存档时会整理成当前字段，旧字段直接忽略。

## 本地运行

双击 `index.html` 就能玩，不需要服务器。也可以：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 维护模式

仓库根目录有 `.maintenance` 时，`node scripts/build-toy.js` 只发布维护页（`scripts/maintenance.html`），
GitHub Pages 不会发布游戏脚本。删掉标记后重新构建即可恢复。本地开发和测试不受影响，直接打开源码 `index.html` 即可。

## 开发

```bash
node scripts/build-campaign.js   # 编译 114 关（96 主线 + 18 教学），逐关用真实 Engine 验证
npm test                         # 关卡 schema、模块表、参考证明、定理引用越界
npm run test:wire               # 走线/几何纯函数
npm run test:ui                  # Edge headless 浏览器回归
npm run test:acceptance          # dist 构建产物与维护页验收
npm run build:toy                # 生成 dist/（维护模式下只有维护页）
```

关卡内容手写在 `campaign/` 下，`src/levels.js` 是编译器产物，不要手改。作者脚本在 `scripts/authoring/`：
`dt.js` 是演绎定理引擎，`harden-*.js` 负责把个别关卡升级成组合证明，`make-tutorials.js` 生成教学关。
改完关卡后重新跑 `build-campaign` 和测试。

### 主要文件

| 文件 | 作用 |
| --- | --- |
| `src/term.js` | 唯一表达式核心：canonical token、解析/格式化、代入、捕获规避变元替换 |
| `src/modules.js` | 唯一模块注册表：构造、公理、推理规则与定理 |
| `src/engine.js` | 唯一求值器：拓扑、逐节点求值、目标比较、定理引用校验 |
| `src/wire.js` | 纯几何走线：端口到端口的确定性 Z/U 线、并行车道、45° 倒角 |
| `src/board.js` | 棋盘编辑器：缩放平移、节点/导线交互、渲染 |
| `src/main.js` | 应用状态、存档、关卡流程、合并元件与配置弹层 |
| `src/ui.js` | DOM 基础件、公式显示、toast、面板与焦点管理 |
| `src/screens.js` | 选关、帮助、成就、通关面板 |
| `src/catalog.js` | 章节分组、解锁链、元件栏条目（纯函数） |
| `src/achievements.js` / `src/save.js` | 成就判定；存档结构与本地读写 |
| `campaign/` | 手写关卡、参考证明与教学关 |
| `scripts/build-campaign.js` | 关卡编译器与逐关验证 |
| `docs/` | 架构、设计、公理审计 |

界面和下栏用 IBM Plex Sans，公式用 STIX Two Text；图标来自 Heroicons。

## 致谢

- 背景音乐：YannZ 的 *lvl 3 – the grassland*，CC BY 4.0。完整署名见 [CREDITS.md](CREDITS.md)。
- `set.mm`：Metamath Proof Explorer 数据库，CC0 / public domain。
- 字体：IBM Plex Sans、STIX Two Text，SIL Open Font License。
- 图标：Heroicons，MIT License。
- Designed by yyxcnasd。本作不是 Metamath 官方产品。
