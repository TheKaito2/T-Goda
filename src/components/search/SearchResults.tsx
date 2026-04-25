'use client';
import { useMemo, useReducer } from 'react';
import FilterSidebar, { type FilterState } from './FilterSidebar';
import HotelCard from './HotelCard';
import Pagination from './Pagination';
import FlashDeals from './FlashDeals';
import Dropdown from '@/components/ui/Dropdown';
import type { Hotel } from '@/lib/mock-hotels';

type Sort = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';

type State = FilterState & { sort: Sort; page: number };

type Action =
  | { type: 'price'; value: number }
  | { type: 'toggle'; key: keyof Omit<FilterState, 'price'>; value: string | number }
  | { type: 'sort'; value: Sort }
  | { type: 'page'; value: number }
  | { type: 'clear' };

const PAGE_SIZE = 8;

const INITIAL: State = {
  price: 1000,
  type: [],
  stars: [],
  facilities: [],
  reviewScore: [],
  neighborhoods: [],
  bedTypes: [],
  sort: 'recommended',
  page: 1,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'price':
      return { ...state, price: action.value, page: 1 };
    case 'toggle': {
      const arr = state[action.key] as Array<string | number>;
      const exists = arr.includes(action.value);
      const next = exists ? arr.filter((v) => v !== action.value) : [...arr, action.value];
      return { ...state, [action.key]: next, page: 1 } as State;
    }
    case 'sort':
      return { ...state, sort: action.value };
    case 'page':
      return { ...state, page: action.value };
    case 'clear':
      return { ...INITIAL };
  }
}

const REVIEW_THRESHOLDS: Record<string, number> = {
  'Superb 9+': 9,
  'Very Good 8+': 8,
  'Good 7+': 7,
};

function applyFilters(hotels: Hotel[], s: State): Hotel[] {
  let out = hotels.filter((h) => h.price <= s.price);
  if (s.type.length) out = out.filter((h) => s.type.includes(h.type));
  if (s.stars.length) out = out.filter((h) => s.stars.includes(h.stars));
  if (s.facilities.length)
    out = out.filter((h) => s.facilities.every((f) => h.facilities.includes(f as string)));
  if (s.reviewScore.length) {
    const thresholds = s.reviewScore.map((label) => REVIEW_THRESHOLDS[label as string] ?? 0);
    const min = Math.min(...thresholds);
    out = out.filter((h) => h.reviewScore >= min);
  }
  if (s.neighborhoods.length) out = out.filter((h) => s.neighborhoods.includes(h.neighborhood));
  if (s.bedTypes.length)
    out = out.filter((h) => s.bedTypes.some((b) => h.bedTypes.includes(b as string)));
  return out;
}

function applySort(hotels: Hotel[], sort: Sort): Hotel[] {
  const out = [...hotels];
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return out.sort((a, b) => b.price - a.price);
    case 'rating':
      return out.sort((a, b) => b.reviewScore - a.reviewScore);
    case 'reviews':
      return out.sort((a, b) => b.reviews - a.reviews);
    default:
      return out.sort((a, b) => Number(!!b.topChoice) - Number(!!a.topChoice) || b.reviewScore - a.reviewScore);
  }
}

export default function SearchResults({ hotels }: { hotels: Hotel[] }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const filtered = useMemo(() => applySort(applyFilters(hotels, state), state.sort), [hotels, state]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(state.page, totalPages);
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto flex max-w-frame flex-col gap-6 px-4 md:px-[42px] lg:flex-row">
      <FilterSidebar
        state={state}
        onPrice={(v) => dispatch({ type: 'price', value: v })}
        onToggle={(key, value) => dispatch({ type: 'toggle', key, value })}
        onClear={() => dispatch({ type: 'clear' })}
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-[18px] leading-7 text-ink md:text-[20px]">
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-ink-soft">Sort by:</span>
            <Dropdown
              value={state.sort}
              onChange={(v) => dispatch({ type: 'sort', value: v as Sort })}
              options={[
                { value: 'recommended', label: 'Recommended' },
                { value: 'price-asc', label: 'Price: low to high' },
                { value: 'price-desc', label: 'Price: high to low' },
                { value: 'rating', label: 'Top rated' },
                { value: 'reviews', label: 'Most reviewed' },
              ]}
            />
          </div>
        </div>

        <div className="mt-6">
          <FlashDeals />
        </div>

        {slice.length === 0 ? (
          <div className="mt-10 rounded-md border border-line/40 bg-white p-10 text-center">
            <div className="text-[18px] font-semibold text-ink">No matches just yet.</div>
            <p className="mt-2 text-[14px] text-ink-soft">Try widening your filters.</p>
            <button
              type="button"
              onClick={() => dispatch({ type: 'clear' })}
              className="mt-4 rounded-sm bg-brand-primary px-4 py-2 text-[14px] font-semibold text-white hover:opacity-90"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4" data-hotel-list>
            {slice.map((h) => (
              <HotelCard key={h.id} hotel={h} />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPage={(p) => {
            dispatch({ type: 'page', value: p });
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
}
