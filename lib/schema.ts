import { DOCTOR, LOCATIONS, SERVICES, type SiteContent } from './content';
import { SITE_URL } from './site';

/** Days each clinic is open (weekly off excluded). */
const DUA_OPEN_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const PRIME_OPEN_DAYS = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
];

/**
 * Structured data (JSON-LD) for the page — Physician + MedicalClinic
 * with opening hours, so Google can show rich results in both languages.
 */
export function buildPageSchema(content: SiteContent, path: string) {
  const isUrdu = content.dir === 'rtl';
  const pageUrl = `${SITE_URL}${path}`;

  const addressOf = (lines: string[]) => ({
    '@type': 'PostalAddress',
    streetAddress: lines.join(' '),
    addressLocality: 'Multan',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  });

  const clinicSchema = (
    id: 'dua' | 'prime',
    days: string[],
    opens: string,
    closes: string
  ) => {
    const loc = LOCATIONS.find((l) => l.id === id)!;
    return {
      '@type': 'MedicalClinic',
      '@id': `${pageUrl}#${id}-hospital`,
      name: isUrdu ? loc.nameUrdu : loc.name,
      alternateName: isUrdu ? loc.name : loc.nameUrdu,
      url: pageUrl,
      telephone: DOCTOR.phoneTel,
      medicalSpecialty: 'InternalMedicine',
      address: addressOf(
        isUrdu ? loc.addressLinesUrdu : loc.addressLines
      ),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: days,
          opens,
          closes,
        },
      ],
      availableService: SERVICES.map((s) => ({
        '@type': 'MedicalTherapy',
        name: isUrdu ? s.nameUrdu : s.name,
      })),
    };
  };

  const dua = clinicSchema('dua', DUA_OPEN_DAYS, '19:00', '22:00');
  const prime = clinicSchema('prime', PRIME_OPEN_DAYS, '11:00', '18:00');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Dr. Hasan Aziz',
        alternateName: 'ڈاکٹر حسن عزیز',
        url: pageUrl,
        inLanguage: isUrdu ? 'ur-PK' : 'en-PK',
      },
      {
        '@type': 'Physician',
        '@id': `${pageUrl}#physician`,
        name: DOCTOR.name,
        alternateName: DOCTOR.nameUrdu,
        description: content.meta.description,
        url: pageUrl,
        telephone: DOCTOR.phoneTel,
        jobTitle: content.hero.title,
        medicalSpecialty: 'InternalMedicine',
        qualification: ['MBBS', 'FCPS (Medicine)'],
        knowsLanguage: ['en', 'ur'],
        availableService: SERVICES.map((s) => ({
          '@type': 'MedicalTherapy',
          name: isUrdu ? s.nameUrdu : s.name,
        })),
        worksFor: [{ '@id': dua['@id'] }, { '@id': prime['@id'] }],
      },
      dua,
      prime,
    ],
  };
}
