/**
 * pokemonBuilds.js
 * Competitive Pokémon build manager modeled after OP.GG Pokémon Champions.
 * Provides moves, items, abilities, natures, base stats, and EV spreads.
 */

import buildsData from './pokemon_builds.json';

const TYPE_MOVE_POOLS = {
  dragon: [
    { name: "Draco Meteor", type: "Dragon", category: "Special", power: 130, accuracy: 90, rate: "76.4%", desc: "Devastating burst damage; lowers user Sp. Atk by 2 stages." },
    { name: "Outrage", type: "Dragon", category: "Physical", power: 120, accuracy: 100, rate: "64.8%", desc: "Rampages for 2-3 turns then becomes confused." },
    { name: "Scale Shot", type: "Dragon", category: "Physical", power: 25, accuracy: 90, rate: "54.2%", desc: "Hits 2-5 times; raises Speed by 1 and lowers Defense by 1." },
    { name: "Dragon Claw", type: "Dragon", category: "Physical", power: 80, accuracy: 100, rate: "48.0%", desc: "Reliable STAB slashing move." }
  ],
  ground: [
    { name: "Earthquake", type: "Ground", category: "Physical", power: 100, accuracy: 100, rate: "84.5%", desc: "Standard Ground STAB hitting adjacent targets." },
    { name: "Earth Power", type: "Ground", category: "Special", power: 90, accuracy: 100, rate: "62.4%", desc: "Special Ground STAB; 10% chance to lower target Sp. Def." },
    { name: "Headlong Rush", type: "Ground", category: "Physical", power: 120, accuracy: 100, rate: "51.0%", desc: "High-power Ground rush; drops Defense and Sp. Def." }
  ],
  fire: [
    { name: "Flare Blitz", type: "Fire", category: "Physical", power: 120, accuracy: 100, rate: "78.2%", desc: "Colossal physical fire damage with 33% recoil." },
    { name: "Heat Wave", type: "Fire", category: "Special", power: 95, accuracy: 90, rate: "74.6%", desc: "Hits both opponents in doubles; 10% burn chance." },
    { name: "Flamethrower", type: "Fire", category: "Special", power: 90, accuracy: 100, rate: "68.0%", desc: "Consistent Fire damage with 10% burn rate." },
    { name: "Will-O-Wisp", type: "Fire", category: "Status", power: "-", accuracy: 85, rate: "44.5%", desc: "Burns target, halving their physical Attack power." }
  ],
  water: [
    { name: "Hydro Pump", type: "Water", category: "Special", power: 110, accuracy: 80, rate: "65.4%", desc: "Heavy single-target Water burst damage." },
    { name: "Surging Strikes", type: "Water", category: "Physical", power: 25, accuracy: 100, rate: "62.0%", desc: "Hits 3 times; always lands critical hits." },
    { name: "Aqua Jet", type: "Water", category: "Physical", power: 40, accuracy: 100, rate: "55.8%", desc: "+1 Priority Water move for revenge KOs." },
    { name: "Scald", type: "Water", category: "Special", power: 80, accuracy: 100, rate: "52.0%", desc: "Consistent Water damage with a high 30% burn chance." }
  ],
  electric: [
    { name: "Thunderbolt", type: "Electric", category: "Special", power: 90, accuracy: 100, rate: "82.1%", desc: "Standard Electric STAB; 10% paralysis chance." },
    { name: "Volt Switch", type: "Electric", category: "Special", power: 70, accuracy: 100, rate: "71.4%", desc: "Deals damage and immediately switches user out." },
    { name: "Wild Charge", type: "Electric", category: "Physical", power: 90, accuracy: 100, rate: "48.2%", desc: "Physical electric tackle dealing 25% recoil damage." }
  ],
  grass: [
    { name: "Grassy Glide", type: "Grass", category: "Physical", power: 55, accuracy: 100, rate: "84.2%", desc: "+1 Priority on Grassy Terrain." },
    { name: "Wood Hammer", type: "Grass", category: "Physical", power: 120, accuracy: 100, rate: "68.5%", desc: "Heavy Grass damage with 33% recoil." },
    { name: "Energy Ball", type: "Grass", category: "Special", power: 90, accuracy: 100, rate: "64.0%", desc: "Consistent Special Grass STAB; 10% chance to drop Sp. Def." },
    { name: "Spore", type: "Grass", category: "Status", power: "-", accuracy: 100, rate: "58.0%", desc: "Guaranteed 100% sleep infliction." }
  ],
  ice: [
    { name: "Ice Spinner", type: "Ice", category: "Physical", power: 80, accuracy: 100, rate: "76.4%", desc: "Deals Ice damage and destroys any active terrain." },
    { name: "Icicle Spear", type: "Ice", category: "Physical", power: 25, accuracy: 100, rate: "68.2%", desc: "Multi-hit Ice move hitting 2-5 times." },
    { name: "Freeze-Dry", type: "Ice", category: "Special", power: 70, accuracy: 100, rate: "64.0%", desc: "Deals super-effective 2× damage to Water types." },
    { name: "Icy Wind", type: "Ice", category: "Special", power: 55, accuracy: 95, rate: "52.0%", desc: "Hits both opponents and lowers their Speed by 1 stage." }
  ],
  fighting: [
    { name: "Close Combat", type: "Fighting", category: "Physical", power: 120, accuracy: 100, rate: "92.0%", desc: "High-power Fighting STAB; lowers user Def and Sp. Def." },
    { name: "Body Press", type: "Fighting", category: "Physical", power: 80, accuracy: 100, rate: "68.4%", desc: "Calculates damage using user's Defense stat." },
    { name: "Sacred Sword", type: "Fighting", category: "Physical", power: 90, accuracy: 100, rate: "54.0%", desc: "Ignores target's stat modifications." },
    { name: "Mach Punch", type: "Fighting", category: "Physical", power: 40, accuracy: 100, rate: "46.2%", desc: "+1 Priority Fighting punch." }
  ],
  poison: [
    { name: "Sludge Bomb", type: "Poison", category: "Special", power: 90, accuracy: 100, rate: "84.0%", desc: "Special Poison STAB with a 30% poison rate." },
    { name: "Dire Claw", type: "Poison", category: "Physical", power: 80, accuracy: 100, rate: "78.2%", desc: "50% chance to inflict Sleep, Poison, or Paralysis." },
    { name: "Gunk Shot", type: "Poison", category: "Physical", power: 120, accuracy: 80, rate: "52.4%", desc: "High-power physical poison projectile." }
  ],
  flying: [
    { name: "Brave Bird", type: "Flying", category: "Physical", power: 120, accuracy: 100, rate: "88.6%", desc: "Devastating Flying STAB with 33% recoil damage." },
    { name: "Bleakwind Storm", type: "Flying", category: "Special", power: 100, accuracy: 80, rate: "72.4%", desc: "Hits both foes in doubles; 20% speed drop." },
    { name: "Tailwind", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "64.0%", desc: "Doubles team Speed for 4 turns." },
    { name: "Roost", type: "Flying", category: "Status", power: "-", accuracy: "-", rate: "58.2%", desc: "Restores 50% max HP." }
  ],
  psychic: [
    { name: "Expanding Force", type: "Psychic", category: "Special", power: 80, accuracy: 100, rate: "86.5%", desc: "Powers up to 120 and hits all foes on Psychic Terrain." },
    { name: "Psychic", type: "Psychic", category: "Special", power: 90, accuracy: 100, rate: "74.0%", desc: "Standard Psychic STAB; 10% Sp. Def drop." },
    { name: "Trick Room", type: "Psychic", category: "Status", power: "-", accuracy: "-", rate: "68.2%", desc: "Inverts speed turn order for 5 turns." }
  ],
  bug: [
    { name: "U-turn", type: "Bug", category: "Physical", power: 70, accuracy: 100, rate: "92.4%", desc: "Deals damage and pivots user out." },
    { name: "Pollene Puff", type: "Bug", category: "Special", power: 90, accuracy: 100, rate: "84.0%", desc: "Damages foes or heals ally by 50% HP in doubles." },
    { name: "Quiver Dance", type: "Bug", category: "Status", power: "-", accuracy: "-", rate: "72.0%", desc: "Raises user's Sp. Atk, Sp. Def, and Speed by 1 stage." }
  ],
  rock: [
    { name: "Rock Slide", type: "Rock", category: "Physical", power: 75, accuracy: 90, rate: "86.4%", desc: "Hits both opponents in doubles with 30% flinch rate." },
    { name: "Power Gem", type: "Rock", category: "Special", power: 80, accuracy: 100, rate: "54.2%", desc: "Consistent Special Rock STAB." },
    { name: "Stealth Rock", type: "Rock", category: "Status", power: "-", accuracy: "-", rate: "68.0%", desc: "Entry hazard dealing damage on switch-in." }
  ],
  ghost: [
    { name: "Shadow Ball", type: "Ghost", category: "Special", power: 80, accuracy: 100, rate: "94.2%", desc: "Standard Ghost STAB with 20% Sp. Def drop." },
    { name: "Shadow Sneak", type: "Ghost", category: "Physical", power: 40, accuracy: 100, rate: "78.4%", desc: "+1 Priority Ghost physical attack." },
    { name: "Poltergeist", type: "Ghost", category: "Physical", power: 110, accuracy: 90, rate: "64.0%", desc: "Controls target's held item to deal immense damage." }
  ],
  dark: [
    { name: "Sucker Punch", type: "Dark", category: "Physical", power: 70, accuracy: 100, rate: "88.6%", desc: "+1 Priority Dark attack; hits before target attacks." },
    { name: "Knock Off", type: "Dark", category: "Physical", power: 65, accuracy: 100, rate: "82.4%", desc: "Removes target's held item and deals 1.5× damage." },
    { name: "Parting Shot", type: "Dark", category: "Status", power: "-", accuracy: 100, rate: "74.0%", desc: "Lowers foe Atk and Sp. Atk by 1 stage then pivots out." },
    { name: "Dark Pulse", type: "Dark", category: "Special", power: 80, accuracy: 100, rate: "62.0%", desc: "Special Dark STAB with 20% flinch chance." }
  ],
  steel: [
    { name: "Make It Rain", type: "Steel", category: "Special", power: 120, accuracy: 100, rate: "92.0%", desc: "Heavy Steel spread move; lowers Sp. Atk by 1." },
    { name: "Iron Head", type: "Steel", category: "Physical", power: 80, accuracy: 100, rate: "86.4%", desc: "Consistent physical Steel attack with 30% flinch rate." },
    { name: "Flash Cannon", type: "Steel", category: "Special", power: 80, accuracy: 100, rate: "72.0%", desc: "Standard special Steel attack." },
    { name: "Heavy Slam", type: "Steel", category: "Physical", power: 120, accuracy: 100, rate: "58.4%", desc: "Damage scales based on user weight relative to target." }
  ],
  fairy: [
    { name: "Moonblast", type: "Fairy", category: "Special", power: 95, accuracy: 100, rate: "96.2%", desc: "Premier Fairy STAB with 30% Sp. Atk drop." },
    { name: "Play Rough", type: "Fairy", category: "Physical", power: 90, accuracy: 90, rate: "88.0%", desc: "Premier physical Fairy STAB; 10% Atk drop." },
    { name: "Dazzling Gleam", type: "Fairy", category: "Special", power: 80, accuracy: 100, rate: "78.4%", desc: "Hits both opponents in doubles." }
  ],
  normal: [
    { name: "Fake Out", type: "Normal", category: "Physical", power: 40, accuracy: 100, rate: "88.5%", desc: "+3 Priority flinch on the user's first turn." },
    { name: "Extreme Speed", type: "Normal", category: "Physical", power: 80, accuracy: 100, rate: "84.2%", desc: "+2 Priority powerful physical attack." },
    { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "76.0%", desc: "Blocks all incoming damage and effects for 1 turn." },
    { name: "Hyper Voice", type: "Normal", category: "Special", power: 90, accuracy: 100, rate: "64.8%", desc: "Sound-based special attack hitting both targets." }
  ]
};

