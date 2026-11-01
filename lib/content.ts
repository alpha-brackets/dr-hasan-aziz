import type { Locale } from './site';

/* ------------------------------------------------------------------ */
/*  Shared, locale-independent data (names, numbers, addresses)        */
/* ------------------------------------------------------------------ */

export const DOCTOR = {
  name: 'Dr. Hasan Aziz',
  nameUrdu: 'ڈاکٹر حسن عزیز',
  phoneDisplay: '0333-6489392',
  phoneTel: '+923336489392',
};

export interface ClinicLocation {
  id: 'dua' | 'prime';
  name: string;
  nameUrdu: string;
  addressLines: string[];
  addressLinesUrdu: string[];
  /** Human readable working days, e.g. "Mon – Sat" */
  days: string;
  daysUrdu: string;
  /** e.g. "7:00 PM – 10:00 PM" */
  time: string;
  timeUrdu: string;
  closed: string;
  closedUrdu: string;
  mapsUrl: string;
}

export const LOCATIONS: ClinicLocation[] = [
  {
    id: 'dua',
    name: 'Dua Hospital',
    nameUrdu: 'دعا هسپتال',
    addressLines: [
      'First Floor, Bank Plaza,',
      'near Shell Petrol Pump, Shir Shah Road, Garden Town, Multan',
    ],
    addressLinesUrdu: [
      'فرسٹ فلور بینک پلازه نزد شیل پٹرول پمپ',
      'شیر شاہ روڈ گارڈن ٹاؤن ملتان',
    ],
    days: 'Monday – Saturday',
    daysUrdu: 'پیر تا ہفتہ',
    time: '7:00 PM – 10:00 PM',
    timeUrdu: 'شام 7 تا رات 10',
    closed: 'Closed on Sunday',
    closedUrdu: 'ناغہ برائے اتوار',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(
        'Dua Hospital Bank Plaza Shir Shah Road Garden Town Multan'
      ),
  },
  {
    id: 'prime',
    name: 'Prime Hospital',
    nameUrdu: 'پرائم هسپتال',
    addressLines: [
      'Ground Floor, Dost Plaza,',
      'Nishtar Road, Multan',
    ],
    addressLinesUrdu: ['گراؤنڈ فلور دوست پلازه نشتر روڈ ملتان'],
    days: 'Saturday – Thursday',
    daysUrdu: 'ہفتہ تا جمعرات',
    time: '11:00 AM – 6:00 PM',
    timeUrdu: 'صبح 11 بجے سے شام 6 بجے تک',
    closed: 'Closed on Friday',
    closedUrdu: 'ناغہ برائے جمعہ',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Prime Hospital Dost Plaza Nishtar Road Multan'),
  },
];

export type IconName =
  | 'liver'
  | 'lungs'
  | 'heart'
  | 'glucose'
  | 'thermometer'
  | 'wind'
  | 'droplet'
  | 'kidney'
  | 'pollen'
  | 'flame';

