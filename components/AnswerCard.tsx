import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Thin-bordered answer card: key number, one sentence, one link (design 5). */
export default function AnswerCard({
  children,
  href,
  linkLabel,
}: {
  children: React.ReactNode;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-card border border-line bg-surface p-6 shadow-card">
      <p className="text-body text-ink tabular">{children}</p>
      <Link
        href={href}
        prefetch={false}
        className="mt-4 inline-flex items-center gap-1 text-small text-brand hover:underline underline-offset-2"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
