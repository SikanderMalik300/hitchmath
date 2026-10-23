import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ContentGraph, type Crumb } from '@/components/JsonLd';
import { RefTable } from '@/components/Tables';
import { SectionH2, UpdatedLine } from '@/components/content';
import { VEHICLES_BY_SLUG } from '@/lib/data/vehicles';
import { maxTrailer, maxPayload } from '@/lib/data/vehicles/types';
import { fmt } from '@/lib/format';

const page = getPage('towing-capacity');
export const metadata: Metadata = buildMetadata(page);

const GROUPS: { heading: string; slugs: string[] }[] = [
  {
    heading: 'Full-size trucks',
    slugs: [
      'ford-f150-towing-capacity',
      'toyota-tundra-towing-capacity',
      'ram-1500-towing-capacity',
      'chevy-silverado-1500-towing-capacity',
    ],
  },
  {
    heading: 'Midsize and compact trucks',
    slugs: [
      'toyota-tacoma-towing-capacity',
      'ford-ranger-towing-capacity',
      'chevy-colorado-towing-capacity',
      'honda-ridgeline-towing-capacity',
      'ford-maverick-towing-capacity',
      'nissan-frontier-towing-capacity',
    ],
  },
  {
    heading: 'SUVs and crossovers',
    slugs: [
      'toyota-4runner-towing-capacity',
      'ford-bronco-towing-capacity',
      'ford-explorer-towing-capacity',
      'ford-expedition-towing-capacity',
      'chevy-tahoe-towing-capacity',
      'chevy-suburban-towing-capacity',
      'chevy-traverse-towing-capacity',
      'jeep-wrangler-towing-capacity',
      'toyota-highlander-towing-capacity',
      'honda-pilot-towing-capacity',
      'toyota-rav4-towing-capacity',
      'subaru-outback-towing-capacity',
      'subaru-ascent-towing-capacity',
      'kia-telluride-towing-capacity',
    ],
  },
];

function payloadCell(slug: string): string {
  const data = VEHICLES_BY_SLUG[slug];
  const hasPayload = data.rows.some((r) => r.payload != null);
  if (hasPayload) return `${fmt(maxPayload(data.rows))} lb`;
  return 'Not listed per row';
}

export default function Page() {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Towing capacity by vehicle', path: page.path },
  ];

  return (
    <article className="container-x section-y">
      <ContentGraph page={page} kind="hub" crumbs={crumbs} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-4 text-h1-m md:text-h1 font-medium text-ink">{page.h1}</h1>
      <p className="mt-4 max-w-prose text-body text-ink">
        2026 towing ratings for the trucks and SUVs people tow with most, copied from the makers’
        own towing guides and spec pages. Each page lists every configuration we could verify, with
        payload and the source.
      </p>
      <div className="mt-3">
        <UpdatedLine date={page.lastUpdated} />
      </div>

      {GROUPS.map((group) => (
        <section key={group.heading} className="mt-10 space-y-3">
          <SectionH2>{group.heading}</SectionH2>
          <RefTable
            caption={`2026 ${group.heading} towing and payload maximums from each maker's documents`}
            columns={['Vehicle', 'Max towing', 'Max payload', 'Page']}
            rows={group.slugs.map((slug) => {
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
      ))}

      <p className="mt-8 max-w-prose text-small text-muted">
        Each figure comes from the maker’s own towing guide or spec page, linked on that vehicle’s
        page.
      </p>
    </article>
  );
}
