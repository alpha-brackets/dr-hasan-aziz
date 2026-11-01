import type { IconName } from '@/lib/content';

/* ---------- medical condition icons (24x24, stroke) ---------- */

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  liver: (
    <>
      <path d="M3 7.5c4-2.2 9.2-2.4 13.2-.4 3 1.5 4.8 4 4.8 7 0 3.2-2.2 6.4-5.4 6.4-2.6 0-4.2-1.6-6.2-3.1-1.6-1.2-3.4-1.8-5.4-1.8H3V7.5Z" />
      <path d="M13 10.5h3.5" />
    </>
  ),
  lungs: (
    <>
      <path d="M12 4v9" />
      <path d="M9.5 8.5C8 8.5 6.5 10 6 12s-1 4.5-1 6.5S6.5 21 8 21s2-1.5 2-3v-4c0-2.5-.5-5.5-.5-5.5Z" />
      <path d="M14.5 8.5c1.5 0 3 1.5 3.5 3.5s1 4.5 1 6.5S17.5 21 16 21s-2-1.5-2-3v-4c0-2.5.5-5.5.5-5.5Z" />
    </>
  ),
  heart: (
    <>
      <path d="M19 13.5c1.3-1.3 2.5-2.9 2.5-5A4.5 4.5 0 0 0 17 4c-1.6 0-2.8.6-4 1.9C11.8 4.6 10.6 4 9 4a4.5 4.5 0 0 0-4.5 4.5c0 2.1 1.2 3.7 2.5 5l6 6.5 6-6.5Z" />
      <path d="M3.5 12.5H8l1.5-2.5 2.5 5 2-3.5H19" />
    </>
  ),
  glucose: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8.5 7.5h7" />
      <path d="M8.5 11.5h4" />
      <path d="M8.5 16.5h7" />
    </>
  ),
  thermometer: (
    <>
      <path d="M14 14.5V5a2 2 0 0 0-4 0v9.5a4 4 0 1 0 4 0Z" />
      <path d="M12 9v6" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h9a3 3 0 1 0-3-3" />
      <path d="M3 12h13.5a3 3 0 1 1-3 3" />
      <path d="M3 16h6.5" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 21a6.5 6.5 0 0 0 6.5-6.5c0-2-1-3.8-2.7-5.4-.6 1.6-1.8 2.7-3.2 2.7-.9 0-1.6-.4-2.1-1L12 9s-2.8-3.6-4.4-5.7C5.4 6.5 5.5 14.5 5.5 14.5 5.5 17.5 8 21 12 21Z" />
    </>
  ),
  kidney: (
    <>
      <path d="M10 4c2.7 0 4.5 2.2 4.5 5.2 0 2-.9 3.4-.9 5.3 0 2.6-1.4 4.5-3.4 4.5-2.3 0-3.7-1.9-3.7-4.3 0-2.3 1-4 1.7-5.6.9-1.9 1.8-5.1 1.8-5.1Z" />
      <path d="M15.5 9.5c1.5.7 2.5 2.3 2.5 4.5" />
    </>
  ),
  pollen: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="6.5" r="2.5" />
      <circle cx="17" cy="10" r="2.5" />
      <circle cx="15" cy="16" r="2.5" />
      <circle cx="9" cy="16" r="2.5" />
      <circle cx="7" cy="10" r="2.5" />
    </>
  ),
  flame: (
    <>
      <path d="M12 21c3.6 0 6.5-2.8 6.5-6.4 0-3-1.6-5.3-3.4-7.2.4 2-1 3.6-2.6 3.6C14 8 13 4.7 13.6 2 9.5 3.8 5.5 7.8 5.5 14.6 5.5 18.2 8.4 21 12 21Z" />
    </>
  ),
};

export function MedIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/* ---------- UI icons ---------- */

function ui(path: React.ReactNode, className?: string) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}

export const PhoneIcon = ({ className }: { className?: string }) =>
  ui(
    <path d="M6.5 3.5h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />,
    className
  );

export const ClockIcon = ({ className }: { className?: string }) =>
  ui(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>,
    className
  );

export const MapPinIcon = ({ className }: { className?: string }) =>
  ui(
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>,
    className
  );

export const CalendarIcon = ({ className }: { className?: string }) =>
  ui(
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>,
    className
  );

export const GlobeIcon = ({ className }: { className?: string }) =>
  ui(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9S14.5 18.4 12 21c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
    </>,
    className
  );

export const ArrowUpRightIcon = ({ className }: { className?: string }) =>
  ui(
    <>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </>,
    className
  );

export const CheckIcon = ({ className }: { className?: string }) =>
  ui(<path d="m5 12.5 4.5 4.5L19 7.5" />, className);

export const SparkIcon = ({ className }: { className?: string }) =>
  ui(
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />,
    className
  );

/** Brand mark used in the header / footer: medical cross in a rounded tile. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" rx="13" fill="currentColor" />
      <path
        d="M20 11h8v9h9v8h-9v9h-8v-9h-9v-8h9v-9Z"
        fill="#fff"
      />
      <path
        d="M14 31.5c2.6-3.4 5-5.2 7.4-5.2 2 0 3.1 1.4 4.6 1.4 1.4 0 2.4-1.4 4.2-1.4 2 0 4 1.6 6 4.7"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
