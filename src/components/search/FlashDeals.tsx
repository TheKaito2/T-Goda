'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import IconStatic from '@/components/ui/IconStatic';
import StarRating from '@/components/ui/StarRating';
import { gsap } from '@/lib/gsap';
import { useToast } from '@/lib/toast';

const deals = [
  {
    id: 'mandala-sky',
    name: 'Mandala Sky Luxury Villas',
    location: 'Uluwatu, Bali • Cliff-top view',
    img: '/images/search-result/uluwatu-luxury-villa.png',
    price: 480,
    was: 1200,
    off: '60% OFF',
    code: 'FLASH60',
  },
  {
    id: 'emerald-jungle',
    name: 'Emerald Jungle Retreat',
    location: 'Ubud, Bali • Private Sanctuary',
    img: '/images/search-result/ubud-jungle-retreat.png',
    price: 247,
    was: 450,
    off: '45% OFF',
    code: 'FLASH45',
  },
  {
    id: 'seminyak-shores',
    name: 'Seminyak Shores Club',
    location: 'Seminyak, Bali • Beachfront Bliss',
    img: '/images/search-result/seminyak-beach-club-resort.png',
    price: 442,
    was: 680,
    off: '35% OFF',
    code: 'FLASH35',
  },
];

const INITIAL_SECONDS = 8 * 3600 + 45 * 60 + 12;

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export default function FlashDeals() {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>('[data-fd-row]'));
      if (!items.length) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 24 });
      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.55,
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
        { threshold: 0, rootMargin: '0px 0px -10% 0px' }
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

  const claim = async (code: string, name: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
    gsap.fromTo(btn, { x: 0 }, { x: 0, keyframes: [{ x: -6 }, { x: 6 }, { x: -4 }, { x: 4 }, { x: 0 }], duration: 0.45, ease: 'power2.out' });
    toast.success(`Code ${code} copied`, `Use it at checkout for ${name}`);
  };

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div
      className="rounded-[16px] p-1 shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]"
      style={{ background: 'linear-gradient(123.88deg, #005CBD 0%, #004591 100%)' }}
    >
      <section ref={ref} className="overflow-hidden rounded-[12px] bg-white">
        <div className="flex items-center justify-between bg-brand-deal/10 px-5 py-3">
          <div className="flex items-center gap-2 text-brand-deal">
            <IconStatic name="search-result/fire" size={20} className="text-brand-deal" />
            <h3 className="text-[18px] font-bold leading-7">Flash Deals for You</h3>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-ink-soft">Ends in:</span>
            <div className="flex items-center gap-1 font-mono text-[14px] font-bold leading-5 text-white">
              <span className="rounded-sm bg-brand-deal px-1.5 py-0.5">{pad(h)}</span>
              <span className="text-ink-soft">:</span>
              <span className="rounded-sm bg-brand-deal px-1.5 py-0.5">{pad(m)}</span>
              <span className="text-ink-soft">:</span>
              <span className="rounded-sm bg-brand-deal px-1.5 py-0.5">{pad(s)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-line/30">
          {deals.map((d) => (
            <article
              key={d.id}
              data-fd-row
              className="group relative flex h-[192px] cursor-pointer flex-col bg-white text-ink transition hover:bg-surface-cool md:flex-row"
            >
              <Link
                href={`/room?id=${d.id}`}
                aria-label={`View ${d.name}`}
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">View {d.name}</span>
              </Link>
              <div className="relative h-[180px] w-full shrink-0 overflow-hidden md:h-full md:w-[256px]">
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 256px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 z-20 rounded-md bg-brand-deal px-3 py-1 text-[14px] font-extrabold leading-5 text-white">
                  {d.off}
                </span>
              </div>
              <div className="relative z-0 flex flex-1 items-center justify-between p-5">
                <div className="flex -translate-y-[20px] flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[18px] leading-7 text-ink transition-colors group-hover:text-brand-primary">
                      {d.name}
                    </h4>
                    <StarRating value={5} size={14} />
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-[14px] text-ink-soft">
                    <IconStatic name="search-result/pin-location" size={14} className="text-ink-soft" />
                    {d.location}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[12px] leading-3 text-ink-soft line-through">
                    ${d.was.toLocaleString()}
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-[24px] font-bold leading-8 text-brand-deal">${d.price}</span>
                    <span className="text-[12px] text-ink-soft">/night</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => claim(d.code, d.name, e)}
                    className="relative z-20 mt-2 rounded-md bg-brand-deal px-4 py-1.5 text-[14px] font-bold leading-5 text-white transition hover:opacity-95"
                  >
                    Claim
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
