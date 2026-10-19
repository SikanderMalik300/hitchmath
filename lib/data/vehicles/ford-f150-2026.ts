// 2026 Ford F-150. Source: ford-f150-specs-2026 unless noted.
// Numbers flagged VERIFY in the spec are checked against the source PDFs; see report.
import type { VehicleData, VehicleRow } from './types';

const S = 'ford-f150-specs-2026' as const;

const rows: VehicleRow[] = [
  { id: '27-4x2', engine: '2.7L EcoBoost V6', drive: '4x2', maxTrailer: 8400, payload: 1775, source: S },
  { id: '27-4x4', engine: '2.7L EcoBoost V6', drive: '4x4', maxTrailer: 8200, payload: 1715, source: S },
  { id: '50-4x2', engine: '5.0L V8', drive: '4x2', maxTrailer: 12800, payload: 2235, note: 'Guide p.12 lists 2,225 payload; see "Where Ford’s documents disagree"', source: S },
  { id: '50-4x4', engine: '5.0L V8', drive: '4x4', maxTrailer: 12800, payload: 2080, note: '12,800 SuperCrew only', source: S },
  { id: '35-4x2', engine: '3.5L EcoBoost V6', drive: '4x2', maxTrailer: 13300, payload: 2440, note: 'Max payload of the lineup', source: S },
  { id: '35-4x4', engine: '3.5L EcoBoost V6', drive: '4x4', maxTrailer: 13500, payload: 2175, note: 'SuperCrew with Tow/Haul Package (53T) and Max Tow Axle; lineup max', source: S },
  { id: 'pb-4x2', engine: '3.5L PowerBoost hybrid', drive: '4x2', maxTrailer: 12400, payload: 2045, note: 'Guide p.12 lists 11,600 max; guide p.17 shows 12,400; see "Where Ford’s documents disagree"', source: S },
  { id: 'pb-4x4', engine: '3.5L PowerBoost hybrid', drive: '4x4', maxTrailer: 11600, payload: 1740, note: 'SuperCrew only', source: S },
  { id: 'raptor', engine: '3.5L EcoBoost H.O. (Raptor)', drive: '4x4', maxTrailer: 8200, payload: 1405, source: S },
  { id: 'raptorr', engine: '5.2L supercharged V8 (Raptor R)', drive: '4x4', maxTrailer: 8700, payload: 1410, note: '37-inch tires', source: S },
];

export const fordF1502026: VehicleData = {
  slug: 'ford-f150-towing-capacity',
  make: 'Ford',
  model: 'F-150',
  year: 2026,
  source: S,
  rows,
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'drive', header: 'Drive' },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'payload', header: 'Max payload (lb)', numeric: true },
    { key: 'note', header: 'Note' },
  ],
  gcwrTable: {
    caption: 'GCWR rows from Ford’s 2026 RV & Trailer Towing Guide (pages 15 to 17).',
    columns: ['Engine', 'Axle', 'GCWR (lb)', 'Max trailer (lb)'],
    rows: [
      ['2.7L EcoBoost', '3.73', '13,300', '8,400'],
      ['5.0L V8', '3.73, 53T + Max Tow Axle', '18,100', '12,800'],
      ['3.5L EcoBoost', '3.55, 53T + Max Tow Axle', '19,400', '13,500'],
      ['3.5L PowerBoost', '3.73, 53T + Max Tow Axle', '18,400', '12,400'],
      ['3.5L H.O. (Raptor)', '4.10', '14,650', '8,200'],
      ['5.2L SC (Raptor R)', '4.10', '15,300', '8,700'],
    ],
    sourceId: 'ford-guide-2026',
  },
  yearHistory: {
    columns: ['Model year', '2.7L', '5.0L', '3.5L EcoBoost', 'PowerBoost', 'Raptor', 'Raptor R'],
    rows: [
      {
        cells: ['2025', '8,400', '12,900', '13,500', '11,200', '8,200', '8,700'],
        sources: ['ford-guide-2025'],
      },
      {
        cells: ['2026', '8,400', '12,800', '13,500', '12,400 (4x2)', '8,200', '8,700'],
        sources: ['ford-f150-specs-2026'],
      },
    ],
  },
};

export default fordF1502026;
