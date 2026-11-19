import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from 'pdf-lib';
import type { ExamDefinition, ExamSubmission } from './types';

const labels = {
  en: {
    record: 'Submitted exam',
    student: 'Student',
    email: 'Email',
    started: 'Started',
    submitted: 'Submitted',
    version: 'Exam version',
    points: 'points',
    answer: 'Answer',
    empty: '(No answer)',
    page: 'Page',
    of: 'of',
    continued: '[continued]',
    note: 'Code lines marked > continue the previous line. Unsupported characters appear as Unicode escapes. The attached submission.json preserves exact answers.',
    total: 'Total available',
  },
  es: {
    record: 'Examen entregado',
    student: 'Estudiante',
    email: 'Correo',
    started: 'Inicio',
    submitted: 'Entrega',
    version: 'Versión del examen',
    points: 'puntos',
    answer: 'Respuesta',
    empty: '(Sin respuesta)',
    page: 'Página',
    of: 'de',
    continued: '[continuación]',
    note: 'Las líneas de código marcadas con > continúan la anterior. Los caracteres no compatibles aparecen como escapes Unicode. El adjunto submission.json conserva las respuestas exactas.',
    total: 'Total disponible',
  },
};

/** A printable ASCII filename safe for Content-Disposition headers. */
export function examPdfFilename(submission: ExamSubmission): string {
  const name =
    submission.displayName
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 70) || 'student';
  return `exam-${name}-${submission.examVersion.replace(/[^a-zA-Z0-9_-]/g, '')}.pdf`;
}

/** Server-side export: uses only embedded standard fonts and never fetches assets. */
export async function generateExamPdf(
  exam: ExamDefinition,
  submission: ExamSubmission,
): Promise<Uint8Array> {
  const locale = submission.locale;
  const t = labels[locale];
  const pdf = await PDFDocument.create();
  const body = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const mono = await pdf.embedFont(StandardFonts.Courier);
  const width = 595.28,
    height = 841.89,
    margin = 44,
    bottom = 55;
  const contentWidth = width - margin * 2;
  let page: PDFPage;
  let y = 0;
  const printable = (value: string, font: PDFFont): string =>
    Array.from(value)
      .map((character) => {
        const point = character.codePointAt(0)!;
        if (point < 32 || point === 127) return `\\u{${point.toString(16)}}`;
        try {
          font.encodeText(character);
          return character;
        } catch {
          return `\\u{${point.toString(16)}}`;
        }
      })
      .join('');
  const newPage = () => {
    page = pdf.addPage([width, height]);
    page.drawText(printable(`${t.record} | ${submission.examVersion}`, body), {
      x: margin,
      y: height - 30,
      size: 8,
      font: body,
      color: rgb(0.35, 0.38, 0.42),
    });
    page.drawLine({
      start: { x: margin, y: height - 38 },
      end: { x: width - margin, y: height - 38 },
      thickness: 0.5,
      color: rgb(0.8, 0.82, 0.84),
    });
    y = height - 61;
  };
  const space = (amount = 9) => {
    y -= amount;
  };
  const text = (value: string, font = body, size = 10, code = false) => {
    // Split logical lines before escaping to retain blank lines and indentation.
    for (const logicalLine of value.split(/\r\n|\n|\r/)) {
      let remaining = printable(logicalLine, font);
      let continuation = false;
      do {
        if (y - size * 1.45 < bottom) newPage();
        const available = contentWidth - (continuation && code ? 17 : 0);
        let end = remaining.length;
        if (font.widthOfTextAtSize(remaining, size) > available) {
          let low = 1,
            high = remaining.length;
          while (low < high) {
            const mid = Math.ceil((low + high) / 2);
            if (
              font.widthOfTextAtSize(remaining.slice(0, mid), size) <= available
            )
              low = mid;
            else high = mid - 1;
          }
          end = low;
          if (!code) {
            const boundary = remaining.lastIndexOf(' ', end);
            if (boundary > end / 2) end = boundary + 1;
          }
        }
        if (continuation && code)
          page.drawText('>', {
            x: margin,
            y,
            size: 8,
            font: mono,
            color: rgb(0.45, 0.45, 0.45),
          });
        if (remaining.slice(0, end))
          page.drawText(remaining.slice(0, end), {
            x: margin + (continuation && code ? 17 : 0),
            y,
            size,
            font,
            color: rgb(0.12, 0.15, 0.19),
          });
        y -= size * 1.45;
        remaining = remaining.slice(end);
        continuation = true;
      } while (remaining.length);
    }
  };
  const timestamp = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : `${new Intl.DateTimeFormat(locale === 'es' ? 'es-CR' : 'en-GB', { timeZone: 'America/Costa_Rica', dateStyle: 'medium', timeStyle: 'long' }).format(date)} (America/Costa_Rica)`;
  };
  newPage();
  text(exam.title[locale], bold, 18);
  space();
  text(`${t.student}: ${submission.displayName}`);
  text(`${t.email}: ${submission.email}`);
  text(`${t.started}: ${timestamp(submission.attempt.startedAt)}`);
  text(`${t.submitted}: ${timestamp(submission.submittedAt)}`);
  text(`${t.version}: ${submission.examVersion}`);
  text(
    `${t.total}: ${exam.sections.reduce((sum, section) => sum + section.points, 0)} ${t.points}`,
    bold,
  );
  space();
  text(t.note, body, 8);
  space();
  text(exam.description[locale]);
  for (const instruction of exam.instructions[locale]) text(`- ${instruction}`);
  for (const section of exam.sections) {
    space(16);
    if (y < bottom + 75) newPage();
    text(`${section.title[locale]} (${section.points} ${t.points})`, bold, 14);
    text(section.description[locale]);
    for (const question of exam.questions.filter(
      (item) => item.section === section.id,
    )) {
      space(14);
      if (y < bottom + 65) newPage();
      text(
        `${question.number}. [${question.topics}] ${question.title[locale]} (${question.points} ${t.points})`,
        bold,
        11,
      );
      if (question.prompt[locale] !== question.title[locale])
        text(question.prompt[locale]);
      if (question.code) {
        space(5);
        text(question.code, mono, 8.5, true);
      }
      for (const option of question.options ?? [])
        text(`${option.id}. ${option.text[locale]}`);
      for (const field of question.fields) {
        space(6);
        text(
          field.kind === 'choice'
            ? t.answer
            : `${t.answer}: ${field.label[locale]}`,
          bold,
          9,
        );
        const answer = submission.attempt.answers[field.id];
        text(
          answer === undefined || answer === '' ? t.empty : answer,
          mono,
          9,
          true,
        );
      }
    }
  }
  const pages = pdf.getPages();
  pages.forEach((item, index) =>
    item.drawText(`${t.page} ${index + 1} ${t.of} ${pages.length}`, {
      x: margin,
      y: 28,
      size: 8,
      font: body,
      color: rgb(0.35, 0.38, 0.42),
    }),
  );
  pdf.setTitle(`${exam.title[locale]} - ${submission.displayName}`);
  pdf.setSubject(`${t.record}; ${submission.examVersion}`);
  pdf.setCreator('Tutorias');
  await pdf.attach(
    new TextEncoder().encode(JSON.stringify(submission, null, 2)),
    'submission.json',
    {
      mimeType: 'application/json',
      description:
        locale === 'es'
          ? 'Entrega original con respuestas exactas'
          : 'Original submission with exact answers',
    },
  );
  return pdf.save();
}
