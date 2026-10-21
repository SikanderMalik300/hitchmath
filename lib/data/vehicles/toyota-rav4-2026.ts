// 2026 Toyota RAV4 (Hybrid). Source: toyota-rav4-specs-2026; drive confirmed with
// toyota-press-rav4-2026. Payload = GVWR - curb.
import type { VehicleData, VehicleRow } from './types';

const S = 'toyota-rav4-specs-2026' as const;

interface Raw {
  id: string;
  grade: string;
  drive: string;
  curb: number;
  gvwr: number;
  maxTrailer: number;
}

const raw: Raw[] = [
  { id: '4521', grade: 'LE', drive: 'FWD', curb: 3594, gvwr: 4785, maxTrailer: 1750 },
  { id: '4435', grade: 'LE', drive: 'AWD', curb: 3715, gvwr: 4920, maxTrailer: 1750 },
  { id: '4523', grade: 'SE', drive: 'FWD', curb: 3616, gvwr: 4785, maxTrailer: 1750 },
  { id: '4524', grade: 'SE', drive: 'AWD', curb: 3737, gvwr: 4920, maxTrailer: 3500 },
  { id: '4527', grade: 'XLE Premium', drive: 'FWD', curb: 3616, gvwr: 4785, maxTrailer: 1750 },
  { id: '4444', grade: 'XLE Premium', drive: 'AWD', curb: 3770, gvwr: 4920, maxTrailer: 3500 },
  { id: '4530', grade: 'XSE', drive: 'AWD', curb: 3825, gvwr: 4920, maxTrailer: 3500 },
  { id: '4534', grade: 'Limited', drive: 'AWD', curb: 3847, gvwr: 4920, maxTrailer: 3500 },
  { id: '4437', grade: 'Woodland', drive: 'AWD', curb: 3814, gvwr: 4920, maxTrailer: 3500 },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  grade: r.grade,
  engine: '2.5L hybrid',
  drive: r.drive,
  curbWeight: r.curb,
  gvwr: r.gvwr,
  payload: r.gvwr - r.curb,
  payloadComputed: true,
  maxTrailer: r.maxTrailer,
  source: S,
}));

export const toyotaRav42026: VehicleData = {
  slug: 'toyota-rav4-towing-capacity',
  make: 'Toyota',
  model: 'RAV4',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'grade', header: 'Grade' },
    { key: 'drive', header: 'Drive' },
    { key: 'curbWeight', header: 'Curb (lb)', numeric: true },
    { key: 'gvwr', header: 'GVWR (lb)', numeric: true },
    { key: 'payload', header: 'Payload (GVWR − curb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
  ],
  tableNotes: [
    "Toyota's spec page doesn't label the drive. The FWD rows are the lower-MSRP, higher-EPA versions; the AWD ratings match Toyota's 2026 RAV4 press release.",
    'This page covers the RAV4 Hybrid. The RAV4 Plug-in Hybrid is added once Toyota publishes its towing rating.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [
      { cells: ['2026', '3,500 lb'], sources: ['toyota-rav4-specs-2026', 'toyota-press-rav4-2026'] },
    ],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Toyota documents.',
};

export default toyotaRav42026;
