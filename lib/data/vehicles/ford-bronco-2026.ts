// 2026 Ford Bronco. Source: ford-guide-2026, p. 40. 10-speed automatic unless noted.
// Each row is one engine/axle/doors combo; GCWR depends on doors. A row covers
// several rated trims, each with its own max trailer weight (trims array).
import type { VehicleData, VehicleRow, TrimEntry } from './types';

const S = 'ford-guide-2026' as const;

interface Raw {
  id: string;
  engine: string;
  axle: string;
  doors: string;
  gcwr: number;
  maxTongue: number;
  trims: TrimEntry[];
}

const raw: Raw[] = [
  { id: 'br-23-373-2d', engine: '2.3L EcoBoost I4', axle: '3.73', doors: '2-door', gcwr: 8500, maxTongue: 350, trims: [{ name: 'Base', maxTrailer: 3500 }] },
  { id: 'br-23-373-4d', engine: '2.3L EcoBoost I4', axle: '3.73', doors: '4-door', gcwr: 8980, maxTongue: 350, trims: [{ name: 'Base', maxTrailer: 3500 }, { name: 'Big Bend', maxTrailer: 3500 }, { name: 'Outer Banks', maxTrailer: 3500 }] },
  { id: 'br-23-446-2d', engine: '2.3L EcoBoost I4', axle: '4.46', doors: '2-door', gcwr: 8800, maxTongue: 350, trims: [{ name: 'Badlands', maxTrailer: 3500 }] },
  { id: 'br-23-446-4d', engine: '2.3L EcoBoost I4', axle: '4.46', doors: '4-door', gcwr: 8980, maxTongue: 350, trims: [{ name: 'Big Bend', maxTrailer: 3500 }] },
  { id: 'br-23-470-2d', engine: '2.3L EcoBoost I4', axle: '4.70 (Sasquatch)', doors: '2-door', gcwr: 8800, maxTongue: 350, trims: [{ name: 'Base', maxTrailer: 3500 }, { name: 'Badlands', maxTrailer: 3500 }] },
  { id: 'br-23-470-4d', engine: '2.3L EcoBoost I4', axle: '4.70 (Sasquatch)', doors: '4-door', gcwr: 8980, maxTongue: 350, trims: [{ name: 'Base', maxTrailer: 3500 }, { name: 'Big Bend', maxTrailer: 3500 }, { name: 'Outer Banks', maxTrailer: 3500 }, { name: 'Badlands', maxTrailer: 3500 }, { name: 'Heritage', maxTrailer: 3500 }] },
  { id: 'br-27-373-4d', engine: '2.7L EcoBoost V6', axle: '3.73', doors: '4-door', gcwr: 8980, maxTongue: 350, trims: [{ name: 'Outer Banks', maxTrailer: 3500 }] },
  { id: 'br-27-446-4d', engine: '2.7L EcoBoost V6', axle: '4.46', doors: '4-door', gcwr: 8990, maxTongue: 350, trims: [{ name: 'Badlands', maxTrailer: 3500 }] },
  { id: 'br-27-470-4d', engine: '2.7L EcoBoost V6', axle: '4.70 (Sasquatch)', doors: '4-door', gcwr: 9120, maxTongue: 350, trims: [{ name: 'Outer Banks', maxTrailer: 3500 }, { name: 'Badlands', maxTrailer: 3460 }, { name: 'Stroppe Edition', maxTrailer: 3500 }, { name: 'Heritage', maxTrailer: 3500 }] },
  { id: 'br-30-raptor', engine: '3.0L EcoBoost V6 (Raptor)', axle: '4.70', doors: '4-door', gcwr: 10650, maxTongue: 450, trims: [{ name: 'Raptor', maxTrailer: 4500 }] },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  engine: r.engine,
  axle: r.axle,
  doors: r.doors,
  gcwr: r.gcwr,
  maxTongue: r.maxTongue,
  trims: r.trims,
  maxTrailer: Math.max(...r.trims.map((t) => t.maxTrailer)),
  source: S,
}));

export const fordBronco2026: VehicleData = {
  slug: 'ford-bronco-towing-capacity',
  make: 'Ford',
  model: 'Bronco',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'axle', header: 'Axle' },
    { key: 'doors', header: 'Doors' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'trimsRated', header: 'Trims rated (max tow, lb)' },
    { key: 'maxTongue', header: 'Max tongue (lb)', numeric: true },
  ],
  tableNotes: [
    'Trailers over 2,000 lb need the dealer-installed OEM trailer hitch receiver option.',
    'The Trailer Tow Prep Package is included on all models except Raptor.',
    'The Raptor includes the tow package as standard.',
    'The 7-speed manual 2.3L is rated 3,500 lb where Ford offers it.',
    'Ford rates these trailers with the SAE J2807 method and a 150 lb driver and 150 lb passenger.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '4,500 lb'], sources: ['ford-guide-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Ford documents.',
};

export default fordBronco2026;
