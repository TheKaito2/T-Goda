import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import StarRating from '@/components/ui/StarRating';

const deals = [
  {
    name: 'Mandala Sky Luxury Villas',
    location: 'Uluwatu, Bali • Cliff-top view',
    img: '/images/search-result/uluwatu-luxury-villa.png',
    price: 480,
    was: 1200,
    off: '60% OFF',
  },
  {
    name: 'Emerald Jungle Retreat',
    location: 'Ubud, Bali • Private Sanctuary',
    img: '/images/search-result/ubud-jungle-retreat.png',
    price: 247,
    was: 450,
    off: '45% OFF',
  },
  {
    name: 'Seminyak Shores Club',
    location: 'Seminyak, Bali • Beachfront Bliss',
    img: '/images/search-result/seminyak-beach-club-resort.png',
    price: 442,
    was: 680,
    off: '35% OFF',
  },
];

export default function FlashDeals() {
  return (
    <div
      className="rounded-[16px] p-1 shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]"
      style={{ background: 'linear-gradient(123.88deg, #005CBD 0%, #004591 100%)' }}
    >
    <section className="overflow-hidden rounded-[12px] bg-white">
      <div className="flex items-center justify-between bg-brand-deal/10 px-5 py-3">
        <div className="flex items-center gap-2 text-brand-deal">
          <Icon name="search-result/fire" size={20} className="text-brand-deal" />
          <h3 className="text-[18px] font-bold leading-7">Flash Deals for You</h3>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-ink-soft">Ends in:</span>
          <div className="flex items-center gap-1 font-mono text-[14px] font-bold leading-5 text-white">
            <span className="rounded-sm bg-brand-deal px-1.5 py-0.5">08</span>
            <span className="text-ink-soft">:</span>
            <span className="rounded-sm bg-brand-deal px-1.5 py-0.5">45</span>
            <span className="text-ink-soft">:</span>
            <span className="rounded-sm bg-brand-deal px-1.5 py-0.5">12</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-line/30">
        {deals.map((d) => (
          <article
            key={d.name}
            className="flex h-[192px] flex-col bg-white text-ink md:flex-row"
          >
            <div className="relative h-[180px] w-full shrink-0 md:h-full md:w-[256px]">
              <Image
                src={d.img}
                alt={d.name}
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-md bg-brand-deal px-3 py-1 text-[14px] font-extrabold leading-5 text-white">
                {d.off}
              </span>
            </div>
            <div className="flex flex-1 items-center justify-between p-5">
              <div className="flex -translate-y-[20px] flex-col">
                <div className="flex items-center gap-2">
                  <h4 className="text-[18px] leading-7 text-ink">{d.name}</h4>
                  <StarRating value={5} size={14} />
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[14px] text-ink-soft">
                  <Icon name="search-result/pin-location" size={14} className="text-ink-soft" />
                  {d.location}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[12px] leading-3 text-ink-soft line-through">${d.was.toLocaleString()}</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-[24px] font-bold leading-8 text-brand-deal">${d.price}</span>
                  <span className="text-[12px] text-ink-soft">/night</span>
                </div>
                <button
                  type="button"
                  className="mt-2 rounded-md bg-brand-deal px-4 py-1.5 text-[14px] font-bold leading-5 text-white hover:opacity-95"
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
