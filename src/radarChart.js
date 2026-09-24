/**
 * radarChart.js
 * Custom Canvas-based Radar/Spider Chart for Pokémon Type Matchup
 *
 * Features:
 * - Polygon grid (6 rings: 0, 0.25×, 0.5×, 1×, 2×, 4×)
 * - Axis lines + scale labels on top axis
 * - Two data polygons (defense, attack) with animated transitions
 * - Color-coded axis labels (by defense effectiveness)
 * - Circular vertex dots
 * - Hover tooltip
 * - DPR-aware, ResizeObserver responsive
 */

import {
  TYPE_COLORS, TYPES,
  defenseStatus, attackStatus, fmtMult,
} from './typeData.js';

// ── Scale mapping ──────────────────────────────────────────────
// Pokémon effectiveness values: [0, 0.25, 0.5, 1, 2, 4]
// Mapped to radar levels:       [0,  1,   2,   3, 4, 5]
const SCALE_VALS   = [0, 0.25, 0.5, 1, 2, 4];
const SCALE_LABELS = ['0', '0.25×', '0.5×', '1×', '2×', '4×'];
const NUM_LEVELS   = 5; // Outermost ring = level 5

function valueToLevel(v) {
  const idx = SCALE_VALS.indexOf(v);
  return idx !== -1 ? idx : 3; // fallback to 1× level
}

// Label colors per defense effectiveness value
const LABEL_COLORS = {
  0: '#a78bfa',    // purple  – immune
  0.25: '#34d399', // emerald – super resist
  0.5: '#6ee7b7',  // mint    – resist
  1: 'rgba(240,238,255,.8)', // white – neutral
  2: '#fbbf24',    // amber   – weak
  4: '#f87171',    // red     – super weak
};

// ── RadarChart class ───────────────────────────────────────────
export class RadarChart {
  /**
   * @param {string} canvasId
   * @param {string} tooltipId
   */
  constructor(canvasId, tooltipId) {
    this.canvas  = document.getElementById(canvasId);
    this.ctx     = this.canvas.getContext('2d');
    this.tooltip = document.getElementById(tooltipId);
    this.dpr     = Math.max(window.devicePixelRatio || 1, 1);

    // Chart data
    this.labels   = [];   // string[]
    this.datasets = [];   // [{label, color, fillColor, rawValues[]}]
    this.activeDS = { 0: true, 1: true }; // dataset visibility

    // Animation
    this.curLevels  = null;   // float[][] current interpolated levels
    this.prevLevels = null;
    this.tgtLevels  = null;
    this.animStart  = null;
    this.animFrame  = null;
    this.ANIM_MS    = 350;

    // Interaction
    this.hovered = null; // { di, i }

    this._setupCanvas();
    this._setupEvents();
  }

  // ── Setup ──────────────────────────────────────────────────

  _setupCanvas() {
    const wrap = this.canvas.parentElement;
    new ResizeObserver(() => this._resize()).observe(wrap);
    this._resize();
  }

  _resize() {
    const wrap = this.canvas.parentElement;
    if (!wrap) return;
    const w = wrap.clientWidth;
    if (!w) return;
    const isMobile = window.innerWidth <= 720;
    const safeW = Math.max(w - 12, 180);
    const maxSize = isMobile ? Math.min(safeW, 360) : 480;
    const size = Math.min(safeW, maxSize, Math.round(window.innerHeight * 0.60));
    if (this._size === size) return;
    this._size = size;

    this.canvas.style.width  = size + 'px';
    this.canvas.style.height = size + 'px';
    this.canvas.width  = Math.round(size * this.dpr);
    this.canvas.height = Math.round(size * this.dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);

    this._draw();
  }

  // ── Geometry helpers ───────────────────────────────────────

  get _s()   { return this._size || 440; }
  get _cx()  { return this._s / 2; }
  get _cy()  { return this._s / 2; }

  get _pad() {
    const s = this._s;
    if (s < 300) return 40;
    if (s < 360) return 46;
    if (s < 420) return 56;
    return 66;
  }

  get _maxR() { return this._cx - this._pad; }

