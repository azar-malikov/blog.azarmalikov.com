import type { Locale } from '@/lib/constants';
import type { NoteMeta } from '@/lib/content/types';
import { stripFrontmatter } from '@/lib/content/markdown';
import { estimateReadingTimeFromText } from '@/lib/reading-time';

type MdxModule = {
  frontmatter: { title: string; updatedAt?: string };
  Content: any;
};

const metaModules = import.meta.glob('../../../content/notes/*/meta.json', {
  eager: true,
  import: 'default'
}) as Record<string, NoteMeta>;

const mdxModules = import.meta.glob('../../../content/notes/*/*.mdx', {
  eager: true
}) as Record<string, MdxModule>;

const rawModules = import.meta.glob('../../../content/notes/*/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function folderFromPath(path: string): string {
  const parts = path.split('/');
  const idx = parts.indexOf('notes');
  return parts[idx + 1] ?? '';
}

function localeFromFilename(path: string): Locale | null {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.mdx$/, '');
  if (base === 'en' || base === 'az' || base === 'tr' || base === 'ru') return base;
  return null;
}

export type NoteEntry = {
  id: string;
  locale: Locale;
  meta: NoteMeta;
  Content: MdxModule['Content'];
  readingMinutes: number;
};

export function getAllNotes(): NoteEntry[] {
  const out: NoteEntry[] = [];
  for (const [path, mod] of Object.entries(mdxModules)) {
    const locale = localeFromFilename(path);
    if (!locale) continue;
    const folder = folderFromPath(path);
    const metaPath = Object.keys(metaModules).find((k) => k.includes(`/content/notes/${folder}/meta.json`));
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
  return out.sort((a, b) => b.readingMinutes - a.readingMinutes);
}

export function listNotesForLocale(locale: Locale): NoteEntry[] {
  return getAllNotes().filter((e) => e.locale === locale);
}

export function getNoteById(id: string, locale: Locale): NoteEntry | undefined {
  return getAllNotes().find((e) => e.id === id && e.locale === locale);
}
