import { redirect } from 'next/navigation';
import { getCurrentSession } from '../../features/auth/server';
import { getTeacherProgress } from '../../features/learning/server';
import type { StudentProgress } from '../../features/learning/types';
import { SessionBoundary } from '../../components/auth/session-boundary';
import { TeacherOverview } from '../../components/teacher-overview';
export const dynamic = 'force-dynamic';
export default async function TeacherPage() {
  let session;
  try {
    session = await getCurrentSession();
  } catch {
    redirect('/login?reason=unavailable');
  }
  if (!session) redirect('/login');
  if (session.user.role !== 'teacher') redirect('/');
  let students: StudentProgress[] = [];
  let unavailable = false;
  try {
    students = await getTeacherProgress();
  } catch {
    unavailable = true;
  }
  return (
    <SessionBoundary session={session}>
      <TeacherOverview
        user={session.user}
        students={students}
        unavailable={unavailable}
      />
    </SessionBoundary>
  );
}
