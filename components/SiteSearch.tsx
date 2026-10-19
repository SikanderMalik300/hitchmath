'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';
import { PAGES } from '@/lib/registry';

interface Item {
  name: string;
  path: string;
  keywords: string;
}

const INDEX: Item[] = PAGES.filter(
  (p) => p.category === 'tool' || p.category === 'vehicle' || p.category === 'hub',
).map((p) => ({
  name: p.tileName ?? p.h1,
  path: p.path,
  keywords: `${p.h1} ${p.tileName ?? ''} ${p.description} ${p.slug}`.toLowerCase(),
}));

const CHIPS = [
  { label: 'Towing capacity calculator', q: 'towing capacity calculator' },
  { label: 'Payload calculator', q: 'payload' },
  { label: 'Tongue weight', q: 'tongue weight' },
  { label: 'Tacoma towing', q: 'tacoma' },
  { label: 'F-150 towing', q: 'f-150' },
];

export default function SiteSearch() {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const matches = useMemo(() => {
    if (query === '') return [];
    return INDEX.filter((i) => i.keywords.includes(query)).slice(0, 8);
  }, [query]);

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        Search HitchMath
      </label>
      <div className="flex h-12 items-center gap-2 rounded-pill border border-line bg-surface px-4">
        <SearchIcon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" strokeWidth={1.5} />
        <input
          id="site-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. tacoma, payload, tongue weight"
          className="h-full w-full bg-transparent text-body text-ink placeholder:text-muted focus:outline-none"
        />
      </div>

      <ul className="mt-3 flex flex-wrap gap-2">
        {CHIPS.map((c) => (
          <li key={c.label}>
            <button
              type="button"
              onClick={() => setQ(c.q)}
              className="min-h-[36px] rounded-pill border border-line bg-surface px-4 text-small font-medium text-ink hover:border-brand"
            >
              {c.label}
            </button>
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mt-3">
        {query !== '' && (
          <div className="rounded-card border border-line bg-surface p-2 shadow-card">
            {matches.length === 0 ? (
              <p className="px-2 py-1 text-small text-muted">No pages match that yet.</p>
            ) : (
              <ul>
                {matches.map((m) => (
                  <li key={m.path}>
                    <Link
                      href={m.path}
                      prefetch={false}
                      className="block rounded-[8px] px-2 py-1.5 text-small text-ink hover:bg-band-2"
                    >
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
