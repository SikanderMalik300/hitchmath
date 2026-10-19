// Monetization-ready, switched off (A10). Reserves height but renders nothing
// until NEXT_PUBLIC_ADSENSE_ID is set. Never place between inputs and result,
// never above a tool on mobile.
export default function AdSlot({
  minHeight = 90,
  label = 'ad',
}: {
  minHeight?: number;
  label?: string;
}) {
  const enabled = Boolean(process.env.NEXT_PUBLIC_ADSENSE_ID);
  if (!enabled) return null;
  return (
    <div
      data-ad-slot={label}
      style={{ minHeight }}
      aria-hidden="true"
      className="w-full"
    />
  );
}
