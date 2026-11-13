import { modes } from '../../i18n/content';
import type { CurriculumUnit } from './types';
/** Navigation is built from server-supplied course data; this module imports no lessons. */
export function createCurriculum(units: CurriculumUnit[]) {
  const topics = units.flatMap((unit) => unit.topics);
  const topicIds = topics.map((topic) => topic.id);
  const byId = new Map(topics.map((topic) => [topic.id, topic]));
  const unitByTopic = new Map(
    units.flatMap((unit) =>
      unit.topics.map((topic) => [topic.id, unit] as const),
    ),
  );
  function getTopic(id: string) {
    const topic = byId.get(id);
    if (!topic) throw new Error(`Unknown curriculum topic: ${id}`);
    return topic;
  }
  function getUnitForTopic(id: string) {
    const unit = unitByTopic.get(id);
    if (!unit) throw new Error(`Unknown curriculum topic: ${id}`);
    return unit;
  }
  return {
    units,
    topics,
    topicIds,
    totalActivities: topics.length * modes.length,
    getTopic,
    getUnitForTopic,
  };
}
