# JavaPractice

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Requested: Next.js 16, React 19, TypeScript 6, custom CSS; Vitest, React Testing Library, Playwright, ESLint, Prettier; Node.js 22.12+. Supabase PostgreSQL, Auth, Storage and Deno Edge Functions are the intended backend. Resend and SINPE receipt uploads are future integrations.

## Users

A tutor teaching Java to a tenth-grade student, and the student practicing independently.

## Product Purpose

Make Java units understandable through interactive topics, examples, practice, quizzes, coding challenges, progressive hints, and step-by-step explanations.

## Operating Context

Used during tutoring and independent study. Source curriculum is the user-supplied AP Computer Science A Course and Exam Description, © 2025 College Board (194 PDF pages).

## Capabilities and Constraints

English and Spanish translations; no user-facing text hardcoded in UI components. Maintain clear module boundaries and accessible responsive interfaces. Repository: https://github.com/vale290702/JavaPractice.

## Evidence on Hand

The source PDF is at `/Users/valecharpentier/Downloads/ap-computer-science-a-course-and-exam-description.pdf`. Four units contain 15, 12, 9, and 17 topics. Source notes are recorded in `docs/curriculum/source.md`. The PDF is not redistributed. Original tutoring lessons are aligned to all 53 topic numbers, with English/Spanish content and original quick checks; no claim of official AP assessment or exhaustive exam preparation.

## Product Principles

- Explain reasoning before revealing answers.
- Keep hints progressive and solutions deliberate.
- Keep translated content separate from presentation.
- Separate assessment logic, persistence, and integrations.

## Open Decisions

A Java execution provider is not yet supplied. A dedicated Supabase project is configured for managed accounts and progress. Production is hosted on Vercel in the Atrizon workspace. Production has all four units, account progress synchronization, teacher progress, and selectable light/navy appearances. Backend integrations are added only when configured.

## Managed Access

Approved: login-only, tutor-provisioned accounts, no public registration. A successful new login replaces the old device’s active application session. Backend session checks protect curriculum delivery; progress is stored per account in Supabase and teacher accounts can view student summaries. English/Spanish login, logout, and session messages retain the learning-lab identity. Managed access and the teacher overview are deployed. The dedicated JavaPractice Supabase project is configured with migrations and public signup disabled; the first teacher account is provisioned. Credentials remain in private local files. Vercel hosting already exists under Atrizon; new feature branches must not change main’s live deployment without integration.

## Extra Practice (feature branch)

Approved: adapt the two supplied workbooks for topics 1.1–1.10 into 14 activities / 28 guided and independent worksheets. Interactive prediction, trace, named code files, external test evidence, and explanation are saved per account. Helpers stay read-only; completion is self-reported and separate from regular course progress. Topics outside this coverage show an availability state. EN/ES and both appearances are preserved. Implementation is on `feat/extra-practice-workbooks`; the additive backend migration is configured, but this interface is not deployed until integrated.
