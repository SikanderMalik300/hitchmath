// 2026 Chevrolet Suburban. Source: gm-guide-2026, p. 41. Every row has the 3.23 axle.
// GM prints one 2WD and one 4WD rating per engine/package; the mini calculator
// exposes 2WD and 4WD as separate options via the trims array.
import type { VehicleData, VehicleRow } from './types';

const S = 'gm-guide-2026' as const;

interface Raw {
  id: string;
  engine: string;
  pkg: string;
  gcwr: number;
  tow2wd: number;
  tow4wd: number;
}

const raw: Raw[] = [
  { id: 'sub-53', engine: '5.3L EcoTec3 V8', pkg: 'Standard', gcwr: 14000, tow2wd: 7700, tow4wd: 7500 },
  { id: 'sub-53-mtp', engine: '5.3L EcoTec3 V8', pkg: 'Max Trailering Package', gcwr: 14500, tow2wd: 8200, tow4wd: 8000 },
  { id: 'sub-62', engine: '6.2L EcoTec3 V8', pkg: 'Standard', gcwr: 14000, tow2wd: 7500, tow4wd: 7300 },
  { id: 'sub-62-mtp', engine: '6.2L EcoTec3 V8', pkg: 'Max Trailering Package', gcwr: 14500, tow2wd: 8000, tow4wd: 7800 },
  { id: 'sub-30d', engine: 'Duramax 3.0L Turbo-Diesel I-6', pkg: 'Standard', gcwr: 14500, tow2wd: 8100, tow4wd: 7800 },
  { id: 'sub-30d-mtp', engine: 'Duramax 3.0L Turbo-Diesel I-6', pkg: 'Max Trailering Package', gcwr: 14500, tow2wd: 8100, tow4wd: 7800 },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  engine: r.engine,
  package: r.pkg,
  gcwr: r.gcwr,
  tow2wd: r.tow2wd,
  tow4wd: r.tow4wd,
  maxTongue: 1250,
  maxTrailer: Math.max(r.tow2wd, r.tow4wd),
  trims: [
    { name: '2WD', maxTrailer: r.tow2wd },
    { name: '4WD', maxTrailer: r.tow4wd },
  ],
  source: S,
}));

export const chevySuburban2026: VehicleData = {
  slug: 'chevy-suburban-towing-capacity',
  make: 'Chevrolet',
  model: 'Suburban',
  year: 2026,
  source: S,
  readDate: '2026-10-23',
  rows,
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'package', header: 'Package' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'tow2wd', header: '2WD max tow (lb)', numeric: true },
    { key: 'tow4wd', header: '4WD max tow (lb)', numeric: true },
  ],
  tableNotes: [
    'When using a weight-carrying hitch, the maximum trailer weight is 5,000 lb with a 600 lb tongue weight. A weight-distributing hitch and sway control are required for tongue weights over 600 lb.',
    "GM's guide sets trailer tongue weight at 10% to 15% of the loaded trailer, up to 1,250 lb.",
    'The standard Heavy-Duty Trailering Package includes an auxiliary external transmission fluid cooler and an engine oil cooler.',
    "GM's ratings include the weight of the driver, passengers, fuel and optional equipment, so every pound you add lowers what you can tow.",
  ],
};

export default chevySuburban2026;
