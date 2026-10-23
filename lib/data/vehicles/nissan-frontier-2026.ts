// 2026 Nissan Frontier. Every row is the 3.8L V6 with a 9-speed automatic.
// Sources:
//   Max tow and payload: nissan-frontier-brochure-2026 (p. 12).
//   Tongue load, curb weight, GVWR and GCWR: nissan-frontier-presskit-2026.
//
// PRO-4X discrepancy: the press kit's PRO-4X towing row reads 6,270 (SWB) and
// 6,310 (LWB). The brochure reads 6,680 and 6,270. We use the brochure, because
// its figures are exactly 10x the press kit's own PRO-4X tongue loads (668, 627).
import type { VehicleData, VehicleRow } from './types';

const S = 'nissan-frontier-brochure-2026' as const;

interface Raw {
  id: string;
  cab: string;
  bed: string;
  grade: string;
  drive: string;
  maxTrailer: number;
  tongue: number;
  curb: number;
  payload: number;
}

const GVWR = 6012;
const GCWR = 11960;

const raw: Raw[] = [
  { id: 'fr-kc-s-4x2', cab: 'King Cab', bed: 'std', grade: 'S', drive: '4x2', maxTrailer: 7150, tongue: 715, curb: 4385, payload: 1590 },
  { id: 'fr-kc-s-4x4', cab: 'King Cab', bed: 'std', grade: 'S', drive: '4x4', maxTrailer: 7000, tongue: 700, curb: 4543, payload: 1430 },
  { id: 'fr-cc-s-4x2', cab: 'Crew Cab', bed: 'short', grade: 'S', drive: '4x2', maxTrailer: 7070, tongue: 707, curb: 4466, payload: 1490 },
  { id: 'fr-cc-s-4x4', cab: 'Crew Cab', bed: 'short', grade: 'S', drive: '4x4', maxTrailer: 6960, tongue: 696, curb: 4626, payload: 1330 },
  { id: 'fr-cc-sv-4x2', cab: 'Crew Cab', bed: 'short', grade: 'SV', drive: '4x2', maxTrailer: 7000, tongue: 700, curb: 4492, payload: 1480 },
  { id: 'fr-cc-sv-4x2-lb', cab: 'Crew Cab', bed: 'long', grade: 'SV', drive: '4x2', maxTrailer: 6920, tongue: 692, curb: 4557, payload: 1400 },
  { id: 'fr-cc-sv-4x4', cab: 'Crew Cab', bed: 'short', grade: 'SV', drive: '4x4', maxTrailer: 6880, tongue: 688, curb: 4657, payload: 1310 },
  { id: 'fr-cc-sv-4x4-lb', cab: 'Crew Cab', bed: 'long', grade: 'SV', drive: '4x4', maxTrailer: 6760, tongue: 676, curb: 4758, payload: 1200 },
  { id: 'fr-cc-prox-4x2', cab: 'Crew Cab', bed: 'short', grade: 'PRO-X', drive: '4x2', maxTrailer: 6900, tongue: 690, curb: 4561, payload: 1430 },
  { id: 'fr-cc-pro4x-4x4', cab: 'Crew Cab', bed: 'short', grade: 'PRO-4X', drive: '4x4', maxTrailer: 6680, tongue: 668, curb: 4763, payload: 1220 },
  { id: 'fr-cc-pro4x-4x4-lb', cab: 'Crew Cab', bed: 'long', grade: 'PRO-4X', drive: '4x4', maxTrailer: 6270, tongue: 627, curb: 4865, payload: 1100 },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  cab: r.cab,
  bed: r.bed,
  grade: r.grade,
  drive: r.drive,
  engine: '3.8L V6',
  transmission: '9-speed automatic',
  maxTrailer: r.maxTrailer,
  maxTongue: r.tongue,
  curbWeight: r.curb,
  payload: r.payload,
  gvwr: GVWR,
  gcwr: GCWR,
  source: S,
}));

export const nissanFrontier2026: VehicleData = {
  slug: 'nissan-frontier-towing-capacity',
  make: 'Nissan',
  model: 'Frontier',
  year: 2026,
  source: S,
  rows,
  columns: [
    { key: 'cab', header: 'Cab' },
    { key: 'bed', header: 'Bed' },
    { key: 'grade', header: 'Grade' },
    { key: 'drive', header: 'Drive' },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'maxTongue', header: 'Tongue load (lb)', numeric: true },
    { key: 'curbWeight', header: 'Curb weight (lb)', numeric: true },
    { key: 'payload', header: 'Payload (lb)', numeric: true },
    { key: 'gvwr', header: 'GVWR (lb)', numeric: true },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
  ],
  tableNotes: [
    "Nissan's press kit prints one GVWR (6,012 lb) and one GCWR (11,960 lb) for the whole line.",
    "Nissan's documents differ on PRO-4X towing. We show the brochure's figures. Check your owner's manual.",
  ],
};

export default nissanFrontier2026;
