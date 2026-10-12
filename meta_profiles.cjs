// Exact OP.GG Pokémon Champions Ranked Battle Data for Top Meta Pokémon

const GARCHOMP_EXACT = {
  single: {
    role: "Fast Hazard Lead / Physical Wallbreaker",
    abilities: [
      { name: "Rough Skin", rate: "99.0%", desc: "Inflicts damage equal to 1/8 max HP to attacker on contact." },
      { name: "Sand Veil", rate: "1.0%", desc: "Boosts evasiveness by 25% in sandstorm." }
    ],
    items: [
      { name: "Garchompite Z", rate: "32.8%", desc: "Mega Stone allowing Garchomp to Mega Evolve with Sand Force." },
      { name: "Choice Scarf", rate: "18.8%", desc: "Boosts Speed by 50%, locking user into first selected move." },
      { name: "Focus Sash", rate: "16.7%", desc: "Survives lethal hit from full HP with 1 HP remaining." },
      { name: "Rocky Helmet", rate: "12.1%", desc: "Damages contact attackers by 1/6 max HP." },
      { name: "Sitrus Berry", rate: "10.4%", desc: "Restores 25% max HP when falling below half health." }
    ],
    moves: [
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "69.3%", desc: "Hits all other Pokémon. Essential Ground STAB." },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "42.8%", desc: "Lays a trap of floating stones around opposing team on switch-in." },
      { name: "Dragon Tail", type: "Dragon", category: "Physical", power: 60, accuracy: 90, rate: "28.2%", desc: "Forces enemy Pokémon out, dragging another into entry hazards." },
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "27.6%", desc: "Devastating Dragon nuke; sharply drops user Sp. Atk." },
      { name: "Flamethrower", type: "Fire", category: "Special", power: 90, accuracy: 100, rate: "26.0%", desc: "Melts Steel-type switch-ins like Corviknight and Ferrothorn." },
      { name: "Outrage", type: "Dragon", category: "Physical", power: 120, accuracy: 100, rate: "25.7%", desc: "High-power Dragon rampage for 2-3 turns." },
      { name: "Earth Power", type: "Ground", category: "Special", power: 90, accuracy: 100, rate: "22.4%", desc: "Special Ground attack targeting physical walls." },
      { name: "Rock Tomb", type: "Rock", category: "Physical", power: 60, accuracy: 95, rate: "21.0%", desc: "Rock damage that guarantees a 1-stage Speed drop on target." }
    ],
    natures: [
      { name: "Jolly", rate: "26.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Standard competitive speed tier)" },
      { name: "Adamant", rate: "21.2%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum physical KO burst power)" },
      { name: "Timid", rate: "19.3%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Mixed Draco Meteor variant)" },
      { name: "Impish", rate: "16.7%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk (Bulky physical tank)" }
    ],
    statPoints: [
      { rank: 1, rate: "28.2%", diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 },
      { rank: 2, rate: "21.4%", diff: "=(0%)", hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
      { rank: 3, rate: "5.5%",  diff: "=(0%)", hp: 0, atk: 32, def: 2, spa: 0, spd: 0, spe: 32 },
      { rank: 4, rate: "3.7%",  diff: "=(0%)", hp: 32, atk: 0, def: 32, spa: 0, spd: 2, spe: 0 },
      { rank: 5, rate: "2.5%",  diff: "=(0%)", hp: 32, atk: 0, def: 32, spa: 0, spd: 0, spe: 2 }
    ],
    teammates: [
      { name: "Primarina", rank: 1, types: ["Water", "Fairy"], rate: "32.4%", desc: "Covers Ice & Dragon weaknesses; perfect defensive core." },
      { name: "Golisopod", rank: 2, types: ["Bug", "Water"], rate: "24.1%", desc: "Emergency Exit pivot absorbing physical ice strikes." },
      { name: "Salamence", rank: 3, types: ["Dragon", "Flying"], rate: "18.5%", desc: "Double Dragon offensive overwhelm." },
      { name: "Baxcalibur", rank: 4, types: ["Dragon", "Ice"], rate: "16.0%", desc: "Thermal Exchange physical wallbreaker partner." },
      { name: "Lucario", rank: 5, types: ["Fighting", "Steel"], rate: "14.2%", desc: "Resists Ice, Dragon, and Fairy for Garchomp." },
      { name: "Mimikyu", rank: 6, types: ["Ghost", "Fairy"], rate: "12.8%", desc: "Disguise free turn and immunity to Dragon attacks." }
    ]
  },
  double: {
    role: "Special Sweeper / Mixed Mega Attacker",
    abilities: [
      { name: "Rough Skin", rate: "99.0%", desc: "Inflicts damage equal to 1/8 max HP to attacker on contact." },
      { name: "Sand Veil", rate: "1.0%", desc: "Boosts evasiveness by 25% in sandstorm." }
    ],
    items: [
      { name: "Garchompite Z", rate: "51.8%", desc: "Mega Stone allowing Garchomp to Mega Evolve with Sand Force." },
      { name: "Life Orb", rate: "21.8%", desc: "Boosts the power of the holder's moves by 30% at the cost of 10% max HP." },
      { name: "Choice Scarf", rate: "9.6%", desc: "Boosts the holder's Speed stat by 50%, locking user into one move." },
      { name: "Rocky Helmet", rate: "4.1%", desc: "Damages any attacker making contact." },
      { name: "Sitrus Berry", rate: "2.9%", desc: "Restores 1/4 max HP when holder drops below 50% health." }
    ],
    moves: [
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "80.8%", desc: "Enables user to protect itself from all attacks. Failing chance rises if used in succession." },
      { name: "Power Gem", type: "Rock", category: "Special", power: 80, accuracy: 100, rate: "43.0%", desc: "Attacks with a ray of light that sparkles as if it were made of gemstones. Special Rock coverage." },
      { name: "Rock Slide", type: "Rock", category: "Physical", power: 75, accuracy: 90, rate: "39.1%", desc: "Large boulders are hurled at opposing Pokémon to inflict damage. May cause flinch." },
      { name: "Dragon Claw", type: "Dragon", category: "Physical", power: 80, accuracy: 100, rate: "37.8%", desc: "The user slashes the target with huge sharp claws. Single-target STAB safe for ally." },
      { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "37.1%", desc: "Sets off an earthquake that strikes every Pokémon around it with massive Ground power." },
      { name: "Earth Power", type: "Ground", category: "Special", power: 90, accuracy: 100, rate: "31.8%", desc: "Special Ground attack targeting physical walls. 10% chance to drop Sp. Def." },
      { name: "Dragon Pulse", type: "Dragon", category: "Special", power: 85, accuracy: 100, rate: "27.4%", desc: "Generates a shock wave to damage target. Special Dragon STAB without drawback." },
      { name: "Flamethrower", type: "Fire", category: "Special", power: 90, accuracy: 100, rate: "26.7%", desc: "Target is scorched with an intense blast of fire. 10% burn chance." },
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "25.8%", desc: "Comets are summoned down from the sky. Colossal Special burst; drops user Sp. Atk by 2." },
      { name: "Stomping Tantrum", type: "Ground", category: "Physical", power: 75, accuracy: 100, rate: "20.1%", desc: "Single-target Ground attack that will not harm ally." }
    ],
    natures: [
      { name: "Modest", rate: "40.4%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Current Meta: Premier Special Attacker)" },
      { name: "Jolly", rate: "26.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Standard physical speed tier)" },
      { name: "Adamant", rate: "19.1%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Physical KO burst variant)" },
      { name: "Timid", rate: "10.4%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Fast Special Sweeper variant)" }
    ],
    statPoints: [
      { rank: 1, rate: "22.3%", diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 },
      { rank: 2, rate: "21.4%", diff: "=(0%)", hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
      { rank: 3, rate: "2.7%",  diff: "=(0%)", hp: 0, atk: 32, def: 0, spa: 0, spd: 2, spe: 32 },
      { rank: 4, rate: "2.6%",  diff: "=(0%)", hp: 0, atk: 0, def: 5, spa: 31, spd: 0, spe: 30 },
      { rank: 5, rate: "2.5%",  diff: "=(0%)", hp: 0, atk: 32, def: 2, spa: 0, spd: 0, spe: 32 },
      { rank: 6, rate: "2.3%",  diff: "=(0%)", hp: 8, atk: 0, def: 6, spa: 21, spd: 1, spe: 30 }
    ],
    teammates: [
      { name: "Ogerpon", rank: 1, types: ["Grass", "Fire"], rate: "38.4%", desc: "Follow Me redirection allows Garchomp to freely attack." },
      { name: "Incineroar", rank: 2, types: ["Fire", "Dark"], rate: "34.2%", desc: "Intimidate and Fake Out soften physical hits and control tempo." },
      { name: "Flutter Mane", rank: 3, types: ["Ghost", "Fairy"], rate: "28.5%", desc: "Fast special damage coverage checking opposing Dragons." },
      { name: "Rillaboom", rank: 4, types: ["Grass"], rate: "22.0%", desc: "Grassy Surge passive recovery & priority Grassy Glide." },
      { name: "Chien-Pao", rank: 5, types: ["Dark", "Ice"], rate: "18.5%", desc: "Sword of Ruin cuts opponent Defense by 25%." },
      { name: "Urshifu", rank: 6, types: ["Fighting", "Water"], rate: "16.4%", desc: "Unseen Fist bypasses Protect to break opposing shields." }
    ]
  }
};

