export const examId = 'unit-1' as const;
export const examVersion = 'unit-1-v1' as const;
export const choiceFields = Array.from({ length: 15 }, (_, i) => `q${i + 1}`);
export const responseFields = [
  'q16a',
  'q16b',
  'q16c',
  'q16d',
  'q17output',
  'q18a',
  'q18b',
  'q18c',
  'q18d',
  'q18e',
  'q19a',
  'q19b',
  'q19c',
  'q19d',
  'q20a',
  'q20b',
  'q20c',
  'q20d',
  'q21a',
  'q21b',
  'q21c',
  'q21d',
  'q21e',
  'q22code',
  'q22output',
  'q23code',
  'q23output',
];
export const answerFieldIds = [...choiceFields, ...responseFields];
export const emptyAnswers = (): Record<string, string> =>
  Object.fromEntries(answerFieldIds.map((id) => [id, '']));
export const answerLimit = (id: string) =>
  id === 'q22code' || id === 'q23code'
    ? 32000
    : choiceFields.includes(id)
      ? 1
      : 8000;
export const maxExamBytes = 262144;
export const unit1ExamLastTopic = '1.15';
