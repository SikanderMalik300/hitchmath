// All fixed numbers used by calculators (A6.0). Each has a source.
// Never type a towing number into a component: it must come from here or a vehicle data file.

import type { SourceId } from './sources';

export interface Constant {
  key: string;
  label: string;
  value: number;
  unit?: string;
  source: string; // human-readable source note (may reference a document)
  sourceId?: SourceId; // when the source is in sources.ts
  note?: string;
}

export const CONSTANTS = {
  LB_TO_KG: {
    key: 'LB_TO_KG',
    label: 'Pound to kilogram',
    value: 0.45359237,
    source: 'NIST exact definition',
  },
  ASSUMED_OCCUPANTS_IN_RATING_LB: {
    key: 'ASSUMED_OCCUPANTS_IN_RATING_LB',
    label: 'Occupant weight already in the rating',
    value: 300,
    unit: 'lb',
    source:
      'SAE J2807 as summarized by Ford 2026 RV & Trailer Towing Guide, GM 2026 Trailering Guide; Ram 2026 chart footnote "includes 300 lb of passenger weight" (driver 150 + front passenger 150)',
    sourceId: 'j2807-overview',
  },
  DEFAULT_PERSON_LB: {
    key: 'DEFAULT_PERSON_LB',
    label: 'Default person weight',
    value: 180,
    unit: 'lb',
    source: 'Our default only, user editable. Labelled "your estimate" in the UI',
  },
  TONGUE_CONVENTIONAL_MIN_PCT: {
    key: 'TONGUE_CONVENTIONAL_MIN_PCT',
    label: 'Bumper-pull tongue weight minimum',
    value: 10,
    unit: '%',
    source: 'GM 2026 Trailering Guide ("10% to 15%"); Ram towing basics (10 to 15%)',
    sourceId: 'gm-guide-2026',
  },
  TONGUE_CONVENTIONAL_MAX_PCT: {
    key: 'TONGUE_CONVENTIONAL_MAX_PCT',
    label: 'Bumper-pull tongue weight maximum',
    value: 15,
    unit: '%',
    source: 'GM 2026 Trailering Guide ("10% to 15%"); Ram towing basics (10 to 15%)',
    sourceId: 'gm-guide-2026',
  },
  TONGUE_CONVENTIONAL_DEFAULT_PCT: {
    key: 'TONGUE_CONVENTIONAL_DEFAULT_PCT',
    label: 'Bumper-pull tongue weight default',
    value: 12,
    unit: '%',
    source: 'Our default inside the OEM range',
  },
  PIN_FIFTHWHEEL_MIN_PCT: {
    key: 'PIN_FIFTHWHEEL_MIN_PCT',
    label: 'Fifth wheel pin weight minimum',
    value: 15,
    unit: '%',
    source: 'GM 2026 Trailering Guide; CURT "5th wheel hitches 101"',
    sourceId: 'curt-5th-wheel',
  },
  PIN_FIFTHWHEEL_MAX_PCT: {
    key: 'PIN_FIFTHWHEEL_MAX_PCT',
    label: 'Fifth wheel pin weight maximum',
    value: 25,
    unit: '%',
    source: 'GM 2026 Trailering Guide; CURT "5th wheel hitches 101"',
    sourceId: 'curt-5th-wheel',
  },
  PIN_FIFTHWHEEL_DEFAULT_PCT: {
    key: 'PIN_FIFTHWHEEL_DEFAULT_PCT',
    label: 'Fifth wheel pin weight default',
    value: 20,
    unit: '%',
    source: 'Our default inside the range',
  },
  WATER_LB_PER_GAL: {
    key: 'WATER_LB_PER_GAL',
    label: 'Water weight per gallon',
    value: 8.34,
    unit: 'lb/gal',
    source: 'USGS Water Science School',
    sourceId: 'usgs-water',
  },
  HITCH_HARDWARE_DEFAULT_LB: {
    key: 'HITCH_HARDWARE_DEFAULT_LB',
    label: 'Hitch hardware default',
    value: 70,
    unit: 'lb',
    source:
      'SAE J2807 allowance for aftermarket hitch equipment (as summarized by Truck Parts & Service, J2807 overview). User editable',
    sourceId: 'j2807-overview',
  },
  WD_ADVISORY_TRAILER_LB: {
    key: 'WD_ADVISORY_TRAILER_LB',
    label: 'Weight-distribution advisory trailer weight',
    value: 5000,
    unit: 'lb',
    source:
      'Ford 2026 F-150 guidance: do not exceed 5,000 lb without a weight-distribution system (standard receiver)',
    sourceId: 'ford-guide-2026',
  },
  WD_ADVISORY_TONGUE_LB: {
    key: 'WD_ADVISORY_TONGUE_LB',
    label: 'Weight-distribution advisory tongue weight',
    value: 500,
    unit: 'lb',
    source: 'Ford F-150 standard receiver tongue rating without WD (Ford guide)',
    sourceId: 'ford-guide-2026',
  },
  GUIDELINE_80_PCT: {
    key: 'GUIDELINE_80_PCT',
    label: '80% guideline',
    value: 80,
    unit: '%',
    source:
      'Rule of thumb only (National RV Training Academy, citing Blue Ox). Never shown as a rule or standard',
    sourceId: 'nrvta-80',
  },
} as const satisfies Record<string, Constant>;

// Flat numeric accessors for calculators.
export const LB_TO_KG = CONSTANTS.LB_TO_KG.value;
export const ASSUMED_OCCUPANTS_IN_RATING_LB = CONSTANTS.ASSUMED_OCCUPANTS_IN_RATING_LB.value;
export const DEFAULT_PERSON_LB = CONSTANTS.DEFAULT_PERSON_LB.value;
export const TONGUE_CONVENTIONAL_MIN_PCT = CONSTANTS.TONGUE_CONVENTIONAL_MIN_PCT.value;
export const TONGUE_CONVENTIONAL_MAX_PCT = CONSTANTS.TONGUE_CONVENTIONAL_MAX_PCT.value;
export const TONGUE_CONVENTIONAL_DEFAULT_PCT = CONSTANTS.TONGUE_CONVENTIONAL_DEFAULT_PCT.value;
export const PIN_FIFTHWHEEL_MIN_PCT = CONSTANTS.PIN_FIFTHWHEEL_MIN_PCT.value;
export const PIN_FIFTHWHEEL_MAX_PCT = CONSTANTS.PIN_FIFTHWHEEL_MAX_PCT.value;
export const PIN_FIFTHWHEEL_DEFAULT_PCT = CONSTANTS.PIN_FIFTHWHEEL_DEFAULT_PCT.value;
export const WATER_LB_PER_GAL = CONSTANTS.WATER_LB_PER_GAL.value;
export const HITCH_HARDWARE_DEFAULT_LB = CONSTANTS.HITCH_HARDWARE_DEFAULT_LB.value;
export const WD_ADVISORY_TRAILER_LB = CONSTANTS.WD_ADVISORY_TRAILER_LB.value;
export const WD_ADVISORY_TONGUE_LB = CONSTANTS.WD_ADVISORY_TONGUE_LB.value;
export const GUIDELINE_80_PCT = CONSTANTS.GUIDELINE_80_PCT.value;

export const CONSTANTS_LIST: Constant[] = Object.values(CONSTANTS);
