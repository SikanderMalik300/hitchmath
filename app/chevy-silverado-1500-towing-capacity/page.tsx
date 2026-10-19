import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import {
  chevySilverado15002026,
  SILVERADO_MAX_PAYLOAD_VERIFIED,
} from '@/lib/data/vehicles/chevy-silverado-1500-2026';
import { SILVERADO } from '@/lib/pages/vehicle-content';

const page = getPage('chevy-silverado-1500-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  // FAQ 5 (max payload 2,260 lb) shows only when the payload VERIFY passes.
  const content = {
    ...SILVERADO,
    faq: SILVERADO_MAX_PAYLOAD_VERIFIED ? SILVERADO.faq : SILVERADO.faq.slice(0, 4),
  };

  return (
    <VehiclePage
      page={page}
      data={chevySilverado15002026}
      content={content}
      mini={{ defaultId: '7-std-4x4', defaultTrailer: 7500, defaultPeople: 360, defaultCargo: 250 }}
    />
  );
}