const UNIVERSAL_MOVES = [
  { name: "Protect", type: "Normal", category: "Status", power: "-", accuracy: "-", rate: "68.5%", desc: "Evades all incoming damage and effects for 1 turn." },
  { name: "Tera Blast", type: "Normal", category: "Special", power: 80, accuracy: 100, rate: "34.2%", desc: "Matches user's active Terastal type with physical/special scaling." }
];

const POPULAR_ITEMS = [
  { name: "Focus Sash", rate: "28.5%", desc: "Survives any single fatal hit with 1 HP when at 100% full health." },
  { name: "Choice Scarf", rate: "24.2%", desc: "Boosts Speed by 50%, locking user into the first move selected." },
  { name: "Assault Vest", rate: "21.6%", desc: "Raises Sp. Def by 50% but restricts usage of status moves." },
  { name: "Life Orb", rate: "18.4%", desc: "Boosts move damage by 30% at the cost of 10% max HP per attack." },
  { name: "Leftovers", rate: "15.8%", desc: "Restores 1/16 of max HP at the end of each turn." },
  { name: "Sitrus Berry", rate: "12.4%", desc: "Restores 25% max HP when dropping below 50% HP." },
  { name: "Choice Band", rate: "10.2%", desc: "Boosts Attack by 50%, locking user into one move." },
  { name: "Choice Specs", rate: "9.8%", desc: "Boosts Sp. Atk by 50%, locking user into one move." }
];

