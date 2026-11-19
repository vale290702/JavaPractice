import { json, errorResponse } from '../../../../../features/auth/http';
import {
  expectedExamAccount,
  studentParam,
} from '../../../../../features/exams/http';
import { getExamSubmission } from '../../../../../features/exams/server';
export const runtime = 'nodejs';
export async function GET(request: Request) {
  try {
    return json({
      submission: await getExamSubmission(
        expectedExamAccount(request),
        studentParam(request),
      ),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
