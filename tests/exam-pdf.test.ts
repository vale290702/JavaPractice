// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFArray,
  PDFRawStream,
  decodePDFRawStream,
} from 'pdf-lib';
import { generateExamPdf, examPdfFilename } from '../src/features/exams/pdf';
import type {
  ExamDefinition,
  ExamSubmission,
} from '../src/features/exams/types';

const exam: ExamDefinition = {
  id: 'unit-1',
  version: 'unit-1-v1',
  title: { en: 'Java exam', es: 'Examen de Java' },
  description: { en: 'Description', es: 'Descripción' },
  instructions: { en: ['Read carefully.'], es: ['Lea con atención.'] },
  sections: [
    {
      id: 'A',
      title: { en: 'Basics', es: 'Fundamentos' },
      description: { en: 'Questions', es: 'Preguntas' },
      points: 100,
    },
  ],
  questions: [
    {
      number: 1,
      section: 'A',
      topics: 'Java',
      points: 100,
      title: { en: 'Program', es: 'Programa' },
      prompt: { en: 'Write code', es: 'Escriba código' },
      code: 'public class Main {}',
      options: [{ id: 'a', text: { en: 'First', es: 'Primera' } }],
      fields: [{ id: 'q1', label: { en: 'Code', es: 'Código' }, kind: 'code' }],
    },
  ],
};
const submission: ExamSubmission = {
  userId: '123',
  displayName: 'María Pérez',
  email: 'maria@example.test',
  submittedAt: '2026-11-19T18:00:00Z',
  examVersion: 'unit-1-v1',
  locale: 'es',
  attempt: {
    examId: 'unit-1',
    examVersion: 'unit-1-v1',
    version: 1,
    status: 'submitted',
    locale: 'es',
    answers: {
      q1: '  hola\n\t日本語 🙂\u0000\n' + 'longCode'.repeat(1000) + '\n\n',
    },
    startedAt: '2026-11-19T17:00:00Z',
    updatedAt: '2026-11-19T18:00:00Z',
    submittedAt: '2026-11-19T18:00:00Z',
  },
};

describe('exam PDF export', () => {
  it('paginates long code, supports arbitrary input, and attaches lossless original answers', async () => {
    const bytes = await generateExamPdf(exam, submission);
    const pdf = await PDFDocument.load(bytes);
    expect(pdf.getPageCount()).toBeGreaterThan(1);
    expect(pdf.getTitle()).toBe('Examen de Java - María Pérez');
    expect(pdf.getPages().every((page) => page.getHeight() > 800)).toBe(true);
    const names = pdf.catalog.lookup(PDFName.of('Names'), PDFDict);
    const embedded = names
      .lookup(PDFName.of('EmbeddedFiles'), PDFDict)
      .lookup(PDFName.of('Names'), PDFArray);
    const file = embedded
      .lookup(1, PDFDict)
      .lookup(PDFName.of('EF'), PDFDict)
      .lookup(PDFName.of('F'));
    if (!(file instanceof PDFRawStream))
      throw new Error('Missing attachment stream');
    expect(
      JSON.parse(new TextDecoder().decode(decodePDFRawStream(file).decode())),
    ).toEqual(submission);
  });
  it('uses the saved English locale for document metadata', async () => {
    const pdf = await PDFDocument.load(
      await generateExamPdf(exam, { ...submission, locale: 'en' }),
    );
    expect(pdf.getTitle()).toBe('Java exam - María Pérez');
  });
  it('returns a bounded ASCII filename without header injection or path components', () => {
    const filename = examPdfFilename({
      ...submission,
      displayName: '../María\r\nContent-Type: text/html; "😃"'.repeat(20),
    });
    expect(filename).toMatch(/^exam-[a-zA-Z0-9_-]+-unit-1-v1\.pdf$/);
    expect(filename.length).toBeLessThan(100);
    expect(examPdfFilename({ ...submission, displayName: '😃' })).toBe(
      'exam-student-unit-1-v1.pdf',
    );
  });
});
