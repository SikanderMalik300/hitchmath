// 2026 Toyota Tundra. Source: toyota-tundra-specs-2026.
// engine: i-FORCE = 3.4L twin-turbo V6 (Toyota pressroom naming "i-FORCE twin-turbo V6");
// i-FORCE MAX = hybrid twin-turbo V6. Cab/bed derived from Toyota bed length and wheelbase.
// Curb weight omitted: Toyota's page did not provide it cleanly for every configuration.
import type { VehicleData, VehicleRow } from './types';

const S = 'toyota-tundra-specs-2026' as const;

const rows: VehicleRow[] = [
  { id: '8242', grade: 'SR', engine: 'i-FORCE', cab: 'Double Cab', bed: '6.5-ft', drive: '4x2', gvwr: 7035, payload: 1830, maxTrailer: 8300, source: S },
  { id: '8245', grade: 'SR', engine: 'i-FORCE', cab: 'Double Cab', bed: '8.1-ft', drive: '4x2', gvwr: 7165, payload: 1850, maxTrailer: 8300, source: S },
  { id: '8248', grade: 'SR', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x2', gvwr: 6990, payload: 1720, maxTrailer: 8300, source: S },
  { id: '8342', grade: 'SR', engine: 'i-FORCE', cab: 'Double Cab', bed: '6.5-ft', drive: '4x4', gvwr: 7265, payload: 1775, maxTrailer: 8300, source: S },
  { id: '8348', grade: 'SR', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7210, payload: 1710, maxTrailer: 8300, source: S },
  { id: '8241', grade: 'SR5', engine: 'i-FORCE', cab: 'Double Cab', bed: '6.5-ft', drive: '4x2', gvwr: 7035, payload: 1830, maxTrailer: 12000, source: S },
  { id: '8261', grade: 'SR5', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x2', gvwr: 6990, payload: 1720, maxTrailer: 11400, source: S },
  { id: '8281', grade: 'SR5', engine: 'i-FORCE', cab: 'CrewMax', bed: '6.5-ft', drive: '4x2', gvwr: 7165, payload: 1775, maxTrailer: 11270, source: S },
  { id: '8341', grade: 'SR5', engine: 'i-FORCE', cab: 'Double Cab', bed: '6.5-ft', drive: '4x4', gvwr: 7265, payload: 1775, maxTrailer: 11200, source: S },
  { id: '8346', grade: 'SR5', engine: 'i-FORCE', cab: 'Double Cab', bed: '8.1-ft', drive: '4x4', gvwr: 7375, payload: 1775, maxTrailer: 11090, source: S },
  { id: '8361', grade: 'SR5', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7210, payload: 1710, maxTrailer: 11160, source: S },
  { id: '8381', grade: 'SR5', engine: 'i-FORCE', cab: 'CrewMax', bed: '6.5-ft', drive: '4x4', gvwr: 7340, payload: 1695, maxTrailer: 11010, source: S },
  { id: '8272', grade: 'Limited', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x2', gvwr: 7000, payload: 1655, maxTrailer: 11350, source: S },
  { id: '8282', grade: 'Limited', engine: 'i-FORCE', cab: 'CrewMax', bed: '6.5-ft', drive: '4x2', gvwr: 7165, payload: 1685, maxTrailer: 11230, source: S },
  { id: '8372', grade: 'Limited', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7230, payload: 1640, maxTrailer: 11120, source: S },
  { id: '8382', grade: 'Limited', engine: 'i-FORCE', cab: 'CrewMax', bed: '6.5-ft', drive: '4x4', gvwr: 7365, payload: 1635, maxTrailer: 10970, source: S },
  { id: '8401', grade: 'Limited i-FORCE MAX', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '5.5-ft', drive: '4x2', gvwr: 7375, payload: 1630, maxTrailer: 11450, source: S },
  { id: '8411', grade: 'Limited i-FORCE MAX', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '6.5-ft', drive: '4x2', gvwr: 7465, payload: 1655, maxTrailer: 11350, source: S },
  { id: '8421', grade: 'Limited i-FORCE MAX', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7615, payload: 1575, maxTrailer: 11130, source: S },
  { id: '8431', grade: 'Limited i-FORCE MAX', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '6.5-ft', drive: '4x4', gvwr: 7750, payload: 1630, maxTrailer: 11060, source: S },
  { id: '8275', grade: 'Platinum', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x2', gvwr: 7045, payload: 1575, maxTrailer: 11310, source: S },
  { id: '8375', grade: 'Platinum', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7285, payload: 1545, maxTrailer: 11050, source: S },
  { id: '8385', grade: 'Platinum', engine: 'i-FORCE', cab: 'CrewMax', bed: '6.5-ft', drive: '4x4', gvwr: 7375, payload: 1545, maxTrailer: 10870, source: S },
  { id: '8422', grade: 'Platinum i-FORCE MAX', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7660, payload: 1510, maxTrailer: 10990, source: S },
  { id: '8432', grade: 'Platinum i-FORCE MAX', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '6.5-ft', drive: '4x4', gvwr: 7780, payload: 1575, maxTrailer: 10960, source: S },
  { id: '8276', grade: '1794 Edition', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x2', gvwr: 7045, payload: 1575, maxTrailer: 11310, source: S },
  { id: '8376', grade: '1794 Edition', engine: 'i-FORCE', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7285, payload: 1545, maxTrailer: 11050, source: S },
  { id: '8386', grade: '1794 Edition', engine: 'i-FORCE', cab: 'CrewMax', bed: '6.5-ft', drive: '4x4', gvwr: 7375, payload: 1545, maxTrailer: 10870, source: S },
  { id: '8423', grade: '1794 Edition i-FORCE MAX', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7660, payload: 1510, maxTrailer: 10990, source: S },
  { id: '8433', grade: '1794 Edition i-FORCE MAX', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '6.5-ft', drive: '4x4', gvwr: 7780, payload: 1575, maxTrailer: 10960, source: S },
  { id: '8424', grade: 'TRD Pro', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7630, payload: 1580, maxTrailer: 11130, source: S },
  { id: '8425', grade: 'Capstone', engine: 'i-FORCE MAX', cab: 'CrewMax', bed: '5.5-ft', drive: '4x4', gvwr: 7650, payload: 1420, maxTrailer: 10290, source: S },
];

export const toyotaTundra2026: VehicleData = {
  slug: 'toyota-tundra-towing-capacity',
  make: 'Toyota',
  model: 'Tundra',
  year: 2026,
  source: S,
  rows,
  columns: [
    { key: 'grade', header: 'Grade' },
    { key: 'engine', header: 'Engine' },
    { key: 'cabbed', header: 'Cab and bed' },
    { key: 'drive', header: 'Drive' },
    { key: 'gvwr', header: 'GVWR (lb)', numeric: true },
    { key: 'payload', header: 'Payload (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
  ],
  yearHistory: {
    columns: ['Model year', 'Max towing', 'Max payload'],
    rows: [
      { cells: ['2025', '12,000 lb', '1,940 lb'], sources: ['toyota-press-tundra-2025'] },
      {
        cells: ['2026', '12,000 lb', '1,850 lb (SR Double Cab 8.1-ft 4x2)'],
        sources: ['toyota-tundra-specs-2026', 'toyota-press-tundra-2026'],
      },
    ],
  },
};

export default toyotaTundra2026;
