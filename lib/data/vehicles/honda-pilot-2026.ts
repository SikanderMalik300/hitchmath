// 2026 Honda Pilot. Source: honda-pilot-specs-2026. Honda's spec release lists no
// GVWR, payload, GCWR or tongue limit, so those columns are left out.
import type { VehicleData, VehicleRow } from './types';

const S = 'honda-pilot-specs-2026' as const;

const rows: VehicleRow[] = [
  { id: 'plt-sport-2wd', grade: 'Sport', engine: '3.5L V6', drive: '2WD', curbWeight: 4336, maxTrailer: 3500, source: S },
  { id: 'plt-sport-awd', grade: 'Sport', engine: '3.5L V6', drive: 'AWD', curbWeight: 4513, maxTrailer: 5000, source: S },
  { id: 'plt-exl-2wd', grade: 'EX-L', engine: '3.5L V6', drive: '2WD', curbWeight: 4334, maxTrailer: 3500, source: S },
  { id: 'plt-exl-awd', grade: 'EX-L', engine: '3.5L V6', drive: 'AWD', curbWeight: 4528, maxTrailer: 5000, source: S },
  { id: 'plt-trailsport', grade: 'TrailSport', engine: '3.5L V6', drive: 'AWD', curbWeight: 4722, maxTrailer: 5000, source: S },
  { id: 'plt-touring', grade: 'Touring', engine: '3.5L V6', drive: 'AWD', curbWeight: 4658, maxTrailer: 5000, source: S },
  { id: 'plt-elite', grade: 'Elite', engine: '3.5L V6', drive: 'AWD', curbWeight: 4678, maxTrailer: 5000, source: S },
  { id: 'plt-black', grade: 'Black Edition', engine: '3.5L V6', drive: 'AWD', curbWeight: 4678, maxTrailer: 5000, source: S },
];

export const hondaPilot2026: VehicleData = {
  slug: 'honda-pilot-towing-capacity',
  make: 'Honda',
  model: 'Pilot',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'grade', header: 'Trim' },
    { key: 'drive', header: 'Drive' },
    { key: 'curbWeight', header: 'Curb (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
  ],
  tableNotes: [
    'Maximum towing capacity for AWD trims is 5,000 lbs. Maximum towing capacity for 2WD trims is 3,500 lbs. Towing requires accessory towing equipment.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '5,000 lb'], sources: ['honda-pilot-specs-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Honda documents.',
};

export default hondaPilot2026;
