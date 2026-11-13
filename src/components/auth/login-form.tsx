'use client';
import { useSyncExternalStore, useRef, useState, type FormEvent } from 'react';
import { ThemeToggle } from '../theme-toggle';
import { useAuthLocale } from './use-auth-locale';
import { authRequest } from './request';
import { navigate } from './navigation';
import type { AuthErrorCode } from '../../features/auth/types';
import { languageNames } from '../../i18n/content';
import '../../app/auth.css';
const subscribeLocation = () => () => {};
const locationReason = () => {
  const reason = new URLSearchParams(window.location.search).get('reason');
  return reason === 'ended' || reason === 'unavailable' ? reason : null;
};
export function LoginForm() {
  const { locale, setLocale, t } = useAuthLocale();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<AuthErrorCode | null>(null);
  const reason = useSyncExternalStore(
    subscribeLocation,
    locationReason,
    () => null,
  );
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError(null);
    const data = new FormData(event.currentTarget);
    try {
      const response = await authRequest('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      });
      const result = await response.json();
      if (response.ok && result.ok === true) {
        navigate('/');
        return;
      }
      setError(
        ['invalid_credentials', 'rate_limited', 'invalid_request'].includes(
          result.code,
        )
          ? result.code
          : 'unavailable',
      );
    } catch {
      setError('unavailable');
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  return (
    <main className="auth-page">
      <header className="auth-header">
        <span className="auth-brand">{t.brand}</span>
        <div className="auth-preferences">
          <ThemeToggle locale={locale} />
          <label className="auth-language">
            {t.language}
            <select
              aria-label={t.language}
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
            >
              <option value="en">{languageNames.en}</option>
              <option value="es">{languageNames.es}</option>
            </select>
          </label>
        </div>
      </header>
      <section className="auth-login" aria-labelledby="login-title">
        <h1 id="login-title">{t.title}</h1>
        <p className="auth-intro">{t.intro}</p>
        {reason && (
          <p className="auth-notice" role="status">
            {t[reason]}
          </p>
        )}
        <form onSubmit={submit} aria-busy={pending}>
          <label htmlFor="auth-email">{t.email}</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={254}
            readOnly={pending}
          />
          <label htmlFor="auth-password">{t.password}</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={1024}
            readOnly={pending}
          />
          {error && (
            <p className="auth-notice" role="alert">
              {t[error]}
            </p>
          )}
          <button className="auth-primary" type="submit" disabled={pending}>
            {pending ? t.signingIn : t.signIn}
          </button>
        </form>
        <p className="auth-account-note">{t.accounts}</p>
      </section>
    </main>
  );
}
