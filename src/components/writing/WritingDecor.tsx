type SvgProps = {
  className?: string;
};

export function SketchSparkle({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="14"
      height="11"
      viewBox="0 0 28 22"
      fill="none"
      aria-hidden="true"
    >
      <path d="M14 1.5 L14.8 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 5.5 L17.2 9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24.5 13 L18.5 13.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SketchIndexUnderline({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="40"
      height="7"
      viewBox="0 0 72 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 4.5 C18 7.5, 34 2.5, 70 5.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M3 9.5 C20 12, 36 7.5, 68 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function SketchTitleUnderline({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="100%"
      height="4"
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 4 C18 1.5, 36 5, 54 3.2 C72 1.5, 86 4.5, 99 2.8"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function WritingReadLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="writing-read-link">
      <SketchSparkle className="writing-read-sparkle" />
      <span className="writing-read-label">
        Read <span aria-hidden="true">&rarr;</span>
      </span>
    </a>
  );
}

export function ComingSoonStamp() {
  return (
    <div className="writing-soon-stamp" aria-label="Coming soon">
      <SketchSparkle className="writing-soon-sparkle" />
      <span className="writing-soon-tape" aria-hidden="true" />
      <span className="writing-soon-label">
        <span className="writing-soon-label-line">Coming</span>
        <span className="writing-soon-label-line">Soon</span>
      </span>
    </div>
  );
}
