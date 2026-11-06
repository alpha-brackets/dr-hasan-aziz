# Dr. Hasan Aziz website — redesign (v3.1)

- **Date:** 2026-11-06
- **Status:** Design approved by the user. This spec is waiting for the user's review.
- **Approved design:** `docs/design/mockup-v3.html` and the Figma file "Dr Hasan Aziz — Website v3" (`C40G3bzEVhUT8EFUE6m0BK`), frames "v3.1 · Home · Desktop 1440" and "v3.1 · Home · Mobile 390", plus the "Motion notes" board.
- **Brand source:** Figma "Dua Hospital — Brand Guidelines" (`ZJgBejd3ZcOPvc1ZZzCECW`, node `44:13`).

## 1. Goal

Rebuild the one-page site for Dr. Hasan Aziz (Consultant Physician, FCPS Medicine) so a patient, including one with little education or technical skill, can answer five questions within seconds:

1. Who is the doctor?
2. Can I trust him?
3. Does he treat my problem?
4. Where and when can I see him?
5. How do I book?

The page is doctor-first, trust-oriented, modern, and in the Dua Hospital brand.

### Success criteria
- The hero shows his name, qualifications, the main conditions he treats, today's clinic status and a WhatsApp booking button, without scrolling, at 1440px and at 390px.
- Every booking button opens WhatsApp with a pre-filled message.
- The page matches the approved mockup at desktop (1440), tablet (820) and phone (390), with no horizontal scroll.
- The colours and type are exactly the brand tokens (section 5).
- English is at `/`. Urdu is at `/ur/`, right-to-left, with the same structure.
- `next build` produces a working static export. Lighthouse Accessibility is 95 or higher and Performance is 90 or higher on mobile.

### Out of scope
- **Booking system.** A separate clinic-management product will provide booking later. This site only links to WhatsApp. Keep one clear seam (section 7.4) so that product can replace the links later.
- **Third-party UI or animation libraries.**
- **Other Dua Hospital entities.** This repository is Dr. Hasan Aziz only.

## 2. Decisions

| # | Decision | Reason |
|---|---|---|
| D1 | **Plain CSS with brand tokens as CSS custom properties.** Do not add Tailwind or shadcn. | The user asked for no third-party libraries. The look came from shadcn but needs no dependency. Tokens map 1:1 to the Figma variables. |
| D2 | **Motion is CSS keyframes plus about 150 lines of vanilla JS** (IntersectionObserver, a timer). | Same rule as D1. Keeps the page fast. |
| D3 | **WhatsApp is the only booking channel.** Remove every phone "Call" option for now. | The user's instruction. The number stays only inside WhatsApp links. The 1122 emergency number stays. |
| D4 | **Both clinics are open Monday to Saturday and closed on Sunday.** | The user confirmed. |
| D5 | **Clinic hours:** Hayat Medical Center 11:00 AM – 7:00 PM. Dua Hospital 7:00 PM – 10:00 PM. | The user confirmed. This replaces the old "Prime Hospital" data. |
| D6 | **Both hospitals are named** in the qualifications ("Consultant Physician · Dua Hospital & Hayat Medical Center, Multan") and in the About text. | The user's instruction. |
| D7 | **Degree and specialisation sit together** in one strip under the portrait: MBBS (Army Medical College, Rawalpindi), then FCPS Medicine (College of Physicians & Surgeons Pakistan). Nothing covers the photo. | The user approved this layout. |
| D8 | **Reduced motion keeps calm motion.** Under `prefers-reduced-motion`, keep the ECG line, the live dots, fades and smooth link scrolling. Remove slides, lifts, bobbing and the button sheen. | The user's own system has reduced motion on and they want the page to feel animated. Large movement is still removed. |
| D9 | **The reviews section renders only when real reviews exist** (`REVIEWS.length > 0`). | The mockup's three reviews are sample text. Publishing made-up patient reviews would mislead patients. |
| D10 | **The portrait is a launch blocker.** Build with the stock image at `public/images/doctor-placeholder.jpg`. The real portrait must replace it before go-live. | The stock photo shows a different person. It is fine for development, not for production. |

