/**
 * typeData.js
 * Pokémon Gen VI+ type effectiveness chart (attacker → defender)
 * All 18 types, accurate to modern games.
 */

export const TYPES = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy',
];

/** Official Pokémon type colors */
export const TYPE_COLORS = {
  Normal:   '#A8A77A',
  Fire:     '#EE8130',
  Water:    '#6390F0',
  Electric: '#F7D02C',
  Grass:    '#7AC74C',
  Ice:      '#96D9D6',
  Fighting: '#C22E28',
  Poison:   '#A33EA1',
  Ground:   '#E2BF65',
  Flying:   '#A98FF3',
  Psychic:  '#F95587',
  Bug:      '#A6B91A',
  Rock:     '#B6A136',
  Ghost:    '#735797',
  Dragon:   '#6F35FC',
  Dark:     '#705746',
  Steel:    '#B7B7CE',
  Fairy:    '#D685AD',
};

/** Text colors that contrast against each type color */
export const TYPE_TEXT = {
  Normal:'#fff', Fire:'#fff', Water:'#fff', Electric:'#111',
  Grass:'#fff', Ice:'#111', Fighting:'#fff', Poison:'#fff',
  Ground:'#111', Flying:'#fff', Psychic:'#fff', Bug:'#fff',
  Rock:'#fff', Ghost:'#fff', Dragon:'#fff', Dark:'#fff',
  Steel:'#111', Fairy:'#fff',
};

/**
 * attackChart[attackingType][defendingType] = multiplier
 * Default (missing keys) = 1.0
 * Source: Bulbapedia Gen VI+ type chart
 */
const CHART = {
  Normal:   { Rock: 0.5, Ghost: 0,   Steel: 0.5 },
  Fire:     { Fire: 0.5, Water: 0.5, Grass: 2,   Ice: 2,  Bug: 2,  Rock: 0.5, Dragon: 0.5, Steel: 2 },
  Water:    { Fire: 2,   Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
  Electric: { Water: 2,  Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
  Grass:    { Fire: 0.5, Water: 2,   Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
  Ice:      { Fire: 0.5, Water: 0.5, Grass: 2,   Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
  Fighting: { Normal: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Ice: 2, Dark: 2, Steel: 2, Fairy: 0.5 },
  Poison:   { Grass: 2,  Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
  Ground:   { Fire: 2,   Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
  Flying:   { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
  Psychic:  { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
  Bug:      { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
  Rock:     { Fire: 2,   Ice: 2,  Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
  Ghost:    { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
  Dragon:   { Dragon: 2, Steel: 0.5, Fairy: 0 },
  Dark:     { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
  Steel:    { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
  Fairy:    { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 },
};

/**
 * Effectiveness of attackerType moves against a Pokémon with given defenderTypes
 */
export function getEffectiveness(attackerType, defenderTypes) {
  let mult = 1;
  const row = CHART[attackerType] || {};
  for (const def of defenderTypes) {
    mult *= (row[def] !== undefined ? row[def] : 1);
  }
  return mult;
}

/**
 * Defense chart: for each of 18 types as attacker, how much damage it deals to defenderTypes
 * Returns array of 18 multipliers in TYPES order
 */
export function buildDefenseChart(defenderTypes) {
  return TYPES.map(attacker => getEffectiveness(attacker, defenderTypes));
}

/**
 * Attack chart: for each of 18 types as defender, best effectiveness of attackerTypes moves
 * Returns array of 18 multipliers in TYPES order
 */
export function buildAttackChart(attackerTypes) {
  return TYPES.map(defender => {
    const vals = attackerTypes.map(at => getEffectiveness(at, [defender]));
    return Math.max(...vals);
  });
}

/** Human-readable status for defense multiplier */
export function defenseStatus(mult) {
  if (mult === 0)    return { label: 'Immunity',          cls: 's-immune' };
  if (mult === 0.25) return { label: '¼× Super Resist',   cls: 's-super-res' };
  if (mult === 0.5)  return { label: '½× Resistance',     cls: 's-resist' };
  if (mult === 1)    return { label: 'Neutral',            cls: 's-neutral' };
  if (mult === 2)    return { label: 'Weakness ×2',        cls: 's-weak' };
  return               { label: 'Super Weakness ×4',    cls: 's-super-weak' };
}

/** Human-readable status for attack multiplier */
export function attackStatus(mult) {
  if (mult === 0)    return { label: 'No Effect',          cls: 's-no-eff' };
  if (mult === 0.25) return { label: 'Barely Effective',   cls: 's-nve' };
  if (mult === 0.5)  return { label: 'Not Very Effective', cls: 's-nve' };
  if (mult === 1)    return { label: 'Normal Damage',      cls: 's-normal' };
  if (mult === 2)    return { label: 'Super Effective ×2', cls: 's-se' };
  return               { label: 'Super Effective ×4',   cls: 's-se4' };
}

/**
 * Format multiplier as display string
 */
export function fmtMult(v) {
  if (v === 0)    return '0×';
  if (v === 0.25) return '¼×';
  if (v === 0.5)  return '½×';
  if (v === 1)    return '1×';
  if (v === 2)    return '2×';
  if (v === 4)    return '4×';
  return `${v}×`;
}
