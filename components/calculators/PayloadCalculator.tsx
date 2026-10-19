'use client';

import { useMemo, useState, useCallback } from 'react';
import { payloadCheck, payloadFromSpecs, tongueFromTrailer } from '@/lib/calc/payload';
import { type Unit, fromUnit, toUnit, fmtUnit } from '@/lib/format';
import {
  Field,
  UnitToggle,
  CheckRow,
  ShowMath,
  ActionButtons,
  InputsCard,
  ResultCard,
  useToolUsed,
} from './calc-ui';

interface State {
  payload: string;
  people: string;
  cargo: string;
  accessories: string;
  hitch: string;
  tongue: string;
  gvwr: string;
  curb: string;
  trailer: string;
  tonguePct: string;
}

const DEFAULTS: State = {
  payload: '1610',
  people: '680',
  cargo: '150',
  accessories: '0',
  hitch: '0',
  tongue: '500',
  gvwr: '',
  curb: '',
  trailer: '',
  tonguePct: '12',
};

const WEIGHT_KEYS: (keyof State)[] = [
  'payload',
  'people',
  'cargo',
  'accessories',
  'hitch',
  'tongue',
  'gvwr',
  'curb',
  'trailer',
];

export default function PayloadCalculator() {
  const [s, setS] = useState<State>(DEFAULTS);
  const [unit, setUnitState] = useState<Unit>('lb');
  const [noPayload, setNoPayload] = useState(false);
  const [addTrailer, setAddTrailer] = useState(false);
  const markUsed = useToolUsed();

  const set = useCallback(
    (key: keyof State) => (value: string) => {
      markUsed();
      setS((prev) => ({ ...prev, [key]: value }));
    },
    [markUsed],
  );

  const setUnit = useCallback((next: Unit) => {
    setUnitState((prev) => {
      if (prev === next) return prev;
      setS((cur) => {
        const out = { ...cur };
        for (const k of WEIGHT_KEYS) {
          if (cur[k].trim() === '') continue;
          const n = Number(cur[k]);
          if (!Number.isFinite(n)) continue;
          out[k] = String(toUnit(fromUnit(n, prev), next));
        }
        return out;
      });
      return next;
    });
  }, []);

  const toLb = useCallback(
    (raw: string): number | null => {
      if (raw.trim() === '') return null;
      const n = Number(raw);
      return Number.isFinite(n) ? fromUnit(n, unit) : null;
    },
    [unit],
  );

  const result = useMemo(() => {
    let capacity = toLb(s.payload);
    if (noPayload) {
      const gvwr = toLb(s.gvwr);
      const curb = toLb(s.curb);
      capacity = gvwr !== null && curb !== null ? payloadFromSpecs(gvwr, curb) : null;
    }
    let tongue = toLb(s.tongue);
    if (addTrailer) {
      const tw = toLb(s.trailer);
      const pct = Number(s.tonguePct);
      tongue = tw !== null && Number.isFinite(pct) ? tongueFromTrailer(tw, pct) : tongue;
    }
    return payloadCheck({
      capacity,
      people: toLb(s.people),
      cargo: toLb(s.cargo),
      accessories: toLb(s.accessories),
      hitchHardware: toLb(s.hitch),
      tongue,
    });
  }, [s, unit, noPayload, addTrailer, toLb]);

  const d = (lb: number | null | undefined) => fmtUnit(lb, unit);
  const U = unit;

  const verdict = result.needsCapacity
    ? 'Enter your payload'
    : result.over
      ? `Over by ${d(result.overBy)} ${U}`
      : `${d(result.used)} ${U} used, ${d(result.left)} ${U} left${
          result.pctUsed !== null ? ` (${result.pctUsed}%)` : ''
        }`;

  const resultText = `HitchMath payload check\n${verdict}`;
  const shareParams = Object.fromEntries(Object.entries(s).filter(([, v]) => v !== ''));

  return (
    <div className="max-w-calc">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-h3 font-medium text-ink">Check your payload</h2>
        <UnitToggle unit={unit} setUnit={setUnit} />
      </div>

      <InputsCard>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {!noPayload && (
            <Field
              id="p-payload"
              label={`Payload (${U})`}
              value={s.payload}
              onChange={set('payload')}
              help="The door-jamb 'combined weight of occupants and cargo should never exceed' number."
            />
          )}
          {noPayload && (
            <>
              <Field id="p-gvwr" label={`GVWR (${U})`} value={s.gvwr} onChange={set('gvwr')} />
              <Field id="p-curb" label={`Curb weight (${U})`} value={s.curb} onChange={set('curb')} />
            </>
          )}
          <Field id="p-people" label={`People (${U} total)`} value={s.people} onChange={set('people')} />
          <Field id="p-cargo" label={`Cargo (${U})`} value={s.cargo} onChange={set('cargo')} />
          <Field
            id="p-accessories"
            label={`Accessories (${U})`}
            value={s.accessories}
            onChange={set('accessories')}
            help="Bed cover, rack, tool box, bigger tires."
          />
          <Field id="p-hitch" label={`Hitch hardware (${U})`} value={s.hitch} onChange={set('hitch')} />
          {!addTrailer && (
            <Field id="p-tongue" label={`Tongue weight (${U})`} value={s.tongue} onChange={set('tongue')} />
          )}
          {addTrailer && (
            <>
              <Field
                id="p-trailer"
                label={`Trailer weight (${U})`}
                value={s.trailer}
                onChange={set('trailer')}
              />
              <Field id="p-pct" label="Tongue weight (%)" value={s.tonguePct} onChange={set('tonguePct')} />
            </>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 text-small">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={noPayload}
              onChange={(e) => {
                markUsed();
                setNoPayload(e.target.checked);
              }}
              className="h-4 w-4 accent-[color:var(--brand)]"
            />
            I don't know my payload
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={addTrailer}
              onChange={(e) => {
                markUsed();
                setAddTrailer(e.target.checked);
              }}
              className="h-4 w-4 accent-[color:var(--brand)]"
            />
            Add a trailer
          </label>
        </div>
      </InputsCard>

      <ResultCard>
        <p className="text-[32px] font-semibold leading-tight tabular text-ink">{verdict}</p>
        {!result.needsCapacity && (
          <ul className="mt-3">
            <CheckRow status={result.over ? 'over' : 'within'}>
              Payload used: {d(result.used)} of {d(result.capacity)} {U}
              {result.pctUsed !== null && <> ({result.pctUsed}%)</>}
            </CheckRow>
          </ul>
        )}
        <ShowMath>
          <p>Payload = GVWR − curb weight.</p>
          <p>Payload used = people + cargo + accessories + hitch hardware + tongue weight.</p>
          <p>Payload left = payload − payload used.</p>
        </ShowMath>
        <ActionButtons resultText={resultText} shareParams={shareParams} />
      </ResultCard>
    </div>
  );
}
