# Integrating the supplied AP course document

Extend the existing learning lab rather than changing its visual identity. Four unit buttons stay visible in the course rail; each selects the first topic in that unit. A labeled topic picker lists every official topic in the selected unit, with next/previous topic controls. Existing activity modes remain intact, and Continue crosses unit boundaries in source order.

Content is separated by unit under `src/features/curriculum`. Shared types define localized lessons and language-independent Java samples. The registry supplies navigation, source references, activity validation, and the total activity count. English/Spanish UI resources remain separate from curriculum content.

Keep progress schema version 1 and migrate only exact legacy activity IDs: variables → 1.2, conditions → 2.3, loops → 2.8. Reject unknown and malformed IDs. Preserve completed activities without marking any new work complete. Code drafts remain scoped to their topic in the current session.

Verify all 53 numbered topics, bilingual fields, answer keys, step-array alignment, source-page references, valid Java solutions/starters, navigation through all four units, translation switching, migration, and desktop/mobile overflow. Quizzes are topic quick checks, not official AP exams. Java execution remains explicitly unconnected in the app.
