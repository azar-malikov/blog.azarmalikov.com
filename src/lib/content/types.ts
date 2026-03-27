import type { Locale } from '@/lib/constants';

export type Visibility = 'public' | 'verified' | 'private';

export type TranslationStatus = 'source' | 'current' | 'draft' | 'stale' | 'missing';

export type TranslationMeta = {
  sourceLocale: Locale;
  statusByLocale: Partial<Record<Locale, TranslationStatus>>;
  /** ISO dates for last edit per locale (optional) */
  updatedAtByLocale?: Partial<Record<Locale, string>>;
  notes?: string;
};

export type Author = {
  name: string;
  role?: string;
  avatar?: string;
};

export type BlogMeta = {
  slug: string;
  category: string[];
  tags: string[];
  coverImage?: string;
  featured?: boolean;
  series?: string | null;
  canonicalPath?: string;
  author: Author;
  translation: TranslationMeta;
  visibility: Visibility;
  /** Cross-links: glossary slugs, cheat ids, etc. */
  links?: {
    glossary?: string[];
    cheatsheets?: string[];
    notes?: string[];
  };
};

export type BlogFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
};

export type WriteupMeta = {
  slug: string;
  target: string;
  platform: string;
  difficulty: 'intro' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  coverImage?: string;
  status: 'complete' | 'wip' | 'archived';
  estimatedMinutes: number;
  author: Author;
  translation: TranslationMeta;
  visibility: Visibility;
  tools: string[];
  techniques: string[];
  links?: {
    cheatsheets?: string[];
    glossary?: string[];
    notes?: string[];
    checklists?: string[];
    snippets?: string[];
  };
  disclaimer?: string;
  /** Stage ids in order for nav (optional; can be inferred from MDX) */
  stageOrder?: string[];
  /** Optional labels for stage navigation sidebar */
  stageLabels?: Record<string, string>;
};

export type WriteupFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
};

export type CheatMeta = {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  tags: string[];
  sourceTool?: string;
  platform?: string[];
  warnings?: string[];
  links?: {
    writeups?: string[];
    glossary?: string[];
    snippets?: string[];
  };
  /** Promoted from writeup stage / snippet */
  promotedFrom?: { writeupSlug?: string; stageId?: string; snippetId?: string }[];
};

export type ChecklistMeta = {
  id: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  links?: {
    writeups?: string[];
    cheatsheets?: string[];
    glossary?: string[];
    notes?: string[];
  };
};

export type ChecklistGroup = {
  title: string;
  items: { id: string; text: string; note?: string }[];
};

export type GlossaryMeta = {
  slug: string;
  keyword: string;
  category: string;
  aliases?: string[];
  relatedTools?: string[];
  relatedTechniques?: string[];
  links?: {
    writeups?: string[];
    cheatsheets?: string[];
    notes?: string[];
  };
  translation: TranslationMeta;
};

export type GlossaryFrontmatter = {
  title: string;
  shortDefinition: string;
  updatedAt?: string;
};

export type NoteMeta = {
  id: string;
  title: string;
  tags: string[];
  mood?: 'seed' | 'reminder' | 'fragment';
  links?: {
    blog?: string[];
    glossary?: string[];
  };
  visibility: Visibility;
};

export type ResearchMeta = {
  slug: string;
  title: string;
  status: 'idea' | 'active' | 'paused' | 'shipped';
  tags: string[];
  links?: {
    blog?: string[];
    writeups?: string[];
  };
};

export type SharedSnippet = {
  id: string;
  title: string;
  lang: 'bash' | 'text' | 'python' | 'powershell';
  body: string;
  tags?: string[];
  usedIn?: { writeupSlug?: string; cheatId?: string }[];
};
