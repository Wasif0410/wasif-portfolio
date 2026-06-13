export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://wasif-portfolio-ebon.vercel.app");

export const siteConfig = {
  name: "Wasif Saeed",
  title: "Wasif Saeed",
  description:
    "Portfolio for Wasif Saeed, a Toronto-based AI and software developer building intelligent systems, automation tools, and AI-powered products.",
  url: siteUrl,
  locale: "en_CA",
  keywords: [
    "Wasif Saeed",
    "AI developer",
    "software developer",
    "Toronto software developer",
    "Toronto Metropolitan University computer science",
    "Dayforce AI developer",
    "RAG",
    "LLM",
    "agentic AI",
    "machine learning portfolio",
  ],
} as const;
