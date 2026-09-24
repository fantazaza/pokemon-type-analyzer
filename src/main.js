/**
 * main.js
 * Pokémon Type Matchup Analyzer — App Controller
 *
 * Two separate RadarChart instances:
 *  - radarDefense: แพ้ทาง (Defense, Damage Taken) — red polygon
 *  - radarAttack:  ชนะทาง (Attack, Damage Dealt)  — blue polygon
 */

import {
  TYPES, TYPE_COLORS, TYPE_TEXT,
  buildDefenseChart, buildAttackChart,
  getEffectiveness, fmtMult,
} from './typeData.js';
import { RadarChart } from './radarChart.js';

// ── App State ──────────────────────────────────────────────────
const state = {
  type1: null,
  type2: null,
};

let radarDefense;
let radarAttack;

// ── Boot ───────────────────────────────────────────────────────
function init() {
  radarDefense = new RadarChart('radar-defense', 'tooltip');
  radarAttack  = new RadarChart('radar-attack',  'tooltip');

  buildTypeButtons();

  requestAnimationFrame(() => {
    radarDefense._resize();
    radarAttack._resize();
  });
}

// ── Type Buttons ───────────────────────────────────────────────
function buildTypeButtons() {
  const g1 = document.getElementById('type1-grid');
  const g2 = document.getElementById('type2-grid');

  TYPES.forEach(type => {
    const b1 = makeTypeBtn(type);
    b1.addEventListener('click', () => onType1Click(type));
    g1.appendChild(b1);
  });

  // Type 2: None option first
  const none = document.createElement('button');
  none.className = 'type-btn none-btn selected';
  none.id = 'type2-none';
  none.textContent = 'None';
  none.setAttribute('aria-pressed', 'true');
  none.addEventListener('click', () => { state.type2 = null; refresh(); });
  g2.appendChild(none);

  TYPES.forEach(type => {
    const b2 = makeTypeBtn(type);
    b2.addEventListener('click', () => onType2Click(type));
    g2.appendChild(b2);
  });
}

function makeTypeBtn(type) {
  const btn = document.createElement('button');
  btn.className   = 'type-btn';
  btn.textContent = type;
  btn.dataset.type = type;
  btn.style.backgroundColor = TYPE_COLORS[type];
  btn.style.color           = TYPE_TEXT[type] || '#fff';
  btn.style.borderColor     = TYPE_COLORS[type];
  btn.setAttribute('aria-pressed', 'false');
  return btn;
}

function onType1Click(type) {
  if (state.type1 === type) return;
  state.type1 = type;
  if (state.type2 === type) state.type2 = null;
  refresh();
}

function onType2Click(type) {
  state.type2 = (state.type2 === type) ? null : type;
  refresh();
}

// ── Refresh ────────────────────────────────────────────────────
function refresh() {
  syncButtonUI();
  updateSelectedDisplay();
  toggleContentArea();
  if (state.type1) updateCharts();
}

// ── Sync button visual state ────────────────────────────────────
function syncButtonUI() {
  document.querySelectorAll('#type1-grid .type-btn').forEach(btn => {
    const sel = btn.dataset.type === state.type1;
    btn.classList.toggle('selected', sel);
    btn.setAttribute('aria-pressed', sel ? 'true' : 'false');
  });

  const noneBtn = document.getElementById('type2-none');
  if (noneBtn) {
    const selNone = !state.type2;
    noneBtn.classList.toggle('selected', selNone);
    noneBtn.setAttribute('aria-pressed', selNone ? 'true' : 'false');
  }

  document.querySelectorAll('#type2-grid .type-btn:not(.none-btn)').forEach(btn => {
    const type = btn.dataset.type;
    const sameAsT1 = type === state.type1;
    const sel = type === state.type2;
    btn.classList.toggle('selected', sel);
    btn.setAttribute('aria-pressed', sel ? 'true' : 'false');
    btn.disabled = sameAsT1;
  });
}

