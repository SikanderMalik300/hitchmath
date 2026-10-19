import Link from 'next/link';
import type { Crumb } from './JsonLd';

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-small text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <Link
                  href={c.path}
                  prefetch={false}
                  className="hover:text-brand hover:underline underline-offset-2"
                >
                  {c.name}
                </Link>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
