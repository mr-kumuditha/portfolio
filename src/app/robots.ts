import type { MetadataRoute } from "next";

import { profile } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = `https://${profile.domain}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
