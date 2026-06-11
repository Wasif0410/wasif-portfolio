import { profile } from "@/data/portfolio";
import { HeroDrawingLayer } from "@/components/HeroDrawingLayer";
import { SketchTitle } from "@/components/SketchTitle";

const [firstName, lastName] = profile.name.split(" ");

export function Hero() {
  return (
    <HeroDrawingLayer>
      <section id="top" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge-row mb-6 sm:mb-7">
            <div className="toon-badge">
              <span className="hero-status-dot" aria-hidden="true" />
              Online <span aria-hidden="true">&bull;</span> {profile.location}
            </div>
          </div>

          <SketchTitle lines={[firstName, lastName]} className="w-full max-w-[980px]" />

          <div className="hero-info mt-5">
            <p data-hero-role className="toon-label text-xs">
              {"// "}
              {profile.role}
            </p>
            <span className="toon-divider mx-auto hidden h-5 sm:mx-0 sm:block sm:h-auto sm:min-h-[3rem]" aria-hidden="true" />
            <p data-hero-description className="toon-copy mx-auto max-w-md text-sm sm:mx-0 sm:text-base">
              {profile.intro}
            </p>
          </div>
        </div>

        <a
          href="#about"
          className="hero-scroll flex flex-col items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          Scroll
          <span className="toon-divider h-5" aria-hidden="true" />
        </a>
      </section>
    </HeroDrawingLayer>
  );
}
