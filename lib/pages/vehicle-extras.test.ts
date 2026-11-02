import { describe, it, expect } from 'vitest';
import { VEHICLES } from '@/lib/data/vehicles';
import { miniConfigs } from '@/lib/data/vehicles/types';
import { checkTow, WD_ADVISORY_TEXT, FORD_F150_WD_ADVISORY_TEXT } from '@/lib/calc/tow';
import { fmt } from '@/lib/format';
import {
  buildWorkedExample,
  buildPicks,
  representativeRow,
  scenarioTrailer,
  drive2wd4x4Diffs,
} from './vehicle-extras';

// --- §1 advisory wording ---------------------------------------------------

describe('fix-06 §1: weight-distribution advisory wording', () => {
  it('generic default text carries no F-150 wording', () => {
    expect(WD_ADVISORY_TEXT.includes('F-150 standard receiver')).toBe(false);
    expect(WD_ADVISORY_TEXT).toContain('weight-distributing hitch');
  });

  it('the Ford-only constant keeps the F-150 wording', () => {
    expect(FORD_F150_WD_ADVISORY_TEXT).toContain('F-150 standard receiver');
  });

  it('checkTow uses wdAdvisoryText when the advisory triggers, else the generic text', () => {
    const base = { trailerWeight: 6000, trailerType: 'conventional' as const, tonguePct: 12 };
    expect(checkTow(base).advisory).toBe(WD_ADVISORY_TEXT);
    expect(checkTow({ ...base, wdAdvisoryText: 'custom line' }).advisory).toBe('custom line');
    // Below the thresholds there is no advisory, so the override is ignored.
    expect(
      checkTow({ trailerWeight: 3000, trailerType: 'conventional', tonguePct: 10, wdAdvisoryText: 'x' })
        .advisory,
    ).toBeNull();
  });
});

// --- §2 worked example -----------------------------------------------------

describe('fix-06 §2: worked example is computed from the calculator', () => {
  it('scenarioTrailer is 80% of max tow rounded down to 500', () => {
    expect(scenarioTrailer(6300)).toBe(5000);
    expect(scenarioTrailer(5000)).toBe(4000);
    expect(scenarioTrailer(13500)).toBe(10500);
    for (const v of VEHICLES) {
      const t = scenarioTrailer(representativeRow(v).maxTrailer);
      expect(t % 500).toBe(0);
      expect(t).toBeLessThanOrEqual(representativeRow(v).maxTrailer * 0.8);
    }
  });

  for (const v of VEHICLES) {
    it(`${v.model}: every number equals the calculator output`, () => {
      const ex = buildWorkedExample(v);
      const row = representativeRow(v);
      const r = checkTow(ex.scenario.input);

      // The section's result IS the calculator's output for the same inputs.
      expect(ex.result).toEqual(r);
      expect(ex.scenario.people).toBe(300);
      expect(ex.scenario.cargo).toBe(150);
      expect(ex.scenario.hitch).toBe(0);
      expect(ex.scenario.trailer).toBe(scenarioTrailer(row.maxTrailer));
      expect(ex.tongue).toBe(r.tongue);

      // Title and section presence.
      expect(ex.title).toBe(`Worked example: ${v.model} with a ${fmt(ex.scenario.trailer)} lb trailer`);
      expect(ex.checks.length).toBeGreaterThanOrEqual(1);

      // Each check's displayed figures come straight from the result.
      const byKey = Object.fromEntries(ex.checks.map((c) => [c.key, c]));
      expect(byKey.trailer.detail).toContain(fmt(r.adjustedTrailerRating));
      expect(byKey.trailer.detail).toContain(fmt(ex.scenario.trailer));
      expect(byKey.tongue.detail).toContain(fmt(r.tongue));
      if (row.maxTongue != null) expect(byKey.tongue.detail).toContain(fmt(row.maxTongue));

      if (row.payload == null) {
        expect(ex.payloadMissing).toBe(true);
        expect(byKey.payload).toBeUndefined();
        expect(ex.payloadNote).toContain(v.make);
        expect(ex.payloadNote).toContain('check your door label');
      } else {
        expect(byKey.payload.detail).toContain(fmt(r.payloadUsed));
        expect(byKey.payload.detail).toContain(fmt(r.payloadCapacity));
      }
      if (byKey.gcwr) expect(byKey.gcwr.detail).toContain(fmt(r.combined));
      if (byKey.gvwr) expect(byKey.gvwr.detail).toContain(fmt(r.truckLoaded));

      // Summary names the limit with the least headroom and that exact figure.
      const spare: Record<string, number> = {};
      if (r.adjustedTrailerRating != null) spare.trailer = r.adjustedTrailerRating - ex.scenario.trailer;
      if (row.payload != null && r.payloadLeft != null) spare.payload = r.payloadLeft;
      if (row.maxTongue != null) spare.tongue = row.maxTongue - (r.tongue as number);
      if (r.combined != null && r.gcwr != null && r.gcwrLeft != null) spare.gcwr = r.gcwrLeft;
      if (r.truckLoaded != null && r.gvwr != null) spare.gvwr = r.gvwr - r.truckLoaded;
      const sorted = Object.entries(spare).sort((a, b) => a[1] - b[1]);
      const [, s] = sorted[0];
      expect(ex.summary).toContain(fmt(Math.abs(s)));
    });
  }
});

// --- §3 which version to pick ----------------------------------------------

describe('fix-06 §3: pick bullets come from the data', () => {
  for (const v of VEHICLES) {
    it(`${v.model}: bullets match the data and skip unsupported ones`, () => {
      const bullets = buildPicks(v);
      const configs = miniConfigs(v);
      expect(bullets.length).toBeGreaterThanOrEqual(1);

      const tows = configs.map((c) => c.maxTrailer);
      const maxT = Math.max(...tows);
      const minT = Math.min(...tows);
      const tow = bullets.find((b) => b.key === 'tow');
      expect(tow).toBeDefined();
      expect(tow!.text).toContain(fmt(maxT));
      if (maxT === minT) expect(tow!.text).toContain('Every version');

      const pays = configs.filter((c) => c.payload != null).map((c) => c.payload as number);
      const payBullet = bullets.find((b) => b.key === 'payload');
      if (pays.length && Math.max(...pays) !== Math.min(...pays)) {
        expect(payBullet!.text).toContain(fmt(Math.max(...pays)));
      } else {
        expect(payBullet).toBeUndefined();
      }

      const gcwrs = configs.filter((c) => c.gcwr != null).map((c) => c.gcwr as number);
      const gcwrBullet = bullets.find((b) => b.key === 'gcwr');
      if (gcwrs.length && Math.max(...gcwrs) !== Math.min(...gcwrs)) {
        expect(gcwrBullet!.text).toContain(fmt(Math.max(...gcwrs)));
      } else {
        expect(gcwrBullet).toBeUndefined();
      }

      const diffs = drive2wd4x4Diffs(v);
      const driveBullet = bullets.find((b) => b.key === 'drive');
      if (diffs.length) {
        expect(driveBullet!.text).toContain(fmt(Math.min(...diffs)));
        expect(driveBullet!.text).toContain(fmt(Math.max(...diffs)));
      } else {
        expect(driveBullet).toBeUndefined();
      }
    });
  }

  it('Explorer has no clean 2WD vs 4x4 difference (every version is 5,000 lb)', () => {
    const explorer = VEHICLES.find((v) => v.slug === 'ford-explorer-towing-capacity')!;
    expect(drive2wd4x4Diffs(explorer)).toEqual([]);
  });
});