## 3. Page structure (English, `/`)

Order follows the mockup. Section numbers appear as small "01"–"06" badges.

1. **Header** (sticky, floating pill)
   - Logo slot (master Dua logo SVG, still needed), name and "Consultant Physician · Multan".
   - Links: About Me, Treatments, Clinics & timings, How to book, Reviews, Questions. ("About Me" links to the 01 section.)
   - اردو link to `/ur/`. "Book on WhatsApp" button.
   - At 1180px and below, the links and the button collapse into a ☰ menu: a dropdown panel with all the links and the Book button. The panel closes when a link is chosen.
2. **Hero (bento grid)**
   - **Main card:**
     - Live status pill (section 7.2).
     - Overline "Consultant Physician · FCPS Medicine".
     - H1 "Dr. Hasan Aziz" and the ECG line.
     - Urdu name line.
   - **Hero line:**
     > **Sugar. Blood pressure.**
     > **Fever that won't go away.**
     > One specialist who finds the cause and treats it.
   - **Condition chips:** Diabetes, Blood pressure, Fever & dengue, Cough & asthma, Acidity & ulcer, Jaundice & hepatitis, Heart disease, "See all 21 →" (links to `#treatments`).
   - **Buttons:** "Book on WhatsApp" (primary) and "See clinic timings" (ghost, links to `#clinics`).
   - **Note:** "Monday to Saturday · Closed on Sunday".
   - **Portrait card:**
     - Clean photo with a name plate: "Dr. Hasan Aziz / Consultant Physician, Multan" and the Urdu name.
     - Below the photo, the credentials strip (D7).
   - **"Where is he today?" card:**
     - A 9 AM – 11 PM track with the Hayat and Dua segments and a "Now" marker.
     - One status row per clinic.
     - On Sunday, the track is replaced by a "Both clinics are closed today" note.
   - **Info strip (4 clickable cards):** "6 days a week / Mon – Sat · closed Sunday" (→ `#clinics`); "Day & evening / Hayat 11 AM – 7 PM · Dua 7 – 10 PM" (→ `#clinics`); "21 conditions / From fever to diabetes and BP" (→ `#treatments`); "Book in 1 message / WhatsApp. No forms, no app." (WhatsApp link). Each card has a chevron that moves on hover. The credentials are not repeated here; they are already in the portrait strip.
3. **No marquee.** It was removed as repetitive; the condition chips and the Treatments section carry that content.
4. **01 About Me**
   - **Heading:** "A specialist who listens first."
   - **About text:** "Dr. Hasan Aziz is a consultant physician at Dua Hospital and Hayat Medical Center, Multan. He treats adults for everyday illness, such as fever, cough and infections, and for long-term conditions, such as diabetes and high blood pressure." Then: "If you need a surgeon or another specialist, he explains why and guides you to the right one."
   - **Fact tiles:** "Adults / Adult medicine" and "Mon – Sat / Closed on Sunday".
   - **Qualifications timeline:**
     - MBBS (Degree): Army Medical College, Rawalpindi.
     - FCPS (Medicine) (Specialist): College of Physicians & Surgeons Pakistan.
     - Consultant Physician (Current): Dua Hospital & Hayat Medical Center, Multan.
   - **"Your visit, step by step":**
     - Before: Book on WhatsApp.
     - Bring: Old reports and medicines.
     - During: Talk and check-up (BP, pulse, sugar if needed).
     - After: A clear written plan.
5. **02 Treatments**
   - Filter tabs with counts: All 21, Everyday 5, Long-term 6, Heart & brain 3, Stomach & liver 4, Chest 3.
   - Card grid with icon, English name, Urdu name (8px gap above it) and a one-line description.
   - A dark "Don't see your problem? Ask on WhatsApp" card fills the last row.
   - The data is in section 6.2.
6. **03 Clinics & timings**
   - **Heading:** "Two clinics. Same doctor." Lead: "Daytime at Hayat Medical Center, evenings at Dua Hospital. Both closed on Sunday."
   - **Two clinic cards, each with:**
     - A drawn map header with a Daytime or Evening label.
     - The name in English and Urdu, and a live status badge.
     - Big hours and a Mon–Sun strip, with Sunday greyed out and today ringed.
     - Address and landmark.
     - "Directions" (Google Maps search URL) and "Book here" (WhatsApp, with the clinic name in the message).
   - **Holiday note:** "On public holidays, timings can change. Send a message before you come."
