/** Insert one indented line without changing text outside the selection. */
export function indentJavaLine(value: string, start: number, end: number) {
  start = Math.max(0, Math.min(start, value.length));
  end = Math.max(start, Math.min(end, value.length));
  const before = value.slice(0, start);
  const line = before.slice(before.lastIndexOf('\n') + 1);
  const indentation = line.match(/^[\t ]*/)?.[0] ?? '';
  let mode: 'code' | 'string' | 'char' | 'line' | 'block' | 'text' = 'code';
  let lastCode = '';
  for (let i = 0; i < before.length; i++) {
    const ch = before[i];
    const next = before[i + 1];
    if (mode === 'line') {
      if (ch === '\n') mode = 'code';
    } else if (mode === 'block') {
      if (ch === '*' && next === '/') {
        mode = 'code';
        i++;
      }
    } else if (mode === 'text') {
      if (ch === '\\') i++;
      else if (before.slice(i, i + 3) === '"""') {
        mode = 'code';
        i += 2;
      }
    } else if (mode === 'string' || mode === 'char') {
      if (ch === '\\') i++;
      else if (ch === (mode === 'string' ? '"' : "'")) mode = 'code';
    } else if (ch === '/' && next === '/') {
      mode = 'line';
      i++;
    } else if (ch === '/' && next === '*') {
      mode = 'block';
      i++;
    } else if (before.slice(i, i + 3) === '"""') {
      mode = 'text';
      lastCode = '"';
      i += 2;
    } else if (ch === '"') {
      mode = 'string';
      lastCode = ch;
    } else if (ch === "'") {
      mode = 'char';
      lastCode = ch;
    } else if (!/\s/.test(ch)) lastCode = ch;
  }
  const opensBlock =
    mode === 'code' && lastCode === '{' && line.trimEnd().endsWith('{');
  const inner = indentation + (opensBlock ? '    ' : '');
  const after = value.slice(end);
  const paired = opensBlock && /^[\t ]*}/.test(after);
  const insertion = '\n' + inner + (paired ? '\n' + indentation : '');
  const tail = paired ? after.replace(/^[\t ]*/, '') : after;
  return { text: before + insertion + tail, caret: start + 1 + inner.length };
}
