import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { chevySilverado15002026 } from '@/lib/data/vehicles/chevy-silverado-1500-2026';
import { SILVERADO } from '@/lib/pages/vehicle-content';

const page = getPage('chevy-silverado-1500-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  // GM publishes no per-configuration payload in its 2026 documents, so FAQ 5
  // points to the door-jamb sticker and the payload calculator (no 2,260 claim).
  const faq = SILVERADO.faq.map((item, i) =>
    i === 4
      ? {
          ...item,
          aNode: (
            <>
              {item.a}{' '}
              <Link href="/payload-calculator/" prefetch={false} className="link">
                Use the payload calculator
              </Link>
              .
            </>
          ),
        }
      : item,
  );
  const content = { ...SILVERADO, faq };

  return (
    <VehiclePage
      page={page}
      data={chevySilverado15002026}
      content={content}
      mini={{ defaultId: '7-std-4x4', defaultTrailer: 7500, defaultPeople: 360, defaultCargo: 250 }}
    />
  );
}
