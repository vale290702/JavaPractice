import React, { useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { indentJavaLine } from '../src/features/learning/editor-indentation';
import { JavaEditor } from '../src/components/java-editor';

afterEach(cleanup);

describe('Java indentation', () => {
  it.each([
    ['    run();', 10, 10, '    run();\n    ', 15],
    ['  if (ok) {', 11, 11, '  if (ok) {\n      ', 18],
    ['  {}', 3, 3, '  {\n      \n  }', 10],
    ['    first(); second();', 12, 13, '    first();\n    second();', 17],
    ['    abc', 5, 7, '    a\n    ', 10],
    ['  // {', 6, 6, '  // {\n  ', 9],
    ['  /* comment {', 14, 14, '  /* comment {\n  ', 17],
    ['  String s = "{', 15, 15, '  String s = "{\n  ', 18],
    [
      '  String s = "escaped \\" {',
      26,
      26,
      '  String s = "escaped \\" {\n  ',
      29,
    ],
    ['  /* { */ if (ok) {', 19, 19, '  /* { */ if (ok) {\n      ', 26],
  ])('indents %j at %i', (value, start, end, expected, caret) => {
    expect(indentJavaLine(value, start, end)).toEqual({
      text: expected,
      caret,
    });
  });
});

function Editor({ initial = '  {}' }) {
  const [value, setValue] = useState(initial);
  return <JavaEditor value={value} onChange={setValue} label="Código Java" />;
}

it('updates the controlled text and places the caret inside existing braces', () => {
  render(<Editor />);
  const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
  textarea.focus();
  textarea.setSelectionRange(3, 3);
  fireEvent.keyDown(textarea, { key: 'Enter' });
  expect(textarea.value).toBe('  {\n      \n  }');
  expect(textarea.selectionStart).toBe(10);
  expect(textarea.selectionEnd).toBe(10);
});

it.each([
  { key: 'Enter', shiftKey: true },
  { key: 'Enter', ctrlKey: true },
  { key: 'Enter', altKey: true },
  { key: 'Enter', metaKey: true },
  { key: 'Enter', isComposing: true },
  { key: 'Enter', keyCode: 229 },
  { key: 'Tab' },
])('leaves native keyboard behavior for %j', (key) => {
  render(<Editor />);
  const textarea = screen.getByRole('textbox');
  expect(fireEvent.keyDown(textarea, key)).toBe(true);
  expect(textarea).toHaveValue('  {}');
});

it('indents mobile line breaks from native beforeinput', () => {
  render(<Editor />);
  const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
  textarea.setSelectionRange(3, 3);
  const event = new InputEvent('beforeinput', {
    bubbles: true,
    cancelable: true,
    inputType: 'insertLineBreak',
  });
  expect(fireEvent(textarea, event)).toBe(false);
  expect(textarea.value).toBe('  {\n      \n  }');
  expect(textarea.selectionStart).toBe(10);
});

it('keeps modified Enter native when the browser follows with beforeinput', () => {
  render(<Editor />);
  const textarea = screen.getByRole('textbox');
  fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
  const event = new InputEvent('beforeinput', {
    bubbles: true,
    cancelable: true,
    inputType: 'insertLineBreak',
  });
  expect(fireEvent(textarea, event)).toBe(true);
  expect(textarea).toHaveValue('  {}');
});
