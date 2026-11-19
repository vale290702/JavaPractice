import type { Locale } from './content';
const en = {
  title: 'Extra Practice',
  empty: 'No additional worksheet is available for this topic.',
  activity: 'Choose a worksheet',
  guided: 'Virtual tutor',
  stepCount: 'Step {current} of {total}',
  previousStep: 'Previous step',
  nextStep: 'Next step',
  tutorProgress: 'Virtual tutor steps',
  independent: 'Try it yourself',
  goal: 'Goal',
  reference: 'What you need to know',
  requirements: 'Task requirements',
  setup: 'Files and how to run',
  algorithmSetup:
    'This is a plain-language algorithm task. Write your ordered steps in Algorithm.txt below. No Java program, compiler, or keyboard input is required. Use the test situations in the requirements to walk through your steps by hand.',
  algorithmWorkflow:
    'Write your plan, label sequence, selection, and repetition, then follow your algorithm by hand for each test situation. Record the result and explain any revision.',
  algorithmExternal:
    'Write your algorithm in plain language, then dry-run it by hand. This activity does not require an IDE.',
  traceAlgorithmHelp:
    'Number the steps you follow, record the changing balance or copy count, and identify each condition and repetition.',
  explanationAlgorithmHelp:
    'Explain how your algorithm uses sequence, selection, and repetition and why it handles both sufficient and insufficient resources.',
  predictionAlgorithmHelp:
    'Predict which path your algorithm will take and how many repetitions it needs for each test situation.',
  resultsAlgorithmHelp:
    'Record the test situation, steps followed, final result, and any revision needed. Compare with your prediction.',
  setupInstructions:
    'Create a Java project in your IDE. Save each Java file below with its exact filename in the same folder, without a package declaration. Add your code to the editable starter; copy reference files exactly and leave them unchanged. Run the class containing main. With a JDK installed, you can also run these commands from that folder:',
  helperInstructions:
    'These complete reference classes are part of the exercise. Copy each into its own file beside your runner; do not reimplement their methods.',
  workflow:
    'Before running, write your predicted output and trace the values in execution order. Then run in your IDE, compare the actual output with your prediction, and explain any correction. Everything required for this exercise is included here.',
  predictionHelp:
    'Write the output you expect before running, including line breaks and labels. For a broken program, predict the compiler problem first.',
  traceHelp:
    'Record values in execution order. For method calls, include arguments, parameters, returned values, and the variable that receives the return.',
  resultsHelp:
    'Record the inputs you used, actual output or compiler messages, and what changed after each test. Compare with your prediction.',
  explanationHelp:
    'Explain why your code works and what you learned. Answer the reflection questions listed in Task requirements.',
  prediction: 'Prediction',
  trace: 'Trace your reasoning',
  results: 'Testing and results',
  explanation: 'Explain what you learned',
  files: 'Your files',
  helpers: 'Reference files · read only',
  output: 'Expected output',
  inputs: 'Inputs',
  external:
    'Run Java in your external IDE. Record your actual results below; this worksheet does not run or grade code.',
  save: 'Save worksheet',
  complete: 'Mark complete',
  completed: 'Completed · self-reported',
  completion:
    'Complete every note and editable file before marking this worksheet complete. Completion records your own report, not a grade.',
  loading: 'Loading saved worksheet…',
  saving: 'Saving…',
  saved: 'Saved to your account',
  dirty: 'Unsaved changes',
  new: 'Ready to begin',
  loadError:
    'Your saved worksheet could not be loaded. Your local draft is preserved. Retry before editing.',
  saveError:
    'Your worksheet could not be saved. Your local draft is preserved; try saving again.',
  conflict:
    'A newer account version is available. Your local draft is preserved. Download it before choosing to replace it with the latest saved version.',
  latest: 'Load latest and replace local draft',
  download: 'Download draft',
  retry: 'Retry loading',
  ended: 'Your session ended. Sign in again to continue.',
  storage:
    'This browser could not keep a local backup. Download your work before leaving.',
  limit:
    'This worksheet exceeds the save limit. Keep notes under 8,000 characters, each file under 32,000 characters, and the full worksheet under 64 KiB.',
  group: 'Workbook topics',
  backup: 'Recovered a local draft. Save explicitly when you are ready.',
};
export const extraPracticeMessages: Record<Locale, typeof en> = {
  en,
  es: {
    title: 'Práctica adicional',
    empty: 'No hay una hoja adicional disponible para este tema.',
    activity: 'Elige una hoja de trabajo',
    guided: 'Tutor virtual',
    stepCount: 'Paso {current} de {total}',
    previousStep: 'Paso anterior',
    nextStep: 'Siguiente paso',
    tutorProgress: 'Pasos del tutor virtual',
    independent: 'Inténtalo por tu cuenta',
    goal: 'Objetivo',
    reference: 'Lo que necesitas saber',
    requirements: 'Requisitos de la tarea',
    setup: 'Archivos y cómo ejecutar',
    algorithmSetup:
      'Esta es una tarea de algoritmos en lenguaje natural. Escribe tus pasos ordenados en Algorithm.txt abajo. No necesitas programa Java, compilador ni entrada del teclado. Usa las situaciones de prueba de los requisitos para recorrer los pasos a mano.',
    algorithmWorkflow:
      'Escribe tu plan, identifica secuencia, selección y repetición y luego recorre tu algoritmo a mano en cada situación de prueba. Registra el resultado y explica las revisiones.',
    algorithmExternal:
      'Escribe tu algoritmo en lenguaje natural y recórrelo a mano. Esta actividad no requiere IDE.',
    traceAlgorithmHelp:
      'Numera los pasos seguidos, registra los cambios del saldo o contador de copias e identifica cada condición y repetición.',
    explanationAlgorithmHelp:
      'Explica cómo tu algoritmo usa secuencia, selección y repetición y por qué contempla recursos suficientes e insuficientes.',
    predictionAlgorithmHelp:
      'Predice qué camino tomará tu algoritmo y cuántas repeticiones necesita en cada situación de prueba.',
    resultsAlgorithmHelp:
      'Registra la situación de prueba, pasos seguidos, resultado final y revisiones necesarias. Compara con tu predicción.',
    setupInstructions:
      'Crea un proyecto Java en tu IDE. Guarda cada archivo Java mostrado con su nombre exacto en la misma carpeta, sin declaración package. Agrega tu código al archivo inicial editable; copia los archivos de referencia exactamente y no los modifiques. Ejecuta la clase que contiene main. Si tienes un JDK instalado, también puedes usar estos comandos desde esa carpeta:',
    helperInstructions:
      'Estas clases de referencia completas son parte del ejercicio. Copia cada una en su propio archivo junto al programa principal; no necesitas reimplementar sus métodos.',
    workflow:
      'Antes de ejecutar, escribe la salida que predices y traza los valores en orden de ejecución. Luego ejecuta en tu IDE, compara la salida real con tu predicción y explica las correcciones. Todo lo necesario para este ejercicio está incluido aquí.',
    predictionHelp:
      'Escribe la salida que esperas antes de ejecutar, con saltos de línea y etiquetas. Si el programa tiene errores, predice primero el problema de compilación.',
    traceHelp:
      'Registra los valores en orden de ejecución. En las llamadas incluye argumentos, parámetros, valores devueltos y la variable que recibe el retorno.',
    resultsHelp:
      'Registra entradas usadas, salida real o mensajes del compilador y lo que cambió en cada prueba. Compara con tu predicción.',
    explanationHelp:
      'Explica por qué funciona tu código y qué aprendiste. Responde las preguntas de reflexión indicadas en Requisitos de la tarea.',
    prediction: 'Predicción',
    trace: 'Traza tu razonamiento',
    results: 'Pruebas y resultados',
    explanation: 'Explica lo que aprendiste',
    files: 'Tus archivos',
    helpers: 'Archivos de referencia · solo lectura',
    output: 'Salida esperada',
    inputs: 'Entradas',
    external:
      'Ejecuta Java en tu IDE externo. Registra tus resultados reales abajo; esta hoja no ejecuta ni califica código.',
    save: 'Guardar hoja',
    complete: 'Marcar como completada',
    completed: 'Completada · según tu reporte',
    completion:
      'Completa todas las notas y los archivos editables antes de marcar la hoja como completada. Se registra tu propio reporte, no una calificación.',
    loading: 'Cargando la hoja guardada…',
    saving: 'Guardando…',
    saved: 'Guardada en tu cuenta',
    dirty: 'Cambios sin guardar',
    new: 'Todo listo para comenzar',
    loadError:
      'No se pudo cargar tu hoja guardada. Tu borrador local se conserva. Reintenta antes de editar.',
    saveError:
      'No se pudo guardar tu hoja. Tu borrador local se conserva; intenta guardar de nuevo.',
    conflict:
      'Hay una versión más reciente en tu cuenta. Tu borrador local se conserva. Descárgalo antes de reemplazarlo con la última versión guardada.',
    latest: 'Cargar última versión y reemplazar borrador local',
    download: 'Descargar borrador',
    retry: 'Reintentar carga',
    ended: 'Tu sesión terminó. Inicia sesión de nuevo para continuar.',
    storage:
      'Este navegador no pudo mantener un respaldo local. Descarga tu trabajo antes de salir.',
    limit:
      'La hoja supera el límite. Usa menos de 8 000 caracteres por nota, 32 000 por archivo y 64 KiB en total.',
    group: 'Temas del cuaderno',
    backup: 'Se recuperó un borrador local. Guarda cuando estés listo.',
  },
};
