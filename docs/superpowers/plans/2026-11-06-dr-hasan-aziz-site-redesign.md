# Dr. Hasan Aziz Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the English (`/`) and Urdu (`/ur/`) one-page site to match the approved v3.2 design.

**Architecture:**
- **Pure logic:** clinic status, booking links and scroll maths live in small dependency-free modules under `lib/`. They are unit-tested with Node's built-in test runner.
- **Content:** all copy and data live in `lib/content.ts`.
- **Rendering:** sections are React server components, with a few small `'use client'` islands for live status, tabs, menu, reveal, smooth scrolling, the back-to-top ring and the chat demo.
- **Styling:** one hand-written `app/globals.css` ported from the approved mockup, using the brand tokens as CSS custom properties.

**Tech Stack:**
- Next.js 16.4.3 App Router, static export (`output: 'export'`, `trailingSlash: true`).
- React 19.2, TypeScript.
- `next/font/google` for Figtree and Gulzar.
- `node --test` (Node ≥ 22.18, which strips TypeScript types natively).
- No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-06-dr-hasan-aziz-site-redesign-design.md`.

**Visual reference:**
- `docs/design/mockup-v3.html` is the approved design.
- Port its markup structure, class names, CSS and copy. Serve it with `python -m http.server 5500 --directory docs/design` (launch config "design") to compare side by side.
- Figma file `C40G3bzEVhUT8EFUE6m0BK`, frames "v3.2 · Home · Desktop 1440" and "v3.2 · Home · Mobile 390".

## Global Constraints

- **Dependencies:** none new. No Tailwind, shadcn, icon fonts or animation libraries.
- **Brand tokens:** use the exact hex values in spec §5. Name the CSS variables as in the mockup: `--b50…--b900`, `--g50…--g800`, `--n0…--n900`, `--err`, `--err-bg`, `--warn`, `--warn-bg`, `--ok-bg`, `--ok-text`.
- **Colour rules:** never put white text on Green 500. No blue-to-green gradients. Green is only for live dots, ticks, stars, the "current" marker and the back-to-top ring at the end.
- **Fonts:** Figtree for English. Gulzar Regular (400 only) for Urdu, with line-height at least 1.8. Never mix two fonts on one line.
- **Digits and credentials:** Western digits everywhere. "MBBS" and "FCPS" always stay in English.
- **Booking:** WhatsApp only, number `923336489392`. No `tel:` links and no "Call" text anywhere. The only phone number shown is the emergency "1122".
- **Clinics:**
  - Hayat Medical Center: 11:00 AM – 7:00 PM (`openMin` 660, `closeMin` 1140).
  - Dua Hospital: 7:00 PM – 10:00 PM (`openMin` 1140, `closeMin` 1320).
  - Both are open Mon–Sat and closed Sunday: `days = [false, true, true, true, true, true, true]` (Sun..Sat).
- **Dua address:** reuse the existing data, corrected: "First Floor, Bank Plaza, near Shell Petrol Pump, Sher Shah Road, Garden Town, Multan".
- **Hayat address and landmark:** `null`. The page shows "Address to confirm" / "Landmark to confirm".
- **"About Me":** the label for section 01 in the navbar, mobile menu, footer and the section overline. Its anchor is `#doctor`.
- **Reviews:** `REVIEWS` ships as an empty array, and the Reviews section and its nav and footer links are omitted while it is empty (D9). The mockup's sample reviews are never committed as content.
- **Portrait:** use `public/images/doctor-placeholder.jpg` (D10). The real portrait must replace it before launch.
- **Time:** all clinic status uses Asia/Karachi wall-clock time. The server and first client render show the neutral state "Mon–Sat · see timings".
- **Motion:** follow the reduced-motion rules in spec §7.6. Smooth link scrolling runs even with reduced motion.
- **Imports inside `lib/`:** value imports use explicit `.ts` extensions (for example `from './site.ts'`), so `node --test` can load them. Type-only imports use `import type`.
- **Commits:** sentence-case subject in the repo's style ("Add …", "Update …"), ending with the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Visitor's device is not on Pakistan time.** For example, a relative abroad opens the site at 01:30 PKT on Sunday while it is still Saturday evening for them. They should see Pakistan-time status ("Closed today (Sunday)"). Tested in Task 1.
2. **Page left open across a boundary.** For example, Saturday 21:59 → 22:00, or Saturday 23:59 → Sunday 00:00. The pill must move from "open" to "closed, book for Monday" to "Sunday" without a reload. Tested in Task 1.
3. **The static HTML must not claim a live status.** Search engines and no-JS visitors get the build-time HTML, which must show the neutral "Mon–Sat · see timings", never "Open now". Tested in Task 6 by checking `out/index.html`.
4. **Treatments without JavaScript.** All 21 cards must be in the server-rendered HTML and visible. The tabs only filter after hydration. Tested in Task 7 by counting cards in `out/index.html`.
5. **Urdu and special characters in WhatsApp messages.** Urdu text, clinic names containing "&", and line breaks must survive URL encoding exactly. Tested in Task 2 with a decode round-trip.

---

## File Structure

