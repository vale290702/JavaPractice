import { redirect } from 'next/navigation';
import { getCurrentSession } from '../../../../features/auth/server';
import { getExamSubmissions } from '../../../../features/exams/server';
import type { ExamSummary } from '../../../../features/exams/types';
import { SessionBoundary } from '../../../../components/auth/session-boundary';
import { TeacherExamReview } from '../../../../components/exam/teacher-exam-review';
export const dynamic = 'force-dynamic';
export default async function TeacherExamsPage() {
  let session;
  try {
    session = await getCurrentSession();
  } catch {
    redirect('/login?reason=unavailable');
  }
  if (!session) redirect('/login');
  if (session.user.role !== 'teacher') redirect('/');
  let submissions: ExamSummary[] = [];
  let unavailable = false;
  try {
    submissions = await getExamSubmissions(session.user.id);
  } catch {
    unavailable = true;
  }
  const { unit1Exam } = await import('../../../../features/exams/unit-1-v1');
  return (
    <SessionBoundary session={session}>
      <TeacherExamReview
        user={session.user}
        exam={unit1Exam}
        submissions={submissions}
        unavailable={unavailable}
      />
    </SessionBoundary>
  );
}
