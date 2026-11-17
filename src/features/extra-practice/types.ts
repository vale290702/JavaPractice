import type { Localized } from '../curriculum/types';
export interface PracticeFile {
  name: string;
  code: string;
  readOnly?: boolean;
}
export interface WorksheetDefinition {
  id: string;
  prompt: Localized<string>;
  steps: Localized<string[]>;
  files: PracticeFile[];
  expectedOutput?: string;
  inputs?: string;
  sourcePages: number[];
}
export interface ExtraActivity {
  id: string;
  topicId: string;
  group: '1.1–1.5' | '1.6–1.10';
  title: Localized<string>;
  goal: Localized<string>;
  guided: WorksheetDefinition;
  independent: WorksheetDefinition;
  helpers: PracticeFile[];
}
export interface WorksheetWork {
  prediction: string;
  trace: string;
  files: Record<string, string>;
  results: string;
  explanation: string;
}
export interface SavedWorksheet {
  id: string;
  version: number;
  work: WorksheetWork;
  completed: boolean;
  updatedAt: string;
}
export interface ExtraStudentProgress {
  userId: string;
  completed: string[];
  updatedAt: string | null;
}
