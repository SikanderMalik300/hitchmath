import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage from '@/components/SimplePage';
import { ProfilePage } from '@/components/JsonLd';
import { AUTHOR_PAGE_PARAGRAPHS } from '@/lib/content';

const page = getPage('authors/sikander-mushtaq');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page} schema={<ProfilePage />}>
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-pill bg-band-2 text-body font-semibold text-ink"
        >
          SM
        </span>
      </div>
      {AUTHOR_PAGE_PARAGRAPHS.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </SimplePage>
  );
}