// ── Header display ──────────────────────────────────────────────
function updateSelectedDisplay() {
  const display = document.getElementById('selected-display');
  if (!state.type1) { display.innerHTML = ''; return; }

  const types = state.type2 ? [state.type1, state.type2] : [state.type1];
  display.innerHTML = types.map((t, i) => {
    const bg = TYPE_COLORS[t];
    const fg = TYPE_TEXT[t] || '#fff';
    return (i > 0 ? '<span class="sel-plus">+</span>' : '') +
      `<span class="sel-badge" style="background:${bg};color:${fg}">
         <span class="sel-dot"></span>${t}
       </span>`;
  }).join('');
}

// ── Show/hide content area ──────────────────────────────────────
function toggleContentArea() {
  const area  = document.getElementById('content-area');
  const empty = document.getElementById('empty-state');

  if (state.type1) {
    area.classList.remove('hidden');
    empty.classList.add('hidden');
    requestAnimationFrame(() => {
      radarDefense._resize();
      radarAttack._resize();
    });
  } else {
    area.classList.add('hidden');
    empty.classList.remove('hidden');
  }
}

// ── Chart updates ───────────────────────────────────────────────
function updateCharts() {
  const defTypes = [state.type1, ...(state.type2 ? [state.type2] : [])];
  const atkTypes = defTypes;

  const defVals = buildDefenseChart(defTypes);
  const atkVals = buildAttackChart(atkTypes);

  // ── Defense radar (แพ้ทาง) — label color by defense value ──
  radarDefense.setData(TYPES, [{
    label:     'Defense',
    rawValues: defVals,
    color:     '#f43f5e',
    fillColor: 'rgba(244,63,94,0.16)',
    isDefense: true,
  }]);

  // ── Attack radar (ชนะทาง) — label color by attack value ──
  radarAttack.setData(TYPES, [{
    label:     'Attack',
    rawValues: atkVals,
    color:     '#38bdf8',
    fillColor: 'rgba(56,189,248,0.14)',
    isDefense: false,
  }]);

  renderTable(defVals, atkVals);
  
  if (typeof updateMetaMatchups === 'function') {
    updateMetaMatchups(defTypes, atkTypes);
  }
}

// ── Type effectiveness tables ───────────────────────────────────
const DEF_GROUPS = [
  { id: 'def-4x',   val: 4,    title: '×4 Super Weakness', cls: 'm4x',   mLabel: '×4' },
  { id: 'def-2x',   val: 2,    title: '×2 Weakness',       cls: 'm2x',   mLabel: '×2' },
  { id: 'def-1x',   val: 1,    title: 'Neutral',            cls: 'm1x',   mLabel: '×1' },
  { id: 'def-05x',  val: 0.5,  title: '½× Resistance',     cls: 'm05x',  mLabel: '½×' },
  { id: 'def-025x', val: 0.25, title: '¼× Resistance',     cls: 'm025x', mLabel: '¼×' },
  { id: 'def-0x',   val: 0,    title: 'Immunity',           cls: 'm0x',   mLabel: '0×' },
];

const ATK_GROUPS = [
  { id: 'atk-4x',   val: 4,    title: '×4 Super Effective', cls: 'm4x',   mLabel: '×4' },
  { id: 'atk-2x',   val: 2,    title: '×2 Super Effective', cls: 'm2x',   mLabel: '×2' },
  { id: 'atk-1x',   val: 1,    title: 'Normal Damage',      cls: 'm1x',   mLabel: '×1' },
  { id: 'atk-05x',  val: 0.5,  title: '½× Not Very Eff.',   cls: 'm05x',  mLabel: '½×' },
  { id: 'atk-025x', val: 0.25, title: '¼× Barely Eff.',     cls: 'm025x', mLabel: '¼×' },
  { id: 'atk-0x',   val: 0,    title: 'No Effect',          cls: 'm0x',   mLabel: '0×' },
];

