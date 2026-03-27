import type { Locale } from '@/lib/constants';
import { estimateReadingTimeFromText } from '@/lib/reading-time';
import type { BlogFrontmatter, BlogMeta } from '@/lib/content/types';
import { stripFrontmatter } from '@/lib/content/markdown';

type MdxModule = {
  frontmatter: BlogFrontmatter;
  Content: any;
};

const metaModules = import.meta.glob('../../../content/blog/*/meta.json', {
  eager: true,
  import: 'default'
}) as Record<string, BlogMeta>;

const mdxModules = import.meta.glob('../../../content/blog/*/*.mdx', {
  eager: true
}) as Record<string, MdxModule>;

const rawModules = import.meta.glob('../../../content/blog/*/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function folderFromPath(path: string): string {
  const parts = path.split('/');
  const idx = parts.indexOf('blog');
  return parts[idx + 1] ?? '';
}

function localeFromFilename(path: string): Locale | null {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.mdx$/, '');
  if (base === 'en' || base === 'az' || base === 'tr' || base === 'ru') return base;
  return null;
}

export type BlogEntry = {
  slug: string;
  locale: Locale;
  meta: BlogMeta;
  fm: BlogFrontmatter;
  Content: MdxModule['Content'];
  readingMinutes: number;
  stale: boolean;
  canonicalPath: string;
};

function isStale(meta: BlogMeta, locale: Locale, fm: BlogFrontmatter): boolean {
  const src = meta.translation.sourceLocale;
  const srcUpdated = meta.translation.updatedAtByLocale?.[src] ?? fm.updatedAt ?? fm.publishedAt;
  const locUpdated = meta.translation.updatedAtByLocale?.[locale] ?? fm.updatedAt ?? fm.publishedAt;
  if (locale === src) return false;
  if (!srcUpdated || !locUpdated) return false;
  return new Date(locUpdated).getTime() < new Date(srcUpdated).getTime();
}

export function getAllBlogEntries(): BlogEntry[] {
  const out: BlogEntry[] = [];
  for (const [path, mod] of Object.entries(mdxModules)) {
    const locale = localeFromFilename(path);
    if (!locale) continue;
    const folder = folderFromPath(path);
    const metaPath = Object.keys(metaModules).find((k) => k.includes(`/content/blog/${folder}/meta.json`));
    const meta = metaPath ? metaModules[metaPath] : undefined;
    if (!meta) continue;
    const fm = mod.frontmatter;
    const raw = rawModules[path] ?? '';
    const body = stripFrontmatter(raw);
    const readingMinutes = estimateReadingTimeFromText(body);
    const stale = isStale(meta, locale, fm);
    out.push({
      slug: meta.slug,
      locale,
      meta,
      fm,
      Content: mod.Content,
      readingMinutes,
      stale,
      canonicalPath: `/${locale}/blog/${meta.slug}/`
    });
  }
  return out.sort((a, b) => +new Date(b.fm.publishedAt) - +new Date(a.fm.publishedAt));
}

export function getBlogBySlug(slug: string, locale: Locale): BlogEntry | undefined {
  return getAllBlogEntries().find((e) => e.slug === slug && e.locale === locale);
}

export function listBlogForLocale(locale: Locale): BlogEntry[] {
  return getAllBlogEntries().filter((e) => e.locale === locale);
}

export function getRelatedBlog(current: BlogEntry, limit = 3): BlogEntry[] {
  const pool = listBlogForLocale(current.locale).filter((e) => e.slug !== current.slug);
  const cat = new Set(current.meta.category);
  const tag = new Set(current.meta.tags);
  const scored = pool.map((e) => {
    let s = 0;
    e.meta.category.forEach((c) => {
      if (cat.has(c)) s += 3;
    });
    e.meta.tags.forEach((t) => {
      if (tag.has(t)) s += 1;
    });
    return { e, s };
  });
  return scored
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.e);
}

export function adjacentPosts(slug: string, locale: Locale): { prev?: BlogEntry; next?: BlogEntry } {
  const list = listBlogForLocale(locale).sort(
    (a, b) => +new Date(a.fm.publishedAt) - +new Date(b.fm.publishedAt)
  );
  const idx = list.findIndex((e) => e.slug === slug);
  if (idx === -1) return {};
  return {
    prev: list[idx - 1],
    next: list[idx + 1]
  };
}

export function alternateLocalesForSlug(slug: string): Partial<Record<Locale, string>> {
  const entries = getAllBlogEntries().filter((e) => e.slug === slug);
  const map: Partial<Record<Locale, string>> = {};
  for (const e of entries) {
    map[e.locale] = `/${e.locale}/blog/${slug}/`;
  }
  return map;
}
