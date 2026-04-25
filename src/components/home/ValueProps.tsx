'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import IconStatic from '@/components/ui/IconStatic';
import { gsap } from '@/lib/gsap';

const props = [
  {
    icon: 'home/tag' as const,
    color: 'bg-badge-blue/20 text-badge-blue',
    title: 'Best Price Guarantee',
    body: 'Find a lower price elsewhere and we’ll match it. Travel smart, save more.',
  },
  {
    icon: 'home/support' as const,
    color: 'bg-badge-pink/20 text-badge-pink',
    title: '24/7 Global Support',
    body: 'Our world-class support team is here to help you anywhere, anytime in 40+ languages.',
  },
  {
    icon: 'home/add-dates' as const,
    color: 'bg-badge-orange/20 text-badge-orange',
    title: 'Flexible Booking',
    body: 'Life happens. Most of our properties offer free cancellation for peace of mind.',
  },
];

export default function ValueProps() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-vp-card]'));
      const icons = Array.from(root.querySelectorAll<HTMLElement>('[data-vp-icon]'));
      if (!cards.length) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(cards, { opacity: 1, y: 0 });
        gsap.set(icons, { rotate: 0, scale: 1 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 32 });
      gsap.set(icons, { rotate: -180, scale: 0 });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        });
        gsap.to(icons, {
          rotate: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0, rootMargin: '0px 0px -15% 0px' }
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
    <section className="px-4 py-10 md:px-[42px] md:pb-[88px] md:pt-[88px]">
      <div ref={ref} className="mx-auto grid max-w-[1200px] grid-cols-1 gap-3 md:grid-cols-3">
        {props.map((p) => (
          <div
            key={p.title}
            data-vp-card
            className="flex h-[192px] flex-col items-center justify-center rounded-[12px] bg-[#E9E9E9] p-6 text-center transition hover:bg-[#E0E0E0]"
          >
            <div data-vp-icon className={`flex h-12 w-12 items-center justify-center rounded-full ${p.color}`}>
              <IconStatic name={p.icon} size={24} />
            </div>
            <h3 className="mt-3 text-[20px] font-bold leading-[28px] text-ink">{p.title}</h3>
            <p className="mt-1.5 max-w-[320px] text-[14px] leading-[20px] text-ink-soft">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
