# JavaPractice Implementation Plan

**Goal:** Deliver a working bilingual sample tutoring workspace.
**Architecture:** Content and translation resources feed an interactive React learning workspace; a pure progress module validates local persistence. Integrations are explicit future boundaries.
**Tech Stack:** Next.js 16, React 19, TypeScript 6, custom CSS, Vitest, RTL, Playwright.
**Spec:** docs/superpowers/specs/2026-11-11-java-practice-design.md

## Global Constraints

All visible copy comes from locale resources. Sample curriculum is labeled. Never fabricate Java compilation or assessment results. Node.js 22.12+.

- [x] Create typed bilingual curriculum and assessment data in `src/i18n`; keep code samples language-independent.
- [x] Test invalid persisted progress and idempotent completion in `tests/progress.test.ts`, run failing tests, implement `parseProgress` and `completeActivity` in `src/features/learning/progress.ts`, and rerun.
- [x] Build responsive learning workspace in `src/components/learning-workspace.tsx` and `src/app/globals.css`, including mode navigation, walkthrough, quiz, practice, hints, editable coding exercise, solution, completion, and locale switching.
- [x] Verify main interactions with RTL and Playwright, run typecheck, lint, tests and production build. Inspect desktop and mobile, then run Impeccable review and record the resulting system.
