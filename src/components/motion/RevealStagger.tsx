'use client';
import { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  rootMargin?: string;
};

export default function RevealStagger({
  as,
  children,
  className,
  selector,
  y = 28,
  stagger = 0.1,
  duration = 0.7,
  delay = 0,
  rootMargin = '0px 0px -10% 0px',
}: Props) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const items: HTMLElement[] = selector
        ? Array.from(root.querySelectorAll<HTMLElement>(selector))
        : (Array.from(root.children) as HTMLElement[]);
      if (!items.length) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y });
      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
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
      io.observe(root);
      const fallback = window.setTimeout(play, 2000);
      return () => {
        io.disconnect();
        window.clearTimeout(fallback);
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className} data-reveal-stagger>
      {children}
    </Tag>
  );
}
