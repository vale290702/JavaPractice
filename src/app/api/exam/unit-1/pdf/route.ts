import { json, errorResponse } from '../../../../../features/auth/http';
import {
  expectedExamAccount,
  studentParam,
} from '../../../../../features/exams/http';
import { getExamSubmission } from '../../../../../features/exams/server';
import {
  generateExamPdf,
  examPdfFilename,
} from '../../../../../features/exams/pdf';
export const runtime = 'nodejs';
export async function GET(request: Request) {
  try {
    const submission = await getExamSubmission(
      expectedExamAccount(request),
      studentParam(request),
    );
    if (!submission) return json({ code: 'not_found' }, 404);
    const { unit1Exam } =
      await import('../../../../../features/exams/unit-1-v1');
    const bytes = await generateExamPdf(unit1Exam, submission);
    return new Response(new Uint8Array(bytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${examPdfFilename(submission)}"`,
        'Cache-Control': 'private, no-store, max-age=0',
        Pragma: 'no-cache',
        Vary: 'Cookie',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
