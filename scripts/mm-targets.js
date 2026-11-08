#!/usr/bin/env node
'use strict';
/*
 * 重放目标清单（唯一来源）。
 *
 * 改这里 → 重跑 `npm run build:mm`，会重建：
 *   research/mm-frames.json → research/mm-proofs/* → src/mm/proofs.js → src/mm/levels.js
 *
 * 字段：
 *   label   set.mm 的断言 label（必须在 set-pred/class/zf/zfc 四个模块里）
 *   chapter 归属章节：prop（命题）/ pred（谓词）/ eq（等词）/ set（集合）
 *   title   关卡中文短名（≤ 14 字，目录行会截断）
 *   note    一句话说明（目录行 title 提示 + 通关面板）
 *
 * 每章固定 12 个：章节内的重放段按**证明步数**升序排列，构成该章的难度曲线。
 * $a 公理（ax-11 / ax-pr）没有可重放的证明，关卡里作为公理图式展示。
 */
const TARGETS = [
  /* ---- 命题（12）：3 → 17 步 ---- */
  { label: 'pm2.07', chapter: 'prop', title: '自蕴析取', note: '⊢ (φ → (φ ∨ φ))：析取的自反弱化。' },
  { label: 'pm2.5', chapter: 'prop', title: '否蕴涵换位', note: '⊢ (¬(φ → ψ) → (¬φ → ψ))。' },
  { label: 'simp2', chapter: 'prop', title: '三合取简化', note: '⊢ ((φ ∧ ψ ∧ χ) → ψ)：三元合取取中间项。' },
  { label: 'con1', chapter: 'prop', title: '逆否换位', note: '⊢ ((¬φ → ψ) → (¬ψ → φ))：逆否命题。' },
  { label: 'com12', chapter: 'prop', title: '前件交换', note: '⊢ (ψ → (φ → χ))：交换两个前件的顺序（带前提的推理式）。' },
  { label: 'pm2.04', chapter: 'prop', title: '前件互换', note: '⊢ ((φ → (ψ → χ)) → (ψ → (φ → χ)))：交换嵌套前件。' },
  { label: 'id', chapter: 'prop', title: '恒等蕴涵', note: '⊢ (φ → φ)：同一律。' },
  { label: 'pm3.11', chapter: 'prop', title: '德摩根逆推', note: '⊢ (¬(¬φ ∨ ¬ψ) → (φ ∧ ψ))：从否定析取回到合取。' },
  { label: 'pm3.24', chapter: 'prop', title: '非矛盾律', note: '⊢ ¬(φ ∧ ¬φ)：一个 wff 不能同时成立又与否定同时成立。' },
  { label: 'simprrr', chapter: 'prop', title: '右深合取化简', note: '⊢ ((φ ∧ (ψ ∧ (χ ∧ θ))) → θ)：最右项的化简。' },
  { label: 'simpr12', chapter: 'prop', title: '深合取化简', note: '⊢ ((ε ∧ ((φ ∧ ψ ∧ χ) ∧ θ ∧ τ)) → ψ)：嵌套合取里取第二项。' },
  { label: '3mix1', chapter: 'prop', title: '三重析取引入', note: '⊢ (φ → (φ ∨ ψ ∨ χ))：往三重析取里塞第一项。' },

  /* ---- 谓词（12）：4 → 56 步 ---- */
  { label: 'alim', chapter: 'pred', title: '全称分配蕴涵', note: '⊢ (∀x (φ → ψ) → (∀x φ → ∀x ψ))：ax-4 的重述。' },
  { label: 'exim', chapter: 'pred', title: '存在分配蕴涵', note: '⊢ (∀x (φ → ψ) → (∃x φ → ∃x ψ))。' },
  { label: 'exancom', chapter: 'pred', title: '存在内交换', note: '⊢ (∃x (φ ∧ ψ) ↔ ∃x (ψ ∧ φ))。' },
  { label: '19.2', chapter: 'pred', title: '全称推出存在', note: '⊢ (∀x φ → ∃x φ)。' },
  { label: '19.9', chapter: 'pred', title: '存在消去', note: '⊢ (∃x φ ↔ φ)，x 不在 φ 中自由出现。' },
  { label: 'alex', chapter: 'pred', title: '全称存在对偶', note: '⊢ (∀x φ ↔ ¬∃x ¬φ)：全称量词用存在与否定表示。' },
  { label: '19.21', chapter: 'pred', title: '全称前置', note: '⊢ (∀x (φ → ψ) ↔ (φ → ∀x ψ))。' },
  { label: '19.36', chapter: 'pred', title: '存在蕴涵前置', note: '⊢ (∃x (φ → ψ) ↔ (∀x φ → ψ))。' },
  { label: '19.31v', chapter: 'pred', title: '全称分配析取', note: '⊢ (∀x (φ ∨ ψ) ↔ (∀x φ ∨ ψ))，ψ 与 x 无 DV 冲突的版本。' },
  { label: '3exdistr', chapter: 'pred', title: '三重存在分配', note: '⊢ (∃x ∃y ∃z (φ ∧ ψ ∧ χ) ↔ ∃x (φ ∧ ∃y (ψ ∧ ∃z χ)))。' },
  { label: '19.33b', chapter: 'pred', title: '存在合取的逆', note: '¬(∃x φ ∧ ∃x ψ) 时给出 ∀x (φ ∨ ψ) 与 ∃x (φ ∨ ψ) 的等价。' },
  { label: 'ax-11', chapter: 'pred', title: '量词交换公理', note: '⊢ (∀x ∀y φ → ∀y ∀x φ)：ax-11，量词交换（公理图式，没有证明可重放）。' },

  /* ---- 等词（12）：5 → 55 步 ---- */
  { label: 'axc16', chapter: 'eq', title: '旧公理 ax-c16', note: '⊢ (∀x x = y → (φ → ∀x φ))：旧版 ax-c16。' },
  { label: 'eqeq1', chapter: 'eq', title: '等式替换', note: '⊢ (A = B → (A = C ↔ B = C))：等号左侧可替换。' },
  { label: 'eleq1', chapter: 'eq', title: '归属替换', note: '⊢ (A = B → (A ∈ C ↔ B ∈ C))：相等的类可替换归属。' },
  { label: 'eqid', chapter: 'eq', title: '自等', note: '⊢ A = A：类相等的自反性。' },
  { label: 'equcom', chapter: 'eq', title: '等号对称', note: '⊢ (x = y ↔ y = x)。' },
  { label: 'eqtri', chapter: 'eq', title: '等式链', note: '⊢ A = C：从 A = B 与 B = C 推出（带两个前提）。' },
  { label: 'equtr', chapter: 'eq', title: '等号传递', note: '⊢ (x = y → (y = z → x = z))。' },
  { label: 'equequ1', chapter: 'eq', title: '等式等价替换', note: '⊢ (x = y → (x = z ↔ y = z))：等号两边可互换。' },
  { label: 'axc11r', chapter: 'eq', title: 'ax-c11 反向', note: '⊢ (∀y y = x → (∀x φ → ∀y φ))。' },
  { label: 'ax8', chapter: 'eq', title: '等式代入', note: '⊢ (x = y → (x ∈ z → y ∈ z))：由 ax8v1/ax8v2 推出 ax-8。' },
  { label: '19.12vvv', chapter: 'eq', title: '量词换序', note: '⊢ (∃x ∀y (φ → ψ) ↔ ∀y ∃x (φ → ψ))，带 DV 的版本。' },
  { label: 'equvel', chapter: 'eq', title: '等式消去变元', note: '⊢ (∀z (z = x ↔ z = y) → x = y)：不需要 DV 的变元消去。' },

  /* ---- 集合（12）：12 → 304 步 ---- */
  { label: 'pwex', chapter: 'set', title: '幂集存在', note: '⊢ 𝒫A ∈ V：幂集公理的类记法版本。' },
  { label: 'vex', chapter: 'set', title: '变元皆集合', note: '⊢ x ∈ V：每个 setvar 都属于全集。' },
  { label: 'eqtr2', chapter: 'set', title: '类相等传递', note: '⊢ ((A = B ∧ A = C) → B = C)。' },
  { label: 'vneqv', chapter: 'set', title: 'V 不是集合', note: '⊢ ¬x = V：真类不等于任何集合。' },
  { label: 'fin41', chapter: 'set', title: '有限性重合', note: '⊢ Fin4 = Fin：可数选择下 IV-有限与 I-有限重合。' },
  { label: 'oneltri', chapter: 'set', title: '序数三歧', note: '⊢ ((A ∈ On ∧ B ∈ On) → (A ∈ B ∨ B ∈ A ∨ A = B))。' },
  { label: 'axprlem1', chapter: 'set', title: '配对引理', note: '⊢ ∃x ∀y (∀z ¬z ∈ y → y ∈ x)：ax-pr 的引理。' },
  { label: 'en3lp', chapter: 'set', title: '无三环成员', note: '⊢ ¬(A ∈ B ∧ B ∈ C ∧ C ∈ A)：成员关系没有三循环。' },
  { label: 'axrep1', chapter: 'set', title: '替换公理', note: 'Metamath Solitaire 里使用的替换公理版本。' },
  { label: 'axunnd', chapter: 'set', title: '并集公理', note: '并集公理在无 DV 条件下的版本。' },
  { label: 'axacnd', chapter: 'set', title: '选择公理', note: '选择公理在无 DV 条件下的版本。' },
  { label: 'ax-pr', chapter: 'set', title: '配对公理', note: '⊢ ∃z ∀w ((w = x ∨ w = y) → w ∈ z)：ZF 配对公理（公理图式，没有证明可重放）。' }
];

const HARD_LABELS = TARGETS.map((t) => t.label);
const CHAPTERS = ['prop', 'pred', 'eq', 'set'];
const CHAPTER_NAMES = { prop: '命题', pred: '谓词', eq: '等词', set: '集合' };

module.exports = { TARGETS, HARD_LABELS, CHAPTERS, CHAPTER_NAMES };
