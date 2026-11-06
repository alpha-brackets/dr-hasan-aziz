# Design guide

How the Dr. Hasan Aziz site looks, moves and behaves, and the rules to follow when changing it.
Audience: humans and AI agents editing the UI. Read this before touching a component or `app/globals.css`.

Sources of truth, in order:

1. `docs/design/mockup-v3.html` — the approved mockup: markup, class names, CSS.
2. `app/globals.css` — the live implementation of that mockup.
3. `docs/superpowers/specs/2026-11-06-dr-hasan-aziz-site-redesign-design.md` — approved structure, brand tokens, motion table and decisions D1–D10.
4. This file — the condensed working rules.

If they disagree, the spec wins on intent and `globals.css` wins on what the browser does today. Do not redesign away from the mockup without asking.

## Hard rules

- **No new dependencies.** No Tailwind, shadcn, CSS-in-JS, icon fonts or animation libraries. Icons are inline SVG in `components/icons.tsx`; motion is CSS keyframes plus a little vanilla JS.
- **One stylesheet.** Everything lives in `app/globals.css`, grouped in one block per section, with responsive rules near the end. No CSS modules, no styled-jsx, no new class naming scheme.
- **All copy in `lib/content.ts`**, for both locales, with identical shape (a unit test enforces it). If you need a string, add it to the `SiteContent` interface and both dictionaries — never inline it in a component.
- **Static export.** No server actions, route handlers, ISR, middleware, `headers()`/`cookies()`, or anything needing a Node server.
- **Booking is WhatsApp only.** Always `bookingHref(locale, clinicName?)` from `lib/links.ts`, opened with `target="_blank" rel="noopener"`. Never add `tel:` links, and never use the word "Call" except for the 1122 emergency line.
- **Never ship a live status in HTML.** "Open now" is computed on the client only.

## Tokens

Use the CSS variables; never hard-code a hex value in a component.

| Group | Variables |
|---|---|
| Blue | `--b50 #F3F6FA` `--b100 #E1EAF4` `--b200 #BFD1E7` `--b300 #8FAFD5` `--b400 #5687C0` `--b500 #2A67AF` `--b600 #074EA2` (primary) `--b700 #064188` (hover) `--b800 #04346D` (pressed) `--b900 #03254F` |
| Green | `--g50 #F4FAF0` `--g100 #E5F3DD` `--g200 #CCE8BC` `--g500 #71BF44` (accent) `--g600 #589A34` `--g700 #447C28` `--g800 #34631E` |
| Neutral | `--n0 #FFFFFF` `--n50 #F5F6F6` `--n100 #E7E8E8` `--n200 #D1D3D4` `--n300 #B4B7BA` `--n400 #8C9095` `--n500 #6B6F74` `--n600 #50545A` `--n700 #3A3D42` `--n900 #231F20` |
| Semantic | `--err #C62828` / `--err-bg #FDECEC` · `--warn #B45309` / `--warn-bg #FFF4E5` · `--ok-bg #F4FAF0` / `--ok-text #34631E` |
| Aliases | `--bg` = blue 50 (page) · `--line` = neutral 100 (borders) |
| Radii | `--r-xl 32` bands · `--r-lg 24` cards · `--r-md 18` inner blocks · `--r-sm 12` rows · pills `999` |
| Elevation | `--sh` resting · `--sh-hi` hover/lift. Do not invent a third shadow. |
| Motion | `--ease: cubic-bezier(.22,1,.36,1)` for every transition |

Colour usage:

- Page background is Blue 50; cards are white with a Neutral 100 border and `--r-lg`.
- Blue 600 is the only primary action colour, Blue 700 on hover, Blue 800 pressed.
- Green is an accent only: live dots, ticks, stars, the "current" timeline marker, and the back-to-top ring at 100% scroll. **Never white text on Green 500.** No blue-to-green gradients.
- Amber (`--warn`) means "opens later today"; red (`--err`) is reserved for the emergency note.
- Focus ring: `outline: 2px solid var(--b400); outline-offset: 3px` on `:focus-visible`.

## Typography

**English — Figtree** (`--font-figtree`, set on `body`).

