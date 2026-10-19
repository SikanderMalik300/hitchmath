// Which photos were actually downloaded and processed by scripts/gen-assets.mjs.
// A verified photo only renders as an image when its files exist; otherwise it
// falls back to a colour block (same as a pending slot). No broken images.
import manifest from './generated/photo-manifest.json';
import { getPhoto, type PhotoId, type Photo } from './data/photos';

const MANIFEST = manifest as Record<string, boolean>;

export function photoAvailable(id: PhotoId): boolean {
  const photo = getPhoto(id);
  return photo.status === 'verified' && MANIFEST[id] === true && photo.file !== '';
}

export function imagePath(photo: Photo, width: number, ext: 'avif' | 'webp' | 'jpg'): string {
  return `/images/${photo.file}-${width}.${ext}`;
}
