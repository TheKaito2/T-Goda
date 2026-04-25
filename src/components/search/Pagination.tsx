export default function Pagination() {
  const pages = ['1', '2', '3', '...', '12'];
  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      {pages.map((p, i) => {
        const active = p === '1';
        const isEllipsis = p === '...';
        return (
          <button
            key={`${p}-${i}`}
            disabled={isEllipsis}
            className={[
              'h-10 w-10 rounded-[8px] border text-[14px]',
              active
                ? 'border-brand-primary bg-brand-primary text-white'
                : 'border-line/60 bg-white text-ink hover:bg-surface-cool',
              isEllipsis ? 'cursor-default border-transparent bg-transparent' : '',
            ].join(' ')}
          >
            {p}
          </button>
        );
      })}
      <button
        type="button"
        aria-label="Next page"
        className="h-10 w-10 rounded-[8px] border border-line/60 bg-white text-[18px] leading-none text-ink hover:bg-surface-cool"
      >
        ›
      </button>
      <button
        type="button"
        aria-label="Last page"
        className="h-10 w-10 rounded-[8px] border border-line/60 bg-white text-[18px] leading-none text-ink hover:bg-surface-cool"
      >
        »
      </button>
    </nav>
  );
}
