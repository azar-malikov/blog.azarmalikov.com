import type { Locale } from '@/lib/constants';
import type { GlossaryFrontmatter, GlossaryMeta } from '@/lib/content/types';
import { stripFrontmatter } from '@/lib/content/markdown';
import { estimateReadingTimeFromText } from '@/lib/reading-time';

type MdxModule = {
  frontmatter: GlossaryFrontmatter;
  Content: any;
};

const metaModules = import.meta.glob('../../../content/glossary/*/meta.json', {
  eager: true,
  import: 'default'
}) as Record<string, GlossaryMeta>;

const mdxModules = import.meta.glob('../../../content/glossary/*/*.mdx', {
  eager: true
}) as Record<string, MdxModule>;

const rawModules = import.meta.glob('../../../content/glossary/*/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function folderFromPath(path: string): string {
  const parts = path.split('/');
  const idx = parts.indexOf('glossary');
  return parts[idx + 1] ?? '';
}

function localeFromFilename(path: string): Locale | null {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.mdx$/, '');
  if (base === 'en' || base === 'az' || base === 'tr' || base === 'ru') return base;
  return null;
}

function isStale(meta: GlossaryMeta, locale: Locale, fm: GlossaryFrontmatter): boolean {
  const src = meta.translation.sourceLocale;
  const srcUpdated = meta.translation.updatedAtByLocale?.[src] ?? fm.updatedAt;
  const locUpdated = meta.translation.updatedAtByLocale?.[locale] ?? fm.updatedAt;
  if (locale === src) return false;
  if (!srcUpdated || !locUpdated) return false;
  return new Date(locUpdated).getTime() < new Date(srcUpdated).getTime();
}

export type GlossaryEntry = {
  slug: string;
  locale: Locale;
  meta: GlossaryMeta;
  fm: GlossaryFrontmatter;
  Content: MdxModule['Content'];
  readingMinutes: number;
  stale: boolean;
};

export function getAllGlossary(): GlossaryEntry[] {
  const out: GlossaryEntry[] = [];
  for (const [path, mod] of Object.entries(mdxModules)) {
    const locale = localeFromFilename(path);
    if (!locale) continue;
    const folder = folderFromPath(path);
    const metaPath = Object.keys(metaModules).find((k) => k.includes(`/content/glossary/${folder}/meta.json`));
    const meta = metaPath ? metaModules[metaPath] : undefined;
    if (!meta) continue;
    const fm = mod.frontmatter;
    const raw = rawModules[path] ?? '';
    const body = stripFrontmatter(raw);
    out.push({
      slug: meta.slug,
      locale,
      meta,
      fm,
      Content: mod.Content,
      readingMinutes: estimateReadingTimeFromText(body),
      stale: isStale(meta, locale, fm)
    });
  }
  return out.sort((a, b) => a.meta.keyword.localeCompare(b.meta.keyword));
}

export function listGlossaryForLocale(locale: Locale): GlossaryEntry[] {
  return getAllGlossary().filter((e) => e.locale === locale);
}

export function getGlossaryBySlug(slug: string, locale: Locale): GlossaryEntry | undefined {
  return getAllGlossary().find((e) => e.slug === slug && e.locale === locale);
}
