import Icon from '@/components/ui/Icon';
import StarRating from '@/components/ui/StarRating';

export default function DetailHeader() {
  return (
    <header className="flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-end">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <StarRating value={5} size={16} />
          <span className="inline-flex h-6 items-center rounded-[4px] bg-brand-primary px-2 text-[12px] font-bold uppercase tracking-wide text-white">
            Resort
          </span>
        </div>
        <p className="mt-3 text-[16px] font-normal leading-6 text-ink">
          Grand Azure Resort &amp; Spa, Elounda
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[14px] text-ink-soft">
          <Icon name="room-detail/pin-location" size={16} className="text-ink-soft" />
          Elounda Bay, Crete, 72053, Greece
          <a href="#" className="ml-1 font-semibold text-brand-primary hover:underline">
            Show on map
          </a>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-[41px] items-center gap-2 rounded-[8px] border border-[#C2C6D5] bg-white px-4 text-[14px] font-semibold text-ink hover:bg-surface-cool"
        >
          <Icon name="room-detail/share-link" size={16} className="text-ink" />
          Share
        </button>
        <button
          type="button"
          className="inline-flex h-[41px] items-center gap-2 rounded-[8px] border border-[#C2C6D5] bg-white px-4 text-[14px] font-semibold text-ink hover:bg-surface-cool"
        >
          <Icon name="room-detail/heart" size={16} className="text-ink" />
          Save
        </button>
        <button
          type="button"
          className="inline-flex h-[48px] items-center justify-center rounded-[8px] bg-brand-deal px-6 text-[16px] font-bold text-white hover:opacity-95"
        >
          Book Now
        </button>
      </div>
    </header>
  );
}
