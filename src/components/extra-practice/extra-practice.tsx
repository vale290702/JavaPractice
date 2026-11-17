'use client';
import React, { useId, useState } from 'react';
import type {
  ExtraActivity,
  WorksheetDefinition,
  WorksheetWork,
} from '../../features/extra-practice/types';
import type { Locale } from '../../i18n/content';
import { extraPracticeMessages } from '../../i18n/extra-practice';
import { useWorksheet } from '../../features/extra-practice/use-worksheet';
import { JavaEditor } from '../java-editor';

export function ExtraPractice({
  activities,
  locale,
  userId,
}: {
  activities: ExtraActivity[];
  locale: Locale;
  userId: string;
}) {
  const [selected, setSelected] = useState('');
  const [section, setSection] = useState<'guided' | 'independent'>('guided');
  const activity = activities.find((a) => a.id === selected) ?? activities[0];
  const m = extraPracticeMessages[locale];
  const selectId = useId();
  return (
    <section className="extra-practice" aria-label={m.title}>
      <h2>{m.title}</h2>
      {!activity ? (
        <p className="extra-muted">{m.empty}</p>
      ) : (
        <>
          <div className="extra-selector">
            <label htmlFor={selectId}>{m.activity}</label>
            <select
              id={selectId}
              value={activity.id}
              onChange={(e) => setSelected(e.target.value)}
            >
              {activities.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title[locale]}
                </option>
              ))}
            </select>
            <p className="extra-muted">
              {m.group} {activity.group}
            </p>
          </div>
          <div
            className="extra-section-nav"
            role="group"
            aria-label={m.activity}
          >
            {(['guided', 'independent'] as const).map((s) => (
              <button
                type="button"
                key={s}
                aria-pressed={section === s}
                onClick={() => setSection(s)}
              >
                {m[s]}
              </button>
            ))}
          </div>
          <Worksheet
            key={`${userId}:${activity[section].id}`}
            activity={activity}
            definition={activity[section]}
            locale={locale}
            userId={userId}
          />
        </>
      )}
    </section>
  );
}
function Worksheet({
  activity,
  definition,
  locale,
  userId,
}: {
  activity: ExtraActivity;
  definition: WorksheetDefinition;
  locale: Locale;
  userId: string;
}) {
  const m = extraPracticeMessages[locale];
  const sheet = useWorksheet(userId, definition);
  const [fileName, setFileName] = useState(
    definition.files[0]?.name ?? activity.helpers[0]?.name ?? '',
  );
  const files = [
    ...definition.files,
    ...activity.helpers.filter(
      (helper) => !definition.files.some((f) => f.name === helper.name),
    ),
  ];
  const file = files.find((f) => f.name === fileName);
  const readOnly =
    !!file &&
    (file.readOnly || activity.helpers.some((h) => h.name === file.name));
  const blocked =
    sheet.loading ||
    sheet.pending ||
    sheet.issue === 'loadError' ||
    sheet.issue === 'conflict' ||
    sheet.issue === 'ended';
  const complete =
    Object.values(sheet.work)
      .filter((v) => typeof v === 'string')
      .every((v) => v.trim()) &&
    Object.values(sheet.work.files).every((v) => v.trim()) &&
    Object.keys(sheet.work.files).length > 0;
  const id = useId();
  function change(field: keyof Omit<WorksheetWork, 'files'>, value: string) {
    sheet.edit({ ...sheet.work, [field]: value });
  }
  function download() {
    const blob = new Blob(
      [JSON.stringify({ id: definition.id, work: sheet.work }, null, 2)],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${definition.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="extra-worksheet">
      <div className="extra-brief">
        <h3>{activity.title[locale]}</h3>
        <p>
          <strong>{m.goal}: </strong>
          {activity.goal[locale]}
        </p>
        <p>{definition.prompt[locale]}</p>
        <ol>
          {definition.steps[locale].map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <p className="extra-muted">
          {m.source}: {definition.sourcePages.join(', ')}
        </p>
      </div>
      {definition.inputs !== undefined && (
        <div className="extra-output">
          <h4>{m.inputs}</h4>
          <pre>{definition.inputs}</pre>
        </div>
      )}
      {definition.expectedOutput !== undefined && (
        <div className="extra-output">
          <h4>{m.output}</h4>
          <pre>{definition.expectedOutput}</pre>
        </div>
      )}
      <div className="extra-status" role="status">
        {sheet.loading
          ? m.loading
          : sheet.pending
            ? m.saving
            : sheet.dirty
              ? m.dirty
              : sheet.completed
                ? m.completed
                : sheet.version
                  ? m.saved
                  : m.new}
        {sheet.recovered && <p>{m.backup}</p>}
      </div>
      {sheet.issue && (
        <div className="extra-notice" role="alert">
          <p>{m[sheet.issue]}</p>
          {sheet.issue === 'loadError' && (
            <button type="button" onClick={sheet.retry}>
              {m.retry}
            </button>
          )}
          {sheet.issue === 'conflict' && (
            <button type="button" onClick={sheet.latest}>
              {m.latest}
            </button>
          )}
        </div>
      )}
      {sheet.storageError && <p role="alert">{m.storage}</p>}
      <fieldset className="extra-fields" disabled={blocked}>
        {(['prediction', 'trace'] as const).map((field) => (
          <label key={field} htmlFor={`${id}-${field}`}>
            {m[field]}
            <textarea
              id={`${id}-${field}`}
              value={sheet.work[field]}
              onChange={(e) => change(field, e.target.value)}
              rows={3}
            />
          </label>
        ))}
        <section className="extra-files" aria-label={m.files}>
          <h4>{m.files}</h4>
          <p className="extra-muted">{m.external}</p>
          <div className="extra-file-nav" role="group" aria-label={m.files}>
            {files.map((f) => (
              <button
                type="button"
                key={f.name}
                aria-pressed={fileName === f.name}
                onClick={() => setFileName(f.name)}
              >
                {f.name}
              </button>
            ))}
          </div>
          {file && (
            <>
              <p className="extra-file-label">
                {file.name}
                {readOnly ? ` · ${m.helpers}` : ''}
              </p>
              {readOnly ? (
                <textarea
                  aria-label={file.name}
                  className="code-input"
                  value={file.code}
                  readOnly
                  spellCheck={false}
                />
              ) : file.name.endsWith('.java') ? (
                <JavaEditor
                  label={file.name}
                  value={sheet.work.files[file.name] ?? file.code}
                  onChange={(value) =>
                    sheet.edit({
                      ...sheet.work,
                      files: { ...sheet.work.files, [file.name]: value },
                    })
                  }
                />
              ) : (
                <textarea
                  aria-label={file.name}
                  className="extra-text-file"
                  value={sheet.work.files[file.name] ?? file.code}
                  onChange={(e) =>
                    sheet.edit({
                      ...sheet.work,
                      files: {
                        ...sheet.work.files,
                        [file.name]: e.target.value,
                      },
                    })
                  }
                  rows={10}
                />
              )}
            </>
          )}
        </section>
        {(['results', 'explanation'] as const).map((field) => (
          <label key={field} htmlFor={`${id}-${field}`}>
            {m[field]}
            <textarea
              id={`${id}-${field}`}
              value={sheet.work[field]}
              onChange={(e) => change(field, e.target.value)}
              rows={4}
            />
          </label>
        ))}
      </fieldset>
      <p className="extra-muted" id={`${id}-completion`}>
        {m.completion}
      </p>
      <div className="extra-actions">
        <button
          type="button"
          className="extra-save"
          disabled={blocked}
          onClick={() => void sheet.save(sheet.completed)}
        >
          {sheet.pending ? m.saving : m.save}
        </button>
        <button
          type="button"
          disabled={blocked || !complete || sheet.completed}
          aria-describedby={`${id}-completion`}
          onClick={() => void sheet.save(true)}
        >
          {sheet.completed ? m.completed : m.complete}
        </button>
        <button type="button" onClick={download}>
          {m.download}
        </button>
      </div>
    </div>
  );
}
