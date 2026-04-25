'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import IconStatic from '@/components/ui/IconStatic';
import { gsap } from '@/lib/gsap';
import { numberCount } from '@/lib/animations';
import { useToast } from '@/lib/toast';
import { useAuth } from '@/lib/auth';

export default function PromoBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const toast = useToast();
  const { user } = useAuth();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const tag = root.querySelector<HTMLElement>('[data-pb-tag]');
      const title = root.querySelector<HTMLElement>('[data-pb-title]');
      const body = root.querySelector<HTMLElement>('[data-pb-body]');
      const ctas = Array.from(root.querySelectorAll<HTMLElement>('[data-pb-cta]'));
      const card = root.querySelector<HTMLElement>('[data-pb-card]');

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        if (tag) gsap.set(tag, { rotate: 0, scale: 1, opacity: 1 });
        if (title) gsap.set(title, { y: 0, opacity: 1 });
        if (body) gsap.set(body, { y: 0, opacity: 1 });
        if (ctas.length) gsap.set(ctas, { y: 0, opacity: 1 });
        if (card) gsap.set(card, { rotate: 0, scale: 1, opacity: 1 });
        if (numRef.current) numRef.current.textContent = '40';
        return;
      }

      if (tag) gsap.set(tag, { rotate: -45, scale: 0, opacity: 0 });
      if (title) gsap.set(title, { y: 20, opacity: 0 });
      if (body) gsap.set(body, { y: 16, opacity: 0 });
      if (ctas.length) gsap.set(ctas, { y: 14, opacity: 0 });
      if (card) gsap.set(card, { rotate: -15, scale: 0.85, opacity: 0 });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        const tl = gsap.timeline();
        if (tag) tl.to(tag, { rotate: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' });
        if (title) tl.to(title, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.3');
        if (body) tl.to(body, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
        if (ctas.length) tl.to(ctas, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.25');
        if (card) tl.to(card, { rotate: 3, scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5');
        if (numRef.current) numberCount(numRef.current, 40, { duration: 1.4 });
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0, rootMargin: '0px 0px -15% 0px' }
      );
      io.observe(root);
      const fallback = window.setTimeout(play, 2000);
      return () => {
        io.disconnect();
        window.clearTimeout(fallback);
      };
    },
    { scope: ref }
  );

  const joinClub = () => {
    if (user) toast.success('You&rsquo;re in!', 'Member perks unlocked.');
    else toast.demo('Sign up to join Club T-Goda', 'Open the Create Account button in the nav.');
  };

  return (
    <section ref={ref} className="px-4 pb-16 md:px-[42px] md:pb-20">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-stretch overflow-hidden rounded-xl bg-brand-deal md:h-[416px] md:flex-row md:items-center">
        <span data-pb-tag className="pointer-events-none absolute right-[360px] top-6 hidden text-ink/15 md:block">
          <IconStatic name="home/tag" width={220} height={220} />
        </span>
        <div className="relative flex flex-1 flex-col px-6 py-10 md:px-16 md:py-0">
          <h2
            data-pb-title
            className="max-w-[486px] text-[32px] font-extrabold leading-[36px] text-white md:text-[48px] md:leading-[48px]"
          >
            Summer Sales: Up to<br />
            <span ref={numRef}>40</span>% Off!
          </h2>
          <p data-pb-body className="mt-4 max-w-[538px] text-[15px] leading-6 text-white/85 md:mt-6 md:text-[18px] md:leading-7">
            Exclusive member deals on flights and luxury hotels for your next summer getaway. Valid until Oct 31st.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4">
            <Link
              data-pb-cta
              href="/search"
              className="rounded-md bg-white px-5 py-3 text-[15px] font-bold leading-6 text-brand-deal transition hover:scale-105 md:px-7 md:py-3.5 md:text-[18px] md:leading-7"
            >
              Explore Deals
            </Link>
            <button
              data-pb-cta
              type="button"
              onClick={joinClub}
              className="rounded-md border-2 border-white px-5 py-2.5 text-[15px] font-bold leading-6 text-white transition hover:bg-white/10 md:px-7 md:py-3 md:text-[18px] md:leading-7"
            >
              Join Club T-Goda
            </button>
          </div>
        </div>

        <div
          data-pb-card
          className="relative z-10 mx-auto mb-10 hidden h-[280px] w-[280px] shrink-0 rotate-3 overflow-hidden rounded-[36px] shadow-card md:mx-0 md:mb-0 md:mr-16 md:block md:h-[320px] md:w-[320px]"
        >
          <Image src="/images/home/swimming-pool.png" alt="Resort pool" fill sizes="320px" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
