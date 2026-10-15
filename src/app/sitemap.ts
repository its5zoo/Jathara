import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://isf-startup-jathara-2026.vercel.app";
  const lastModified = new Date("2026-10-12");

  const routes = [
    "",
    "/about",
    "/programme",
    "/startups",
    "/investors",
    "/venue",
    "/speakers",
    "/partners",
    "/register",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/programme" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/programme" || route === "/register" ? 0.9 : 0.8,
  }));
}
