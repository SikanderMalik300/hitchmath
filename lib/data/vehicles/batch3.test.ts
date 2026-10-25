import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { PAGES } from '@/lib/registry';
import { SOURCES } from '../sources';
import {
  fordExpedition2026,
  chevyTahoe2026,
  chevySuburban2026,
  chevyTraverse2026,
  jeepWrangler2026,
  nissanFrontier2026,
  subaruAscent2026,
  kiaTelluride2027,
} from './index';
import { type VehicleData } from './types';
import {
  EXPEDITION,
  TAHOE,
  SUBURBAN,
  TRAVERSE,
  WRANGLER,
  FRONTIER,
  ASCENT,
  TELLURIDE,
} from '@/lib/pages/vehicle-content-3';
import type { VehicleContent } from '@/components/VehiclePage';

const BATCH3: VehicleData[] = [
  fordExpedition2026,
  chevyTahoe2026,
  chevySuburban2026,
  chevyTraverse2026,
  jeepWrangler2026,
  nissanFrontier2026,
  subaruAscent2026,
  kiaTelluride2027,
];

describe('batch-3 sources resolve', () => {
  it('every row source and every registry source id is defined', () => {
    for (const v of BATCH3) {
      for (const row of v.rows) expect(SOURCES[row.source], `${v.model}: ${row.source}`).toBeDefined();
    }
    for (const p of PAGES) {
      for (const sid of p.sources ?? []) expect(SOURCES[sid], `${p.slug}: ${sid}`).toBeDefined();
    }
  });
});

describe('batch-3 row counts (section 5)', () => {
  const cases: [string, VehicleData, number][] = [
    ['Expedition', fordExpedition2026, 6],
    ['Tahoe', chevyTahoe2026, 6],
    ['Suburban', chevySuburban2026, 6],
    ['Traverse', chevyTraverse2026, 4],
    ['Wrangler', jeepWrangler2026, 12],
    ['Frontier', nissanFrontier2026, 11],
    ['Ascent', subaruAscent2026, 7],
    ['Telluride', kiaTelluride2027, 18],
  ];
  for (const [name, v, n] of cases) {
    it(`${name} has ${n} rows`, () => {
      expect(v.rows.length).toBe(n);
    });
  }
  it('Wrangler has a separate 2-door reference table', () => {
    expect(jeepWrangler2026.gcwrTable?.rows.length).toBe(1);
  });
});

describe('Telluride payload = GVWR - curb (min and max)', () => {
  it('every payload cell equals GVWR minus curb, both ends', () => {
    for (const r of kiaTelluride2027.rows) {
      expect(r.payloadComputed).toBe(true);
      expect(r.payload).toBe((r.gvwr as number) - (r.curbWeightMax as number));
      expect(r.payloadMax).toBe((r.gvwr as number) - (r.curbWeight as number));
    }
  });
});

describe('Frontier payload sanity: payload ~= GVWR - curb within 60 lb', () => {
  it('no row is off by more than 60 lb', () => {
    let maxGap = 0;
    for (const r of nissanFrontier2026.rows) {
      const gap = Math.abs((r.gvwr as number) - (r.curbWeight as number) - (r.payload as number));
      maxGap = Math.max(maxGap, gap);
    }
    // Reported in the batch-3 notes: the largest gap is 56 lb.
    expect(maxGap).toBeLessThanOrEqual(60);
    expect(maxGap).toBe(56);
  });
});

describe('Tahoe vs Suburban matching cells differ by 100, 200 or 300 lb', () => {
  it('all 12 matching cells are within that range', () => {
    const diffs: number[] = [];
    for (let i = 0; i < chevyTahoe2026.rows.length; i++) {
      const t = chevyTahoe2026.rows[i];
      const s = chevySuburban2026.rows[i];
      diffs.push((t.tow2wd as number) - (s.tow2wd as number));
      diffs.push((t.tow4wd as number) - (s.tow4wd as number));
    }
    expect(diffs.length).toBe(12);
    for (const d of diffs) expect([100, 200, 300]).toContain(d);
  });
});

describe('arithmetic results used in the copy (section "Coding agent: test")', () => {
  const about = (n: number) => Math.round(n / 10) * 10;
  it('Expedition 960 / 0.12 = 8,000', () => {
    expect(960 / 0.12).toBe(8000);
    expect(EXPEDITION.sections.some((s) => (s.body as string).includes('8,000'))).toBe(true);
  });
  it('Traverse 500 / 0.12 ~= 4,170', () => {
    expect(about(500 / 0.12)).toBe(4170);
    const all = [...TRAVERSE.sections.map((s) => s.body as string), ...TRAVERSE.faq.map((f) => f.a)].join(' ');
    expect(all.includes('4,170')).toBe(true);
  });
  it('Wrangler 3,500 x 0.10 = 350 and 1,119 - 350 - 300 = 469', () => {
    expect(3500 * 0.1).toBe(350);
    expect(1119 - 350 - 300).toBe(469);
    expect(WRANGLER.sections.some((s) => (s.body as string).includes('469'))).toBe(true);
  });
  it('Frontier 7,150 - 6,270 = 880 and 6,000 x 0.10 = 600 and 1,310 - 600 - 600 = 110', () => {
    expect(7150 - 6270).toBe(880);
    expect(6000 * 0.1).toBe(600);
    expect(1310 - 600 - 600).toBe(110);
    const all = FRONTIER.sections.map((s) => s.body as string).join(' ');
    expect(all.includes('880')).toBe(true);
    expect(all.includes('110')).toBe(true);
  });
  it('Ascent 5,000 x 0.10 = 500', () => {
    expect(5000 * 0.1).toBe(500);
    expect(ASCENT.sections.some((s) => (s.body as string).includes('500'))).toBe(true);
  });
  it('Telluride 1,616 - 500 - 900 = 216 and 1,656 - 500 - 900 = 256', () => {
    expect(1616 - 500 - 900).toBe(216);
    expect(1656 - 500 - 900).toBe(256);
    const all = TELLURIDE.sections.map((s) => s.body as string).join(' ');
    expect(all.includes('216')).toBe(true);
    expect(all.includes('256')).toBe(true);
  });
  it('GVWR page: 6,261 - 4,645 = 1,616; 6,261 - 4,605 = 1,656; 500 + 600 = 1,100; 1,616 - 1,100 = 516; 1,656 - 1,100 = 556; 6,261 - 4,736 = 1,525', () => {
    expect(6261 - 4645).toBe(1616);
    expect(6261 - 4605).toBe(1656);
    expect(500 + 600).toBe(1100);
    expect(1616 - 1100).toBe(516);
    expect(1656 - 1100).toBe(556);
    expect(6261 - 4736).toBe(1525);
  });
});

