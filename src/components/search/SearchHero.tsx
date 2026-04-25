import Icon from '@/components/ui/Icon';

const fields = [
  { label: 'Destination', value: 'Bali, Indonesia',        icon: 'search-result/pin-location' as const, width: 'flex-1 min-w-[280px]' },
  { label: 'Dates',       value: 'Oct 12 - Oct 19, 2024',  icon: 'search-result/date' as const,         width: 'w-full md:w-[208px] shrink-0' },
  { label: 'Travelers',   value: '2 Adults, 1 Room',       icon: 'search-result/adult' as const,        width: 'w-full md:w-[173px] shrink-0' },
];

export default function SearchHero() {
  return (
    <section className="border-b border-line/40 bg-white">
      <div className="mx-auto max-w-frame px-4 py-4 md:px-[42px] md:py-6">
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {fields.map((f) => (
            <div
              key={f.label}
              className={`flex h-[58px] items-center gap-3 rounded-[12px] border border-line/40 bg-surface-cool px-4 py-3 ${f.width}`}
            >
              <Icon name={f.icon} size={18} className="text-brand-primary" />
              <div className="flex min-w-0 flex-col">
                <span className="text-[12px] font-medium leading-3 text-ink-soft">{f.label}</span>
                <span className="mt-1 truncate text-[14px] font-semibold leading-5 text-ink">{f.value}</span>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="h-[58px] shrink-0 rounded-[12px] bg-brand-primary px-7 text-[16px] font-semibold text-white hover:opacity-95"
          >
            Update Search
          </button>
        </div>
      </div>
    </section>
  );
}
