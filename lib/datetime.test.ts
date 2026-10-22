import { describe, it, expect } from 'vitest';
import { isoCentral } from './datetime';

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;

describe('isoCentral (fix-05)', () => {
  it('registry dates become 09:00 Central with a daylight offset', () => {
    expect(isoCentral('2026-10-19')).toBe('2026-10-19T09:00:00-05:00');
    expect(isoCentral('2026-10-21')).toBe('2026-10-21T09:00:00-05:00');
  });
  it('standard-time dates use the -06:00 offset', () => {
    // January and late November/December are outside US Central DST.
    expect(isoCentral('2026-01-15')).toBe('2026-01-15T09:00:00-06:00');
    expect(isoCentral('2026-12-01')).toBe('2026-12-01T09:00:00-06:00');
  });
  it('DST boundaries: 2nd Sunday of March and 1st Sunday of November 2026', () => {
    // 2026: DST starts Sun Mar 8, ends Sun Nov 1.
    expect(isoCentral('2026-03-08')).toBe('2026-03-08T09:00:00-05:00'); // first DST day
    expect(isoCentral('2026-03-07')).toBe('2026-03-07T09:00:00-06:00'); // day before
    expect(isoCentral('2026-11-01')).toBe('2026-11-01T09:00:00-06:00'); // back to standard
    expect(isoCentral('2026-10-31')).toBe('2026-10-31T09:00:00-05:00'); // still DST
  });
  it('output always matches the ISO 8601 datetime shape', () => {
    for (const d of ['2026-10-19', '2026-01-01', '2026-07-04', '2026-11-01']) {
      expect(isoCentral(d)).toMatch(ISO);
    }
  });
});
