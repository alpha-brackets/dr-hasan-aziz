import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CLINICS, REVIEWS, TREATMENTS, TREATMENT_GROUPS, getContent } from './content.ts';

// Every string in a value; functions are called with a sample argument so their text is checked too.
function leaves(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (typeof value === 'function') return [String(value('X'))];
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (value && typeof value === 'object') return Object.values(value).flatMap(leaves);
  return [];
}

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

const en = getContent('en');
const ur = getContent('ur');
const all = [en, ur, CLINICS, TREATMENTS];
const allText = [JSON.stringify(all), ...leaves(all)].join('\n');

test('21 treatments', () => {
  assert.equal(TREATMENTS.length, 21);
  assert.deepEqual(TREATMENT_GROUPS, ['day', 'long', 'heart', 'stomach', 'chest']);
  const counts: Record<string, number> = {};
  for (const t of TREATMENTS) counts[t.group] = (counts[t.group] ?? 0) + 1;
  assert.deepEqual(counts, { day: 5, long: 6, heart: 3, stomach: 4, chest: 3 });
  assert.deepEqual(
    TREATMENTS.map((t) => t.name),
    [
      'Fever', 'Dengue', 'Allergy', 'Headache', 'Back & joint pain',
      'Sugar (diabetes)', 'Blood pressure', 'Low blood (anaemia)', 'Obesity', 'Kidney stones', 'Kidney & bladder',
      'Heart disease', 'Stroke & paralysis', 'Fits (epilepsy)',
      'Acidity', 'Ulcer', 'Jaundice', 'Hepatitis',
      'Cough', 'Asthma', 'TB',
    ],
  );
  for (const t of TREATMENTS) {
    assert.ok(t.nameUr && t.blurb && t.blurbUr, `${t.name} has all text`);
  }
});

test('clinics', () => {
  assert.deepEqual(CLINICS.map((c) => c.id), ['hayat', 'dua']);
  for (const c of CLINICS) {
    assert.deepEqual([...c.days], [false, true, true, true, true, true, true]);
  }
  const [hayat, dua] = CLINICS;
  assert.deepEqual([hayat.openMin, hayat.closeMin], [660, 1140]);
  assert.deepEqual([dua.openMin, dua.closeMin], [1140, 1320]);
  assert.equal(hayat.hoursText, '11:00 AM – 7:00 PM');
  assert.equal(dua.hoursText, '7:00 PM – 10:00 PM');
  assert.equal(hayat.address, null);
  assert.ok(dua.address?.en.includes('Sher Shah Road'));
  assert.equal(hayat.mapsQuery, 'Hayat Medical Center Multan');
  assert.equal(dua.mapsQuery, 'Dua Hospital Bank Plaza Sher Shah Road Garden Town Multan');
});

test('reviews ship empty', () => {
  assert.equal(REVIEWS.length, 0);
});

test('no stale data', () => {
  for (const stale of ['Prime', 'Shir', 'tel:', '3336489392', 'مزیدار', 'چیف فزیشن', 'The doctor']) {
    assert.ok(!allText.includes(stale), `found stale text: ${stale}`);
  }
  // The only call to action that mentions calling is the 1122 emergency line.
  const calls = [
    ...leaves(en).filter((s) => /\bcall\b/i.test(s)),
    ...leaves(ur).filter((s) => s.includes('کال کر')),
  ];
  assert.ok(calls.length > 0);
  for (const s of calls) assert.ok(s.includes('1122'), `call without 1122: ${s}`);
});

test('urdu uses Urdu letters, not Arabic ones', () => {
  assert.ok(!allText.includes('ه'), 'Arabic heh U+0647');
  assert.ok(!allText.includes('ي'), 'Arabic yeh U+064A');
  assert.ok(!allText.includes('ك'), 'Arabic kaf U+0643');
  assert.ok(!/[٠-٩۰-۹]/.test(allText), 'Western digits only');
});

test('en and ur have the same shape', () => {
  assert.deepEqual(shape(en), shape(ur));
  assert.equal(en.dir, 'ltr');
  assert.equal(ur.dir, 'rtl');
});

test('About Me label', () => {
  assert.equal(en.nav.about, 'About Me');
  assert.equal(en.about.overline, 'About Me');
});

test('neutral status', () => {
  assert.equal(en.status.neutral, 'Mon–Sat · see timings');
});

test('status strings take their variables', () => {
  assert.equal(en.status.until('7 PM'), 'until 7 PM');
  assert.equal(en.status.opensIn('2h 14m'), 'opens in 2h 14m');
  assert.equal(en.status.later('2h 14m'), 'Opens in 2h 14m');
  assert.ok(ur.status.until('7 PM').includes('7 PM'));
  assert.ok(ur.status.opensIn('2 گھنٹے').includes('2 گھنٹے'));
});