7. **04 How to book** (dark section)
   - "One message. That's all it takes."
   - Three steps and one "Book on WhatsApp" button.
   - A phone mockup of a WhatsApp chat. Messages appear one by one, with a typing indicator.
8. **05 Patient reviews** (D9)
   - One large blue card and two white cards, each with stars, the quote, an initials avatar, the name and the condition.
9. **06 Before your visit**
   - "Questions patients ask", with an accordion:
     - How do I book?
     - Which days is he available?
     - Can I come without booking?
     - What should I bring?
     - What is the fee?
     - Which clinic should I choose?
   - Emergency note: "Emergency? Don't wait for a message. Chest pain, fainting or trouble breathing: call 1122 or go to the nearest emergency."
10. **Final call to action:** a blue band with an avatar, "Feeling unwell? Book your visit.", "Dr. Hasan Aziz · Monday to Saturday · Multan" and a Book button. An ECG line runs across the background.
11. **Footer** (Blue 900), four columns:
    - **Brand:** name, "Consultant Physician · FCPS Medicine / MBBS, Army Medical College", Urdu name, white "Book on WhatsApp" button.
    - **On this page:** numbered links to all six sections (01 About Me … 06 Questions).
    - **Clinics:** each clinic with its hours and a Directions link, then "Monday to Saturday · Closed on Sunday".
    - **Help:** Book on WhatsApp, Questions, the Urdu page ("اردو میں دیکھیں"), and an emergency note ("Call 1122 or go to the nearest emergency").
    - **Bottom line:** "© 2026 Dr. Hasan Aziz · Part of Dua Hospital, Multan". No footer "Back to top" link; the floating back-to-top button covers it.
    - Columns go 4 → 2 at 1080px → 1 at 420px.
12. **Mobile dock** (760px and below): a fixed bottom bar with "Timings" (→ `#clinics`) and "Book on WhatsApp".

### Urdu page (`/ur/`)
- **Structure:** the same sections and order, mirrored with `dir="rtl"`.
- **Type:** all text in Gulzar Regular, at the brand Urdu sizes (Body 20/40, H2 36/68, Display 56/104).
- **Exceptions to Urdu text:** keep Western digits. Keep "MBBS" and "FCPS" in English. Never mix two fonts on one line.
- **Translation:** the copy comes from the corrected Urdu dictionary (section 6.3). Any new string without a reviewed translation is listed in section 9.

## 4. Responsive behaviour

| Width | Behaviour |
|---|---|
| > 1180 | Full nav. Hero is a 7/5 bento with the portrait spanning two rows. Treatments 4 columns. Reviews 3 columns. |
| ≤ 1180 | Nav collapses to the ☰ menu. |
| ≤ 1080 | Hero main card is full width. The portrait card becomes two columns: photo on the left; "Consultant Physician at Dua Hospital & Hayat Medical Center" with the credentials stacked on the right. Treatments 3 columns. About and FAQ stack. Booking section stacks. Reviews: the big card is full width, then 2 columns. |
| ≤ 760 | Portrait card first (photo, then credentials side by side). Hero buttons full width. Treatments 2 columns, without descriptions. Tabs scroll sideways. Clinic buttons stack. Dock visible. |
| ≤ 420 | Footer is 1 column. Header subtitle hidden. |

## 5. Brand tokens (from Figma, exact)

- **Blue:**
  - 50 `#F3F6FA`, 100 `#E1EAF4`, 200 `#BFD1E7`, 300 `#8FAFD5`, 400 `#5687C0`.
  - 500 `#2A67AF`, **600 `#074EA2` (primary)**, 700 `#064188` (hover), 800 `#04346D` (pressed), 900 `#03254F`.
