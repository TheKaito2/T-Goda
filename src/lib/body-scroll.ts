'use client';

let count = 0;
let originalOverflow: string | null = null;

export function lockBodyScroll(): () => void {
  if (typeof document === 'undefined') return () => {};
  if (count === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  count += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    count = Math.max(0, count - 1);
    if (count === 0) {
      document.body.style.overflow = originalOverflow ?? '';
      originalOverflow = null;
    }
  };
}
