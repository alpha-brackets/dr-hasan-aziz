import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPageSchema } from './schema.ts';

type Node = Record<string, any>;
const graph = (l: 'en' | 'ur') => (buildPageSchema(l) as any)['@graph'] as Node[];
const MON_SAT = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parts(l: 'en' | 'ur' = 'en') {
  const g = graph(l);
  const physicians = g.filter((n) => n['@type'] === 'Physician');
  const clinics = g.filter((n) => n['@type'] === 'MedicalClinic');
  const hayat = clinics.find((c) => String(c['@id']).endsWith('#hayat'))!;
  const dua = clinics.find((c) => String(c['@id']).endsWith('#dua'))!;
  return { physicians, clinics, hayat, dua };
}

test('graph has one Physician and two clinics', () => {
  const { physicians, clinics, hayat, dua } = parts();
  assert.equal(physicians.length, 1);
  assert.equal(clinics.length, 2);
  assert.ok(hayat && dua);
});

test('Physician worksFor and qualification', () => {
  const { physicians, hayat, dua } = parts();
  const p = physicians[0];
  assert.deepEqual(p.worksFor, [{ '@id': hayat['@id'] }, { '@id': dua['@id'] }]);
  assert.deepEqual(p.qualification, ['MBBS', 'FCPS (Medicine)']);
});

test('opening hours are Mon-Sat with correct times', () => {
  const { hayat, dua } = parts();
  for (const c of [hayat, dua]) {
    assert.deepEqual(c.openingHoursSpecification[0].dayOfWeek, MON_SAT);
  }
  assert.equal(hayat.openingHoursSpecification[0].opens, '11:00');
  assert.equal(hayat.openingHoursSpecification[0].closes, '19:00');
  assert.equal(dua.openingHoursSpecification[0].opens, '19:00');
  assert.equal(dua.openingHoursSpecification[0].closes, '22:00');
});

test('no telephone or Prime anywhere', () => {
  const s = JSON.stringify(buildPageSchema('en'));
  assert.ok(!s.includes('telephone'));
  assert.ok(!s.includes('Prime'));
});

test('addresses', () => {
  const { hayat, dua } = parts();
  assert.ok(!('address' in hayat));
  assert.ok(dua.address.streetAddress.includes('Sher Shah Road'));
});

test('Urdu locale', () => {
  const { clinics } = parts('ur');
  const names = clinics.map((c) => c.name);
  assert.ok(names.every((n) => /[\u0600-\u06FF]/.test(n)));
  assert.ok(graph('ur').some((n) => n.inLanguage === 'ur-PK'));
});
