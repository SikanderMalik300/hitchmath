import type { SourceId } from '../sources';

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
  gcwr?: number;
  maxTrailer: number;
  maxTongue?: number;
  payload?: number;
  payloadComputed?: boolean;
  curbWeight?: number;
  gvwr?: number;
  note?: string;
  source: SourceId;
}

export type ColumnKey =
  | 'grade'
  | 'engine'
  | 'output'
  | 'cabbed'
  | 'drive'
  | 'transmission'
  | 'axle'
  | 'package'
  | 'gcwr'
  | 'maxTrailer'
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
  yearHistory?: HistoryTable; // not every page has a year-history table
  gcwrTable?: SimpleTable; // optional separate reference table (F-150 GCWR, Ram per-cab)
  detailTableTitle?: string; // heading for gcwrTable (default "GCWR rows")
}

export function maxTrailer(rows: VehicleRow[]): number {
  return Math.max(...rows.map((r) => r.maxTrailer));
}

export function minTrailer(rows: VehicleRow[]): number {
  return Math.min(...rows.map((r) => r.maxTrailer));
}

export function maxPayload(rows: VehicleRow[]): number {
  return Math.max(...rows.filter((r) => r.payload != null).map((r) => r.payload as number));
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
    case 'note':
      return row.note ?? '';
    case 'gcwr':
      return row.gcwr != null ? row.gcwr.toLocaleString('en-US') : '';
    case 'maxTrailer':
      return row.maxTrailer.toLocaleString('en-US');
    case 'maxTongue':
      return row.maxTongue != null ? row.maxTongue.toLocaleString('en-US') : '';
    case 'payload':
      return row.payload != null ? row.payload.toLocaleString('en-US') : '';
    case 'curbWeight':
      return row.curbWeight != null ? row.curbWeight.toLocaleString('en-US') : '';
    case 'gvwr':
      return row.gvwr != null ? row.gvwr.toLocaleString('en-US') : '';
    default:
      return '';
  }
}
