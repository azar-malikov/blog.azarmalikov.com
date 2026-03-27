export const SITE = {
  name: 'Azar Malikov',
  /** Short studio identifier for registry / masthead (not a product name) */
  studioCode: 'AM·KB',
  title: 'Cyber editorial & knowledge',
  url: 'https://blog.azarmalikov.com',
  defaultLocale: 'en' as const,
  locales: ['en', 'az', 'tr', 'ru'] as const,
  publicLocales: ['en', 'az', 'tr'] as const
};

export type Locale = (typeof SITE.locales)[number];
export type PublicLocale = (typeof SITE.publicLocales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  az: 'Azərbaycan',
  tr: 'Türkçe',
  ru: 'Русский'
};

export function isLocale(s: string): s is Locale {
  return (SITE.locales as readonly string[]).includes(s);
}

export function isPublicLocale(s: string): s is PublicLocale {
  return (SITE.publicLocales as readonly string[]).includes(s);
}
