import Icon from '@/components/ui/Icon';

const props = [
  {
    icon: 'home/tag' as const,
    color: 'bg-badge-blue/20 text-badge-blue',
    title: 'Best Price Guarantee',
    body: 'Find a lower price elsewhere and we’ll match it. Travel smart, save more.',
  },
  {
    icon: 'home/support' as const,
    color: 'bg-badge-pink/20 text-badge-pink',
    title: '24/7 Global Support',
    body: 'Our world-class support team is here to help you anywhere, anytime in 40+ languages.',
  },
  {
    icon: 'home/add-dates' as const,
    color: 'bg-badge-orange/20 text-badge-orange',
    title: 'Flexible Booking',
    body: 'Life happens. Most of our properties offer free cancellation for peace of mind.',
  },
];

export default function ValueProps() {
  return (
    <section className="px-4 py-10 md:px-[42px] md:pt-[88px] md:pb-[88px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-3 md:grid-cols-3">
        {props.map((p) => (
          <div
            key={p.title}
            className="flex h-[192px] flex-col items-center justify-center rounded-[12px] bg-[#E9E9E9] p-6 text-center"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${p.color}`}>
              <Icon name={p.icon} size={24} />
            </div>
            <h3 className="mt-3 text-[20px] font-bold leading-[28px] text-ink">{p.title}</h3>
            <p className="mt-1.5 max-w-[320px] text-[14px] leading-[20px] text-ink-soft">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
