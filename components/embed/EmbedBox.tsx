'use client';

import { useState } from 'react';

/** "Get this calculator for your site" box on each main tool page (embed spec section 3). */
export default function EmbedBox({
  toolName,
  toolPath,
  embedPath,
  height,
}: {
  toolName: string;
  toolPath: string; // e.g. /tongue-weight-calculator/
  embedPath: string; // e.g. /embed/tongue-weight-calculator/
  height: number;
}) {
  const [copied, setCopied] = useState(false);
  const origin = 'https://hitchmath.com';
  const embedUrl = `${origin}${embedPath}`;
  const toolUrl = `${origin}${toolPath}`;
  const snippet =
    `<iframe src="${embedUrl}" title="${toolName}" width="100%" height="${height}" ` +
    `style="border:0;max-width:720px" loading="lazy"></iframe>` +
    `<p style="font:13px/1.4 sans-serif;margin:4px 0 0">${toolName} by ` +
    `<a href="${toolUrl}">HitchMath</a></p>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <details className="rounded-card border border-line bg-surface p-5">
      <summary className="cursor-pointer font-medium text-ink">
        Get this calculator for your site
      </summary>
      <div className="mt-3 space-y-3">
        <p className="text-body text-ink">
          Free to use on your website. No sign-up. Copy the code below:
        </p>
        <div className="relative">
          <pre className="overflow-x-auto rounded-[8px] border border-line bg-band-2 p-3 text-small text-ink">
            <code>{snippet}</code>
          </pre>
          <button
            type="button"
            onClick={copy}
            className="mt-2 inline-flex min-h-[44px] items-center rounded-pill bg-brand px-4 text-small text-brand-ink"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-small text-muted">
          Please keep the credit link so readers can find the full calculator and its sources.
        </p>
        <p className="text-small">
          <a href={embedPath} target="_blank" rel="noopener" className="link">
            Preview the embed
          </a>
        </p>
        <p className="text-small text-muted">
          Advanced: add{' '}
          <a href="/embed/resize.js" target="_blank" rel="noopener" className="link">
            /embed/resize.js
          </a>{' '}
          to your page to auto-size the iframe height. The snippet works without it.
        </p>
      </div>
    </details>
  );
}
