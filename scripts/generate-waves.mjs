/**
 * Fundo de ondas/contornos topográficos da marca (SVG).
 * Curvas de nível REAIS de um campo de altura (marching squares) — as linhas
 * fluem suaves e NUNCA se cruzam, com um "pico" de anéis aninhados no canto
 * superior direito, como na referência "momento convert".
 *
 * Uso: node scripts/generate-waves.mjs
 * Saída: public/bg-waves.svg
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "bg-waves.svg");

const W = 1600;
const H = 1000;
const COLS = 150;
const ROWS = 94;
const LEVELS = 20;

function gauss(nx, ny, cx, cy, sx, sy) {
  const dx = (nx - cx) / sx;
  const dy = (ny - cy) / sy;
  return Math.exp(-(dx * dx + dy * dy));
}

// Campo de altura suave: um pico forte no canto superior direito (gera os
// anéis aninhados), uma elevação suave embaixo-esquerda e ondulação de baixa
// frequência para o fluxo orgânico.
function field(nx, ny) {
  let h = 0;
  h += 1.7 * gauss(nx, ny, 0.86, 0.18, 0.19, 0.2); // pico (canto sup. direito)
  h += 0.65 * gauss(nx, ny, 0.1, 0.85, 0.32, 0.34); // elevação inf. esquerda
  h -= 0.45 * gauss(nx, ny, 0.4, 0.5, 0.3, 0.4); // vale central
  h += 0.34 * Math.sin(nx * Math.PI * 2.1 + 0.5) * Math.cos(ny * Math.PI * 1.5 + 0.2);
  h += 0.16 * Math.sin(nx * Math.PI * 3.2 + ny * Math.PI * 1.2 + 1.4);
  return h;
}

// grade de valores
const gw = COLS + 1;
const gh = ROWS + 1;
const vals = new Float64Array(gw * gh);
let min = Infinity;
let max = -Infinity;
for (let j = 0; j < gh; j++) {
  for (let i = 0; i < gw; i++) {
    const nx = i / COLS;
    const ny = j / ROWS;
    const v = field(nx, ny);
    vals[j * gw + i] = v;
    if (v < min) min = v;
    if (v > max) max = v;
  }
}
const V = (i, j) => vals[j * gw + i];
const px = (i) => +((i / COLS) * W).toFixed(1);
const py = (j) => +((j / ROWS) * H).toFixed(1);

// interpola posição do cruzamento ao longo de uma aresta
function interp(t, va, vb, a, b) {
  const d = vb - va;
  const f = d === 0 ? 0.5 : (t - va) / d;
  return +(a + f * (b - a)).toFixed(1);
}

// segmentos por caso do marching squares; cada letra = aresta T/R/B/L
const TABLE = {
  1: [["L", "B"]],
  2: [["B", "R"]],
  3: [["L", "R"]],
  4: [["T", "R"]],
  5: [["T", "L"], ["B", "R"]],
  6: [["T", "B"]],
  7: [["T", "L"]],
  8: [["T", "L"]],
  9: [["T", "B"]],
  10: [["T", "R"], ["B", "L"]],
  11: [["T", "R"]],
  12: [["L", "R"]],
  13: [["B", "R"]],
  14: [["L", "B"]],
};

const paths = Array.from({ length: LEVELS }, () => "");

for (let l = 0; l < LEVELS; l++) {
  const t = min + ((l + 0.5) / LEVELS) * (max - min);
  let d = "";
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const tl = V(i, j);
      const tr = V(i + 1, j);
      const br = V(i + 1, j + 1);
      const bl = V(i, j + 1);
      const idx =
        (tl >= t ? 8 : 0) | (tr >= t ? 4 : 0) | (br >= t ? 2 : 0) | (bl >= t ? 1 : 0);
      const segs = TABLE[idx];
      if (!segs) continue;
      const x0 = px(i), x1 = px(i + 1), y0 = py(j), y1 = py(j + 1);
      const pt = (edge) => {
        switch (edge) {
          case "T": return [interp(t, tl, tr, x0, x1), y0];
          case "R": return [x1, interp(t, tr, br, y0, y1)];
          case "B": return [interp(t, bl, br, x0, x1), y1];
          case "L": return [x0, interp(t, tl, bl, y0, y1)];
        }
      };
      for (const [e1, e2] of segs) {
        const [ax, ay] = pt(e1);
        const [bx, by] = pt(e2);
        d += `M${ax} ${ay}L${bx} ${by}`;
      }
    }
  }
  paths[l] = d;
}

const pathEls = paths
  .map((d, l) => {
    const op = (0.26 + 0.16 * (l / LEVELS)).toFixed(2);
    return `<path d="${d}" fill="none" stroke="#F03BB6" stroke-width="1" stroke-opacity="${op}" stroke-linecap="round"/>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<g>
${pathEls}
</g>
</svg>
`;

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, svg, "utf8");
console.log("✓ Fundo de ondas (curvas de nível) gerado:", OUT, `(${LEVELS} níveis)`);
