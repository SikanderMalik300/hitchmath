// 2026 Ford Expedition. Source: ford-guide-2026, p. 38.
// Every row is the 3.5L EcoBoost V6 with an automatic transmission.
import type { VehicleData, VehicleRow } from './types';

const S = 'ford-guide-2026' as const;

const rows: VehicleRow[] = [
  {
    id: 'exp-swb-4x2',
    grade: 'Expedition (SWB)',
    engine: '3.5L EcoBoost V6',
    axle: '3.31',
    drive: '4x2',
    gcwr: 12000,
    maxTrailer: 6000,
    label: 'Expedition SWB 4x2, 3.31 axle',
    source: S,
  },
  {
    id: 'exp-max-4x2',
    grade: 'Expedition MAX (LWB)',
    engine: '3.5L EcoBoost V6',
    axle: '3.31',
    drive: '4x2',
    gcwr: 12500,
    maxTrailer: 6300,
    label: 'Expedition MAX 4x2, 3.31 axle',
    source: S,
  },
  {
    id: 'exp-swb-4x4-24',
    grade: 'Expedition (SWB)',
    engine: '3.5L EcoBoost V6',
    axle: '3.73',
    drive: '4x4',
    gcwr: 15600,
    maxTrailer: 9200,
    note: 'Equipped with 24" wheels',
    label: 'Expedition SWB 4x4, 3.73 axle, 24-inch wheels',
    source: S,
  },
  {
    id: 'exp-swb-4x4-tremor',
    grade: 'Expedition (SWB)',
    engine: '3.5L EcoBoost V6',
    axle: '3.73',
    drive: '4x4',
    gcwr: 15600,
    maxTrailer: 9300,
    note: 'Tremor High Output engine',
    label: 'Expedition SWB 4x4, Tremor High Output',
    source: S,
  },
  {
    id: 'exp-max-4x4',
    grade: 'Expedition MAX (LWB)',
    engine: '3.5L EcoBoost V6',
    axle: '3.73',
    drive: '4x4',
    gcwr: 15600,
    maxTrailer: 9000,
    maxTongue: 900,
    label: 'Expedition MAX 4x4, 3.73 axle',
    source: S,
  },
  {
    id: 'exp-swb-4x4',
    grade: 'Expedition (SWB)',
    engine: '3.5L EcoBoost V6',
    axle: '3.73',
    drive: '4x4',
    gcwr: 15900,
    maxTrailer: 9600,
    maxTongue: 960,
    label: 'Expedition SWB 4x4, 3.73 axle',
    source: S,
  },
];

export const fordExpedition2026: VehicleData = {
  slug: 'ford-expedition-towing-capacity',
  make: 'Ford',
  model: 'Expedition',
  year: 2026,
  source: S,
  readDate: '2026-10-23',
  rows,
  columns: [
    { key: 'grade', header: 'Body' },
    { key: 'axle', header: 'Axle' },
    { key: 'drive', header: 'Drive' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'note', header: 'Note' },
  ],
  tableNotes: [
    'For trailers over 7,000 lb, Ford requires a weight-distributing hitch. Class IV Heavy-Duty Trailer Tow is standard on 4x4.',
    'Ford lists the maximum trailer frontal area as 55 sq ft without Heavy-Duty Trailer Tow and 60 sq ft with it (4x4 only).',
    'The hitch receiver does not include a hitch ball or ball mount.',
    'Ford rates these trailers with the SAE J2807 method and a 150 lb driver and 150 lb passenger.',
  ],
  detailTableTitle: 'Hitch receiver limits',
  gcwrTable: {
    caption:
      '2026 Expedition hitch receiver limits. Source: Ford 2026 RV & Trailer Towing Guide, p. 38.',
    columns: [
      'Model',
      'Weight-carrying max trailer',
      'Max tongue',
      'Weight-distributing max trailer',
      'Max tongue',
    ],
    rows: [
      ['Expedition (SWB) 4x4', '7,000', '700', '9,600', '960'],
      ['Expedition MAX (LWB) 4x4', '7,000', '700', '9,000', '900'],
    ],
  },
};

export default fordExpedition2026;
