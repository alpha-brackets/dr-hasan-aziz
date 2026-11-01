import { type SiteContent } from '@/lib/content';
import { MedIcon } from './icons';
import { SERVICES } from '@/lib/content';

export function Services({ content }: { content: SiteContent }) {
  const t = content.services;

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </div>

        <ul className="service-grid">
          {SERVICES.map((service) => (
            <li className="service-card" key={service.name}>
              <span className="service-icon">
                <MedIcon name={service.icon} />
              </span>
              <h3>{content.dir === 'rtl' ? service.nameUrdu : service.name}</h3>
              <p>{content.dir === 'rtl' ? service.blurbUrdu : service.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
