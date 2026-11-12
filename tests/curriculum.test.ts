import { describe, expect, it } from 'vitest';
import {
  units,
  topics,
  topicIds,
  getTopic,
  getUnitForTopic,
} from '../src/features/curriculum';

describe('document-aligned AP curriculum', () => {
  it('contains exactly the four units and all 53 numbered topics in source order', () => {
    expect(units.map((unit) => unit.topics.length)).toEqual([15, 12, 9, 17]);
    expect(topics).toHaveLength(53);
    expect(new Set(topicIds).size).toBe(53);
    for (const unit of units) {
      expect(unit.topics.map((topic) => topic.id)).toEqual(
        Array.from(
          { length: unit.topics.length },
          (_, index) => `${unit.number}.${index + 1}`,
        ),
      );
    }
    expect(getTopic('4.17').content.en.title).toBe(
      'Recursive Searching and Sorting',
    );
    expect(getUnitForTopic('3.4').id).toBe('unit-3');
  });
  it('provides complete bilingual activities, valid answer keys and aligned code snapshots', () => {
    for (const topic of topics) {
      expect(topic.sourcePdfPage).toBeGreaterThanOrEqual(37);
      expect(topic.sourcePdfPage).toBeLessThanOrEqual(128);
      for (const locale of ['en', 'es'] as const) {
        const lesson = topic.content[locale];
        for (const value of Object.values(lesson)) {
          if (typeof value === 'string')
            expect(
              value.trim().length,
              `${topic.id} ${locale}`,
            ).toBeGreaterThan(0);
        }
        expect(lesson.choices.length).toBeGreaterThanOrEqual(3);
        expect(lesson.correct).toBeGreaterThanOrEqual(0);
        expect(lesson.correct).toBeLessThan(lesson.choices.length);
        expect(lesson.practiceHints).toHaveLength(3);
        expect(lesson.hints).toHaveLength(3);
        expect(lesson.steps.length).toBe(topic.example.active.length);
        expect(lesson.practiceAnswer.trim().toLowerCase()).toBe(
          topic.content.en.practiceAnswer.trim().toLowerCase(),
        );
      }
      expect(topic.example.output).toHaveLength(topic.example.active.length);
      for (const locale of ['en', 'es'] as const)
        expect(topic.example.values[locale]).toHaveLength(
          topic.example.active.length,
        );
      expect(
        topic.example.active.every(
          (line) => line >= 0 && line < topic.example.lines.length,
        ),
      ).toBe(true);
      expect(topic.example.solution).toContain('public class Main');
      expect(topic.example.starter).toContain('public class Main');
    }
  });
});
