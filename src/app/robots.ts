import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const baseUrl = "https://www.mechbuilds.app";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "explore", "about"],
      disallow: "/private/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};

export default robots;
