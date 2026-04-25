import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function SearchBar() {
  return (
    <div className="mx-auto flex w-[768px] max-w-full flex-col items-stretch gap-2 rounded-md border border-line-soft/40 bg-white p-2 shadow-card md:h-[68px] md:flex-row md:items-center md:gap-3">
      <div className="flex h-[48px] flex-1 items-center gap-3 rounded-sm bg-surface-input px-4 md:h-[52px]">
        <Icon name="home/search" size={18} className="text-ink-soft" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="flex-1 bg-transparent text-[14px] font-medium text-ink placeholder:text-ink-soft focus:outline-none"
        />
      </div>
      <div className="flex h-[48px] flex-1 items-center gap-3 rounded-sm bg-surface-input px-4 md:h-[52px]">
        <Icon name="home/dates" size={18} className="text-ink-soft" />
        <input
          type="text"
          placeholder="Check in - Check out"
          className="flex-1 bg-transparent text-[14px] font-medium text-ink placeholder:text-ink-soft focus:outline-none"
        />
      </div>
      <Link
        href="/search"
        className="flex h-[48px] items-center justify-center gap-2 rounded-sm bg-brand-primary text-[14px] font-bold text-white hover:opacity-95 md:h-[52px] md:w-[151px]"
      >
        <Icon name="home/search-white" size={16} />
        Search
      </Link>
    </div>
  );
}
