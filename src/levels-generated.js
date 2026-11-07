/* 公理板 — 由 scripts/gen-levels.js 从 set.mm 数据生成的关卡（每章 13–60）。
 * 参考电路全部经 src/engine.js 实际求值；不要手改，改生成器后重新生成。
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var GENERATED = [
 {
  "id": "CH1-13",
  "chapter": "prop",
  "code": "CH1-13",
  "title": "pm3.24 · 档案",
  "kicker": "set.mm / pm3.24",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:pm3.24",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm3.24（Propositional calculus）；本作不重证档案定理。",
  "target": "¬ ( P ∧ ¬ P )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm3.24"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-14",
  "chapter": "prop",
  "code": "CH1-14",
  "title": "pm2.07 · 档案",
  "kicker": "set.mm / pm2.07",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:pm2.07",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.07（Propositional calculus）；本作不重证档案定理。",
  "target": "( P → ( P ∨ P ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.07"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-15",
  "chapter": "prop",
  "code": "CH1-15",
  "title": "simp2 · 档案",
  "kicker": "set.mm / simp2",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:simp2",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp2（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( P ∧ Q ∧ R ) → Q )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp2"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-16",
  "chapter": "prop",
  "code": "CH1-16",
  "title": "3mix1 · 档案",
  "kicker": "set.mm / 3mix1",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:3mix1",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3mix1（Propositional calculus）；本作不重证档案定理。",
  "target": "( P → ( P ∨ Q ∨ R ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3mix1"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-17",
  "chapter": "prop",
  "code": "CH1-17",
  "title": "pm2.5 · 档案",
  "kicker": "set.mm / pm2.5",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:pm2.5",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.5（Propositional calculus）；本作不重证档案定理。",
  "target": "( ¬ ( P → Q ) → ( ¬ P → Q ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.5"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-18",
  "chapter": "prop",
  "code": "CH1-18",
  "title": "pm3.11 · 档案",
  "kicker": "set.mm / pm3.11",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:pm3.11",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm3.11（Propositional calculus）；本作不重证档案定理。",
  "target": "( ¬ ( ¬ P ∨ ¬ Q ) → ( P ∧ Q ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm3.11"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-19",
  "chapter": "prop",
  "code": "CH1-19",
  "title": "simprrr · 档案",
  "kicker": "set.mm / simprrr",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:simprrr",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simprrr（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( P ∧ ( Q ∧ ( R ∧ S ) ) ) → S )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simprrr"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-20",
  "chapter": "prop",
  "code": "CH1-20",
  "title": "simpr12 · 档案",
  "kicker": "set.mm / simpr12",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:simpr12",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simpr12（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( U ∧ ( ( P ∧ Q ∧ R ) ∧ S ∧ T ) ) → Q )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simpr12"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-21",
  "chapter": "prop",
  "code": "CH1-21",
  "title": "pm2.5 · 代入",
  "kicker": "set.mm / pm2.5",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm2.5",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.5（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(¬R→Q)→¬¬R→Q",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.5"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f2",
     "kind": "not",
     "x": 500,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-22",
  "chapter": "prop",
  "code": "CH1-22",
  "title": "pm4.56 · 代入",
  "kicker": "set.mm / pm4.56",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm4.56",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.56（Propositional calculus）；本作不重证档案定理。",
  "target": "¬¬U∧¬Q↔¬(¬U∨Q)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm4.56"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "f2",
     "kind": "not",
     "x": 500,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-23",
  "chapter": "prop",
  "code": "CH1-23",
  "title": "3orcoma · 代入",
  "kicker": "set.mm / 3orcoma",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:3orcoma",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3orcoma（Propositional calculus）；本作不重证档案定理。",
  "target": "V∧W∨Q∨R↔Q∨V∧W∨R",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3orcoma"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "V"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "W"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-24",
  "chapter": "prop",
  "code": "CH1-24",
  "title": "simpl1l · 代入",
  "kicker": "set.mm / simpl1l",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:simpl1l",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simpl1l（Propositional calculus）；本作不重证档案定理。",
  "target": "(W∨X)∧Q∧R∧S∧T→W∨X",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simpl1l"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "W"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "X"
     }
    },
    {
     "id": "f3",
     "kind": "or",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-25",
  "chapter": "prop",
  "code": "CH1-25",
  "title": "biluk · 代入",
  "kicker": "set.mm / biluk",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:biluk",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm biluk（Propositional calculus）；本作不重证档案定理。",
  "target": "(S∧T↔Q)↔(R↔Q)↔S∧T↔R",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "biluk"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-26",
  "chapter": "prop",
  "code": "CH1-26",
  "title": "pm5.21 · 代入",
  "kicker": "set.mm / pm5.21",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm5.21",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm5.21（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(S↔T)∧¬Q→((S↔T)↔Q)",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm5.21"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f3",
     "kind": "iff",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-27",
  "chapter": "prop",
  "code": "CH1-27",
  "title": "simp3l3 · 代入",
  "kicker": "set.mm / simp3l3",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:simp3l3",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp3l3（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧U∧((X↔Y)∧Q∧R∧S)→R",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp3l3"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "X"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Y"
     }
    },
    {
     "id": "f3",
     "kind": "iff",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-28",
  "chapter": "prop",
  "code": "CH1-28",
  "title": "anbi1 · 代入",
  "kicker": "set.mm / anbi1",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:anbi1",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm anbi1（Propositional calculus）；本作不重证档案定理。",
  "target": "(S∨T↔Q)→((S∨T)∧R↔Q∧R)",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "anbi1"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f3",
     "kind": "or",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-29",
  "chapter": "prop",
  "code": "CH1-29",
  "title": "pm2.32 · 代入",
  "kicker": "set.mm / pm2.32",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm2.32",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.32（Propositional calculus）；本作不重证档案定理。",
  "target": "(T→U)∨Q∨R→(T→U)∨(Q∨R)",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.32"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-30",
  "chapter": "prop",
  "code": "CH1-30",
  "title": "4anpull2 · 代入",
  "kicker": "set.mm / 4anpull2",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:4anpull2",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 4anpull2（Propositional calculus）；本作不重证档案定理。",
  "target": "(Y→Z)∧Q∧(R∧S)↔(Y→Z)∧R∧S∧Q",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "4anpull2"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Y"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Z"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH1-31",
  "chapter": "prop",
  "code": "CH1-31",
  "title": "pm2.24 · 分离 · pm2.07 作为前件",
  "kicker": "set.mm / pm2.24",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm2.07 作为前件"
  ],
  "allowed": [
   "archive:pm2.24",
   "archive:pm2.07",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "or"
  ],
  "reward": "—",
  "note": "set.mm pm2.24（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(P→P∨P)→Q",
  "targetPos": {
   "x": 1400,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.24"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm2.07"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "f1",
     "kind": "or",
     "x": 280,
     "y": 80,
     "config": {}
    },
    {
     "id": "f2",
     "kind": "imp",
     "x": 500,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f1",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f1",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-32",
  "chapter": "prop",
  "code": "CH1-32",
  "title": "ornld · 分离 · 3anidm 作为前件",
  "kicker": "set.mm / ornld",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · 3anidm 作为前件"
  ],
  "allowed": [
   "archive:ornld",
   "archive:3anidm",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "and"
  ],
  "reward": "—",
  "note": "set.mm ornld（Propositional calculus）；本作不重证档案定理。",
  "target": "((P∧P∧P↔P)→S∨T)∧¬S→T",
  "targetPos": {
   "x": 1400,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ornld"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "3anidm"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "f1",
     "kind": "and",
     "x": 280,
     "y": 80,
     "config": {}
    },
    {
     "id": "f2",
     "kind": "and",
     "x": 500,
     "y": 80,
     "config": {}
    },
    {
     "id": "f3",
     "kind": "iff",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f1",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f1",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-33",
  "chapter": "prop",
  "code": "CH1-33",
  "title": "simp1ll · 双代入",
  "kicker": "set.mm / simp1ll",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simp1ll",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp1ll（Propositional calculus）；本作不重证档案定理。",
  "target": "(G→H)∧(I∧J)∧R∧S∧T→G→H",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp1ll"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "G"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "H"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "I"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "J"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-34",
  "chapter": "prop",
  "code": "CH1-34",
  "title": "annim · 双代入",
  "kicker": "set.mm / annim",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:annim",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm annim（Propositional calculus）；本作不重证档案定理。",
  "target": "(A→B)∧¬(C∧D)↔¬((A→B)→C∧D)",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "annim"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "A"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "B"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "C"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "D"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-35",
  "chapter": "prop",
  "code": "CH1-35",
  "title": "simp21l · 双代入",
  "kicker": "set.mm / simp21l",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simp21l",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp21l（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧((H→I)∧(J∧K)∧R∧S)∧U→H→I",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp21l"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "H"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "I"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "J"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "K"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-36",
  "chapter": "prop",
  "code": "CH1-36",
  "title": "pm2.42 · 双代入",
  "kicker": "set.mm / pm2.42",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm2.42",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.42（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(D→E)∨((D→E)→F∧G)→(D→E)→F∧G",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.42"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "D"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "E"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "F"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "G"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-37",
  "chapter": "prop",
  "code": "CH1-37",
  "title": "impt · 双代入",
  "kicker": "set.mm / impt",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:impt",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm impt（Propositional calculus）；本作不重证档案定理。",
  "target": "((Z→A)→B∧C→R)→¬((Z→A)→¬(B∧C))→R",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "impt"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Z"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "A"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "B"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "C"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-38",
  "chapter": "prop",
  "code": "CH1-38",
  "title": "ordi · 双代入",
  "kicker": "set.mm / ordi",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:ordi",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ordi（Propositional calculus）；本作不重证档案定理。",
  "target": "(E→F)∨G∧H∧R↔((E→F)∨G∧H)∧((E→F)∨R)",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ordi"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "E"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "F"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "G"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "H"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-39",
  "chapter": "prop",
  "code": "CH1-39",
  "title": "3ianor · 双代入",
  "kicker": "set.mm / 3ianor",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:3ianor",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3ianor（Propositional calculus）；本作不重证档案定理。",
  "target": "¬((F→G)∧(H∧I)∧R)↔¬(F→G)∨¬(H∧I)∨¬R",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3ianor"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "G"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "H"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "I"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-40",
  "chapter": "prop",
  "code": "CH1-40",
  "title": "anandi · 双代入",
  "kicker": "set.mm / anandi",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:anandi",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm anandi（Propositional calculus）；本作不重证档案定理。",
  "target": "(B→C)∧(D∧E∧R)↔(B→C)∧(D∧E)∧((B→C)∧R)",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "anandi"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "B"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "C"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "D"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "E"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-41",
  "chapter": "prop",
  "code": "CH1-41",
  "title": "an33rean · 双代入",
  "kicker": "set.mm / an33rean",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:an33rean",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm an33rean（Propositional calculus）；本作不重证档案定理。",
  "target": "(I→J)∧(K∧L)∧R∧(S∧T∧U)∧(V∧W∧X)↔(I→J)∧T∧X∧(K∧L∧S∧(U∧W)∧(R∧V))",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "an33rean"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "I"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "J"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "K"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "L"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-42",
  "chapter": "prop",
  "code": "CH1-42",
  "title": "idALT · 分离 · 2a1 作为前件",
  "kicker": "set.mm / idALT",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · 2a1 作为前件"
  ],
  "allowed": [
   "archive:idALT",
   "archive:2a1",
   "atom",
   "subst",
   "detach",
   "target",
   "imp"
  ],
  "reward": "—",
  "note": "set.mm idALT（Propositional calculus）；本作不重证档案定理。",
  "target": "P→Q→R→P",
  "targetPos": {
   "x": 1520,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "idALT"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "2a1"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "f4",
     "kind": "imp",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "imp",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-43",
  "chapter": "prop",
  "code": "CH1-43",
  "title": "pm4.87 · 双代入",
  "kicker": "set.mm / pm4.87",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm4.87",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.87（Propositional calculus）；本作不重证档案定理。",
  "target": "((C→D)∧(E∧F)→R↔(C→D)→E∧F→R)∧((C→D)→E∧F→R↔E∧F→(C→D)→R)∧(E∧F→(C→D)→R↔E∧F∧(C→D)→R)",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm4.87"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "C"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "D"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "E"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "F"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-44",
  "chapter": "prop",
  "code": "CH1-44",
  "title": "norasslem2 · 分离 · animorlr 作为前件",
  "kicker": "set.mm / norasslem2",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · animorlr 作为前件"
  ],
  "allowed": [
   "archive:norasslem2",
   "archive:animorlr",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and",
   "or"
  ],
  "reward": "—",
  "note": "set.mm norasslem2（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔(P∧Q→R∨P)∨R→Q",
  "targetPos": {
   "x": 1520,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "norasslem2"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "animorlr"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f2",
     "kind": "and",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "a3",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f4",
     "kind": "or",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "imp",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-45",
  "chapter": "prop",
  "code": "CH1-45",
  "title": "pm2.27 · 分离 · pm5.4 作为前件",
  "kicker": "set.mm / pm2.27",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm5.4 作为前件"
  ],
  "allowed": [
   "archive:pm2.27",
   "archive:pm5.4",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "imp"
  ],
  "reward": "—",
  "note": "set.mm pm2.27（Propositional calculus）；本作不重证档案定理。",
  "target": "((P→P→Q↔P→Q)→Q)→Q",
  "targetPos": {
   "x": 1520,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.27"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm5.4"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f2",
     "kind": "imp",
     "x": 500,
     "y": 80,
     "config": {}
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "f4",
     "kind": "imp",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "iff",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-46",
  "chapter": "prop",
  "code": "CH1-46",
  "title": "dedlema · 分离 · anclb 作为前件",
  "kicker": "set.mm / dedlema",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · anclb 作为前件"
  ],
  "allowed": [
   "archive:dedlema",
   "archive:anclb",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm dedlema（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔Q∧(P→Q↔P→P∧Q)∨R∧¬(P→Q↔P→P∧Q)",
  "targetPos": {
   "x": 1520,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "dedlema"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "anclb"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f2",
     "kind": "imp",
     "x": 500,
     "y": 80,
     "config": {}
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "f4",
     "kind": "imp",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "iff",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-47",
  "chapter": "prop",
  "code": "CH1-47",
  "title": "ax-1 · 分离 · 3simpb 作为前件",
  "kicker": "set.mm / ax-1",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · 3simpb 作为前件"
  ],
  "allowed": [
   "archive:ax-1",
   "archive:3simpb",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm ax-1（Propositional calculus）；本作不重证档案定理。",
  "target": "Q→P∧Q∧R→P∧R",
  "targetPos": {
   "x": 1740,
   "y": 640
  },
  "world": {
   "w": 2260,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-1"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "3simpb"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f2",
     "kind": "and",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "a3",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f4",
     "kind": "and",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "and",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-48",
  "chapter": "prop",
  "code": "CH1-48",
  "title": "ibar · 分离 · pm3.41 作为前件",
  "kicker": "set.mm / ibar",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm3.41 作为前件"
  ],
  "allowed": [
   "archive:ibar",
   "archive:pm3.41",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm ibar（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔((P→R)→P∧Q→R)∧Q",
  "targetPos": {
   "x": 1740,
   "y": 640
  },
  "world": {
   "w": 2260,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ibar"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm3.41"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f2",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "a3",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f4",
     "kind": "and",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "imp",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-49",
  "chapter": "prop",
  "code": "CH1-49",
  "title": "cad1 · 分离 · pm2.67-2 作为前件",
  "kicker": "set.mm / cad1",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm2.67-2 作为前件"
  ],
  "allowed": [
   "archive:cad1",
   "archive:pm2.67-2",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "or"
  ],
  "reward": "—",
  "note": "set.mm cad1（Propositional calculus）；本作不重证档案定理。",
  "target": "cadd(P, Q, R)↔P∨Q",
  "targetPos": {
   "x": 1740,
   "y": 640
  },
  "world": {
   "w": 2260,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "cad1"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm2.67-2"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "f2",
     "kind": "or",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "a3",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f4",
     "kind": "imp",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "imp",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-50",
  "chapter": "prop",
  "code": "CH1-50",
  "title": "pm5.5 · 分离 · imnan 作为前件",
  "kicker": "set.mm / pm5.5",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · imnan 作为前件"
  ],
  "allowed": [
   "archive:pm5.5",
   "archive:imnan",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "imp",
   "not",
   "and"
  ],
  "reward": "—",
  "note": "set.mm pm5.5（Propositional calculus）；本作不重证档案定理。",
  "target": "(P→¬Q↔¬(P∧Q))→Q↔Q",
  "targetPos": {
   "x": 1740,
   "y": 640
  },
  "world": {
   "w": 2260,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm5.5"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "imnan"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f2",
     "kind": "not",
     "x": 500,
     "y": 80,
     "config": {}
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "f4",
     "kind": "and",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "not",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "iff",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-51",
  "chapter": "prop",
  "code": "CH1-51",
  "title": "3mix2 · 分离 · pm4.66 作为前件",
  "kicker": "set.mm / 3mix2",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm4.66 作为前件"
  ],
  "allowed": [
   "archive:3mix2",
   "archive:pm4.66",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "imp",
   "not",
   "or"
  ],
  "reward": "—",
  "note": "set.mm 3mix2（Propositional calculus）；本作不重证档案定理。",
  "target": "Q∨(¬P→¬Q↔P∨¬Q)∨R",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3mix2"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm4.66"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "f1",
     "kind": "not",
     "x": 500,
     "y": 80,
     "config": {}
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f3",
     "kind": "not",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "f4",
     "kind": "imp",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "not",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "or",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "f7",
     "kind": "iff",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f1",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f1",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-52",
  "chapter": "prop",
  "code": "CH1-52",
  "title": "biortn · 分离 · pm2.36 作为前件",
  "kicker": "set.mm / biortn",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm2.36 作为前件"
  ],
  "allowed": [
   "archive:biortn",
   "archive:pm2.36",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "or"
  ],
  "reward": "—",
  "note": "set.mm biortn（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔¬((Q→R)→P∨Q→R∨P)∨Q",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "biortn"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm2.36"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "f4",
     "kind": "or",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "or",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "f7",
     "kind": "imp",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-53",
  "chapter": "prop",
  "code": "CH1-53",
  "title": "biidd · 分离 · pm2.86 作为前件",
  "kicker": "set.mm / biidd",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm2.86 作为前件"
  ],
  "allowed": [
   "archive:biidd",
   "archive:pm2.86",
   "atom",
   "subst",
   "detach",
   "target",
   "imp"
  ],
  "reward": "—",
  "note": "set.mm biidd（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔Q",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "biidd"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm2.86"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f2",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "a3",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f4",
     "kind": "imp",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "imp",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "f7",
     "kind": "imp",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "f8",
     "kind": "imp",
     "x": 60,
     "y": 210,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f8",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-54",
  "chapter": "prop",
  "code": "CH1-54",
  "title": "exmidd · 分离 · nan 作为前件",
  "kicker": "set.mm / exmidd",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · nan 作为前件"
  ],
  "allowed": [
   "archive:exmidd",
   "archive:nan",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "imp",
   "not",
   "and"
  ],
  "reward": "—",
  "note": "set.mm exmidd（Propositional calculus）；本作不重证档案定理。",
  "target": "Q∨¬Q",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "exmidd"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "nan"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "f4",
     "kind": "not",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "f5",
     "kind": "imp",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "and",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "f7",
     "kind": "not",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "f8",
     "kind": "imp",
     "x": 60,
     "y": 210,
     "config": {}
    },
    {
     "id": "f9",
     "kind": "iff",
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f8",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f9",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-55",
  "chapter": "prop",
  "code": "CH1-55",
  "title": "2a1 · 分离 · simp23 作为前件",
  "kicker": "set.mm / 2a1",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp23 作为前件"
  ],
  "allowed": [
   "archive:2a1",
   "archive:simp23",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm 2a1（Propositional calculus）；本作不重证档案定理。",
  "target": "Q→R→P∧(Q∧R∧S)∧T→S",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "2a1"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "simp23"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "f5",
     "kind": "and",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "a7",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f8",
     "kind": "and",
     "x": 60,
     "y": 210,
     "config": {}
    },
    {
     "id": "f9",
     "kind": "imp",
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a7",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f8",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f9",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-56",
  "chapter": "prop",
  "code": "CH1-56",
  "title": "biimt · 分离 · simprl1 作为前件",
  "kicker": "set.mm / biimt",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simprl1 作为前件"
  ],
  "allowed": [
   "archive:biimt",
   "archive:simprl1",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm biimt（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔(T∧(P∧Q∧R∧S)→P)→Q",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "biimt"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "simprl1"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f5",
     "kind": "and",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "f8",
     "kind": "and",
     "x": 60,
     "y": 210,
     "config": {}
    },
    {
     "id": "f9",
     "kind": "imp",
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f8",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f9",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-57",
  "chapter": "prop",
  "code": "CH1-57",
  "title": "3mix1 · 分离 · 13an22anass 作为前件",
  "kicker": "set.mm / 3mix1",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · 13an22anass 作为前件"
  ],
  "allowed": [
   "archive:3mix1",
   "archive:13an22anass",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "and"
  ],
  "reward": "—",
  "note": "set.mm 3mix1（Propositional calculus）；本作不重证档案定理。",
  "target": "(P∧(Q∧R∧S)↔P∧Q∧(R∧S))∨Q∨R",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3mix1"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "13an22anass"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 940,
     "y": 80,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "f5",
     "kind": "and",
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "and",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "f8",
     "kind": "and",
     "x": 60,
     "y": 210,
     "config": {}
    },
    {
     "id": "f9",
     "kind": "and",
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "f10",
     "kind": "iff",
     "x": 500,
     "y": 210,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f8",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f10",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f9",
      "port": "out"
     },
     "to": {
      "node": "f10",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f10",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-58",
  "chapter": "prop",
  "code": "CH1-58",
  "title": "notnot · 分离 · simp23r 作为前件",
  "kicker": "set.mm / notnot",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp23r 作为前件"
  ],
  "allowed": [
   "archive:notnot",
   "archive:simp23r",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm notnot（Propositional calculus）；本作不重证档案定理。",
  "target": "¬¬(T∧(R∧S∧(P∧Q))∧U→Q)",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "notnot"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "simp23r"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "a3",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "f4",
     "kind": "and",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f6",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 60,
     "y": 210,
     "config": {}
    },
    {
     "id": "f8",
     "kind": "and",
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "a9",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "f10",
     "kind": "and",
     "x": 500,
     "y": 210,
     "config": {}
    },
    {
     "id": "f11",
     "kind": "imp",
     "x": 720,
     "y": 210,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a3",
      "port": "out"
     },
     "to": {
      "node": "f4",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f4",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f8",
      "port": "out"
     },
     "to": {
      "node": "f10",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a9",
      "port": "out"
     },
     "to": {
      "node": "f10",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f10",
      "port": "out"
     },
     "to": {
      "node": "f11",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f11",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f11",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-59",
  "chapter": "prop",
  "code": "CH1-59",
  "title": "pm3.2 · 分离 · simp121 作为前件",
  "kicker": "set.mm / pm3.2",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp121 作为前件"
  ],
  "allowed": [
   "archive:pm3.2",
   "archive:simp121",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm pm3.2（Propositional calculus）；本作不重证档案定理。",
  "target": "Q→(S∧(P∧Q∧R)∧T∧U∧V→P)∧Q",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm3.2"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "simp121"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f5",
     "kind": "and",
     "x": 60,
     "y": 210,
     "config": {}
    },
    {
     "id": "f6",
     "kind": "and",
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "a7",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f8",
     "kind": "and",
     "x": 500,
     "y": 210,
     "config": {}
    },
    {
     "id": "a9",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "f10",
     "kind": "and",
     "x": 720,
     "y": 210,
     "config": {}
    },
    {
     "id": "a11",
     "kind": "atom",
     "x": 1380,
     "y": 80,
     "config": {
      "name": "V"
     }
    },
    {
     "id": "f12",
     "kind": "and",
     "x": 940,
     "y": 210,
     "config": {}
    },
    {
     "id": "f13",
     "kind": "imp",
     "x": 1160,
     "y": 210,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "f5",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a7",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f8",
      "port": "out"
     },
     "to": {
      "node": "f10",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a9",
      "port": "out"
     },
     "to": {
      "node": "f10",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f10",
      "port": "out"
     },
     "to": {
      "node": "f12",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a11",
      "port": "out"
     },
     "to": {
      "node": "f12",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f12",
      "port": "out"
     },
     "to": {
      "node": "f13",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f13",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f13",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH1-60",
  "chapter": "prop",
  "code": "CH1-60",
  "title": "olc · 分离 · simp322 作为前件",
  "kicker": "set.mm / olc",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp322 作为前件"
  ],
  "allowed": [
   "archive:olc",
   "archive:simp322",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm olc（Propositional calculus）；本作不重证档案定理。",
  "target": "Q∨(U∧V∧(S∧(P∧Q∧R)∧T)→Q)",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "olc"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "simp322"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 700,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "V"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f6",
     "kind": "and",
     "x": 60,
     "y": 210,
     "config": {}
    },
    {
     "id": "a7",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f8",
     "kind": "and",
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "f9",
     "kind": "and",
     "x": 500,
     "y": 210,
     "config": {}
    },
    {
     "id": "a10",
     "kind": "atom",
     "x": 1380,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f11",
     "kind": "and",
     "x": 720,
     "y": 210,
     "config": {}
    },
    {
     "id": "f12",
     "kind": "and",
     "x": 940,
     "y": 210,
     "config": {}
    },
    {
     "id": "f13",
     "kind": "imp",
     "x": 1160,
     "y": 210,
     "config": {}
    },
    {
     "id": "d0",
     "kind": "detach",
     "x": 1040,
     "y": 700,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f6",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f6",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a7",
      "port": "out"
     },
     "to": {
      "node": "f8",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f8",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f9",
      "port": "out"
     },
     "to": {
      "node": "f11",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a10",
      "port": "out"
     },
     "to": {
      "node": "f11",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "f12",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f11",
      "port": "out"
     },
     "to": {
      "node": "f12",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f12",
      "port": "out"
     },
     "to": {
      "node": "f13",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f13",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f13",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "t",
      "port": "out"
     },
     "to": {
      "node": "d0",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "d0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-13",
  "chapter": "pred",
  "code": "CH2-13",
  "title": "alex · 档案",
  "kicker": "set.mm / alex",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:alex",
   "target"
  ],
  "reward": "—",
  "note": "set.mm alex（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∀ x P ↔ ¬ ∃ x ¬ P )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "alex"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-14",
  "chapter": "pred",
  "code": "CH2-14",
  "title": "ax-11 · 档案",
  "kicker": "set.mm / ax-11",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-11",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-11（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "( ∀ x ∀ y P → ∀ y ∀ x P )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-11"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-15",
  "chapter": "pred",
  "code": "CH2-15",
  "title": "exancom · 档案",
  "kicker": "set.mm / exancom",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:exancom",
   "target"
  ],
  "reward": "—",
  "note": "set.mm exancom（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∃ x ( P ∧ Q ) ↔ ∃ x ( Q ∧ P ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "exancom"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-16",
  "chapter": "pred",
  "code": "CH2-16",
  "title": "19.31v · 档案",
  "kicker": "set.mm / 19.31v",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:19.31v",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.31v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∀ x ( P ∨ Q ) ↔ ( ∀ x P ∨ Q ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "19.31v"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-17",
  "chapter": "pred",
  "code": "CH2-17",
  "title": "3exdistr · 档案",
  "kicker": "set.mm / 3exdistr",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:3exdistr",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3exdistr（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∃ x ∃ y ∃ z ( P ∧ Q ∧ R ) ↔ ∃ x ( P ∧ ∃ y ( Q ∧ ∃ z R ) ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3exdistr"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-18",
  "chapter": "pred",
  "code": "CH2-18",
  "title": "19.33b · 档案",
  "kicker": "set.mm / 19.33b",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:19.33b",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.33b（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ¬ ( ∃ x P ∧ ∃ x Q ) → ( ∀ x ( P ∨ Q ) ↔ ( ∀ x P ∨ ∀ x Q ) ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "19.33b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-19",
  "chapter": "pred",
  "code": "CH2-19",
  "title": "3anan32 · 代入",
  "kicker": "set.mm / 3anan32",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:3anan32",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3anan32（Propositional calculus）；本作不重证档案定理。",
  "target": "F(x)∧Q∧R↔F(x)∧R∧Q",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3anan32"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-20",
  "chapter": "pred",
  "code": "CH2-20",
  "title": "pm3.13 · 代入",
  "kicker": "set.mm / pm3.13",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm3.13",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm3.13（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(F(x)∧Q)→¬F(x)∨¬Q",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm3.13"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-21",
  "chapter": "pred",
  "code": "CH2-21",
  "title": "pm4.67 · 代入",
  "kicker": "set.mm / pm4.67",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm4.67",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.67（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(¬F(x)→¬Q)↔¬F(x)∧Q",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm4.67"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-22",
  "chapter": "pred",
  "code": "CH2-22",
  "title": "pm5.31r · 代入",
  "kicker": "set.mm / pm5.31r",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm5.31r",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm5.31r（Propositional calculus）；本作不重证档案定理。",
  "target": "R∧(F(x)→Q)→F(x)→R∧Q",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm5.31r"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-23",
  "chapter": "pred",
  "code": "CH2-23",
  "title": "simpl2l · 代入",
  "kicker": "set.mm / simpl2l",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:simpl2l",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simpl2l（Propositional calculus）；本作不重证档案定理。",
  "target": "R∧(F(x)∧Q)∧S∧T→F(x)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simpl2l"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-24",
  "chapter": "pred",
  "code": "CH2-24",
  "title": "pm2.61 · 代入",
  "kicker": "set.mm / pm2.61",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm2.61",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.61（Propositional calculus）；本作不重证档案定理。",
  "target": "(F(x)→Q)→(¬F(x)→Q)→Q",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.61"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-25",
  "chapter": "pred",
  "code": "CH2-25",
  "title": "simp3r1 · 代入",
  "kicker": "set.mm / simp3r1",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:simp3r1",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp3r1（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧U∧(S∧(F(x)∧Q∧R))→F(x)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp3r1"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-26",
  "chapter": "pred",
  "code": "CH2-26",
  "title": "19.29r · 代入",
  "kicker": "set.mm / 19.29r",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:19.29r",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.29r（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∃x F(x)∧∀x Q→∃x (F(x)∧Q)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "19.29r"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-27",
  "chapter": "pred",
  "code": "CH2-27",
  "title": "orimdi · 代入",
  "kicker": "set.mm / orimdi",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:orimdi",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm orimdi（Propositional calculus）；本作不重证档案定理。",
  "target": "F(x)∨(Q→R)↔F(x)∨Q→F(x)∨R",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "orimdi"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-28",
  "chapter": "pred",
  "code": "CH2-28",
  "title": "an43 · 代入",
  "kicker": "set.mm / an43",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:an43",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm an43（Propositional calculus）；本作不重证档案定理。",
  "target": "F(x)∧Q∧(R∧S)↔F(x)∧S∧(Q∧R)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "an43"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-29",
  "chapter": "pred",
  "code": "CH2-29",
  "title": "13an22anassOLD · 代入",
  "kicker": "set.mm / 13an22anassOLD",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:13an22anassOLD",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 13an22anassOLD（Propositional calculus）；本作不重证档案定理。",
  "target": "F(x)∧(Q∧R∧S)↔F(x)∧Q∧(R∧S)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "13an22anassOLD"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-30",
  "chapter": "pred",
  "code": "CH2-30",
  "title": "alrot4 · 代入",
  "kicker": "set.mm / alrot4",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:alrot4",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm alrot4（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x ∀y ∀z ∀w F(x)↔∀z ∀w ∀x ∀y F(x)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "alrot4"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH2-31",
  "chapter": "pred",
  "code": "CH2-31",
  "title": "orabs · 代入 + 闭包",
  "kicker": "set.mm / orabs",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:orabs",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm orabs（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)↔(F(x)∨Q)∧F(x))",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "orabs"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-32",
  "chapter": "pred",
  "code": "CH2-32",
  "title": "3orel3 · 代入 + 闭包",
  "kicker": "set.mm / 3orel3",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:3orel3",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3orel3（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (¬R→F(x)∨Q∨R→F(x)∨Q)",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3orel3"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-33",
  "chapter": "pred",
  "code": "CH2-33",
  "title": "simpr3l · 代入 + 闭包",
  "kicker": "set.mm / simpr3l",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:simpr3l",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simpr3l（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (T∧(R∧S∧(F(x)∧Q))→F(x))",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simpr3l"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-34",
  "chapter": "pred",
  "code": "CH2-34",
  "title": "simp21l · 代入 + 闭包",
  "kicker": "set.mm / simp21l",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:simp21l",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp21l（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (T∧(F(x)∧Q∧R∧S)∧U→F(x))",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp21l"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-35",
  "chapter": "pred",
  "code": "CH2-35",
  "title": "impt · 代入 + 闭包",
  "kicker": "set.mm / impt",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:impt",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm impt（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x ((F(x)→Q→R)→¬(F(x)→¬Q)→R)",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "impt"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-36",
  "chapter": "pred",
  "code": "CH2-36",
  "title": "pm5.36 · 代入 + 闭包",
  "kicker": "set.mm / pm5.36",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:pm5.36",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm5.36（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)∧(F(x)↔Q)↔Q∧(F(x)↔Q))",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm5.36"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-37",
  "chapter": "pred",
  "code": "CH2-37",
  "title": "pm2.75 · 代入 + 闭包",
  "kicker": "set.mm / pm2.75",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:pm2.75",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.75（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)∨Q→F(x)∨(Q→R)→F(x)∨R)",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.75"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-38",
  "chapter": "pred",
  "code": "CH2-38",
  "title": "anandi3 · 代入 + 闭包",
  "kicker": "set.mm / anandi3",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:anandi3",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm anandi3（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)∧Q∧R↔F(x)∧Q∧(F(x)∧R))",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "anandi3"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-39",
  "chapter": "pred",
  "code": "CH2-39",
  "title": "an42 · 代入 + 闭包",
  "kicker": "set.mm / an42",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:an42",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm an42（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)∧Q∧(R∧S)↔F(x)∧R∧(S∧Q))",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "an42"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-40",
  "chapter": "pred",
  "code": "CH2-40",
  "title": "imim21b · 代入 + 闭包",
  "kicker": "set.mm / imim21b",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:imim21b",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm imim21b（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x ((Q→F(x))→((F(x)→R)→Q→S↔Q→R→S))",
  "targetPos": {
   "x": 1300,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "imim21b"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-41",
  "chapter": "pred",
  "code": "CH2-41",
  "title": "pm4.66 · 代入 + 闭包 + 例化",
  "kicker": "set.mm / pm4.66",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:pm4.66",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.66（Propositional calculus）；本作不重证档案定理。",
  "target": "¬F(a)→¬Q↔F(a)∨¬Q",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm4.66"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-42",
  "chapter": "pred",
  "code": "CH2-42",
  "title": "pm2.63 · 代入 + 闭包 + 例化",
  "kicker": "set.mm / pm2.63",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:pm2.63",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.63（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)∨Q→¬F(a)∨Q→Q",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.63"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-43",
  "chapter": "pred",
  "code": "CH2-43",
  "title": "annim · 代入 + 闭包 + 例化",
  "kicker": "set.mm / annim",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:annim",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm annim（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)∧¬Q↔¬(F(a)→Q)",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "annim"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-44",
  "chapter": "pred",
  "code": "CH2-44",
  "title": "simp2ll · 代入 + 闭包 + 例化",
  "kicker": "set.mm / simp2ll",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:simp2ll",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp2ll（Propositional calculus）；本作不重证档案定理。",
  "target": "S∧(F(a)∧Q∧R)∧T→F(a)",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp2ll"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-45",
  "chapter": "pred",
  "code": "CH2-45",
  "title": "simp31l · 代入 + 闭包 + 例化",
  "kicker": "set.mm / simp31l",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:simp31l",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp31l（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧U∧(F(a)∧Q∧R∧S)→F(a)",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp31l"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-46",
  "chapter": "pred",
  "code": "CH2-46",
  "title": "3anor · 代入 + 闭包 + 例化",
  "kicker": "set.mm / 3anor",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:3anor",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3anor（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)∧Q∧R↔¬(¬F(a)∨¬Q∨¬R)",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3anor"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-47",
  "chapter": "pred",
  "code": "CH2-47",
  "title": "had1OLD · 代入 + 闭包 + 例化",
  "kicker": "set.mm / had1OLD",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:had1OLD",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm had1OLD（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)→(hadd(P, Q, R)↔Q↔R)",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "had1OLD"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-48",
  "chapter": "pred",
  "code": "CH2-48",
  "title": "looinv · 代入 + 闭包 + 例化",
  "kicker": "set.mm / looinv",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:looinv",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm looinv（Propositional calculus）；本作不重证档案定理。",
  "target": "((F(a)→Q)→Q)→(Q→F(a))→F(a)",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "looinv"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-49",
  "chapter": "pred",
  "code": "CH2-49",
  "title": "anandi · 代入 + 闭包 + 例化",
  "kicker": "set.mm / anandi",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:anandi",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm anandi（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)∧(Q∧R)↔F(a)∧Q∧(F(a)∧R)",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "anandi"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-50",
  "chapter": "pred",
  "code": "CH2-50",
  "title": "ordi · 代入 + 闭包 + 例化",
  "kicker": "set.mm / ordi",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:ordi",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ordi（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)∨Q∧R↔(F(a)∨Q)∧(F(a)∨R)",
  "targetPos": {
   "x": 1620,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ordi"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "pred",
     "x": 280,
     "y": 80,
     "config": {
      "name": "F",
      "arg": "x"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 940,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1260,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-51",
  "chapter": "pred",
  "code": "CH2-51",
  "title": "pm2.521g2 · 双代入",
  "kicker": "set.mm / pm2.521g2",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm2.521g2",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.521g2（Propositional calculus）；本作不重证档案定理。",
  "target": "¬((U→V)→W∧X)→R→U→V",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.521g2"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "V"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "W"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "X"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-52",
  "chapter": "pred",
  "code": "CH2-52",
  "title": "simpllr · 双代入",
  "kicker": "set.mm / simpllr",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simpllr",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simpllr（Propositional calculus）；本作不重证档案定理。",
  "target": "(W→X)∧(Y∧Z)∧R∧S→Y∧Z",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simpllr"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "W"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "X"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "Y"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "Z"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-53",
  "chapter": "pred",
  "code": "CH2-53",
  "title": "simplr3 · 双代入",
  "kicker": "set.mm / simplr3",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simplr3",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simplr3（Propositional calculus）；本作不重证档案定理。",
  "target": "S∧((A→B)∧(C∧D)∧R)∧T→R",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simplr3"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "A"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "B"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "C"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "D"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-54",
  "chapter": "pred",
  "code": "CH2-54",
  "title": "simp3l1 · 双代入",
  "kicker": "set.mm / simp3l1",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simp3l1",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp3l1（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧U∧((B→C)∧(D∧E)∧R∧S)→B→C",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "simp3l1"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "B"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "C"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "D"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "E"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-55",
  "chapter": "pred",
  "code": "CH2-55",
  "title": "pm2.49 · 双代入",
  "kicker": "set.mm / pm2.49",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm2.49",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.49（Propositional calculus）；本作不重证档案定理。",
  "target": "¬((X→Y)∨Z∧A)→¬(X→Y)∨¬(Z∧A)",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.49"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "X"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Y"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "Z"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "A"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-56",
  "chapter": "pred",
  "code": "CH2-56",
  "title": "pm2.8 · 双代入",
  "kicker": "set.mm / pm2.8",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm2.8",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.8（Propositional calculus）；本作不重证档案定理。",
  "target": "(Y→Z)∨A∧B→¬(A∧B)∨R→(Y→Z)∨R",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm2.8"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Y"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Z"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "A"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "B"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-57",
  "chapter": "pred",
  "code": "CH2-57",
  "title": "pm3.3 · 双代入",
  "kicker": "set.mm / pm3.3",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm3.3",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm3.3（Propositional calculus）；本作不重证档案定理。",
  "target": "((V→W)∧(X∧Y)→R)→(V→W)→X∧Y→R",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "pm3.3"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "V"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "W"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "X"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "Y"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-58",
  "chapter": "pred",
  "code": "CH2-58",
  "title": "alsyl · 双代入",
  "kicker": "set.mm / alsyl",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:alsyl",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm alsyl（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x ((T→U)→V∧W)∧∀x (V∧W→R)→∀x ((T→U)→R)",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "alsyl"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "V"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "W"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-59",
  "chapter": "pred",
  "code": "CH2-59",
  "title": "3jao · 双代入",
  "kicker": "set.mm / 3jao",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:3jao",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3jao（Propositional calculus）；本作不重证档案定理。",
  "target": "((C→D)→E∧F)∧(R→E∧F)∧(S→E∧F)→(C→D)∨R∨S→E∧F",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "3jao"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "C"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "D"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "E"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "F"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH2-60",
  "chapter": "pred",
  "code": "CH2-60",
  "title": "4exmid · 双代入",
  "kicker": "set.mm / 4exmid",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:4exmid",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 4exmid（Propositional calculus）；本作不重证档案定理。",
  "target": "(Z→A)∧(B∧C)∨¬(Z→A)∧¬(B∧C)∨((Z→A)∧¬(B∧C)∨B∧C∧¬(Z→A))",
  "targetPos": {
   "x": 1960,
   "y": 640
  },
  "world": {
   "w": 2480,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "4exmid"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Z"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "A"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "s1",
     "kind": "subst",
     "x": 980,
     "y": 700,
     "config": {}
    },
    {
     "id": "a4",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 940,
     "y": 80,
     "config": {
      "name": "B"
     }
    },
    {
     "id": "a6",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "C"
     }
    },
    {
     "id": "f7",
     "kind": "and",
     "x": 1600,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a4",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a5",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a6",
      "port": "out"
     },
     "to": {
      "node": "f7",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f7",
      "port": "out"
     },
     "to": {
      "node": "s1",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-13",
  "chapter": "eq",
  "code": "CH3-13",
  "title": "equequ1 · 档案",
  "kicker": "set.mm / equequ1",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:equequ1",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equequ1（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( x = y → ( x = z ↔ y = z ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equequ1"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-14",
  "chapter": "eq",
  "code": "CH3-14",
  "title": "ax8 · 档案",
  "kicker": "set.mm / ax8",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax8",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax8（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( x = y → ( x ∈ z → y ∈ z ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax8"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-15",
  "chapter": "eq",
  "code": "CH3-15",
  "title": "axc16 · 档案",
  "kicker": "set.mm / axc16",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:axc16",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc16（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "( ∀ x x = y → ( P → ∀ x P ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc16"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-16",
  "chapter": "eq",
  "code": "CH3-16",
  "title": "axc11r · 档案",
  "kicker": "set.mm / axc11r",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:axc11r",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc11r（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "( ∀ y y = x → ( ∀ x P → ∀ y P ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc11r"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-17",
  "chapter": "eq",
  "code": "CH3-17",
  "title": "equvel · 档案",
  "kicker": "set.mm / equvel",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:equvel",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equvel（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "( ∀ z ( z = x ↔ z = y ) → x = y )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equvel"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-18",
  "chapter": "eq",
  "code": "CH3-18",
  "title": "19.12vvv · 档案",
  "kicker": "set.mm / 19.12vvv",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:19.12vvv",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.12vvv（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∃ x ∀ y ( P → Q ) ↔ ∀ y ∃ x ( P → Q ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "19.12vvv"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-19",
  "chapter": "eq",
  "code": "CH3-19",
  "title": "axc16gb · 定义置换",
  "kicker": "set.mm / axc16gb",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:axc16gb",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc16gb（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x x = y→(P→∀z P)∧(∀z P→P)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc16gb"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "dfbi2:expand:b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "r0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "r0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-20",
  "chapter": "eq",
  "code": "CH3-20",
  "title": "19.44v · 定义置换",
  "kicker": "set.mm / 19.44v",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:19.44v",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.44v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "(∃x (P∨Q)→∃x P∨Q)∧(∃x P∨Q→∃x (P∨Q))",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "19.44v"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "dfbi2:expand:@"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "r0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "r0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-21",
  "chapter": "eq",
  "code": "CH3-21",
  "title": "ax12b · 定义置换",
  "kicker": "set.mm / ax12b",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax12b",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax12b（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "¬∀x x = y∧x = y→(P→∀x (x = y→P))∧(∀x (x = y→P)→P)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax12b"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "dfbi2:expand:b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "r0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "r0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-22",
  "chapter": "eq",
  "code": "CH3-22",
  "title": "ax12v · 全称闭包",
  "kicker": "set.mm / ax12v",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax12v",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax12v（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = y→P→∀x (x = y→P))",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax12v"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-23",
  "chapter": "eq",
  "code": "CH3-23",
  "title": "19.9v · 代入",
  "kicker": "set.mm / 19.9v",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:19.9v",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.9v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∃x ¬U↔¬U",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "19.9v"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "f2",
     "kind": "not",
     "x": 500,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-24",
  "chapter": "eq",
  "code": "CH3-24",
  "title": "qexmid · 代入",
  "kicker": "set.mm / qexmid",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:qexmid",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm qexmid（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃x (¬Q→∀x ¬Q)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "qexmid"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f2",
     "kind": "not",
     "x": 500,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f2",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "f2",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-25",
  "chapter": "eq",
  "code": "CH3-25",
  "title": "hba1 · 代入",
  "kicker": "set.mm / hba1",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:hba1",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm hba1（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x (Q∧R)→∀x ∀x (Q∧R)",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "hba1"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-26",
  "chapter": "eq",
  "code": "CH3-26",
  "title": "19.44v · 代入",
  "kicker": "set.mm / 19.44v",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:19.44v",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.44v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∃x ((N↔O)∨Q)↔∃x (N↔O)∨Q",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "19.44v"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "N"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "O"
     }
    },
    {
     "id": "f3",
     "kind": "iff",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-27",
  "chapter": "eq",
  "code": "CH3-27",
  "title": "axc11r · 代入",
  "kicker": "set.mm / axc11r",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:axc11r",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc11r（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀y y = x→∀x (S↔T)→∀y (S↔T)",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc11r"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f3",
     "kind": "iff",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-28",
  "chapter": "eq",
  "code": "CH3-28",
  "title": "19.12vv · 代入",
  "kicker": "set.mm / 19.12vv",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:19.12vv",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.12vv（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃x ∀y (R∨S→Q)↔∀y ∃x (R∨S→Q)",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "19.12vv"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "R"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "S"
     }
    },
    {
     "id": "f3",
     "kind": "or",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-29",
  "chapter": "eq",
  "code": "CH3-29",
  "title": "ax-12 · 代入",
  "kicker": "set.mm / ax-12",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:ax-12",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-12（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "x = y→∀y (O→Q)→∀x (x = y→O→Q)",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-12"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "O"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "Q"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-30",
  "chapter": "eq",
  "code": "CH3-30",
  "title": "equs5 · 代入",
  "kicker": "set.mm / equs5",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:equs5",
   "atom",
   "pred",
   "not",
   "imp",
   "or",
   "and",
   "iff",
   "subst",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equs5（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "¬∀x x = y→(∃x (x = y∧(T→U))↔∀x (x = y→T→U))",
  "targetPos": {
   "x": 1080,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equs5"
     }
    },
    {
     "id": "s0",
     "kind": "subst",
     "x": 620,
     "y": 700,
     "config": {}
    },
    {
     "id": "a0",
     "kind": "atom",
     "x": 60,
     "y": 80,
     "config": {
      "name": "P"
     }
    },
    {
     "id": "a1",
     "kind": "atom",
     "x": 280,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "a2",
     "kind": "atom",
     "x": 500,
     "y": 80,
     "config": {
      "name": "U"
     }
    },
    {
     "id": "f3",
     "kind": "imp",
     "x": 720,
     "y": 80,
     "config": {}
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "a0",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "atom"
     }
    },
    {
     "from": {
      "node": "a1",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f3",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "f3",
      "port": "out"
     },
     "to": {
      "node": "s0",
      "port": "formula"
     }
    },
    {
     "from": {
      "node": "s0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH3-31",
  "chapter": "eq",
  "code": "CH3-31",
  "title": "equcomiv · 例化",
  "kicker": "set.mm / equcomiv",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equcomiv",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equcomiv（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = y→y = a",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equcomiv"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-32",
  "chapter": "eq",
  "code": "CH3-32",
  "title": "axc16 · 例化",
  "kicker": "set.mm / axc16",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axc16",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc16（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x x = a→P→∀x P",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc16"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-33",
  "chapter": "eq",
  "code": "CH3-33",
  "title": "axc16 · 例化",
  "kicker": "set.mm / axc16",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axc16",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc16（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x x = b→P→∀x P",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc16"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-34",
  "chapter": "eq",
  "code": "CH3-34",
  "title": "equeuclr · 例化",
  "kicker": "set.mm / equeuclr",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equeuclr",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equeuclr（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = z→y = z→y = a",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equeuclr"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-35",
  "chapter": "eq",
  "code": "CH3-35",
  "title": "aev · 例化",
  "kicker": "set.mm / aev",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:aev",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm aev（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x x = a→∀z t = u",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "aev"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-36",
  "chapter": "eq",
  "code": "CH3-36",
  "title": "ax8v · 例化",
  "kicker": "set.mm / ax8v",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax8v",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax8v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = y→a ∈ z→y ∈ z",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax8v"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-37",
  "chapter": "eq",
  "code": "CH3-37",
  "title": "ax9v · 例化",
  "kicker": "set.mm / ax9v",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax9v",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax9v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = y→z ∈ a→z ∈ y",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax9v"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-38",
  "chapter": "eq",
  "code": "CH3-38",
  "title": "alequexv · 例化",
  "kicker": "set.mm / alequexv",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:alequexv",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm alequexv（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = a→P)→∃x P",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "alequexv"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-39",
  "chapter": "eq",
  "code": "CH3-39",
  "title": "ru0 · 例化",
  "kicker": "set.mm / ru0",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ru0",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ru0（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "¬∀x (x ∈ a↔¬x ∈ x)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ru0"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-40",
  "chapter": "eq",
  "code": "CH3-40",
  "title": "axc11 · 例化",
  "kicker": "set.mm / axc11",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axc11",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc11（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x x = a→∀x P→∀y P",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc11"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-41",
  "chapter": "eq",
  "code": "CH3-41",
  "title": "2ax6e · 例化",
  "kicker": "set.mm / 2ax6e",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:2ax6e",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 2ax6e（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃z ∃w (z = a∧w = y)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "2ax6e"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-42",
  "chapter": "eq",
  "code": "CH3-42",
  "title": "ax13lem2 · 例化",
  "kicker": "set.mm / ax13lem2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax13lem2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax13lem2（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "¬a = y→∃x z = y→z = y",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax13lem2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-43",
  "chapter": "eq",
  "code": "CH3-43",
  "title": "equvelv · 例化",
  "kicker": "set.mm / equvelv",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equvelv",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equvelv（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀z (z = a→z = y)↔a = y",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equvelv"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-44",
  "chapter": "eq",
  "code": "CH3-44",
  "title": "equvelv · 例化",
  "kicker": "set.mm / equvelv",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equvelv",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equvelv（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀z (z = b→z = y)↔b = y",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equvelv"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-45",
  "chapter": "eq",
  "code": "CH3-45",
  "title": "equs4 · 例化",
  "kicker": "set.mm / equs4",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equs4",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equs4（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = a→P)→∃x (x = a∧P)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equs4"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-46",
  "chapter": "eq",
  "code": "CH3-46",
  "title": "equs5aALT · 例化",
  "kicker": "set.mm / equs5aALT",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equs5aALT",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equs5aALT（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃x (x = a∧∀y P)→∀x (x = a→P)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equs5aALT"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-47",
  "chapter": "eq",
  "code": "CH3-47",
  "title": "equs5e · 例化",
  "kicker": "set.mm / equs5e",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equs5e",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equs5e（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃x (x = a∧P)→∀x (x = a→∃y P)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equs5e"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-48",
  "chapter": "eq",
  "code": "CH3-48",
  "title": "equs5e · 例化",
  "kicker": "set.mm / equs5e",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equs5e",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equs5e（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃x (x = b∧P)→∀x (x = b→∃y P)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equs5e"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-49",
  "chapter": "eq",
  "code": "CH3-49",
  "title": "equcom · 例化",
  "kicker": "set.mm / equcom",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equcom",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equcom（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = b↔b = a",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equcom"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-50",
  "chapter": "eq",
  "code": "CH3-50",
  "title": "ax8v · 例化",
  "kicker": "set.mm / ax8v",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax8v",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax8v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = b→a ∈ z→b ∈ z",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax8v"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-51",
  "chapter": "eq",
  "code": "CH3-51",
  "title": "ax-9 · 例化",
  "kicker": "set.mm / ax-9",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-9",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-9（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = b→z ∈ a→z ∈ b",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-9"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-52",
  "chapter": "eq",
  "code": "CH3-52",
  "title": "aecom · 例化",
  "kicker": "set.mm / aecom",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:aecom",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm aecom（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x x = b↔∀y y = a",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "aecom"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-53",
  "chapter": "eq",
  "code": "CH3-53",
  "title": "ax7v · 例化",
  "kicker": "set.mm / ax7v",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax7v",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax7v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = b→a = z→b = z",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax7v"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-54",
  "chapter": "eq",
  "code": "CH3-54",
  "title": "elequ2 · 例化",
  "kicker": "set.mm / elequ2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:elequ2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm elequ2（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = b→(z ∈ a↔z ∈ b)",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "elequ2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-55",
  "chapter": "eq",
  "code": "CH3-55",
  "title": "equequ1 · 例化",
  "kicker": "set.mm / equequ1",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equequ1",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equequ1（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = b→(a = z↔b = z)",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "equequ1"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-56",
  "chapter": "eq",
  "code": "CH3-56",
  "title": "ax12ev2 · 例化",
  "kicker": "set.mm / ax12ev2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax12ev2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax12ev2（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃x (x = b∧P)→a = b→P",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax12ev2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-57",
  "chapter": "eq",
  "code": "CH3-57",
  "title": "ax13lem1 · 例化",
  "kicker": "set.mm / ax13lem1",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax13lem1",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax13lem1（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "¬a = b→z = b→∀x z = b",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax13lem1"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-58",
  "chapter": "eq",
  "code": "CH3-58",
  "title": "dveel2 · 例化",
  "kicker": "set.mm / dveel2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:dveel2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm dveel2（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "¬∀x x = a→b ∈ a→∀x b ∈ a",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "dveel2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-59",
  "chapter": "eq",
  "code": "CH3-59",
  "title": "axc9 · 例化",
  "kicker": "set.mm / axc9",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axc9",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc9（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "¬∀z z = a→¬∀z z = b→a = b→∀z a = b",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc9"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH3-60",
  "chapter": "eq",
  "code": "CH3-60",
  "title": "ax13b · 例化",
  "kicker": "set.mm / ax13b",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax13b",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax13b（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "¬a = b→b = z→P↔¬a = b→¬a = z→b = z→P",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax13b"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-13",
  "chapter": "set",
  "code": "CH4-13",
  "title": "vex · 档案",
  "kicker": "set.mm / vex",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:vex",
   "target"
  ],
  "reward": "—",
  "note": "set.mm vex（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "x ∈ V",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "vex"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-14",
  "chapter": "set",
  "code": "CH4-14",
  "title": "vneqv · 档案",
  "kicker": "set.mm / vneqv",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:vneqv",
   "target"
  ],
  "reward": "—",
  "note": "set.mm vneqv（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "¬ x = V",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "vneqv"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-15",
  "chapter": "set",
  "code": "CH4-15",
  "title": "fin41 · 档案",
  "kicker": "set.mm / fin41",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:fin41",
   "target"
  ],
  "reward": "—",
  "note": "set.mm fin41（ZFC Set Theory - add Countable Choice and Dependent Choice）；本作不重证档案定理。",
  "target": "Fin4 = Fin",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "fin41"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-16",
  "chapter": "set",
  "code": "CH4-16",
  "title": "en3lp · 档案",
  "kicker": "set.mm / en3lp",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:en3lp",
   "target"
  ],
  "reward": "—",
  "note": "set.mm en3lp（ZF Set Theory - add the Axiom of Regularity）；本作不重证档案定理。",
  "target": "¬ ( A ∈ B ∧ B ∈ C ∧ C ∈ A )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "en3lp"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-17",
  "chapter": "set",
  "code": "CH4-17",
  "title": "eqtr2 · 档案",
  "kicker": "set.mm / eqtr2",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:eqtr2",
   "target"
  ],
  "reward": "—",
  "note": "set.mm eqtr2（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "( ( A = B ∧ A = C ) → B = C )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "eqtr2"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-18",
  "chapter": "set",
  "code": "CH4-18",
  "title": "axprlem1 · 档案",
  "kicker": "set.mm / axprlem1",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:axprlem1",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axprlem1（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∃ x ∀ y ( ∀ z ¬ z ∈ y → y ∈ x )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axprlem1"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-19",
  "chapter": "set",
  "code": "CH4-19",
  "title": "ax-pr · 档案",
  "kicker": "set.mm / ax-pr",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-pr",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pr（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∃ z ∀ w ( ( w = x ∨ w = y ) → w ∈ z )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-pr"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-20",
  "chapter": "set",
  "code": "CH4-20",
  "title": "axunnd · 档案",
  "kicker": "set.mm / axunnd",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:axunnd",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axunnd（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∃ x ∀ y ( ∃ x ( y ∈ x ∧ x ∈ z ) → y ∈ x )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axunnd"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-21",
  "chapter": "set",
  "code": "CH4-21",
  "title": "oneltri · 档案",
  "kicker": "set.mm / oneltri",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:oneltri",
   "target"
  ],
  "reward": "—",
  "note": "set.mm oneltri（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "( ( A ∈ On ∧ B ∈ On ) → ( A ∈ B ∨ B ∈ A ∨ A = B ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "oneltri"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-22",
  "chapter": "set",
  "code": "CH4-22",
  "title": "axrep1 · 档案",
  "kicker": "set.mm / axrep1",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:axrep1",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axrep1（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∃ x ( ∃ y ∀ z ( P → z = y ) → ∀ z ( z ∈ x ↔ ∃ x ( x ∈ y ∧ P ) ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axrep1"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-23",
  "chapter": "set",
  "code": "CH4-23",
  "title": "axacnd · 档案",
  "kicker": "set.mm / axacnd",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:axacnd",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axacnd（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∃ x ∀ y ∀ z ( ∀ x ( y ∈ z ∧ z ∈ w ) → ∃ w ∀ y ( ∃ w ( ( y ∈ z ∧ z ∈ w ) ∧ ( y ∈ w ∧ w ∈ x ) ) ↔ y = w ) )",
  "targetPos": {
   "x": 900,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axacnd"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-24",
  "chapter": "set",
  "code": "CH4-24",
  "title": "axinfnd · 定义置换",
  "kicker": "set.mm / axinfnd",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:axinfnd",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axinfnd（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∃x (y ∈ z→¬(y ∈ x→¬∀y (y ∈ x→∃z (y ∈ z∧z ∈ x))))",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axinfnd"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-an:expand:a.b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "r0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "r0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-25",
  "chapter": "set",
  "code": "CH4-25",
  "title": "axreplem · 定义置换",
  "kicker": "set.mm / axreplem",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:axreplem",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axreplem（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "x = y→(∃u (P→∀v (Q↔∃w (z ∈ x∧R)))↔∃u (P→∀v (Q↔¬∀w ¬(z ∈ y∧R))))",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axreplem"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-ex:expand:b.b.a.b.a.b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "r0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "r0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-26",
  "chapter": "set",
  "code": "CH4-26",
  "title": "ax-ext · 全称闭包",
  "kicker": "set.mm / ax-ext",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-ext",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ext（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "∀x (∀z (z ∈ x↔z ∈ y)→x = y)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-ext"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-27",
  "chapter": "set",
  "code": "CH4-27",
  "title": "ax-ext · 全称闭包",
  "kicker": "set.mm / ax-ext",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-ext",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ext（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "∀y (∀z (z ∈ x↔z ∈ y)→x = y)",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-ext"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-28",
  "chapter": "set",
  "code": "CH4-28",
  "title": "axextb · 全称闭包",
  "kicker": "set.mm / axextb",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:axextb",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axextb（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "∀x (x = y↔∀z (z ∈ x↔z ∈ y))",
  "targetPos": {
   "x": 980,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axextb"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-29",
  "chapter": "set",
  "code": "CH4-29",
  "title": "ax-ext · 全称闭包",
  "kicker": "set.mm / ax-ext",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-ext",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ext（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "∀y ∀x (∀z (z ∈ x↔z ∈ y)→x = y)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-ext"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "y"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-30",
  "chapter": "set",
  "code": "CH4-30",
  "title": "ax-ext · 全称闭包",
  "kicker": "set.mm / ax-ext",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-ext",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ext（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "∀x ∀y (∀z (z ∈ x↔z ∈ y)→x = y)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-ext"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "base"
 },
 {
  "id": "CH4-31",
  "chapter": "set",
  "code": "CH4-31",
  "title": "elirrvOLDOLD · 例化",
  "kicker": "set.mm / elirrvOLDOLD",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:elirrvOLDOLD",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm elirrvOLDOLD（ZF Set Theory - add the Axiom of Regularity）；本作不重证档案定理。",
  "target": "¬a ∈ a",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "elirrvOLDOLD"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-32",
  "chapter": "set",
  "code": "CH4-32",
  "title": "elALT2 · 例化",
  "kicker": "set.mm / elALT2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:elALT2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm elALT2（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∃y a ∈ y",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "elALT2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-33",
  "chapter": "set",
  "code": "CH4-33",
  "title": "dtru · 例化",
  "kicker": "set.mm / dtru",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:dtru",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm dtru（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "¬∀x x = a",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "dtru"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-34",
  "chapter": "set",
  "code": "CH4-34",
  "title": "axc16b · 例化",
  "kicker": "set.mm / axc16b",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axc16b",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc16b（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∀x x = b→P→∀x P",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axc16b"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-35",
  "chapter": "set",
  "code": "CH4-35",
  "title": "nd4 · 例化",
  "kicker": "set.mm / nd4",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:nd4",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm nd4（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∀x x = y→¬∀z y ∈ a",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "nd4"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-36",
  "chapter": "set",
  "code": "CH4-36",
  "title": "nd2 · 例化",
  "kicker": "set.mm / nd2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:nd2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm nd2（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∀x x = b→¬∀x z ∈ b",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "nd2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-37",
  "chapter": "set",
  "code": "CH4-37",
  "title": "eleq2w2 · 例化",
  "kicker": "set.mm / eleq2w2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:eleq2w2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm eleq2w2（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "A = B→(b ∈ A↔b ∈ B)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "eleq2w2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-38",
  "chapter": "set",
  "code": "CH4-38",
  "title": "axsep · 例化",
  "kicker": "set.mm / axsep",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axsep",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axsep（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∃y ∀x (x ∈ y↔x ∈ b∧P)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axsep"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-39",
  "chapter": "set",
  "code": "CH4-39",
  "title": "axextb · 例化",
  "kicker": "set.mm / axextb",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axextb",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axextb（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "a = y↔∀z (z ∈ a↔z ∈ y)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axextb"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-40",
  "chapter": "set",
  "code": "CH4-40",
  "title": "axun2 · 例化",
  "kicker": "set.mm / axun2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axun2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axun2（ZF Set Theory - add the Axiom of Union）；本作不重证档案定理。",
  "target": "∃y ∀z (z ∈ y↔∃w (z ∈ w∧w ∈ b))",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axun2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-41",
  "chapter": "set",
  "code": "CH4-41",
  "title": "ax-rep · 例化",
  "kicker": "set.mm / ax-rep",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-rep",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-rep（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∀w ∃y ∀z (∀y P→z = y)→∃y ∀z (z ∈ y↔∃w (w ∈ b∧∀y P))",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-rep"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-42",
  "chapter": "set",
  "code": "CH4-42",
  "title": "axpowndlem2 · 例化",
  "kicker": "set.mm / axpowndlem2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axpowndlem2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axpowndlem2（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "¬∀x x = b→¬∀x x = z→∃x ∀y (∀x (∃z x ∈ y→∀y x ∈ z)→y ∈ x)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axpowndlem2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-43",
  "chapter": "set",
  "code": "CH4-43",
  "title": "axreplem · 例化",
  "kicker": "set.mm / axreplem",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axreplem",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axreplem（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "a = y→(∃u (P→∀v (Q↔∃w (z ∈ a∧R)))↔∃u (P→∀v (Q↔∃w (z ∈ y∧R))))",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axreplem"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-44",
  "chapter": "set",
  "code": "CH4-44",
  "title": "axpowndlem4 · 例化",
  "kicker": "set.mm / axpowndlem4",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axpowndlem4",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axpowndlem4（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "¬∀y y = a→¬∀y y = z→¬a = y→∃x ∀y (∀x (∃z x ∈ y→∀y x ∈ z)→y ∈ x)",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axpowndlem4"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-45",
  "chapter": "set",
  "code": "CH4-45",
  "title": "ax-ac · 例化",
  "kicker": "set.mm / ax-ac",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-ac",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ac（ZFC Set Theory - add the Axiom of Choice）；本作不重证档案定理。",
  "target": "∃y ∀z ∀w (z ∈ w∧w ∈ c→∃v ∀u (∃t (u ∈ w∧w ∈ t∧(u ∈ t∧t ∈ y))↔u = v))",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-ac"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "c"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-46",
  "chapter": "set",
  "code": "CH4-46",
  "title": "axacndlem3 · 例化",
  "kicker": "set.mm / axacndlem3",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axacndlem3",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axacndlem3（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∀y y = a→∃x ∀y ∀z (∀x (y ∈ z∧z ∈ w)→∃w ∀y (∃w (y ∈ z∧z ∈ w∧(y ∈ w∧w ∈ x))↔y = w))",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axacndlem3"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-47",
  "chapter": "set",
  "code": "CH4-47",
  "title": "axacndlem3 · 例化",
  "kicker": "set.mm / axacndlem3",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axacndlem3",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axacndlem3（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∀y y = b→∃x ∀y ∀z (∀x (y ∈ z∧z ∈ w)→∃w ∀y (∃w (y ∈ z∧z ∈ w∧(y ∈ w∧w ∈ x))↔y = w))",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axacndlem3"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-48",
  "chapter": "set",
  "code": "CH4-48",
  "title": "ax-ac2 · 例化",
  "kicker": "set.mm / ax-ac2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-ac2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ac2（ZFC Set Theory - add the Axiom of Choice）；本作不重证档案定理。",
  "target": "∃y ∀z ∃v ∀u (y ∈ a∧(z ∈ y→v ∈ a∧¬y = v∧z ∈ v)∨¬y ∈ a∧(z ∈ a→v ∈ z∧v ∈ y∧(u ∈ z∧u ∈ y→u = v)))",
  "targetPos": {
   "x": 1280,
   "y": 640
  },
  "world": {
   "w": 2200,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "ax-ac2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 920,
     "y": 700,
     "config": {
      "term": "a"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-49",
  "chapter": "set",
  "code": "CH4-49",
  "title": "dvdemo1 · 例化",
  "kicker": "set.mm / dvdemo1",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:dvdemo1",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm dvdemo1（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∃x (x = a→b ∈ x)",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "dvdemo1"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-50",
  "chapter": "set",
  "code": "CH4-50",
  "title": "nd1 · 例化",
  "kicker": "set.mm / nd1",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:nd1",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm nd1（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∀x x = a→¬∀x a ∈ b",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "nd1"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-51",
  "chapter": "set",
  "code": "CH4-51",
  "title": "nd3 · 例化",
  "kicker": "set.mm / nd3",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:nd3",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm nd3（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∀x x = b→¬∀z a ∈ b",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "nd3"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-52",
  "chapter": "set",
  "code": "CH4-52",
  "title": "eleq1w · 例化",
  "kicker": "set.mm / eleq1w",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:eleq1w",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm eleq1w（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "a = b→(a ∈ A↔b ∈ A)",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "eleq1w"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-53",
  "chapter": "set",
  "code": "CH4-53",
  "title": "axextg · 例化",
  "kicker": "set.mm / axextg",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axextg",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axextg（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "∀z (z ∈ a↔z ∈ b)→a = b",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axextg"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-54",
  "chapter": "set",
  "code": "CH4-54",
  "title": "axexte · 例化",
  "kicker": "set.mm / axexte",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axexte",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axexte（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "∃z ((z ∈ a↔z ∈ b)→a = b)",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axexte"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-55",
  "chapter": "set",
  "code": "CH4-55",
  "title": "axpr · 例化",
  "kicker": "set.mm / axpr",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axpr",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axpr（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∃z ∀w (w = a∨w = b→w ∈ z)",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axpr"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-56",
  "chapter": "set",
  "code": "CH4-56",
  "title": "axregndlem2 · 例化",
  "kicker": "set.mm / axregndlem2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axregndlem2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axregndlem2（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "a ∈ b→∃x (x ∈ b∧∀z (z ∈ x→¬z ∈ b))",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axregndlem2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-57",
  "chapter": "set",
  "code": "CH4-57",
  "title": "axpownd · 例化",
  "kicker": "set.mm / axpownd",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axpownd",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axpownd（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "¬a = b→∃x ∀y (∀x (∃z x ∈ y→∀y x ∈ z)→y ∈ x)",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axpownd"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "x"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-58",
  "chapter": "set",
  "code": "CH4-58",
  "title": "axinfnd · 例化",
  "kicker": "set.mm / axinfnd",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axinfnd",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axinfnd（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "∃x (a ∈ b→a ∈ x∧∀y (y ∈ x→∃z (y ∈ z∧z ∈ x)))",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axinfnd"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-59",
  "chapter": "set",
  "code": "CH4-59",
  "title": "axpowndlem2 · 例化",
  "kicker": "set.mm / axpowndlem2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axpowndlem2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axpowndlem2（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "¬∀x x = a→¬∀x x = b→∃x ∀y (∀x (∃z x ∈ y→∀y x ∈ b)→y ∈ x)",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axpowndlem2"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 },
 {
  "id": "CH4-60",
  "chapter": "set",
  "code": "CH4-60",
  "title": "axrepndlem1 · 例化",
  "kicker": "set.mm / axrepndlem1",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axrepndlem1",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axrepndlem1（ZFC Axioms with no distinct variable requirements）；本作不重证档案定理。",
  "target": "¬∀y y = b→∃x (∃y ∀z (P→z = y)→∀z (z ∈ x↔∃x (x ∈ a∧∀y P)))",
  "targetPos": {
   "x": 1880,
   "y": 640
  },
  "world": {
   "w": 2400,
   "h": 1340
  },
  "solution": {
   "nodes": [
    {
     "id": "src",
     "kind": "archive",
     "x": 60,
     "y": 700,
     "config": {
      "label": "axrepndlem1"
     }
    },
    {
     "id": "i0",
     "kind": "all-intro",
     "x": 620,
     "y": 700,
     "config": {
      "v": "z"
     }
    },
    {
     "id": "i1",
     "kind": "all-intro",
     "x": 920,
     "y": 700,
     "config": {
      "v": "y"
     }
    },
    {
     "id": "e0",
     "kind": "all-elim",
     "x": 1220,
     "y": 700,
     "config": {
      "term": "a"
     }
    },
    {
     "id": "e1",
     "kind": "all-elim",
     "x": 1520,
     "y": 700,
     "config": {
      "term": "b"
     }
    }
   ],
   "edges": [
    {
     "from": {
      "node": "src",
      "port": "out"
     },
     "to": {
      "node": "i0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i0",
      "port": "out"
     },
     "to": {
      "node": "i1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "i1",
      "port": "out"
     },
     "to": {
      "node": "e0",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e0",
      "port": "out"
     },
     "to": {
      "node": "e1",
      "port": "assertion"
     }
    },
    {
     "from": {
      "node": "e1",
      "port": "out"
     },
     "to": {
      "node": "target",
      "port": "proof"
     }
    }
   ]
  },
  "band": "challenge"
 }
];
  GENERATED.forEach(function (lv, i) {
    lv.index = (window.RSL.LEVELS || []).length + i;
    lv.order = i + 1;
    lv.chapter = lv.chapter;
    lv.allowed = lv.allowed || [];
    lv.target = lv.target.trim();
  });
  window.RSL.LEVELS = (window.RSL.LEVELS || []).concat(GENERATED);
})();
