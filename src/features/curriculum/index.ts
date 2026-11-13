import { createCurriculum } from './model';
import { unit1 } from './unit-1';
import { unit2 } from './unit-2';
import { unit3 } from './unit-3';
import { unit4 } from './unit-4';
export const {
  units,
  topics,
  topicIds,
  totalActivities,
  getTopic,
  getUnitForTopic,
} = createCurriculum([unit1, unit2, unit3, unit4]);
