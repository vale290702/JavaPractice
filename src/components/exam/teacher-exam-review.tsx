'use client';
import { useRef, useState } from 'react';
import type { SessionUser } from '../../features/auth/types';
import type {
  ExamDefinition,
  ExamSubmission,
  ExamSummary,
} from '../../features/exams/types';
import { isExamAttempt } from '../../features/exams/attempt';
import { examMessages } from '../../i18n/exam';
import { useAuthLocale } from '../auth/use-auth-locale';
import { authRequest } from '../auth/request';
import { ExamQuestions, ExamShell } from './shared';
export function TeacherExamReview({
  user,
  exam,
  submissions,
  unavailable = false,
}: {
  user: SessionUser;
  exam: ExamDefinition;
  submissions: ExamSummary[];
  unavailable?: boolean;
}) {
  const { locale } = useAuthLocale();
  const t = examMessages[locale];
  const [submission, setSubmission] = useState<ExamSubmission | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState<'load' | 'pdf' | null>(null);
  const lock = useRef(false);
  const view = async (student: string) => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError(null);
    setSubmission(null);
    try {
      const response = await authRequest(
        `/api/exam/unit-1/submissions?student=${encodeURIComponent(student)}`,
        { headers: { 'X-Account-ID': user.id } },
      );
      if (!response.ok) throw Error();
      const data = await response.json();
      if (
        !data.submission ||
        data.submission.userId !== student ||
        !isExamAttempt(data.submission.attempt) ||
        data.submission.attempt.status !== 'submitted'
      )
        throw Error();
      setSubmission(data.submission);
    } catch {
      setError('load');
    } finally {
      lock.current = false;
      setBusy(false);
    }
  };
  const pdf = async (student: string) => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError(null);
    try {
      const response = await authRequest(
        `/api/exam/unit-1/pdf?student=${encodeURIComponent(student)}`,
        { headers: { 'X-Account-ID': user.id } },
      );
      if (!response.ok) throw Error();
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        response.headers
          .get('Content-Disposition')
          ?.match(/filename="([a-zA-Z0-9_.-]+)"/)?.[1] ?? 'unit-1-exam.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('pdf');
    } finally {
      lock.current = false;
      setBusy(false);
    }
  };
  const date = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  return (
    <ExamShell user={user} teacher>
      <div className="exam-intro">
        <h1>{t.review}</h1>
        <p>{t.title}</p>
      </div>
      <a className="exam-back" href="/teacher/exams/unit-1">
        {t.refresh}
      </a>
      {error && (
        <p className="exam-notice" role="alert">
          {error === 'pdf' ? t.pdfError : t.failure}
        </p>
      )}
      {unavailable ? (
        <p className="exam-notice" role="alert">
          {t.unavailable}
        </p>
      ) : submissions.length === 0 ? (
        <p className="exam-notice">{t.noSubmissions}</p>
      ) : (
        <div className="exam-table-scroll">
          <table className="exam-table">
            <thead>
              <tr>
                <th scope="col">{t.student}</th>
                <th scope="col">{t.date}</th>
                <th scope="col">{t.answer}</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.userId}>
                  <th scope="row">
                    {item.displayName}
                    <span>{item.email}</span>
                  </th>
                  <td>{date(item.submittedAt)}</td>
                  <td>
                    <div className="exam-buttons">
                      <button
                        disabled={busy}
                        aria-label={`${t.view} · ${item.displayName}`}
                        onClick={() => void view(item.userId)}
                      >
                        {t.view}
                      </button>
                      <button
                        disabled={busy}
                        aria-label={`${t.pdf} · ${item.displayName}`}
                        onClick={() => void pdf(item.userId)}
                      >
                        {t.pdf}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {busy && <p role="status">{t.reviewing}</p>}
      {submission && (
        <section
          className="exam-review"
          tabIndex={-1}
          ref={(node) => node?.focus()}
        >
          <div className="exam-review-heading">
            <h2>{submission.displayName}</h2>
            <button onClick={() => setSubmission(null)}>{t.close}</button>
          </div>
          <p>
            {t.submitted}: {date(submission.submittedAt)} · {t.savedLanguage}:{' '}
            {t[submission.locale]}
          </p>
          <ExamQuestions
            exam={exam}
            locale={submission.attempt.locale}
            answers={submission.attempt.answers}
            readOnly
          />
        </section>
      )}
    </ExamShell>
  );
}
