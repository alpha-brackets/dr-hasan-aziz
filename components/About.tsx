import { type SiteContent } from '@/lib/content';

export function About({ content }: { content: SiteContent }) {
  const t = content.about;

  return (
    <section className="section section-alt" id="about">
      <div className="container about-grid">
        <div className="about-copy">
          <div className="section-head section-head-start">
            <h2>{t.heading}</h2>
          </div>
          {t.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <dl className="about-facts">
          <div className="fact">
            <dt>{t.qualificationLabel}</dt>
            <dd>{content.hero.qualifications}</dd>
          </div>
          <div className="fact">
            <dt>{t.designationLabel}</dt>
            <dd>{content.hero.title}</dd>
          </div>
          <div className="fact fact-accent">
            <dt>{t.treatingLabel}</dt>
            <dd>{t.treatingValue}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
