import { modes } from '../../i18n/content';
import { topicIds } from '../curriculum';
const valid = new Set(
  topicIds.flatMap((topic) => modes.map((mode) => `${topic}:${mode}`)),
);
const legacy = new Map<string, string>(
  Object.entries({ variables: '1.2', conditions: '2.3', loops: '2.8' }).flatMap(
    ([oldId, id]) =>
      modes.map((mode) => [`${oldId}:${mode}`, `${id}:${mode}`] as const),
  ),
);
export const progressKey = 'java-practice:progress:v1';
export function parseProgress(raw: string | null): string[] {
  try {
    const data: unknown = JSON.parse(raw ?? 'null');
    if (
      !data ||
      typeof data !== 'object' ||
      !('version' in data) ||
      data.version !== 1 ||
      !('completed' in data) ||
      !Array.isArray(data.completed) ||
      data.completed.some((item) => typeof item !== 'string')
    )
      return [];
    return [
      ...new Set(
        data.completed
          .map((item: string) => legacy.get(item) ?? item)
          .filter((item: string) => valid.has(item)),
      ),
    ];
  } catch {
    return [];
  }
}
export function completeActivity(
  current: string[],
  activity: string,
): string[] {
  return valid.has(activity) ? [...new Set([...current, activity])] : current;
}
