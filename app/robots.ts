import { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/site-config";

const BASE_URL = process.env.NEXTAUTH_URL || "https://voito.tn";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();
  const allowIndexing = config?.robotsIndex ?? true;

  if (!allowIndexing) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
