import { Check, ChevronRight } from 'lucide-react';
import { units } from '../features/curriculum';
import { modes, type Locale, type Messages } from '../i18n/content';
export function CourseNavigation({
  locale,
  currentUnit,
  completed,
  onSelect,
  t,
}: {
  locale: Locale;
  currentUnit: string;
  completed: string[];
  onSelect: (topic: string) => void;
  t: Messages;
}) {
  return (
    <nav className="course-navigation" aria-label={t.units}>
      {units.map((unit) => {
        const ids = new Set(unit.topics.map((topic) => topic.id));
        const count = completed.filter((activity) =>
          ids.has(activity.split(':')[0]),
        ).length;
        const total = unit.topics.length * modes.length;
        return (
          <button
            key={unit.id}
            className={`topic-button unit-button ${currentUnit === unit.id ? 'selected' : ''}`}
            onClick={() => onSelect(unit.topics[0].id)}
            aria-current={currentUnit === unit.id ? 'page' : undefined}
          >
            <span className={`topic-number ${count === total ? 'done' : ''}`}>
              {count === total ? <Check size={15} /> : unit.number}
            </span>
            <span>
              <strong>{unit.title[locale]}</strong>
              <small>
                {unit.topics.length} {t.topics} ·{' '}
                {new Intl.NumberFormat(locale, {
                  style: 'percent',
                  maximumFractionDigits: 1,
                }).format(count / total)}
              </small>
            </span>
            {currentUnit === unit.id && <ChevronRight size={16} />}
          </button>
        );
      })}
    </nav>
  );
}