| Path | Responsibility |
|---|---|
| `lib/site.ts` | `SITE_URL`, `WHATSAPP_NUMBER`, `Locale` (remove `PHONE_DISPLAY` and `PHONE_TEL`) |
| `lib/clinic-status.ts` | Pure Pakistan-time status logic and formatting. Owns `ClinicId`, `ClinicHours` |
| `lib/links.ts` | `bookingHref`, `directionsHref` |
| `lib/scroll.ts` | Pure maths for easing, scroll duration and ring offset |
| `lib/content.ts` | `DOCTOR`, `CLINICS`, `TREATMENTS`, `TREATMENT_GROUPS`, `REVIEWS`, `SiteContent`, `getContent()` |
| `lib/schema.ts` | JSON-LD (Physician + 2 MedicalClinic) |
| `lib/*.test.ts` | Unit tests |
| `app/globals.css` | Full rewrite, ported from the mockup |
| `app/layout.tsx` | Fonts via `next/font`, `themeColor` |
| `components/icons.tsx` | `Icon` component and every icon path used by the mockup |
| `components/live/useKarachiNow.ts` | Client hook: `{ day, minutes } \| null` |
| `components/live/StatusPill.tsx`, `TodayCard.tsx`, `ClinicBadge.tsx`, `WeekStrip.tsx` | Live status islands |
| `components/nav/MobileMenu.tsx`, `SmoothNav.tsx`, `BackToTop.tsx`, `Reveal.tsx` | Navigation and motion islands |
| `components/Header.tsx`, `Hero.tsx`, `PortraitCard.tsx`, `InfoStrip.tsx` | Top of the page |
| `components/About.tsx`, `Treatments.tsx`, `TreatmentTabs.tsx` | Sections 01–02 |
| `components/Clinics.tsx`, `Booking.tsx`, `ChatDemo.tsx` | Sections 03–04 |
| `components/Reviews.tsx`, `Faq.tsx`, `FinalCta.tsx`, `Footer.tsx`, `MobileDock.tsx` | Section 05 onward |
| `components/Page.tsx` | Composes the sections for a locale |
| Delete: `components/Services.tsx`, `Specialties.tsx`, `Timings.tsx`, `ContactBand.tsx` | Replaced |
| `public/images/doctor-placeholder.jpg` | Placeholder portrait |
| `docs/urdu-review.md` | Every new Urdu string awaiting native review (spec §10 item 7) |

---

### Task 1: Test runner and Pakistan-time clinic status

**Files:**
- Modify: `package.json` (add a `test` script).
- Modify: `tsconfig.json` (add `"allowImportingTsExtensions": true` to `compilerOptions`).
- Modify: `lib/site.ts`.
- Create: `lib/clinic-status.ts`.
- Test: `lib/clinic-status.test.ts`.

**Interfaces:**
- Produces, in `lib/site.ts`:
  - `export const WHATSAPP_NUMBER = '923336489392'`
  - `export type Locale = 'en' | 'ur'`
  - `SITE_URL` stays.
  - `PHONE_DISPLAY` and `PHONE_TEL` are deleted. Fix their importers in later tasks; until then the build may fail, but tests must pass.
- Produces, in `lib/clinic-status.ts`:
```ts
export type ClinicId = 'hayat' | 'dua';
export type Week = readonly [boolean, boolean, boolean, boolean, boolean, boolean, boolean]; // Sun..Sat
export interface ClinicHours { id: ClinicId; openMin: number; closeMin: number; days: Week }
export type ClinicState =
  | { kind: 'closed-today' }
  | { kind: 'later'; minsUntilOpen: number }
  | { kind: 'open'; closeMin: number }
  | { kind: 'done' };
export type HeroStatus =
  | { kind: 'sunday' }
  | { kind: 'open'; clinic: ClinicId; closeMin: number }
  | { kind: 'next'; clinic: ClinicId; minsUntilOpen: number }
  | { kind: 'closed'; bookFor: 'tomorrow' | 'monday' };
export const TRACK_START = 540;   // 9 AM
export const TRACK_END = 1380;    // 11 PM
export function karachiParts(instant: Date): { day: number; minutes: number } // day 0 = Sunday
export function clinicState(day: number, minutes: number, clinic: ClinicHours): ClinicState
export function heroStatus(day: number, minutes: number, clinics: readonly ClinicHours[]): HeroStatus
export function formatDuration(mins: number, locale: Locale): string
export function formatClock(min: number): string
export function trackPercent(min: number): number
```

- [ ] **Step 1: Add the test script.** In `package.json`, set `"test": "node --test \"lib/**/*.test.ts\""`. In `tsconfig.json`, add `allowImportingTsExtensions: true`.

