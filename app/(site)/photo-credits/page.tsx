import type { Metadata } from 'next';
import { getPage, PAGES_BY_SLUG } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage, { H2 } from '@/components/SimplePage';
import { PHOTO_LIST, type Photo } from '@/lib/data/photos';

const page = getPage('photo-credits');
export const metadata: Metadata = buildMetadata(page);

// Group every photo under the first page it appears on, so each photo is listed once.
function groups(): { label: string; photos: Photo[] }[] {
  const by = new Map<string, Photo[]>();
  for (const photo of PHOTO_LIST) {
    const slug = photo.usedOn[0] ?? '';
    if (!by.has(slug)) by.set(slug, []);
    by.get(slug)!.push(photo);
  }
  return [...by.entries()].map(([slug, photos]) => {
    const p = PAGES_BY_SLUG[slug];
    const label = slug === '' ? 'Home' : (p?.tileName ?? p?.h1 ?? slug);
    return { label, photos };
  });
}

export default function Page() {
  return (
    <SimplePage page={page}>
      <p>
        Every photo on HitchMath is used under the Unsplash or Pexels license. Each one is listed
        below under the page it appears on, with the photographer and the source.
      </p>
      {groups().map((g) => (
        <section key={g.label} className="space-y-2">
          <H2>{g.label}</H2>
          <ul className="space-y-2 text-small text-muted">
            {g.photos.map((photo) => (
              <li key={photo.id}>
                {photo.alt} ·{' '}
                <a href={photo.photographerUrl} target="_blank" rel="noopener" className="link">
                  {photo.photographer}
                </a>{' '}
                /{' '}
                <a href={photo.sourceUrl} target="_blank" rel="noopener" className="link">
                  {photo.source}
                </a>{' '}
                ({photo.license})
              </li>
            ))}
          </ul>
        </section>
      ))}
    </SimplePage>
  );
}
