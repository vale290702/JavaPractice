import { getCurrentProgress } from '../features/learning/server';
import { redirect } from 'next/navigation';
import { getCurrentSession } from '../features/auth/server';
import { CurriculumProvider } from '../features/curriculum/provider';
import { LearningWorkspace } from '../components/learning-workspace';
import { SessionBoundary } from '../components/auth/session-boundary';

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
  return (
    <SessionBoundary session={session}>
      <CurriculumProvider units={units}>
        <LearningWorkspace
          user={session.user}
          initialCompleted={initialCompleted}
        />
      </CurriculumProvider>
    </SessionBoundary>
  );
}