- [ ] **Step 2: Write the failing tests** in `lib/clinic-status.test.ts`. Use `node:test` and `node:assert/strict`, with these fixtures:
```ts
const ALL_BUT_SUN = [false, true, true, true, true, true, true] as const;
const HAYAT = { id: 'hayat', openMin: 660, closeMin: 1140, days: ALL_BUT_SUN } as const;
const DUA   = { id: 'dua',   openMin: 1140, closeMin: 1320, days: ALL_BUT_SUN } as const;
const BOTH = [HAYAT, DUA];
const MON = 1, SAT = 6, SUN = 0;
```
Tests and expected values:
  - `clinicState boundaries`:
    - Hayat, Monday at 659 → `{kind:'later', minsUntilOpen:1}`.
    - At 660 → `{kind:'open', closeMin:1140}`.
    - At 1139 → open.
    - At 1140 → `{kind:'done'}`.
    - Dua at 1139 → later 1. At 1140 → open. At 1319 → open. At 1320 → done.
  - `clinicState sunday`: either clinic on `SUN` at 700 → `{kind:'closed-today'}`.
  - `heroStatus order`:
    - Sunday, 1200 → `{kind:'sunday'}`.
    - Monday, 700 → `{kind:'open', clinic:'hayat', closeMin:1140}`.
    - Monday, 1200 → `{kind:'open', clinic:'dua', closeMin:1320}`.
    - Monday, 600 → `{kind:'next', clinic:'hayat', minsUntilOpen:60}`.
    - Monday, 1330 → `{kind:'closed', bookFor:'tomorrow'}`.
    - Saturday, 1330 → `{kind:'closed', bookFor:'monday'}`.
  - `heroStatus page left open across a boundary` (Review Focus 2):
    - Saturday 1319 → open dua.
    - Saturday 1320 → closed / monday.
    - Saturday 1439 → closed / monday.
    - Sunday 0 → sunday.
  - `karachiParts from UTC`:
    - `new Date('2026-11-09T06:00:00Z')` → `{day:1, minutes:660}` (Monday 11:00 PKT).
    - `new Date('2026-11-07T20:30:00Z')` → `{day:0, minutes:90}` (Saturday evening in UTC is Sunday 01:30 PKT; Review Focus 1).
  - `formatDuration`:
    - 134 en → `'2h 14m'`; 45 en → `'45m'`; 60 en → `'1h'`.
    - 134 ur → `'2 گھنٹے 14 منٹ'`; 45 ur → `'45 منٹ'`.
  - `formatClock`: 660 → `'11 AM'`; 1140 → `'7 PM'`; 1170 → `'7:30 PM'`; 720 → `'12 PM'`.
  - `trackPercent`: 540 → 0; 1380 → 100; 960 → 50; 300 → 0; 1430 → 100.

- [ ] **Step 3: Run the tests to check they fail.**
Run: `npm test`
Expected: FAIL, because `lib/clinic-status.ts` cannot be found.

- [ ] **Step 4: Implement `lib/clinic-status.ts`** with the signatures above.
  - `karachiParts` uses `new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(instant)`. This is equivalent to spec §7.1 but does not depend on the device's time zone.
  - `heroStatus` order:
    1. A Sunday (`!clinics.some(c => c.days[day])`) → sunday.
    2. Any clinic open → open.
    3. The `later` clinic with the smallest `minsUntilOpen` → next.
    4. Otherwise closed, with `bookFor` `'monday'` when `day === 6`, else `'tomorrow'`.
  - Import `Locale` as a type only.

- [ ] **Step 5: Run the tests to check they pass.**
Run: `npm test`
Expected: all `clinic-status` tests PASS.

- [ ] **Step 6: Commit.**
```bash
git add package.json tsconfig.json lib/site.ts lib/clinic-status.ts lib/clinic-status.test.ts
git commit -m "Add Pakistan-time clinic status logic with node tests"
```

---

### Task 2: WhatsApp and directions links

**Files:**
- Create: `lib/links.ts`.
- Test: `lib/links.test.ts`.

**Interfaces:**
- Consumes: `WHATSAPP_NUMBER` and `Locale` from `./site.ts`.
- Produces:
  - `bookingHref(locale: Locale, clinicName?: string): string` — the single booking seam (spec §7.4). Callers pass the clinic's display name in the page's language.
  - `directionsHref(query: string): string` → `https://www.google.com/maps/search/?api=1&query=<encodeURIComponent(query)>`.

- [ ] **Step 1: Write the failing tests** in `lib/links.test.ts`. Decode the `text` parameter with `new URL(href).searchParams.get('text')`.
  - `en without clinic`: the href starts with `https://wa.me/923336489392?text=`, and the decoded text equals `'Assalam o Alaikum. I would like to book an appointment with Dr. Hasan Aziz.\nName:\nProblem:'`.
  - `en with clinic`: `bookingHref('en', 'Hayat Medical Center')` decodes to `'Assalam o Alaikum. I would like to book an appointment with Dr. Hasan Aziz at Hayat Medical Center.\nName:\nProblem:'`.
  - `special characters survive` (Review Focus 5): `bookingHref('en', 'A & B #1')` decodes to a text containing `' at A & B #1.'`. The raw href contains neither `' '`, nor `'&B'`, nor `'#'`.
  - `ur round-trip`: `bookingHref('ur', 'حیات میڈیکل سنٹر')` decodes to `'السلام علیکم۔ مجھے ڈاکٹر حسن عزیز سے حیات میڈیکل سنٹر میں اپوائنٹمنٹ چاہیے۔\nنام:\nمسئلہ:'`.
  - `ur without clinic` decodes to `'السلام علیکم۔ مجھے ڈاکٹر حسن عزیز سے اپوائنٹمنٹ چاہیے۔\nنام:\nمسئلہ:'`.
  - `directions`: `directionsHref('Dua Hospital Multan')` equals `'https://www.google.com/maps/search/?api=1&query=Dua%20Hospital%20Multan'`.

- [ ] **Step 2: Run the tests to check they fail.**
Run: `npm test`
Expected: the `links` tests FAIL (module not found).

- [ ] **Step 3: Implement `lib/links.ts`.** Encode the whole message with `encodeURIComponent`. The Urdu template is exactly the strings above. Add both Urdu strings to `docs/urdu-review.md`, creating the file with a one-line heading "Urdu strings awaiting native review" and a bullet list of `key — text`.

- [ ] **Step 4: Run the tests to check they pass.**
Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit.**
```bash
git add lib/links.ts lib/links.test.ts docs/urdu-review.md
git commit -m "Add WhatsApp booking and directions link helpers"
```

---

### Task 3: Content model and data

**Files:**
- Modify (rewrite): `lib/content.ts`.
- Test: `lib/content.test.ts`.
- Modify: `docs/urdu-review.md`.

