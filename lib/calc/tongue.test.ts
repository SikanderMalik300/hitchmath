import { describe, it, expect } from 'vitest';
import { tongueRange, tonguePercent, leverMethod } from './tongue';
import { lbToKg } from './util';

describe('tongue (A6.3)', () => {
  it('Q1: 5,000 conventional gives 500 / 600 / 750', () => {
    const r = tongueRange(5000, 'conventional');
    expect([r.low, r.target, r.high]).toEqual([500, 600, 750]);
  });

  it('Q2: 7,000 conventional gives 700 / 840 / 1,050', () => {
    const r = tongueRange(7000, 'conventional');
    expect([r.low, r.target, r.high]).toEqual([700, 840, 1050]);
  });

  it('Q3: 7,000 fifth wheel gives 1,050 / 1,400 / 1,750', () => {
    const r = tongueRange(7000, 'fifthWheel');
    expect([r.low, r.target, r.high]).toEqual([1050, 1400, 1750]);
  });

  it('Q4: measured 620 on 5,200 is 11.9%, usual range', () => {
    const r = tonguePercent(620, 5200);
    expect(r.pct).toBe(11.9);
    expect(r.band).toBe('usual');
    expect(r.label).toBe('in the usual range');
  });

  it('Q5: 400 on 5,000 is 8.0%, light', () => {
    const r = tonguePercent(400, 5000);
    expect(r.pct).toBe(8);
    expect(r.band).toBe('light');
  });

  it('Q6: 900 on 5,000 is 18.0%, heavy', () => {
    const r = tonguePercent(900, 5000);
    expect(r.pct).toBe(18);
    expect(r.band).toBe('heavy');
  });

  it('Q7: lever reading 150 gives about 600', () => {
    expect(leverMethod(150)).toBe(600);
  });

  it('Q8: 6,200 conventional gives 620 / 744 / 930', () => {
    const r = tongueRange(6200, 'conventional');
    expect([r.low, r.target, r.high]).toEqual([620, 744, 930]);
  });

  it('Q9: empty input gives no NaN', () => {
    const r = tonguePercent(null, null);
    expect(r.needsInput).toBe(true);
    expect(r.pct).toBeNull();
    expect(Number.isNaN(r.pct as unknown as number)).toBe(false);
  });

  it('Q10: kg toggle converts a tongue weight', () => {
    expect(lbToKg(600)).toBe(272); // 600 * 0.45359237 = 272.16
  });
});
