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
  "title": "conax1 · 档案",
  "kicker": "set.mm / conax1",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:conax1",
   "target"
  ],
  "reward": "—",
  "note": "set.mm conax1（Propositional calculus）；本作不重证档案定理。",
  "target": "( ¬ ( P → Q ) → ¬ Q )",
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
      "label": "conax1"
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
  }
 },
 {
  "id": "CH1-14",
  "chapter": "prop",
  "code": "CH1-14",
  "title": "imnan · 档案",
  "kicker": "set.mm / imnan",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:imnan",
   "target"
  ],
  "reward": "—",
  "note": "set.mm imnan（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( P → ¬ Q ) ↔ ¬ ( P ∧ Q ) )",
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
      "label": "imnan"
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
  }
 },
 {
  "id": "CH1-15",
  "chapter": "prop",
  "code": "CH1-15",
  "title": "simprll · 档案",
  "kicker": "set.mm / simprll",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:simprll",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simprll（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( P ∧ ( ( Q ∧ R ) ∧ S ) ) → Q )",
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
      "label": "simprll"
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
  }
 },
 {
  "id": "CH1-16",
  "chapter": "prop",
  "code": "CH1-16",
  "title": "pm2.62 · 档案",
  "kicker": "set.mm / pm2.62",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:pm2.62",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm2.62（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( P ∨ Q ) → ( ( P → Q ) → Q ) )",
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
      "label": "pm2.62"
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
  }
 },
 {
  "id": "CH1-17",
  "chapter": "prop",
  "code": "CH1-17",
  "title": "pm4.57 · 档案",
  "kicker": "set.mm / pm4.57",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:pm4.57",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.57（Propositional calculus）；本作不重证档案定理。",
  "target": "( ¬ ( ¬ P ∧ ¬ Q ) ↔ ( P ∨ Q ) )",
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
      "label": "pm4.57"
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
  }
 },
 {
  "id": "CH1-18",
  "chapter": "prop",
  "code": "CH1-18",
  "title": "3anor · 档案",
  "kicker": "set.mm / 3anor",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:3anor",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3anor（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( P ∧ Q ∧ R ) ↔ ¬ ( ¬ P ∨ ¬ Q ∨ ¬ R ) )",
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
      "label": "3anor"
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
  }
 },
 {
  "id": "CH1-19",
  "chapter": "prop",
  "code": "CH1-19",
  "title": "simpl33 · 档案",
  "kicker": "set.mm / simpl33",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:simpl33",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simpl33（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( ( S ∧ T ∧ ( P ∧ Q ∧ R ) ) ∧ U ) → R )",
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
      "label": "simpl33"
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
  }
 },
 {
  "id": "CH1-20",
  "chapter": "prop",
  "code": "CH1-20",
  "title": "simp333 · 档案",
  "kicker": "set.mm / simp333",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:simp333",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp333（Propositional calculus）；本作不重证档案定理。",
  "target": "( ( U ∧ V ∧ ( S ∧ T ∧ ( P ∧ Q ∧ R ) ) ) → R )",
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
      "label": "simp333"
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
  }
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
  }
 },
 {
  "id": "CH1-22",
  "chapter": "prop",
  "code": "CH1-22",
  "title": "birot · 代入",
  "kicker": "set.mm / birot",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:birot",
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
  "note": "set.mm birot（Propositional calculus）；本作不重证档案定理。",
  "target": "(S∧T↔Q↔R)↔Q↔R↔S∧T",
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
      "label": "birot"
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
  }
 },
 {
  "id": "CH1-23",
  "chapter": "prop",
  "code": "CH1-23",
  "title": "pm5.3 · 代入",
  "kicker": "set.mm / pm5.3",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm5.3",
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
  "note": "set.mm pm5.3（Propositional calculus）；本作不重证档案定理。",
  "target": "(S∨T)∧Q→R↔(S∨T)∧Q→(S∨T)∧R",
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
      "label": "pm5.3"
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
  }
 },
 {
  "id": "CH1-24",
  "chapter": "prop",
  "code": "CH1-24",
  "title": "pm3.4 · 代入",
  "kicker": "set.mm / pm3.4",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm3.4",
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
  "note": "set.mm pm3.4（Propositional calculus）；本作不重证档案定理。",
  "target": "(S↔T)∧Q→(S↔T)→Q",
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
      "label": "pm3.4"
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
  }
 },
 {
  "id": "CH1-25",
  "chapter": "prop",
  "code": "CH1-25",
  "title": "or12 · 代入",
  "kicker": "set.mm / or12",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:or12",
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
  "note": "set.mm or12（Propositional calculus）；本作不重证档案定理。",
  "target": "(T→U)∨(Q∨R)↔Q∨((T→U)∨R)",
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
      "label": "or12"
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
  }
 },
 {
  "id": "CH1-26",
  "chapter": "prop",
  "code": "CH1-26",
  "title": "pm4.54 · 代入",
  "kicker": "set.mm / pm4.54",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm4.54",
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
  "note": "set.mm pm4.54（Propositional calculus）；本作不重证档案定理。",
  "target": "¬¬U∧Q↔¬(¬U∨¬Q)",
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
      "label": "pm4.54"
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
  }
 },
 {
  "id": "CH1-27",
  "chapter": "prop",
  "code": "CH1-27",
  "title": "3orass · 代入",
  "kicker": "set.mm / 3orass",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:3orass",
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
  "note": "set.mm 3orass（Propositional calculus）；本作不重证档案定理。",
  "target": "V∧W∨Q∨R↔V∧W∨(Q∨R)",
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
      "label": "3orass"
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
  }
 },
 {
  "id": "CH1-28",
  "chapter": "prop",
  "code": "CH1-28",
  "title": "simprr1 · 代入",
  "kicker": "set.mm / simprr1",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:simprr1",
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
  "note": "set.mm simprr1（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧(S∧((W∨X)∧Q∧R))→W∨X",
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
      "label": "simprr1"
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
  }
 },
 {
  "id": "CH1-29",
  "chapter": "prop",
  "code": "CH1-29",
  "title": "simp3l1 · 代入",
  "kicker": "set.mm / simp3l1",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
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
  "target": "T∧U∧((X↔Y)∧Q∧R∧S)→(X↔Y)",
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
  }
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
  }
 },
 {
  "id": "CH1-31",
  "chapter": "prop",
  "code": "CH1-31",
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
  }
 },
 {
  "id": "CH1-32",
  "chapter": "prop",
  "code": "CH1-32",
  "title": "pm4.67 · 双代入",
  "kicker": "set.mm / pm4.67",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
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
  "target": "¬(¬(A→B)→¬(C∧D))↔¬(A→B)∧(C∧D)",
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
  }
 },
 {
  "id": "CH1-33",
  "chapter": "prop",
  "code": "CH1-33",
  "title": "an3 · 双代入",
  "kicker": "set.mm / an3",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:an3",
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
  "note": "set.mm an3（Propositional calculus）；本作不重证档案定理。",
  "target": "(B→C)∧(D∧E)∧(R∧S)→(B→C)∧S",
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
      "label": "an3"
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
  }
 },
 {
  "id": "CH1-34",
  "chapter": "prop",
  "code": "CH1-34",
  "title": "pm5.36 · 双代入",
  "kicker": "set.mm / pm5.36",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm5.36",
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
  "note": "set.mm pm5.36（Propositional calculus）；本作不重证档案定理。",
  "target": "(C→D)∧(C→D↔E∧F)↔E∧F∧(C→D↔E∧F)",
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
  }
 },
 {
  "id": "CH1-35",
  "chapter": "prop",
  "code": "CH1-35",
  "title": "biortn · 双代入",
  "kicker": "set.mm / biortn",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:biortn",
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
  "note": "set.mm biortn（Propositional calculus）；本作不重证档案定理。",
  "target": "(D→E)→(F∧G↔¬(D→E)∨F∧G)",
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
  }
 },
 {
  "id": "CH1-36",
  "chapter": "prop",
  "code": "CH1-36",
  "title": "pm4.79 · 双代入",
  "kicker": "set.mm / pm4.79",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm4.79",
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
  "note": "set.mm pm4.79（Propositional calculus）；本作不重证档案定理。",
  "target": "(G∧H→E→F)∨(R→E→F)↔G∧H∧R→E→F",
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
      "label": "pm4.79"
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
  }
 },
 {
  "id": "CH1-37",
  "chapter": "prop",
  "code": "CH1-37",
  "title": "anandi3 · 双代入",
  "kicker": "set.mm / anandi3",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:anandi3",
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
  "note": "set.mm anandi3（Propositional calculus）；本作不重证档案定理。",
  "target": "(F→G)∧(H∧I)∧R↔(F→G)∧(H∧I)∧((F→G)∧R)",
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
  }
 },
 {
  "id": "CH1-38",
  "chapter": "prop",
  "code": "CH1-38",
  "title": "simpr2r · 双代入",
  "kicker": "set.mm / simpr2r",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simpr2r",
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
  "note": "set.mm simpr2r（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧(R∧((G→H)∧(I∧J))∧S)→I∧J",
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
      "label": "simpr2r"
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
  }
 },
 {
  "id": "CH1-39",
  "chapter": "prop",
  "code": "CH1-39",
  "title": "simp13l · 双代入",
  "kicker": "set.mm / simp13l",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simp13l",
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
  "note": "set.mm simp13l（Propositional calculus）；本作不重证档案定理。",
  "target": "R∧S∧((H→I)∧(J∧K))∧T∧U→H→I",
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
      "label": "simp13l"
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
  }
 },
 {
  "id": "CH1-40",
  "chapter": "prop",
  "code": "CH1-40",
  "title": "an3andi · 双代入",
  "kicker": "set.mm / an3andi",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:an3andi",
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
  "note": "set.mm an3andi（Propositional calculus）；本作不重证档案定理。",
  "target": "(I→J)∧(K∧L∧R∧S)↔(I→J)∧(K∧L)∧((I→J)∧R)∧((I→J)∧S)",
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
      "label": "an3andi"
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
  }
 },
 {
  "id": "CH1-41",
  "chapter": "prop",
  "code": "CH1-41",
  "title": "biidd · 分离 · idd 作为前件",
  "kicker": "set.mm / biidd",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · idd 作为前件"
  ],
  "allowed": [
   "archive:biidd",
   "archive:idd",
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
      "label": "biidd"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "idd"
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
  }
 },
 {
  "id": "CH1-42",
  "chapter": "prop",
  "code": "CH1-42",
  "title": "dedlema · 分离 · pm3.21 作为前件",
  "kicker": "set.mm / dedlema",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm3.21 作为前件"
  ],
  "allowed": [
   "archive:dedlema",
   "archive:pm3.21",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm dedlema（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔Q∧(P→Q→Q∧P)∨R∧¬(P→Q→Q∧P)",
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
      "label": "dedlema"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm3.21"
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
      "node": "f4",
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
  }
 },
 {
  "id": "CH1-43",
  "chapter": "prop",
  "code": "CH1-43",
  "title": "3mix2 · 分离 · pm5.1 作为前件",
  "kicker": "set.mm / 3mix2",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm5.1 作为前件"
  ],
  "allowed": [
   "archive:3mix2",
   "archive:pm5.1",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and",
   "iff"
  ],
  "reward": "—",
  "note": "set.mm 3mix2（Propositional calculus）；本作不重证档案定理。",
  "target": "Q∨(P∧Q→(P↔Q))∨R",
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
      "label": "3mix2"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm5.1"
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
     "id": "f4",
     "kind": "imp",
     "x": 940,
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
      "node": "f4",
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
  }
 },
 {
  "id": "CH1-44",
  "chapter": "prop",
  "code": "CH1-44",
  "title": "norasslem2 · 分离 · orbidi 作为前件",
  "kicker": "set.mm / norasslem2",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · orbidi 作为前件"
  ],
  "allowed": [
   "archive:norasslem2",
   "archive:orbidi",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "or"
  ],
  "reward": "—",
  "note": "set.mm norasslem2（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔(P∨(Q↔R)↔P∨Q↔P∨R)∨R→Q",
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
      "label": "norasslem2"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "orbidi"
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
     "kind": "iff",
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
     "id": "f8",
     "kind": "iff",
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
      "node": "a2",
      "port": "out"
     },
     "to": {
      "node": "f6",
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
      "node": "f4",
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
  }
 },
 {
  "id": "CH1-45",
  "chapter": "prop",
  "code": "CH1-45",
  "title": "biimt · 分离 · simpr3 作为前件",
  "kicker": "set.mm / biimt",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simpr3 作为前件"
  ],
  "allowed": [
   "archive:biimt",
   "archive:simpr3",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm biimt（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔(P∧(Q∧R∧S)→S)→Q",
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
      "label": "simpr3"
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
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a4",
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
  }
 },
 {
  "id": "CH1-46",
  "chapter": "prop",
  "code": "CH1-46",
  "title": "pm3.2 · 分离 · simp3r3 作为前件",
  "kicker": "set.mm / pm3.2",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp3r3 作为前件"
  ],
  "allowed": [
   "archive:pm3.2",
   "archive:simp3r3",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm pm3.2（Propositional calculus）；本作不重证档案定理。",
  "target": "Q→(T∧U∧(S∧(P∧Q∧R))→R)∧Q",
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
      "label": "simp3r3"
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
      "name": "U"
     }
    },
    {
     "id": "f3",
     "kind": "and",
     "x": 1380,
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
     "x": 1600,
     "y": 80,
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
      "node": "f3",
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
      "node": "f11",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a7",
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
  }
 },
 {
  "id": "CH1-47",
  "chapter": "prop",
  "code": "CH1-47",
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
  }
 },
 {
  "id": "CH1-48",
  "chapter": "prop",
  "code": "CH1-48",
  "title": "ibar · 分离 · pm3.43i 作为前件",
  "kicker": "set.mm / ibar",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm3.43i 作为前件"
  ],
  "allowed": [
   "archive:ibar",
   "archive:pm3.43i",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm ibar（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔((P→Q)→(P→R)→P→Q∧R)∧Q",
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
      "label": "ibar"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm3.43i"
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
      "node": "f2",
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
  }
 },
 {
  "id": "CH1-49",
  "chapter": "prop",
  "code": "CH1-49",
  "title": "exmidd · 分离 · pm5.21 作为前件",
  "kicker": "set.mm / exmidd",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm5.21 作为前件"
  ],
  "allowed": [
   "archive:exmidd",
   "archive:pm5.21",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and",
   "not",
   "iff"
  ],
  "reward": "—",
  "note": "set.mm exmidd（Propositional calculus）；本作不重证档案定理。",
  "target": "Q∨¬Q",
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
      "label": "exmidd"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm5.21"
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
     "kind": "and",
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
      "node": "a2",
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
  }
 },
 {
  "id": "CH1-50",
  "chapter": "prop",
  "code": "CH1-50",
  "title": "biortn · 分离 · pm5.7 作为前件",
  "kicker": "set.mm / biortn",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm5.7 作为前件"
  ],
  "allowed": [
   "archive:biortn",
   "archive:pm5.7",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "or"
  ],
  "reward": "—",
  "note": "set.mm biortn（Propositional calculus）；本作不重证档案定理。",
  "target": "Q↔¬((P∨R↔Q∨R)↔R∨(P↔Q))∨Q",
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
      "label": "pm5.7"
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
     "kind": "or",
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
     "id": "f6",
     "kind": "iff",
     "x": 1380,
     "y": 80,
     "config": {}
    },
    {
     "id": "f7",
     "kind": "or",
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "f8",
     "kind": "iff",
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
      "node": "a1",
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
  }
 },
 {
  "id": "CH1-51",
  "chapter": "prop",
  "code": "CH1-51",
  "title": "2a1 · 分离 · simp1l 作为前件",
  "kicker": "set.mm / 2a1",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp1l 作为前件"
  ],
  "allowed": [
   "archive:2a1",
   "archive:simp1l",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm 2a1（Propositional calculus）；本作不重证档案定理。",
  "target": "Q→R→P∧Q∧R∧S→P",
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
      "label": "simp1l"
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
     "x": 940,
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
     "x": 1160,
     "y": 80,
     "config": {}
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "S"
     }
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
      "node": "f7",
      "port": "a"
     }
    },
    {
     "from": {
      "node": "a0",
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
  }
 },
 {
  "id": "CH1-52",
  "chapter": "prop",
  "code": "CH1-52",
  "title": "notnot · 分离 · simp11l 作为前件",
  "kicker": "set.mm / notnot",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp11l 作为前件"
  ],
  "allowed": [
   "archive:notnot",
   "archive:simp11l",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm notnot（Propositional calculus）；本作不重证档案定理。",
  "target": "¬¬(P∧Q∧R∧S∧T∧U→P)",
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
      "label": "simp11l"
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
     "x": 1380,
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
     "x": 1600,
     "y": 80,
     "config": {}
    },
    {
     "id": "a5",
     "kind": "atom",
     "x": 720,
     "y": 80,
     "config": {
      "name": "S"
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
     "x": 940,
     "y": 80,
     "config": {
      "name": "T"
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
      "node": "a0",
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
  }
 },
 {
  "id": "CH1-53",
  "chapter": "prop",
  "code": "CH1-53",
  "title": "ax-1 · 分离 · 3orcoma 作为前件",
  "kicker": "set.mm / ax-1",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · 3orcoma 作为前件"
  ],
  "allowed": [
   "archive:ax-1",
   "archive:3orcoma",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "or"
  ],
  "reward": "—",
  "note": "set.mm ax-1（Propositional calculus）；本作不重证档案定理。",
  "target": "Q→(P∨Q∨R↔Q∨P∨R)",
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
      "label": "ax-1"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "3orcoma"
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
     "kind": "or",
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
      "node": "f5",
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
  }
 },
 {
  "id": "CH1-54",
  "chapter": "prop",
  "code": "CH1-54",
  "title": "3mix1 · 分离 · simp212 作为前件",
  "kicker": "set.mm / 3mix1",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp212 作为前件"
  ],
  "allowed": [
   "archive:3mix1",
   "archive:simp212",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm 3mix1（Propositional calculus）；本作不重证档案定理。",
  "target": "(U∧(P∧Q∧R∧S∧T)∧V→Q)∨Q∨R",
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
      "label": "simp212"
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
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "a8",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f9",
     "kind": "and",
     "x": 500,
     "y": 210,
     "config": {}
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
      "node": "a8",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a1",
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
      "node": "a2",
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
  }
 },
 {
  "id": "CH1-55",
  "chapter": "prop",
  "code": "CH1-55",
  "title": "pm2.27 · 分离 · biluk 作为前件",
  "kicker": "set.mm / pm2.27",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · biluk 作为前件"
  ],
  "allowed": [
   "archive:pm2.27",
   "archive:biluk",
   "atom",
   "subst",
   "detach",
   "target",
   "iff"
  ],
  "reward": "—",
  "note": "set.mm pm2.27（Propositional calculus）；本作不重证档案定理。",
  "target": "(((P↔Q)↔(R↔Q)↔P↔R)→Q)→Q",
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
      "label": "pm2.27"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "biluk"
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
     "kind": "iff",
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
     "kind": "iff",
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
     "id": "f6",
     "kind": "iff",
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
      "node": "f2",
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
  }
 },
 {
  "id": "CH1-56",
  "chapter": "prop",
  "code": "CH1-56",
  "title": "cad1 · 分离 · pm2.48 作为前件",
  "kicker": "set.mm / cad1",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm2.48 作为前件"
  ],
  "allowed": [
   "archive:cad1",
   "archive:pm2.48",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "not",
   "or"
  ],
  "reward": "—",
  "note": "set.mm cad1（Propositional calculus）；本作不重证档案定理。",
  "target": "cadd(P, Q, R)↔P∨Q",
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
      "label": "cad1"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm2.48"
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
     "kind": "or",
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
  }
 },
 {
  "id": "CH1-57",
  "chapter": "prop",
  "code": "CH1-57",
  "title": "ornld · 分离 · 3orcomb 作为前件",
  "kicker": "set.mm / ornld",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · 3orcomb 作为前件"
  ],
  "allowed": [
   "archive:ornld",
   "archive:3orcomb",
   "atom",
   "subst",
   "detach",
   "target",
   "iff",
   "or"
  ],
  "reward": "—",
  "note": "set.mm ornld（Propositional calculus）；本作不重证档案定理。",
  "target": "((P∨Q∨R↔P∨R∨Q)→S∨T)∧¬S→T",
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
      "label": "ornld"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "3orcomb"
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
     "kind": "or",
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
      "node": "f5",
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
  }
 },
 {
  "id": "CH1-58",
  "chapter": "prop",
  "code": "CH1-58",
  "title": "olc · 分离 · simp213 作为前件",
  "kicker": "set.mm / olc",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · simp213 作为前件"
  ],
  "allowed": [
   "archive:olc",
   "archive:simp213",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "and"
  ],
  "reward": "—",
  "note": "set.mm olc（Propositional calculus）；本作不重证档案定理。",
  "target": "Q∨(U∧(P∧Q∧R∧S∧T)∧V→R)",
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
      "label": "simp213"
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
     "x": 280,
     "y": 210,
     "config": {}
    },
    {
     "id": "a8",
     "kind": "atom",
     "x": 1160,
     "y": 80,
     "config": {
      "name": "T"
     }
    },
    {
     "id": "f9",
     "kind": "and",
     "x": 500,
     "y": 210,
     "config": {}
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
      "node": "a8",
      "port": "out"
     },
     "to": {
      "node": "f9",
      "port": "b"
     }
    },
    {
     "from": {
      "node": "a1",
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
      "node": "a4",
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
  }
 },
 {
  "id": "CH1-59",
  "chapter": "prop",
  "code": "CH1-59",
  "title": "pm5.5 · 分离 · birot 作为前件",
  "kicker": "set.mm / pm5.5",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · birot 作为前件"
  ],
  "allowed": [
   "archive:pm5.5",
   "archive:birot",
   "atom",
   "subst",
   "detach",
   "target",
   "iff"
  ],
  "reward": "—",
  "note": "set.mm pm5.5（Propositional calculus）；本作不重证档案定理。",
  "target": "((P↔Q↔R)↔Q↔R↔P)→Q↔Q",
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
      "label": "pm5.5"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "birot"
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
     "kind": "iff",
     "x": 720,
     "y": 80,
     "config": {}
    },
    {
     "id": "f4",
     "kind": "iff",
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
     "id": "f6",
     "kind": "iff",
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
  }
 },
 {
  "id": "CH1-60",
  "chapter": "prop",
  "code": "CH1-60",
  "title": "pm2.24 · 分离 · pm2.47 作为前件",
  "kicker": "set.mm / pm2.24",
  "brief": "",
  "hint": "",
  "teaches": [
   "分离 · pm2.47 作为前件"
  ],
  "allowed": [
   "archive:pm2.24",
   "archive:pm2.47",
   "atom",
   "subst",
   "detach",
   "target",
   "imp",
   "not",
   "or"
  ],
  "reward": "—",
  "note": "set.mm pm2.24（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(¬(P∨Q)→¬P∨Q)→Q",
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
      "label": "pm2.24"
     }
    },
    {
     "id": "t",
     "kind": "archive",
     "x": 380,
     "y": 700,
     "config": {
      "label": "pm2.47"
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
     "kind": "or",
     "x": 500,
     "y": 80,
     "config": {}
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
     "kind": "not",
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
      "node": "f4",
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
  }
 },
 {
  "id": "CH2-13",
  "chapter": "pred",
  "code": "CH2-13",
  "title": "sylgt · 档案",
  "kicker": "set.mm / sylgt",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:sylgt",
   "target"
  ],
  "reward": "—",
  "note": "set.mm sylgt（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∀ x ( Q → R ) → ( ( P → ∀ x Q ) → ( P → ∀ x R ) ) )",
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
      "label": "sylgt"
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
  }
 },
 {
  "id": "CH2-14",
  "chapter": "pred",
  "code": "CH2-14",
  "title": "2exanali · 档案",
  "kicker": "set.mm / 2exanali",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:2exanali",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 2exanali（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ¬ ∃ x ∃ y ( P ∧ ¬ Q ) ↔ ∀ x ∀ y ( P → Q ) )",
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
      "label": "2exanali"
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
  }
 },
 {
  "id": "CH2-15",
  "chapter": "pred",
  "code": "CH2-15",
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
  }
 },
 {
  "id": "CH2-16",
  "chapter": "pred",
  "code": "CH2-16",
  "title": "19.32v · 档案",
  "kicker": "set.mm / 19.32v",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:19.32v",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.32v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∀ x ( P ∨ Q ) ↔ ( P ∨ ∀ x Q ) )",
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
      "label": "19.32v"
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
  }
 },
 {
  "id": "CH2-17",
  "chapter": "pred",
  "code": "CH2-17",
  "title": "19.42vvv · 档案",
  "kicker": "set.mm / 19.42vvv",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:19.42vvv",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.42vvv（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∃ x ∃ y ∃ z ( P ∧ Q ) ↔ ( P ∧ ∃ x ∃ y ∃ z Q ) )",
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
      "label": "19.42vvv"
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
  }
 },
 {
  "id": "CH2-18",
  "chapter": "pred",
  "code": "CH2-18",
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
  }
 },
 {
  "id": "CH2-19",
  "chapter": "pred",
  "code": "CH2-19",
  "title": "19.29 · 代入",
  "kicker": "set.mm / 19.29",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:19.29",
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
  "note": "set.mm 19.29（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x F(x)∧∃x Q→∃x (F(x)∧Q)",
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
      "label": "19.29"
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
  }
 },
 {
  "id": "CH2-20",
  "chapter": "pred",
  "code": "CH2-20",
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
  }
 },
 {
  "id": "CH2-21",
  "chapter": "pred",
  "code": "CH2-21",
  "title": "peirce · 代入",
  "kicker": "set.mm / peirce",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:peirce",
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
  "note": "set.mm peirce（Propositional calculus）；本作不重证档案定理。",
  "target": "((F(x)→Q)→F(x))→F(x)",
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
      "label": "peirce"
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
  }
 },
 {
  "id": "CH2-22",
  "chapter": "pred",
  "code": "CH2-22",
  "title": "df-an · 代入",
  "kicker": "set.mm / df-an",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:df-an",
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
  "note": "set.mm df-an（Propositional calculus）；本作不重证档案定理。",
  "target": "F(x)∧Q↔¬(F(x)→¬Q)",
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
      "label": "df-an"
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
  }
 },
 {
  "id": "CH2-23",
  "chapter": "pred",
  "code": "CH2-23",
  "title": "an31 · 代入",
  "kicker": "set.mm / an31",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:an31",
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
  "note": "set.mm an31（Propositional calculus）；本作不重证档案定理。",
  "target": "F(x)∧Q∧R↔R∧Q∧F(x)",
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
      "label": "an31"
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
  }
 },
 {
  "id": "CH2-24",
  "chapter": "pred",
  "code": "CH2-24",
  "title": "pm5.31 · 代入",
  "kicker": "set.mm / pm5.31",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm5.31",
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
  "note": "set.mm pm5.31（Propositional calculus）；本作不重证档案定理。",
  "target": "R∧(F(x)→Q)→F(x)→Q∧R",
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
      "label": "pm5.31"
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
  }
 },
 {
  "id": "CH2-25",
  "chapter": "pred",
  "code": "CH2-25",
  "title": "or42 · 代入",
  "kicker": "set.mm / or42",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:or42",
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
  "note": "set.mm or42（Propositional calculus）；本作不重证档案定理。",
  "target": "F(x)∨Q∨(R∨S)↔F(x)∨R∨(S∨Q)",
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
      "label": "or42"
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
  }
 },
 {
  "id": "CH2-26",
  "chapter": "pred",
  "code": "CH2-26",
  "title": "pm3.11 · 代入",
  "kicker": "set.mm / pm3.11",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:pm3.11",
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
  "note": "set.mm pm3.11（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(¬F(x)∨¬Q)→F(x)∧Q",
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
      "label": "pm3.11"
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
  }
 },
 {
  "id": "CH2-27",
  "chapter": "pred",
  "code": "CH2-27",
  "title": "3orcomb · 代入",
  "kicker": "set.mm / 3orcomb",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:3orcomb",
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
  "note": "set.mm 3orcomb（Propositional calculus）；本作不重证档案定理。",
  "target": "F(x)∨Q∨R↔F(x)∨R∨Q",
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
      "label": "3orcomb"
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
  }
 },
 {
  "id": "CH2-28",
  "chapter": "pred",
  "code": "CH2-28",
  "title": "simprr3 · 代入",
  "kicker": "set.mm / simprr3",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:simprr3",
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
  "note": "set.mm simprr3（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧(S∧(F(x)∧Q∧R))→R",
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
      "label": "simprr3"
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
  }
 },
 {
  "id": "CH2-29",
  "chapter": "pred",
  "code": "CH2-29",
  "title": "simp3l2 · 代入",
  "kicker": "set.mm / simp3l2",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入"
  ],
  "allowed": [
   "archive:simp3l2",
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
  "note": "set.mm simp3l2（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧U∧(F(x)∧Q∧R∧S)→Q",
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
      "label": "simp3l2"
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
  }
 },
 {
  "id": "CH2-30",
  "chapter": "pred",
  "code": "CH2-30",
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
  }
 },
 {
  "id": "CH2-31",
  "chapter": "pred",
  "code": "CH2-31",
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
  "target": "∀x ((Z→A)→B∧C)∧∀x (B∧C→R)→∀x ((Z→A)→R)",
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
  }
 },
 {
  "id": "CH2-32",
  "chapter": "pred",
  "code": "CH2-32",
  "title": "expt · 双代入",
  "kicker": "set.mm / expt",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:expt",
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
  "note": "set.mm expt（Propositional calculus）；本作不重证档案定理。",
  "target": "(¬((A→B)→¬(C∧D))→R)→(A→B)→C∧D→R",
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
      "label": "expt"
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
  }
 },
 {
  "id": "CH2-33",
  "chapter": "pred",
  "code": "CH2-33",
  "title": "pm4.65 · 双代入",
  "kicker": "set.mm / pm4.65",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm4.65",
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
  "note": "set.mm pm4.65（Propositional calculus）；本作不重证档案定理。",
  "target": "¬(¬(B→C)→D∧E)↔¬(B→C)∧¬(D∧E)",
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
      "label": "pm4.65"
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
  }
 },
 {
  "id": "CH2-34",
  "chapter": "pred",
  "code": "CH2-34",
  "title": "simprr · 双代入",
  "kicker": "set.mm / simprr",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simprr",
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
  "note": "set.mm simprr（Propositional calculus）；本作不重证档案定理。",
  "target": "(C→D)∧(E∧F∧R)→R",
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
      "label": "simprr"
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
  }
 },
 {
  "id": "CH2-35",
  "chapter": "pred",
  "code": "CH2-35",
  "title": "pm2.47 · 双代入",
  "kicker": "set.mm / pm2.47",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm2.47",
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
  "note": "set.mm pm2.47（Propositional calculus）；本作不重证档案定理。",
  "target": "¬((D→E)∨F∧G)→¬(D→E)∨F∧G",
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
      "label": "pm2.47"
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
  }
 },
 {
  "id": "CH2-36",
  "chapter": "pred",
  "code": "CH2-36",
  "title": "pm2.37 · 双代入",
  "kicker": "set.mm / pm2.37",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:pm2.37",
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
  "note": "set.mm pm2.37（Propositional calculus）；本作不重证档案定理。",
  "target": "(G∧H→R)→G∧H∨(E→F)→(E→F)∨R",
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
      "label": "pm2.37"
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
  }
 },
 {
  "id": "CH2-37",
  "chapter": "pred",
  "code": "CH2-37",
  "title": "dfbi3 · 双代入",
  "kicker": "set.mm / dfbi3",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:dfbi3",
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
  "note": "set.mm dfbi3（Propositional calculus）；本作不重证档案定理。",
  "target": "(F→G↔H∧I)↔(F→G)∧(H∧I)∨¬(F→G)∧¬(H∧I)",
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
      "label": "dfbi3"
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
  }
 },
 {
  "id": "CH2-38",
  "chapter": "pred",
  "code": "CH2-38",
  "title": "simplr1 · 双代入",
  "kicker": "set.mm / simplr1",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simplr1",
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
  "note": "set.mm simplr1（Propositional calculus）；本作不重证档案定理。",
  "target": "S∧((G→H)∧(I∧J)∧R)∧T→G→H",
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
      "label": "simplr1"
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
  }
 },
 {
  "id": "CH2-39",
  "chapter": "pred",
  "code": "CH2-39",
  "title": "simp2r2 · 双代入",
  "kicker": "set.mm / simp2r2",
  "brief": "",
  "hint": "",
  "teaches": [
   "双代入"
  ],
  "allowed": [
   "archive:simp2r2",
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
  "note": "set.mm simp2r2（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧(S∧((H→I)∧(J∧K)∧R))∧U→J∧K",
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
      "label": "simp2r2"
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
  }
 },
 {
  "id": "CH2-40",
  "chapter": "pred",
  "code": "CH2-40",
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
  "target": "((I→J)→K∧L)∧(R→K∧L)∧(S→K∧L)→(I→J)∨R∨S→K∧L",
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
  }
 },
 {
  "id": "CH2-41",
  "chapter": "pred",
  "code": "CH2-41",
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
  }
 },
 {
  "id": "CH2-42",
  "chapter": "pred",
  "code": "CH2-42",
  "title": "pm4.81 · 代入 + 闭包",
  "kicker": "set.mm / pm4.81",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:pm4.81",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.81（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (¬F(x)→F(x)↔F(x))",
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
      "label": "pm4.81"
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
  }
 },
 {
  "id": "CH2-43",
  "chapter": "pred",
  "code": "CH2-43",
  "title": "an13 · 代入 + 闭包",
  "kicker": "set.mm / an13",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:an13",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm an13（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)∧(Q∧R)↔R∧(Q∧F(x)))",
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
      "label": "an13"
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
  }
 },
 {
  "id": "CH2-44",
  "chapter": "pred",
  "code": "CH2-44",
  "title": "pm5.31 · 代入 + 闭包",
  "kicker": "set.mm / pm5.31",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:pm5.31",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm5.31（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (R∧(F(x)→Q)→F(x)→Q∧R)",
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
      "label": "pm5.31"
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
  }
 },
 {
  "id": "CH2-45",
  "chapter": "pred",
  "code": "CH2-45",
  "title": "orimdi · 代入 + 闭包",
  "kicker": "set.mm / orimdi",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:orimdi",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm orimdi（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)∨(Q→R)↔F(x)∨Q→F(x)∨R)",
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
  }
 },
 {
  "id": "CH2-46",
  "chapter": "pred",
  "code": "CH2-46",
  "title": "pm4.44 · 代入 + 闭包",
  "kicker": "set.mm / pm4.44",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:pm4.44",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.44（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)↔F(x)∨F(x)∧Q)",
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
      "label": "pm4.44"
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
  }
 },
 {
  "id": "CH2-47",
  "chapter": "pred",
  "code": "CH2-47",
  "title": "3ancomb · 代入 + 闭包",
  "kicker": "set.mm / 3ancomb",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:3ancomb",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3ancomb（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (F(x)∧Q∧R↔F(x)∧R∧Q)",
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
      "label": "3ancomb"
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
  }
 },
 {
  "id": "CH2-48",
  "chapter": "pred",
  "code": "CH2-48",
  "title": "simpr1r · 代入 + 闭包",
  "kicker": "set.mm / simpr1r",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:simpr1r",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simpr1r（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (T∧(F(x)∧Q∧R∧S)→Q)",
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
      "label": "simpr1r"
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
  }
 },
 {
  "id": "CH2-49",
  "chapter": "pred",
  "code": "CH2-49",
  "title": "simp13l · 代入 + 闭包",
  "kicker": "set.mm / simp13l",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包"
  ],
  "allowed": [
   "archive:simp13l",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp13l（Propositional calculus）；本作不重证档案定理。",
  "target": "∀x (R∧S∧(F(x)∧Q)∧T∧U→F(x))",
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
      "label": "simp13l"
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
  }
 },
 {
  "id": "CH2-50",
  "chapter": "pred",
  "code": "CH2-50",
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
  }
 },
 {
  "id": "CH2-51",
  "chapter": "pred",
  "code": "CH2-51",
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
  }
 },
 {
  "id": "CH2-52",
  "chapter": "pred",
  "code": "CH2-52",
  "title": "iman · 代入 + 闭包 + 例化",
  "kicker": "set.mm / iman",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:iman",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm iman（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)→Q↔¬(F(a)∧¬Q)",
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
      "label": "iman"
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
  }
 },
 {
  "id": "CH2-53",
  "chapter": "pred",
  "code": "CH2-53",
  "title": "anabs1 · 代入 + 闭包 + 例化",
  "kicker": "set.mm / anabs1",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:anabs1",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm anabs1（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)∧Q∧F(a)↔F(a)∧Q",
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
      "label": "anabs1"
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
  }
 },
 {
  "id": "CH2-54",
  "chapter": "pred",
  "code": "CH2-54",
  "title": "pm4.87 · 代入 + 闭包 + 例化",
  "kicker": "set.mm / pm4.87",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:pm4.87",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.87（Propositional calculus）；本作不重证档案定理。",
  "target": "(F(a)∧Q→R↔F(a)→Q→R)∧(F(a)→Q→R↔Q→F(a)→R)∧(Q→F(a)→R↔Q∧F(a)→R)",
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
  }
 },
 {
  "id": "CH2-55",
  "chapter": "pred",
  "code": "CH2-55",
  "title": "biorf · 代入 + 闭包 + 例化",
  "kicker": "set.mm / biorf",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:biorf",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm biorf（Propositional calculus）；本作不重证档案定理。",
  "target": "¬F(a)→(Q↔F(a)∨Q)",
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
      "label": "biorf"
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
  }
 },
 {
  "id": "CH2-56",
  "chapter": "pred",
  "code": "CH2-56",
  "title": "pm4.79 · 代入 + 闭包 + 例化",
  "kicker": "set.mm / pm4.79",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:pm4.79",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm pm4.79（Propositional calculus）；本作不重证档案定理。",
  "target": "(Q→F(a))∨(R→F(a))↔Q∧R→F(a)",
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
      "label": "pm4.79"
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
  }
 },
 {
  "id": "CH2-57",
  "chapter": "pred",
  "code": "CH2-57",
  "title": "3an4anass · 代入 + 闭包 + 例化",
  "kicker": "set.mm / 3an4anass",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:3an4anass",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 3an4anass（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)∧Q∧R∧S↔F(a)∧Q∧(R∧S)",
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
      "label": "3an4anass"
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
  }
 },
 {
  "id": "CH2-58",
  "chapter": "pred",
  "code": "CH2-58",
  "title": "simp1lr · 代入 + 闭包 + 例化",
  "kicker": "set.mm / simp1lr",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:simp1lr",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp1lr（Propositional calculus）；本作不重证档案定理。",
  "target": "F(a)∧Q∧R∧S∧T→Q",
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
      "label": "simp1lr"
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
  }
 },
 {
  "id": "CH2-59",
  "chapter": "pred",
  "code": "CH2-59",
  "title": "simp23l · 代入 + 闭包 + 例化",
  "kicker": "set.mm / simp23l",
  "brief": "",
  "hint": "",
  "teaches": [
   "代入 + 闭包 + 例化"
  ],
  "allowed": [
   "archive:simp23l",
   "atom",
   "pred",
   "subst",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm simp23l（Propositional calculus）；本作不重证档案定理。",
  "target": "T∧(R∧S∧(F(a)∧Q))∧U→F(a)",
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
      "label": "simp23l"
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
  }
 },
 {
  "id": "CH2-60",
  "chapter": "pred",
  "code": "CH2-60",
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
  }
 },
 {
  "id": "CH3-13",
  "chapter": "eq",
  "code": "CH3-13",
  "title": "19.24 · 档案",
  "kicker": "set.mm / 19.24",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:19.24",
   "target"
  ],
  "reward": "—",
  "note": "set.mm 19.24（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ( ∀ x P → ∀ x Q ) → ∃ x ( P → Q ) )",
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
      "label": "19.24"
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
  }
 },
 {
  "id": "CH3-14",
  "chapter": "eq",
  "code": "CH3-14",
  "title": "equcomiv · 档案",
  "kicker": "set.mm / equcomiv",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:equcomiv",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equcomiv（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( x = y → y = x )",
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
      "label": "equcomiv"
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
  }
 },
 {
  "id": "CH3-15",
  "chapter": "eq",
  "code": "CH3-15",
  "title": "cbvaev · 档案",
  "kicker": "set.mm / cbvaev",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:cbvaev",
   "target"
  ],
  "reward": "—",
  "note": "set.mm cbvaev（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( ∀ x x = y → ∀ z z = y )",
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
      "label": "cbvaev"
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
  }
 },
 {
  "id": "CH3-16",
  "chapter": "eq",
  "code": "CH3-16",
  "title": "ax-9 · 档案",
  "kicker": "set.mm / ax-9",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-9",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-9（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "( x = y → ( z ∈ x → z ∈ y ) )",
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
      "label": "ax-9"
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
  }
 },
 {
  "id": "CH3-17",
  "chapter": "eq",
  "code": "CH3-17",
  "title": "qexmid · 档案",
  "kicker": "set.mm / qexmid",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:qexmid",
   "target"
  ],
  "reward": "—",
  "note": "set.mm qexmid（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃ x ( P → ∀ x P )",
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
      "label": "qexmid"
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
  }
 },
 {
  "id": "CH3-18",
  "chapter": "eq",
  "code": "CH3-18",
  "title": "eeanv · 档案",
  "kicker": "set.mm / eeanv",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:eeanv",
   "target"
  ],
  "reward": "—",
  "note": "set.mm eeanv（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "( ∃ x ∃ y ( P ∧ Q ) ↔ ( ∃ x P ∧ ∃ y Q ) )",
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
      "label": "eeanv"
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
  }
 },
 {
  "id": "CH3-19",
  "chapter": "eq",
  "code": "CH3-19",
  "title": "ax6e · 档案",
  "kicker": "set.mm / ax6e",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax6e",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax6e（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∃ x x = y",
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
      "label": "ax6e"
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
  }
 },
 {
  "id": "CH3-20",
  "chapter": "eq",
  "code": "CH3-20",
  "title": "equs5 · 档案",
  "kicker": "set.mm / equs5",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:equs5",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equs5（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "( ¬ ∀ x x = y → ( ∃ x ( x = y ∧ P ) ↔ ∀ x ( x = y → P ) ) )",
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
      "label": "equs5"
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
  }
 },
 {
  "id": "CH3-21",
  "chapter": "eq",
  "code": "CH3-21",
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
  "target": "∃x (¬R∨Q)↔∃x ¬R∨Q",
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
  }
 },
 {
  "id": "CH3-22",
  "chapter": "eq",
  "code": "CH3-22",
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
  "target": "x = y→∀y (Q∧R)→∀x (x = y→Q∧R)",
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
  }
 },
 {
  "id": "CH3-23",
  "chapter": "eq",
  "code": "CH3-23",
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
  "target": "∃x (R∨S→∀x (R∨S))",
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
  }
 },
 {
  "id": "CH3-24",
  "chapter": "eq",
  "code": "CH3-24",
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
  "target": "∀x (S↔T)→∀x ∀x (S↔T)",
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
  }
 },
 {
  "id": "CH3-25",
  "chapter": "eq",
  "code": "CH3-25",
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
  "target": "∃x ∀y ((T→U)→Q)↔∀y ∃x ((T→U)→Q)",
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
  }
 },
 {
  "id": "CH3-26",
  "chapter": "eq",
  "code": "CH3-26",
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
  "target": "∀y y = x→∀x ¬U→∀y ¬U",
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
  }
 },
 {
  "id": "CH3-27",
  "chapter": "eq",
  "code": "CH3-27",
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
  "target": "¬∀x x = y→(∃x (x = y∧(V∧W))↔∀x (x = y→V∧W))",
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
  }
 },
 {
  "id": "CH3-28",
  "chapter": "eq",
  "code": "CH3-28",
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
  "target": "∃x (W∨X)↔W∨X",
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
  }
 },
 {
  "id": "CH3-29",
  "chapter": "eq",
  "code": "CH3-29",
  "title": "ax7v · 全称闭包",
  "kicker": "set.mm / ax7v",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax7v",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax7v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = y→x = z→y = z)",
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
      "label": "ax7v"
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
  }
 },
 {
  "id": "CH3-30",
  "chapter": "eq",
  "code": "CH3-30",
  "title": "equtr · 全称闭包",
  "kicker": "set.mm / equtr",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:equtr",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equtr（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = y→y = z→x = z)",
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
      "label": "equtr"
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
  }
 },
 {
  "id": "CH3-31",
  "chapter": "eq",
  "code": "CH3-31",
  "title": "equvinva · 全称闭包",
  "kicker": "set.mm / equvinva",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:equvinva",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equvinva（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = y→∃z (x = z∧y = z))",
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
      "label": "equvinva"
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
  }
 },
 {
  "id": "CH3-32",
  "chapter": "eq",
  "code": "CH3-32",
  "title": "aev2 · 全称闭包",
  "kicker": "set.mm / aev2",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:aev2",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm aev2（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀y (∀x x = y→∀z ∀t u = v)",
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
      "label": "aev2"
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
  }
 },
 {
  "id": "CH3-33",
  "chapter": "eq",
  "code": "CH3-33",
  "title": "ax8 · 全称闭包",
  "kicker": "set.mm / ax8",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax8",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax8（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = y→x ∈ z→y ∈ z)",
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
      "label": "ax8"
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
  }
 },
 {
  "id": "CH3-34",
  "chapter": "eq",
  "code": "CH3-34",
  "title": "elequ2g · 全称闭包",
  "kicker": "set.mm / elequ2g",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:elequ2g",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm elequ2g（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = y→∀z (z ∈ x↔z ∈ y))",
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
      "label": "elequ2g"
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
  }
 },
 {
  "id": "CH3-35",
  "chapter": "eq",
  "code": "CH3-35",
  "title": "axc16g · 全称闭包",
  "kicker": "set.mm / axc16g",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:axc16g",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc16g（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀y (∀x x = y→P→∀z P)",
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
      "label": "axc16g"
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
  }
 },
 {
  "id": "CH3-36",
  "chapter": "eq",
  "code": "CH3-36",
  "title": "equs5eALT · 全称闭包",
  "kicker": "set.mm / equs5eALT",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:equs5eALT",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equs5eALT（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀y (∃x (x = y∧P)→∀x (x = y→∃y P))",
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
      "label": "equs5eALT"
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
  }
 },
 {
  "id": "CH3-37",
  "chapter": "eq",
  "code": "CH3-37",
  "title": "axc9 · 全称闭包",
  "kicker": "set.mm / axc9",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:axc9",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc9（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x (¬∀z z = x→¬∀z z = y→x = y→∀z x = y)",
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
      "label": "axc9"
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
  }
 },
 {
  "id": "CH3-38",
  "chapter": "eq",
  "code": "CH3-38",
  "title": "axc11n · 全称闭包",
  "kicker": "set.mm / axc11n",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:axc11n",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc11n（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x (∀x x = y→∀y y = x)",
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
      "label": "axc11n"
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
  }
 },
 {
  "id": "CH3-39",
  "chapter": "eq",
  "code": "CH3-39",
  "title": "equs5a · 全称闭包",
  "kicker": "set.mm / equs5a",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:equs5a",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equs5a（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀y (∃x (x = y∧∀y P)→∀x (x = y→P))",
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
      "label": "equs5a"
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
  }
 },
 {
  "id": "CH3-40",
  "chapter": "eq",
  "code": "CH3-40",
  "title": "axc16ALT · 全称闭包",
  "kicker": "set.mm / axc16ALT",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:axc16ALT",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc16ALT（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀y (∀x x = y→P→∀x P)",
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
      "label": "axc16ALT"
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
  }
 },
 {
  "id": "CH3-41",
  "chapter": "eq",
  "code": "CH3-41",
  "title": "equeucl · 例化",
  "kicker": "set.mm / equeucl",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equeucl",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equeucl（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = z→b = z→a = b",
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
      "label": "equeucl"
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
  }
 },
 {
  "id": "CH3-42",
  "chapter": "eq",
  "code": "CH3-42",
  "title": "cbvaev · 例化",
  "kicker": "set.mm / cbvaev",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:cbvaev",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm cbvaev（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀x x = a→∀z z = a",
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
      "label": "cbvaev"
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
  }
 },
 {
  "id": "CH3-43",
  "chapter": "eq",
  "code": "CH3-43",
  "title": "naev2 · 例化",
  "kicker": "set.mm / naev2",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:naev2",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm naev2（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "¬∀x x = a→∀z ¬∀t t = u",
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
      "label": "naev2"
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
  }
 },
 {
  "id": "CH3-44",
  "chapter": "eq",
  "code": "CH3-44",
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
  }
 },
 {
  "id": "CH3-45",
  "chapter": "eq",
  "code": "CH3-45",
  "title": "ax-12 · 例化",
  "kicker": "set.mm / ax-12",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-12",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-12（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "a = b→∀y P→∀x (x = b→P)",
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
      "label": "ax-12"
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
  }
 },
 {
  "id": "CH3-46",
  "chapter": "eq",
  "code": "CH3-46",
  "title": "axc11rv · 例化",
  "kicker": "set.mm / axc11rv",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axc11rv",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc11rv（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x x = a→∀y P→∀x P",
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
      "label": "axc11rv"
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
  }
 },
 {
  "id": "CH3-47",
  "chapter": "eq",
  "code": "CH3-47",
  "title": "ax13v · 例化",
  "kicker": "set.mm / ax13v",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax13v",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax13v（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "¬a = b→b = z→∀x b = z",
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
      "label": "ax13v"
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
  }
 },
 {
  "id": "CH3-48",
  "chapter": "eq",
  "code": "CH3-48",
  "title": "axc10 · 例化",
  "kicker": "set.mm / axc10",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:axc10",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axc10（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x (x = a→∀x P)→P",
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
      "label": "axc10"
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
  }
 },
 {
  "id": "CH3-49",
  "chapter": "eq",
  "code": "CH3-49",
  "title": "hbae · 例化",
  "kicker": "set.mm / hbae",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:hbae",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm hbae（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀x x = a→∀z ∀x x = a",
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
      "label": "hbae"
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
  }
 },
 {
  "id": "CH3-50",
  "chapter": "eq",
  "code": "CH3-50",
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
  }
 },
 {
  "id": "CH3-51",
  "chapter": "eq",
  "code": "CH3-51",
  "title": "ax6v · 例化",
  "kicker": "set.mm / ax6v",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax6v",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax6v（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "¬∀x ¬x = a",
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
      "label": "ax6v"
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
  }
 },
 {
  "id": "CH3-52",
  "chapter": "eq",
  "code": "CH3-52",
  "title": "equid · 例化",
  "kicker": "set.mm / equid",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:equid",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equid（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "a = a",
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
      "label": "equid"
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
  }
 },
 {
  "id": "CH3-53",
  "chapter": "eq",
  "code": "CH3-53",
  "title": "ax8v2 · 全称闭包",
  "kicker": "set.mm / ax8v2",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax8v2",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax8v2（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀y ∀x (x = y→x ∈ z→y ∈ z)",
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
      "label": "ax8v2"
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
  }
 },
 {
  "id": "CH3-54",
  "chapter": "eq",
  "code": "CH3-54",
  "title": "ax9 · 全称闭包",
  "kicker": "set.mm / ax9",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax9",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax9（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀y ∀x (x = y→z ∈ x→z ∈ y)",
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
      "label": "ax9"
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
  }
 },
 {
  "id": "CH3-55",
  "chapter": "eq",
  "code": "CH3-55",
  "title": "ax12ev2c · 全称闭包",
  "kicker": "set.mm / ax12ev2c",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax12ev2c",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax12ev2c（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀y ∀x (x = y→∃y (x = y∧P)→P)",
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
      "label": "ax12ev2c"
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
  }
 },
 {
  "id": "CH3-56",
  "chapter": "eq",
  "code": "CH3-56",
  "title": "dveeq1 · 全称闭包",
  "kicker": "set.mm / dveeq1",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:dveeq1",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm dveeq1（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀z ∀y (¬∀x x = y→y = z→∀x y = z)",
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
      "label": "dveeq1"
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
      "v": "z"
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
  }
 },
 {
  "id": "CH3-57",
  "chapter": "eq",
  "code": "CH3-57",
  "title": "dveeq2ALT · 全称闭包",
  "kicker": "set.mm / dveeq2ALT",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:dveeq2ALT",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm dveeq2ALT（Predicate calculus with equality:  Auxiliary axiom schemes (4 schemes)）；本作不重证档案定理。",
  "target": "∀z ∀y (¬∀x x = y→z = y→∀x z = y)",
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
      "label": "dveeq2ALT"
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
      "v": "z"
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
  }
 },
 {
  "id": "CH3-58",
  "chapter": "eq",
  "code": "CH3-58",
  "title": "ax-7 · 全称闭包",
  "kicker": "set.mm / ax-7",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-7",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-7（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀y ∀x (x = y→x = z→y = z)",
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
      "label": "ax-7"
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
  }
 },
 {
  "id": "CH3-59",
  "chapter": "eq",
  "code": "CH3-59",
  "title": "equtr · 全称闭包",
  "kicker": "set.mm / equtr",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:equtr",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equtr（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀y ∀x (x = y→y = z→x = z)",
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
      "label": "equtr"
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
  }
 },
 {
  "id": "CH3-60",
  "chapter": "eq",
  "code": "CH3-60",
  "title": "equvinva · 全称闭包",
  "kicker": "set.mm / equvinva",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:equvinva",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm equvinva（Predicate calculus with equality:  Tarski's system S2 (1 rule, 6 schemes)）；本作不重证档案定理。",
  "target": "∀y ∀x (x = y→∃z (x = z∧y = z))",
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
      "label": "equvinva"
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
  }
 },
 {
  "id": "CH4-13",
  "chapter": "set",
  "code": "CH4-13",
  "title": "ax-ext · 档案",
  "kicker": "set.mm / ax-ext",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-ext",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ext（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )",
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
      "label": "ax-ext"
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
  }
 },
 {
  "id": "CH4-14",
  "chapter": "set",
  "code": "CH4-14",
  "title": "axextb · 档案",
  "kicker": "set.mm / axextb",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:axextb",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axextb（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "( x = y ↔ ∀ z ( z ∈ x ↔ z ∈ y ) )",
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
      "label": "axextb"
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
  }
 },
 {
  "id": "CH4-15",
  "chapter": "set",
  "code": "CH4-15",
  "title": "dfcleq · 档案",
  "kicker": "set.mm / dfcleq",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:dfcleq",
   "target"
  ],
  "reward": "—",
  "note": "set.mm dfcleq（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "( A = B ↔ ∀ x ( x ∈ A ↔ x ∈ B ) )",
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
      "label": "dfcleq"
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
  }
 },
 {
  "id": "CH4-16",
  "chapter": "set",
  "code": "CH4-16",
  "title": "eqid · 档案",
  "kicker": "set.mm / eqid",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:eqid",
   "target"
  ],
  "reward": "—",
  "note": "set.mm eqid（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "A = A",
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
      "label": "eqid"
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
  }
 },
 {
  "id": "CH4-17",
  "chapter": "set",
  "code": "CH4-17",
  "title": "ax-sep · 档案",
  "kicker": "set.mm / ax-sep",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-sep",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-sep（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∃ y ∀ x ( x ∈ y ↔ ( x ∈ z ∧ P ) )",
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
      "label": "ax-sep"
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
  }
 },
 {
  "id": "CH4-18",
  "chapter": "set",
  "code": "CH4-18",
  "title": "ax-nul · 档案",
  "kicker": "set.mm / ax-nul",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-nul",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-nul（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∃ x ∀ y ¬ y ∈ x",
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
      "label": "ax-nul"
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
  }
 },
 {
  "id": "CH4-19",
  "chapter": "set",
  "code": "CH4-19",
  "title": "ax-pow · 档案",
  "kicker": "set.mm / ax-pow",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-pow",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pow（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∃ y ∀ z ( ∀ w ( w ∈ z → w ∈ x ) → z ∈ y )",
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
      "label": "ax-pow"
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
  }
 },
 {
  "id": "CH4-20",
  "chapter": "set",
  "code": "CH4-20",
  "title": "ax-un · 档案",
  "kicker": "set.mm / ax-un",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-un",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-un（ZF Set Theory - add the Axiom of Union）；本作不重证档案定理。",
  "target": "∃ y ∀ z ( ∃ w ( z ∈ w ∧ w ∈ x ) → z ∈ y )",
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
      "label": "ax-un"
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
  }
 },
 {
  "id": "CH4-21",
  "chapter": "set",
  "code": "CH4-21",
  "title": "coe · 档案",
  "kicker": "set.mm / coe",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:coe",
   "target"
  ],
  "reward": "—",
  "note": "set.mm coe（ZF Set Theory - add the Axiom of Union）；本作不重证档案定理。",
  "target": "class ^o",
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
      "label": "coe"
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
  }
 },
 {
  "id": "CH4-22",
  "chapter": "set",
  "code": "CH4-22",
  "title": "cmap · 档案",
  "kicker": "set.mm / cmap",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:cmap",
   "target"
  ],
  "reward": "—",
  "note": "set.mm cmap（ZF Set Theory - add the Axiom of Union）；本作不重证档案定理。",
  "target": "class ^m",
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
      "label": "cmap"
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
  }
 },
 {
  "id": "CH4-23",
  "chapter": "set",
  "code": "CH4-23",
  "title": "ax-reg · 档案",
  "kicker": "set.mm / ax-reg",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-reg",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-reg（ZF Set Theory - add the Axiom of Regularity）；本作不重证档案定理。",
  "target": "( ∃ y y ∈ x → ∃ y ( y ∈ x ∧ ∀ z ( z ∈ y → ¬ z ∈ x ) ) )",
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
      "label": "ax-reg"
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
  }
 },
 {
  "id": "CH4-24",
  "chapter": "set",
  "code": "CH4-24",
  "title": "ax-inf · 档案",
  "kicker": "set.mm / ax-inf",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-inf",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-inf（ZF Set Theory - add the Axiom of Infinity）；本作不重证档案定理。",
  "target": "∃ y ( x ∈ y ∧ ∀ z ( z ∈ y → ∃ w ( z ∈ w ∧ w ∈ y ) ) )",
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
      "label": "ax-inf"
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
  }
 },
 {
  "id": "CH4-25",
  "chapter": "set",
  "code": "CH4-25",
  "title": "ax-inf2 · 档案",
  "kicker": "set.mm / ax-inf2",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-inf2",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-inf2（ZF Set Theory - add the Axiom of Infinity）；本作不重证档案定理。",
  "target": "∃ x ( ∃ y ( y ∈ x ∧ ∀ z ¬ z ∈ y ) ∧ ∀ y ( y ∈ x → ∃ z ( z ∈ x ∧ ∀ w ( w ∈ z ↔ ( w ∈ y ∨ w = y ) ) ) ) )",
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
      "label": "ax-inf2"
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
  }
 },
 {
  "id": "CH4-26",
  "chapter": "set",
  "code": "CH4-26",
  "title": "ax-ac2 · 档案",
  "kicker": "set.mm / ax-ac2",
  "brief": "",
  "hint": "",
  "teaches": [
   "档案"
  ],
  "allowed": [
   "archive:ax-ac2",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ac2（ZFC Set Theory - add the Axiom of Choice）；本作不重证档案定理。",
  "target": "∃ y ∀ z ∃ v ∀ u ( ( y ∈ x ∧ ( z ∈ y → ( ( v ∈ x ∧ ¬ y = v ) ∧ z ∈ v ) ) ) ∨ ( ¬ y ∈ x ∧ ( z ∈ x → ( ( v ∈ z ∧ v ∈ y ) ∧ ( ( u ∈ z ∧ u ∈ y ) → u = v ) ) ) ) )",
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
      "label": "ax-ac2"
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
  }
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
  }
 },
 {
  "id": "CH4-28",
  "chapter": "set",
  "code": "CH4-28",
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
  }
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
  }
 },
 {
  "id": "CH4-30",
  "chapter": "set",
  "code": "CH4-30",
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
  }
 },
 {
  "id": "CH4-31",
  "chapter": "set",
  "code": "CH4-31",
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
  "target": "∀y (x = y↔∀z (z ∈ x↔z ∈ y))",
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
  }
 },
 {
  "id": "CH4-32",
  "chapter": "set",
  "code": "CH4-32",
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
  "target": "∀y ∀x (x = y↔∀z (z ∈ x↔z ∈ y))",
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
  }
 },
 {
  "id": "CH4-33",
  "chapter": "set",
  "code": "CH4-33",
  "title": "ax-rep · 全称闭包",
  "kicker": "set.mm / ax-rep",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-rep",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-rep（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∀x (∀w ∃y ∀z (∀y P→z = y)→∃y ∀z (z ∈ y↔∃w (w ∈ x∧∀y P)))",
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
  }
 },
 {
  "id": "CH4-34",
  "chapter": "set",
  "code": "CH4-34",
  "title": "ax-sep · 全称闭包",
  "kicker": "set.mm / ax-sep",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-sep",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-sep（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∀z ∃y ∀x (x ∈ y↔x ∈ z∧P)",
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
      "label": "ax-sep"
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
  }
 },
 {
  "id": "CH4-35",
  "chapter": "set",
  "code": "CH4-35",
  "title": "ax-pow · 全称闭包",
  "kicker": "set.mm / ax-pow",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-pow",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pow（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∀x ∃y ∀z (∀w (w ∈ z→w ∈ x)→z ∈ y)",
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
      "label": "ax-pow"
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
  }
 },
 {
  "id": "CH4-36",
  "chapter": "set",
  "code": "CH4-36",
  "title": "ax-pr · 全称闭包",
  "kicker": "set.mm / ax-pr",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-pr",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pr（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∀x ∃z ∀w (w = x∨w = y→w ∈ z)",
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
      "label": "ax-pr"
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
  }
 },
 {
  "id": "CH4-37",
  "chapter": "set",
  "code": "CH4-37",
  "title": "ax-pr · 全称闭包",
  "kicker": "set.mm / ax-pr",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-pr",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pr（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∀y ∃z ∀w (w = x∨w = y→w ∈ z)",
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
      "label": "ax-pr"
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
  }
 },
 {
  "id": "CH4-38",
  "chapter": "set",
  "code": "CH4-38",
  "title": "ax-pr · 全称闭包",
  "kicker": "set.mm / ax-pr",
  "brief": "",
  "hint": "",
  "teaches": [
   "全称闭包"
  ],
  "allowed": [
   "archive:ax-pr",
   "all-intro",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pr（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∀y ∀x ∃z ∀w (w = x∨w = y→w ∈ z)",
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
      "label": "ax-pr"
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
  }
 },
 {
  "id": "CH4-39",
  "chapter": "set",
  "code": "CH4-39",
  "title": "ax-un · 例化",
  "kicker": "set.mm / ax-un",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-un",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-un（ZF Set Theory - add the Axiom of Union）；本作不重证档案定理。",
  "target": "∃y ∀z (∃w (z ∈ w∧w ∈ a)→z ∈ y)",
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
      "label": "ax-un"
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
  }
 },
 {
  "id": "CH4-40",
  "chapter": "set",
  "code": "CH4-40",
  "title": "ax-reg · 例化",
  "kicker": "set.mm / ax-reg",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-reg",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-reg（ZF Set Theory - add the Axiom of Regularity）；本作不重证档案定理。",
  "target": "∃y y ∈ a→∃y (y ∈ a∧∀z (z ∈ y→¬z ∈ a))",
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
      "label": "ax-reg"
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
  }
 },
 {
  "id": "CH4-41",
  "chapter": "set",
  "code": "CH4-41",
  "title": "ax-inf · 例化",
  "kicker": "set.mm / ax-inf",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-inf",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-inf（ZF Set Theory - add the Axiom of Infinity）；本作不重证档案定理。",
  "target": "∃y (a ∈ y∧∀z (z ∈ y→∃w (z ∈ w∧w ∈ y)))",
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
      "label": "ax-inf"
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
  }
 },
 {
  "id": "CH4-42",
  "chapter": "set",
  "code": "CH4-42",
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
  "target": "∃y ∀z ∀w (z ∈ w∧w ∈ a→∃v ∀u (∃t (u ∈ w∧w ∈ t∧(u ∈ t∧t ∈ y))↔u = v))",
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
  }
 },
 {
  "id": "CH4-43",
  "chapter": "set",
  "code": "CH4-43",
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
  }
 },
 {
  "id": "CH4-44",
  "chapter": "set",
  "code": "CH4-44",
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
  }
 },
 {
  "id": "CH4-45",
  "chapter": "set",
  "code": "CH4-45",
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
  "target": "a = b↔∀z (z ∈ a↔z ∈ b)",
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
      "label": "axextb"
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
  }
 },
 {
  "id": "CH4-46",
  "chapter": "set",
  "code": "CH4-46",
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
  "target": "∀w ∃y ∀z (∀y P→z = y)→∃y ∀z (z ∈ y↔∃w (w ∈ a∧∀y P))",
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
  }
 },
 {
  "id": "CH4-47",
  "chapter": "set",
  "code": "CH4-47",
  "title": "ax-sep · 例化",
  "kicker": "set.mm / ax-sep",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-sep",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-sep（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∃y ∀x (x ∈ y↔x ∈ a∧P)",
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
      "label": "ax-sep"
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
  }
 },
 {
  "id": "CH4-48",
  "chapter": "set",
  "code": "CH4-48",
  "title": "ax-pow · 例化",
  "kicker": "set.mm / ax-pow",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-pow",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pow（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "∃y ∀z (∀w (w ∈ z→w ∈ a)→z ∈ y)",
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
      "label": "ax-pow"
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
  }
 },
 {
  "id": "CH4-49",
  "chapter": "set",
  "code": "CH4-49",
  "title": "ax-pr · 例化",
  "kicker": "set.mm / ax-pr",
  "brief": "",
  "hint": "",
  "teaches": [
   "例化"
  ],
  "allowed": [
   "archive:ax-pr",
   "all-intro",
   "all-elim",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pr（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
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
      "label": "ax-pr"
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
  }
 },
 {
  "id": "CH4-50",
  "chapter": "set",
  "code": "CH4-50",
  "title": "ax-sep · 定义置换",
  "kicker": "set.mm / ax-sep",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax-sep",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-sep（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∃y ∀x (x ∈ y↔¬(x ∈ z→¬P))",
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
      "label": "ax-sep"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-an:expand:a.a.b"
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
  }
 },
 {
  "id": "CH4-51",
  "chapter": "set",
  "code": "CH4-51",
  "title": "ax-pow · 定义置换",
  "kicker": "set.mm / ax-pow",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax-pow",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-pow（ZF Set Theory - add the Axiom of Power Sets）；本作不重证档案定理。",
  "target": "¬∀y ¬∀z (∀w (w ∈ z→w ∈ x)→z ∈ y)",
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
      "label": "ax-pow"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-ex:expand:@"
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
  }
 },
 {
  "id": "CH4-52",
  "chapter": "set",
  "code": "CH4-52",
  "title": "ax-un · 定义置换",
  "kicker": "set.mm / ax-un",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax-un",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-un（ZF Set Theory - add the Axiom of Union）；本作不重证档案定理。",
  "target": "∃y ∀z (¬∀w ¬(z ∈ w∧w ∈ x)→z ∈ y)",
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
      "label": "ax-un"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-ex:expand:a.a.a"
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
  }
 },
 {
  "id": "CH4-53",
  "chapter": "set",
  "code": "CH4-53",
  "title": "coe · 定义置换",
  "kicker": "set.mm / coe",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:coe",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm coe（ZF Set Theory - add the Axiom of Union）；本作不重证档案定理。",
  "target": "¬(class→¬o)",
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
      "label": "coe"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-an:expand:@"
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
  }
 },
 {
  "id": "CH4-54",
  "chapter": "set",
  "code": "CH4-54",
  "title": "cpm · 定义置换",
  "kicker": "set.mm / cpm",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:cpm",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm cpm（ZF Set Theory - add the Axiom of Union）；本作不重证档案定理。",
  "target": "¬(class→¬pm)",
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
      "label": "cpm"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-an:expand:@"
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
  }
 },
 {
  "id": "CH4-55",
  "chapter": "set",
  "code": "CH4-55",
  "title": "ax-inf · 定义置换",
  "kicker": "set.mm / ax-inf",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax-inf",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-inf（ZF Set Theory - add the Axiom of Infinity）；本作不重证档案定理。",
  "target": "∃y (x ∈ y∧∀z (z ∈ y→∃w ¬(z ∈ w→¬w ∈ y)))",
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
      "label": "ax-inf"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-an:expand:a.b.a.b.a"
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
  }
 },
 {
  "id": "CH4-56",
  "chapter": "set",
  "code": "CH4-56",
  "title": "ax-inf2 · 定义置换",
  "kicker": "set.mm / ax-inf2",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax-inf2",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-inf2（ZF Set Theory - add the Axiom of Infinity）；本作不重证档案定理。",
  "target": "¬∀x ¬(∃y (y ∈ x∧∀z ¬z ∈ y)∧∀y (y ∈ x→∃z (z ∈ x∧∀w (w ∈ z↔w ∈ y∨w = y))))",
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
      "label": "ax-inf2"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-ex:expand:@"
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
  }
 },
 {
  "id": "CH4-57",
  "chapter": "set",
  "code": "CH4-57",
  "title": "ax-ac2 · 定义置换",
  "kicker": "set.mm / ax-ac2",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax-ac2",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ac2（ZFC Set Theory - add the Axiom of Choice）；本作不重证档案定理。",
  "target": "∃y ∀z ∃v ∀u (y ∈ x∧(z ∈ y→v ∈ x∧¬y = v∧z ∈ v)∨¬y ∈ x∧(z ∈ x→¬(v ∈ z∧v ∈ y→¬(u ∈ z∧u ∈ y→u = v))))",
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
      "label": "ax-ac2"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-an:expand:a.a.a.a.b.b.b"
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
  }
 },
 {
  "id": "CH4-58",
  "chapter": "set",
  "code": "CH4-58",
  "title": "ax-ext · 定义置换",
  "kicker": "set.mm / ax-ext",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax-ext",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-ext（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "∀z ((z ∈ x→z ∈ y)∧(z ∈ y→z ∈ x))→x = y",
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
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "dfbi2:expand:a.a"
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
  }
 },
 {
  "id": "CH4-59",
  "chapter": "set",
  "code": "CH4-59",
  "title": "axextb · 定义置换",
  "kicker": "set.mm / axextb",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:axextb",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm axextb（ZF Set Theory - start with the Axiom of Extensionality）；本作不重证档案定理。",
  "target": "x = y↔∀z ((z ∈ x→z ∈ y)∧(z ∈ y→z ∈ x))",
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
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "dfbi2:expand:b.a"
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
  }
 },
 {
  "id": "CH4-60",
  "chapter": "set",
  "code": "CH4-60",
  "title": "ax-rep · 定义置换",
  "kicker": "set.mm / ax-rep",
  "brief": "",
  "hint": "",
  "teaches": [
   "定义置换"
  ],
  "allowed": [
   "archive:ax-rep",
   "replace",
   "target"
  ],
  "reward": "—",
  "note": "set.mm ax-rep（ZF Set Theory - add the Axiom of Replacement）；本作不重证档案定理。",
  "target": "∀w ¬∀y ¬∀z (∀y P→z = y)→∃y ∀z (z ∈ y↔∃w (w ∈ x∧∀y P))",
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
      "label": "ax-rep"
     }
    },
    {
     "id": "r0",
     "kind": "replace",
     "x": 620,
     "y": 700,
     "config": {
      "optionId": "df-ex:expand:a.a"
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
  }
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
