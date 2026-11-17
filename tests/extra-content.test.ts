import { describe, expect, it } from 'vitest';
import { extraActivities } from '../src/features/extra-practice/content';
import {
  activityTopics,
  worksheetIds,
} from '../src/features/extra-practice/metadata';

describe('extra workbook content', () => {
  it('has exactly the approved 14 activities and 28 bilingual worksheets', () => {
    expect(extraActivities).toHaveLength(14);
    expect(
      extraActivities.flatMap((a) => [a.guided.id, a.independent.id]),
    ).toEqual(worksheetIds);
    for (const activity of extraActivities) {
      expect(activity.topicId).toBe(
        activityTopics[activity.id as keyof typeof activityTopics],
      );
      for (const locale of ['en', 'es'] as const) {
        expect(activity.title[locale].length).toBeGreaterThan(5);
        expect(activity.goal[locale].length).toBeGreaterThan(20);
        for (const worksheet of [activity.guided, activity.independent]) {
          expect(worksheet.prompt[locale].length).toBeGreaterThan(30);
          expect(worksheet.steps[locale].length).toBeGreaterThanOrEqual(3);
          expect(
            worksheet.steps[locale].every((step) => step.length > 10),
          ).toBe(true);
          expect(worksheet.sourcePages.length).toBeGreaterThan(0);
        }
      }
    }
  });
  it('matches editable Java filenames to classes and provides the four read-only helpers', () => {
    const helpers = extraActivities.flatMap((a) => a.helpers);
    expect(helpers.map((f) => f.name)).toEqual([
      'Logger.java',
      'UnitConverter.java',
      'Hello.java',
      'Calculator.java',
    ]);
    expect(helpers.every((f) => f.readOnly)).toBe(true);
    for (const a of extraActivities)
      for (const w of [a.guided, a.independent]) {
        const java = w.files.filter((f) => f.name.endsWith('.java'));
        expect(java).toHaveLength(1);
        expect(java[0].code).toContain(
          `public class ${java[0].name.replace('.java', '')} {`,
        );
        expect(java[0].code).toContain(
          'public static void main(String[] args)',
        );
      }
    for (const w of [
      extraActivities[1].guided,
      extraActivities[1].independent,
    ]) {
      expect(w.files.map((f) => f.name)).toEqual([
        'Main.java',
        'Debugging.txt',
      ]);
      expect(w.files[1].readOnly).not.toBe(true);
      expect(w.files[1].code).toContain('Evidence');
    }
  });
  it('keeps supplied defects and source caveats without supplying solutions', () => {
    const get = (id: string) => extraActivities.find((a) => a.id === id)!;
    expect(get('a2').independent.files[0].code).toContain(
      'system.out.println("Practice");',
    );
    expect(get('a2').independent.files[0].code).toContain(
      'System.out.println("Total: " + 2 + 3);',
    );
    expect(get('a2').guided.prompt.en).toContain('not included');
    expect(get('b3').guided.files[0].code).toContain(
      'string string = "This is an error!";',
    );
    expect(get('b3').independent.files[0].code).toContain(
      'double amount = "5.5";',
    );
    expect(get('b6').guided.prompt.en).toContain('do not invent three');
    expect(get('b6').independent.files[0].code).toContain(
      'celsiusToFarenheit(25)',
    );
    expect(get('b6').independent.files[0].code).toContain('int kilograms =');
    expect(get('b6').independent.files[0].code).toContain(
      'milesToKilometers("10")',
    );
    expect(get('b4').guided.files[0].code).toContain(
      'number = mysteryMethod(number);',
    );
  });
  it('preserves all ASCII target spaces and keeps rulers out of printed targets', () => {
    const a = extraActivities[0];
    expect(a.guided.expectedOutput?.split('\n').map((s) => s.length)).toEqual([
      13, 13, 13, 13, 13,
    ]);
    expect(
      a.independent.expectedOutput?.split('\n').map((s) => s.length),
    ).toEqual([9, 9, 9, 9, 9]);
    expect(a.guided.prompt.en).toContain('1234567890123');
    expect(a.independent.prompt.en).toContain('123456789');
    expect(a.guided.expectedOutput).not.toContain('123');
    expect(a.guided.expectedOutput?.split('\n')[0]).toBe('  __         ');
    expect(a.independent.expectedOutput?.split('\n')[0]).toBe('    ^    ');
  });
});

it('keeps creation tasks as empty valid starters and limits targets to supplied output', () => {
  const given = new Set([
    'a2-independent',
    'a3-guided',
    'a6-guided',
    'b3-guided',
    'b3-independent',
    'b4-guided',
    'b5-guided',
    'b6-guided',
    'b6-independent',
    'b8-guided',
  ]);
  for (const activity of extraActivities)
    for (const w of [activity.guided, activity.independent]) {
      if (!given.has(w.id)) {
        const name = w.files[0].name.replace('.java', '');
        expect(w.files[0].code).toBe(
          `public class ${name} {\n    public static void main(String[] args) {\n\n    }\n}\n`,
        );
      }
      expect(Boolean(w.expectedOutput)).toBe(
        ['a1', 'a2'].includes(activity.id),
      );
      expect(w.steps.en.length).toBe(w.steps.es.length);
    }
});

it('preserves helper contracts and multi-page provenance', () => {
  const get = (id: string) => extraActivities.find((a) => a.id === id)!;
  expect(get('b5').guided.sourcePages).toEqual([11, 12, 20]);
  expect(get('b6').guided.sourcePages).toEqual([14, 21]);
  expect(get('b7').independent.sourcePages).toEqual([17, 22]);
  expect(get('b8').independent.sourcePages).toEqual([19, 23]);
  expect(get('b5').helpers[0].code).toContain(
    'return log + "[WARNING] " + message + "\\n";',
  );
  expect(get('b6').helpers[0].code).toContain('return pounds * 0.45359237;');
  expect(get('b7').helpers[0].code).toContain(
    'public static void german(String name)',
  );
  expect(get('b8').helpers[0].code).toContain(
    'return first + " and " + second;',
  );
});
