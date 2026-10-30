"""Produce a review-only patch and typecheck the modified module in memory."""
import difflib
import json
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[2]
relative = 'app/courses/[slug]/CourseContent.tsx'
source = (root / relative).read_text(encoding='utf-8')
old = '''const CourseDetailClient = dynamic(() => import('./CourseDetailClient'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-[#fedac2]/20 h-96 rounded-xl" />
  )
});'''
new = "import CourseDetailClient from './CourseDetailClient';"
if source.count(old) != 1:
    raise ValueError('Source changed: re-review before preparing patch')
proposed = source.replace('// Dynamically import components with SSR disabled to avoid hydration issues', '// Render the primary course details on the server; defer secondary interactive sections.').replace(old, new)
patch = ''.join(difflib.unified_diff(source.splitlines(keepends=True), proposed.splitlines(keepends=True), fromfile='a/' + relative, tofile='b/' + relative))
folder = root / 'docs/geo/patches'; folder.mkdir(parents=True, exist_ok=True)
(folder / '001-course-ssr.patch').write_text(patch, encoding='utf-8')
script = '''const ts=require('typescript');let input='';process.stdin.setEncoding('utf8');process.stdin.on('data',d=>input+=d);process.stdin.on('end',()=>{const r=ts.transpileModule(input,{fileName:'CourseContent.tsx',reportDiagnostics:true,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext}});const errors=(r.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);console.log(JSON.stringify({syntaxErrors:errors.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' '))}));process.exitCode=errors.length?1:0;});'''
result = subprocess.run(['node', '-e', script], input=proposed, encoding='utf-8', capture_output=True, cwd=root)
print(result.stdout, end=''); print(result.stderr, end='')
raise SystemExit(result.returncode)