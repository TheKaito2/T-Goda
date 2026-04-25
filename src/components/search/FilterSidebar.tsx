import Image from 'next/image';
import Icon from '@/components/ui/Icon';

type FilterGroup = {
  heading: string;
  options: readonly (string | number)[];
};

const filterGroups: readonly FilterGroup[] = [
  {
    heading: 'Property Type',
    options: ['Hotels', 'Resorts', 'Apartments', 'Villas'],
  },
  {
    heading: 'Star Rating',
    options: [5, 4, 3, 2],
  },
  {
    heading: 'Facilities',
    options: ['Free Wi-Fi', 'Swimming Pool', 'Fitness Center', 'Spa', 'Parking', 'Pet Friendly'],
  },
  {
    heading: 'Review Score',
    options: ['Superb 9+', 'Very Good 8+', 'Good 7+'],
  },
  {
    heading: 'Neighborhood',
    options: ['Patong', 'Karon', 'Kata', 'Kamala'],
  },
  {
    heading: 'Bed Type',
    options: ['Single', 'Double', 'King'],
  },
];

export default function FilterSidebar() {
  return (
    <aside className="w-full shrink-0 lg:w-[256px]">
      <div className="rounded-lg border border-line/40 bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="search-result/filter" size={18} className="text-ink" />
            <h3 className="text-[18px] leading-7 text-ink">Filters</h3>
          </div>
          <button className="text-[12px] text-brand-primary hover:underline">Clear all</button>
        </div>

        <div className="mt-5">
          <div className="text-[14px] font-semibold text-ink">Price Range</div>
          <input
            type="range"
            min={0}
            max={1000}
            defaultValue={500}
            className="mt-3 w-full accent-brand-primary"
          />
          <div className="mt-1 flex justify-between text-[12px] text-ink-soft">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {filterGroups.map((group) => (
            <div key={group.heading} className="border-t border-line/30 pt-5">
              <div className="text-[14px] font-semibold text-ink">{group.heading}</div>
              <ul className="mt-3 space-y-2.5">
                {group.options.map((opt) => (
                  <li key={String(opt)} className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      className="h-[19px] w-[19px] rounded-[3.5px] border border-line accent-brand-primary"
                    />
                    {group.heading === 'Star Rating' ? (
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name={i < (opt as number) ? 'search-result/star' : 'search-result/hollow-star'}
                            size={14}
                            className={i < (opt as number) ? 'text-star' : 'text-ink-soft/40'}
                          />
                        ))}
                      </span>
                    ) : (
                      <span className="text-[14px] text-ink">{opt}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      <div className="relative mt-4 h-[160px] w-full overflow-hidden rounded-[12px]">
        <Image
          src="/images/search-result/map.png"
          alt="Bali map"
          fill
          sizes="256px"
          className="object-cover"
        />
        <button
          type="button"
          className="absolute left-1/2 top-1/2 inline-flex h-[40px] w-[148px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full bg-white text-[14px] font-semibold text-brand-primary shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:bg-white/95"
        >
          <Icon name="search-result/map" size={16} className="text-brand-primary" />
          View on Map
        </button>
      </div>
    </aside>
  );
}
