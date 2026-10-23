// 2027 Kia Telluride. Kia skipped the 2026 model year (media site goes 2025 -> 2027).
// Sources: kia-telluride-specs-2027 (gas rows), kia-telluride-hev-specs-2027 (hybrid).
// Kia prints a min and max curb weight per trim. Payload is computed as
// GVWR - max curb (low) to GVWR - min curb (high); the column is marked computed.
import type { VehicleData, VehicleRow } from './types';

const GAS = 'kia-telluride-specs-2027' as const;
const HEV = 'kia-telluride-hev-specs-2027' as const;

interface Raw {
  id: string;
  trim: string;
  powertrain: 'Gas' | 'Hybrid';
  drive: string;
  maxTrailer: number;
  gvwr: number;
  curbMin: number;
  curbMax: number;
}

const raw: Raw[] = [
  { id: 'tel-lx-fwd', trim: 'LX', powertrain: 'Gas', drive: 'FWD', maxTrailer: 5000, gvwr: 6063, curbMin: 4381, curbMax: 4420 },
  { id: 'tel-s-fwd', trim: 'S', powertrain: 'Gas', drive: 'FWD', maxTrailer: 5000, gvwr: 6063, curbMin: 4433, curbMax: 4550 },
  { id: 'tel-s-awd', trim: 'S', powertrain: 'Gas', drive: 'AWD', maxTrailer: 5000, gvwr: 6261, curbMin: 4572, curbMax: 4713 },
  { id: 'tel-ex-fwd', trim: 'EX', powertrain: 'Gas', drive: 'FWD', maxTrailer: 5000, gvwr: 6063, curbMin: 4467, curbMax: 4506 },
  { id: 'tel-ex-awd', trim: 'EX', powertrain: 'Gas', drive: 'AWD', maxTrailer: 5000, gvwr: 6261, curbMin: 4605, curbMax: 4645 },
  { id: 'tel-xl-ex-awd', trim: 'X-Line EX', powertrain: 'Gas', drive: 'AWD', maxTrailer: 5000, gvwr: 6261, curbMin: 4619, curbMax: 4744 },
  { id: 'tel-sx-fwd', trim: 'SX', powertrain: 'Gas', drive: 'FWD', maxTrailer: 5000, gvwr: 6063, curbMin: 4433, curbMax: 4550 },
  { id: 'tel-xl-sx-awd', trim: 'X-Line SX', powertrain: 'Gas', drive: 'AWD', maxTrailer: 5000, gvwr: 6261, curbMin: 4619, curbMax: 4744 },
  { id: 'tel-sxp-awd', trim: 'SX Prestige', powertrain: 'Gas', drive: 'AWD', maxTrailer: 5000, gvwr: 6261, curbMin: 4572, curbMax: 4713 },
  { id: 'tel-xl-sxp-awd', trim: 'X-Line SX Prestige', powertrain: 'Gas', drive: 'AWD', maxTrailer: 5000, gvwr: 6261, curbMin: 4619, curbMax: 4744 },
  { id: 'tel-xpro-sx-awd', trim: 'X-Pro SX', powertrain: 'Gas', drive: 'AWD', maxTrailer: 5000, gvwr: 6261, curbMin: 4729, curbMax: 4736 },
  { id: 'tel-xpro-sxp-awd', trim: 'X-Pro SX Prestige', powertrain: 'Gas', drive: 'AWD', maxTrailer: 5000, gvwr: 6261, curbMin: 4729, curbMax: 4736 },
  { id: 'tel-hev-ex-fwd', trim: 'EX', powertrain: 'Hybrid', drive: 'FWD', maxTrailer: 4500, gvwr: 6283, curbMin: 4661, curbMax: 4700 },
  { id: 'tel-hev-ex-awd', trim: 'EX', powertrain: 'Hybrid', drive: 'AWD', maxTrailer: 4500, gvwr: 6504, curbMin: 4806, curbMax: 4846 },
  { id: 'tel-hev-sx-fwd', trim: 'SX', powertrain: 'Hybrid', drive: 'FWD', maxTrailer: 4500, gvwr: 6283, curbMin: 4747, curbMax: 4786 },
  { id: 'tel-hev-xl-sx-awd', trim: 'X-Line SX', powertrain: 'Hybrid', drive: 'AWD', maxTrailer: 4500, gvwr: 6504, curbMin: 4912, curbMax: 5062 },
  { id: 'tel-hev-sxp-awd', trim: 'SX Prestige', powertrain: 'Hybrid', drive: 'AWD', maxTrailer: 4500, gvwr: 6504, curbMin: 4923, curbMax: 5042 },
  { id: 'tel-hev-xl-sxp-awd', trim: 'X-Line SX Prestige', powertrain: 'Hybrid', drive: 'AWD', maxTrailer: 4500, gvwr: 6504, curbMin: 4912, curbMax: 5062 },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  grade: r.trim,
  package: r.powertrain,
  drive: r.drive,
  engine: r.powertrain === 'Gas' ? '2.5L turbo 4-cylinder' : '2.5L turbo hybrid',
  maxTrailer: r.maxTrailer,
  gvwr: r.gvwr,
  curbWeight: r.curbMin,
  curbWeightMax: r.curbMax,
  payload: r.gvwr - r.curbMax,
  payloadMax: r.gvwr - r.curbMin,
  payloadComputed: true,
  source: r.powertrain === 'Gas' ? GAS : HEV,
}));

export const kiaTelluride2027: VehicleData = {
  slug: 'kia-telluride-towing-capacity',
  make: 'Kia',
  model: 'Telluride',
  year: 2027,
  source: GAS,
  rows,
  columns: [
    { key: 'grade', header: 'Trim' },
    { key: 'package', header: 'Powertrain' },
    { key: 'drive', header: 'Drive' },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'gvwr', header: 'GVWR (lb)', numeric: true },
    { key: 'curbWeight', header: 'Curb weight (lb)', numeric: true },
    { key: 'payload', header: 'Payload (GVWR − curb)', numeric: true },
  ],
  tableNotes: [
    'Gas trims use a 2.5L turbo 4-cylinder (274 hp) with an 8-speed automatic. Hybrid trims use a 2.5L turbo hybrid with a 6-speed automatic.',
    "Kia: towing requires additional equipment. See the owner's manual for towing capacity.",
    'An integrated tow hitch is standard on X-Pro and optional on other trims. Self-leveling rear suspension is standard on X-Line EX, SX and above.',
    'Kia prints no tongue weight or GCWR for the 2027 Telluride.',
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing'],
    rows: [
      {
        cells: ['2027', '5,000 lb gas (all trims), 4,500 lb hybrid'],
        sources: ['kia-telluride-specs-2027', 'kia-telluride-hev-specs-2027'],
      },
      { cells: ['2026', 'No 2026 model year'], sources: ['kia-telluride-specs-2027'] },
      {
        cells: ['2025', '5,000 lb; 5,500 lb for EX X-Pro and SX Prestige X-Pro (AWD)'],
        sources: ['kia-telluride-specs-2025'],
      },
    ],
  },
  yearHistoryNote: 'Older model years are added once we verify them from Kia documents.',
};

export default kiaTelluride2027;
