type SketchTitleProps = {
  lines: string[];
  as?: "h1" | "h2";
  size?: "hero" | "sm";
  className?: string;
};

export function SketchTitle({
  lines,
  as: Tag = "h1",
  size = "hero",
  className = "",
}: SketchTitleProps) {
  const sizeClass = size === "sm" ? "sketch-title-sm" : "sketch-title-hero";

  return (
    <Tag className={`sketch-title ${sizeClass} ${className}`.trim()}>
      {lines.map((line) => (
        <span key={line} className="sketch-title-row">
          <span className="sketch-title-depth" aria-hidden="true">
            {line}
          </span>
          <span className="sketch-title-ghost" aria-hidden="true">
            {line}
          </span>
          <span className="sketch-title-face">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
