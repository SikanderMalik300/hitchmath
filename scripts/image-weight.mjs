// Per-page image weight report. Above-the-fold = the image a mobile browser
// fetches before scrolling. Verified photos below the fold load lazily (counted 0).
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const ROOT = path.resolve('.');
const IMAGES = path.join(ROOT, 'public', 'images');
const manifest = require('../lib/generated/photo-manifest.json');

async function size(file) {
  try {
    return (await fs.stat(path.join(IMAGES, file))).size;
  } catch {
    return 0;
  }
}
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

// Page -> main photo slot + role.
const PAGES = [
  { page: '/', photo: 'suv-towing-travel-trailer-desert-road', id: 'tow-hero', role: 'hero (mobile first-load)' },
  { page: '/towing-capacity-calculator/', photo: 'suv-towing-travel-trailer-desert-road', id: 'tow-hero', role: 'figure below fold' },
  { page: '/payload-calculator/', photo: '', id: 'payload-bed', role: 'figure below fold (pending: color block)' },
  { page: '/tongue-weight-calculator/', photo: 'tow-ball-hitch-close-up', id: 'tongue-scale', role: 'figure below fold' },
  { page: '/gcwr-calculator/', photo: '', id: 'scale-ticket', role: 'figure below fold (pending: color block)' },
  { page: '/toyota-tacoma-towing-capacity/', photo: '', id: 'tacoma', role: 'figure below fold (pending: color block)' },
  { page: '/ford-f150-towing-capacity/', photo: '', id: 'f150', role: 'figure below fold (pending: color block)' },
  { page: '/toyota-tundra-towing-capacity/', photo: '', id: 'tundra', role: 'figure below fold (pending: color block)' },
  { page: '/ram-1500-towing-capacity/', photo: '', id: 'ram1500', role: 'figure below fold (pending: color block)' },
  { page: '/chevy-silverado-1500-towing-capacity/', photo: '', id: 'silverado', role: 'figure below fold (pending: color block)' },
  { page: '/toyota-4runner-towing-capacity/', photo: '', id: '4runner', role: 'figure below fold (pending: color block)' },
];

console.log('Page'.padEnd(42), 'Above-fold image'.padEnd(20), 'Role');
for (const p of PAGES) {
  const available = manifest[p.id] === true && p.photo;
  let aboveFold = '0 KB';
  if (p.page === '/' && available) {
    // hero: mobile picks the 640-wide AVIF
    aboveFold = kb(await size(`${p.photo}-640.avif`));
  }
  console.log(p.page.padEnd(42), aboveFold.padEnd(20), p.role);
}

// Total processed image bytes (all verified photos, all sizes/formats)
let total = 0;
for (const f of await fs.readdir(IMAGES)) total += await size(f);
console.log('\nTotal processed image bytes on disk:', kb(total));
console.log('Verified photos:', Object.entries(manifest).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none');
console.log('Pending slots render color blocks (0 image bytes).');
