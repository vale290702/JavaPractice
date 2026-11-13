/** Verify that curriculum prose is not shipped in publicly downloadable client JavaScript. */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { unit1 } from '../src/features/curriculum/unit-1.ts';
import { unit2 } from '../src/features/curriculum/unit-2.ts';
import { unit3 } from '../src/features/curriculum/unit-3.ts';
import { unit4 } from '../src/features/curriculum/unit-4.ts';
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(join(directory, entry.name))
          : join(directory, entry.name),
      ),
    )
  ).flat();
}
const markers = [unit1, unit2, unit3, unit4].flatMap((unit) =>
  unit.topics.flatMap((topic) =>
    ['en', 'es'].map((locale) =>
      topic.content[locale].explanation.slice(0, 64),
    ),
  ),
);
const chunks = (await files('.next/static')).filter((path) =>
  path.endsWith('.js'),
);
if (!chunks.length)
  throw new Error('Run npm run build before auditing the client bundle');
for (const path of chunks) {
  const source = await readFile(path, 'utf8');
  if (
    markers.some(
      (marker) =>
        source.includes(marker) ||
        source.includes(JSON.stringify(marker).slice(1, -1)),
    )
  )
    throw new Error(`Protected curriculum text found in ${path}`);
}
console.log(
  `Checked ${chunks.length} client chunks against ${markers.length} curriculum prose markers: no protected lesson text found.`,
);
