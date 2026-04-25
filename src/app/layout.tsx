import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Providers from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'T-Goda – Find Your Stay',
  description:
    'Unlock exclusive prices on over 2 million properties and flights across the globe.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto+Mono:wght@700&display=swap"
        />
      </head>
      <body className="bg-white font-sans text-ink antialiased">
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
