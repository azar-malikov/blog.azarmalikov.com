import type { ChecklistMeta, ChecklistGroup } from '@/lib/content/types';

export type ChecklistFile = ChecklistMeta & {
  groups: ChecklistGroup[];
};

const files = import.meta.glob('../../../content/checklists/*.json', {
  eager: true,
  import: 'default'
}) as Record<string, ChecklistFile>;

export function getAllChecklists(): ChecklistFile[] {
  return Object.values(files).sort((a, b) => a.title.localeCompare(b.title));
}

export function getChecklistById(id: string): ChecklistFile | undefined {
  return getAllChecklists().find((c) => c.id === id);
}