**Interfaces:**
- Consumes: `ClinicId`, `ClinicHours` and `Week` (type imports) from `./clinic-status.ts`, and `Locale` from `./site.ts`.
- Produces:
```ts
export type IconName = 'fever'|'bug'|'allergy'|'head'|'bone'|'sugar'|'bp'|'blood'|'scale'|'kidney'|'bladder'
  |'heart'|'brain'|'zap'|'acid'|'ulcer'|'liver'|'virus'|'cough'|'asthma'|'lungs'
  |'wa'|'arrow'|'chev'|'menu'|'close'|'check'|'award'|'cap'|'pin'|'chat'|'nav'|'cal'|'plus'|'alert'|'clock'|'file'|'steth'|'list'|'star'|'globe';
export const DOCTOR: { name: 'Dr. Hasan Aziz'; nameUr: 'ڈاکٹر حسن عزیز' };
export interface Clinic extends ClinicHours {
  name: string; nameUr: string; label: { en: string; ur: string }; // Daytime / Evening
  address: { en: string; ur: string } | null; landmark: { en: string; ur: string } | null;
  mapsQuery: string;
  hoursText: string;   // '11:00 AM – 7:00 PM' / '7:00 PM – 10:00 PM' (same in both locales)
}
export const CLINICS: readonly Clinic[];             // [hayat, dua], in that order
export type TreatmentGroup = 'day' | 'long' | 'heart' | 'stomach' | 'chest';
export interface Treatment { icon: IconName; name: string; nameUr: string; blurb: string; blurbUr: string; group: TreatmentGroup }
export const TREATMENTS: readonly Treatment[];       // 21, in the mockup's TX order
export const TREATMENT_GROUPS: readonly TreatmentGroup[]; // ['day','long','heart','stomach','chest']
export interface Review { quote: string; name: string; condition: string }
export const REVIEWS: readonly Review[];             // []
export interface SiteContent { /* see Step 3 */ }
export function getContent(locale: Locale): SiteContent;
```

- [ ] **Step 1: Write the failing tests** in `lib/content.test.ts`:
  - `21 treatments`: `TREATMENTS.length === 21`. The counts per group are `{day:5,long:6,heart:3,stomach:4,chest:3}`. The `name` values exactly equal the spec §6.2 list.
  - `clinics`: `CLINICS.map(c=>c.id)` deep-equals `['hayat','dua']`. Each clinic has `days[0] === false` and the other 6 `true`. The minutes are 660/1140 and 1140/1320. The `hoursText` values are `'11:00 AM – 7:00 PM'` and `'7:00 PM – 10:00 PM'`. The Hayat `address` is `null`. The Dua `address.en` contains `'Sher Shah Road'`.
  - `reviews ship empty`: `REVIEWS.length === 0`.
  - `no stale data`:
    - `JSON.stringify` of `getContent('en')`, `getContent('ur')`, `CLINICS` and `TREATMENTS` contains none of `'Prime'`, `'Shir'`, `'tel:'`, `'3336489392'`, `'مزیدار'`, `'چیف فزیشن'`, `'The doctor'`. The only call to action that mentions calling is the 1122 emergency line.
    - It contains no Arabic heh `'ه'`.
  - `en and ur have the same shape`: write a recursive `shape(obj)` helper that maps every leaf to its `typeof`. `shape(getContent('en'))` must deep-equal `shape(getContent('ur'))`.
  - `About Me label`: `getContent('en').nav.about === 'About Me'`.
  - `neutral status`: `getContent('en').status.neutral === 'Mon–Sat · see timings'` (Task 6 checks this exact string in the built HTML).

- [ ] **Step 2: Run the tests to check they fail.**
Run: `npm test`
Expected: the `content` tests FAIL (exports missing).

- [ ] **Step 3: Rewrite `lib/content.ts`.**
  - **`SiteContent` groups:** one top-level group per section, each holding that section's strings.
    - `meta { title, description, keywords }`
    - `dir`, `langSwitch { label, href }`, `skipLink`
    - `nav { about, treatments, clinics, book, reviews, faq, cta, menu }`
    - `status { neutral, sunday, seeing, until, next, opensIn, closedNow, bookTomorrow, bookMonday, open, later, done, closedToday, sundayNote }`
    - `hero { overline, urLine, lineStrong, lineRest, chips, seeAll, ctaBook, ctaTimings, note }`
    - `portrait { plateTitle, plateSub, sideOverline, sideTitle, sideSub, degreeLabel, degree, degreeWhere, specLabel, spec, specWhere }`
    - `today { heading }`
    - `info[4] { title, sub, target }`
    - `about { overline, heading, lead, lead2, facts[2], qualHeading, quals[3] { title, chip, where }, visitHeading, visit[4] { stage, title, body } }`
    - `treatments { overline, heading, lead, groups, ask { title, body, cta } }`
    - `clinics { overline, heading, lead, toConfirmAddress, toConfirmLandmark, monSat, directions, bookHere, holiday }`
    - `book { overline, heading, lead, steps[3] { title, body }, cta, chat { name, status, me1, me2, them } }`
    - `reviews { overline, heading }`
    - `faq { overline, heading, lead, emergencyTitle, emergencyBody, items[6] { q, a } }`
    - `final { heading, sub, cta }`
    - `footer { tagline1, tagline2, onPage, clinicsHeading, help, questions, urduLink, emergency, copyright }`
    - `dock { timings, book }`
    - `days[7]` (short day labels Mon..Sun)
    - `skip`
  - **String functions:** strings with a variable are functions, for example `opensIn: (d: string) => string` and `until: (clock: string) => string`. Note that `shape()` reports them as `'function'` for both languages.
  - **English copy:** exactly the text in spec §3 and `docs/design/mockup-v3.html`. Use "About Me" for `nav.about` and `about.overline`. Use the qualifications text from D6, and the info strip and footer text from spec §3.
  - **Urdu copy:**
    - Reuse the corrected strings from the old dictionary and apply the spec §6.3 fixes.
    - Translate every new string.
    - Add each new Urdu string to `docs/urdu-review.md` as `key — text`.
  - **Treatments:** names, Urdu names and blurbs come from the mockup's `TX` array. `blurbUr` is a new translation, so list it in the review file too.
  - **Dua `mapsQuery`:** `'Dua Hospital Bank Plaza Sher Shah Road Garden Town Multan'`.
  - **Hayat `mapsQuery`:** `'Hayat Medical Center Multan'`.