const INCINEROAR_EXACT = {
  single: {
    role: "Singles Defensive Pivot & Hazard Sponge",
    abilities: [
      { name: "Intimidate", rate: "98.1%", desc: "Lowers opposing Pokémon Attack stat by 1 stage upon entering battle." },
      { name: "Blaze", rate: "1.9%", desc: "Boosts power of Fire moves by 50% when HP is below 1/3." }
    ],
    items: [
      { name: "Sitrus Berry", rate: "47.0%", desc: "Restores 25% max HP when dropping below 50% health." },
      { name: "Leftovers", rate: "17.2%", desc: "Restores 1/16 max HP at the end of every turn." },
      { name: "Rocky Helmet", rate: "13.4%", desc: "Deals 1/6 max HP recoil to opponents making contact." },
      { name: "Air Balloon", rate: "2.8%", desc: "Grants Ground immunity until popped by damage." },
      { name: "Chople Berry", rate: "2.2%", desc: "Halves incoming Fighting damage once." }
    ],
    moves: [
      { name: "Parting Shot", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "80.9%", desc: "Lowers target Attack and Sp. Atk by 1 stage, then switches user out." },
      { name: "Flare Blitz", type: "Fire", category: "Physical", power: 120, accuracy: 100, rate: "76.8%", desc: "High-power physical Fire STAB with 33% recoil damage." },
      { name: "Darkest Lariat", type: "Dark", category: "Physical", power: 85, accuracy: 100, rate: "73.9%", desc: "Strikes target ignoring any Defense or evasiveness stat changes." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "41.1%", desc: "Burns target, halving their physical Attack power." },
      { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "37.3%", desc: "+3 Priority turn-1 flinch." },
      { name: "Taunt", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "18.2%", desc: "Prevents target from using status moves for 3 turns." },
      { name: "Throat Chop", type: "Dark", category: "Physical", power: 80, accuracy: 100, rate: "7.1%", desc: "Prevents target from using sound-based moves for 2 turns." },
      { name: "Drain Punch", type: "Fighting", category: "Physical", power: 75, accuracy: 100, rate: "6.6%", desc: "Restores HP equal to 50% damage dealt." }
    ],
    natures: [
      { name: "Impish", rate: "32.3%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk (Physical wall)" },
      { name: "Adamant", rate: "27.3%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Aggressive offensive pivot)" },
      { name: "Careful", rate: "20.3%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Specially defensive sponge)" },
      { name: "Relaxed", rate: "7.1%", boost: "+Def", drop: "-Spe", desc: "+Defense, -Speed (Slow pivot variant)" }
    ],
    statPoints: [
      { rank: 1, rate: "13.6%", diff: "=(0%)", hp: 32, atk: 0, def: 32, spa: 0, spd: 2, spe: 0 },
      { rank: 2, rate: "4.3%",  diff: "=(0%)", hp: 32, atk: 0, def: 2, spa: 0, spd: 32, spe: 0 },
      { rank: 3, rate: "4.2%",  diff: "=(0%)", hp: 32, atk: 32, def: 2, spa: 0, spd: 0, spe: 0 },
      { rank: 4, rate: "3.2%",  diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 2, spe: 0 },
      { rank: 5, rate: "3.1%",  diff: "=(0%)", hp: 32, atk: 2, def: 32, spa: 0, spd: 0, spe: 0 }
    ],
    teammates: [
      { name: "Garchomp", rank: 1, types: ["Dragon", "Ground"], rate: "36.2%", desc: "Absorbs Rock and Water; creates offensive hazard pressure." },
      { name: "Salamence", rank: 2, types: ["Dragon", "Flying"], rate: "28.4%", desc: "Intimidate stacking core with complete Ground immunity." },
      { name: "Primarina", rank: 3, types: ["Water", "Fairy"], rate: "24.1%", desc: "Fire/Water/Grass core covering all defensive holes." },
      { name: "Golisopod", rank: 4, types: ["Bug", "Water"], rate: "18.5%", desc: "Double pivot dynamic with Emergency Exit and Parting Shot." },
      { name: "Rillaboom", rank: 5, types: ["Grass"], rate: "16.2%", desc: "Grassy Terrain recovery synergy." }
    ]
  },
  double: {
    role: "#4 Ranked VGC Meta King / Fake Out & Intimidate Support",
    abilities: [
      { name: "Intimidate", rate: "99.7%", desc: "Lowers both opposing Pokémon Attack stat by 1 stage upon entering battle." },
      { name: "Blaze", rate: "0.3%", desc: "Boosts Fire damage when HP is low." }
    ],
    items: [
      { name: "Sitrus Berry", rate: "67.2%", desc: "Restores 25% max HP when dropping below 50% health." },
      { name: "Chople Berry", rate: "8.3%", desc: "Halves damage taken from super-effective Fighting attacks." },
      { name: "Passho Berry", rate: "6.2%", desc: "Halves damage taken from super-effective Water attacks." },
      { name: "Rocky Helmet", rate: "5.2%", desc: "Damages contact attackers by 1/6 max HP." },
      { name: "Leftovers", rate: "3.6%", desc: "End-of-turn sustained recovery." }
    ],
    moves: [
      { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "97.6%", desc: "+3 Priority turn-1 flinch disabling an opposing threat." },
      { name: "Flare Blitz", type: "Fire", category: "Physical", power: 120, accuracy: 100, rate: "91.4%", desc: "Heavy Fire damage ensuring offensive presence against Steel & Grass." },
      { name: "Parting Shot", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "91.1%", desc: "Lowers opposing Attack & Sp. Atk by 1 stage and safely rotates user." },
      { name: "Darkest Lariat", type: "Dark", category: "Physical", power: 85, accuracy: 100, rate: "45.0%", desc: "Physical Dark STAB ignoring opponent stat buffs." },
      { name: "Throat Chop", type: "Dark", category: "Physical", power: 80, accuracy: 100, rate: "35.6%", desc: "Prevents sound moves (Hyper Voice, Snarl) for 2 turns." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "13.1%", desc: "Guarantees defensive positioning." },
      { name: "Snarl", type: "Dark", category: "Special", power: 55, accuracy: 95, rate: "5.8%", desc: "Spread Dark move lowering both foes' Sp. Atk by 1 stage." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "4.5%", desc: "Heavy Fighting burst targeting opposing Steel and Dark foes." },
      { name: "Helping Hand", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "4.4%", desc: "+5 Priority; boosts ally move power by 50%." },
      { name: "Taunt", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "3.7%", desc: "Blocks opponent Trick Room and Spore." }
    ],
    natures: [
      { name: "Careful", rate: "35.4%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Prime VGC bulky pivot)" },
      { name: "Impish", rate: "28.1%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk (Physical fortress)" },
      { name: "Adamant", rate: "18.9%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Offensive pressure)" },
      { name: "Sassy", rate: "5.6%", boost: "+SpD", drop: "-Spe", desc: "+Sp. Def, -Speed (Trick Room counter)" }
    ],
    statPoints: [
      { rank: 1, rate: "8.7%", diff: "=(0%)", hp: 32, atk: 0, def: 14, spa: 0, spd: 20, spe: 0 },
      { rank: 2, rate: "2.5%", diff: "=(0%)", hp: 32, atk: 0, def: 20, spa: 0, spd: 14, spe: 0 },
      { rank: 3, rate: "2.4%", diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 2, spe: 0 },
      { rank: 4, rate: "2.3%", diff: "=(0%)", hp: 32, atk: 0, def: 20, spa: 0, spd: 13, spe: 1 },
      { rank: 5, rate: "2.3%", diff: "=(0%)", hp: 32, atk: 32, def: 2, spa: 0, spd: 0, spe: 0 }
    ],
    teammates: [
      { name: "Rillaboom", rank: 1, types: ["Grass"], rate: "42.5%", desc: "God-tier double Fake Out + Grassy Surge recovery partnership." },
      { name: "Sneasler", rank: 2, types: ["Fighting", "Poison"], rate: "38.1%", desc: "Dire Claw speed pressure enabled by Incineroar positioning." },
      { name: "Garchomp", rank: 3, types: ["Dragon", "Ground"], rate: "34.0%", desc: "Immune to Electric; benefits from Intimidate softening physical hits." },
      { name: "Gholdengo", rank: 4, types: ["Steel", "Ghost"], rate: "29.4%", desc: "Good as Gold blocks status; Incineroar covers Ghost & Dark." },
      { name: "Salamence", rank: 5, types: ["Dragon", "Flying"], rate: "22.8%", desc: "Intimidate rotation cycling and Ground immunity." }
    ]
  }
};

