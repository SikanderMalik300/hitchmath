// 2026 Ram 1500. Source: ram-1500-chart-2026.
// The per-cab/axle detail (second table) is a VERIFY item read from the PDF; see report.
import type { VehicleData, VehicleRow } from './types';

const S = 'ram-1500-chart-2026' as const;

const rows: VehicleRow[] = [
  { id: 'v6', engine: '3.6L Pentastar V6 eTorque', output: '305 hp / 269 lb-ft', maxTrailer: 8130, payload: 2360, note: 'Max payload: Quad Cab 4x2', source: S },
  { id: 'hemi', engine: '5.7L HEMI V8 eTorque', output: '395 hp / 410 lb-ft', maxTrailer: 11320, payload: 1650, gcwr: 17000, note: '3.92 axle, 17,000 lb GCWR', source: S },
  { id: 'hso', engine: '3.0L Hurricane I6 Standard Output', output: '420 hp / 469 lb-ft', maxTrailer: 11610, payload: 1930, gcwr: 17000, note: '3.92 axle, 17,000 lb GCWR; lineup max', source: S },
  { id: 'hho', engine: '3.0L Hurricane I6 High Output', output: '540 hp / 521 lb-ft', drive: '4x4', maxTrailer: 10000, payload: 1490, note: '4x4', source: S },
];

export const ram15002026: VehicleData = {
  slug: 'ram-1500-towing-capacity',
  make: 'Ram',
  model: '1500',
  year: 2026,
  source: S,
  rows,
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'output', header: 'Output' },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'payload', header: 'Max payload (lb)', numeric: true },
    { key: 'note', header: 'Note' },
  ],
  tableNote:
    "Ram's ratings include 300 lb of passenger weight. Trailer and payload ratings are not cumulative.",
  detailTableTitle: 'Towing by cab, axle and GCWR',
  // Read from Ram's 2026 chart (VERIFY). Each cell is 4x2/4x4; NA = not offered.
  // Only rows read with certainty are listed.
  gcwrTable: {
    caption: 'Maximum trailer weight by cab, axle ratio and GCWR. 4x2/4x4; NA means not offered.',
    columns: ['Engine', 'Axle', 'GCWR (lb)', 'Quad Cab 6\'4"', 'Crew Cab 5\'7"', 'Crew Cab 6\'4"'],
    rows: [
      ['Hurricane SO', '3.21', '13,900', '8,510 / NA', '8,390 / NA', '8,320 / NA'],
      ['Hurricane SO', '3.55', '13,900', 'NA / 8,270', 'NA / 8,100', 'NA / 8,120'],
      ['Hurricane SO', '3.92', '17,000', '11,610 / 11,370', '11,490 / 11,200', '11,420 / 11,220'],
      ['5.7L HEMI', '3.21', '13,900', 'NA / NA', '8,220 / NA', 'NA / NA'],
      ['5.7L HEMI', '3.55', '13,900', 'NA / NA', 'NA / 7,640', 'NA / NA'],
      ['5.7L HEMI', '3.92', '17,000', 'NA / NA', '11,320 / NA', 'NA / NA'],
    ],
    sourceId: 'ram-1500-chart-2026',
  },
};

export default ram15002026;
