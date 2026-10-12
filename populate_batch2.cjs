const fs = require('fs');

const BATCH_2 = {
  "mamoswine": {
    dexNumber: 473, generation: "Gen 4", role: "Thick Fat Ground-Ice Wallbreaker / Priority Revenge Cleaner",
    baseStats: { hp: 110, atk: 130, def: 80, spa: 70, spd: 60, spe: 80, total: 530 },
    abilities: [
      { name: "Thick Fat", rate: "88.5%", desc: "Halves damage taken from Fire and Ice attacks, removing Fire weakness." },
      { name: "Oblivious", rate: "11.5%", desc: "Immunity to Taunt and Intimidate." }
    ],
    items: [
      { name: "Life Orb", rate: "46.0%", desc: "30% damage boost across all attacks." },
      { name: "Focus Sash", rate: "28.5%", desc: "Guarantees hazard setup or surviving lethal strike." },
      { name: "Choice Band", rate: "18.0%", desc: "Colossal physical wallbreaking power." },
      { name: "Assault Vest", rate: "7.5%", desc: "Sp. Def boost." }
    ],
    moves: [
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "99.0%", desc: "Heavy Ground STAB hitting adjacent foes." },
      { name: "Icicle Crash", type: "Ice", category: "Physical", power: 85, accuracy: 90, rate: "94.5%", desc: "Ice STAB with 30% flinch rate." },
      { name: "Ice Shard", type: "Ice", category: "Physical", power: 40, accuracy: 100, rate: "92.0%", desc: "+1 Priority Ice finisher for fast Dragons." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "76.4%", desc: "Removes target held item and deals 1.5x damage." }
    ],
    natures: [
      { name: "Adamant", rate: "64.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Jolly", rate: "36.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "92.0%", desc: "Fast Physical Wallbreaker" }
    ]
  },

  "maushold-family-of-three": {
    dexNumber: 925, generation: "Gen 9", role: "Technician Population Bomb Sweeper / Follow Me Support",
    baseStats: { hp: 74, atk: 75, def: 70, spa: 65, spd: 75, spe: 111, total: 470 },
    abilities: [
      { name: "Technician", rate: "84.2%", desc: "Boosts Population Bomb hits from 20 to 30 BP each!" },
      { name: "Friend Guard", rate: "15.8%", desc: "Reduces damage taken by ally by 25% in doubles." }
    ],
    items: [
      { name: "Wide Lens", rate: "68.5%", desc: "Boosts Population Bomb accuracy to 99% for 10 guaranteed hits!" },
      { name: "Focus Sash", rate: "22.0%", desc: "Guarantees surviving redirection or attack." },
      { name: "Safety Goggles", rate: "9.5%", desc: "Immunity to Spore and Rage Powder." }
    ],
    moves: [
      { name: "Population Bomb", type: "Normal", category: "Physical", power: 20, accuracy: 90, rate: "99.8%", desc: "Hits up to 10 times; with Technician & Wide Lens deals devastating 300 total BP!" },
      { name: "Follow Me", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "88.0%", desc: "+2 Priority; redirects all opponent single-target attacks to user." },
      { name: "Super Fang", type: "Normal", category: "Physical", power: 1, accuracy: 90, rate: "72.4%", desc: "Cuts target's current HP by 50% true damage." },
      { name: "Encore", type: "Normal", category: "Status", power: "-", accuracy: 100, rate: "64.0%", desc: "Locks target into their last used move for 3 turns." }
    ],
    natures: [
      { name: "Jolly", rate: "88.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (111 Speed tier)" },
      { name: "Adamant", rate: "12.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "74.0%", desc: "Fast Physical Population Bomb" },
      { spread: "252 HP / 4 Def / 252 Spe", rate: "26.0%", desc: "Bulky Fast Follow Me Support" }
    ]
  },

  "meganium": {
    dexNumber: 154, generation: "Gen 2", role: "Dual Screens Support / Leech Seed Stall Tank",
    baseStats: { hp: 80, atk: 82, def: 100, spa: 83, spd: 100, spe: 80, total: 525 },
    abilities: [
      { name: "Overgrow", rate: "92.0%", desc: "Boosts Grass moves by 50% when HP falls below 1/3." },
      { name: "Leaf Guard", rate: "8.0%", desc: "Prevents status conditions in harsh sunlight." }
    ],
    items: [
      { name: "Light Clay", rate: "54.0%", desc: "Extends Reflect and Light Screen from 5 to 8 turns." },
      { name: "Leftovers", rate: "36.0%", desc: "Consistent recovery." },
      { name: "Sitrus Berry", rate: "10.0%", desc: "Burst healing." }
    ],
    moves: [
      { name: "Giga Drain", type: "Grass", category: "Special", power: 75, accuracy: 100, rate: "92.0%", desc: "Grass STAB recovering 50% damage dealt." },
      { name: "Reflect", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "86.4%", desc: "Halves incoming physical damage for team for 8 turns." },
      { name: "Light Screen", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "82.0%", desc: "Halves incoming special damage for team for 8 turns." },
      { name: "Leech Seed", type: "Grass", category: "Status", power: "-", accuracy: 90, rate: "68.5%", desc: "Drains 1/8 enemy HP each turn to heal user." }
    ],
    natures: [
      { name: "Bold", rate: "64.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" },
      { name: "Calm", rate: "36.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "68.0%", desc: "Physical Defense Screens Wall" },
      { spread: "252 HP / 4 Def / 252 SpD", rate: "32.0%", desc: "Specially Defensive Wall" }
    ]
  },

  "meowscarada": {
    dexNumber: 908, generation: "Gen 9", role: "Protean Flower Trick Critical Sweeper / Fast Pivot",
    baseStats: { hp: 76, atk: 110, def: 70, spa: 81, spd: 70, spe: 123, total: 530 },
    abilities: [
      { name: "Protean", rate: "72.4%", desc: "Changes user type to match first move used, granting 1.5x STAB on all coverage." },
      { name: "Overgrow", rate: "27.6%", desc: "Boosts Flower Trick power when low." }
    ],
    items: [
      { name: "Focus Sash", rate: "48.2%", desc: "Guarantees surviving fatal hit to retaliate or pivot." },
      { name: "Choice Band", rate: "26.5%", desc: "Instant wallbreaking physical burst." },
      { name: "Life Orb", rate: "16.0%", desc: "Damage amplification." },
      { name: "Choice Scarf", rate: "9.3%", desc: "Outspeeds opposing fast sweepers." }
    ],
    moves: [
      { name: "Flower Trick", type: "Grass", category: "Physical", power: 70, accuracy: "-", rate: "99.8%", desc: "Never misses; ALWAYS lands critical hits (effective 105+ BP, ignores enemy Defense buffs!)." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "96.0%", desc: "Removes target held item and deals 1.5x damage." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "92.5%", desc: "Fast pivoting attack at 123 Speed." },
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "74.0%", desc: "+1 Priority Dark attack; strikes before target attacks." }
    ],
    natures: [
      { name: "Jolly", rate: "86.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Blazing 123 Speed tier)" },
      { name: "Adamant", rate: "14.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "94.0%", desc: "Fast Physical Sweeper" }
    ]
  },

  "meowstic-female": {
    dexNumber: 678, generation: "Gen 6", role: "Competitive Special Sweeper / Fake Out Disrupter",
    baseStats: { hp: 74, atk: 48, def: 76, spa: 83, spd: 81, spe: 104, total: 466 },
    abilities: [
      { name: "Competitive", rate: "92.5%", desc: "Sharply raises Sp. Atk by 2 stages (+100%) when any stat is lowered (punishes Intimidate & Icy Wind!)." },
      { name: "Infiltrator", rate: "7.5%", desc: "Passes through screens and substitute." }
    ],
    items: [
      { name: "Focus Sash", rate: "52.0%", desc: "Guarantees surviving to fire +2 Sp. Atk attacks." },
      { name: "Life Orb", rate: "28.0%", desc: "Damage boost." },
      { name: "Choice Specs", rate: "20.0%", desc: "Instant wallbreaking power." }
    ],
    moves: [
      { name: "Psychic", type: "Psychic", category: "Special", power: 90, accuracy: 100, rate: "96.0%", desc: "Psychic STAB; 10% Sp. Def drop." },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "88.4%", desc: "Ghost coverage." },
      { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "82.0%", desc: "Spread Fairy attack vs Dark types." },
      { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "68.5%", desc: "+3 Priority turn 1 flinch." }
    ],
    natures: [
      { name: "Timid", rate: "88.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Outspeeds neutral 100 tier)" },
      { name: "Modest", rate: "12.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Fast Competitive Sweeper" }
    ]
  },

  "milotic": {
    dexNumber: 350, generation: "Gen 3", role: "Competitive Special Counter / Marvel Scale Wall",
    baseStats: { hp: 95, atk: 60, def: 79, spa: 100, spd: 125, spe: 81, total: 540 },
    abilities: [
      { name: "Competitive", rate: "76.4%", desc: "Sharply raises Sp. Atk by 2 stages when any stat is lowered (hard counters Intimidate!)." },
      { name: "Marvel Scale", rate: "23.6%", desc: "Boosts Defense by 50% when afflicted by a status condition." }
    ],
    items: [
      { name: "Leftovers", rate: "58.0%", desc: "Consistent recovery." },
      { name: "Flame Orb", rate: "22.5%", desc: "Triggers Marvel Scale for 1.5x physical Defense boost." },
      { name: "Sitrus Berry", rate: "12.5%", desc: "Burst healing." },
      { name: "Assault Vest", rate: "7.0%", desc: "Colossal special bulk." }
    ],
    moves: [
      { name: "Scald", type: "Water", category: "Special", power: 80, accuracy: 100, rate: "96.4%", desc: "Consistent Water damage with 30% burn chance." },
      { name: "Recover", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "94.0%", desc: "Restores 50% max HP." },
      { name: "Ice Beam", type: "Ice", category: "Special", power: 90, accuracy: 100, rate: "88.2%", desc: "Ice coverage vs Grass and Dragons." },
      { name: "Haze", type: "Ice", category: "Status", power: "-", accuracy: "-", rate: "64.0%", desc: "Resets all stat modifications across both sides of the field." }
    ],
    natures: [
      { name: "Bold", rate: "72.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Patches physical Defense)" },
      { name: "Calm", rate: "28.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpA", rate: "68.0%", desc: "Physically Defensive Tank" },
      { spread: "252 HP / 140 Def / 116 SpA", rate: "32.0%", desc: "Offensive Competitive Tank" }
    ]
  },

  "ninetales": {
    dexNumber: 38, generation: "Gen 1", role: "Drought Sun Setter / Heat Wave Special Attacker",
    baseStats: { hp: 73, atk: 76, def: 75, spa: 81, spd: 100, spe: 100, total: 505 },
    abilities: [
      { name: "Drought", rate: "99.2%", desc: "Sets harsh sunlight automatically for 5 turns upon switch-in." },
      { name: "Flash Fire", rate: "0.8%", desc: "Fire immunity." }
    ],
    items: [
      { name: "Heat Rock", rate: "64.0%", desc: "Extends harsh sunlight duration from 5 to 8 turns." },
      { name: "Focus Sash", rate: "22.5%", desc: "Guarantees setting sun and attacking." },
      { name: "Choice Specs", rate: "13.5%", desc: "Boosts sun-boosted Fire attacks by 50%." }
    ],
    moves: [
      { name: "Heat Wave", type: "Fire", category: "Special", power: 95, accuracy: 90, rate: "96.4%", desc: "Sun-boosted Fire damage hitting both opponents." },
      { name: "Solar Beam", type: "Grass", category: "Special", power: 120, accuracy: 100, rate: "92.0%", desc: "1-turn move in sun covering Water, Ground, and Rock." },
      { name: "Overheat", type: "Fire", category: "Special", power: 130, accuracy: 90, rate: "74.5%", desc: "Devastating burst damage." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "64.0%", desc: "Burns target to halve their physical Attack." }
    ],
    natures: [
      { name: "Timid", rate: "86.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Base 100 Speed tier)" },
      { name: "Modest", rate: "14.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Fast Sun Setter" }
    ]
  },

  "ninetales-alola": {
    dexNumber: 38, generation: "Gen 7", role: "Snow Warning Aurora Veil Screen Setter / Blizzard Sweeper",
    baseStats: { hp: 73, atk: 67, def: 75, spa: 81, spd: 100, spe: 109, total: 505 },
    abilities: [
      { name: "Snow Warning", rate: "99.8%", desc: "Sets Snow automatically on switch-in, boosting Ice Defense by 50%." }
    ],
    items: [
      { name: "Light Clay", rate: "68.5%", desc: "Extends Aurora Veil reduction from 5 to 8 turns." },
      { name: "Focus Sash", rate: "24.0%", desc: "Guarantees setting Aurora Veil before fainting." },
      { name: "Never-Melt Ice", rate: "7.5%", desc: "Boosts Blizzard damage." }
    ],
    moves: [
      { name: "Aurora Veil", type: "Ice", category: "Status", power: "-", accuracy: "-", rate: "99.8%", desc: "Cuts incoming physical AND special damage by 50% for 8 turns under Snow!" },
      { name: "Blizzard", type: "Ice", category: "Special", power: 110, accuracy: 70, rate: "98.5%", desc: "Never misses in Snow; spread 110 BP damage hitting both foes with 10% freeze." },
      { name: "Moonblast", type: "Fairy", category: "Special", power: 95, accuracy: 100, rate: "92.0%", desc: "Fairy STAB; 30% target Sp. Atk drop." },
      { name: "Freeze-Dry", type: "Ice", category: "Special", power: 70, accuracy: 100, rate: "84.2%", desc: "Deals super-effective 2x damage against Water types." }
    ],
    natures: [
      { name: "Timid", rate: "96.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Blazing 109 Speed tier)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "88.0%", desc: "Fast Aurora Veil Setter" }
    ]
  },

  "orthworm": {
    dexNumber: 968, generation: "Gen 9", role: "Earth Eater Shed Tail Pivot / Body Press Tank",
    baseStats: { hp: 70, atk: 85, def: 145, spa: 60, spd: 55, spe: 65, total: 480 },
    abilities: [
      { name: "Earth Eater", rate: "99.5%", desc: "Ground moves heal HP by 25% instead of dealing damage, granting full immunity!" }
    ],
    items: [
      { name: "Sitrus Berry", rate: "82.0%", desc: "Heals 25% max HP immediately after Shed Tail 50% health cost." },
      { name: "Leftovers", rate: "12.0%", desc: "Sustain." },
      { name: "Rocky Helmet", rate: "6.0%", desc: "Contact damage." }
    ],
    moves: [
      { name: "Shed Tail", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "99.2%", desc: "Cuts 50% HP to pass a Substitute to an incoming teammate!" },
      { name: "Body Press", type: "Fighting", category: "Physical", power: 80, accuracy: 100, rate: "96.0%", desc: "Uses massive 145 base Defense stat for huge Fighting damage." },
      { name: "Iron Head", type: "Steel", category: "Physical", power: 80, accuracy: 100, rate: "84.5%", desc: "Steel STAB with 30% flinch rate." },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "76.0%", desc: "Entry hazard damage." }
    ],
    natures: [
      { name: "Impish", rate: "78.0%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk" },
      { name: "Careful", rate: "22.0%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "72.0%", desc: "Max Physical Defense Shed Tail" }
    ]
  },

  "overqwil": {
    dexNumber: 904, generation: "Gen 8", role: "Swift Swim Rain Sweeper / Intimidate Barb Barrage Pivot",
    baseStats: { hp: 85, atk: 115, def: 95, spa: 65, spd: 65, spe: 85, total: 510 },
    abilities: [
      { name: "Swift Swim", rate: "64.0%", desc: "Doubles Speed in rain." },
      { name: "Intimidate", rate: "34.0%", desc: "Lowers opposing Pokémon Attack by 1 stage on switch-in." },
      { name: "Poison Point", rate: "2.0%", desc: "30% poison chance." }
    ],
    items: [
      { name: "Life Orb", rate: "48.0%", desc: "Amplifies physical strikes." },
      { name: "Focus Sash", rate: "28.5%", desc: "Guarantees hazard setup or survival." },
      { name: "Choice Band", rate: "16.0%", desc: "Wallbreaking power." },
      { name: "Black Sludge", rate: "7.5%", desc: "Gradual HP recovery." }
    ],
    moves: [
      { name: "Barb Barrage", type: "Poison", category: "Physical", power: 60, accuracy: 100, rate: "98.5%", desc: "Signature Poison move; doubles power to 120 BP if target is poisoned." },
      { name: "Gunk Shot", type: "Poison", category: "Physical", power: 120, accuracy: 80, rate: "88.0%", desc: "High-power physical poison projectile." },
      { name: "Crunch", type: "Dark", category: "Physical", power: 80, accuracy: 100, rate: "86.4%", desc: "Dark STAB; 20% Defense drop." },
      { name: "Aqua Tail", type: "Water", category: "Physical", power: 90, accuracy: 90, rate: "74.0%", desc: "Water coverage boosted in Rain." }
    ],
    natures: [
      { name: "Adamant", rate: "68.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Jolly", rate: "32.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "92.0%", desc: "Fast Physical Rain Sweeper" }
    ]
  },

  "pawmot": {
    dexNumber: 923, generation: "Gen 9", role: "Revival Blessing Supporter / Double Shock Sweeper",
    baseStats: { hp: 70, atk: 115, def: 70, spa: 70, spd: 60, spe: 105, total: 490 },
    abilities: [
      { name: "Iron Fist", rate: "78.4%", desc: "Boosts punching moves by 20% (Mach Punch, Thunder Punch, Ice Punch)." },
      { name: "Natural Cure", rate: "21.6%", desc: "Heals status upon switching out." }
    ],
    items: [
      { name: "Focus Sash", rate: "68.5%", desc: "Guarantees surviving to execute Revival Blessing or KO." },
      { name: "Leppa Berry", rate: "18.0%", desc: "Restores 10 PP to Revival Blessing for a second revival!" },
      { name: "Life Orb", rate: "13.5%", desc: "Offensive power." }
    ],
    moves: [
      { name: "Revival Blessing", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "99.8%", desc: "Revives a fainted party Pokémon back to life at 50% max HP!" },
      { name: "Double Shock", type: "Electric", category: "Physical", power: 120, accuracy: 100, rate: "96.0%", desc: "Massive 120 BP Electric STAB." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "94.5%", desc: "Fighting STAB nuke; drops Def and Sp. Def by 1." },
      { name: "Mach Punch", type: "Fighting", category: "Physical", power: 40, accuracy: 100, rate: "84.0%", desc: "+1 Priority Iron Fist boosted punch for revenge KOs." }
    ],
    natures: [
      { name: "Jolly", rate: "88.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (105 Speed tier)" },
      { name: "Adamant", rate: "12.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "94.0%", desc: "Fast Physical Attacker & Reviver" }
    ]
  },

  "pincurchin": {
    dexNumber: 871, generation: "Gen 8", role: "Electric Surge Setter / Rising Voltage Attacker",
    baseStats: { hp: 48, atk: 101, def: 95, spa: 91, spd: 85, spe: 15, total: 435 },
    abilities: [
      { name: "Electric Surge", rate: "99.5%", desc: "Sets Electric Terrain on entry (powers Electric moves by 30%, activates Quark Drive, prevents sleep)." }
    ],
    items: [
      { name: "Terrain Extender", rate: "54.0%", desc: "Extends Electric Terrain to 8 turns." },
      { name: "Life Orb", rate: "24.5%", desc: "Damage boost." },
      { name: "Focus Sash", rate: "14.5%", desc: "Survives fatal hit." },
      { name: "Sitrus Berry", rate: "7.0%", desc: "Recovery." }
    ],
    moves: [
      { name: "Rising Voltage", type: "Electric", category: "Special", power: 70, accuracy: 100, rate: "98.0%", desc: "Doubles power to 140 BP against grounded foes on Electric Terrain!" },
      { name: "Zing Zap", type: "Electric", category: "Physical", power: 80, accuracy: 100, rate: "88.0%", desc: "Physical Electric STAB with 30% flinch rate." },
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "84.0%", desc: "+1 Priority Dark attack." },
      { name: "Recover", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "72.0%", desc: "Restores 50% max HP." }
    ],
    natures: [
      { name: "Quiet", rate: "62.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room)" },
      { name: "Brave", rate: "38.0%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 Atk", rate: "64.0%", desc: "Bulky Electric Surge Setter" }
    ]
  },

  "politoed": {
    dexNumber: 186, generation: "Gen 2", role: "Drizzle Rain Setter / Helping Hand Support",
    baseStats: { hp: 90, atk: 75, def: 75, spa: 90, spd: 100, spe: 70, total: 500 },
    abilities: [
      { name: "Drizzle", rate: "99.8%", desc: "Sets Rain automatically for 5 turns upon switch-in." }
    ],
    items: [
      { name: "Damp Rock", rate: "62.0%", desc: "Extends Rain duration from 5 to 8 turns." },
      { name: "Sitrus Berry", rate: "24.5%", desc: "Burst healing." },
      { name: "Leftovers", rate: "13.5%", desc: "Passive recovery." }
    ],
    moves: [
      { name: "Weather Ball", type: "Normal", category: "Special", power: 50, accuracy: 100, rate: "94.0%", desc: "Becomes 100 BP Water move boosted 1.5x by Rain (150 total BP!)." },
      { name: "Helping Hand", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "88.0%", desc: "Boosts ally move power by 50%." },
      { name: "Icy Wind", type: "Ice", category: "Special", power: 55, accuracy: 95, rate: "82.4%", desc: "Hits both opponents and lowers their Speed by 1 stage." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "78.0%", desc: "Evades incoming damage for 1 turn." }
    ],
    natures: [
      { name: "Calm", rate: "58.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" },
      { name: "Bold", rate: "42.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 140 Def / 116 SpD", rate: "68.0%", desc: "Bulky Rain Support" }
    ]
  },

  "polteageist": {
    dexNumber: 855, generation: "Gen 8", role: "Weak Armor Shell Smash Sweeper / Stored Power Nuke",
    baseStats: { hp: 60, atk: 65, def: 65, spa: 134, spd: 114, spe: 70, total: 508 },
    abilities: [
      { name: "Weak Armor", rate: "96.4%", desc: "+2 Speed and -1 Defense upon taking physical hit." },
      { name: "Cursed Body", rate: "3.6%", desc: "30% disable on hit." }
    ],
    items: [
      { name: "Focus Sash", rate: "68.0%", desc: "Guarantees Shell Smash setup turn without fainting." },
      { name: "White Herb", rate: "26.0%", desc: "Restores dropped defenses after Shell Smash." },
      { name: "Life Orb", rate: "6.0%", desc: "Damage boost." }
    ],
    moves: [
      { name: "Shell Smash", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "99.8%", desc: "Sharply raises Attack, Sp. Atk, and Speed by 2 stages (+100%)!" },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "98.5%", desc: "134 Sp. Atk Ghost STAB; 20% Sp. Def drop." },
      { name: "Stored Power", type: "Psychic", category: "Special", power: 20, accuracy: 100, rate: "94.0%", desc: "Gains +20 BP per stat boost; reaches 140 BP immediately after Shell Smash!" },
      { name: "Giga Drain", type: "Grass", category: "Special", power: 75, accuracy: 100, rate: "82.0%", desc: "Grass coverage recovering 50% damage dealt." }
    ],
    natures: [
      { name: "Modest", rate: "72.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Shell Smash covers Speed)" },
      { name: "Timid", rate: "28.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "96.0%", desc: "Max Speed Special Shell Smasher" }
    ]
  },

  "pyroar": {
    dexNumber: 668, generation: "Gen 6", role: "Unnerve Special Attacker / Hyper Voice Fire Blast Sweeper",
    baseStats: { hp: 86, atk: 68, def: 72, spa: 109, spd: 66, spe: 106, total: 507 },
    abilities: [
      { name: "Unnerve", rate: "78.0%", desc: "Prevents opponents from eating their held berries (Sitrus, Lum, etc.)." },
      { name: "Moxie", rate: "22.0%", desc: "Raises Attack on KO." }
    ],
    items: [
      { name: "Choice Specs", rate: "48.0%", desc: "Heavy special burst damage." },
      { name: "Life Orb", rate: "32.0%", desc: "Damage boost." },
      { name: "Choice Scarf", rate: "14.0%", desc: "Outspeeds faster threats." },
      { name: "Focus Sash", rate: "6.0%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "96.4%", desc: "Normal STAB sound move hitting both opponents." },
      { name: "Fire Blast", type: "Fire", category: "Special", power: 110, accuracy: 85, rate: "92.0%", desc: "Heavy Fire STAB." },
      { name: "Dark Pulse", type: "Dark", category: "Special", power: 80, accuracy: 100, rate: "84.0%", desc: "Dark coverage; 20% flinch rate." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "62.0%", desc: "Burns target to halve physical Attack." }
    ],
    natures: [
      { name: "Timid", rate: "84.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Fast 106 Speed tier)" },
      { name: "Modest", rate: "16.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Fast Special Attacker" }
    ]
  },

  "raichu": {
    dexNumber: 26, generation: "Gen 1", role: "Lightning Rod Fake Out Support / Electroweb Speed Controller",
    baseStats: { hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 110, total: 485 },
    abilities: [
      { name: "Lightning Rod", rate: "99.5%", desc: "Draws in all Electric-type moves, granting full immunity and +1 Sp. Atk (protects Water allies!)." }
    ],
    items: [
      { name: "Focus Sash", rate: "76.4%", desc: "Guarantees surviving lethal hit to support team." },
      { name: "Assault Vest", rate: "14.0%", desc: "Special bulk boost." },
      { name: "Air Balloon", rate: "9.6%", desc: "Ground immunity." }
    ],
    moves: [
      { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "99.8%", desc: "+3 Priority turn 1 flinch allowing ally to setup or attack freely." },
      { name: "Volt Switch", type: "Electric", category: "Special", power: 70, accuracy: 100, rate: "92.0%", desc: "Pivots out while doing damage." },
      { name: "Electroweb", type: "Electric", category: "Special", power: 55, accuracy: 95, rate: "88.4%", desc: "Hits both opponents and drops their Speed by 1 stage." },
      { name: "Nuzzle", type: "Electric", category: "Physical", power: 20, accuracy: 100, rate: "74.0%", desc: "100% guaranteed paralysis infliction." }
    ],
    natures: [
      { name: "Timid", rate: "92.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (High 110 Speed tier)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "64.0%", desc: "Fast Support Attacker" },
      { spread: "252 HP / 4 SpD / 252 Spe", rate: "36.0%", desc: "Fast Bulky Support" }
    ]
  },

  "rotom-heat": {
    dexNumber: 479, generation: "Gen 4", role: "Levitate Pivot Wallbreaker / Overheat Volt Switcher",
    baseStats: { hp: 50, atk: 65, def: 107, spa: 105, spd: 107, spe: 86, total: 520 },
    abilities: [
      { name: "Levitate", rate: "100.0%", desc: "Full immunity to Ground attacks, removing Fire's major weakness!" }
    ],
    items: [
      { name: "Choice Specs", rate: "42.0%", desc: "Colossal Overheat burst." },
      { name: "Leftovers", rate: "28.5%", desc: "Consistent recovery." },
      { name: "Choice Scarf", rate: "18.0%", desc: "Fast pivot." },
      { name: "Sitrus Berry", rate: "11.5%", desc: "Burst healing." }
    ],
    moves: [
      { name: "Overheat", type: "Fire", category: "Special", power: 130, accuracy: 90, rate: "99.5%", desc: "Massive 130 BP Fire STAB burst; drops Sp. Atk by 2." },
      { name: "Volt Switch", type: "Electric", category: "Special", power: 70, accuracy: 100, rate: "96.0%", desc: "Electric STAB pivoting out to reset Overheat drop." },
      { name: "Thunderbolt", type: "Electric", category: "Special", power: 90, accuracy: 100, rate: "82.0%", desc: "Consistent Electric STAB." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "68.5%", desc: "Burns target to halve their physical Attack." }
    ],
    natures: [
      { name: "Timid", rate: "68.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" },
      { name: "Modest", rate: "32.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "252 SpA / 4 SpD / 252 Spe", rate: "62.0%", desc: "Fast Special Attacker" },
      { spread: "252 HP / 140 Def / 116 Spe", rate: "38.0%", desc: "Bulky Defensive Pivot" }
    ]
  },

  "rotom-wash": {
    dexNumber: 479, generation: "Gen 4", role: "Levitate Hydro Pump Pivot / Will-O-Wisp Disruptor",
    baseStats: { hp: 50, atk: 65, def: 107, spa: 105, spd: 107, spe: 86, total: 520 },
    abilities: [
      { name: "Levitate", rate: "100.0%", desc: "Full immunity to Ground attacks, leaving only Grass as a single weakness!" }
    ],
    items: [
      { name: "Leftovers", rate: "54.2%", desc: "Passive recovery behind great typing." },
      { name: "Choice Scarf", rate: "24.0%", desc: "Fast Trick and pivot." },
      { name: "Sitrus Berry", rate: "14.5%", desc: "Burst healing." },
      { name: "Choice Specs", rate: "7.3%", desc: "Special burst damage." }
    ],
    moves: [
      { name: "Hydro Pump", type: "Water", category: "Special", power: 110, accuracy: 80, rate: "99.5%", desc: "Colossal special Water STAB." },
      { name: "Volt Switch", type: "Electric", category: "Special", power: 70, accuracy: 100, rate: "96.4%", desc: "Pivots out while maintaining momentum." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "88.0%", desc: "Burns target to halve their physical Attack." },
      { name: "Thunderbolt", type: "Electric", category: "Special", power: 90, accuracy: 100, rate: "64.0%", desc: "Consistent Electric STAB." }
    ],
    natures: [
      { name: "Bold", rate: "52.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Physical tank)" },
      { name: "Timid", rate: "34.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" },
      { name: "Modest", rate: "14.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpA", rate: "58.0%", desc: "Physically Defensive Pivot" },
      { spread: "252 SpA / 4 SpD / 252 Spe", rate: "42.0%", desc: "Offensive Scarf / Specs" }
    ]
  },

  "sableye": {
    dexNumber: 302, generation: "Gen 3", role: "Mega Magic Bounce Wall / Prankster Quash Disruptor",
    baseStats: { hp: 50, atk: 75, def: 75, spa: 65, spd: 65, spe: 50, total: 380 },
    abilities: [
      { name: "Prankster", rate: "68.5%", desc: "+1 Priority on all status moves (Will-O-Wisp, Quash, Recover)." },
      { name: "Magic Bounce", rate: "31.5%", desc: "Mega Ability reflects hazards and status moves back at opponent." }
    ],
    items: [
      { name: "Sablenite Z", rate: "58.0%", desc: "Mega Stone granting 125 Def & Sp. Def with Magic Bounce." },
      { name: "Sablenite", rate: "18.5%", desc: "Standard Mega Stone." },
      { name: "Mental Herb", rate: "14.0%", desc: "Immunity to Taunt for non-mega Prankster sets." },
      { name: "Leftovers", rate: "9.5%", desc: "Consistent recovery." }
    ],
    moves: [
      { name: "Quash", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "92.0%", desc: "+1 Priority; forces targeted opponent to move dead LAST that turn!" },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "94.5%", desc: "+1 Priority burn halving target physical Attack." },
      { name: "Recover", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "91.0%", desc: "+1 Priority reliable 50% HP restoration." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "84.0%", desc: "Removes target held item and deals 1.5x damage." }
    ],
    natures: [
      { name: "Careful", rate: "54.0%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk" },
      { name: "Impish", rate: "46.0%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "252 HP / 140 Def / 116 SpD", rate: "84.0%", desc: "Mixed Defensive Wall" }
    ]
  },

  "samurott": {
    dexNumber: 503, generation: "Gen 5", role: "Ceaseless Edge Hazard Sweeper / Sacred Sword Wallbreaker",
    baseStats: { hp: 95, atk: 100, def: 85, spa: 108, spd: 70, spe: 70, total: 528 },
    abilities: [
      { name: "Torrent", rate: "84.0%", desc: "Boosts Water moves by 50% at low HP." },
      { name: "Shell Armor", rate: "16.0%", desc: "Immunity to critical hits." }
    ],
    items: [
      { name: "Focus Sash", rate: "48.0%", desc: "Guarantees setting Spikes with Ceaseless Edge." },
      { name: "Life Orb", rate: "28.5%", desc: "Amplifies physical strikes." },
      { name: "Choice Band", rate: "16.0%", desc: "Wallbreaking power." },
      { name: "Assault Vest", rate: "7.5%", desc: "Special bulk." }
    ],
    moves: [
      { name: "Ceaseless Edge", type: "Dark", category: "Physical", power: 65, accuracy: 90, rate: "99.0%", desc: "Damages foe AND automatically sets a layer of Spikes on their field!" },
      { name: "Razor Shell", type: "Water", category: "Physical", power: 75, accuracy: 95, rate: "92.0%", desc: "Physical Water STAB; 50% chance to drop target Defense." },
      { name: "Aqua Jet", type: "Water", category: "Physical", power: 40, accuracy: 100, rate: "88.4%", desc: "+1 Priority Water move for revenge KOs." },
      { name: "Sacred Sword", type: "Fighting", category: "Physical", power: 90, accuracy: 100, rate: "76.0%", desc: "Ignores target stat changes." }
    ],
    natures: [
      { name: "Jolly", rate: "66.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" },
      { name: "Adamant", rate: "34.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "92.0%", desc: "Fast Physical Hazard Lead" }
    ]
  },

  "sceptile": {
    dexNumber: 254, generation: "Gen 3", role: "Lightning Rod Mega Dragon Sweeper / Leaf Storm Nuke",
    baseStats: { hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120, total: 530 },
    abilities: [
      { name: "Overgrow", rate: "64.0%", desc: "Boosts Grass moves at under 1/3 HP." },
      { name: "Lightning Rod", rate: "36.0%", desc: "Mega Ability draws Electric attacks, granting immunity and +1 Sp. Atk!" }
    ],
    items: [
      { name: "Sceptilite Z", rate: "76.0%", desc: "Mega Stone granting Grass/Dragon type, 145 Sp. Atk, 145 Spe & Lightning Rod." },
      { name: "Sceptilite", rate: "18.0%", desc: "Standard Mega Stone." },
      { name: "Focus Sash", rate: "6.0%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Leaf Storm", type: "Grass", category: "Special", power: 130, accuracy: 90, rate: "96.4%", desc: "Devastating 130 BP Grass nuke; drops Sp. Atk by 2." },
      { name: "Dragon Pulse", type: "Dragon", category: "Special", power: 85, accuracy: 100, rate: "94.0%", desc: "Mega STAB Dragon damage." },
      { name: "Focus Blast", type: "Fighting", category: "Special", power: 120, accuracy: 70, rate: "78.0%", desc: "Fighting coverage for Steel and Ice types." },
      { name: "Giga Drain", type: "Grass", category: "Special", power: 75, accuracy: 100, rate: "68.5%", desc: "Sustain Grass attack recovering 50% HP." }
    ],
    natures: [
      { name: "Timid", rate: "88.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Blazing 145 Mega Speed tier)" },
      { name: "Modest", rate: "12.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "96.0%", desc: "Pure Special Mega Sweeper" }
    ]
  },

  "scolipede": {
    dexNumber: 545, generation: "Gen 5", role: "Speed Boost Megahorn Sweeper / Baton Pass Cleaner",
    baseStats: { hp: 60, atk: 100, def: 89, spa: 55, spd: 69, spe: 112, total: 485 },
    abilities: [
      { name: "Speed Boost", rate: "98.5%", desc: "Raises Speed by 1 stage at the end of each turn automatically!" }
    ],
    items: [
      { name: "Focus Sash", rate: "54.0%", desc: "Guarantees Swords Dance setup." },
      { name: "Life Orb", rate: "32.0%", desc: "Damage amplification." },
      { name: "Black Sludge", rate: "14.0%", desc: "Recovery." }
    ],
    moves: [
      { name: "Megahorn", type: "Bug", category: "Physical", power: 120, accuracy: 85, rate: "94.0%", desc: "Devastating 120 BP Bug STAB." },
      { name: "Poison Jab", type: "Poison", category: "Physical", power: 80, accuracy: 100, rate: "92.0%", desc: "Poison STAB with 30% poison rate." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "84.5%", desc: "Ground coverage for Steel and Fire." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "76.0%", desc: "Sharply raises Attack by 2 stages." }
    ],
    natures: [
      { name: "Adamant", rate: "64.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Speed Boost covers speed)" },
      { name: "Jolly", rate: "36.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "94.0%", desc: "Fast Speed Boost Sweeper" }
    ]
  },

  "scovillain": {
    dexNumber: 952, generation: "Gen 9", role: "Chlorophyll Sun Sweeper / Spicy Extract Support",
    baseStats: { hp: 65, atk: 108, def: 65, spa: 108, spd: 65, spe: 75, total: 486 },
    abilities: [
      { name: "Chlorophyll", rate: "91.5%", desc: "Doubles Speed in harsh sunlight (pairs with Torkoal or Charizard Y)." },
      { name: "Moody", rate: "8.5%", desc: "Raises a random stat by 2 and drops another by 1 each turn." }
    ],
    items: [
      { name: "Life Orb", rate: "52.0%", desc: "Massive damage amplification." },
      { name: "Choice Specs", rate: "28.5%", desc: "Instant sun wallbreaker." },
      { name: "Focus Sash", rate: "19.5%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Flamethrower", type: "Fire", category: "Special", power: 90, accuracy: 100, rate: "96.4%", desc: "Sun-boosted Fire STAB." },
      { name: "Solar Beam", type: "Grass", category: "Special", power: 120, accuracy: 100, rate: "94.0%", desc: "1-turn 120 BP Grass STAB in sun." },
      { name: "Overheat", type: "Fire", category: "Special", power: 130, accuracy: 90, rate: "78.0%", desc: "Devastating burst damage." },
      { name: "Spicy Extract", type: "Grass", category: "Status", power: "-", accuracy: 100, rate: "54.0%", desc: "Raises target Atk by 2 and lowers target Def by 2 stages." }
    ],
    natures: [
      { name: "Modest", rate: "68.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Chlorophyll doubles speed)" },
      { name: "Timid", rate: "32.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "94.0%", desc: "Fast Sun Sweeper" }
    ]
  },

  "sinistcha": {
    dexNumber: 1013, generation: "Gen 9", role: "Hospitality Ally Healer / Matcha Gouta Burn Spreader",
    baseStats: { hp: 71, atk: 60, def: 106, spa: 121, spd: 80, spe: 70, total: 508 },
    abilities: [
      { name: "Hospitality", rate: "96.5%", desc: "Restores 25% of ally's maximum HP immediately upon switch-in in doubles!" },
      { name: "Heatproof", rate: "3.5%", desc: "Halves Fire damage taken." }
    ],
    items: [
      { name: "Sitrus Berry", rate: "48.0%", desc: "Burst healing." },
      { name: "Leftovers", rate: "32.0%", desc: "Sustain." },
      { name: "Rocky Helmet", rate: "20.0%", desc: "Punishes contact hits." }
    ],
    moves: [
      { name: "Matcha Gouta", type: "Grass", category: "Special", power: 90, accuracy: 100, rate: "99.0%", desc: "Signature spread Grass STAB; heals user by 50% damage dealt with 20% burn chance!" },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "92.0%", desc: "Ghost STAB; 20% Sp. Def drop." },
      { name: "Strength Sap", type: "Grass", category: "Status", power: "-", accuracy: 100, rate: "88.4%", desc: "Lowers target Attack by 1 stage and restores HP equal to their Attack!" },
      { name: "Trick Room", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "74.0%", desc: "Reverses speed order for 5 turns." }
    ],
    natures: [
      { name: "Bold", rate: "64.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" },
      { name: "Quiet", rate: "36.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpA", rate: "72.0%", desc: "Physically Defensive Support" }
    ]
  },

  "skarmory": {
    dexNumber: 227, generation: "Gen 2", role: "Sturdy Hazard Lead / Iron Defense Body Press Wall",
    baseStats: { hp: 65, atk: 80, def: 140, spa: 40, spd: 70, spe: 70, total: 465 },
    abilities: [
      { name: "Sturdy", rate: "98.5%", desc: "Survives any lethal attack with 1 HP when at full health." }
    ],
    items: [
      { name: "Rocky Helmet", rate: "54.0%", desc: "Punishes contact moves by 1/6 max HP." },
      { name: "Leftovers", rate: "32.0%", desc: "Consistent recovery." },
      { name: "Custap Berry", rate: "14.0%", desc: "Priority move when under 25% HP." }
    ],
    moves: [
      { name: "Body Press", type: "Fighting", category: "Physical", power: 80, accuracy: 100, rate: "96.4%", desc: "Uses massive 140 base Defense for huge Fighting damage." },
      { name: "Iron Defense", type: "Steel", category: "Status", power: "-", accuracy: "-", rate: "92.0%", desc: "Sharply raises Defense by 2 stages (+100%, doubling Body Press!)." },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "88.0%", desc: "Entry hazard damage." },
      { name: "Roost", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "82.5%", desc: "Restores 50% max HP." }
    ],
    natures: [
      { name: "Impish", rate: "86.0%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk" },
      { name: "Bold", rate: "14.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "88.0%", desc: "Max Physical Defense Body Press" }
    ]
  },

  "skeledirge": {
    dexNumber: 911, generation: "Gen 9", role: "Unaware Torch Song Snowballing Wall / Slack Off Tank",
    baseStats: { hp: 104, atk: 75, def: 100, spa: 110, spd: 75, spe: 66, total: 530 },
    abilities: [
      { name: "Unaware", rate: "99.2%", desc: "Ignores all opponent offensive stat boosts (Swords Dance, Calm Mind, Nasty Plot are useless against it!)." }
    ],
    items: [
      { name: "Leftovers", rate: "58.0%", desc: "Consistent recovery while boosting with Torch Song." },
      { name: "Throat Spray", rate: "26.5%", desc: "Instantly gives +1 additional Sp. Atk on first Torch Song." },
      { name: "Sitrus Berry", rate: "15.5%", desc: "Emergency recovery." }
    ],
    moves: [
      { name: "Torch Song", type: "Fire", category: "Special", power: 80, accuracy: 100, rate: "99.8%", desc: "Signature sound Fire STAB; ALWAYS raises user Sp. Atk by 1 stage upon hitting!" },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "94.0%", desc: "Ghost STAB; 20% Sp. Def drop." },
      { name: "Slack Off", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "92.0%", desc: "Restores 50% max HP." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "76.4%", desc: "Burns target to halve their physical Attack." }
    ],
    natures: [
      { name: "Bold", rate: "68.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" },
      { name: "Modest", rate: "32.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpA", rate: "64.0%", desc: "Physically Defensive Unaware Wall" },
      { spread: "252 HP / 140 Def / 116 SpA", rate: "36.0%", desc: "Bulky Offensive Torch Song" }
    ]
  },

  "slowbro": {
    dexNumber: 80, generation: "Gen 1", role: "Mega Shell Armor Iron Defense Body Press Tank / Regenerator Pivot",
    baseStats: { hp: 95, atk: 75, def: 110, spa: 100, spd: 80, spe: 30, total: 490 },
    abilities: [
      { name: "Regenerator", rate: "68.0%", desc: "Heals 1/3 max HP upon switching out." },
      { name: "Shell Armor", rate: "32.0%", desc: "Mega Ability makes Slowbro completely immune to critical hits!" }
    ],
    items: [
      { name: "Slowbronite Z", rate: "64.0%", desc: "Mega Stone granting 180 base Defense with Shell Armor crit immunity." },
      { name: "Slowbronite", rate: "18.0%", desc: "Standard Mega Stone." },
      { name: "Leftovers", rate: "12.0%", desc: "Sustain." },
      { name: "Rocky Helmet", rate: "6.0%", desc: "Contact damage." }
    ],
    moves: [
      { name: "Body Press", type: "Fighting", category: "Physical", power: 80, accuracy: 100, rate: "96.4%", desc: "Unleashes colossal damage using Slowbro's 180 Mega Defense!" },
      { name: "Iron Defense", type: "Steel", category: "Status", power: "-", accuracy: "-", rate: "92.0%", desc: "Sharply raises Defense by 2 stages (+100%)." },
      { name: "Slack Off", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "88.5%", desc: "Restores 50% max HP." },
      { name: "Scald", type: "Water", category: "Special", power: 80, accuracy: 100, rate: "84.0%", desc: "Water STAB with 30% burn chance." }
    ],
    natures: [
      { name: "Bold", rate: "88.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Colossal Defense scaling)" },
      { name: "Relaxed", rate: "12.0%", boost: "+Def", drop: "-Spe", desc: "+Defense, -Speed (Trick Room)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "86.0%", desc: "Max Defense Body Press Sweeper" }
    ]
  },

  "slowking-galar": {
    dexNumber: 199, generation: "Gen 8", role: "Regenerator Chilly Reception Snow Pivot / Assault Vest Sponge",
    baseStats: { hp: 95, atk: 65, def: 80, spa: 110, spd: 110, spe: 30, total: 490 },
    abilities: [
      { name: "Regenerator", rate: "94.5%", desc: "Restores 1/3 of maximum HP every time it switches out!" },
      { name: "Curious Medicine", rate: "5.5%", desc: "Resets all ally stat modifications upon entering battle." }
    ],
    items: [
      { name: "Assault Vest", rate: "64.0%", desc: "Boosts Sp. Def by 50% creating an impenetrable special sponge." },
      { name: "Black Sludge", rate: "24.5%", desc: "Consistent recovery." },
      { name: "Heavy-Duty Boots", rate: "11.5%", desc: "Hazard immunity." }
    ],
    moves: [
      { name: "Sludge Bomb", type: "Poison", category: "Special", power: 90, accuracy: 100, rate: "94.0%", desc: "Poison STAB with 30% poison rate." },
      { name: "Psychic", type: "Psychic", category: "Special", power: 90, accuracy: 100, rate: "88.0%", desc: "Psychic STAB; 10% Sp. Def drop." },
      { name: "Flamethrower", type: "Fire", category: "Special", power: 90, accuracy: 100, rate: "82.5%", desc: "Fire coverage vs Steel types." },
      { name: "Chilly Reception", type: "Ice", category: "Status", power: "-", accuracy: "-", rate: "76.0%", desc: "Summons Snow and pivots out, activating Regenerator!" }
    ],
    natures: [
      { name: "Calm", rate: "58.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" },
      { name: "Modest", rate: "42.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 4 Def / 252 SpD", rate: "68.0%", desc: "Specially Defensive Wall" },
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "32.0%", desc: "Bulky Special Attacker" }
    ]
  },

  "slurpuff": {
    dexNumber: 685, generation: "Gen 6", role: "Unburden Belly Drum Sweeper / Sitrus Berry Cleaner",
    baseStats: { hp: 82, atk: 80, def: 86, spa: 85, spd: 75, spe: 72, total: 480 },
    abilities: [
      { name: "Unburden", rate: "98.5%", desc: "Doubles Speed when held item is consumed (triggers after Belly Drum Sitrus Berry!)." }
    ],
    items: [
      { name: "Sitrus Berry", rate: "98.0%", desc: "Restores 25% max HP after Belly Drum, immediately triggering Unburden!" }
    ],
    moves: [
      { name: "Belly Drum", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "99.8%", desc: "Cuts HP by 50% to maximize Attack to +6 (400% damage!)." },
      { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "98.5%", desc: "+6 Attack Fairy STAB decimating targets." },
      { name: "Drain Punch", type: "Fighting", category: "Physical", power: 75, accuracy: 100, rate: "94.0%", desc: "+6 Fighting coverage recovering lost HP." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "72.0%", desc: "Evades damage for 1 turn." }
    ],
    natures: [
      { name: "Adamant", rate: "74.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Jolly", rate: "26.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "88.0%", desc: "Max Speed Unburden Sweeper" }
    ]
  },

  "staraptor": {
    dexNumber: 398, generation: "Gen 4", role: "Reckless Brave Bird Wallbreaker / Double-Edge Nuke",
    baseStats: { hp: 85, atk: 120, def: 70, spa: 50, spd: 60, spe: 100, total: 485 },
    abilities: [
      { name: "Reckless", rate: "78.4%", desc: "Powers up recoil moves by 20% (Brave Bird & Double-Edge deal 144 BP!)." },
      { name: "Intimidate", rate: "21.6%", desc: "Lowers opposing Pokémon Attack by 1 stage." }
    ],
    items: [
      { name: "Choice Band", rate: "54.0%", desc: "Colossal Reckless recoil wallbreaking power." },
      { name: "Choice Scarf", rate: "32.0%", desc: "Outspeeds faster threats." },
      { name: "Life Orb", rate: "14.0%", desc: "Damage amplification." }
    ],
    moves: [
      { name: "Brave Bird", type: "Flying", category: "Physical", power: 120, accuracy: 100, rate: "99.5%", desc: "Reckless 1.2x boosted to 144 BP Flying STAB." },
      { name: "Double-Edge", type: "Normal", category: "Physical", power: 120, accuracy: 100, rate: "94.0%", desc: "Reckless 1.2x boosted to 144 BP Normal STAB." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "92.0%", desc: "Fighting coverage smashing Rock and Steel types." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "84.0%", desc: "Pivots out while doing damage." }
    ],
    natures: [
      { name: "Jolly", rate: "76.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Base 100 Speed tier)" },
      { name: "Adamant", rate: "24.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "96.0%", desc: "Pure Physical Reckless Sweeper" }
    ]
  },

  "starmie": {
    dexNumber: 121, generation: "Gen 1", role: "Analytic / Natural Cure Special Sweeper / Rapid Spin Cleaner",
    baseStats: { hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115, total: 520 },
    abilities: [
      { name: "Analytic", rate: "64.0%", desc: "Boosts move power by 30% if moving after the target." },
      { name: "Natural Cure", rate: "36.0%", desc: "Heals status upon switching out." }
    ],
    items: [
      { name: "Life Orb", rate: "52.0%", desc: "Damage amplification across all coverage." },
      { name: "Choice Specs", rate: "28.5%", desc: "Special burst damage." },
      { name: "Focus Sash", rate: "19.5%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Hydro Pump", type: "Water", category: "Special", power: 110, accuracy: 80, rate: "94.0%", desc: "Heavy Water STAB burst." },
      { name: "Psychic", type: "Psychic", category: "Special", power: 90, accuracy: 100, rate: "92.0%", desc: "Psychic STAB; 10% Sp. Def drop." },
      { name: "Ice Beam", type: "Ice", category: "Special", power: 90, accuracy: 100, rate: "88.0%", desc: "Ice coverage vs Grass and Dragons." },
      { name: "Thunderbolt", type: "Electric", category: "Special", power: 90, accuracy: 100, rate: "78.4%", desc: "Electric coverage vs Water types." }
    ],
    natures: [
      { name: "Timid", rate: "92.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Blazing 115 Speed tier)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "94.0%", desc: "Fast Special Sweeper" }
    ]
  },

  "sylveon": {
    dexNumber: 700, generation: "Gen 6", role: "Pixilate Hyper Voice Spread Sweeper / Throat Spray Wallbreaker",
    baseStats: { hp: 95, atk: 65, def: 65, spa: 110, spd: 130, spe: 60, total: 525 },
    abilities: [
      { name: "Pixilate", rate: "98.5%", desc: "Converts Normal moves to Fairy and boosts their power by 20% (Hyper Voice becomes 108 BP spread Fairy STAB!)." }
    ],
    items: [
      { name: "Choice Specs", rate: "48.0%", desc: "Devastating Pixilate Hyper Voice spread damage." },
      { name: "Throat Spray", rate: "32.0%", desc: "+1 Sp. Atk immediately upon using Hyper Voice sound move." },
      { name: "Leftovers", rate: "14.0%", desc: "Bulky recovery." },
      { name: "Sitrus Berry", rate: "6.0%", desc: "Burst healing." }
    ],
    moves: [
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "99.8%", desc: "Pixilate boosted into Fairy-type spread attack hitting both foes through substitute!" },
      { name: "Moonblast", type: "Fairy", category: "Special", power: 95, accuracy: 100, rate: "88.0%", desc: "Single-target Fairy STAB; 30% Sp. Def drop." },
      { name: "Quick Attack", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "76.4%", desc: "+1 Priority Pixilate Fairy finisher." },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "72.0%", desc: "Ghost coverage for opposing Steel and Poison types." }
    ],
    natures: [
      { name: "Modest", rate: "76.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Colossal Pixilate spread power)" },
      { name: "Quiet", rate: "24.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "64.0%", desc: "Bulky Pixilate Sweeper" },
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "36.0%", desc: "Offensive Specs Sweeper" }
    ]
  },

  "tinkaton": {
    dexNumber: 958, generation: "Gen 9", role: "Mold Breaker Gigaton Hammer Wallbreaker / Thunder Wave Disrupter",
    baseStats: { hp: 85, atk: 75, def: 77, spa: 70, spd: 105, spe: 94, total: 506 },
    abilities: [
      { name: "Mold Breaker", rate: "96.4%", desc: "Moves ignore target abilities (hits through Sturdy, Disguise, Unaware!)." },
      { name: "Own Tempo", rate: "3.6%", desc: "Immunity to confusion and Intimidate." }
    ],
    items: [
      { name: "Leftovers", rate: "44.0%", desc: "Consistent recovery." },
      { name: "Assault Vest", rate: "28.5%", desc: "Enormous special tank bulk." },
      { name: "Rocky Helmet", rate: "16.5%", desc: "Punishes contact moves." },
      { name: "Sitrus Berry", rate: "11.0%", desc: "Emergency healing." }
    ],
    moves: [
      { name: "Gigaton Hammer", type: "Steel", category: "Physical", power: 160, accuracy: 100, rate: "99.8%", desc: "Signature 160 BP Steel physical nuke; cannot be used twice in a row." },
      { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "94.0%", desc: "Fairy STAB; 10% target Attack drop." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "92.0%", desc: "Removes target held item and deals 1.5x damage." },
      { name: "Thunder Wave", type: "Electric", category: "Status", power: "-", accuracy: 90, rate: "78.4%", desc: "Paralyzes target, cutting their Speed by 50%." }
    ],
    natures: [
      { name: "Jolly", rate: "62.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Base 94 Speed tier)" },
      { name: "Careful", rate: "38.0%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "252 HP / 4 Atk / 252 Spe", rate: "54.0%", desc: "Fast Bulky Utility" },
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "46.0%", desc: "Offensive Gigaton Sweeper" }
    ]
  },

  "toucannon": {
    dexNumber: 733, generation: "Gen 7", role: "Skill Link Bullet Seed Sweeper / Beak Blast Burn Punisher",
    baseStats: { hp: 80, atk: 120, def: 75, spa: 75, spd: 75, spe: 60, total: 485 },
    abilities: [
      { name: "Skill Link", rate: "88.5%", desc: "Multi-hit moves always hit the maximum 5 times (Bullet Seed & Rock Blast deal 125 guaranteed BP!)." },
      { name: "Sheer Force", rate: "11.5%", desc: "Boosts moves with secondary effects." }
    ],
    items: [
      { name: "Choice Band", rate: "48.0%", desc: "Massive physical wallbreaking power." },
      { name: "Life Orb", rate: "32.0%", desc: "Flexible damage boost." },
      { name: "Assault Vest", rate: "12.0%", desc: "Special bulk." },
      { name: "Sitrus Berry", rate: "8.0%", desc: "Recovery." }
    ],
    moves: [
      { name: "Bullet Seed", type: "Grass", category: "Physical", power: 25, accuracy: 100, rate: "98.0%", desc: "Skill Link guaranteed 5 hits (125 BP total) destroying Water, Ground, Rock." },
      { name: "Rock Blast", type: "Rock", category: "Physical", power: 25, accuracy: 90, rate: "94.0%", desc: "Skill Link guaranteed 5 hits (125 BP total) Rock coverage." },
      { name: "Brave Bird", type: "Flying", category: "Physical", power: 120, accuracy: 100, rate: "92.0%", desc: "120 BP Flying STAB with recoil." },
      { name: "Beak Blast", type: "Flying", category: "Physical", power: 100, accuracy: 100, rate: "76.4%", desc: "Heats beak at turn start; 100% burns any foe making physical contact that turn!" }
    ],
    natures: [
      { name: "Adamant", rate: "78.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Brave", rate: "22.0%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed (Trick Room)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "68.0%", desc: "Bulky Physical Attacker" },
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "32.0%", desc: "Fast Physical Attacker" }
    ]
  },

  "toxapex": {
    dexNumber: 747, generation: "Gen 7", role: "Regenerator Toxic Stall Wall / Baneful Bunker Tank",
    baseStats: { hp: 50, atk: 63, def: 152, spa: 53, spd: 142, spe: 35, total: 495 },
    abilities: [
      { name: "Regenerator", rate: "99.2%", desc: "Restores 1/3 of max HP automatically upon switching out!" }
    ],
    items: [
      { name: "Black Sludge", rate: "68.0%", desc: "Passive HP restoration each turn for Poison types." },
      { name: "Rocky Helmet", rate: "24.5%", desc: "Punishes physical contact attackers." },
      { name: "Covert Cloak", rate: "7.5%", desc: "Prevents Fake Out flinching." }
    ],
    moves: [
      { name: "Recover", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "99.8%", desc: "Reliably restores 50% max HP." },
      { name: "Toxic", type: "Poison", category: "Status", power: "-", accuracy: 90, rate: "92.0%", desc: "Badly poisons target, dealing compounding damage each turn." },
      { name: "Baneful Bunker", type: "Poison", category: "Status", power: "-", accuracy: "-", rate: "88.5%", desc: "Protects user and poisons any attacker making physical contact." },
      { name: "Haze", type: "Ice", category: "Status", power: "-", accuracy: "-", rate: "78.0%", desc: "Resets all stat modifications across the battlefield." }
    ],
    natures: [
      { name: "Bold", rate: "62.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" },
      { name: "Calm", rate: "38.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "64.0%", desc: "Max Physical Defense Wall" },
      { spread: "252 HP / 4 Def / 252 SpD", rate: "36.0%", desc: "Specially Defensive Sponge" }
    ]
  },

  "toxtricity-amped": {
    dexNumber: 849, generation: "Gen 8", role: "Punk Rock Overdrive Sound Sweeper / Boomburst Nuke",
    baseStats: { hp: 75, atk: 98, def: 70, spa: 114, spd: 70, spe: 75, total: 502 },
    abilities: [
      { name: "Punk Rock", rate: "99.5%", desc: "Boosts sound moves by 30% and halves incoming sound damage taken!" }
    ],
    items: [
      { name: "Throat Spray", rate: "54.0%", desc: "Raises Sp. Atk by 1 stage immediately after using Overdrive or Boomburst!" },
      { name: "Choice Specs", rate: "32.0%", desc: "Colossal Punk Rock boosted special damage." },
      { name: "Life Orb", rate: "14.0%", desc: "Flexible damage amplification." }
    ],
    moves: [
      { name: "Overdrive", type: "Electric", category: "Special", power: 80, accuracy: 100, rate: "99.8%", desc: "Punk Rock boosted sound Electric STAB (104 BP) hitting both opponents." },
      { name: "Boomburst", type: "Normal", category: "Special", power: 140, accuracy: 100, rate: "96.4%", desc: "Devastating 140 BP Punk Rock boosted sound nuke (182 BP total!)." },
      { name: "Sludge Bomb", type: "Poison", category: "Special", power: 90, accuracy: 100, rate: "92.0%", desc: "Poison STAB with 30% poison rate." },
      { name: "Volt Switch", type: "Electric", category: "Special", power: 70, accuracy: 100, rate: "78.0%", desc: "Electric STAB pivoting out." }
    ],
    natures: [
      { name: "Modest", rate: "68.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Timid", rate: "32.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "94.0%", desc: "Fast Punk Rock Sound Sweeper" }
    ]
  },

  "tsareena": {
    dexNumber: 763, generation: "Gen 7", role: "Queenly Majesty Priority Blocker / Trop Kick Attacker",
    baseStats: { hp: 72, atk: 120, def: 98, spa: 50, spd: 98, spe: 72, total: 510 },
    abilities: [
      { name: "Queenly Majesty", rate: "99.5%", desc: "Prevents opponents from using priority moves against Tsareena and its allies (blocks Fake Out, Grassy Glide, Sucker Punch!)." }
    ],
    items: [
      { name: "Assault Vest", rate: "52.0%", desc: "Boosts Sp. Def by 50% for high mixed bulk." },
      { name: "Choice Band", rate: "26.5%", desc: "Heavy physical wallbreaking power." },
      { name: "Life Orb", rate: "14.5%", desc: "Flexible damage boost." },
      { name: "Sitrus Berry", rate: "7.0%", desc: "Recovery." }
    ],
    moves: [
      { name: "Trop Kick", type: "Grass", category: "Physical", power: 70, accuracy: 100, rate: "99.0%", desc: "Signature Grass STAB; ALWAYS lowers target Attack by 1 stage (-50%)!" },
      { name: "High Jump Kick", type: "Fighting", category: "Physical", power: 130, accuracy: 90, rate: "92.4%", desc: "Heavy Fighting coverage for Steel and Ice." },
      { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "84.0%", desc: "Fairy coverage targeting Dragon and Dark." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "78.0%", desc: "Pivots out while doing damage." }
    ],
    natures: [
      { name: "Adamant", rate: "74.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Jolly", rate: "26.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "68.0%", desc: "Bulky Physical Priority Blocker" },
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "32.0%", desc: "Fast Physical Attacker" }
    ]
  },

  "typhlosion-hisui": {
    dexNumber: 157, generation: "Gen 8", role: "Frisk / Blaze Eruption Sweeper / Infernal Parade Nuke",
    baseStats: { hp: 73, atk: 84, def: 78, spa: 119, spd: 85, spe: 95, total: 534 },
    abilities: [
      { name: "Frisk", rate: "78.4%", desc: "Identifies opponent held items upon entering battle." },
      { name: "Blaze", rate: "21.6%", desc: "Boosts Fire moves at low HP." }
    ],
    items: [
      { name: "Choice Specs", rate: "54.0%", desc: "Absurd max HP full-field Eruption devastation." },
      { name: "Choice Scarf", rate: "36.0%", desc: "Guarantees moving first to fire full-power 150 BP Eruptions." },
      { name: "Focus Sash", rate: "10.0%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Eruption", type: "Fire", category: "Special", power: 150, accuracy: 100, rate: "99.5%", desc: "Devastating 150 BP Fire spread STAB scaling with user current HP." },
      { name: "Infernal Parade", type: "Ghost", category: "Special", power: 60, accuracy: 100, rate: "96.4%", desc: "Ghost STAB; doubles to 120 BP if target has status with 30% burn chance." },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "88.0%", desc: "Standard Ghost STAB; 20% Sp. Def drop." },
      { name: "Focus Blast", type: "Fighting", category: "Special", power: 120, accuracy: 70, rate: "74.0%", desc: "Fighting coverage for Dark and Rock." }
    ],
    natures: [
      { name: "Timid", rate: "84.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Crucial for full-HP Eruptions)" },
      { name: "Modest", rate: "16.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "96.0%", desc: "Fast Eruption Sweeper" }
    ]
  },

  "umbreon": {
    dexNumber: 197, generation: "Gen 2", role: "Synchronize Foul Play Tank / Wish Protect Wall",
    baseStats: { hp: 95, atk: 65, def: 110, spa: 60, spd: 130, spe: 65, total: 525 },
    abilities: [
      { name: "Synchronize", rate: "88.5%", desc: "Passes burn, poison, or paralysis directly back onto the inflicter." },
      { name: "Inner Focus", rate: "11.5%", desc: "Immunity to Fake Out flinching and Intimidate." }
    ],
    items: [
      { name: "Leftovers", rate: "84.0%", desc: "Passive recovery behind colossal defenses." },
      { name: "Rocky Helmet", rate: "16.0%", desc: "Punishes contact moves." }
    ],
    moves: [
      { name: "Foul Play", type: "Dark", category: "Physical", power: 95, accuracy: 100, rate: "99.2%", desc: "Dark STAB that uses the TARGET's Attack stat to calculate damage!" },
      { name: "Wish", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "94.0%", desc: "Heals 50% max HP on the following turn for user or switch-in ally." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "92.5%", desc: "Guarantees receiving Wish healing safely." },
      { name: "Moonlight", type: "Fairy", category: "Status", power: "-", accuracy: "-", rate: "76.0%", desc: "Restores 50% max HP." }
    ],
    natures: [
      { name: "Calm", rate: "64.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" },
      { name: "Bold", rate: "36.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 4 Def / 252 SpD", rate: "68.0%", desc: "Specially Defensive Wall" },
      { spread: "252 HP / 252 Def / 4 SpD", rate: "32.0%", desc: "Physically Defensive Tank" }
    ]
  },

  "vanilluxe": {
    dexNumber: 584, generation: "Gen 5", role: "Snow Warning Blizzard Sweeper / Aurora Veil Setter",
    baseStats: { hp: 71, atk: 95, def: 85, spa: 110, spd: 95, spe: 79, total: 535 },
    abilities: [
      { name: "Snow Warning", rate: "99.5%", desc: "Sets Snow automatically on entry, boosting Ice Defense by 50%." }
    ],
    items: [
      { name: "Light Clay", rate: "48.0%", desc: "Extends Aurora Veil to 8 turns." },
      { name: "Choice Specs", rate: "32.0%", desc: "Devastating 110 Sp. Atk Blizzard spread damage." },
      { name: "Never-Melt Ice", rate: "12.0%", desc: "Boosts Ice moves." },
      { name: "Focus Sash", rate: "8.0%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Blizzard", type: "Ice", category: "Special", power: 110, accuracy: 70, rate: "99.5%", desc: "Never misses in Snow; 110 BP spread attack hitting both foes with 10% freeze." },
      { name: "Aurora Veil", type: "Ice", category: "Status", power: "-", accuracy: "-", rate: "94.0%", desc: "Halves incoming physical and special damage for 8 turns under Snow." },
      { name: "Freeze-Dry", type: "Ice", category: "Special", power: 70, accuracy: 100, rate: "92.0%", desc: "Deals super-effective 2x damage against Water types." },
      { name: "Flash Cannon", type: "Steel", category: "Special", power: 80, accuracy: 100, rate: "68.0%", desc: "Steel coverage for opposing Ice and Rock." }
    ],
    natures: [
      { name: "Modest", rate: "64.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Timid", rate: "36.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "84.0%", desc: "Fast Special Blizzard Sweeper" }
    ]
  },

  "victreebel": {
    dexNumber: 71, generation: "Gen 1", role: "Chlorophyll Sun Sweeper / Growth Wallbreaker",
    baseStats: { hp: 80, atk: 105, def: 65, spa: 100, spd: 70, spe: 70, total: 490 },
    abilities: [
      { name: "Chlorophyll", rate: "98.0%", desc: "Doubles Speed in harsh sunlight, outspeeding the entire unboosted meta!" }
    ],
    items: [
      { name: "Life Orb", rate: "64.0%", desc: "Amplifies Chlorophyll sweep damage." },
      { name: "Focus Sash", rate: "24.0%", desc: "Guarantees Growth setup." },
      { name: "Choice Specs", rate: "12.0%", desc: "Special burst damage." }
    ],
    moves: [
      { name: "Solar Beam", type: "Grass", category: "Special", power: 120, accuracy: 100, rate: "96.0%", desc: "1-turn 120 BP Grass STAB in sun." },
      { name: "Sludge Bomb", type: "Poison", category: "Special", power: 90, accuracy: 100, rate: "94.0%", desc: "Poison STAB with 30% poison rate." },
      { name: "Weather Ball", type: "Normal", category: "Special", power: 50, accuracy: 100, rate: "92.5%", desc: "Becomes 100 BP Fire move boosted 1.5x by sun (150 total BP!)." },
      { name: "Growth", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "78.0%", desc: "Sharply raises Attack and Sp. Atk by 2 stages (+100%) in harsh sunlight!" }
    ],
    natures: [
      { name: "Modest", rate: "74.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Timid", rate: "26.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "94.0%", desc: "Fast Sun Chlorophyll Sweeper" }
    ]
  },

  "vivillon": {
    dexNumber: 666, generation: "Gen 6", role: "Compound Eyes Sleep Powder / Quiver Dance Sweeper",
    baseStats: { hp: 80, atk: 52, def: 50, spa: 90, spd: 50, spe: 89, total: 411 },
    abilities: [
      { name: "Compound Eyes", rate: "99.8%", desc: "Boosts accuracy by 30% (Sleep Powder hits at 97.5% and Hurricane at 91%!)." }
    ],
    items: [
      { name: "Focus Sash", rate: "88.0%", desc: "Guarantees surviving to put opponent to sleep with Sleep Powder." },
      { name: "Life Orb", rate: "12.0%", desc: "Damage amplification." }
    ],
    moves: [
      { name: "Sleep Powder", type: "Grass", category: "Status", power: "-", accuracy: 75, rate: "99.8%", desc: "Near-guaranteed 97.5% accuracy sleep infliction under Compound Eyes." },
      { name: "Hurricane", type: "Flying", category: "Special", power: 110, accuracy: 70, rate: "96.4%", desc: "110 BP Flying STAB boosted to 91% accuracy; 30% confusion chance." },
      { name: "Quiver Dance", type: "Bug", category: "Status", power: "-", accuracy: "-", rate: "94.0%", desc: "Raises user Sp. Atk, Sp. Def, and Speed by 1 stage." },
      { name: "Bug Buzz", type: "Bug", category: "Special", power: 90, accuracy: 100, rate: "84.0%", desc: "Bug STAB hitting through substitute; 10% Sp. Def drop." }
    ],
    natures: [
      { name: "Timid", rate: "94.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (High speed control)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "96.0%", desc: "Fast Quiver Dance Sleep Sweeper" }
    ]
  },

  "zoroark-hisui": {
    dexNumber: 571, generation: "Gen 8", role: "Illusion Nasty Plot Sweeper / Bitter Malice Cleaner",
    baseStats: { hp: 55, atk: 100, def: 60, spa: 125, spd: 60, spe: 110, total: 510 },
    abilities: [
      { name: "Illusion", rate: "100.0%", desc: "Enters battle disguised as the party's last Pokémon, deceiving the opponent completely!" }
    ],
    items: [
      { name: "Focus Sash", rate: "58.0%", desc: "Guarantees free Nasty Plot setup turn behind Illusion." },
      { name: "Life Orb", rate: "26.5%", desc: "Damage amplification." },
      { name: "Choice Specs", rate: "15.5%", desc: "Special burst damage." }
    ],
    moves: [
      { name: "Bitter Malice", type: "Ghost", category: "Special", power: 75, accuracy: 100, rate: "98.5%", desc: "Ghost STAB; 100% chance to lower target's Attack by 1 stage (-50%)." },
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "94.0%", desc: "Normal STAB hitting through substitute." },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "88.0%", desc: "Ghost STAB; 20% Sp. Def drop." },
      { name: "Nasty Plot", type: "Dark", category: "Status", power: "-", accuracy: "-", rate: "84.0%", desc: "Sharply raises Sp. Atk by 2 stages (+100%)." }
    ],
    natures: [
      { name: "Timid", rate: "92.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Blazing 110 Speed tier)" },
      { name: "Modest", rate: "8.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "96.0%", desc: "Fast Illusion Special Sweeper" }
    ]
  }
};

const existing = JSON.parse(fs.readFileSync('src/pokemon_builds.json', 'utf8'));
const merged = { ...existing, ...BATCH_2 };
fs.writeFileSync('src/pokemon_builds.json', JSON.stringify(merged, null, 2), 'utf8');
console.log('BATCH 2 MERGED! Total entries now:', Object.keys(merged).length);
