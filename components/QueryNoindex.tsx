'use client';

import { useEffect } from 'react';

/**
 * Parameter URLs (calculator state in the query string) must carry
 * <meta name="robots" content="noindex"> (A3). Static export serves one HTML
 * file per route, so we add the tag client-side when a query string is present.
 */
export default function QueryNoindex() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.search && window.location.search.length > 1) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex';
      document.head.appendChild(meta);
    }
  }, []);
  return null;
}
