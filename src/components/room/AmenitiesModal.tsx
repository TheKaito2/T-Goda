'use client';
import Modal from '@/components/ui/Modal';
import IconStatic from '@/components/ui/IconStatic';

const groups: Array<{ heading: string; items: Array<{ label: string; icon?: `room-detail/${string}` }> }> = [
  {
    heading: 'Wellness',
    items: [
      { label: 'Full-service spa', icon: 'room-detail/spa' },
      { label: 'Sauna' },
      { label: 'Hammam' },
      { label: 'Yoga studio' },
      { label: 'Couples massage suite' },
      { label: 'Meditation garden' },
    ],
  },
  {
    heading: 'Pools & beach',
    items: [
      { label: '3 outdoor pools', icon: 'room-detail/swim' },
      { label: 'Heated infinity pool' },
      { label: 'Children&rsquo;s pool' },
      { label: 'Private beach access', icon: 'room-detail/umbrella' },
      { label: 'Beach cabanas' },
      { label: 'Sun loungers & towels' },
      { label: 'Lifeguard on duty' },
    ],
  },
  {
    heading: 'Food & drink',
    items: [
      { label: '5 restaurants', icon: 'room-detail/fork-spoon' },
      { label: '24-hour room service' },
      { label: 'Pool bar' },
      { label: 'Wine cellar' },
      { label: 'À la carte breakfast' },
      { label: 'Vegetarian & vegan options' },
      { label: 'Specialty coffee bar' },
    ],
  },
  {
    heading: 'Activities & fitness',
    items: [
      { label: 'Gym & fitness center', icon: 'room-detail/gym' },
      { label: 'Tennis courts' },
      { label: 'Watersports center' },
      { label: 'Snorkeling equipment' },
      { label: 'Kayaks & paddleboards' },
      { label: 'Sunset sailing' },
      { label: 'Cooking classes' },
    ],
  },
  {
    heading: 'Connectivity & comfort',
    items: [
      { label: 'Free high-speed Wi-Fi', icon: 'room-detail/wifi' },
      { label: 'In-room smart TV' },
      { label: 'Bluetooth speakers' },
      { label: 'Daily housekeeping' },
      { label: 'Turn-down service' },
      { label: 'Pillow menu' },
    ],
  },
  {
    heading: 'Family & kids',
    items: [
      { label: 'Kids club' },
      { label: 'Babysitting on request' },
      { label: 'Family rooms' },
      { label: 'Cribs available' },
      { label: 'Children&rsquo;s menu' },
    ],
  },
  {
    heading: 'Services',
    items: [
      { label: 'Concierge' },
      { label: 'Valet parking' },
      { label: '24-hour front desk' },
      { label: 'Airport shuttle' },
      { label: 'Multilingual staff' },
      { label: 'Express check-out' },
      { label: 'Laundry service' },
      { label: 'Business center' },
    ],
  },
];

const total = groups.reduce((n, g) => n + g.items.length, 0);

type Props = { open: boolean; onClose: () => void };

export default function AmenitiesModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} size="xl" ariaLabel="All amenities">
      <div className="flex max-h-[80vh] flex-col">
        <div className="flex items-center justify-between border-b border-line/40 px-7 py-5">
          <h2 className="text-[20px] font-extrabold tracking-[-0.4px] text-ink">All {total} amenities</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink-soft hover:text-ink">×</button>
        </div>
        <div className="overflow-y-auto px-7 py-6">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {groups.map((g) => (
              <div key={g.heading}>
                <h3 className="text-[14px] font-bold uppercase tracking-[0.15em] text-ink-soft">{g.heading}</h3>
                <ul className="mt-3 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it.label} className="flex items-center gap-3 text-[15px] text-ink">
                      {it.icon ? (
                        <IconStatic name={it.icon} size={18} className="text-brand-primary" />
                      ) : (
                        <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-primary/10 text-[11px] font-bold text-brand-primary">✓</span>
                      )}
                      <span dangerouslySetInnerHTML={{ __html: it.label }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
