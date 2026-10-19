'use client';

import Script from 'next/script';
import { useState } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CF_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

/**
 * Cloudflare Web Analytics loads when its token is set. GA4 loads only when
 * NEXT_PUBLIC_GA_ID is set, with Consent Mode v2 denied by default and a small
 * banner to grant it (A9). Nothing renders in v1 (both env vars empty).
 */
export default function Analytics() {
  const [consent, setConsent] = useState<'unset' | 'granted' | 'denied'>('unset');

  return (
    <>
      {CF_TOKEN && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="lazyOnload"
          data-cf-beacon={`{"token": "${CF_TOKEN}"}`}
        />
      )}

      {GA_ID && (
        <>
          <Script id="ga-consent" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga-init" strategy="lazyOnload">
            {`gtag('js', new Date()); gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>

          {consent === 'unset' && (
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface p-4 text-small">
              <div className="container-x flex flex-wrap items-center justify-between gap-3">
                <p className="text-ink">
                  We use privacy-friendly analytics. Allow analytics cookies?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setConsent('granted');
                      window.gtag?.('consent', 'update', {
                        analytics_storage: 'granted',
                      });
                    }}
                    className="min-h-[44px] rounded-pill bg-brand px-4 text-brand-ink"
                  >
                    Allow
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsent('denied')}
                    className="min-h-[44px] rounded-pill border border-line px-4 text-ink"
                  >
                    No thanks
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
