import { describe, expect, it } from 'vitest';
import { answerFieldIds } from '../src/features/exams/metadata';
import { unit1Exam } from '../src/features/exams/unit-1-v1';

const question = (number: number) => unit1Exam.questions[number - 1];

describe('Unit 1 student exam content', () => {
  it('preserves all 23 original numbers, 42 answer fields, and 100 points', () => {
    expect(unit1Exam.questions.map(({ number }) => number)).toEqual(
      Array.from({ length: 23 }, (_, index) => index + 1),
    );
    const ids = unit1Exam.questions.flatMap(({ fields }) =>
      fields.map(({ id }) => id),
    );
    expect(ids).toEqual(answerFieldIds);
    expect(new Set(ids).size).toBe(42);
    expect(unit1Exam.sections.map(({ points }) => points)).toEqual([
      30, 30, 40,
    ]);
    expect(
      unit1Exam.questions.reduce((sum, { points }) => sum + points, 0),
    ).toBe(100);
    for (const section of unit1Exam.sections) {
      expect(
        unit1Exam.questions
          .filter((q) => q.section === section.id)
          .reduce((sum, q) => sum + q.points, 0),
      ).toBe(section.points);
    }
  });

  it('contains 15 multiple choice questions with four original ordered options', () => {
    const choices = unit1Exam.questions.filter(
      ({ section }) => section === 'A',
    );
    expect(choices).toHaveLength(15);
    for (const q of choices) {
      expect(q.options?.map(({ id }) => id)).toEqual(['A', 'B', 'C', 'D']);
      expect(q.points).toBe(2);
      expect(q.fields).toHaveLength(1);
      expect(q.fields[0].kind).toBe('choice');
    }
    expect(question(3).options?.map(({ text }) => text.en)).toEqual([
      'A / B / C',
      'AB / "C"',
      'AB"C" on one line',
      'AB / C (without quotation marks)',
    ]);
    expect(question(11).options?.map(({ text }) => text.en)).toEqual([
      '(int) Math.random() * 6 + 10',
      '(int) (Math.random() * 5) + 10',
      '(int) (Math.random() * 6) + 10',
      '(int) (Math.random() * 6) + 9',
    ]);
  });

  it('provides complete English and Spanish content at every localized node', () => {
    const inspect = (value: unknown): void => {
      if (!value || typeof value !== 'object') return;
      if ('en' in value || 'es' in value) {
        expect(value).toHaveProperty('en');
        expect(value).toHaveProperty('es');
        for (const localized of Object.values(value)) {
          if (typeof localized === 'string')
            expect(localized.trim().length).toBeGreaterThan(0);
          else {
            expect(Array.isArray(localized)).toBe(true);
            expect(
              (localized as string[]).every((item) => item.trim().length > 0),
            ).toBe(true);
          }
        }
      } else for (const child of Object.values(value)) inspect(child);
    };
    inspect(unit1Exam);
    for (const q of unit1Exam.questions) {
      expect(q.title.en).toBeTruthy();
      expect(q.prompt.es).toBeTruthy();
      for (const f of q.fields) {
        expect(f.label.en).toMatch(/point/);
        expect(f.label.es).toMatch(/punto/);
      }
    }
  });

  it('preserves supplied code, including the escaped quotes in question 3', () => {
    expect(question(3).code).toBe(
      'System.out.print("A");\nSystem.out.println("B");\nSystem.out.println("\\"C\\"");',
    );
    expect(question(9).code).toBe(
      'public static double area(int width, double height)',
    );
    expect(question(14).code).toBe(
      'Rectangle picture = null;\nSystem.out.println(picture.getWidth());',
    );
    expect(question(18).code).toBe(
      'public class TicketTools {\n    /** Pre: tickets >= 0 and price >= 0.\n     *  Post: returns tickets multiplied by price. */\n    public static int total(int tickets, int price) {\n        return tickets * price;\n    }\n}',
    );
  });

  it('includes the full program requirements and APIs without filling in student programs', () => {
    for (const locale of ['en', 'es'] as const) {
      const goal = question(22).prompt[locale];
      for (const label of [
        'Goal: ',
        'Actual: ',
        'Sessions: ',
        'Average: ',
        'Difference: ',
      ])
        expect(goal).toContain(label);
      for (const requirement of [
        'GoalReport',
        'Scanner',
        'goal',
        'actual',
        'sessions',
        'double',
        'Math.abs',
        'input.nextInt()',
        '60 / 45 / 2',
      ])
        expect(goal).toContain(requirement);
      const photo = question(23).prompt[locale];
      for (const requirement of [
        'PhotoReport',
        'java.awt.Rectangle',
        'String title = "School Photo";',
        'photo',
        'getWidth()',
        'getHeight()',
        'setSize(int width, int height)',
        'String.substring(from, to)',
        'Title:',
        'Prefix:',
        'Area:',
        'Width:',
        'Height:',
      ])
        expect(photo).toContain(requirement);
    }
    expect(question(22).code).toBeUndefined();
    expect(question(23).code).toBeUndefined();
    expect(question(22).fields[1].points).toBe(0);
    expect(question(23).fields.every((f) => f.points === undefined)).toBe(true);
    expect(question(23).fields[1].label.en).toContain('20 points');
  });

  it('contains no answer key, solutions, hints, or unauthorized assistance', () => {
    const serialized = JSON.stringify(unit1Exam);
    expect(serialized).not.toMatch(
      /answerKey|correctAnswer|solution|hint|tutor/i,
    );
    expect(unit1Exam.instructions.en.join(' ')).toContain(
      'Do not compile or execute the code',
    );
    expect(unit1Exam.instructions.en.join(' ')).toContain(
      'only the API notes supplied with the questions',
    );
  });
});
