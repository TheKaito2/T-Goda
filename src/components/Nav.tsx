'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import AuthModal from '@/components/auth/AuthModal';
import { magnetic } from '@/lib/animations';

const tabs = [
  { label: 'Hotels', href: '/' },
  { label: 'Flights', href: '/flights' },
  { label: 'Bundles', href: '/bundles' },
  { label: 'Activities', href: '/activities' },
];

export default function Nav() {
  const { user, hydrated, signOut } = useAuth();
  const toast = useToast();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const el = headerRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let lastY = 0;
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          if (y < 80) {
            gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' });
          } else if (y > lastY) {
            gsap.to(el, { y: -el.offsetHeight, duration: 0.3, ease: 'power2.in' });
          } else {
            gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' });
          }
          lastY = y;
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, { scope: headerRef });

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const cleanup = magnetic(el, 0.3);
    return cleanup;
  }, [user, hydrated]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!headerRef.current?.contains(target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  const onSignOut = () => {
    signOut();
    setMenuOpen(false);
    toast.info('Signed out', 'See you next adventure');
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-line/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      >
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
                    'text-[14px] font-semibold leading-[20px] tracking-[-0.35px] transition-colors',
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
            {hydrated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-white py-1 pl-1 pr-3 text-[13px] font-semibold text-ink transition hover:border-line"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-[12px] font-bold uppercase text-white">
                    {user.name.charAt(0)}
                  </span>
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                  <span aria-hidden className="text-ink-soft">▾</span>
                </button>
                {menuOpen ? (
                  <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-md border border-line/60 bg-white shadow-card">
                    <div className="border-b border-line/30 px-4 py-3">
                      <div className="text-[13px] font-semibold text-ink">{user.name}</div>
                      <div className="truncate text-[12px] text-ink-soft">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        toast.demo('Trips dashboard is on the roadmap');
                      }}
                      className="block w-full px-4 py-2 text-left text-[14px] hover:bg-surface-cool"
                    >
                      My trips
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        toast.demo('Wishlist page is on the roadmap');
                      }}
                      className="block w-full px-4 py-2 text-left text-[14px] hover:bg-surface-cool"
                    >
                      Wishlist
                    </button>
                    <button
                      type="button"
                      onClick={onSignOut}
                      className="block w-full border-t border-line/30 px-4 py-2 text-left text-[14px] text-rose-600 hover:bg-surface-cool"
                    >
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthOpen(true);
                  }}
                  className="hidden text-[14px] font-semibold leading-[20px] text-ink-nav hover:text-ink sm:inline-block"
                >
                  Sign In
                </button>
                <button
                  ref={ctaRef}
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthOpen(true);
                  }}
                  className="rounded-sm bg-brand-primary px-3.5 py-2 text-[13px] font-semibold leading-[20px] text-white transition hover:opacity-90 md:px-[18px] md:py-[10px] md:text-[14px]"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </>
  );
}
