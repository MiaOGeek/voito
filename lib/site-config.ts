import { cache } from "react";
import prisma from "@/lib/db";

export const getSiteConfig = cache(async () => {
  try {
    return await prisma.siteConfig.findUnique({ where: { id: "singleton" } });
  } catch {
    return null;
  }
});
