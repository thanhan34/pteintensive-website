/*
 * Import existing content/posts/*.mdx files into the Firestore Blog CMS.
 *
 * Usage:
 *   npm run import:mdx-blog
 *
 * Required env vars in .env.local or shell:
 *   FIREBASE_ADMIN_PROJECT_ID (or FIREBASE_PROJECT_ID)
 *   FIREBASE_ADMIN_CLIENT_EMAIL (or FIREBASE_CLIENT_EMAIL)
 *   FIREBASE_ADMIN_PRIVATE_KEY (or FIREBASE_PRIVATE_KEY)
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET (optional for this script)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');

loadLocalEnv();

const postsDir = path.join(process.cwd(), 'content', 'posts');

const defaultCategories = [
  'PTE cho visa Úc', 'Visa 482', 'Visa 485', 'Visa 500', 'Visa 407', 'Visa 462',
  'PTE Speaking', 'PTE Writing', 'PTE Reading', 'PTE Listening', 'Lộ trình học PTE', 'Kinh nghiệm thi PTE',
];

function removeVietnameseAccents(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function generateSlug(input) {
  return removeVietnameseAccents(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return null;

  const equalsIndex = trimmed.indexOf('=');
  if (equalsIndex === -1) return null;

  const key = trimmed.slice(0, equalsIndex).trim();
  let value = trimmed.slice(equalsIndex + 1).trim();

  if (!key) return null;

  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }

  return { key, value };
}

function loadLocalEnv() {
  ['.env.local', '.env'].forEach((fileName) => {
    const envPath = path.join(process.cwd(), fileName);
    if (!fs.existsSync(envPath)) return;

    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    lines.forEach((line) => {
      const parsed = parseEnvLine(line);
      if (!parsed || process.env[parsed.key] !== undefined) return;
      process.env[parsed.key] = parsed.value;
    });
  });
}

function escapeHtml(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
}

function markdownToHtml(markdown) {
  return String(markdown || '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('### ')) return `<h3>${inlineMarkdown(block.slice(4))}</h3>`;
      if (block.startsWith('## ')) return `<h2>${inlineMarkdown(block.slice(3))}</h2>`;
      if (block.startsWith('# ')) return `<h2>${inlineMarkdown(block.slice(2))}</h2>`;
      if (block.startsWith('- ')) {
        return `<ul>${block.split('\n').map((line) => `<li>${inlineMarkdown(line.replace(/^-\s+/, ''))}</li>`).join('')}</ul>`;
      }
      return `<p>${inlineMarkdown(block).replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');
}

function calculateSEOScore(post) {
  return {
    hasMetaTitle: Boolean(post.metaTitle),
    hasMetaDescription: Boolean(post.metaDescription),
    hasFocusKeyword: Boolean(post.focusKeyword),
    metaDescriptionLengthOk: Boolean(post.metaDescription && post.metaDescription.length <= 160),
    slugOk: Boolean(post.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)),
    hasThumbnail: Boolean(post.thumbnailUrl),
    hasFaq: Boolean(post.faqs && post.faqs.length),
  };
}

function initAdmin() {
  if (getApps().length) return;
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin credentials. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in .env.local, or use FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.');
  }
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

async function ensureCategories(db) {
  const categoriesBySlug = new Map();
  const existing = await db.collection('categories').get();
  existing.docs.forEach((doc) => categoriesBySlug.set(doc.data().slug, { id: doc.id, ...doc.data() }));

  for (let index = 0; index < defaultCategories.length; index += 1) {
    const name = defaultCategories[index];
    const slug = generateSlug(name);
    if (!categoriesBySlug.has(slug)) {
      const ref = await db.collection('categories').add({
        name,
        slug,
        description: '',
        order: index + 1,
        isActive: true,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      categoriesBySlug.set(slug, { id: ref.id, name, slug });
      console.log(`Created category: ${name}`);
    }
  }

  return categoriesBySlug;
}

function inferCategory(data, tags = []) {
  const combined = `${data.category || ''} ${tags.join(' ')} ${data.title || ''}`.toLowerCase();
  if (combined.includes('482')) return 'visa-482';
  if (combined.includes('485')) return 'visa-485';
  if (combined.includes('500')) return 'visa-500';
  if (combined.includes('407')) return 'visa-407';
  if (combined.includes('462')) return 'visa-462';
  if (combined.includes('speaking')) return 'pte-speaking';
  if (combined.includes('writing')) return 'pte-writing';
  if (combined.includes('reading')) return 'pte-reading';
  if (combined.includes('listening')) return 'pte-listening';
  if (combined.includes('visa') || combined.includes('úc') || combined.includes('uc')) return 'pte-cho-visa-uc';
  if (combined.includes('lộ trình') || combined.includes('lo trinh')) return 'lo-trinh-hoc-pte';
  return 'kinh-nghiem-thi-pte';
}

async function importPosts() {
  initAdmin();
  const db = getFirestore();
  const categoriesBySlug = await ensureCategories(db);

  if (!fs.existsSync(postsDir)) {
    console.log('No content/posts directory found.');
    return;
  }

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.mdx'));
  let imported = 0;
  let skipped = 0;

  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    const title = data.title || file.replace(/\.mdx$/, '');
    const slug = generateSlug(data.slug || file.replace(/\.mdx$/, '') || title);
    const exists = await db.collection('posts').where('slug', '==', slug).limit(1).get();
    if (!exists.empty) {
      console.log(`Skipped existing post: ${slug}`);
      skipped += 1;
      continue;
    }

    const tags = Array.isArray(data.tags) ? data.tags : [];
    const categorySlug = inferCategory(data, tags);
    const category = categoriesBySlug.get(categorySlug) || categoriesBySlug.get('kinh-nghiem-thi-pte');
    const published = data.published !== false;
    const date = data.date ? new Date(data.date) : new Date();
    const excerpt = data.description || data.excerpt || content.replace(/[#*_`\[\]()]/g, '').slice(0, 160).trim();

    const post = {
      title,
      slug,
      excerpt,
      contentMarkdown: content,
      contentHtml: markdownToHtml(content),
      metaTitle: data.metaTitle || title,
      metaDescription: data.metaDescription || excerpt,
      focusKeyword: data.focusKeyword || (tags[0] || ''),
      categoryId: category ? category.id : '',
      categoryName: category ? category.name : '',
      categorySlug: category ? category.slug : '',
      tags,
      thumbnailUrl: data.cover || data.thumbnailUrl || '',
      status: published ? 'published' : 'draft',
      authorName: data.author || 'PTE Intensive',
      createdAt: Timestamp.fromDate(date),
      updatedAt: FieldValue.serverTimestamp(),
      publishedAt: published ? Timestamp.fromDate(date) : null,
      faqs: [],
    };

    await db.collection('posts').add({ ...post, seoScore: calculateSEOScore(post) });
    console.log(`Imported: ${slug}`);
    imported += 1;
  }

  console.log(`Done. Imported: ${imported}. Skipped: ${skipped}. Total MDX files: ${files.length}.`);
}

importPosts().catch((error) => {
  console.error(error);
  process.exit(1);
});
