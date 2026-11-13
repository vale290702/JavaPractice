import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCurriculum } from '../features/curriculum/provider';
import type { Locale, Messages } from '../i18n/content';
export function TopicPicker({
  locale,
  topic,
  onSelect,
  t,
}: {
  locale: Locale;
  topic: string;
  onSelect: (topic: string) => void;
  t: Messages;
}) {
  const { getTopic, getUnitForTopic } = useCurriculum();
  const unit = getUnitForTopic(topic),
    index = unit.topics.findIndex((item) => item.id === topic),
    current = getTopic(topic);
  return (
    <section className="topic-picker" aria-labelledby="current-unit-title">
      <div className="unit-description">
        <h2 id="current-unit-title">
          {t.unit} {unit.number}: {unit.title[locale]}
        </h2>
        <p>{unit.description[locale]}</p>
      </div>
      <div className="topic-picker-row">
        <label htmlFor="course-topic">{t.selectTopic}</label>
        <div className="topic-select-controls">
          <select
            id="course-topic"
            value={topic}
            onChange={(event) => onSelect(event.target.value)}
          >
            {unit.topics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} · {item.content[locale].title}
              </option>
            ))}
          </select>
          <button
            className="topic-arrow"
            aria-label={t.previousTopic}
            disabled={index === 0}
            onClick={() => onSelect(unit.topics[index - 1].id)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="topic-arrow"
            aria-label={t.nextTopic}
            disabled={index === unit.topics.length - 1}
            onClick={() => onSelect(unit.topics[index + 1].id)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <p className="source-reference">
        {t.sourcePage} {current.sourcePdfPage} · {t.sourceLabel}
      </p>
    </section>
  );
}
