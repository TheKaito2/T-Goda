'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import IconStatic from '@/components/ui/IconStatic';
import { gsap } from '@/lib/gsap';
import { useToast } from '@/lib/toast';

export type FilterState = {
  price: number;
  type: string[];
  stars: number[];
  facilities: string[];
  reviewScore: string[];
  neighborhoods: string[];
  bedTypes: string[];
};

type Props = {
  state: FilterState;
  onPrice: (v: number) => void;
  onToggle: (key: keyof Omit<FilterState, 'price'>, value: string | number) => void;
  onClear: () => void;
};

const filterGroups = [
  { key: 'type', heading: 'Property Type', options: ['Hotels', 'Resorts', 'Apartments', 'Villas'] as const },
  { key: 'stars', heading: 'Star Rating', options: [5, 4, 3, 2] as const },
  { key: 'facilities', heading: 'Facilities', options: ['Free Wi-Fi', 'Swimming Pool', 'Fitness Center', 'Spa', 'Parking', 'Pet Friendly'] as const },
  { key: 'reviewScore', heading: 'Review Score', options: ['Superb 9+', 'Very Good 8+', 'Good 7+'] as const },
  { key: 'neighborhoods', heading: 'Neighborhood', options: ['Patong', 'Karon', 'Kata', 'Kamala', 'Ubud', 'Seminyak', 'Nusa Dua', 'Uluwatu'] as const },
  { key: 'bedTypes', heading: 'Bed Type', options: ['Single', 'Double', 'King'] as const },
] as const;

export default function FilterSidebar({ state, onPrice, onToggle, onClear }: Props) {
  const toast = useToast();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sidebarRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(sidebarRef.current, { x: -40, opacity: 0, duration: 0.6, ease: 'power3.out' });
      });
      return () => mm.revert();
    },
    { scope: sidebarRef }
  );

  const fillPct = (state.price / 1000) * 100;
  const openMap = () => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent('Bali hotels')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside className="w-full shrink-0 lg:w-[256px]" ref={sidebarRef}>
      <div className="rounded-lg border border-line/40 bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconStatic name="search-result/filter" size={18} className="text-ink" />
            <h3 className="text-[18px] leading-7 text-ink">Filters</h3>
          </div>
          <button
            type="button"
            onClick={() => {
              onClear();
              toast.info('Filters cleared');
            }}
            className="text-[12px] text-brand-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-ink">Price Range</span>
            <span className="text-[12px] font-semibold text-brand-primary">${state.price}</span>
          </div>
          <div
            className="relative mt-3 h-1 rounded-full bg-line/60"
            aria-hidden
          >
            <div
              className="h-full rounded-full bg-brand-primary transition-[width] duration-150 ease-out"
              style={{ width: `${fillPct}%` }}
            />
          </div>
          <input
            type="range"
            min={50}
            max={1000}
            step={10}
            value={state.price}
            onChange={(e) => onPrice(Number(e.target.value))}
            className="-mt-3 w-full accent-brand-primary"
            aria-label="Maximum price"
          />
          <div className="mt-1 flex justify-between text-[12px] text-ink-soft">
            <span>$50</span>
            <span>$1000+</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {filterGroups.map((group) => {
            const selected = state[group.key as keyof FilterState] as Array<string | number>;
            return (
              <div key={group.heading} className="border-t border-line/30 pt-5">
                <div className="text-[14px] font-semibold text-ink">{group.heading}</div>
                <ul className="mt-3 space-y-2.5">
                  {group.options.map((opt) => {
                    const checked = selected.includes(opt as string | number);
                    return (
                      <li key={String(opt)} className="flex items-center gap-2.5">
                        <label className="flex cursor-pointer items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              onToggle(group.key as keyof Omit<FilterState, 'price'>, opt as string | number)
                            }
                            className="h-[19px] w-[19px] rounded-[3.5px] border border-line accent-brand-primary"
                          />
                          {group.heading === 'Star Rating' ? (
                            <span className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <IconStatic
                                  key={i}
                                  name={i < (opt as number) ? 'search-result/star' : 'search-result/hollow-star'}
                                  size={14}
                                  className={i < (opt as number) ? 'text-star' : 'text-ink-soft/40'}
                                />
                              ))}
                            </span>
                          ) : (
                            <span className="text-[14px] text-ink">{opt}</span>
                          )}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative mt-4 h-[160px] w-full overflow-hidden rounded-[12px]">
        <Image
          src="/images/search-result/map.png"
          alt="Bali map"
          fill
          sizes="256px"
          className="object-cover"
        />
        <button
          type="button"
          onClick={openMap}
          className="absolute left-1/2 top-1/2 inline-flex h-[40px] w-[148px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full bg-white text-[14px] font-semibold text-brand-primary shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] transition hover:scale-105 hover:bg-white"
        >
          <IconStatic name="search-result/map" size={16} className="text-brand-primary" />
          View on Map
        </button>
      </div>
    </aside>
  );
}
