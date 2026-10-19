import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CollectionPage, BreadcrumbList, type Crumb } from '@/components/JsonLd';
import PhotoTile from '@/components/PhotoTile';
import { RefTable } from '@/components/Tables';
import { SectionH2 } from '@/components/content';

const page = getPage('towing-calculators');
export const metadata: Metadata = buildMetadata(page);

const CALCULATORS = ['towing-capacity-calculator', 'payload-calculator', 'tongue-weight-calculator', 'gcwr-calculator'];

const WHICH: { q: string; slug: string }[] = [
  { q: 'Can my truck tow this trailer?', slug: 'towing-capacity-calculator' },
  { q: 'How much can I put in the truck?', slug: 'payload-calculator' },
  { q: 'Is my trailer loaded right?', slug: 'tongue-weight-calculator' },
  { q: 'Are truck and trailer too heavy together?', slug: 'gcwr-calculator' },
];

export default function Page() {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Towing calculators', path: page.path },
  ];

  return (
    <article className="container-x section-y">
      <CollectionPage page={page} />
      <BreadcrumbList crumbs={crumbs} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-4 text-h1-m md:text-h1 font-medium text-ink">{page.h1}</h1>
      <p className="mt-4 max-w-prose text-body text-ink">
        Four calculators for the four numbers that decide whether a tow is safe: the full towing
        check, payload, tongue weight and GCWR. Start with the towing capacity calculator if you’re
        not sure which limit matters.
      </p>

      <section className="mt-8 space-y-3">
        <SectionH2>Which calculator?</SectionH2>
        <RefTable
          columns={['Question', 'Tool']}
          rows={WHICH.map((w) => {
            const p = getPage(w.slug);
            return [
              w.q,
              <Link key={w.slug} href={p.path} prefetch={false} className="link">
                {p.tileName ?? p.h1}
              </Link>,
            ];
          })}
        />
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {CALCULATORS.map((slug) => {
            const p = getPage(slug);
            return (
              <PhotoTile key={slug} href={p.path} name={p.tileName ?? p.h1} line={p.tileLine} photoId={p.photoId} />
            );
          })}
        </div>
      </section>
    </article>
  );
}
