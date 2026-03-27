import type { Locale } from '@/lib/constants';

export const STATIC_LOCALES: Locale[] = ['en', 'az', 'tr', 'ru'];

export function langStaticPaths() {
  return STATIC_LOCALES.map((lang) => ({ params: { lang } }));
}
