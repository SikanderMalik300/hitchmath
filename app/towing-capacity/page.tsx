import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CollectionPage, BreadcrumbList, type Crumb } from '@/components/JsonLd';
import PhotoTile from '@/components/PhotoTile';
import { RefTable } from '@/components/Tables';
import { SectionH2 } from '@/components/content';
import { VEHICLES_BY_SLUG } from '@/lib/data/vehicles';
import { maxTrailer, maxPayload } from '@/lib/data/vehicles/types';
import { SILVERADO_MAX_PAYLOAD } from '@/lib/data/vehicles/chevy-silverado-1500-2026';
import { fmt } from '@/lib/format';

const page = getPage('towing-capacity');
export const metadata: Metadata = buildMetadata(page);

const VEHICLES = [
  'toyota-tacoma-towing-capacity',
  'ford-f150-towing-capacity',
  'toyota-tundra-towing-capacity',
  'ram-1500-towing-capacity',
  'chevy-silverado-1500-towing-capacity',
  'toyota-4runner-towing-capacity',
];

function payloadCell(slug: string): string {
  const data = VEHICLES_BY_SLUG[slug];
  const hasPayload = data.rows.some((r) => r.payload != null);
  if (hasPayload) return `${fmt(maxPayload(data.rows))} lb`;
  if (slug === 'chevy-silverado-1500-towing-capacity') return `${fmt(SILVERADO_MAX_PAYLOAD)} lb (page)`;
  return 'Not listed per row';
}

export default function Page() {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Towing capacity by vehicle', path: page.path },
  ];

  return (
    <article className="container-x section-y">
      <CollectionPage page={page} />
      <BreadcrumbList crumbs={crumbs} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-4 text-h1-m md:text-h1 font-medium text-ink">{page.h1}</h1>
      <p className="mt-4 max-w-prose text-body text-ink">
        2026 towing ratings for the trucks and SUVs people tow with most, copied from the makers’
        own towing guides and spec pages. Each page lists every configuration we could verify, with
        payload and the source.
      </p>

      <section className="mt-8 space-y-3">
        <RefTable
          columns={['Vehicle', 'Max towing', 'Max payload', 'Page']}
          rows={VEHICLES.map((slug) => {
            const p = getPage(slug);
            const data = VEHICLES_BY_SLUG[slug];
            return [
              `${data.year} ${data.make} ${data.model}`,
              `${fmt(maxTrailer(data.rows))} lb`,
              payloadCell(slug),
              <Link key={slug} href={p.path} prefetch={false} className="link">
                Open
              </Link>,
            ];
          })}
        />
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VEHICLES.map((slug) => {
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
