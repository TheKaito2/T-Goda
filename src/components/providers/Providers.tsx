'use client';
import { useEffect, type ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth';
import { WishlistProvider } from '@/lib/wishlist';
import { ToastProvider } from '@/lib/toast';
import Toaster from '@/components/ui/Toaster';
import { ScrollTrigger } from '@/lib/gsap';

function FontReadyRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    if (fonts && 'ready' in fonts) {
      fonts.ready.then(refresh);
    } else {
      window.setTimeout(refresh, 200);
    }
  }, []);
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <FontReadyRefresh />
          {children}
          <Toaster />
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
