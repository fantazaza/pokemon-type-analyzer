/**
 * main.js
 * TypeDex — Tactical Pokémon Battle Matchup & Meta Analyzer
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
import defaultMetaData from './meta.json';
import {
  getPokemonBuild, loadBuildsData, fetchPokemonFromPokeApi,
  getBuildsCount
} from './pokemonBuilds.js';
import {
  getCache, setCache, CACHE_KEYS
} from './cacheManager.js';

// ── App State ──────────────────────────────────────────────────
const state = {
  type1: null,
  type2: null,
  selectedPokemon: null,
  selectedPokemonData: null,
};

let radarDefense;
let radarAttack;

// ── Meta Pokemon Data ──────────────────────────────────────────
let currentMetaMode = 'single';
let metaData = { single: [], double: [] };
let searchQuery = '';
let currentModalPokemon = null;

// ── Boot ───────────────────────────────────────────────────────
function init() {
  radarDefense = new RadarChart('radar-defense', 'tooltip');
  radarAttack  = new RadarChart('radar-attack',  'tooltip');

  buildTypeButtons();
  initResetButton();
  initToggleTop100Button();
  initSearch();
  initMetaToggle();
  initSyncPatchButton();
  initModalHandlers();
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
  none.addEventListener('click', () => { 
    state.type2 = null; 
    state.selectedPokemon = null;
    state.selectedPokemonData = null;
    refresh(); 
  });
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
  state.selectedPokemon = null;
  state.selectedPokemonData = null;
  refresh();
}

function onType2Click(type) {
  state.type2 = (state.type2 === type) ? null : type;
  state.selectedPokemon = null;
  state.selectedPokemonData = null;
  refresh();
}

function initResetButton() {
  const btn = document.getElementById('btn-reset-types');
  if (btn) {
    btn.addEventListener('click', () => {
      state.type1 = null;
      state.type2 = null;
      state.selectedPokemon = null;
      state.selectedPokemonData = null;
      refresh();
    });
  }
}

function initToggleTop100Button() {
  const btn = document.getElementById('btn-toggle-meta');
  const section = document.getElementById('meta-table-section');
  const label = document.getElementById('toggle-meta-label');
  if (!btn || !section) return;

  const STORAGE_KEY = 'pokemon_analyzer_hide_top100';
  let isHidden = localStorage.getItem(STORAGE_KEY) === 'true';

  function applyState(hidden) {
    if (hidden) {
      section.classList.add('section-hidden');
      btn.classList.add('active-hidden');
      if (label) label.textContent = 'SHOW TOP 100';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      section.classList.remove('section-hidden');
      btn.classList.remove('active-hidden');
      if (label) label.textContent = 'HIDE TOP 100';
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  // Restore previous user preference
  applyState(isHidden);

  btn.addEventListener('click', () => {
    isHidden = !isHidden;
    localStorage.setItem(STORAGE_KEY, isHidden ? 'true' : 'false');
    applyState(isHidden);
  });
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
    display.innerHTML = '<span class="placeholder-tag">Select types or Pokémon to begin analysis</span>';
    return;
  }

  const types = state.type2 ? [state.type1, state.type2] : [state.type1];
  const typeBadges = types.map((t, i) => {
    const bg = TYPE_COLORS[t];
    const fg = TYPE_TEXT[t] || '#fff';
    return (i > 0 ? '<span class="preview-plus">+</span>' : '') +
      `<span class="sel-preview-badge" style="background:${bg};color:${fg}">
         ${t}
       </span>`;
  }).join('');

  const pkmnList = metaData[currentMetaMode] || [];
  const pkmn = state.selectedPokemonData || pkmnList.find(p => p.originalName === state.selectedPokemon);

  if (state.selectedPokemon && pkmn) {
    const rankVal = pkmn.rank || '-';
    display.innerHTML = `
      <div class="selected-showcase-chip">
        <div class="showcase-thumb-box" title="Click to view OP.GG Build">
          <img src="${pkmn.image}" alt="${pkmn.originalName}" class="showcase-thumb" />
          <span class="showcase-rank-tag">#${rankVal}</span>
        </div>
        <div class="showcase-body">
          <div class="showcase-title-row">
            <span class="showcase-pkmn-name">${pkmn.originalName}</span>
            <span class="showcase-meta-label">${currentMetaMode.toUpperCase()} META</span>
          </div>
          <div class="showcase-types-row">
            ${typeBadges}
            <button id="btn-showcase-build" class="btn-showcase-build" title="View OP.GG Build Profile">BUILD</button>
          </div>
        </div>
        <button id="btn-clear-selection" class="btn-showcase-clear" title="Clear selection" aria-label="Clear selection">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `;

    const buildBtn = document.getElementById('btn-showcase-build');
    if (buildBtn) {
      buildBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPokemonModal(pkmn);
      });
    }

    const thumbBox = display.querySelector('.showcase-thumb-box');
    if (thumbBox) {
      thumbBox.addEventListener('click', (e) => {
        e.stopPropagation();
        openPokemonModal(pkmn);
      });
    }

    const clearBtn = document.getElementById('btn-clear-selection');
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.type1 = null;
        state.type2 = null;
        state.selectedPokemon = null;
        state.selectedPokemonData = null;
        refresh();
      });
    }
  } else {
    display.innerHTML = `
      <div class="selected-custom-strip">
        <span class="custom-config-tag">CUSTOM CONFIG</span>
        <div class="custom-types-wrap">${typeBadges}</div>
        <button id="btn-clear-selection" class="btn-showcase-clear" title="Reset types" aria-label="Reset types">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `;
    const clearBtn = document.getElementById('btn-clear-selection');
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.type1 = null;
        state.type2 = null;
        state.selectedPokemon = null;
        state.selectedPokemonData = null;
        refresh();
      });
    }
  }
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

// ── Top 3 Threats, Top 3 Targets & Top 3 Partners (Clean Big Cards) ─────────────
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

  // Top Partners: Best defensive synergy & weakness coverage from current meta
  const weaknesses = TYPES.map(t => ({
    type: t,
    mult: getEffectiveness(t, defTypes)
  })).filter(x => x.mult >= 2);

  const partners = pokemonList
    .filter(pkmn => {
      if (state.selectedPokemon && pkmn.originalName === state.selectedPokemon) return false;
      const pTypes = pkmn.types.filter(t => t !== 'unknown').map(capitalize);
      if (pTypes.length === 0) return false;
      if (pTypes.length === defTypes.length && pTypes.every(t => defTypes.includes(t))) return false;
      return true;
    })
    .map(pkmn => {
      const pTypes = pkmn.types.filter(t => t !== 'unknown').map(capitalize);
      let score = 50;
      const covered = [];
      const shared = [];

      // Defensive cover for selected types' weaknesses
      weaknesses.forEach(w => {
        const pDmg = getEffectiveness(w.type, pTypes);
        if (pDmg === 0) {
          score += (w.mult >= 4 ? 35 : 25);
          covered.push({ type: w.type, mult: 0 });
        } else if (pDmg <= 0.5) {
          score += (w.mult >= 4 ? 25 : 18);
          covered.push({ type: w.type, mult: pDmg });
        } else if (pDmg >= 2) {
          score -= (w.mult >= 4 ? 35 : 22);
          shared.push(w.type);
        }
      });

      // Mutual protection (selected types protecting partner's weaknesses)
      TYPES.forEach(t => {
        const pDmg = getEffectiveness(t, pTypes);
        if (pDmg >= 2) {
          const sDmg = getEffectiveness(t, defTypes);
          if (sDmg === 0) score += 16;
          else if (sDmg <= 0.5) score += 10;
        }
      });

      // Bonus for 0 shared weaknesses
      if (shared.length === 0) score += 15;

      const synergyPct = Math.min(99, Math.max(45, Math.round(score)));
      let detailLabel = covered.length > 0 ? `Covers ${covered[0].type}` : (shared.length === 0 ? 'No shared weak' : 'Balanced Core');

      return {
        pkmn,
        val: synergyPct,
        tagLabel: `${synergyPct}% SYNERGY`,
        detailLabel,
        covered
      };
    })
    .sort((a, b) => b.val - a.val)
    .slice(0, 3);

  renderBigCards('threat-grid', threats, 'threat');
  renderBigCards('target-grid', targets, 'target');
  renderBigCards('partner-grid', partners, 'partner');
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

    let multClass = '';
    let tagLabel = '';

    if (mode === 'threat') {
      multClass = item.val >= 4 ? 'mult-4x' : 'mult-2x';
      tagLabel = `DEALS ${item.val}×`;
    } else if (mode === 'target') {
      multClass = item.val >= 4 ? 'mult-4x' : 'mult-2x';
      tagLabel = `TAKES ${item.val}×`;
    } else if (mode === 'partner') {
      multClass = 'mult-partner';
      tagLabel = item.detailLabel || 'Cover';
    }

    const rankVal = item.pkmn.rank || idx + 1;
    const rankClass = rankVal === 1 ? 'rank-gold' : (rankVal === 2 ? 'rank-silver' : (rankVal === 3 ? 'rank-bronze' : ''));
    const rankHtml = mode === 'partner' ? '' : `<span class="card-rank ${rankClass}">#${rankVal}</span>`;

    card.innerHTML = `
      <div class="card-top-bar ${mode === 'partner' ? 'card-top-bar-centered' : ''}">
        ${rankHtml}
        <span class="card-mult-badge ${multClass}">${tagLabel}</span>
      </div>
      <div class="card-artwork">
        <div class="card-artwork-aura aura-${mode}"></div>
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

// ── Top 100 Meta Pokémon Table & Patch Cache ───────────────────
async function loadMetaPokemonData(forceRefresh = false) {
  // 1. Try loading from IndexedDB first for instant UI response (< 1ms)
  if (!forceRefresh) {
    try {
      const cached = await getCache(CACHE_KEYS.META_DATA);
      if (cached && cached.data && (cached.data.single || cached.data.double)) {
        metaData.single = cached.data.single || [];
        metaData.double = cached.data.double || [];
        processAndRenderMeta();

        // If cache expired (older than 24h), fetch fresh patch data in background
        if (cached.isExpired) {
          performMetaUpdate(false).catch(() => {});
        }
        return;
      }
    } catch (e) {
      console.warn('[MetaCache] Cache read error:', e);
    }
  }

  // 2. Fresh synchronization
  await performMetaUpdate(forceRefresh);
}

// ── Tactical Toast Notification ────────────────────────────────
let toastTimer = null;
export function showTacticalToast(title, msg, type = 'success') {
  const toast = document.getElementById('tactical-toast');
  const titleEl = document.getElementById('toast-title');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !titleEl || !msgEl) return;

  titleEl.textContent = title;
  msgEl.textContent = msg;

  toast.className = `tactical-toast toast-${type}`;
  toast.classList.remove('hidden');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4200);
}

// ── Real Meta Synchronization & Update Engine ───────────────────
let isSyncInProgress = false;

export async function performMetaUpdate(isManual = false) {
  if (isSyncInProgress) return;
  isSyncInProgress = true;

  const syncBtn = document.getElementById('btn-sync-meta');
  const syncLabel = document.getElementById('sync-btn-label');
  if (syncBtn && syncLabel) {
    syncBtn.disabled = true;
    syncBtn.classList.add('syncing');
    syncBtn.classList.remove('success');
    syncLabel.textContent = 'UPDATING...';
  }

  let updateSuccess = false;
  let updateSource = 'local';
  const patchVer = 'Season M-8 (Nov 9, 2026 - OP.GG Ranked)';

  try {
    // 1. Fetch latest meta.json with cache buster
    const baseUrl = import.meta.env?.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const metaUrl = `${cleanBase}meta.json?t=${Date.now()}`;
    let fetchedData = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const res = await fetch(metaUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.single) && json.single.length > 0 && Array.isArray(json.double) && json.double.length > 0) {
          fetchedData = json;
          updateSource = 'server';
        }
      }
    } catch (netErr) {
      console.warn('[Sync] Network fetch error, using bundle baseline:', netErr);
    }

    if (!fetchedData) {
      fetchedData = {
        single: defaultMetaData.single || [],
        double: defaultMetaData.double || []
      };
      updateSource = 'bundle';
    }

    // Apply updated data
    metaData.single = fetchedData.single;
    metaData.double = fetchedData.double;

    // 2. Revalidate and refresh builds data
    await loadBuildsData(true);

    // 3. Cache into IndexedDB
    await setCache(CACHE_KEYS.META_DATA, fetchedData, 24 * 60 * 60 * 1000);
    const buildsCount = getBuildsCount();

    const patchInfo = {
      lastUpdated: Date.now(),
      version: patchVer,
      singleCount: metaData.single.length,
      doubleCount: metaData.double.length,
      buildsCount,
      source: updateSource
    };
    await setPatchInfo(patchInfo);

    updateSuccess = true;

    // 4. Re-render table with visual pulse animation
    processAndRenderMeta(true);

    // 5. If modal open, refresh it with updated data
    if (currentModalPokemon) {
      const refreshedBuild = getPokemonBuild(currentModalPokemon, currentModalMode);
      renderModalData(currentModalPokemon, currentModalMode, refreshedBuild);
    }

    // 6. User Toast Notification
    if (isManual) {
      showTacticalToast(
        'DATABASE UPDATED',
        `${metaData.single.length} Single • ${metaData.double.length} Double • ${buildsCount} Moveset Builds synchronized.`,
        'success'
      );
    }

  } catch (err) {
    console.error('[Sync] Fatal update error:', err);
    if (isManual) {
      showTacticalToast('UPDATE FAILED', 'Unable to complete sync. Check connection or fallback to local.', 'error');
    }
  } finally {
    isSyncInProgress = false;
    if (syncBtn && syncLabel) {
      syncBtn.disabled = false;
      syncBtn.classList.remove('syncing');

      if (updateSuccess) {
        syncBtn.classList.add('success');
        syncLabel.textContent = 'UPDATED ✓';
        setTimeout(() => {
          syncBtn.classList.remove('success');
          syncLabel.textContent = 'UPDATE DATA';
        }, 2500);
      } else {
        syncLabel.textContent = 'UPDATE DATA';
      }
    }
  }
}

function processAndRenderMeta(shouldPulse = false) {
  // Pre-index search fields and ensure rank property is present
  ['single', 'double'].forEach(m => {
    if (Array.isArray(metaData[m])) {
      metaData[m].forEach((p, i) => {
        if (!p.rank) p.rank = i + 1;
        p._searchName = p.originalName.toLowerCase();
        p._searchTypes = p.types.map(t => t.toLowerCase());
      });
    }
  });

  attachTableDelegation();
  renderMetaTable(shouldPulse);
}

function renderMetaTable(shouldPulse = false) {
  const tbody = document.getElementById('pokemon-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  const pokemonList = metaData[currentMetaMode] || [];
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const q = searchQuery.trim().toLowerCase();
  const filtered = pokemonList.filter(p => {
    if (p.types[0] === 'unknown') return false;
    if (!q) return true;
    const nameMatch = (p._searchName || p.originalName.toLowerCase()).includes(q);
    const typeMatch = (p._searchTypes || p.types).some(t => t.includes(q));
    return nameMatch || typeMatch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="table-empty-row">No Pokémon found matching "${searchQuery}"</td></tr>`;
    return;
  }

  const defTypes = state.type1 ? [state.type1, ...(state.type2 ? [state.type2] : [])] : null;
  const atkTypes = defTypes;

  const fragment = document.createDocumentFragment();

  filtered.forEach(pkmn => {
    const tr = document.createElement('tr');
    tr.className = shouldPulse ? 'table-row-item updated-pulse' : 'table-row-item';
    tr.dataset.pkmnName = pkmn.originalName;

    const isSelected = state.selectedPokemon === pkmn.originalName;
    if (isSelected) {
      tr.classList.add('row-selected');
    }

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

    const rankVal = pkmn.rank || '-';
    let rankHtml = `#${rankVal}`;
    if (rankVal === 1) {
      rankHtml = `<span class="table-rank-pill rank-gold">#1</span>`;
    } else if (rankVal === 2) {
      rankHtml = `<span class="table-rank-pill rank-silver">#2</span>`;
    } else if (rankVal === 3) {
      rankHtml = `<span class="table-rank-pill rank-bronze">#3</span>`;
    }

    const selectedIndicator = isSelected ? `<span class="badge-row-active">SELECTED</span>` : '';

    tr.innerHTML = `
      <td class="td-rank">${rankHtml}</td>
      <td class="td-pokemon">
        <div class="pokemon-meta-cell">
          <div class="table-avatar-wrap" data-action="build" title="Click to view OP.GG Build">
            <img src="${pkmn.image}" alt="${pkmn.originalName}" class="table-avatar" loading="lazy" />
          </div>
          <div class="pkmn-name-types-group">
            <div class="pkmn-name-row">
              <span class="table-pkmn-name">${pkmn.originalName}</span>
              ${selectedIndicator}
              ${matchupBadges}
            </div>
            <div class="table-types-mobile">${typeChips}</div>
          </div>
        </div>
      </td>
      <td class="td-types">
        <div class="table-types-wrap">${typeChips}</div>
      </td>
      <td class="td-build">
        <button class="table-btn-build" data-action="build" title="View OP.GG Build for ${pkmn.originalName}">BUILD</button>
      </td>
    `;

    fragment.appendChild(tr);
  });

  tbody.appendChild(fragment);
}

// Attach delegated listener on tbody once
let tableListenerAttached = false;
function attachTableDelegation() {
  const tbody = document.getElementById('pokemon-table-body');
  if (!tbody || tableListenerAttached) return;
  tableListenerAttached = true;

  tbody.addEventListener('click', (e) => {
    const tr = e.target.closest('.table-row-item');
    if (!tr) return;
    const pkmnName = tr.dataset.pkmnName;
    const pokemonList = metaData[currentMetaMode] || [];
    const pkmn = pokemonList.find(p => p.originalName === pkmnName);
    if (!pkmn) return;

    const buildActionEl = e.target.closest('[data-action="build"]');
    if (buildActionEl) {
      e.stopPropagation();
      openPokemonModal(pkmn, currentMetaMode);
    } else {
      selectPokemonTypes(pkmn);
    }
  });
}

function selectPokemonTypes(pkmn) {
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const t1 = capitalize(pkmn.types[0]);
  const t2 = pkmn.types[1] ? capitalize(pkmn.types[1]) : null;

  state.type1 = t1;
  state.type2 = (t2 === t1) ? null : t2;
  state.selectedPokemon = pkmn.originalName;
  state.selectedPokemonData = pkmn;

  refresh();

  const area = document.getElementById('content-area');
  if (area) {
    const y = area.getBoundingClientRect().top + window.scrollY - 30;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

let searchDebounceTimer = null;
function initSearch() {
  const input = document.getElementById('pokemon-search');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      renderMetaTable();
    }, 60);
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

function initSyncPatchButton() {
  const btnSync = document.getElementById('btn-sync-meta');
  if (!btnSync) return;

  btnSync.addEventListener('click', () => {
    performMetaUpdate(true);
  });
}

// ── Pokémon OP.GG Build Modal Logic ────────────────────────────
let currentModalMode = 'single';

function initModalHandlers() {
  const modal = document.getElementById('pokemon-build-modal');
  if (!modal) return;

  const btnClose = document.getElementById('modal-btn-close');
  const btnCloseFooter = document.getElementById('btn-modal-close-footer');
  const btnAnalyze = document.getElementById('btn-modal-select-analyzer');
  const btnFormatSingle = document.getElementById('modal-format-single');
  const btnFormatDouble = document.getElementById('modal-format-double');

  if (btnClose) btnClose.addEventListener('click', closePokemonModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener('click', closePokemonModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePokemonModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closePokemonModal();
    }
  });

  if (btnAnalyze) {
    btnAnalyze.addEventListener('click', () => {
      if (currentModalPokemon) {
        selectPokemonTypes(currentModalPokemon);
        closePokemonModal();
      }
    });
  }

  // Format Switcher inside Modal
  if (btnFormatSingle && btnFormatDouble) {
    btnFormatSingle.addEventListener('click', () => {
      if (currentModalMode === 'single') return;
      currentModalMode = 'single';
      btnFormatSingle.classList.add('active');
      btnFormatDouble.classList.remove('active');
      if (currentModalPokemon) renderModalData(currentModalPokemon, 'single');
    });

    btnFormatDouble.addEventListener('click', () => {
      if (currentModalMode === 'double') return;
      currentModalMode = 'double';
      btnFormatDouble.classList.add('active');
      btnFormatSingle.classList.remove('active');
      if (currentModalPokemon) renderModalData(currentModalPokemon, 'double');
    });
  }
}

export async function openPokemonModal(pkmn, mode = null) {
  if (!pkmn) return;
  currentModalPokemon = pkmn;
  currentModalMode = mode || currentMetaMode || 'single';

  const modal = document.getElementById('pokemon-build-modal');
  if (!modal) return;

  // Sync format buttons
  const btnFormatSingle = document.getElementById('modal-format-single');
  const btnFormatDouble = document.getElementById('modal-format-double');
  if (btnFormatSingle && btnFormatDouble) {
    if (currentModalMode === 'double') {
      btnFormatDouble.classList.add('active');
      btnFormatSingle.classList.remove('active');
    } else {
      btnFormatSingle.classList.add('active');
      btnFormatDouble.classList.remove('active');
    }
  }

  let build = getPokemonBuild(pkmn, currentModalMode);
  renderModalData(pkmn, currentModalMode, build);

  // Show modal
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Background Task: Ensure full builds are loaded OR fetch from PokeAPI if newly released
  (async () => {
    try {
      await loadBuildsData();
      build = getPokemonBuild(pkmn, currentModalMode);

      // If still not curated or missing in local DB, fetch real data from PokeAPI
      if (!build || !build.isCurated) {
        const apiBuild = await fetchPokemonFromPokeApi(pkmn, currentModalMode);
        if (apiBuild) {
          build = apiBuild;
        }
      }

      if (currentModalPokemon === pkmn && !modal.classList.contains('hidden')) {
        renderModalData(pkmn, currentModalMode, build);
      }
    } catch (err) {
      console.warn("Could not load enhanced build data:", err);
    }
  })();
}

// ── Held Item Sprite Resolver & Error Fallback ────────────────
function getItemSpriteUrl(itemName) {
  if (!itemName) return '';
  const clean = itemName.trim().toLowerCase();

  // Mega stone variants (e.g. "Garchompite Z" -> "garchompite")
  let baseName = clean.replace(/\s+z$/i, '');

  const overrideMap = {
    'charizardite x': 'charizardite-x',
    'charizardite y': 'charizardite-y',
    'mewtwonite x': 'mewtwonite-x',
    'mewtwonite y': 'mewtwonite-y',
  };

  if (overrideMap[clean]) {
    baseName = overrideMap[clean];
  }

  const slug = baseName
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${slug}.png`;
}

window.handleItemImgError = function(img, rawName) {
  if (!img) return;
  const cleanName = (rawName || '').trim().toLowerCase();
  const isMega = /ite\b|stone|mega/i.test(cleanName);

  if (!img.dataset.retryStage) {
    // Stage 1: Try Pokémon Showdown item icon
    img.dataset.retryStage = '1';
    const slugNoDash = cleanName
      .replace(/\s+z$/i, '')
      .replace(/[^a-z0-9]/g, '');
    img.src = `https://play.pokemonshowdown.com/sprites/itemicons/${slugNoDash}.png`;
  } else if (img.dataset.retryStage === '1') {
    // Stage 2: If mega stone, try generic Showdown megastone.png
    img.dataset.retryStage = '2';
    if (isMega) {
      img.src = 'https://play.pokemonshowdown.com/sprites/itemicons/megastone.png';
    } else {
      img.style.display = 'none';
      const box = img.closest('.item-icon-box');
      if (box) box.classList.add('item-icon-has-fallback');
    }
  } else {
    // Final fallback: hide image, reveal fallback badge
    img.style.display = 'none';
    const box = img.closest('.item-icon-box');
    if (box) box.classList.add('item-icon-has-fallback');
  }
};

function renderModalData(pkmn, mode, customBuild = null) {
  const modal = document.getElementById('pokemon-build-modal');
  if (!modal || !pkmn) return;

  const build = customBuild || getPokemonBuild(pkmn, mode);
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // 1. Header Info
  const avatarImg = document.getElementById('modal-pokemon-avatar');
  const nameEl = document.getElementById('modal-pokemon-name');
  const dexEl = document.getElementById('modal-pokemon-dex');
  const rankEl = document.getElementById('modal-pokemon-rank');
  const typesEl = document.getElementById('modal-pokemon-types');
  const opggLink = document.getElementById('modal-opgg-link');
  const pikalyticsLink = document.getElementById('modal-pikalytics-link');
  const smogonLink = document.getElementById('modal-smogon-link');
  const bstBadge = document.getElementById('modal-bst-badge');
  const movesSubtitle = document.getElementById('modal-moves-subtitle');

  if (avatarImg) {
    avatarImg.src = pkmn.image;
    avatarImg.alt = pkmn.originalName;
  }
  if (nameEl) nameEl.textContent = pkmn.originalName;
  if (dexEl) dexEl.textContent = `#${build.dexNumber || pkmn.rank || '---'}`;
  if (rankEl) rankEl.textContent = `#${pkmn.rank || '1'}`;
  if (bstBadge) bstBadge.textContent = `TOTAL BST: ${build.baseStats?.total || 530}`;
  if (movesSubtitle) {
    movesSubtitle.textContent = mode === 'double' ? 'Double Battle top moves (VGC Spread & Control)' : 'Single Battle top moves (1v1 Hazards & Setup)';
  }

  const slug = (pkmn.name || pkmn.originalName || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  if (opggLink) {
    opggLink.href = build.opggUrl || `https://op.gg/pokemon-champions/pokedex/${slug}`;
  }
  if (pikalyticsLink) {
    pikalyticsLink.href = `https://www.pikalytics.com/pokedex/gen9vgc2024regh/${slug}`;
  }
  if (smogonLink) {
    smogonLink.href = `https://www.smogon.com/dex/sv/pokemon/${slug}/`;
  }

  if (typesEl) {
    typesEl.innerHTML = pkmn.types.map(t => {
      const tCap = capitalize(t);
      const bg = TYPE_COLORS[tCap] || '#666';
      const fg = TYPE_TEXT[tCap] || '#fff';
      return `<span class="modal-type-chip" style="background:${bg};color:${fg};">${tCap}</span>`;
    }).join('');
  }

  // 2. Base Stats Bars
  const statsContainer = document.getElementById('modal-stats-container');
  if (statsContainer && build.baseStats) {
    const statsDef = [
      { key: 'hp',  label: 'HP',       color: '#10b981' },
      { key: 'atk', label: 'Attack',   color: '#f59e0b' },
      { key: 'def', label: 'Defense',  color: '#eab308' },
      { key: 'spa', label: 'Sp. Atk',  color: '#06b6d4' },
      { key: 'spd', label: 'Sp. Def',  color: '#3b82f6' },
      { key: 'spe', label: 'Speed',    color: '#ec4899' },
    ];

    statsContainer.innerHTML = statsDef.map(st => {
      const val = build.baseStats[st.key] || 0;
      const pct = Math.min(100, Math.round((val / 160) * 100));
      return `
        <div class="stat-bar-card">
          <div class="stat-card-top">
            <span class="stat-card-label">${st.label}</span>
            <span class="stat-card-val" style="color:${st.color};">${val}</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-fill" style="width:${pct}%;background:${st.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 3. Recommended Moves (Top 10 moves per mode)
  const movesContainer = document.getElementById('modal-moves-list');
  if (movesContainer) {
    const topMoves = (build.moves || []).slice(0, 10);
    movesContainer.innerHTML = topMoves.map((m, idx) => {
      const typeBg = TYPE_COLORS[m.type] || '#666';
      const typeFg = TYPE_TEXT[m.type] || '#fff';
      const catClass = `cat-${m.category.toLowerCase()}`;
      const rateNum = parseFloat(m.rate) || 0;

      return `
        <div class="modal-move-row">
          <div class="move-row-top">
            <div class="move-title-wrap">
              <span class="move-rank-num">#${idx + 1}</span>
              <span class="move-name">${m.name}</span>
              <span class="move-type-pill" style="background:${typeBg};color:${typeFg};">${m.type}</span>
              <span class="move-cat-pill ${catClass}">${m.category}</span>
            </div>
            <div class="move-rate-wrap">
              <span class="move-rate-pct">${m.rate}</span>
            </div>
          </div>
          <div class="move-progress-track">
            <div class="move-progress-fill" style="width:${rateNum}%;"></div>
          </div>
          <div class="move-row-bottom">
            <div class="move-props">
              <span class="move-prop-item"><b>Power:</b> ${m.power}</span>
              <span class="move-prop-item"><b>Acc:</b> ${m.accuracy}${m.accuracy === '-' ? '' : '%'}</span>
            </div>
            <div class="move-desc">${m.desc}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. Held Items (Top 3)
  const itemsContainer = document.getElementById('modal-items-list');
  if (itemsContainer) {
    const topItems = (build.items || []).slice(0, 3);
    itemsContainer.innerHTML = topItems.map((it, idx) => {
      const rateNum = parseFloat(it.rate) || 0;
      const spriteUrl = getItemSpriteUrl(it.name);
      const safeName = it.name.replace(/'/g, "\\'");
      return `
        <div class="modal-item-row">
          <div class="item-row-top">
            <div class="item-title-wrap">
              <span class="item-rank-num">#${idx + 1}</span>
              <div class="item-icon-box" title="${it.name}">
                <img
                  class="item-sprite"
                  src="${spriteUrl}"
                  alt="${it.name}"
                  loading="lazy"
                  onerror="window.handleItemImgError(this, '${safeName}')"
                />
                <svg class="item-fallback-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="9" stroke="rgba(245, 158, 11, 0.7)" fill="rgba(245, 158, 11, 0.15)"/>
                  <path d="M12 7v10M7 12h10" stroke="#f59e0b" stroke-linecap="round"/>
                </svg>
              </div>
              <span class="item-name">${it.name}</span>
            </div>
            <div class="item-rate-wrap">
              <span class="item-rate-pct">${it.rate}</span>
            </div>
          </div>
          <div class="item-progress-track">
            <div class="item-progress-fill" style="width:${rateNum}%;"></div>
          </div>
          <div class="item-desc">${it.desc}</div>
        </div>
      `;
    }).join('');
  }

  // 5. Abilities
  const abilitiesContainer = document.getElementById('modal-abilities-list');
  if (abilitiesContainer) {
    abilitiesContainer.innerHTML = (build.abilities || []).map((ab, idx) => {
      const rateNum = parseFloat(ab.rate) || 0;
      return `
        <div class="modal-ability-row">
          <div class="ability-row-top">
            <div class="ability-title-wrap">
              <span class="ability-rank-num">#${idx + 1}</span>
              <span class="ability-name">${ab.name}</span>
            </div>
            <div class="ability-rate-wrap">
              <span class="ability-rate-pct">${ab.rate}</span>
            </div>
          </div>
          <div class="ability-progress-track">
            <div class="ability-progress-fill" style="width:${rateNum}%;"></div>
          </div>
          <div class="ability-desc">${ab.desc}</div>
        </div>
      `;
    }).join('');
  }

  // 6. Natures
  const naturesContainer = document.getElementById('modal-natures-list');
  if (naturesContainer) {
    naturesContainer.innerHTML = (build.natures || []).map((nat, idx) => {
      const rateNum = parseFloat(nat.rate) || 0;
      return `
        <div class="modal-nature-row">
          <div class="nature-row-top">
            <div class="nature-title-wrap">
              <span class="nature-rank-num">#${idx + 1}</span>
              <span class="nature-name">${nat.name}</span>
              <span class="nature-mod-pill mod-boost">${nat.boost}</span>
              <span class="nature-mod-pill mod-drop">${nat.drop}</span>
            </div>
            <div class="nature-rate-wrap">
              <span class="nature-rate-pct">${nat.rate}</span>
            </div>
          </div>
          <div class="nature-progress-track">
            <div class="nature-progress-fill" style="width:${rateNum}%;"></div>
          </div>
          <div class="nature-desc">${nat.desc}</div>
        </div>
      `;
    }).join('');
  }

  // 7. Stat Points (OP.GG format with 6 stats) - Top 3 (No %)
  const statPointsContainer = document.getElementById('modal-stat-points-list');
  if (statPointsContainer) {
    const list = (build.statPoints || []).slice(0, 3);
    if (list.length === 0) {
      statPointsContainer.innerHTML = `<div class="empty-stat-points">No stat point distribution data available</div>`;
    } else {
      statPointsContainer.innerHTML = list.map((sp) => {
        const rankClass = sp.rank === 1 ? 'rank-1' : (sp.rank === 2 ? 'rank-2' : (sp.rank === 3 ? 'rank-3' : ''));
        return `
          <div class="stat-point-card">
            <div class="sp-left-box">
              <span class="sp-rank-badge ${rankClass}">#${sp.rank}</span>
              ${sp.rate ? `<span class="sp-rate-pill">${sp.rate}</span>` : ''}
            </div>
            <div class="sp-stats-grid">
              <div class="sp-stat-item ${sp.hp > 0 ? 'is-allocated' : ''}">
                <span class="sp-stat-lbl">HP</span>
                <span class="sp-stat-val ${sp.hp > 0 ? 'nonzero' : 'zero'}">${sp.hp}</span>
              </div>
              <div class="sp-stat-item ${sp.atk > 0 ? 'is-allocated' : ''}">
                <span class="sp-stat-lbl">Attack</span>
                <span class="sp-stat-val ${sp.atk > 0 ? 'nonzero' : 'zero'}">${sp.atk}</span>
              </div>
              <div class="sp-stat-item ${sp.def > 0 ? 'is-allocated' : ''}">
                <span class="sp-stat-lbl">Defense</span>
                <span class="sp-stat-val ${sp.def > 0 ? 'nonzero' : 'zero'}">${sp.def}</span>
              </div>
              <div class="sp-stat-item ${sp.spa > 0 ? 'is-allocated' : ''}">
                <span class="sp-stat-lbl">Sp. Atk</span>
                <span class="sp-stat-val ${sp.spa > 0 ? 'nonzero' : 'zero'}">${sp.spa}</span>
              </div>
              <div class="sp-stat-item ${sp.spd > 0 ? 'is-allocated' : ''}">
                <span class="sp-stat-lbl">Sp. Def</span>
                <span class="sp-stat-val ${sp.spd > 0 ? 'nonzero' : 'zero'}">${sp.spd}</span>
              </div>
              <div class="sp-stat-item ${sp.spe > 0 ? 'is-allocated' : ''}">
                <span class="sp-stat-lbl">Speed</span>
                <span class="sp-stat-val ${sp.spe > 0 ? 'nonzero' : 'zero'}">${sp.spe}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

export function closePokemonModal() {
  const modal = document.getElementById('pokemon-build-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
  document.body.classList.remove('modal-open');
}

// ── Run on DOM Ready ───────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
