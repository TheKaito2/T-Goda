'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import IconStatic from '@/components/ui/IconStatic';
import BookingConfirmedModal from '@/components/booking/BookingConfirmedModal';
import { gsap } from '@/lib/gsap';
import { useToast } from '@/lib/toast';

type Room = {
  name: string;
  specs: string;
  sleepsAdults: number;
  sleepsChildren?: number;
  perks: string[];
  urgency?: string;
  price: number;
  was?: number;
  limitedOffer?: boolean;
};

const rooms: Room[] = [
  {
    name: 'Presidential Sea Front Suite',
    specs: '85m² • Panoramic Sea View • Infinity Pool Access',
    sleepsAdults: 4,
    perks: ['Free Airport Transfer', 'All-Inclusive Premium'],
    urgency: 'Only 1 room left!',
    price: 862,
    was: 1295,
    limitedOffer: true,
  },
  {
    name: 'Deluxe Garden View Room',
    specs: '32m² • Balcony • Garden View • 1 King Bed',
    sleepsAdults: 2,
    perks: ['Free Cancellation', 'Breakfast Included'],
    price: 264,
    was: 345,
  },
  {
    name: 'Junior Suite with Private Pool',
    specs: '45m² • Private Pool • Sea View • King Bed',
    sleepsAdults: 2,
    sleepsChildren: 1,
    perks: ['Free Cancellation', 'All-Inclusive'],
    urgency: 'Only 2 rooms left!',
    price: 445,
    was: 626,
  },
];

function CheckCircle() {
  return (
    <span className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand-success text-[11px] font-bold leading-none text-brand-success">
      ✓
    </span>
  );
}

function InfoCircle() {
  return (
    <span className="inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-brand-primary text-[10px] font-bold leading-none text-brand-primary">
      i
    </span>
  );
}

type Props = { hotelName: string };

export default function RoomTable({ hotelName }: Props) {
  const ref = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [bookRoom, setBookRoom] = useState<Room | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-rt-row]'));

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(rows, { opacity: 1, y: 0 });
        if (stickyRef.current) gsap.set(stickyRef.current, { opacity: 1, y: 0 });
        return;
      }

      if (rows.length) gsap.set(rows, { opacity: 0, y: 24 });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        if (rows.length) {
          gsap.to(rows, {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power2.out',
          });
        }
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0, rootMargin: '0px 0px -10% 0px' }
      );
      io.observe(root);
      const fallback = window.setTimeout(play, 2000);

      let stickyTween: gsap.core.Tween | null = null;
      if (stickyRef.current) {
        gsap.set(stickyRef.current, { y: 100, opacity: 0 });
        stickyTween = gsap.to(stickyRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 30%',
            end: 'bottom bottom',
            toggleActions: 'play reverse play reverse',
          },
        });
      }

      return () => {
        io.disconnect();
        window.clearTimeout(fallback);
        if (stickyTween) {
          stickyTween.scrollTrigger?.kill();
          stickyTween.kill();
        }
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="mt-12">
      <h2 className="text-[18px] font-normal leading-7 text-ink">Select Your Room</h2>

      <div className="mx-auto mt-4 flex min-h-[496px] w-full max-w-[1232px] flex-col overflow-hidden rounded-[16px] border border-[#C2C6D5]/40 bg-white">
        <div className="hidden h-[69px] items-center gap-12 bg-[#F2F3FC] px-8 text-[14px] font-bold text-ink md:grid md:grid-cols-[340px_140px_1fr_247.75px_97.5px]">
          <span>Room Type</span>
          <span>Sleeps</span>
          <span>Today&rsquo;s Price</span>
          <span className="pl-6">Options</span>
          <span className="text-right">Select</span>
        </div>

        {rooms.map((r, i) => (
          <div
            key={r.name}
            data-rt-row
            className={`relative grid flex-1 grid-cols-1 items-center gap-12 border-t border-[#C2C6D5]/30 px-8 py-7 transition-colors hover:bg-surface-cool md:grid-cols-[340px_140px_1fr_247.75px_97.5px] ${
              i === 0 ? 'bg-[#F2F3FC]/60' : 'bg-white'
            }`}
          >
            {i === 0 && (
              <span className="absolute left-0 top-0 h-full w-[3px] bg-brand-primary" aria-hidden="true" />
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-[16px] font-semibold leading-5 text-ink">{r.name}</h3>
                {r.limitedOffer && (
                  <span className="inline-flex shrink-0 flex-col items-center justify-center rounded-[4px] bg-brand-deal px-2 py-1 text-center text-[10px] font-bold uppercase leading-[1.1] tracking-wide text-white">
                    <span>Limited Time</span>
                    <span>Offer</span>
                  </span>
                )}
              </div>
              <p className="mt-2 text-[14px] leading-5 text-ink-soft">{r.specs}</p>
              <button
                type="button"
                onClick={() => toast.info(r.name, r.specs)}
                className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-primary hover:underline"
              >
                <InfoCircle />
                Room details
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1 text-ink-soft">
              {Array.from({ length: r.sleepsAdults }).map((_, k) => (
                <IconStatic key={`a${k}`} name="room-detail/adult" size={18} className="text-ink-soft" />
              ))}
              {Array.from({ length: r.sleepsChildren ?? 0 }).map((_, k) => (
                <IconStatic key={`c${k}`} name="room-detail/children" size={18} className="text-ink-soft" />
              ))}
            </div>

            <div className="flex flex-col">
              {r.was && (
                <span className="text-[12px] text-ink-soft line-through">${r.was.toLocaleString()}</span>
              )}
              <span className={`text-[24px] font-bold leading-8 ${i === 0 ? 'text-brand-deal' : 'text-ink'}`}>
                ${r.price.toLocaleString()}
              </span>
              <span className="whitespace-nowrap text-[12px] text-ink-soft">Includes taxes &amp; fees</span>
            </div>

            <ul className="flex flex-col justify-center gap-2 pl-6 text-[16px] font-normal leading-none">
              {r.perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-brand-success">
                  <CheckCircle />
                  <span>{p}</span>
                </li>
              ))}
              {r.urgency && (
                <li className="text-[14px] font-bold leading-none text-brand-deal">{r.urgency}</li>
              )}
            </ul>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setBookRoom(r)}
                className={`inline-flex h-[37px] w-[97.5px] items-center justify-center rounded-[8px] text-[14px] font-bold text-white transition hover:scale-105 hover:opacity-95 ${
                  i === 0 ? 'bg-brand-deal' : 'bg-brand-primary'
                }`}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={stickyRef}
        className="pointer-events-auto fixed bottom-4 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-4 rounded-full border border-line/40 bg-white px-5 py-3 shadow-card md:flex"
      >
        <div className="text-[13px]">
          <div className="font-semibold text-ink">From <span className="text-brand-deal">${rooms[1].price.toLocaleString()}</span> / night</div>
          <div className="text-ink-soft">Free cancellation, no card needed</div>
        </div>
        <button
          type="button"
          onClick={() => setBookRoom(rooms[0])}
          className="rounded-full bg-brand-deal px-5 py-2 text-[14px] font-bold text-white transition hover:scale-105 hover:opacity-95"
        >
          Book Now
        </button>
      </div>

      <BookingConfirmedModal
        open={!!bookRoom}
        onClose={() => setBookRoom(null)}
        hotel={hotelName}
        room={bookRoom?.name ?? ''}
        total={(bookRoom?.price ?? 0) * 3}
        nights={3}
        guests={(bookRoom?.sleepsAdults ?? 2) + (bookRoom?.sleepsChildren ?? 0)}
      />
    </section>
  );
}
