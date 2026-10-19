import Breadcrumbs from './Breadcrumbs';
import {
  WebApplication,
  BreadcrumbList,
  FaqPage,
  type Crumb,
  type FaqItem,
} from './JsonLd';
import { QuickAnswer, SectionH2, Steps, Bullets, WorkedExample, OwnerNote, Related } from './content';
import Faq from './Faq';
import Sources from './Sources';
import AuthorBox from './AuthorBox';
import Disclaimer from './Disclaimer';
import AdSlot from './AdSlot';
import { FigurePhoto } from './Photo';
import type { PageEntry } from '@/lib/registry';

export interface ToolContent {
  quickAnswer: string;
  howToUse: string[];
  formula: string[];
  examples: { title: string; body: string }[];
  notCovered: string;
  tips: string[];
  faq: FaqItem[];
}

export default function ToolPage({
  page,
  content,
  calculator,
  referenceTables,
  extraTop,
}: {
  page: PageEntry;
  content: ToolContent;
  calculator: React.ReactNode;
  referenceTables?: React.ReactNode;
  extraTop?: React.ReactNode; // optional block (e.g. calculator modes description)
}) {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Towing calculators', path: '/towing-calculators/' },
    { name: page.tileName ?? page.h1, path: page.path },
  ];

  return (
    <article className="container-x section-y">
      <WebApplication page={page} />
      <BreadcrumbList crumbs={crumbs} />
      <FaqPage items={content.faq} />

      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-4 text-h1-m md:text-h1 font-medium text-ink">{page.h1}</h1>

      <div className="mt-6 max-w-prose">
        <QuickAnswer>{content.quickAnswer}</QuickAnswer>
      </div>

      {extraTop && <div className="mt-6">{extraTop}</div>}

      <div className="mt-8">{calculator}</div>

      {page.photoId && (
        <div className="mt-10 max-w-calc">
          <FigurePhoto id={page.photoId} label={page.tileName ?? page.h1} />
        </div>
      )}

      <AdSlot />

      <section className="mt-10 max-w-prose space-y-4">
        <SectionH2>How to use</SectionH2>
        <Steps items={content.howToUse} />
      </section>

      <section className="mt-10 max-w-prose space-y-4">
        <SectionH2>The formula</SectionH2>
        <Bullets items={content.formula} />
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {content.examples.map((e) => (
          <WorkedExample key={e.title} title={e.title} body={e.body} />
        ))}
      </section>

      <section className="mt-10 max-w-prose space-y-4">
        <SectionH2>What this calculator doesn&apos;t cover</SectionH2>
        <p className="prose-body text-body text-ink">{content.notCovered}</p>
      </section>

      {referenceTables && <section className="mt-10 space-y-4">{referenceTables}</section>}

      <div className="mt-10">
        <OwnerNote note={page.ownerNote} />
      </div>

      <section className="mt-10 max-w-prose space-y-4">
        <SectionH2>Tips</SectionH2>
        <Bullets items={content.tips} />
      </section>

      <div className="mt-10 max-w-prose">
        <Faq items={content.faq} />
      </div>

      <div className="mt-10 max-w-prose">
        <Related slugs={page.related ?? []} />
      </div>

      <div className="mt-10 max-w-prose">
        <Sources ids={page.sources ?? []} />
      </div>

      <div className="mt-10 max-w-prose">
        <AuthorBox lastUpdated={page.lastUpdated} />
      </div>

      <div className="mt-6 max-w-prose">
        <Disclaimer />
      </div>
    </article>
  );
}
