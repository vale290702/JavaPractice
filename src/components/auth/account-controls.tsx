'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { SessionUser } from '../../features/auth/types';
import { useAuthLocale } from './use-auth-locale';
import { authRequest } from './request';
import { navigate } from './navigation';
import '../../app/auth.css';
export function AccountControls({ user }: { user: SessionUser }) {
  const { t } = useAuthLocale();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const busy = useRef(false);
  async function logout() {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError(false);
    try {
      const response = await authRequest('/api/auth/logout', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Logout unavailable');
      navigate('/login');
    } catch {
      setError(true);
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  return (
    <div className="auth-account">
      <span className="auth-account-name" title={user.displayName}>
        {t.account} <strong>{user.displayName}</strong>
      </span>
      {user.role === 'teacher' && (
        <Link href="/teacher">{t.teacherProgress}</Link>
      )}
      <button type="button" disabled={pending} onClick={logout}>
        {pending ? t.loggingOut : t.logout}
      </button>
      {error && <p role="alert">{t.logoutError}</p>}
    </div>
  );
}
