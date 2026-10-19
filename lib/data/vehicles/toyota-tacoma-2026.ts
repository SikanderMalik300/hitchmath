// 2026 Toyota Tacoma. Source: toyota-tacoma-specs-2026.
// cab: XtraCab = 2 seats, Double Cab = 5 seats; bed 5-ft = 60.3 in, 6-ft = 73.5 in;
// transmission AT = 8-speed automatic, MT = 6-speed manual.
import type { VehicleData, VehicleRow } from './types';

const S = 'toyota-tacoma-specs-2026' as const;

const rows: VehicleRow[] = [
  { id: '7162', grade: 'SR', engine: 'i-FORCE 2.4L turbo', cab: 'XtraCab', bed: '6-ft', drive: '4x2', transmission: 'AT', curbWeight: 4145, gvwr: 5605, payload: 1460, maxTrailer: 3500, maxTongue: 650, source: S },
  { id: '7186', grade: 'SR', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x2', transmission: 'AT', curbWeight: 4280, gvwr: 5775, payload: 1495, maxTrailer: 3500, maxTongue: 640, source: S },
  { id: '7514', grade: 'SR', engine: 'i-FORCE 2.4L turbo', cab: 'XtraCab', bed: '6-ft', drive: '4x4', transmission: 'AT', curbWeight: 4375, gvwr: 5605, payload: 1230, maxTrailer: 3500, maxTongue: 650, source: S },
  { id: '7594', grade: 'SR', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 4505, gvwr: 6005, payload: 1500, maxTrailer: 3500, maxTongue: 640, source: S },
  { id: '7547', grade: 'SR', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'MT', curbWeight: 4485, gvwr: 5865, payload: 1380, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7126', grade: 'SR5', engine: 'i-FORCE 2.4L turbo', cab: 'XtraCab', bed: '6-ft', drive: '4x2', transmission: 'AT', curbWeight: 4145, gvwr: 5605, payload: 1460, maxTrailer: 6500, maxTongue: 650, source: S },
  { id: '7146', grade: 'SR5', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x2', transmission: 'AT', curbWeight: 4265, gvwr: 5775, payload: 1510, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7170', grade: 'SR5', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '6-ft', drive: '4x2', transmission: 'AT', curbWeight: 4365, gvwr: 5970, payload: 1605, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7558', grade: 'SR5', engine: 'i-FORCE 2.4L turbo', cab: 'XtraCab', bed: '6-ft', drive: '4x4', transmission: 'AT', curbWeight: 4375, gvwr: 5605, payload: 1230, maxTrailer: 6500, maxTongue: 650, source: S },
  { id: '7540', grade: 'SR5', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 4500, gvwr: 6005, payload: 1505, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7570', grade: 'SR5', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '6-ft', drive: '4x4', transmission: 'AT', curbWeight: 4600, gvwr: 6005, payload: 1405, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7166', grade: 'TRD PreRunner', engine: 'i-FORCE 2.4L turbo', cab: 'XtraCab', bed: '6-ft', drive: '4x2', transmission: 'AT', curbWeight: 4200, gvwr: 5605, payload: 1405, maxTrailer: 6500, maxTongue: 650, source: S },
  { id: '7148', grade: 'TRD Sport', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x2', transmission: 'AT', curbWeight: 4330, gvwr: 5775, payload: 1445, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7172', grade: 'TRD Sport', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '6-ft', drive: '4x2', transmission: 'AT', curbWeight: 4345, gvwr: 6025, payload: 1680, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7542', grade: 'TRD Sport', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 4575, gvwr: 6005, payload: 1430, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7543', grade: 'TRD Sport', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'MT', curbWeight: 4605, gvwr: 6175, payload: 1570, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7566', grade: 'TRD Sport', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '6-ft', drive: '4x4', transmission: 'AT', curbWeight: 4600, gvwr: 6300, payload: 1700, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7530', grade: 'TRD Sport i-FORCE MAX', engine: 'i-FORCE MAX 2.4L hybrid', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 5045, gvwr: 6665, payload: 1620, maxTrailer: 6000, maxTongue: 640, source: S },
  { id: '7544', grade: 'TRD Off-Road', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 4630, gvwr: 6240, payload: 1610, maxTrailer: 6300, maxTongue: 640, source: S },
  { id: '7545', grade: 'TRD Off-Road', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'MT', curbWeight: 4650, gvwr: 6175, payload: 1525, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7568', grade: 'TRD Off-Road', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '6-ft', drive: '4x4', transmission: 'AT', curbWeight: 4650, gvwr: 6305, payload: 1655, maxTrailer: 6400, maxTongue: 640, source: S },
  { id: '7532', grade: 'TRD Off-Road i-FORCE MAX', engine: 'i-FORCE MAX 2.4L hybrid', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 5030, gvwr: 6735, payload: 1705, maxTrailer: 6000, maxTongue: 640, source: S },
  { id: '7582', grade: 'Limited', engine: 'i-FORCE 2.4L turbo', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 4715, gvwr: 6305, payload: 1590, maxTrailer: 6300, maxTongue: 640, source: S },
  { id: '7534', grade: 'Limited i-FORCE MAX', engine: 'i-FORCE MAX 2.4L hybrid', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 5170, gvwr: 6780, payload: 1610, maxTrailer: 6000, maxTongue: 640, source: S },
  { id: '7598', grade: 'TRD Pro', engine: 'i-FORCE MAX 2.4L hybrid', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 5100, gvwr: 6780, payload: 1680, maxTrailer: 6000, maxTongue: 640, source: S },
  { id: '7536', grade: 'Trailhunter', engine: 'i-FORCE MAX 2.4L hybrid', cab: 'Double Cab', bed: '5-ft', drive: '4x4', transmission: 'AT', curbWeight: 5360, gvwr: 6835, payload: 1475, maxTrailer: 6000, maxTongue: 640, source: S },
  { id: '7538', grade: 'Trailhunter', engine: 'i-FORCE MAX 2.4L hybrid', cab: 'Double Cab', bed: '6-ft', drive: '4x4', transmission: 'AT', curbWeight: 5410, gvwr: 6835, payload: 1425, maxTrailer: 5950, maxTongue: 640, source: S },
];

export const toyotaTacoma2026: VehicleData = {
  slug: 'toyota-tacoma-towing-capacity',
  make: 'Toyota',
  model: 'Tacoma',
  year: 2026,
  source: S,
  rows,
  columns: [
    { key: 'grade', header: 'Grade' },
    { key: 'engine', header: 'Engine' },
    { key: 'cabbed', header: 'Cab and bed' },
    { key: 'drive', header: 'Drive' },
    { key: 'transmission', header: 'Transmission' },
    { key: 'curbWeight', header: 'Curb (lb)', numeric: true },
    { key: 'gvwr', header: 'GVWR (lb)', numeric: true },
    { key: 'payload', header: 'Payload (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max towing (lb)', numeric: true },
    { key: 'maxTongue', header: 'Max tongue (lb)', numeric: true },
  ],
  tableNote:
    'Toyota notes that towing and payload ratings are not cumulative and that the tow figures assume properly installed equipment.',
  yearHistory: {
    columns: ['Model years', 'Max towing', 'Notes'],
    rows: [
      {
        cells: ['2016 to 2023 (3rd generation)', '6,800 lb', 'V6 with Tow Package, rated to SAE J2807'],
        sources: ['toyota-press-tacoma-2016', 'toyota-press-tacoma-2023'],
      },
      {
        cells: ['2024', '6,500 lb', 'SR5 i-FORCE and TRD PreRunner XtraCab; max payload 1,709 lb (TRD Off-Road)'],
        sources: ['toyota-press-tacoma-2024'],
      },
      {
        cells: ['2025', '6,500 lb', 'Max payload up to 1,705 lb'],
        sources: ['toyota-press-tacoma-2025'],
      },
      {
        cells: ['2026', '6,500 lb', '27 configurations, 3,500 to 6,500 lb'],
        sources: ['toyota-tacoma-specs-2026'],
      },
    ],
  },
};

export default toyotaTacoma2026;
