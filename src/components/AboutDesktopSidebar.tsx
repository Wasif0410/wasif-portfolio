"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const DESKTOP_MEDIA = "(min-width: 1024px)";

function getMediaQuery() {
  return window.matchMedia(DESKTOP_MEDIA);
}

function subscribe(onChange: () => void) {
  const media = getMediaQuery();
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return getMediaQuery().matches;
}

function getServerSnapshot() {
  return false;
}

type AboutDesktopSidebarProps = {
  children: ReactNode;
};

export function AboutDesktopSidebar({ children }: AboutDesktopSidebarProps) {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isDesktop) return null;

  return (
    <aside className="about-section-right">
      <div className="about-section-sidebar">{children}</div>
    </aside>
  );
}
