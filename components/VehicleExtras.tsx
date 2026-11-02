import { Check, X, Minus } from 'lucide-react';
import { SectionH2 } from './content';
import { fmt } from '@/lib/format';
import { buildWorkedExample, buildPicks, type WorkedStatus } from '@/lib/pages/vehicle-extras';
import type { VehicleData } from '@/lib/data/vehicles/types';

function StatusMark({ status }: { status: WorkedStatus }) {
  const map = {
    within: { word: 'Within', cls: 'text-ok', Icon: Check },
    over: { word: 'Over', cls: 'text-warn', Icon: X },
    info: { word: 'Note', cls: 'text-muted', Icon: Minus },
  } as const;
  const { word, cls, Icon } = map[status];
  return (
    <>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${cls}`} aria-hidden="true" strokeWidth={1.5} />
      <span className={`font-medium ${cls}`}>{word}</span>
    </>
  );
}

/** §2 Worked example: a computed scenario run through the site calculator. */
export function WorkedExampleSection({ data }: { data: VehicleData }) {
  const ex = buildWorkedExample(data);
  return (
    <section className="mt-10 max-w-prose space-y-3">
      <SectionH2>{ex.title}</SectionH2>
      <p className="prose-body text-body text-ink">
        A common setup is the {ex.configLabel} with a {fmt(ex.scenario.trailer)} lb loaded trailer,
        two people at 150 lb each and 150 lb of cargo. Tongue weight is 12% of the trailer.
      </p>
      <ul className="space-y-2">
        {ex.checks.map((c) => (
          <li key={c.key} className="flex items-start gap-2 text-body">
            <StatusMark status={c.status} />
            <span className="text-ink">
              {' '}
              · {c.label}: {c.detail}.
            </span>
          </li>
        ))}
      </ul>
      {ex.payloadNote && <p className="text-small text-muted">{ex.payloadNote}</p>}
      {ex.summary && <p className="prose-body text-body text-ink">{ex.summary}</p>}
    </section>
  );
}

/** §3 "Which {Model} should you pick for towing?" bullets, generated from data. */
export function WhichToPickSection({ data }: { data: VehicleData }) {
  const bullets = buildPicks(data);
  if (!bullets.length) return null;
  return (
    <section className="mt-10 max-w-prose space-y-3">
      <SectionH2>{`Which ${data.model} should you pick for towing?`}</SectionH2>
      <ul className="prose-body list-disc space-y-2 pl-5 text-body text-ink">
        {bullets.map((b) => (
          <li key={b.key}>{b.text}</li>
        ))}
      </ul>
    </section>
  );
}
