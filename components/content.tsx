import Link from 'next/link';
import { getPage } from '@/lib/registry';

export function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-band-4 p-5">
      <p className="prose-body text-body text-ink">{children}</p>
    </div>
  );
}

export function SectionH2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-h2 font-medium text-ink">
      {children}
    </h2>
  );
}

export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="prose-body list-decimal space-y-2 pl-5 text-body text-ink">
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ol>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="prose-body list-disc space-y-2 pl-5 text-body text-ink">
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  );
}

export function WorkedExample({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <h3 className="text-h3 font-medium text-ink">{title}</h3>
      <p className="prose-body mt-2 text-body text-ink">{body}</p>
    </div>
  );
}

/** Owner note slot: renders nothing when empty (A5.1 item 9). */
export function OwnerNote({ note }: { note?: string }) {
  if (!note || note.trim() === '') return null;
  return (
    <div className="rounded-card border border-line bg-band-3 p-5">
      <p className="prose-body text-body text-ink">{note}</p>
    </div>
  );
}

export function Related({ slugs }: { slugs: string[] }) {
  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-h3 font-medium text-ink">
        Related tools and pages
      </h2>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-small">
        {slugs.map((slug) => {
          const page = getPage(slug);
          return (
            <li key={slug}>
              <Link href={page.path} prefetch={false} className="link">
                {page.tileName ?? page.h1}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
