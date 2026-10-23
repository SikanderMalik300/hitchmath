// 2026 Jeep Wrangler. Source: jeep-wrangler-specs-2026 (and the PDF spec sheet).
// Every row is a 4-door with 4x4. Payload and base weight are as printed by Jeep,
// so the payload column is NOT computed.
// VERIFY: Jeep prints no 2026 Wrangler 4xe spec sheet, so no 4xe rows are listed.
import type { VehicleData, VehicleRow } from './types';

const S = 'jeep-wrangler-specs-2026' as const;

interface Raw {
  id: string;
  trim: string;
  engine: string;
  transmission: string;
  axle: string;
  payload: number;
  base: number;
  gcwr: number;
  maxTrailer: number;
  label: string;
}

const raw: Raw[] = [
  { id: 'wr4-sport-36-m6', trim: 'Sport', engine: '3.6L V-6', transmission: '6-speed manual', axle: '3.45', payload: 1249, base: 4251, gcwr: 8400, maxTrailer: 3500, label: 'Sport 3.6L V-6, manual' },
  { id: 'wr4-sport-36-a8', trim: 'Sport', engine: '3.6L V-6', transmission: '8-speed automatic', axle: '3.45', payload: 1220, base: 4280, gcwr: 8400, maxTrailer: 3500, label: 'Sport 3.6L V-6, automatic' },
  { id: 'wr4-sport-20-a8', trim: 'Sport', engine: '2.0L I-4 turbo', transmission: '8-speed automatic', axle: '3.45', payload: 1203, base: 4297, gcwr: 8400, maxTrailer: 3500, label: 'Sport 2.0L turbo, automatic' },
  { id: 'wr4-sahara-36-a8', trim: 'Sahara', engine: '3.6L V-6', transmission: '8-speed automatic', axle: '3.45', payload: 1136, base: 4464, gcwr: 8400, maxTrailer: 3500, label: 'Sahara 3.6L V-6, automatic' },
  { id: 'wr4-sahara-20-a8', trim: 'Sahara', engine: '2.0L I-4 turbo', transmission: '8-speed automatic', axle: '3.45', payload: 1119, base: 4481, gcwr: 8400, maxTrailer: 3500, label: 'Sahara 2.0L turbo, automatic' },
  { id: 'wr4-rub-36-m6-410', trim: 'Rubicon', engine: '3.6L V-6', transmission: '6-speed manual', axle: '4.10', payload: 1381, base: 4594, gcwr: 8500, maxTrailer: 3500, label: 'Rubicon 3.6L V-6, manual, 4.10 axle' },
  { id: 'wr4-rub-36-m6-488', trim: 'Rubicon', engine: '3.6L V-6', transmission: '6-speed manual', axle: '4.88', payload: 1381, base: 4594, gcwr: 8500, maxTrailer: 3500, label: 'Rubicon 3.6L V-6, manual, 4.88 axle' },
  { id: 'wr4-rub-36-a8-410', trim: 'Rubicon', engine: '3.6L V-6', transmission: '8-speed automatic', axle: '4.10', payload: 1328, base: 4623, gcwr: 10300, maxTrailer: 5000, label: 'Rubicon 3.6L V-6, automatic, 4.10 axle' },
  { id: 'wr4-rub-36-a8-456', trim: 'Rubicon', engine: '3.6L V-6', transmission: '8-speed automatic', axle: '4.56', payload: 1562, base: 4688, gcwr: 8600, maxTrailer: 3500, label: 'Rubicon 3.6L V-6, automatic, 4.56 axle' },
  { id: 'wr4-rub-20-a8-410', trim: 'Rubicon', engine: '2.0L I-4 turbo', transmission: '8-speed automatic', axle: '4.10', payload: 1310, base: 4640, gcwr: 10300, maxTrailer: 5000, label: 'Rubicon 2.0L turbo, automatic, 4.10 axle' },
  { id: 'wr4-rub-20-a8-456', trim: 'Rubicon', engine: '2.0L I-4 turbo', transmission: '8-speed automatic', axle: '4.56', payload: 1545, base: 4705, gcwr: 8600, maxTrailer: 3500, label: 'Rubicon 2.0L turbo, automatic, 4.56 axle' },
  { id: 'wr4-392', trim: '392 models (Jeep lists the 6.4L under Rubicon)', engine: '6.4L V-8', transmission: '8-speed automatic', axle: '4.56', payload: 1088, base: 5268, gcwr: 9400, maxTrailer: 3500, label: '392, 6.4L V-8, automatic, 4.56 axle' },
];

const rows: VehicleRow[] = raw.map((r) => ({
  id: r.id,
  grade: r.trim,
  engine: r.engine,
  transmission: r.transmission,
  axle: r.axle,
  payload: r.payload,
  curbWeight: r.base,
  gcwr: r.gcwr,
  maxTrailer: r.maxTrailer,
  label: r.label,
  source: S,
}));

export const jeepWrangler2026: VehicleData = {
  slug: 'jeep-wrangler-towing-capacity',
  make: 'Jeep',
  model: 'Wrangler',
  year: 2026,
  source: S,
  rows,
  columns: [
    { key: 'grade', header: 'Trim' },
    { key: 'engine', header: 'Engine' },
    { key: 'transmission', header: 'Transmission' },
    { key: 'axle', header: 'Axle' },
    { key: 'payload', header: 'Payload (lb)', numeric: true },
    { key: 'curbWeight', header: 'Base weight (lb)', numeric: true },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max trailer (lb)', numeric: true },
  ],
  tableNotes: [
    "Jeep's 5,000 lb rating is for the 4-door Rubicon with the automatic and the 4.10 axle. For the 2.0L, Jeep adds LT285/70R17C tires.",
    "Jeep's GCWR includes base weight, options, two passengers, the trailer and the trailer equipment.",
    'Jeep sells the 6.4L V-8 for 2026 as the Moab 392 and Willys 392 (4-door only).',
  ],
  detailTableTitle: '2-door Wrangler',
  gcwrTable: {
    caption:
      '2026 Wrangler 2-door maximum trailer weight. Source: Jeep 2026 Wrangler specifications.',
    columns: ['Body', 'Max trailer (lb)'],
    rows: [['2-door (all engines)', '2,000']],
  },
};

export default jeepWrangler2026;
