'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export default function ComingSoon({ eyebrow = 'Coming soon', title, body }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('[data-cs-eyebrow]', { y: 16, opacity: 0, duration: 0.5 })
          .from('[data-cs-title]', { y: 24, opacity: 0, duration: 0.6 }, '-=0.25')
          .from('[data-cs-body]', { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
          .from('[data-cs-cta]', { y: 12, opacity: 0, duration: 0.45 }, '-=0.25')
          .from('[data-cs-shape]', { scale: 0, rotate: -45, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.5');
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <main ref={ref} className="relative isolate overflow-hidden bg-surface-page">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div data-cs-shape className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl" />
        <div data-cs-shape className="absolute right-0 top-40 h-80 w-80 rounded-full bg-brand-deal/10 blur-3xl" />
        <div data-cs-shape className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-brand-success/10 blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-frame flex-col items-center px-6 py-24 text-center md:py-32">
        <span
          data-cs-eyebrow
          className="rounded-full border border-brand-primary/30 bg-white px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-primary"
        >
          {eyebrow}
        </span>
        <h1
          data-cs-title
          className="mt-6 max-w-3xl text-[40px] font-extrabold leading-tight tracking-[-1px] text-ink md:text-[64px] md:leading-[1.05]"
        >
          {title}
        </h1>
        <p
          data-cs-body
          className="mt-5 max-w-xl text-[16px] leading-[1.6] text-ink-soft md:text-[18px]"
        >
          {body ??
            'We&rsquo;re polishing the final details for this section. In the meantime, keep exploring T-Goda &mdash; your next adventure is waiting on the home page.'}
        </p>
        <div data-cs-cta className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-sm bg-brand-primary px-5 py-3 text-[14px] font-semibold text-white transition hover:opacity-90"
          >
            Back to home
          </Link>
          <Link
            href="/search"
            className="rounded-sm border border-line/60 bg-white px-5 py-3 text-[14px] font-semibold text-ink transition hover:border-line"
          >
            Browse hotels
          </Link>
        </div>
      </div>
    </main>
  );
}
