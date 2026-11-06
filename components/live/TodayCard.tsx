'use client';

import type { CSSProperties } from 'react';
import { CLINICS, getContent, type Clinic } from '@/lib/content';
import { TRACK_END, TRACK_START, formatClock, trackPercent } from '@/lib/clinic-status';
import type { Locale } from '@/lib/site';
import { clinicLabel } from './clinicLabel';
import { dotClass, useKarachiNow } from './useKarachiNow';

const TICKS = [540, 720, 900, 1080, 1260, 1380]; // 9 AM … 11 PM
const SEG_CLASS: Record<string, string> = { hayat: 'hy', dua: 'du' };

/** "Where is he today?": the 9 AM – 11 PM track, the Now marker and one row per clinic (spec §7.3). */
export function TodayCard({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const now = useKarachiNow();
  const sunday = now !== null && !CLINICS.some((x) => x.days[now.day]);
  const name = (x: Clinic) => (locale === 'ur' ? x.nameUr : x.name);
  const date =
    now &&
    new Date().toLocaleDateString(locale === 'ur' ? 'ur-PK-u-nu-latn' : 'en-GB', {
      timeZone: 'Asia/Karachi',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

  // `is-sunday` sits on an inner wrapper: React must not rewrite the `.rv`
  // element's className after Reveal has added `in` to it.
  return (
    <div className="card h-today rv" style={{ '--d': '.2s' } as CSSProperties} id="today">
      <div className="t-head">
        <h3>{c.today.heading}</h3>
        <span className="d">{date}</span>
      </div>
      <div className={sunday ? 'is-sunday' : undefined}>
        <div className="track">
          <div className="rail" />
          {CLINICS.map((x) => (
            <div
              key={x.id}
              className={`seg ${SEG_CLASS[x.id] ?? ''}`}
              style={{
                left: `${trackPercent(x.openMin)}%`,
                width: `${trackPercent(x.closeMin) - trackPercent(x.openMin)}%`,
              }}
            >
              {name(x)}
            </div>
          ))}
          {now && now.minutes >= TRACK_START && now.minutes <= TRACK_END && (
            <div
              className="now"
              style={{ left: `${trackPercent(now.minutes)}%` }}
              data-t={`${c.today.now} ${formatClock(now.minutes)}`}
            />
          )}
        </div>
        <div className="ticks">
          {TICKS.map((m) => (
            <span key={m}>{formatClock(m)}</span>
          ))}
        </div>
        <div className="t-foot">
          {CLINICS.map((x) => {
            const live = now ? clinicLabel(x, now, c, locale) : null;
            return (
              <div className="t-row" key={x.id}>
                <span className={dotClass(live ? live.state : 'off')} />
                <b>{name(x).split(' ')[0]}</b> {formatClock(x.openMin)} – {formatClock(x.closeMin)}
                <span>{live?.text}</span>
              </div>
            );
          })}
        </div>
        <div className="sunday">{c.status.sundayNote}</div>
      </div>
    </div>
  );
}
