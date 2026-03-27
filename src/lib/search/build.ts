import { getAllBlogEntries } from '@/lib/content/blog';
import { getAllWriteups } from '@/lib/content/writeups';
import { getAllCheats } from '@/lib/content/cheatsheets';
import { getAllChecklists } from '@/lib/content/checklists';
import { getAllGlossary } from '@/lib/content/glossary';
import { getAllNotes } from '@/lib/content/notes';
import { getAllResearch } from '@/lib/content/research';
import { SITE } from '@/lib/constants';

export type SearchRecord = {
  id: string;
  kind: 'blog' | 'writeup' | 'cheatsheet' | 'checklist' | 'glossary' | 'note' | 'research';
  locale: string;
  title: string;
  excerpt: string;
  href: string;
  tags: string[];
};

export function buildSearchIndex(): SearchRecord[] {
  const out: SearchRecord[] = [];

  for (const b of getAllBlogEntries()) {
    out.push({
      id: `blog:${b.slug}:${b.locale}`,
      kind: 'blog',
      locale: b.locale,
      title: b.fm.title,
      excerpt: b.fm.description,
      href: `/${b.locale}/blog/${b.slug}/`,
      tags: b.meta.tags
    });
  }

  for (const w of getAllWriteups()) {
    out.push({
      id: `writeup:${w.slug}:${w.locale}`,
      kind: 'writeup',
      locale: w.locale,
      title: w.fm.title,
      excerpt: w.fm.description,
      href: `/${w.locale}/writeups/${w.slug}/`,
      tags: w.meta.tags
    });
  }

  for (const c of getAllCheats()) {
    out.push({
      id: `cheatsheet:${c.id}:${c.locale}`,
      kind: 'cheatsheet',
      locale: c.locale,
      title: c.meta.title,
      excerpt: c.meta.shortDescription,
      href: `/${c.locale}/cheatsheets/${c.id}/`,
      tags: c.meta.tags
    });
  }

  for (const cl of getAllChecklists()) {
    for (const locale of SITE.publicLocales) {
      out.push({
        id: `checklist:${cl.id}:${locale}`,
        kind: 'checklist',
        locale,
        title: cl.title,
        excerpt: cl.description ?? '',
        href: `/${locale}/checklists/${cl.id}/`,
        tags: cl.tags
      });
    }
  }

  for (const g of getAllGlossary()) {
    out.push({
      id: `glossary:${g.slug}:${g.locale}`,
      kind: 'glossary',
      locale: g.locale,
      title: g.meta.keyword,
      excerpt: g.fm.shortDefinition,
      href: `/${g.locale}/glossary/${g.slug}/`,
      tags: [g.meta.category]
    });
  }

  for (const n of getAllNotes()) {
    out.push({
      id: `note:${n.id}:${n.locale}`,
      kind: 'note',
      locale: n.locale,
      title: n.meta.title,
      excerpt: '',
      href: `/${n.locale}/notes/${n.id}/`,
      tags: n.meta.tags
    });
  }

  for (const r of getAllResearch()) {
    out.push({
      id: `research:${r.slug}:${r.locale}`,
      kind: 'research',
      locale: r.locale,
      title: r.meta.title,
      excerpt: r.meta.status,
      href: `/${r.locale}/research/${r.slug}/`,
      tags: r.meta.tags
    });
  }

  return out;
}
