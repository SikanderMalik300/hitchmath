// Build-time asset generation (prebuild). Safe by design: any step that needs the
// network is wrapped so a failure never breaks `next build`.
//
//  - copies /brand into public/brand and the icon PNGs into public/
//  - generates apple-touch-icon.png and favicon.ico from icon-512
//  - generates a 1200x630 OG PNG per page (brand band + H1 + site name)
//  - writes public/llms.txt from the registry
//  - downloads + processes the two verified photos into AVIF/WebP/JPEG, and
//    records which succeeded in lib/generated/photo-manifest.json
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND_SRC = path.join(ROOT, 'hitchmath', 'brand');
const PUBLIC = path.join(ROOT, 'public');
const IMAGES = path.join(PUBLIC, 'images');
const OG = path.join(PUBLIC, 'og');
const GEN = path.join(ROOT, 'lib', 'generated');

const SITE = 'HitchMath';
const BRAND = '#1e4e73';
const BAND1 = '#f1ece2';
const INK = '#18202a';

async function ensure(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyBrand() {
  await ensure(path.join(PUBLIC, 'brand'));
  const files = await fs.readdir(BRAND_SRC);
  for (const f of files) {
    await fs.copyFile(path.join(BRAND_SRC, f), path.join(PUBLIC, 'brand', f));
    if (f.startsWith('icon-') && f.endsWith('.png')) {
      await fs.copyFile(path.join(BRAND_SRC, f), path.join(PUBLIC, f));
    }
  }
  // apple-touch-icon and favicon from the 512 icon
  const icon512 = path.join(BRAND_SRC, 'icon-512.png');
  await sharp(icon512).resize(180, 180).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
  await sharp(icon512).resize(32, 32).png().toFile(path.join(PUBLIC, 'favicon.ico'));
  console.log('assets: brand + favicons copied');
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  );
}

function wrap(text, max) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 5);
}