function renderTable(defVals, atkVals) {
  const defMap = groupByValue(defVals);
  const atkMap = groupByValue(atkVals);
  DEF_GROUPS.forEach(g => renderSection(g.id, g.title, g.cls, g.mLabel, defMap[g.val] || []));
  ATK_GROUPS.forEach(g => renderSection(g.id, g.title, g.cls, g.mLabel, atkMap[g.val] || []));
}

function groupByValue(vals) {
  const map = {};
  vals.forEach((v, i) => {
    if (!map[v]) map[v] = [];
    map[v].push(TYPES[i]);
  });
  return map;
}

function renderSection(id, title, multCls, multLabel, types) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!types.length) { el.innerHTML = ''; return; }

  const chips = types.map(t => {
    const bg = TYPE_COLORS[t];
    const fg = TYPE_TEXT[t] || '#fff';
    return `<span class="type-chip" style="background:${bg};color:${fg}">${t}</span>`;
  }).join('');

  el.innerHTML = `
    <div class="eff-hdr">
      <span class="eff-title">${title}</span>
      <span class="eff-mult ${multCls}">${multLabel}</span>
    </div>
    <div class="eff-chips">${chips}</div>
  `;
}

// ── Start ──────────────────────────────────────────────────────
init();

// ── Meta Pokemon Data ──────────────────────────────────────────
let currentMetaMode = 'double';
let metaData = { single: [], double: [] };

async function loadMetaPokemonData() {
  try {
    const [singleRes, doubleRes] = await Promise.all([
      fetch('/pokemon_data_single.json').catch(() => ({ json: () => [] })),
      fetch('/pokemon_data_double.json').catch(() => ({ json: () => [] }))
    ]);
    
    // Fallback to original pokemon_data.json if new files don't exist yet
    if (!singleRes.ok && !doubleRes.ok) {
        const oldRes = await fetch('/pokemon_data.json');
        metaData.double = await oldRes.json();
    } else {
        metaData.single = await singleRes.json();
        metaData.double = await doubleRes.json();
    }
    
    renderMetaPokemon();
  } catch (err) {
    console.error("Failed to load meta pokemon:", err);
  }
}