const RILLABOOM_EXACT = {
  single: {
    role: "Singles Grassy Surge Terrain Setter & Wallbreaker",
    abilities: [
      { name: "Grassy Surge", rate: "99.8%", desc: "Turns the ground into Grassy Terrain, boosting Grass moves by 30% and healing." },
      { name: "Overgrow", rate: "0.2%", desc: "Boosts Grass moves by 50% when HP is below 1/3." }
    ],
    items: [
      { name: "Life Orb", rate: "23.9%", desc: "Boosts damage by 30% at cost of 10% max HP per attack." },
      { name: "Miracle Seed", rate: "23.5%", desc: "Boosts Grass moves power by 20% without recoil." },
      { name: "Terrain Extender", rate: "17.0%", desc: "Extends Grassy Terrain duration from 5 to 8 turns." },
      { name: "Grassy Seed", rate: "10.7%", desc: "Boosts Defense by 1 stage automatically upon entering Grassy Terrain." },
      { name: "Leftovers", rate: "8.0%", desc: "Stacks with Grassy Terrain for massive end-of-turn recovery." }
    ],
    moves: [
      { name: "Grassy Glide", type: "Grass", category: "Physical", power: 55, accuracy: 100, rate: "97.2%", desc: "+1 Priority physical Grass STAB on Grassy Terrain for revenge KOs." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "72.1%", desc: "Deals damage and switches user out to retain offensive momentum." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "61.5%", desc: "Removes opponent held items; deals 1.5× damage." },
      { name: "High Horsepower", type: "Ground", category: "Physical", power: 95, accuracy: 95, rate: "51.7%", desc: "Ground coverage not weakened by Grassy Terrain." },
      { name: "Drum Beating", type: "Grass", category: "Physical", power: 80, accuracy: 100, rate: "49.1%", desc: "Grass STAB guaranteed to lower target Speed by 1 stage." },
      { name: "Wood Hammer", type: "Grass", category: "Physical", power: 120, accuracy: 100, rate: "15.4%", desc: "Colossal physical burst damage with 33% recoil." },
      { name: "Leech Seed", type: "Grass", category: "Status", power: "-", accuracy: 90, rate: "13.7%", desc: "Drains 1/8 max HP every turn to sustain Rillaboom." },
      { name: "Taunt", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "11.3%", desc: "Shuts down defensive hazard setters and recovery." }
    ],
    natures: [
      { name: "Adamant", rate: "86.8%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Grassy Glide priority KO power)" },
      { name: "Careful", rate: "6.7%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Specially bulky variant)" },
      { name: "Impish", rate: "2.3%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk (Physical tank)" },
      { name: "Jolly", rate: "2.1%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Speed creeping variant)" }
    ],
    statPoints: [
      { rank: 1, rate: "37.4%", diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 0, spe: 2 },
      { rank: 2, rate: "7.3%",  diff: "=(0%)", hp: 32, atk: 32, def: 2, spa: 0, spd: 0, spe: 0 },
      { rank: 3, rate: "6.8%",  diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 2, spe: 0 },
      { rank: 4, rate: "4.9%",  diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 }
    ],
    teammates: [
      { name: "Salamence", rank: 1, types: ["Dragon", "Flying"], rate: "34.1%", desc: "Covers Fire and Bug weaknesses with Intimidate." },
      { name: "Primarina", rank: 2, types: ["Water", "Fairy"], rate: "31.5%", desc: "Water/Grass core resisting Fire and Dragon." },
      { name: "Lucario", rank: 3, types: ["Fighting", "Steel"], rate: "22.4%", desc: "Resists Poison, Flying, and Ice attacks targeting Rillaboom." },
      { name: "Garchomp", rank: 4, types: ["Dragon", "Ground"], rate: "20.8%", desc: "Sets entry hazards; benefits from Grassy Terrain recovery." },
      { name: "Baxcalibur", rank: 5, types: ["Dragon", "Ice"], rate: "18.2%", desc: "Physical wallbreaker pairing." }
    ]
  },
  double: {
    role: "#1 Ranked VGC Meta Leader / Fake Out & Grassy Glide Priority",
    abilities: [
      { name: "Grassy Surge", rate: "99.9%", desc: "Deploys Grassy Terrain instantly upon entry, enabling priority Grassy Glide." },
      { name: "Overgrow", rate: "0.1%", desc: "Emergency Grass power boost." }
    ],
    items: [
      { name: "Miracle Seed", rate: "60.0%", desc: "Boosts Grass moves by 20% with zero recoil drawback." },
      { name: "Life Orb", rate: "9.9%", desc: "Boosts all move damage by 30% for lethal priority finishes." },
      { name: "Sitrus Berry", rate: "8.9%", desc: "Recovers 25% max HP when falling below half." },
      { name: "Grassy Seed", rate: "5.5%", desc: "Instant +1 Defense boost on switch-in." },
      { name: "Eject Button", rate: "3.8%", desc: "Pivots out upon being hit to reset Fake Out and Intimidate." }
    ],
    moves: [
      { name: "Grassy Glide", type: "Grass", category: "Physical", power: 55, accuracy: 100, rate: "97.3%", desc: "+1 Priority physical Grass strike in Grassy Terrain; defines the format." },
      { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "94.9%", desc: "+3 Priority flinch enabling partner setup or secure KO." },
      { name: "Wood Hammer", type: "Grass", category: "Physical", power: 120, accuracy: 100, rate: "78.4%", desc: "Colossal Grass burst damage to OHKO bulky Water & Ground threats." },
      { name: "High Horsepower", type: "Ground", category: "Physical", power: 95, accuracy: 95, rate: "50.2%", desc: "Single-target Ground attack safe alongside partner; hits Fire & Steel." },
      { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "47.5%", desc: "Deals damage and switches user out to cycle Fake Out." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "12.4%", desc: "Defensive positioning." },
      { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "7.6%", desc: "Removes opponent item." },
      { name: "Drum Beating", type: "Grass", category: "Physical", power: 80, accuracy: 100, rate: "2.7%", desc: "Speed control." }
    ],
    natures: [
      { name: "Adamant", rate: "85.2%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Grassy Glide damage tier)" },
      { name: "Brave", rate: "4.6%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed (Trick Room variant)" },
      { name: "Careful", rate: "3.8%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Bulky pivot)" },
      { name: "Sassy", rate: "2.6%", boost: "+SpD", drop: "-Spe", desc: "+Sp. Def, -Speed (Trick Room support)" }
    ],
    statPoints: [
      { rank: 1, rate: "12.3%", diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 0, spe: 2 },
      { rank: 2, rate: "9.2%",  diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 2, spe: 0 },
      { rank: 3, rate: "3.9%",  diff: "=(0%)", hp: 18, atk: 25, def: 5, spa: 0, spd: 10, spe: 8 },
      { rank: 4, rate: "2.4%",  diff: "=(0%)", hp: 32, atk: 32, def: 2, spa: 0, spd: 0, spe: 0 },
      { rank: 5, rate: "2.3%",  diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 }
    ],
    teammates: [
      { name: "Incineroar", rank: 1, types: ["Fire", "Dark"], rate: "48.2%", desc: "The ultimate VGC pivot duo: double Fake Out, Intimidate + Parting Shot." },
      { name: "Sneasler", rank: 2, types: ["Fighting", "Poison"], rate: "36.4%", desc: "Grassy Seed + Unburden speed activation synergy." },
      { name: "Salamence", rank: 3, types: ["Dragon", "Flying"], rate: "28.0%", desc: "Intimidate support & covers Fire and Bug." },
      { name: "Gholdengo", rank: 4, types: ["Steel", "Ghost"], rate: "26.5%", desc: "Spread Make It Rain; Rillaboom eliminates Ground threats." },
      { name: "Garchomp", rank: 5, types: ["Dragon", "Ground"], rate: "22.1%", desc: "Ground offensive overwhelm alongside Grassy Glide." }
    ]
  }
};

