// IndexNow submitter. Runs only on production deploys (from a GitHub Action, after
// Cloudflare reports success) - never during `next build`. Sends HTML content and hub
// URLs only: never images, robots.txt or favicon.
import { promises as fs } from 'node:fs';
import path from 'node:path';

const HOST = 'hitchmath.com';
const ORIGIN = `https://${HOST}`;
const PUBLIC = path.resolve('public');

async function findKey() {
  const files = await fs.readdir(PUBLIC);
  const keyFile = files.find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!keyFile) throw new Error('No IndexNow key file (public/<32-hex>.txt) found');
  const key = (await fs.readFile(path.join(PUBLIC, keyFile), 'utf8')).trim();
  return { key, keyLocation: `${ORIGIN}/${keyFile}` };
}

async function urlList() {
  // pages.json is written by scripts/gen-assets.mjs and committed, so no TS import is needed.
  const raw = await fs.readFile(path.resolve('lib/generated/pages.json'), 'utf8');
  const pages = JSON.parse(raw);
  return pages
    .filter(
      (p) =>
        (p.category === 'home' ||
          p.category === 'tool' ||
          p.category === 'vehicle' ||
          p.category === 'guide' ||
          p.category === 'hub') &&
        p.verified !== false,
    )
    .map((p) => `${ORIGIN}${p.path}`);
}

async function main() {
  const { key, keyLocation } = await findKey();
  const urls = await urlList();
  const body = { host: HOST, key, keyLocation, urlList: urls };
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => '');
  console.log(`IndexNow: HTTP ${res.status}, submitted ${urls.length} URLs`);
  if (res.status === 200 || res.status === 202) {
    process.exit(0);
  }
  console.error(`IndexNow failed: HTTP ${res.status} ${text}`);
  process.exit(1);
}

main().catch((e) => {
  console.error('IndexNow error:', e.message);
  process.exit(1);
});
