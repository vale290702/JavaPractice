---
version: 1
slug: "src-app-teacher-page-tsx"
primary_target: "src/app/teacher/page.tsx"
related_targets: ["src/components/teacher-overview.tsx", "src/app/teacher.css", "src/components/auth/account-controls.tsx"]
---

# Teacher progress overview

Scope: authenticated teacher `/teacher`. Audience and job: review saved student practice completion, account access, per-unit totals, and latest activity. Completion records practice, not a grade.

Chosen direction: the existing code-first Learning lab. Preserve warm paper, green ink, serif hierarchy, and ruled separation. No new seed or comp approval is claimed.

First viewport: wrapping brand/account/language header, back-to-practice link, serif title and muted explanation, followed by a captioned roster. The table presents student identity, overall percentage and count, enabled/disabled access, four unit counts, and locale-formatted latest activity or no-activity text. Empty accounts show the translated empty explanation; a load failure shows an alert with reload. These are content states, not metric cards.

Responsive behavior: 1320px content cap; 46px desktop and 20px mobile inset. At 650px the header wraps. The keyboard-focusable table region scrolls horizontally and references a visible localized mobile scroll hint through `aria-describedby`. Identity columns narrow to a 160px minimum and 180px maximum on mobile; column headings wrap with a 110px minimum. Student and overall completion lead the column order so the first view exposes useful progress before scrolling. English and Spanish copy comes from typed locale resources.

Evidence: `src/components/teacher-overview.tsx`, `src/app/teacher.css`, and `.impeccable/review/teacher/` roster and empty-state captures. Captures use synthetic test accounts; they do not represent real student data. Server access policy and persistence implementation remain code concerns, not visual tokens.
