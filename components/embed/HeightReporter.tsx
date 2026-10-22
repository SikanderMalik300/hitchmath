'use client';

import { useEffect } from 'react';

/**
 * Posts the embed's content height to the parent window so a host page can size the
 * iframe. Harmless if the host ignores it. Fires on load and on every resize.
 */
export default function HeightReporter() {
  useEffect(() => {
    const post = () => {
      const h = document.documentElement.scrollHeight;
      try {
        window.parent.postMessage({ hitchmathHeight: h }, '*');
      } catch {
        /* cross-origin parent that blocks postMessage: ignore */
      }
    };
    post();
    const ro = new ResizeObserver(post);
    ro.observe(document.body);
    window.addEventListener('load', post);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', post);
    };
  }, []);
  return null;
}
