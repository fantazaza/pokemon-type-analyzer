const fs = require('fs');

const builds = JSON.parse(fs.readFileSync('src/pokemon_builds.json', 'utf8'));
const meta = JSON.parse(fs.readFileSync('src/meta.json', 'utf8'));

// Build lookup map for rank in Single and Double
const singleRankMap = {};
meta.single.forEach(p => {
  singleRankMap[p.name.toLowerCase()] = p.rank;
});

const doubleRankMap = {};
meta.double.forEach(p => {
  doubleRankMap[p.name.toLowerCase()] = p.rank;
});

const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

let md = `# Pokémon Competitive Meta Moveset Compendium (Single & Double)
> **Comprehensive Multi-Source Meta Reference**  
> Benchmarked & Synthesized across **Pikalytics** (VGC/Doubles) • **Smogon** (OU/Singles) • **OP.GG Pokémon Champions** (Ranked Ladder) • **ChampDex** (Stat Allocations).

---

## 📖 Table of Contents
1. [Meta Philosophy & 4-Move Core Architecture](#meta-philosophy--4-move-core-architecture)
2. [S-Tier Meta Champions & Optimal Movesets](#s-tier-meta-champions--optimal-movesets)
3. [Full 128 Pokémon Moveset Database](#full-128-pokémon-moveset-database)

---

## 🎯 Meta Philosophy & 4-Move Core Architecture

### ⚔️ Single Battle Architecture (Smogon & OP.GG)
In 1v1 Singles, battles are defined by tempo control, entry hazard pressure, and sweep setup:
* **Move 1: Primary STAB** — High-power, reliable damage matching the Pokémon's primary type.
* **Move 2: Coverage / Secondary STAB** — Targets defensive switch-ins that resist Move 1.
* **Move 3: Setup / Hazard Control** — Stat-boosting (*Swords Dance*, *Calm Mind*) or field traps (*Stealth Rock*, *Spikes*).
* **Move 4: Priority / Pivot / Recovery** — Revenge KO priority (*Aqua Jet*, *Extreme Speed*), momentum pivoting (*U-turn*, *Flip Turn*), or sustained longevity (*Roost*, *Recover*).

### 👥 Double Battle Architecture (Pikalytics & VGC)
In 2v2 Doubles, battles are defined by turn denial, board positioning, and burst spread damage:
* **Move 1: Protect / Shield** — Essential defensive maneuver to bait double-targets and preserve positioning.
* **Move 2: Spread Damage / Safe STAB** — Multi-target pressure (*Heat Wave*, *Hyper Voice*, *Rock Slide*) or single-target STAB that protects the ally from friendly fire.
* **Move 3: Speed Control / Priority Disruption** — Turn manipulation (*Fake Out*, *Grassy Glide*, *Tailwind*, *Icy Wind*).
* **Move 4: Pivoting / Coverage** — Rotational momentum (*Parting Shot*, *U-turn*) or tactical super-effective coverage.

---

## 🏆 S-Tier Meta Champions & Optimal Movesets

`;

// Highlight Top 10 Meta Champions in detail
const TOP_CHAMPIONS = [
  'garchomp', 'incineroar', 'rillaboom', 'primarina', 'charizard',
  'lucario', 'archaludon', 'sneasler', 'kingambit', 'gholdengo', 'mimikyu'
];

