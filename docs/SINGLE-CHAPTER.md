# 单章 108 关命题演算：设计与交接

> 2026-11-10。四章版本（命题/谓词/等词/集合论）已冻结在
> [`archive/predicate-set/`](../archive/predicate-set/README.md)（tag `archive/predicate-set-v1`）。
> 主线现在是单章命题演算，不再出现章节字样。

## 1. 结构

| 项 | 值 |
| --- | --- |
| 总关数 | 108 = 8 教学 + 100 编号 |
| 教学 | 8（`i`–`viii`） |
| 普通 | 20（`00`–`19`，参考解 10–30 模块） |
| 困难 | 70（`20`–`89`，参考解 25–100 模块） |
| 魔王 | 10（`90`–`99`，参考解 70–500 模块） |
| 目标 | 定义展开后不重复；构建门禁 + `npm test` 双重检查 |
| 内容 | 49 条 set.mm 命题演算定理、5 个 legacy 已验证小电路、∧/∨/↔ 规则关与证明中间结论 |

段内按模块数排序；困难段和普通段各有少量依赖强制倒挂，整体跨度普通 10–27、困难 25–64、魔王 77–112。

## 2. 构建管线

```
campaign/campaign2.js
  → scripts/build-campaign2.js
      编译电路 → 真实 Engine 求值 → mergeAll 合并全部同 token 节点
      → 5–30 / 22–100 中间结论 → 魔王候选（70–500）
      → 依赖感知选择：魔王 10 → 普通 20 → 困难 70
      → 段内按模块数排序 → 编号 00–99 → 定理代号重映射
      → 逐关 Engine 复验 → 门禁
  → campaign/campaign2-levels.json
  → scripts/write-levels.js → src/levels.js + src/campaign-meta.js
```

- 单条命令 `npm run build`；干净工作区可复现相同 SHA。
- mergeAll 合并 `['wff','P']`、`['setvar','x']`、构造公式与 `|-` 断言；108 关重复 token 组为 0。

## 3. D / D⁻ 选择

- 选中 D 或 D⁻ 节点后，弹层列出断言里每一处可重写的定义（符号 + 前后公式），点一处只改一处；
  `all` 清除 `config.at`，恢复全量重写。
- 底层 API：`Term.definitionSites / expandAt / contractAt`；旧的无 `config.at` 关卡仍全量重写。
- 帮助页只保留 S、M、D、D⁻ 四张卡；D/D⁻ 用单向双线箭头 `⇛`。

## 4. 存档、UI、成就

- 存档 v4：campaign 指纹；旧 v1–v3 按目标公式迁移，旧电路丢弃，迁移前备份。
- 选关：教学/普通/困难/魔王四条分带；教学只显示 i–viii；编号 00–99。
- 缩放下限 0.05；大电路 fit 下限 0.15；玻璃浮窗统一 token，教学浮窗只含代号与规则式。
- 20 个成就重点覆盖困难 25/50/全通、魔王 1/5/全通、干净困难与魔王效率。

## 5. 已知限制

1. 普通/困难段含少量证明中间结论；目标互不相同、证明真实，但不是独立命名定理。
2. 困难段 3 处、普通段 1 处依赖强制倒挂；魔王段 10 关是 77–112 模块的真实大证明，不是人工 500 模块巨兽。
3. 旧存档只保留目标仍存在的新关卡；旧 152 关大部分目标已不在 108 关里。
4. 归档版谓词/等词/集合引擎不再维护；主游戏不包含这些元件。

## 6. 验证

```bash
npm run build
npm test
npm run test:save
npm run test:dedupe
npm run test:definitions
npm run test:text
npm run test:wire
npm run test:leaderboard
npm run test:ui
npm run test:acceptance
node tests/screenshots.js
node scripts/export-solutions.js
```
