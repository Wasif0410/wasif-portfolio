import type { ReactNode } from "react";

type ToonPillProps = {
  children: ReactNode;
  className?: string;
  variant?: "badge" | "dock";
};

export function ToonPill({ children, className = "", variant = "badge" }: ToonPillProps) {
  const variantClass = variant === "dock" ? "toon-pill-dock" : "";

  return (
    <div className={`toon-pill ${variantClass} ${className}`.trim()}>{children}</div>
  );
}
