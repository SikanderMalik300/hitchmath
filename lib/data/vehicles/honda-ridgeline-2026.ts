// 2026 Honda Ridgeline. Source: honda-ridgeline-specs-2026. 3.5L V6, i-VTM4 AWD,
// all trims. Payload is Honda's printed "total payload capacity" (not computed).
import type { VehicleData, VehicleRow } from './types';

const S = 'honda-ridgeline-specs-2026' as const;

const rows: VehicleRow[] = [
  { id: 'rid-sport', grade: 'Sport', engine: '3.5L V6', curbWeight: 4420, gvwr: 6019, payload: 1583, gcwr: 9986, maxTrailer: 5000, source: S },
  { id: 'rid-rtl', grade: 'RTL', engine: '3.5L V6', curbWeight: 4480, gvwr: 6019, payload: 1544, gcwr: 9986, maxTrailer: 5000, source: S },
  { id: 'rid-trailsport', grade: 'TrailSport', engine: '3.5L V6', curbWeight: 4495, gvwr: 6019, payload: 1521, gcwr: 9986, maxTrailer: 5000, source: S },
  { id: 'rid-black', grade: 'Black Edition', engine: '3.5L V6', curbWeight: 4504, gvwr: 6019, payload: 1509, gcwr: 9986, maxTrailer: 5000, source: S },
];

export const hondaRidgeline2026: VehicleData = {
  slug: 'honda-ridgeline-towing-capacity',
  make: 'Honda',
  model: 'Ridgeline',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'grade', header: 'Trim' },
    { key: 'curbWeight', header: 'Curb (lb)', numeric: true },
    { key: 'gvwr', header: 'GVWR (lb)', numeric: true },
    { key: 'payload', header: 'Payload (lb)', numeric: true },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
  ],
  tableNotes: ["Payload is Honda's printed total payload capacity."],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '5,000 lb'], sources: ['honda-ridgeline-specs-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Honda documents.',
};

export default hondaRidgeline2026;
