import { type SiteContent } from '@/lib/content';

export function Specialties({ content }: { content: SiteContent }) {
  const t = content.specialties;

  return (
    <section className="section section-alt" id="specialties">
      <div className="container">
        <div className="section-head">
          <span className="badge-specialist">{t.badge}</span>
          <h2>{t.heading}</h2>
          <p>{t.sub}</p>
        </div>

        <div className="specialty-panel">
          <p>{t.line1}</p>
          <p>{t.line2}</p>
        </div>
      </div>
    </section>
  );
}
