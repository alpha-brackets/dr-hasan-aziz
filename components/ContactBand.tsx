import { DOCTOR, LOCATIONS, type SiteContent } from '@/lib/content';
import { PhoneIcon } from './icons';

export function ContactBand({ content }: { content: SiteContent }) {
  const t = content.contact;

  return (
    <section className="contact-band" id="contact">
      <div className="container contact-inner">
        <div className="contact-copy">
          <p className="contact-label">{t.phoneLabel}</p>
          <p className="contact-number" dir="ltr">
            {DOCTOR.phoneDisplay}
          </p>
          <p className="contact-note">{t.appointmentNote}</p>
        </div>

        <div className="contact-actions">
          <a
            href={`tel:${DOCTOR.phoneTel}`}
            className="btn btn-white btn-lg contact-call"
          >
            <PhoneIcon className="icon-inline" />
            {t.callNow}
          </a>
          <ul className="contact-locations">
            {LOCATIONS.map((loc) => (
              <li key={loc.id}>
                {content.dir === 'rtl' ? loc.nameUrdu : loc.name} —{' '}
                {content.dir === 'rtl' ? loc.timeUrdu : loc.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
