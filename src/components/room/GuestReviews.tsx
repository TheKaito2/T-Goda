import StarRating from '@/components/ui/StarRating';

type Review = {
  initials: string;
  bg: string;
  name: string;
  country: string;
  date: string;
  quote: string;
};

const reviews: Review[] = [
  {
    initials: 'SM',
    bg: 'bg-[#D7E2FF] text-[#1E3A8A]',
    name: 'Sophia Martinez',
    country: 'United Kingdom',
    date: 'May 12, 2024',
    quote:
      'An absolute paradise. The views from the Presidential Suite are unmatched. The service was impeccable from start to finish.',
  },
  {
    initials: 'JW',
    bg: 'bg-[#FFD9DD] text-[#9F1239]',
    name: 'James Wilson',
    country: 'United States',
    date: 'Apr 28, 2024',
    quote:
      'Excellent facilities and great breakfast selection. The private beach is beautiful, though the city center is a bit of a walk.',
  },
  {
    initials: 'AK',
    bg: 'bg-[#FFDCBD] text-[#9A3412]',
    name: 'Anna Kowalski',
    country: 'Germany',
    date: 'Apr 15, 2024',
    quote:
      'The spa treatments were heavenly. Truly a five-star experience. We will definitely be coming back next summer.',
  },
];

export default function GuestReviews() {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-bold leading-8 text-ink">Guest Reviews</h2>
        <a href="#" className="text-[16px] font-semibold text-brand-primary hover:underline">
          Read all 1,248 reviews
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <article
            key={r.name}
            className="flex h-[220px] flex-col rounded-[16px] border border-[#C2C6D5]/30 bg-white p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <StarRating value={5} size={14} />
              <span className="text-[12px] text-ink-soft">{r.date}</span>
            </div>
            <p className="mt-3 line-clamp-3 text-[16px] font-normal italic leading-6 text-ink">
              &ldquo;{r.quote}&rdquo;
            </p>
            <div className="mt-auto flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${r.bg}`}
              >
                {r.initials}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-[14px] font-semibold text-ink">{r.name}</h3>
                <p className="text-[12px] text-ink-soft">{r.country}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
