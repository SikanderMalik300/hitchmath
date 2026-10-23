// 2026 Chevrolet Traverse. Source: gm-guide-2026, p. 41.
// Engine: 2.5L Turbo 4-cylinder SIDI, 3.49 axle.
import type { VehicleData, VehicleRow } from './types';

const S = 'gm-guide-2026' as const;

const rows: VehicleRow[] = [
  {
    id: 'trav-fwd',
    engine: '2.5L Turbo 4-cylinder SIDI',
    drive: 'FWD',
    package: 'Standard',
    gcwr: 6720,
    maxTrailer: 1500,
    maxTongue: 500,
    source: S,
  },
  {
    id: 'trav-fwd-v92',
    engine: '2.5L Turbo 4-cylinder SIDI',
    drive: 'FWD',
    package: 'Trailering Package (V92)',
    gcwr: 10030,
    maxTrailer: 5000,
    maxTongue: 500,
    source: S,
  },
  {
    id: 'trav-awd',
    engine: '2.5L Turbo 4-cylinder SIDI',
    drive: 'AWD',
    package: 'Standard',
    gcwr: 7050,
    maxTrailer: 1500,
    maxTongue: 500,
    source: S,
  },
  {
    id: 'trav-awd-v92',
    engine: '2.5L Turbo 4-cylinder SIDI',
    drive: 'AWD',
    package: 'Trailering Package (V92)',
    gcwr: 10250,
    maxTrailer: 5000,
    maxTongue: 500,
    source: S,
  },
];

export const chevyTraverse2026: VehicleData = {
  slug: 'chevy-traverse-towing-capacity',
  make: 'Chevrolet',
  model: 'Traverse',
  year: 2026,
  source: S,
  readDate: '2026-10-23',
  rows,
  columns: [
    { key: 'drive', header: 'Drive' },
    { key: 'package', header: 'Package' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
  ],
  tableNotes: [
    'When using a weight-carrying hitch, the maximum trailer weight is 5,000 lb with a 500 lb tongue weight.',
    "GM's guide sets trailer tongue weight at 10% to 15% of the loaded trailer, up to 500 lb.",
    'Maximum trailer weight rating requires factory-installed trailering equipment.',
    "GM's ratings include the weight of the driver, passengers, fuel and optional equipment, so every pound you add lowers what you can tow.",
  ],
};

export default chevyTraverse2026;
