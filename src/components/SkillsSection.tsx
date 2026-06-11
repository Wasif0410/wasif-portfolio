type SkillsSectionProps = {
  groups: {
    title: string;
    skills: string[];
  }[];
};

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <div className="skills-section grid gap-6 sm:gap-7 lg:grid-cols-3 lg:gap-8">
      {groups.map((group) => (
        <article key={group.title} className="skills-section-card toon-card p-6 sm:p-7 lg:p-8">
          <h3 className="toon-heading text-2xl sm:text-3xl">{group.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-2.5 sm:mt-5 sm:gap-3">
            {group.skills.map((skill) => (
              <li key={skill} className="toon-tag px-3.5 py-1.5 font-mono text-xs font-bold sm:px-4 sm:py-1.5 sm:text-sm">
                {skill}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
