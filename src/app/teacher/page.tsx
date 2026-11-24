import { getExtraTeacherProgress } from '../../features/extra-practice/server';
import type { ExtraStudentProgress } from '../../features/extra-practice/types';
import { redirect } from 'next/navigation';
import { getCurrentSession } from '../../features/auth/server';
import { getTeacherProgress } from '../../features/learning/server';
import type { StudentProgress } from '../../features/learning/types';
import { SessionBoundary } from '../../components/auth/session-boundary';
import { TeacherOverview } from '../../components/teacher-overview';
import { units } from '../../features/curriculum/server';
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
  let extraProgress: ExtraStudentProgress[] = [];
  let extraUnavailable = false;
  if (!unavailable) {
    try {
      extraProgress = await getExtraTeacherProgress();
    } catch {
      extraUnavailable = true;
    }
  }
  return (
    <SessionBoundary session={session}>
      <TeacherOverview
        user={session.user}
        students={students}
        unavailable={unavailable}
        extraProgress={extraProgress}
        extraUnavailable={extraUnavailable}
        accessOptions={units.map((unit) => ({
          number: unit.number,
          title: unit.title,
          topics: unit.topics.map(({ id, content }) => ({
            id,
            title: { en: content.en.title, es: content.es.title },
          })),
        }))}
      />
    </SessionBoundary>
  );
}
