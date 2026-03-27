import type { Locale } from '@/lib/constants';

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `/${locale}/`;
  const joined = `/${locale}${normalized}`;
  return joined.endsWith('/') ? joined : `${joined}/`;
}

export function stripLocalePrefix(pathname: string): { locale: Locale | null; path: string } {
  const parts = pathname.split('/').filter(Boolean);
  const maybe = parts[0];
  if (maybe === 'en' || maybe === 'az' || maybe === 'tr' || maybe === 'ru') {
    return { locale: maybe, path: '/' + parts.slice(1).join('/') };
  }
  return { locale: null, path: pathname || '/' };
}
