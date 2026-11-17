'use client';
import { useState } from 'react';
import type { Locale } from '../../i18n/content';
import { extraPracticeMessages } from '../../i18n/extra-practice';

export function VirtualTutor({
  steps,
  locale,
}: {
  steps: string[];
  locale: Locale;
}) {
  const [step, setStep] = useState(0);
  const m = extraPracticeMessages[locale];
  if (steps.length === 0) return null;
  const currentStep = Math.min(step, steps.length - 1);
  const stepLabel = m.stepCount
    .replace('{current}', String(currentStep + 1))
    .replace('{total}', String(steps.length));

  return (
    <section className="virtual-tutor" aria-label={m.guided}>
      <div aria-live="polite" aria-atomic="true">
        <p className="extra-muted">{stepLabel}</p>
        <p className="virtual-tutor-instruction">{steps[currentStep]}</p>
      </div>
      <progress
        aria-label={m.tutorProgress}
        value={currentStep + 1}
        max={steps.length}
      />
      <div className="virtual-tutor-actions">
        <button
          type="button"
          disabled={currentStep === 0}
          onClick={() => setStep(currentStep - 1)}
        >
          {m.previousStep}
        </button>
        <button
          type="button"
          disabled={currentStep === steps.length - 1}
          onClick={() => setStep(currentStep + 1)}
        >
          {m.nextStep}
        </button>
      </div>
    </section>
  );
}
