import type { ReactNode } from "react";
import { aboutContent, type AboutHighlight } from "@/data/portfolio";
import { AboutHighlightGlyph, AboutInterestGlyph } from "@/components/AboutDecor";
import { AboutGuessDrawing } from "@/components/AboutGuessDrawing";
import { AboutDesktopSidebar } from "@/components/AboutDesktopSidebar";
import { SketchSparkle, SketchTitleUnderline } from "@/components/WritingDecor";

const BINDER_HOLES = 5;

type AboutNotebookCardProps = {
  label: string;
  children: ReactNode;
  className?: string;
  sparkles?: boolean;
};

function AboutNotebookCard({ label, children, className = "", sparkles = false }: AboutNotebookCardProps) {
  return (
    <article className={`about-notebook-card ${className}`.trim()}>
      <div className="about-notebook-binding" aria-hidden="true">
        {Array.from({ length: BINDER_HOLES }, (_, hole) => (
          <span key={hole} className="project-notebook-hole" />
        ))}
      </div>

      <div className="about-notebook-body">
        <div className="about-notebook-header">
          <span className="about-notebook-tape">{label}</span>
          {sparkles ? <SketchSparkle className="about-notebook-sparkle" /> : null}
        </div>
        {children}
      </div>
    </article>
  );
}

function AboutHeadline() {
  const accent = aboutContent.headlineAccent;
  const lead = aboutContent.headline.slice(0, -accent.length);

  return (
    <h3 className="toon-heading about-headline text-3xl leading-tight sm:text-4xl md:text-[2.85rem]">
      {lead}
      <span className="about-headline-accent">
        {accent}
        <SketchTitleUnderline className="about-headline-line" />
      </span>
    </h3>
  );
}

function AboutQuickRead({ highlights }: { highlights: AboutHighlight[] }) {
  return (
    <AboutNotebookCard label="Quick Read" className="about-notebook-card--quick-read" sparkles>
      <ul className="about-quick-facts">
        {highlights.map(({ label, value, icon }) => (
          <li key={label} className="about-quick-fact">
            <span className="about-quick-fact-icon">
              <AboutHighlightGlyph icon={icon} />
            </span>
            <div className="about-quick-fact-copy">
              <span className="about-quick-fact-label">{label}</span>
              <span className="about-quick-fact-value">{value}</span>
            </div>
          </li>
        ))}
      </ul>
    </AboutNotebookCard>
  );
}

export function AboutSection() {
  return (
    <div className="about-section">
      <div className="about-section-layout">
        <div className="about-section-left">
          <div className="about-section-main">
            <AboutHeadline />

            <div className="about-section-copy">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph} className="toon-copy">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="about-section-interests">
            <AboutNotebookCard label="Interests" className="about-notebook-card--interests">
              <p className="about-interests-note toon-copy">{aboutContent.interestsNote}</p>
              <ul className="about-interests-list">
                {aboutContent.interests.map(({ label, icon }) => (
                  <li key={label}>
                    <span className="toon-tag about-interest-tag">
                      <AboutInterestGlyph icon={icon} className="about-interest-icon" />
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </AboutNotebookCard>
          </div>
        </div>

        <AboutDesktopSidebar>
          <AboutQuickRead highlights={aboutContent.highlights} />
          <AboutGuessDrawing />
        </AboutDesktopSidebar>
      </div>
    </div>
  );
}
