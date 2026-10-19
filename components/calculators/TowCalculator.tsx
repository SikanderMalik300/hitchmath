'use client';

import { useMemo, useState, useCallback } from 'react';
import { checkTow, type TrailerType } from '@/lib/calc/tow';
import { DEFAULT_PERSON_LB } from '@/lib/data/constants';
import { type Unit, fromUnit, toUnit, fmtUnit } from '@/lib/format';
import {
  Field,
  SelectField,
  UnitToggle,
  CheckRow,
  ShowMath,
  ActionButtons,
  InputsCard,
  ResultCard,
  useToolUsed,
  type Status,
} from './calc-ui';

interface State {
  trailer: string;
  type: TrailerType;
  tonguePct: string;
  rating: string;
  payload: string;
  gvwr: string;
  curb: string;
  gcwr: string;
  people: string;
  cargo: string;
  hitch: string;
  recvTrailer: string;
  recvTongue: string;
}

// Example 1 defaults (page 1).
const DEFAULTS: State = {
  trailer: '4800',
  type: 'conventional',
  tonguePct: '12',
  rating: '6300',
  payload: '1610',
  gvwr: '6240',
  curb: '4630',
  gcwr: '',
  people: '360',
  cargo: '200',
  hitch: '60',
  recvTrailer: '',
  recvTongue: '',
};

const WEIGHT_KEYS: (keyof State)[] = [
  'trailer',
  'rating',
  'payload',
  'gvwr',
  'curb',
  'gcwr',
  'people',
  'cargo',
  'hitch',
  'recvTrailer',
  'recvTongue',
];

