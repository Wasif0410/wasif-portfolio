"use client";

import { Mail, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { ToonPill } from "@/components/ToonPill";
import { links, profile } from "@/data/portfolio";

const dockLinks = [
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon, external: true },
  { label: "GitHub", href: links.github, Icon: GitHubIcon, external: true },
] as const;

export function StatusDock() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [emailOpen, setEmailOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const closeEmail = useCallback(() => {
    setEmailOpen(false);
    setCopied(false);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const page = document.documentElement;
        const scrollable = page.scrollHeight - window.innerHeight;
        const next = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
        setScrollPercent(Math.min(100, Math.max(0, next)));
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useEffect(() => {
    if (!emailOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeEmail();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeEmail, emailOpen]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, []);

  const toggleEmail = useCallback(() => {
    if (emailOpen) {
      closeEmail();
      return;
    }

    setEmailOpen(true);
  }, [closeEmail, emailOpen]);

  return (
    <>
      {emailOpen ? (
        <button
          type="button"
          aria-label="Close email popup"
          className="email-popover-backdrop"
          onClick={closeEmail}
        />
      ) : null}

      {emailOpen ? (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-popover-title"
          className="email-popover"
        >
          <div className="email-popover-head">
            <p className="toon-label text-xs sm:text-sm">Get in touch</p>
            <button
              type="button"
              aria-label="Close"
              className="email-popover-close"
              onClick={closeEmail}
            >
              <X aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
            </button>
          </div>

          <p id="email-popover-title" className="email-popover-address">
            {profile.email}
          </p>

          <div className="email-popover-actions">
            <a href={`mailto:${profile.email}`} className="email-popover-btn email-popover-btn--primary">
              Send Email
            </a>
            <button type="button" onClick={copyEmail} className="email-popover-btn">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      ) : null}

      <nav
        aria-label="Contact and status"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 sm:bottom-8"
      >
        <ToonPill variant="dock" className="pointer-events-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-5 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.06em] text-black sm:gap-x-5 sm:px-6 sm:text-[0.72rem]">
            <a
              href={links.resume}
              target="_blank"
              rel="noreferrer"
              className="toon-dock-resume-btn whitespace-nowrap"
            >
              Resume
            </a>
            <span className="toon-divider hidden h-5 sm:block" aria-hidden="true" />
            <span className="min-w-[2rem] whitespace-nowrap text-center">{scrollPercent}%</span>
            <span className="toon-divider hidden h-5 sm:block" aria-hidden="true" />
            <span className="flex items-center justify-center gap-3">
              {dockLinks.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="toon-icon-btn inline-flex"
                >
                  <Icon className="h-[1.125rem] w-[1.125rem]" />
                </a>
              ))}
              <button
                type="button"
                title="Email"
                aria-label="Show email"
                aria-expanded={emailOpen}
                aria-controls="email-popover-title"
                className={`toon-icon-btn inline-flex ${emailOpen ? "is-active" : ""}`}
                onClick={toggleEmail}
              >
                <Mail aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.2} />
              </button>
            </span>
          </div>
        </ToonPill>
      </nav>
    </>
  );
}