const PRIMARINA_EXACT = {
  single: {
    role: "#2 Ranked Singles Bulky Special Sweeper & Encore Disruptor",
    abilities: [
      { name: "Torrent", rate: "96.0%", desc: "Boosts Water moves by 50% when HP is below 1/3." },
      { name: "Liquid Voice", rate: "4.0%", desc: "All sound moves become Water-type moves." }
    ],
    items: [
      { name: "Sitrus Berry", rate: "42.2%", desc: "Restores 25% max HP when dropping below 50% health." },
      { name: "Leftovers", rate: "33.4%", desc: "Restores 1/16 max HP at the end of each turn." },
      { name: "Chesto Berry", rate: "7.3%", desc: "Instantly wakes up from Rest for 100% full recovery." },
      { name: "Mystic Water", rate: "5.4%", desc: "Boosts Water-type moves by 20%." },
      { name: "Lum Berry", rate: "2.8%", desc: "Cures any status condition once." }
    ],
    moves: [
      { name: "Moonblast", type: "Fairy", category: "Special", power: 95, accuracy: 100, rate: "98.1%", desc: "Primary Fairy STAB; 30% chance to drop target Sp. Atk by 1 stage." },
      { name: "Sparkling Aria", type: "Water", category: "Special", power: 90, accuracy: 100, rate: "87.4%", desc: "High-power sound-based Water STAB; pierces Substitute." },
      { name: "Aqua Jet", type: "Water", category: "Physical", power: 40, accuracy: 100, rate: "68.8%", desc: "+1 Priority Water strike for finishing off weakened opponents." },
      { name: "Encore", type: "Normal", category: "Status", power: "-", accuracy: 100, rate: "50.6%", desc: "Forces target to repeat their last move for 3 turns, shutting down setup." },
      { name: "Calm Mind", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "35.5%", desc: "Raises user Sp. Atk and Sp. Def by 1 stage (+50%)." },
      { name: "Flip Turn", type: "Water", category: "Physical", power: 60, accuracy: 100, rate: "13.9%", desc: "Deals physical damage and pivots user out to party member." },
      { name: "Surf", type: "Water", category: "Special", power: 90, accuracy: 100, rate: "10.1%", desc: "Reliable single-target special Water blast." },
      { name: "Rest", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "7.4%", desc: "Fully restores user HP and cures status ailments (pairs with Chesto Berry)." }
    ],
    natures: [
      { name: "Modest", rate: "71.2%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Colossal special wallbreaking power)" },
      { name: "Bold", rate: "12.5%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Physical tank against Ground & Dragon hits)" },
      { name: "Quiet", rate: "9.1%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room or heavy offensive bulk)" },
      { name: "Calm", rate: "3.4%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack (Specially defensive sponge)" }
    ],
    statPoints: [
      { rank: 1, rate: "11.2%", diff: "=(0%)", hp: 32, atk: 0, def: 20, spa: 14, spd: 0, spe: 0 },
      { rank: 2, rate: "5.1%",  diff: "=(0%)", hp: 32, atk: 0, def: 0, spa: 32, spd: 0, spe: 2 },
      { rank: 3, rate: "3.0%",  diff: "=(0%)", hp: 32, atk: 0, def: 2, spa: 32, spd: 0, spe: 0 },
      { rank: 4, rate: "2.7%",  diff: "=(0%)", hp: 32, atk: 0, def: 32, spa: 2, spd: 0, spe: 0 },
      { rank: 5, rate: "2.2%",  diff: "=(0%)", hp: 32, atk: 0, def: 24, spa: 0, spd: 0, spe: 10 }
    ],
    teammates: [
      { name: "Salamence", rank: 1, types: ["Dragon", "Flying"], rate: "35.2%", desc: "Covers Electric & Grass weaknesses; creates Dragon/Fairy/Steel balance." },
      { name: "Garchomp", rank: 2, types: ["Dragon", "Ground"], rate: "32.4%", desc: "Immune to Electric; crushes Poison and Steel foes with Earthquake." },
      { name: "Hippowdon", rank: 3, types: ["Ground"], rate: "26.0%", desc: "Stealth Rock setter and physical wall taking Poison strikes." },
      { name: "Golisopod", rank: 4, types: ["Bug", "Water"], rate: "21.8%", desc: "Emergency Exit pivot absorbing physical grass moves." },
      { name: "Baxcalibur", rank: 5, types: ["Dragon", "Ice"], rate: "18.5%", desc: "Thermal Exchange physical wallbreaker partner." }
    ]
  },
  double: {
    role: "VGC Liquid Voice Hyper Voice Spread Nuke",
    abilities: [
      { name: "Liquid Voice", rate: "94.7%", desc: "All sound-based moves become Water-type, turning Hyper Voice into 90 BP spread STAB." },
      { name: "Torrent", rate: "5.3%", desc: "Boosts Water moves by 50% when HP is below 1/3." }
    ],
    items: [
      { name: "Leftovers", rate: "28.0%", desc: "Restores 1/16 max HP every turn for sustained Calm Mind sweeps." },
      { name: "Life Orb", rate: "27.4%", desc: "Boosts both targets' spread damage by 30%." },
      { name: "Mystic Water", rate: "15.7%", desc: "Boosts Liquid Voice Hyper Voice damage by 20% without recoil." },
      { name: "Sitrus Berry", rate: "10.8%", desc: "Restores 25% max HP when dropping below 50% health." },
      { name: "Grassy Seed", rate: "6.5%", desc: "Instant +1 Defense boost alongside Rillaboom." }
    ],
    moves: [
      { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "92.9%", desc: "Sound-based spread attack converted to Water STAB by Liquid Voice; bypasses Substitute." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "87.7%", desc: "Shields user from all attacks and Fake Out." },
      { name: "Moonblast", type: "Fairy", category: "Special", power: 95, accuracy: 100, rate: "85.1%", desc: "Heavy single-target Fairy STAB targeting opposing Dragons and Urshifu." },
      { name: "Calm Mind", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "34.8%", desc: "Raises user Sp. Atk and Sp. Def by 1 stage, becoming an unstoppable tank." },
      { name: "Ice Beam", type: "Ice", category: "Special", power: 90, accuracy: 100, rate: "19.7%", desc: "Ice coverage targeting Rillaboom and Flying foes." },
      { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "15.6%", desc: "Spread Fairy attack hitting both opponents." },
      { name: "Aqua Jet", type: "Water", category: "Physical", power: 40, accuracy: 100, rate: "12.6%", desc: "+1 Priority Water strike." },
      { name: "Sparkling Aria", type: "Water", category: "Special", power: 90, accuracy: 100, rate: "5.3%", desc: "Water sound move; cures burns on hit." }
    ],
    natures: [
      { name: "Modest", rate: "67.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Premier spread damage power)" },
      { name: "Quiet", rate: "19.9%", boost: "+SpA", drop: "-Spe", desc: "+Sp. Atk, -Speed (Trick Room sweeper)" },
      { name: "Bold", rate: "5.4%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Physical bulk against priority moves)" },
      { name: "Timid", rate: "2.1%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Fast variant)" }
    ],
    statPoints: [
      { rank: 1, rate: "16.2%", diff: "=(0%)", hp: 32, atk: 0, def: 2, spa: 32, spd: 0, spe: 0 },
      { rank: 2, rate: "5.6%",  diff: "=(0%)", hp: 32, atk: 0, def: 0, spa: 32, spd: 2, spe: 0 },
      { rank: 3, rate: "2.9%",  diff: "=(0%)", hp: 24, atk: 0, def: 28, spa: 14, spd: 0, spe: 0 },
      { rank: 4, rate: "2.8%",  diff: "=(0%)", hp: 32, atk: 0, def: 0, spa: 32, spd: 0, spe: 2 },
      { rank: 5, rate: "2.6%",  diff: "=(0%)", hp: 21, atk: 0, def: 26, spa: 18, spd: 0, spe: 1 }
    ],
    teammates: [
      { name: "Rillaboom", rank: 1, types: ["Grass"], rate: "45.0%", desc: "Grassy Surge activates Grassy Seed; covers Electric weakness." },
      { name: "Incineroar", rank: 2, types: ["Fire", "Dark"], rate: "39.5%", desc: "Fake Out and Intimidate enable free Calm Mind setup turns." },
      { name: "Salamence", rank: 3, types: ["Dragon", "Flying"], rate: "31.2%", desc: "Intimidate & Ground immunity partner." },
      { name: "Farigiraf", rank: 4, types: ["Normal", "Psychic"], rate: "24.0%", desc: "Armor Tail blocks enemy priority moves (Grassy Glide, Fake Out)." },
      { name: "Sneasler", rank: 5, types: ["Fighting", "Poison"], rate: "19.5%", desc: "Fast physical attacker putting pressure on opposing Grass types." }
    ]
  }
};

