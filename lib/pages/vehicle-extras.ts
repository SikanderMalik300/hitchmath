// Computed, per-vehicle page sections (fix-06 §2 and §3). Everything here is
// derived from the vehicle data file and the shared calculator (checkTow). No
// number is typed in; tests re-run the same maths and compare.

import { checkTow, type TowInput, type TowResult } from '@/lib/calc/tow';
import { fmt } from '@/lib/format';
import { miniConfigs, type MiniConfig, type VehicleData, type VehicleRow } from '@/lib/data/vehicles/types';

// --- Worked example (§2) ---------------------------------------------------

export type WorkedStatus = 'within' | 'over' | 'info';

export interface WorkedCheck {
  key: 'trailer' | 'payload' | 'tongue' | 'gcwr' | 'gvwr';
  label: string;
  detail: string;
  status: WorkedStatus;
}

export interface WorkedExampleData {
  title: string;
  configLabel: string;
  scenario: {
    input: TowInput;
    trailer: number;
    people: number;
    cargo: number;
    hitch: number;
  };
  result: TowResult;
  tongue: number;
  checks: WorkedCheck[];
  payloadMissing: boolean;
  payloadNote: string | null;
  summary: string;
}

/** The most common row: the mode engine, or the first row when there is no mode. */
export function representativeRow(data: VehicleData): VehicleRow {
  const counts = new Map<string, number>();
  for (const r of data.rows) counts.set(r.engine, (counts.get(r.engine) ?? 0) + 1);
  let bestEngine: string | null = null;
  let bestCount = 0;
  let tie = false;
  for (const r of data.rows) {
    const c = counts.get(r.engine) as number;
    if (c > bestCount) {
      bestCount = c;
      bestEngine = r.engine;
      tie = false;
    } else if (c === bestCount && r.engine !== bestEngine) {
      tie = true;
    }
  }
  if (bestEngine === null || bestCount <= 1 || tie) return data.rows[0];
  return data.rows.find((r) => r.engine === bestEngine) ?? data.rows[0];
}

/** Trailer weight for the scenario: 80% of the row's max tow, rounded down to 500. */
export function scenarioTrailer(maxTrailer: number): number {
  return Math.floor((maxTrailer * 0.8) / 500) * 500;
}

const SUMMARY_LABEL: Record<WorkedCheck['key'], string> = {
  trailer: 'trailer rating',
  payload: 'payload',
  tongue: 'tongue weight',
  gcwr: 'GCWR',
  gvwr: 'GVWR',
};

export function buildWorkedExample(data: VehicleData): WorkedExampleData {
  const row = representativeRow(data);
  const trailer = scenarioTrailer(row.maxTrailer);
  const people = 2 * 150;
  const cargo = 150;
  const hitch = 0;

  const input: TowInput = {
    trailerWeight: trailer,
    trailerType: 'conventional',
    tonguePct: 12,
    maxTrailerRating: row.maxTrailer,
    payloadCapacity: row.payload ?? null,
    gvwr: row.gvwr ?? null,
    curbWeight: row.curbWeight ?? null,
    gcwr: row.gcwr ?? null,
    people,
    cargo,
    hitchHardware: hitch,
    receiverTongueRating: row.maxTongue ?? null,
  };
  const result = checkTow(input);
  const tongue = result.tongue as number;

  const payloadMissing = row.payload == null;
  const payloadNote = payloadMissing
    ? `${data.make} doesn't print payload for this model; check your door label.`
    : null;

  // Headroom (lb to spare) for each limit the calculator actually evaluated.
  const spare: Partial<Record<WorkedCheck['key'], number>> = {};
  const checks: WorkedCheck[] = [];

  if (result.adjustedTrailerRating != null) {
    const s = result.adjustedTrailerRating - trailer;
    spare.trailer = s;
    checks.push({
      key: 'trailer',
      label: 'Trailer rating',
      detail: `${fmt(trailer)} lb trailer against a ${fmt(result.adjustedTrailerRating)} lb adjusted rating`,
      status: s < 0 ? 'over' : 'within',
    });
  }

  if (!payloadMissing && result.payloadLeft != null) {
    spare.payload = result.payloadLeft;
    checks.push({
      key: 'payload',
      label: 'Payload',
      detail: `${fmt(result.payloadUsed)} lb used of ${fmt(result.payloadCapacity)} lb, ${fmt(result.payloadLeft)} lb left`,
      status: result.payloadLeft < 0 ? 'over' : 'within',
    });
  }

  if (row.maxTongue != null) {
    const s = row.maxTongue - tongue;
    spare.tongue = s;
    checks.push({
      key: 'tongue',
      label: 'Tongue weight',
      detail: `${fmt(tongue)} lb tongue against a ${fmt(row.maxTongue)} lb limit`,
      status: s < 0 ? 'over' : 'within',
    });
  } else {
    checks.push({
      key: 'tongue',
      label: 'Tongue weight',
      detail: `${fmt(tongue)} lb (12% of the trailer)`,
      status: 'info',
    });
  }

  if (result.combined != null && result.gcwr != null && result.gcwrLeft != null) {
    spare.gcwr = result.gcwrLeft;
    checks.push({
      key: 'gcwr',
      label: 'GCWR',
      detail: `${fmt(result.combined)} lb combined against a ${fmt(result.gcwr)} lb GCWR`,
      status: result.gcwrLeft < 0 ? 'over' : 'within',
    });
  }

  if (result.truckLoaded != null && result.gvwr != null) {
    const s = result.gvwr - result.truckLoaded;
    spare.gvwr = s;
    checks.push({
      key: 'gvwr',
      label: 'GVWR',
      detail: `${fmt(result.truckLoaded)} lb loaded against a ${fmt(result.gvwr)} lb GVWR`,
      status: s < 0 ? 'over' : 'within',
    });
  }

  // The limit that runs out first = the smallest headroom among evaluated limits.
  const entries = Object.entries(spare) as [WorkedCheck['key'], number][];
  let summary = '';
  if (entries.length) {
    entries.sort((a, b) => a[1] - b[1]);
    const [key, s] = entries[0];
    const label = SUMMARY_LABEL[key];
    summary =
      s < 0
        ? `With a ${fmt(trailer)} lb trailer, you'd be over the ${label} by ${fmt(-s)} lb.`
        : `With a ${fmt(trailer)} lb trailer, the ${label} is the first limit you'd hit, with ${fmt(s)} lb to spare.`;
  }

  return {
    title: `Worked example: ${data.model} with a ${fmt(trailer)} lb trailer`,
    configLabel: row.label ?? row.engine,
    scenario: { input, trailer, people, cargo, hitch },
    result,
    tongue,
    checks,
    payloadMissing,
    payloadNote,
    summary,
  };
}

