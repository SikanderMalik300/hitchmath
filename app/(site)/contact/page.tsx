import type { Metadata } from 'next';
import { getPage, SITE } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage from '@/components/SimplePage';
import ContactForm from '@/components/ContactForm';

const page = getPage('contact');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page}>
      <p>
        Email:{' '}
        <a href={`mailto:${SITE.email}`} className="link">
          {SITE.email}
        </a>
      </p>
      <ContactForm />
    </SimplePage>
  );
}
