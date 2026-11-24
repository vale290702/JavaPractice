import Link from 'next/link';
import { examMessages } from '../i18n/exam';
import { extraPracticeMessages } from '../i18n/extra-practice';
import { curriculumAccessMessages } from '../i18n/curriculum-access';
import { Check, ChevronRight, FileText, Lock } from 'lucide-react';
import { useCurriculum } from '../features/curriculum/provider';
import { modes, type Locale, type Messages } from '../i18n/content';
export function CourseNavigation({
  locale,
  currentUnit,
  extraOpen = false,
  onExtraSelect,
  completed,
  onSelect,
  examAvailable = true,
  t,
}: {
  locale: Locale;
  currentUnit?: string;
  extraOpen?: boolean;
  onExtraSelect?: () => void;
  completed: string[];
  onSelect: (topic: string) => void;
  examAvailable?: boolean;
  t: Messages;
}) {
  const { units } = useCurriculum();
  const lockedLabel = curriculumAccessMessages[locale].locked;
  return (
    <nav className="course-navigation" aria-label={t.units}>
      {units.map((unit) => {
        const ids = new Set(unit.topics.map((topic) => topic.id));
        const count = completed.filter((activity) =>
          ids.has(activity.split(':')[0]),
        ).length;
        const total = unit.topics.length * modes.length;
        const locked = total === 0;
        return (
          <button
            key={unit.id}
            className={`topic-button unit-button ${currentUnit === unit.id ? 'selected' : ''}`}
            onClick={() => onSelect(unit.topics[0].id)}
            disabled={locked}
            aria-current={currentUnit === unit.id ? 'page' : undefined}
          >
            <span
              className={`topic-number ${!locked && count === total ? 'done' : ''}`}
            >
              {!locked && count === total ? <Check size={15} /> : unit.number}
            </span>
            <span>
              <strong>{unit.title[locale]}</strong>
              {locked ? (
                <small>{lockedLabel}</small>
              ) : (
                <small>
                  {unit.topics.length} {t.topics} ·{' '}
                  {new Intl.NumberFormat(locale, {
                    style: 'percent',
                    maximumFractionDigits: 1,
                  }).format(count / total)}
                </small>
              )}
            </span>
            {currentUnit === unit.id && <ChevronRight size={16} />}
            {locked && <Lock size={15} aria-hidden="true" />}
          </button>
        );
      })}
      {onExtraSelect && (
        <button
          className={`topic-button unit-button ${extraOpen ? 'selected' : ''}`}
          aria-current={extraOpen ? 'page' : undefined}
          onClick={onExtraSelect}
        >
          <span className="topic-number">
            <FileText size={15} />
          </span>
          <span>
            <strong>{extraPracticeMessages[locale].title}</strong>
          </span>
          {extraOpen && <ChevronRight size={16} />}
        </button>
      )}
      {examAvailable ? (
        <Link
          href="/exam/unit-1"
          className="topic-button unit-button"
          prefetch={false}
        >
          <span className="topic-number">
            <FileText size={15} />
          </span>
          <span>
            <strong>{examMessages[locale].title}</strong>
          </span>
        </Link>
      ) : (
        <button className="topic-button unit-button" disabled>
          <span className="topic-number">
            <Lock size={15} aria-hidden="true" />
          </span>
          <span>
            <strong>{examMessages[locale].title}</strong>
            <small>{lockedLabel}</small>
          </span>
        </button>
      )}
    </nav>
  );
}
