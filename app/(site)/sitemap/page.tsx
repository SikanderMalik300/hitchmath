import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage, PAGES, type Category } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage, { H2 } from '@/components/SimplePage';

const page = getPage('sitemap');
export const metadata: Metadata = buildMetadata(page);

const GROUPS: { title: string; cats: Category[] }[] = [
  { title: 'Home', cats: ['home'] },
  { title: 'Calculators', cats: ['tool'] },
  { title: 'Guides', cats: ['guide'] },
  { title: 'Towing capacity by vehicle', cats: ['vehicle'] },
  { title: 'Hubs', cats: ['hub'] },
  { title: 'Trust', cats: ['trust'] },
  { title: 'Legal', cats: ['legal'] },
];

export default function Page() {
  return (
    <SimplePage page={page}>
      {GROUPS.map((g) => {
        const items = PAGES.filter((p) => g.cats.includes(p.category) && p.inSitemap && p.verified !== false);
        if (items.length === 0) return null;
        return (
          <section key={g.title} className="space-y-2">
            <H2>{g.title}</H2>
            <ul className="space-y-2">
              {items.map((p) => (
                <li key={p.slug}>
                  <Link href={p.path} prefetch={false} className="link">
                    {p.h1}
                  </Link>
                  <span className="text-muted">: {p.description}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </SimplePage>
  );
}
