// JSON-LD helpers (A4). Every schema must match visible text.
import { SITE, absUrl, type PageEntry } from '@/lib/registry';

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationAndWebsite() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.domain,
    logo: absUrl('/icon-512.png'),
    email: SITE.email,
    founder: { '@id': SITE.authorPersonId },
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.domain,
    publisher: { '@id': `${SITE.domain}/#organization` },
  };
  return (
    <>
      <Script data={organization} />
      <Script data={website} />
    </>
  );
}

export interface Crumb {
  name: string;
  path: string;
}

export function BreadcrumbList({ crumbs }: { crumbs: Crumb[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
  return <Script data={data} />;
}

export interface FaqItem {
  q: string;
  a: string; // plain text, used for the JSON-LD answer
  aNode?: React.ReactNode; // optional richer display (e.g. with a link); schema still uses `a`
}

export function FaqPage({ items }: { items: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
  return <Script data={data} />;
}

export function WebApplication({ page }: { page: PageEntry }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: page.h1,
    url: absUrl(page.path),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': SITE.authorPersonId },
  };
  return <Script data={data} />;
}

export function ArticleSchema({
  page,
  image,
}: {
  page: PageEntry;
  image?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    author: { '@id': SITE.authorPersonId },
    datePublished: page.lastUpdated,
    dateModified: page.lastUpdated,
    ...(image ? { image: absUrl(image) } : {}),
    mainEntityOfPage: absUrl(page.path),
  };
  return <Script data={data} />;
}

export function CollectionPage({ page }: { page: PageEntry }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.h1,
    url: absUrl(page.path),
  };
  return <Script data={data} />;
}

export function ProfilePage() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': SITE.authorPersonId,
      name: SITE.author,
      url: absUrl(SITE.authorPath),
      sameAs: [],
    },
  };
  return <Script data={data} />;
}
