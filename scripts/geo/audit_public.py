"""Bounded read-only audit of PTE Intensive; output contains public evidence only."""
from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET

ROOT = Path.home() / ".local/share/codex-geo"
sys.path.insert(0, str(ROOT / "upstream/claude-seo/scripts"))
from bs4 import BeautifulSoup
from url_safety import safe_requests_get

ORIGIN = "https://www.pteintensive.com"
BOTS = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "Googlebot", "Google-Extended", "Bingbot", "PerplexityBot", "Perplexity-User", "GPTBot", "ClaudeBot"]

def fetch(url: str, accept: str = "*/*", agent: str = "PTEIntensive-GEO-Audit/1.0") -> tuple[dict, str]:
    try:
        r = safe_requests_get(url, headers={"Accept": accept, "User-Agent": agent}, timeout=18, allow_redirects=False, stream=True)
        chunks, size = [], 0
        for chunk in r.iter_content(65536):
            size += len(chunk)
            if size > 4_000_000:
                r.close()
                return {"url": url, "error": "BODY_LIMIT_4MB", "status": r.status_code}, ""
            chunks.append(chunk)
        raw = b"".join(chunks)
        text = raw.decode("utf-8", errors="replace")
        headers = {k.lower(): v for k, v in r.headers.items() if k.lower() in {"content-type", "location", "x-clerk-auth-reason", "x-clerk-auth-status", "x-vercel-mitigated", "x-robots-tag", "content-encoding", "cache-control"}}
        r.close()
        return {"url": url, "status": r.status_code, "headers": headers, "bytes_decoded": len(raw), "sha256": hashlib.sha256(raw).hexdigest()}, text
    except Exception as exc:
        return {"url": url, "error": type(exc).__name__ + ": " + str(exc)[:250]}, ""

def parse_page(html: str, url: str) -> dict:
    soup = BeautifulSoup(html, "lxml")
    schemas, schema_errors = [], []
    for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            schemas.append(json.loads(script.string or script.get_text()))
        except ValueError as exc:
            schema_errors.append(str(exc))
    canonical = soup.find("link", rel="canonical")
    description = soup.find("meta", attrs={"name": "description"})
    robots = {m.get("name"): m.get("content") for m in soup.find_all("meta") if m.get("name") in {"robots", "googlebot"}}
    og = {m.get("property"): m.get("content") for m in soup.find_all("meta") if (m.get("property") or "").startswith("og:")}
    images = soup.find_all("img")
    missing_alt = sum(not i.has_attr("alt") for i in images)
    image_count = len(images)
    links = sorted({a.get("href") for a in soup.find_all("a", href=True) if a.get("href", "").startswith("/") or a.get("href", "").startswith(ORIGIN)})
    for el in soup(["script", "style", "nav", "footer", "header"]):
        # Preserve article headers: remove boilerplate only from the text excerpt below.
        if el.name not in {"header"}:
            el.decompose()
    main = soup.find("main") or soup
    return {"title": soup.title.get_text(strip=True) if soup.title else None, "description": description.get("content") if description else None,
            "canonical": canonical.get("href") if canonical else None, "robots": robots, "og": og,
            "h1": [h.get_text(" ", strip=True) for h in soup.find_all("h1")], "schemas": schemas, "schema_errors": schema_errors,
            "images": image_count, "missing_alt": missing_alt,
            "links": links, "main_excerpt": main.get_text(" ", strip=True)[:1400]}

def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--output", type=Path, required=True)
    args = p.parse_args()
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=True)
    data = {"tested_at": datetime.now(timezone.utc).isoformat(), "origin": ORIGIN, "method": "synthetic UA; safe DNS-pinned HTTP; no redirect following; sequential fetch (upstream resolver is not thread-safe); no private routes or writes", "pages": [], "crawler_matrix": []}
    robots_meta, robots = fetch(ORIGIN + "/robots.txt")
    sitemap_meta, xml = fetch(ORIGIN + "/sitemap.xml")
    data["robots_response"], data["sitemap_response"] = robots_meta, sitemap_meta
    (out / "robots.txt").write_text(robots, encoding="utf-8")
    (out / "sitemap.xml").write_text(xml, encoding="utf-8")
    rp = RobotFileParser(); rp.parse(robots.splitlines())
    data["robots_interpretation"] = {b: {path: rp.can_fetch(b, ORIGIN + path) for path in ["/", "/courses/pte-50", "/_next/static/example.js", "/admin", "/admin/", "/api/test"]} for b in BOTS}
    try:
        tree = ET.fromstring(xml)
        urls = [e.text for e in tree.iter() if e.tag.endswith("}loc") and e.text and urlparse(e.text).netloc == urlparse(ORIGIN).netloc][:200]
    except ET.ParseError:
        urls = [ORIGIN + "/"]
    data["sitemap_url_count"] = len(urls)
    urls += [ORIGIN + p for p in ["/migration", "/llms.txt", "/sign-in", "/sign-up", "/geo-audit-not-a-real-page"] if ORIGIN + p not in urls]
    def inspect(url: str) -> dict:
        meta, html = fetch(url)
        if meta.get("status") == 200 and "text/html" in meta.get("headers", {}).get("content-type", ""):
            meta.update(parse_page(html, url))
        return meta
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
        data["pages"] = list(pool.map(inspect, urls))
    for bot in ["browser-diagnostic", *BOTS]:
        for accept in ["*/*", "text/html"]:
            meta, _ = fetch(ORIGIN + "/", accept, "Mozilla/5.0 GEO-Audit" if bot == "browser-diagnostic" else bot)
            data["crawler_matrix"].append({"bot": bot, "accept": accept, **meta})
    data["navigation_endpoints"] = [fetch(ORIGIN + path, "text/html")[0] for path in ["/robots.txt", "/sitemap.xml", "/courses/pte-50"]]
    pages = data["pages"]
    titles = {}
    for page in pages:
        if page.get("title"):
            titles.setdefault(page["title"], []).append(page["url"])
    data["summary"] = {"responses": len(pages), "status_counts": {str(code): sum(p.get("status") == code for p in pages) for code in sorted({p.get("status", 0) for p in pages})},
        "errors": [p for p in pages if p.get("error")], "duplicate_titles": {t: u for t, u in titles.items() if len(u) > 1},
        "no_h1": [p["url"] for p in pages if p.get("status") == 200 and p.get("h1") == []],
        "multiple_h1": [p["url"] for p in pages if len(p.get("h1", [])) > 1],
        "missing_canonical": [p["url"] for p in pages if p.get("status") == 200 and "title" in p and not p.get("canonical")]}
    (out / "audit.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"output": str(out / "audit.json"), "summary": data["summary"]}, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()