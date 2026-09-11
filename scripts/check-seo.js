const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://www.pteintensive.com';
const errors = [];
const warnings = [];
const mojibakePattern = /\uFFFD|\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]|\u00C4[\u0080-\u00BF\u2018\u2019]|\u00C6[\u0080-\u00BF\u01A1\u01B0]|\u00E1[\u00BA\u00BB].|\u00E2[\u0080\u201A\u201E\u2020\u2021\u2026\u20AC\u2122]|\u00F0\u0178/u;

function walk(dir, extensions) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath, extensions);
    return extensions.some((extension) => entry.name.endsWith(extension)) ? [fullPath] : [];
  });
}

function report(type, message) {
  (type === 'error' ? errors : warnings).push(message);
}

const publishedBlogSlugs = new Set();
const publishedMigrationSlugs = new Set();
const seenSlugs = new Map();

for (const file of walk('content/posts', ['.mdx'])) {
  const source = fs.readFileSync(file, 'utf8');
  if (source.startsWith('\uFEFF')) report('error', `${file}: contains a UTF-8 BOM`);
  if (mojibakePattern.test(source)) report('error', `${file}: contains likely mojibake (incorrectly decoded UTF-8 text)`);
  if (source !== source.normalize('NFC')) report('error', `${file}: text is not normalized as Unicode NFC`);

  const { data, content } = matter(source);
  if (!data.published) continue;
  for (const field of ['slug', 'title', 'description']) {
    if (!String(data[field] || '').trim()) report('error', `${file}: published post is missing ${field}`);
  }
  if (!content.trim()) report('error', `${file}: published post has empty content`);
  if (data.slug) {
    if (seenSlugs.has(data.slug)) report('error', `Duplicate content slug: ${data.slug} (${seenSlugs.get(data.slug)}, ${file})`);
    seenSlugs.set(data.slug, file);
    publishedBlogSlugs.add(data.slug);
  }
}

for (const directory of ['visa', 'jobs', 'pathway']) {
  for (const file of walk(path.join('content/migration', directory), ['.mdx'])) {
    const { data, content } = matter(fs.readFileSync(file, 'utf8'));
    if (data.published === false) continue;
    for (const field of ['slug', 'title', 'description']) {
      if (!String(data[field] || '').trim()) report('error', `${file}: published migration post is missing ${field}`);
    }
    if (!content.trim()) report('error', `${file}: published migration post has empty content`);
    if (data.slug) {
      if (seenSlugs.has(data.slug)) report('error', `Duplicate content slug: ${data.slug} (${seenSlugs.get(data.slug)}, ${file})`);
      seenSlugs.set(data.slug, file);
      publishedMigrationSlugs.add(data.slug);
    }
  }
}

const validPaths = new Set([
  '/', '/about', '/blog', '/contact', '/courses', '/knowledge', '/migration', '/privacy', '/register', '/reviews', '/study', '/terms',
  ...[...publishedBlogSlugs].map((slug) => `/blog/${slug}`),
  ...[...publishedMigrationSlugs].map((slug) => `/migration/${slug}`),
  ...['pre-pte', 'pte-30-36', 'pte-42-50', 'pte-50', 'pte-1-1'].map((slug) => `/courses/${slug}`),
]);

for (const file of walk('app/knowledge', ['page.tsx'])) {
  const route = '/' + path.dirname(file).replace(/^app[\\/]/, '').replaceAll('\\', '/');
  validPaths.add(route);
}

const sourceFiles = [...walk('app', ['.ts', '.tsx']), ...walk('components', ['.ts', '.tsx']), ...walk('content', ['.md', '.mdx'])];
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8');
  if (/https?:\/\/pteintensive\.com(?:[/'"`)\s]|$)/.test(source)) {
    report('error', `${file}: contains an HTTP or non-www primary-domain URL`);
  }
  const targets = [
    ...source.matchAll(/\]\((\/[^)#?\s]+)(?:[?#][^)]*)?\)/g),
    ...source.matchAll(/href=(?:"|')(\/[^"'?#]+)(?:"|')/g),
  ].map((match) => match[1]);
  for (const target of targets) {
    if (target.startsWith('/images/') || target.startsWith('/uploads/') || target.startsWith('/media/') || target.startsWith('/api/') || target === '/admin' || target.startsWith('/admin/')) continue;
    if (!validPaths.has(target) && !target.includes('${') && !target.includes('[')) {
      report('error', `${file}: broken internal link ${target}`);
    }
  }
}

const sitemapSource = fs.readFileSync('app/sitemap.ts', 'utf8');
if (!sitemapSource.includes("getCanonicalUrl('/contact')")) report('error', 'Sitemap does not contain canonical /contact');
if (sitemapSource.includes('/courses/contact') || sitemapSource.includes('/temp-landing') || sitemapSource.includes('/admin/')) {
  report('error', 'Sitemap source contains a redirect, noindex, or internal URL');
}

const canonicalSources = sourceFiles.filter((file) => /page\.tsx$/.test(file));
for (const file of canonicalSources) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/canonical:\s*['"](https?:\/\/[^'"]+)['"]/g)) {
    if (!match[1].startsWith(SITE_URL)) report('error', `${file}: invalid canonical ${match[1]}`);
    if (match[1] !== SITE_URL + '/' && match[1].endsWith('/')) report('error', `${file}: non-root canonical has trailing slash ${match[1]}`);
  }
}

const robotsSource = fs.readFileSync('app/robots.ts', 'utf8');
if (!robotsSource.includes("getCanonicalUrl('/sitemap.xml')")) report('error', 'robots.ts does not declare the canonical sitemap URL');
if (fs.existsSync('public/robots.txt')) report('error', 'Duplicate public/robots.txt conflicts with app/robots.ts');

for (const message of warnings) console.warn(`WARN: ${message}`);
for (const message of errors) console.error(`ERROR: ${message}`);
console.log(`SEO check complete: ${errors.length} error(s), ${warnings.length} warning(s).`);
if (errors.length) process.exit(1);