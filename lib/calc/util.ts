// Shared math helpers for the calculators. No UI, no data imports.
import { LB_TO_KG } from '@/lib/data/constants';

/** Round to whole pounds (A6.1 rounding rule). */
export function round(x: number): number {
  return Math.round(x);
}

/** Round to one decimal (percent rule). Avoids "-0". */
export function round1(x: number): number {
  const r = Math.round(x * 10) / 10;
  return r === 0 ? 0 : r;
}

/** Round up to a whole count, guarding float error (A6.5). */
export const ceilCount = (x: number): number => Math.ceil(Math.round(x * 1e6) / 1e6);

/** Treat empty/NaN/non-finite inputs as missing. */
export function isMissing(v: number | null | undefined): v is null | undefined {
  return v === null || v === undefined || Number.isNaN(v) || !Number.isFinite(v);
}

/** Parse a user string to a finite number, or null when missing/invalid. */
export function num(v: string | number | null | undefined): number | null {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

/** Pounds to kilograms, rounded to whole kg. */
export function lbToKg(lb: number): number {
  return Math.round(lb * LB_TO_KG);
}

/** Clamp a value so a displayed "left/over" figure never reads as -0. */
export function noNegZero(x: number): number {
  return x === 0 ? 0 : x;
}
