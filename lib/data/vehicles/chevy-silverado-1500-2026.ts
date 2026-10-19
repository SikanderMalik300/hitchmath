// 2026 Chevrolet Silverado 1500. Source: gm-guide-2026, cross-checked with
// gm-silverado1500-chart-2026. Guide values are primary; where the model chart
// differs, the guide value is shown with a footnote (VERIFY items, see report).
// Each guide row becomes two data rows (2WD and 4x4).
import type { VehicleData, VehicleRow } from './types';

const S = 'gm-guide-2026' as const;

interface Base {
  engine: string;
  pkg?: string;
  cab: string;
  gcwr: number;
  twoWd: number | null;
  fourX4: number | null;
  note2wd?: string;
  note4x4?: string;
  gcwrNote?: string; // applies to both drive rows
}

const base: Base[] = [
  { engine: '2.7L TurboMax', cab: 'Regular Cab Standard Box', gcwr: 14000, twoWd: 9100, fourX4: 8900 },
  { engine: '2.7L TurboMax', cab: 'Regular Cab Long Box', gcwr: 14500, twoWd: 9500, fourX4: 9300 },
  { engine: '2.7L TurboMax', cab: 'Double Cab Standard Box', gcwr: 14500, twoWd: 9300, fourX4: 9000 },
  { engine: '2.7L TurboMax', cab: 'Crew Cab Short Box', gcwr: 14500, twoWd: 9300, fourX4: 9000 },
  { engine: '2.7L TurboMax', cab: 'Crew Cab Standard Box', gcwr: 14500, twoWd: 9100, fourX4: 9000 },
  { engine: '5.3L V8', cab: 'Regular Cab Long Box', gcwr: 15000, twoWd: 9900, fourX4: 9600 },
  { engine: '5.3L V8', cab: 'Double Cab Standard Box', gcwr: 15000, twoWd: 9700, fourX4: 9300 },
  { engine: '5.3L V8', cab: 'Crew Cab Short Box', gcwr: 15000, twoWd: 9600, fourX4: 9300 },
  { engine: '5.3L V8', cab: 'Crew Cab Standard Box', gcwr: 15000, twoWd: 9500, fourX4: 9200 },
  { engine: '5.3L V8', pkg: 'Max Trailering', cab: 'Double Cab Standard Box', gcwr: 16800, twoWd: 11300, fourX4: 11100, note2wd: "Chevrolet's model chart lists 11,400 lb." },
  { engine: '5.3L V8', pkg: 'Max Trailering', cab: 'Crew Cab Short Box', gcwr: 16800, twoWd: 11300, fourX4: 11000 },
  { engine: '5.3L V8', pkg: 'Max Trailering', cab: 'Crew Cab Standard Box', gcwr: 16800, twoWd: 11200, fourX4: 11000 },
  { engine: '6.2L V8', cab: 'Crew Cab Short or Standard Box', gcwr: 15000, twoWd: null, fourX4: 9100 },
  { engine: '6.2L V8', pkg: 'Max Trailering, 18" wheels', cab: 'Crew Cab Short or Standard Box', gcwr: 17800, twoWd: null, fourX4: 11900 },
  { engine: '6.2L V8', pkg: 'Max Trailering, 20" wheels (RST)', cab: 'Crew Cab Short or Standard Box', gcwr: 19100, twoWd: null, fourX4: 13200 },
  { engine: '6.2L V8', pkg: 'ZR2', cab: 'Crew Cab Short Box', gcwr: 15000, twoWd: null, fourX4: 8800 },
  { engine: '3.0L Duramax', cab: 'Double Cab Standard Box', gcwr: 15000, twoWd: 9300, fourX4: 9100 },
  { engine: '3.0L Duramax', cab: 'Crew Cab Short Box', gcwr: 15000, twoWd: 9300, fourX4: 9000 },
  { engine: '3.0L Duramax', cab: 'Crew Cab Standard Box', gcwr: 15000, twoWd: 9200, fourX4: 9000 },
  { engine: '3.0L Duramax', pkg: 'Max Trailering', cab: 'Double Cab Standard Box', gcwr: 17800, twoWd: 12100, fourX4: 11800 },
  { engine: '3.0L Duramax', pkg: 'Max Trailering', cab: 'Crew Cab Short Box', gcwr: 17800, twoWd: 12000, fourX4: 11800 },
  { engine: '3.0L Duramax', pkg: 'Max Trailering', cab: 'Crew Cab Standard Box', gcwr: 17800, twoWd: 11900, fourX4: 11700 },
  { engine: '3.0L Duramax', pkg: 'Max Trailering, 20" wheels', cab: 'Double Cab Standard Box', gcwr: 19000, twoWd: 13300, fourX4: 13000, gcwrNote: "Chevrolet's model chart lists 19,100 lb GCWR." },
  { engine: '3.0L Duramax', pkg: 'Max Trailering, 20" wheels', cab: 'Crew Cab Short Box', gcwr: 19000, twoWd: 13200, fourX4: 13000 },
  { engine: '3.0L Duramax', pkg: 'Max Trailering, 20" wheels', cab: 'Crew Cab Standard Box', gcwr: 19000, twoWd: 13100, fourX4: 12900, note4x4: "Chevrolet's model chart lists 12,800 lb." },
  { engine: '3.0L Duramax', pkg: 'ZR2', cab: 'Crew Cab Short Box', gcwr: 15000, twoWd: null, fourX4: 8700 },
];

