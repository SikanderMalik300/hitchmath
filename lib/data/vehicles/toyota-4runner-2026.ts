// 2026 Toyota 4Runner. Source: toyota-4runner-specs-2026.
// Toyota does not print a 4Runner payload; payload = GVWR - curb (computed).
import type { VehicleData, VehicleRow } from './types';

const S = 'toyota-4runner-specs-2026' as const;

interface Raw {
  id: string;
  grade: string;
  engine: string;
  drive: string;
  curb: number;
  gvwr: number;
  maxTrailer: number;
}

const raw: Raw[] = [
  { id: '8642', grade: 'SR5', engine: 'i-FORCE 2.4L turbo', drive: 'RWD', curb: 4455, gvwr: 6005, maxTrailer: 6000 },
  { id: '8664', grade: 'SR5', engine: 'i-FORCE 2.4L turbo', drive: 'Part-time 4WD', curb: 4685, gvwr: 6075, maxTrailer: 6000 },
  { id: '8643', grade: 'TRD Sport', engine: 'i-FORCE 2.4L turbo', drive: 'RWD', curb: 4610, gvwr: 6020, maxTrailer: 6000 },
  { id: '8671', grade: 'TRD Sport', engine: 'i-FORCE 2.4L turbo', drive: 'Part-time 4WD', curb: 4850, gvwr: 6395, maxTrailer: 6000 },
  { id: '8644', grade: 'TRD Sport Premium', engine: 'i-FORCE 2.4L turbo', drive: 'RWD', curb: 4610, gvwr: 6020, maxTrailer: 6000 },
  { id: '8673', grade: 'TRD Sport Premium', engine: 'i-FORCE 2.4L turbo', drive: 'Part-time 4WD', curb: 4850, gvwr: 6395, maxTrailer: 6000 },
  { id: '8670', grade: 'TRD Off-Road', engine: 'i-FORCE 2.4L turbo', drive: 'Part-time 4WD', curb: 4850, gvwr: 6240, maxTrailer: 6000 },
  { id: '8628', grade: 'TRD Off-Road i-FORCE MAX', engine: 'i-FORCE MAX 2.4L hybrid', drive: 'Part-time 4WD', curb: 5225, gvwr: 6505, maxTrailer: 6000 },
  { id: '8672', grade: 'TRD Off-Road Premium', engine: 'i-FORCE 2.4L turbo', drive: 'Part-time 4WD', curb: 4850, gvwr: 6240, maxTrailer: 6000 },
  { id: '8630', grade: 'TRD Off-Road Premium i-FORCE MAX', engine: 'i-FORCE MAX 2.4L hybrid', drive: 'Part-time 4WD', curb: 5225, gvwr: 6505, maxTrailer: 6000 },
  { id: '8648', grade: 'Limited', engine: 'i-FORCE 2.4L turbo', drive: 'RWD', curb: 4730, gvwr: 6130, maxTrailer: 6000 },
  { id: '8668', grade: 'Limited', engine: 'i-FORCE 2.4L turbo', drive: 'Full-time 4WD', curb: 4970, gvwr: 6395, maxTrailer: 6000 },
  { id: '8632', grade: 'Limited i-FORCE MAX', engine: 'i-FORCE MAX 2.4L hybrid', drive: 'Full-time 4WD', curb: 5370, gvwr: 6505, maxTrailer: 6000 },
  { id: '8638', grade: 'Platinum', engine: 'i-FORCE MAX 2.4L hybrid', drive: 'Full-time 4WD', curb: 5390, gvwr: 6505, maxTrailer: 5800 },
  { id: '8634', grade: 'TRD Pro', engine: 'i-FORCE MAX 2.4L hybrid', drive: 'Part-time 4WD', curb: 5455, gvwr: 6505, maxTrailer: 5800 },
  { id: '8636', grade: 'Trailhunter', engine: 'i-FORCE MAX 2.4L hybrid', drive: 'Part-time 4WD', curb: 5500, gvwr: 6505, maxTrailer: 5800 },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  grade: r.grade,
  engine: r.engine,
  drive: r.drive,
  curbWeight: r.curb,
  gvwr: r.gvwr,
  payload: r.gvwr - r.curb,
  payloadComputed: true,
  maxTrailer: r.maxTrailer,
  source: S,
}));

export const toyota4Runner2026: VehicleData = {
  slug: 'toyota-4runner-towing-capacity',
  make: 'Toyota',
  model: '4Runner',
  year: 2026,
  source: S,
  rows,
  columns: [
    { key: 'grade', header: 'Grade' },
    { key: 'engine', header: 'Engine' },
    { key: 'drive', header: 'Drive' },
    { key: 'curbWeight', header: 'Curb (lb)', numeric: true },
    { key: 'gvwr', header: 'GVWR (lb)', numeric: true },
    { key: 'payload', header: 'Payload (GVWR − curb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [
      {
        cells: ['2026', '6,000 lb'],
        sources: ['toyota-press-4runner-2026', 'toyota-4runner-specs-2026'],
      },
    ],
  },
};

export default toyota4Runner2026;
