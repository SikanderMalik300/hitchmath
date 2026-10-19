import Link from 'next/link';

const NAV = [
  { label: 'Calculators', href: '/towing-calculators/' },
  { label: 'Towing by vehicle', href: '/towing-capacity/' },
  { label: 'How we calculate', href: '/how-we-calculate/' },
  { label: 'About', href: '/about/' },
];

export default function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="HitchMath home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/hitchmath-icon.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-[22px] font-semibold leading-none">
            <span className="text-brand">Hitch</span>
            <span className="text-ink">Math</span>
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-small">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-ink hover:text-brand hover:underline underline-offset-2"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
