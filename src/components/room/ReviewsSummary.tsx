'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

const subscores = [
  { label: 'Cleanliness', value: 9.5 },
  { label: 'Service', value: 9.2 },
  { label: 'Location', value: 8.9 },
];

type Props = { score?: number; reviews?: number };

export default function ReviewsSummary({ score = 9.2, reviews = 1248 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const bars = Array.from(el.querySelectorAll<HTMLElement>('[data-rs-bar]'));

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        gsap.set(bars, { scaleX: 1 });
        if (numRef.current) numRef.current.textContent = score.toFixed(1);
        return;
      }

      gsap.set(el, { opacity: 0, y: 16 });
      gsap.set(bars, { scaleX: 0, transformOrigin: 'left center' });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
        gsap.to(bars, { scaleX: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 });
        if (numRef.current) {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: score,
            duration: 1,
            ease: 'power2.out',
            onUpdate: () => {
              if (numRef.current) numRef.current.textContent = obj.v.toFixed(1);
            },
          });
        }
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0, rootMargin: '0px 0px -10% 0px' }
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
    <section ref={ref} className="rounded-[16px] border border-[#C2C6D5]/30 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[20px] font-bold leading-7 text-ink">Excellent</h3>
          <p className="mt-1 text-[14px] text-ink-soft">{reviews.toLocaleString()} verified reviews</p>
        </div>
        <div
          ref={numRef}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-brand-primary text-[20px] font-bold leading-none text-white"
        >
          {score.toFixed(1)}
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {subscores.map((s) => (
          <li key={s.label}>
            <div className="flex items-center justify-between text-[14px] text-ink">
              <span>{s.label}</span>
              <span className="font-bold">{s.value}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E7E8F1]">
              <div
                data-rs-bar
                className="h-full rounded-full bg-brand-primary"
                style={{ width: `${(s.value / 10) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
