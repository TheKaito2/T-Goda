const subscores = [
  { label: 'Cleanliness', value: 9.5 },
  { label: 'Service',     value: 9.2 },
  { label: 'Location',    value: 8.9 },
];

export default function ReviewsSummary() {
  return (
    <section className="rounded-[16px] border border-[#C2C6D5]/30 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[20px] font-bold leading-7 text-ink">Excellent</h3>
          <p className="mt-1 text-[14px] text-ink-soft">1,248 verified reviews</p>
        </div>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-brand-primary text-[20px] font-bold leading-none text-white">
          9.2
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {subscores.map((s) => (
          <li key={s.label}>
            <div className="flex items-center justify-between text-[14px] text-ink">
              <span>{s.label}</span>
              <span className="font-bold">{s.value}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E7E8F1]">
              <div
                className="h-full rounded-full bg-brand-primary"
                style={{ width: `${(s.value / 10) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
