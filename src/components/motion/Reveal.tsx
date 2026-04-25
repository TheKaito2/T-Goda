'use client';
import { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  rootMargin?: string;
};

export default function Reveal({
  as,
  children,
  className,
  y = 24,
  delay = 0,
  duration = 0.7,
  rootMargin = '0px 0px -10% 0px',
}: Props) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(el, { opacity: 0, y });
      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power2.out',
        });
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0, rootMargin }
      );
      io.observe(el);
      const fallback = window.setTimeout(play, 2000);
      return () => {
        io.disconnect();
        window.clearTimeout(fallback);
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className} data-reveal>
      {children}
    </Tag>
  );
}
