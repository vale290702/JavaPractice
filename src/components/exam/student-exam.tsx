'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SessionUser } from '../../features/auth/types';
import type {
  ExamAnswers,
  ExamAttempt,
  ExamDefinition,
} from '../../features/exams/types';
import { answerFieldIds, emptyAnswers } from '../../features/exams/metadata';
import { isExamAttempt } from '../../features/exams/attempt';
import { validExamAnswers } from '../../features/exams/validation';
import type { Locale } from '../../i18n/content';
import { examMessages } from '../../i18n/exam';
import { useAuthLocale } from '../auth/use-auth-locale';
import { authRequest } from '../auth/request';
import { ExamQuestions, ExamShell } from './shared';
type Backup = { version: number; answers: ExamAnswers; locale: Locale };
export function StudentExam({
  user,
  exam,
}: {
  user: SessionUser;
  exam: ExamDefinition;
}) {
  const { locale, setLocale } = useAuthLocale();
  const t = examMessages[locale];
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null),
    [answers, setAnswers] = useState<ExamAnswers>(emptyAnswers),
    [phase, setPhase] = useState<'loading' | 'ready' | 'error'>('loading'),
    [busy, setBusy] = useState(false),
    [ack, setAck] = useState(false),
    [dirty, setDirty] = useState(false),
    [confirm, setConfirm] = useState(false),
    [conflict, setConflict] = useState(false),
    [error, setError] = useState(false),
    [localError, setLocalError] = useState(false),
    [backup, setBackup] = useState<Backup | null>(null);
  const lock = useRef(false);
  const key = `java-practice:exam:${user.id}:${exam.version}`;
  const store = (next: Backup) => {
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      setLocalError(true);
    }
  };
  const load = useCallback(async () => {
    setPhase('loading');
    setError(false);
    try {
      const response = await authRequest('/api/exam/unit-1', {
        headers: { 'X-Account-ID': user.id },
      });
      if (!response.ok) throw Error();
      const data = (await response.json()) as { attempt: ExamAttempt | null };
      if (!data || !(data.attempt === null || isExamAttempt(data.attempt)))
        throw Error();
      setAttempt(data.attempt);
      setAnswers({ ...emptyAnswers(), ...data.attempt?.answers });
      setDirty(false);
      setConflict(false);
      setConfirm(false);
      setPhase('ready');
    } catch {
      setPhase('error');
    }
  }, [user.id]);
  useEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (!active) return;
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const saved = JSON.parse(raw) as Backup;
          if (
            saved &&
            validExamAnswers(saved.answers) &&
            Number.isSafeInteger(saved.version) &&
            saved.version >= 0 &&
            (saved.locale === 'en' || saved.locale === 'es')
          )
            setBackup(saved);
        }
      } catch {
        setLocalError(true);
      }
      void load();
    });
    return () => {
      active = false;
    };
  }, [key, load]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const change = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setDirty(true);
    setConfirm(false);
    store({ version: attempt?.version ?? 0, answers: next, locale });
  };
  const persist = async (submit: boolean, start = false) => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError(false);
    try {
      const response = await authRequest('/api/exam/unit-1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Account-ID': user.id,
        },
        body: JSON.stringify({
          version: attempt?.version ?? 0,
          answers: start ? emptyAnswers() : answers,
          locale,
          acknowledged: true,
          submit,
        }),
      });
      const data = await response.json();
      if (
        response.status === 409 &&
        !(
          data?.code === 'submitted' &&
          isExamAttempt(data.attempt) &&
          data.attempt.status === 'submitted'
        )
      ) {
        setConflict(true);
        setConfirm(false);
        return;
      }
      if (
        (!response.ok && response.status !== 409) ||
        !isExamAttempt(data?.attempt)
      )
        throw Error();
      const saved = data.attempt as ExamAttempt;
      setAttempt(saved);
      setAnswers({ ...emptyAnswers(), ...saved.answers });
      setDirty(false);
      setConfirm(false);
      if (!start) setBackup(null);
      if (saved.status === 'submitted') {
        try {
          localStorage.removeItem(key);
        } catch {
          setLocalError(true);
        }
      } else if (!start || !backup)
        store({
          version: saved.version,
          answers: saved.answers,
          locale: saved.locale,
        });
    } catch {
      setError(true);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  };
  const download = () => {
    let text = JSON.stringify(
      { version: attempt?.version ?? 0, answers, locale },
      null,
      2,
    );
    if (backup && !dirty) text = JSON.stringify(backup, null, 2);
    const url = URL.createObjectURL(
      new Blob([text], { type: 'application/json' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exam.version}-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const answered = answerFieldIds.filter((id) => answers[id]?.trim()).length;
  const submitted = attempt?.status === 'submitted';
  return (
    <ExamShell user={user} allowBack={!attempt || submitted}>
      <div className="exam-intro">
        <h1>{exam.title[locale]}</h1>
        <p>{exam.description[locale]}</p>
        <p>{t.intro}</p>
      </div>
      {phase === 'loading' ? (
        <p role="status">{t.loading}</p>
      ) : phase === 'error' ? (
        <div className="exam-notice" role="alert">
          <p>{t.loadError}</p>
          <button onClick={() => void load()}>{t.retry}</button>
        </div>
      ) : (
        <>
          {localError && (
            <div role="alert">
              <p>{t.localError}</p>
              {dirty && <button onClick={download}>{t.download}</button>}
            </div>
          )}
          {error && (
            <div className="exam-notice" role="alert">
              <p>{t.failure}</p>
              <button onClick={download}>{t.download}</button>
            </div>
          )}
          {conflict && (
            <div className="exam-notice" role="alert">
              <p>{t.conflict}</p>
              <button onClick={download}>{t.download}</button>
              <button onClick={() => void load()}>{t.reload}</button>
            </div>
          )}
          {backup && !submitted && (
            <div className="exam-notice">
              <p>{t.backup}</p>
              <button onClick={download}>{t.download}</button>
              {attempt && !conflict && (
                <button
                  disabled={busy}
                  onClick={() => {
                    setAnswers({ ...emptyAnswers(), ...backup.answers });
                    setLocale(backup.locale);
                    setDirty(true);
                    setBackup(null);
                  }}
                >
                  {t.restore}
                </button>
              )}
            </div>
          )}
          {!attempt ? (
            <section className="exam-start">
              <h2>{t.title}</h2>
              <p>{t.rules}</p>
              <ul>
                {exam.instructions[locale].map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <label className="exam-ack">
                <input
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => setAck(e.target.checked)}
                  disabled={busy}
                />
                {t.acknowledge}
              </label>
              <button
                className="primary-button"
                disabled={!ack || busy || conflict}
                onClick={() => void persist(false, true)}
              >
                {busy ? t.saving : t.start}
              </button>
            </section>
          ) : (
            <>
              <div className="exam-toolbar">
                <div role="status" aria-live="polite">
                  {submitted ? (
                    <>
                      <strong>{t.submitted}</strong> ·{' '}
                      {attempt.submittedAt &&
                        new Intl.DateTimeFormat(locale, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        }).format(new Date(attempt.submittedAt))}
                    </>
                  ) : (
                    <>
                      <strong>
                        {answered}/{answerFieldIds.length}
                      </strong>{' '}
                      {t.progress} ·{' '}
                      {busy ? t.saving : dirty ? t.dirty : t.saved}
                    </>
                  )}
                </div>
                {!submitted && (
                  <div className="exam-buttons">
                    <button
                      disabled={busy || conflict}
                      onClick={() => void persist(false)}
                    >
                      {t.save}
                    </button>
                    <button
                      className="primary-button"
                      disabled={busy || conflict}
                      onClick={() => setConfirm(true)}
                    >
                      {t.submit}
                    </button>
                  </div>
                )}
              </div>
              {submitted ? (
                <p className="exam-notice">{t.immutable}</p>
              ) : (
                <div className="exam-rules">
                  <p>{t.rules}</p>
                  <details>
                    <summary>{t.instructions}</summary>
                    <ul>
                      {exam.instructions[locale].map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              )}
              {confirm && (
                <section
                  className="exam-confirm"
                  role="alert"
                  tabIndex={-1}
                  ref={(node) => node?.focus()}
                >
                  <h2>{t.confirm}</h2>
                  <p>{t.immutable}</p>
                  <p>
                    {answerFieldIds.length - answered} {t.unanswered}
                  </p>
                  <div className="exam-buttons">
                    <button disabled={busy} onClick={() => setConfirm(false)}>
                      {t.cancel}
                    </button>
                    <button
                      className="primary-button"
                      disabled={busy}
                      onClick={() => void persist(true)}
                    >
                      {busy ? t.saving : t.confirm}
                    </button>
                  </div>
                </section>
              )}
              <ExamQuestions
                exam={exam}
                locale={submitted ? attempt.locale : locale}
                answers={answers}
                onChange={change}
                readOnly={submitted}
                disabled={busy || conflict}
              />
            </>
          )}
        </>
      )}
    </ExamShell>
  );
}
