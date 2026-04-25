'use client';
import { useState } from 'react';
import IconStatic from '@/components/ui/IconStatic';
import { useToast } from '@/lib/toast';

const initial = {
  destination: 'Bali, Indonesia',
  dates: 'Oct 12 - Oct 19, 2024',
  travelers: '2 Adults, 1 Room',
};

export default function SearchHero() {
  const toast = useToast();
  const [fields, setFields] = useState(initial);

  return (
    <section className="border-b border-line/40 bg-white">
      <div className="mx-auto max-w-frame px-4 py-4 md:px-[42px] md:py-6">
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          <Field
            label="Destination"
            icon="search-result/pin-location"
            value={fields.destination}
            onChange={(v) => setFields((f) => ({ ...f, destination: v }))}
            className="flex-1 min-w-[280px]"
          />
          <Field
            label="Dates"
            icon="search-result/date"
            value={fields.dates}
            onChange={(v) => setFields((f) => ({ ...f, dates: v }))}
            className="w-full md:w-[208px] shrink-0"
          />
          <Field
            label="Travelers"
            icon="search-result/adult"
            value={fields.travelers}
            onChange={(v) => setFields((f) => ({ ...f, travelers: v }))}
            className="w-full md:w-[173px] shrink-0"
          />
          <button
            type="button"
            onClick={() => toast.success('Search updated', `${fields.destination} · ${fields.dates}`)}
            className="h-[58px] shrink-0 rounded-[12px] bg-brand-primary px-7 text-[16px] font-semibold text-white transition hover:opacity-95"
          >
            Update Search
          </button>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  className,
}: {
  label: string;
  icon: `search-result/${string}`;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label
      className={`flex h-[58px] items-center gap-3 rounded-[12px] border border-line/40 bg-surface-cool px-4 py-3 transition focus-within:border-brand-primary focus-within:bg-white ${className ?? ''}`}
    >
      <IconStatic name={icon} size={18} className="text-brand-primary" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[12px] font-medium leading-3 text-ink-soft">{label}</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 truncate bg-transparent text-[14px] font-semibold leading-5 text-ink outline-none"
        />
      </div>
    </label>
  );
}
