'use client';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { splitChars } from '@/lib/animations';

export default function HeroAnimator({ scopeSelector = '[data-hero]' }: { scopeSelector?: string }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
  }, []);

  useGSAP(() => {
    const root = document.querySelector(scopeSelector);
    if (!root) return;

    const title = root.querySelector<HTMLElement>('[data-hero-title]');
    const sub = root.querySelector<HTMLElement>('[data-hero-sub]');
    const bar = root.querySelector<HTMLElement>('[data-hero-bar]');
    const image = root.querySelector<HTMLElement>('[data-hero-image]');

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (image) {
        gsap.fromTo(image, { scale: 1.1 }, { scale: 1, duration: 1.4, ease: 'power3.out' });
        gsap.to(image, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (title) {
        const chars = splitChars(title);
        gsap.from(chars, {
          y: 28,
          opacity: 0,
          duration: 0.55,
          stagger: 0.018,
          ease: 'power3.out',
          delay: 0.2,
        });
      }
      if (sub) gsap.from(sub, { y: 14, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.6 });
      if (bar) gsap.from(bar, { y: 18, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.8 });
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      [title, sub, bar, image].forEach((el) => el && gsap.set(el, { opacity: 1, y: 0, scale: 1 }));
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((s) => {
        if (s.trigger === root) s.kill();
      });
    };
  }, []);

  return null;
}
