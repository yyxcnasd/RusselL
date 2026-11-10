# 单章 96 关命题演算：设计与交接

> 2026-11-10。四章版本（命题/谓词/等词/集合论）已冻结在
> [`archive/predicate-set/`](../archive/predicate-set/README.md)（tag `archive/predicate-set-v1`）。
> 主线现在是单章命题演算，不再出现章节字样。

## 1. 结构

| 项 | 值 |
| --- | --- |
| 总关数 | 96 |
| 教学 | 8（`i`–`viii`） |
| 普通 | 32（`01`–`32`，参考解 5–21 模块） |
| 困难 | 56（`33`–`88`，参考解 22–200 模块，实测最大 195） |
| 目标 | 定义展开后不重复；构建门禁 + `npm test` 双重检查 |
| 内容 | 49 条 set.mm 命题演算定理、5 个 legacy 已验证小电路、∧/∨/↔ 规则关与证明中间结论 |

## 2. 内容来源

- `campaign/mm/seeds.json` 的 49 条 set.mm 命题定理（公理闭包 ⊆ A1–A3）。
- `scripts/mm-import.js` 从本地 `assets/data/set.mm` 重放并导出证明 DAG。
- `scripts/lib/mm-bridge.js` 把 DAG 翻译成证明项；定理引用只传目标公式里出现的变元，
  避免 `subst` 把多余原子带进更小的关卡。
- `campaign/legacy-levels.json` 的 5 个已验证电路（同一律、后件恒等、前件自应用、前件交换、空真）。
- 手写 ∧/∨/↔ 规则关：`simplim`/`simprim`/`pm3.2im` 的真实证明内联，不依赖后面的大引理。

## 3. 构建管线

```
campaign/campaign2.js
  → scripts/build-campaign2.js
      编译电路 → 真实 Engine 求值 → 同断言节点合并（scripts/lib/circuit-dedupe.js）
      → >200 拆分 → 5–21 / 22–200 中间结论 → 目标去重
      → 选 8/32/56 → 拓扑排序 → 编号 → 定理代号重映射 → 逐关 Engine 复验 → 门禁
  → campaign/campaign2-levels.json
  → scripts/write-levels.js → src/levels.js + src/campaign-meta.js
```

- 单条命令 `npm run build`；干净工作区可复现相同 SHA。
- 参考解中**断言完全相同的节点**合并到零重复；当前 96 关逐关检查为 0 组重复。
- 目标去重用定义展开后的 canonical key，`npm test` 另用 `Term.key` 检查 0 重复。

## 4. 存档

- schema v4：`campaign` = 关卡 code + targetTokens 的 FNV-1a 指纹。
- 旧 v1–v3 存档按**目标公式**迁移，不按复用 code/id 硬套；旧电路全部丢弃。
- 迁移前备份到 `axiom-simple:pre-v4`；成功写回 v4，toast 显示保留/移除关数。
- 缺失 `RSL.LEGACY_TARGETS` 时不静默覆盖旧档，提示并保留。
- Toy 云存档：迁移 → 相同则跳过 → 应用 → 重载有效起始关 → 本地持久化 → 写回 v4。

## 5. UI 变化

- 教学关只显示小写罗马数字（`i`…`viii`），不再是 `Ⅰ-i`。
- 选关面板只有一条课程线 + 教学/普通/困难三条分带，无章节标题。
- 帮助页只列 A1、A2、A3、S、M、D、D⁻ 七张图例。
- 棋盘缩放下限 `0.05`；大电路自动 fit 下限 `0.15`。
- 定理 tile/按钮显示 `*01`…`*88`，不再有章节罗马数字底纹。
- 个体变元端口/导线使用独立紫色（主线不使用，保留给归档版本）。

## 6. 已知限制

1. **中间结论占普通/困难带的一部分**：32 个普通关里 9 个是命名定理/规则/legacy，其余 23 个是
   set.mm 证明里的中间结论；56 个困难关里 16 个是中间结论。它们目标互不相同、证明真实，
   但不是独立命名的定理。
2. **困难关有 8 处局部倒挂**（例如 39→22），原因是小关依赖更大的前置定理，拓扑序无法避免；
   整体从 25 升到 195。
3. **旧存档只保留 30/152 关**：旧 152 关的目标只有 30 个出现在新 96 关里；其余按设计丢弃，
   不按旧 code 误标。
4. **归档版谓词/等词/集合引擎未按新需求重做**：`pred` 仍把谓词与等词合在一个模块，
   A4/A5 仍按变元生成变体，xS/二元谓词/端口命名等需求没有在冻结版本里实现。
   主游戏不再出现这些元件；若要复活归档内容，应另开任务重做。
5. **没有使用演绎定理生成主线关**：DT 证明项在 3 个假设以上会指数膨胀，超过 200 模块上限。
6. 旧 v2/v3 存档中的电路不迁移；用户在旧关卡的“自己的接线”会丢失，只保留通关/最佳模块数。

## 7. 验证命令

```bash
npm run build
npm test
npm run test:save
npm run test:dedupe
npm run test:wire
npm run test:leaderboard
npm run test:ui
npm run test:acceptance
node tests/screenshots.js
node scripts/export-solutions.js
```

当前结果：`npm test` 8/8、`test:save` 13/13、`test:dedupe` 9/9、`test:wire` 10/10、
`test:leaderboard` 2/2、`test:ui` PASS 61 checks、`test:acceptance` PASS 27 checks、
`screenshots` PASS 6 checks。