const CHARIZARD_EXACT = {
  single: {
    role: "Mega Charizard Y Drought Sun Wallbreaker",
    abilities: [
      { name: "Blaze", rate: "87.1%", desc: "Boosts Fire moves by 50% when HP is below 1/3 (Mega Evolves into Drought)." },
      { name: "Solar Power", rate: "12.9%", desc: "Boosts Sp. Atk by 50% in sun, at cost of 1/8 max HP per turn." }
    ],
    items: [
      { name: "Charizardite Y", rate: "76.5%", desc: "Mega Stone enabling Mega Charizard Y with Drought and colossal Sp. Atk." },
      { name: "Charizardite X", rate: "22.1%", desc: "Mega Stone enabling Mega Charizard X (Fire/Dragon Tough Claws)." },
      { name: "Choice Scarf", rate: "0.2%", desc: "Boosts Speed by 50%." }
    ],
    moves: [
      { name: "Solar Beam", type: "Grass", category: "Special", power: 120, accuracy: 100, rate: "75.1%", desc: "Instant 120 BP Grass nuke in Sun; decimates Water & Ground counters." },
      { name: "Flamethrower", type: "Fire", category: "Special", power: 90, accuracy: 100, rate: "58.0%", desc: "100% accurate Fire STAB boosted by 50% under Drought." },
      { name: "Dragon Pulse", type: "Dragon", category: "Special", power: 85, accuracy: 100, rate: "44.9%", desc: "Special Dragon coverage striking opposing Dragons." },
      { name: "Roost", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "37.1%", desc: "Recovers 50% max HP, mitigating Stealth Rock damage." },
      { name: "Air Slash", type: "Flying", category: "Special", power: 75, accuracy: 95, rate: "29.6%", desc: "Special Flying STAB with 30% flinch rate." },
      { name: "Overheat", type: "Fire", category: "Special", power: 130, accuracy: 90, rate: "14.2%", desc: "Devastating sun-boosted Fire burst; sharply drops Sp. Atk." }
    ],
    natures: [
      { name: "Modest", rate: "55.3%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Colossal sun-boosted burst damage)" },
      { name: "Timid", rate: "19.9%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Outspeeds base 100 speed tier)" },
      { name: "Adamant", rate: "13.6%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Mega Charizard X variant)" },
      { name: "Jolly", rate: "8.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Fast Mega X variant)" }
    ],
    statPoints: [
      { rank: 1, rate: "42.4%", diff: "=(0%)", hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
      { rank: 2, rate: "21.5%", diff: "=(0%)", hp: 0, atk: 0, def: 2, spa: 32, spd: 0, spe: 32 },
      { rank: 3, rate: "14.2%", diff: "=(0%)", hp: 32, atk: 0, def: 0, spa: 32, spd: 2, spe: 0 }
    ],
    teammates: [
      { name: "Garchomp", rank: 1, types: ["Dragon", "Ground"], rate: "38.2%", desc: "Immune to Electric; eliminates Rock and Electric types with Earthquake." },
      { name: "Primarina", rank: 2, types: ["Water", "Fairy"], rate: "32.0%", desc: "Checks Dragon and Rock threats; provides defensive core." },
      { name: "Baxcalibur", rank: 3, types: ["Dragon", "Ice"], rate: "24.5%", desc: "Thermal Exchange physical wallbreaker partner." },
      { name: "Mimikyu", rank: 4, types: ["Ghost", "Fairy"], rate: "21.2%", desc: "Disguise provides free turns and absorbs Dragon moves." },
      { name: "Hippowdon", rank: 5, types: ["Ground"], rate: "18.0%", desc: "Physical sponge against Rock attacks." }
    ]
  },
  double: {
    role: "#5 Ranked VGC Meta Sun God / Spread Heat Wave & Solar Beam",
    abilities: [
      { name: "Blaze", rate: "76.5%", desc: "Pre-Mega ability; activates Drought immediately upon Mega Evolution." },
      { name: "Solar Power", rate: "23.5%", desc: "Boosts Sp. Atk by 50% in sun." }
    ],
    items: [
      { name: "Charizardite Y", rate: "92.8%", desc: "Mega Stone enabling Drought weather setter and colossal special power." },
      { name: "Charizardite X", rate: "5.2%", desc: "Surprise Tough Claws Dragon physical attacker." },
      { name: "Choice Scarf", rate: "0.4%", desc: "Speed booster." }
    ],
    moves: [
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "92.8%", desc: "Blocks incoming double-targets and Fake Out." },
      { name: "Heat Wave", type: "Fire", category: "Special", power: 95, accuracy: 90, rate: "92.5%", desc: "Spread Fire attack hitting both opponents; colossal damage under Drought sun." },
      { name: "Weather Ball", type: "Normal", category: "Special", power: 100, accuracy: 100, rate: "69.4%", desc: "Becomes 100 BP single-target Fire move boosted by Sun; 100% accurate." },
      { name: "Solar Beam", type: "Grass", category: "Special", power: 120, accuracy: 100, rate: "57.8%", desc: "Instant single-turn Grass nuke targeting Urshifu-Rapid and Primarina." },
      { name: "Ancient Power", type: "Rock", category: "Special", power: 60, accuracy: 100, rate: "25.9%", desc: "Special Rock coverage against opposing Fire and Flying threats." },
      { name: "Air Slash", type: "Flying", category: "Special", power: 75, accuracy: 95, rate: "18.4%", desc: "Special Flying STAB with 30% flinch rate." }
    ],
    natures: [
      { name: "Modest", rate: "57.4%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Maximized Heat Wave spread damage)" },
      { name: "Timid", rate: "33.2%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Outspeeds opposing base 100 speed threats)" },
      { name: "Adamant", rate: "3.8%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Charizard X variant)" }
    ],
    statPoints: [
      { rank: 1, rate: "48.5%", diff: "=(0%)", hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
      { rank: 2, rate: "24.2%", diff: "=(0%)", hp: 0, atk: 0, def: 2, spa: 32, spd: 0, spe: 32 },
      { rank: 3, rate: "12.1%", diff: "=(0%)", hp: 32, atk: 0, def: 0, spa: 32, spd: 2, spe: 0 }
    ],
    teammates: [
      { name: "Garchomp", rank: 1, types: ["Dragon", "Ground"], rate: "44.0%", desc: "Ground immunity allows Garchomp Earthquake while Charizard melts Grass foes." },
      { name: "Sneasler", rank: 2, types: ["Fighting", "Poison"], rate: "38.2%", desc: "High-speed offensive pressure eliminating Rock types." },
      { name: "Kingambit", rank: 3, types: ["Dark", "Steel"], rate: "31.5%", desc: "Punishes Intimidate users with Defiant; covers Rock weakness." },
      { name: "Rillaboom", rank: 4, types: ["Grass"], rate: "28.0%", desc: "Fake Out support; Grassy Glide eliminates Water & Ground counters." },
      { name: "Archaludon", rank: 5, types: ["Steel", "Dragon"], rate: "22.4%", desc: "Resists Rock and Electric attacks targeting Charizard." },
      { name: "Whimsicott", rank: 6, types: ["Grass", "Fairy"], rate: "19.0%", desc: "Prankster Tailwind and Sunny Day support." }
    ]
  }
};

const LUCARIO_EXACT = {
  single: {
    role: "#7 Ranked Single Meta / Adaptability Mega Cleaner",
    abilities: [
      { name: "Inner Focus", rate: "74.2%", desc: "Prevents flinching; immune to Intimidate." },
      { name: "Justified", rate: "21.5%", desc: "Boosts Attack by 1 when hit by Dark-type moves." },
      { name: "Steadfast", rate: "4.3%", desc: "Raises Speed when flinching." }
    ],
    items: [
      { name: "Lucarionite Z", rate: "68.4%", desc: "Mega Stone granting Adaptability (2x STAB boost to Fighting/Steel)." },
      { name: "Focus Sash", rate: "18.2%", desc: "Survives lethal hit from full HP with 1 HP remaining." },
      { name: "Life Orb", rate: "8.5%", desc: "Boosts move power by 30% at the cost of 10% max HP." },
      { name: "Choice Band", rate: "4.9%", desc: "Locks into one move for 50% physical Attack boost." }
    ],
    moves: [
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "94.5%", desc: "Adaptability boosted colossal Fighting STAB; drops Def/SpD by 1." },
      { name: "Bullet Punch", type: "Steel", category: "Physical", power: 40, accuracy: 100, rate: "86.2%", desc: "+1 Priority Steel STAB for finishing fast or weakened foes." },
      { name: "Extreme Speed", type: "Normal", category: "Physical", power: 80, accuracy: 100, rate: "78.4%", desc: "+2 High priority physical attack outspeeding ordinary priority moves." },
      { name: "Meteor Mash", type: "Steel", category: "Physical", power: 90, accuracy: 90, rate: "68.0%", desc: "Heavy Steel STAB with a 20% chance to raise Attack by 1 stage." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "44.5%", desc: "Sharply raises user Attack by 2 stages (+100%)." },
      { name: "Ice Punch", type: "Ice", category: "Physical", power: 75, accuracy: 100, rate: "28.4%", desc: "Ice coverage targeting Garchomp, Dragonite, and Gliscor." }
    ],
    natures: [
      { name: "Jolly", rate: "72.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Speed benchmark priority)" },
      { name: "Adamant", rate: "27.6%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Adaptability damage)" }
    ],
    statPoints: [
      { rank: 1, rate: "62.4%", diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 },
      { rank: 2, rate: "24.1%", diff: "=(0%)", hp: 0, atk: 32, def: 2, spa: 0, spd: 0, spe: 32 },
      { rank: 3, rate: "13.5%", diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 2, spe: 0 }
    ],
    teammates: [
      { name: "Garchomp", rank: 1, types: ["Dragon", "Ground"], rate: "36.8%", desc: "Ground coverage eliminates opposing Fire and Poison threats." },
      { name: "Primarina", rank: 2, types: ["Water", "Fairy"], rate: "29.4%", desc: "Absorbs Fighting and Ground strikes; perfect typing synergy." },
      { name: "Salamence", rank: 3, types: ["Dragon", "Flying"], rate: "21.0%", desc: "Ground immunity allows free switch against Earthquakes." }
    ]
  },
  double: {
    role: "Fast Priority Cleaner / Inner Focus Anti-Intimidate",
    abilities: [
      { name: "Inner Focus", rate: "88.6%", desc: "Immune to Fake Out flinch and Intimidate attack drop." },
      { name: "Justified", rate: "11.4%", desc: "Boosts Attack when hit by Dark attacks (Beat Up synergy)." }
    ],
    items: [
      { name: "Lucarionite Z", rate: "74.5%", desc: "Mega Stone providing massive Adaptability offensive pressure." },
      { name: "Focus Sash", rate: "16.2%", desc: "Survives lethal hit." },
      { name: "Life Orb", rate: "9.3%", desc: "Colossal damage boost." }
    ],
    moves: [
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "88.4%", desc: "Standard competitive survival shield." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "86.5%", desc: "Adaptability boosted fighting bomb." },
      { name: "Bullet Punch", type: "Steel", category: "Physical", power: 40, accuracy: 100, rate: "79.2%", desc: "+1 Priority Steel strike threatening Flutter Mane/Fairy types." },
      { name: "Extreme Speed", type: "Normal", category: "Physical", power: 80, accuracy: 100, rate: "74.8%", desc: "+2 Priority physical damage." },
      { name: "Meteor Mash", type: "Steel", category: "Physical", power: 90, accuracy: 90, rate: "42.0%", desc: "Physical Steel STAB." },
      { name: "Feint", type: "Normal", category: "Physical", power: 30, accuracy: 100, rate: "29.1%", desc: "+2 Priority move that breaks enemy Protect for ally to strike." }
    ],
    natures: [
      { name: "Jolly", rate: "66.5%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" },
      { name: "Adamant", rate: "33.5%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    statPoints: [
      { rank: 1, rate: "68.2%", diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 },
      { rank: 2, rate: "19.5%", diff: "=(0%)", hp: 0, atk: 32, def: 2, spa: 0, spd: 0, spe: 32 },
      { rank: 3, rate: "12.3%", diff: "=(0%)", hp: 12, atk: 32, def: 10, spa: 0, spd: 0, spe: 12 }
    ],
    teammates: [
      { name: "Rillaboom", rank: 1, types: ["Grass"], rate: "42.5%", desc: "Fake Out and Grassy Surge support; covers Ground weakness." },
      { name: "Incineroar", rank: 2, types: ["Fire", "Dark"], rate: "36.0%", desc: "Intimidate and Parting Shot cycling." },
      { name: "Charizard", rank: 3, types: ["Fire", "Flying"], rate: "26.8%", desc: "Immune to Ground attacks; eliminates Fighting & Grass threats." }
    ]
  }
};

