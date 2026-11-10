# 第 Ⅱ/Ⅲ/Ⅳ 章归档说明

**主游戏已改为单章命题逻辑（只保留第 Ⅰ 章）。** 原 152 关四章版本里的第 Ⅱ 章（谓词）、
第 Ⅲ 章（等词）、第 Ⅳ 章（集合论）已从主线移出，并冻结在 **[`archive/predicate-set/`](../archive/predicate-set/README.md)**。

| 项 | 值 |
| --- | --- |
| 冻结提交 | `8987493e3be7c8fe2c917d3cf0d54a531ba42c5d`（`8987493`，152 关时代的最终验收提交） |
| 归档标签 | `archive/predicate-set-v1`（annotated，不移动） |
| 归档日期 | 2026-11-10 |
| 归档关卡 | 114 关 = Ⅱ/Ⅲ/Ⅳ 各 38（4 教学 + 10 普通 + 24 进阶） |

- 详细说明、目录结构、还原/运行命令、限制：[`archive/predicate-set/README.md`](../archive/predicate-set/README.md)
- 机器可读清单（tag / commit / 计数 / 文件 SHA-256）：[`archive/predicate-set/manifest.json`](../archive/predicate-set/manifest.json)
- 还原冻结的完整可玩游戏：见 [`archive/predicate-set/restore.md`](../archive/predicate-set/restore.md)
- 抽取的关卡数据：[`archive/predicate-set/levels-ii-iv.json`](../archive/predicate-set/levels-ii-iv.json)

> **注意（诚实声明）**：归档是保存，不是验收背书。第 Ⅳ 章集合论与部分谓词章节的公式在
> `docs/AXIOM-AUDIT.md`、`docs/LEVEL-REDESIGN-PLAN.md` §6 中已被标为存疑/不严谨（如 ∃E 的
> 元语言侧条件无法公理化、空域下 `∀xφ→∃xφ` 不成立、DV 条件仅靠字母差异表达）。复用前须重新核对。
>
> 「完整可玩」只对 tag `archive/predicate-set-v1` 成立；`levels-ii-iv.json` 只是内容切片，
> 不能单独跑游戏。

- 旧 `chapter1–4.json`、`lemma-levels.json`、`tutorials.json`、`index.js` 也已移到 `archive/predicate-set/campaign-sources/`，主构建不读取。
