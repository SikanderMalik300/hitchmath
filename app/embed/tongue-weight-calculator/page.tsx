import type { Metadata } from 'next';
import EmbedShell from '@/components/embed/EmbedShell';
import TongueCalculator from '@/components/calculators/TongueCalculator';

export const metadata: Metadata = {
  title: { absolute: 'Tongue weight calculator (embed)' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EmbedShell toolName="Tongue weight calculator" fullHref="/tongue-weight-calculator/">
      <TongueCalculator />
    </EmbedShell>
  );
}