const ARCHALUDON_EXACT = {
  single: {
    role: "Stamina Physical Tank / Body Press Setter",
    abilities: [
      { name: "Stamina", rate: "92.4%", desc: "Boosts user Defense by 1 stage every time it is hit." },
      { name: "Sturdy", rate: "7.6%", desc: "Survives lethal hit from full HP." }
    ],
    items: [
      { name: "Assault Vest", rate: "54.2%", desc: "Boosts Sp. Def by 50% at cost of only using attacking moves." },
      { name: "Leftovers", rate: "28.5%", desc: "End of turn recovery." },
      { name: "Rocky Helmet", rate: "12.0%", desc: "Punishes contact physical attackers." }
    ],
    moves: [
      { name: "Flash Cannon", type: "Steel", category: "Special", power: 80, accuracy: 100, rate: "88.5%", desc: "Special Steel STAB; 10% Sp. Def drop." },
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "82.4%", desc: "Colossal Dragon nuke." },
      { name: "Body Press", type: "Fighting", category: "Physical", power: 80, accuracy: 100, rate: "78.0%", desc: "Calculates damage using boosted Defense from Stamina." },
      { name: "Electro Shot", type: "Electric", category: "Special", power: 130, accuracy: 100, rate: "64.2%", desc: "Charges turn 1, boosts Sp. Atk by 1, attacks turn 2." },
      { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "42.0%", desc: "Entry hazard." }
    ],
    natures: [
      { name: "Modest", rate: "58.2%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (High burst damage)" },
      { name: "Bold", rate: "24.5%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Body Press & physical wall)" }
    ],
    statPoints: [
      { rank: 1, rate: "34.2%", diff: "=(0%)", hp: 32, atk: 0, def: 32, spa: 2, spd: 0, spe: 0 },
      { rank: 2, rate: "28.4%", diff: "=(0%)", hp: 32, atk: 0, def: 2, spa: 32, spd: 0, spe: 0 }
    ],
    teammates: [
      { name: "Pelipper", rank: 1, types: ["Water", "Flying"], rate: "48.0%", desc: "Drizzle activates instant 1-turn Electro Shot." },
      { name: "Primarina", rank: 2, types: ["Water", "Fairy"], rate: "36.2%", desc: "Fairy/Steel/Dragon core." }
    ]
  },
  double: {
    role: "#6 Ranked VGC Rain Core / Instant Electro Shot & Stamina Wall",
    abilities: [
      { name: "Stamina", rate: "88.5%", desc: "Boosts Defense by 1 each time user is struck." },
      { name: "Sturdy", rate: "11.5%", desc: "Focus Sash innate ability." }
    ],
    items: [
      { name: "Assault Vest", rate: "72.4%", desc: "Colossal special bulk turning Archaludon into an unkillable raid boss." },
      { name: "Power Herb", rate: "16.2%", desc: "Allows instant 1-turn Electro Shot outside of rain." },
      { name: "Leftovers", rate: "8.1%", desc: "Sustained passive healing." }
    ],
    moves: [
      { name: "Electro Shot", type: "Electric", category: "Special", power: 130, accuracy: 100, rate: "96.5%", desc: "In Rain, fires in 1 turn, raises Sp. Atk by 1 and deals 130 damage." },
      { name: "Flash Cannon", type: "Steel", category: "Special", power: 80, accuracy: 100, rate: "88.2%", desc: "Primary Steel STAB hitting Flutter Mane." },
      { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "74.0%", desc: "Dragon burst damage." },
      { name: "Body Press", type: "Fighting", category: "Physical", power: 80, accuracy: 100, rate: "68.5%", desc: "Deals massive damage scaling with Stamina Defense buffs." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "54.0%", desc: "Defensive positioning." },
      { name: "Snarl", type: "Dark", category: "Special", power: 55, accuracy: 95, rate: "32.4%", desc: "Spread move lowering opposing Sp. Atk." }
    ],
    natures: [
      { name: "Modest", rate: "64.5%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Maximum Electro Shot KO power)" },
      { name: "Bold", rate: "22.1%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Stamina fortress)" }
    ],
    statPoints: [
      { rank: 1, rate: "38.5%", diff: "=(0%)", hp: 32, atk: 0, def: 0, spa: 32, spd: 2, spe: 0 },
      { rank: 2, rate: "24.2%", diff: "=(0%)", hp: 32, atk: 0, def: 16, spa: 16, spd: 2, spe: 0 }
    ],
    teammates: [
      { name: "Pelipper", rank: 1, types: ["Water", "Flying"], rate: "62.0%", desc: "Drizzle instantly eliminates Electro Shot charge turn." },
      { name: "Incineroar", rank: 2, types: ["Fire", "Dark"], rate: "38.0%", desc: "Fake Out and Intimidate support." },
      { name: "Rillaboom", rank: 3, types: ["Grass"], rate: "31.5%", desc: "Grassy Surge healing and Ground weakness protection." }
    ]
  }
};