export interface ServiceItem {
  icon: IconName;
  name: string;
  nameUrdu: string;
  blurb: string;
  blurbUrdu: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: 'liver',
    name: 'Jaundice',
    nameUrdu: 'یرقان',
    blurb: 'Liver-related jaundice (yellowness) — diagnosis & treatment.',
    blurbUrdu: 'جگر کی بیماریوں اور یرقان کا تشخیص و علاج',
  },
  {
    icon: 'lungs',
    name: 'Cough',
    nameUrdu: 'کھانسی',
    blurb: 'Persistent cough, chest congestion & respiratory infections.',
    blurbUrdu: 'مزیدار کھانسی، سینے کی گھٹن اور سانس کی عارضات',
  },
  {
    icon: 'heart',
    name: 'Blood Pressure',
    nameUrdu: 'بلڈ پریشر',
    blurb: 'Hypertension detection, monitoring & long-term control.',
    blurbUrdu: 'ہائی بلڈ پریشر کی تشخیص، نگرانی اور کنٹرول',
  },
  {
    icon: 'glucose',
    name: 'Sugar (Diabetes)',
    nameUrdu: 'شوگر',
    blurb: 'Diabetes management, sugar profiles & complication screening.',
    blurbUrdu: 'شوگر (ذیابیطس) کا علاج اور ٹیسٹس کی نگرانی',
  },
  {
    icon: 'thermometer',
    name: 'Fever',
    nameUrdu: 'بخار',
    blurb: 'Work-up for persistent or recurring fever, including dengue & flu.',
    blurbUrdu: 'ڈینگی، فلو سمیت بار بار بخار کی مکمل جانچ',
  },
  {
    icon: 'wind',
    name: 'Asthma',
    nameUrdu: 'دمہ',
    blurb: 'Asthma & breathing difficulty — inhaler guidance and follow-up.',
    blurbUrdu: 'دمہ اور سانس کی تکلیف کا علاج، انہیلر کی رہنمائی',
  },
  {
    icon: 'droplet',
    name: 'Blood Deficiency',
    nameUrdu: 'خون کی کمی',
    blurb: 'Investigation & treatment of low blood counts and weakness.',
    blurbUrdu: 'کم خونی کی تشخیص اور علاج',
  },
  {
    icon: 'kidney',
    name: 'Kidney Stones',
    nameUrdu: 'گردے کی پتھری',
    blurb: 'Kidney stone detection, referral & follow-up care.',
    blurbUrdu: 'گردوں کی پتھری کی تشخیص اور فالو اپ',
  },
  {
    icon: 'pollen',
    name: 'Allergy',
    nameUrdu: 'الرجی',
    blurb: 'Skin, food & seasonal allergies with long-term relief plans.',
    blurbUrdu: 'جلد، کھانے اور موسمی الرجی کا طویل علاج',
  },
  {
    icon: 'flame',
    name: 'Acidity',
    nameUrdu: 'تیزابیت',
    blurb: 'Acidity, reflux, gastritis & general stomach discomfort.',
    blurbUrdu: 'تیزابیت، گیس اور معدے کے مسائل',
  },
];

/* ------------------------------------------------------------------ */
/*  Per-locale strings                                                 */
/* ------------------------------------------------------------------ */

export interface SiteContent {
  dir: 'ltr' | 'rtl';
  langLabel: string;
  switchHref: string;
  skipLink: string;

  meta: {
    title: string;
    description: string;
    keywords: string[];
  };

  nav: {
    services: string;
    timings: string;
    book: string;
    call: string;
    about: string;
  };

  hero: {
    eyebrow: string;
    name: string;
    title: string;
    qualifications: string;
    specialistBadge: string;
    intro: string;
    ctaBook: string;
    ctaCall: string;
    quick: string;
    quickHours: string;
    quickLocations: string;
  };

  about: {
    heading: string;
    body: string[];
    qualificationLabel: string;
    designationLabel: string;
    treatingLabel: string;
    treatingValue: string;
  };

  services: {
    heading: string;
    sub: string;
    cardTitle: string;
  };

  specialties: {
    heading: string;
    sub: string;
    badge: string;
    line1: string;
    line2: string;
  };

  timings: {
    heading: string;
    sub: string;
    daysLabel: string;
    hoursLabel: string;
    closedLabel: string;
    directions: string;
    note: string;
  };

  booking: {
    heading: string;
    sub: string;
    dateLabel: string;
    slotLabel: string;
    selectDate: string;
    selectSlot: string;
    button: string;
    comingSoon: string;
    fallback: string;
    fallbackCall: string;
    placeholderNote: string;
  };

  contact: {
    heading: string;
    phoneLabel: string;
    callNow: string;
    appointmentNote: string;
  };

  footer: {
    tagline: string;
    rights: string;
    disclaimer: string;
    navLabel: string;
  };
}

