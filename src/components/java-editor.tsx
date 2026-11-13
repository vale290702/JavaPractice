'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { indentJavaLine } from '../features/learning/editor-indentation';

export function JavaEditor({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const input = useRef<HTMLTextAreaElement>(null);
  const pendingCaret = useRef<number | null>(null);
  const composing = useRef(false);
  const nativeEnter = useRef(false);

  useLayoutEffect(() => {
    if (pendingCaret.current !== null) {
      input.current?.setSelectionRange(
        pendingCaret.current,
        pendingCaret.current,
      );
      pendingCaret.current = null;
    }
  }, [value]);

  const insertLine = useCallback(
    (textarea: HTMLTextAreaElement) => {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const result = indentJavaLine(textarea.value, start, end);
      // Keep the browser's editing transaction (and undo history) when supported.
      let tail = 0;
      const maxTail = textarea.value.length - end;
      while (
        tail < maxTail &&
        textarea.value[textarea.value.length - tail - 1] ===
          result.text[result.text.length - tail - 1]
      )
        tail++;
      const replacementEnd = textarea.value.length - tail;
      const insertion = result.text.slice(start, result.text.length - tail);
      textarea.setSelectionRange(start, replacementEnd);
      const inserted =
        typeof document.execCommand === 'function' &&
        document.execCommand('insertText', false, insertion);
      if (!inserted)
        textarea.setRangeText(insertion, start, replacementEnd, 'end');
      pendingCaret.current = result.caret;
      onChange(textarea.value);
      textarea.setSelectionRange(result.caret, result.caret);
    },
    [onChange],
  );

  useEffect(() => {
    const textarea = input.current;
    if (!textarea) return;
    function beforeInput(event: InputEvent) {
      if (
        !event.cancelable ||
        nativeEnter.current ||
        composing.current ||
        event.isComposing ||
        !['insertLineBreak', 'insertParagraph'].includes(event.inputType)
      )
        return;
      event.preventDefault();
      insertLine(textarea!);
    }
    textarea.addEventListener('beforeinput', beforeInput);
    return () => textarea.removeEventListener('beforeinput', beforeInput);
  }, [insertLine]);

  return (
    <textarea
      ref={input}
      className="code-input"
      aria-label={label}
      value={value}
      spellCheck={false}
      autoCorrect="off"
      autoCapitalize="off"
      onChange={(event) => onChange(event.target.value)}
      onCompositionStart={() => {
        composing.current = true;
      }}
      onCompositionEnd={() => {
        composing.current = false;
      }}
      onKeyUp={(event) => {
        if (event.key === 'Enter') nativeEnter.current = false;
      }}
      onBlur={() => {
        nativeEnter.current = false;
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter') return;
        nativeEnter.current = false;
        if (
          event.shiftKey ||
          event.ctrlKey ||
          event.altKey ||
          event.metaKey ||
          composing.current ||
          event.nativeEvent.isComposing ||
          event.nativeEvent.keyCode === 229
        ) {
          nativeEnter.current = true;
          return;
        }
        event.preventDefault();
        insertLine(event.currentTarget);
      }}
    />
  );
}
