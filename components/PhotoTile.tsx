import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TilePhoto } from './Photo';
import type { PhotoId } from '@/lib/data/photos';

/** Square photo tile; the whole tile is one link (design 5). */
export default function PhotoTile({
  href,
  name,
  line,
  photoId,
}: {
  href: string;
  name: string;
  line?: string;
  photoId?: PhotoId;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group block rounded-photo focus-visible:outline-none"
    >
      {photoId ? (
        <TilePhoto id={photoId} label={name} />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-photo bg-band-2 p-4 text-center">
          <span className="text-small text-muted">{name}</span>
        </div>
      )}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="font-medium text-ink group-hover:underline underline-offset-2">
          {name}
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.5} />
      </div>
      {line && <p className="mt-1 text-small text-muted">{line}</p>}
    </Link>
  );
}
