'use client';

type Props = {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
};

function pageList(page: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | '...')[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) out.push('...');
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push('...');
  out.push(total);
  return out;
}

export default function Pagination({ page, totalPages, onPage }: Props) {
  if (totalPages <= 1) return null;
  const items = pageList(page, totalPages);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="h-10 w-10 rounded-[8px] border border-line/60 bg-white text-[18px] leading-none text-ink transition hover:bg-surface-cool disabled:opacity-40"
      >
        ‹
      </button>
      {items.map((p, i) => {
        if (p === '...') {
          return (
            <span key={`e-${i}`} className="px-1 text-ink-soft">
              …
            </span>
          );
        }
        const active = p === page;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            aria-current={active ? 'page' : undefined}
            className={[
              'h-10 w-10 rounded-[8px] border text-[14px] font-semibold transition',
              active
                ? 'border-brand-primary bg-brand-primary text-white shadow-sm'
                : 'border-line/60 bg-white text-ink hover:bg-surface-cool',
            ].join(' ')}
          >
            {p}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="h-10 w-10 rounded-[8px] border border-line/60 bg-white text-[18px] leading-none text-ink transition hover:bg-surface-cool disabled:opacity-40"
      >
        ›
      </button>
      <button
        type="button"
        onClick={() => onPage(totalPages)}
        disabled={page === totalPages}
        aria-label="Last page"
        className="h-10 w-10 rounded-[8px] border border-line/60 bg-white text-[18px] leading-none text-ink transition hover:bg-surface-cool disabled:opacity-40"
      >
        »
      </button>
    </nav>
  );
}
