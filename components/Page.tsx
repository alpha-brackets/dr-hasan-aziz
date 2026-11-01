import type { Locale } from '@/lib/site';
import { type SiteContent } from '@/lib/content';
import { buildPageSchema } from '@/lib/schema';
import { Header } from './Header';
import { Hero } from './Hero';
import { About } from './About';
import { Services } from './Services';
import { Specialties } from './Specialties';
import { Timings } from './Timings';
import { Booking } from './Booking';
import { ContactBand } from './ContactBand';
import { Footer } from './Footer';

export function Page({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const path = locale === 'ur' ? '/ur/' : '/';
  const schema = buildPageSchema(content, path);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a className="skip-link" href="#main">
        {content.skipLink}
      </a>
      <Header content={content} />
      <main id="main">
        <Hero content={content} />
        <Services content={content} />
        <Specialties content={content} />
        <About content={content} />
        <Timings content={content} />
        <Booking content={content} />
        <ContactBand content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
