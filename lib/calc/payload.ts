// lib/calc/payload.ts: payload maths (A6.2). Pure functions only.

import { round, round1, isMissing } from './util';

export function payloadFromSpecs(gvwr: number, curb: number): number {
  return gvwr - curb;
}

/** Tongue weight from a trailer weight and percentage. */
export function tongueFromTrailer(trailerWeight: number, pct: number): number {
  return round((trailerWeight * pct) / 100);
}

export interface PayloadCheckInput {
  capacity?: number | null;
  people?: number | null;
  cargo?: number | null;
  accessories?: number | null;
  hitchHardware?: number | null;
  tongue?: number | null;
}

export interface PayloadResult {
  capacity: number | null;
  used: number;
  left: number | null;
  pctUsed: number | null;
  over: boolean;
  overBy: number;
  ok: boolean;
  needsCapacity: boolean;
  verdict: string;
}

export function payloadCheck(input: PayloadCheckInput): PayloadResult {
  const people = isMissing(input.people) ? 0 : (input.people as number);
  const cargo = isMissing(input.cargo) ? 0 : (input.cargo as number);
  const accessories = isMissing(input.accessories) ? 0 : (input.accessories as number);
  const hitchHardware = isMissing(input.hitchHardware) ? 0 : (input.hitchHardware as number);
  const tongue = isMissing(input.tongue) ? 0 : (input.tongue as number);

  const used = people + cargo + accessories + hitchHardware + tongue;

  if (isMissing(input.capacity)) {
    return {
      capacity: null,
      used,
      left: null,
      pctUsed: null,
      over: false,
      overBy: 0,
      ok: false,
      needsCapacity: true,
      verdict: 'Enter your payload',
    };
  }

  const capacity = input.capacity as number;
  const left = capacity - used;
  const pctUsed = capacity > 0 ? round1((used / capacity) * 100) : null;
  const over = left < 0;
  const overBy = over ? -left : 0;

  return {
    capacity,
    used,
    left,
    pctUsed,
    over,
    overBy,
    ok: !over,
    needsCapacity: false,
    verdict: over
      ? `Over by ${overBy} lb`
      : `${used} lb used, ${left} lb left` + (pctUsed !== null ? ` (${pctUsed}%)` : ''),
  };
}
