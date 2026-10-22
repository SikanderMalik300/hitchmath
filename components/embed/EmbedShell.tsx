import HeightReporter from './HeightReporter';

/** Chrome-free wrapper for an embedded calculator (embed spec section 2). */
export default function EmbedShell({
  toolName,
  fullHref,
  children,
}: {
  toolName: string;
  fullHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[720px] px-3 py-4">
      <p className="text-small text-muted">{toolName} · HitchMath</p>
      <div className="mt-3">{children}</div>
      <p className="mt-4 text-small">
        <a href={fullHref} target="_blank" rel="noopener" className="link">
          Open the full calculator ↗
        </a>
      </p>
      <HeightReporter />
    </div>
  );
}
