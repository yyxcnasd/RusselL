# 公理板

一个极简的模块化证明游戏。把公理、代入、分离和定义置换接成一条线，让最终断言落到 `⊢` 上。

**在线玩：** https://yyxcnasd.github.io/RusselL/  
**仓库：** https://github.com/yyxcnasd/RusselL

![工作台](screenshots/01-game.png)

## 怎么玩

- 点底部的大块元件，它会放到板上。
- 从模块右边的圆点拖到另一个模块左边的圆点。也可以先点输出、再点输入。
- 顶部是当前要证的断言。把它接到右侧 `⊢` 目标卡，然后点“校验”。
- 点左上角关卡数字选关。共 218 关，全部开放。
- 点模块可换参数（原子字母、量词、定义置换）；点顶部 `×` 删除选中的模块或线。
- 右上角 `◐` 切换深色模式，`♪` 开关音乐；进度会记在本地。

没有侧栏、没有教程段落、没有小字说明。第一次打开第一关时，板中央会出现 `A1 → ⊢` 的视觉提示。

| 接线 | 交板 | 选关 |
| --- | --- | --- |
| ![接线](screenshots/02-wired.png) | ![交板](screenshots/03-win.png) | ![选关](screenshots/04-levels.png) |`r`n`r`n![深色模式](screenshots/07-dark.png)

## 218 个关卡

- **15 个命题演算核心关**：四条罗素原始命题、代入、定义置换、分离、双重否定、合取消去、德摩根。
- **9 个代入推理关**：把档案定理实例化成复合公式，需要自己搭公式再代入。
- **2 个多步推理关**：用 `*2.05` 三段论、`*2.12`、`*2.14` 和两次分离，实际推演 `P→P` 与 `P→¬¬P`。
- **187 个 Metamath 题库关**：除核心关已用的 6 条外，Metamath Solitaire 记录的其余 187 条《数学原理》命题全部生成关卡，例如 `*2.1`、`*2.15`、`*3.1`、`*4.4`、`*4.41`。
- **5 个谓词演算关**：全称例化、存在引入、全称推广、量词分配、`∃` 定义桥。

初始公理只有四条：

```
A1  (P∨P)→P
A2  P→(P∨Q)
A3  (P∨Q)→(Q∨P)
A4  (Q→R)→((P∨Q)→(P∨R))
```

定义：

```
D1  A→B  := ¬A∨B
D2  A∧B  := ¬(¬A∨¬B)
D3  A↔B  := (A→B)∧(B→A)
```

三条变形规则：代入、分离、定义置换。

数学上必须诚实：这四条公理本身不足以从零推出全部经典命题演算。《数学原理》还有 `*1.6` 等原始命题，因此 `*2.1` 之后的关卡明确使用**档案定理模块**，而不是假装它们由四条公理直接推出。`*2.14` 等编号、步数和压缩证明带来自 Metamath 的 PM 记录，其证明基于另一组公理基。

## Metamath

- 来源：[pmproofs-orig.txt](https://us.metamath.org/mmsolitaire/pmproofs-orig.txt)
- 193 条 PM 定理索引在 `src/theorems.js`，包含编号、公式、步数和证明带
- 193 条全部进入题库（核心关已用的 6 条不重复生成）
- 详细说明：[docs/metamath.md](docs/metamath.md)
- 运行时**不请求网络**，所有字体和数据都在仓库里

## 设计

- 一屏、单列：顶部目标，中间画布，底部元件条。
- 奶油纸色、黑色墨线、单一橙色强调；没有面板、没有状态栏、没有密集标签。
- 大公式、大圆点、大块元件；目标是 2048 那种“看一眼就知道点哪里”的直接操作。
- 中文回退系统字体；数字/标题 IBM Plex Sans；公式 STIX Two Text。
- 手机端：目标卡固定在可读范围，元件条横向滚动，模块宽度自动收窄。

## 本地运行

直接打开 `index.html` 即可，或者：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 测试

```bash
npm test
# 17 个逻辑引擎测试 + 218 个参考电路校验
```

浏览器 smoke 测试（需要本机 Edge）：

```bash
node tests/simple-smoke.js
node tests/simple-ui.js
```

## GitHub Pages

- `https://yyxcnasd.github.io/RusselL/`
- `.github/workflows/pages.yml` 在每次推送 `main` 时运行 `node scripts/build-toy.js`，把 `dist/` 作为静态站点部署
- 页面全部使用相对路径，运行时无后端。

## bilibili Toy

```bash
node scripts/build-toy.js
```

把 `dist/` **里面的内容**压缩上传。构建只输出 bilibili Toy 白名单内的文件（`.html/.css/.js/.mp3/.woff2/.svg/.md`），没有 `.mjs`、`.txt`、`.pdf` 或开发文件。

## 声音、动效与布线

- **音乐**：YannZ 的 *lvl 0 – the tutorial*（CC BY 4.0），循环播放；首次点击后开始，右上角 `♪` 可静音。
- **音效**：放模块、接线、失败、交板都有合成音；交板时触发彩色纸屑、目标焊盘脉冲、关卡数字弹跳与进度条增长。
- **布线**：16px 网格上的 A* 正交布线，带转弯惩罚、已有线段复用惩罚和节点障碍；优先绕开模块，尽量不叠线。
- **对齐/防重叠**：模块拖动与落点吸附 16px 网格；重叠时自动寻找最近空位。
- **接口配色**：断言 = 墨色，公式 = 蓝色，原子 = 橙色；线色跟随源端口类型。
- **深色模式**：整套颜色变量切换，偏好持久化。

## 文件

```
index.html               单屏游戏
src/simple.css           极简视觉
src/board.js             画布、模块、焊盘、铜线
src/main.js              关卡流程、元件条、参数、选关
src/logic.js             公式 AST / 解析 / 展开 / 代入 / 置换 / 分离
src/engine.js            模块求值器
src/levels.js            218 个关卡与参考电路
src/predicate.js         谓词层
src/theorems.js          193 条 PM 定理数据
src/metamath.js          Metamath 数据与证明带
assets/fonts/            本地字体（OFL）
assets/audio/            CC BY 4.0 背景音乐
dist/                    Toy / Pages 静态构建
docs/                    数学与数据说明
screenshots/             README 截图
tests/                   逻辑与浏览器测试
```

## 来源

- 背景音乐：**lvl 0 – the tutorial** by **YannZ**，来自 [OpenGameArt](https://opengameart.org/content/indie-meditations-free-music-pack)，**CC BY 4.0**；许可与署名见 [CREDITS.md](CREDITS.md)。
- 《数学原理》（Whitehead & Russell, 1910–1913）为公有领域。
- Metamath 的 PM 定理记录来自 [us.metamath.org](https://us.metamath.org/)；站点文本为公有领域。
- IBM Plex Sans / STIX Two Text 为 SIL Open Font License。
- 本作不是 Metamath 官方产品。




