"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState, type PointerEvent, type TouchEvent } from "react";
import { WritingEntryCard } from "@/components/writing/WritingEntryCard";
import { writingEntries } from "@/data/portfolio";

const MOBILE_WRITING_QUERY = "(max-width: 639px)";
const SWIPE_THRESHOLD = 48;
const VERTICAL_SCROLL_TOLERANCE = 36;

export function WritingSection() {
  const regionRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const total = writingEntries.length;

  const canPrev = !showAll && index > 0;
  const canNext = !showAll && index < total - 1;

  const goPrev = useCallback(() => {
    if (showAll) return;
    setSlideDirection("prev");
    setIndex((current) => Math.max(0, current - 1));
  }, [showAll]);

  const goNext = useCallback(() => {
    if (showAll) return;
    setSlideDirection("next");
    setIndex((current) => Math.min(total - 1, current + 1));
  }, [showAll, total]);

  const openEntry = useCallback((entryIndex: number) => {
    setSlideDirection(entryIndex > index ? "next" : "prev");
    setIndex(entryIndex);
    setShowAll(false);
  }, [index]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (showAll || !window.matchMedia(MOBILE_WRITING_QUERY).matches) return;

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, [showAll]);

  const handleTouchEnd = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (showAll || !touchStartRef.current || !window.matchMedia(MOBILE_WRITING_QUERY).matches) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaY) > VERTICAL_SCROLL_TOLERANCE || Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrev();
  }, [goNext, goPrev, showAll]);

  const handlePointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (showAll || !window.matchMedia(MOBILE_WRITING_QUERY).matches) return;

    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  }, [showAll]);

  const handlePointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (showAll || !pointerStartRef.current || !window.matchMedia(MOBILE_WRITING_QUERY).matches) return;

    const deltaX = event.clientX - pointerStartRef.current.x;
    const deltaY = event.clientY - pointerStartRef.current.y;
    pointerStartRef.current = null;

    if (Math.abs(deltaY) > VERTICAL_SCROLL_TOLERANCE || Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrev();
  }, [goNext, goPrev, showAll]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (showAll) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev, showAll],
  );

  const focusRegion = useCallback(() => {
    regionRef.current?.focus();
  }, []);

  return (
    <div
      ref={regionRef}
      className="writing-carousel"
      tabIndex={0}
      role="region"
      aria-label="Writing carousel"
      onKeyDown={handleKeyDown}
      onMouseDown={focusRegion}
    >
      <div className="writing-carousel-main">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          aria-label="Previous writing piece"
          className="project-notebook-btn project-notebook-btn--side writing-carousel-btn"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
        </button>

        <div className="writing-carousel-shell">
          <div className="writing-carousel-binding" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, hole) => (
              <span key={hole} className="project-notebook-hole" />
            ))}
          </div>

          <div
            className="writing-carousel-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {showAll ? (
              <ul className="writing-all-list">
                {writingEntries.map((entry, entryIndex) => (
                  <li key={`${entry.titleLead}${entry.titleRest}`}>
                    <button
                      type="button"
                      onClick={() => openEntry(entryIndex)}
                      className={`writing-all-item ${entryIndex === index ? "is-active" : ""}`}
                    >
                      <span className="writing-all-number">{String(entryIndex + 1).padStart(2, "0")}</span>
                      <span className="writing-all-copy">
                        <span className="writing-all-title">
                          {entry.titleLead}
                          {entry.titleRest}
                        </span>
                        <span className="writing-all-meta">
                          {entry.date}
                          <span aria-hidden="true"> · </span>
                          {entry.href ? "Published" : "Coming Soon"}
                        </span>
                      </span>
                      <span className="writing-all-arrow" aria-hidden="true">
                        &rarr;
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div key={index} className={`writing-carousel-slide writing-carousel-slide--${slideDirection}`}>
                <WritingEntryCard entry={writingEntries[index]} index={index} />
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          aria-label="Next writing piece"
          className="project-notebook-btn project-notebook-btn--side writing-carousel-btn"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
        </button>
      </div>

      <div className="writing-carousel-foot">
        <div className="writing-carousel-inline-nav" aria-label="Writing carousel controls">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous writing piece"
            className="project-notebook-btn project-notebook-btn--side writing-carousel-btn"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next writing piece"
            className="project-notebook-btn project-notebook-btn--side writing-carousel-btn"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </div>

        <div className="writing-carousel-foot-cluster">
          <p className="writing-carousel-status font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {showAll
              ? `${total} piece${total === 1 ? "" : "s"} total`
              : `Piece ${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
          </p>

          {!showAll && total > 1 ? (
            <div className="writing-carousel-dots" role="tablist" aria-label="Writing pieces">
              {writingEntries.map((entry, dotIndex) => (
                <button
                  key={`${entry.titleLead}${entry.titleRest}`}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`Go to piece ${dotIndex + 1}`}
                  onClick={() => setIndex(dotIndex)}
                  className={`writing-carousel-dot ${dotIndex === index ? "is-active" : ""}`}
                />
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="writing-carousel-toggle"
            aria-pressed={showAll}
          >
            {showAll ? "Back to piece" : "All pieces"}
          </button>
        </div>
      </div>
    </div>
  );
}
