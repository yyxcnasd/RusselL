# 公理板 · 命题证明搜索器（PROVER）

`scripts/prove.js`：面向本游戏电路格式的命题证明搜索器 + 参考电路生成器。
只依赖 `src/logic.js`（用 Node `vm` 以经典脚本方式加载 `window.RSL.Logic`），
`--verify` 时再用同样方式加载 `src/engine.js`。**不修改 `src/` 下任何文件。**

公理基（`src/library.js` 现用 id；若 Lead 改成别的 id，改 `prove.js` 顶部的 `AXIOM_DEFS` 即可）：

| id | 图式 |
| --- | --- |
| `ax-1` | `P→(Q→P)` |
| `ax-2` | `(P→(Q→R))→((P→Q)→(P→R))` |
| `ax-3` | `(¬P→¬Q)→(Q→P)` |

## 1. 用法

```bash
# 默认：打印步骤列表（步骤号 / 来源 / 原子替换 / 结果公式）
node scripts/prove.js "P→P"

# JSON：{ok, goal, engine, steps:[...], conclusion, ms, notes}
node scripts/prove.js "P→((P→Q)→Q)" --json

# 生成游戏 circuit JSON：{goal, circuit:{nodes,edges,target,stats}}
node scripts/prove.js "P→P" --circuit

# 生成电路并用真实引擎评估（注入 axiom 表后 evaluate）
node scripts/prove.js "P→P" --circuit --verify

# 复用前面关卡结论作为引理（图式，原子可代换）；可重复
node scripts/prove.js "(P→Q)→((Q→R)→(P→R))" --lemma "id:P→P" --lemma "pm2.27:P→((P→Q)→Q)"

# 调参
node scripts/prove.js "<公式>" --engine backward --depth 24 --budget 400000
node scripts/prove.js "<公式>" --circuit --verify --out out.json
```

选项：`--json`、`--circuit`、`--verify`、`--lemma <id:公式>`（可重复）、`--engine backward|dt|auto`、
`--depth <n>`（迭代加深上限，默认 12）、`--budget <n>`（反向搜索展开预算，默认 20000）、
`--out <file>`、`--verbose`、`--help`。

## 2. 算法

两个引擎，`auto` 先跑 A 再跑 B；两者产出的证明树都会先用 `src/logic.js` 的
`instantiate` / `detach` / `eq` 逐叶校验，校验通过才输出（因此任何输出都可信）。

### A. 目标制导反向搜索（`--engine backward`）

- 目标 `G` 与断言图式做**合一**：图式原子是可代换的元变量（内部用 `{k:'meta'}` 节点 + 带 trail 的绑定表，带回溯与 occurs check），
  `¬` / `→` 结构刚性。
- 规则：
  1. **整式匹配**：`G` 与某公理/引理的实例合一 → 直接得到该步（记录原子替换 map）；
  2. **右脊柱 MP 分解**：取公理 `S = A→B`，把 `B` 的右脊柱节点（`B`、`B|b`、…）与 `G` 合一得到替换，
     再依次证左兄弟子目标（`S|a`、`S|b|a`、…），每证一个左兄弟就接一次 MP；
  3. 失败目标按 `Logic.key` 规范化后 memo（按剩余深度记录），成功路径物化时未绑定的元变量补默认原子（X/Y/Z…）。
- 迭代加深（`--depth`）+ 展开预算（`--budget`），防爆；超预算/超时会明确报告。

### B. 消去定理策略（`--engine dt`）

- 把目标分解成 `G = A1→(A2→…→An→B)`，以 `[A1…An]` 为假设，用
  “假设 / 公理实例 / MP 饱和”搜索 `B` 的**带假设 Hilbert 推导**；
- 再用标准的消去定理翻译把这棵推导变成只用 `ax-1`、`ax-2` + MP 的纯 Hilbert 证明
  （每个假设层：`X ⇒ X→(A→X)`（ax-1 + MP）；MP 层用 `ax-2` 实例搬运；`A→A` 用 5 步 id 小证明）。
- 该策略不需要 `--lemma` 就能覆盖一批“蕴含式重排/断言式”目标，但证明较长（模板冗余）；
  输出前会按结构去重（相同公理实例/相同子证明共享节点）。

### C. circuit 生成（`--circuit`）

- 每个公理/引理叶子 → `axiom`（`config:{axiomId}`）或 `theorem`（`config:{theoremCode}`）源节点；
  对该叶子 `subst` 中的每个原子按顺序串一个 `subst` 节点（输入 `assertion` / `atom` / `formula`；
  `atom` 用 `atom` 节点，复合公式用 `not` / `imp`（`or`/`and`/`iff` 也可构造）递归生成并按 `Logic.key` 共享）。
- 每个 MP → `detach` 节点；最终断言用 edge 指向 `{node:'target', port:'proof'}`，
  **target 节点本身不放进 `nodes`**（由关卡/测试注入），`circuit.target` 里给出 target 节点定义。
- 坐标：`x = 60 + 列×260`，`y = 60 + 行×140`（按拓扑列排布）。
- `stats` 里给出 `nodes / edges / columns / nonSerializableLeaves`（见局限 3）。

