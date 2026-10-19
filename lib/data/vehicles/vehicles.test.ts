import { describe, it, expect } from 'vitest';
import { VEHICLES } from './index';
import { maxTrailer, minTrailer, maxPayload, minPayload } from './types';
import { toyotaTacoma2026 } from './toyota-tacoma-2026';
import { fordF1502026 } from './ford-f150-2026';
import { toyotaTundra2026 } from './toyota-tundra-2026';
import { ram15002026 } from './ram-1500-2026';
import { chevySilverado15002026 } from './chevy-silverado-1500-2026';
import { toyota4Runner2026 } from './toyota-4runner-2026';
import { SOURCES } from '../sources';
import { ceilCount } from '@/lib/calc/util';

const byId = (v: typeof toyotaTacoma2026, id: string) => {
  const r = v.rows.find((row) => row.id === id);
  if (!r) throw new Error(`row ${id} not found`);
  return r;
};

describe('vehicle data integrity (A6.5)', () => {
  it('every row on every vehicle has a known source', () => {
    for (const v of VEHICLES) {
      expect(v.rows.length).toBeGreaterThan(0);
      for (const row of v.rows) {
        expect(row.source).toBeTruthy();
        expect(SOURCES[row.source]).toBeDefined();
      }
    }
  });

  it('every year-history row has at least one source', () => {
    for (const v of VEHICLES) {
      if (!v.yearHistory) continue;
      for (const r of v.yearHistory.rows) {
        expect(r.sources.length).toBeGreaterThan(0);
        for (const s of r.sources) expect(SOURCES[s]).toBeDefined();
      }
    }
  });
});

describe('Tacoma (page 5)', () => {
  const v = toyotaTacoma2026;
  it('has 27 configurations', () => {
    expect(v.rows.length).toBe(27);
  });
  it('quick answer max/min towing match the data', () => {
    expect(maxTrailer(v.rows)).toBe(6500);
    expect(minTrailer(v.rows)).toBe(3500);
  });
  it('payload runs from 1,230 to 1,705', () => {
    expect(minPayload(v.rows)).toBe(1230);
    expect(maxPayload(v.rows)).toBe(1705);
  });
  it('hybrid curb-weight penalties are 400, 470 and 455 lb', () => {
    expect(byId(v, '7532').curbWeight! - byId(v, '7544').curbWeight!).toBe(400);
    expect(byId(v, '7530').curbWeight! - byId(v, '7542').curbWeight!).toBe(470);
    expect(byId(v, '7534').curbWeight! - byId(v, '7582').curbWeight!).toBe(455);
  });
  it('640 lb tongue at 12% matches a trailer of about 5,330 lb', () => {
    const trailer = 640 / 0.12; // 5333.3
    expect(Math.round(trailer / 10) * 10).toBe(5330);
  });
  it('every Double Cab lists a 640 lb max tongue', () => {
    for (const r of v.rows.filter((x) => x.cab === 'Double Cab')) {
      expect(r.maxTongue).toBe(640);
    }
  });
  it('the 3,500 lb versions are four SR automatics', () => {
    const low = v.rows.filter((r) => r.maxTrailer === 3500);
    expect(low.length).toBe(4);
    expect(low.every((r) => r.grade === 'SR' && r.transmission === 'AT')).toBe(true);
  });
});

describe('F-150 (page 6)', () => {
  const v = fordF1502026;
  it('quick answer max/min towing match the data', () => {
    expect(maxTrailer(v.rows)).toBe(13500);
    expect(minTrailer(v.rows)).toBe(8200);
  });
  it('max payload is 2,440 lb', () => {
    expect(maxPayload(v.rows)).toBe(2440);
  });
  it('ships a GCWR reference table with six rows', () => {
    expect(v.gcwrTable?.rows.length).toBe(6);
  });
});

describe('Tundra (page 7)', () => {
  const v = toyotaTundra2026;
  it('has 32 configurations', () => {
    expect(v.rows.length).toBe(32);
  });
  it('quick answer max/min towing match the data', () => {
    expect(maxTrailer(v.rows)).toBe(12000);
    expect(minTrailer(v.rows)).toBe(8300);
  });
  it('payload runs from 1,420 to 1,850', () => {
    expect(minPayload(v.rows)).toBe(1420);
    expect(maxPayload(v.rows)).toBe(1850);
  });
  it('the single 12,000 lb row is the SR5 Double Cab 6.5-ft 4x2', () => {
    const top = v.rows.filter((r) => r.maxTrailer === 12000);
    expect(top.length).toBe(1);
    expect(top[0].id).toBe('8241');
  });
  it('Limited CrewMax 5.5-ft 4x4 i-FORCE vs i-FORCE MAX are 11,120 and 11,130', () => {
    expect(byId(v, '8372').maxTrailer).toBe(11120);
    expect(byId(v, '8421').maxTrailer).toBe(11130);
  });
  it('Platinum hybrid 4x4 (10,990) rates below the i-FORCE (11,050)', () => {
    expect(byId(v, '8422').maxTrailer).toBe(10990);
    expect(byId(v, '8375').maxTrailer).toBe(11050);
  });
});

