import type { MetadataRoute } from "next";
import courses from "@/data/courses/static-data.json";

export const dynamic = "force-static";

const baseUrl = "https://bersinstitute.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/services",
    "/training",
    "/courses",
    "/portfolio",
    "/blog",
    "/contact",
    "/donations",
  ];

  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const coursePages: MetadataRoute.Sitemap = (courses as any[])
    .filter((course) => course.status === "published")
    .map((course) => ({
      url: `${baseUrl}/courses/${course.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...pages, ...coursePages];
}
