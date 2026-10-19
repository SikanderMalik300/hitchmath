'use client';

import { useMemo, useState, useCallback } from 'react';
import { tongueRange, tonguePercent, leverMethod, type TongueType } from '@/lib/calc/tongue';
import { type Unit, fromUnit, toUnit, fmtUnit } from '@/lib/format';
import {
  Field,
  SelectField,
  UnitToggle,
  ShowMath,
  ActionButtons,
  InputsCard,
  ResultCard,
  useToolUsed,
} from './calc-ui';

type Mode = 'range' | 'check' | 'scale';

export default function TongueCalculator() {
  const [mode, setMode] = useState<Mode>('range');
  const [unit, setUnitState] = useState<Unit>('lb');
  const markUsed = useToolUsed();

  // Mode A defaults
  const [rangeTrailer, setRangeTrailer] = useState('5000');
  const [type, setType] = useState<TongueType>('conventional');
  // Mode B defaults
  const [measured, setMeasured] = useState('620');
  const [checkTrailer, setCheckTrailer] = useState('5200');
  // Mode C defaults
  const [reading, setReading] = useState('150');
  const [ratio, setRatio] = useState('4');

  const setUnit = useCallback((next: Unit) => {
    setUnitState((prev) => {
      if (prev === next) return prev;
      const conv = (v: string, set: (s: string) => void) => {
        if (v.trim() === '') return;
        const n = Number(v);
        if (Number.isFinite(n)) set(String(toUnit(fromUnit(n, prev), next)));
      };
      conv(rangeTrailer, setRangeTrailer);
      conv(measured, setMeasured);
      conv(checkTrailer, setCheckTrailer);
      conv(reading, setReading);
      return next;
    });
  }, [rangeTrailer, measured, checkTrailer, reading]);

  const toLb = useCallback(
    (raw: string) => {
      if (raw.trim() === '') return null;
      const n = Number(raw);
      return Number.isFinite(n) ? fromUnit(n, unit) : null;
    },
    [unit],
  );

  const d = (lb: number | null | undefined) => fmtUnit(lb, unit);
  const U = unit;

  const onChange = (setter: (v: string) => void) => (v: string) => {
    markUsed();
    setter(v);
  };

  const range = useMemo(() => {
    const t = toLb(rangeTrailer);
    return t !== null ? tongueRange(t, type) : null;
  }, [rangeTrailer, type, toLb]);

  const check = useMemo(() => {
    return tonguePercent(toLb(measured), toLb(checkTrailer), type);
  }, [measured, checkTrailer, type, toLb]);

  const scale = useMemo(() => {
    const r = toLb(reading);
    const k = Number(ratio);
    return r !== null && Number.isFinite(k) ? leverMethod(r, k) : null;
  }, [reading, ratio, toLb]);

  let verdict = '';
  if (mode === 'range') {
    verdict = range
      ? `${d(range.low)} to ${d(range.high)} ${U} (target about ${d(range.target)} ${U} at ${range.targetPct}%)`
      : 'Enter a trailer weight';
  } else if (mode === 'check') {
    verdict = check.needsInput ? 'Enter a measured weight and trailer weight' : check.summary;
  } else {
    verdict = scale !== null ? `about ${d(scale)} ${U}` : 'Enter a scale reading';
  }

  const modes: { value: Mode; label: string }[] = [
    { value: 'range', label: 'Find the range' },
    { value: 'check', label: 'Check my tongue weight' },
    { value: 'scale', label: 'Bathroom-scale method' },
  ];

  const resultText = `HitchMath tongue weight\n${verdict}`;
  const shareParams = { mode, rangeTrailer, type, measured, checkTrailer, reading, ratio };

  return (
    <div className="max-w-calc">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-h3 font-medium text-ink">Tongue weight</h2>
        <UnitToggle unit={unit} setUnit={setUnit} />
      </div>

      <div
        role="tablist"
        aria-label="Tongue weight mode"
        className="mb-3 flex flex-wrap gap-2"
      >
        {modes.map((m) => (
          <button
            key={m.value}
            type="button"
            role="tab"
            aria-selected={mode === m.value}
            onClick={() => {
              markUsed();
              setMode(m.value);
            }}
            className={`min-h-[36px] rounded-pill border px-4 text-small ${
              mode === m.value ? 'border-brand bg-brand text-brand-ink' : 'border-line text-ink'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <InputsCard>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            id="tn-type"
            label="Trailer type"
            value={type}
            onChange={(v) => {
              markUsed();
              setType(v as TongueType);
            }}
            options={[
              { value: 'conventional', label: 'Bumper-pull' },
              { value: 'fifthWheel', label: 'Fifth wheel or gooseneck' },
            ]}
          />
          {mode === 'range' && (
            <Field
              id="tn-range-trailer"
              label={`Loaded trailer weight (${U})`}
              value={rangeTrailer}
              onChange={onChange(setRangeTrailer)}
            />
          )}
          {mode === 'check' && (
            <>
              <Field
                id="tn-measured"
                label={`Measured tongue weight (${U})`}
                value={measured}
                onChange={onChange(setMeasured)}
              />
              <Field
                id="tn-check-trailer"
                label={`Loaded trailer weight (${U})`}
                value={checkTrailer}
                onChange={onChange(setCheckTrailer)}
              />
            </>
          )}
          {mode === 'scale' && (
            <>
              <Field
                id="tn-reading"
                label={`Scale reading (${U})`}
                value={reading}
                onChange={onChange(setReading)}
              />
              <Field
                id="tn-ratio"
                label="Lever ratio"
                value={ratio}
                onChange={onChange(setRatio)}
                help="4 ft board, pivot 1 ft from the tongue end, scale at the far end."
              />
            </>
          )}
        </div>
      </InputsCard>

      <ResultCard>
        <p className="text-[32px] font-semibold leading-tight tabular text-ink">{verdict}</p>
        <ShowMath>
          <p>Range = trailer weight × 10% to 15% (fifth wheel 15% to 25%).</p>
          <p>Tongue % = measured tongue weight ÷ trailer weight × 100.</p>
          <p>Bathroom-scale lever: reading × 4.</p>
        </ShowMath>
        <ActionButtons resultText={resultText} shareParams={shareParams} />
      </ResultCard>
    </div>
  );
}
