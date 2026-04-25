'use client';
import Image from 'next/image';
import IconStatic from '@/components/ui/IconStatic';

type Props = { address?: string };

export default function MapCard({ address }: Props) {
  const openMap = () => {
    const q = address ?? 'Elounda Bay, Crete, Greece';
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <section className="overflow-hidden rounded-[16px] border border-[#C2C6D5]/30 bg-white">
      <div className="relative h-[192px] w-full">
        <Image
          src="/images/room-detail/map2.png"
          alt="Resort location map"
          fill
          sizes="378px"
          className="object-cover"
        />
      </div>
      <div className="flex h-20 items-center justify-center bg-white">
        <button
          type="button"
          onClick={openMap}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 text-[14px] font-semibold text-white transition hover:scale-105 hover:opacity-95"
        >
          <IconStatic name="search-result/map" size={16} className="text-white" />
          View on Map
        </button>
      </div>
    </section>
  );
}
