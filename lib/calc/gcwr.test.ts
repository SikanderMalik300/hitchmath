import { describe, it, expect } from 'vitest';
import { gcwrCheck } from './gcwr';
import { lbToKg } from './util';

describe('gcwr (A6.4)', () => {
  it('G1: Example 1 combined 14,630, left 370, max trailer by GCWR 8,870', () => {
    const r = gcwrCheck({
      curb: 5400,
      people: 360,
      cargo: 300,
      hitchHardware: 70,
      trailer: 8500,
      gcwr: 15000,
    });
    expect(r.combined).toBe(14630);
    expect(r.left).toBe(370);
    expect(r.maxTrailerByGcwr).toBe(8870);
  });

  it('G2: Example 2 combined 15,850, 850 over', () => {
    const r = gcwrCheck({
      curb: 5400,
      people: 680,
      cargo: 400,
      hitchHardware: 70,
      trailer: 9300,
      gcwr: 15000,
    });
    expect(r.combined).toBe(15850);
    expect(r.over).toBe(true);
    expect(r.overBy).toBe(850);
  });

  it('G3: rating 9,300 with max-by-GCWR 8,870 gives real limit 8,870', () => {
    const r = gcwrCheck({
      curb: 5400,
      people: 360,
      cargo: 300,
      hitchHardware: 70,
      trailer: 8500,
      gcwr: 15000,
      maxTrailerRating: 9300,
    });
    expect(r.realLimit).toBe(8870);
    expect(r.realLimitSource).toBe('gcwr');
  });

  it('G4: zero trailer still computes combined and max trailer', () => {
    const r = gcwrCheck({
      curb: 5400,
      people: 360,
      cargo: 300,
      hitchHardware: 70,
      trailer: 0,
      gcwr: 15000,
    });
    expect(r.combined).toBe(6130);
    expect(r.maxTrailerByGcwr).toBe(8870);
  });

  it('G5: empty GCWR gives a message', () => {
    const r = gcwrCheck({ curb: 5400, trailer: 8000 });
    expect(r.needsGcwr).toBe(true);
    expect(r.verdict).toBe('Enter your GCWR');
  });

  it('G6: kg toggle converts the combined weight', () => {
    expect(lbToKg(14630)).toBe(6636); // 14630 * 0.45359237 = 6636.06 -> 6636
  });

  it('G7: a large trailer stays finite', () => {
    const r = gcwrCheck({ curb: 5400, trailer: 1000000, gcwr: 15000 });
    expect(Number.isFinite(r.combined as number)).toBe(true);
    expect(Number.isFinite(r.left as number)).toBe(true);
    expect(r.over).toBe(true);
  });

  it('G8: decimals are handled', () => {
    const r = gcwrCheck({ curb: 5400.5, trailer: 8500, gcwr: 15000, hitchHardware: 70 });
    expect(r.combined).toBe(13970.5);
  });

  it('G9: a negative left never reads as -0', () => {
    const r = gcwrCheck({ curb: 5000, trailer: 10000, hitchHardware: 0, gcwr: 15000 });
    expect(r.left).toBe(0);
    expect(Object.is(r.left, -0)).toBe(false);
  });

  it('G10: a trailer rating lower than the GCWR limit wins', () => {
    const r = gcwrCheck({
      curb: 5400,
      people: 360,
      cargo: 300,
      hitchHardware: 70,
      trailer: 8000,
      gcwr: 15000,
      maxTrailerRating: 8000,
    });
    expect(r.realLimit).toBe(8000);
    expect(r.realLimitSource).toBe('rating');
  });
});
