import Link from 'next/link';
import IconStatic from './ui/IconStatic';

const columns: Array<{
  heading: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Support', href: '/support' },
      { label: 'Mobile App', href: '/mobile-app' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socials = [
  { label: 'Facebook', icon: 'footer/facebook' as const, href: 'https://www.facebook.com/' },
  { label: 'Instagram', icon: 'footer/instagram' as const, href: 'https://www.instagram.com/' },
  { label: 'Twitter', icon: 'footer/twitter' as const, href: 'https://twitter.com/' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-footer-bg">
      <div className="mx-auto flex max-w-frame flex-col gap-10 px-6 pb-12 pt-12 md:flex-row md:gap-8 md:pb-12">
        <div className="flex w-full flex-col gap-4 md:w-[600px]">
          <Link href="/" className="text-[20px] font-bold leading-[28px] text-footer-heading">
            T-Goda
          </Link>
          <p className="max-w-[376px] text-[14px] leading-[20px] text-footer-muted">
            Making world travel accessible, affordable, and delightful for everyone since 2024. Your
            journey starts here.
          </p>
          <p className="text-[14px] leading-[20px] text-footer-muted">
            © 2024 T-Goda Booking. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                aria-label={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted transition hover:scale-110 hover:text-footer-heading"
              >
                <IconStatic name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 md:w-[600px]">
          {columns.map((col) => (
            <div key={col.heading}>
              <div className="text-[14px] font-bold leading-[20px] text-footer-heading">
                {col.heading}
              </div>
              <ul className="mt-3 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[14px] leading-[20px] text-footer-muted transition hover:text-footer-heading"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
