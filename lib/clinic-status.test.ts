import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  clinicState,
  heroStatus,
  karachiParts,
  formatDuration,
  formatClock,
  trackPercent,
} from './clinic-status.ts';

const ALL_BUT_SUN = [false, true, true, true, true, true, true] as const;
const HAYAT = { id: 'hayat', openMin: 660, closeMin: 1140, days: ALL_BUT_SUN } as const;
const DUA = { id: 'dua', openMin: 1140, closeMin: 1320, days: ALL_BUT_SUN } as const;
const BOTH = [HAYAT, DUA];
const MON = 1, SAT = 6, SUN = 0;

test('clinicState boundaries', () => {
  assert.deepEqual(clinicState(MON, 659, HAYAT), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(MON, 660, HAYAT), { kind: 'open', closeMin: 1140 });
  assert.deepEqual(clinicState(MON, 1139, HAYAT), { kind: 'open', closeMin: 1140 });
  assert.deepEqual(clinicState(MON, 1140, HAYAT), { kind: 'done' });
  assert.deepEqual(clinicState(MON, 1139, DUA), { kind: 'later', minsUntilOpen: 1 });
  assert.deepEqual(clinicState(MON, 1140, DUA), { kind: 'open', closeMin: 1320 });
  assert.deepEqual(clinicState(MON, 1319, DUA), { kind: 'open', closeMin: 1320 });
  assert.deepEqual(clinicState(MON, 1320, DUA), { kind: 'done' });
});

test('clinicState sunday', () => {
  assert.deepEqual(clinicState(SUN, 700, HAYAT), { kind: 'closed-today' });
  assert.deepEqual(clinicState(SUN, 700, DUA), { kind: 'closed-today' });
});

test('heroStatus order', () => {
  assert.deepEqual(heroStatus(SUN, 1200, BOTH), { kind: 'sunday' });
  assert.deepEqual(heroStatus(MON, 700, BOTH), { kind: 'open', clinic: 'hayat', closeMin: 1140 });
  assert.deepEqual(heroStatus(MON, 1200, BOTH), { kind: 'open', clinic: 'dua', closeMin: 1320 });
  assert.deepEqual(heroStatus(MON, 600, BOTH), { kind: 'next', clinic: 'hayat', minsUntilOpen: 60 });
  assert.deepEqual(heroStatus(MON, 1330, BOTH), { kind: 'closed', bookFor: 'tomorrow' });
  assert.deepEqual(heroStatus(SAT, 1330, BOTH), { kind: 'closed', bookFor: 'monday' });
});

test('heroStatus page left open across a boundary', () => {
  assert.deepEqual(heroStatus(SAT, 1319, BOTH), { kind: 'open', clinic: 'dua', closeMin: 1320 });
  assert.deepEqual(heroStatus(SAT, 1320, BOTH), { kind: 'closed', bookFor: 'monday' });
  assert.deepEqual(heroStatus(SAT, 1439, BOTH), { kind: 'closed', bookFor: 'monday' });
  assert.deepEqual(heroStatus(SUN, 0, BOTH), { kind: 'sunday' });
});

test('karachiParts from UTC', () => {
  assert.deepEqual(karachiParts(new Date('2026-11-09T06:00:00Z')), { day: 1, minutes: 660 });
  assert.deepEqual(karachiParts(new Date('2026-11-07T20:30:00Z')), { day: 0, minutes: 90 });
});

test('formatDuration', () => {
  assert.equal(formatDuration(134, 'en'), '2h 14m');
  assert.equal(formatDuration(45, 'en'), '45m');
  assert.equal(formatDuration(60, 'en'), '1h');
  assert.equal(formatDuration(134, 'ur'), '2 گھنٹے 14 منٹ');
  assert.equal(formatDuration(45, 'ur'), '45 منٹ');
});

test('formatClock', () => {
  assert.equal(formatClock(660), '11 AM');
  assert.equal(formatClock(1140), '7 PM');
  assert.equal(formatClock(1170), '7:30 PM');
  assert.equal(formatClock(720), '12 PM');
});

test('trackPercent', () => {
  assert.equal(trackPercent(540), 0);
  assert.equal(trackPercent(1380), 100);
  assert.equal(trackPercent(960), 50);
  assert.equal(trackPercent(300), 0);
  assert.equal(trackPercent(1430), 100);
});
