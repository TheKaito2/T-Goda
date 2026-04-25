'use client';
import { gsap } from './gsap';

export function splitChars(el: HTMLElement) {
  if (!el || el.dataset.split === 'done') return Array.from(el.querySelectorAll<HTMLElement>('[data-char]'));
  const text = el.textContent ?? '';
  el.textContent = '';
  const frag = document.createDocumentFragment();
  const out: HTMLElement[] = [];

  const lines = text.split('\n');
  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) frag.appendChild(document.createElement('br'));
    const tokens = line.split(/(\s+)/);
    tokens.forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        return;
      }
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      for (const ch of tok) {
        const charSpan = document.createElement('span');
        charSpan.setAttribute('data-char', '');
        charSpan.style.display = 'inline-block';
        charSpan.style.willChange = 'transform, opacity';
        charSpan.textContent = ch;
        wordSpan.appendChild(charSpan);
        out.push(charSpan);
      }
      frag.appendChild(wordSpan);
    });
  });

  el.appendChild(frag);
  el.dataset.split = 'done';
  return out;
}

export function magnetic(el: HTMLElement, strength = 0.35) {
  let raf = 0;
  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
    });
  };
  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    cancelAnimationFrame(raf);
  };
}

export function cardHover(el: HTMLElement) {
  const enter = () => gsap.to(el, { y: -6, scale: 1.015, duration: 0.4, ease: 'power3.out' });
  const leave = () => gsap.to(el, { y: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
  el.addEventListener('mouseenter', enter);
  el.addEventListener('mouseleave', leave);
  return () => {
    el.removeEventListener('mouseenter', enter);
    el.removeEventListener('mouseleave', leave);
  };
}

export function numberCount(
  el: HTMLElement,
  to: number,
  options: { from?: number; duration?: number; format?: (n: number) => string } = {}
) {
  const { from = 0, duration = 1.2, format = (n) => Math.round(n).toString() } = options;
  const obj = { v: from };
  return gsap.to(obj, {
    v: to,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = format(obj.v);
    },
  });
}
