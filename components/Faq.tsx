import type { FaqItem } from './JsonLd';

/**
 * FAQ accordion (design section 5). Native <details> so it works with no JS and
 * is accessible. Answers are server-rendered HTML so view-source shows them.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-h2 font-medium text-ink">
        FAQ
      </h2>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {items.map((it, i) => (
          <details key={i} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="font-medium">{it.q}</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-brand group-open:hidden"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="hidden shrink-0 text-brand group-open:inline"
              >
                −
              </span>
            </summary>
            <p className="prose-body pb-4 text-body text-ink">{it.aNode ?? it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
