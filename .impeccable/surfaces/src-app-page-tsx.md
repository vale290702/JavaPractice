---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/learning-workspace.tsx","src/components/code-panel.tsx","src/components/course-navigation.tsx","src/components/topic-picker.tsx","src/components/auth/account-controls.tsx","src/components/auth/session-boundary.tsx"]
---

# Learning workspace

Scope: authenticated `/`, implemented by `src/app/page.tsx` and the learning workspace. Visitor mode: Operate / Read.

Audience and job: a tutor and tenth-grade Java learner choose a topic, understand an idea, trace its example, practice, check an answer, and write code with progressive help.

Chosen direction: Learning lab, chosen as `lab` with code-first build path in `.impeccable/questions/b9857cbd.answer.json`. No image comp approval is claimed. The initial seed-to-candidate mapping was not retained; `.impeccable/direction.md` discloses the process gap and remains the direction record.

First viewport: account identity and a wrapping logout control join the compact top bar; a fixed four-unit rail and compact top bar frame a serif introduction, source-alignment disclosure, unit heading and in-unit topic picker, PDF-page reference, lesson header, and five activity modes. Explanation and code sit side by side on desktop. On mobile, the four units form a two-column selector, progress appears above the introduction, and lesson content stacks over code.

Memorable moment: stepping through the example changes its highlighted source line, variable watch, console output, and explanation together. Help is progressive; solutions are deliberately revealed.

Content and constraints: the supplied 2025 AP Computer Science A Course and Exam Description grounds four units and 53 numbered topics, with original tutoring lessons and activities. Source references identify PDF pages; the interface discloses alignment and original activities rather than official AP assessment. The topic select and endpoint-disabled previous/next controls navigate within each unit. English and Spanish copy comes from typed locale resources, including prose in variable-watch snapshots; Java identifiers and code tokens retain their source spelling. Progress covers 265 activities and is saved to the authenticated account. Pending completion uses a translated saving label and disables completion; counts and completed styling update only after server confirmation. Save failure leaves the confirmed list intact and displays an inline alert with retry. Locale-storage failure is separate from account-progress persistence. Anonymous legacy progress is not automatically attached to an account. Teacher accounts have a translated header link to `/teacher`. The code editor does not execute Java; external compilation of source examples does not imply a browser runtime. Reduced-motion preferences suppress transitions and activity arrival.

Protected-access states: the workspace is hidden and inert while its session is checking, blocked, or ended. The plain session view supplies translated status, a retry action for temporary failure, and login navigation for an ended session. Logout pending and failure states remain in the header. Source evidence covers these states; the review captures show the healthy workspace with a synthetic test learner, not a provisioned real account.

Implementation status: this managed-access extension is on `feat/managed-login-single-session`; production remains unchanged. Vercel hosting exists. The dedicated Supabase project is configured and a teacher account is provisioned, as recorded in PRODUCT.md. Open decision: Java execution provider. Visual primitives and reusable rules are recorded separately in `DESIGN.md`.

Appearance extension: the shared localized sun/moon control joins the wrapping header preferences. Light appearance retains warm paper and green ink; dark appearance uses navy surfaces with light gray and white accents, including code panels and brand details. Both preserve the Learning Lab hierarchy and ruled layout. A saved preference persists across routes and reloads; without one, appearance follows the device. Semantic palette roles and control states are recorded in `DESIGN.md`. Source evidence: `src/features/appearance/theme.ts`, `src/components/theme-toggle.tsx`, and `src/app/globals.css`; theme review captures are in `/tmp/jp-theme-review/`. This bounded extension is on `feat/theme-editor-indent`; it does not replace the visual world.

Source editing extension: plain Enter preserves leading whitespace and adds four spaces after an opening Java block brace; paired braces receive an indented blank line with the caret inside. Strings and comments do not trigger block indentation. Cancelable mobile line-break input shares the behavior; composition and modified Enter remain native, and Tab moves focus. Evidence: `src/components/java-editor.tsx` and `src/features/learning/editor-indentation.ts`. The editor still does not execute Java.