- **Green:**
  - 50 `#F4FAF0`, 100 `#E5F3DD`, 200 `#CCE8BC`, **500 `#71BF44` (accent)**.
  - 600 `#589A34`, 700 `#447C28`, 800 `#34631E`.
- **Neutral:**
  - 0 `#FFFFFF`, 50 `#F5F6F6`, 100 `#E7E8E8`, 200 `#D1D3D4`, 300 `#B4B7BA`.
  - 400 `#8C9095`, 500 `#6B6F74`, 600 `#50545A`, 700 `#3A3D42`, 900 `#231F20`.
- **Semantic:**
  - Error `#C62828` on `#FDECEC`.
  - Warning `#B45309` on `#FFF4E5`.
  - Success text `#34631E` on `#F4FAF0`.
  - Focus ring `#5687C0`.
- **Usage rules:**
  - Page background Blue 50, cards white with a Neutral 100 border.
  - Never put white text on Green 500.
  - No blue-to-green gradients.
  - Green is for live dots, ticks, stars and the "current" marker only.
- **Type (Figtree):**
  - Display 64/72 ExtraBold −3.
  - H1 48/56 ExtraBold −2.
  - H2 40/48 Bold −2.
  - H4 24/32 SemiBold.
  - Body L 20/32, Body 17/28, Body S 15/24.
  - Overline 13/16 SemiBold +10%.
  - Button 16/24 SemiBold.
  - The hero name uses `clamp(46px, 4.2vw + 14px, 76px)`.
- **Shape:**
  - Pill buttons 52px tall (48px in compact places).
  - Card radius 24, large sections 32.
  - 4px spacing base, 1240px max width.
- **Icons:** outline, 2px stroke, Lucide-style. All inline SVG. No icon font.

## 6. Content and data

### 6.1 Single source of truth
`lib/content.ts` holds all copy and data for both languages. Components contain no literal copy. `lib/site.ts` keeps `SITE_URL` and the WhatsApp number. Remove the duplicate phone constant in `content.ts`.

New and changed data shapes:
```ts
type ClinicId = 'hayat' | 'dua';
interface Clinic {
  id: ClinicId;
  name: string; nameUr: string;
  label: 'Daytime' | 'Evening';
  openMin: number; closeMin: number;      // minutes after midnight, Asia/Karachi
  days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean]; // Sun..Sat
  address: string | null; landmark: string | null; // null → "to confirm"
  mapsQuery: string;
}
type TreatmentGroup = 'day' | 'long' | 'heart' | 'stomach' | 'chest';
interface Treatment { icon: IconName; name: string; nameUr: string; blurb: string; blurbUr: string; group: TreatmentGroup; }
interface Review { quote: string; name: string; condition: string; } // empty array until real reviews arrive
```
Clinics:
- Hayat: `openMin` 660, `closeMin` 1140.
- Dua: `openMin` 1140, `closeMin` 1320.
- Both: `days = [false, true, true, true, true, true, true]` (closed Sunday).

### 6.2 Treatments (21)

| Group | Conditions |
|---|---|
| Everyday | Fever, Dengue, Allergy, Headache, Back & joint pain |
| Long-term | Sugar (diabetes), Blood pressure, Low blood (anaemia), Obesity, Kidney stones, Kidney & bladder |
| Heart & brain | Heart disease, Stroke & paralysis, Fits (epilepsy) |
| Stomach & liver | Acidity, Ulcer, Jaundice, Hepatitis |
| Chest | Cough, Asthma, TB |

The English blurbs and Urdu names are as in the mockup's `TX` array. This list replaces the old 10 services and the separate "Specialties" list. The old `components/Specialties.tsx` is removed.

### 6.3 Corrections to the current Urdu content
- مزیدار کھانسی → مسلسل کھانسی
- ومیکل → و میڈیکل
- Arabic ه → Urdu ہ (ہسپتال, پلازہ)
- Fix these misspellings: ڈیولی, اونچھا, کنداں, دممہ, گلہر
- Split "بانجھ پن وبائی امراض" into separate items, or drop it (see the open item on wording).
- "Shir Shah" → "Sher Shah"
- Remove "چیف فزیشن" from the Urdu keywords.

