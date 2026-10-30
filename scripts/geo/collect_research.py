"""Public research snapshots and browser diagnostics; never logs cookies or query tokens."""
import concurrent.futures
import json
from pathlib import Path
import sys
from urllib.parse import urlsplit, urlunsplit

sys.path.insert(0, str(Path(__file__).parent))
from audit_public import fetch, parse_page, ROOT

SOURCES = {
    "openai-bots": "https://developers.openai.com/api/docs/bots",
    "openai-skills": "https://developers.openai.com/codex/skills",
    "anthropic-bots": "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
    "google-ai": "https://developers.google.com/search/docs/appearance/ai-features",
    "google-crawlers": "https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers",
    "perplexity-bots": "https://docs.perplexity.ai/guides/bots",
    "vercel-bots": "https://vercel.com/docs/bot-management",
    "next-jsonld": "https://nextjs.org/docs/app/guides/json-ld",
    "next-metadata": "https://nextjs.org/docs/app/api-reference/functions/generate-metadata",
    "pearson-updates": "https://www.pearsonpte.com/pte-updates-2025",
    "homeaffairs-english": "https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language",
    "competitor-magic": "https://ptemagic.com.vn/",
    "competitor-life": "https://ptelife.com.vn/",
    "competitor-helper": "https://ptehelper.com.au/",
}

def clean_url(url):
    p = urlsplit(url)
    return urlunsplit((p.scheme, p.netloc, p.path, "", ""))

def research(output):
    from bs4 import BeautifulSoup
    def one(pair):
        name, url = pair
        meta, text = fetch(url)
        # Follow only public redirects through the same safe fetcher; no browser login.
        hops = []
        for _ in range(4):
            if meta.get("status") not in {301, 302, 303, 307, 308}:
                break
            from urllib.parse import urljoin
            target = urljoin(meta["url"], meta["headers"].get("location", ""))
            hops.append({"url": clean_url(meta["url"]), "status": meta["status"]})
            meta, text = fetch(target)
        soup = BeautifulSoup(text, "lxml")
        for el in soup(["script", "style", "nav", "footer"]):
            el.decompose()
        plain = soup.get_text(" ", strip=True)
        tokens = ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "Claude-SearchBot", "Claude-User", "ClaudeBot", "Google-Extended", "PerplexityBot", "Perplexity-User", "robots.txt", "llms.txt", "AI bots", "verified bots", "PTE Intensive", "Pearson", "cam kết", "giảng viên"]
        passages = {}
        for token in tokens:
            idx = plain.lower().find(token.lower())
            if idx >= 0:
                passages[token] = plain[max(0, idx - 180):idx + 1100]
        result = {"id": name, **meta, "redirects": hops, "title": soup.title.get_text() if soup.title else None, "passages": passages, "text_characters": len(plain)}
        if name.startswith("competitor"):
            result["html_analysis"] = parse_page(text, meta["url"])
        return result
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
        results = list(pool.map(one, SOURCES.items()))
    (output / "research-sources.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Research sources saved:", len(results))

def browser(output):
    sys.path.insert(0, str(ROOT / "upstream/claude-seo/scripts"))
    from render_page import render_page
    results = []
    for url in ["https://www.pteintensive.com/", "https://www.pteintensive.com/courses/pte-50"]:
        result = render_page(url, mode="always")
        record = {k: result.get(k) for k in ["status_code", "error", "mode_used", "render_engine", "render_ms", "render_diagnostics", "structured_data"]}
        record["url"] = clean_url(result.get("url", url))
        record["redirect_chain"] = [{"url": clean_url(h["url"]), "status_code": h["status_code"]} for h in result.get("redirect_chain", [])]
        record["raw"] = parse_page(result.get("raw_content", ""), url)
        record["rendered"] = parse_page(result.get("content", ""), url)
        record["publication_date_note"] = "Automatic extracted dates are not accepted as editorial publication dates."
        results.append(record)
    (output / "browser-diagnostics.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Browser diagnostics saved:", len(results))

if __name__ == "__main__":
    output = Path(sys.argv[1]).resolve(); output.mkdir(parents=True, exist_ok=True)
    research(output)
    browser(output)