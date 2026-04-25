import Link from 'next/link';

const trail = [
  { label: 'Home', href: '/' },
  { label: 'Greece', href: '#' },
  { label: 'Crete Hotels', href: '/search' },
  { label: 'Grand Azure Resort & Spa', href: '#', current: true },
];

export default function Breadcrumb() {
  return (
    <nav className="text-[14px] text-ink-soft">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-line">›</span>}
            {t.current ? (
              <span className="font-semibold text-ink">{t.label}</span>
            ) : (
              <Link href={t.href} className="hover:text-ink hover:underline">
                {t.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