function buildRows(): VehicleRow[] {
  const out: VehicleRow[] = [];
  base.forEach((b, i) => {
    const pkgSlug = (b.pkg ?? 'std').replace(/[^a-z0-9]+/gi, '').toLowerCase();
    const noteParts = (drive: '2wd' | '4x4') => {
      const parts: string[] = [];
      if (drive === '2wd' && b.note2wd) parts.push(b.note2wd);
      if (drive === '4x4' && b.note4x4) parts.push(b.note4x4);
      if (b.gcwrNote) parts.push(b.gcwrNote);
      return parts.length ? parts.join(' ') : undefined;
    };
    if (b.twoWd != null) {
      out.push({
        id: `${i}-${pkgSlug}-2wd`,
        engine: b.engine,
        package: b.pkg,
        cab: b.cab,
        drive: '2WD',
        gcwr: b.gcwr,
        maxTrailer: b.twoWd,
        note: noteParts('2wd'),
        source: S,
      });
    }
    if (b.fourX4 != null) {
      out.push({
        id: `${i}-${pkgSlug}-4x4`,
        engine: b.engine,
        package: b.pkg,
        cab: b.cab,
        drive: '4x4',
        gcwr: b.gcwr,
        maxTrailer: b.fourX4,
        note: noteParts('4x4'),
        source: S,
      });
    }
  });
  return out;
}

// Max payload VERIFY item (Chevrolet product page). Shown only if the VERIFY passes.
export const SILVERADO_MAX_PAYLOAD = 2260;
export const SILVERADO_MAX_PAYLOAD_VERIFIED = true;

export const chevySilverado15002026: VehicleData = {
  slug: 'chevy-silverado-1500-towing-capacity',
  make: 'Chevrolet',
  model: 'Silverado 1500',
  year: 2026,
  source: S,
  rows: buildRows(),
  columns: [
    { key: 'engine', header: 'Engine' },
    { key: 'package', header: 'Package' },
    { key: 'cabbed', header: 'Cab and box' },
    { key: 'drive', header: 'Drive' },
    { key: 'gcwr', header: 'GCWR (lb)', numeric: true },
    { key: 'maxTrailer', header: 'Max tow (lb)', numeric: true },
    { key: 'note', header: 'Note' },
  ],
};

export default chevySilverado15002026;
