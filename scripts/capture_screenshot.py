"""
Visual analysis script for Voito homepage.
Captures desktop and mobile screenshots, checks above-the-fold content,
tap target sizes, and overall page rendering.
"""
import json
import sys
from playwright.sync_api import sync_playwright

URL = "http://localhost:3001/"
SCREENSHOTS_DIR = "D:/opencode/voito/screenshots"

def analyze_page():
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch()

        # ── Desktop screenshot (1920x1080) ──
        print("[1/2] Capturing desktop screenshot (1920x1080)...")
        desktop_page = browser.new_page(viewport={"width": 1920, "height": 1080})
        desktop_page.goto(URL, wait_until="networkidle", timeout=30000)
        desktop_path = f"{SCREENSHOTS_DIR}/desktop_1920x1080.png"
        desktop_page.screenshot(path=desktop_path, full_page=False)
        desktop_full_path = f"{SCREENSHOTS_DIR}/desktop_1920x1080_full.png"
        desktop_page.screenshot(path=desktop_full_path, full_page=True)
        print(f"  Saved: {desktop_path}")
        print(f"  Saved: {desktop_full_path}")

        # ── Desktop analysis ──
        print("\n[Desktop] Analyzing above-the-fold content...")

        # Check page title
        title = desktop_page.title()
        results["page_title"] = title
        print(f"  Page title: {title}")

        # Check if page has real content (not blank/404)
        body_text = desktop_page.inner_text("body")
        results["has_content"] = len(body_text.strip()) > 50
        results["body_text_length"] = len(body_text.strip())
        print(f"  Body text length: {len(body_text.strip())} chars")

        # Check for 404 indicators
        is_404 = "404" in title or "not found" in body_text.lower()[:500]
        results["is_404"] = is_404
        print(f"  Is 404: {is_404}")

        # Check H1 visibility above fold
        h1_elements = desktop_page.query_selector_all("h1")
        h1_info = []
        for h1 in h1_elements:
            box = h1.bounding_box()
            text = h1.inner_text()
            visible_above_fold = box is not None and box["y"] + box["height"] <= 1080 if box else False
            h1_info.append({
                "text": text[:100],
                "visible_above_fold": visible_above_fold,
                "y_position": box["y"] if box else None
            })
        results["h1_elements"] = h1_info
        for h in h1_info:
            print(f"  H1: '{h['text']}' | Above fold: {h['visible_above_fold']} | Y: {h['y_position']}")

        # Check for "Explorer par ville" / city section
        city_section = desktop_page.query_selector_all("text=ville")
        city_section2 = desktop_page.query_selector_all("text=Ville")
        city_section3 = desktop_page.query_selector_all("text=Explorer par ville")
        city_section4 = desktop_page.query_selector_all("text=villes")
        all_city = city_section + city_section2 + city_section3 + city_section4
        city_info = []
        for el in all_city:
            try:
                box = el.bounding_box()
                text = el.inner_text()[:100]
                visible_above_fold = box is not None and box["y"] + box["height"] <= 1080 if box else False
                city_info.append({
                    "text": text,
                    "visible_above_fold": visible_above_fold,
                    "y_position": box["y"] if box else None
                })
            except:
                pass
        results["city_section_elements"] = city_info
        print(f"\n  City section elements found: {len(city_info)}")
        for c in city_info:
            print(f"    '{c['text'][:60]}' | Above fold: {c['visible_above_fold']} | Y: {c['y_position']}")

        # Check CTA / main buttons above fold
        buttons = desktop_page.query_selector_all("button, a.btn, [role='button'], a[href*='deposer'], a[href*='publier']")
        cta_info = []
        for btn in buttons:
            try:
                box = btn.bounding_box()
                text = btn.inner_text().strip()[:60]
                if text and box:
                    visible_above_fold = box["y"] + box["height"] <= 1080
                    cta_info.append({
                        "text": text,
                        "visible_above_fold": visible_above_fold,
                        "y_position": round(box["y"], 1),
                        "width": round(box["width"], 1),
                        "height": round(box["height"], 1)
                    })
            except:
                pass
        results["desktop_ctas"] = cta_info
        print(f"\n  Desktop CTAs/Buttons:")
        for c in cta_info:
            print(f"    '{c['text']}' | Above fold: {c['visible_above_fold']} | Y: {c['y_position']} | Size: {c['width']}x{c['height']}")

        # Check for "Rechercher" button specifically
        rechercher = desktop_page.query_selector_all("text=Rechercher")
        rechercher_info = []
        for el in rechercher:
            try:
                box = el.bounding_box()
                text = el.inner_text().strip()[:60]
                if box:
                    rechercher_info.append({
                        "text": text,
                        "visible_above_fold": box["y"] + box["height"] <= 1080,
                        "y_position": round(box["y"], 1)
                    })
            except:
                pass
        results["rechercher_desktop"] = rechercher_info
        print(f"\n  'Rechercher' button on desktop:")
        for r in rechercher_info:
            print(f"    '{r['text']}' | Above fold: {r['visible_above_fold']} | Y: {r['y_position']}")

        desktop_page.close()

        # ── Mobile screenshot (375x812, iPhone) ──
        print("\n[2/2] Capturing mobile screenshot (375x812)...")
        mobile_page = browser.new_page(viewport={"width": 375, "height": 812})
        mobile_page.goto(URL, wait_until="networkidle", timeout=30000)
        mobile_path = f"{SCREENSHOTS_DIR}/mobile_375x812.png"
        mobile_page.screenshot(path=mobile_path, full_page=False)
        mobile_full_path = f"{SCREENSHOTS_DIR}/mobile_375x812_full.png"
        mobile_page.screenshot(path=mobile_full_path, full_page=True)
        print(f"  Saved: {mobile_path}")
        print(f"  Saved: {mobile_full_path}")

        # ── Mobile analysis ──
        print("\n[Mobile] Analyzing above-the-fold content...")

        # Check H1 on mobile
        h1_mobile = mobile_page.query_selector_all("h1")
        h1_mobile_info = []
        for h1 in h1_mobile:
            box = h1.bounding_box()
            text = h1.inner_text()
            visible_above_fold = box is not None and box["y"] + box["height"] <= 812 if box else False
            h1_mobile_info.append({
                "text": text[:100],
                "visible_above_fold": visible_above_fold,
                "y_position": box["y"] if box else None
            })
        results["h1_mobile"] = h1_mobile_info
        for h in h1_mobile_info:
            print(f"  H1: '{h['text']}' | Above fold: {h['visible_above_fold']} | Y: {h['y_position']}")

        # Check "Rechercher" button on mobile
        rechercher_mobile = mobile_page.query_selector_all("text=Rechercher")
        rechercher_mobile_info = []
        for el in rechercher_mobile:
            try:
                box = el.bounding_box()
                text = el.inner_text().strip()[:60]
                if box:
                    rechercher_mobile_info.append({
                        "text": text,
                        "visible_above_fold": box["y"] + box["height"] <= 812,
                        "y_position": round(box["y"], 1),
                        "width": round(box["width"], 1),
                        "height": round(box["height"], 1)
                    })
            except:
                pass
        results["rechercher_mobile"] = rechercher_mobile_info
        print(f"\n  'Rechercher' button on mobile:")
        for r in rechercher_mobile_info:
            print(f"    '{r['text']}' | Above fold: {r['visible_above_fold']} | Y: {r['y_position']} | Size: {r['width']}x{r['height']}")

        # Check hamburger menu / mobile navigation
        hamburger_selectors = [
            "button[aria-label*='menu']", "button[aria-label*='Menu']",
            "button[aria-label*='nav']", "button[aria-label*='Nav']",
            "[class*='hamburger']", "[class*='menu-toggle']",
            "button svg", "header button"
        ]
        hamburger_info = []
        for sel in hamburger_selectors:
            try:
                els = mobile_page.query_selector_all(sel)
                for el in els:
                    box = el.bounding_box()
                    if box:
                        meets_48px = box["width"] >= 48 and box["height"] >= 48
                        meets_44px = box["width"] >= 44 and box["height"] >= 44
                        hamburger_info.append({
                            "selector": sel,
                            "width": round(box["width"], 1),
                            "height": round(box["height"], 1),
                            "meets_48px_target": meets_48px,
                            "meets_44px_target": meets_44px,
                            "y_position": round(box["y"], 1)
                        })
            except:
                pass
        results["hamburger_menu"] = hamburger_info
        print(f"\n  Hamburger menu / mobile nav buttons found: {len(hamburger_info)}")
        for h in hamburger_info:
            print(f"    Selector: {h['selector']} | Size: {h['width']}x{h['height']} | Meets 48px: {h['meets_48px_target']} | Meets 44px: {h['meets_44px_target']}")

        # Check footer link tap targets on mobile
        footer = mobile_page.query_selector("footer")
        footer_links_info = []
        if footer:
            footer_links = footer.query_selector_all("a")
            for link in footer_links:
                try:
                    box = link.bounding_box()
                    text = link.inner_text().strip()[:50]
                    if box and text:
                        meets_48px = box["width"] >= 48 and box["height"] >= 48
                        meets_44px = box["width"] >= 44 and box["height"] >= 44
                        footer_links_info.append({
                            "text": text,
                            "width": round(box["width"], 1),
                            "height": round(box["height"], 1),
                            "meets_48px_target": meets_48px,
                            "meets_44px_target": meets_44px
                        })
                except:
                    pass
        results["footer_links_mobile"] = footer_links_info
        print(f"\n  Footer links tap target analysis ({len(footer_links_info)} links):")
        for fl in footer_links_info:
            status = "OK" if fl["meets_48px_target"] else ("WARN" if fl["meets_44px_target"] else "FAIL")
            print(f"    [{status}] '{fl['text']}' | Size: {fl['width']}x{fl['height']}")

        # Check horizontal scroll on mobile
        page_width = mobile_page.evaluate("document.documentElement.scrollWidth")
        viewport_width = 375
        has_horizontal_scroll = page_width > viewport_width + 5  # 5px tolerance
        results["mobile_horizontal_scroll"] = has_horizontal_scroll
        results["mobile_page_width"] = page_width
        print(f"\n  Horizontal scroll: {'YES (ISSUE)' if has_horizontal_scroll else 'NO (OK)'} | Page width: {page_width}px vs viewport: {viewport_width}px")

        # Check base font size
        base_font = mobile_page.evaluate("window.getComputedStyle(document.body).fontSize")
        results["base_font_size"] = base_font
        print(f"  Base font size: {base_font}")

        mobile_page.close()
        browser.close()

    # Save results as JSON
    with open(f"{SCREENSHOTS_DIR}/analysis_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"\nResults saved to {SCREENSHOTS_DIR}/analysis_results.json")

    return results


if __name__ == "__main__":
    try:
        analyze_page()
        print("\nAnalysis complete!")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
