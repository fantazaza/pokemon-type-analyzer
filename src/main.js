/**
 * main.js
 * Pokémon Battle Type Analyzer — Controller
 *
 * Tactical Battle Analyzer with:
 * - Hero Type Selector
 * - Centered Dual Radars (Defense & Attack)
 * - Single Unified Effectiveness Summary Strip (Weakness / Resistance / Immunity / Offense)
 * - Top 3 Threats & Top 3 Targets as 3 prominent clean cards
 * - Top 100 Meta Pokémon as a clean, tactical data table with real-time matchup tags and search filter
 * - 100% English interface with minimal, essential-only icon usage
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

// ── Meta Pokemon Data ──────────────────────────────────────────
let currentMetaMode = 'single';
let metaData = { single: [], double: [] };
let searchQuery = '';

// ── Boot ───────────────────────────────────────────────────────
function init() {
  radarDefense = new RadarChart('radar-defense', 'tooltip');
  radarAttack  = new RadarChart('radar-attack',  'tooltip');

  buildTypeButtons();
  initResetButton();
  initSearch();
  initMetaToggle();
  loadMetaPokemonData();

  requestAnimationFrame(() => {
    radarDefense._resize();
    radarAttack._resize();
  });
}

// ── Type Buttons ───────────────────────────────────────────────
function buildTypeButtons() {
  const g1 = document.getElementById('type1-grid');
  const g2 = document.getElementById('type2-grid');

  if (!g1 || !g2) return;
  g1.innerHTML = '';
  g2.innerHTML = '';

  TYPES.forEach(type => {
    const b1 = makeTypeBtn(type);
    b1.addEventListener('click', () => onType1Click(type));
    g1.appendChild(b1);
  });

  // Type 2: None option first
  const none = document.createElement('button');
  none.className = 'type-btn none-btn selected';
  none.id = 'type2-none';
  none.innerHTML = '<span class="type-btn-label">None</span>';
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
  btn.className = 'type-btn';
  btn.dataset.type = type;
  btn.style.setProperty('--btn-type-color', TYPE_COLORS[type]);
  btn.style.backgroundColor = TYPE_COLORS[type];
  btn.style.color = TYPE_TEXT[type] || '#fff';
  btn.setAttribute('aria-pressed', 'false');

  btn.innerHTML = `<span class="type-btn-label">${type}</span>`;
  return btn;
}

function onType1Click(type) {
  if (state.type1 === type) {
    return;
  }
  state.type1 = type;
  if (state.type2 === type) state.type2 = null;
  refresh();
}

function onType2Click(type) {
  state.type2 = (state.type2 === type) ? null : type;
  refresh();
}

function initResetButton() {
  const btn = document.getElementById('btn-reset-types');
  if (btn) {
    btn.addEventListener('click', () => {
      state.type1 = null;
      state.type2 = null;
      refresh();
    });
  }
}

// ── Refresh ────────────────────────────────────────────────────
function refresh() {
  syncButtonUI();
  updateSelectedDisplay();
  toggleContentArea();

  if (state.type1) {
    updateCharts();
  }

  // Update real-time matchup column in Meta table
  renderMetaTable();
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
  if (!display) return;

  if (!state.type1) {
    display.innerHTML = '<span class="placeholder-tag">Select types to begin analysis</span>';
    return;
  }

  const types = state.type2 ? [state.type1, state.type2] : [state.type1];
  display.innerHTML = types.map((t, i) => {
    const bg = TYPE_COLORS[t];
    const fg = TYPE_TEXT[t] || '#fff';
    return (i > 0 ? '<span class="preview-plus">+</span>' : '') +
      `<span class="sel-preview-badge" style="background:${bg};color:${fg}">
         ${t}
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

// ── Chart & Summary updates ─────────────────────────────────────
function updateCharts() {
  const defTypes = [state.type1, ...(state.type2 ? [state.type2] : [])];
  const atkTypes = defTypes;

  const defVals = buildDefenseChart(defTypes);
  const atkVals = buildAttackChart(atkTypes);

  // ── Defense radar ──
  radarDefense.setData(TYPES, [{
    label:     'Defense',
    rawValues: defVals,
    color:     '#f43f5e',
    fillColor: 'rgba(244,63,94,0.18)',
    isDefense: true,
  }]);

  // ── Attack radar ──
  radarAttack.setData(TYPES, [{
    label:     'Attack',
    rawValues: atkVals,
    color:     '#38bdf8',
    fillColor: 'rgba(56,189,248,0.18)',
    isDefense: false,
  }]);

  // Render the unified summary strip (Weakness / Resistance / Immunity / Offense)
  renderUnifiedSummaryStrip(defVals, atkVals);

  // Render Top 3 Threats & Targets
  updateMetaMatchups(defTypes, atkTypes);
}

// ── Unified Effectiveness Summary Strip ─────────────────────────
function renderUnifiedSummaryStrip(defVals, atkVals) {
  const container = document.getElementById('effectiveness-strip');
  if (!container) return;

  const defMap = groupByValue(defVals);
  const atkMap = groupByValue(atkVals);

  const weak4x = defMap[4] || [];
  const weak2x = defMap[2] || [];
  const totalWeak = weak4x.length + weak2x.length;

  const res025x = defMap[0.25] || [];
  const res05x  = defMap[0.5] || [];
  const totalRes = res025x.length + res05x.length;

  const immune0x = defMap[0] || [];
  const totalImmune = immune0x.length;

  const atk4x = atkMap[4] || [];
  const atk2x = atkMap[2] || [];
  const totalAtk = atk4x.length + atk2x.length;

  const renderBadge = (type) => {
    const bg = TYPE_COLORS[type] || '#64748b';
    const fg = TYPE_TEXT[type] || '#fff';
    return `<span class="summary-type-pill" style="background:${bg};color:${fg};">${type}</span>`;
  };

  const renderGroup = (multLabel, multClass, types) => {
    if (!types.length) return '';
    return `
      <div class="summary-mult-row">
        <span class="summary-mult-tag ${multClass}">${multLabel}</span>
        <div class="summary-pills-wrap">
          ${types.map(renderBadge).join('')}
        </div>
      </div>
    `;
  };

  container.innerHTML = `
    <div class="summary-unified-bar">
      <!-- WEAKNESS -->
      <div class="summary-section sec-weakness">
        <div class="summary-sec-header">
          <span class="summary-sec-title">Weakness</span>
          <span class="summary-sec-count count-weak">${totalWeak}</span>
        </div>
        <div class="summary-sec-body">
          ${totalWeak === 0 ? '<span class="summary-empty">No weaknesses</span>' : ''}
          ${renderGroup('4×', 'mult-4x', weak4x)}
          ${renderGroup('2×', 'mult-2x', weak2x)}
        </div>
      </div>

      <!-- RESISTANCE -->
      <div class="summary-section sec-resistance">
        <div class="summary-sec-header">
          <span class="summary-sec-title">Resistance</span>
          <span class="summary-sec-count count-resist">${totalRes}</span>
        </div>
        <div class="summary-sec-body">
          ${totalRes === 0 ? '<span class="summary-empty">No resistances</span>' : ''}
          ${renderGroup('¼×', 'mult-025x', res025x)}
          ${renderGroup('½×', 'mult-05x', res05x)}
        </div>
      </div>

      <!-- IMMUNITY -->
      <div class="summary-section sec-immunity">
        <div class="summary-sec-header">
          <span class="summary-sec-title">Immunity</span>
          <span class="summary-sec-count count-immune">${totalImmune}</span>
        </div>
        <div class="summary-sec-body">
          ${totalImmune === 0 ? '<span class="summary-empty">No immunities</span>' : ''}
          ${renderGroup('0×', 'mult-0x', immune0x)}
        </div>
      </div>

      <!-- SUPER EFFECTIVE -->
      <div class="summary-section sec-offense">
        <div class="summary-sec-header">
          <span class="summary-sec-title">Super Effective</span>
          <span class="summary-sec-count count-offense">${totalAtk}</span>
        </div>
        <div class="summary-sec-body">
          ${totalAtk === 0 ? '<span class="summary-empty">No targets</span>' : ''}
          ${renderGroup('4×', 'mult-atk-4x', atk4x)}
          ${renderGroup('2×', 'mult-atk-2x', atk2x)}
        </div>
      </div>
    </div>
  `;
}

function groupByValue(vals) {
  const map = {};
  vals.forEach((v, i) => {
    if (!map[v]) map[v] = [];
    map[v].push(TYPES[i]);
  });
  return map;
}

// ── Top 3 Threats & Top 3 Targets (Clean Big Cards) ─────────────
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

  renderBigCards('threat-grid', threats, 'threat');
  renderBigCards('target-grid', targets, 'target');
}

function renderBigCards(gridId, items, mode) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = '<div class="empty-matchup-msg">No Pokémon match criteria in current meta</div>';
    return;
  }

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  items.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = `big-matchup-card ${mode}-card`;

    const typeChips = item.pkmn.types.map(t => {
      const tCap = capitalize(t);
      const bg = TYPE_COLORS[tCap] || '#666';
      const fg = TYPE_TEXT[tCap] || '#fff';
      return `<span class="card-type-chip" style="background:${bg};color:${fg};">${tCap}</span>`;
    }).join('');

    const multClass = item.val >= 4 ? 'mult-4x' : 'mult-2x';
    const tagLabel = mode === 'threat' ? `DEALS ${item.val}×` : `TAKES ${item.val}×`;

    card.innerHTML = `
      <div class="card-top-bar">
        <span class="card-rank">#${item.pkmn.rank || idx + 1}</span>
        <span class="card-mult-badge ${multClass}">${tagLabel}</span>
      </div>
      <div class="card-artwork">
        <img src="${item.pkmn.image}" alt="${item.pkmn.originalName}" loading="lazy" />
      </div>
      <div class="card-info">
        <div class="card-name" title="${item.pkmn.originalName}">${item.pkmn.originalName}</div>
        <div class="card-types">${typeChips}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      selectPokemonTypes(item.pkmn);
    });

    grid.appendChild(card);
  });
}

// ── Top 100 Meta Pokémon Table ──────────────────────────────────
async function loadMetaPokemonData() {
  try {
    const [singleRes, doubleRes] = await Promise.all([
      fetch('/pokemon_data_single.json').catch(() => ({ ok: false })),
      fetch('/pokemon_data_double.json').catch(() => ({ ok: false }))
    ]);

    if (!singleRes.ok && !doubleRes.ok) {
      const oldRes = await fetch('/pokemon_data.json');
      metaData.double = await oldRes.json();
    } else {
      metaData.single = singleRes.ok ? await singleRes.json() : [];
      metaData.double = doubleRes.ok ? await doubleRes.json() : [];
    }

    // Attach rank property if not present
    ['single', 'double'].forEach(m => {
      if (Array.isArray(metaData[m])) {
        metaData[m].forEach((p, i) => { p.rank = i + 1; });
      }
    });

    renderMetaTable();
  } catch (err) {
    console.error("Failed to load meta pokemon:", err);
  }
}

function renderMetaTable() {
  const tbody = document.getElementById('pokemon-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  const pokemonList = metaData[currentMetaMode] || [];
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const q = searchQuery.trim().toLowerCase();
  const filtered = pokemonList.filter(p => {
    if (p.types[0] === 'unknown') return false;
    if (!q) return true;
    const nameMatch = p.originalName.toLowerCase().includes(q);
    const typeMatch = p.types.some(t => t.toLowerCase().includes(q));
    return nameMatch || typeMatch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="table-empty-row">No Pokémon found matching "${searchQuery}"</td></tr>`;
    return;
  }

  const defTypes = state.type1 ? [state.type1, ...(state.type2 ? [state.type2] : [])] : null;
  const atkTypes = defTypes;

  filtered.forEach(pkmn => {
    const tr = document.createElement('tr');
    tr.className = 'table-row-item';

    const typeChips = pkmn.types.map(t => {
      const tCap = capitalize(t);
      const bg = TYPE_COLORS[tCap] || '#666';
      const fg = TYPE_TEXT[tCap] || '#fff';
      return `<span class="table-type-pill" style="background:${bg};color:${fg};">${tCap}</span>`;
    }).join('');

    let matchupBadges = '';
    if (defTypes) {
      const pkmnDefTypes = pkmn.types.filter(t => t !== 'unknown').map(capitalize);

      let maxDmgFrom = 0;
      pkmn.types.forEach(t => {
        if (t === 'unknown') return;
        const dmg = getEffectiveness(capitalize(t), defTypes);
        if (dmg > maxDmgFrom) maxDmgFrom = dmg;
      });

      let maxDmgTo = 0;
      if (pkmnDefTypes.length > 0) {
        atkTypes.forEach(at => {
          const dmg = getEffectiveness(at, pkmnDefTypes);
          if (dmg > maxDmgTo) maxDmgTo = dmg;
        });
      }

      const tags = [];
      if (maxDmgFrom >= 4) {
        tags.push(`<span class="matchup-tag tag-threat mult-4x" title="Deals 4× damage to you">DEALS 4×</span>`);
      } else if (maxDmgFrom >= 2) {
        tags.push(`<span class="matchup-tag tag-threat" title="Deals 2× damage to you">DEALS 2×</span>`);
      } else if (maxDmgFrom === 0) {
        tags.push(`<span class="matchup-tag tag-immune" title="Deals 0× damage to you">DEALS 0×</span>`);
      }

      if (maxDmgTo >= 4) {
        tags.push(`<span class="matchup-tag tag-target mult-4x" title="Takes 4× damage from you">TAKES 4×</span>`);
      } else if (maxDmgTo >= 2) {
        tags.push(`<span class="matchup-tag tag-target" title="Takes 2× damage from you">TAKES 2×</span>`);
      }

      if (tags.length > 0) {
        matchupBadges = `<span class="matchup-tags-wrap">${tags.join('')}</span>`;
      }
    }

    tr.innerHTML = `
      <td class="td-rank">#${pkmn.rank || '-'}</td>
      <td class="td-pokemon">
        <div class="pokemon-meta-cell">
          <img src="${pkmn.image}" alt="${pkmn.originalName}" class="table-avatar" loading="lazy" />
          <div class="pkmn-name-types-group">
            <div class="pkmn-name-row">
              <span class="table-pkmn-name">${pkmn.originalName}</span>
              ${matchupBadges}
            </div>
            <div class="table-types-mobile">${typeChips}</div>
          </div>
        </div>
      </td>
      <td class="td-types">
        <div class="table-types-wrap">${typeChips}</div>
      </td>
    `;

    tr.addEventListener('click', () => {
      selectPokemonTypes(pkmn);
    });

    tbody.appendChild(tr);
  });
}

function selectPokemonTypes(pkmn) {
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const t1 = capitalize(pkmn.types[0]);
  const t2 = pkmn.types[1] ? capitalize(pkmn.types[1]) : null;

  state.type1 = t1;
  state.type2 = (t2 === t1) ? null : t2;

  refresh();

  const area = document.getElementById('content-area');
  if (area) {
    const y = area.getBoundingClientRect().top + window.scrollY - 30;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function initSearch() {
  const input = document.getElementById('pokemon-search');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderMetaTable();
  });
}

function initMetaToggle() {
  const btnSingle = document.getElementById('mode-single');
  const btnDouble = document.getElementById('mode-double');
  if (!btnSingle || !btnDouble) return;

  btnSingle.addEventListener('click', () => {
    currentMetaMode = 'single';
    btnSingle.classList.add('active');
    btnDouble.classList.remove('active');
    renderMetaTable();
    if (state.type1) updateCharts();
  });

  btnDouble.addEventListener('click', () => {
    currentMetaMode = 'double';
    btnDouble.classList.add('active');
    btnSingle.classList.remove('active');
    renderMetaTable();
    if (state.type1) updateCharts();
  });
}

// ── Run on DOM Ready ───────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