  get _labelFs() {
    const s = this._s;
    if (s < 300) return 7.5;
    if (s < 360) return 8.5;
    if (s < 420) return 10;
    return 12;
  }

  get _scaleFs() {
    const s = this._s;
    if (s < 300) return 6.5;
    if (s < 360) return 7.5;
    if (s < 420) return 8.5;
    return 10;
  }

  /** Angle for axis i (top = 0, clockwise) */
  _angle(i) {
    const n = this.labels.length || 18;
    return (i / n) * 2 * Math.PI - Math.PI / 2;
  }

  /** Radius for a given level (0–5) */
  _levelR(lv) {
    return (lv / NUM_LEVELS) * this._maxR;
  }

  /** Canvas point for axis i at level lv */
  _pt(i, lv) {
    const r = this._levelR(lv);
    const a = this._angle(i);
    return { x: this._cx + r * Math.cos(a), y: this._cy + r * Math.sin(a) };
  }

  // ── Data API ───────────────────────────────────────────────

  /**
   * @param {string[]} labels
   * @param {Array<{label,color,fillColor,rawValues}>} datasets
   */
  setData(labels, datasets) {
    this.labels   = labels;
    this.datasets = datasets;

    const newLevels = datasets.map(d => d.rawValues.map(valueToLevel));

    if (!this.curLevels || this.curLevels.length !== datasets.length) {
      this.curLevels = newLevels.map(arr => [...arr]);
      this.tgtLevels = newLevels;
      this._draw();
      return;
    }

    // Animate
    this.prevLevels = this.curLevels.map(arr => [...arr]);
    this.tgtLevels  = newLevels;
    this.animStart  = null;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    this.animFrame = requestAnimationFrame(t => this._animate(t));
  }

  _animate(ts) {
    if (!this.animStart) this.animStart = ts;
    const elapsed = ts - this.animStart;
    const t   = Math.min(elapsed / this.ANIM_MS, 1);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - t, 3);

    this.curLevels = this.prevLevels.map((prev, di) =>
      prev.map((pv, i) => pv + (this.tgtLevels[di][i] - pv) * ease)
    );

    this._draw();

