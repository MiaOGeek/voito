import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { SITE_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  revalidatePath("/sitemap.xml");

  const siteUrl = SITE_URL;
  const sitemapUrl = `${siteUrl}/sitemap.xml`;

  const pings: { engine: string; ok: boolean }[] = [];

  try {
    const googleRes = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    );
    pings.push({ engine: "Google", ok: googleRes.ok });
  } catch {
    pings.push({ engine: "Google", ok: false });
  }

  try {
    const bingRes = await fetch(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    );
    pings.push({ engine: "Bing", ok: bingRes.ok });
  } catch {
    pings.push({ engine: "Bing", ok: false });
  }

  return NextResponse.json({
    revalidated: true,
    pings,
    sitemapUrl,
  });
}
