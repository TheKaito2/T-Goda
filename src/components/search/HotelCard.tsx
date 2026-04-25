import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import StarRating from '@/components/ui/StarRating';

export type HotelCardData = {
  name: string;
  location: string;
  img: string;
  amenities: string[];
  note: string;
  reviewScore: string;
  reviewLabel: 'Excellent' | 'Exceptional' | 'Great';
  reviews: number;
  price: number;
  was?: number;
  topChoice?: boolean;
};

const amenityIconMap: Record<string, `search-result/${string}` | undefined> = {
  'Free Wi-Fi': 'search-result/wifi',
  'Pool': 'search-result/swim',
  'Breakfast': 'search-result/breakfast',
  'Private Beach': 'search-result/umbrella',
  'Spa': 'search-result/spa',
  'Airport Shuttle': 'search-result/shutter',
  'Gym': 'search-result/gym',
};

export default function HotelCard({ hotel }: { hotel: HotelCardData }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[12px] border border-line/60 bg-white shadow-sm md:h-[256px] md:flex-row">
      <div className="relative h-[200px] w-full shrink-0 md:h-full md:w-[320px]">
        <Image src={hotel.img} alt={hotel.name} fill sizes="(max-width: 768px) 100vw, 256px" className="object-cover" />
        {hotel.topChoice && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 pb-[4.41px] pt-[3px] text-[12px] font-bold uppercase tracking-wide text-brand-primary shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] backdrop-blur-[4px]">
            <Icon name="search-result/verified" size={14} className="text-brand-primary" />
            Top Choice
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[20px] leading-7 text-ink">{hotel.name}</h3>
              <StarRating value={5} size={14} />
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-[14px] text-ink-soft">
              <Icon name="search-result/pin-location" size={14} className="text-ink-soft" />
              {hotel.location}
            </p>
          </div>
          <div className="flex flex-col items-end rounded-md bg-brand-primary/10 px-3 py-2 text-right">
            <span className="text-[14px] font-bold leading-5 text-brand-primary">
              {hotel.reviewScore} {hotel.reviewLabel}
            </span>
            <span className="mt-0.5 text-[12px] leading-4 text-ink-soft">
              {hotel.reviews.toLocaleString()} reviews
            </span>
          </div>
        </div>

        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
          {hotel.amenities.map((a) => {
            const icon = amenityIconMap[a];
            return (
              <li
                key={a}
                className="flex items-center gap-1.5 rounded-sm bg-surface-cool px-2 py-1 text-[12px] leading-4 text-ink"
              >
                {icon && <Icon name={icon} size={14} className="text-ink-soft" />}
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
              href="/room"
              className="mt-2 rounded-sm bg-brand-deal px-5 py-2 text-[16px] font-semibold text-white hover:opacity-95"
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
