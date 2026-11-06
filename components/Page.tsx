import { getContent } from '@/lib/content';
import { buildPageSchema } from '@/lib/schema';
import type { Locale } from '@/lib/site';
import { Header } from './Header';
import { Hero } from './Hero';
import { BackToTop } from './nav/BackToTop';
import { Reveal } from './nav/Reveal';
import { SmoothNav } from './nav/SmoothNav';

/** The whole page for one locale. Sections after the hero arrive in Tasks 7–9. */
export function Page({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPageSchema(locale)).replace(/</g, '\\u003c') }}
      />
      <SmoothNav />
      <Reveal />
      <BackToTop label={c.toTop} />
      <Header c={c} locale={locale} />
      <main id="top">
        <Hero c={c} locale={locale} />
      </main>
    </>
  );
}
