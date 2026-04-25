'use client';
import { useState } from 'react';
import IconStatic from '@/components/ui/IconStatic';
import StarRating from '@/components/ui/StarRating';
import HeartButton from '@/components/ui/HeartButton';
import ShareModal from '@/components/share/ShareModal';
import BookingConfirmedModal from '@/components/booking/BookingConfirmedModal';
import type { Hotel } from '@/lib/mock-hotels';

type Props = {
  hotel: Hotel;
};

export default function DetailHeader({ hotel }: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const openMap = () => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(hotel.address)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-end">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <StarRating value={hotel.stars} size={16} />
          <span className="inline-flex h-6 items-center rounded-[4px] bg-brand-primary px-2 text-[12px] font-bold uppercase tracking-wide text-white">
            {hotel.type.replace(/s$/, '')}
          </span>
        </div>
        <p className="mt-3 text-[16px] font-normal leading-6 text-ink">{hotel.name}</p>
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[14px] text-ink-soft">
          <IconStatic name="room-detail/pin-location" size={16} className="text-ink-soft" />
          {hotel.address}
          <button
            type="button"
            onClick={openMap}
            className="ml-1 font-semibold text-brand-primary hover:underline"
          >
            Show on map
          </button>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="inline-flex h-[41px] items-center gap-2 rounded-[8px] border border-[#C2C6D5] bg-white px-4 text-[14px] font-semibold text-ink transition hover:bg-surface-cool"
        >
          <IconStatic name="room-detail/share-link" size={16} className="text-ink" />
          Share
        </button>
        <HeartButton
          id={hotel.id}
          label={hotel.name}
          className="h-[41px] gap-2 rounded-[8px] border border-[#C2C6D5] bg-white px-4 text-[14px] font-semibold text-ink hover:bg-surface-cool"
          size={16}
        />
        <button
          type="button"
          onClick={() => setBookOpen(true)}
          className="inline-flex h-[48px] items-center justify-center rounded-[8px] bg-brand-deal px-6 text-[16px] font-bold text-white transition hover:scale-105 hover:opacity-95"
        >
          Book Now
        </button>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={`${hotel.name} on T-Goda`}
      />
      <BookingConfirmedModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        hotel={hotel.name}
        room="Recommended room"
        total={hotel.price * 3}
        nights={3}
      />
    </header>
  );
}
