import type { Locale } from '@/lib/constants';
import { estimateReadingTimeFromText } from '@/lib/reading-time';
import type { WriteupFrontmatter, WriteupMeta } from '@/lib/content/types';
import { stripFrontmatter } from '@/lib/content/markdown';

type MdxModule = {
  frontmatter: WriteupFrontmatter;
  Content: any;
};

const metaModules = import.meta.glob('../../../content/writeups/*/meta.json', {
  eager: true,
  import: 'default'
}) as Record<string, WriteupMeta>;

const mdxModules = import.meta.glob('../../../content/writeups/*/*.mdx', {
  eager: true
}) as Record<string, MdxModule>;

const rawModules = import.meta.glob('../../../content/writeups/*/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function folderFromPath(path: string): string {
  const parts = path.split('/');
  const idx = parts.indexOf('writeups');
  return parts[idx + 1] ?? '';
}

function localeFromFilename(path: string): Locale | null {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.mdx$/, '');
  if (base === 'en' || base === 'az' || base === 'tr' || base === 'ru') return base;
  return null;
}

function isStale(meta: WriteupMeta, locale: Locale, fm: WriteupFrontmatter): boolean {
  const src = meta.translation.sourceLocale;
  const srcUpdated = meta.translation.updatedAtByLocale?.[src] ?? fm.updatedAt ?? fm.publishedAt;
  const locUpdated = meta.translation.updatedAtByLocale?.[locale] ?? fm.updatedAt ?? fm.publishedAt;
  if (locale === src) return false;
  if (!srcUpdated || !locUpdated) return false;
  return new Date(locUpdated).getTime() < new Date(srcUpdated).getTime();
}

export type WriteupEntry = {
  slug: string;
  locale: Locale;
  meta: WriteupMeta;
  fm: WriteupFrontmatter;
  Content: MdxModule['Content'];
  readingMinutes: number;
  stale: boolean;
  canonicalPath: string;
};

export function getAllWriteups(): WriteupEntry[] {
  const out: WriteupEntry[] = [];
  for (const [path, mod] of Object.entries(mdxModules)) {
    const locale = localeFromFilename(path);
    if (!locale) continue;
    const folder = folderFromPath(path);
    const metaPath = Object.keys(metaModules).find((k) => k.includes(`/content/writeups/${folder}/meta.json`));
    const meta = metaPath ? metaModules[metaPath] : undefined;
    if (!meta) continue;
    const fm = mod.frontmatter;
    const raw = rawModules[path] ?? '';
    const body = stripFrontmatter(raw);
    const readingMinutes = Math.max(meta.estimatedMinutes, estimateReadingTimeFromText(body));
    const stale = isStale(meta, locale, fm);
    out.push({
      slug: meta.slug,
      locale,
      meta,
      fm,
      Content: mod.Content,
      readingMinutes,
      stale,
      canonicalPath: `/${locale}/writeups/${meta.slug}/`
    });
  }
  return out.sort((a, b) => +new Date(b.fm.publishedAt) - +new Date(a.fm.publishedAt));
}

export function getWriteupBySlug(slug: string, locale: Locale): WriteupEntry | undefined {
  return getAllWriteups().find((e) => e.slug === slug && e.locale === locale);
}

export function listWriteupsForLocale(locale: Locale): WriteupEntry[] {
  return getAllWriteups().filter((e) => e.locale === locale);
}

export function relatedWriteups(current: WriteupEntry, limit = 3): WriteupEntry[] {
  const pool = listWriteupsForLocale(current.locale).filter((e) => e.slug !== current.slug);
  const tag = new Set(current.meta.tags);
  return pool
    .map((e) => ({
      e,
      s: e.meta.tags.reduce((acc, t) => acc + (tag.has(t) ? 2 : 0), 0) + (e.meta.category === current.meta.category ? 3 : 0)
    }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.e);
}
