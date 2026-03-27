import type { Locale } from '@/lib/constants';
import type { CheatMeta } from '@/lib/content/types';
import { stripFrontmatter } from '@/lib/content/markdown';
import { estimateReadingTimeFromText } from '@/lib/reading-time';

type MdxModule = {
  frontmatter: { title?: string; updatedAt?: string };
  Content: any;
};

const metaModules = import.meta.glob('../../../content/cheatsheets/*/meta.json', {
  eager: true,
  import: 'default'
}) as Record<string, CheatMeta>;

const mdxModules = import.meta.glob('../../../content/cheatsheets/*/*.mdx', {
  eager: true
}) as Record<string, MdxModule>;

const rawModules = import.meta.glob('../../../content/cheatsheets/*/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function folderFromPath(path: string): string {
  const parts = path.split('/');
  const idx = parts.indexOf('cheatsheets');
  return parts[idx + 1] ?? '';
}

function localeFromFilename(path: string): Locale | null {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.mdx$/, '');
  if (base === 'en' || base === 'az' || base === 'tr' || base === 'ru') return base;
  return null;
}

export type CheatEntry = {
  id: string;
  locale: Locale;
  meta: CheatMeta;
  Content: MdxModule['Content'];
  readingMinutes: number;
};

export function getAllCheats(): CheatEntry[] {
  const out: CheatEntry[] = [];
  for (const [path, mod] of Object.entries(mdxModules)) {
    const locale = localeFromFilename(path);
    if (!locale) continue;
    const folder = folderFromPath(path);
    const metaPath = Object.keys(metaModules).find((k) => k.includes(`/content/cheatsheets/${folder}/meta.json`));
    const meta = metaPath ? metaModules[metaPath] : undefined;
    if (!meta) continue;
    const raw = rawModules[path] ?? '';
    const body = stripFrontmatter(raw);
    out.push({
      id: meta.id,
      locale,
      meta,
      Content: mod.Content,
      readingMinutes: estimateReadingTimeFromText(body)
    });
  }
  return out.sort((a, b) => a.meta.title.localeCompare(b.meta.title));
}

export function listCheatsForLocale(locale: Locale): CheatEntry[] {
  return getAllCheats().filter((e) => e.locale === locale);
}

export function getCheatById(id: string, locale: Locale): CheatEntry | undefined {
  return getAllCheats().find((e) => e.id === id && e.locale === locale);
}