TOP_CHAMPIONS.forEach(slug => {
  const data = builds[slug];
  if (!data) return;

  const sRank = singleRankMap[slug] ? `#${singleRankMap[slug]}` : 'Unranked';
  const dRank = doubleRankMap[slug] ? `#${doubleRankMap[slug]}` : 'Unranked';
  const name = capitalize(slug.replace(/-/g, ' '));

  md += `### 🌟 ${name}
* **Rankings:** Single Battle: **${sRank}** | Double Battle: **${dRank}**
* **Base Stats Total (BST):** ${data.baseStats?.total || 'N/A'} (HP: ${data.baseStats?.hp}, Atk: ${data.baseStats?.atk}, Def: ${data.baseStats?.def}, SpA: ${data.baseStats?.spa}, SpD: ${data.baseStats?.spd}, Spe: ${data.baseStats?.spe})

#### ⚔️ Single Battle Meta Loadout (Smogon / 1v1 Hazard & Setup)
* **Role:** ${data.single?.role || 'Competitive Battler'}
* **Optimal 4-Move Set:**
${(data.single?.moves || []).slice(0, 4).map((m, i) => `  ${i + 1}. **${m.name}** (${m.type} | ${m.category} | Power: ${m.power} | Acc: ${m.accuracy}%) — *${m.desc}*`).join('\n')}
* **Key Alternate Moves:** ${(data.single?.moves || []).slice(4, 10).map(m => m.name).join(', ') || 'None'}
* **Top 3 Items:** ${(data.single?.items || []).slice(0, 3).map(it => `**${it.name}** (${it.rate})`).join(', ')}
* **Top Natures:** ${(data.single?.natures || []).slice(0, 2).map(n => `**${n.name}** (${n.boost}/${n.drop})`).join(', ')}

#### 👥 Double Battle Meta Loadout (Pikalytics / VGC Synergy)
* **Role:** ${data.double?.role || 'VGC Competitive Threat'}
* **Optimal 4-Move Set:**
${(data.double?.moves || []).slice(0, 4).map((m, i) => `  ${i + 1}. **${m.name}** (${m.type} | ${m.category} | Power: ${m.power} | Acc: ${m.accuracy}%) — *${m.desc}*`).join('\n')}
* **Key Alternate Moves:** ${(data.double?.moves || []).slice(4, 10).map(m => m.name).join(', ') || 'None'}
* **Top 3 Items:** ${(data.double?.items || []).slice(0, 3).map(it => `**${it.name}** (${it.rate})`).join(', ')}
* **Top Natures:** ${(data.double?.natures || []).slice(0, 2).map(n => `**${n.name}** (${n.boost}/${n.drop})`).join(', ')}

---

`;
});

md += `## 📚 Full 128 Pokémon Moveset Database\n\n`;

const allKeys = Object.keys(builds).sort((a, b) => {
  const rankA = singleRankMap[a] || doubleRankMap[a] || 999;
  const rankB = singleRankMap[b] || doubleRankMap[b] || 999;
  return rankA - rankB;
});

allKeys.forEach((key, idx) => {
  const p = builds[key];
  const name = capitalize(key.replace(/-/g, ' '));
  const sRank = singleRankMap[key] ? `#${singleRankMap[key]}` : '-';
  const dRank = doubleRankMap[key] ? `#${doubleRankMap[key]}` : '-';

  const single4 = (p.single?.moves || []).slice(0, 4).map(m => m.name).join(', ') || 'N/A';
  const double4 = (p.double?.moves || []).slice(0, 4).map(m => m.name).join(', ') || 'N/A';
  const sItem = (p.single?.items || []).slice(0, 3).map(it => it.name).join(', ') || 'Sitrus Berry';
  const dItem = (p.double?.items || []).slice(0, 3).map(it => it.name).join(', ') || 'Sitrus Berry';

  const formatMoveDetail = m => `${m.name} (${m.type || 'Normal'} | ${m.category || 'Physical'}${m.power !== '-' ? ' | ' + m.power + ' BP' : ''})`;

  const sMoves10 = (p.single?.moves || []).map((m, i) => `${i + 1}. **${formatMoveDetail(m)}**`).join('\n   ');
  const dMoves10 = (p.double?.moves || []).map((m, i) => `${i + 1}. **${formatMoveDetail(m)}**`).join('\n   ');

  const sStatPoints = (p.single?.statPoints || []).slice(0, 3).map(sp => `#${sp.rank} (HP:${sp.hp} Atk:${sp.atk} Def:${sp.def} SpA:${sp.spa} SpD:${sp.spd} Spe:${sp.spe})`).join(' • ');
  const dStatPoints = (p.double?.statPoints || []).slice(0, 3).map(sp => `#${sp.rank} (HP:${sp.hp} Atk:${sp.atk} Def:${sp.def} SpA:${sp.spa} SpD:${sp.spd} Spe:${sp.spe})`).join(' • ');

  md += `### ${idx + 1}. ${name} (Dex #${p.dexNumber || '---'})
| Mode | Tier / Rank | Optimal 4 Moves | Top Held Items | Best Nature |
| :--- | :---: | :--- | :--- | :--- |
| **Single Battle** | ${sRank} | ${single4} | ${sItem} | ${p.single?.natures?.[0]?.name || 'Jolly'} |
| **Double Battle** | ${dRank} | ${double4} | ${dItem} | ${p.double?.natures?.[0]?.name || 'Timid'} |

* **Single Battle 10-Move Pool:**
   ${sMoves10}
* **Double Battle 10-Move Pool:**
   ${dMoves10}
* **Stat Points (Single):** ${sStatPoints || 'N/A'}
* **Stat Points (Double):** ${dStatPoints || 'N/A'}

---

`;
});

fs.writeFileSync('POKEMON_META_MOVESETS.md', md, 'utf8');
console.log('Successfully generated POKEMON_META_MOVESETS.md with all', allKeys.length, 'Pokémon!');
