'use client';

import { CLINICS, getContent } from '@/lib/content';
import { formatClock, formatDuration, heroStatus } from '@/lib/clinic-status';
import type { Locale } from '@/lib/site';
import { dotClass, useKarachiNow, type LiveState } from './useKarachiNow';

/** The hero's live status pill (spec §7.2). Neutral until hydrated. */
export function StatusPill({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const now = useKarachiNow();
  const comma = c.status.comma;
  const nameOf = (id: string) => {
    const clinic = CLINICS.find((x) => x.id === id);
    return clinic ? (locale === 'ur' ? clinic.nameUr : clinic.name) : '';
  };

  let state: LiveState = 'off';
  let text = c.status.neutral;
  let where: string | null = null;

  if (now) {
    const s = heroStatus(now.day, now.minutes, CLINICS);
    switch (s.kind) {
      case 'sunday':
        text = c.status.sunday;
        where = c.status.bookMonday;
        break;
      case 'open':
        state = 'open';
        text = c.status.seeing;
        where = nameOf(s.clinic) + comma + c.status.until(formatClock(s.closeMin));
        break;
      case 'next':
        state = 'later';
        text = c.status.next;
        where = nameOf(s.clinic) + comma + c.status.opensIn(formatDuration(s.minsUntilOpen, locale));
        break;
      case 'closed':
        text = c.status.closedNow;
        where = s.bookFor === 'monday' ? c.status.bookMonday : c.status.bookTomorrow;
        break;
    }
  }

  return (
    <span className="pill-status">
      <span className={dotClass(state)} />
      <span>{text}</span>
      {where && <b>{c.status.lead + where}</b>}
    </span>
  );
}
