// Affiliate link component (A10). rel="sponsored nofollow noopener" and a
// disclosure line. No affiliate links ship in v1, so it renders nothing unless
// explicitly given an href.
export default function AffiliateLink({
  href,
  children,
  disclosure = 'Affiliate link. We may earn a commission.',
}: {
  href?: string;
  children?: React.ReactNode;
  disclosure?: string;
}) {
  if (!href) return null;
  return (
    <span>
      <a href={href} rel="sponsored nofollow noopener" className="link">
        {children}
      </a>
      <span className="ml-1 text-small text-muted">({disclosure})</span>
    </span>
  );
}
