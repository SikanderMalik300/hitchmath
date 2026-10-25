import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { PAGES, getPage } from '@/lib/registry';
import { SOURCES } from '../../sources';
import f250 from './ford-f250-2026';
import f350 from './ford-f350-2026';
import f450 from './ford-f450-2026';
import ram2500 from './ram-2500-2026';
import ram3500 from './ram-3500-2026';
import s2500 from './chevy-silverado-2500hd-2026';
import s3500 from './chevy-silverado-3500hd-2026';
import type { HdVehicle, HdRow } from './hd-types';
import { F250, F350, F450, RAM2500, RAM3500, SILVERADO2500, SILVERADO3500 } from '@/lib/pages/vehicle-content-4';
import type { HdContent } from '@/components/HdVehiclePage';

const ALL: [string, HdVehicle, HdContent][] = [
  ['F-250', f250, F250],
  ['F-350', f350, F350],
  ['F-450', f450, F450],
  ['Ram 2500', ram2500, RAM2500],
  ['Ram 3500', ram3500, RAM3500],
  ['Silverado 2500', s2500, SILVERADO2500],
  ['Silverado 3500', s3500, SILVERADO3500],
];

describe('batch-4 data integrity', () => {
  it('every HD source id resolves and all 7 ship verified:false', () => {
    for (const [, v] of ALL) expect(SOURCES[v.source]).toBeDefined();
    for (const slug of ['ford-f250-towing-capacity', 'ford-f350-towing-capacity', 'ford-f450-towing-capacity', 'ram-2500-towing-capacity', 'ram-3500-towing-capacity', 'chevy-silverado-2500hd-towing-capacity', 'chevy-silverado-3500hd-towing-capacity'])
      expect(getPage(slug).verified).toBe(false);
  });
  it('no Ram row comes from an NA value (every maxTrailer is a finite number)', () => {
    for (const v of [ram2500, ram3500])
      for (const r of v.rows) expect(Number.isFinite(r.maxTrailer)).toBe(true);
  });
  it('row counts per data file', () => {
    expect(f250.rows.length).toBe(98);
    expect(f350.rows.length).toBe(101);
    expect(f450.rows.length).toBe(9);
    expect(ram2500.rows.length).toBe(43);
    expect(ram3500.rows.length).toBe(30);
    expect(s2500.rows.length).toBe(76);
    expect(s3500.rows.length).toBe(35);
  });
});

// Golden cells (section 3 + owner's extras) checked against the COMMITTED data,
// so CI verifies them without the PDFs. The extractor checks the full set.
describe('golden cells match the committed data', () => {
  const fordCell = (v: HdVehicle, s: { engine: string; axle: string; gcwr: number; col: string }) =>
    v.rows.find((r) => r.engine === s.engine && (r.axle || '').replace(/\^.*/, '') === s.axle && r.gcwr === s.gcwr && r.colLabel === s.col);
  it('F-250 p.20 two-value and footnoted cells', () => {
    expect(fordCell(f250, { engine: '7.3L V8', axle: '3.73', gcwr: 23500, col: 'SuperCab 4x2 164.2"' })?.raw).toBe('17,000/16,900');
    expect(fordCell(f250, { engine: '7.3L V8', axle: '3.73', gcwr: 23500, col: 'SuperCab 4x2 164.2"' })?.footnotes).toEqual(['5']);
    const c = fordCell(f250, { engine: '7.3L V8', axle: '4.30', gcwr: 26000, col: 'Crew Cab 4x4 159.8"' });
    expect(c?.raw).toBe('18,200');
    expect(c?.footnotes).toEqual(['4']);
  });
  it('F-350 SRW 23,500/25,000 and DRW 24,800/18,200 + 30,000', () => {
    expect(fordCell(f350, { engine: '6.7L V8 H.O. Turbo Diesel', axle: '3.55', gcwr: 35200, col: 'Crew Cab 4x4 176.0"' })?.raw).toBe('23,500/25,000');
    expect(fordCell(f350, { engine: '6.7L V8 Turbo Diesel', axle: '3.55', gcwr: 40000, col: 'F-350 Regular Cab 4x2 141.6"' })?.raw).toBe('24,800/18,200');
    expect(fordCell(f450, { engine: '6.7L V8 Turbo Diesel', axle: '4.30', gcwr: 43500, col: 'F-450 Crew Cab 4x2 176.0"' })?.raw).toBe('30,000');
  });
  const gmCell = (v: HdVehicle, s: { gvwr: number; gcwr: number; conv: number; gn: string; foot?: string[] }) =>
    v.rows.find((r) => r.gvwr === s.gvwr && r.gcwr === s.gcwr && r.conv === s.conv && r.gnRaw === s.gn && (r.gnFoot || []).join(',') === (s.foot || []).join(','));
  it('GM 2500 period (18,300), low-GVWR (12,640), ZR2 footnotes, Max pkg (22,050)', () => {
    expect(gmCell(s2500, { gvwr: 10650, gcwr: 26000, conv: 14500, gn: '18,300' })).toBeTruthy();
    expect(gmCell(s2500, { gvwr: 10000, gcwr: 24500, conv: 14500, gn: '12,640' })).toBeTruthy();
    expect(gmCell(s2500, { gvwr: 10850, gcwr: 26000, conv: 16000, gn: '18,070', foot: ['4'] })).toBeTruthy();
    expect(gmCell(s2500, { gvwr: 11450, gcwr: 30000, conv: 14500, gn: '22,050' })).toBeTruthy();
  });
  it('GM 3500 footnote-4 gooseneck (36,000/32,000) and 31,500', () => {
    expect(gmCell(s3500, { gvwr: 14000, gcwr: 43900, conv: 20000, gn: '36,000/32,000', foot: ['4'] })).toBeTruthy();
    expect(gmCell(s3500, { gvwr: 14000, gcwr: 40000, conv: 20000, gn: '31,500' })).toBeTruthy();
  });
  it('Ram HEMI 15,540/15,220, Power Wagon 10,530 (4x4 only), 3500 top 36,610', () => {
    const hemi = ram2500.rows.filter((r) => r.engine.includes('HEMI') && r.axle === '3.73' && r.gvwr === 9900 && r.gcwr === 22050 && r.cab === 'Regular Cab' && r.bed === "8'");
    expect(hemi.find((r) => r.drive === '4x2')?.maxTrailer).toBe(15540);
    expect(hemi.find((r) => r.drive === '4x4')?.maxTrailer).toBe(15220);
    const pw = ram2500.rows.filter((r) => r.gvwr === 8565 && r.gcwr === 18000);
    expect(pw.every((r) => r.drive === '4x4')).toBe(true); // 4x2 was NA and dropped
    expect(pw.find((r) => r.cab === 'Crew Cab' && r.bed === '6\'4"')?.maxTrailer).toBe(10530);
    const top = ram3500.rows.find((r) => r.gcwr === 45000 && r.maxTrailer === 36610);
    expect(top).toBeTruthy();
    expect(top?.drive).toBe('4x4');
    expect(top?.cab).toBe('Regular Cab');
  });
});

