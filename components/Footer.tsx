import { CLINICS, DOCTOR, DOCTOR_SOCIAL, NETWORK_NAMES, type SiteContent, type SocialLink } from '@/lib/content';
import { bookingHref, directionsHref, siteHost } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';
import { navItems } from './nav/items';

// Section numbers match the section overlines, so they stay fixed even when Reviews (05) is hidden.
/** Dua Hospital's white logo, shown beside "Part of Dua Hospital" at the very bottom. */
const DUA_LOGO_WHITE = CLINICS.find((x) => x.id === 'dua')?.logo?.white;

const NUMBERS: Record<string, string> = {
  '#doctor': '01',
  '#treatments': '02',
  '#clinics': '03',
  '#book': '04',
  '#reviews': '05',
  '#faq': '06',
};

/** A row of round social icons; each link names the network and whose account it is. */
function Social({ links, owner, label, me }: { links: readonly SocialLink[]; owner: string; label: string; me?: boolean }) {
  return (
    <ul className="soc" aria-label={label}>
      {links.map((s) => (
        <li key={s.network}>
          <a
            href={s.url}
            target="_blank"
            rel={me ? 'noopener me' : 'noopener'}
            aria-label={`${NETWORK_NAMES[s.network]} · ${owner}`}
            title={NETWORK_NAMES[s.network]}
          >
            <Icon name={s.network} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The four-column footer (spec §3.11). No back-to-top link: the floating button does that. */
export function Footer({ c, locale }: { c: SiteContent; locale: Locale }) {
  const f = c.footer;
  const ur = locale === 'ur';
  const other = ur ? 'en' : 'ur';
  return (
    <footer>
      <div className="wrap">
        <div className="ft">
          <div className="ft-brand">
            <div className="nm">{ur ? DOCTOR.nameUr : DOCTOR.name}</div>
            <p>
              {f.tagline1}
              <br />
              {f.tagline2}
            </p>
            {!ur && (
              <span className="ur" lang="ur">
                {DOCTOR.nameUr}
              </span>
            )}
            <a className="btn wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
              <Icon name="wa" />
              {c.nav.cta}
            </a>
            <div className="ft-social">
              <span className="ft-follow">{f.followDoctor}</span>
              <Social links={DOCTOR_SOCIAL} owner={ur ? DOCTOR.nameUr : DOCTOR.name} label={f.followDoctor} me />
            </div>
          </div>
          <nav className="ft-links" aria-label={f.onPage}>
            <h4>{f.onPage}</h4>
            {navItems(c).map((i) => (
              <a key={i.href} href={i.href}>
                <span className="n">{NUMBERS[i.href]}</span>
                {i.label}
              </a>
            ))}
          </nav>
          <div>
            <h4>{f.clinicsHeading}</h4>
            {CLINICS.map((clinic) => (
              <div className="ft-clinic" key={clinic.id}>
                <b>
                  {clinic.logo && <img className="ft-logo" src={clinic.logo.white} alt="" width={22} height={21} />}
                  {ur ? clinic.nameUr : clinic.name}
                </b>
                <span dir="ltr">{clinic.hoursText}</span>
                <a href={directionsHref(clinic.mapsQuery)} target="_blank" rel="noopener">
                  <Icon name="nav" />
                  {c.clinics.directions}
                </a>
                {clinic.website && (
                  <a href={clinic.website} target="_blank" rel="noopener">
                    <Icon name="globe" />
                    <span lang="en" dir="ltr">
                      {siteHost(clinic.website)}
                    </span>
                  </a>
                )}
                {clinic.social && (
                  <Social
                    links={clinic.social}
                    owner={ur ? clinic.nameUr : clinic.name}
                    label={f.followClinic(ur ? clinic.nameUr : clinic.name)}
                  />
                )}
              </div>
            ))}
            <div className="ft-note">{c.hero.note}</div>
          </div>
          <div className="ft-links">
            <h4>{f.help}</h4>
            <a className="wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
              <Icon name="wa" />
              {c.nav.cta}
            </a>
            <a href="#faq">
              <Icon name="chat" />
              {f.questions}
            </a>
            <a href={ur ? '/' : '/ur/'} lang={other} hrefLang={other}>
              <Icon name="globe" />
              {f.urduLink}
            </a>
            <div className="ft-emerg">
              <b>{f.emergency.title}</b> {f.emergency.body}
            </div>
          </div>
        </div>
        <div className="ft-bottom">
          <span className="ft-copy">
            {DUA_LOGO_WHITE && <img className="ft-logo" src={DUA_LOGO_WHITE} alt="" width={22} height={21} />}
            {f.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
