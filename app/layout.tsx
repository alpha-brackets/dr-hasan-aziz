import type { Metadata, Viewport } from 'next';
import { Figtree, Gulzar } from 'next/font/google';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-figtree',
  display: 'swap',
});

const gulzar = Gulzar({
  subsets: ['arabic', 'latin'],
  weight: '400',
  variable: '--font-gulzar',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Dr. Hasan Aziz — Consultant Physician & Medical Specialist in Multan',
    template: '%s | Dr. Hasan Aziz',
  },
  applicationName: 'Dr. Hasan Aziz',
  category: 'health' as Metadata['category'],
  icons: { icon: '/icon.svg' },
  formatDetection: { telephone: false, address: true, email: false },
};

export const viewport: Viewport = {
  themeColor: '#074EA2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${figtree.variable} ${gulzar.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