- [ ] **Step 4: Run the tests to check they pass.**
Run: `npm test`
Expected: all tests PASS.

- [ ] **Step 5: Commit.**
```bash
git add lib/content.ts lib/content.test.ts docs/urdu-review.md
git commit -m "Rewrite site content for the v3 design in English and Urdu"
```

---

### Task 4: Structured data (JSON-LD)

**Files:**
- Modify (rewrite): `lib/schema.ts`.
- Test: `lib/schema.test.ts`.

**Interfaces:**
- Consumes: `CLINICS`, `TREATMENTS`, `DOCTOR` and `getContent` from `./content.ts`, and `SITE_URL` from `./site.ts`.
- Produces: `buildPageSchema(locale: Locale): object` — the JSON-LD `@graph` for the page. The path is derived from the locale (`/` or `/ur/`).

- [ ] **Step 1: Write the failing tests** in `lib/schema.test.ts`, run against `buildPageSchema('en')`:
  - The graph has exactly one `Physician` and two `MedicalClinic` nodes, with `@id`s ending `#hayat` and `#dua`.
  - `Physician.worksFor` deep-equals those two `@id`s.
  - `Physician.qualification` deep-equals `['MBBS', 'FCPS (Medicine)']`.
  - Each clinic's `openingHoursSpecification[0].dayOfWeek` deep-equals `['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']`.
  - Hayat's `opens`/`closes` are `'11:00'`/`'19:00'`; Dua's are `'19:00'`/`'22:00'`.
  - `JSON.stringify(schema)` contains neither `'telephone'` nor `'Prime'`.
  - Hayat has no `address` key (its address is `null`). Dua's `address.streetAddress` contains `'Sher Shah Road'`.
  - `buildPageSchema('ur')`: the clinic `name`s are the Urdu names, and `inLanguage` is `'ur-PK'`.

- [ ] **Step 2: Run the tests to check they fail.**
Run: `npm test`
Expected: the `schema` tests FAIL.

- [ ] **Step 3: Rewrite `lib/schema.ts`** to satisfy the tests. `availableService` lists all 21 treatment names in the page's language. Derive `opens` and `closes` as 24-hour `HH:MM` strings from `openMin` and `closeMin` (660 → `'11:00'`).

- [ ] **Step 4: Run the tests to check they pass.**
Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit.**
```bash
git add lib/schema.ts lib/schema.test.ts
git commit -m "Update JSON-LD for both clinics, Mon-Sat hours, no phone"
```

---

### Task 5: Design tokens, global CSS, fonts and icons

**Files:**
- Modify (rewrite): `app/globals.css`.
- Modify: `app/layout.tsx`.
- Modify (rewrite): `components/icons.tsx`.
- Create: `public/images/doctor-placeholder.jpg`.

**Interfaces:**
- Produces:
  - `Icon({ name, className }: { name: IconName; className?: string })` renders `<svg class="i ...">` with `viewBox="0 0 24 24"`, stroke `currentColor`, width 2, round caps and joins, and the path from the mockup's `I` object.
  - The CSS classes used by Tasks 6–9 are exactly the mockup's class names.
  - The fonts are exposed as `--font-figtree` and `--font-gulzar`.

- [ ] **Step 1: Port the CSS.** Copy the mockup's `<style>` block into `app/globals.css`, then make these changes:
  - Replace the font families with `var(--font-figtree)` and `var(--font-gulzar)`.
  - Drop `.mq*` and `.marquee` (already removed in the mockup), `.no-js` and `.capture`. Keep `.rv` and make the reveal opt-in with `.js .rv` (`Reveal` adds the `js` class to `<html>`).
  - Add `[id]{scroll-margin-top:96px}` so deep links like `/#clinics` land below the header.
  - Add the RTL rules:
    - `[dir=rtl] .arr, [dir=rtl] .go, [dir=rtl] .ft-links a svg.chev { transform: scaleX(-1) }`
    - `[dir=rtl] .rb .go { margin-left: 0; margin-right: auto }`
    - `[dir=rtl] .to-top { right: auto; left: 24px }`. On phones use `left: 16px`.
    - Use logical properties for the remaining left/right paddings and borders: `.cred+.cred` uses `border-inline-start`, `.tl` uses `padding-inline-start` with `inset-inline-start` on its markers, and `.acc details p` uses `padding-inline-end`.
  - Add the Urdu type scale:
    - `[lang=ur]` uses Gulzar 20px with line-height 2.
    - `[lang=ur] h2` is 36/68.
    - `[lang=ur] .h-name` is `clamp(40px,3vw + 20px,56px)` with line-height 1.86.
