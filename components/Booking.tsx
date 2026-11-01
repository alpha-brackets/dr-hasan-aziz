'use client';

import { useState } from 'react';
import { DOCTOR, type SiteContent } from '@/lib/content';
import { CalendarIcon, ClockIcon, PhoneIcon, SparkIcon } from './icons';

/**
 * Slot booking UI.
 *
 * The date picker, slot list and submit button are intentionally left
 * empty/disabled: slot booking will be powered by an external booking
 * API later. Wire it up in `handleBook()` below (fetch the available
 * slots on date change, then POST the selected slot on submit).
 */
export function Booking({ content }: { content: SiteContent }) {
  const t = content.booking;
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  // Booking API integration point — intentionally empty for now.
  const handleBook = () => {
    void date;
    void slot;
    // TODO: integrate the external slot-booking API here.
  };

  return (
    <section className="section" id="booking">
      <div className="container">
        <div className="section-head">
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </div>

        <div className="booking-panel">
          <form
            className="booking-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleBook();
            }}
          >
            <div className="field">
              <label htmlFor="booking-date">
                <CalendarIcon className="icon-inline" />
                {t.dateLabel}
              </label>
              <input
                id="booking-date"
                name="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                disabled
              />
            </div>

            <fieldset className="slot-field">
              <legend>
                <ClockIcon className="icon-inline" />
                {t.slotLabel}
              </legend>
              <div className="slot-empty" role="status">
                <ClockIcon className="icon-inline slot-empty-icon" />
                <span>{t.placeholderNote}</span>
              </div>
              <input type="hidden" name="slot" value={slot} />
            </fieldset>

            <button type="submit" className="btn btn-primary btn-block" disabled>
              {t.button}
            </button>
          </form>

          <aside className="booking-aside">
            <span className="soon-badge">
              <SparkIcon className="icon-inline" />
              {t.comingSoon}
            </span>
            <p>{t.fallback}</p>
            <a
              href={`tel:${DOCTOR.phoneTel}`}
              className="btn btn-white btn-block btn-lg"
            >
              <PhoneIcon className="icon-inline" />
              <span dir="ltr">{DOCTOR.phoneDisplay}</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