### 6.4 SEO
- **Physician:** update the JSON-LD (`lib/schema.ts`) so the Physician `worksFor` both clinics.
- **MedicalClinic:** one entry each for Hayat and Dua, with `openingHoursSpecification` Monday–Saturday at the hours above.
- **Other metadata:**
  - Remove the "Prime Hospital" data.
  - Keep the canonical tags, the `hreflang` en/ur pair, the sitemap and robots.

## 7. Behaviour

### 7.1 Time
All status logic uses Pakistan time: `new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }))`. Status is computed on the client after hydration. The static HTML ships a neutral state ("Mon–Sat · see timings") so there is no wrong flash for search engines or no-JS users.

### 7.2 Clinic status
For each clinic, the state is one of:
- `closed-today` (not a working day)
- `later` (before opening: "Opens in 2h 14m")
- `open` ("Open now")
- `done` ("Closed for today")

The hero pill picks, in this order:
1. Sunday → "Closed today (Sunday) · Book now for Monday".
2. A clinic is open → "Seeing patients now · <clinic>, until <close>".
3. A clinic opens later today → "Next clinic · <that clinic>, opens in …". Use the earliest one: Hayat before 11 AM, Dua between 7 PM and its opening.
4. Otherwise → "Clinics closed now · Book now for tomorrow" (Saturday says "for Monday").

The dots are green for open, amber (Warning) for later and grey for closed. The status recomputes every 60 seconds.

### 7.3 Timeline
The track covers 9 AM – 11 PM. Segments are placed by minutes. The "Now" marker is hidden outside the track range. On Sunday the whole track is replaced by the closed note.

### 7.4 Booking seam
Use one helper, `bookingHref(clinic?: ClinicId, locale)`, which returns `https://wa.me/923336489392?text=<encoded>`. The message is:

> Assalam o Alaikum. I would like to book an appointment with Dr. Hasan Aziz[ at <clinic>].
> Name:
> Problem:

The Urdu page uses an Urdu template. Every booking button calls this helper, so the future booking system replaces one function. Links open in a new tab with `rel="noopener"`.

### 7.5 Interactions
- **Treatment tabs:** a client component. ARIA `tablist` and `tab` with `aria-selected`. Arrow-key support. Filtered cards fade in.
- **Mobile menu:** `aria-expanded` and `aria-controls`. Closes on link click and on Escape.
- **FAQ:** native `<details>`, with the first item open.
- **In-page links:** every `href="#…"` link scrolls smoothly with an ease-in-out curve (450–1100ms, scaled by distance) and stops below the sticky header. The URL hash updates with `history.replaceState`. This runs in JS, so CSS `scroll-behavior` is not used. It runs even with reduced motion, because the user starts it and it is short.
- **Active section:** an IntersectionObserver marks the header link (and the mobile-menu link) for the section in the middle of the screen with `aria-current="true"`, shown as a Blue 100 pill.
- **Back-to-top button:** a 56px white circle fixed at the bottom right (52px, and 88px from the bottom on phones so it sits above the dock). It appears after 600px of scrolling with a fade and lift. A Blue 600 ring around it fills clockwise as the reader scrolls (SVG `stroke-dashoffset`, radius 25). The ring turns Green 500 at the very bottom. On hover the arrow nudges up. On click it runs the same eased scroll to the top. It is a `<button>` with `aria-label="Back to top"`.
- **Buttons never shrink:** a button inside a flex row is `flex: none`, so its icon and arrow keep their padding.

### 7.6 Motion
These match the Figma "Motion notes" board.

| Element | Normal | Reduced motion |
|---|---|---|
| ECG line under the name | Draws over 3.6s, a green dot runs along it, then it fades. Loops. | Keep |
| Live dots | Ping ring, 1.8s | Keep |
| Timeline segments | Grow in on load | Keep |
| Scroll reveal | Fade up 22px, staggered | Fade only |
| Nav link click | Eased smooth scroll | Eased smooth scroll (user-started) |
| Info strip chevrons | Slide 3px on hover | Keep |
| Back-to-top ring | Fills with scroll; button fades in after 600px | Keep |
| Card hover | Lift 3–4px, icon tilts | No lift |
| Primary button sheen | Every 6s | Off |
| Map pin | Drops in, shadow breathes | Pin keeps; shadow off |
| Chat demo | Messages in sequence with typing dots | Keep |
| Final call-to-action ECG | Slow line sweep | Keep |

