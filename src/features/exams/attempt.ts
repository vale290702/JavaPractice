import { exactKeys } from '../extra-practice/validation';
import { examVersion } from './metadata';
import { validExamAnswers } from './validation';
import type { ExamAttempt } from './types';
export function isExamAttempt(value: unknown): value is ExamAttempt {
  const a = value as ExamAttempt;
  const date = (value: unknown) =>
    typeof value === 'string' && Number.isFinite(Date.parse(value));
  return (
    exactKeys(value, [
      'examId',
      'examVersion',
      'version',
      'status',
      'locale',
      'answers',
      'startedAt',
      'updatedAt',
      'submittedAt',
    ]) &&
    a.examId === 'unit-1' &&
    a.examVersion === examVersion &&
    Number.isSafeInteger(a.version) &&
    a.version > 0 &&
    ['draft', 'submitted'].includes(a.status) &&
    ['en', 'es'].includes(a.locale) &&
    validExamAnswers(a.answers) &&
    date(a.startedAt) &&
    date(a.updatedAt) &&
    (a.status === 'submitted' ? date(a.submittedAt) : a.submittedAt === null)
  );
}
