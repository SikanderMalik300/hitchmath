// lib/calc/gcwr.ts: combined weight maths (A6.4). Pure functions only.

import { HITCH_HARDWARE_DEFAULT_LB } from '@/lib/data/constants';
import { isMissing } from './util';

export interface GcwrInput {
  curb?: number | null;
  people?: number | null;
  cargo?: number | null;
  hitchHardware?: number | null;
  trailer?: number | null;
  gcwr?: number | null;
  maxTrailerRating?: number | null;
}

export interface GcwrResult {
  combined: number | null;
  left: number | null;
  maxTrailerByGcwr: number | null;
  realLimit: number | null;
  realLimitSource: 'gcwr' | 'rating' | null;
  over: boolean;
  overBy: number;
  ok: boolean;
  needsGcwr: boolean;
  verdict: string;
}

export function gcwrCheck(input: GcwrInput): GcwrResult {
  const curb = isMissing(input.curb) ? 0 : (input.curb as number);
  const people = isMissing(input.people) ? 0 : (input.people as number);
  const cargo = isMissing(input.cargo) ? 0 : (input.cargo as number);
  const hitchHardware = isMissing(input.hitchHardware)
    ? HITCH_HARDWARE_DEFAULT_LB
    : (input.hitchHardware as number);
  const trailer = isMissing(input.trailer) ? 0 : (input.trailer as number);
  const maxTrailerRating = isMissing(input.maxTrailerRating)
    ? null
    : (input.maxTrailerRating as number);

  if (isMissing(input.gcwr)) {
    return {
      combined: null,
      left: null,
      maxTrailerByGcwr: null,
      realLimit: maxTrailerRating,
      realLimitSource: maxTrailerRating !== null ? 'rating' : null,
      over: false,
      overBy: 0,
      ok: false,
      needsGcwr: true,
      verdict: 'Enter your GCWR',
    };
  }

  const gcwr = input.gcwr as number;
  const truckLoad = curb + people + cargo + hitchHardware;
  const combined = truckLoad + trailer;
  const left = gcwr - combined;
  const maxTrailerByGcwr = gcwr - truckLoad;

  // Lower of (GCWR-derived trailer limit, the entered trailer rating).
  let realLimit = maxTrailerByGcwr;
  let realLimitSource: 'gcwr' | 'rating' = 'gcwr';
  if (maxTrailerRating !== null && maxTrailerRating < maxTrailerByGcwr) {
    realLimit = maxTrailerRating;
    realLimitSource = 'rating';
  }

  const over = combined > gcwr;
  const overBy = over ? combined - gcwr : 0;

  return {
    combined,
    left,
    maxTrailerByGcwr,
    realLimit,
    realLimitSource,
    over,
    overBy,
    ok: !over,
    needsGcwr: false,
    verdict: over
      ? `Over by ${overBy} lb`
      : `Combined ${combined} of ${gcwr} lb (${left} lb left)`,
  };
}
