// 2026 Subaru Ascent. Source: subaru-ascent-specs-2026.
// Every row is the 2.4L turbo SUBARU BOXER with a Lineartronic CVT and AWD.
import type { VehicleData, VehicleRow } from './types';

const S = 'subaru-ascent-specs-2026' as const;

interface Raw {
  id: string;
  trim: string;
  seats: string;
  maxTrailer: number;
  curb: number;
  label: string;
}

const raw: Raw[] = [
  { id: 'asc-prem-8', trim: 'Premium', seats: '8', maxTrailer: 5000, curb: 4466, label: 'Premium 8-passenger' },
  { id: 'asc-prem-7', trim: 'Premium', seats: '7', maxTrailer: 5000, curb: 4450, label: 'Premium 7-passenger' },
  { id: 'asc-ltd-8', trim: 'Limited', seats: '8', maxTrailer: 5000, curb: 4603, label: 'Limited 8-passenger' },
  { id: 'asc-ltd-7', trim: 'Limited', seats: '7', maxTrailer: 5000, curb: 4587, label: 'Limited 7-passenger' },
  { id: 'asc-ltd-bronze-7', trim: 'Limited Bronze Edition', seats: '7', maxTrailer: 5000, curb: 4587, label: 'Limited Bronze Edition 7-passenger' },
  { id: 'asc-touring-7', trim: 'Touring', seats: '7', maxTrailer: 5000, curb: 4596, label: 'Touring 7-passenger' },
  { id: 'asc-onyx-touring-7', trim: 'Onyx Edition Touring', seats: '7', maxTrailer: 5000, curb: 4595, label: 'Onyx Edition Touring 7-passenger' },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  grade: r.trim,
  seats: r.seats,
  engine: '2.4L turbo SUBARU BOXER',
  transmission: 'Lineartronic CVT',
  drive: 'AWD',
  maxTrailer: r.maxTrailer,
  curbWeight: r.curb,
  label: r.label,
  source: S,
}));

export const subaruAscent2026: VehicleData = {
  slug: 'subaru-ascent-towing-capacity',
  make: 'Subaru',
  model: 'Ascent',
  year: 2026,
  source: S,
  rows,
  columns: [
    { key: 'grade', header: 'Trim' },
    { key: 'seats', header: 'Seats' },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'curbWeight', header: 'Curb weight (lb)', numeric: true },
  ],
  tableNotes: [
    'Maximum towing capacity varies by trim level. Trailer brakes may be needed. See your retailer for details.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [
      { cells: ['2026', '5,000 lb (all trims)'], sources: ['subaru-ascent-specs-2026'] },
      {
        cells: ['2024', '2,000 lb (Base 8-Passenger), 5,000 lb (other trims)'],
        sources: ['subaru-ascent-specs-2024'],
      },
    ],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Subaru documents.',
};

export default subaruAscent2026;