const en: SiteContent = {
  dir: 'ltr',
  langLabel: 'اردو',
  switchHref: '/ur/',
  skipLink: 'Skip to main content',

  meta: {
    title: 'Dr. Hasan Aziz — Consultant Physician & Medical Specialist in Multan',
    description:
      'Dr. Hasan Aziz (MBBS, FCPS Medicine) — Consultant Physician & Medical Specialist at Dua Hospital & Prime Hospital, Multan. Treatment for heart, diabetes, blood pressure, liver, kidney, allergies, asthma & more. Clinic timings & appointment: 0333-6489392.',
    keywords: [
      'Dr Hasan Aziz',
      'doctor in Multan',
      'consultant physician Multan',
      'medical specialist Multan',
      'Dua Hospital Multan',
      'Prime Hospital Multan',
      'Garden Town doctor',
      'Nishtar Road doctor',
      'English speaking doctor Multan',
      'general physician Multan Pakistan',
    ],
  },

  nav: {
    services: 'Services',
    timings: 'Timings',
    book: 'Book',
    call: 'Call',
    about: 'About',
  },

  hero: {
    eyebrow: 'Consultant Physician • Multan, Pakistan',
    name: 'Dr. Hasan Aziz',
    title: 'Consultant Physician & Medical Specialist',
    qualifications: 'MBBS (Army Medical College, Rawalpindi), FCPS (Medicine)',
    specialistBadge: 'Specialist',
    intro:
      'Experienced, trusted care for heart, diabetes, blood pressure, liver, kidney, allergies and dozens of other conditions — at two convenient Multan locations.',
    ctaBook: 'Book an appointment',
    ctaCall: 'Call 0333-6489392',
    quick: 'At a glance',
    quickHours: 'Evenings 7–10 PM & daytimes 11 AM–6 PM',
    quickLocations: 'Dua Hospital & Prime Hospital, Multan',
  },

  about: {
    heading: 'About Dr. Hasan Aziz',
    body: [
      'Dr. Hasan Aziz is a Consultant Physician and Medical Specialist practising in Multan, Pakistan. He holds an MBBS from Army Medical College, Rawalpindi, and FCPS in Medicine.',
      'Patients consult him for a wide range of general medicine conditions — from heart and blood pressure issues to diabetes, liver and kidney disease, allergies, stomach and intestinal problems, and seasonal illnesses such as dengue and TB.',
      'Consultations are available every evening at Dua Hospital and during the day at Prime Hospital, with an off day at each location so every patient gets time.',
    ],
    qualificationLabel: 'Qualifications',
    designationLabel: 'Designation',
    treatingLabel: 'Treats',
    treatingValue: 'General medicine & chronic disease management',
  },

  services: {
    heading: 'Services & Conditions Treated',
    sub: 'Everyday medical care for the whole family — prevention, diagnosis and long-term management.',
    cardTitle: 'What patients come in for',
  },

  specialties: {
    heading: 'Specialist Areas',
    sub: 'A specialist badge on a wide field of practice',
    badge: 'Specialist',
    line1:
      'Heart, brain, sugar (diabetes), high blood pressure, chest, allergy, stomach, intestine, liver, kidney, gallbladder, hepatitis, black & yellow jaundice (viral hepatitis).',
    line2:
      'Ulcer, piles, fits (epilepsy), paralysis, obesity, back & joint pain, nervous & male weakness, infertility & hereditary diseases, dengue, constipation, headache, TB, asthma.',
  },

  timings: {
    heading: 'Clinic Timings & Locations',
    sub: 'Two locations in Multan — pick the one closest to you.',
    daysLabel: 'Days',
    hoursLabel: 'Hours',
    closedLabel: 'Weekly off',
    directions: 'Get directions',
    note:
      'Public holidays may differ. For the day’s exact timings, please call before visiting.',
  },

  booking: {
    heading: 'Book a Slot',
    sub: 'Choose a day and time that works for you.',
    dateLabel: 'Date',
    slotLabel: 'Time slot',
    selectDate: 'Select a date',
    selectSlot: 'Select a slot',
    button: 'Book this slot',
    comingSoon: 'Online slot booking is coming soon.',
    fallback: 'Until then, appointments are taken by phone:',
    fallbackCall: 'Call 0333-6489392',
    placeholderNote: 'Booking API integration pending',
  },

  contact: {
    heading: 'Get in Touch',
    phoneLabel: 'For appointment',
    callNow: 'Call now',
    appointmentNote:
      'Appointment bookings are handled by phone at the moment.',
  },

  footer: {
    tagline: 'Consultant Physician & Medical Specialist — Multan, Pakistan',
    rights: 'All rights reserved.',
    disclaimer:
      'The information on this site is for general awareness only and does not replace a doctor’s consultation. Always consult your physician for diagnosis and treatment.',
    navLabel: 'Site sections',
  },
};

