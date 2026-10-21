'use client';

import { useMemo, useState, useCallback } from 'react';
import { checkTow } from '@/lib/calc/tow';
import { fmt } from '@/lib/format';
import type { VehicleData } from '@/lib/data/vehicles/types';
import { miniConfigs } from '@/lib/data/vehicles/types';
import { track } from '@/lib/analytics';
import {
  Field,
  SelectField,
  CheckRow,
  ShowMath,
  ActionButtons,
  InputsCard,
  ResultCard,
  useToolUsed,
  type Status,
} from './calc-ui';

export default function VehicleMiniCalculator({
  data,
  defaultId,
  defaultTrailer,
  defaultPeople,
  defaultCargo,
  defaultHitch = 60,
}: {
  data: VehicleData;
  defaultId: string;
  defaultTrailer: number;
  defaultPeople: number;
  defaultCargo: number;
  defaultHitch?: number;
}) {
  const [configId, setConfigId] = useState(defaultId);
  const [trailer, setTrailer] = useState(String(defaultTrailer));
  const [people, setPeople] = useState(String(defaultPeople));
  const [cargo, setCargo] = useState(String(defaultCargo));
  const [hitch, setHitch] = useState(String(defaultHitch));
  const [payloadOverride, setPayloadOverride] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const markUsed = useToolUsed();

  const configs = useMemo(() => miniConfigs(data), [data]);
  const cfg = useMemo(
    () => configs.find((c) => c.id === configId) ?? configs[0],
    [configs, configId],
  );

  const num = (raw: string): number | null => {
    if (raw.trim() === '') return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  };

  const payloadCapacity = cfg.payload ?? num(payloadOverride);

  const result = useMemo(
    () =>
      checkTow({
        trailerWeight: num(trailer),
        trailerType: 'conventional',
        maxTrailerRating: cfg.maxTrailer,
        payloadCapacity,
        gvwr: cfg.gvwr ?? null,
        curbWeight: cfg.curbWeight ?? null,
        gcwr: cfg.gcwr ?? null,
        people: num(people),
        cargo: num(cargo),
        hitchHardware: num(hitch),
        receiverTongueRating: cfg.maxTongue ?? null,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cfg, trailer, people, cargo, hitch, payloadCapacity],
  );

  const statusOf = (id: string): Status =>
    (result.checks.find((x) => x.id === id)?.status as Status) ?? 'notChecked';

  const verdict = result.needsTrailerWeight
    ? 'Enter a trailer weight'
    : result.ok
      ? 'Within every rating you entered'
      : 'Over: ' + result.failures.map((f) => `${f.label} by ${fmt(f.overBy)} lb`).join(', ');

  const notCheckedNotes: string[] = [];
  if (cfg.gvwr == null && cfg.gcwr == null) {
    notCheckedNotes.push('GVWR and GCWR not checked: enter them in the full calculator.');
  }
  if (cfg.payload == null && payloadCapacity == null) {
    notCheckedNotes.push('Payload not checked until you enter it.');
  }

  const resultText = `HitchMath ${data.year} ${data.make} ${data.model} check\n${verdict}`;
  const shareParams = { config: configId, trailer, people, cargo, hitch };

  return (
    <div className="max-w-calc">
      <h2 className="mb-3 text-h3 font-medium text-ink">Check your setup</h2>
      <InputsCard>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <SelectField
              id="v-config"
              label="Your configuration"
              value={configId}
              onChange={(v) => {
                markUsed();
                track('config_selected', { config: v });
                setConfigId(v);
              }}
              options={configs.map((c) => ({ value: c.id, label: c.label }))}
            />
          </div>
          <Field
            id="v-trailer"
            label="Loaded trailer weight (lb)"
            value={trailer}
            onChange={(v) => {
              markUsed();
              setTrailer(v);
            }}
          />
          <Field
            id="v-people"
            label="People in the truck (lb)"
            value={people}
            onChange={(v) => {
              markUsed();
              setPeople(v);
            }}
          />
          <Field
            id="v-cargo"
            label="Cargo in the truck (lb)"
            value={cargo}
            onChange={(v) => {
              markUsed();
              setCargo(v);
            }}
          />
          {cfg.payload == null && (
            <Field
              id="v-payload"
              label="Payload from your door-jamb sticker (lb)"
              value={payloadOverride}
              onChange={(v) => {
                markUsed();
                setPayloadOverride(v);
              }}
            />
          )}
        </div>

        <details className="mt-4" open={moreOpen} onToggle={(e) => setMoreOpen((e.target as HTMLDetailsElement).open)}>
          <summary className="cursor-pointer text-small text-brand underline underline-offset-2">
            More options
          </summary>
          <div className="mt-3 max-w-xs">
            <Field
              id="v-hitch"
              label="Hitch hardware (lb)"
              value={hitch}
              onChange={(v) => {
                markUsed();
                setHitch(v);
              }}
            />
          </div>
        </details>
      </InputsCard>

      <ResultCard>
        <p className="text-[28px] font-semibold leading-tight tabular text-ink">{verdict}</p>
        {!result.needsTrailerWeight && (
          <ul className="mt-3">
            <li className="py-1.5 text-body text-ink">Tongue weight: {fmt(result.tongue)} lb</li>
            {payloadCapacity != null && (
              <CheckRow status={statusOf('payload')}>
                Payload used: {fmt(result.payloadUsed)} of {fmt(payloadCapacity)} lb (
                {fmt(result.payloadLeft)} lb left)
              </CheckRow>
            )}
            <CheckRow status={statusOf('trailer')}>
              Adjusted trailer rating: {fmt(result.adjustedTrailerRating)} lb
              {result.trailerUsePct !== null && <> (you're using {result.trailerUsePct}%)</>}
            </CheckRow>
            {statusOf('receiverTongue') !== 'notChecked' && (
              <CheckRow status={statusOf('receiverTongue')}>
                Tongue vs {fmt(cfg.maxTongue)} lb max tongue
              </CheckRow>
            )}
            {result.combined !== null && (
              <CheckRow status={statusOf('gcwr')}>
                Combined {fmt(result.combined)} of {fmt(result.gcwr)} lb GCWR
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
        {notCheckedNotes.map((n) => (
          <p key={n} className="mt-2 text-small text-muted">
            {n}
          </p>
        ))}
        <ShowMath>
          <p>Adjusted trailer rating = rating − (people + cargo + hitch − 300 lb).</p>
          <p>Tongue weight = trailer weight × 12%. Payload used = people + cargo + hitch + tongue.</p>
        </ShowMath>
        <ActionButtons resultText={resultText} shareParams={shareParams} />
      </ResultCard>
    </div>
  );
}
