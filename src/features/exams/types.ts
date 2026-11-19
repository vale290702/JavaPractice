import type { Locale } from '../../i18n/content';
import type { Localized } from '../curriculum/types';
export type ExamAnswers = Record<string, string>;
export interface ExamField {
  id: string;
  label: Localized<string>;
  kind: 'choice' | 'text' | 'code' | 'output';
  points?: number;
}
export interface ExamQuestion {
  number: number;
  section: 'A' | 'B' | 'C';
  topics: string;
  points: number;
  title: Localized<string>;
  prompt: Localized<string>;
  code?: string;
  options?: { id: string; text: Localized<string> }[];
  fields: ExamField[];
}
export interface ExamDefinition {
  id: 'unit-1';
  version: 'unit-1-v1';
  title: Localized<string>;
  description: Localized<string>;
  instructions: Localized<string[]>;
  sections: {
    id: 'A' | 'B' | 'C';
    title: Localized<string>;
    description: Localized<string>;
    points: number;
  }[];
  questions: ExamQuestion[];
}
export interface ExamAttempt {
  examId: 'unit-1';
  examVersion: 'unit-1-v1';
  version: number;
  status: 'draft' | 'submitted';
  locale: Locale;
  answers: ExamAnswers;
  startedAt: string;
  updatedAt: string;
  submittedAt: string | null;
}
export interface ExamSummary {
  userId: string;
  displayName: string;
  email: string;
  submittedAt: string;
  examVersion: 'unit-1-v1';
  locale: Locale;
}
export interface ExamSubmission extends ExamSummary {
  attempt: ExamAttempt;
}
