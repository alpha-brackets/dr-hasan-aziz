import { easeInOutCubic, scrollDuration } from '@/lib/scroll';

/** Eased scroll to a page Y (spec §7.5). Runs under reduced motion too: the user starts it. */
export function smoothTo(y: number): void {
  const start = window.scrollY;
  const dist = y - start;
  const dur = scrollDuration(dist);
  let t0: number | null = null;
  const step = (ts: number) => {
    if (t0 === null) t0 = ts;
    const p = Math.min(1, (ts - t0) / dur);
    window.scrollTo(0, start + dist * easeInOutCubic(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Sticky header height plus breathing room, so targets land below the header. */
export function headerOffset(): number {
  const nav = document.querySelector('.nav');
  return (nav ? nav.getBoundingClientRect().height : 0) + 24;
}
