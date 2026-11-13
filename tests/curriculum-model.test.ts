import { describe, expect, it } from 'vitest';
import { createCurriculum } from '../src/features/curriculum/model';
import { units } from '../src/features/curriculum';
import { progressKeyForUser } from '../src/features/learning/progress';

describe('authenticated curriculum boundary', () => {
  it('builds navigation from supplied course data instead of importing lesson data in clients', () => {
    const model = createCurriculum(units);
    expect(model.topicIds).toHaveLength(53);
    expect(model.totalActivities).toBe(265);
    expect(model.getTopic('4.17').id).toBe('4.17');
    expect(model.getUnitForTopic('3.4').number).toBe(3);
    expect(() => model.getTopic('9.1')).toThrow();
  });
  it('gives each account a separate progress namespace without adopting anonymous progress', () => {
    expect(progressKeyForUser('student-a')).not.toBe(
      progressKeyForUser('student-b'),
    );
    expect(progressKeyForUser('student-a')).not.toBe(
      'java-practice:progress:v1',
    );
    expect(() => progressKeyForUser('')).toThrow();
  });
});
