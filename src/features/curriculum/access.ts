import { topicIds } from './metadata';

/** Null opens the entire course. Any topic limit includes that topic. */
export type CurriculumThrough = string | null;

export function isCurriculumThrough(
  value: unknown,
): value is CurriculumThrough {
  return (
    value === null ||
    (typeof value === 'string' &&
      (value === 'none' || topicIds.includes(value)))
  );
}

export function canAccessTopic(through: CurriculumThrough, topic: string) {
  const index = topicIds.indexOf(topic);
  return (
    index !== -1 && (through === null || index <= topicIds.indexOf(through))
  );
}
