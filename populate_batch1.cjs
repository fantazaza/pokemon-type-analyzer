const fs = require('fs');

const BATCH_1 = {
  "absol": {
    dexNumber: 359, generation: "Gen 3", role: "Mega Magic Bounce Wallbreaker / Crit Sweeper",
    baseStats: { hp: 65, atk: 130, def: 60, spa: 75, spd: 60, spe: 75, total: 465 },
    abilities: [
      { name: "Super Luck", rate: "74.2%", desc: "Heightens critical hit ratio by 1 stage." },
      { name: "Magic Bounce", rate: "25.8%", desc: "Mega Ability reflects status moves and hazards back at user." }
    ],
    items: [
      { name: "Absolite Z", rate: "68.4%", desc: "Mega Stone allowing Absol to Mega Evolve with Magic Bounce." },
      { name: "Absolite", rate: "18.2%", desc: "Standard Mega Stone for Mega Evolution." },
      { name: "Life Orb", rate: "8.5%", desc: "Boosts move damage by 30% at cost of HP." },
      { name: "Focus Sash", rate: "4.9%", desc: "Survives lethal hit from full HP." }
    ],
    moves: [
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "92.4%", desc: "+1 Priority Dark attack; hits before foe attacks." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "84.6%", desc: "Removes target's held item and deals 1.5x damage." },
      { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "76.0%", desc: "Fairy physical coverage against Fighting/Dark." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "68.2%", desc: "Sharply raises user Attack by 2 stages." }
    ],
    natures: [
      { name: "Jolly", rate: "64.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" },
      { name: "Adamant", rate: "36.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "88.2%", desc: "Fast Physical Sweeper" }
    ]
  },

  "aegislash-shield": {
    dexNumber: 681, generation: "Gen 6", role: "Stance Change Pivot Tank / Weakness Policy Sweeper",
    baseStats: { hp: 60, atk: 50, def: 140, spa: 50, spd: 140, spe: 60, total: 500 },
    abilities: [
      { name: "Stance Change", rate: "100.0%", desc: "Changes to Blade Forme when attacking, Shield Forme on King's Shield." }
    ],
    items: [
      { name: "Weakness Policy", rate: "48.2%", desc: "+2 Atk & Sp. Atk when hit by a super-effective move." },
      { name: "Leftovers", rate: "28.4%", desc: "Restores 1/16 max HP each turn." },
      { name: "Air Balloon", rate: "14.5%", desc: "Grants Ground immunity until popped." },
      { name: "Spell Tag", rate: "8.9%", desc: "Boosts Ghost-type moves by 20%." }
    ],
    moves: [
      { name: "King's Shield", type: "Steel", category: "Status", power: "-", accuracy: "-", rate: "99.4%", desc: "Blocks damage; lowers contact attacker Attack by 1 stage and returns to Shield Forme." },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "82.5%", desc: "Ghost STAB; 20% target Sp. Def drop." },
      { name: "Flash Cannon", type: "Steel", category: "Special", power: 80, accuracy: 100, rate: "76.4%", desc: "Steel STAB special damage." },
      { name: "Shadow Sneak", type: "Ghost", category: "Physical", power: 40, accuracy: 100, rate: "64.8%", desc: "+1 Priority Ghost finisher." }
    ],
    natures: [
      { name: "Quiet", rate: "54.2%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Ensures taking hit in Shield Forme first)" },
      { name: "Modest", rate: "28.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "68.2%", desc: "Bulky Special Attacker" },
      { spread: "252 HP / 4 Def / 252 SpD", rate: "22.5%", desc: "Special Tank" }
    ]
  },

  "aerodactyl": {
    dexNumber: 142, generation: "Gen 1", role: "Tough Claws Mega Fast Cleaner / Stealth Rock Lead",
    baseStats: { hp: 80, atk: 105, def: 65, spa: 60, spd: 75, spe: 130, total: 515 },
    abilities: [
      { name: "Pressure", rate: "68.2%", desc: "Forces enemy to consume 2 PP per move." },
      { name: "Tough Claws", rate: "31.8%", desc: "Mega Ability boosts contact moves by 30%." }
    ],
    items: [
      { name: "Aerodactylite Z", rate: "62.5%", desc: "Mega Stone allowing Aerodactyl to Mega Evolve with Tough Claws." },
      { name: "Aerodactylite", rate: "21.0%", desc: "Standard Mega Stone for Mega Evolution." },
      { name: "Focus Sash", rate: "12.4%", desc: "Guarantees hazard setup on lead." },
      { name: "Life Orb", rate: "4.1%", desc: "Boosts move power." }
    ],
    moves: [
      { name: "Dual Wingbeat", type: "Flying", category: "Physical", power: 40, accuracy: 90, rate: "84.2%", desc: "Hits twice; Tough Claws boosted." },
      { name: "Stone Edge", type: "Rock", category: "Physical", power: 100, accuracy: 80, rate: "79.0%", desc: "High critical hit ratio Rock STAB." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "72.4%", desc: "Ground coverage hitting Steel and Electric." },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "54.6%", desc: "Entry hazard damage." }
    ],
    natures: [
      { name: "Jolly", rate: "86.5%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Blistering 150 Mega Speed)" },
      { name: "Adamant", rate: "13.5%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "92.0%", desc: "Max Speed Physical Sweeper" }
    ]
  },

  "alakazam": {
    dexNumber: 65, generation: "Gen 1", role: "Trace Mega Special Sweeper / Sash Counter",
    baseStats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120, total: 500 },
    abilities: [
      { name: "Magic Guard", rate: "82.5%", desc: "Immunity to indirect damage (hazards, poison, burn, Life Orb recoil)." },
      { name: "Trace", rate: "17.5%", desc: "Mega Ability copies opposing Pokémon's ability on entry." }
    ],
    items: [
      { name: "Alakazite Z", rate: "56.4%", desc: "Mega Stone granting 175 Sp. Atk and 150 Speed with Trace." },
      { name: "Focus Sash", rate: "26.8%", desc: "Guarantees surviving any hit with Magic Guard intact." },
      { name: "Alakazite", rate: "12.4%", desc: "Standard Mega Stone." },
      { name: "Life Orb", rate: "4.4%", desc: "Free 30% damage boost with Magic Guard." }
    ],
    moves: [
      { name: "Psychic", type: "Psychic", category: "Special", power: 90, accuracy: 100, rate: "94.0%", desc: "Standard Psychic STAB; 10% Sp. Def drop." },
      { name: "Focus Blast", type: "Fighting", category: "Special", power: 120, accuracy: 70, rate: "84.2%", desc: "Special Fighting nuke against Dark and Steel." },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "78.6%", desc: "Ghost coverage for opposing Psychics and Ghosts." },
      { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "58.2%", desc: "Spread Fairy coverage." }
    ],
    natures: [
      { name: "Timid", rate: "89.2%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (High speed control)" },
      { name: "Modest", rate: "10.8%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "94.5%", desc: "Pure Special Sweeper" }
    ]
  },

  "altaria": {
    dexNumber: 334, generation: "Gen 3", role: "Pixilate Mega Dragon Dance Sweeper / Cotton Guard Tank",
    baseStats: { hp: 75, atk: 70, def: 90, spa: 70, spd: 105, spe: 80, total: 490 },
    abilities: [
      { name: "Natural Cure", rate: "72.0%", desc: "Heals status conditions upon switching out." },
      { name: "Pixilate", rate: "28.0%", desc: "Mega Ability converts Normal moves to Fairy and boosts by 20%." }
    ],
    items: [
      { name: "Altarianite Z", rate: "74.5%", desc: "Mega Stone converting Altaria to Dragon/Fairy with Pixilate." },
      { name: "Altarianite", rate: "18.2%", desc: "Standard Mega Stone." },
      { name: "Leftovers", rate: "7.3%", desc: "Restores 1/16 HP per turn." }
    ],
    moves: [
      { name: "Return", type: "Normal", category: "Physical", power: 102, accuracy: 100, rate: "88.4%", desc: "Boosted into Fairy-type nuke by Pixilate." },
      { name: "Dragon Dance", type: "Dragon", category: "Status", power: "-", accuracy: "-", rate: "82.0%", desc: "Raises user Attack and Speed by 1 stage." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "74.5%", desc: "Ground coverage for Poison, Fire, and Steel." },
      { name: "Roost", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "66.0%", desc: "Restores 50% max HP." }
    ],
    natures: [
      { name: "Adamant", rate: "54.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Jolly", rate: "42.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "252 Atk / 4 SpD / 252 Spe", rate: "62.4%", desc: "Dragon Dance Sweeper" },
      { spread: "252 HP / 136 Def / 120 Spe", rate: "28.5%", desc: "Bulky Dragon Dance" }
    ]
  },

  "annihilape": {
    dexNumber: 979, generation: "Gen 9", role: "Rage Fist Bulk Up Sweeper / Final Gambit Nuke",
    baseStats: { hp: 110, atk: 115, def: 80, spa: 50, spd: 90, spe: 90, total: 535 },
    abilities: [
      { name: "Defiant", rate: "88.4%", desc: "Sharply raises Attack by 2 stages when any stat is lowered (counters Intimidate)." },
      { name: "Vital Spirit", rate: "11.6%", desc: "Immunity to Sleep (Spore, Hypnosis)." }
    ],
    items: [
      { name: "Leftovers", rate: "54.2%", desc: "Gradual recovery during Bulk Up setup." },
      { name: "Choice Scarf", rate: "24.8%", desc: "Allows instant surprise Final Gambit 1-for-1 trade." },
      { name: "Sitrus Berry", rate: "12.5%", desc: "Restores 25% HP when falling low." },
      { name: "Booster Energy", rate: "8.5%", desc: "Boosts highest stat." }
    ],
    moves: [
      { name: "Rage Fist", type: "Ghost", category: "Physical", power: 50, accuracy: 100, rate: "99.2%", desc: "Gains +50 base power each time hit this battle up to 350 BP." },
      { name: "Drain Punch", type: "Fighting", category: "Physical", power: 75, accuracy: 100, rate: "94.5%", desc: "Fighting STAB recovering 50% damage dealt." },
      { name: "Bulk Up", type: "Fighting", category: "Status", power: "-", accuracy: "-", rate: "76.4%", desc: "Raises Attack and Defense by 1 stage." },
      { name: "Final Gambit", type: "Fighting", category: "Special", power: 1, accuracy: 100, rate: "38.2%", desc: "Sacrifices user to deal exact remaining HP as true damage." }
    ],
    natures: [
      { name: "Careful", rate: "48.2%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Specially bulky setup)" },
      { name: "Jolly", rate: "36.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Speed Scarf variant)" }
    ],
    evSpreads: [
      { spread: "252 HP / 4 Def / 252 SpD", rate: "52.0%", desc: "Specially Defensive Bulk Up" },
      { spread: "252 HP / 4 Atk / 252 Spe", rate: "32.0%", desc: "Scarf Final Gambit Max HP" }
    ]
  },

  "araquanid": {
    dexNumber: 752, generation: "Gen 7", role: "Water Bubble Wallbreaker / Sticky Web Setter",
    baseStats: { hp: 68, atk: 70, def: 92, spa: 50, spd: 132, spe: 42, total: 454 },
    abilities: [
      { name: "Water Bubble", rate: "99.8%", desc: "Doubles power of Water moves, cuts Fire damage taken in half, prevents burns." },
      { name: "Water Absorb", rate: "0.2%", desc: "Heals HP when hit by Water." }
    ],
    items: [
      { name: "Focus Sash", rate: "42.0%", desc: "Guarantees Sticky Web entry hazard." },
      { name: "Choice Band", rate: "32.5%", desc: "Colossal 2x Water Bubble boosted Water attacks." },
      { name: "Mystic Water", rate: "18.2%", desc: "Boosts Water moves by 20%." }
    ],
    moves: [
      { name: "Liquidation", type: "Water", category: "Physical", power: 85, accuracy: 100, rate: "98.5%", desc: "Effective 170 BP from Water Bubble; 20% Def drop." },
      { name: "Sticky Web", type: "Bug", category: "Status", power: "-", accuracy: "-", rate: "84.2%", desc: "Entry hazard lowering switch-in enemy Speed by 1 stage." },
      { name: "Leech Life", type: "Bug", category: "Physical", power: 80, accuracy: 100, rate: "76.4%", desc: "Bug STAB recovering 50% HP." },
      { name: "Wide Guard", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "48.0%", desc: "Protects team from spread moves in doubles." }
    ],
    natures: [
      { name: "Adamant", rate: "78.4%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Brave", rate: "21.6%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed (Trick Room)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "74.0%", desc: "Bulky Physical Attacker" }
    ]
  },

  "arboliva": {
    dexNumber: 930, generation: "Gen 9", role: "Seed Sower Grassy Terrain Healer / Terrain Extender",
    baseStats: { hp: 78, atk: 69, def: 90, spa: 125, spd: 109, spe: 39, total: 510 },
    abilities: [
      { name: "Seed Sower", rate: "94.2%", desc: "Sets Grassy Terrain automatically when hit by an attack." },
      { name: "Harvest", rate: "5.8%", desc: "50% chance to restore consumed berry each turn." }
    ],
    items: [
      { name: "Terrain Extender", rate: "42.0%", desc: "Extends Grassy Terrain from 5 to 8 turns." },
      { name: "Sitrus Berry", rate: "34.5%", desc: "Emergency 25% healing." },
      { name: "Leftovers", rate: "16.8%", desc: "Stacks with Grassy Terrain healing." }
    ],
    moves: [
      { name: "Giga Drain", type: "Grass", category: "Special", power: 75, accuracy: 100, rate: "92.0%", desc: "Grass STAB recovering 50% damage dealt." },
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "84.2%", desc: "Spread Normal STAB hitting through substitute." },
      { name: "Earth Power", type: "Ground", category: "Special", power: 90, accuracy: 100, rate: "76.0%", desc: "Special Ground coverage against Steel and Fire." },
      { name: "Strength Sap", type: "Grass", category: "Status", power: "-", accuracy: 100, rate: "68.4%", desc: "Lowers target Attack and heals HP by their Attack stat." }
    ],
    natures: [
      { name: "Modest", rate: "62.4%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Bold", rate: "28.6%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "58.0%", desc: "Bulky Special Attacker" },
      { spread: "252 HP / 252 Def / 4 SpD", rate: "36.0%", desc: "Physically Defensive Tank" }
    ]
  },

  "arcanine-hisui": {
    dexNumber: 59, generation: "Gen 8", role: "Rock Head Head Smash Wallbreaker / Intimidate Pivot",
    baseStats: { hp: 95, atk: 115, def: 80, spa: 95, spd: 80, spe: 90, total: 555 },
    abilities: [
      { name: "Rock Head", rate: "68.4%", desc: "Protects user from recoil damage (Head Smash / Flare Blitz have 0 recoil!)." },
      { name: "Intimidate", rate: "31.6%", desc: "Lowers all opposing Pokémon Attack by 1 stage on switch-in." }
    ],
    items: [
      { name: "Choice Band", rate: "48.2%", desc: "Enormous zero-recoil Head Smash and Flare Blitz nukes." },
      { name: "Life Orb", rate: "24.5%", desc: "Boosts damage without move locking." },
      { name: "Choice Scarf", rate: "18.0%", desc: "Overcomes base 90 Speed." },
      { name: "Assault Vest", rate: "9.3%", desc: "50% Sp. Def boost for defensive Intimidate sets." }
    ],
    moves: [
      { name: "Head Smash", type: "Rock", category: "Physical", power: 150, accuracy: 80, rate: "98.5%", desc: "Colossal 150 BP Rock STAB with 0 recoil under Rock Head." },
      { name: "Flare Blitz", type: "Fire", category: "Physical", power: 120, accuracy: 100, rate: "96.4%", desc: "Colossal 120 BP Fire STAB with 0 recoil under Rock Head." },
      { name: "Extreme Speed", type: "Normal", category: "Physical", power: 80, accuracy: 100, rate: "84.2%", desc: "+2 Priority physical attack for revenge KOs." },
      { name: "Wild Charge", type: "Electric", category: "Physical", power: 90, accuracy: 100, rate: "62.0%", desc: "Zero recoil Electric coverage vs Water types." }
    ],
    natures: [
      { name: "Adamant", rate: "58.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum wallbreaking power)" },
      { name: "Jolly", rate: "42.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "86.5%", desc: "Fast Physical Wallbreaker" }
    ]
  },

  "armarouge": {
    dexNumber: 935, generation: "Gen 9", role: "Expanding Force Psychic Terrain Sweeper / Trick Room Room Setter",
    baseStats: { hp: 85, atk: 60, def: 100, spa: 125, spd: 80, spe: 75, total: 525 },
    abilities: [
      { name: "Flash Fire", rate: "76.4%", desc: "Immunity to Fire moves; boosts own Fire attacks by 50% when triggered." },
      { name: "Weak Armor", rate: "23.6%", desc: "Raises Speed by 2 and lowers Defense by 1 when hit physically." }
    ],
    items: [
      { name: "Life Orb", rate: "38.5%", desc: "Amplifies Expanding Force damage." },
      { name: "Twisted Spoon", rate: "28.0%", desc: "Boosts Psychic damage without recoil." },
      { name: "Focus Sash", rate: "21.5%", desc: "Guarantees Trick Room setup." },
      { name: "Weakness Policy", rate: "12.0%", desc: "Combines with ally Aqua Jet for +2 SpA and +2 Spe." }
    ],
    moves: [
      { name: "Expanding Force", type: "Psychic", category: "Special", power: 80, accuracy: 100, rate: "99.0%", desc: "Powers to 120 BP and hits all foes on Psychic Terrain (with Indeedee)." },
      { name: "Armor Cannon", type: "Fire", category: "Special", power: 120, accuracy: 100, rate: "96.5%", desc: "Heavy 120 BP Fire STAB; drops Def and SpD by 1." },
      { name: "Trick Room", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "74.0%", desc: "Reverses speed order for 5 turns." },
      { name: "Wide Guard", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "56.2%", desc: "Protects team from spread attacks." }
    ],
    natures: [
      { name: "Quiet", rate: "64.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room sweeper)" },
      { name: "Modest", rate: "36.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "78.0%", desc: "Bulky Trick Room Sweeper" }
    ]
  },

  "azumarill": {
    dexNumber: 184, generation: "Gen 2", role: "Huge Power Belly Drum Sweeper / Choice Band Nuke",
    baseStats: { hp: 100, atk: 50, def: 80, spa: 60, spd: 80, spe: 50, total: 420 },
    abilities: [
      { name: "Huge Power", rate: "99.9%", desc: "Doubles user's Attack stat in battle to effective 150+ base attack!" }
    ],
    items: [
      { name: "Sitrus Berry", rate: "54.2%", desc: "Restores 25% max HP immediately after Belly Drum half-health cut." },
      { name: "Choice Band", rate: "34.0%", desc: "Instant colossal Aqua Jet and Play Rough power." },
      { name: "Assault Vest", rate: "11.8%", desc: "Specially defensive tank with Huge Power punch." }
    ],
    moves: [
      { name: "Aqua Jet", type: "Water", category: "Physical", power: 40, accuracy: 100, rate: "99.5%", desc: "+1 Priority Huge Power Water strike for clean revenge KOs." },
      { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "96.8%", desc: "Huge Power Fairy STAB decimating Dragons and Dark types." },
      { name: "Belly Drum", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "72.4%", desc: "Cuts HP by 50% to maximize Attack to +6 (400% damage!)." },
      { name: "Liquidation", type: "Water", category: "Physical", power: 85, accuracy: 100, rate: "68.2%", desc: "Heavy physical Water STAB; 20% Defense drop." }
    ],
    natures: [
      { name: "Adamant", rate: "92.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Huge Power scaling)" },
      { name: "Brave", rate: "8.0%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed (Trick Room)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "64.0%", desc: "Bulky Belly Drum Sweeper" },
      { spread: "164 HP / 252 Atk / 92 Spe", rate: "26.5%", desc: "Speed Creep Attacker" }
    ]
  },

  "banette": {
    dexNumber: 354, generation: "Gen 3", role: "Mega Prankster Destiny Bond / Will-O-Wisp Disruptor",
    baseStats: { hp: 64, atk: 115, def: 65, spa: 83, spd: 63, spe: 65, total: 455 },
    abilities: [
      { name: "Frisk", rate: "68.5%", desc: "Reveals opponent held item on switch-in." },
      { name: "Prankster", rate: "31.5%", desc: "Mega Ability grants +1 priority to all status moves." }
    ],
    items: [
      { name: "Banettite Z", rate: "78.4%", desc: "Mega Stone granting 165 Attack and Prankster status moves." },
      { name: "Banettite", rate: "16.8%", desc: "Standard Mega Stone." },
      { name: "Focus Sash", rate: "4.8%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Destiny Bond", type: "Ghost", category: "Status", power: "-", accuracy: "-", rate: "94.2%", desc: "+1 Priority; takes foe down with user if KOed that turn." },
      { name: "Shadow Sneak", type: "Ghost", category: "Physical", power: 40, accuracy: 100, rate: "88.0%", desc: "+1 Priority Ghost strike." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "82.4%", desc: "+1 Priority Prankster burn halving foe physical Attack." },
      { name: "Poltergeist", type: "Ghost", category: "Physical", power: 110, accuracy: 90, rate: "71.5%", desc: "165 Atk boosted Ghost nuke using foe's held item." }
    ],
    natures: [
      { name: "Adamant", rate: "68.5%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Jolly", rate: "31.5%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "58.2%", desc: "Bulky Prankster Disruptor" },
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "38.0%", desc: "Fast Physical Attacker" }
    ]
  },

  "basculegion-male": {
    dexNumber: 902, generation: "Gen 8", role: "Adaptability Last Respects Cleaner / Swift Swim Rain Sweeper",
    baseStats: { hp: 120, atk: 112, def: 65, spa: 80, spd: 75, spe: 78, total: 530 },
    abilities: [
      { name: "Adaptability", rate: "76.4%", desc: "Boosts STAB multiplier from 1.5x to 2.0x for Water and Ghost moves." },
      { name: "Swift Swim", rate: "23.6%", desc: "Doubles Speed in rain." }
    ],
    items: [
      { name: "Choice Scarf", rate: "46.2%", desc: "Allows outspeeding entire metagame for end-game Last Respects." },
      { name: "Choice Band", rate: "32.8%", desc: "Absurd wallbreaking burst damage." },
      { name: "Life Orb", rate: "14.5%", desc: "High flexibility." },
      { name: "Focus Sash", rate: "6.5%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Last Respects", type: "Ghost", category: "Physical", power: 50, accuracy: 100, rate: "99.8%", desc: "Gains +50 base power for each fainted ally Pokémon up to 300 BP!" },
      { name: "Wave Crash", type: "Water", category: "Physical", power: 120, accuracy: 100, rate: "96.0%", desc: "Adaptability 2x boosted 120 BP Water STAB with 33% recoil." },
      { name: "Aqua Jet", type: "Water", category: "Physical", power: 40, accuracy: 100, rate: "84.2%", desc: "+1 Priority Adaptability Water finisher." },
      { name: "Head Smash", type: "Rock", category: "Physical", power: 150, accuracy: 80, rate: "48.0%", desc: "Heavy Rock coverage." }
    ],
    natures: [
      { name: "Adamant", rate: "64.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Jolly", rate: "36.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "88.0%", desc: "Fast Physical Cleaner" }
    ]
  },

  "basculegion-female": {
    dexNumber: 902, generation: "Gen 8", role: "Special Adaptability Cleaner / Rain Attacker",
    baseStats: { hp: 120, atk: 80, def: 65, spa: 100, spd: 75, spe: 78, total: 518 },
    abilities: [
      { name: "Adaptability", rate: "78.0%", desc: "Boosts STAB multiplier to 2.0x for Water and Ghost moves." },
      { name: "Swift Swim", rate: "22.0%", desc: "Doubles Speed in rain." }
    ],
    items: [
      { name: "Choice Scarf", rate: "48.0%", desc: "Speed control for late-game sweep." },
      { name: "Choice Specs", rate: "34.0%", desc: "Enormous special STAB wallbreaker." },
      { name: "Life Orb", rate: "18.0%", desc: "Flexible special attacker." }
    ],
    moves: [
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "98.0%", desc: "Adaptability 2x boosted Ghost STAB." },
      { name: "Hydro Pump", type: "Water", category: "Special", power: 110, accuracy: 80, rate: "92.4%", desc: "Colossal special Water damage." },
      { name: "Ice Beam", type: "Ice", category: "Special", power: 90, accuracy: 100, rate: "84.0%", desc: "Ice coverage vs Grass and Dragons." },
      { name: "Icy Wind", type: "Ice", category: "Special", power: 55, accuracy: 95, rate: "56.0%", desc: "Hits both opponents and drops Speed." }
    ],
    natures: [
      { name: "Modest", rate: "58.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Timid", rate: "42.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Fast Special Sweeper" }
    ]
  },

  "bellibolt": {
    dexNumber: 939, generation: "Gen 9", role: "Electromorphosis Bulky Pivot / Parabolic Charge Tank",
    baseStats: { hp: 109, atk: 64, def: 91, spa: 103, spd: 83, spe: 45, total: 495 },
    abilities: [
      { name: "Electromorphosis", rate: "96.4%", desc: "Gains Charge status whenever hit, doubling power of next Electric move!" },
      { name: "Static", rate: "3.6%", desc: "30% paralysis chance on contact." }
    ],
    items: [
      { name: "Leftovers", rate: "46.2%", desc: "Consistent recovery." },
      { name: "Assault Vest", rate: "32.0%", desc: "50% Sp. Def boost transforming Bellibolt into immense mixed wall." },
      { name: "Rocky Helmet", rate: "14.5%", desc: "Punishes contact attacks." },
      { name: "Sitrus Berry", rate: "7.3%", desc: "Burst recovery." }
    ],
    moves: [
      { name: "Parabolic Charge", type: "Electric", category: "Special", power: 65, accuracy: 100, rate: "98.0%", desc: "Hits adjacent foes; heals 50% damage dealt (doubled by Electromorphosis!)." },
      { name: "Volt Switch", type: "Electric", category: "Special", power: 70, accuracy: 100, rate: "88.4%", desc: "Pivot move maintaining momentum." },
      { name: "Muddy Water", type: "Water", category: "Special", power: 90, accuracy: 85, rate: "74.0%", desc: "Water spread coverage; 30% accuracy drop." },
      { name: "Slack Off", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "64.0%", desc: "Restores 50% max HP." }
    ],
    natures: [
      { name: "Modest", rate: "54.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Bold", rate: "46.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 180 Def / 76 SpA", rate: "54.0%", desc: "Bulky Tank" },
      { spread: "252 HP / 4 Def / 252 SpA", rate: "38.0%", desc: "Offensive Electromorphosis" }
    ]
  },

  "camerupt": {
    dexNumber: 323, generation: "Gen 3", role: "Mega Sheer Force Trick Room Wallbreaker",
    baseStats: { hp: 70, atk: 100, def: 70, spa: 105, spd: 75, spe: 40, total: 460 },
    abilities: [
      { name: "Solid Rock", rate: "64.0%", desc: "Reduces super-effective damage by 25%." },
      { name: "Sheer Force", rate: "36.0%", desc: "Mega Ability boosts moves with secondary effects by 30%." }
    ],
    items: [
      { name: "Cameruptite Z", rate: "72.0%", desc: "Mega Stone granting 145 Sp. Atk and Sheer Force." },
      { name: "Cameruptite", rate: "20.5%", desc: "Standard Mega Stone." },
      { name: "Life Orb", rate: "7.5%", desc: "Damage boost." }
    ],
    moves: [
      { name: "Earth Power", type: "Ground", category: "Special", power: 90, accuracy: 100, rate: "98.0%", desc: "Sheer Force 1.3x boosted Ground STAB (117 BP)." },
      { name: "Fire Blast", type: "Fire", category: "Special", power: 110, accuracy: 85, rate: "92.0%", desc: "Sheer Force 1.3x boosted Fire STAB (143 BP)." },
      { name: "Heat Wave", type: "Fire", category: "Special", power: 95, accuracy: 90, rate: "84.5%", desc: "Spread Fire damage in doubles." },
      { name: "Ancient Power", type: "Rock", category: "Special", power: 60, accuracy: 100, rate: "58.0%", desc: "Sheer Force boosted Rock coverage." }
    ],
    natures: [
      { name: "Quiet", rate: "88.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room sweeper)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "92.0%", desc: "Max Special Attack Trick Room" }
    ]
  },

  "ceruledge": {
    dexNumber: 936, generation: "Gen 9", role: "Bitter Blade Swords Dance Sweeper / Focus Sash Cleaner",
    baseStats: { hp: 75, atk: 125, def: 80, spa: 60, spd: 100, spe: 85, total: 525 },
    abilities: [
      { name: "Flash Fire", rate: "74.2%", desc: "Immunity to Fire moves; boosts Fire attacks by 50%." },
      { name: "Weak Armor", rate: "25.8%", desc: "+2 Speed and -1 Defense on physical hit." }
    ],
    items: [
      { name: "Focus Sash", rate: "44.0%", desc: "Guarantees Swords Dance setup." },
      { name: "Life Orb", rate: "28.5%", desc: "Increases Bitter Blade burst and recovery." },
      { name: "Clear Amulet", rate: "16.5%", desc: "Prevents Intimidate Attack drop." },
      { name: "Leftovers", rate: "11.0%", desc: "Bulky setup sustain." }
    ],
    moves: [
      { name: "Bitter Blade", type: "Fire", category: "Physical", power: 90, accuracy: 100, rate: "99.5%", desc: "Signature Fire STAB; restores 50% of damage dealt." },
      { name: "Shadow Sneak", type: "Ghost", category: "Physical", power: 40, accuracy: 100, rate: "94.0%", desc: "+1 Priority Ghost finisher." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "88.4%", desc: "Sharply raises Attack by 2 stages." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "78.2%", desc: "Fighting coverage for Dark, Rock, and Normal types." }
    ],
    natures: [
      { name: "Adamant", rate: "62.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Jolly", rate: "38.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "84.0%", desc: "Fast Physical Sweeper" }
    ]
  },

  "chandelure": {
    dexNumber: 609, generation: "Gen 5", role: "Flash Fire Special Wallbreaker / Trick Room Anti-Setter",
    baseStats: { hp: 60, atk: 55, def: 90, spa: 145, spd: 90, spe: 80, total: 520 },
    abilities: [
      { name: "Flash Fire", rate: "72.0%", desc: "Fire immunity and 50% Fire damage boost." },
      { name: "Infiltrator", rate: "24.5%", desc: "Passes through screens, Reflect, and Substitute." },
      { name: "Flame Body", rate: "3.5%", desc: "30% contact burn chance." }
    ],
    items: [
      { name: "Choice Scarf", rate: "48.2%", desc: "Outspeeds fast Dragons and Ghosts." },
      { name: "Choice Specs", rate: "28.5%", desc: "Monstrous 145 Sp. Atk burst damage." },
      { name: "Focus Sash", rate: "15.0%", desc: "Guarantees Trick Room or attack." },
      { name: "Life Orb", rate: "8.3%", desc: "High versatile damage." }
    ],
    moves: [
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "98.0%", desc: "Ghost STAB; 20% Sp. Def drop." },
      { name: "Heat Wave", type: "Fire", category: "Special", power: 95, accuracy: 90, rate: "92.5%", desc: "Spread Fire damage hitting both targets." },
      { name: "Overheat", type: "Fire", category: "Special", power: 130, accuracy: 90, rate: "76.4%", desc: "Devastating Fire burst KO." },
      { name: "Energy Ball", type: "Grass", category: "Special", power: 90, accuracy: 100, rate: "68.0%", desc: "Grass coverage for Water, Ground, and Rock." }
    ],
    natures: [
      { name: "Timid", rate: "66.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" },
      { name: "Modest", rate: "34.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Max Special Attacker" }
    ]
  },

  "cinderace": {
    dexNumber: 815, generation: "Gen 8", role: "Libero High-Jump Sweeper / Pyro Ball Cleaner",
    baseStats: { hp: 80, atk: 116, def: 75, spa: 65, spd: 75, spe: 119, total: 530 },
    abilities: [
      { name: "Libero", rate: "94.5%", desc: "Changes user's type to match move used, granting 1.5x STAB on all attacks." },
      { name: "Blaze", rate: "5.5%", desc: "Fire boost at low HP." }
    ],
    items: [
      { name: "Life Orb", rate: "42.0%", desc: "Amplifies Libero multi-type strikes." },
      { name: "Choice Band", rate: "28.5%", desc: "Instant wallbreaking power." },
      { name: "Heavy-Duty Boots", rate: "18.0%", desc: "Immunity to Stealth Rock damage." },
      { name: "Focus Sash", rate: "11.5%", desc: "Guarantees surviving one hit." }
    ],
    moves: [
      { name: "Pyro Ball", type: "Fire", category: "Physical", power: 120, accuracy: 90, rate: "98.5%", desc: "Signature 120 BP Fire STAB; 10% burn chance." },
      { name: "High Jump Kick", type: "Fighting", category: "Physical", power: 130, accuracy: 90, rate: "88.2%", desc: "Heavy Fighting coverage; cuts through Rock and Steel." },
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "84.0%", desc: "+1 Priority Dark attack; strikes before target attacks." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "76.4%", desc: "Pivots out while dealing damage." }
    ],
    natures: [
      { name: "Jolly", rate: "78.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Speed tier 119)" },
      { name: "Adamant", rate: "22.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "94.0%", desc: "Fast Physical Cleaner" }
    ]
  },

  "delphox": {
    dexNumber: 655, generation: "Gen 6", role: "Magician Special Sweeper / Expanding Force Attacker",
    baseStats: { hp: 75, atk: 69, def: 72, spa: 114, spd: 100, spe: 104, total: 534 },
    abilities: [
      { name: "Blaze", rate: "64.0%", desc: "Boosts Fire moves by 50% at under 1/3 HP." },
      { name: "Magician", rate: "36.0%", desc: "Steals target's held item upon attacking." }
    ],
    items: [
      { name: "Choice Specs", rate: "44.0%", desc: "Heavy special burst damage." },
      { name: "Choice Scarf", rate: "32.0%", desc: "Surprise Speed tier." },
      { name: "Life Orb", rate: "16.0%", desc: "Flexible move selection." },
      { name: "Focus Sash", rate: "8.0%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Fire Blast", type: "Fire", category: "Special", power: 110, accuracy: 85, rate: "92.0%", desc: "Heavy Fire STAB." },
      { name: "Psychic", type: "Psychic", category: "Special", power: 90, accuracy: 100, rate: "88.4%", desc: "Psychic STAB; 10% Sp. Def drop." },
      { name: "Expanding Force", type: "Psychic", category: "Special", power: 80, accuracy: 100, rate: "78.0%", desc: "Hits all foes on Psychic Terrain." },
      { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "68.5%", desc: "Fairy spread coverage." }
    ],
    natures: [
      { name: "Timid", rate: "84.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" },
      { name: "Modest", rate: "16.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Max Speed Special Sweeper" }
    ]
  },

  "ditto": {
    dexNumber: 132, generation: "Gen 1", role: "Imposter Revenge Killer / Anti-Setup Reverse Sweeper",
    baseStats: { hp: 48, atk: 48, def: 48, spa: 48, spd: 48, spe: 48, total: 288 },
    abilities: [
      { name: "Imposter", rate: "100.0%", desc: "Instantly transforms into opponent on switch-in, copying stats, stat boosts, and moves!" }
    ],
    items: [
      { name: "Choice Scarf", rate: "96.4%", desc: "Guarantees outspeeding the transformed Pokémon by 50% Speed!" },
      { name: "Focus Sash", rate: "3.6%", desc: "Survives 1 hit." }
    ],
    moves: [
      { name: "Transform", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "100.0%", desc: "Transforms into the opponent's Pokémon." }
    ],
    natures: [
      { name: "Relaxed", rate: "50.0%", boost: "+Def", drop: "-Spe", desc: "+Defense, -Speed" },
      { name: "Impish", rate: "50.0%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "252 HP / 4 Def / 252 SpD", rate: "100.0%", desc: "Max HP (only Dittos HP stat is kept upon transform)" }
    ]
  },

  "dragalge": {
    dexNumber: 691, generation: "Gen 6", role: "Adaptability Toxic Wallbreaker / Special Tank",
    baseStats: { hp: 65, atk: 75, def: 90, spa: 97, spd: 123, spe: 44, total: 494 },
    abilities: [
      { name: "Adaptability", rate: "98.5%", desc: "Increases Poison and Dragon STAB multiplier to 2.0x." },
      { name: "Poison Touch", rate: "1.5%", desc: "30% poison chance on contact." }
    ],
    items: [
      { name: "Choice Specs", rate: "48.0%", desc: "Monstrous 2x Adaptability Sludge Wave damage." },
      { name: "Assault Vest", rate: "36.0%", desc: "Specially defensive tank with over 180 effective Sp. Def." },
      { name: "Life Orb", rate: "16.0%", desc: "Flexible damage boost." }
    ],
    moves: [
      { name: "Sludge Wave", type: "Poison", category: "Special", power: 95, accuracy: 100, rate: "98.0%", desc: "Adaptability 2x boosted Poison STAB hitting all adjacent targets." },
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "94.5%", desc: "Adaptability 2x boosted 130 BP Dragon nuke." },
      { name: "Focus Blast", type: "Fighting", category: "Special", power: 120, accuracy: 70, rate: "74.0%", desc: "Fighting coverage vs Steel." },
      { name: "Hydro Pump", type: "Water", category: "Special", power: 110, accuracy: 80, rate: "62.0%", desc: "Water coverage vs Ground." }
    ],
    natures: [
      { name: "Modest", rate: "82.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Quiet", rate: "18.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "84.0%", desc: "Bulky Special Wallbreaker" }
    ]
  },

  "drampa": {
    dexNumber: 780, generation: "Gen 7", role: "Berserk Trick Room Wallbreaker / Normal-Dragon Tank",
    baseStats: { hp: 78, atk: 60, def: 85, spa: 135, spd: 91, spe: 36, total: 485 },
    abilities: [
      { name: "Berserk", rate: "92.4%", desc: "Raises Sp. Atk by 1 stage whenever HP falls below 50%." },
      { name: "Cloud Nine", rate: "7.6%", desc: "Eliminates effects of weather." }
    ],
    items: [
      { name: "Sitrus Berry", rate: "42.0%", desc: "Triggers Berserk and heals back above half HP." },
      { name: "Choice Specs", rate: "34.5%", desc: "Colossal 135 Sp. Atk burst." },
      { name: "Life Orb", rate: "15.5%", desc: "Flexible damage boost." },
      { name: "Assault Vest", rate: "8.0%", desc: "Bulky special tank." }
    ],
    moves: [
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "96.0%", desc: "Spread Normal STAB hitting through substitute." },
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "92.0%", desc: "Heavy Dragon burst damage." },
      { name: "Flamethrower", type: "Fire", category: "Special", power: 90, accuracy: 100, rate: "84.0%", desc: "Fire coverage vs Steel and Ice." },
      { name: "Roost", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "54.0%", desc: "Restores 50% max HP." }
    ],
    natures: [
      { name: "Quiet", rate: "78.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room)" },
      { name: "Modest", rate: "22.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "88.0%", desc: "Trick Room Bulky Attacker" }
    ]
  },

  "empoleon": {
    dexNumber: 395, generation: "Gen 4", role: "Competitive Special Pivot / Stealth Rock Hazard Tank",
    baseStats: { hp: 84, atk: 86, def: 88, spa: 111, spd: 101, spe: 60, total: 530 },
    abilities: [
      { name: "Competitive", rate: "94.5%", desc: "Sharply raises Sp. Atk by 2 stages when any stat is lowered (punishes Intimidate & Icy Wind!)." },
      { name: "Torrent", rate: "5.5%", desc: "Boosts Water moves at low HP." }
    ],
    items: [
      { name: "Leftovers", rate: "48.0%", desc: "Consistent recovery." },
      { name: "Assault Vest", rate: "28.5%", desc: "Incredible special sponge." },
      { name: "Sitrus Berry", rate: "14.5%", desc: "Burst healing." },
      { name: "Life Orb", rate: "9.0%", desc: "Offensive Competitive sweep." }
    ],
    moves: [
      { name: "Flash Cannon", type: "Steel", category: "Special", power: 80, accuracy: 100, rate: "92.0%", desc: "Steel STAB vs Fairies." },
      { name: "Hydro Pump", type: "Water", category: "Special", power: 110, accuracy: 80, rate: "86.5%", desc: "Heavy Water damage." },
      { name: "Ice Beam", type: "Ice", category: "Special", power: 90, accuracy: 100, rate: "78.4%", desc: "Ice coverage vs Grass and Dragons." },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "68.0%", desc: "Entry hazard damage." }
    ],
    natures: [
      { name: "Modest", rate: "68.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Calm", rate: "32.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "64.0%", desc: "Bulky Competitive Attacker" },
      { spread: "252 HP / 4 Def / 252 SpD", rate: "36.0%", desc: "Specially Defensive Tank" }
    ]
  },

  "espathra": {
    dexNumber: 956, generation: "Gen 9", role: "Speed Boost Stored Power Sweeper / Lumina Crash Wallbreaker",
    baseStats: { hp: 95, atk: 60, def: 60, spa: 101, spd: 60, spe: 105, total: 481 },
    abilities: [
      { name: "Speed Boost", rate: "98.2%", desc: "Raises Speed by 1 stage at the end of each turn automatically!" },
      { name: "Opportunist", rate: "1.8%", desc: "Copies opponent's stat increases." }
    ],
    items: [
      { name: "Focus Sash", rate: "42.0%", desc: "Guarantees Calm Mind setup turn." },
      { name: "Leftovers", rate: "34.5%", desc: "Sustains while stacking Speed and Calm Mind boosts." },
      { name: "Life Orb", rate: "16.5%", desc: "Instant offensive pressure." },
      { name: "Covert Cloak", rate: "7.0%", desc: "Prevents Fake Out flinch." }
    ],
    moves: [
      { name: "Lumina Crash", type: "Psychic", category: "Special", power: 80, accuracy: 100, rate: "99.5%", desc: "Signature Psychic STAB; ALWAYS lowers target Sp. Def by 2 stages (-50%)!" },
      { name: "Stored Power", type: "Psychic", category: "Special", power: 20, accuracy: 100, rate: "88.0%", desc: "Gains +20 BP for every stat stage increased (scales with Speed Boost!)." },
      { name: "Calm Mind", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "84.5%", desc: "Raises Sp. Atk and Sp. Def by 1 stage." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "82.0%", desc: "Guarantees free Speed Boost turn." }
    ],
    natures: [
      { name: "Modest", rate: "64.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Speed Boost covers speed)" },
      { name: "Timid", rate: "36.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "68.0%", desc: "Speed Boost Sweeper" },
      { spread: "252 HP / 252 Def / 4 SpA", rate: "32.0%", desc: "Bulky Calm Mind Setup" }
    ]
  },

  "excadrill": {
    dexNumber: 530, generation: "Gen 5", role: "Sand Rush Rapid Spinner / Mold Breaker Hazard Lead",
    baseStats: { hp: 110, atk: 135, def: 60, spa: 50, spd: 65, spe: 88, total: 508 },
    abilities: [
      { name: "Sand Rush", rate: "64.2%", desc: "Doubles Speed in Sandstorm (paired with Tyranitar or Hippowdon)." },
      { name: "Mold Breaker", rate: "35.8%", desc: "Moves ignore target abilities (hits Levitate with Earthquake!)." }
    ],
    items: [
      { name: "Focus Sash", rate: "42.5%", desc: "Guarantees setting Stealth Rock or attacking." },
      { name: "Life Orb", rate: "34.0%", desc: "Amplifies Sand Rush sweep power." },
      { name: "Choice Band", rate: "14.5%", desc: "Colossal physical damage." },
      { name: "Air Balloon", rate: "9.0%", desc: "Ground immunity for mirrors." }
    ],
    moves: [
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "99.5%", desc: "Standard Ground STAB hitting adjacent targets." },
      { name: "Iron Head", type: "Steel", category: "Physical", power: 80, accuracy: 100, rate: "96.0%", desc: "Steel STAB with 30% flinch rate." },
      { name: "Rock Slide", type: "Rock", category: "Physical", power: 75, accuracy: 90, rate: "84.2%", desc: "Rock coverage hitting Flying types in doubles." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "58.0%", desc: "Sharply raises Attack by 2 stages." }
    ],
    natures: [
      { name: "Adamant", rate: "68.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Sand Rush power)" },
      { name: "Jolly", rate: "32.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "92.0%", desc: "Fast Physical Sweeper" }
    ]
  },

  "farigiraf": {
    dexNumber: 981, generation: "Gen 9", role: "Armor Tail Priority Blocker / Trick Room Setter",
    baseStats: { hp: 120, atk: 90, def: 70, spa: 110, spd: 70, spe: 60, total: 520 },
    abilities: [
      { name: "Armor Tail", rate: "98.5%", desc: "Prevents opponents from using priority moves (blocks Fake Out, Grassy Glide, Sucker Punch!)." },
      { name: "Cud Chew", rate: "1.5%", desc: "Eats berry again at the end of next turn." }
    ],
    items: [
      { name: "Sitrus Berry", rate: "48.0%", desc: "Burst recovery." },
      { name: "Mental Herb", rate: "28.5%", desc: "Cures Taunt to guarantee Trick Room." },
      { name: "Safety Goggles", rate: "14.5%", desc: "Immunity to Spore and powder moves." },
      { name: "Throat Spray", rate: "9.0%", desc: "+1 Sp. Atk on Hyper Voice." }
    ],
    moves: [
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "96.4%", desc: "Spread Normal STAB hitting both opponents." },
      { name: "Psychic", type: "Psychic", category: "Special", power: 90, accuracy: 100, rate: "88.0%", desc: "Standard Psychic STAB." },
      { name: "Trick Room", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "84.2%", desc: "Inverts speed order for 5 turns." },
      { name: "Helping Hand", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "62.0%", desc: "Boosts ally's move power by 50%." }
    ],
    natures: [
      { name: "Quiet", rate: "58.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room)" },
      { name: "Modest", rate: "42.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 180 Def / 76 SpA", rate: "56.0%", desc: "Bulky Support Setter" },
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "44.0%", desc: "Offensive Trick Room" }
    ]
  },

  "floette": {
    dexNumber: 670, generation: "Gen 6", role: "Flower Veil Eviolite Support / Symbiosis Battery",
    baseStats: { hp: 54, atk: 45, def: 47, spa: 75, spd: 98, spe: 52, total: 371 },
    abilities: [
      { name: "Flower Veil", rate: "76.0%", desc: "Protects ally Grass Pokémon from stat drops and status." },
      { name: "Symbiosis", rate: "24.0%", desc: "Passes held item to ally when ally consumes theirs." }
    ],
    items: [
      { name: "Eviolite", rate: "92.0%", desc: "Boosts Defense and Sp. Def by 50% on unevolved Pokémon." },
      { name: "Focus Sash", rate: "8.0%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Moonblast", type: "Fairy", category: "Special", power: 95, accuracy: 100, rate: "94.0%", desc: "Fairy STAB; 30% Sp. Def drop." },
      { name: "Pollen Puff", type: "Bug", category: "Special", power: 90, accuracy: 100, rate: "88.5%", desc: "Heals ally by 50% HP or damages foes." },
      { name: "Helping Hand", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "78.0%", desc: "Boosts ally's damage by 50%." },
      { name: "Aromatherapy", type: "Grass", category: "Status", power: "-", accuracy: "-", rate: "62.0%", desc: "Cures team status conditions." }
    ],
    natures: [
      { name: "Bold", rate: "68.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" },
      { name: "Calm", rate: "32.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "88.0%", desc: "Max Defense Eviolite Wall" }
    ]
  },

  "froslass": {
    dexNumber: 478, generation: "Gen 4", role: "Fast Spikes Lead / Destiny Bond Trapper",
    baseStats: { hp: 70, atk: 80, def: 70, spa: 80, spd: 70, spe: 110, total: 480 },
    abilities: [
      { name: "Cursed Body", rate: "84.5%", desc: "30% chance to disable attacker's move upon taking damage." },
      { name: "Snow Cloak", rate: "15.5%", desc: "Boosts evasion in Snow." }
    ],
    items: [
      { name: "Focus Sash", rate: "94.0%", desc: "Guarantees hazard setup and Destiny Bond trade." },
      { name: "Never-Melt Ice", rate: "6.0%", desc: "Boosts Ice damage." }
    ],
    moves: [
      { name: "Spikes", type: "Ground", category: "Status", power: "-", accuracy: "-", rate: "98.0%", desc: "Entry hazard damage to grounded foes." },
      { name: "Destiny Bond", type: "Ghost", category: "Status", power: "-", accuracy: "-", rate: "94.5%", desc: "Takes opposing Pokémon down with user if KOed." },
      { name: "Taunt", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "82.0%", desc: "Prevents target from using status moves for 3 turns." },
      { name: "Ice Beam", type: "Ice", category: "Special", power: 90, accuracy: 100, rate: "76.4%", desc: "Ice STAB damage." }
    ],
    natures: [
      { name: "Timid", rate: "94.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Fast Suicide Hazard Lead" }
    ]
  },

  "gallade": {
    dexNumber: 475, generation: "Gen 4", role: "Sharpness Mega Sacred Sword Sweeper / Trick Room Lead",
    baseStats: { hp: 68, atk: 125, def: 65, spa: 65, spd: 115, spe: 80, total: 518 },
    abilities: [
      { name: "Sharpness", rate: "86.5%", desc: "Boosts slicing moves by 50% (Sacred Sword, Psycho Cut, Leaf Blade, Night Slash!)." },
      { name: "Justified", rate: "13.5%", desc: "Raises Attack when hit by Dark move." }
    ],
    items: [
      { name: "Galladite Z", rate: "64.0%", desc: "Mega Stone granting 165 Attack and 110 Speed with Inner Focus." },
      { name: "Galladite", rate: "18.5%", desc: "Standard Mega Stone." },
      { name: "Choice Scarf", rate: "11.0%", desc: "Surprise Speed tier with Sharpness boosted moves." },
      { name: "Life Orb", rate: "6.5%", desc: "Damage amplification." }
    ],
    moves: [
      { name: "Sacred Sword", type: "Fighting", category: "Physical", power: 90, accuracy: 100, rate: "98.5%", desc: "Sharpness boosted to 135 BP; ignores target's stat boosts." },
      { name: "Psycho Cut", type: "Psychic", category: "Physical", power: 70, accuracy: 100, rate: "94.0%", desc: "Sharpness boosted to 105 BP; high critical hit ratio." },
      { name: "Leaf Blade", type: "Grass", category: "Physical", power: 90, accuracy: 100, rate: "78.4%", desc: "Sharpness boosted Grass coverage vs Water/Ground." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "68.0%", desc: "Sharply raises Attack by 2 stages." }
    ],
    natures: [
      { name: "Jolly", rate: "74.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" },
      { name: "Adamant", rate: "26.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "92.0%", desc: "Fast Physical Wallbreaker" }
    ]
  },

  "glimmora": {
    dexNumber: 969, generation: "Gen 9", role: "Toxic Debris Hazard Lead / Mortal Spin Control",
    baseStats: { hp: 83, atk: 55, def: 90, spa: 130, spd: 81, spe: 86, total: 525 },
    abilities: [
      { name: "Toxic Debris", rate: "96.5%", desc: "Scatters Toxic Spikes at the enemy feet whenever hit by physical attacks!" },
      { name: "Corrosion", rate: "3.5%", desc: "Can poison Steel and Poison types." }
    ],
    items: [
      { name: "Focus Sash", rate: "84.0%", desc: "Guarantees hazard setup and Toxic Debris activation." },
      { name: "Power Herb", rate: "9.5%", desc: "Instantly fires 1-turn Meteor Beam." },
      { name: "Assault Vest", rate: "6.5%", desc: "Bulky offensive tank." }
    ],
    moves: [
      { name: "Mortal Spin", type: "Poison", category: "Physical", power: 30, accuracy: 100, rate: "99.0%", desc: "Removes hazards, binds, and seeds from user while 100% poisoning all foes!" },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "92.0%", desc: "Entry hazard dealing damage on switch-in." },
      { name: "Sludge Wave", type: "Poison", category: "Special", power: 95, accuracy: 100, rate: "84.5%", desc: "Heavy 130 Sp. Atk Poison STAB." },
      { name: "Earth Power", type: "Ground", category: "Special", power: 90, accuracy: 100, rate: "76.0%", desc: "Ground coverage for opposing Glimmora and Steel types." }
    ],
    natures: [
      { name: "Timid", rate: "78.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" },
      { name: "Modest", rate: "22.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "88.0%", desc: "Fast Suicide Hazard Lead" }
    ]
  },

  "golisopod": {
    dexNumber: 768, generation: "Gen 7", role: "Emergency Exit First Impression Revenge Killer",
    baseStats: { hp: 75, atk: 125, def: 140, spa: 60, spd: 90, spe: 40, total: 530 },
    abilities: [
      { name: "Emergency Exit", rate: "100.0%", desc: "Automatically switches out when HP falls below 50%, resetting First Impression!" }
    ],
    items: [
      { name: "Heavy-Duty Boots", rate: "48.0%", desc: "Immunity to entry hazards on repeated switch-ins." },
      { name: "Assault Vest", rate: "28.5%", desc: "Boosts Sp. Def by 50% for high mixed bulk." },
      { name: "Choice Band", rate: "14.5%", desc: "Devastating First Impression KOs." },
      { name: "Life Orb", rate: "9.0%", desc: "Damage amplification." }
    ],
    moves: [
      { name: "First Impression", type: "Bug", category: "Physical", power: 90, accuracy: 100, rate: "99.8%", desc: "+2 Priority Bug attack on user's first turn in battle; immense burst." },
      { name: "Aqua Jet", type: "Water", category: "Physical", power: 40, accuracy: 100, rate: "92.0%", desc: "+1 Priority Water STAB for revenge kills." },
      { name: "Liquidation", type: "Water", category: "Physical", power: 85, accuracy: 100, rate: "84.5%", desc: "Heavy physical Water STAB; 20% Defense drop." },
      { name: "Leech Life", type: "Bug", category: "Physical", power: 80, accuracy: 100, rate: "68.0%", desc: "Bug STAB recovering 50% damage dealt." }
    ],
    natures: [
      { name: "Adamant", rate: "88.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Brave", rate: "12.0%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed (Trick Room)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "82.0%", desc: "Bulky Priority Attacker" }
    ]
  },

  "goodra-hisui": {
    dexNumber: 706, generation: "Gen 8", role: "Shelter / Acid Armor Body Press Colossal Steel Wall",
    baseStats: { hp: 80, atk: 100, def: 100, spa: 110, spd: 150, spe: 60, total: 600 },
    abilities: [
      { name: "Gooey", rate: "54.0%", desc: "Lowers attacker's Speed by 1 stage upon contact." },
      { name: "Shell Armor", rate: "36.0%", desc: "Immunity to critical hits, securing unshakeable defensive setups." },
      { name: "Overcoat", rate: "10.0%", desc: "Immunity to powder moves and sandstorm." }
    ],
    items: [
      { name: "Leftovers", rate: "64.0%", desc: "Passive HP recovery behind immense defenses." },
      { name: "Assault Vest", rate: "26.0%", desc: "Colossal 225 effective Sp. Def." },
      { name: "Sitrus Berry", rate: "10.0%", desc: "Emergency healing." }
    ],
    moves: [
      { name: "Body Press", type: "Fighting", category: "Physical", power: 80, accuracy: 100, rate: "96.4%", desc: "Calculates damage using user's massive Defense stat (+2 per Shelter!)." },
      { name: "Shelter", type: "Steel", category: "Status", power: "-", accuracy: "-", rate: "88.5%", desc: "Sharply raises Defense by 2 stages (+100%)." },
      { name: "Heavy Slam", type: "Steel", category: "Physical", power: 120, accuracy: 100, rate: "78.0%", desc: "Heavy Steel STAB scaling with enormous body weight." },
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "62.0%", desc: "Burst special Dragon STAB." }
    ],
    natures: [
      { name: "Relaxed", rate: "58.0%", boost: "+Def", drop: "-Spe", desc: "+Defense, -Speed" },
      { name: "Bold", rate: "42.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "76.0%", desc: "Max Defense Body Press Sweeper" }
    ]
  },

  "grapploct": {
    dexNumber: 853, generation: "Gen 8", role: "Octolock Trapper / Technician Bulk Up Tank",
    baseStats: { hp: 80, atk: 118, def: 90, spa: 70, spd: 80, spe: 42, total: 480 },
    abilities: [
      { name: "Technician", rate: "74.0%", desc: "Boosts moves with 60 base power or less by 50%." },
      { name: "Limber", rate: "26.0%", desc: "Immunity to paralysis." }
    ],
    items: [
      { name: "Leftovers", rate: "52.0%", desc: "Sustain during Octolock trapping." },
      { name: "Assault Vest", rate: "32.0%", desc: "Mixed bulk boost." },
      { name: "Sitrus Berry", rate: "16.0%", desc: "Emergency HP." }
    ],
    moves: [
      { name: "Octolock", type: "Fighting", category: "Status", power: "-", accuracy: 100, rate: "94.0%", desc: "Traps target and lowers their Def & Sp. Def by 1 stage at each turn end." },
      { name: "Drain Punch", type: "Fighting", category: "Physical", power: 75, accuracy: 100, rate: "92.0%", desc: "Fighting STAB restoring 50% HP." },
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "84.0%", desc: "+1 Priority Dark attack." },
      { name: "Ice Punch", type: "Ice", category: "Physical", power: 75, accuracy: 100, rate: "68.0%", desc: "Ice coverage vs Flying." }
    ],
    natures: [
      { name: "Adamant", rate: "68.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" },
      { name: "Brave", rate: "32.0%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Atk / 4 SpD", rate: "78.0%", desc: "Bulky Physical Attacker" }
    ]
  },

  "greninja": {
    dexNumber: 658, generation: "Gen 6", role: "Protean Special Sweeper / Water Shuriken Cleaner",
    baseStats: { hp: 72, atk: 95, def: 67, spa: 103, spd: 71, spe: 122, total: 530 },
    abilities: [
      { name: "Protean", rate: "78.5%", desc: "Changes user's type to match move used, granting STAB on every attack." },
      { name: "Battle Bond", rate: "18.0%", desc: "Raises Attack, Sp. Atk, and Speed by 1 stage upon KOing a foe." },
      { name: "Torrent", rate: "3.5%", desc: "Water boost at low HP." }
    ],
    items: [
      { name: "Life Orb", rate: "48.0%", desc: "30% damage boost across all Protean attacks." },
      { name: "Focus Sash", rate: "26.5%", desc: "Guarantees surviving lethal hit." },
      { name: "Choice Specs", rate: "18.0%", desc: "Wallbreaking special power." },
      { name: "Choice Scarf", rate: "7.5%", desc: "Outspeeds all speed-boosted threats." }
    ],
    moves: [
      { name: "Hydro Pump", type: "Water", category: "Special", power: 110, accuracy: 80, rate: "92.0%", desc: "Colossal special Water STAB." },
      { name: "Dark Pulse", type: "Dark", category: "Special", power: 80, accuracy: 100, rate: "88.4%", desc: "Dark STAB; 20% flinch rate." },
      { name: "Ice Beam", type: "Ice", category: "Special", power: 90, accuracy: 100, rate: "84.0%", desc: "Ice coverage vs Grass and Dragons." },
      { name: "Water Shuriken", type: "Water", category: "Special", power: 15, accuracy: 100, rate: "76.0%", desc: "+1 Priority multi-hit special Water move." }
    ],
    natures: [
      { name: "Timid", rate: "84.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (High 122 Speed tier)" },
      { name: "Modest", rate: "16.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "94.0%", desc: "Fast Special Sweeper" }
    ]
  },

  "hatterene": {
    dexNumber: 858, generation: "Gen 8", role: "Magic Bounce Trick Room Sweeper / Dazzling Gleam Wallbreaker",
    baseStats: { hp: 57, atk: 90, def: 95, spa: 136, spd: 103, spe: 29, total: 510 },
    abilities: [
      { name: "Magic Bounce", rate: "99.5%", desc: "Reflects Taunt, Spore, hazards, and status moves back at opponent!" }
    ],
    items: [
      { name: "Life Orb", rate: "44.0%", desc: "Enormous Trick Room spread damage." },
      { name: "Focus Sash", rate: "28.5%", desc: "Guarantees setting Trick Room." },
      { name: "Leftovers", rate: "16.5%", desc: "Bulky sustain." },
      { name: "Babiri Berry", rate: "11.0%", desc: "Halves super-effective Steel damage." }
    ],
    moves: [
      { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "98.0%", desc: "Spread Fairy STAB hitting both opponents." },
      { name: "Psychic", type: "Psychic", category: "Special", power: 90, accuracy: 100, rate: "92.0%", desc: "Heavy 136 Sp. Atk Psychic STAB." },
      { name: "Trick Room", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "88.5%", desc: "Inverts speed order for 5 turns." },
      { name: "Mystical Fire", type: "Fire", category: "Special", power: 75, accuracy: 100, rate: "74.0%", desc: "Fire coverage vs Steel; 100% drops foe Sp. Atk." }
    ],
    natures: [
      { name: "Quiet", rate: "92.0%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room sweeper)" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 SpA / 4 SpD", rate: "88.0%", desc: "Trick Room Bulky Sweeper" }
    ]
  },

  "hydreigon": {
    dexNumber: 635, generation: "Gen 5", role: "Levitate Nasty Plot Sweeper / Draco Meteor Wallbreaker",
    baseStats: { hp: 92, atk: 105, def: 90, spa: 125, spd: 90, spe: 98, total: 600 },
    abilities: [
      { name: "Levitate", rate: "100.0%", desc: "Full immunity to Ground-type attacks and entry hazards (Spikes, Toxic Spikes)." }
    ],
    items: [
      { name: "Life Orb", rate: "38.5%", desc: "Boosts all attacks by 30%." },
      { name: "Choice Specs", rate: "32.0%", desc: "Absurd Draco Meteor burst damage." },
      { name: "Choice Scarf", rate: "18.5%", desc: "Outspeeds key base 100-110 threats." },
      { name: "Covert Cloak", rate: "11.0%", desc: "Immunity to Fake Out and secondary effects." }
    ],
    moves: [
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "96.0%", desc: "Colossal 130 BP Dragon nuke; drops Sp. Atk by 2." },
      { name: "Dark Pulse", type: "Dark", category: "Special", power: 80, accuracy: 100, rate: "94.5%", desc: "Dark STAB with 20% flinch rate." },
      { name: "Flash Cannon", type: "Steel", category: "Special", power: 80, accuracy: 100, rate: "78.4%", desc: "Steel coverage targeting Fairy types." },
      { name: "Nasty Plot", type: "Dark", category: "Status", power: "-", accuracy: "-", rate: "68.0%", desc: "Sharply raises Sp. Atk by 2 stages." }
    ],
    natures: [
      { name: "Timid", rate: "82.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Crucial base 98 Speed tier)" },
      { name: "Modest", rate: "18.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Fast Special Sweeper" }
    ]
  },

  "indeedee-female": {
    dexNumber: 876, generation: "Gen 8", role: "Psychic Surge Follow Me Redirection Support",
    baseStats: { hp: 70, atk: 55, def: 65, spa: 95, spd: 105, spe: 85, total: 475 },
    abilities: [
      { name: "Psychic Surge", rate: "99.8%", desc: "Sets Psychic Terrain on entry (blocks priority moves, powers Psychic attacks)." }
    ],
    items: [
      { name: "Psychic Seed", rate: "54.0%", desc: "Instantly boosts Sp. Def by 1 stage on Psychic Terrain entry." },
      { name: "Focus Sash", rate: "28.0%", desc: "Guarantees surviving redirection hit." },
      { name: "Safety Goggles", rate: "12.0%", desc: "Immunity to Spore and powder moves." },
      { name: "Sitrus Berry", rate: "6.0%", desc: "Burst healing." }
    ],
    moves: [
      { name: "Follow Me", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "99.8%", desc: "+2 Priority; redirects all opponent single-target attacks to user!" },
      { name: "Helping Hand", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "88.4%", desc: "+5 Priority; boosts ally move power by 50%." },
      { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "74.0%", desc: "Fairy spread attack." },
      { name: "Trick Room", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "68.5%", desc: "Inverts speed order for 5 turns." }
    ],
    natures: [
      { name: "Bold", rate: "62.0%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack" },
      { name: "Calm", rate: "38.0%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack" }
    ],
    evSpreads: [
      { spread: "252 HP / 252 Def / 4 SpD", rate: "76.0%", desc: "Max Physical Defense Redirection" }
    ]
  },

  "indeedee-male": {
    dexNumber: 876, generation: "Gen 8", role: "Psychic Surge Expanding Force Special Sweeper",
    baseStats: { hp: 60, atk: 65, def: 55, spa: 105, spd: 95, spe: 95, total: 475 },
    abilities: [
      { name: "Psychic Surge", rate: "99.5%", desc: "Sets Psychic Terrain on entry, boosting Psychic moves by 30% and blocking priority." }
    ],
    items: [
      { name: "Choice Scarf", rate: "48.0%", desc: "Fast outspeeding Expanding Force sweeper." },
      { name: "Choice Specs", rate: "32.0%", desc: "Devastating special spread damage." },
      { name: "Life Orb", rate: "14.0%", desc: "Damage boost." },
      { name: "Focus Sash", rate: "6.0%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Expanding Force", type: "Psychic", category: "Special", power: 80, accuracy: 100, rate: "99.5%", desc: "120 BP spread STAB hitting both opponents on Psychic Terrain." },
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "88.0%", desc: "Normal STAB hitting through substitute." },
      { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "76.4%", desc: "Spread Fairy coverage vs Dark types." },
      { name: "Mystical Fire", type: "Fire", category: "Special", power: 75, accuracy: 100, rate: "62.0%", desc: "Fire coverage vs Steel types; drops foe Sp. Atk." }
    ],
    natures: [
      { name: "Timid", rate: "76.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" },
      { name: "Modest", rate: "24.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "92.0%", desc: "Fast Special Sweeper" }
    ]
  },

  "inteleon": {
    dexNumber: 818, generation: "Gen 8", role: "Sniper Scope Lens Critical Sweeper / Snipe Shot Cleaner",
    baseStats: { hp: 70, atk: 85, def: 65, spa: 125, spd: 65, spe: 120, total: 530 },
    abilities: [
      { name: "Sniper", rate: "74.5%", desc: "Boosts critical hit damage from 1.5x to 2.25x!" },
      { name: "Torrent", rate: "25.5%", desc: "Water boost at low HP." }
    ],
    items: [
      { name: "Scope Lens", rate: "58.0%", desc: "Raises critical hit ratio to stack with Snipe Shot and Focus Energy." },
      { name: "Life Orb", rate: "24.0%", desc: "Consistent 30% damage boost." },
      { name: "Focus Sash", rate: "12.0%", desc: "Survives fatal hit." },
      { name: "Choice Specs", rate: "6.0%", desc: "Colossal special burst." }
    ],
    moves: [
      { name: "Snipe Shot", type: "Water", category: "Special", power: 80, accuracy: 100, rate: "98.0%", desc: "Ignores redirection (Follow Me); high critical hit ratio (2.25x under Sniper!)." },
      { name: "Ice Beam", type: "Ice", category: "Special", power: 90, accuracy: 100, rate: "92.5%", desc: "Ice coverage vs Grass and Dragons." },
      { name: "Dark Pulse", type: "Dark", category: "Special", power: 80, accuracy: 100, rate: "78.0%", desc: "Dark coverage; 20% flinch rate." },
      { name: "Focus Energy", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "64.0%", desc: "Guarantees 100% critical hits for the rest of battle with Scope Lens." }
    ],
    natures: [
      { name: "Timid", rate: "86.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (High base 120 Speed tier)" },
      { name: "Modest", rate: "14.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "94.0%", desc: "Fast Critical Sweeper" }
    ]
  },

  "kleavor": {
    dexNumber: 900, generation: "Gen 8", role: "Sharpness Stone Axe Hazard Setter / Stealth Rock Sweeper",
    baseStats: { hp: 70, atk: 135, def: 95, spa: 45, spd: 70, spe: 85, total: 500 },
    abilities: [
      { name: "Sharpness", rate: "96.4%", desc: "Boosts slicing moves by 50% (Stone Axe, X-Scissor, Night Slash, Aerial Ace!)." },
      { name: "Sheer Force", rate: "3.6%", desc: "Boosts moves with secondary effects." }
    ],
    items: [
      { name: "Focus Sash", rate: "54.0%", desc: "Guarantees landing Stone Axe and setting hazards." },
      { name: "Choice Scarf", rate: "24.5%", desc: "Outspeeds threats to set immediate hazards." },
      { name: "Life Orb", rate: "14.0%", desc: "Massive Sharpness boosted damage." },
      { name: "Assault Vest", rate: "7.5%", desc: "Specially defensive tank." }
    ],
    moves: [
      { name: "Stone Axe", type: "Rock", category: "Physical", power: 65, accuracy: 90, rate: "99.8%", desc: "Sharpness boosted to 97.5 BP; ALWAYS sets Stealth Rock on enemy side upon hitting!" },
      { name: "X-Scissor", type: "Bug", category: "Physical", power: 80, accuracy: 100, rate: "96.0%", desc: "Sharpness boosted Bug STAB (120 BP)." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "82.4%", desc: "Fighting coverage vs Steel and Rock." },
      { name: "Night Slash", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "68.0%", desc: "Sharpness boosted slicing attack with high crit ratio." }
    ],
    natures: [
      { name: "Jolly", rate: "68.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" },
      { name: "Adamant", rate: "32.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "92.0%", desc: "Fast Physical Hazard Lead" }
    ]
  },

  "kommo-o": {
    dexNumber: 784, generation: "Gen 7", role: "Clangorous Soul Omni-Boost Sweeper / Body Press Tank",
    baseStats: { hp: 75, atk: 110, def: 125, spa: 100, spd: 105, spe: 85, total: 600 },
    abilities: [
      { name: "Bulletproof", rate: "64.0%", desc: "Immunity to ball and bomb moves (Shadow Ball, Pyro Ball, Sludge Bomb, Focus Blast!)." },
      { name: "Overcoat", rate: "24.0%", desc: "Immunity to Spore and powder moves." },
      { name: "Soundproof", rate: "12.0%", desc: "Immunity to sound moves." }
    ],
    items: [
      { name: "Throat Spray", rate: "48.0%", desc: "+1 Sp. Atk on Clanging Scales sound move." },
      { name: "Leftovers", rate: "28.5%", desc: "Bulky recovery." },
      { name: "Life Orb", rate: "14.5%", desc: "Omni-boost offensive cleanup." },
      { name: "Sitrus Berry", rate: "9.0%", desc: "Heals after Clangorous Soul health cut." }
    ],
    moves: [
      { name: "Clangorous Soul", type: "Dragon", category: "Status", power: "-", accuracy: 100, rate: "84.0%", desc: "Cuts HP by 33% to raise ALL user stats (Atk, Def, SpA, SpD, Spe) by 1 stage!" },
      { name: "Clanging Scales", type: "Dragon", category: "Special", power: 110, accuracy: 100, rate: "82.5%", desc: "Sound-based Dragon STAB hitting both opponents; activates Throat Spray." },
      { name: "Body Press", type: "Fighting", category: "Physical", power: 80, accuracy: 100, rate: "78.4%", desc: "Uses 125 base Defense for heavy Fighting damage." },
      { name: "Drain Punch", type: "Fighting", category: "Physical", power: 75, accuracy: 100, rate: "64.0%", desc: "Fighting STAB recovering 50% damage dealt." }
    ],
    natures: [
      { name: "Timid", rate: "46.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack" },
      { name: "Modest", rate: "32.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack" },
      { name: "Impish", rate: "22.0%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 SpA / 252 Spe", rate: "54.0%", desc: "Clangorous Soul Special Sweeper" },
      { spread: "252 HP / 252 Def / 4 SpD", rate: "36.0%", desc: "Physically Defensive Tank" }
    ]
  },

  "lopunny": {
    dexNumber: 428, generation: "Gen 4", role: "Scrappy Mega Fake Out Pivot / High Jump Kick Sweeper",
    baseStats: { hp: 65, atk: 76, def: 84, spa: 54, spd: 96, spe: 105, total: 480 },
    abilities: [
      { name: "Limber", rate: "72.0%", desc: "Immunity to paralysis." },
      { name: "Scrappy", rate: "28.0%", desc: "Mega Ability allows Normal and Fighting moves to hit Ghost types!" }
    ],
    items: [
      { name: "Lopunnite Z", rate: "74.0%", desc: "Mega Stone granting 136 Attack and 135 Speed with Scrappy." },
      { name: "Lopunnite", rate: "21.5%", desc: "Standard Mega Stone." },
      { name: "Focus Sash", rate: "4.5%", desc: "Survives fatal hit." }
    ],
    moves: [
      { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "99.0%", desc: "+3 Priority flinch on turn 1 (hits Ghost types with Scrappy!)." },
      { name: "High Jump Kick", type: "Fighting", category: "Physical", power: 130, accuracy: 90, rate: "96.4%", desc: "Devastating 130 BP Fighting STAB hitting Ghosts." },
      { name: "Return", type: "Normal", category: "Physical", power: 102, accuracy: 100, rate: "88.0%", desc: "Unresisted Scrappy Normal STAB." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "74.5%", desc: "Pivots out to maintain momentum." }
    ],
    natures: [
      { name: "Jolly", rate: "94.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (135 Mega Speed tier)" }
    ],
    evSpreads: [
      { spread: "4 HP / 252 Atk / 252 Spe", rate: "96.0%", desc: "Blistering Fast Physical Sweeper" }
    ]
  }
};

const existing = JSON.parse(fs.readFileSync('src/pokemon_builds.json', 'utf8'));
const merged = { ...existing, ...BATCH_1 };
fs.writeFileSync('src/pokemon_builds.json', JSON.stringify(merged, null, 2), 'utf8');
console.log('BATCH 1 MERGED! Total entries now:', Object.keys(merged).length);