async function ogImage(slug, h1) {
  const lines = wrap(h1, 26);
  const startY = 300 - (lines.length - 1) * 34;
  const tspans = lines
    .map((l, i) => `<tspan x="80" y="${startY + i * 68}">${escapeXml(l)}</tspan>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#ffffff"/>
    <rect width="1200" height="120" fill="${BAND1}"/>
    <text x="80" y="78" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="600">
      <tspan fill="${BRAND}">Hitch</tspan><tspan fill="${INK}">Math</tspan>
    </text>
    <text font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="600" fill="${INK}">${tspans}</text>
    <text x="80" y="560" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#525e6b">hitchmath.com</text>
  </svg>`;
  const png = new Resvg(svg, { font: { loadSystemFonts: true } }).render().asPng();
  const name = `${slug === '' ? 'home' : slug.replace(/\//g, '-')}.png`;
  await fs.writeFile(path.join(OG, name), png);
}

async function genOg(pages) {
  await ensure(OG);
  for (const p of pages) {
    try {
      await ogImage(p.slug, p.h1);
    } catch (e) {
      console.warn(`assets: OG failed for ${p.slug || 'home'}: ${e.message}`);
    }
  }
  console.log(`assets: ${pages.length} OG images attempted`);
}

async function writeLlms(pages) {
  const content = pages.filter((p) => p.category === 'tool' || p.category === 'vehicle');
  const lines = [
    '# HitchMath',
    '',
    'Towing math for US truck and SUV owners. Calculators that show their work and vehicle towing tables copied from manufacturer documents.',
    '',
    '## Pages',
    ...content.map((p) => `- [${p.h1}](https://hitchmath.com${p.path}): ${p.description}`),
    '',
  ];
  await fs.writeFile(path.join(PUBLIC, 'llms.txt'), lines.join('\n'));
  console.log('assets: llms.txt written');
}

// Direct image URLs for the two verified photos (from hitchmath-photos.md).
const PHOTO_URLS = {
  'tow-hero': {
    file: 'suv-towing-travel-trailer-desert-road',
    url: 'https://images.unsplash.com/photo-1520101244246-293f77ffc39e?q=80&w=2400&auto=format&fit=crop',
    focalX: 55,
    focalY: 62,
  },
  'tongue-scale': {
    file: 'tow-ball-hitch-close-up',
    url: 'https://images.pexels.com/photos/12833615/pexels-photo-12833615.jpeg?auto=compress&cs=tinysrgb&w=2400',
    focalX: 42,
    focalY: 45,
  },
  'payload-bed': {
    file: 'pickup-bed-loaded-logs',
    url: 'https://images.pexels.com/photos/14279588/pexels-photo-14279588.jpeg?auto=compress&cs=tinysrgb&w=2600',
    focalX: 50,
    focalY: 60,
    jpeg: 56, // this photo's JPEG fallback was over budget at the default quality
    avif: 20, // heavy log photo: cap AVIF quality so 600w <= 35 KB, 480w <= 25 KB
  },
  'scale-ticket': {
    file: 'pickup-towing-cabin-trailer',
    url: 'https://images.pexels.com/photos/25396350/pexels-photo-25396350.jpeg?auto=compress&cs=tinysrgb&w=2600',
    focalX: 45,
    focalY: 60,
  },
  tacoma: {
    file: 'gray-tacoma-mountain-valley',
    url: 'https://images.unsplash.com/photo-1632107516728-e7b496805e8d?q=85&w=2600&auto=format&fit=crop',
    focalX: 48,
    focalY: 62,
  },
  f150: {
    file: 'red-f150-travel-trailer-desert',
    url: 'https://images.unsplash.com/photo-1635452310050-6f0c0b969a8f?q=85&w=2600&auto=format&fit=crop',
    focalX: 50,
    focalY: 68,
    avif: 32, // detailed desert scene: cap AVIF so the 480w tile stays <= 25 KB
  },
  tundra: {
    file: 'pickup-towing-boat-coastal-road',
    url: 'https://images.unsplash.com/photo-1778706792916-c176dd094540?q=85&w=2600&auto=format&fit=crop',
    focalX: 15,
    focalY: 62,
  },
  ram1500: {
    file: 'gray-pickup-hitched-travel-trailer',
    url: 'https://images.unsplash.com/photo-1739573685215-b05807df907a?q=85&w=2600&auto=format&fit=crop',
    focalX: 40,
    focalY: 55,
  },
  silverado: {
    file: 'silver-pickup-livestock-trailer',
    url: 'https://images.unsplash.com/photo-1680392407804-af4efe9b7611?q=85&w=2600&auto=format&fit=crop',
    focalX: 20,
    focalY: 60,
  },
  '4runner': {
    file: 'white-suv-boat-launch-ramp',
    url: 'https://images.pexels.com/photos/27706384/pexels-photo-27706384.jpeg?auto=compress&cs=tinysrgb&w=2600',
    focalX: 62,
    focalY: 55,
  },
};

async function processPhoto(id) {
  const info = PHOTO_URLS[id];
  const res = await fetch(info.url, {
    headers: { 'User-Agent': 'Mozilla/5.0 HitchMath-build' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const raw = Buffer.from(await res.arrayBuffer());
  // Normalise EXIF orientation first so focal maths matches the pixels.
  const oriented = await sharp(raw).rotate().toBuffer();
  const meta = await sharp(oriented).metadata();
  const sw = meta.width;
  const sh = meta.height;
  const jpegQ = info.jpeg ?? 70;

  // Widths: tiles 320/480/600 (square), heroes/figures 640/960/1280 (4:3).
  // Targets: 480w tile <= 25 KB AVIF, 960w hero <= 60 KB AVIF.
  const targets = [
    { w: 320, h: 320, avif: 46 },
    { w: 480, h: 480, avif: 42 },
    { w: 600, h: 600, avif: 40 },
    { w: 640, h: 480, avif: 46 },
    { w: 960, h: 720, avif: 42 },
    { w: 1280, h: 960, avif: 40 },
  ];
  for (const t of targets) {
    // Exact focal-point cover crop: scale to cover, then extract a window centred
    // on (focalX, focalY) and clamped inside the image.
    const scale = Math.max(t.w / sw, t.h / sh);
    const rw = Math.max(t.w, Math.round(sw * scale));
    const rh = Math.max(t.h, Math.round(sh * scale));
    let left = Math.round((info.focalX / 100) * rw - t.w / 2);
    let top = Math.round((info.focalY / 100) * rh - t.h / 2);
    left = Math.max(0, Math.min(left, rw - t.w));
    top = Math.max(0, Math.min(top, rh - t.h));
    const base = sharp(oriented)
      .resize(rw, rh)
      .extract({ left, top, width: t.w, height: t.h });
    const out = path.join(IMAGES, `${info.file}-${t.w}`);
    // info.avif caps the AVIF quality for a heavy photo (e.g. pickup-bed logs).
    const avifQ = info.avif != null ? Math.min(info.avif, t.avif) : t.avif;
    await base.clone().avif({ quality: avifQ, effort: 6 }).toFile(`${out}.avif`);
    await base.clone().webp({ quality: 72 }).toFile(`${out}.webp`);
    await base.clone().jpeg({ quality: jpegQ, mozjpeg: true }).toFile(`${out}.jpg`);
  }
}

async function genPhotos() {
  await ensure(IMAGES);
  await ensure(GEN);
  const manifest = {};
  for (const id of Object.keys(PHOTO_URLS)) {
    const info = PHOTO_URLS[id];
    // Reuse committed images when present so a CI build needs no network.
    const existing = path.join(IMAGES, `${info.file}-1280.avif`);
    try {
      await fs.access(existing);
      manifest[id] = true;
      console.log(`assets: photo ${id} already present, reusing`);
      continue;
    } catch {
      /* not cached, download below */
    }
    try {
      await processPhoto(id);
      manifest[id] = true;
      console.log(`assets: photo ${id} processed`);
    } catch (e) {
      manifest[id] = false;
      console.warn(`assets: photo ${id} skipped (${e.message}); color block will render`);
    }
  }
  await fs.writeFile(path.join(GEN, 'photo-manifest.json'), JSON.stringify(manifest, null, 2));
}

async function loadPages() {
  // Prefer importing the registry directly (Node strips TS types). Registry.ts has
  // only type-only imports, so nothing else loads. Fall back to the JSON snapshot.
  try {
    const url = pathToFileURL(path.join(ROOT, 'lib', 'registry.ts')).href;
    const mod = await import(url);
    const pages = mod.PAGES.map((p) => ({
      slug: p.slug,
      path: p.path,
      h1: p.h1,
      description: p.description,
      category: p.category,
    }));
    await ensure(GEN);
    await fs.writeFile(path.join(GEN, 'pages.json'), JSON.stringify(pages, null, 2));
    return pages;
  } catch (e) {
    console.warn(`assets: registry import failed (${e.message}); trying snapshot`);
    try {
      const raw = await fs.readFile(path.join(GEN, 'pages.json'), 'utf8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}

async function main() {
  await ensure(PUBLIC);
  await copyBrand().catch((e) => console.warn(`assets: brand copy failed: ${e.message}`));

  const pages = await loadPages();
  if (pages) {
    await genOg(pages).catch((e) => console.warn(`assets: OG step failed: ${e.message}`));
    await writeLlms(pages).catch((e) => console.warn(`assets: llms step failed: ${e.message}`));
  } else {
    console.warn('assets: pages.json snapshot missing; skipping OG + llms');
  }

  await genPhotos().catch((e) => console.warn(`assets: photo step failed: ${e.message}`));
  console.log('assets: done');
}

main();
