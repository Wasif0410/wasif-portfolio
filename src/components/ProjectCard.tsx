type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  bullets?: string[];
};

export function ProjectCard({ title, description, tags, bullets = [] }: ProjectCardProps) {
  return (
    <article className="toon-card flex flex-col p-6 sm:p-10">
      <div>
        <h3 className="toon-heading text-2xl leading-tight sm:text-3xl md:text-4xl">{title}</h3>
        <p className="toon-copy mt-4 text-base leading-7">{description}</p>

        {bullets.length > 0 && (
          <ul className="mt-6 grid gap-y-3">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 font-mono text-sm font-semibold leading-5 text-muted"
              >
                <span className="mt-0.5 shrink-0 text-base leading-none text-black" aria-hidden="true">
                  &rarr;
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag} className="toon-tag px-3 py-1 font-mono text-[0.65rem] font-bold sm:text-xs">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
