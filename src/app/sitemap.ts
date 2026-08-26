import type { MetadataRoute } from "next";

import { profile, projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = `https://${profile.domain}`;

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl}${profile.photo}`],
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: [`${siteUrl}${project.image}`],
    })),
  ];
}
