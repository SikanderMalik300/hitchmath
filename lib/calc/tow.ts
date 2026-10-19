// lib/calc/tow.ts: checkTow(input) - the full five-check towing calculation (A6.1).
// Pure TypeScript, no UI, no data except shared constants. All maths lives here.

import {
  ASSUMED_OCCUPANTS_IN_RATING_LB,
  HITCH_HARDWARE_DEFAULT_LB,
  TONGUE_CONVENTIONAL_DEFAULT_PCT,
  PIN_FIFTHWHEEL_DEFAULT_PCT,
  WD_ADVISORY_TRAILER_LB,
  WD_ADVISORY_TONGUE_LB,
  GUIDELINE_80_PCT,
} from '@/lib/data/constants';
import { round, round1, isMissing } from './util';

export type TrailerType = 'conventional' | 'fifthWheel';

export interface TowInput {
  trailerWeight?: number | null;
  trailerType?: TrailerType;
  tonguePct?: number | null;
  maxTrailerRating?: number | null;
  payloadCapacity?: number | null;
  gvwr?: number | null;
  curbWeight?: number | null;
  gcwr?: number | null;
  people?: number | null;
  cargo?: number | null;
  hitchHardware?: number | null;
  receiverTrailerRating?: number | null;
  receiverTongueRating?: number | null;
}

export type CheckId =
  | 'payload'
  | 'trailer'
  | 'gvwr'
  | 'gcwr'
  | 'receiverTrailer'
  | 'receiverTongue';

export type CheckStatus = 'within' | 'over' | 'notChecked';

export interface TowCheck {
  id: CheckId;
  label: string;
  status: CheckStatus;
  overBy: number; // pounds over when status === 'over', else 0
}

export interface TowResult {
  ok: boolean;
  needsTrailerWeight: boolean;
  verdict: string;
  tongue: number | null;
  payloadCapacity: number | null;
  payloadUsed: number | null;
  payloadLeft: number | null;
  adjustedTrailerRating: number | null;
  trailerUsePct: number | null;
  truckLoaded: number | null;
  gvwr: number | null;
  combined: number | null;
  gcwr: number | null;
  gcwrLeft: number | null;
  checks: TowCheck[];
  advisory: string | null;
  guideline: string | null;
  guidelineNote: string | null;
  failures: { id: CheckId; label: string; overBy: number }[];
}

const CHECK_LABELS: Record<CheckId, string> = {
  payload: 'payload',
  trailer: 'trailer rating',
  gvwr: 'GVWR',
  gcwr: 'GCWR',
  receiverTrailer: 'receiver trailer rating',
  receiverTongue: 'tongue',
};

export const WD_ADVISORY_TEXT =
  "Many trucks need a weight-distributing hitch at this weight. Ford's F-150 standard receiver is rated 5,000 lb and 500 lb tongue without one. Check your owner's manual.";

export const GUIDELINE_80_NOTE =
  "Many RV groups suggest staying under 80%. That's a rule of thumb, not a rating.";

function defaultTonguePct(type: TrailerType): number {
  return type === 'fifthWheel'
    ? PIN_FIFTHWHEEL_DEFAULT_PCT
    : TONGUE_CONVENTIONAL_DEFAULT_PCT;
}

