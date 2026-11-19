import { redirect } from 'next/navigation';
import { getCurrentSession } from '../../../features/auth/server';
import { SessionBoundary } from '../../../components/auth/session-boundary';
import { StudentExam } from '../../../components/exam/student-exam';
export const dynamic = 'force-dynamic';
export default async function Unit1ExamPage() {
  let session;
  try {
    session = await getCurrentSession();
  } catch {
    redirect('/login?reason=unavailable');
  }
  if (!session) redirect('/login');
  if (session.user.role !== 'student') redirect('/teacher/exams/unit-1');
  const { unit1Exam } = await import('../../../features/exams/unit-1-v1');
  return (
    <SessionBoundary session={session}>
      <StudentExam user={session.user} exam={unit1Exam} />
    </SessionBoundary>
  );
}
