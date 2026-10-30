"""Validate skill format, local references and representative safe script dispatch."""
import importlib.util
import json
import os
from pathlib import Path
import re
import subprocess
import sys

root = Path.home() / ".local/share/codex-geo"
manifest = json.loads((root / "manifest.json").read_text(encoding="utf-8"))
validator = Path.home() / ".codex/skills/.system/skill-creator/scripts/quick_validate.py"
spec = importlib.util.spec_from_file_location("skill_validator", validator)
module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
results = []
for skill in manifest["skills"]:
    p = Path(skill["path"])
    ok, reason = module.validate_skill(p)
    results.append({"name": skill["name"], "valid": ok, "reason": reason, "upstream_copy": (p / "references/upstream/SKILL.md").is_file()})
env = os.environ.copy(); env["PYTHONUTF8"] = "1"; env["PYTHONIOENCODING"] = "utf-8"
smokes = []
for name in ["fetch_page.py", "parse_html.py", "sitemap_discovery.py", "schema_generate.py", "render_page.py", "content_quality.py", "content_verify.py", "pagespeed_check.py", "preload_check.py", "lcp_subparts.py", "metadata_template.py", "schema_ecommerce_validate.py"]:
    r = subprocess.run([sys.executable, str(root / "codex_geo.py"), "run", name, "--help"], capture_output=True, text=True, env=env, timeout=30)
    smokes.append({"script": name, "exit": r.returncode, "stderr": r.stderr[-800:]})
r = subprocess.run([sys.executable, str(root / "codex_geo.py"), "run", "indexnow_submit.py"], capture_output=True, text=True, env=env)
result = {"skills": results, "smokes": smokes, "submission_blocked": r.returncode == 2, "host_discovery": "NOT_TESTED_IN_FRESH_CODEX_HOST", "paid_integrations": "NOT_CONFIGURED"}
if len(sys.argv) > 1:
    Path(sys.argv[1]).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"valid_skills": sum(s["valid"] for s in results), "total": len(results), "smokes": smokes, "submission_blocked": result["submission_blocked"]}, indent=2))
raise SystemExit(0 if all(s["valid"] and s["upstream_copy"] for s in results) and all(s["exit"] == 0 for s in smokes) and result["submission_blocked"] else 1)