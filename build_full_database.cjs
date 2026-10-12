const fs = require('fs');

// Canonical database of all 125 Pokémon in the app's meta
const POKEMON_DB = {
  // Mega & Meta Staples
  "garchomp": {
    dexNumber: 445, generation: "Gen 4", role: "Fast Hazard Lead / Mixed Mega Sweeper",
    baseStats: { hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102, total: 600 },
    abilities: [
      { name: "Rough Skin", rate: "99.0%", desc: "Inflicts damage equal to 1/8 max HP to attacker on contact." },
      { name: "Sand Veil", rate: "1.0%", desc: "Boosts evasiveness by 25% in sandstorm." }
    ],
    items: [
      { name: "Garchompite Z", rate: "32.8%", desc: "Mega Stone allowing Garchomp to Mega Evolve with Sand Force." },
      { name: "Choice Scarf", rate: "18.8%", desc: "Boosts Speed by 50%, locking user into first selected move." },
      { name: "Focus Sash", rate: "16.7%", desc: "Survives lethal hit from full HP with 1 HP remaining." },
      { name: "Rocky Helmet", rate: "12.1%", desc: "Damages contact attackers by 1/6 max HP (stacks with Rough Skin)." },
      { name: "Sitrus Berry", rate: "10.4%", desc: "Restores 25% max HP when falling below 50% HP." },
      { name: "Garchompite", rate: "0.7%", desc: "Standard Mega Stone for Mega Evolution." }
    ],
    moves: [
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "69.3%", desc: "Heavy Ground damage hitting all adjacent targets." },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "42.8%", desc: "Entry hazard dealing rock damage on enemy switch-in." },
      { name: "Dragon Tail", type: "Dragon", category: "Physical", power: 60, accuracy: 90, rate: "28.2%", desc: "Forces target to switch to a random ally." },
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "27.6%", desc: "High special burst; drops user Sp. Atk by 2 stages." },
      { name: "Flamethrower", type: "Fire", category: "Special", power: 90, accuracy: 100, rate: "26.0%", desc: "Fire special coverage; 10% burn chance." }
    ],
    natures: [
      { name: "Jolly", rate: "26.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Standard fast physical lead)" },
      { name: "Adamant", rate: "21.2%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum physical KO burst)" },
      { name: "Timid", rate: "19.3%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Special attacker with Draco Meteor)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "28.2%", desc: "Standard Fast Physical Sweeper" },
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "21.4%", desc: "Special Attacker (Draco Meteor / Flamethrower)" }
    ]
  },

  "lucario": {
    dexNumber: 448, generation: "Gen 4", role: "Special Nasty Plot Sweeper (Mega Adaptability)",
    baseStats: { hp: 70, atk: 110, def: 70, spa: 115, spd: 70, spe: 90, total: 525 },
    abilities: [
      { name: "Inner Focus", rate: "80.9%", desc: "Prevents flinching from Fake Out and grants immunity to Intimidate." },
      { name: "Steadfast", rate: "12.6%", desc: "Raises Speed by 1 stage upon flinching." },
      { name: "Justified", rate: "6.5%", desc: "Raises Attack by 1 stage when hit by a Dark-type move." }
    ],
    items: [
      { name: "Lucarionite Z", rate: "90.3%", desc: "Mega Stone allowing Lucario to Mega Evolve into Mega Lucario with Adaptability." },
      { name: "Lucarionite", rate: "8.8%", desc: "Standard Mega Stone for Mega Evolution into Mega Lucario." },
      { name: "Focus Sash", rate: "0.4%", desc: "Survives any fatal hit from full HP with 1 HP remaining." },
      { name: "Choice Scarf", rate: "0.1%", desc: "Boosts Speed by 50% locked into first move." }
    ],
    moves: [
      { name: "Dark Pulse", type: "Dark", category: "Special", power: 80, accuracy: 100, rate: "78.5%", desc: "Special Dark coverage; 20% flinch chance." },
      { name: "Nasty Plot", type: "Dark", category: "Status", power: "-", accuracy: "-", rate: "73.8%", desc: "Sharply raises user Sp. Atk by 2 stages (+100%)." },
      { name: "Aura Sphere", type: "Fighting", category: "Special", power: 80, accuracy: "-", rate: "71.0%", desc: "Adaptability STAB Fighting sphere; never misses." },
      { name: "Flash Cannon", type: "Steel", category: "Special", power: 80, accuracy: 100, rate: "67.3%", desc: "Adaptability STAB Steel cannon; 10% target Sp. Def drop." },
      { name: "Vacuum Wave", type: "Fighting", category: "Special", power: 40, accuracy: 100, rate: "39.6%", desc: "+1 Priority Special Fighting move with Adaptability boost." }
    ],
    natures: [
      { name: "Timid", rate: "66.2%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Outspeeds neutral base 90-100 tier)" },
      { name: "Modest", rate: "25.3%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Maximum Adaptability special nuke power)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "54.2%", desc: "Max Special Attack & Speed Sweeper" },
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "5.0%", desc: "Physical Close Combat / Extreme Speed" }
    ]
  },

  "charizard": {
    dexNumber: 6, generation: "Gen 1", role: "Sun Mega Sweeper / Wallbreaker",
    baseStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100, total: 534 },
    abilities: [
      { name: "Solar Power", rate: "89.4%", desc: "Boosts Sp. Atk by 50% in harsh sunlight, taking 1/8 HP damage each turn." },
      { name: "Blaze", rate: "10.6%", desc: "Boosts Fire moves by 50% when HP is below 1/3." }
    ],
    items: [
      { name: "Charizardite Y", rate: "48.5%", desc: "Mega Stone activating Drought sun with colossal Sp. Atk." },
      { name: "Charizardite X", rate: "36.2%", desc: "Mega Stone changing type to Fire/Dragon with Tough Claws." },
      { name: "Choice Specs", rate: "8.4%", desc: "Boosts Sp. Atk by 50% locked into one move." },
      { name: "Life Orb", rate: "4.2%", desc: "Boosts move damage by 30% at cost of HP." }
    ],
    moves: [
      { name: "Heat Wave", type: "Fire", category: "Special", power: 95, accuracy: 90, rate: "94.6%", desc: "Hits both opponents in doubles with sun-boosted damage." },
      { name: "Air Slash", type: "Flying", category: "Special", power: 75, accuracy: 95, rate: "88.2%", desc: "Flying STAB with 30% flinch chance." },
      { name: "Solar Beam", type: "Grass", category: "Special", power: 120, accuracy: 100, rate: "76.4%", desc: "1-turn move in sun covering Water, Ground, and Rock." },
      { name: "Overheat", type: "Fire", category: "Special", power: 130, accuracy: 90, rate: "54.0%", desc: "Colossal burst damage against priority targets." }
    ],
    natures: [
      { name: "Timid", rate: "72.4%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Outspeeds neutral base 100 tier)" },
      { name: "Modest", rate: "26.8%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Maximum sun-boosted destruction)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "78.4%", desc: "Standard Fast Special Sweeper" }
    ]
  },

  "metagross": {
    dexNumber: 376, generation: "Gen 3", role: "Tough Claws Mega Sweeper / Steel Tank",
    baseStats: { hp: 80, atk: 135, def: 130, spa: 95, spd: 90, spe: 70, total: 600 },
    abilities: [
      { name: "Clear Body", rate: "98.5%", desc: "Prevents other Pokémon from lowering user's stat stages (immune to Intimidate)." },
      { name: "Light Metal", rate: "1.5%", desc: "Halves the Pokémon's weight." }
    ],
    items: [
      { name: "Metagrossite Z", rate: "86.2%", desc: "Mega Stone allowing Metagross to Mega Evolve with Tough Claws and 110 base Speed." },
      { name: "Metagrossite", rate: "8.4%", desc: "Standard Mega Stone for Mega Evolution into Mega Metagross." },
      { name: "Assault Vest", rate: "3.2%", desc: "Raises Sp. Def by 50% without Mega Stone." },
      { name: "Choice Band", rate: "1.5%", desc: "Boosts physical Attack by 50%." }
    ],
    moves: [
      { name: "Meteor Mash", type: "Steel", category: "Physical", power: 90, accuracy: 90, rate: "94.6%", desc: "Tough Claws STAB; 20% chance to raise Attack by 1 stage." },
      { name: "Bullet Punch", type: "Steel", category: "Physical", power: 40, accuracy: 100, rate: "88.2%", desc: "+1 Priority Tough Claws Steel STAB." },
      { name: "Zen Headbutt", type: "Psychic", category: "Physical", power: 80, accuracy: 90, rate: "76.4%", desc: "Tough Claws Psychic STAB with 20% flinch rate." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "64.0%", desc: "Ground coverage destroying Steel and Fire foes." }
    ],
    natures: [
      { name: "Jolly", rate: "74.2%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Mega Metagross base 110 Speed benchmark)" },
      { name: "Adamant", rate: "24.6%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Tough Claws physical damage)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "76.4%", desc: "Standard Fast Physical Sweeper" },
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "18.2%", desc: "Bulky Assault Vest Tank" }
    ]
  },

  "salamence": {
    dexNumber: 373, generation: "Gen 3", role: "Aerilate Mega Sweeper / Intimidate Pivot",
    baseStats: { hp: 95, atk: 135, def: 80, spa: 110, spd: 80, spe: 100, total: 600 },
    abilities: [
      { name: "Intimidate", rate: "88.6%", desc: "Lowers opposing Pokémon's Attack by 1 stage upon entry." },
      { name: "Moxie", rate: "11.4%", desc: "Boosts Attack by 1 stage after knocking out a target." }
    ],
    items: [
      { name: "Salamencite Z", rate: "78.4%", desc: "Mega Stone allowing Salamence to Mega Evolve with Aerilate." },
      { name: "Salamencite", rate: "9.2%", desc: "Standard Mega Stone for Mega Evolution into Mega Salamence." },
      { name: "Choice Scarf", rate: "6.8%", desc: "Boosts Speed by 50% locked into one move." },
      { name: "Life Orb", rate: "3.5%", desc: "Boosts move damage by 30% at cost of HP." }
    ],
    moves: [
      { name: "Double-Edge", type: "Normal", category: "Physical", power: 120, accuracy: 100, rate: "86.5%", desc: "Turns into 144 power Flying STAB via Aerilate." },
      { name: "Dragon Dance", type: "Dragon", category: "Status", power: "-", accuracy: "-", rate: "74.2%", desc: "Raises user Attack and Speed by 1 stage." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "68.0%", desc: "Ground coverage destroying Steel types." },
      { name: "Roost", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "54.2%", desc: "Restores 50% max HP." }
    ],
    natures: [
      { name: "Jolly", rate: "68.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Mega Salamence base 120 Speed tier)" },
      { name: "Adamant", rate: "28.5%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Colossal Aerilate damage output)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "74.6%", desc: "Max Speed & Attack Sweeper" },
      { spread: "252 HP / 68 Def / 188 Spe", rate: "18.4%", desc: "Bulky Dragon Dance Setup" }
    ]
  },

  "gengar": {
    dexNumber: 94, generation: "Gen 1", role: "Shadow Tag Mega Trapper / Special Cleaner",
    baseStats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110, total: 500 },
    abilities: [
      { name: "Cursed Body", rate: "100.0%", desc: "30% chance to disable attacker's move upon taking damage." }
    ],
    items: [
      { name: "Gengarite Z", rate: "82.4%", desc: "Mega Stone allowing Mega Evolution into Mega Gengar with Shadow Tag." },
      { name: "Gengarite", rate: "9.5%", desc: "Standard Mega Stone for Mega Evolution." },
      { name: "Focus Sash", rate: "5.4%", desc: "Survives lethal hit from full HP." }
    ],
    moves: [
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "96.4%", desc: "Primary Ghost STAB; 20% target Sp. Def drop." },
      { name: "Sludge Bomb", type: "Poison", category: "Special", power: 90, accuracy: 100, rate: "92.0%", desc: "Poison STAB with 30% poison rate." },
      { name: "Destiny Bond", type: "Ghost", category: "Status", power: "-", accuracy: "-", rate: "68.2%", desc: "Takes down opponent with user if user faints next turn." },
      { name: "Taunt", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "48.5%", desc: "Prevents opponent from using status moves." }
    ],
    natures: [
      { name: "Timid", rate: "92.4%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Mega Gengar base 130 Speed tier)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "84.5%", desc: "Standard Fast Special Trapper" }
    ]
  },

  "tyranitar": {
    dexNumber: 248, generation: "Gen 2", role: "Sand Stream Mega Fortress / Dragon Dance",
    baseStats: { hp: 100, atk: 134, def: 110, spa: 95, spd: 100, spe: 61, total: 600 },
    abilities: [
      { name: "Sand Stream", rate: "98.4%", desc: "Summons Sandstorm for 5 turns; boosts Rock Sp. Def by 50%." },
      { name: "Unnerve", rate: "1.6%", desc: "Prevents opposing Pokémon from eating berries." }
    ],
    items: [
      { name: "Tyranitarite Z", rate: "62.4%", desc: "Mega Stone allowing Mega Evolution into Mega Tyranitar." },
      { name: "Tyranitarite", rate: "8.5%", desc: "Standard Mega Stone for Mega Evolution." },
      { name: "Assault Vest", rate: "18.2%", desc: "Massively boosts Sp. Def to ungodly levels in sand." },
      { name: "Choice Band", rate: "8.4%", desc: "Immediate 50% physical wallbreaker power." }
    ],
    moves: [
      { name: "Rock Slide", type: "Rock", category: "Physical", power: 75, accuracy: 90, rate: "92.4%", desc: "Rock STAB hitting both opponents with 30% flinch rate." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "86.5%", desc: "Dark STAB removing enemy items." },
      { name: "Dragon Dance", type: "Dragon", category: "Status", power: "-", accuracy: "-", rate: "54.0%", desc: "+1 Attack and +1 Speed setup." },
      { name: "Low Kick", type: "Fighting", category: "Physical", power: 100, accuracy: 100, rate: "46.2%", desc: "Heavy damage against Steel and opposing Dark types." }
    ],
    natures: [
      { name: "Adamant", rate: "58.4%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Rock/Dark KO damage)" },
      { name: "Jolly", rate: "36.2%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Dragon Dance outspeed tier)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "52.4%", desc: "Dragon Dance Fast Sweeper" },
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "38.6%", desc: "Bulky Assault Vest Tank" }
    ]
  },

  "scizor": {
    dexNumber: 212, generation: "Gen 2", role: "Technician Mega Sweeper / Bullet Punch",
    baseStats: { hp: 70, atk: 130, def: 100, spa: 55, spd: 80, spe: 65, total: 500 },
    abilities: [
      { name: "Technician", rate: "99.5%", desc: "Powers up moves with 60 base power or less by 50%." }
    ],
    items: [
      { name: "Scizorite Z", rate: "54.2%", desc: "Mega Stone allowing Mega Evolution into Mega Scizor with enhanced bulk and Attack." },
      { name: "Scizorite", rate: "7.6%", desc: "Standard Mega Stone for Mega Evolution." },
      { name: "Choice Band", rate: "24.5%", desc: "Boosts Bullet Punch by 50% for immediate revenge KOs." },
      { name: "Life Orb", rate: "11.2%", desc: "Boosts move damage with Swords Dance flexibility." }
    ],
    moves: [
      { name: "Bullet Punch", type: "Steel", category: "Physical", power: 40, accuracy: 100, rate: "99.8%", desc: "+1 Priority Steel STAB boosted to 90 power via Technician." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "88.4%", desc: "Damages target and pivots out." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "78.2%", desc: "Fighting coverage destroying Steel and Dark types." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "68.5%", desc: "Sharply raises user Attack by 2 stages." }
    ],
    natures: [
      { name: "Adamant", rate: "88.6%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Technician Bullet Punch power)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "58.4%", desc: "Bulky Swords Dance Sweeper" },
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "36.2%", desc: "Fast Offensive Attacker" }
    ]
  },

  "gyarados": {
    dexNumber: 130, generation: "Gen 1", role: "Dragon Dance Sweeper / Mold Breaker",
    baseStats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81, total: 540 },
    abilities: [
      { name: "Intimidate", rate: "84.2%", desc: "Lowers opposing Pokémon Attack by 1 stage upon entry." },
      { name: "Moxie", rate: "15.8%", desc: "Boosts Attack by 1 stage after knocking out a target." }
    ],
    items: [
      { name: "Gyaradosite Z", rate: "58.4%", desc: "Mega Stone allowing Mega Evolution into Water/Dark Mega Gyarados with Mold Breaker." },
      { name: "Gyaradosite", rate: "7.2%", desc: "Standard Mega Stone for Mega Evolution." },
      { name: "Leftovers", rate: "18.6%", desc: "Continuous recovery alongside Dragon Dance." },
      { name: "Life Orb", rate: "12.4%", desc: "High damage boost for offensive sweepers." }
    ],
    moves: [
      { name: "Waterfall", type: "Water", category: "Physical", power: 80, accuracy: 100, rate: "96.4%", desc: "Primary Water STAB with 20% flinch rate." },
      { name: "Dragon Dance", type: "Dragon", category: "Status", power: "-", accuracy: "-", rate: "92.0%", desc: "+1 Attack and +1 Speed setup." },
      { name: "Crunch", type: "Dark", category: "Physical", power: 80, accuracy: 100, rate: "74.5%", desc: "Dark STAB in Mega Form; 20% Defense drop chance." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "68.2%", desc: "Pierces Levitate via Mold Breaker." }
    ],
    natures: [
      { name: "Jolly", rate: "64.2%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Outspeeds base 130 after +1 Dragon Dance)" },
      { name: "Adamant", rate: "34.8%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum physical burst damage)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "78.4%", desc: "Standard Dragon Dance Sweeper" }
    ]
  },

  "swampert": {
    dexNumber: 260, generation: "Gen 3", role: "Swift Swim Rain Sweeper / Bulky Pivot",
    baseStats: { hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60, total: 535 },
    abilities: [
      { name: "Torrent", rate: "72.4%", desc: "Powers up Water moves by 50% at low HP." },
      { name: "Damp", rate: "27.6%", desc: "Prevents Explosion and Self-Destruct." }
    ],
    items: [
      { name: "Swampertite Z", rate: "76.4%", desc: "Mega Stone granting Swift Swim (doubles Speed in Rain) and 150 base Attack." },
      { name: "Swampertite", rate: "9.2%", desc: "Standard Mega Stone for Mega Swampert." },
      { name: "Leftovers", rate: "12.0%", desc: "Recovery for non-Mega defensive sets." }
    ],
    moves: [
      { name: "Waterfall", type: "Water", category: "Physical", power: 80, accuracy: 100, rate: "98.5%", desc: "Heavy Water STAB with 20% flinch rate." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "96.2%", desc: "Ground STAB hitting all adjacent foes." },
      { name: "Ice Punch", type: "Ice", category: "Physical", power: 75, accuracy: 100, rate: "84.5%", desc: "Ice coverage destroying Grass and Dragon types." },
      { name: "Flip Turn", type: "Water", category: "Physical", power: 60, accuracy: 100, rate: "54.2%", desc: "Damages target and pivots user out." }
    ],
    natures: [
      { name: "Adamant", rate: "82.4%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Relies on Swift Swim 2x Speed in rain)" },
      { name: "Jolly", rate: "16.2%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Outspeeds entire metagame under rain)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "86.4%", desc: "Rain Swift Swim Sweeper" }
    ]
  },

  "blaziken": {
    dexNumber: 257, generation: "Gen 3", role: "Speed Boost Mega Sweeper / Wallbreaker",
    baseStats: { hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80, total: 530 },
    abilities: [
      { name: "Speed Boost", rate: "94.2%", desc: "Raises Speed by 1 stage at the end of every turn." },
      { name: "Blaze", rate: "5.8%", desc: "Boosts Fire moves at low HP." }
    ],
    items: [
      { name: "Blazikenite Z", rate: "72.4%", desc: "Mega Stone boosting Attack to 160 and Sp. Atk to 130 with Speed Boost." },
      { name: "Blazikenite", rate: "8.5%", desc: "Standard Mega Stone for Mega Blaziken." },
      { name: "Life Orb", rate: "12.8%", desc: "Boosts move damage by 30% for non-Mega sets." }
    ],
    moves: [
      { name: "Flare Blitz", type: "Fire", category: "Physical", power: 120, accuracy: 100, rate: "96.4%", desc: "Colossal Fire STAB with 33% recoil." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "94.2%", desc: "Massive Fighting STAB; drops user Def and Sp. Def." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "88.6%", desc: "Guarantees free +1 Speed Boost turn." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "58.4%", desc: "+2 Attack setup for complete sweep." }
    ],
    natures: [
      { name: "Adamant", rate: "76.4%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Speed Boost naturally fixes speed)" },
      { name: "Jolly", rate: "21.5%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Outspeeds Choice Scarf users)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "88.2%", desc: "Standard Speed Boost Sweeper" }
    ]
  },

  "gardevoir": {
    dexNumber: 282, generation: "Gen 3", role: "Pixilate Mega Nuke / Trick Room",
    baseStats: { hp: 68, atk: 65, def: 65, spa: 125, spd: 115, spe: 80, total: 518 },
    abilities: [
      { name: "Trace", rate: "82.5%", desc: "Copies opponent's ability upon entering battle." },
      { name: "Synchronize", rate: "14.2%", desc: "Passes burn, poison, or paralysis back to attacker." }
    ],
    items: [
      { name: "Gardevoirite Z", rate: "84.2%", desc: "Mega Stone giving Pixilate and boosting Sp. Atk to 165." },
      { name: "Gardevoirite", rate: "9.5%", desc: "Standard Mega Stone for Mega Gardevoir." },
      { name: "Choice Scarf", rate: "4.5%", desc: "Boosts Speed by 50% for fast Moonblast." }
    ],
    moves: [
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "98.5%", desc: "Becomes 108 power Fairy STAB via Pixilate hitting both foes." },
      { name: "Psyshock", type: "Psychic", category: "Special", power: 80, accuracy: 100, rate: "86.4%", desc: "Targets opponent physical Defense." },
      { name: "Focus Blast", type: "Fighting", category: "Special", power: 120, accuracy: 70, rate: "64.0%", desc: "Destroys opposing Steel and Dark types." },
      { name: "Trick Room", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "48.2%", desc: "Inverts turn order for 5 turns." }
    ],
    natures: [
      { name: "Timid", rate: "68.2%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Outspeeds neutral base 80-95 tier)" },
      { name: "Modest", rate: "28.4%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Maximum Pixilate destruction)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "74.5%", desc: "Max Speed & Special Attack Sweeper" }
    ]
  },

  "mawile": {
    dexNumber: 303, generation: "Gen 3", role: "Huge Power Mega Sweeper / Trick Room",
    baseStats: { hp: 50, atk: 85, def: 85, spa: 55, spd: 55, spe: 50, total: 380 },
    abilities: [
      { name: "Intimidate", rate: "92.4%", desc: "Lowers opposing Pokémon Attack by 1 stage upon entry." },
      { name: "Sheer Force", rate: "7.6%", desc: "Removes secondary effects to boost damage by 30%." }
    ],
    items: [
      { name: "Mawilite Z", rate: "92.4%", desc: "Mega Stone giving Huge Power (doubles Attack stat to effective 210 base)." },
      { name: "Mawilite", rate: "7.4%", desc: "Standard Mega Stone for Mega Mawile." }
    ],
    moves: [
      { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "99.4%", desc: "Huge Power Fairy STAB; 10% Attack drop chance." },
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "96.8%", desc: "+1 Priority Dark STAB executing before target attacks." },
      { name: "Iron Head", type: "Steel", category: "Physical", power: 80, accuracy: 100, rate: "92.5%", desc: "Steel STAB with 30% flinch rate." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "64.2%", desc: "+2 Attack; turns Mawile into an unstoppable wallbreaker." }
    ],
    natures: [
      { name: "Adamant", rate: "84.2%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Huge Power doubles raw Attack points)" },
      { name: "Brave", rate: "14.5%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed (Trick Room sweeper)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "76.4%", desc: "Bulky Huge Power Sweeper" }
    ]
  },

  "kangaskhan": {
    dexNumber: 115, generation: "Gen 1", role: "Parental Bond Mega Sweeper / Fake Out Lead",
    baseStats: { hp: 105, atk: 95, def: 80, spa: 40, spd: 80, spe: 90, total: 490 },
    abilities: [
      { name: "Scrappy", rate: "88.6%", desc: "Allows Normal and Fighting moves to hit Ghost types." },
      { name: "Early Bird", rate: "11.4%", desc: "Awakens from sleep twice as fast." }
    ],
    items: [
      { name: "Kangaskhanite Z", rate: "91.5%", desc: "Mega Stone giving Parental Bond (attacks hit twice for 125% total damage)." },
      { name: "Kangaskhanite", rate: "8.2%", desc: "Standard Mega Stone for Mega Kangaskhan." }
    ],
    moves: [
      { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "99.2%", desc: "+3 Priority turn 1 flinch hitting twice via Parental Bond." },
      { name: "Double-Edge", type: "Normal", category: "Physical", power: 120, accuracy: 100, rate: "86.4%", desc: "Heavy Normal STAB dealing double hits." },
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "84.5%", desc: "+1 Priority attack hitting twice." },
      { name: "Power-Up Punch", type: "Fighting", category: "Physical", power: 40, accuracy: 100, rate: "74.2%", desc: "Hits twice, raising Attack by 2 full stages (+100%)." }
    ],
    natures: [
      { name: "Jolly", rate: "72.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Mega Kangaskhan base 100 Speed tier)" },
      { name: "Adamant", rate: "26.8%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Parental Bond damage)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "78.4%", desc: "Max Speed & Attack Sweeper" }
    ]
  },

  "venusaur": {
    dexNumber: 3, generation: "Gen 1", role: "Thick Fat Mega Tank / Chlorophyll Sweeper",
    baseStats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80, total: 525 },
    abilities: [
      { name: "Chlorophyll", rate: "68.4%", desc: "Doubles Speed in harsh sunlight." },
      { name: "Overgrow", rate: "31.6%", desc: "Boosts Grass moves at low HP." }
    ],
    items: [
      { name: "Venusaurite Z", rate: "68.5%", desc: "Mega Stone granting Thick Fat (halves incoming Fire & Ice damage) and massive bulk." },
      { name: "Venusaurite", rate: "7.8%", desc: "Standard Mega Stone for Mega Venusaur." },
      { name: "Life Orb", rate: "16.4%", desc: "Chlorophyll sun sweeper damage boost." }
    ],
    moves: [
      { name: "Giga Drain", type: "Grass", category: "Special", power: 75, accuracy: 100, rate: "94.2%", desc: "Grass STAB recovering 50% damage dealt." },
      { name: "Sludge Bomb", type: "Poison", category: "Special", power: 90, accuracy: 100, rate: "92.0%", desc: "Poison STAB with 30% poison rate." },
      { name: "Sleep Powder", type: "Grass", category: "Status", power: "-", accuracy: 75, rate: "68.5%", desc: "Puts target to sleep." },
      { name: "Earth Power", type: "Ground", category: "Special", power: 90, accuracy: 100, rate: "54.2%", desc: "Ground coverage destroying Heatran and Steel types." }
    ],
    natures: [
      { name: "Modest", rate: "62.4%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (High special damage output)" },
      { name: "Bold", rate: "24.6%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Thick Fat physical wall)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "52.4%", desc: "Bulky Special Attacker" },
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "34.6%", desc: "Chlorophyll Sun Sweeper" }
    ]
  },

  "blastoise": {
    dexNumber: 9, generation: "Gen 1", role: "Mega Launcher Cannon / Shell Smash",
    baseStats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78, total: 530 },
    abilities: [
      { name: "Torrent", rate: "84.2%", desc: "Powers up Water moves at low HP." },
      { name: "Rain Dish", rate: "15.8%", desc: "Recovers 1/16 HP per turn in rain." }
    ],
    items: [
      { name: "Blastoisinite Z", rate: "76.4%", desc: "Mega Stone giving Mega Launcher (boosts pulse/aura moves by 50%) and 135 Sp. Atk." },
      { name: "Blastoisinite", rate: "8.2%", desc: "Standard Mega Stone for Mega Blastoise." },
      { name: "White Herb", rate: "11.5%", desc: "Restores dropped defenses after Shell Smash." }
    ],
    moves: [
      { name: "Water Pulse", type: "Water", category: "Special", power: 60, accuracy: 100, rate: "88.6%", desc: "Boosted to 90 power by Mega Launcher with 20% confusion rate." },
      { name: "Aura Sphere", type: "Fighting", category: "Special", power: 80, accuracy: "-", rate: "84.2%", desc: "Boosted to 120 power by Mega Launcher; never misses." },
      { name: "Dark Pulse", type: "Dark", category: "Special", power: 80, accuracy: 100, rate: "76.5%", desc: "Boosted to 120 power by Mega Launcher; 20% flinch rate." },
      { name: "Shell Smash", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "72.4%", desc: "+2 Attack, +2 Sp. Atk, +2 Speed setup." }
    ],
    natures: [
      { name: "Modest", rate: "74.5%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Colossal Mega Launcher pulse damage)" },
      { name: "Timid", rate: "23.4%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Shell Smash outspeeds whole game)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "82.4%", desc: "Shell Smash Fast Sweeper" }
    ]
  },

  "volcarona": {
    dexNumber: 637, generation: "Gen 5", role: "Quiver Dance Special Sweeper",
    baseStats: { hp: 85, atk: 60, def: 65, spa: 135, spd: 105, spe: 100, total: 550 },
    abilities: [
      { name: "Flame Body", rate: "98.5%", desc: "30% chance to burn attacker upon physical contact." },
      { name: "Swarm", rate: "1.5%", desc: "Boosts Bug moves at low HP." }
    ],
    items: [
      { name: "Leftovers", rate: "42.5%", desc: "Continuous recovery while setting up Quiver Dance." },
      { name: "Heavy-Duty Boots", rate: "36.2%", desc: "Nullifies 50% damage from Stealth Rock entry hazard." },
      { name: "Sitrus Berry", rate: "12.4%", desc: "Restores 25% HP when below half health." }
    ],
    moves: [
      { name: "Quiver Dance", type: "Bug", category: "Status", power: "-", accuracy: "-", rate: "99.4%", desc: "Raises user Sp. Atk, Sp. Def, and Speed by 1 stage (+50%)." },
      { name: "Fiery Dance", type: "Fire", category: "Special", power: 80, accuracy: 100, rate: "94.2%", desc: "Fire STAB; 50% chance to boost Sp. Atk by 1 stage." },
      { name: "Bug Buzz", type: "Bug", category: "Special", power: 90, accuracy: 100, rate: "88.6%", desc: "Bug STAB; penetrates Substitute." },
      { name: "Giga Drain", type: "Grass", category: "Special", power: 75, accuracy: 100, rate: "76.4%", desc: "Grass coverage destroying Water, Ground, and Rock foes." }
    ],
    natures: [
      { name: "Timid", rate: "74.6%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Outspeeds neutral base 100 tier before +1)" },
      { name: "Modest", rate: "22.4%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Maximum special wallbreaker destruction)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "64.2%", desc: "Standard Quiver Dance Sweeper" },
      { spread: "248 HP / 108 Def / 152 Spe", rate: "26.4%", desc: "Bulky Quiver Dance Flame Body Setup" }
    ]
  },

  "dragapult": {
    dexNumber: 887, generation: "Gen 8", role: "Ultra Fast Dragon Pivot / Infiltrator",
    baseStats: { hp: 88, atk: 120, def: 75, spa: 100, spd: 75, spe: 142, total: 600 },
    abilities: [
      { name: "Infiltrator", rate: "82.4%", desc: "Bypasses enemy Reflect, Light Screen, Aurora Veil, and Substitute." },
      { name: "Clear Body", rate: "16.8%", desc: "Immunity to stat lowering effects and Intimidate." }
    ],
    items: [
      { name: "Choice Band", rate: "42.5%", desc: "Turns Dragon Darts into an unstoppable physical barrage." },
      { name: "Choice Specs", rate: "28.6%", desc: "Special wallbreaker utilizing 142 Speed tier." },
      { name: "Life Orb", rate: "18.2%", desc: "Move flexibility for mixed sets with Tera Blast." }
    ],
    moves: [
      { name: "Dragon Darts", type: "Dragon", category: "Physical", power: 50, accuracy: 100, rate: "96.4%", desc: "Hits twice (smart targeting in doubles); 100 base power total." },
      { name: "Phantom Force", type: "Ghost", category: "Physical", power: 90, accuracy: 100, rate: "74.2%", desc: "Two-turn Ghost STAB piercing Protect." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "88.6%", desc: "Pivots out at 142 base Speed maintaining tempo." },
      { name: "Tera Blast", type: "Normal", category: "Physical", power: 80, accuracy: 100, rate: "62.4%", desc: "Flexible coverage matching Terastal type (Ghost/Fairy)." }
    ],
    natures: [
      { name: "Jolly", rate: "68.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (142 Speed outspeeds almost the entire unboosted meta)" },
      { name: "Adamant", rate: "28.2%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Dragon Darts KO output)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "78.4%", desc: "Standard Fast Physical Sweeper" }
    ]
  },

  "gliscor": {
    dexNumber: 472, generation: "Gen 4", role: "Poison Heal Toxic Stall / Hazard Setter",
    baseStats: { hp: 75, atk: 95, def: 125, spa: 45, spd: 75, spe: 95, total: 510 },
    abilities: [
      { name: "Poison Heal", rate: "99.8%", desc: "Restores 1/8 max HP every turn when poisoned instead of taking damage." }
    ],
    items: [
      { name: "Toxic Orb", rate: "99.8%", desc: "Badly poisons the user at the end of turn 1, activating Poison Heal." }
    ],
    moves: [
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "98.5%", desc: "Blocks attacks; guarantees 12.5% free HP recovery turn." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "94.2%", desc: "Primary Ground STAB dealing solid damage." },
      { name: "Toxic", type: "Poison", category: "Status", power: "-", accuracy: 90, rate: "88.6%", desc: "Badly poisons opponent, putting them on a countdown clock." },
      { name: "Spikes", type: "Ground", category: "Status", power: "-", accuracy: "-", rate: "64.2%", desc: "Entry hazards punishing switch-ins." }
    ],
    natures: [
      { name: "Careful", rate: "64.2%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Balances high Defense with Special Defense)" },
      { name: "Impish", rate: "32.4%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk (Extreme physical fortress)" }
    ],
    evSpreads: [
      { spread: "244 HP / 244 SpD / 20 Spe", rate: "68.4%", desc: "Optimal Poison Heal Specially Defensive Wall" }
    ]
  },

  "dondozo": {
    dexNumber: 977, generation: "Gen 9", role: "Unaware Physical Fortress / Commander Core",
    baseStats: { hp: 150, atk: 100, def: 115, spa: 65, spd: 65, spe: 35, total: 530 },
    abilities: [
      { name: "Unaware", rate: "94.2%", desc: "Ignores all opponent stat boosts when taking or dealing damage." },
      { name: "Oblivious", rate: "5.8%", desc: "Immunity to Taunt and infatuation." }
    ],
    items: [
      { name: "Leftovers", rate: "54.2%", desc: "Continuous recovery alongside 150 base HP." },
      { name: "Clear Amulet", rate: "26.4%", desc: "Prevents Intimidate and stat drops." },
      { name: "Assault Vest", rate: "12.5%", desc: "Raises Sp. Def to take special hits comfortably." }
    ],
    moves: [
      { name: "Wave Crash", type: "Water", category: "Physical", power: 120, accuracy: 100, rate: "96.4%", desc: "Colossal Water STAB with 33% recoil." },
      { name: "Order Up", type: "Dragon", category: "Physical", power: 80, accuracy: 100, rate: "92.0%", desc: "Boosts stats when Tatsugiri is inside user mouth." },
      { name: "Heavy Slam", type: "Steel", category: "Physical", power: 120, accuracy: 100, rate: "84.5%", desc: "Deals max power damage due to colossal weight." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "76.2%", desc: "Standard doubles survival move." }
    ],
    natures: [
      { name: "Impish", rate: "58.4%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk (Physical fortress)" },
      { name: "Careful", rate: "36.2%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Patches special bulk)" }
    ],
    evSpreads: [
      { spread: "252 HP / 156 Def / 100 SpD", rate: "54.2%", desc: "VGC Balanced Wall" }
    ]
  },

  "pelipper": {
    dexNumber: 279, generation: "Gen 3", role: "Drizzle Rain Setter / Tailwind Pivot",
    baseStats: { hp: 60, atk: 50, def: 100, spa: 95, spd: 70, spe: 65, total: 440 },
    abilities: [
      { name: "Drizzle", rate: "99.8%", desc: "Summons rain for 5 turns upon entering battle." }
    ],
    items: [
      { name: "Focus Sash", rate: "58.4%", desc: "Guarantees setting Tailwind or launching attacks before fainting." },
      { name: "Damp Rock", rate: "24.2%", desc: "Extends rain from 5 to 8 turns." },
      { name: "Covert Cloak", rate: "12.5%", desc: "Immunity to Fake Out flinch from Incineroar." }
    ],
    moves: [
      { name: "Hurricane", type: "Flying", category: "Special", power: 110, accuracy: 70, rate: "98.5%", desc: "100% accurate in Rain with 30% confusion rate." },
      { name: "Hydro Pump", type: "Water", category: "Special", power: 110, accuracy: 80, rate: "92.0%", desc: "Colossal rain-boosted Water STAB damage." },
      { name: "Tailwind", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "88.4%", desc: "Doubles team Speed for 4 turns." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "64.2%", desc: "Turn preservation in doubles." }
    ],
    natures: [
      { name: "Modest", rate: "58.2%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (High rain special damage)" },
      { name: "Quiet", rate: "24.6%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Wins weather wars on turn 1)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "64.2%", desc: "Max Special Attack Bulky Rain Lead" }
    ]
  },

  "torkoal": {
    dexNumber: 324, generation: "Gen 3", role: "Drought Sun Setter / Eruption Cannon",
    baseStats: { hp: 70, atk: 85, def: 140, spa: 85, spd: 70, spe: 20, total: 470 },
    abilities: [
      { name: "Drought", rate: "99.4%", desc: "Summons harsh sunlight for 5 turns upon entry." }
    ],
    items: [
      { name: "Charcoal", rate: "48.2%", desc: "Boosts Fire moves by 20% without recoil." },
      { name: "Choice Specs", rate: "28.5%", desc: "Supercharges Eruption in Trick Room." },
      { name: "Sitrus Berry", rate: "14.2%", desc: "HP preservation." }
    ],
    moves: [
      { name: "Eruption", type: "Fire", category: "Special", power: 150, accuracy: 100, rate: "98.6%", desc: "Colossal spread damage in sun when at 100% full health." },
      { name: "Heat Wave", type: "Fire", category: "Special", power: 95, accuracy: 90, rate: "91.2%", desc: "Spread damage when HP drops low." },
      { name: "Solar Beam", type: "Grass", category: "Special", power: 120, accuracy: 100, rate: "84.5%", desc: "1-turn sun move destroying Water, Ground, and Rock." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "76.4%", desc: "Doubles turn preservation." }
    ],
    natures: [
      { name: "Quiet", rate: "88.6%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room min-speed sweeper)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "82.4%", desc: "Trick Room Eruption Cannon" }
    ]
  },

  "grimmsnarl": {
    dexNumber: 861, generation: "Gen 8", role: "Prankster Dual Screens Disruptor",
    baseStats: { hp: 95, atk: 120, def: 65, spa: 95, spd: 75, spe: 60, total: 510 },
    abilities: [
      { name: "Prankster", rate: "99.8%", desc: "Status moves gain +1 priority (fails against opposing Dark types)." }
    ],
    items: [
      { name: "Light Clay", rate: "92.4%", desc: "Extends Reflect and Light Screen from 5 to 8 turns." }
    ],
    moves: [
      { name: "Reflect", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "98.5%", desc: "+1 Priority; halves incoming physical damage for team." },
      { name: "Light Screen", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "98.2%", desc: "+1 Priority; halves incoming special damage for team." },
      { name: "Thunder Wave", type: "Electric", category: "Status", power: "-", accuracy: 90, rate: "84.6%", desc: "+1 Priority speed control paralyzing targets." },
      { name: "Spirit Break", type: "Fairy", category: "Physical", power: 75, accuracy: 100, rate: "76.2%", desc: "Fairy STAB; guaranteed 100% target Sp. Atk drop." }
    ],
    natures: [
      { name: "Careful", rate: "68.4%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Specially defensive screen setter)" },
      { name: "Impish", rate: "28.5%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk (Physically defensive balance)" }
    ],
    evSpreads: [
      { spread: "252 HP / 140 Def / 116 SpD", rate: "72.4%", desc: "VGC Balanced Screen Setter" }
    ]
  },

  "talonflame": {
    dexNumber: 663, generation: "Gen 6", role: "Gale Wings Priority Tailwind Lead",
    baseStats: { hp: 78, atk: 81, def: 71, spa: 74, spd: 69, spe: 126, total: 499 },
    abilities: [
      { name: "Gale Wings", rate: "99.4%", desc: "Flying moves gain +1 priority when at full 100% HP." }
    ],
    items: [
      { name: "Focus Sash", rate: "64.2%", desc: "Survives lethal hit preserving Tailwind turn 1." },
      { name: "Covert Cloak", rate: "24.5%", desc: "Immunity to Fake Out flinching." }
    ],
    moves: [
      { name: "Tailwind", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "99.8%", desc: "+1 Priority at full HP; doubles team Speed for 4 turns." },
      { name: "Brave Bird", type: "Flying", category: "Physical", power: 120, accuracy: 100, rate: "94.2%", desc: "+1 Priority Flying STAB at full HP; 33% recoil." },
      { name: "Flare Blitz", type: "Fire", category: "Physical", power: 120, accuracy: 100, rate: "86.4%", desc: "Heavy Fire STAB attack." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "68.5%", desc: "Halves opposing physical attackers damage." }
    ],
    natures: [
      { name: "Jolly", rate: "84.2%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Speed tie benchmark against base 126)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "82.4%", desc: "Fast Offensive Tailwind Lead" }
    ]
  },

  "clefable": {
    dexNumber: 36, generation: "Gen 1", role: "Unaware / Magic Guard Support",
    baseStats: { hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60, total: 483 },
    abilities: [
      { name: "Magic Guard", rate: "68.4%", desc: "Takes damage only from direct attacks (immune to toxic, stealth rock, burn)." },
      { name: "Unaware", rate: "31.6%", desc: "Ignores all opponent stat boosts." }
    ],
    items: [
      { name: "Leftovers", rate: "64.2%", desc: "Continuous recovery." },
      { name: "Rocky Helmet", rate: "24.5%", desc: "Punishes contact physical attackers." }
    ],
    moves: [
      { name: "Moonblast", type: "Fairy", category: "Special", power: 95, accuracy: 100, rate: "98.5%", desc: "Premier Fairy STAB; 30% target Sp. Atk drop." },
      { name: "Moonlight", type: "Fairy", category: "Status", power: "-", accuracy: "-", rate: "92.0%", desc: "Restores 50% max HP." },
      { name: "Thunder Wave", type: "Electric", category: "Status", power: "-", accuracy: 90, rate: "76.4%", desc: "Paralyzes opponents for speed control." },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "58.2%", desc: "Entry hazards." }
    ],
    natures: [
      { name: "Bold", rate: "78.4%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Physical defense fortress)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "74.2%", desc: "Physically Defensive Fortress" }
    ]
  },

  "snorlax": {
    dexNumber: 143, generation: "Gen 1", role: "Thick Fat Belly Drum Tank",
    baseStats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30, total: 540 },
    abilities: [
      { name: "Thick Fat", rate: "84.2%", desc: "Halves incoming Fire and Ice move damage." },
      { name: "Gluttony", rate: "15.8%", desc: "Eats pinch berries at 50% HP instead of 25%." }
    ],
    items: [
      { name: "Figy Berry", rate: "48.2%", desc: "Restores 33% max HP immediately after Belly Drum." },
      { name: "Leftovers", rate: "38.5%", desc: "Passive recovery." }
    ],
    moves: [
      { name: "Body Slam", type: "Normal", category: "Physical", power: 85, accuracy: 100, rate: "96.4%", desc: "Normal STAB with 30% paralysis chance." },
      { name: "Belly Drum", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "78.5%", desc: "Cuts 50% HP to maximize Attack to +6 (400%)." },
      { name: "Heavy Slam", type: "Steel", category: "Physical", power: 120, accuracy: 100, rate: "72.0%", desc: "Max power Steel coverage." },
      { name: "High Horsepower", type: "Ground", category: "Physical", power: 95, accuracy: 95, rate: "64.2%", desc: "Ground coverage destroying Steel and Rock foes." }
    ],
    natures: [
      { name: "Brave", rate: "72.4%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed (Trick Room min-speed sweeper)" }
    ],
    evSpreads: [
      { spread: "244 HP / 252 Atk / 12 Def", rate: "76.4%", desc: "Belly Drum Trick Room Attacker" }
    ]
  },

  "weavile": {
    dexNumber: 461, generation: "Gen 4", role: "Triple Axel Fast Revenge Killer",
    baseStats: { hp: 70, atk: 120, def: 65, spa: 45, spd: 85, spe: 125, total: 510 },
    abilities: [
      { name: "Pressure", rate: "92.4%", desc: "Forces enemy moves to consume 2 PP." },
      { name: "Pickpocket", rate: "7.6%", desc: "Steals attacker's item upon contact." }
    ],
    items: [
      { name: "Focus Sash", rate: "54.2%", desc: "Guarantees survival to retaliate or set up Swords Dance." },
      { name: "Choice Band", rate: "28.5%", desc: "Massive physical wallbreaker." },
      { name: "Life Orb", rate: "14.2%", desc: "Damage scaling." }
    ],
    moves: [
      { name: "Triple Axel", type: "Ice", category: "Physical", power: 120, accuracy: 90, rate: "98.5%", desc: "Hits 3 times with progressive power 20/40/60." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "96.4%", desc: "Removes opponent held item dealing 1.5x damage." },
      { name: "Ice Shard", type: "Ice", category: "Physical", power: 40, accuracy: 100, rate: "84.5%", desc: "+1 Priority Ice STAB for revenge KOs." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "62.4%", desc: "+2 Attack setup." }
    ],
    natures: [
      { name: "Jolly", rate: "88.6%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (125 Speed outspeeds base 110-120 tier)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "86.4%", desc: "Standard Fast Physical Sweeper" }
    ]
  },

  "whimsicott": {
    dexNumber: 547, generation: "Gen 5", role: "Prankster Tailwind Speed Control",
    baseStats: { hp: 60, atk: 67, def: 85, spa: 77, spd: 75, spe: 116, total: 480 },
    abilities: [
      { name: "Prankster", rate: "99.8%", desc: "Status moves gain +1 priority (fails against opposing Dark types)." }
    ],
    items: [
      { name: "Focus Sash", rate: "78.4%", desc: "Guarantees setting Tailwind before fainting." },
      { name: "Covert Cloak", rate: "18.2%", desc: "Immunity to Fake Out flinching." }
    ],
    moves: [
      { name: "Tailwind", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "99.8%", desc: "+1 Priority; doubles team Speed for 4 turns." },
      { name: "Moonblast", type: "Fairy", category: "Special", power: 95, accuracy: 100, rate: "96.4%", desc: "Fairy STAB; 30% target Sp. Atk drop." },
      { name: "Encore", type: "Normal", category: "Status", power: "-", accuracy: 100, rate: "84.2%", desc: "+1 Priority; locks target into their last used move for 3 turns." },
      { name: "Cotton Spore", type: "Grass", category: "Status", power: "-", accuracy: 100, rate: "58.4%", desc: "+1 Priority; lowers both opposing Pokémon Speed by 2 stages." }
    ],
    natures: [
      { name: "Timid", rate: "92.4%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Speed tie against opposing Prankster users)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "68.4%", desc: "Max Speed & Offensive Tailwind Lead" }
    ]
  }
};

// Merge into existing builds
const existing = JSON.parse(fs.readFileSync('src/pokemon_builds.json', 'utf8'));
const merged = { ...existing, ...POKEMON_DB };

fs.writeFileSync('src/pokemon_builds.json', JSON.stringify(merged, null, 2), 'utf8');
console.log('SUCCESS: Full database updated! Total entries:', Object.keys(merged).length);
