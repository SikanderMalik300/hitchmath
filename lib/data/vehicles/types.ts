import type { SourceId } from '../sources';

export interface TrimEntry {
  name: string;
  maxTrailer: number;
}

export interface VehicleRow {
  id: string;
  grade?: string;
  engine: string;
  output?: string;
  cab?: string;
  bed?: string;
  drive?: string;
  transmission?: string;
  axle?: string;
  package?: string;
  doors?: string;
  seats?: string;
  gcwr?: number;
  maxTrailer: number;
  tow2wd?: number; // GM SUVs print one 2WD and one 4WD rating per engine/package
  tow4wd?: number;
  maxTongue?: number;
  payload?: number;
  payloadMax?: number; // when a trim has a payload range, this is the upper value
  payloadComputed?: boolean;
  curbWeight?: number;
  curbWeightMax?: number; // when a trim has a curb-weight range, this is the upper value
  gvwr?: number;
  note?: string;
  label?: string; // explicit mini-calculator dropdown label when the generic one is ambiguous
  trims?: TrimEntry[]; // one row covers several rated trims (Bronco); each trim is a mini-calc option
  source: SourceId;
}

export type ColumnKey =
  | 'grade'
  | 'engine'
  | 'output'
  | 'cabbed'
  | 'cab'
  | 'bed'
  | 'drive'
  | 'transmission'
  | 'axle'
  | 'package'
  | 'doors'
  | 'seats'
  | 'trimsRated'
  | 'gcwr'
  | 'maxTrailer'
  | 'tow2wd'
  | 'tow4wd'
  | 'maxTongue'
  | 'payload'
  | 'curbWeight'
  | 'gvwr'
  | 'note';

export interface VehicleColumn {
  key: ColumnKey;
  header: string;
  numeric?: boolean;
}

/** A table with per-row source attribution (year history). */
export interface HistoryTable {
  columns: string[];
  rows: { cells: string[]; sources: SourceId[] }[];
}

/** A plain reference table with a single source (e.g. F-150 GCWR rows). */
export interface SimpleTable {
  caption?: string;
  columns: string[];
  rows: string[][];
  sourceId?: SourceId;
}

export interface VehicleData {
  slug: string;
  make: string;
  model: string;
  year: number;
  source: SourceId; // primary table source
  rows: VehicleRow[];
  columns: VehicleColumn[];
  tableNote?: string; // disclaimer line under the main table
  tableNotes?: string[]; // extra notes under the table (e.g. Ford guide notes)
  yearHistory?: HistoryTable; // not every page has a year-history table
  yearHistoryNote?: string; // line under the year history ("Older model years are added...")
  readDate?: string; // caption "read {date}" override (defaults to the source's accessed date)
  gcwrTable?: SimpleTable; // optional separate reference table (F-150 GCWR, Ram per-cab)
  detailTableTitle?: string; // heading for gcwrTable (default "GCWR rows")
}

/** A selectable configuration in the "Check your setup" mini calculator. */
export interface MiniConfig {
  id: string;
  label: string;
  maxTrailer: number;
  maxTongue?: number;
  gcwr?: number;
  payload?: number;
  gvwr?: number;
  curbWeight?: number;
}

/** Flatten a vehicle's rows into mini-calculator options (expanding trim arrays). */
export function miniConfigs(data: VehicleData): MiniConfig[] {
  const out: MiniConfig[] = [];
  for (const row of data.rows) {
    if (row.trims && row.trims.length) {
      const prefix = [row.engine, row.package, row.axle, row.doors].filter(Boolean).join(' · ');
      row.trims.forEach((t, i) => {
        out.push({
          id: `${row.id}#${i}`,
          label: `${prefix} · ${t.name} (${t.maxTrailer.toLocaleString('en-US')} lb)`,
          maxTrailer: t.maxTrailer,
          maxTongue: row.maxTongue,
          gcwr: row.gcwr,
          payload: row.payload,
          gvwr: row.gvwr,
          curbWeight: row.curbWeight,
        });
      });
    } else {
      out.push({
        id: row.id,
        label: row.label ?? configLabel(row),
        maxTrailer: row.maxTrailer,
        maxTongue: row.maxTongue,
        gcwr: row.gcwr,
        payload: row.payload,
        gvwr: row.gvwr,
        curbWeight: row.curbWeight,
      });
    }
  }
  return out;
}

export function maxTrailer(rows: VehicleRow[]): number {
  return Math.max(...rows.map((r) => r.maxTrailer));
}

export function minTrailer(rows: VehicleRow[]): number {
  return Math.min(...rows.map((r) => r.maxTrailer));
}

export function maxPayload(rows: VehicleRow[]): number {
  return Math.max(
    ...rows.filter((r) => r.payload != null).map((r) => (r.payloadMax ?? r.payload) as number),
  );
}

export function minPayload(rows: VehicleRow[]): number {
  return Math.min(...rows.filter((r) => r.payload != null).map((r) => r.payload as number));
}

/** Dropdown label for the "Check your setup" mini calculator. */
export function configLabel(row: VehicleRow): string {
  return [
    row.grade,
    row.package,
    row.cab,
    row.bed,
    row.drive,
    row.transmission,
    row.output,
  ]
    .filter(Boolean)
    .join(' ');
}

export function cellValue(row: VehicleRow, key: ColumnKey): string {
  switch (key) {
    case 'cabbed':
      return [row.cab, row.bed].filter(Boolean).join(' ');
    case 'cab':
      return row.cab ?? '';
    case 'bed':
      return row.bed ?? '';
    case 'grade':
      return row.grade ?? '';
    case 'engine':
      return row.engine;
    case 'output':
      return row.output ?? '';
    case 'drive':
      return row.drive ?? '';
    case 'transmission':
      if (row.transmission === 'AT') return 'Automatic';
      if (row.transmission === 'MT') return 'Manual';
      return row.transmission ?? '';
    case 'axle':
      return row.axle ?? '';
    case 'package':
      return row.package ?? '';
    case 'doors':
      return row.doors ?? '';
    case 'seats':
      return row.seats ?? '';
    case 'trimsRated':
      return (row.trims ?? [])
        .map((t) => `${t.name} ${t.maxTrailer.toLocaleString('en-US')}`)
        .join('; ');
    case 'note':
      return row.note ?? '';
    case 'gcwr':
      return row.gcwr != null ? row.gcwr.toLocaleString('en-US') : '';
    case 'maxTrailer':
      return row.maxTrailer.toLocaleString('en-US');
    case 'tow2wd':
      return row.tow2wd != null ? row.tow2wd.toLocaleString('en-US') : '';
    case 'tow4wd':
      return row.tow4wd != null ? row.tow4wd.toLocaleString('en-US') : '';
    case 'maxTongue':
      return row.maxTongue != null ? row.maxTongue.toLocaleString('en-US') : '';
    case 'payload':
      if (row.payload == null) return '';
      return row.payloadMax != null && row.payloadMax !== row.payload
        ? `${row.payload.toLocaleString('en-US')} to ${row.payloadMax.toLocaleString('en-US')}`
        : row.payload.toLocaleString('en-US');
    case 'curbWeight':
      if (row.curbWeight == null) return '';
      return row.curbWeightMax != null && row.curbWeightMax !== row.curbWeight
        ? `${row.curbWeight.toLocaleString('en-US')} to ${row.curbWeightMax.toLocaleString('en-US')}`
        : row.curbWeight.toLocaleString('en-US');
    case 'gvwr':
      return row.gvwr != null ? row.gvwr.toLocaleString('en-US') : '';
    default:
      return '';
  }
}
