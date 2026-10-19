import { getPhoto, type PhotoId } from '@/lib/data/photos';
import { photoAvailable, imagePath } from '@/lib/photos-runtime';

interface PictureProps {
  id: PhotoId;
  widths: number[]; // available processed widths, largest first used as <img> src
  sizes: string; // responsive sizes attribute
  width: number; // intrinsic width for the <img>
  height: number; // intrinsic height for the <img>
  priority?: boolean;
  className?: string;
}

/** <picture> AVIF -> WebP -> JPEG with explicit dimensions (design 7). */
function Picture({ id, widths, sizes, width, height, priority, className }: PictureProps) {
  const photo = getPhoto(id);
  const srcset = (ext: 'avif' | 'webp' | 'jpg') =>
    widths.map((w) => `${imagePath(photo, w, ext)} ${w}w`).join(', ');
  const fallback = imagePath(photo, widths[0], 'jpg');
  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallback}
        srcSet={srcset('jpg')}
        sizes={sizes}
        width={width}
        height={height}
        alt={photo.alt}
        className={className}
        style={{ objectPosition: `${photo.focalX}% ${photo.focalY}%` }}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'auto' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  );
}

/** Colour block used for a pending (or unavailable) photo slot. */
function ColorBlock({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-band-2 p-4 text-center ${className ?? ''}`}
      aria-hidden="true"
    >
      <span className="text-small text-muted">{label}</span>
    </div>
  );
}

/** Hero photo (home + towing-capacity-calculator). Fills its container. */
export function HeroPhoto({ id, label }: { id: PhotoId; label: string }) {
  if (!photoAvailable(id)) {
    return <ColorBlock label={label} className="h-full w-full" />;
  }
  return (
    <Picture
      id={id}
      widths={[1280, 640]}
      sizes="(min-width: 768px) 45vw, 100vw"
      width={1280}
      height={960}
      priority
      className="h-full w-full object-cover"
    />
  );
}

/** Square tile image. */
export function TilePhoto({ id, label }: { id: PhotoId; label: string }) {
  if (!photoAvailable(id)) {
    return <ColorBlock label={label} className="aspect-square w-full rounded-photo" />;
  }
  return (
    <Picture
      id={id}
      widths={[600, 300]}
      sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
      width={600}
      height={600}
      className="aspect-square w-full rounded-photo object-cover transition-transform duration-200 group-hover:scale-[1.02] motion-reduce:transform-none"
    />
  );
}

/** Figure photo on a vehicle page, with a caption credit. */
export function FigurePhoto({ id, label }: { id: PhotoId; label: string }) {
  const photo = getPhoto(id);
  if (!photoAvailable(id)) {
    return (
      <ColorBlock label={label} className="aspect-[16/9] w-full rounded-photo" />
    );
  }
  return (
    <figure>
      <Picture
        id={id}
        widths={[1280, 640]}
        sizes="(min-width: 768px) 720px, 100vw"
        width={1280}
        height={720}
        className="aspect-[16/9] w-full rounded-photo object-cover"
      />
      <figcaption className="mt-2 text-small text-muted">
        Photo: {photo.photographer} / {photo.source}
      </figcaption>
    </figure>
  );
}
