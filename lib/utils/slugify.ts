export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove Vietnamese diacritics
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace Vietnamese characters
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    // Replace spaces and special characters with hyphens
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    // Remove multiple hyphens
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

export function validateSlug(slug: string): boolean {
  // Check if slug is valid (only lowercase letters, numbers, and hyphens)
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

export function extractSlugFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1] || '';
}