function renderMetaPokemon() {
  const grid = document.getElementById('pokemon-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const pokemonList = metaData[currentMetaMode] || [];
  
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  
  pokemonList.forEach((pkmn, index) => {
    if (pkmn.types[0] === 'unknown') return; 
    
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    const typeChips = pkmn.types.map(t => {
      const tCap = capitalize(t);
      const bg = TYPE_COLORS[tCap] || '#ccc';
      const fg = TYPE_TEXT[tCap] || '#fff';
      return `<span class="type-chip" style="background:${bg};color:${fg}">${tCap}</span>`;
    }).join('');
    
    card.innerHTML = `
      <div class="pokemon-rank">#${index + 1}</div>
      <div class="pokemon-img-container">
        <img src="${pkmn.image}" alt="${pkmn.originalName}" loading="lazy" />
      </div>
      <div class="pokemon-name">${pkmn.originalName}</div>
      <div class="pokemon-types">
        ${typeChips}
      </div>
    `;
    
    card.addEventListener('click', () => {
      const t1 = capitalize(pkmn.types[0]);
      const t2 = pkmn.types[1] ? capitalize(pkmn.types[1]) : null;
      
      state.type1 = t1;
      state.type2 = (t2 === t1) ? null : t2; 
      
      refresh();
      
      const area = document.getElementById('content-area');
      if (area) {
        const y = area.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
    
    grid.appendChild(card);
  });
}

function updateMetaMatchups(defTypes, atkTypes) {
  const container = document.getElementById('meta-matchups');
  if (!container) return;
  
  const pokemonList = metaData[currentMetaMode] || [];
  if (pokemonList.length === 0) {
    container.classList.add('hidden');
    return;
  }
  container.classList.remove('hidden');

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Top Threats: Max damage a meta pokemon can deal TO the selected types
  const threats = pokemonList.map(pkmn => {
    let maxDmg = 0;
    pkmn.types.forEach(t => {
      if (t === 'unknown') return;
      const dmg = getEffectiveness(capitalize(t), defTypes);
      if (dmg > maxDmg) maxDmg = dmg;
    });
    return { pkmn, val: maxDmg };
  }).filter(x => x.val >= 2).sort((a, b) => b.val - a.val).slice(0, 3);

  // Top Targets: Max damage the selected types can deal TO a meta pokemon
  const targets = pokemonList.map(pkmn => {
    let maxDmg = 0;
    const pkmnDefTypes = pkmn.types.filter(t => t !== 'unknown').map(capitalize);
    if (pkmnDefTypes.length === 0) return { pkmn, val: 0 };
    
    atkTypes.forEach(at => {
      const dmg = getEffectiveness(at, pkmnDefTypes);
      if (dmg > maxDmg) maxDmg = dmg;
    });
    return { pkmn, val: maxDmg };
  }).filter(x => x.val >= 2).sort((a, b) => b.val - a.val).slice(0, 3);

  renderMatchupGrid('threat-grid', threats);
  renderMatchupGrid('target-grid', targets);
}

function renderMatchupGrid(gridId, items) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  
  if (items.length === 0) {
    grid.innerHTML = '<div style="color: #a1a1aa; font-size: 0.9rem; grid-column: 1/-1; text-align: center; padding: 1rem;">ไม่มีตัวที่ตรงเงื่อนไข</div>';
    return;
  }
  
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.style.padding = '0.5rem';
    card.style.position = 'relative';
    
    const typeChips = item.pkmn.types.map(t => {
      const tCap = capitalize(t);
      const bg = TYPE_COLORS[tCap] || '#ccc';
      const fg = TYPE_TEXT[tCap] || '#fff';
      return `<span class="type-chip" style="background:${bg};color:${fg}; font-size: 0.65rem; padding: 2px 4px;">${tCap}</span>`;
    }).join('');
    
    let multColor = '#a1a1aa';
    if (item.val >= 4) multColor = '#f43f5e';
    else if (item.val >= 2) multColor = '#fb923c';
    
    card.innerHTML = `
      <div style="position: absolute; top: -6px; right: -6px; background: ${multColor}; color: #fff; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 99px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); z-index: 2; border: 2px solid #1f2937;">${item.val}x</div>
      <div class="pokemon-img-container" style="height: 60px;">
        <img src="${item.pkmn.image}" alt="${item.pkmn.originalName}" loading="lazy" style="max-height: 100%; object-fit: contain;" />
      </div>
      <div class="pokemon-name" style="font-size: 0.75rem; margin: 4px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.pkmn.originalName}</div>
      <div class="pokemon-types" style="gap: 4px;">
        ${typeChips}
      </div>
    `;
    grid.appendChild(card);
  });
}

function initMetaToggle() {
    const btnSingle = document.getElementById('mode-single');
    const btnDouble = document.getElementById('mode-double');
    if (!btnSingle || !btnDouble) return;

    const setActive = (btn) => {
        btn.classList.add('active');
        btn.style.background = 'rgba(255,255,255,0.15)';
        btn.style.color = '#fff';
        btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
    };

    const setInactive = (btn) => {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.color = '#a1a1aa';
        btn.style.boxShadow = 'none';
    };

    btnSingle.addEventListener('click', () => {
        currentMetaMode = 'single';
        setActive(btnSingle);
        setInactive(btnDouble);
        renderMetaPokemon();
        if (state.type1) refresh();
    });

    btnDouble.addEventListener('click', () => {
        currentMetaMode = 'double';
        setActive(btnDouble);
        setInactive(btnSingle);
        renderMetaPokemon();
        if (state.type1) refresh();
    });
}

initMetaToggle();
loadMetaPokemonData();
