import Breadcrumbs from './Breadcrumbs';
import { BreadcrumbList, type Crumb } from './JsonLd';
import type { PageEntry } from '@/lib/registry';

export default function SimplePage({
  page,
  children,
  schema,
}: {
  page: PageEntry;
  children: React.ReactNode;
  schema?: React.ReactNode;
}) {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: page.h1, path: page.path },
  ];
  return (
    <article className="container-x section-y">
      {schema}
      <BreadcrumbList crumbs={crumbs} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-4 text-h1-m md:text-h1 font-medium text-ink">{page.h1}</h1>
      <div className="prose-body mt-6 space-y-5 text-body text-ink">{children}</div>
    </article>
  );
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-h2 font-medium text-ink">
      {children}
    </h2>
  );
}
