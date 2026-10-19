// Display formatting helpers (US thousands separators, lb/kg).
import { LB_TO_KG } from './data/constants';

export function fmt(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return '';
  return Math.round(n).toLocaleString('en-US');
}

/** Format with one decimal when needed (percentages). */
export function fmt1(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return '';
  return (Math.round(n * 10) / 10).toLocaleString('en-US');
}

export type Unit = 'lb' | 'kg';

/** Convert a lb value for display in the chosen unit (rounded whole). */
export function toUnit(lb: number, unit: Unit): number {
  return unit === 'kg' ? Math.round(lb * LB_TO_KG) : Math.round(lb);
}

/** Convert a user-entered value in the chosen unit back to lb for calculation. */
export function fromUnit(value: number, unit: Unit): number {
  return unit === 'kg' ? value / LB_TO_KG : value;
}

export function fmtUnit(lb: number | null | undefined, unit: Unit): string {
  if (lb === null || lb === undefined || !Number.isFinite(lb)) return '';
  return toUnit(lb, unit).toLocaleString('en-US');
}
