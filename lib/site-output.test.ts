import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { PHOTO_LIST } from './data/photos';

const OUT = path.resolve('out');
const hasOut = existsSync(OUT);

function htmlFiles(dir: string): string[] {
  let out: string[] = [];
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) out = out.concat(htmlFiles(p));
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

function jsonLd(html: string): unknown[] {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const nodes: unknown[] = [];
  for (const b of blocks) {
    try {
      const data = JSON.parse(b[1]);
      if (data['@graph']) nodes.push(...data['@graph']);
      else nodes.push(data);
    } catch {
      /* ignore malformed */
    }
  }
  return nodes;
}

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
}

function authorRefs(obj: unknown, acc: string[] = []): string[] {
  if (Array.isArray(obj)) obj.forEach((o) => authorRefs(o, acc));
  else if (obj && typeof obj === 'object') {
    const rec = obj as Record<string, unknown>;
    if (rec.author && typeof rec.author === 'object' && (rec.author as Record<string, unknown>)['@id']) {
      acc.push((rec.author as Record<string, unknown>)['@id'] as string);
    }
    for (const v of Object.values(rec)) authorRefs(v, acc);
  }
  return acc;
}

describe.skipIf(!hasOut)('built output: schema, captions, framing, embeds', () => {
  const files = hasOut ? htmlFiles(OUT) : [];

  it('every author @id resolves to a Person node on the same page (fix-04 §1)', () => {
    for (const f of files) {
      const nodes = jsonLd(readFileSync(f, 'utf8'));
      const personIds = new Set(
        nodes
          .filter((n) => (n as Record<string, unknown>)['@type'] === 'Person')
          .map((n) => (n as Record<string, unknown>)['@id'] as string),
      );
      for (const ref of authorRefs(nodes)) {
        expect(personIds.has(ref), `${path.basename(path.dirname(f))}: author ${ref} has no Person node`).toBe(true);
      }
    }
  });

  it('WebPage dateModified is ISO 8601 and starts with the visible date (fix-05)', () => {
    const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
    for (const f of files) {
      const html = readFileSync(f, 'utf8');
      const webpage = jsonLd(html).find((n) => (n as Record<string, unknown>)['@type'] === 'WebPage') as
        | Record<string, unknown>
        | undefined;
      if (!webpage) continue;
      const dm = webpage.dateModified as string;
      expect(dm, `${f}: dateModified not ISO 8601`).toMatch(ISO);
      expect(visibleText(html).includes(dm.slice(0, 10)), `${f}: date ${dm.slice(0, 10)} not visible`).toBe(true);
    }
  });

  it('every <table> has a <caption> (fix-04 §2)', () => {
    for (const f of files) {
      const html = readFileSync(f, 'utf8');
      for (const tbl of html.match(/<table[\s\S]*?<\/table>/g) ?? []) {
        expect(tbl.includes('<caption'), `${f}: a table has no caption`).toBe(true);
      }
    }
  });

  it('_headers: only /embed/* drops X-Frame-Options and allows framing', () => {
    const headers = readFileSync(path.resolve('out/_headers'), 'utf8');
    expect(headers).toMatch(/\/\*[\s\S]*X-Frame-Options:\s*SAMEORIGIN/);
    expect(headers).toMatch(/\/embed\/\*[\s\S]*! X-Frame-Options/);
    expect(headers).toMatch(/\/embed\/\*[\s\S]*Content-Security-Policy:\s*frame-ancestors \*/);
  });

  it('embed pages: noindex, no analytics, no header/footer', () => {
    const embeds = files.filter((f) => f.includes(`${path.sep}embed${path.sep}`) && f.endsWith('index.html'));
    expect(embeds.length).toBe(3);
    for (const f of embeds) {
      const html = readFileSync(f, 'utf8');
      expect(html).toMatch(/name="robots" content="noindex/);
      expect(html.includes('googletagmanager')).toBe(false);
      expect(html.includes('cloudflareinsights')).toBe(false);
      expect(html.includes('<header')).toBe(false);
      expect(html.includes('<footer')).toBe(false);
    }
  });

  it('embed URLs are not in sitemap.xml', () => {
    const sm = readFileSync(path.resolve('out/sitemap.xml'), 'utf8');
    expect(sm.includes('/embed/')).toBe(false);
  });

  it('each tool page shows its embed snippet with a followed credit link', () => {
    const map: [string, string][] = [
      ['towing-capacity-calculator', 'https://hitchmath.com/towing-capacity-calculator/'],
      ['payload-calculator', 'https://hitchmath.com/payload-calculator/'],
      ['tongue-weight-calculator', 'https://hitchmath.com/tongue-weight-calculator/'],
    ];
    for (const [slug, credit] of map) {
      const html = readFileSync(path.resolve(`out/${slug}/index.html`), 'utf8');
      expect(html.includes(`href="${credit}"`), `${slug}: snippet credit missing`).toBe(true);
      expect(html.includes('nofollow'), `${slug}: snippet must not use nofollow`).toBe(false);
      expect(html.includes('/embed/' + slug + '/'), `${slug}: iframe src missing`).toBe(true);
    }
  });

  it('embed calculator renders the same Example 1 default as the main page', () => {
    const embed = readFileSync(path.resolve('out/embed/towing-capacity-calculator/index.html'), 'utf8');
    const main = readFileSync(path.resolve('out/towing-capacity-calculator/index.html'), 'utf8');
    expect(embed.includes('Within every rating you entered')).toBe(true);
    expect(main.includes('Within every rating you entered')).toBe(true);
  });
});

describe.skipIf(!hasOut)('home cleanup: Latest updates + photo credits', () => {
  const home = () => readFileSync(path.resolve('out/index.html'), 'utf8');

  it('Latest updates shows 6 or fewer items, newest first', () => {
    const h = home();
    const start = h.indexOf('Latest updates');
    const end = h.indexOf('All photo credits', start) > -1 ? h.indexOf('Photo credits (', start) : h.length;
    const section = h.slice(start, end);
    const dates = [...section.matchAll(/tabular">(\d{4}-\d{2}-\d{2})</g)].map((m) => m[1]);
    expect(dates.length).toBeGreaterThan(0);
    expect(dates.length).toBeLessThanOrEqual(6);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
  });

  it('no verified:false (Ford HD) page appears in Latest updates', () => {
    const h = home();
    const start = h.indexOf('Latest updates');
    const end = h.indexOf('Photo credits (', start);
    const section = h.slice(start, end);
    for (const slug of ['ford-f250', 'ford-f350', 'ford-f450'])
      expect(section.includes(`${slug}-towing-capacity`), slug).toBe(false);
  });

  it('home has no photo-credit list items outside the collapsed <details>', () => {
    const h = home();
    const beforeDetails = h.slice(0, h.indexOf('<details'));
    expect(beforeDetails.includes('License)')).toBe(false);
    expect(h.includes('<details')).toBe(true);
    expect(h.includes('All photo credits')).toBe(true);
  });

  it('every page footer links /photo-credits/ (except chrome-free embeds and 404)', () => {
    const files = htmlFiles(OUT).filter((f) => !f.includes(`${path.sep}embed${path.sep}`) && !f.includes(`${path.sep}404`));
    for (const f of files) expect(readFileSync(f, 'utf8').includes('href="/photo-credits/"'), f).toBe(true);
  });

  it('/photo-credits/ lists every photo in photos.ts exactly once', () => {
    // Count in visible text only (the RSC hydration payload repeats every string);
    // decode the entities React escapes in text (&#x27; etc.) so alts with an apostrophe match.
    const decode = (s: string) => s.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    const pc = decode(visibleText(readFileSync(path.resolve('out/photo-credits/index.html'), 'utf8')));
    for (const photo of PHOTO_LIST) {
      const n = pc.split(photo.alt).length - 1;
      expect(n, `${photo.id}: "${photo.alt}"`).toBe(1);
    }
    expect(PHOTO_LIST.length).toBeGreaterThanOrEqual(36); // all site photos are credited
  });

  it('/photo-credits/ is noindex and not in sitemap.xml', () => {
    const pc = readFileSync(path.resolve('out/photo-credits/index.html'), 'utf8');
    expect(/name="robots" content="noindex/.test(pc)).toBe(true);
    expect(readFileSync(path.resolve('out/sitemap.xml'), 'utf8').includes('/photo-credits/')).toBe(false);
  });
});
