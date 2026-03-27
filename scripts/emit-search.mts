import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildSearchIndex } from '../src/lib/search/build.ts';

const dir = process.argv[2] ?? 'dist';
await writeFile(join(dir, 'search-index.json'), JSON.stringify(buildSearchIndex()), 'utf-8');
