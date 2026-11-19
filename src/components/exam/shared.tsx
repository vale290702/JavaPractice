'use client';
import Link from 'next/link';
import { Braces } from 'lucide-react';
import type { ReactNode } from 'react';
import type { SessionUser } from '../../features/auth/types';
import type { ExamAnswers, ExamDefinition } from '../../features/exams/types';
import { answerLimit } from '../../features/exams/metadata';
import type { Locale } from '../../i18n/content';
import { languageNames } from '../../i18n/content';
import { examMessages } from '../../i18n/exam';
import { AccountControls } from '../auth/account-controls';
import { useAuthLocale } from '../auth/use-auth-locale';
import { ThemeToggle } from '../theme-toggle';
import '../../app/exam.css';
export function ExamShell({
  user,
  children,
  teacher = false,
  allowBack = true,
}: {
  user: SessionUser;
  children: ReactNode;
  teacher?: boolean;
  allowBack?: boolean;
}) {
  const { locale, setLocale, t } = useAuthLocale();
  const m = examMessages[locale];
  return (
    <div className="exam-page">
      <header className="exam-header">
        <div className="brand">
          <span className="brand-symbol">
            <Braces size={23} />
          </span>
          {t.brand}
          <span className="brand-dot" />
        </div>
        <div className="exam-header-actions">
          <AccountControls user={user} />
          <ThemeToggle locale={locale} />
          <label className="auth-language">
            {t.language}
            <select value={locale} onChange={(e) => setLocale(e.target.value)}>
              <option value="en">{languageNames.en}</option>
              <option value="es">{languageNames.es}</option>
            </select>
          </label>
        </div>
      </header>
      <main className="exam-main">
        {allowBack && (
          <Link className="exam-back" href={teacher ? '/teacher' : '/'}>
            {teacher ? m.teacherBack : m.back}
          </Link>
        )}
        {children}
      </main>
    </div>
  );
}
export function ExamQuestions({
  exam,
  locale,
  answers,
  onChange,
  readOnly = false,
  disabled = false,
}: {
  exam: ExamDefinition;
  locale: Locale;
  answers: ExamAnswers;
  onChange?: (id: string, value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  const t = examMessages[locale];
  return (
    <>
      <nav className="exam-sections" aria-label={t.section}>
        {exam.sections.map((s) => (
          <a key={s.id} href={`#exam-section-${s.id}`}>
            {s.title[locale]}
          </a>
        ))}
      </nav>
      {exam.sections.map((section) => (
        <section
          className="exam-section"
          id={`exam-section-${section.id}`}
          key={section.id}
        >
          <div className="exam-section-heading">
            <h2>{section.title[locale]}</h2>
            <p>
              {section.points} {t.points}
            </p>
            <p>{section.description[locale]}</p>
          </div>
          {exam.questions
            .filter((q) => q.section === section.id)
            .map((q) => (
              <article key={q.number} className="exam-question">
                <div className="exam-question-heading">
                  <h3>
                    {q.number}. [{q.topics}] {q.title[locale]}
                  </h3>
                  <span>
                    {q.points} {t.points}
                  </span>
                </div>
                {q.prompt[locale] !== q.title[locale] && (
                  <p className="exam-prompt">{q.prompt[locale]}</p>
                )}
                {q.code && (
                  <pre className="exam-code">
                    <code>{q.code}</code>
                  </pre>
                )}
                {q.fields.map((field) =>
                  field.kind === 'choice' ? (
                    <fieldset
                      className="exam-choice"
                      key={field.id}
                      disabled={readOnly || disabled}
                    >
                      <legend className="exam-sr-only">
                        {field.label[locale]}
                      </legend>
                      {q.options?.map((option) => (
                        <label
                          key={option.id}
                          className={
                            answers[field.id] === option.id ? 'is-selected' : ''
                          }
                        >
                          <input
                            type="radio"
                            name={field.id}
                            value={option.id}
                            checked={answers[field.id] === option.id}
                            onChange={() => onChange?.(field.id, option.id)}
                          />
                          <span>
                            {option.id}. {option.text[locale]}
                          </span>
                        </label>
                      ))}
                      {readOnly && !answers[field.id] && <p>{t.empty}</p>}
                    </fieldset>
                  ) : (
                    <div className="exam-field" key={field.id}>
                      <label htmlFor={`answer-${field.id}`}>
                        {field.label[locale]}
                      </label>
                      {readOnly ? (
                        <pre
                          className={`exam-response ${field.kind === 'code' || field.kind === 'output' ? 'exam-response-code' : ''}`}
                        >
                          {answers[field.id] || t.empty}
                        </pre>
                      ) : (
                        <textarea
                          id={`answer-${field.id}`}
                          value={answers[field.id] ?? ''}
                          onChange={(e) => onChange?.(field.id, e.target.value)}
                          disabled={disabled}
                          className={
                            field.kind === 'code' || field.kind === 'output'
                              ? 'exam-text-code'
                              : ''
                          }
                          rows={
                            field.kind === 'code'
                              ? 14
                              : field.kind === 'output'
                                ? 5
                                : 3
                          }
                          maxLength={answerLimit(field.id)}
                          spellCheck={false}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                        />
                      )}
                    </div>
                  ),
                )}
              </article>
            ))}
        </section>
      ))}
    </>
  );
}
