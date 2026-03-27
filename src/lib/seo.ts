import type { Locale } from '@/lib/constants';
import { SITE } from '@/lib/constants';

export type SeoInput = {
  title: string;
  description?: string;
  canonicalPath?: string;
  locale: Locale;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
};

export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function hreflangAlternates(pathWithoutLocale: string): { locale: Locale; href: string }[] {
  const clean = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
  return (['en', 'az', 'tr', 'ru'] as Locale[]).map((locale) => ({
    locale,
    href: absoluteUrl(`/${locale}${clean === '/' ? '' : clean}`)
  }));
}

export function jsonLdArticle(input: SeoInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    inLanguage: input.locale,
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime ?? input.publishedTime,
    author: input.author ? { '@type': 'Person', name: input.author } : undefined,
    image: input.ogImage ? [absoluteUrl(input.ogImage)] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.canonicalPath ? absoluteUrl(input.canonicalPath) : undefined
    }
  };
}
