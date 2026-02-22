/**
 * SEO Verification Script
 * Run with: npx tsx scripts/check-seo.ts
 *
 * Requires the dev server to be running on localhost:3001
 */

const BASE = process.env.BASE_URL || "http://localhost:3001";

interface CheckResult {
  page: string;
  checks: { name: string; pass: boolean; detail?: string }[];
}

async function fetchHTML(path: string): Promise<string> {
  const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
  if (!res.ok && res.status !== 308 && res.status !== 307) {
    throw new Error(`HTTP ${res.status} for ${path}`);
  }
  return res.text();
}

function checkTag(html: string, regex: RegExp): string | null {
  const match = html.match(regex);
  return match ? match[1] : null;
}

function checkMeta(html: string, name: string): string | null {
  // og: and twitter: use property, others use name
  const propRegex = new RegExp(
    `<meta\\s+(?:property|name)=["']${name}["']\\s+content=["']([^"']*?)["']`,
    "i"
  );
  const propRegex2 = new RegExp(
    `<meta\\s+content=["']([^"']*?)["']\\s+(?:property|name)=["']${name}["']`,
    "i"
  );
  return checkTag(html, propRegex) || checkTag(html, propRegex2);
}

function checkCanonical(html: string): string | null {
  const regex = /<link\s+rel=["']canonical["']\s+href=["']([^"']*?)["']/i;
  const regex2 = /<link\s+href=["']([^"']*?)["']\s+rel=["']canonical["']/i;
  return checkTag(html, regex) || checkTag(html, regex2);
}

function checkJsonLd(html: string, type: string): boolean {
  const scripts = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (!scripts) return false;
  return scripts.some((s) => s.includes(`"@type":"${type}"`) || s.includes(`"@type": "${type}"`));
}

async function checkPage(path: string, expectedTitle: RegExp, checks: string[]): Promise<CheckResult> {
  const result: CheckResult = { page: path, checks: [] };

  try {
    const html = await fetchHTML(path);

    // Title
    const title = checkTag(html, /<title[^>]*>([^<]*)<\/title>/i);
    result.checks.push({
      name: "title",
      pass: !!title && expectedTitle.test(title),
      detail: title || "MISSING",
    });

    // Meta description
    const desc = checkMeta(html, "description");
    result.checks.push({
      name: "meta description",
      pass: !!desc && desc.length > 20,
      detail: desc ? `${desc.substring(0, 60)}...` : "MISSING",
    });

    // Canonical
    if (checks.includes("canonical")) {
      const canonical = checkCanonical(html);
      result.checks.push({
        name: "canonical",
        pass: !!canonical && canonical.includes(path.split("?")[0]),
        detail: canonical || "MISSING",
      });
    }

    // Open Graph
    if (checks.includes("og")) {
      const ogTitle = checkMeta(html, "og:title");
      result.checks.push({
        name: "og:title",
        pass: !!ogTitle,
        detail: ogTitle || "MISSING",
      });
    }

    // JSON-LD types
    if (checks.includes("BreadcrumbList")) {
      result.checks.push({
        name: "JSON-LD BreadcrumbList",
        pass: checkJsonLd(html, "BreadcrumbList"),
      });
    }
    if (checks.includes("Vehicle")) {
      result.checks.push({
        name: "JSON-LD Vehicle/Product",
        pass: checkJsonLd(html, "Vehicle") || checkJsonLd(html, "Product"),
      });
    }
    if (checks.includes("ItemList")) {
      result.checks.push({
        name: "JSON-LD ItemList",
        pass: checkJsonLd(html, "ItemList"),
      });
    }

    // Robots noindex check
    if (checks.includes("indexable")) {
      const robots = checkMeta(html, "robots");
      result.checks.push({
        name: "robots indexable",
        pass: !robots || !robots.includes("noindex"),
        detail: robots || "default (index)",
      });
    }
  } catch (error: any) {
    result.checks.push({
      name: "fetch",
      pass: false,
      detail: error.message,
    });
  }

  return result;
}

async function checkSitemap(): Promise<CheckResult> {
  const result: CheckResult = { page: "/sitemap.xml", checks: [] };
  try {
    const res = await fetch(`${BASE}/sitemap.xml`);
    const text = await res.text();
    result.checks.push({ name: "status 200", pass: res.ok });
    result.checks.push({ name: "contains <urlset>", pass: text.includes("<urlset") });
    result.checks.push({ name: "contains /voitures", pass: text.includes("/voitures") });
    result.checks.push({ name: "contains /annonces/", pass: text.includes("/annonces/") });
    result.checks.push({ name: "contains /marques", pass: text.includes("/marques") });
    result.checks.push({ name: "contains /villes", pass: text.includes("/villes") });
    result.checks.push({ name: "contains /ville/", pass: text.includes("/ville/") });

    const urlCount = (text.match(/<url>/g) || []).length;
    result.checks.push({
      name: `URL count (${urlCount})`,
      pass: urlCount > 5,
      detail: `${urlCount} URLs`,
    });
  } catch (error: any) {
    result.checks.push({ name: "fetch", pass: false, detail: error.message });
  }
  return result;
}

async function checkRobots(): Promise<CheckResult> {
  const result: CheckResult = { page: "/robots.txt", checks: [] };
  try {
    const res = await fetch(`${BASE}/robots.txt`);
    const text = await res.text();
    result.checks.push({ name: "status 200", pass: res.ok });
    result.checks.push({ name: "contains User-agent", pass: text.includes("User-agent") || text.includes("User-Agent") });
    result.checks.push({ name: "contains Sitemap", pass: text.toLowerCase().includes("sitemap") });
  } catch (error: any) {
    result.checks.push({ name: "fetch", pass: false, detail: error.message });
  }
  return result;
}

async function checkRedirect(): Promise<CheckResult> {
  const result: CheckResult = { page: "/voitures-occasion-tunis", checks: [] };
  try {
    const res = await fetch(`${BASE}/voitures-occasion-tunis`, { redirect: "manual" });
    const location = res.headers.get("location");
    result.checks.push({
      name: "redirect status",
      pass: res.status === 308 || res.status === 307 || res.status === 301 || res.status === 302,
      detail: `${res.status}`,
    });
    result.checks.push({
      name: "redirect to /voitures/ville/tunis",
      pass: !!location && location.includes("/voitures/ville/tunis"),
      detail: location || "no Location header",
    });
  } catch (error: any) {
    result.checks.push({ name: "fetch", pass: false, detail: error.message });
  }
  return result;
}

async function check404(): Promise<CheckResult> {
  const result: CheckResult = { page: "/page-inexistante-xyz", checks: [] };
  try {
    const res = await fetch(`${BASE}/page-inexistante-xyz`);
    const html = await res.text();
    result.checks.push({ name: "status 404", pass: res.status === 404 });
    result.checks.push({ name: "custom 404 content", pass: html.includes("Page introuvable") || html.includes("404") });
    result.checks.push({ name: "has navigation links", pass: html.includes("/voitures") && html.includes("/motos") });
  } catch (error: any) {
    result.checks.push({ name: "fetch", pass: false, detail: error.message });
  }
  return result;
}

async function main() {
  console.log(`\n🔍 SEO Verification — ${BASE}\n`);
  console.log("=".repeat(70));

  const results: CheckResult[] = [];

  // Static checks
  results.push(await checkSitemap());
  results.push(await checkRobots());
  results.push(await checkRedirect());
  results.push(await check404());

  // Category pages
  results.push(await checkPage("/voitures", /voitures/i, ["canonical", "og", "ItemList", "indexable"]));
  results.push(await checkPage("/motos", /motos/i, ["canonical", "og", "ItemList", "indexable"]));
  results.push(await checkPage("/pieces", /pi[eè]ces/i, ["canonical", "og", "ItemList", "indexable"]));

  // Index pages
  results.push(await checkPage("/voitures/marques", /marques/i, ["canonical"]));
  results.push(await checkPage("/voitures/villes", /ville/i, ["canonical"]));

  // Print results
  let totalPass = 0;
  let totalFail = 0;

  for (const result of results) {
    console.log(`\n📄 ${result.page}`);
    for (const check of result.checks) {
      const icon = check.pass ? "✅" : "❌";
      const detail = check.detail ? ` — ${check.detail}` : "";
      console.log(`   ${icon} ${check.name}${detail}`);
      if (check.pass) totalPass++;
      else totalFail++;
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log(`\n📊 Results: ${totalPass} passed, ${totalFail} failed out of ${totalPass + totalFail} checks\n`);

  if (totalFail > 0) {
    console.log("⚠️  Some checks failed. Review the details above.\n");
    process.exit(1);
  } else {
    console.log("✅ All checks passed!\n");
  }
}

main().catch(console.error);
