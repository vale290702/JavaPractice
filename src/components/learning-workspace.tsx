'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../app/progress.css';
import { useLocalStorage } from '../features/learning/use-local-storage';
import {
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  FlaskConical,
  Globe2,
  Lightbulb,
  ListChecks,
  RotateCcw,
} from 'lucide-react';
import {
  messages,
  languageNames,
  modes,
  type Locale,
  type Mode,
} from '../i18n/content';
import { useProgress } from '../features/learning/use-progress';
import { useCurriculum } from '../features/curriculum/provider';
import type { SessionUser } from '../features/auth/types';
import { AccountControls } from './auth/account-controls';
import { CourseNavigation } from './course-navigation';
import { TopicPicker } from './topic-picker';
import { CodePanel } from './code-panel';
const modeIcons = {
  learn: BookOpen,
  example: Code2,
  practice: Braces,
  quiz: ListChecks,
  code: FlaskConical,
};
export function LearningWorkspace({
  user,
  initialCompleted,
}: {
  user: SessionUser;
  initialCompleted: string[];
}) {
  const { getTopic, getUnitForTopic, topicIds, totalActivities } =
    useCurriculum();
  const localeStore = useLocalStorage('java-practice:locale');
  const locale: Locale = localeStore.raw === 'es' ? 'es' : 'en';
  const progress = useProgress(initialCompleted);
  const [topic, setTopic] = useState('1.1');
  const [mode, setMode] = useState<Mode>('learn');
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const { completed } = progress;
  const storageError = localeStore.failed;
  const [code, setCode] = useState<Record<string, string>>({});
  const currentTopic = getTopic(topic);
  const currentUnit = getUnitForTopic(topic);
  const t = messages[locale],
    lesson = currentTopic.content[locale],
    activity = `${topic}:${mode}`;
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  function switchLocale(value: Locale) {
    localeStore.set(value);
  }
  function changeActivity(nextTopic: string, nextMode: Mode) {
    setTopic(nextTopic);
    setMode(nextMode);
    setStep(0);
    setAnswer('');
    setChoice(null);
    setChecked(false);
    setHintCount(0);
    setShowSolution(false);
  }
  function finish() {
    void progress.complete(activity);
  }
  const correct =
    mode === 'quiz'
      ? choice === lesson.correct
      : answer.trim().toLowerCase() === lesson.practiceAnswer;
  const activeHints = mode === 'practice' ? lesson.practiceHints : lesson.hints;
  const canComplete =
    mode === 'practice' || mode === 'quiz' ? checked && correct : true;
  const percentage = new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(completed.length / totalActivities);
  function nextActivity() {
    const index = modes.indexOf(mode);
    if (index < modes.length - 1) changeActivity(topic, modes[index + 1]);
    else
      changeActivity(
        topicIds[(topicIds.indexOf(topic) + 1) % topicIds.length],
        'learn',
      );
  }
  return (
    <div className="app-shell">
      <a className="skip-link" href="#lesson">
        {t.skip}
      </a>
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="brand-symbol">
            <Braces size={23} />
          </span>
          {t.brand}
          <span className="brand-dot" />
        </Link>
        <div className="workspace-label">{t.workspace}</div>
        <div className="course-title">
          <BookOpen size={19} />
          <span>{t.course}</span>
        </div>
        <p className="course-description">{t.courseDetail}</p>
        <div className="sidebar-divider" />
        <h2 className="nav-title">{t.units}</h2>
        <CourseNavigation
          locale={locale}
          currentUnit={currentUnit.id}
          completed={completed}
          onSelect={(id) => changeActivity(id, 'learn')}
          t={t}
        />
        <div className="sidebar-bottom">
          <div className="progress-heading">
            <span>{t.progress}</span>
            <strong>{percentage}</strong>
          </div>
          <progress
            max={totalActivities}
            value={completed.length}
            aria-label={t.progress}
          />
          <p>{storageError ? t.storageError : t.synced}</p>
          <div className="sample-tag">
            <span />
            {t.curriculumLabel}
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>
            {t.overview}
            <ChevronRight size={14} />
            <strong>{t.course}</strong>
          </span>
          <div className="topbar-actions">
            <AccountControls user={user} />
            <label className="language-control">
              <Globe2 size={16} />
              <span className="sr-only">{t.language}</span>
              <select
                aria-label={t.language}
                value={locale}
                onChange={(event) => switchLocale(event.target.value as Locale)}
              >
                <option value="en">{languageNames.en}</option>
                <option value="es">{languageNames.es}</option>
              </select>
            </label>
          </div>
        </header>
        <main id="lesson">
          <div className="mobile-progress">
            <div>
              <span>{t.progress}</span>
              <strong>{percentage}</strong>
            </div>
            <progress
              max={totalActivities}
              value={completed.length}
              aria-label={t.progress}
            />
            <p role={storageError ? 'status' : undefined}>
              {storageError ? t.storageError : t.synced}
            </p>
          </div>
          <div className="welcome">
            <div>
              <h1>{t.greeting}</h1>
              <p>{t.intro}</p>
            </div>
            <div className="course-stamp">
              <Braces size={32} />
              <span>Java</span>
            </div>
          </div>
          <div className="sample-notice">
            <BookOpen size={16} />
            <span>{t.curriculumNote}</span>
          </div>
          <TopicPicker
            locale={locale}
            topic={topic}
            onSelect={(id) => changeActivity(id, 'learn')}
            t={t}
          />
          <section className="lesson-header">
            <div className="lesson-index">{topic}</div>
            <div>
              <h2>{lesson.title}</h2>
              <p>{lesson.description}</p>
            </div>
            <span className="reading-time">{t.readTime}</span>
          </section>
          <nav className="mode-tabs" aria-label={t.lesson}>
            {modes.map((id) => {
              const Icon = modeIcons[id];
              return (
                <button
                  key={id}
                  aria-current={mode === id ? 'step' : undefined}
                  className={mode === id ? 'current' : ''}
                  onClick={() => changeActivity(topic, id)}
                >
                  <Icon size={17} />
                  <span>{t.modes[id]}</span>
                  {completed.includes(`${topic}:${id}`) && (
                    <Check className="tab-check" size={13} />
                  )}
                </button>
              );
            })}
          </nav>
          <div className="activity-area" key={`${topic}:${mode}`}>
            {(mode === 'learn' || mode === 'example') && (
              <div className="lesson-grid">
                <div className="lesson-copy">
                  <h3>{mode === 'learn' ? t.goal : t.walkthrough}</h3>
                  <p className="lesson-goal">{lesson.goal}</p>
                  {mode === 'learn' ? (
                    <>
                      <p>{lesson.explanation}</p>
                      <div className="takeaway">
                        <Lightbulb size={20} />
                        <div>
                          <h4>{t.takeaway}</h4>
                          <p>{lesson.takeaway}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <ol className="walkthrough-list">
                      {lesson.steps.map((text, index) => (
                        <li
                          key={text}
                          className={index === step ? 'current-step' : ''}
                        >
                          <button onClick={() => setStep(index)}>
                            <span>{index + 1}</span>
                            {text}
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
                  <div className="lesson-footnote">
                    <span className="tiny-dot" />
                    {t.step} {step + 1}: {lesson.steps[step]}
                  </div>
                </div>
                <CodePanel
                  topic={topic}
                  locale={locale}
                  step={step}
                  setStep={setStep}
                  t={t}
                />
              </div>
            )}
            {mode === 'practice' && (
              <section className="exercise">
                <h3>{t.practicePrompt}</h3>
                <p className="exercise-question">{lesson.practice}</p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setChecked(true);
                  }}
                >
                  <label htmlFor="practice-answer">{t.answer}</label>
                  <div className="answer-row">
                    <input
                      id="practice-answer"
                      value={answer}
                      onChange={(event) => {
                        setAnswer(event.target.value);
                        setChecked(false);
                      }}
                      autoComplete="off"
                    />
                    <button
                      className="primary-button"
                      disabled={!answer.trim()}
                    >
                      {t.check}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
                {checked && (
                  <div
                    role="status"
                    className={`feedback ${correct ? 'success' : ''}`}
                  >
                    <strong>{correct ? t.correct : t.incorrect}</strong>
                    <p>
                      {correct
                        ? lesson.practiceFeedback
                        : lesson.practiceHints[0]}
                    </p>
                  </div>
                )}
              </section>
            )}
            {mode === 'quiz' && (
              <section className="exercise">
                <h3>{t.quizPrompt}</h3>
                <fieldset>
                  <legend className="exercise-question">
                    {lesson.question}
                  </legend>
                  <div className="choices">
                    {lesson.choices.map((text, index) => (
                      <label
                        key={text}
                        className={`choice ${choice === index ? 'chosen' : ''}`}
                      >
                        <input
                          type="radio"
                          name="quiz"
                          checked={choice === index}
                          onChange={() => {
                            setChoice(index);
                            setChecked(false);
                          }}
                        />
                        <code>{text}</code>
                        {choice === index && <CheckCircle2 size={19} />}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <button
                  className="primary-button"
                  disabled={choice === null}
                  onClick={() => setChecked(true)}
                >
                  {t.check}
                  <ArrowRight size={16} />
                </button>
                {checked && (
                  <div
                    role="status"
                    className={`feedback ${correct ? 'success' : ''}`}
                  >
                    <strong>{correct ? t.correct : t.incorrect}</strong>
                    <p>{correct ? lesson.feedback : t.retry}</p>
                  </div>
                )}
              </section>
            )}
            {mode === 'code' && (
              <section className="coding-exercise">
                <div>
                  <h3>{t.challengePrompt}</h3>
                  <p className="exercise-question">{lesson.challenge}</p>
                  <h4>{t.testCases}</h4>
                  <ul className="checklist">
                    {lesson.checklist.map((text) => (
                      <li key={text}>
                        <Check size={16} />
                        {text}
                      </li>
                    ))}
                  </ul>
                  <p className="execution-note">{t.executionNote}</p>
                </div>
                <div className="editor-container">
                  <div className="editor-top">
                    <span className="file-tab">Main.java</span>
                    <button
                      onClick={() =>
                        setCode({
                          ...code,
                          [topic]: currentTopic.example.starter,
                        })
                      }
                      aria-label={t.reset}
                    >
                      <RotateCcw size={15} />
                      {t.reset}
                    </button>
                  </div>
                  <textarea
                    className="code-input"
                    aria-label={t.editor}
                    value={code[topic] ?? currentTopic.example.starter}
                    spellCheck={false}
                    onChange={(event) =>
                      setCode({ ...code, [topic]: event.target.value })
                    }
                  />
                  <p className="code-save-note">{t.codeSaved}</p>
                </div>
              </section>
            )}
            {(mode === 'practice' || mode === 'code') && (
              <div className="help-section">
                <div className="help-controls">
                  <button
                    className="secondary-button"
                    onClick={() =>
                      setHintCount(Math.min(hintCount + 1, activeHints.length))
                    }
                    disabled={hintCount === activeHints.length}
                  >
                    <Lightbulb size={16} />
                    {t.hint}
                    <span>
                      {hintCount}/{activeHints.length}
                    </span>
                  </button>
                  <button
                    className="text-button"
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? t.hideSolution : t.solution}
                  </button>
                </div>
                {hintCount > 0 && (
                  <ol className="hint-list" aria-label={t.hints}>
                    {activeHints.slice(0, hintCount).map((hint) => (
                      <li key={hint}>{hint}</li>
                    ))}
                  </ol>
                )}
                {showSolution && (
                  <pre className="solution">
                    <code>
                      {mode === 'practice'
                        ? `${lesson.practiceAnswer}\n\n${lesson.practiceFeedback}`
                        : currentTopic.example.solution}
                    </code>
                  </pre>
                )}
              </div>
            )}
          </div>
          <footer className="activity-footer">
            <button
              className={`completion-button ${completed.includes(activity) ? 'is-complete' : ''}`}
              disabled={
                !canComplete ||
                completed.includes(activity) ||
                progress.pending !== null
              }
              onClick={finish}
            >
              <CheckCircle2 size={18} />
              {progress.pending === activity
                ? t.saving
                : completed.includes(activity)
                  ? t.completed
                  : t.complete}
            </button>
            <button
              className="text-button next-activity"
              onClick={nextActivity}
            >
              {t.continue}
              <ArrowRight size={17} />
            </button>
          </footer>
          {progress.failed && (
            <div className="progress-error" role="alert">
              <p>{t.saveError}</p>
              <button
                className="secondary-button"
                disabled={progress.pending !== null}
                onClick={() => void progress.complete(progress.failed!)}
              >
                {t.saveRetry}
              </button>
            </div>
          )}
          {completed.length === totalActivities && (
            <p role="status" className="all-done">
              {t.allDone}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
