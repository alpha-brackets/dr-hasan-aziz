import type { Metadata, Viewport } from 'next';
import { SITE_URL } from '@/lib/site';
import './globals.css';

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
  formatDetection: { telephone: true, address: true, email: false },
};

export const viewport: Viewport = {
  themeColor: '#b4232a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
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
