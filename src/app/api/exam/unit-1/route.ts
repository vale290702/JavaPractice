import {
  json,
  assertOrigin,
  errorResponse,
} from '../../../../features/auth/http';
import { AuthError } from '../../../../features/auth/server';
import { expectedExamAccount, examBody } from '../../../../features/exams/http';
import {
  getExamAttempt,
  saveExamAttempt,
  ExamConflict,
} from '../../../../features/exams/server';
import { exactKeys } from '../../../../features/extra-practice/validation';
import type { ExamAnswers } from '../../../../features/exams/types';
import type { Locale } from '../../../../i18n/content';
export const runtime = 'nodejs';
export async function GET(request: Request) {
  try {
    return json({
      attempt: await getExamAttempt(expectedExamAccount(request)),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function POST(request: Request) {
  try {
    assertOrigin(request);
    const id = expectedExamAccount(request);
    const body = await examBody(request);
    if (
      !exactKeys(body, [
        'version',
        'answers',
        'locale',
        'acknowledged',
        'submit',
      ])
    )
      throw new AuthError('invalid_request');
    return json({
      attempt: await saveExamAttempt(
        id,
        body.version as number,
        body.answers as ExamAnswers,
        body.locale as Locale,
        body.acknowledged as boolean,
        body.submit as boolean,
      ),
    });
  } catch (error) {
    return error instanceof ExamConflict
      ? json(
          {
            code: error.code,
            ...(error.attempt ? { attempt: error.attempt } : {}),
          },
          409,
        )
      : errorResponse(error);
  }
}