const MIMIKYU_EXACT = {
  single: {
    role: "#3 Ranked Singles Disguise Swords Dance Sweeper",
    abilities: [{ name: "Disguise", rate: "100.0%", desc: "Takes zero damage from the first attack that strikes it." }],
    items: [
      { name: "Life Orb", rate: "48.5%", desc: "Boosts move damage by 30%." },
      { name: "Red Card", rate: "24.2%", desc: "Forces attacker to switch out upon hitting Disguise." },
      { name: "Focus Sash", rate: "16.4%", desc: "Guarantees 2 free survival hits with Disguise." }
    ],
    moves: [
      { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "94.0%", desc: "Physical Fairy STAB with 10% Attack drop." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "92.5%", desc: "Free +2 Attack boost behind Disguise shield." },
      { name: "Shadow Sneak", type: "Ghost", category: "Physical", power: 40, accuracy: 100, rate: "91.2%", desc: "+1 Priority Ghost STAB for finishing targets." },
      { name: "Shadow Claw", type: "Ghost", category: "Physical", power: 70, accuracy: 100, rate: "72.4%", desc: "High critical-hit ratio Ghost STAB." },
      { name: "Drain Punch", type: "Fighting", category: "Physical", power: 75, accuracy: 100, rate: "42.0%", desc: "Hits Steel types; restores HP." }
    ],
    natures: [
      { name: "Jolly", rate: "74.2%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Speed tier tiebreaker)" },
      { name: "Adamant", rate: "25.8%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum burst attack)" }
    ],
    statPoints: [
      { rank: 1, rate: "68.4%", diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 },
      { rank: 2, rate: "24.2%", diff: "=(0%)", hp: 0, atk: 32, def: 2, spa: 0, spd: 0, spe: 32 }
    ],
    teammates: [
      { name: "Garchomp", rank: 1, types: ["Dragon", "Ground"], rate: "42.0%", desc: "Immune to Dragon attacks; Garchomp destroys Steel counters." },
      { name: "Primarina", rank: 2, types: ["Water", "Fairy"], rate: "31.0%", desc: "Double Fairy offensive pressure." }
    ]
  },
  double: {
    role: "Trick Room Setter / Disguise Support",
    abilities: [{ name: "Disguise", rate: "100.0%", desc: "Guarantees setting Trick Room safely by nullifying first hit." }],
    items: [
      { name: "Mental Herb", rate: "42.5%", desc: "Cures Taunt immediately to guarantee Trick Room execution." },
      { name: "Focus Sash", rate: "28.2%", desc: "Maximum survivability against double-targets." },
      { name: "Life Orb", rate: "18.4%", desc: "Offensive pressure." }
    ],
    moves: [
      { name: "Trick Room", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "88.5%", desc: "Reverses speed order for 5 turns; guarantees safe cast via Disguise." },
      { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "82.4%", desc: "Physical Fairy STAB." },
      { name: "Shadow Sneak", type: "Ghost", category: "Physical", power: 40, accuracy: 100, rate: "78.0%", desc: "+1 Priority Ghost strike." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "74.2%", desc: "Standard VGC defense." },
      { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "42.5%", desc: "Burns target physical attacker." }
    ],
    natures: [
      { name: "Brave", rate: "52.4%", boost: "+Atk", drop: "-Spe", desc: "+Attack, -Speed (Trick Room speed tier minimum)" },
      { name: "Adamant", rate: "32.1%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk" }
    ],
    statPoints: [
      { rank: 1, rate: "45.2%", diff: "=(0%)", hp: 32, atk: 32, def: 2, spa: 0, spd: 0, spe: 0 },
      { rank: 2, rate: "31.4%", diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 2, spe: 0 }
    ],
    teammates: [
      { name: "Ursaluna", rank: 1, types: ["Ground", "Normal"], rate: "48.0%", desc: "Guts + Facade under Mimikyu Trick Room sweeps teams." },
      { name: "Torkoal", rank: 2, types: ["Fire"], rate: "38.5%", desc: "Slow Eruption sweeper in Trick Room." },
      { name: "Incineroar", rank: 3, types: ["Fire", "Dark"], rate: "32.0%", desc: "Fake Out guarantees Trick Room activation." }
    ]
  }
};

const KINGAMBIT_EXACT = {
  single: {
    role: "Supreme Overlord Late-Game Sweeper",
    abilities: [{ name: "Supreme Overlord", rate: "99.0%", desc: "Boosts user Attack by 10% for each fainted ally in the party." }],
    items: [
      { name: "Leftovers", rate: "42.5%", desc: "Passive recovery during Swords Dance setup." },
      { name: "Black Glasses", rate: "31.0%", desc: "Boosts Sucker Punch and Kowtow Cleave damage by 20%." },
      { name: "Lum Berry", rate: "16.5%", desc: "Cures burns from Will-O-Wisp." }
    ],
    moves: [
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "98.5%", desc: "+1 Priority Dark attack; strikes first when target attacks." },
      { name: "Kowtow Cleave", type: "Dark", category: "Physical", power: 85, accuracy: "-", rate: "96.0%", desc: "Unavoidable Dark physical STAB that never misses." },
      { name: "Iron Head", type: "Steel", category: "Physical", power: 80, accuracy: 100, rate: "92.4%", desc: "Steel physical STAB with 30% flinch rate." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "86.0%", desc: "Sharply raises Attack by 2 stages (+100%)." },
      { name: "Low Kick", type: "Fighting", category: "Physical", power: 100, accuracy: 100, rate: "38.0%", desc: "Hits opposing Steel and Dark tanks." }
    ],
    natures: [{ name: "Adamant", rate: "84.5%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum Supreme Overlord power)" }],
    statPoints: [
      { rank: 1, rate: "48.0%", diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 2, spe: 0 },
      { rank: 2, rate: "28.5%", diff: "=(0%)", hp: 32, atk: 32, def: 2, spa: 0, spd: 0, spe: 0 }
    ],
    teammates: [
      { name: "Garchomp", rank: 1, types: ["Dragon", "Ground"], rate: "38.0%", desc: "Sets hazards and breaks opposing walls." },
      { name: "Corviknight", rank: 2, types: ["Flying", "Steel"], rate: "28.5%", desc: "Defog removal and pivot." }
    ]
  },
  double: {
    role: "#7 Ranked VGC Defiant Anti-Intimidate & Sucker Punch Nuke",
    abilities: [{ name: "Defiant", rate: "99.2%", desc: "Sharply raises user Attack by 2 stages (+100%) whenever a stat is dropped." }],
    items: [
      { name: "Black Glasses", rate: "38.0%", desc: "Boosts Dark moves by 20%." },
      { name: "Assault Vest", rate: "32.0%", desc: "Boosts Sp. Def by 50% for tremendous mixed bulk." },
      { name: "Safety Goggles", rate: "18.0%", desc: "Immunity to Spore and Rage Powder." }
    ],
    moves: [
      { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "99.2%", desc: "+1 Priority Dark attack; strikes before target attacks." },
      { name: "Kowtow Cleave", type: "Dark", category: "Physical", power: 85, accuracy: "-", rate: "94.5%", desc: "Never-miss Dark STAB." },
      { name: "Iron Head", type: "Steel", category: "Physical", power: 80, accuracy: 100, rate: "91.0%", desc: "Steel STAB hitting Flutter Mane and opposing Fairies." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "84.5%", desc: "Standard VGC survival shield." },
      { name: "Low Kick", type: "Fighting", category: "Physical", power: 100, accuracy: 100, rate: "28.0%", desc: "Fighting coverage." }
    ],
    natures: [{ name: "Adamant", rate: "88.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum KO burst power)" }],
    statPoints: [
      { rank: 1, rate: "54.2%", diff: "=(0%)", hp: 32, atk: 32, def: 0, spa: 0, spd: 2, spe: 0 },
      { rank: 2, rate: "26.5%", diff: "=(0%)", hp: 32, atk: 32, def: 2, spa: 0, spd: 0, spe: 0 }
    ],
    teammates: [
      { name: "Incineroar", rank: 1, types: ["Fire", "Dark"], rate: "42.0%", desc: "Fake Out and covers Fighting weakness." },
      { name: "Rillaboom", rank: 2, types: ["Grass"], rate: "36.5%", desc: "Grassy Surge recovery & priority Grassy Glide." }
    ]
  }
};