| Role | Size / line-height | Weight | Notes |
|---|---|---|---|
| Body | 17/28 (16 on phones) | 400 | `--n900` |
| Body S | 15/24 | 500 | supporting copy, `--n500` |
| Lead | 20/32 | 400 | `--n600`, `max-width: 56ch` |
| H2 | `clamp(30px, 2.2vw + 18px, 40px)` / 1.2 | 700 | `--b900`, letter-spacing −.04em |
| Hero name | `clamp(46px, 4.2vw + 14px, 76px)` / 1 | 800 | surname in `--b600`, letter-spacing −.05em |
| Overline | 13/16 | 600 | uppercase, letter-spacing .1em, `--b600`, preceded by the numbered `.num` chip |
| Button | 16/24 | 600 | 15px in compact places |

**Urdu — Gulzar** (`--font-gulzar`), via the `.ur` class with `direction: rtl` and `line-height: 2`.
Scoped scale on `[dir=rtl][lang=ur]`: body 20, H2 36/68, hero name `clamp(40px, 3vw + 20px, 56px)`/1.86.

Urdu rules:

- Gulzar only. Never mix Gulzar and Figtree on one line.
- Western digits everywhere (3, 7 PM), even in Urdu. Keep `MBBS` and `FCPS` in Latin script.
- Urdu letterforms only: no Arabic `ه` `ي` `ك`; write `ہ` `ی` `ک`.
- Add every new or changed Urdu string to `docs/urdu-review.md`. It is unreviewed until a native speaker signs off.

## Layout and spacing

- Max width 1240px on `.wrap`; page gutters 24px (14px at ≤760px).
- 4px spacing base.
- Section rhythm: `section { padding: 120px 0 0 }` (88px on phones), with `scroll-margin-top: 96px` so anchor targets land below the sticky header.
- Hero bento: 12 columns, 16px gap — main card spans 7, portrait 5, today card and info strip span the full width.
- `.wrap` is the only page container. Do not add ad-hoc `max-width` values; if a block needs to be narrower, constrain the text (`.lead` already caps at 56ch).

## Components and class conventions

Class names follow the mockup. Reuse them instead of adding parallel ones.

| Piece | Markup | Notes |
|---|---|---|
| Card | `.card` | white, `--line` border, `--r-lg`, `--sh` |
| Button | `.btn` + `.btn-pri` / `.btn-ghost` | 52px tall (`--h`, 48px compact), pill, 24px side padding; `.arr` arrow nudges 4px on hover; `flex: none` inside flex rows |
| Live dot | `.live`, `.live.later`, `.live.off` | 9px; pings only when open; green / amber / grey |
| Status pill | `.pill-status` | hero only; neutral text until hydration |
| Badge | `.badge` + `data-state` | clinic cards; `open` / `later` swap the background tokens |
| Section head | `.sec-head` > `.overline` + `h2` + `.lead` | numbered `.num` badge 01–06 |
| Icon | `<Icon name="…" />` | 24 viewBox, 2px stroke, `currentColor`, `aria-hidden`; renders 20px |
| Reveal | `.rv`, `.in` added by `Reveal` | motion lives in CSS; never rewrite a `.rv` element's `className` from React (see the `is-sunday` comment in `TodayCard`) |

## Responsive behaviour

| Width | Behaviour |
|---|---|
| > 1180 | Full nav links and header button. Hero 7/5 bento, portrait beside the main card. Treatments 4 columns. |
| ≤ 1180 | Nav links and header button collapse into the ☰ menu dropdown. |
| ≤ 1080 | Hero main card full width; portrait becomes photo + side text + stacked credentials. Treatments 3 columns. About and FAQ stack. Booking stacks. Footer 2 columns. |
| ≤ 760 | Portrait card first, credentials side by side. Hero buttons full width. Treatments 2 columns without descriptions. Tabs scroll sideways. Clinic buttons stack. Body 16px. Mobile dock visible, back-to-top lifted above it. |
| ≤ 420 | Footer 1 column; header subtitle hidden. |

## RTL

Both locales render the same components, wrapped in `dir="rtl"` for Urdu. So:

