import { getSources, type SourceId } from '@/lib/data/sources';

/** Sources block with access dates, shown on every content page. */
export default function Sources({ ids }: { ids: SourceId[] }) {
  const sources = getSources(ids);
  return (
    <section aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="text-h3 font-medium text-ink">
        Sources
      </h2>
      <ul className="mt-3 space-y-2 text-small">
        {sources.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              className="link"
              target="_blank"
              rel="noopener"
            >
              {s.name}
            </a>
            <span className="text-muted"> · read {s.accessed}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