- [ ] **Step 2: Fonts and metadata.** In `app/layout.tsx`:
  - Remove the Google Fonts `<link>`s.
  - Add `Figtree` (weights 400–800, subset `latin`, variable `--font-figtree`) and `Gulzar` (weight `'400'`, subsets `['arabic','latin']`, variable `--font-gulzar`) from `next/font/google`, and put both variables on `<html>`.
  - Set `themeColor` to `'#074EA2'`.
  - Set `formatDetection` to `{ telephone: false, address: true, email: false }`.
- [ ] **Step 3: Icons.** Rewrite `components/icons.tsx` to export `Icon` with every `IconName` from Task 3, using the path strings from the mockup's `I` object. Delete the old `MedIcon`, `PhoneIcon` and the other old exports.
- [ ] **Step 4: Placeholder portrait.**
  - **Ask the user before downloading.** State the filename `doctor-placeholder.jpg`, the source `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1100&h=1300&fit=crop&crop=faces,top&q=85` (Unsplash licence) and that it is about 150–250 KB.
  - Save it to `public/images/doctor-placeholder.jpg`.
  - If the user declines, use any 1100×1300 JPEG they provide.
- [ ] **Step 5: Verify the types compile.** Run `npx tsc --noEmit -p .`. Expected: errors only in components not yet rewritten (`Page.tsx` and the old section components). There must be none in `lib/`, `app/layout.tsx` or `components/icons.tsx`.
- [ ] **Step 6: Commit.**
```bash
git add app/globals.css app/layout.tsx components/icons.tsx public/images/doctor-placeholder.jpg
git commit -m "Add brand tokens, ported styles, self-hosted fonts and icon set"
```

---

### Task 6: Live status, header, navigation islands and hero

**Files:**
- Create:
  - `components/live/useKarachiNow.ts`, `StatusPill.tsx`, `TodayCard.tsx`, `ClinicBadge.tsx`, `WeekStrip.tsx`.
  - `components/nav/MobileMenu.tsx`, `SmoothNav.tsx`, `BackToTop.tsx`, `Reveal.tsx`.
  - `components/Hero.tsx`, `PortraitCard.tsx`, `InfoStrip.tsx`.
  - `lib/scroll.ts`, `lib/scroll.test.ts`.
- Modify (rewrite): `components/Header.tsx`, `components/Page.tsx`.

**Interfaces:**
- Consumes: Tasks 1–3 (`karachiParts`, `heroStatus`, `clinicState`, `formatDuration`, `formatClock`, `trackPercent`, `bookingHref`, `CLINICS`, `getContent`) and the Task 5 `Icon`.
- Produces:
  - `lib/scroll.ts`:
    - `easeInOutCubic(t: number): number`
    - `scrollDuration(distancePx: number): number`, which returns `clamp(450, |d| * 0.35, 1100)`
    - `ringOffset(progress: number, radius?: number): number`, which returns `2πr * (1 − clamp(progress, 0, 1))` with r defaulting to 25.
  - `useKarachiNow(): { day: number; minutes: number } | null`. It is `null` during SSR and the first client render. It sets the value in `useEffect` and refreshes every 60s.
  - `Page({ locale }: { locale: Locale })` renders the whole page. `app/page.tsx` and `app/ur/page.tsx` call `<Page locale="en" />` and `<Page locale="ur" />`.
  - Every section component takes `{ c: SiteContent; locale: Locale }`.

- [ ] **Step 1: Write the failing tests** in `lib/scroll.test.ts`:
  - `easeInOutCubic(0) === 0`, `(1) === 1`, `(0.5) === 0.5`, and `(0.25) < 0.25`.
  - `scrollDuration(100) === 450`, `scrollDuration(2000) === 700`, `scrollDuration(-5000) === 1100`.
  - `ringOffset(0)` ≈ 157.08 (check with `Math.abs(x − 157.08) < 0.01`), `ringOffset(1) === 0`, `ringOffset(0.5)` ≈ 78.54, and `ringOffset(2) === 0`.
- [ ] **Step 2: Run the tests to check they fail.**
Run: `npm test`
Expected: FAIL. Then implement `lib/scroll.ts`, run `npm test` again, and expect PASS.
- [ ] **Step 3: Build the islands** (all `'use client'`):
  - **`StatusPill({ c, locale })`** reads `CLINICS` and renders `c.status.neutral` while `useKarachiNow()` is `null`. Otherwise it renders the text for `heroStatus` per spec §7.2, with the dot class `live`, `live later` or `live off`.
  - **`TodayCard`:**
    - Segments use `left: trackPercent(openMin)%` and `width: trackPercent(close) − trackPercent(open)%`.
    - The Now marker is shown only when `TRACK_START ≤ minutes ≤ TRACK_END`, labelled `"Now " + formatClock(minutes)`.
    - On Sunday it replaces the track with the `sundayNote`.
  - **`MobileMenu`:**
    - The burger has `aria-expanded` and `aria-controls="menu"`.
    - The menu closes on a link click and on `Escape`.
    - Its links have the same targets as the header.
  - **`SmoothNav`** (renders `null`):
    - Delegates clicks on `a[href^="#"]` and runs a `requestAnimationFrame` scroll using `easeInOutCubic` and `scrollDuration`, with offset `header height + 24`, then calls `history.replaceState`.
    - An IntersectionObserver with rootMargin `'-45% 0px -50% 0px'` sets `aria-current` on the header and menu links.
  - **`BackToTop`:**
    - A `<button aria-label>` holding the SVG ring (r 25).
    - On scroll it sets `strokeDashoffset = ringOffset(progress)`, toggles `show` when `scrollY > 600`, and toggles `done` when progress is above 0.995.
    - A click scrolls to 0.
  - **`Reveal`** (renders `null`): adds `js` to `<html>` and observes `.rv` elements, adding `in` at threshold 0.12.