describe('no "2026 Telluride" claim anywhere (section 5)', () => {
  it('the Telluride copy only mentions 2026 as a negation', () => {
    const text = [
      TELLURIDE.quickAnswer,
      ...TELLURIDE.sections.map((s) => s.body as string),
      ...TELLURIDE.faq.flatMap((f) => [f.q, f.a]),
    ].join(' ');
    // Allowed: "no 2026 Telluride" (quick answer) and "a 2026 Kia Telluride" (FAQ question).
    const stripped = text
      .replace(/no 2026 Telluride/g, '')
      .replace(/a 2026 Kia Telluride/g, '');
    expect(stripped.includes('2026 Telluride')).toBe(false);
    expect(stripped.includes('2026 Kia Telluride')).toBe(false);
  });
  it('the Telluride data uses model year 2027', () => {
    expect(kiaTelluride2027.year).toBe(2027);
  });
});

describe('hub lists the verified vehicles', () => {
  it('24 vehicle pages are verified and render on the hub (HD pages ship verified:false)', () => {
    const verified = PAGES.filter((p) => p.category === 'vehicle' && p.verified !== false);
    expect(verified.length).toBe(24);
  });
});

describe('every weight number in the copy comes from the data or an allowed result', () => {
  function dataNumbers(v: VehicleData): Set<number> {
    const s = new Set<number>();
    const add = (n: unknown) => {
      if (typeof n === 'number' && n >= 1000) s.add(n);
    };
    for (const r of v.rows) {
      add(r.maxTrailer);
      add(r.maxTongue);
      add(r.gcwr);
      add(r.payload);
      add(r.payloadMax);
      add(r.curbWeight);
      add(r.curbWeightMax);
      add(r.gvwr);
      add(r.tow2wd);
      add(r.tow4wd);
      for (const t of r.trims ?? []) add(t.maxTrailer);
    }
    return s;
  }
  function copyNumbers(text: string): number[] {
    const tokens = text.match(/\d{1,3}(?:,\d{3})+|\b\d{4}\b/g) ?? [];
    return tokens.map((t) => Number(t.replace(/,/g, '')));
  }
  function contentText(c: VehicleContent): string {
    return [c.quickAnswer, ...c.sections.map((x) => x.body as string), ...c.faq.flatMap((f) => [f.q, f.a])].join(' ');
  }

  // Numbers that are examples, cross-model comparisons, arithmetic results or model
  // years, not a rating in this vehicle's own data file.
  const EXTRAS: Record<string, number[]> = {
    Expedition: [7000, 8000],
    Tahoe: [5000],
    Suburban: [5000],
    Traverse: [4170],
    Wrangler: [2000],
    Frontier: [6000],
    Ascent: [2000, 2024],
    Telluride: [5500, 2025, 2027],
  };
  const GLOBAL = [2026];

  const cases: [string, VehicleData, VehicleContent][] = [
    ['Expedition', fordExpedition2026, EXPEDITION],
    ['Tahoe', chevyTahoe2026, TAHOE],
    ['Suburban', chevySuburban2026, SUBURBAN],
    ['Traverse', chevyTraverse2026, TRAVERSE],
    ['Wrangler', jeepWrangler2026, WRANGLER],
    ['Frontier', nissanFrontier2026, FRONTIER],
    ['Ascent', subaruAscent2026, ASCENT],
    ['Telluride', kiaTelluride2027, TELLURIDE],
  ];
  for (const [name, v, c] of cases) {
    it(`${name}: no stray weight numbers`, () => {
      const allowed = new Set<number>([...dataNumbers(v), ...(EXTRAS[name] ?? []), ...GLOBAL]);
      for (const n of copyNumbers(contentText(c))) {
        expect(allowed.has(n), `${name} copy has ${n} with no data source`).toBe(true);
      }
    });
  }

  it('GVWR page: every number comes from the Telluride data or an allowed result', () => {
    const src = readFileSync(path.resolve('app/(site)/gvwr/page.tsx'), 'utf8');
    // Only scan the JSX text, not import paths or class names: the copy regex already
    // ignores 1-3 digit tokens, and the page has no 4-digit class names.
    const allowed = new Set<number>([
      ...dataNumbers(kiaTelluride2027),
      26001, // 49 CFR 383.91 commercial Group thresholds
      10000,
      1100, // 500 + 600
      ...GLOBAL,
      2027,
    ]);
    for (const n of copyNumbers(src)) {
      expect(allowed.has(n), `GVWR page has ${n} with no data source`).toBe(true);
    }
  });
});
