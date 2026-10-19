import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage, { H2 } from '@/components/SimplePage';

const page = getPage('privacy');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page}>
      <p>
        This page names the services that process data when you use HitchMath. We do not sell
        personal data.
      </p>

      <H2>Cloudflare</H2>
      <p>
        Cloudflare hosts the site and provides privacy-friendly Web Analytics. Cloudflare Web
        Analytics does not use cookies and does not fingerprint visitors.
      </p>

      <H2>Web3Forms</H2>
      <p>
        The contact form is handled by Web3Forms. When you send a message, your name, email and
        message are passed to Web3Forms to deliver the email to us.
      </p>

      <H2>Google Analytics 4</H2>
      <p>
        Google Analytics 4 loads only once it is turned on. When it is, it runs with Consent Mode v2,
        denied by default in the EEA, the UK and Switzerland until you allow it, with IP anonymised
        and a 14-month data retention. It is off at launch.
      </p>

      <p>
        Advertising is not live yet. When display ads are added, this page will gain a section that
        names the ad provider before any ad code runs.
      </p>
    </SimplePage>
  );
}
