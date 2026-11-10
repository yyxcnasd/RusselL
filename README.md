<div align="center">
  <img src="assets/favicon.svg" width="88" alt="公理板">
  <h1>RussuelL · 公理板</h1>
  <p><b>把形式证明，接成一块板。</b></p>
  <p>一款基于 Metamath <code>set.mm</code> 的接线证明游戏。<br>
     每关给你一块空板、几枚公理或规则模块，以及一个要证的断言。</p>

  <p>
    <a href="https://github.com/yyxcnasd/RusselL"><img alt="源码" src="https://img.shields.io/badge/SOURCE-GitHub-24292f?style=for-the-badge"></a>
    <a href="https://yyxcnasd.github.io/RusselL/"><img alt="网页版" src="https://img.shields.io/badge/PLAY-GitHub%20Pages-3f8e65?style=for-the-badge"></a>
    <img alt="B站 Toy" src="https://img.shields.io/badge/BILIBILI-Toy-e66f3f?style=for-the-badge">
    <img alt="版本" src="https://img.shields.io/badge/VERSION-v4.0.0-3f8e65?style=for-the-badge">
    <img alt="编号关卡" src="https://img.shields.io/badge/LEVELS-100-4f7fb5?style=for-the-badge">
    <img alt="教学关" src="https://img.shields.io/badge/TUTORIAL-8-d3ad68?style=for-the-badge">
    <img alt="魔王关" src="https://img.shields.io/badge/DEMON-10-8e2f2f?style=for-the-badge">
  </p>

  <p>
    <a href="#两个版本">两个版本</a> ·
    <a href="#怎么玩">怎么玩</a> ·
    <a href="#提示">提示</a> ·
    <a href="#排行榜">排行榜</a> ·
    <a href="#关卡结构">关卡结构</a> ·
    <a href="#演算与元件">演算与元件</a> ·
    <a href="#成就存档与进度">成就与存档</a> ·
    <a href="#本地运行">本地运行</a> ·
    <a href="#开发">开发</a> ·
    <a href="#致谢">致谢</a>
  </p>
</div>

<p align="center">
  <img src="screenshots/levels.png" width="840" alt="选关界面：单章命题演算，教学、普通、困难三条分带">
</p>

## 两个版本

