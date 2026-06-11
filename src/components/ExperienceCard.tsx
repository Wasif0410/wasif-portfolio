import type { CSSProperties } from "react";

type ExperienceCardProps = {
  year: string;
  company: string;
  role: string;
  description: string;
  bullets: string[];
  index?: number;
  isVisible?: boolean;
};

export function ExperienceCard({
  year,
  company,
  role,
  description,
  bullets,
  index = 0,
  isVisible = false,
}: ExperienceCardProps) {
  return (
    <article
      className={`experience-card group grid gap-6 border-b-[3px] border-black py-8 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:py-10 ${isVisible ? "is-visible" : ""}`}
      style={{ "--experience-index": index } as CSSProperties}
    >
      <div className="experience-year select-none font-mono text-7xl font-black leading-none tracking-[-0.04em] text-black/10 transition-colors duration-300 group-hover:text-black/18 sm:text-8xl md:text-[6rem]">
        {year}
      </div>

      <div className="experience-body relative md:pl-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
          <h3 className="toon-heading text-4xl leading-none sm:text-5xl md:text-6xl">
            {company}
          </h3>
          <p className="toon-label pb-1 text-xs sm:text-sm">{role}</p>
        </div>

        <p className="toon-copy mt-3 max-w-3xl text-lg leading-8 sm:mt-4 sm:text-xl sm:leading-9">
          {description}
        </p>

        <ul className="mt-5 grid gap-x-12 gap-y-3 sm:grid-cols-2 sm:mt-6">
          {bullets.map((bullet, bulletIndex) => (
            <li
              key={bullet}
              className="experience-bullet flex items-start gap-3 font-mono text-sm font-semibold leading-6 text-muted sm:text-base sm:leading-7"
              style={{ "--bullet-index": bulletIndex } as CSSProperties}
            >
              <span
                className="mt-1 text-base leading-none text-black"
                aria-hidden="true"
              >
                &rarr;
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
