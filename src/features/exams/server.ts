import 'server-only';
import { AuthError, requireSessionHash, rpc } from '../auth/server';
import { assertCurriculumUnlocked } from '../curriculum/access-server';
import { isAccountId, exactKeys } from '../extra-practice/validation';
import { validExamAnswers } from './validation';
import { examVersion } from './metadata';
import { isExamAttempt } from './attempt';
import type {
  ExamAttempt,
  ExamSubmission,
  ExamSummary,
  ExamAnswers,
} from './types';
import type { Locale } from '../../i18n/content';
export class ExamConflict extends Error {
  constructor(
    public code: 'conflict' | 'submitted',
    public attempt?: ExamAttempt,
  ) {
    super(code);
  }
}
function account(id: string) {
  if (!isAccountId(id)) throw new AuthError('invalid_request');
}
const timestamp = (value: unknown): value is string =>
  typeof value === 'string' && Number.isFinite(Date.parse(value));
export function parseExamAttempt(value: unknown): ExamAttempt {
  if (!isExamAttempt(value)) throw new AuthError('unavailable');
  return value;
}
function parseSummary(value: unknown): ExamSummary {
  const s = value as ExamSummary;
  if (
    !s ||
    !isAccountId(s.userId) ||
    typeof s.displayName !== 'string' ||
    typeof s.email !== 'string' ||
    !timestamp(s.submittedAt) ||
    s.examVersion !== examVersion ||
    !['en', 'es'].includes(s.locale)
  )
    throw new AuthError('unavailable');
  return {
    userId: s.userId,
    displayName: s.displayName,
    email: s.email,
    submittedAt: s.submittedAt,
    examVersion: s.examVersion,
    locale: s.locale,
  };
}
function attemptEnvelope(value: unknown): ExamAttempt | null {
  if (value === null) throw new AuthError('invalid_credentials');
  assertCurriculumUnlocked(value);
  const result = value as { ok?: boolean; code?: string; attempt?: unknown };
  if (
    result?.ok === false &&
    ['conflict', 'submitted'].includes(result.code ?? '')
  )
    throw new ExamConflict(
      result.code as 'conflict' | 'submitted',
      result.attempt ? parseExamAttempt(result.attempt) : undefined,
    );
  if (!exactKeys(value, ['ok', 'attempt']) || result.ok !== true)
    throw new AuthError('unavailable');
  return result.attempt === null ? null : parseExamAttempt(result.attempt);
}
export async function getExamAttempt(expectedUserId: string) {
  account(expectedUserId);
  return attemptEnvelope(
    await rpc('app_read_unit1_exam', {
      p_token_hash: await requireSessionHash(),
      p_expected_user_id: expectedUserId,
    }),
  );
}
export async function saveExamAttempt(
  expectedUserId: string,
  version: number,
  answers: ExamAnswers,
  locale: Locale,
  acknowledged: boolean,
  submit: boolean,
): Promise<ExamAttempt> {
  account(expectedUserId);
  if (
    !Number.isSafeInteger(version) ||
    version < 0 ||
    version >= 2147483647 ||
    !validExamAnswers(answers) ||
    !['en', 'es'].includes(locale) ||
    acknowledged !== true ||
    typeof submit !== 'boolean'
  )
    throw new AuthError('invalid_request');
  const result = attemptEnvelope(
    await rpc('app_save_unit1_exam', {
      p_token_hash: await requireSessionHash(),
      p_expected_user_id: expectedUserId,
      p_version: version,
      p_answers: answers,
      p_locale: locale,
      p_acknowledged: acknowledged,
      p_submit: submit,
    }),
  );
  if (!result) throw new AuthError('unavailable');
  return result;
}
export async function getExamSubmissions(
  expectedUserId: string,
): Promise<ExamSummary[]> {
  account(expectedUserId);
  const value = await rpc('app_list_unit1_submissions', {
    p_token_hash: await requireSessionHash(),
    p_expected_user_id: expectedUserId,
  });
  if (value === null) throw new AuthError('invalid_credentials');
  if (!Array.isArray(value)) throw new AuthError('unavailable');
  return value.map(parseSummary);
}
export async function getExamSubmission(
  expectedUserId: string,
  studentId: string,
): Promise<ExamSubmission | null> {
  account(expectedUserId);
  account(studentId);
  const value = await rpc('app_get_unit1_submission', {
    p_token_hash: await requireSessionHash(),
    p_expected_user_id: expectedUserId,
    p_student_id: studentId,
  });
  if (value === null) throw new AuthError('invalid_credentials');
  const result = value as { ok?: boolean; submission?: unknown };
  if (!exactKeys(value, ['ok', 'submission']) || result.ok !== true)
    throw new AuthError('unavailable');
  if (result.submission === null) return null;
  const summary = parseSummary(result.submission);
  const attempt = parseExamAttempt(
    (result.submission as ExamSubmission).attempt,
  );
  if (
    summary.userId !== studentId ||
    attempt.status !== 'submitted' ||
    summary.submittedAt !== attempt.submittedAt ||
    summary.locale !== attempt.locale
  )
    throw new AuthError('unavailable');
  return { ...summary, attempt };
}
