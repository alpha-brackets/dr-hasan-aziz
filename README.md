# Dr. Hasan Aziz — Official Website

Bilingual (English + Urdu) landing page for **Dr. Hasan Aziz**, Consultant Physician & Medical Specialist, Multan.

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript, hand-rolled CSS
- **Fully static:** `output: 'export'` — the build emits plain HTML into `out/`, hostable anywhere
- **Pages:** `/` (English, LTR) and `/ur/` (Urdu, RTL, Noto Nastaliq Urdu)
- **SEO:** per-language metadata, canonical + hreflang, Open Graph/Twitter cards, sitemap.xml, robots.txt, JSON-LD structured data
- **Clinics:** Dua Hospital (7:00 PM - 10:00 PM, closed Sunday) and Prime Hospital (11:00 AM - 6:00 PM, closed Friday)
- **Booking:** the slot-booking section is an intentional placeholder; the external booking API will be wired into `components/Booking.tsx` (`handleBook`)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static export into out/
```

## Configuration

Set the production domain once in `lib/site.ts` (`SITE_URL`); canonical URLs, hreflang, JSON-LD ids and the sitemap all derive from it.