- [ ] **Step 4: Build `Header`, `Hero`, `PortraitCard` and `InfoStrip`** as server components with the mockup's markup and classes. The text comes from `c`. Booking links use `bookingHref(locale)` with `target="_blank" rel="noopener"`.
  - `PortraitCard` uses `next/image` with `src="/images/doctor-placeholder.jpg"`, `width={1100}`, `height={1300}`, `alt={DOCTOR.name}` and `priority`.
  - The `InfoStrip` WhatsApp card uses `bookingHref(locale)`.
- [ ] **Step 5: Temporary page composition.** `Page` renders `SmoothNav`, `Reveal`, `BackToTop`, `Header`, `<main id="top">` with `Hero` only, and the JSON-LD script from `buildPageSchema(locale)`. Update `app/page.tsx` and `app/ur/page.tsx`: keep their metadata and the `<div lang="ur" dir="rtl">` wrapper on the Urdu page, and call the new `Page`. Delete `Services.tsx`, `Specialties.tsx`, `Timings.tsx`, `ContactBand.tsx` and the old `About`, `Booking` and `Footer`; they are rebuilt in Tasks 7–9.
- [ ] **Step 6: Build, and check the static HTML stays neutral (Review Focus 3).**
Run: `npm run build`, then `node -e "const h=require('fs').readFileSync('out/index.html','utf8');if(!h.includes('Mon–Sat · see timings')||/Open now|Seeing patients now/.test(h)){process.exit(1)}console.log('neutral ok')"`
Expected: the build succeeds and the script prints `neutral ok`.
- [ ] **Step 7: Browser check.** Run `npx serve out` (or the `dev` launch config). At 1440, 820 and 390 the hero matches the Figma frames. The status pill changes from neutral to live after load. The ☰ menu works at ≤1180. The back-to-top ring fills as you scroll.
- [ ] **Step 8: Commit.**
```bash
git add -A components lib/scroll.ts lib/scroll.test.ts app/page.tsx app/ur/page.tsx
git commit -m "Build header, hero, live status and navigation islands"
```

---

### Task 7: About and Treatments

**Files:**
- Create: `components/About.tsx`, `components/Treatments.tsx`, `components/TreatmentTabs.tsx`.
- Modify: `components/Page.tsx` (add both sections after `Hero`).

**Interfaces:**
- Consumes: `TREATMENTS`, `TREATMENT_GROUPS`, `c.about`, `c.treatments`, `bookingHref`, `Icon`.
- Produces: `TreatmentTabs({ groups, labels, counts }: { groups: readonly ('all' | TreatmentGroup)[]; labels: Record<string, string>; counts: Record<string, number> })`. It is a client component that toggles the `hide` class on `.tx[data-c]` elements inside `#tx`, and `filtered` on `#tx`.

- [ ] **Step 1: `About`** (`<section id="doctor">`) renders the overline "01 About Me", the heading, both leads, the two fact tiles, the qualifications timeline (3 items, with the last one green) and the 4 visit steps. All of it comes from `c.about`.
- [ ] **Step 2: `Treatments`** (`<section id="treatments">`) server-renders all 21 cards, with no `hide` class, plus the "Don't see your problem?" card inside `#tx`. `TreatmentTabs` handles filtering:
  - Roles `tablist` and `tab`, with `aria-selected`.
  - Left and Right arrow keys move the selection; Home and End jump to the first and last tab.
  - Counts: All 21, day 5, long 6, heart 3, stomach 4, chest 3.
- [ ] **Step 3: Build, and check no-JS treatments (Review Focus 4).**
Run: `npm run build`, then `node -e "const h=require('fs').readFileSync('out/index.html','utf8');const n=(h.match(/class=\"card tx /g)||[]).length;if(n!==21||/class=\"card tx[^\"]*hide/.test(h))process.exit(1);console.log('21 cards ok')"`
Expected: `21 cards ok`.
- [ ] **Step 4: Browser check.** The tabs filter correctly and work by keyboard. The Urdu name sits 8px below the English name. Desktop shows 4 columns, ≤1080 shows 3, and ≤760 shows 2 with no descriptions.
- [ ] **Step 5: Commit.**
```bash
git add components/About.tsx components/Treatments.tsx components/TreatmentTabs.tsx components/Page.tsx
git commit -m "Add About Me and Treatments sections with filter tabs"
```

---

### Task 8: Clinics and How to book

**Files:**
- Create: `components/Clinics.tsx`, `components/Booking.tsx`, `components/ChatDemo.tsx`.
- Modify: `components/Page.tsx`.

**Interfaces:**
- Consumes: `CLINICS`, `ClinicBadge`, `WeekStrip` (from Task 6), `bookingHref(locale, clinicName)`, `directionsHref(mapsQuery)` and `c.clinics`, `c.book`, `c.days`.
- Produces:
  - `ClinicBadge({ clinic, c, locale })` is neutral until hydration, then shows the `clinicState` label and dot.
  - `WeekStrip({ clinic, c })` renders 7 day pills (Mon..Sun). Sunday has class `off`. Today gets the class `today`, after hydration only.
  - `ChatDemo({ c })` is a client component that reveals the messages in sequence (300 / 1100 / typing at 1900 / reply at 3600 ms) when it scrolls into view.

