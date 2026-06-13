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

type AboutQuickReadSidebarProps = {
  children: ReactNode;
};

export function AboutQuickReadSidebar({ children }: AboutQuickReadSidebarProps) {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isDesktop) return null;

  return <div className="about-section-aside">{children}</div>;
}
