import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/rbt/"],
    },
    sitemap: "https://bersinstitute.org/sitemap.xml",
    host: "https://bersinstitute.org",
  };
}
