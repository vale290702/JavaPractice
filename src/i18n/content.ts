export type Locale = 'en' | 'es';
export const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};
export const modes = ['learn', 'example', 'practice', 'quiz', 'code'] as const;
export type Mode = (typeof modes)[number];
export interface Messages {
  brand: string;
  workspace: string;
  course: string;
  courseDetail: string;
  units: string;
  curriculumLabel: string;
  curriculumNote: string;
  greeting: string;
  intro: string;
  language: string;
  modes: Record<Mode, string>;
  goal: string;
  takeaway: string;
  walkthrough: string;
  previous: string;
  next: string;
  step: string;
  of: string;
  output: string;
  noOutput: string;
  practicePrompt: string;
  answer: string;
  check: string;
  retry: string;
  correct: string;
  incorrect: string;
  quizPrompt: string;
  choose: string;
  challengePrompt: string;
  editor: string;
  executionNote: string;
  hint: string;
  hints: string;
  solution: string;
  hideSolution: string;
  reset: string;
  complete: string;
  completed: string;
  progress: string;
  synced: string;
  saving: string;
  saveError: string;
  saveRetry: string;
  storageError: string;
  allDone: string;
  continue: string;
  lesson: string;
  readTime: string;
  topics: string;
  overview: string;
  testCases: string;
  codeSaved: string;
  skip: string;
  unit: string;
  topic: string;
  selectTopic: string;
  previousTopic: string;
  nextTopic: string;
  unitProgress: string;
  sourcePage: string;
  sourceLabel: string;
}
export const messages: Record<Locale, Messages> = {
  en: {
    synced: 'Progress is saved to your account.',
    saving: 'Saving…',
    saveError:
      'We could not save this activity. Check your connection and try again.',
    saveRetry: 'Try saving again',
    brand: 'JavaPractice',
    workspace: 'Your learning space',
    course: 'AP Computer Science A',
    courseDetail: 'A little understanding. A lot of possibility.',
    units: 'Course units',
    curriculumLabel: 'AP CSA · 2025',
    curriculumNote:
      'Aligned to your AP course document. Explanations and activities are original tutoring material.',
    greeting: 'Make sense of Java.',
    intro: 'Explore an idea, follow the code, then make it your own.',
    language: 'Language',
    modes: {
      learn: 'Understand',
      example: 'Walk through',
      practice: 'Practice',
      quiz: 'Quick check',
      code: 'Code it',
    },
    goal: 'What you’ll learn',
    takeaway: 'Keep this in mind',
    walkthrough: 'Follow the program',
    previous: 'Previous step',
    next: 'Next step',
    step: 'Step',
    of: 'of',
    output: 'Console output',
    noOutput: 'The program hasn’t printed anything yet.',
    practicePrompt: 'Think it through',
    answer: 'Your answer',
    check: 'Check answer',
    retry: 'Try again',
    correct: 'You’ve got it.',
    incorrect: 'Not quite yet.',
    quizPrompt: 'A small check, a stronger understanding.',
    choose: 'Choose an answer before checking.',
    challengePrompt: 'Now it’s your turn.',
    editor: 'Java code editor',
    executionNote:
      'Guided exercise: Java execution is not connected yet. Use the checklist to review your code; no compiler tests are being run.',
    hint: 'Show next hint',
    hints: 'Hints',
    solution: 'Reveal solution',
    hideSolution: 'Hide solution',
    reset: 'Reset code',
    complete: 'Mark as understood',
    completed: 'Understood',
    progress: 'Your progress',
    storageError:
      'Your browser could not save your language preference. Progress is saved to your account.',
    allDone: 'You’ve explored every activity in this course.',
    continue: 'Keep learning',
    lesson: 'Lesson',
    readTime: '5–10 min',
    topics: 'topics',
    overview: 'Learning path',
    testCases: 'Review your solution',
    codeSaved:
      'Code is kept while you move between activities in this session.',
    skip: 'Skip to lesson',
    unit: 'Unit',
    topic: 'Topic',
    selectTopic: 'Choose a topic',
    previousTopic: 'Previous topic',
    nextTopic: 'Next topic',
    unitProgress: 'Unit progress',
    sourcePage: 'Source PDF page',
    sourceLabel: 'College Board curriculum · original practice',
  },
  es: {
    synced: 'El progreso se guarda en tu cuenta.',
    saving: 'Guardando…',
    saveError:
      'No pudimos guardar esta actividad. Revisa tu conexión e inténtalo de nuevo.',
    saveRetry: 'Volver a guardar',
    brand: 'JavaPractice',
    workspace: 'Tu espacio de aprendizaje',
    course: 'AP Computer Science A',
    courseDetail: 'Un poco de comprensión. Muchas posibilidades.',
    units: 'Unidades del curso',
    curriculumLabel: 'AP CSA · 2025',
    curriculumNote:
      'Basado en tu documento de AP. Las explicaciones y actividades son material de tutoría original.',
    greeting: 'Dale sentido a Java.',
    intro: 'Explora una idea, sigue el código y luego hazlo tuyo.',
    language: 'Idioma',
    modes: {
      learn: 'Comprende',
      example: 'Paso a paso',
      practice: 'Practica',
      quiz: 'Comprueba',
      code: 'Programa',
    },
    goal: 'Qué aprenderás',
    takeaway: 'Ten esto presente',
    walkthrough: 'Sigue el programa',
    previous: 'Paso anterior',
    next: 'Siguiente paso',
    step: 'Paso',
    of: 'de',
    output: 'Salida de consola',
    noOutput: 'El programa todavía no ha impreso nada.',
    practicePrompt: 'Piensa y resuelve',
    answer: 'Tu respuesta',
    check: 'Comprobar respuesta',
    retry: 'Intentar de nuevo',
    correct: 'Lo entendiste.',
    incorrect: 'Todavía no.',
    quizPrompt: 'Una pequeña prueba para comprender mejor.',
    choose: 'Selecciona una respuesta antes de comprobar.',
    challengePrompt: 'Ahora es tu turno.',
    editor: 'Editor de código Java',
    executionNote:
      'Ejercicio guiado: la ejecución de Java aún no está conectada. Revisa tu código con la lista; no se ejecutan pruebas del compilador.',
    hint: 'Ver siguiente pista',
    hints: 'Pistas',
    solution: 'Mostrar solución',
    hideSolution: 'Ocultar solución',
    reset: 'Restablecer código',
    complete: 'Marcar como comprendido',
    completed: 'Comprendido',
    progress: 'Tu progreso',
    storageError:
      'El navegador no pudo guardar tu preferencia de idioma. El progreso se guarda en tu cuenta.',
    allDone: 'Exploraste todas las actividades de este curso.',
    continue: 'Seguir aprendiendo',
    lesson: 'Lección',
    readTime: '5–10 min',
    topics: 'temas',
    overview: 'Ruta de aprendizaje',
    testCases: 'Revisa tu solución',
    codeSaved:
      'El código se conserva al cambiar de actividad durante esta sesión.',
    skip: 'Ir a la lección',
    unit: 'Unidad',
    topic: 'Tema',
    selectTopic: 'Elige un tema',
    previousTopic: 'Tema anterior',
    nextTopic: 'Tema siguiente',
    unitProgress: 'Progreso de la unidad',
    sourcePage: 'Página del PDF de referencia',
    sourceLabel: 'Temario de College Board · práctica original',
  },
};
