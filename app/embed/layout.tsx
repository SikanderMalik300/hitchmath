import type { Metadata } from 'next';

// Embed routes: no site chrome, no analytics, system font (the root layout sets no
// --font-manrope, so the body falls back to system-ui). noindex, follow.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-bg text-ink">{children}</div>;
}
