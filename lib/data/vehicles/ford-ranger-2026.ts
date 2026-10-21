// 2026 Ford Ranger. Source: ford-guide-2026, p. 27. SuperCrew, automatic.
import type { VehicleData, VehicleRow } from './types';

const S = 'ford-guide-2026' as const;

const rows: VehicleRow[] = [
  { id: 'rng-23-4x2', engine: '2.3L EcoBoost I4', axle: '3.73', drive: '4x2', gcwr: 12370, maxTrailer: 7500, maxTongue: 750, label: '2.3L EcoBoost 4x2', source: S },
  { id: 'rng-23-4x4', engine: '2.3L EcoBoost I4', axle: '3.73', drive: '4x4', gcwr: 12590, maxTrailer: 7500, maxTongue: 750, label: '2.3L EcoBoost 4x4', source: S },
  { id: 'rng-27-4x4', engine: '2.7L EcoBoost V6', axle: '3.73', drive: '4x4', gcwr: 12745, maxTrailer: 7500, maxTongue: 750, label: '2.7L EcoBoost V6 4x4', source: S },
  { id: 'rng-30-raptor', engine: '3.0L EcoBoost V6 (Raptor)', axle: '4.27', drive: '4x4 Auto', gcwr: 11465, maxTrailer: 5510, maxTongue: 550, label: '3.0L EcoBoost Raptor 4x4', source: S },
];

export const fordRanger2026: VehicleData = {
  slug: 'ford-ranger-towing-capacity',
  make: 'Ford',
  model: 'Ranger',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'axle', header: 'Axle' },
    { key: 'drive', header: 'Drive' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'maxTongue', header: 'Max tongue (lb)', numeric: true },
  ],
  tableNotes: [
    '7,500 lb requires the Trailer Tow Package (53R), standard on Raptor.',
    'Do not exceed 3,500 lb (350 lb tongue) when towing with the bumper only.',
    'Ford rates these trailers with the SAE J2807 method and a 150 lb driver and 150 lb passenger.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '7,500 lb'], sources: ['ford-guide-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Ford documents.',
};

export default fordRanger2026;
