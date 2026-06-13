import { SketchTitle } from "@/components/ui/SketchTitle";

export function Footer() {
  return (
    <footer className="site-footer page-container">
      <div className="toon-rule w-full" aria-hidden="true" />

      <div className="site-footer-closer">
        <div className="site-footer-panel">
          <SketchTitle
            as="h2"
            size="sm"
            lines={["Let's Build", "The Future"]}
            className="site-footer-title"
          />
          <p className="site-footer-tagline toon-copy">Always building — reach out anytime.</p>
        </div>
      </div>

      <div className="toon-rule w-full" aria-hidden="true" />

      <div className="site-footer-meta flex flex-col gap-3 font-mono text-xs font-bold text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Wasif Saeed.</p>
        <p>
          System Status: <span className="text-black">OPERATIONAL</span>
        </p>
      </div>
    </footer>
  );
}
