import {
  answerFieldIds,
  answerLimit,
  choiceFields,
  maxExamBytes,
} from './metadata';
import type { ExamAnswers } from './types';
import { exactKeys } from '../extra-practice/validation';
export function validExamAnswers(value: unknown): value is ExamAnswers {
  if (!exactKeys(value, answerFieldIds)) return false;
  if (
    new TextEncoder().encode(JSON.stringify(value)).length >
    maxExamBytes - 4096
  )
    return false;
  return answerFieldIds.every((id) => {
    const text = value[id];
    return (
      typeof text === 'string' &&
      text.length <= answerLimit(id) &&
      !text.includes('\0') &&
      new TextDecoder().decode(new TextEncoder().encode(text)) === text &&
      (!choiceFields.includes(id) || ['', 'A', 'B', 'C', 'D'].includes(text))
    );
  });
}
