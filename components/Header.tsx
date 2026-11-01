import { DOCTOR, type SiteContent } from '@/lib/content';
import { BrandMark, GlobeIcon, PhoneIcon } from './icons';

const NAV_ITEMS = [
  { href: '#services', key: 'services' },
  { href: '#timings', key: 'timings' },
  { href: '#about', key: 'about' },
] as const;

export function Header({ content }: { content: SiteContent }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand">
          <BrandMark className="brand-mark" />
          <span className="brand-text">
            <strong>{content.hero.name}</strong>
            <span className="brand-sub">{content.hero.title}</span>
          </span>
        </a>

        <nav className="nav" aria-label={content.footer.navLabel}>
          {NAV_ITEMS.map((item) => (
            <a key={item.key} href={item.href} className="nav-link">
              {content.nav[item.key]}
            </a>
          ))}
          <a href="#booking" className="btn btn-primary btn-sm">
            {content.nav.book}
          </a>
          <a
            href={content.switchHref}
            className="lang-switch"
            lang={content.dir === 'rtl' ? 'en' : 'ur'}
            hrefLang={content.dir === 'rtl' ? 'en' : 'ur'}
          >
            <GlobeIcon className="icon-inline" />
            {content.langLabel}
          </a>
          <a
            href={`tel:${DOCTOR.phoneTel}`}
            className="btn btn-outline btn-sm header-phone"
          >
            <PhoneIcon className="icon-inline" />
            <span dir="ltr">{DOCTOR.phoneDisplay}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
