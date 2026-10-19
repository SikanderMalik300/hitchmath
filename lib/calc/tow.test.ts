import { describe, it, expect } from 'vitest';
import { checkTow } from './tow';
import { lbToKg } from './util';

const truck = {
  maxTrailerRating: 6300,
  payloadCapacity: 1610,
  gvwr: 6240,
  curbWeight: 4630,
};

describe('checkTow (A6.1)', () => {
  it('T1: Example 1 (page 1) passes every check', () => {
    const r = checkTow({
      trailerWeight: 4800,
      trailerType: 'conventional',
      tonguePct: 12,
      ...truck,
      people: 360,
      cargo: 200,
      hitchHardware: 60,
    });
    expect(r.tongue).toBe(576);
    expect(r.payloadUsed).toBe(1196);
    expect(r.payloadLeft).toBe(414);
    expect(r.adjustedTrailerRating).toBe(5980);
    expect(r.trailerUsePct).toBe(80.3);
    expect(r.truckLoaded).toBe(5826);
    expect(r.truckLoaded! <= r.gvwr!).toBe(true);
    expect(r.ok).toBe(true);
    expect(r.verdict).toBe('Within every rating you entered');
  });

  it('T2: Example 2 fails payload, trailer rating and (with receiver) tongue', () => {
    const base = {
      trailerWeight: 6000,
      trailerType: 'conventional' as const,
      tonguePct: 12,
      ...truck,
      people: 640,
      cargo: 250,
      hitchHardware: 60,
    };
    const r = checkTow(base);
    expect(r.tongue).toBe(720);
    expect(r.payloadUsed).toBe(1670);
    expect(r.payloadLeft).toBe(-60);
    expect(r.adjustedTrailerRating).toBe(5650);
    expect(r.ok).toBe(false);
    const payload = r.failures.find((f) => f.id === 'payload');
    expect(payload?.overBy).toBe(60);
    const trailer = r.failures.find((f) => f.id === 'trailer');
    expect(trailer?.overBy).toBe(350);

    const r2 = checkTow({ ...base, receiverTongueRating: 640 });
    const tongue = r2.failures.find((f) => f.id === 'receiverTongue');
    expect(tongue?.overBy).toBe(80);
  });

  it('T3: people+cargo+hitch below 300 leaves the rating unchanged', () => {
    const r = checkTow({
      trailerWeight: 4000,
      maxTrailerRating: 6000,
      people: 100,
      cargo: 50,
      hitchHardware: 60,
    });
    expect(r.adjustedTrailerRating).toBe(6000);
  });

  it('T4: fifth wheel default 20% on 10,000 gives 2,000 tongue', () => {
    const r = checkTow({ trailerWeight: 10000, trailerType: 'fifthWheel' });
    expect(r.tongue).toBe(2000);
  });

  it('T5: tonguePct 10 and 15 on 5,000 give 500 and 750', () => {
    expect(checkTow({ trailerWeight: 5000, tonguePct: 10 }).tongue).toBe(500);
    expect(checkTow({ trailerWeight: 5000, tonguePct: 15 }).tongue).toBe(750);
  });

  it('T6: WD advisory at trailer 5,001, not at 5,000, and at tongue 501', () => {
    expect(
      checkTow({ trailerWeight: 5001, trailerType: 'conventional', tonguePct: 10 }).advisory,
    ).not.toBeNull();
    expect(
      checkTow({ trailerWeight: 5000, trailerType: 'conventional', tonguePct: 10 }).advisory,
    ).toBeNull();
    expect(
      checkTow({ trailerWeight: 5000, trailerType: 'conventional', tonguePct: 10.02 }).advisory,
    ).not.toBeNull();
  });

  it('T7: GCWR combined 14,630 with 370 lb left', () => {
    const r = checkTow({
      trailerWeight: 8500,
      curbWeight: 5400,
      people: 360,
      cargo: 300,
      hitchHardware: 70,
      gcwr: 15000,
    });
    expect(r.combined).toBe(14630);
    expect(r.gcwrLeft).toBe(370);
  });

  it('T8: kg toggle shows 4,800 lb as 2,177 kg', () => {
    expect(lbToKg(4800)).toBe(2177);
  });

  it('T9: empty trailer weight gives no NaN and asks for a trailer weight', () => {
    const r = checkTow({ ...truck, people: 360 });
    expect(r.needsTrailerWeight).toBe(true);
    expect(r.verdict).toBe('Enter a trailer weight');
    expect(r.tongue).toBeNull();
    expect(Number.isNaN(r.tongue as unknown as number)).toBe(false);
  });

  it('T10: very large trailer (99,999) stays finite and fails', () => {
    const r = checkTow({
      trailerWeight: 99999,
      ...truck,
      people: 360,
      cargo: 200,
      hitchHardware: 60,
    });
    expect(Number.isFinite(r.tongue!)).toBe(true);
    expect(Number.isFinite(r.payloadUsed!)).toBe(true);
    expect(Number.isFinite(r.trailerUsePct!)).toBe(true);
    expect(r.ok).toBe(false);
  });

  it('T11: decimal trailer 4,800.6 rounds tongue to 576', () => {
    expect(checkTow({ trailerWeight: 4800.6, tonguePct: 12 }).tongue).toBe(576);
  });

  it('T12: 80% note appears at 80.3% and not at 79.9%', () => {
    const over = checkTow({
      trailerWeight: 4800,
      tonguePct: 12,
      ...truck,
      people: 360,
      cargo: 200,
      hitchHardware: 60,
    });
    expect(over.trailerUsePct).toBe(80.3);
    expect(over.guidelineNote).not.toBeNull();
    expect(over.guidelineNote).toContain('80%');

    const under = checkTow({
      trailerWeight: 4800,
      tonguePct: 12,
      maxTrailerRating: 6008,
      people: 100,
      cargo: 100,
      hitchHardware: 60,
    });
    expect(under.trailerUsePct).toBe(79.9);
    expect(under.guidelineNote).toBeNull();
  });
});
