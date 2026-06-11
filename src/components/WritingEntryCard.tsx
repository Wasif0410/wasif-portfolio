import {
  ComingSoonStamp,
  SketchIndexUnderline,
  SketchTitleUnderline,
  WritingReadLink,
} from "@/components/WritingDecor";
import type { WritingEntry } from "@/data/portfolio";

type WritingEntryCardProps = {
  entry: WritingEntry;
  index: number;
};

export function WritingEntryCard({ entry, index }: WritingEntryCardProps) {
  return (
    <article className="writing-entry-card group grid min-h-0 grid-cols-[5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-5 sm:overflow-hidden sm:h-full">
      <div className="writing-entry-index-col flex flex-col items-start gap-1.5">
        <span className="writing-entry-index select-none font-mono text-[2.75rem] font-black leading-none tracking-[-0.04em] text-black/10 sm:text-5xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <SketchIndexUnderline className="writing-entry-index-line" />
      </div>

      <div className={`writing-entry-panel min-w-0 ${entry.href ? "" : "writing-entry-panel--soon"}`}>
        <div className="writing-entry-top flex items-start justify-between gap-3">
          <p className="toon-label text-xs sm:text-sm">{entry.date}</p>
          {entry.href ? <WritingReadLink href={entry.href} /> : <ComingSoonStamp />}
        </div>

        <h3 className="toon-heading mt-2 max-w-2xl text-xl leading-tight sm:mt-3 sm:text-2xl md:text-3xl">
          <span className="writing-title-lead">
            <span className="writing-title-lead-text">{entry.titleLead}</span>
            <SketchTitleUnderline className="writing-title-lead-line" />
          </span>
          {entry.titleRest}
        </h3>

        <p className="toon-copy mt-3 max-w-2xl text-base leading-7 sm:mt-4 sm:text-lg sm:leading-8">{entry.excerpt}</p>

        <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
          {entry.tags.map((tag) => (
            <li key={tag} className="toon-tag px-3 py-1 font-mono text-[0.65rem] font-bold sm:px-3.5 sm:py-1 sm:text-xs">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
