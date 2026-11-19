# Unit 1 exam

Mode: Operate. Existing learning-lab world, code-first extension; no new visual identity or image comp.

Routes: `/exam/unit-1`, `/teacher/exams/unit-1`. Source evidence: `src/components/exam/`, `src/app/exam.css`, `src/features/exams/`.

The student enters independent answers in a bilingual, responsive document form. The source exam supplies 23 questions, 42 fields, section totals 30/30/40 and permitted API notes. Native radio groups and plain multiline fields provide input; no tutor, hints, solutions, compilation, autocompletion or automatic grading appear. Warm green/light and navy/dark tokens match the incumbent app. Serif hierarchy and ruled question groups establish reading order.

Rules acknowledgement precedes starting. Draft saving, local backup recovery, conflict handling and final immutable submission have distinct translated states. The submitted document is read-only. Teachers receive a submissions list, exact read-only answers, and authenticated PDF download. Long source and tables scroll within their containers; page bounds must hold at 320px. PDF export includes exact saved content and an original JSON attachment.

Review evidence is under `.impeccable/review/exam/` (ignored): EN/ES PDFs, student start/active/code screens, and teacher list/review screens. No production deployment is part of this branch.
