import { DOCTOR, LOCATIONS, type SiteContent } from '@/lib/content';
import { BrandMark, MapPinIcon, PhoneIcon } from './icons';

const FOOTER_LINKS = [
  { href: '#services', key: 'services' },
  { href: '#timings', key: 'timings' },
  { href: '#booking', key: 'book' },
  { href: '#about', key: 'about' },
] as const;

export function Footer({ content }: { content: SiteContent }) {
  const t = content.footer;
  const isUrdu = content.dir === 'rtl';
  const year = 2026;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <BrandMark className="brand-mark" />
            <strong>{content.hero.name}</strong>
          </div>
          <p>{t.tagline}</p>
          <a
            href={`tel:${DOCTOR.phoneTel}`}
            className="footer-phone"
          >
            <PhoneIcon className="icon-inline" />
            <span dir="ltr">{DOCTOR.phoneDisplay}</span>
          </a>
        </div>

        <nav className="footer-col" aria-label={t.navLabel}>
          <h2>{t.navLabel}</h2>
          <ul>
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{content.nav[link.key]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col footer-locations">
          <h2>{content.timings.heading}</h2>
          <ul>
            {LOCATIONS.map((loc) => (
              <li key={loc.id}>
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPinIcon className="icon-inline" />
                  <span>
                    <strong>{isUrdu ? loc.nameUrdu : loc.name}</strong>
                    <span className="footer-address">
                      {(isUrdu ? loc.addressLinesUrdu : loc.addressLines).join(
                        ' '
                      )}
                    </span>
                    <span className="footer-hours">
                      {isUrdu ? loc.timeUrdu : loc.time} ·{' '}
                      {isUrdu ? loc.closedUrdu : loc.closed}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="disclaimer">{t.disclaimer}</p>
        <p className="copyright">
          © {year} {content.hero.name}. {t.rights}
        </p>
      </div>
    </footer>
  );
}
