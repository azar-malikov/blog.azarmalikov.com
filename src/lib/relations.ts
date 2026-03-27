import type { Locale } from '@/lib/constants';
import type { BlogEntry } from '@/lib/content/blog';
import type { WriteupEntry } from '@/lib/content/writeups';
import { getCheatById } from '@/lib/content/cheatsheets';
import { getGlossaryBySlug } from '@/lib/content/glossary';
import { getChecklistById } from '@/lib/content/checklists';

export function relatedFromBlog(entry: BlogEntry, locale: Locale) {
  const items: { href: string; title: string; kind: string }[] = [];
  for (const g of entry.meta.links?.glossary ?? []) {
    const ge = getGlossaryBySlug(g, locale);
    if (ge) items.push({ kind: 'Glossary', title: ge.meta.keyword, href: `/${locale}/glossary/${g}/` });
  }
  for (const c of entry.meta.links?.cheatsheets ?? []) {
    const ce = getCheatById(c, locale);
    if (ce) items.push({ kind: 'Cheat sheet', title: ce.meta.title, href: `/${locale}/cheatsheets/${c}/` });
  }
  return items;
}

export function relatedFromWriteup(entry: WriteupEntry, locale: Locale) {
  const items: { href: string; title: string; kind: string }[] = [];
  for (const g of entry.meta.links?.glossary ?? []) {
    const ge = getGlossaryBySlug(g, locale);
    if (ge) items.push({ kind: 'Glossary', title: ge.meta.keyword, href: `/${locale}/glossary/${g}/` });
  }
  for (const c of entry.meta.links?.cheatsheets ?? []) {
    const ce = getCheatById(c, locale);
    if (ce) items.push({ kind: 'Cheat sheet', title: ce.meta.title, href: `/${locale}/cheatsheets/${c}/` });
  }
  for (const cl of entry.meta.links?.checklists ?? []) {
    const checklist = getChecklistById(cl);
    if (checklist) items.push({ kind: 'Checklist', title: checklist.title, href: `/${locale}/checklists/${cl}/` });
  }
  return items;
}
