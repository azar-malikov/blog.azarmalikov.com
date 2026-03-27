import type { Locale } from '@/lib/constants';
import type { ResearchMeta } from '@/lib/content/types';
import { stripFrontmatter } from '@/lib/content/markdown';
import { estimateReadingTimeFromText } from '@/lib/reading-time';

type MdxModule = {
  frontmatter: { title: string; summary?: string; updatedAt?: string };
  Content: any;
};

const metaModules = import.meta.glob('../../../content/research/*/meta.json', {
  eager: true,
  import: 'default'
}) as Record<string, ResearchMeta>;

const mdxModules = import.meta.glob('../../../content/research/*/*.mdx', {
  eager: true
}) as Record<string, MdxModule>;

const rawModules = import.meta.glob('../../../content/research/*/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function folderFromPath(path: string): string {
  const parts = path.split('/');
  const idx = parts.indexOf('research');
  return parts[idx + 1] ?? '';
}

function localeFromFilename(path: string): Locale | null {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.mdx$/, '');
  if (base === 'en' || base === 'az' || base === 'tr' || base === 'ru') return base;
  return null;
}

export type ResearchEntry = {
  slug: string;
  locale: Locale;
  meta: ResearchMeta;
  Content: MdxModule['Content'];
  readingMinutes: number;
};

export function getAllResearch(): ResearchEntry[] {
  const out: ResearchEntry[] = [];
  for (const [path, mod] of Object.entries(mdxModules)) {
    const locale = localeFromFilename(path);
    if (!locale) continue;
    const folder = folderFromPath(path);
    const metaPath = Object.keys(metaModules).find((k) => k.includes(`/content/research/${folder}/meta.json`));
    const meta = metaPath ? metaModules[metaPath] : undefined;
    if (!meta) continue;
    const raw = rawModules[path] ?? '';
    const body = stripFrontmatter(raw);
    out.push({
      slug: meta.slug,
      locale,
      meta,
      Content: mod.Content,
      readingMinutes: estimateReadingTimeFromText(body)
    });
  }
  return out.sort((a, b) => a.meta.title.localeCompare(b.meta.title));
}

export function listResearchForLocale(locale: Locale): ResearchEntry[] {
  return getAllResearch().filter((e) => e.locale === locale);
}

export function getResearchBySlug(slug: string, locale: Locale): ResearchEntry | undefined {
  return getAllResearch().find((e) => e.slug === slug && e.locale === locale);
}