`--verify` 的注入方式：重新 `vm` 加载 `logic.js` + `engine.js`，然后
`RSL.AXIOMS = [{id, code, name, schema(字符串)}]`（engine 的 axiom 节点会对 `schema` 调 `Logic.parse`，
所以**必须是字符串**），引理用 `RSL.theoremData(code) → {code, formula}` 解析；
最后把 `circuit.target` 作为节点注入 `nodes` 并调用 `Engine.evaluate`，打印 `complete` / `errors`。

## 3. 已验证目标与步数

| 目标 | 引擎 | 逻辑校验 | 步数（去重后） | 备注 |
| --- | --- | --- | --- | --- |
| `P→P` | backward | ✓ | **5** | 反向搜索 depth 2、14 次展开 |
| `P→((P→Q)→Q)`（pm2.27） | dt | ✓ | **35** | 反向搜索（含 `--lemma id:P→P`、depth 24 / 预算 40 万）不收敛，DT 策略直接给出 |
| `(P→(Q→R))→(Q→(P→R))`（pm2.04） | dt | ✓ | **161** | DT 模板冗余，已结构去重 |
| `(P→Q)→((Q→R)→(P→R))`（imim1） | dt | ✓ | **161** | 同上 |

**电路规模与 `--verify` 结果**：

| 目标 | `circuit.stats.nodes` | `nonSerializableLeaves` | `--verify` |
| --- | --- | --- | --- |
| `P→P` | **17** 节点 / 28 边 / 6 列 | 0 | **`complete=true`**（`valid 17/18`，target 为第 18 个注入节点） |
| `P→((P→Q)→Q)` | 95 节点 | 9 | `complete=false`（见局限 3） |
| `(P→(Q→R))→(Q→(P→R))` | 427 节点 | 59 | `complete=false`（同上） |
| `(P→Q)→((Q→R)→(P→R))` | 427 节点 | 63 | `complete=false`（同上） |

已试但**未证出**（`--engine auto` 两个引擎都失败，输出 `ok:false` + notes）：

- `(P→Q)→(¬Q→¬P)`（con2）
- `(¬P→Q)→(¬Q→P)`（con1）
- `((P→Q)→(P→R))→(P→(Q→R))`

失败原因：`¬` 在这套公理里是原始符号，没有 `¬` 引入/消去规则；反向搜索只能用公理右脊柱做 MP 分解，
拿不到“后件是 `not` 的派生蕴涵式”，加上 `ax-3` 的双重否定链很长，预算内不收敛。若需要这几关，
建议：① 直接给前面关卡结论当引理（`--lemma`）；或 ② 用 `--lemma` 现成结论 + 手工搭参考电路
（Lead 的 7–12 关已经是手工电路并通过 `tests/levels.test.js`）。

## 4. 已知局限

1. **证明长度不可控**：DT 策略的翻译模板会重复大量 `ax-1`/`ax-2` 实例（pm2.04 / imim1 达 161 步，
   电路 400+ 节点），只适合作为“逻辑上正确”的兜底，不适合当关卡参考电路；
   已加结构去重（相同子证明共享节点/共享电路节点），但仍远大于人写的短证明。
2. **`--lemma` 只作用于反向搜索**：DT 策略生成推导时不使用引理；反向搜索里的引理按“整式图式”使用。
3. **circuit 的串联替换限制**：游戏 `subst` 是“一次替换一个原子、串联执行”，而证明里的叶子实例是
   “同时替换”。当替换公式里出现的原子名（如 `P`/`Q`）又恰好是该公理图式里后续要替换的原子名时，
   串联结果 ≠ 同时替换结果（原子名冲突，例如 `P:=P→Q` 之后 `Q` 再被替换会穿透进 `P→Q`）。
   `prove.js` 会对每个叶子枚举替换顺序找可行解（`nonSerializableLeaves` 统计无解叶子），
   但 pm2.27 及更复杂 DT 证明里有 9–63 个叶子无解，因此 `--verify` 不 `complete`。
   **P→P 是完整可验证示例**（0 个无解叶子，`complete=true`）。
   关卡 7–12 的参考电路由 Lead 手工搭建，未使用本脚本产物。
4. **只支持 `¬` / `→` / 原子目标**：目标含 `∨` / `∧` / `↔` 时直接报错（这几种连接词由 `replace` 模块
   按 `df-or` / `df-an` / `dfbi2` 处理，不在本脚本的搜索范围内）。
5. 电路 `atom` 节点的 `config.name` 受引擎限制只取单个字母；证明里的默认原子（未绑定元变量）从
   `X/Y/Z/W/…` 里取，schema 原子保持 `P/Q/R` 不变。

## 5. 示例输出（节选）

```text
$ node scripts/prove.js "P→P"
目标：P→P
引擎：backward   用时：1ms   步骤数：5
  1.  公理 ax-2  [P:=P，Q:=X→P，R:=P]   ⇒ (P→(X→P)→P)→(P→X→P)→P→P
  2.  公理 ax-1  [P:=P，Q:=X→P]         ⇒ P→(X→P)→P
  3.  MP       由 1 + 2                 ⇒ (P→X→P)→P→P
  4.  公理 ax-1  [P:=P，Q:=X]           ⇒ P→X→P
  5.  MP       由 3 + 4                 ⇒ P→P
结论：P→P    ✓ 校验通过

$ node scripts/prove.js "P→P" --circuit --verify | tail -2
verify: complete=true  target=complete  valid=17/18
```

## 6. 文件

- `scripts/prove.js`：本工具（单文件，无外部依赖）。
- `research/PROVER.md`：本文件。
