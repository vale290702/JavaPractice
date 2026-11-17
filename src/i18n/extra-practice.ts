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
  source: 'Source PDF pages',
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
    source: 'Páginas del PDF fuente',
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
