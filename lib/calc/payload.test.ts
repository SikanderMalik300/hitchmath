import { describe, it, expect } from 'vitest';
import { payloadCheck, payloadFromSpecs, tongueFromTrailer } from './payload';
import { lbToKg } from './util';

describe('payload (A6.2)', () => {
  it('P1: capacity 1,610 with people/cargo/tongue gives used 1,330, left 280, 82.6%', () => {
    const r = payloadCheck({
      capacity: 1610,
      people: 680,
      cargo: 150,
      tongue: 500,
      accessories: 0,
      hitchHardware: 0,
    });
    expect(r.used).toBe(1330);
    expect(r.left).toBe(280);
    expect(r.pctUsed).toBe(82.6);
    expect(r.ok).toBe(true);
  });

  it('P2: GVWR 6,240 minus curb 4,630 is 1,610', () => {
    expect(payloadFromSpecs(6240, 4630)).toBe(1610);
  });

  it('P3: Tundra example is 1,925 used, 95 over', () => {
    const r = payloadCheck({
      capacity: 1830,
      people: 400,
      cargo: 350,
      hitchHardware: 95,
      tongue: tongueFromTrailer(9000, 12),
    });
    expect(r.used).toBe(1925);
    expect(r.left).toBe(-95);
    expect(r.over).toBe(true);
    expect(r.overBy).toBe(95);
  });

  it('P4: zero inputs leave the full capacity', () => {
    const r = payloadCheck({ capacity: 1500 });
    expect(r.used).toBe(0);
    expect(r.left).toBe(1500);
  });

  it('P5: a negative result reads "over by"', () => {
    const r = payloadCheck({ capacity: 1000, people: 1200 });
    expect(r.verdict).toContain('Over by');
    expect(r.overBy).toBe(200);
  });

  it('P6: kg toggle converts the capacity', () => {
    expect(lbToKg(1610)).toBe(730); // 1610 * 0.45359237 = 730.28
  });

  it('P7: decimal people weight is handled', () => {
    const r = payloadCheck({ capacity: 1600, people: 180.5, cargo: 100 });
    expect(r.used).toBe(280.5);
    expect(r.left).toBe(1319.5);
  });

  it('P8: accessories are counted', () => {
    const r = payloadCheck({ capacity: 1600, accessories: 120 });
    expect(r.used).toBe(120);
  });

  it('P9: empty capacity gives a message and no NaN', () => {
    const r = payloadCheck({ people: 400, cargo: 100 });
    expect(r.needsCapacity).toBe(true);
    expect(r.verdict).toBe('Enter your payload');
    expect(r.left).toBeNull();
    expect(Number.isNaN(r.used)).toBe(false);
  });

  it('P10: a 1,000,000 lb input stays finite', () => {
    const r = payloadCheck({ capacity: 1000000, people: 1000000 });
    expect(Number.isFinite(r.used)).toBe(true);
    expect(Number.isFinite(r.left as number)).toBe(true);
    expect(Number.isFinite(r.pctUsed as number)).toBe(true);
  });
});
