'use client';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Braces } from 'lucide-react';
import type { SessionUser } from '../features/auth/types';
import type { StudentProgress } from '../features/learning/types';
import { topicIds } from '../features/curriculum/metadata';
import { languageNames, modes } from '../i18n/content';
import { teacherMessages } from '../i18n/teacher';
import { useAuthLocale } from './auth/use-auth-locale';
import { AccountControls } from './auth/account-controls';
import '../app/teacher.css';
const unitNumbers = [1, 2, 3, 4];
const total = topicIds.length * modes.length;
export function TeacherOverview({
  user,
  students,
  unavailable = false,
}: {
  user: SessionUser;
  students: StudentProgress[];
  unavailable?: boolean;
}) {
  const { locale, setLocale, t: auth } = useAuthLocale();
  const t = teacherMessages[locale === 'es' ? 'es' : 'en'];
  const percent = new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 1,
  });
  const date = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  return (
    <div className="teacher-page">
      <header className="teacher-header">
        <Link className="brand" href="/">
          <span className="brand-symbol">
            <Braces size={23} />
          </span>
          {auth.brand}
          <span className="brand-dot" />
        </Link>
        <div className="teacher-actions">
          <AccountControls user={user} />
          <ThemeToggle locale={locale} />
          <label className="auth-language">
            {auth.language}
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value)}
            >
              <option value="en">{languageNames.en}</option>
              <option value="es">{languageNames.es}</option>
            </select>
          </label>
        </div>
      </header>
      <main className="teacher-main">
        <Link className="teacher-back" href="/">
          {t.back}
        </Link>
        <h1>{t.title}</h1>
        <p className="teacher-intro">{t.intro}</p>
        {unavailable ? (
          <div className="teacher-empty" role="alert">
            <p>{t.unavailable}</p>
            <a className="secondary-button" href="/teacher">
              {t.retry}
            </a>
          </div>
        ) : students.length === 0 ? (
          <section className="teacher-empty">
            <h2>{t.empty}</h2>
            <p>{t.emptyHelp}</p>
          </section>
        ) : (
          <>
            <p className="teacher-scroll-hint" id="teacher-scroll-hint">
              {t.scrollHint}
            </p>
            <div
              className="teacher-table-scroll"
              tabIndex={0}
              role="region"
              aria-label={t.title}
              aria-describedby="teacher-scroll-hint"
            >
              <table className="teacher-table">
                <caption>{t.completed}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t.student}</th>
                    <th scope="col">{t.total}</th>
                    <th scope="col">{t.access}</th>
                    {unitNumbers.map((unit) => (
                      <th scope="col" key={unit}>
                        {t.unit} {unit}
                      </th>
                    ))}
                    <th scope="col">{t.lastActivity}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <th scope="row">
                        <strong>{student.displayName}</strong>
                        <span className="teacher-email">{student.email}</span>
                      </th>
                      <td>
                        <strong>
                          {percent.format(student.completed.length / total)}
                        </strong>
                        <span className="teacher-count">
                          {student.completed.length} / {total}
                        </span>
                      </td>
                      <td>{student.enabled ? t.enabled : t.disabled}</td>
                      {unitNumbers.map((unit) => (
                        <td key={unit}>
                          {
                            student.completed.filter((activity) =>
                              activity.startsWith(`${unit}.`),
                            ).length
                          }{' '}
                          /{' '}
                          {topicIds.filter((id) => id.startsWith(`${unit}.`))
                            .length * modes.length}
                        </td>
                      ))}
                      <td>
                        {student.lastActivity ? (
                          <time dateTime={student.lastActivity}>
                            {date.format(new Date(student.lastActivity))}
                          </time>
                        ) : (
                          t.noActivity
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
