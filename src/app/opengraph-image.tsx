import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "Wasif Saeed portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf4",
          color: "#111111",
          border: "20px solid #111111",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>Portfolio</span>
          <span style={{ width: 120, height: 8, background: "#111111" }} />
          <span>Toronto</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: 112, lineHeight: 0.95, fontWeight: 900 }}>{siteConfig.name}</div>
          <div style={{ maxWidth: 860, fontSize: 34, lineHeight: 1.35, fontWeight: 600 }}>
            AI and software developer building intelligent systems, automation tools, and AI-powered products.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