export default function TowCalculator() {
  const [s, setS] = useState<State>(DEFAULTS);
  const [unit, setUnitState] = useState<Unit>('lb');
  const markUsed = useToolUsed();

  const set = useCallback(
    (key: keyof State) => (value: string) => {
      markUsed();
      setS((prev) => ({ ...prev, [key]: value }));
    },
    [markUsed],
  );

  // Toggle units and convert existing weight values so the numbers stay honest.
  const setUnit = useCallback(
    (next: Unit) => {
      setUnitState((prev) => {
        if (prev === next) return prev;
        setS((cur) => {
          const out = { ...cur } as Record<string, string>;
          for (const k of WEIGHT_KEYS) {
            const raw = cur[k] as string;
            if (raw.trim() === '') continue;
            const n = Number(raw);
            if (!Number.isFinite(n)) continue;
            const lb = fromUnit(n, prev);
            out[k] = String(toUnit(lb, next));
          }
          return out as unknown as State;
        });
        return next;
      });
    },
    [],
  );

  const addPerson = useCallback(() => {
    markUsed();
    setS((prev) => {
      const current = Number(prev.people);
      const base = Number.isFinite(current) && prev.people.trim() !== '' ? current : 0;
      return { ...prev, people: String(base + toUnit(DEFAULT_PERSON_LB, unit)) };
    });
  }, [markUsed, unit]);

  // Parse a weight field to lb (or null when empty/invalid).
  const toLb = useCallback(
    (raw: string): number | null => {
      if (raw.trim() === '') return null;
      const n = Number(raw);
      if (!Number.isFinite(n)) return null;
      return fromUnit(n, unit);
    },
    [unit],
  );

  const result = useMemo(() => {
    const pct = s.tonguePct.trim() === '' ? null : Number(s.tonguePct);
    return checkTow({
      trailerWeight: toLb(s.trailer),
      trailerType: s.type,
      tonguePct: Number.isFinite(pct as number) ? (pct as number) : null,
      maxTrailerRating: toLb(s.rating),
      payloadCapacity: toLb(s.payload),
      gvwr: toLb(s.gvwr),
      curbWeight: toLb(s.curb),
      gcwr: toLb(s.gcwr),
      people: toLb(s.people),
      cargo: toLb(s.cargo),
      hitchHardware: toLb(s.hitch),
      receiverTrailerRating: toLb(s.recvTrailer),
      receiverTongueRating: toLb(s.recvTongue),
    });
  }, [s, toLb]);

  const d = (lb: number | null | undefined) => fmtUnit(lb, unit);
  const U = unit;

  const statusOf = (id: string): Status => {
    const c = result.checks.find((x) => x.id === id);
    return (c?.status as Status) ?? 'notChecked';
  };

  // Unit-aware verdict (checkTow builds its verdict in lb).
  const verdict = result.needsTrailerWeight
    ? 'Enter a trailer weight'
    : result.ok
      ? 'Within every rating you entered'
      : 'Over: ' + result.failures.map((f) => `${f.label} by ${d(f.overBy)} ${U}`).join(', ');

  const resultText = [
    `HitchMath towing check`,
    verdict,
    result.tongue !== null ? `Tongue weight: ${d(result.tongue)} ${U}` : '',
    result.guideline ?? '',
  ]
    .filter(Boolean)
    .join('\n');

  const shareParams: Record<string, string> = Object.fromEntries(
    Object.entries(s).filter(([, v]) => v !== ''),
  );

  return (
    <div className="max-w-calc">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-h3 font-medium text-ink">Check your trailer</h2>
        <UnitToggle unit={unit} setUnit={setUnit} />
      </div>

      <InputsCard>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="t-trailer"
            label={`Loaded trailer weight (${U})`}
            value={s.trailer}
            onChange={set('trailer')}
            help="Use the trailer's GVWR if you don't know the loaded weight. Dry weight is too low."
          />
          <SelectField
            id="t-type"
            label="Trailer type"
            value={s.type}
            onChange={(v) => {
              markUsed();
              setS((p) => ({ ...p, type: v as TrailerType }));
            }}
            options={[
              { value: 'conventional', label: 'Bumper-pull' },
              { value: 'fifthWheel', label: 'Fifth wheel or gooseneck' },
            ]}
          />
          <Field
            id="t-pct"
            label="Tongue weight (%)"
            value={s.tonguePct}
            onChange={set('tonguePct')}
            help="10 to 15% for bumper-pull, 15 to 25% for fifth wheel."
          />
          <Field
            id="t-rating"
            label={`Truck's max trailer rating (${U})`}
            value={s.rating}
            onChange={set('rating')}
            help="From your owner's manual or the maker's towing guide for your exact cab, engine and axle ratio."
          />
          <Field
            id="t-payload"
            label={`Payload (${U})`}
            value={s.payload}
            onChange={set('payload')}
            help="The 'combined weight of occupants and cargo should never exceed' number on your driver's door-jamb sticker."
          />
          <Field id="t-gvwr" label={`GVWR (${U}, optional)`} value={s.gvwr} onChange={set('gvwr')} />
          <Field id="t-curb" label={`Curb weight (${U}, optional)`} value={s.curb} onChange={set('curb')} />
          <Field id="t-gcwr" label={`GCWR (${U}, optional)`} value={s.gcwr} onChange={set('gcwr')} />
          <div>
            <Field
              id="t-people"
              label={`People in the truck (${U} total)`}
              value={s.people}
              onChange={set('people')}
            />
            <button
              type="button"
              onClick={addPerson}
              className="mt-1 text-small text-brand underline underline-offset-2"
            >
              + add person ({toUnit(DEFAULT_PERSON_LB, unit)} {U})
            </button>
          </div>
          <Field
            id="t-cargo"
            label={`Cargo in the truck (${U})`}
            value={s.cargo}
            onChange={set('cargo')}
            help="Coolers, tools, bed cover, generator, firewood."
          />
          <Field
            id="t-hitch"
            label={`Hitch hardware (${U})`}
            value={s.hitch}
            onChange={set('hitch')}
            help="Ball mount and hitch. A weight-distribution hitch is often 70 to 100 lb."
          />
          <Field
            id="t-recv-trailer"
            label={`Receiver trailer rating (${U}, optional)`}
            value={s.recvTrailer}
            onChange={set('recvTrailer')}
          />
          <Field
            id="t-recv-tongue"
            label={`Receiver tongue rating (${U}, optional)`}
            value={s.recvTongue}
            onChange={set('recvTongue')}
          />
        </div>
      </InputsCard>

      <ResultCard>
        <p className="text-[32px] font-semibold leading-tight tabular text-ink">{verdict}</p>

        {!result.needsTrailerWeight && (
          <ul className="mt-3">
            {result.tongue !== null &&
              (statusOf('receiverTongue') !== 'notChecked' ? (
                <CheckRow status={statusOf('receiverTongue')}>
                  Tongue weight: {d(result.tongue)} {U}
                </CheckRow>
              ) : (
                <li className="py-1.5 text-body text-ink">
                  Tongue weight: {d(result.tongue)} {U}
                </li>
              ))}
            {result.payloadCapacity !== null && (
              <CheckRow status={statusOf('payload')}>
                Payload used: {d(result.payloadUsed)} of {d(result.payloadCapacity)} {U} (
                {d(result.payloadLeft)} {U} left)
              </CheckRow>
            )}
            {result.adjustedTrailerRating !== null && (
              <CheckRow status={statusOf('trailer')}>
                Adjusted trailer rating: {d(result.adjustedTrailerRating)} {U}
                {result.trailerUsePct !== null && <> (you're using {result.trailerUsePct}%)</>}
              </CheckRow>
            )}
            {result.truckLoaded !== null && (
              <CheckRow status={statusOf('gvwr')}>
                Truck weight with tongue load: {d(result.truckLoaded)} of {d(result.gvwr)} {U} GVWR
              </CheckRow>
            )}
            {result.combined !== null && (
              <CheckRow status={statusOf('gcwr')}>
                Combined weight: {d(result.combined)} of {d(result.gcwr)} {U} GCWR
              </CheckRow>
            )}
            {statusOf('receiverTrailer') !== 'notChecked' && (
              <CheckRow status={statusOf('receiverTrailer')}>
                Trailer vs receiver rating
              </CheckRow>
            )}
          </ul>
        )}

        {result.advisory && (
          <p className="mt-3 rounded-[8px] bg-band-1 p-3 text-small text-ink">{result.advisory}</p>
        )}

        {result.guideline && (
          <p className="mt-3 text-small text-muted">
            {result.guideline}
            {result.guidelineNote && <> {result.guidelineNote}</>}
          </p>
        )}

        {!result.needsTrailerWeight && (
          <ShowMath>
            <p>Tongue weight = trailer weight × tongue %.</p>
            <p>Payload used = people + cargo + hitch hardware + tongue weight.</p>
            <p>Adjusted trailer rating = trailer rating − (people + cargo + hitch hardware − 300 lb).</p>
            <p>Combined weight = curb + people + cargo + hitch hardware + trailer weight, under GCWR.</p>
          </ShowMath>
        )}

        <ActionButtons resultText={resultText} shareParams={shareParams} />
      </ResultCard>
    </div>
  );
}
