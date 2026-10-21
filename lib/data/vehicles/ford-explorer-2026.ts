// 2026 Ford Explorer. Source: ford-guide-2026, p. 39. Retail models only.
import type { VehicleData, VehicleRow } from './types';

const S = 'ford-guide-2026' as const;

const rows: VehicleRow[] = [
  { id: 'exp-23-rwd', engine: '2.3L EcoBoost I4', axle: '3.58', drive: 'RWD', gcwr: 10000, maxTrailer: 5000, maxTongue: 500, label: '2.3L EcoBoost RWD', source: S },
  { id: 'exp-23-4wd', engine: '2.3L EcoBoost I4', axle: '3.58', drive: '4WD', gcwr: 10100, maxTrailer: 5000, maxTongue: 500, label: '2.3L EcoBoost 4WD', source: S },
  { id: 'exp-23-tremor', engine: '2.3L EcoBoost I4', grade: 'Tremor', axle: '3.58', drive: '4WD', gcwr: 10100, maxTrailer: 5000, maxTongue: 500, label: '2.3L EcoBoost Tremor 4WD', source: S },
  { id: 'exp-30-tremor', engine: '3.0L EcoBoost V6', grade: 'Tremor', axle: '3.58', drive: '4WD', gcwr: 10800, maxTrailer: 5000, maxTongue: 500, label: '3.0L EcoBoost Tremor 4WD', source: S },
  { id: 'exp-30-st-rwd', engine: '3.0L EcoBoost V6', grade: 'ST', axle: '3.58', drive: 'RWD', gcwr: 10800, maxTrailer: 5000, maxTongue: 500, label: '3.0L EcoBoost ST RWD', source: S },
  { id: 'exp-30-st-4wd', engine: '3.0L EcoBoost V6', grade: 'ST', axle: '3.58', drive: '4WD', gcwr: 10800, maxTrailer: 5000, maxTongue: 500, label: '3.0L EcoBoost ST 4WD', source: S },
];

export const fordExplorer2026: VehicleData = {
  slug: 'ford-explorer-towing-capacity',
  make: 'Ford',
  model: 'Explorer',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'grade', header: 'Model' },
    { key: 'axle', header: 'Axle' },
    { key: 'drive', header: 'Drive' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'maxTongue', header: 'Max tongue (lb)', numeric: true },
  ],
  tableNotes: [
    "Ford's guide also lists Police Interceptor Utility versions, which aren't sold to the public.",
    'Ford rates these trailers with the SAE J2807 method and a 150 lb driver and 150 lb passenger.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '5,000 lb'], sources: ['ford-guide-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Ford documents.',
};

export default fordExplorer2026;