describe('Max-by-engine equals the max over the data rows', () => {
  it('each max value is really present in the rows', () => {
    for (const [name, v] of ALL.map((a) => [a[0], a[1]] as [string, HdVehicle])) {
      for (const m of v.maxByEngine) {
        if (v.kind === 'ram') {
          const max = Math.max(...v.rows.filter((r) => r.engine === m.engine).map((r) => r.maxTrailer as number));
          expect(m.trailer?.value, `${name} ${m.engine}`).toBe(max);
        } else if (v.kind === 'gm') {
          const rows = v.rows.filter((r) => r.engine === m.engine);
          const conv = Math.max(...rows.map((r) => (r.conv as number) ?? 0));
          const gn = Math.max(...rows.map((r) => Math.max((r.gn as number) ?? 0, (r.gnAlt as number) ?? 0)));
          expect(m.conventional?.value, `${name} ${m.engine} conv`).toBe(conv);
          expect(m.gooseneck?.value, `${name} ${m.engine} gn`).toBe(gn);
        } else {
          const conv = Math.max(...v.rows.filter((r) => r.engine === m.engine).map((r) => Math.max((r.maxTrailer as number) ?? 0, (r.maxTrailerAlt as number) ?? 0)));
          expect(m.conventional?.value, `${name} ${m.engine}`).toBe(conv);
        }
      }
    }
  });
});

describe('every weight number in the copy comes from the data or an allowed result', () => {
  function dataNumbers(v: HdVehicle): Set<number> {
    const s = new Set<number>();
    const add = (n: unknown) => {
      if (typeof n === 'number' && n >= 1000) s.add(n);
    };
    for (const r of v.rows) [r.maxTrailer, r.maxTrailerAlt, r.gcwr, r.gvwr, r.conv, r.gn, r.gnAlt].forEach(add);
    for (const h of v.hitchTable || []) [h.maxTrailer, h.maxTongue].forEach(add);
    for (const p of v.payloadRows || []) [p.payload, p.gvwr].forEach(add);
    for (const m of v.maxByEngine) [m.conventional?.value, m.gooseneck?.value, m.trailer?.value].forEach(add);
    return s;
  }
  function copyNumbers(text: string): number[] {
    return (text.match(/\d{1,3}(?:,\d{3})+|\b\d{4}\b/g) ?? []).map((t) => Number(t.replace(/,/g, '')));
  }
  const EXTRAS: Record<string, number[]> = {
    'F-250': [15000, 1500],
    'F-350': [],
    'F-450': [26001],
    'Ram 2500': [2200, 2000],
    'Ram 3500': [23000, 2300, 26001],
    'Silverado 2500': [],
    'Silverado 3500': [26001],
  };
  const GLOBAL = [2026, 1500, 2500, 3500]; // model numbers + years are 4-digit tokens

  for (const [name, v, c] of ALL) {
    it(`${name}: no stray weight numbers`, () => {
      const page = getPage(v.slug);
      const text = [page.title, page.meta, c.quickAnswer, ...c.sections.map((x) => x.body as string), ...c.faq.flatMap((f) => [f.q, f.a])].join(' ');
      const allowed = new Set<number>([...dataNumbers(v), ...(EXTRAS[name] ?? []), ...GLOBAL]);
      for (const n of copyNumbers(text)) expect(allowed.has(n), `${name} copy has ${n} with no data source`).toBe(true);
    });
  }
});

describe('hub + home reflect verified vehicles only', () => {
  it('registry has 31 vehicle pages; 24 are verified, 7 HD are not', () => {
    const vehicles = PAGES.filter((p) => p.category === 'vehicle');
    expect(vehicles.length).toBe(31);
    expect(vehicles.filter((p) => p.verified !== false).length).toBe(24);
    expect(vehicles.filter((p) => p.verified === false).length).toBe(7);
  });
  it('the hub source references all 7 HD slugs (rendered only once verified)', () => {
    const src = readFileSync(path.resolve('app/(site)/towing-capacity/page.tsx'), 'utf8');
    for (const slug of ['ford-f250', 'ford-f350', 'ford-f450', 'ram-2500', 'ram-3500', 'chevy-silverado-2500hd', 'chevy-silverado-3500hd'])
      expect(src.includes(`${slug}-towing-capacity`)).toBe(true);
  });
});
