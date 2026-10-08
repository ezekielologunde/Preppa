import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://preppa.live", changeFrequency: "weekly", priority: 1 }];
}
