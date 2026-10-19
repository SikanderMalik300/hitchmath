import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage, { H2 } from '@/components/SimplePage';
import { RefTable } from '@/components/Tables';
import { CONSTANTS_LIST } from '@/lib/data/constants';
import { SOURCES } from '@/lib/data/sources';
import { fmt } from '@/lib/format';

const page = getPage('how-we-calculate');
export const metadata: Metadata = buildMetadata(page);

const FORMULAS = [
  'Towing capacity: your real limit is the lowest of the trailer rating, payload, GVWR, GCWR and the hitch rating. We subtract the people and cargo you carry above the 300 lb the rating already assumes from the trailer rating.',
  'Payload: payload is GVWR minus curb weight. Payload used is people plus cargo plus accessories plus hitch hardware plus tongue weight.',
  'Tongue weight: 10% to 15% of the loaded trailer weight for a bumper-pull trailer, 15% to 25% for a fifth wheel or gooseneck.',
  'GCWR: combined weight is curb weight plus people plus cargo plus the hitch plus the trailer, and it must stay at or under GCWR.',
];

export default function Page() {
  const constantRows = CONSTANTS_LIST.map((c) => {
    const src = c.sourceId ? SOURCES[c.sourceId] : null;
    return [
      c.label,
      `${fmt(c.value) || c.value}${c.unit ? ` ${c.unit}` : ''}`,
      src ? (
        <a key={c.key} href={src.url} target="_blank" rel="noopener" className="link">
          {c.source}
        </a>
      ) : (
        c.source
      ),
      src ? src.accessed : '',
    ];
  });

  return (
    <SimplePage page={page}>
      <H2>Where the numbers come from</H2>
      <p>
        Every towing, payload and weight figure on HitchMath comes from the manufacturer’s own
        documents: Ford’s RV & Trailer Towing Guide, Chevrolet’s Trailering Guide, Ram’s payload and
        towing charts, and Toyota’s official specification pages. Each table shows the document name
        and the date we read it.
      </p>

      <H2>What the ratings assume</H2>
      <p>
        Ford, GM and Ram rate trailers with the SAE J2807 method. The rating assumes a truck with a
        150 lb driver and a 150 lb front passenger and nothing else. Everything else you add, people,
        cargo, a bed cover, the hitch itself, comes off the trailer rating and off payload.
      </p>

      <H2>The formulas</H2>
      <ul className="list-disc space-y-2 pl-5">
        {FORMULAS.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <H2>Rules of thumb we label as rules of thumb</H2>
      <p>
        The 80% guideline is common advice from RV groups. It is not a manufacturer rating and not a
        law. We show it as a note, never as a pass or fail.
      </p>

      <H2>Constants</H2>
      <RefTable columns={['Name', 'Value', 'Source', 'Accessed']} rows={constantRows} />

      <H2>Corrections</H2>
      <p>
        See the{' '}
        <Link href="/editorial-policy/#corrections" prefetch={false} className="link">
          corrections log
        </Link>
        .
      </p>
    </SimplePage>
  );
}
