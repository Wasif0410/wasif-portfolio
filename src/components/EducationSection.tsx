type EducationSectionProps = {
  school: string;
  country: string;
  degree: string;
  yearRange: string;
  highlights: string[];
  coursework: string[];
};

function YearRangeDisplay({ yearRange }: { yearRange: string }) {
  const [startYear, endYear] = yearRange.split(" – ");

  return (
    <div className="education-year-range select-none" aria-label={yearRange}>
      <span className="education-year-start">{startYear}</span>
      <span className="education-year-sep" aria-hidden="true" />
      <span className="education-year-end">{endYear}</span>
    </div>
  );
}

export function EducationSection({
  school,
  country,
  degree,
  yearRange,
  highlights,
  coursework,
}: EducationSectionProps) {
  return (
    <article className="education-entry group grid gap-6 border-b-[3px] border-black py-8 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:py-10">
      <YearRangeDisplay yearRange={yearRange} />

      <div className="relative md:pl-2">
        <h3 className="toon-heading text-4xl leading-none sm:text-5xl md:text-6xl">{school}</h3>
        <p className="toon-label mt-2 text-xs sm:mt-3 sm:text-sm">{country}</p>

        <p className="toon-copy mt-3 max-w-3xl text-lg leading-8 sm:mt-4 sm:text-xl sm:leading-9">
          {degree}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-5 sm:mt-6">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-mono text-sm font-semibold leading-6 text-muted sm:text-base sm:leading-7"
              >
                <span className="mt-1 text-base leading-none text-black" aria-hidden="true">
                  &rarr;
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {coursework.length > 0 && (
          <div className="mt-5 sm:mt-6">
            <p className="toon-label text-xs sm:text-sm">Relevant Coursework</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {coursework.map((course) => (
                <li key={course} className="toon-tag px-3 py-1 font-mono text-[0.65rem] font-bold sm:text-xs">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
