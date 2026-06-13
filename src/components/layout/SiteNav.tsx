"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navSections } from "@/data/portfolio";

const MOBILE_NAV_QUERY = "(max-width: 767px)";

function isMobileNav() {
  return window.matchMedia(MOBILE_NAV_QUERY).matches;
}

function resolveActiveSection(sections: HTMLElement[], sectionIds: string[], navHeight: number) {
  const atBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40;

  if (atBottom && sections.length > 0) {
    return sections[sections.length - 1].id;
  }

  if (window.scrollY < 64) {
    return sectionIds[0];
  }

  const activationLine = navHeight + 16;
  let currentId: string = sectionIds[0];

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= activationLine) {
      currentId = section.id;
    }
  }

  return currentId;
}

export function SiteNav() {
  const [activeId, setActiveId] = useState<string>("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const navListRef = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pendingSectionRef = useRef<string | null>(null);

  const visibleSections = navSections.slice(1);
  const isAtIntro = activeId === "top";
  const activeSection = visibleSections.find(({ id }) => id === activeId);

  const getNavHeight = useCallback(() => navRef.current?.getBoundingClientRect().height ?? 44, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      pendingSectionRef.current = id;
      setActiveId(id);
      setMenuOpen(false);

      const navHeight = getNavHeight();
      const targetTop = window.scrollY + target.getBoundingClientRect().top - navHeight;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const top = Math.max(0, Math.min(targetTop, maxScroll));

      window.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);

      const clearPending = () => {
        pendingSectionRef.current = null;
      };

      if ("onscrollend" in window) {
        window.addEventListener("scrollend", clearPending, { once: true });
      } else {
        setTimeout(clearPending, 700);
      }
    },
    [getNavHeight],
  );

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      scrollToSection(id);
    },
    [scrollToSection],
  );

  useEffect(() => {
    const sectionIds = navSections.map(({ id }) => id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const updateActiveSection = () => {
      if (pendingSectionRef.current) {
        setActiveId(pendingSectionRef.current);
        return;
      }

      const navHeight = isMobileNav() ? getNavHeight() : 48;
      setActiveId(resolveActiveSection(sections, sectionIds, navHeight));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [getNavHeight]);

  useEffect(() => {
    const navList = navListRef.current;
    if (!navList || isMobileNav()) return;

    const activeLink = navList.querySelector<HTMLElement>(`.toon-nav-link.is-active`);

    if (activeLink) {
      activeLink.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      return;
    }

    navList.scrollLeft = 0;
  }, [activeId]);

  useEffect(() => {
    if (isMobileNav()) return;
    navListRef.current?.scrollTo({ left: 0 });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("scroll", closeMenu, { passive: true });
    return () => window.removeEventListener("scroll", closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (mediaQuery.matches) setMenuOpen(false);
    };

    closeOnDesktop();
    mediaQuery.addEventListener("change", closeOnDesktop);
    return () => mediaQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header ref={navRef} className={`site-nav ${menuOpen ? "site-nav--menu-open" : ""}`}>
      <div className="page-container">
        <nav aria-label="Primary" className="toon-nav-bar">
          <div className="toon-nav-mobile">
            <button
              type="button"
              className="toon-nav-mobile-trigger"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="toon-nav-mobile-label">
                {isAtIntro || !activeSection ? (
                  <span className="toon-nav-label toon-nav-label--intro">Scroll down</span>
                ) : (
                  <>
                    <span className="toon-nav-number">{activeSection.number}</span>
                    <span className="toon-nav-sep" aria-hidden="true">
                      /
                    </span>
                    <span className="toon-nav-label">{activeSection.label}</span>
                  </>
                )}
              </span>
              <span className="toon-nav-mobile-action">{menuOpen ? "Close" : "Sections"}</span>
            </button>

            {menuOpen ? (
              <div id="mobile-nav-menu" className="toon-nav-mobile-panel" role="menu">
                {visibleSections.map(({ id, label, number }) => {
                  const isActive = activeId === id;

                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      role="menuitem"
                      aria-current={isActive ? "page" : undefined}
                      className={`toon-nav-mobile-link ${isActive ? "is-active" : ""}`}
                      onClick={(event) => handleNavClick(event, id)}
                    >
                      <span className="toon-nav-number">{number}</span>
                      <span className="toon-nav-sep" aria-hidden="true">
                        /
                      </span>
                      <span className="toon-nav-label">{label}</span>
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          <ul ref={navListRef} className="toon-nav-list">
            {visibleSections.map(({ id, label, number }) => {
              const isActive = activeId === id;

              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`toon-nav-link ${isActive ? "is-active" : ""}`}
                    onClick={(event) => handleNavClick(event, id)}
                  >
                    <span className="toon-nav-number">{number}</span>
                    <span className="toon-nav-sep" aria-hidden="true">
                      /
                    </span>
                    <span className="toon-nav-label">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
