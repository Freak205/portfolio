import type { MetadataRoute } from "next";
import { lab, projects, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Personal projects rank below the client work here too — same ordering the
    // page itself makes, so a crawler reads the same priority a visitor does.
    ...lab
      .filter((project) => project.caseStudy)
      .map((project) => ({
        url: `${siteUrl}/lab/${project.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
