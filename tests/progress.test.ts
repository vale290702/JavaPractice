import { describe, expect, it } from 'vitest';
import {
  parseProgress,
  completeActivity,
} from '../src/features/learning/progress';
describe('local progress', () => {
  it('rejects corrupted or incompatible persisted data', () => {
    expect(parseProgress('{oops')).toEqual([]);
    expect(
      parseProgress('{"version":2,"completed":["variables:learn"]}'),
    ).toEqual([]);
    expect(parseProgress('{"version":1,"completed":[7]}')).toEqual([]);
  });
  it('migrates the reviewed sample activities without inventing new completion', () => {
    expect(
      parseProgress(
        '{"version":1,"completed":["variables:learn","conditions:quiz","loops:code"]}',
      ),
    ).toEqual(['1.2:learn', '2.3:quiz', '2.8:code']);
  });
  it('deduplicates completion and ignores unknown activities', () => {
    expect(completeActivity(['1.2:learn'], '1.2:learn')).toEqual(['1.2:learn']);
    expect(
      parseProgress(
        '{"version":1,"completed":["variables:learn","fake","variables:learn"]}',
      ),
    ).toEqual(['1.2:learn']);
  });
});
