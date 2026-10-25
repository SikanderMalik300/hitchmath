import Breadcrumbs from './Breadcrumbs';
import { ContentGraph, type Crumb, type FaqItem } from './JsonLd';
import { QuickAnswer, SectionH2, Related } from './content';
import { RefTable } from './Tables';
import Faq from './Faq';
import Sources from './Sources';
import AuthorBox from './AuthorBox';
import Disclaimer from './Disclaimer';
import AdSlot from './AdSlot';
import { FigurePhoto } from './Photo';
import HdRatingsTable from './HdRatingsTable';
import { ogImagePath } from '@/lib/seo';
import { fmt } from '@/lib/format';
import type { PageEntry } from '@/lib/registry';
import type { HdVehicle, MaxByEngine } from '@/lib/data/vehicles/hd/hd-types';

export interface HdContent {
  quickAnswer: string;
  sections: { h2: string; body: React.ReactNode }[];
  notCovered: string;
  faq: FaqItem[];
}

function MaxCell({ entry }: { entry?: { value: number; config: string } | null }) {
  if (!entry) return <span className="text-muted">Added in an update</span>;
  return (
    <div>
      <span className="font-medium tabular">{fmt(entry.value)} lb</span>
      <div className="text-small text-muted">{entry.config}</div>
    </div>
  );
}

function maxByEngineTable(data: HdVehicle) {
  const caption = `${data.year} ${data.make} ${data.model} maximum towing by engine. Source: ${data.sourceName}, read ${data.readDate}.`;
  if (data.kind === 'ram') {
    return (
      <RefTable
        caption={caption}
        columns={['Engine', 'Max trailer']}
        rows={data.maxByEngine.map((m: MaxByEngine) => [m.engine, <MaxCell key={m.engine} entry={m.trailer} />])}
      />
    );
  }
  if (data.kind === 'gm') {
    return (
      <RefTable
        caption={caption}
        columns={['Engine', 'Max conventional', 'Max 5th-wheel / gooseneck']}
        rows={data.maxByEngine.map((m: MaxByEngine) => [
          m.engine,
          <MaxCell key={m.engine + 'c'} entry={m.conventional} />,
          <MaxCell key={m.engine + 'g'} entry={m.gooseneck} />,
        ])}
      />
    );
  }
  // ford-conv (5th-wheel/gooseneck columns added in step 2)
  return (
    <RefTable
      caption={caption}
      columns={['Engine', 'Max conventional']}
      rows={data.maxByEngine.map((m: MaxByEngine) => [m.engine, <MaxCell key={m.engine} entry={m.conventional} />])}
    />
  );
}

export default function HdVehiclePage({ page, data, content }: { page: PageEntry; data: HdVehicle; content: HdContent }) {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Towing capacity by vehicle', path: '/towing-capacity/' },
    { name: page.tileName ?? page.h1, path: page.path },
  ];

  return (
    <article className="container-x section-y">
      <ContentGraph page={page} kind="vehicle" crumbs={crumbs} faq={content.faq} image={page.photoId ? ogImagePath(page.slug) : undefined} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-4 text-h1-m md:text-h1 font-medium text-ink">{page.h1}</h1>

      <div className="mt-6 max-w-prose">
        <QuickAnswer>{content.quickAnswer}</QuickAnswer>
      </div>

      <section className="mt-10 space-y-3">
        <SectionH2>Max by engine</SectionH2>
        {maxByEngineTable(data)}
      </section>

      <section className="mt-10 space-y-3">
        <SectionH2>Every configuration</SectionH2>
        <HdRatingsTable data={data} />
        {data.fordFifthPending && <p className="text-small text-muted">{data.fordFifthPending}</p>}
        {data.notes.map((n) => (
          <p key={n} className="text-small text-muted">
            {n}
          </p>
        ))}
        {data.footnotes.length > 0 && (
          <ul className="list-none space-y-1 text-small text-muted">
            {data.footnotes.map((f) => (
              <li key={f.marker + (f.page ?? '')}>
                <sup>{f.marker}</sup> {f.text}
              </li>
            ))}
          </ul>
        )}
      </section>

      {page.photoId && (
        <div className="mt-10 max-w-calc">
          <FigurePhoto id={page.photoId} label={page.tileName ?? page.h1} />
        </div>
      )}

      <AdSlot />

      {data.hitchTable && data.hitchTable.length > 0 && (
        <section className="mt-10 space-y-3">
          <SectionH2>Hitch receiver limits</SectionH2>
          <RefTable
            caption={`${data.year} ${data.make} ${data.model} hitch receiver limits (same for weight-carrying and weight-distributing). Source: Ford 2026 RV & Trailer Towing Guide, p. 26.`}
            columns={['Model', 'Max trailer (lb)', 'Max tongue (lb)']}
            rows={data.hitchTable.map((h) => [h.model, fmt(h.maxTrailer), fmt(h.maxTongue)])}
          />
        </section>
      )}

      {data.payloadRows && data.payloadRows.length > 0 && (
        <section className="mt-10 space-y-3">
          <SectionH2>Payload</SectionH2>
          <RefTable
            caption={`${data.year} Ram ${data.model} maximum payload by configuration. Source: ${data.sourceName}, read ${data.readDate}. Trailer weight and payload are mutually exclusive.`}
            columns={['Cab', 'Bed', 'Engine', 'GVWR (lb)', 'Drive', 'Payload (lb)']}
            rows={data.payloadRows.map((r, i) => [r.cab, r.bed, r.engine, fmt(r.gvwr), r.drive, fmt(r.payload)])}
          />
        </section>
      )}

      <div className="mt-10 max-w-prose space-y-8">
        {content.sections.map((s) => (
          <section key={s.h2} className="space-y-3">
            <SectionH2>{s.h2}</SectionH2>
            <div className="prose-body text-body text-ink">{s.body}</div>
          </section>
        ))}

        <section className="space-y-3">
          <SectionH2>What this page doesn&apos;t cover</SectionH2>
          <p className="prose-body text-body text-ink">{content.notCovered}</p>
        </section>

        <Faq items={content.faq} />
        <Related slugs={page.related ?? []} />
        <Sources ids={page.sources ?? []} />
        <AuthorBox lastUpdated={page.lastUpdated} />
        <Disclaimer />
      </div>
    </article>
  );
}
