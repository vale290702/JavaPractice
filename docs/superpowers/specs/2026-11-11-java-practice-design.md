# JavaPractice initial learning experience

Build a bilingual tutoring workspace in the requested repository. The initial experience follows a sample unit through topic explanation, code walkthrough, guided practice, quiz, and a coding exercise. The study document has not been supplied, so sample content must be labeled and stored independently of UI code.

## Architecture

Next.js App Router, React 19, TypeScript 6, and custom CSS. Locale resources contain all visible copy and educational content. Feature modules own curriculum, assessment, and progress. Reusable UI primitives remain presentation-only. Local progress is versioned and validated when read; persistence failures leave the learning flow usable. Supabase integration must not require secrets for local demonstration.

## Behavior

Students can choose topics and learning modes, switch languages without losing work, move through a code walkthrough, request progressive hints, answer quizzes with explanatory feedback, and deliberately reveal a solution. Progress reflects actual completed activities. Coding submissions require real isolated Java execution; until a provider is configured, the UI must clearly distinguish guided code exercises from compiler verification and must never report fabricated passing tests.

## Scope

Deliver a functional sample learning flow and development foundation. Supabase authentication, cross-device persistence, emails, payments, and remote Java execution are separate integrations, not simulated successful operations.

## Quality

Keyboard operability, visible focus, mobile layouts, reduced-motion support, semantic controls, translated status messages, and no text embedded in presentation components. Test assessment behavior and persistence validation with Vitest, interaction behavior with React Testing Library, and the main bilingual flow with Playwright. Run type checking, production build, lint, and relevant tests before claiming completion.