// --- Which version to pick (§3) --------------------------------------------

export interface PickBullet {
  key: 'tow' | 'payload' | 'gcwr' | 'drive';
  text: string;
}

function norm2wd4x4(drive?: string): '2wd' | '4x4' | null {
  if (!drive) return null;
  if (/4x4|4wd/i.test(drive)) return '4x4';
  if (/4x2|2wd|rwd|fwd/i.test(drive)) return '2wd';
  return null;
}

/** Positive 2WD-minus-4x4 max-tow differences, when the data lets us pair them. */
export function drive2wd4x4Diffs(data: VehicleData): number[] {
  const diffs: number[] = [];
  // Case A: one row carries both a 2WD and a 4WD rating.
  for (const r of data.rows) {
    if (r.tow2wd != null && r.tow4wd != null) {
      const d = r.tow2wd - r.tow4wd;
      if (d > 0) diffs.push(d);
    }
  }
  if (diffs.length) return diffs;
  // Case B: separate 2WD and 4x4 rows; pair them on every field except drive.
  const groups = new Map<string, { '2wd'?: number; '4x4'?: number }>();
  for (const r of data.rows) {
    const nd = norm2wd4x4(r.drive);
    if (!nd) continue;
    const key = JSON.stringify([
      r.engine,
      r.grade,
      r.cab,
      r.bed,
      r.package,
      r.axle,
      r.output,
      r.doors,
    ]);
    const g = groups.get(key) ?? {};
    g[nd] = r.maxTrailer;
    groups.set(key, g);
  }
  for (const g of groups.values()) {
    if (g['2wd'] != null && g['4x4'] != null) {
      const d = g['2wd'] - g['4x4'];
      if (d > 0) diffs.push(d);
    }
  }
  return diffs;
}

export function buildPicks(data: VehicleData): PickBullet[] {
  const configs: MiniConfig[] = miniConfigs(data);
  const bullets: PickBullet[] = [];

  // Highest max tow (or a note when every version is the same).
  const tows = configs.map((c) => c.maxTrailer);
  const maxT = Math.max(...tows);
  const minT = Math.min(...tows);
  if (maxT === minT) {
    bullets.push({
      key: 'tow',
      text: `Every version tows the same ${fmt(maxT)} lb, so choose on features, not capacity.`,
    });
  } else {
    const top = configs.find((c) => c.maxTrailer === maxT) as MiniConfig;
    bullets.push({ key: 'tow', text: `For the most towing, pick the ${top.label} at ${fmt(maxT)} lb.` });
  }

  // Most payload (only when printed or computed and versions differ).
  const withPay = configs.filter((c) => c.payload != null);
  if (withPay.length) {
    const maxP = Math.max(...withPay.map((c) => c.payload as number));
    const minP = Math.min(...withPay.map((c) => c.payload as number));
    if (maxP !== minP) {
      const top = withPay.find((c) => c.payload === maxP) as MiniConfig;
      bullets.push({ key: 'payload', text: `For the most payload, the ${top.label} carries ${fmt(maxP)} lb.` });
    }
  }

  // Highest GCWR (only when printed and versions differ).
  const withG = configs.filter((c) => c.gcwr != null);
  if (withG.length) {
    const maxG = Math.max(...withG.map((c) => c.gcwr as number));
    const minG = Math.min(...withG.map((c) => c.gcwr as number));
    if (maxG !== minG) {
      const top = withG.find((c) => c.gcwr === maxG) as MiniConfig;
      bullets.push({ key: 'gcwr', text: `The highest GCWR is ${fmt(maxG)} lb, on the ${top.label}.` });
    }
  }

  // 2WD vs 4x4 difference, when the data supports a clean comparison.
  const diffs = drive2wd4x4Diffs(data);
  if (diffs.length) {
    const lo = Math.min(...diffs);
    const hi = Math.max(...diffs);
    const range = lo === hi ? `${fmt(lo)}` : `${fmt(lo)} to ${fmt(hi)}`;
    bullets.push({ key: 'drive', text: `4x4 versions are rated ${range} lb less than 2WD.` });
  }

  return bullets;
}
