import type { Metadata } from 'next';
import EmbedShell from '@/components/embed/EmbedShell';
import TowCalculator from '@/components/calculators/TowCalculator';

export const metadata: Metadata = {
  title: { absolute: 'Towing capacity calculator (embed)' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EmbedShell toolName="Towing capacity calculator" fullHref="/towing-capacity-calculator/">
      <TowCalculator />
    </EmbedShell>
  );
}
