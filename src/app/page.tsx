import { getCurrentProgress } from '../features/learning/server';
import { redirect } from 'next/navigation';
import { getCurrentSession } from '../features/auth/server';
import { CurriculumProvider } from '../features/curriculum/provider';
import { LearningWorkspace } from '../components/learning-workspace';
import { SessionBoundary } from '../components/auth/session-boundary';
import { canAccessTopic } from '../features/curriculum/access';

export const dynamic = 'force-dynamic';
export default async function Home() {
  let session;
  try {
    session = await getCurrentSession();
  } catch {
    redirect('/login?reason=unavailable');
  }
  if (!session) redirect('/login');
  let initialCompleted;
  try {
    initialCompleted = await getCurrentProgress();
  } catch {
    redirect('/login?reason=unavailable');
  }
  // Lesson modules are server-only and never imported by unauthenticated client code.
  const { units } = await import('../features/curriculum/server');
  const { extraActivities } =
    await import('../features/extra-practice/content-server');
  const through =
    session.user.role === 'student'
      ? (session.curriculumThrough ?? null)
      : null;
  const availableUnits =
    through === null
      ? units
      : units.map((unit) => ({
          ...unit,
          topics: unit.topics.filter((topic) =>
            canAccessTopic(through, topic.id),
          ),
        }));
  return (
    <SessionBoundary session={session}>
      <CurriculumProvider units={availableUnits}>
        <LearningWorkspace
          user={session.user}
          curriculumThrough={through}
          extraActivities={extraActivities.filter((activity) =>
            canAccessTopic(through, activity.topicId),
          )}
          initialCompleted={initialCompleted}
        />
      </CurriculumProvider>
    </SessionBoundary>
  );
}
