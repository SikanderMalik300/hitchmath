import { describe, it, expect } from 'vitest';
import { PAGES } from '@/lib/registry';
import { SOURCES } from '../sources';
import {
  fordMaverick2026,
  toyotaHighlander2026,
  toyotaRav42026,
  fordRanger2026,
  hondaRidgeline2026,
  chevyColorado2026,
  fordBronco2026,
  fordExplorer2026,
  hondaPilot2026,
  subaruOutback2026,
} from './index';
import { maxTrailer, minTrailer, type VehicleData } from './types';
import {
  MAVERICK,
  HIGHLANDER,
  RAV4,
  RANGER,
  RIDGELINE,
  COLORADO,
  BRONCO,
  EXPLORER,
  PILOT,
  OUTBACK,
} from '@/lib/pages/vehicle-content-2';
import type { VehicleContent } from '@/components/VehiclePage';

describe('registry SEO lengths (A3, fix-04 §4)', () => {
  it('every page title is 30-60 and meta 110-160 characters', () => {
    for (const p of PAGES) {
      expect(p.title.length, `title: ${p.title}`).toBeGreaterThanOrEqual(30);
      expect(p.title.length, `title: ${p.title}`).toBeLessThanOrEqual(60);
      expect(p.meta.length, `meta short on ${p.slug}`).toBeGreaterThanOrEqual(110);
      expect(p.meta.length, `meta long on ${p.slug}`).toBeLessThanOrEqual(160);
    }
  });
  it('every batch-2 source resolves', () => {
    for (const v of [
      fordMaverick2026,
      toyotaHighlander2026,
      toyotaRav42026,
      fordRanger2026,
      hondaRidgeline2026,
      chevyColorado2026,
      fordBronco2026,
      fordExplorer2026,
      hondaPilot2026,
      subaruOutback2026,
    ]) {
      for (const row of v.rows) expect(SOURCES[row.source]).toBeDefined();
    }
  });
});

describe('batch-2 row counts (section 5)', () => {
  const cases: [string, VehicleData, number][] = [
    ['Maverick', fordMaverick2026, 7],
    ['Highlander', toyotaHighlander2026, 7],
    ['RAV4', toyotaRav42026, 9],
    ['Ranger', fordRanger2026, 4],
    ['Ridgeline', hondaRidgeline2026, 4],
    ['Colorado', chevyColorado2026, 3],
    ['Bronco', fordBronco2026, 10],
    ['Explorer', fordExplorer2026, 6],
    ['Pilot', hondaPilot2026, 8],
    ['Outback', subaruOutback2026, 6],
  ];
  for (const [name, v, n] of cases) {
    it(`${name} has ${n} rows`, () => {
      expect(v.rows.length).toBe(n);
    });
  }
  it('Bronco has 20 trim entries across 10 rows', () => {
    const total = fordBronco2026.rows.reduce((s, r) => s + (r.trims?.length ?? 0), 0);
    expect(total).toBe(20);
    const trimTows = fordBronco2026.rows.flatMap((r) => (r.trims ?? []).map((t) => t.maxTrailer));
    expect(Math.min(...trimTows)).toBe(3460);
    expect(Math.max(...trimTows)).toBe(4500);
  });
});

describe('computed payload = GVWR - curb (Highlander, RAV4)', () => {
  for (const v of [toyotaHighlander2026, toyotaRav42026]) {
    it(`${v.model} payload column is computed`, () => {
      for (const r of v.rows) {
        expect(r.payloadComputed).toBe(true);
        expect(r.payload).toBe((r.gvwr as number) - (r.curbWeight as number));
      }
    });
  }
});

describe('headline ranges match the data', () => {
  it('Maverick 2,000 to 4,000', () => {
    expect(minTrailer(fordMaverick2026.rows)).toBe(2000);
    expect(maxTrailer(fordMaverick2026.rows)).toBe(4000);
  });
  it('Highlander 3,500 to 5,000', () => {
    expect(minTrailer(toyotaHighlander2026.rows)).toBe(3500);
    expect(maxTrailer(toyotaHighlander2026.rows)).toBe(5000);
  });
  it('RAV4 1,750 to 3,500', () => {
    expect(minTrailer(toyotaRav42026.rows)).toBe(1750);
    expect(maxTrailer(toyotaRav42026.rows)).toBe(3500);
  });
  it('Ranger 5,510 to 7,500', () => {
    expect(minTrailer(fordRanger2026.rows)).toBe(5510);
    expect(maxTrailer(fordRanger2026.rows)).toBe(7500);
  });
  it('Colorado 3,500 to 7,700', () => {
    expect(minTrailer(chevyColorado2026.rows)).toBe(3500);
    expect(maxTrailer(chevyColorado2026.rows)).toBe(7700);
  });
  it('Outback 2,700 to 3,500', () => {
    expect(minTrailer(subaruOutback2026.rows)).toBe(2700);
    expect(maxTrailer(subaruOutback2026.rows)).toBe(3500);
  });
});

