// 2026 Subaru Outback. Source: subaru-outback-specs-2026. All trims AWD. The trim
// comparison sheet lists no GVWR, payload, GCWR or tongue limit.
import type { VehicleData, VehicleRow } from './types';

const S = 'subaru-outback-specs-2026' as const;

const BASE = '2.5L SUBARU BOXER 4-cylinder';
const TURBO = '2.4L turbocharged SUBARU BOXER 4-cylinder';

const rows: VehicleRow[] = [
  { id: 'obk-premium', grade: 'Premium', engine: BASE, curbWeight: 3741, maxTrailer: 2700, source: S },
  { id: 'obk-limited', grade: 'Limited', engine: BASE, curbWeight: 3799, maxTrailer: 2700, source: S },
  { id: 'obk-touring', grade: 'Touring', engine: BASE, curbWeight: 3812, maxTrailer: 2700, source: S },
  { id: 'obk-wilderness', grade: 'Wilderness', engine: TURBO, curbWeight: 3973, maxTrailer: 3500, source: S },
  { id: 'obk-limited-xt', grade: 'Limited XT', engine: TURBO, curbWeight: 3968, maxTrailer: 3500, source: S },
  { id: 'obk-touring-xt', grade: 'Touring XT', engine: TURBO, curbWeight: 3982, maxTrailer: 3500, source: S },
];

export const subaruOutback2026: VehicleData = {
  slug: 'subaru-outback-towing-capacity',
  make: 'Subaru',
  model: 'Outback',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'grade', header: 'Trim' },
    { key: 'engine', header: 'Engine' },
    { key: 'curbWeight', header: 'Curb (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
  ],
  tableNotes: [
    'Maximum towing capacity varies by trim level. Trailer brakes may be needed. See your retailer for details.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '3,500 lb'], sources: ['subaru-outback-specs-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Subaru documents.',
};

export default subaruOutback2026;
