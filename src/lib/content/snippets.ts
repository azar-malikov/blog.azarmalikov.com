import type { SharedSnippet } from '@/lib/content/types';

const data = import.meta.glob('../../../content/shared/snippets.json', {
  eager: true,
  import: 'default'
}) as Record<string, { snippets: SharedSnippet[] }>;

export function getAllSnippets(): SharedSnippet[] {
  const first = Object.values(data)[0];
  return first?.snippets ?? [];
}

export function getSnippetById(id: string): SharedSnippet | undefined {
  return getAllSnippets().find((s) => s.id === id);
}