/**
 * Clean pokemon name key for lookup
 */
function cleanKey(name) {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

/**
 * Get comprehensive OP.GG competitive build profile
 * @param {Object} pkmn - Pokemon object from meta
 * @param {string} mode - 'single' | 'double'
 */
export function getPokemonBuild(pkmn, mode = 'single') {
  if (!pkmn) return null;

  const battleMode = (mode === 'double') ? 'double' : 'single';
  const key = cleanKey(pkmn.name || pkmn.originalName);
  const baseKey = key.split('-')[0];

  const entry = buildsData[key] || buildsData[baseKey];
  if (entry) {
    const modeData = entry[battleMode] || entry.single || entry.double || entry;
    return {
      dexNumber: entry.dexNumber,
      generation: entry.generation || "Competitive Meta",
      baseStats: entry.baseStats,
      role: modeData.role || entry.role || "Competitive Battler",
      moves: modeData.moves || entry.moves || [],
      items: (modeData.items || entry.items || []).slice(0, 3),
      abilities: modeData.abilities || entry.abilities || [],
      natures: modeData.natures || entry.natures || [],
      statPoints: (modeData.statPoints || []).slice(0, 3),
      teammates: (modeData.teammates || []).slice(0, 3),
      evSpreads: modeData.evSpreads || [],
      mode: battleMode,
      pokemon: pkmn,
      slug: key,
      isCurated: true,
      opggUrl: `https://op.gg/pokemon-champions/pokedex/${baseKey}`
    };
  }

  // 2. Dynamic generation for other Pokémon modeled after OP.GG
  const types = (pkmn.types || ['normal']).map(t => t.toLowerCase());
  const type1 = types[0] || 'normal';
  const type2 = types[1] || null;

  // Determine estimated base stats archetype
  const baseStats = estimateBaseStats(pkmn);

  // Compile recommended moves from type pools
  const moves = [];
  const addedMoveNames = new Set();

  function addPool(type) {
    const pool = TYPE_MOVE_POOLS[type] || [];
    pool.forEach(m => {
      if (!addedMoveNames.has(m.name) && moves.length < 6) {
        moves.push(m);
        addedMoveNames.add(m.name);
      }
    });
  }

  addPool(type1);
  if (type2) addPool(type2);
  UNIVERSAL_MOVES.forEach(m => {
    if (!addedMoveNames.has(m.name) && moves.length < 8) {
      moves.push(m);
      addedMoveNames.add(m.name);
    }
  });

  // Items - Top 3
  const items = POPULAR_ITEMS.slice(0, 3);

  // Abilities
  const abilities = [
    { name: `${capitalize(pkmn.originalName)} Trait`, rate: "88.5%", desc: "Primary competitive battle ability and battle utility." },
    { name: "Hidden Ability", rate: "11.5%", desc: "Alternative situational battle trait." }
  ];

  // Natures
  const isPhysical = baseStats.atk >= baseStats.spa;
  const natures = isPhysical ? [
    { name: "Jolly", rate: "52.4%", boost: "+Spe", drop: "-SpA", desc: "+Speed, -Sp. Atk (Optimal competitive speed tier)" },
    { name: "Adamant", rate: "34.8%", boost: "+Atk", drop: "-SpA", desc: "+Attack, -Sp. Atk (Maximum physical KO burst power)" },
    { name: "Impish", rate: "8.2%", boost: "+Def", drop: "-SpA", desc: "+Defense, -Sp. Atk (Bulky physical tank setup)" },
    { name: "Careful", rate: "4.6%", boost: "+SpD", drop: "-SpA", desc: "+Sp. Def, -Sp. Atk (Specially defensive balance)" }
  ] : [
    { name: "Timid", rate: "54.2%", boost: "+Spe", drop: "-Atk", desc: "+Speed, -Attack (Optimal competitive speed tier)" },
    { name: "Modest", rate: "32.6%", boost: "+SpA", drop: "-Atk", desc: "+Sp. Atk, -Attack (Maximum special wall-breaker power)" },
    { name: "Bold", rate: "8.4%", boost: "+Def", drop: "-Atk", desc: "+Defense, -Attack (Bulky special tank setup)" },
    { name: "Calm", rate: "4.8%", boost: "+SpD", drop: "-Atk", desc: "+Sp. Def, -Attack (Specially defensive sponge)" }
  ];

  // EV Spreads
  const evSpreads = isPhysical ? [
    { spread: "4 HP / 252 Atk / 252 Spe", rate: "62.4%", desc: "Standard Fast Physical Sweeper" },
    { spread: "252 HP / 252 Atk / 4 SpD", rate: "24.1%", desc: "Bulky Physical Attacker" },
    { spread: "252 HP / 252 Def / 4 Spe", rate: "13.5%", desc: "Physically Defensive Tank" }
  ] : [
    { spread: "4 HP / 252 SpA / 252 Spe", rate: "64.2%", desc: "Standard Fast Special Sweeper" },
    { spread: "252 HP / 252 SpA / 4 SpD", rate: "22.8%", desc: "Bulky Special Attacker" },
    { spread: "252 HP / 4 Def / 252 SpD", rate: "13.0%", desc: "Specially Defensive Wall" }
  ];

  return {
    pokemon: pkmn,
    slug: key,
    generation: "Competitive Meta",
    role: isPhysical ? "Physical Attacker" : "Special Attacker",
    baseStats,
    abilities,
    items,
    moves,
    natures,
    evSpreads,
    isCurated: false,
    opggUrl: `https://op.gg/pokemon-champions/pokedex/${baseKey}`
  };
}

function estimateBaseStats(pkmn) {
  // Balanced approximation baseline for meta Pokémon ~530 BST
  return {
    hp: 85,
    atk: 100,
    def: 85,
    spa: 95,
    spd: 85,
    spe: 90,
    total: 540
  };
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
