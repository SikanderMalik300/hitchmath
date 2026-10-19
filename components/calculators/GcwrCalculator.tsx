'use client';

import { useMemo, useState, useCallback } from 'react';
import { gcwrCheck } from '@/lib/calc/gcwr';
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
  curb: string;
  people: string;
  cargo: string;
  hitch: string;
  trailer: string;
  gcwr: string;
  rating: string;
}

const DEFAULTS: State = {
  curb: '5400',
  people: '360',
  cargo: '300',
  hitch: '70',
  trailer: '8500',
  gcwr: '15000',
  rating: '',
};

const WEIGHT_KEYS: (keyof State)[] = ['curb', 'people', 'cargo', 'hitch', 'trailer', 'gcwr', 'rating'];

export default function GcwrCalculator() {
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

  const setUnit = useCallback((next: Unit) => {
    setUnitState((prev) => {
      if (prev === next) return prev;
      setS((cur) => {
        const out = { ...cur };
        for (const k of WEIGHT_KEYS) {
          if (cur[k].trim() === '') continue;
          const n = Number(cur[k]);
          if (Number.isFinite(n)) out[k] = String(toUnit(fromUnit(n, prev), next));
        }
        return out;
      });
      return next;
    });
  }, []);

  const toLb = useCallback(
    (raw: string) => {
      if (raw.trim() === '') return null;
      const n = Number(raw);
      return Number.isFinite(n) ? fromUnit(n, unit) : null;
    },
    [unit],
  );

  const result = useMemo(
    () =>
      gcwrCheck({
        curb: toLb(s.curb),
        people: toLb(s.people),
        cargo: toLb(s.cargo),
        hitchHardware: toLb(s.hitch),
        trailer: toLb(s.trailer),
        gcwr: toLb(s.gcwr),
        maxTrailerRating: toLb(s.rating),
      }),
    [s, toLb],
  );

  const d = (lb: number | null | undefined) => fmtUnit(lb, unit);
  const U = unit;
  const gcwrLb = toLb(s.gcwr);

  const verdict = result.needsGcwr
    ? 'Enter your GCWR'
    : result.over
      ? `Over by ${d(result.overBy)} ${U}`
      : `Combined ${d(result.combined)} of ${d(gcwrLb)} ${U} (${d(result.left)} ${U} left)`;

  const resultText = `HitchMath GCWR check\n${verdict}`;
  const shareParams = Object.fromEntries(Object.entries(s).filter(([, v]) => v !== ''));

  return (
    <div className="max-w-calc">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-h3 font-medium text-ink">Combined weight check</h2>
        <UnitToggle unit={unit} setUnit={setUnit} />
      </div>

      <InputsCard>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="g-curb" label={`Curb weight (${U})`} value={s.curb} onChange={set('curb')} />
          <Field id="g-people" label={`People (${U} total)`} value={s.people} onChange={set('people')} />
          <Field id="g-cargo" label={`Cargo (${U})`} value={s.cargo} onChange={set('cargo')} />
          <Field id="g-hitch" label={`Hitch hardware (${U})`} value={s.hitch} onChange={set('hitch')} />
          <Field id="g-trailer" label={`Loaded trailer weight (${U})`} value={s.trailer} onChange={set('trailer')} />
          <Field id="g-gcwr" label={`GCWR (${U})`} value={s.gcwr} onChange={set('gcwr')} />
          <Field
            id="g-rating"
            label={`Trailer rating (${U}, optional)`}
            value={s.rating}
            onChange={set('rating')}
            help="Add it to see which limit is lower."
          />
        </div>
      </InputsCard>

      <ResultCard>
        <p className="text-[32px] font-semibold leading-tight tabular text-ink">{verdict}</p>
        {!result.needsGcwr && (
          <ul className="mt-3">
            <CheckRow status={result.over ? 'over' : 'within'}>
              Combined {d(result.combined)} of {d(gcwrLb)} {U}
            </CheckRow>
            {result.maxTrailerByGcwr !== null && (
              <li className="py-1.5 text-body text-ink">
                GCWR allows a trailer up to {d(result.maxTrailerByGcwr)} {U}.
              </li>
            )}
            {result.realLimit !== null && s.rating.trim() !== '' && (
              <li className="py-1.5 text-body text-ink">
                Your real limit is the lower of the two: {d(result.realLimit)} {U}.
              </li>
            )}
          </ul>
        )}
        <ShowMath>
          <p>Combined weight = curb + people + cargo + hitch hardware + trailer weight.</p>
          <p>GCWR left = GCWR − combined weight.</p>
          <p>Heaviest trailer by GCWR = GCWR − (curb + people + cargo + hitch hardware).</p>
        </ShowMath>
        <ActionButtons resultText={resultText} shareParams={shareParams} />
      </ResultCard>
    </div>
  );
}
