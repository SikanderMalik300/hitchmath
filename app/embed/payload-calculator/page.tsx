import type { Metadata } from 'next';
import EmbedShell from '@/components/embed/EmbedShell';
import PayloadCalculator from '@/components/calculators/PayloadCalculator';

export const metadata: Metadata = {
  title: { absolute: 'Payload calculator (embed)' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EmbedShell toolName="Payload calculator" fullHref="/payload-calculator/">
      <PayloadCalculator />
    </EmbedShell>
  );
}
