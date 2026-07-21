export const SITE_URL = 'https://www.pteintensive.com';

export function getCanonicalUrl(pathname = '/') {
  const normalizedPath = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_URL}${normalizedPath}`;
}