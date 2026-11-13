'use client';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { AppSession } from '../../features/auth/types';
import { useAuthLocale } from './use-auth-locale';
import { authRequest } from './request';
import { navigate } from './navigation';
import '../../app/auth.css';
export function SessionBoundary({
  session,
  children,
}: {
  session: AppSession;
  children: ReactNode;
}) {
  const { t } = useAuthLocale();
  const [state, setState] = useState<
    'checking' | 'healthy' | 'blocked' | 'ended'
  >('checking');
  const active = useRef(false);
  const alive = useRef(false);
  const ended = useRef(false);
  const verify = useCallback(async () => {
    if (active.current || ended.current) return;
    active.current = true;
    try {
      const response = await authRequest('/api/auth/session');
      if (!alive.current) return;
      if (response.status === 401) {
        ended.current = true;
        setState('ended');
        navigate('/login?reason=ended');
        return;
      }
      if (!response.ok) throw new Error('Session unavailable');
      const current: AppSession = await response.json();
      if (!alive.current) return;
      if (
        current.user?.id !== session.user.id ||
        !Number.isFinite(Date.parse(current.expiresAt)) ||
        Date.parse(current.expiresAt) <= Date.now()
      ) {
        ended.current = true;
        setState('ended');
        navigate('/login?reason=ended');
        return;
      }
      setState('healthy');
    } catch {
      if (alive.current) setState('blocked');
    } finally {
      active.current = false;
    }
  }, [session.user.id]);
  useEffect(() => {
    alive.current = true;
    void Promise.resolve().then(() => {
      if (alive.current) void verify();
    });
    const check = () => {
      if (document.visibilityState !== 'hidden') void verify();
    };
    const interval = setInterval(check, 10000);
    window.addEventListener('focus', check);
    window.addEventListener('pageshow', check);
    document.addEventListener('visibilitychange', check);
    return () => {
      alive.current = false;
      clearInterval(interval);
      window.removeEventListener('focus', check);
      window.removeEventListener('pageshow', check);
      document.removeEventListener('visibilitychange', check);
    };
  }, [verify]);
  return (
    <>
      <div hidden={state !== 'healthy'} inert={state !== 'healthy'}>
        {children}
      </div>
      {state !== 'healthy' && (
        <main className="auth-session" aria-labelledby="session-title">
          <h1 id="session-title">{t.sessionTitle}</h1>
          <p role={state === 'blocked' ? 'alert' : 'status'}>
            {state === 'blocked'
              ? t.blocked
              : state === 'ended'
                ? t.ended
                : t.verifying}
          </p>
          {state === 'blocked' && (
            <button
              className="auth-primary"
              onClick={() => {
                setState('checking');
                void verify();
              }}
            >
              {t.retry}
            </button>
          )}
        </main>
      )}
    </>
  );
}
