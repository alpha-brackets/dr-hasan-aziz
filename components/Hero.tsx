import { DOCTOR, LOCATIONS, type SiteContent } from '@/lib/content';
import { CalendarIcon, CheckIcon, ClockIcon, MapPinIcon, PhoneIcon, SparkIcon } from './icons';

export function Hero({ content }: { content: SiteContent }) {
  const t = content.hero;

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <SparkIcon className="icon-inline" />
            {t.eyebrow}
          </p>
          <span className="badge-specialist">{t.specialistBadge}</span>
          <h1>{t.name}</h1>
          <p className="hero-title">{t.title}</p>
          <p className="hero-quals" lang={content.dir === 'rtl' ? 'ur' : 'en'}>
            {t.qualifications}
          </p>
          <p className="hero-intro">{t.intro}</p>

          <div className="hero-actions">
            <a href="#booking" className="btn btn-primary btn-lg">
              <CalendarIcon className="icon-inline" />
              {t.ctaBook}
            </a>
            <a
              href={`tel:${DOCTOR.phoneTel}`}
              className="btn btn-outline btn-lg"
            >
              <PhoneIcon className="icon-inline" />
              <span dir="ltr">{t.ctaCall}</span>
            </a>
          </div>
        </div>

        <aside className="hero-card" aria-label={t.quick}>
          <h2 className="hero-card-title">{t.quick}</h2>

          <ul className="hero-facts">
            <li>
              <span className="fact-icon">
                <ClockIcon className="icon-inline" />
              </span>
              <span>
                <strong>{t.quickHours}</strong>
              </span>
            </li>
            <li>
              <span className="fact-icon">
                <MapPinIcon className="icon-inline" />
              </span>
              <span>
                <strong>{t.quickLocations}</strong>
              </span>
            </li>
          </ul>

          <ul className="hero-clinics">
            {LOCATIONS.map((loc) => (
              <li key={loc.id}>
                <span className="clinic-dot" aria-hidden="true" />
                <span className="clinic-name">
                  {content.dir === 'rtl' ? loc.nameUrdu : loc.name}
                </span>
                <span className="clinic-hours">
                  {content.dir === 'rtl' ? loc.timeUrdu : loc.time}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={`tel:${DOCTOR.phoneTel}`}
            className="btn btn-blue btn-block hero-card-cta"
          >
            <PhoneIcon className="icon-inline" />
            <span dir="ltr">{DOCTOR.phoneDisplay}</span>
          </a>
          <p className="hero-card-note">
            <CheckIcon className="icon-inline" />
            {content.contact.appointmentNote}
          </p>
        </aside>
      </div>
    </section>
  );
}
