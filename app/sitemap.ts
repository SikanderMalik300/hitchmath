import type { MetadataRoute } from 'next';
import { PAGES, absUrl } from '@/lib/registry';
import { getPhoto } from '@/lib/data/photos';
import { photoAvailable, imagePath } from '@/lib/photos-runtime';
import { ogImagePath } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.filter((p) => p.inSitemap && p.verified !== false).map((p) => {
    // Each page's main photo when it is a verified, processed image; else the OG image.
    let image: string;
    if (p.photoId && photoAvailable(p.photoId)) {
      image = absUrl(imagePath(getPhoto(p.photoId), 1280, 'jpg'));
    } else {
      image = absUrl(ogImagePath(p.slug));
    }
    return {
      url: absUrl(p.path),
      lastModified: new Date(p.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: p.category === 'home' ? 1 : p.category === 'tool' || p.category === 'vehicle' ? 0.8 : 0.5,
      images: [image],
    };
  });
}
