// JSON-LD helpers (A4, fix-04). Every schema must match visible text.
import { SITE, absUrl, type PageEntry } from '@/lib/registry';
import { isoCentral } from '@/lib/datetime';

const ORG_ID = `${SITE.domain}/#organization`;
const WEBSITE_ID = `${SITE.domain}/#website`;

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide Organization + WebSite (rendered once in the site layout). */
export function OrganizationAndWebsite() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE.name,
        url: SITE.domain,
        logo: absUrl('/icon-512.png'),
        email: SITE.email,
        founder: { '@id': SITE.authorPersonId },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE.name,
        url: SITE.domain,
        publisher: { '@id': ORG_ID },
      },
    ],
  };
  return <Script data={data} />;
}

export interface Crumb {
  name: string;
  path: string;
}

/** Standalone BreadcrumbList (trust/legal pages that have no full WebPage graph). */
export function BreadcrumbList({ crumbs }: { crumbs: Crumb[] }) {
  return <Script data={breadcrumbNode(crumbs, absUrl(crumbs[crumbs.length - 1].path))} />;
}

function breadcrumbNode(crumbs: Crumb[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

export interface FaqItem {
  q: string;
  a: string; // plain text, used for the JSON-LD answer
  aNode?: React.ReactNode; // optional richer display (e.g. with a link); schema still uses `a`
}

export type PageKind = 'tool' | 'vehicle' | 'hub' | 'home';

/**
 * One @graph per content page: Person, WebPage (with author + dates + breadcrumb),
 * BreadcrumbList, the primary node (WebApplication / Article / CollectionPage) and
 * FAQPage. mainEntityOfPage on the primary node points to the WebPage @id.
 */
export function ContentGraph({
  page,
  kind,
  crumbs,
  faq,
  image,
}: {
  page: PageEntry;
  kind: PageKind;
  crumbs?: Crumb[];
  faq?: FaqItem[];
  image?: string;
}) {
  const url = absUrl(page.path);
  const webpageId = `${url}#webpage`;
  // Full ISO 8601 with time + offset (fix-05); the visible date stays date-only.
  const datePublished = isoCentral(page.datePublished ?? page.lastUpdated);
  const dateModified = isoCentral(page.lastUpdated);
  const name = page.title.replace(/ \| HitchMath$/, '');
  const authorRef = { '@id': SITE.authorPersonId };

  const person = {
    '@type': 'Person',
    '@id': SITE.authorPersonId,
    name: SITE.author,
    url: absUrl(SITE.authorPath),
  };

  const webpage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': webpageId,
    url,
    name,
    description: page.meta,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    author: authorRef,
    datePublished,
    dateModified,
  };
  if (crumbs && crumbs.length) webpage.breadcrumb = { '@id': `${url}#breadcrumb` };

  const graph: object[] = [person, webpage];
  if (crumbs && crumbs.length) {
    const bc = breadcrumbNode(crumbs, url) as Record<string, unknown>;
    delete bc['@context'];
    graph.push(bc);
  }

  if (kind === 'tool') {
    graph.push({
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name: page.h1,
      url,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: authorRef,
      datePublished,
      dateModified,
      mainEntityOfPage: { '@id': webpageId },
    });
  } else if (kind === 'vehicle') {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: page.h1,
      author: authorRef,
      datePublished,
      dateModified,
      ...(image ? { image: absUrl(image) } : {}),
      mainEntityOfPage: { '@id': webpageId },
    });
  } else if (kind === 'hub') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name: page.h1,
      url,
      author: authorRef,
      datePublished,
      dateModified,
      mainEntityOfPage: { '@id': webpageId },
    });
  }

  if (faq && faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    });
  }

  return <Script data={{ '@context': 'https://schema.org', '@graph': graph }} />;
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
      // sameAs is intentionally empty: the owner has no public profiles to link yet.
      sameAs: [],
    },
  };
  return <Script data={data} />;
}
