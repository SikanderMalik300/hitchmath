import type { Metadata } from 'next';
import { absUrl, SITE, type PageEntry } from './registry';

export function ogImagePath(slug: string): string {
  return `/og/${slug === '' ? 'home' : slug.replace(/\//g, '-')}.png`;
}

export function buildMetadata(page: PageEntry): Metadata {
  const canonical = page.path;
  return {
    title: { absolute: page.title },
    description: page.meta,
    alternates: { canonical },
    openGraph: {
      type: page.category === 'vehicle' ? 'article' : 'website',
      url: absUrl(page.path),
      siteName: SITE.name,
      title: page.title,
      description: page.meta,
      images: [
        {
          url: ogImagePath(page.slug),
          width: 1200,
          height: 630,
          alt: page.h1,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta,
      images: [ogImagePath(page.slug)],
    },
  };
}
