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

Java execution provider, Supabase project credentials, and production deployment target are not yet supplied. Current learning experience has all four units and local progress. Backend integrations are added only when configured.
