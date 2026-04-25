'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import IconStatic from '@/components/ui/IconStatic';
import { magnetic } from '@/lib/animations';

export default function SearchBar() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    return magnetic(el as unknown as HTMLElement, 0.25);
  }, []);

  const href = `/search?${new URLSearchParams({ q: destination, d: dates }).toString()}`;

  return (
    <div className="mx-auto flex w-[768px] max-w-full flex-col items-stretch gap-2 rounded-md border border-line-soft/40 bg-white p-2 shadow-card md:h-[68px] md:flex-row md:items-center md:gap-3">
      <label className="flex h-[48px] flex-1 items-center gap-3 rounded-sm bg-surface-input px-4 transition focus-within:ring-2 focus-within:ring-brand-primary/30 md:h-[52px]">
        <IconStatic name="home/search" size={18} className="text-ink-soft" />
        <input
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 bg-transparent text-[14px] font-medium text-ink placeholder:text-ink-soft focus:outline-none"
        />
      </label>
      <label className="flex h-[48px] flex-1 items-center gap-3 rounded-sm bg-surface-input px-4 transition focus-within:ring-2 focus-within:ring-brand-primary/30 md:h-[52px]">
        <IconStatic name="home/dates" size={18} className="text-ink-soft" />
        <input
          type="text"
          placeholder="Check in - Check out"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          className="flex-1 bg-transparent text-[14px] font-medium text-ink placeholder:text-ink-soft focus:outline-none"
        />
      </label>
      <Link
        ref={ctaRef}
        href={href}
        className="flex h-[48px] items-center justify-center gap-2 rounded-sm bg-brand-primary text-[14px] font-bold text-white transition hover:opacity-95 md:h-[52px] md:w-[151px]"
      >
        <IconStatic name="home/search-white" size={16} />
        Search
      </Link>
    </div>
  );
}
