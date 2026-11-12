export type Localized<T> = { en: T; es: T };
export interface Lesson {
  title: string;
  description: string;
  goal: string;
  explanation: string;
  takeaway: string;
  steps: string[];
  practice: string;
  practiceAnswer: string;
  practiceFeedback: string;
  practiceHints: string[];
  question: string;
  choices: string[];
  correct: number;
  feedback: string;
  challenge: string;
  hints: string[];
  checklist: string[];
}
export interface CodeExample {
  lines: string[];
  active: number[];
  output: string[];
  values: Localized<string[]>;
  /** Complete standalone Java source, with public class Main. */
  solution: string;
  /** Editable complete starter appropriate to this topic. */
  starter: string;
}
export interface CurriculumTopic {
  /** Official AP topic number; stable persistence key. */
  id: string;
  /** One-based page number in the supplied 194-page PDF. */
  sourcePdfPage: number;
  content: Localized<Lesson>;
  example: CodeExample;
}
export interface CurriculumUnit {
  id: string;
  number: number;
  title: Localized<string>;
  description: Localized<string>;
  topics: CurriculumTopic[];
}