    if (t < 1) {
      this.animFrame = requestAnimationFrame(ts2 => this._animate(ts2));
    } else {
      this.curLevels = this.tgtLevels.map(arr => [...arr]);
      this.animFrame = null;
      this._draw();
    }
  }

  setActiveDatasets(ds0, ds1) {
    this.activeDS = { 0: ds0, 1: ds1 };
    this._draw();
  }

  // ── Drawing ────────────────────────────────────────────────

  _draw() {
    const ctx = this.ctx;
    const s   = this._s;
    ctx.clearRect(0, 0, s, s);

    if (!this.labels.length) {
      this._drawPlaceholder();
      return;
    }

    this._drawGrid();
    this._drawAxes();
    this._drawScaleLabels();

    if (this.curLevels && this.datasets.length) {
      this._drawDatasets();
    }

    this._drawAxisLabels();
  }

  _drawPlaceholder() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(255,255,255,.18)';
    ctx.font = '400 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Select a Pokémon type to begin', this._cx, this._cy);
  }

  /** Draw polygon grid rings (levels 1–5) */
  _drawGrid() {
    const ctx = this.ctx;
    const n   = this.labels.length;

    for (let lv = 1; lv <= NUM_LEVELS; lv++) {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const { x, y } = this._pt(i, lv);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Slightly brighter at the outermost ring
      const alpha = lv === NUM_LEVELS ? 0.22 : 0.11;
      ctx.strokeStyle = `rgba(200,195,255,${alpha})`;
      ctx.lineWidth = lv === NUM_LEVELS ? 1.2 : 0.8;
      ctx.stroke();
    }
  }

  /** Draw radial axis lines from center to outer polygon */
  _drawAxes() {
    const ctx = this.ctx;
    const n   = this.labels.length;

    for (let i = 0; i < n; i++) {
      const { x, y } = this._pt(i, NUM_LEVELS);
      ctx.beginPath();
      ctx.moveTo(this._cx, this._cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(200,195,255,0.13)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  /** Draw scale labels on the top axis (Normal, index 0) */
  _drawScaleLabels() {
    const ctx  = this.ctx;
    const fs   = this._scaleFs;
    const a    = this._angle(0); // top axis angle (-π/2)
    const cosA = Math.cos(a);    // ≈ 0
    const sinA = Math.sin(a);    // = -1

    ctx.font = `600 ${fs}px Inter, sans-serif`;

    for (let lv = 0; lv <= NUM_LEVELS; lv++) {
      const r  = this._levelR(lv);
      const x  = this._cx + r * cosA;
      const y  = this._cy + r * sinA;
      const lbl = SCALE_LABELS[lv];

      // Slight right offset to avoid overlapping the axis line
      const ox = 4;
      const tw = ctx.measureText(lbl).width;

      // Dark pill background
      ctx.fillStyle = 'rgba(11, 9, 25, 0.75)';
      ctx.beginPath();
      ctx.rect(x + ox - 2, y - fs - 2, tw + 6, fs + 4);
      ctx.fill();

      ctx.fillStyle = 'rgba(240,238,255,.55)';
      ctx.textAlign    = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(lbl, x + ox, y - 1);
    }
  }

  /** Draw data polygons */
  _drawDatasets() {
    const ctx = this.ctx;
    const n   = this.labels.length;

    // Render datasets back-to-front (index 0 on top)
    for (let di = this.datasets.length - 1; di >= 0; di--) {
      if (!this.activeDS[di]) continue;

      const ds  = this.datasets[di];
      const lvs = this.curLevels[di];

      // Build vertex points
      const pts = lvs.map((lv, i) => this._pt(i, lv));

      // ── Fill ──
      ctx.beginPath();
      pts.forEach(({ x, y }, i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
      ctx.closePath();
      ctx.fillStyle = ds.fillColor;
      ctx.fill();

      // ── Border ──
      ctx.strokeStyle = ds.color;
      ctx.lineWidth   = 2.2;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';
      ctx.stroke();

      // ── Vertex dots ──
      pts.forEach(({ x, y }, i) => {
        const isHov = this.hovered?.di === di && this.hovered?.i === i;
        const r = isHov ? 6.5 : 3.8;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle   = ds.color;
        ctx.fill();

        ctx.strokeStyle = 'rgba(11,9,25,.85)';
        ctx.lineWidth   = 1.6;
        ctx.stroke();

        // Extra glow ring on hover
        if (isHov) {
          ctx.beginPath();
          ctx.arc(x, y, r + 3, 0, 2 * Math.PI);
          ctx.strokeStyle = ds.color + '55';
          ctx.lineWidth   = 1.5;
          ctx.stroke();
        }
      });
    }
  }

  /** Draw axis labels outside the chart, color-coded by effectiveness */
  _drawAxisLabels() {
    const ctx   = this.ctx;
    const n     = this.labels.length;
    const fs    = this._labelFs;
    const gap   = 7;

    ctx.font = `700 ${fs}px Inter, sans-serif`;

    // Detect if this is defense or attack chart
    const isDefense = this.datasets[0]?.isDefense !== false;

    // Attack label colors (same scale, slightly different tones)
    const ATTACK_COLORS = {
      0:    '#a78bfa', // purple  – no effect
      0.25: '#34d399', // emerald – barely
      0.5:  '#6ee7b7', // mint    – nve
      1:    'rgba(240,238,255,.8)', // white – normal
      2:    '#fbbf24', // amber   – se
      4:    '#f87171', // red     – se4
    };

    for (let i = 0; i < n; i++) {
      const a    = this._angle(i);
      const r    = this._maxR + gap;
      const x    = this._cx + r * Math.cos(a);
      const y    = this._cy + r * Math.sin(a);
      const name = this.labels[i];

      let color = 'rgba(240,238,255,.8)';
      if (this.datasets.length && this.datasets[0]?.rawValues) {
        const v = this.datasets[0].rawValues[i];
        const palette = isDefense ? LABEL_COLORS : ATTACK_COLORS;
        color = palette[v] || color;
      }

      ctx.fillStyle = color;

      const ca = Math.cos(a), sa = Math.sin(a);
      ctx.textAlign    = Math.abs(ca) < 0.18 ? 'center' : (ca > 0 ? 'left' : 'right');
      ctx.textBaseline = Math.abs(sa) < 0.18 ? 'middle' : (sa > 0 ? 'top' : 'bottom');

      ctx.fillText(name, x, y);
    }
  }


  // ── Events / Tooltip ───────────────────────────────────────

  _setupEvents() {
    const canvas = this.canvas;

    const pos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const sx   = this._s / rect.width;
      const sy   = this._s / rect.height;
      return {
        mx: (clientX - rect.left) * sx,
        my: (clientY - rect.top)  * sy,
      };
    };

    canvas.addEventListener('mousemove', e => {
      const { mx, my } = pos(e.clientX, e.clientY);
      this._hover(mx, my, e.clientX, e.clientY);
    });

    canvas.addEventListener('mouseleave', () => {
      if (this.hovered) { this.hovered = null; this._hideTooltip(); this._draw(); }
    });

    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      const t = e.touches[0];
      const { mx, my } = pos(t.clientX, t.clientY);
      this._hover(mx, my, t.clientX, t.clientY);
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
      this.hovered = null; this._hideTooltip();
    });
  }

  _hover(mx, my, px, py) {
    if (!this.curLevels || !this.labels.length) return;

    const HIT = 16; // hit-test radius px
    let found = null;

    outer: for (let di = 0; di < this.datasets.length; di++) {
      if (!this.activeDS[di]) continue;
      for (let i = 0; i < this.labels.length; i++) {
        const lv = this.curLevels[di][i];
        const { x, y } = this._pt(i, lv);
        if ((mx - x) ** 2 + (my - y) ** 2 <= HIT * HIT) {
          found = { di, i };
          break outer;
        }
      }
    }

    const prev = this.hovered;
    this.hovered = found;

    if (found) {
      const { di, i }   = found;
      const ds           = this.datasets[di];
      const raw          = ds.rawValues[i];
      const typeName     = this.labels[i];
      const typeColor    = TYPE_COLORS[typeName] || '#888';
      const isDefense    = ds.isDefense !== false;
      const { label: stLbl, cls: stCls } = isDefense
        ? defenseStatus(raw)
        : attackStatus(raw);

      this.tooltip.innerHTML = `
        <div class="tt-header">
          <span class="tt-dot" style="background:${typeColor};box-shadow:0 0 6px ${typeColor}88"></span>
          <strong>${typeName}</strong>
          <span style="font-size:.72rem;color:#7b77a0;margin-left:auto">${isDefense ? 'Defense' : 'Attack'}</span>
        </div>
        <div class="tt-row">
          <span class="tt-label">${isDefense ? 'Damage Taken' : 'Damage Dealt'}</span>
          <span class="tt-val">${fmtMult(raw)}</span>
        </div>
        <div class="tt-status ${stCls}">${stLbl}</div>
      `;
      this._showTooltip(px, py);

      if (!prev || prev.di !== di || prev.i !== i) this._draw();
    } else {
      this._hideTooltip();
      if (prev) this._draw();
    }
  }

  _showTooltip(px, py) {
    const tt = this.tooltip;
    tt.style.display = 'block';
    tt.removeAttribute('aria-hidden');

    // Force layout to get real size
    const tw = tt.offsetWidth || 180;
    const th = tt.offsetHeight || 90;

    let left = px + 18;
    let top  = py - 30;
    if (left + tw > window.innerWidth  - 8) left = px - tw - 18;
    if (top < 8)                             top  = 8;
    if (top + th > window.innerHeight - 8)  top  = window.innerHeight - th - 8;

    tt.style.left = left + 'px';
    tt.style.top  = top  + 'px';
  }

  _hideTooltip() {
    this.tooltip.style.display = 'none';
    this.tooltip.setAttribute('aria-hidden', 'true');
  }
}
