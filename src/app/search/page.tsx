import SearchHero from '@/components/search/SearchHero';
import FilterSidebar from '@/components/search/FilterSidebar';
import FlashDeals from '@/components/search/FlashDeals';
import HotelCard, { type HotelCardData } from '@/components/search/HotelCard';
import Pagination from '@/components/search/Pagination';

const hotels: HotelCardData[] = [
  {
    name: 'The Azure Serenity Resort',
    location: 'Ubud, Bali • 2.5 km from center',
    img: '/images/search-result/the-azure-serenity-resort.png',
    amenities: ['Free Wi-Fi', 'Pool', 'Breakfast', 'Private Beach', 'Spa', 'Gym'],
    note: 'Only 2 rooms left at this price!',
    reviewScore: '8.9',
    reviewLabel: 'Excellent',
    reviews: 1240,
    price: 284,
    was: 320,
    topChoice: true,
  },
  {
    name: 'Lumina Beach Villas',
    location: 'Seminyak, Bali • Beachfront',
    img: '/images/search-result/lumina-beach-villas.png',
    amenities: ['Free Wi-Fi', 'Pool', 'Breakfast', 'Spa', 'Airport Shuttle'],
    note: 'Free cancellation before Oct 10',
    reviewScore: '9.2',
    reviewLabel: 'Exceptional',
    reviews: 856,
    price: 415,
  },
  {
    name: 'The Palms Sanctuary',
    location: 'Nusa Dua, Bali • 0.8 km from beach',
    img: '/images/search-result/the-palms-sanctuary.png',
    amenities: ['Free Wi-Fi', 'Pool', 'Breakfast', 'Gym', 'Airport Shuttle'],
    note: 'Breakfast + Dinner deal available',
    reviewScore: '8.4',
    reviewLabel: 'Great',
    reviews: 2102,
    price: 189,
  },
];

export default function SearchResultPage() {
  return (
    <>
      <SearchHero />
      <main className="bg-surface-page py-6 md:py-8">
        <div className="mx-auto flex max-w-frame flex-col gap-6 px-4 md:px-[42px] lg:flex-row">
          <FilterSidebar />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h1 className="text-[18px] leading-7 text-ink md:text-[20px]">245 properties in Bali</h1>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-ink-soft">Sort by:</span>
                <button className="text-[16px] text-brand-primary hover:underline">
                  Recommended ▾
                </button>
              </div>
            </div>

            <div className="mt-6">
              <FlashDeals />
            </div>

            <div className="mt-6 space-y-4">
              {hotels.map((h) => (
                <HotelCard key={h.name} hotel={h} />
              ))}
            </div>

            <Pagination />
          </div>
        </div>
      </main>
    </>
  );
}