describe('arithmetic results used in the copy (section 2 "Coding agent: test")', () => {
  const about = (n: number) => Math.round(n / 10) * 10;
  it('Maverick 400 / 0.12 ≈ 3,330', () => {
    expect(about(400 / 0.12)).toBe(3330);
    expect(MAVERICK.sections.some((s) => (s.body as string).includes('3,330'))).toBe(true);
  });
  it('Highlander 480 + 360 + 200 = 1,040', () => {
    expect(480 + 360 + 200).toBe(1040);
    expect(HIGHLANDER.sections.some((s) => (s.body as string).includes('1,040'))).toBe(true);
  });
  it('RAV4 3,000 × 0.12 = 360', () => {
    expect(3000 * 0.12).toBe(360);
    expect(RAV4.sections.some((s) => (s.body as string).includes('360'))).toBe(true);
  });
  it('Ranger 750 / 0.12 = 6,250 and 12,745 − 12,590 = 155', () => {
    expect(Math.round(750 / 0.12)).toBe(6250);
    expect(12745 - 12590).toBe(155);
    expect(RANGER.sections.some((s) => (s.body as string).includes('6,250'))).toBe(true);
    expect(RANGER.sections.some((s) => (s.body as string).includes('155'))).toBe(true);
  });
  it('Ridgeline GCWR math: 566, 482, 1,482, 1,566', () => {
    expect(9986 - 4420 - 5000).toBe(566);
    expect(9986 - 4504 - 5000).toBe(482);
    expect(9986 - 4504 - 4000).toBe(1482);
    expect(9986 - 4420 - 4000).toBe(1566);
    const all = (RIDGELINE.sections.map((s) => s.body as string).join(' ') + ' ' + RIDGELINE.faq.map((f) => f.a).join(' '));
    for (const n of ['566', '482', '1,482', '1,566']) expect(all.includes(n), n).toBe(true);
  });
  it('Colorado 7,700 − 6,000 = 1,700 and 770 / 0.12 ≈ 6,420', () => {
    expect(7700 - 6000).toBe(1700);
    expect(about(770 / 0.12)).toBe(6420);
    const all = COLORADO.sections.map((s) => s.body as string).join(' ');
    expect(all.includes('1,700')).toBe(true);
    expect(all.includes('6,420')).toBe(true);
  });
  it('Bronco 350 / 0.12 ≈ 2,920', () => {
    expect(about(350 / 0.12)).toBe(2920);
    expect(BRONCO.faq.some((f) => f.a.includes('2,920'))).toBe(true);
  });
  it('Explorer 10,800 − 10,100 = 700 and 500 / 0.12 ≈ 4,170', () => {
    expect(10800 - 10100).toBe(700);
    expect(about(500 / 0.12)).toBe(4170);
    const all = EXPLORER.sections.map((s) => s.body as string).join(' ');
    expect(all.includes('700')).toBe(true);
    expect(all.includes('4,170')).toBe(true);
  });
});

describe('every weight number in the copy comes from the data or an allowed result', () => {
  function dataNumbers(v: VehicleData): Set<number> {
    const s = new Set<number>();
    for (const r of v.rows) {
      for (const n of [r.maxTrailer, r.maxTongue, r.gcwr, r.payload, r.curbWeight, r.gvwr]) {
        if (typeof n === 'number' && n >= 1000) s.add(n);
      }
      for (const t of r.trims ?? []) if (t.maxTrailer >= 1000) s.add(t.maxTrailer);
    }
    return s;
  }
  function copyNumbers(c: VehicleContent): number[] {
    const text = [c.quickAnswer, ...c.sections.map((x) => x.body as string), ...c.faq.flatMap((f) => [f.q, f.a])].join(' ');
    const tokens = text.match(/\d{1,3}(?:,\d{3})+|\b\d{4}\b/g) ?? [];
    return tokens.map((t) => Number(t.replace(/,/g, '')));
  }
  // Numbers in the copy that are examples, cross-model comparisons or arithmetic results,
  // not a rating in this vehicle's own data file.
  const EXTRAS: Record<string, number[]> = {
    Maverick: [5000, 3330],
    Highlander: [1500, 4000, 1040],
    RAV4: [3000],
    Ranger: [3500, 6250],
    Ridgeline: [9420, 4000, 1482, 1566, 7500, 7700],
    Colorado: [1700, 6420, 7500],
    Bronco: [2000, 2920],
    Explorer: [4170],
    Pilot: [1500],
    Outback: [1750, 1500, 3000],
  };
  const GLOBAL = [2026];
  const cases: [string, VehicleData, VehicleContent][] = [
    ['Maverick', fordMaverick2026, MAVERICK],
    ['Highlander', toyotaHighlander2026, HIGHLANDER],
    ['RAV4', toyotaRav42026, RAV4],
    ['Ranger', fordRanger2026, RANGER],
    ['Ridgeline', hondaRidgeline2026, RIDGELINE],
    ['Colorado', chevyColorado2026, COLORADO],
    ['Bronco', fordBronco2026, BRONCO],
    ['Explorer', fordExplorer2026, EXPLORER],
    ['Pilot', hondaPilot2026, PILOT],
    ['Outback', subaruOutback2026, OUTBACK],
  ];
  for (const [name, v, c] of cases) {
    it(`${name}: no stray weight numbers`, () => {
      const allowed = new Set<number>([...dataNumbers(v), ...(EXTRAS[name] ?? []), ...GLOBAL]);
      for (const n of copyNumbers(c)) {
        expect(allowed.has(n), `${name} copy has ${n} with no data source`).toBe(true);
      }
    });
  }
});