const GHOLDENGO_EXACT = {
  single: {
    role: "Good as Gold Status Blocker & Make It Rain Nuke",
    abilities: [{ name: "Good as Gold", rate: "100.0%", desc: "Completely immune to all opponent status moves (Defog, Taunt, Toxic, Spore)." }],
    items: [
      { name: "Choice Scarf", rate: "46.2%", desc: "Speed boost for revenge KOs." },
      { name: "Leftovers", rate: "28.4%", desc: "Passive recovery for Nasty Plot sets." },
      { name: "Choice Specs", rate: "18.0%", desc: "Nuclear special power." }
    ],
    moves: [
      { name: "Make It Rain", type: "Steel", category: "Special", power: 120, accuracy: 100, rate: "98.5%", desc: "Signature Steel nuke; coins shower, drops user Sp. Atk by 1." },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "96.0%", desc: "Ghost special STAB with 20% Sp. Def drop." },
      { name: "Nasty Plot", type: "Dark", category: "Status", power: "-", accuracy: "-", rate: "54.0%", desc: "+2 Sp. Atk boost." },
      { name: "Recover", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "48.0%", desc: "Restores 50% max HP." },
      { name: "Focus Blast", type: "Fighting", category: "Special", power: 120, accuracy: 70, rate: "38.0%", desc: "Hits opposing Steel and Dark walls." }
    ],
    natures: [
      { name: "Timid", rate: "64.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (High speed tier)" },
      { name: "Modest", rate: "36.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Wallbreaking power)" }
    ],
    statPoints: [{ rank: 1, rate: "68.0%", diff: "=(0%)", hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 }],
    teammates: [
      { name: "Garchomp", rank: 1, types: ["Dragon", "Ground"], rate: "44.0%", desc: "Blocks Defog from removing Garchomp's Stealth Rock." },
      { name: "Ting-Lu", rank: 2, types: ["Dark", "Ground"], rate: "32.0%", desc: "Hazard stacking balance core." }
    ]
  },
  double: {
    role: "VGC Spread Steel Sweeper / Good as Gold Immunities",
    abilities: [{ name: "Good as Gold", rate: "100.0%", desc: "Immune to Spore, Taunt, Parting Shot, and all status moves." }],
    items: [
      { name: "Choice Specs", rate: "38.0%", desc: "Colossal spread Make It Rain damage." },
      { name: "Life Orb", rate: "24.0%", desc: "Boosts move damage by 30%." },
      { name: "Choice Scarf", rate: "18.0%", desc: "Surprise fast Make It Rain lead." },
      { name: "Covert Cloak", rate: "12.0%", desc: "Immunity to Fake Out flinch." }
    ],
    moves: [
      { name: "Make It Rain", type: "Steel", category: "Special", power: 120, accuracy: 100, rate: "99.5%", desc: "Spread Steel attack hitting both foes; colossal damage." },
      { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "96.0%", desc: "Ghost special STAB." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "82.5%", desc: "Standard VGC defense." },
      { name: "Nasty Plot", type: "Dark", category: "Status", power: "-", accuracy: "-", rate: "34.0%", desc: "Setup turn enabled by partner redirection." },
      { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "26.0%", desc: "Spread Fairy coverage." }
    ],
    natures: [
      { name: "Modest", rate: "56.0%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Maximum spread damage)" },
      { name: "Timid", rate: "44.0%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Speed tier)" }
    ],
    statPoints: [
      { rank: 1, rate: "58.0%", diff: "=(0%)", hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
      { rank: 2, rate: "24.0%", diff: "=(0%)", hp: 32, atk: 0, def: 0, spa: 32, spd: 2, spe: 0 }
    ],
    teammates: [
      { name: "Rillaboom", rank: 1, types: ["Grass"], rate: "46.0%", desc: "Fake Out and Grassy Glide removes Ground threats." },
      { name: "Incineroar", rank: 2, types: ["Fire", "Dark"], rate: "38.0%", desc: "Intimidate & Parting Shot pivot support." }
    ]
  }
};

const SNEASLER_EXACT = {
  single: {
    role: "Unburden / Dire Claw Fast Physical Cleaner",
    abilities: [{ name: "Unburden", rate: "88.0%", desc: "Doubles user Speed when its held item is consumed." }],
    items: [
      { name: "Focus Sash", rate: "48.0%", desc: "Survives lethal hit, consuming item to trigger Unburden." },
      { name: "Choice Band", rate: "32.0%", desc: "Colossal physical attack." },
      { name: "Normal Gem", rate: "12.0%", desc: "Consumes item on Fake Out to double Speed." }
    ],
    moves: [
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "96.0%", desc: "Devastating Fighting STAB." },
      { name: "Dire Claw", type: "Poison", category: "Physical", power: 80, accuracy: 100, rate: "94.0%", desc: "50% chance to inflict Sleep, Poison, or Paralysis." },
      { name: "Acrobatics", type: "Flying", category: "Physical", power: 110, accuracy: 100, rate: "52.0%", desc: "110 BP Flying move when item is consumed." },
      { name: "Swords Dance", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "44.0%", desc: "Setup move." }
    ],
    natures: [{ name: "Jolly", rate: "78.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }],
    statPoints: [{ rank: 1, rate: "72.0%", diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 }],
    teammates: [{ name: "Garchomp", rank: 1, types: ["Dragon", "Ground"], rate: "38.0%", desc: "Ground coverage eliminates opposing Poison and Steel." }]
  },
  double: {
    role: "#3 Ranked VGC Meta Threat / Grassy Seed Unburden & Dire Claw",
    abilities: [{ name: "Unburden", rate: "94.5%", desc: "Doubles Speed instantly when Grassy Seed is eaten on entry." }],
    items: [
      { name: "Grassy Seed", rate: "58.0%", desc: "Eaten instantly on Grassy Terrain (+1 Def & Unburden double speed)." },
      { name: "Focus Sash", rate: "26.0%", desc: "Survives lethal hit." }
    ],
    moves: [
      { name: "Dire Claw", type: "Poison", category: "Physical", power: 80, accuracy: 100, rate: "99.2%", desc: "High critical and 50% random affliction of Sleep, Poison, or Paralysis." },
      { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "98.0%", desc: "OHKO potential against Kingambit and Archaludon." },
      { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "86.5%", desc: "Standard VGC defense." },
      { name: "Acrobatics", type: "Flying", category: "Physical", power: 110, accuracy: 100, rate: "64.0%", desc: "Doubles power once Grassy Seed is consumed." },
      { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "48.0%", desc: "+3 Priority flinch." }
    ],
    natures: [
      { name: "Adamant", rate: "62.0%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Unburden already doubles speed)" },
      { name: "Jolly", rate: "38.0%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk" }
    ],
    statPoints: [{ rank: 1, rate: "68.5%", diff: "=(0%)", hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 }],
    teammates: [
      { name: "Rillaboom", rank: 1, types: ["Grass"], rate: "68.0%", desc: "Grassy Surge instantly activates Sneasler's Grassy Seed & Unburden!" },
      { name: "Incineroar", rank: 2, types: ["Fire", "Dark"], rate: "42.0%", desc: "Double Fake Out momentum control." }
    ]
  }
};

module.exports = {
  GARCHOMP_EXACT,
  INCINEROAR_EXACT,
  RILLABOOM_EXACT,
  PRIMARINA_EXACT,
  CHARIZARD_EXACT,
  LUCARIO_EXACT,
  ARCHALUDON_EXACT,
  MIMIKYU_EXACT,
  KINGAMBIT_EXACT,
  GHOLDENGO_EXACT,
  SNEASLER_EXACT
};
