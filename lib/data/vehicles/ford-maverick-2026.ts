// 2026 Ford Maverick. Source: ford-guide-2026, p. 28. SuperCrew only, automatic.
import type { VehicleData, VehicleRow } from './types';

const S = 'ford-guide-2026' as const;

const rows: VehicleRow[] = [
  { id: 'mav-hev-fwd', engine: '2.5L I4 Hybrid', axle: '3.37', drive: 'FWD', package: 'Standard', gcwr: 6090, maxTrailer: 2000, label: '2.5L Hybrid FWD, Standard', source: S },
  { id: 'mav-hev-awd', engine: '2.5L I4 Hybrid', axle: '3.37', drive: 'AWD', package: 'Standard', gcwr: 6315, maxTrailer: 2000, label: '2.5L Hybrid AWD, Standard', source: S },
  { id: 'mav-hev-awd-4k', engine: '2.5L I4 Hybrid', axle: '3.37', drive: 'AWD', package: '4K Tow Package (53Q)', gcwr: 8315, maxTrailer: 4000, maxTongue: 400, label: '2.5L Hybrid AWD, 4K Tow Package', source: S },
  { id: 'mav-eb-fwd', engine: '2.0L EcoBoost I4', axle: '3.81', drive: 'FWD', package: 'Standard', gcwr: 5945, maxTrailer: 2000, label: '2.0L EcoBoost FWD, Standard', source: S },
  { id: 'mav-eb-awd-a', engine: '2.0L EcoBoost I4', axle: '3.81', drive: 'AWD (Ford lists two GCWRs)', package: 'Standard', gcwr: 6130, maxTrailer: 2000, label: '2.0L EcoBoost AWD, Standard (GCWR 6,130 lb)', source: S },
  { id: 'mav-eb-awd-b', engine: '2.0L EcoBoost I4', axle: '3.81', drive: 'AWD (Ford lists two GCWRs)', package: 'Standard', gcwr: 6255, maxTrailer: 2000, label: '2.0L EcoBoost AWD, Standard (GCWR 6,255 lb)', source: S },
  { id: 'mav-eb-awd-4k', engine: '2.0L EcoBoost I4', axle: '3.81', drive: 'AWD', package: '4K Tow Package (53Q)', gcwr: 8130, maxTrailer: 4000, maxTongue: 400, label: '2.0L EcoBoost AWD, 4K Tow Package', source: S },
];

export const fordMaverick2026: VehicleData = {
  slug: 'ford-maverick-towing-capacity',
  make: 'Ford',
  model: 'Maverick',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'axle', header: 'Axle' },
    { key: 'drive', header: 'Drive' },
    { key: 'package', header: 'Package' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'maxTongue', header: 'Max tongue (lb)', numeric: true },
  ],
  tableNotes: [
    'For trailers over 2,000 lb, Ford requires the 4K Tow Package (53Q).',
    "The 4K Tow Package's hitch receiver is rated 4,000 lb with a 400 lb max tongue load.",
    'Ford lists the maximum trailer frontal area as 29 sq ft without the 4K Tow Package and 40 sq ft with it.',
    'Ford rates these trailers with the SAE J2807 method and a 150 lb driver and 150 lb passenger.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '4,000 lb'], sources: ['ford-guide-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Ford documents.',
};

export default fordMaverick2026;
