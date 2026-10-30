import importlib.util
import json
from pathlib import Path
import subprocess
import sys

HERE = Path(__file__).resolve().parent
ROOT = Path.home() / ".local/share/codex-geo"
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(ROOT / "upstream/claude-seo/scripts"))
from audit_public import parse_page
from collect_research import clean_url
from parse_html import parse_html
from sitemap_discovery import _sitemap_kind
from schema_generate import profile

def test_parser_does_not_touch_decomposed_nav_images():
    result = parse_page('<html><head><title>Kiểm thử</title></head><body><nav><img src="logo.png"></nav><main><h1>PTE</h1><img alt=""><script type="application/ld+json">{"@type":"Course"}</script></main></body></html>', 'https://example.com')
    assert result['images'] == 2 and result['missing_alt'] == 1
    assert result['h1'] == ['PTE'] and len(result['schemas']) == 1

def test_bad_schema_is_reported():
    result = parse_page('<script type="application/ld+json">{bad}</script>', 'https://example.com')
    assert result['schema_errors'] and not result['schemas']

def test_no_query_tokens_in_browser_urls():
    assert clean_url('https://example.com/?__clerk_handshake=secret#x') == 'https://example.com/'

def test_upstream_parser_and_sitemap():
    parsed = parse_html('<html><head><title>PTE</title></head><body><h1>Khóa học</h1></body></html>', 'https://example.com')
    assert parsed['title'] == 'PTE'
    kind, error = _sitemap_kind(b'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://example.com/</loc></url></urlset>', 'application/xml', 'https://example.com/sitemap.xml')
    assert kind == 'urlset' and error is None

def test_schema_roundtrip():
    value = profile('Người kiểm thử', url='https://example.com/team/test')
    assert json.loads(json.dumps(value))['@type'] == 'ProfilePage'

def test_dispatch_rejects_path_traversal_and_mutations():
    for name in ['../scripts/fetch_page.py', 'indexing_notify.py', 'indexnow_submit.py', 'agentic_fix.py']:
        result = subprocess.run([sys.executable, str(ROOT / 'codex_geo.py'), 'run', name], capture_output=True)
        assert result.returncode == 2

def test_benchmark_truthfulness_and_coverage():
    folder = HERE.parents[1] / 'docs/geo/benchmark'
    prompts = json.loads((folder / 'prompts.json').read_text(encoding='utf-8'))
    rows = json.loads((folder / 'observations.json').read_text(encoding='utf-8'))
    assert len(prompts) == 60 and len({p['prompt_id'] for p in prompts}) == 60
    assert {p['brand_class'] for p in prompts} == {'branded', 'unbranded'}
    assert len(rows) == 720
    assert all(r['status'] == 'NOT TESTED' and r['raw_answer'] is None and r['citations'] is None for r in rows)