import Breadcrumbs from './Breadcrumbs';
import { ContentGraph, type Crumb, type FaqItem } from './JsonLd';
import { QuickAnswer, SectionH2, Related } from './content';
import Faq from './Faq';
import Sources from './Sources';
import AuthorBox from './AuthorBox';
import Disclaimer from './Disclaimer';
import AdSlot from './AdSlot';
import { FigurePhoto } from './Photo';
import VehicleTable from './VehicleTable';
import { HistoryTableView, SimpleTableView } from './Tables';
import VehicleMiniCalculator from './calculators/VehicleMiniCalculator';
import { ogImagePath } from '@/lib/seo';
import type { PageEntry } from '@/lib/registry';
import type { VehicleData } from '@/lib/data/vehicles/types';

export interface VehicleContent {
  quickAnswer: string;
  sections: { h2: string; body: React.ReactNode }[];
  notCovered: string;
  faq: FaqItem[];
}

export default function VehiclePage({
  page,
  data,
  content,
  mini,
}: {
  page: PageEntry;
  data: VehicleData;
  content: VehicleContent;
  mini: { defaultId: string; defaultTrailer: number; defaultPeople: number; defaultCargo: number };
}) {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Towing capacity by vehicle', path: '/towing-capacity/' },
    { name: page.tileName ?? page.h1, path: page.path },
  ];

  return (
    <article className="container-x section-y">
      <ContentGraph
        page={page}
        kind="vehicle"
        crumbs={crumbs}
        faq={content.faq}
        image={page.photoId ? ogImagePath(page.slug) : undefined}
      />

      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-4 text-h1-m md:text-h1 font-medium text-ink">{page.h1}</h1>

      <div className="mt-6 max-w-prose">
        <QuickAnswer>{content.quickAnswer}</QuickAnswer>
      </div>

      <div className="mt-8">
        <VehicleMiniCalculator
          data={data}
          defaultId={mini.defaultId}
          defaultTrailer={mini.defaultTrailer}
          defaultPeople={mini.defaultPeople}
          defaultCargo={mini.defaultCargo}
        />
      </div>

      <section className="mt-10 space-y-3">
        <SectionH2>Every configuration</SectionH2>
        <VehicleTable data={data} />
        {data.tableNotes && data.tableNotes.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-small text-muted">
            {data.tableNotes.map((n) => (
              <li key={n}>{n}</li>
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

      {data.gcwrTable && (
        <section className="mt-10 space-y-3">
          <SectionH2>{data.detailTableTitle ?? 'GCWR rows'}</SectionH2>
          <SimpleTableView table={data.gcwrTable} />
        </section>
      )}

      {data.yearHistory && (
        <section className="mt-10 space-y-3">
          <SectionH2>Year history</SectionH2>
          <HistoryTableView
            table={data.yearHistory}
            caption={`${data.make} ${data.model} maximum towing by model year. Source per row.`}
          />
          {data.yearHistoryNote && (
            <p className="text-small text-muted">{data.yearHistoryNote}</p>
          )}
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
