// lib/calc/tongue.ts: tongue weight maths (A6.3). Pure functions only.

import {
  TONGUE_CONVENTIONAL_MIN_PCT,
  TONGUE_CONVENTIONAL_MAX_PCT,
  TONGUE_CONVENTIONAL_DEFAULT_PCT,
  PIN_FIFTHWHEEL_MIN_PCT,
  PIN_FIFTHWHEEL_MAX_PCT,
  PIN_FIFTHWHEEL_DEFAULT_PCT,
} from '@/lib/data/constants';
import { round, round1, isMissing } from './util';

export type TongueType = 'conventional' | 'fifthWheel';

export interface TongueRange {
  low: number;
  target: number;
  high: number;
  lowPct: number;
  targetPct: number;
  highPct: number;
}

function bands(type: TongueType) {
  return type === 'fifthWheel'
    ? {
        min: PIN_FIFTHWHEEL_MIN_PCT,
        target: PIN_FIFTHWHEEL_DEFAULT_PCT,
        max: PIN_FIFTHWHEEL_MAX_PCT,
      }
    : {
        min: TONGUE_CONVENTIONAL_MIN_PCT,
        target: TONGUE_CONVENTIONAL_DEFAULT_PCT,
        max: TONGUE_CONVENTIONAL_MAX_PCT,
      };
}

export function tongueRange(
  trailer: number,
  type: TongueType = 'conventional',
): TongueRange {
  const b = bands(type);
  return {
    low: round((trailer * b.min) / 100),
    target: round((trailer * b.target) / 100),
    high: round((trailer * b.max) / 100),
    lowPct: b.min,
    targetPct: b.target,
    highPct: b.max,
  };
}

export type TongueBand = 'light' | 'usual' | 'heavy';

export interface TonguePercentResult {
  pct: number | null;
  band: TongueBand | null;
  label: string;
  summary: string;
  needsInput: boolean;
}

const BAND_LABEL: Record<TongueBand, string> = {
  light: 'light: more sway risk',
  usual: 'in the usual range',
  heavy: "heavy: check your truck's rear axle and payload",
};

export function tonguePercent(
  measured: number | null | undefined,
  trailer: number | null | undefined,
  type: TongueType = 'conventional',
): TonguePercentResult {
  if (isMissing(measured) || isMissing(trailer) || (trailer as number) <= 0) {
    return { pct: null, band: null, label: '', summary: '', needsInput: true };
  }
  const b = bands(type);
  const pct = round1(((measured as number) / (trailer as number)) * 100);
  let band: TongueBand;
  if (pct < b.min) band = 'light';
  else if (pct > b.max) band = 'heavy';
  else band = 'usual';
  const label = BAND_LABEL[band];
  return { pct, band, label, summary: `${pct}%: ${label}`, needsInput: false };
}

/**
 * Bathroom-scale lever method (Weigh Safe): a 4 ft board on a pivot 1 ft from
 * the tongue end, scale at the far end 3 ft from the pivot. Tongue weight is
 * the reading times the lever ratio (default 4).
 */
export function leverMethod(reading: number, leverRatio = 4): number {
  return reading * leverRatio;
}
