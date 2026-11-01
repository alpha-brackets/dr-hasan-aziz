import { LOCATIONS, type SiteContent } from '@/lib/content';
import { ArrowUpRightIcon, CalendarIcon, ClockIcon, MapPinIcon } from './icons';

export function Timings({ content }: { content: SiteContent }) {
  const t = content.timings;
  const isUrdu = content.dir === 'rtl';

  return (
    <section className="section" id="timings">
      <div className="container">
        <div className="section-head">
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </div>

        <div className="location-grid">
          {LOCATIONS.map((loc) => (
            <article
              className={`location-card location-${loc.id}`}
              key={loc.id}
              itemScope
              itemType="https://schema.org/MedicalClinic"
            >
              <header className="location-head">
                <h3 itemProp="name">{isUrdu ? loc.nameUrdu : loc.name}</h3>
                <span className="pill pill-closed">
                  {isUrdu ? loc.closedUrdu : loc.closed}
                </span>
              </header>

              <dl className="location-meta">
                <div>
                  <dt>
                    <ClockIcon className="icon-inline" />
                    {t.hoursLabel}
                  </dt>
                  <dd className="location-hours">
                    {isUrdu ? loc.timeUrdu : loc.time}
                  </dd>
                </div>
                <div>
                  <dt>
                    <CalendarIcon className="icon-inline" />
                    {t.daysLabel}
                  </dt>
                  <dd>{isUrdu ? loc.daysUrdu : loc.days}</dd>
                </div>
              </dl>

              <address className="location-address" itemProp="address">
                <MapPinIcon className="icon-inline location-address-icon" />
                <span>
                  {(isUrdu ? loc.addressLinesUrdu : loc.addressLines).map(
                    (line) => (
                      <span className="address-line" key={line}>
                        {line}
                      </span>
                    )
                  )}
                </span>
              </address>

              <a
                className="location-link"
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.directions}
                <ArrowUpRightIcon className="icon-inline" />
              </a>
            </article>
          ))}
        </div>

        <p className="timings-note">{t.note}</p>
      </div>
    </section>
  );
}