**GitHub Pages** 是网页版：[yyxcnasd.github.io/RusselL](https://yyxcnasd.github.io/RusselL/)。打开就能玩，存档留在浏览器本地，也可以从帮助页导出/导入 JSON。

**Bilibili Toy** 是站内版，slug 为 `RusselL`。关卡、规则和成绩与网页版一致；Toy 版把存档自动写到当前 B 站账号的云存储，帮助页不再显示上传/下载按钮。提示功能需要关注 UP 主，详见下一节。上线地址是 `https://www.bilibili.com/toy/RusselL/index.html`（审核通过后可用）。

<p align="center">
  <img src="release/toy-poster.png" width="720" alt="RussuelL · 公理板 Toy 封面">
</p>

## 怎么玩

1. **拿模块**：从下栏把模块拖到板上。也可以点一下模块，再点画布放下。
2. **接线**：从模块右侧圆点拖到另一个模块左侧圆点；先点输出、再点输入也可以。
3. **校验**：把最终断言接到右侧的 `⊢`，点顶栏最右边的播放键。

右键删除模块或导线；把模块拖回下边栏也能删。已接线的输入端可以按住拖走拆线，拖到别的输入端重接。触屏支持双指缩放，双击空板回到适应视图。卡住时也可以看 [docs/SOLUTIONS.md](docs/SOLUTIONS.md)：108 关逐关列出参考电路的模块与接线。

框选多个模块后，直接拖其中任意一个就能整体移动，不用再按 Shift。`Ctrl/Cmd+C` 复制选中模块和它们之间的线，`Ctrl/Cmd+V` 粘贴成跟随鼠标的磁吸贴；左键放下。目标位置放不下时会留在鼠标上，不会把模块挪到别处。跨关粘贴只保留当前关允许使用的元件。

同类构造元件只占一个下栏格子：原子命题和代入是放下来之后再从弹层里选具体取值。弹层给的是完整取值集合，不会因为本关参考证明只用了 P/Q/R 就只显示这三个。

## 提示

顶栏灯泡打开三页提示，可左右翻页：

1. **方向**：自动解锁，一句话说明往哪想。
2. **思路**：点赞视频 [BV1pk4J68Egx](https://www.bilibili.com/video/BV1pk4J68Egx) 后解锁，说明大致构造。
3. **接线**：关注 UP 主「夜与星尘_NaSd」后解锁，列出参考解的模块与接线。

Toy 预览页和作者本人直接看三页。GitHub Pages / 本地不显示提示按钮。

## 排行榜

B 站 Toy 版有排行榜入口，和帮助、提示按钮并排在顶栏。GitHub Pages / 本地没有 Toy 的登录态，不显示这个入口。

分数把「通过关数」放在第一关键字：`通关数 × 100000 + 效率分`。效率分按参考解的模块数加权统计，每关取 `min(1, 参考模块数 / 你的模块数)`，再乘以该关参考模块数求和，最后归一化到 0–99000。你用的模块越少，效率分越高；优于参考解也只计满。这样同样通关数下继续比模块效率，而多通过一关永远优先于任何效率差距。

通关时自动提交成绩；榜单显示前 20 名和我的名次。排行榜数据由 Toy 平台按账号保存，换设备登录同一账号也能看到。

## 关卡结构

共 **108 关**：**8 个教学关**（i–viii）+ **100 个编号关**（00–99）。只有一条课程线，不再分章节。

| 编号 | 数量 | 参考解模块数 | 说明 |
| --- | ---: | ---: | --- |
| 00–19 | 20 | 10–30 | 普通关，必须用推理规则，有定制提示 |
| 20–89 | 70 | 25–100 | 困难关，不提供提示，可引用更早定理 |
| 90–99 | 10 | 70–500 | 魔王关，长证明与复杂目标 |

普通/困难/魔王段内按模块数从短到长排序；局部倒挂只来自定理依赖。教学关显示小写罗马数字，编号关从 00 连续到 99。

内容以 set.mm 的命题演算定理为主：49 条定理的证明 DAG 经 `scripts/mm-import.js` 重放、`scripts/lib/mm-bridge.js` 翻译，再按 mergeAll 压缩后的真实模块数排成阶梯；大证明里的关键中间结论会单独成关，标题注明它属于哪条定理。∧/∨/↔ 由定义展开/收缩（D/D⁻）处理，规则关由真实证明内联成困难/魔王关。

谓词、等词、集合论三章已整体移出主线，冻结在 [archive/predicate-set](archive/predicate-set/README.md)（tag `archive/predicate-set-v1`），见 [docs/ARCHIVE-PREDICATE-SET.md](docs/ARCHIVE-PREDICATE-SET.md)。单章设计、构建管线与限制见 [docs/SINGLE-CHAPTER.md](docs/SINGLE-CHAPTER.md)。

<p align="center">
  <img src="screenshots/tutorial.png" width="760" alt="教学关浮窗：只显示元件代号与规则式">
</p>

## 演算与元件

游戏只用一套演算：经典 `<script>`、无构建步骤、运行时不发网络请求。

| 类别 | 模块 |
| --- | --- |
| 构造 | 命题原子 `P…V`，`¬`、`→`、`∧∨↔`（`∧/∨/↔` 是表面语法，比较时按定义展开） |
| 公理 | A1、A2、A3 |
| 定义重写 | `D` 定义展开 / `D⁻` 定义收缩；选中节点后在弹层里逐处选择要重写的定义，`all` 处理全部 |
| 基本推理 | 代入 `S`、分离 `M` |
| 定理 | 关卡编号（如 `00`、`35`、`96`）：只能引用排在前面的关卡，引擎会校验 |

帮助页只列 S、M、D、D⁻ 四张图例（D/D⁻ 都是单向重写，用 `⇛`），不列 A1–A3、变元或连接词。

## 成就、存档与进度

- 20 个成就，重点覆盖困难 25/50/全通与魔王 1/5/全通，另有规则使用、干净困难、魔王效率与全干净。
- **GitHub Pages / 本地**：存档写在浏览器 `localStorage`，可以从帮助页导出/导入 JSON。
- **Bilibili Toy**：自动同步到当前 B 站账号的云存储，保存通关进度和当前关卡电路；帮助页不显示上传/下载存档的按钮。
- 重进已通关的关卡会恢复你自己的电路，包括接到 `⊢` 的那根终点线。
- 每关记录通关电路的模块数。选关格底部的绿条表示你离参考电路有多近，胜利面板会显示本次长度和参考长度。
- 存档结构是 v4，带当前关卡集的指纹。旧 v1–v3 存档会按**目标公式**迁移：目标没变的关卡保留进度与最佳模块数，旧电路丢弃；迁移前备份到 `axiom-simple:pre-v4`，读档后提示保留/移除了多少关。

## 亮点（Toy 版）

- **三页提示**：方向、思路、完整接线；Toy 内按点赞视频 / 关注 UP 主逐页解锁，预览页和作者可直接看全。
- **排行榜**：通关数优先、模块效率加权；同样通关数下，模块越少排名越高。
- **云存档**：按 B 站账号自动同步，换设备登录同一账号继续玩；旧存档按目标公式迁移并备份。
- **一条可玩的证明阶梯**：108 关从 A1 起步，到 100 个编号关的 70 个困难关和 10 个魔王关；D/D⁻ 可逐处选择要重写的定义。
- **干净的界面**：单章、四条分带、小写罗马教学编号、English-only 参考解文字。

## 本地运行

双击 `index.html` 就能玩，不需要服务器。也可以：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。


## 开发

```bash
npm run build                   # 生成 108 关数据（8 教学 + 20 普通 + 70 困难 + 10 魔王），逐关用真实 Engine 验证
npm test                         # 108 关 schema、参考证明、目标不重复、定理引用越界
npm run test:wire                # 走线/几何纯函数
npm run test:leaderboard         # 排行榜分数算法
npm run test:ui                  # Edge headless 浏览器回归（108 关、四条分带、D 选择器）
npm run test:acceptance          # dist 构建产物与完整 108 关验收
npm run build:toy                # 生成可发布的 dist/ 游戏本体
node scripts/export-solutions.js # 重新生成 docs/SOLUTIONS.md（108 关、English-only 参考解）
node tests/screenshots.js        # 重拍 screenshots/ 浅色与深色验收图
```

关卡内容手写在 `campaign/campaign2.js`，`src/levels.js` 是编译器产物，不要手改。`npm run build` 会编译证明、用 `scripts/lib/circuit-dedupe.js` 的 mergeAll 合并全部同 token 节点、提取中间结论、按目标去重、排序并跑门禁。set.mm 证明导入与翻译在 `scripts/mm-import.js`、`scripts/lib/mm-bridge.js`；旧的 166/152 关素材与四章源文件在 `archive/predicate-set/campaign-sources/`。

### 主要文件

| 文件 | 作用 |
| --- | --- |
| `src/term.js` | 唯一表达式核心：canonical token、解析/格式化、代入、捕获规避变元替换 |
| `src/modules.js` | 唯一模块注册表：构造、公理、推理规则、D 定义重写与定理 |
| `src/engine.js` | 唯一求值器：拓扑、逐节点求值、目标比较、定理引用校验 |
| `src/wire.js` | 纯几何走线：端口到端口的确定性 Z/U 线、并行车道、45° 倒角 |
| `src/hints.js` | 逐关提示文字、Toy 关注状态检查与关注入口 |
| `src/cloudsave.js` | Toy 云存档：分片读写、自动同步；网页版本地存档 |
| `src/leaderboard.js` | Toy 排行榜：通关数优先、模块效率加权的分数与榜单 |
| `src/board.js` | 棋盘编辑器：缩放平移、节点/导线交互、渲染 |
| `src/main.js` | 应用状态、存档、关卡流程、合并元件与配置弹层 |
| `src/ui.js` | DOM 基础件、公式显示、toast、面板与焦点管理 |
| `src/screens.js` | 选关、帮助、提示、成就、通关面板 |
| `src/catalog.js` | 关卡顺序、解锁链、元件栏条目（纯函数） |
| `src/achievements.js` / `src/save.js` | 成就判定；存档结构与本地读写 |
| `campaign/` | 当前 108 关内容源（`campaign2.js`）、set.mm 证明 DAG 与 5 个 legacy 电路 |
| `scripts/build-campaign2.js` | 108 关编译器：证明→电路、mergeAll 去重、中间结论、魔王拆分、排序与门禁 |
| `archive/predicate-set/` | 冻结的谓词/等词/集合论四章版本、关卡切片与还原说明 |
| `docs/` | 架构、设计、公理审计 |

界面和下栏用 IBM Plex Sans，公式用 STIX Two Text；图标来自 Heroicons。

## 致谢

- 背景音乐：YannZ 的 *lvl 3 – the grassland*，CC BY 4.0。完整署名见 [CREDITS.md](CREDITS.md)。
- `set.mm`：Metamath Proof Explorer 数据库，CC0 / public domain。
- 字体：IBM Plex Sans、STIX Two Text，SIL Open Font License。
- 图标：Heroicons，MIT License。
- Designed by yyxcnasd。本作不是 Metamath 官方产品。
