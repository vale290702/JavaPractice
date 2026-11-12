---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/learning-workspace.tsx","src/components/code-panel.tsx","src/components/course-navigation.tsx","src/components/topic-picker.tsx"]
---

# Learning workspace

Scope: `/`, implemented by `src/app/page.tsx` and the learning workspace. Visitor mode: Operate / Read.

Audience and job: a tutor and tenth-grade Java learner choose a topic, understand an idea, trace its example, practice, check an answer, and write code with progressive help.

Chosen direction: Learning lab, chosen as `lab` with code-first build path in `.impeccable/questions/b9857cbd.answer.json`. No image comp approval is claimed. The initial seed-to-candidate mapping was not retained; `.impeccable/direction.md` discloses the process gap and remains the direction record.

First viewport: a fixed four-unit rail and compact top bar frame a serif introduction, source-alignment disclosure, unit heading and in-unit topic picker, PDF-page reference, lesson header, and five activity modes. Explanation and code sit side by side on desktop. On mobile, the four units form a two-column selector, progress appears above the introduction, and lesson content stacks over code.

Memorable moment: stepping through the example changes its highlighted source line, variable watch, console output, and explanation together. Help is progressive; solutions are deliberately revealed.

Content and constraints: the supplied 2025 AP Computer Science A Course and Exam Description grounds four units and 53 numbered topics, with original tutoring lessons and activities. Source references identify PDF pages; the interface discloses alignment and original activities rather than official AP assessment. The topic select and endpoint-disabled previous/next controls navigate within each unit. English and Spanish copy comes from typed locale resources, including prose in variable-watch snapshots; Java identifiers and code tokens retain their source spelling. Progress covers 265 activities and is local with storage-error feedback; exact starter IDs migrate. The code editor does not execute Java; external compilation of source examples does not imply a browser runtime. Reduced-motion preferences suppress transitions and activity arrival.

Open decisions: execution provider, backend credentials, and production hosting. Visual primitives and reusable rules are recorded separately in `DESIGN.md`.