export function checkTow(input: TowInput): TowResult {
  const trailerType: TrailerType = input.trailerType ?? 'conventional';
  const tonguePct = isMissing(input.tonguePct)
    ? defaultTonguePct(trailerType)
    : (input.tonguePct as number);

  const people = isMissing(input.people) ? 0 : (input.people as number);
  const cargo = isMissing(input.cargo) ? 0 : (input.cargo as number);
  const hitchHardware = isMissing(input.hitchHardware)
    ? HITCH_HARDWARE_DEFAULT_LB
    : (input.hitchHardware as number);

  const trailerWeight = isMissing(input.trailerWeight)
    ? null
    : (input.trailerWeight as number);
  const maxTrailerRating = isMissing(input.maxTrailerRating)
    ? null
    : (input.maxTrailerRating as number);
  const payloadCapacity = isMissing(input.payloadCapacity)
    ? null
    : (input.payloadCapacity as number);
  const gvwr = isMissing(input.gvwr) ? null : (input.gvwr as number);
  const curbWeight = isMissing(input.curbWeight) ? null : (input.curbWeight as number);
  const gcwr = isMissing(input.gcwr) ? null : (input.gcwr as number);
  const receiverTrailerRating = isMissing(input.receiverTrailerRating)
    ? null
    : (input.receiverTrailerRating as number);
  const receiverTongueRating = isMissing(input.receiverTongueRating)
    ? null
    : (input.receiverTongueRating as number);

  const checks: TowCheck[] = [];
  const addCheck = (id: CheckId, status: CheckStatus, overBy = 0) =>
    checks.push({ id, label: CHECK_LABELS[id], status, overBy });

  // No trailer weight: nothing meaningful to check.
  if (trailerWeight === null) {
    return {
      ok: false,
      needsTrailerWeight: true,
      verdict: 'Enter a trailer weight',
      tongue: null,
      payloadCapacity,
      payloadUsed: null,
      payloadLeft: null,
      adjustedTrailerRating: null,
      trailerUsePct: null,
      truckLoaded: null,
      gvwr,
      combined: null,
      gcwr,
      gcwrLeft: null,
      checks: [],
      advisory: null,
      guideline: null,
      guidelineNote: null,
      failures: [],
    };
  }

  // Step 1: tongue weight.
  const tongue = round((trailerWeight * tonguePct) / 100);

  // Step 2: payload.
  const payloadUsed = people + cargo + hitchHardware + tongue;
  let payloadLeft: number | null = null;
  if (payloadCapacity !== null) {
    payloadLeft = payloadCapacity - payloadUsed;
    if (payloadLeft < 0) addCheck('payload', 'over', -payloadLeft);
    else addCheck('payload', 'within');
  } else {
    addCheck('payload', 'notChecked');
  }

  // Step 3: adjusted trailer rating.
  let adjustedTrailerRating: number | null = null;
  let trailerUsePct: number | null = null;
  if (maxTrailerRating !== null) {
    adjustedTrailerRating =
      maxTrailerRating -
      Math.max(0, people + cargo + hitchHardware - ASSUMED_OCCUPANTS_IN_RATING_LB);
    // Step 4: use percent (guard divide-by-zero / negative adjusted rating).
    if (adjustedTrailerRating > 0) {
      trailerUsePct = round1((trailerWeight / adjustedTrailerRating) * 100);
    }
    if (trailerWeight > adjustedTrailerRating) {
      addCheck('trailer', 'over', trailerWeight - adjustedTrailerRating);
    } else {
      addCheck('trailer', 'within');
    }
  } else {
    addCheck('trailer', 'notChecked');
  }

  // Step 5: GCWR.
  let combined: number | null = null;
  let gcwrLeft: number | null = null;
  if (gcwr !== null && curbWeight !== null) {
    combined = curbWeight + people + cargo + hitchHardware + trailerWeight;
    gcwrLeft = gcwr - combined;
    if (combined > gcwr) addCheck('gcwr', 'over', combined - gcwr);
    else addCheck('gcwr', 'within');
  } else {
    addCheck('gcwr', 'notChecked');
  }

  // Step 6: GVWR (truck loaded with tongue).
  let truckLoaded: number | null = null;
  if (gvwr !== null && curbWeight !== null) {
    truckLoaded = curbWeight + people + cargo + hitchHardware + tongue;
    if (truckLoaded > gvwr) addCheck('gvwr', 'over', truckLoaded - gvwr);
    else addCheck('gvwr', 'within');
  } else {
    addCheck('gvwr', 'notChecked');
  }

  // Step 7: receiver checks.
  if (receiverTrailerRating !== null) {
    if (trailerWeight > receiverTrailerRating) {
      addCheck('receiverTrailer', 'over', trailerWeight - receiverTrailerRating);
    } else {
      addCheck('receiverTrailer', 'within');
    }
  } else {
    addCheck('receiverTrailer', 'notChecked');
  }
  if (receiverTongueRating !== null) {
    if (tongue > receiverTongueRating) {
      addCheck('receiverTongue', 'over', tongue - receiverTongueRating);
    } else {
      addCheck('receiverTongue', 'within');
    }
  } else {
    addCheck('receiverTongue', 'notChecked');
  }

  // Step 8: weight-distribution advisory (not a fail).
  const advisory =
    trailerType === 'conventional' &&
    (trailerWeight > WD_ADVISORY_TRAILER_LB || tongue > WD_ADVISORY_TONGUE_LB)
      ? WD_ADVISORY_TEXT
      : null;

  // Step 9: verdict.
  const failures = checks
    .filter((c) => c.status === 'over')
    .map((c) => ({ id: c.id, label: c.label, overBy: c.overBy }));
  const ok = failures.length === 0;
  const verdict = ok
    ? 'Within every rating you entered'
    : 'Over: ' + failures.map((f) => `${f.label} by ${f.overBy} lb`).join(', ');

  // Step 10: guideline line (shown whenever we have a usage percent).
  let guideline: string | null = null;
  let guidelineNote: string | null = null;
  if (trailerUsePct !== null) {
    guideline = `You're using ${trailerUsePct}% of your adjusted trailer rating.`;
    if (trailerUsePct > GUIDELINE_80_PCT) guidelineNote = GUIDELINE_80_NOTE;
  }

  return {
    ok,
    needsTrailerWeight: false,
    verdict,
    tongue,
    payloadCapacity,
    payloadUsed,
    payloadLeft,
    adjustedTrailerRating,
    trailerUsePct,
    truckLoaded,
    gvwr,
    combined,
    gcwr,
    gcwrLeft,
    checks,
    advisory,
    guideline,
    guidelineNote,
    failures,
  };
}
