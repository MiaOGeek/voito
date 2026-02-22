import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/mes-annonces", "/deposer", "/mes-informations", "/connexion", "/inscription", "/publier"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
