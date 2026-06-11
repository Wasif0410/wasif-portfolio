type SectionHeadingProps = {
  eyebrow: string;
};

export function SectionHeading({ eyebrow }: SectionHeadingProps) {
  const [number, title] = eyebrow.split(" / ");

  return (
    <div className="mb-7">
      <h2 className="toon-section-label">
        {number} / {title}
      </h2>
      <div className="toon-rule mt-3 w-full" aria-hidden="true" />
    </div>
  );
}
