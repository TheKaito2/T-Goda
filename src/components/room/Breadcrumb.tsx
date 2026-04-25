import Link from 'next/link';

type Props = {
  hotelName?: string;
  city?: string;
};

export default function Breadcrumb({ hotelName = 'Grand Azure Resort & Spa', city = 'Crete' }: Props) {
  const trail = [
    { label: 'Home', href: '/' },
    { label: city, href: '/search' },
    { label: `${city} Hotels`, href: '/search' },
    { label: hotelName, current: true, href: undefined },
  ];
  return (
    <nav className="text-[14px] text-ink-soft">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-line">›</span>}
            {t.current || !t.href ? (
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
