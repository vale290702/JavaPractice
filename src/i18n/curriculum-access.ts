export const curriculumAccessMessages = {
  en: {
    title: 'Course access',
    description:
      'Choose the last topic a student can open. Later topics stay locked.',
    student: 'Student',
    through: 'Available through',
    all: 'Entire course',
    none: 'No topics',
    unit: 'Unit',
    fullUnit: 'Entire unit',
    save: 'Save access',
    saving: 'Saving…',
    saved: 'Course access saved.',
    error: 'Course access could not be saved. Try again.',
    locked: 'Locked',
    available: (topic: string) =>
      `Your teacher has opened the course through topic ${topic}.`,
    waiting: 'Your teacher has not opened any topics yet.',
    allAvailableDone: 'You’ve explored every activity your teacher has opened.',
  },
  es: {
    title: 'Acceso al curso',
    description:
      'Elige el último tema que puede abrir cada estudiante. Los temas posteriores quedan bloqueados.',
    student: 'Estudiante',
    through: 'Disponible hasta',
    all: 'Todo el curso',
    none: 'Ningún tema',
    unit: 'Unidad',
    fullUnit: 'Unidad completa',
    save: 'Guardar acceso',
    saving: 'Guardando…',
    saved: 'Acceso al curso guardado.',
    error: 'No se pudo guardar el acceso al curso. Inténtalo de nuevo.',
    locked: 'Bloqueado',
    available: (topic: string) =>
      `Tu maestro habilitó el curso hasta el tema ${topic}.`,
    waiting: 'Tu maestro todavía no ha habilitado ningún tema.',
    allAvailableDone:
      'Exploraste todas las actividades que habilitó tu maestro.',
  },
};
