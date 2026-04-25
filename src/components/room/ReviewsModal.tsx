'use client';
import { useMemo, useState } from 'react';
import Modal from '@/components/ui/Modal';
import StarRating from '@/components/ui/StarRating';

const NAMES = [
  ['Sophia Martinez', 'United Kingdom'],
  ['James Wilson', 'United States'],
  ['Anna Kowalski', 'Germany'],
  ['Liam O&rsquo;Connor', 'Ireland'],
  ['Yuki Tanaka', 'Japan'],
  ['Maria Silva', 'Brazil'],
  ['Hugo Bernard', 'France'],
  ['Aisha Rahman', 'Singapore'],
  ['Noah Kim', 'South Korea'],
  ['Emma Larsson', 'Sweden'],
  ['Ravi Patel', 'India'],
  ['Lucia Russo', 'Italy'],
  ['Carlos Ramirez', 'Mexico'],
  ['Olivia Brown', 'Australia'],
  ['Ethan Wright', 'Canada'],
  ['Zoe Davis', 'New Zealand'],
  ['Noor Hassan', 'UAE'],
  ['Felix Müller', 'Austria'],
  ['Hannah Park', 'United States'],
  ['Leo Costa', 'Portugal'],
];

const QUOTES = [
  'An absolute paradise. The views are unmatched and the service was impeccable.',
  'Excellent facilities and a great breakfast selection. We&rsquo;ll be back.',
  'The spa was heavenly &mdash; truly a five-star experience.',
  'Loved every minute. The infinity pool at sunset is unreal.',
  'Beautiful design, attentive staff, and quiet rooms. Highly recommended.',
  'Beach cabanas were perfect for the family. Kids club was a hit.',
  'Lovely property, but the city centre was further than expected.',
  'The room was spacious and the balcony view incredible.',
  'Had the best meal of our trip at the rooftop restaurant.',
  'Concierge went above and beyond to find us a private boat tour.',
  'Honeymoon stay &mdash; can&rsquo;t imagine a better choice.',
  'Wellness facilities were second to none. The hammam is a must.',
];

const TAGS: Array<{ label: string; rating: number }> = [
  { label: 'All', rating: 0 },
  { label: 'Excellent (5)', rating: 5 },
  { label: 'Very good (4)', rating: 4 },
  { label: 'Good (3)', rating: 3 },
];

function build(): Array<{ id: number; name: string; country: string; date: string; quote: string; rating: number; }> {
  const out: Array<{ id: number; name: string; country: string; date: string; quote: string; rating: number; }> = [];
  for (let i = 0; i < 30; i++) {
    const [n, c] = NAMES[i % NAMES.length];
    out.push({
      id: i,
      name: n,
      country: c,
      quote: QUOTES[i % QUOTES.length],
      rating: i % 6 === 0 ? 4 : 5,
      date: ['Jul 04, 2024', 'Jun 21, 2024', 'May 12, 2024', 'Apr 28, 2024', 'Apr 15, 2024'][i % 5],
    });
  }
  return out;
}

type Props = { open: boolean; onClose: () => void };

export default function ReviewsModal({ open, onClose }: Props) {
  const [filter, setFilter] = useState(0);
  const all = useMemo(() => build(), []);
  const list = filter === 0 ? all : all.filter((r) => r.rating === filter);

  return (
    <Modal open={open} onClose={onClose} size="xl" ariaLabel="Reviews">
      <div className="flex max-h-[85vh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line/40 px-7 py-5">
          <div>
            <h2 className="text-[22px] font-extrabold tracking-[-0.4px] text-ink">Guest reviews</h2>
            <p className="text-[13px] text-ink-soft">9.2 / 10 · 1,248 verified reviews</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink-soft hover:text-ink">×</button>
        </div>
        <div className="flex flex-wrap gap-2 border-b border-line/30 px-7 py-3">
          {TAGS.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setFilter(t.rating)}
              className={`rounded-full px-3 py-1 text-[13px] font-semibold transition ${
                filter === t.rating
                  ? 'bg-brand-primary text-white'
                  : 'border border-line/60 bg-white text-ink hover:border-line'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="overflow-y-auto px-7 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {list.map((r) => (
              <article
                key={r.id}
                className="rounded-[16px] border border-[#C2C6D5]/30 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <StarRating value={r.rating} size={14} />
                  <span className="text-[12px] text-ink-soft">{r.date}</span>
                </div>
                <p
                  className="mt-3 text-[15px] italic leading-6 text-ink"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${r.quote}&rdquo;` }}
                />
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10 text-[12px] font-bold text-brand-primary">
                    {r.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-ink" dangerouslySetInnerHTML={{ __html: r.name }} />
                    <div className="text-[12px] text-ink-soft">{r.country}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