const ur: SiteContent = {
  dir: 'rtl',
  langLabel: 'English',
  switchHref: '/',
  skipLink: 'مرکزی مواد پر جائیں',

  meta: {
    title: 'ڈاکٹر حسن عزیز — کنسلٹنٹ فزیشن و میڈیکل سپیشلسٹ، ملتان',
    description:
      'ڈاکٹر حسن عزیز (ایم بی بی ایس، ایف سی پی ایس میڈیسن) — کنسلٹنٹ فزیشن و میڈیکل سپیشلسٹ، دعا هسپتال و پرائم هسپتال ملتان۔ دل، شوگر، بلڈ پریشر، جگر، گردہ، الرجی، دمہ وغیرہ کا علاج۔ اوقات و اپوائنٹمنٹ: 03336489392',
    keywords: [
      'ڈاکٹر حسن عزیز',
      'ڈاکٹر ملتان',
      'کنسلٹنٹ فزیشن ملتان',
      'دعا هسپتال ملتان',
      'پرائم هسپتال ملتان',
      'گارڈن ٹاؤن ڈاکٹر',
      'نشتر روڈ ڈاکٹر',
      'چیف فزیشن ملتان',
      'جنرل فزیشن ملتان',
    ],
  },

  nav: {
    services: 'سروسز',
    timings: 'اوقات',
    book: 'اپوائنٹمنٹ',
    call: 'کال کریں',
    about: 'تعارف',
  },

  hero: {
    eyebrow: 'کنسلٹنٹ فزیشن • ملتان، پاکستان',
    name: 'ڈاکٹر حسن عزیز',
    title: 'کنسلٹنٹ فزیشن ومیکل سپیشلسٹ',
    qualifications:
      'ایم بی بی ایس (آرمی میڈیکل کالج، راولپنڈی)، ایف سی پی ایس (میڈیسن)',
    specialistBadge: 'سپیشلسٹ',
    intro:
      'دل، شوگر، بلڈ پریشر، جگر، گردہ، الرجی اور دیگر دسیوں بیماریوں کا قابل اعتماد علاج — ملتان کے دو آسان مقامات پر۔',
    ctaBook: 'اپوائنٹمنٹ لیں',
    ctaCall: 'کال کریں 0333-6489392',
    quick: 'ایک نظر میں',
    quickHours: 'شام 7 سے رات 10 اور صبح 11 سے شام 6',
    quickLocations: 'دعا هسپتال اور پرائم هسپتال، ملتان',
  },

  about: {
    heading: 'ڈاکٹر حسن عزیز کے بارے میں',
    body: [
      'ڈاکٹر حسن عزیز ملتان میں پریکٹس کرنے والے کنسلٹنٹ فزیشن اور میڈیکل سپیشلسٹ ہیں۔ انہوں نے آرمی میڈیکل کالج راولپنڈی سے ایم بی بی ایس اور میڈیسن میں ایف سی پی ایس مکمل کی ہے۔',
      'مریض قلب اور بلڈ پریشر، شوگر، جگر و گردے کی بیماریاں، الرجی، معدہ و آنت کے مسائل، اور ڈینگی، ٹی بی جیسی موسمی بیماریوں کے لیے ان کے پاس آتے ہیں۔',
      'ڈیولی شام کو دعا هسپتال میں اور دن کے وقت پرائم هسپتال میں کنسلٹیشن دستیاب ہے — ہر مقام پر ایک دن اونچھا (آف) ہوتا ہے تاکہ ہر مریض کو وقت ملے۔',
    ],
    qualificationLabel: 'تعلیم',
    designationLabel: 'عہدہ',
    treatingLabel: 'شعبہ',
    treatingValue: 'جنرل میڈیسن و مزمن امراض کا علاج',
  },

  services: {
    heading: 'سروسز و عوارض کا علاج',
    sub: 'پورے خاندان کے لیے روزمرہ طبی خدمات — بچاؤ، تشخیص اور طویل علاج۔',
    cardTitle: 'مریض عام طور پر کنداں کے لیے آتے ہیں',
  },

  specialties: {
    heading: 'سپیشلسٹ علاجات',
    sub: 'ایک وسیع عمل کے ساتھ سپیشلسٹ',
    badge: 'سپیشلسٹ',
    line1:
      'دل، دماغ، شوگر، ہائی بلڈ پریشر، سینہ، الرجی، معدہ، آنت، جگر، گردہ، مثانہ، گلہر، ہیپاٹائٹس، کالا و پیلا یرقان۔',
    line2:
      'السر، فالج، مرگی، لقوہ، موٹاپا، کمر وجوڑوں کا درد، اعصابی و مردانہ کمزوری، بانجھ پن وبائی امراض، ڈینگی، قبض، سر درد، ٹی بی، دممہ۔',
  },

  timings: {
    heading: 'کلینک کے اوقات و مقامات',
    sub: 'ملتان میں دو مقامات — اپنے قریبی منتخب کریں۔',
    daysLabel: 'دن',
    hoursLabel: 'اوقات',
    closedLabel: 'ہفتہ وار آف',
    directions: 'نقشہ دیکھیں',
    note:
      'عوامی چھٹیاں مختلف ہو سکتی ہیں۔ آنے سے پہلے روز کے اوقات کے لیے فون ضرور کریں۔',
  },

  booking: {
    heading: 'نوبت (سلات) بک کریں',
    sub: 'اپنے مطابق دن اور وقت منتخب کریں۔',
    dateLabel: 'تاریخ',
    slotLabel: 'وقت',
    selectDate: 'تاریخ منتخب کریں',
    selectSlot: 'وقت منتخب کریں',
    button: 'یہ نوبت بک کریں',
    comingSoon: 'آن لائن نوبت بکنگ جلد شروع ہو رہی ہے۔',
    fallback: 'ابھی اپوائنٹمنٹ فون پر لی جاتی ہیں:',
    fallbackCall: 'کال کریں 0333-6489392',
    placeholderNote: 'بکنگ ای پی آئی انٹیگریشن زیرِ التواء',
  },

  contact: {
    heading: 'رابطہ کریں',
    phoneLabel: 'اپوائنٹمنٹ کے لیے',
    callNow: 'ابھی کال کریں',
    appointmentNote: 'فی الحال اپوائنٹمنٹ فون پر لی جاتی ہیں۔',
  },

  footer: {
    tagline: 'کنسلٹنٹ فزیشن و میڈیکل سپیشلسٹ — ملتان، پاکستان',
    rights: 'جملہ حقوق محفوظ ہیں۔',
    disclaimer:
      'اس سائٹ پر معلومات عام آگہی کے لیے ہیں اور ڈاکٹر کے حتمی مشورے کا بدل نہیں۔ تشخیص اور علاج کے لیے ہمیشہ اپنے ڈاکٹر سے رجوع کریں۔',
    navLabel: 'سائٹ کے حصے',
  },
};

const dictionaries: Record<Locale, SiteContent> = { en, ur };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}
