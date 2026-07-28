import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // Permanently send the public Vercel URL to the primary domain so Google
      // consolidates ranking signals on wasifsaeed.com.
      {
        source: "/:path*",
        has: [{ type: "host", value: "wasif-portfolio-ebon.vercel.app" }],
        destination: "https://wasifsaeed.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
