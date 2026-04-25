'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import IconStatic from '@/components/ui/IconStatic';
import StarRating from '@/components/ui/StarRating';
import HeartButton from '@/components/ui/HeartButton';
import { gsap } from '@/lib/gsap';
import type { Hotel } from '@/lib/mock-hotels';

const amenityIconMap: Record<string, `search-result/${string}` | undefined> = {
  'Free Wi-Fi': 'search-result/wifi',
  Pool: 'search-result/swim',
  Breakfast: 'search-result/breakfast',
  'Private Beach': 'search-result/umbrella',
  Spa: 'search-result/spa',
  'Airport Shuttle': 'search-result/shutter',
  Gym: 'search-result/gym',
};

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(el, { opacity: 0, y: 24 });
      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(el, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' });
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

  const onEnter = () => {
    gsap.to(ref.current, { y: -4, duration: 0.3, ease: 'power3.out' });
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.5, ease: 'power3.out' });
  };
  const onLeave = () => {
    gsap.to(ref.current, { y: 0, duration: 0.4, ease: 'power3.out' });
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power3.out' });
  };

  const href = `/room?id=${hotel.id}`;

  return (
    <article
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[12px] border border-line/60 bg-white shadow-sm transition-shadow duration-300 hover:shadow-card md:h-[256px] md:flex-row"
    >
      <Link
        href={href}
        aria-label={`View ${hotel.name}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">View {hotel.name}</span>
      </Link>

      <div className="relative h-[200px] w-full shrink-0 overflow-hidden md:h-full md:w-[320px]">
        <div ref={imgRef} className="absolute inset-0">
          <Image src={hotel.img} alt={hotel.name} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
        </div>
        {hotel.topChoice && (
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 pb-[4.41px] pt-[3px] text-[12px] font-bold uppercase tracking-wide text-brand-primary shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] backdrop-blur-[4px]">
            <IconStatic name="search-result/verified" size={14} className="text-brand-primary" />
            Top Choice
          </span>
        )}
        <div className="absolute right-3 top-3 z-20">
          <HeartButton id={hotel.id} label={hotel.name} className="h-9 w-9 bg-white/90 text-ink shadow-sm hover:bg-white" />
        </div>
      </div>

      <div className="relative z-0 flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[20px] leading-7 text-ink transition-colors group-hover:text-brand-primary">
                {hotel.name}
              </h3>
              <StarRating value={hotel.stars} size={14} />
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-[14px] text-ink-soft">
              <IconStatic name="search-result/pin-location" size={14} className="text-ink-soft" />
              {hotel.locationLabel}
            </p>
          </div>
          <div className="flex flex-col items-end rounded-md bg-brand-primary/10 px-3 py-2 text-right">
            <span className="text-[14px] font-bold leading-5 text-brand-primary">
              {hotel.reviewScore.toFixed(1)} {hotel.reviewLabel}
            </span>
            <span className="mt-0.5 text-[12px] leading-4 text-ink-soft">
              {hotel.reviews.toLocaleString()} reviews
            </span>
          </div>
        </div>

        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
          {hotel.amenities.slice(0, 6).map((a) => {
            const icon = amenityIconMap[a];
            return (
              <li
                key={a}
                className="flex items-center gap-1.5 rounded-sm bg-surface-cool px-2 py-1 text-[12px] leading-4 text-ink"
              >
                {icon && <IconStatic name={icon} size={14} className="text-ink-soft" />}
                {a}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4">
          <p className="text-[12px] leading-4 text-ink-soft">{hotel.note}</p>
          <div className="flex flex-col items-end">
            {hotel.was && (
              <span className="text-[12px] leading-3 text-ink-soft line-through">${hotel.was}</span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-[24px] font-semibold leading-8 text-brand-deal">${hotel.price}</span>
              <span className="text-[12px] text-ink-soft">/night</span>
            </div>
            <Link
              href={href}
              className="relative z-20 mt-2 rounded-sm bg-brand-deal px-5 py-2 text-[16px] font-semibold text-white transition hover:scale-105 hover:opacity-95"
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