- Prefer logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`) over left/right.
- Use `[dir=rtl]` overrides in `globals.css` only for things that cannot be logical: mirrored arrows/chevrons (`scaleX(-1)`), the back-to-top button moving to the left edge, and text alignment of Urdu snippets on the English page.
- Test the Urdu page after any layout change; the nav, hero, tabs and footer all mirror.

## Live status

States come from `lib/clinic-status.ts`; the texts come from `SiteContent.status`.

- `closed-today` → "Closed today" · `later` → "Opens in 2h 14m" · `open` → "Open now" · `done` → "Closed for today".
- The hero pill prefers: Sunday → open clinic → next clinic → closed, with "book for tomorrow" (Monday after Saturday).
- Client islands take `locale`, not the content object: `SiteContent` contains functions, which cannot cross into a client component. They call `getContent(locale)` themselves.
- Always render a neutral fallback when `useKarachiNow()` returns `null`; that is what keeps exported HTML honest and hydration stable.

## Motion

Motion is CSS keyframes, plus `Reveal`, `SmoothNav`, `BackToTop` and `ChatDemo` for orchestration. No animation library.

| Element | Normal | Reduced motion |
|---|---|---|
| ECG under the hero name | Draws in 3.6s with a running dot, then fades; loops | Keep |
| Live dots | Ping ring, 1.8s | Keep |
| Timeline segments | Grow in | Keep |
| Scroll reveal | Fade up 22px, staggered by `--d` | Fade only |
| In-page links | Eased scroll, 450–1100ms scaled by distance; user-started, so it also runs under reduced motion | Keep |
| Card hover | Lift 3–4px, icon tilt | No lift |
| Primary button sheen | Every 6s | Off |
| Map pin / shadow | Pin drops in, shadow breathes | Pin keeps, shadow off |
| Chat demo | Messages in sequence with typing dots | Keep |

## Accessibility

- Skip link to `#top`; `main` is focusable so the skip works.
- Every interactive element has a visible `:focus-visible` ring; smooth scrolling moves focus to the target once the scroll lands.
- Treatment tabs: `role="tablist"` / `role="tab"`, `aria-selected`, roving `tabIndex`, arrow/Home/End keys with RTL-aware direction.
- Mobile menu: burger with `aria-expanded` / `aria-controls`, closes on link click, Escape and resize to desktop.
- FAQ uses native `<details>` with the first item open.
- Active section links get `aria-current="true"`.
- Decorative SVG, the chat mockup and avatars are `aria-hidden`; the portrait's alt is the doctor's name.
- Honour `prefers-reduced-motion` as in the table above.

## Adding a new section

1. Add the strings and data to `lib/content.ts` — `SiteContent` (or a data array), in `en` and `ur`, same shape.
2. Add Urdu strings to `docs/urdu-review.md`.
3. Build the section as a server component in `components/`, using `.wrap`, `.sec-head`, `.card`, `.btn` and the existing section numbering.
4. Add it to `components/Page.tsx` in order, and to `components/nav/items.ts` if it needs a nav link (plus `NUMBERS` in `Footer.tsx`).
5. Add one CSS block in `app/globals.css` under a `/* ==== NN NAME ==== */` header, then the responsive rules for ≤1080, ≤760 and ≤420.
6. Only add `'use client'` if it needs state, effects or browser APIs.
7. Update the JSON-LD in `lib/schema.ts` only if the new content is structured data (services, hours, addresses).

## Pre-ship checklist

- `npm test` passes — the content tests catch a missing Urdu string, a shape mismatch, Arabic letterforms, Western digits, stale clinic names and `tel:` numbers.
- `npm run build` succeeds and writes `out/index.html` and `out/ur/index.html`.
- `out/index.html` still contains the neutral status, not "Open now", and all 21 treatment cards. (`grep -c` counts each class twice — once in the HTML, once in the RSC payload — so 42 matches means 21 cards.)
- Check 1440, 820 and 390 widths on both locales: no horizontal scroll, nothing clipped by the sticky header or the mobile dock.
- Keyboard pass: skip link, nav, tabs, FAQ, menu, back-to-top.
- Any new Urdu string is in `docs/urdu-review.md`.
- No new dependency, no `tel:` link, no hard-coded hex in a component.
