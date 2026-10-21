// 2026 Toyota Highlander. Source: toyota-highlander-specs-2026. Payload = GVWR - curb.
import type { VehicleData, VehicleRow } from './types';

const S = 'toyota-highlander-specs-2026' as const;

interface Raw {
  id: string;
  grade: string;
  engine: string;
  curb: number;
  gvwr: number;
  maxTrailer: number;
}

const raw: Raw[] = [
  { id: '6953', grade: 'XLE', engine: '2.4L turbo', curb: 4376, gvwr: 5970, maxTrailer: 5000 },
  { id: '6959', grade: 'XSE', engine: '2.4L turbo', curb: 4420, gvwr: 5970, maxTrailer: 5000 },
  { id: '6956', grade: 'Limited', engine: '2.4L turbo', curb: 4453, gvwr: 5970, maxTrailer: 5000 },
  { id: '6957', grade: 'Platinum', engine: '2.4L turbo', curb: 4453, gvwr: 5970, maxTrailer: 5000 },
  { id: '6965', grade: 'Hybrid XLE', engine: '2.5L hybrid', curb: 4515, gvwr: 6000, maxTrailer: 3500 },
  { id: '6966', grade: 'Hybrid Limited', engine: '2.5L hybrid', curb: 4595, gvwr: 6000, maxTrailer: 3500 },
  { id: '6967', grade: 'Hybrid Platinum', engine: '2.5L hybrid', curb: 4595, gvwr: 6000, maxTrailer: 3500 },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  grade: r.grade,
  engine: r.engine,
  curbWeight: r.curb,
  gvwr: r.gvwr,
  payload: r.gvwr - r.curb,
  payloadComputed: true,
  maxTrailer: r.maxTrailer,
  source: S,
}));

export const toyotaHighlander2026: VehicleData = {
  slug: 'toyota-highlander-towing-capacity',
  make: 'Toyota',
  model: 'Highlander',
  year: 2026,
  source: S,
  readDate: '2026-10-21',
  rows,
  columns: [
    { key: 'grade', header: 'Grade' },
    { key: 'engine', header: 'Powertrain' },
    { key: 'curbWeight', header: 'Curb (lb)', numeric: true },
    { key: 'gvwr', header: 'GVWR (lb)', numeric: true },
    { key: 'payload', header: 'Payload (GVWR − curb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
  ],
  tableNotes: [
    "Toyota's spec page lists one curb weight and GVWR per grade. Your exact payload is on the door-jamb sticker.",
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [{ cells: ['2026', '5,000 lb'], sources: ['toyota-highlander-specs-2026'] }],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Toyota documents.',
};

export default toyotaHighlander2026;
