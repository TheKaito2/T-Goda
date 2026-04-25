import Link from 'next/link';

const tabs = [
  { label: 'Hotels', href: '/' },
  { label: 'Flights', href: '#' },
  { label: 'Bundles', href: '#' },
  { label: 'Activities', href: '#' },
];

export default function Nav() {
  return (
    <header className="border-b border-line/40 bg-white">
      <div className="mx-auto flex h-[72px] max-w-frame items-center px-5 md:h-[89px] md:px-[42px]">
        <Link
          href="/"
          className="text-[20px] font-extrabold leading-[28px] tracking-[-1.2px] text-brand-logo md:text-[24px] md:leading-[32px]"
        >
          T-Goda
        </Link>

        <nav className="ml-8 hidden items-center gap-8 lg:flex">
          {tabs.map((t) => {
            const active = t.label === 'Hotels';
            return (
              <Link
                key={t.label}
                href={t.href}
                className={[
                  'text-[14px] font-semibold leading-[20px] tracking-[-0.35px]',
                  active
                    ? 'border-b-2 border-brand-logo pb-1 text-ink'
                    : 'text-ink-nav hover:text-ink',
                ].join(' ')}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <button
            type="button"
            className="hidden text-[14px] font-semibold leading-[20px] text-ink-nav hover:text-ink sm:inline-block"
          >
            Sign In
          </button>
          <button
            type="button"
            className="rounded-sm bg-brand-primary px-3.5 py-2 text-[13px] font-semibold leading-[20px] text-white hover:opacity-90 md:px-[18px] md:py-[10px] md:text-[14px]"
          >
            Create Account
          </button>
        </div>
      </div>
    </header>
  );
}
