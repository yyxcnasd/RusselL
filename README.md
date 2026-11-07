# 公理板

[在线玩](https://yyxcnasd.github.io/RusselL/) · [源码](https://github.com/yyxcnasd/RusselL)

一款接线的证明游戏。每关给你一块空板、几枚公理或规则模块，还有一个要证的断言。把模块放到板上，用铜线接到 ⊢，校验通过就过关。

![工作台](screenshots/01-game.png)

## 怎么玩

- 点底部的模块，它会落到板上；点模块可以改参数。
- 从模块右边的圆点拖到另一个模块左边的圆点。也可以先点输出、再点输入。
- 顶部是要证的断言。把最终断言接到右侧的 ⊢，然后点顶栏最右边的播放键。
- 右键删除模块或线；触屏长按删除。
- 左上角的数字打开选关。进度、每关最短推理长度和成就都存在本地。

第一次打开第一关时，板中央会出现 `A1 → ⊢` 的提示；之后遇到新规则，会弹出一个小图形窗口，只画“输入 → 模块 → 输出”，不显示本关答案，点一下关掉。

## 关卡

一共 240 关，分四章。每章 60 关，再分成两段：

| 章 | 主题 | 基础 | 挑战 |
| --- | --- | --- | --- |
| Ⅰ | 命题演算：ax-1–ax-3 与早期命题定理 | 30 | 30 |
| Ⅱ | 谓词演算：ax-4、ax-5、ax-10、ax-11 | 30 | 30 |
| Ⅲ | 等词：ax-6–ax-9、ax-12、ax-13 | 30 | 30 |
| Ⅳ | 集合论：ZFC 七条公理 | 30 | 30 |

- **基础段**顺序解锁，以概念关和单一操作为主：认识档案、做一次代入、做一次闭包或定义置换。打通基础段最后一关，就会解锁下一章的基础段。
- **挑战段**在基础段完成后解锁，不挡下一章；内容以组合和套用为主（分离、双代入、闭包后例化等），难度从热身逐步升到收尾。
- 选关面板里，基础段用 ◆，挑战段用 ★，各有一条进度条。
- 挑战段最后一关是橙色 ★ 收尾。

![选关](screenshots/04-levels.png)

## 规则从哪来

游戏内容来自 [Metamath Proof Explorer](https://us.metamath.org/mpeuni/mmset.html) 的 `set.mm`：

- 命题、谓词、等词、集合论共 20 条公理，加上 4 条定义。
- 定义（`df-or`、`df-an`、`df-ex`、`dfbi2`）只是缩写，不能当断言模块接进目标；它们只参与“定义等价”判定和 `replace` 模块。
- 另外收录了 993 条 set.mm 公理/定理条目作为档案模块，用 `archive:<label>` 接入。
- 关卡的目标是 set.mm 的公式；游戏没有实现完整的 set.mm 证明器，也不声称重新证明了这些定理。

更细的说明、DV 条件和数据来源见 [docs/metamath.md](docs/metamath.md)。谓词、等词、集合论各自的模块和关卡见 [docs/predicate.md](docs/predicate.md)、[docs/equality.md](docs/equality.md)、[docs/set-theory.md](docs/set-theory.md)。

## 指引、成就与推理长度

- 命题章第 4–6 关是三个单独的规则教程：S 代入、M 分离、D 定义置换；谓词章第 11–12 关分别是 ∀I 和 ∀E 教程。
- 下栏里已证关卡显示为 `*07` 这种形式：星号加关卡编号。
- 下栏元件可以点一下粘在鼠标上、再点画布放下；也可以按住直接拖进画布。放不下时不会强行挤开其他模块。
- 提示只在进入关卡时出现，第一次左键操作后自动消失；规则提示窗也只是输入/模块/输出的示意图。
- 右上角奖杯打开成就：共 20 个，覆盖基础段、挑战段、规则使用、短证明、干净三关，以及前置同一/前件叠加/复合同一这几关的指定指标；未解锁只显示问号且不能点开，已解锁可以查看条件说明。
- 帮助页底部有“保存 / 加载”按钮，存档是 JSON 文件，进度、成就、每关最佳长度和通关电路都会一起带走；重进已通关关卡会看到保存的电路。
- 每关记录通关电路用了多少个模块。选关格底部的绿条表示你离参考电路有多近；胜利面板会显示本次长度和参考长度。
- 字体只用两套：界面和下栏用 IBM Plex Sans，公式用 STIX Two Text。
- 帮助页只有三个操作方块和 S/M/D/∀ 的公式级图示，底部写着 Design by yyxcnasd。

| 规则提示 | 成就 |
| --- | --- |
| ![规则提示](screenshots/11-guide.png) | ![成就](screenshots/09-achievements.png) |

![成就详情](screenshots/14-achievement-detail.png)

![帮助图例](screenshots/10-help.png)

## 本地运行

直接打开 `index.html` 就能玩。也可以起一个静态服务器：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 开发

```bash
npm test        # 17 个逻辑测试 + 240 个参考电路校验
node scripts/build-toy.js
```

浏览器测试需要本机 Edge：

```bash
node tests/simple-smoke.js
node tests/simple-ui.js
```

关卡与档案是生成的，不要手改 `src/levels-generated.js` 和 `src/archive.js`。改生成器后重新跑：

```bash
node scripts/gen-levels.js
```

### 主要文件

| 文件 | 作用 |
| --- | --- |
| `src/logic.js` | 公式 AST、解析、展开、代入、置换、分离 |
| `src/engine.js` | 模块求值器 |
| `src/main.js` | 关卡流程、选关、成就、规则提示 |
| `src/library.js` | set.mm 公理、定义、调色板 |
| `src/archive.js` | set.mm 档案模块（生成） |
| `src/levels.js` | 四章手工关 |
| `src/levels-generated.js` | 生成关卡（生成） |
| `scripts/gen-levels.js` | 关卡/档案生成器 |
| `docs/` | 数学与数据说明 |
| `research/` | set.mm 提取数据和开发笔记 |

页面是纯静态的，没有后端，也不在运行时请求网络。GitHub Pages 在每次推送 `main` 时跑 `node scripts/build-toy.js`，把 `dist/` 上传；bilibili Toy 也是压缩 `dist/` 里的内容。

## 致谢

- 背景音乐：YannZ 的 *lvl 3 – the grassland*，CC BY 4.0。完整署名见 [CREDITS.md](CREDITS.md)。
- set.mm：Metamath Proof Explorer 数据库，CC0 / public domain。
- 字体：IBM Plex Sans、STIX Two Text，SIL Open Font License。
- 图标：Heroicons，MIT License。
- Design by yyxcnasd。本作不是 Metamath 官方产品。