- [ ] **Step 1: `Clinics`** (`<section id="clinics">`) renders two cards from `CLINICS`, each with:
  - The map header and its label.
  - The name in English and Urdu, with a 6px gap.
  - The badge, the hours (`clinic.hoursText`), the week strip, and the address or the "to confirm" text.
  - "Directions" via `directionsHref`, and "Book here" via `bookingHref(locale, locale === 'ur' ? clinic.nameUr : clinic.name)`.
  - The section ends with the holiday note.
- [ ] **Step 2: `Booking`** (`<section id="book">`) renders the dark band with three steps, one Book button and `ChatDemo`.
- [ ] **Step 3: Build and browser check.**
  - Run `npm run build`; it succeeds.
  - In the browser:
    - **Status:** the badges and the today ring update after load.
    - **Book here:** opens WhatsApp with the clinic's name in the message.
    - **Directions:** opens a Google Maps search.
    - **Chat:** the chat sequence plays once.
    - **Phone width:** at ≤760 the clinic buttons stack.
- [ ] **Step 4: Commit.**
```bash
git add components/Clinics.tsx components/Booking.tsx components/ChatDemo.tsx components/Page.tsx
git commit -m "Add Clinics and How to book sections"
```

---

### Task 9: Reviews, FAQ, final call to action, footer, dock and the Urdu page

**Files:**
- Create: `components/Reviews.tsx`, `components/Faq.tsx`, `components/FinalCta.tsx`, `components/Footer.tsx`, `components/MobileDock.tsx`.
- Modify: `components/Page.tsx`, `components/Header.tsx`, `components/nav/MobileMenu.tsx`.

**Interfaces:**
- Consumes: `REVIEWS`, `c.reviews`, `c.faq`, `c.final`, `c.footer`, `c.dock`, `CLINICS`, `bookingHref`, `directionsHref`.
- Produces:
  - `Reviews` returns `null` when `REVIEWS.length === 0`.
  - `Page` exports the section order: Hero, About, Treatments, Clinics, Booking, Reviews, Faq, FinalCta, then the Footer and MobileDock outside `<main>`.

- [ ] **Step 1: Hide the Reviews links while there are no reviews.** In `Header`, `MobileMenu` and `Footer`, render the "Reviews" / "05 Patient reviews" link only when `REVIEWS.length > 0`. The footer section numbers stay as written (01–06), because they match the section overlines.
- [ ] **Step 2: Build the remaining components.**
  - **`Faq`** (`<section id="faq">`): six `<details>`, with the first `open`, and the emergency note.
  - **`FinalCta`:** its button has `flex: none` via CSS.
  - **`Footer`:** four columns as in spec §3.11, with no "Back to top" link.
  - **`MobileDock`:** "Timings" (`#clinics`) and a Book button.
- [ ] **Step 3: Build and check the output.**
Run: `npm run build`, then `node -e "const fs=require('fs');for(const f of ['out/index.html','out/ur/index.html']){const h=fs.readFileSync(f,'utf8');if(/tel:|Back to top<\/a>|id=\"reviews\"/.test(h))process.exit(1)}console.log('pages ok')"`
Expected: `pages ok`. Both files exist.
- [ ] **Step 4: Urdu page browser check** (`/ur/`):
  - **Direction:** everything reads right to left in Gulzar, with Western digits and "MBBS"/"FCPS" in English.
  - **Icons and buttons:** the arrows and chevrons point left, and the back-to-top button sits bottom-left.
  - **Line heights:** no Urdu text is clipped.
  - **Links:** the WhatsApp links carry the Urdu template.
- [ ] **Step 5: Commit.**
```bash
git add components app
git commit -m "Add FAQ, final call to action, footer, mobile dock and Urdu page"
```

---

### Task 10: Full verification

**Files:** none new. Fix whatever the checks find, in the file that owns the problem.

- [ ] **Step 1: Run the tests and the build.**
Run: `npm test`, then `npm run build`.
Expected: all tests pass, the export succeeds, and `out/index.html`, `out/ur/index.html`, `out/sitemap.xml` and `out/robots.txt` exist.
- [ ] **Step 2: Compare against the design.** Serve `out` and check it against the Figma frames at 1440, 820 and 390:
  - No horizontal scroll at any of those widths.
  - Every header and footer link scrolls smoothly to its section, stops below the header, and highlights the right header link.
  - Opening `/#clinics` directly lands below the header.
  - Tabs, menu (including `Escape`) and FAQ work with the keyboard only.
- [ ] **Step 3: Check reduced motion** with Chrome DevTools "Emulate CSS prefers-reduced-motion: reduce". It must match spec §7.6:
  - Still running: the ECG line, live dots, fades, smooth link scrolling and the back-to-top ring.
  - Stopped: the lifts, the sheen and the map-pin shadow.
- [ ] **Step 4: Lighthouse (mobile)** on `/` and `/ur/`. Expected: Accessibility ≥ 95 and Performance ≥ 90. Fix any failures, then re-run.
- [ ] **Step 5: Commit any fixes.**
```bash
git add -A
git commit -m "Fix issues found in final verification"
```
- [ ] **Step 6: Report the launch blockers** that remain from spec §10: the real portrait, the Dua logo SVG and real reviews. Also report `docs/urdu-review.md` for the native reviewer.
