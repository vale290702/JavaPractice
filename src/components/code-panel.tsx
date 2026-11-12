import { ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import type { Locale, Messages } from '../i18n/content';
import { getTopic } from '../features/curriculum';
export function CodePanel({
  topic,
  locale,
  step,
  setStep,
  t,
}: {
  topic: string;
  locale: Locale;
  step: number;
  setStep: (step: number) => void;
  t: Messages;
}) {
  const example = getTopic(topic).example;
  return (
    <section className="code-panel" aria-label={t.walkthrough}>
      <div className="editor-top">
        <span className="file-tab">Main.java</span>
        <span className="file-type">Java</span>
      </div>
      <div className="code-lines">
        {example.lines.map((line, index) => (
          <div
            key={index}
            className={`code-line ${example.active[step] === index ? 'active-line' : ''}`}
          >
            <span className="line-number" aria-hidden="true">
              {index + 1}
            </span>
            <code>{line}</code>
          </div>
        ))}
      </div>
      <div className="variable-watch">
        <span>{example.values[locale][step]}</span>
      </div>
      <div className="console">
        <div className="console-title">
          <Terminal size={15} />
          {t.output}
        </div>
        <pre aria-live="polite">{example.output[step] || t.noOutput}</pre>
      </div>
      <div className="step-controls">
        <button
          className="icon-button"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          aria-label={t.previous}
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          {t.step} {step + 1} {t.of} {example.active.length}
        </span>
        <button
          className="icon-button"
          disabled={step === example.active.length - 1}
          onClick={() => setStep(step + 1)}
          aria-label={t.next}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
