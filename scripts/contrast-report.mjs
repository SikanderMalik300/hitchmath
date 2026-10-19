// WCAG 2.x contrast ratios for the design tokens (design spec section 3).
const C = {
  bg: '#FFFFFF',
  ink: '#18202A',
  muted: '#525E6B',
  brand: '#1E4E73',
  white: '#FFFFFF',
  band1: '#F1ECE2',
  band2: '#E9EDF0',
  band3: '#ECE8E1',
  band4: '#F5F3EF',
  warn: '#8A4B08',
  ok: '#1F6B3A',
};

function lin(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function ratio(a, b) {
  const la = lum(a);
  const lb = lum(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

const bands = [
  ['bg (#FFFFFF)', C.bg],
  ['band-1 (#F1ECE2)', C.band1],
  ['band-2 (#E9EDF0)', C.band2],
  ['band-3 (#ECE8E1)', C.band3],
  ['band-4 (#F5F3EF)', C.band4],
];

const checks = [];
for (const [name, bg] of bands) {
  checks.push([`ink on ${name}`, ratio(C.ink, bg), 13]);
}
for (const [name, bg] of bands) {
  checks.push([`muted on ${name}`, ratio(C.muted, bg), 4.5]);
}
for (const [name, bg] of bands) {
  checks.push([`brand on ${name}`, ratio(C.brand, bg), 4.5]);
}
checks.push(['white on brand', ratio(C.white, C.brand), 4.5]);
checks.push(['warn on white', ratio(C.warn, C.bg), 4.5]);
checks.push(['ok on white', ratio(C.ok, C.bg), 4.5]);

let allPass = true;
console.log('Pair'.padEnd(26), 'Ratio'.padEnd(9), 'Min', 'Result');
for (const [label, r, min] of checks) {
  const pass = r >= min;
  if (!pass) allPass = false;
  console.log(label.padEnd(26), `${r.toFixed(2)}:1`.padEnd(9), `${min}:1`.padEnd(5), pass ? 'PASS' : 'FAIL');
}
console.log('\nAll pass:', allPass);
