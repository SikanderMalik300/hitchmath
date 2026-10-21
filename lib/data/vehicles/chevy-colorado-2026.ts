// 2026 Chevrolet Colorado. Source: gm-guide-2026, p. 41. Crew Cab.
import type { VehicleData, VehicleRow } from './types';

const S = 'gm-guide-2026' as const;

const rows: VehicleRow[] = [
  { id: 'col-std', engine: '2.7L TurboMax 4-cylinder', package: 'Standard', axle: '3.42', gcwr: 9100, maxTrailer: 3500, source: S },
  { id: 'col-tow', engine: '2.7L TurboMax 4-cylinder', package: 'Trailering Package', axle: '3.42', gcwr: 13250, maxTrailer: 7700, maxTongue: 770, source: S },
  { id: 'col-zr2', engine: '2.7L TurboMax 4-cylinder', package: 'ZR2', axle: '3.42', gcwr: 11600, maxTrailer: 6000, source: S },
];

export const chevyColorado2026: VehicleData = {
  slug: 'chevy-colorado-towing-capacity',
  make: 'Chevrolet',
  model: 'Colorado',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'package', header: 'Package' },
    { key: 'axle', header: 'Axle' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'maxTongue', header: 'Max tongue (lb)', numeric: true },
  ],
  tableNotes: [
    'The 3,500 lb rating requires the available accessory trailer hitch and wiring harness.',
    'Trailer tongue weight should be 10% to 15% of loaded trailer weight, up to 770 lb.',
    'Chevrolet lists a maximum tongue weight of 770 lb for the Colorado.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '7,700 lb'], sources: ['gm-guide-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Chevrolet documents.',
};

export default chevyColorado2026;
