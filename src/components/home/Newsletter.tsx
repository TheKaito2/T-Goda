'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import IconStatic from '@/components/ui/IconStatic';
import { gsap } from '@/lib/gsap';
import { useToast } from '@/lib/toast';

const KEY = 'tgoda.newsletter';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONFETTI_COLORS = ['#005CBD', '#16A34A', '#FACC15', '#B61B4A', '#5392F9', '#FF567D'];

export default function Newsletter() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const icon = iconRef.current;
      const title = root.querySelector<HTMLElement>('[data-nl-title]');
      const body = root.querySelector<HTMLElement>('[data-nl-body]');
      const form = root.querySelector<HTMLElement>('[data-nl-form]');

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        if (icon) gsap.set(icon, { y: 0, scale: 1, opacity: 1 });
        if (title) gsap.set(title, { y: 0, opacity: 1 });
        if (body) gsap.set(body, { y: 0, opacity: 1 });
        if (form) gsap.set(form, { y: 0, opacity: 1 });
        return;
      }

      if (icon) gsap.set(icon, { y: -30, scale: 0.6, opacity: 0 });
      if (title) gsap.set(title, { y: 18, opacity: 0 });
      if (body) gsap.set(body, { y: 14, opacity: 0 });
      if (form) gsap.set(form, { y: 14, opacity: 0 });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        const tl = gsap.timeline();
        if (icon) tl.to(icon, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' });
        if (title) tl.to(title, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.25');
        if (body) tl.to(body, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
        if (form) tl.to(form, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
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
      return () => {
        io.disconnect();
        window.clearTimeout(fallback);
      };
    },
    { scope: sectionRef }
  );

  const fireConfetti = () => {
    const host = formRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    for (let i = 0; i < 18; i++) {
      const piece = document.createElement('span');
      piece.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background: ${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};
        pointer-events: none;
        z-index: 200;
      `;
      document.body.appendChild(piece);
      gsap.to(piece, {
        x: (Math.random() - 0.5) * 480,
        y: (Math.random() - 0.5) * 360 - 120,
        rotate: Math.random() * 720,
        opacity: 0,
        duration: 1.1 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => piece.remove(),
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;
    if (!EMAIL_RE.test(email.trim())) {
      if (formRef.current) {
        formRef.current.classList.remove('tg-shake');
        void formRef.current.offsetWidth;
        formRef.current.classList.add('tg-shake');
      }
      toast.error('That doesn&rsquo;t look like a valid email');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
    try {
      localStorage.setItem(KEY, email.trim());
    } catch {}
    fireConfetti();
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'power3.out' });
    }
    toast.success('You&rsquo;re subscribed!', 'Check your inbox for our welcome offer.');
  };

  return (
    <section ref={sectionRef} className="px-4 pb-12 md:px-[42px] md:pb-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center rounded-xl bg-surface-light px-6 py-12 text-center md:px-12 md:py-14">
        <span ref={iconRef} className="text-brand-primary">
          <IconStatic name="home/mail" size={36} className="text-brand-primary" />
        </span>
        <h2
          data-nl-title
          className="mt-4 text-[24px] font-bold leading-8 text-ink md:text-[30px] md:leading-9"
        >
          Get Travel Deals Directly
        </h2>
        <p
          data-nl-body
          className="mt-3 max-w-[662px] text-[14px] leading-5 text-ink-soft md:text-[18px] md:leading-7"
        >
          Subscribe to our newsletter and get early access to hidden gems and seasonal discounts. No spam, only adventure.
        </p>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          data-nl-form
          className="mt-6 flex w-full max-w-[686px] flex-col gap-3 md:mt-8 md:flex-row"
          noValidate
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitted}
            className="h-[57px] flex-1 rounded-[11.5px] bg-white px-5 text-[16px] text-ink placeholder:text-[#6B7280] outline-none transition focus:ring-2 focus:ring-brand-primary/30 disabled:opacity-70"
          />
          <button
            ref={buttonRef}
            type="submit"
            disabled={submitting || submitted}
            className={`h-[57px] rounded-md px-8 text-[16px] font-bold text-white transition hover:opacity-95 disabled:opacity-90 ${submitted ? 'bg-emerald-600' : 'bg-brand-primary'}`}
          >
            {submitted ? '✓ Subscribed' : submitting ? 'Sending…' : 'Subscribe Now'}
          </button>
        </form>

        <p className="mt-4 text-[12px] leading-4 text-ink-soft">
          By subscribing, you agree to our{' '}
          <a href="/terms" className="underline hover:text-ink">Terms of Service</a> and{' '}
          <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}
