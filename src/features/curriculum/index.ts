import { modes } from '../../i18n/content';
import { unit1 } from './unit-1';
import { unit2 } from './unit-2';
import { unit3 } from './unit-3';
import { unit4 } from './unit-4';
export const units = [unit1, unit2, unit3, unit4];
export const topics = units.flatMap((unit) => unit.topics);
export const topicIds = topics.map((topic) => topic.id);
const byId = new Map(topics.map((topic) => [topic.id, topic]));
export function getTopic(id: string) {
  const topic = byId.get(id);
  if (!topic) throw new Error(`Unknown curriculum topic: ${id}`);
  return topic;
}
export function getUnitForTopic(id: string) {
  const unit = units.find((unit) =>
    unit.topics.some((topic) => topic.id === id),
  );
  if (!unit) throw new Error(`Unknown curriculum topic: ${id}`);
  return unit;
}
export const totalActivities = topics.length * modes.length;
