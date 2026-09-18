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
  fmtMult,
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
