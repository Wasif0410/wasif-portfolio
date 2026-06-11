"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { GitHubIcon } from "@/components/BrandIcons";

type Project = {
  title: string;
  description: string;
  tools: string[];
  image: string;
  imageAlt: string;
  github?: string;
};

type ProjectNotebookCategory = {
  id: string;
  label: string;
  projects: Project[];
};

type ProjectNotebookProps = {
  notebooks: ProjectNotebookCategory[];
};

function ProjectPageContent({
  project,
  pageNumber,
  totalPages,
}: {
  project: Project;
  pageNumber: number;
  totalPages: number;
}) {
  return (
    <div className="project-notebook-sheet">
      <div className="project-notebook-content">
        <p className="project-notebook-page-label">
          Project {String(pageNumber).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
        </p>

        <h3 className="toon-heading text-2xl leading-tight sm:text-3xl">{project.title}</h3>

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="project-notebook-github"
            aria-label={`View ${project.title} on GitHub`}
          >
            <GitHubIcon className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        ) : null}

        <p className="toon-copy mt-2 text-base leading-7 sm:text-lg sm:leading-8">{project.description}</p>

        <div className="mt-4 sm:mt-5">
          <p className="toon-label text-xs sm:text-sm">Tools</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <li key={tool} className="toon-tag px-3 py-1 font-mono text-[0.65rem] font-bold sm:text-xs">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="project-notebook-preview">
        <div className="project-notebook-preview-frame">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={320}
            height={240}
            className="project-notebook-preview-img"
            loading="eager"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

function EmptyNotebookPage({ label }: { label: string }) {
  return (
    <div className="project-notebook-sheet project-notebook-sheet--empty">
      <p className="project-notebook-page-label">{label} Notebook</p>
      <div className="project-notebook-empty">
        <p className="toon-heading text-3xl leading-none sm:text-4xl">Coming Soon</p>
        <p className="toon-copy mt-4 max-w-md text-base leading-7 sm:text-lg">
          Projects for this notebook are on the way. Check back soon.
        </p>
      </div>
    </div>
  );
}

export function ProjectNotebook({ notebooks }: ProjectNotebookProps) {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [flip, setFlip] = useState<"idle" | "next" | "prev">("idle");
  const flipDirectionRef = useRef<"next" | "prev" | null>(null);
  const notebookRegionRef = useRef<HTMLDivElement>(null);

  const activeNotebook = notebooks[categoryIndex];
  const projects = activeNotebook.projects;
  const total = projects.length;
  const canPrev = pageIndex > 0 && flip === "idle" && total > 0;
  const canNext = pageIndex < total - 1 && flip === "idle";

  useEffect(() => {
    notebooks.forEach(({ projects: notebookProjects }) => {
      notebookProjects.forEach(({ image }) => {
        const img = new window.Image();
        img.src = image;
      });
    });
  }, [notebooks]);

  const selectCategory = useCallback(
    (nextIndex: number) => {
      if (nextIndex === categoryIndex || flip !== "idle") return;
      setCategoryIndex(nextIndex);
      setPageIndex(0);
      setFlip("idle");
    },
    [categoryIndex, flip],
  );

  const turnPage = useCallback(
    (direction: "next" | "prev") => {
      if (flip !== "idle" || total === 0) return;
      if (direction === "next" && pageIndex >= total - 1) return;
      if (direction === "prev" && pageIndex <= 0) return;

      flipDirectionRef.current = direction;
      window.requestAnimationFrame(() => {
        setFlip(direction);
      });
    },
    [flip, pageIndex, total],
  );

  const goToPage = useCallback(
    (targetIndex: number) => {
      if (flip !== "idle" || targetIndex === pageIndex) return;

      if (Math.abs(targetIndex - pageIndex) === 1) {
        turnPage(targetIndex > pageIndex ? "next" : "prev");
        return;
      }

      setPageIndex(targetIndex);
    },
    [flip, pageIndex, turnPage],
  );

  const handleFlipEnd = useCallback((event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    const direction = flipDirectionRef.current;
    if (!direction) return;

    flipDirectionRef.current = null;
    setPageIndex((current) => (direction === "next" ? current + 1 : current - 1));
    setFlip("idle");
  }, []);

  useEffect(() => {
    if (flip === "idle") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) return;

    const direction = flipDirectionRef.current;
    if (!direction) return;

    flipDirectionRef.current = null;
    setPageIndex((current) => (direction === "next" ? current + 1 : current - 1));
    setFlip("idle");
  }, [flip]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        turnPage("next");
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        turnPage("prev");
      }
    },
    [turnPage],
  );

  const focusRegion = useCallback(() => {
    notebookRegionRef.current?.focus();
  }, []);

  const underIndex = flip === "next" ? pageIndex + 1 : pageIndex;
  const flipIndex = flip === "next" ? pageIndex : pageIndex - 1;

  return (
    <div className="project-notebook-layout">
      <nav className="project-notebook-rail" aria-label="Project notebook types">
        <p className="project-notebook-rail-label">Notebooks</p>
        {notebooks.map((notebook, notebookIndex) => {
          const isActive = notebookIndex === categoryIndex;

          return (
            <button
              key={notebook.id}
              type="button"
              onClick={() => selectCategory(notebookIndex)}
              aria-current={isActive ? "true" : undefined}
              className={`project-notebook-rail-btn ${isActive ? "is-active" : ""}`}
            >
              {notebook.label}
            </button>
          );
        })}
      </nav>

      <div
        ref={notebookRegionRef}
        className="project-notebook-main"
        tabIndex={0}
        role="region"
        aria-label="Project notebook carousel"
        onKeyDown={handleKeyDown}
        onMouseDown={focusRegion}
      >
        <button
          type="button"
          onClick={() => turnPage("prev")}
          disabled={!canPrev}
          aria-label="Previous project page"
          className="project-notebook-btn project-notebook-btn--side"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
        </button>

        <div className="project-notebook">
          <div className="project-notebook-cover">
            <div className="project-notebook-binding" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, hole) => (
                <span key={hole} className="project-notebook-hole" />
              ))}
            </div>

            <div className="project-notebook-viewport">
              <div className="project-notebook-stack">
                {total === 0 ? (
                  <div className="project-notebook-page project-notebook-page--static">
                    <EmptyNotebookPage label={activeNotebook.label} />
                  </div>
                ) : (
                  <>
                    {flip !== "idle" && (
                      <div className="project-notebook-page project-notebook-page--under">
                        <ProjectPageContent
                          project={projects[underIndex]}
                          pageNumber={underIndex + 1}
                          totalPages={total}
                        />
                      </div>
                    )}

                    {flip === "idle" ? (
                      <div className="project-notebook-page project-notebook-page--static">
                        <ProjectPageContent
                          project={projects[pageIndex]}
                          pageNumber={pageIndex + 1}
                          totalPages={total}
                        />
                      </div>
                    ) : (
                      <div
                        className={`project-notebook-page project-notebook-page--flip project-notebook-page--flip-${flip}`}
                        aria-live="polite"
                        onAnimationEnd={handleFlipEnd}
                      >
                        <div className="project-notebook-page-face project-notebook-page-face--front">
                          <ProjectPageContent
                            project={projects[flipIndex]}
                            pageNumber={flipIndex + 1}
                            totalPages={total}
                          />
                        </div>
                        <div className="project-notebook-page-face project-notebook-page-face--back" aria-hidden="true" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="project-notebook-foot">
            <div className="project-notebook-inline-nav" aria-label="Project carousel controls">
              <button
                type="button"
                onClick={() => turnPage("prev")}
                disabled={!canPrev}
                aria-label="Previous project page"
                className="project-notebook-btn project-notebook-btn--side"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
              </button>
              <button
                type="button"
                onClick={() => turnPage("next")}
                disabled={!canNext}
                aria-label="Next project page"
                className="project-notebook-btn project-notebook-btn--side"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>

            <p className="project-notebook-status font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted">
              {total === 0 ? activeNotebook.label : `Page ${pageIndex + 1} of ${total}`}
            </p>

            {total > 1 ? (
              <div className="project-notebook-dots" role="tablist" aria-label="Project pages">
                {projects.map((project, dotIndex) => (
                  <button
                    key={project.title}
                    type="button"
                    role="tab"
                    aria-selected={dotIndex === pageIndex}
                    aria-label={`Go to project ${dotIndex + 1}`}
                    onClick={() => goToPage(dotIndex)}
                    className={`project-notebook-dot ${dotIndex === pageIndex ? "is-active" : ""}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => turnPage("next")}
          disabled={!canNext}
          aria-label="Next project page"
          className="project-notebook-btn project-notebook-btn--side"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