describe('Ram 1500 (page 8)', () => {
  const v = ram15002026;
  it('quick answer max/min towing match the data', () => {
    expect(maxTrailer(v.rows)).toBe(11610);
    expect(minTrailer(v.rows)).toBe(8130);
  });
  it('max payload is 2,360 lb', () => {
    expect(maxPayload(v.rows)).toBe(2360);
  });
  it('HEMI 11,320 and Hurricane SO 11,610 both carry a 17,000 lb GCWR', () => {
    const hemi = v.rows.find((r) => r.id === 'hemi')!;
    const hso = v.rows.find((r) => r.id === 'hso')!;
    expect(hemi.maxTrailer).toBe(11320);
    expect(hso.maxTrailer).toBe(11610);
    expect(hemi.gcwr).toBe(17000);
    expect(hso.gcwr).toBe(17000);
  });
});

describe('Silverado 1500 (page 9)', () => {
  const v = chevySilverado15002026;
  it('quick answer max/min towing match the data', () => {
    expect(maxTrailer(v.rows)).toBe(13300);
    expect(minTrailer(v.rows)).toBe(8700);
  });
  it('uses the guide value 11,300 for 5.3L Max Trailering Double Cab 2WD', () => {
    const row = v.rows.find(
      (r) =>
        r.engine === '5.3L V8' &&
        r.package === 'Max Trailering' &&
        r.cab === 'Double Cab Standard Box' &&
        r.drive === '2WD',
    )!;
    expect(row.maxTrailer).toBe(11300);
    expect(row.note).toContain('11,400');
  });
  it('uses the guide GCWR 19,000 for the Duramax 20" Double Cab', () => {
    const row = v.rows.find(
      (r) =>
        r.engine === '3.0L Duramax' &&
        r.package === 'Max Trailering, 20" wheels' &&
        r.cab === 'Double Cab Standard Box' &&
        r.drive === '2WD',
    )!;
    expect(row.gcwr).toBe(19000);
    expect(row.note).toContain('19,100');
  });
  it('uses the guide value 12,900 for Duramax 20" Crew Std 4x4', () => {
    const row = v.rows.find(
      (r) =>
        r.engine === '3.0L Duramax' &&
        r.package === 'Max Trailering, 20" wheels' &&
        r.cab === 'Crew Cab Standard Box' &&
        r.drive === '4x4',
    )!;
    expect(row.maxTrailer).toBe(12900);
    expect(row.note).toContain('12,800');
  });
});

describe('4Runner (page 10)', () => {
  const v = toyota4Runner2026;
  it('has 16 versions', () => {
    expect(v.rows.length).toBe(16);
  });
  it('quick answer max/min towing match the data', () => {
    expect(maxTrailer(v.rows)).toBe(6000);
    expect(minTrailer(v.rows)).toBe(5800);
  });
  it('payload (GVWR minus curb) runs from 1,005 to 1,550', () => {
    expect(minPayload(v.rows)).toBe(1005);
    expect(maxPayload(v.rows)).toBe(1550);
  });
  it('every payload equals GVWR minus curb and is marked computed', () => {
    for (const r of v.rows) {
      expect(r.payload).toBe(r.gvwr! - r.curbWeight!);
      expect(r.payloadComputed).toBe(true);
    }
  });
  it('off-road trims weigh 705 to 815 lb more than the SR5 4x4', () => {
    const sr5 = byId(v, '8664').curbWeight!; // 4,685
    expect(byId(v, '8638').curbWeight! - sr5).toBe(705); // Platinum
    expect(byId(v, '8636').curbWeight! - sr5).toBe(815); // Trailhunter
  });
  it('13 versions are rated 6,000 lb and 3 at 5,800 lb', () => {
    expect(v.rows.filter((r) => r.maxTrailer === 6000).length).toBe(13);
    expect(v.rows.filter((r) => r.maxTrailer === 5800).length).toBe(3);
  });
});

describe('ceilCount helper (A6.5)', () => {
  it('rounds up with float-error guard', () => {
    expect(ceilCount(2.0000001)).toBe(2);
    expect(ceilCount(2.1)).toBe(3);
  });
});