## 8. Architecture

- **Stack:** Next.js 16 App Router, React 19, TypeScript, `output: 'export'`, `trailingSlash`. No new dependencies.
- **Components:** server components by default.
- **Client islands, only these:**
  - `LiveStatus` (hero pill, today card, clinic badges, week strip "today" ring)
  - `TreatmentTabs`
  - `MobileMenu`
  - `Reveal` (one observer that adds `.in`)
  - `SmoothNav` (smooth in-page scrolling, active-section highlight, back-to-top ring)
  - `ChatDemo`
- **Files:**
  - `components/` is rebuilt to match the sections:
    - `Header`, `Hero`, `PortraitCard`, `TodayCard`, `InfoStrip`, `BackToTop`
    - `About`, `Treatments`, `Clinics`, `Booking`, `Reviews`, `Faq`, `FinalCta`, `Footer`, `MobileDock`
    - `icons`
  - `components/Page.tsx` composes the sections for a given locale.
  - Remove `Specialties.tsx`, `Services.tsx`, `Timings.tsx` and `ContactBand.tsx`. Their content is merged into the components above.
- **Styles:**
  - `app/globals.css` is rewritten.
  - Order of the file: tokens (section 5), base, then one block per section, then responsive rules, then reduced motion.
  - Class names follow the mockup.
  - RTL is handled with logical properties (`margin-inline-start` etc.) and `[dir=rtl]` overrides where needed.
- **Logic:** `lib/clinic-status.ts` holds the pure functions for section 7.2, taking `(now: Date, clinic)` and returning the state. They have no DOM access, so they can be tested.
- **Fonts:** Figtree and Gulzar via `next/font/google` (self-hosted at build time). The Gulzar subset is limited to the Urdu page where possible.
- **Images:**
  - `public/images/doctor-placeholder.jpg` (D10), rendered with `next/image` (`unoptimized`, because of the static export) and fixed `width`/`height`.
  - Use `object-position` to keep the face in frame.
  - The logo goes in `public/brand/` once received.

## 9. Testing

- **Unit:** use Node's built-in test runner (`node --test`), so no new dependency is needed. Node 22.18+ strips TypeScript types natively (checked on this machine, v22.18.0), so `lib/*.test.ts` runs directly; add a `"test": "node --test lib/"` script. Test `lib/clinic-status.ts` with:
  - each state at boundary minutes (10:59, 11:00, 18:59, 19:00, 21:59, 22:00);
  - Sunday;
  - Saturday evening → "Monday";
  - Karachi time from a UTC input.
- **Unit:** `bookingHref` encoding, with and without a clinic.
- **Build:** `next build` succeeds, and both `out/index.html` and `out/ur/index.html` exist.
- **Manual or browser checks:**
  - Compare against the Figma frames at 1440, 820 and 390.
  - No horizontal scroll.
  - Tabs, menu and FAQ work by keyboard.
  - Every header and footer link scrolls smoothly to its section and the right header link becomes active.
  - Reduced-motion behaviour as in section 7.6.
  - Lighthouse targets from section 1.

## 10. Open items

### Before launch (blocking)
1. Real portrait of Dr. Hasan Aziz: white coat, plain background, eye level (replaces the D10 placeholder).
2. Master Dua Hospital logo SVG. Rebuilding the logo is not allowed.
3. Real patient reviews with permission. Until then the section stays hidden (D9).

### Content to confirm (non-blocking; the site shows "to confirm" or omits the item)
4. Hayat Medical Center address and landmark. Dua Hospital full address and landmark.
5. Fee, and walk-in policy.
6. Wording for men's health and infertility. These are currently left out of the 21 treatments.
7. Urdu translations for the new copy: hero line, condition chips, visit steps and FAQ. These need a native reviewer.
8. Optional: years of experience and PMDC number. If provided, add them to the info strip or the portrait credentials.
