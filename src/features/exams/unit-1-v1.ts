import type { ExamDefinition } from './types';

export const unit1Exam: ExamDefinition = {
  id: 'unit-1',
  version: 'unit-1-v1',
  title: {
    en: 'Unit 1 Exam · Using Objects and Methods',
    es: 'Examen de la unidad 1 · Uso de objetos y métodos',
  },
  description: {
    en: 'AP Computer Science A · Topics 1.1–1.15 · 100 points. Each topic from 1.1 through 1.15 appears in Section A; Sections B and C combine those skills.',
    es: 'AP Computer Science A · Temas 1.1–1.15 · 100 puntos. Cada tema de 1.1 a 1.15 aparece en la sección A; las secciones B y C combinan esas habilidades.',
  },
  instructions: {
    en: [
      'Artificial intelligence (AI) is not permitted at any point during this exam. Do not use an IDE, compiler, or code runner. Do not compile or execute the code.',
      'Write your own answers in the digital answer fields. You may use only the API notes supplied with the questions.',
      'Section A: choose exactly one answer for each question. Each correct choice earns 2 points.',
      'Section B: answer every part and show code or output when requested. Each question is worth 5 points.',
      'Section C: write complete Java programs using Unit 1 features. Read the required class names, labels, data types, and method contracts carefully. Partial credit is available.',
      'There is no penalty for an incorrect multiple-choice answer. Write clearly and keep the original question numbers.',
    ],
    es: [
      'La inteligencia artificial (IA) no está permitida en ningún momento de este examen. No uses un IDE, compilador ni ejecutor de código. No compiles ni ejecutes el código.',
      'Escribe tus propias respuestas en los campos de respuesta digitales. Solo puedes usar las notas de API proporcionadas con las preguntas.',
      'Sección A: elige exactamente una respuesta para cada pregunta. Cada opción correcta vale 2 puntos.',
      'Sección B: responde cada apartado y muestra código o salida cuando se solicite. Cada pregunta vale 5 puntos.',
      'Sección C: escribe programas Java completos usando las características de la unidad 1. Lee atentamente los nombres de clase, las etiquetas, los tipos de datos y los contratos de métodos requeridos. Se otorga crédito parcial.',
      'No hay penalización por una respuesta de selección múltiple incorrecta. Escribe con claridad y conserva los números originales de las preguntas.',
    ],
  },
  sections: [
    {
      id: 'A',
      title: {
        en: 'Section A · Multiple Choice',
        es: 'Sección A · Selección múltiple',
      },
      description: {
        en: 'Q1–Q15 · Choose one answer per question',
        es: 'P1–P15 · Elige una respuesta por pregunta',
      },
      points: 30,
    },
    {
      id: 'B',
      title: {
        en: 'Section B · Short Response',
        es: 'Sección B · Respuesta corta',
      },
      description: {
        en: 'Q16–Q21 · Answer every part and show code or output when requested.',
        es: 'P16–P21 · Responde cada apartado y muestra código o salida cuando se solicite.',
      },
      points: 30,
    },
    {
      id: 'C',
      title: {
        en: 'Section C · Code Development',
        es: 'Sección C · Desarrollo de código',
      },
      description: {
        en: 'Q22–Q23 · Write complete Java programs using Unit 1 features.',
        es: 'P22–P23 · Escribe programas Java completos usando las características de la unidad 1.',
      },
      points: 40,
    },
  ],
  questions: [
    {
      number: 1,
      section: 'A',
      topics: '1.1',
      points: 2,
      title: {
        en: 'Which problem can the Java compiler detect before the program runs?',
        es: '¿Qué problema puede detectar el compilador de Java antes de que se ejecute el programa?',
      },
      prompt: {
        en: 'Which problem can the Java compiler detect before the program runs?',
        es: '¿Qué problema puede detectar el compilador de Java antes de que se ejecute el programa?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'A program calculates the wrong discount using valid Java.',
            es: 'Un programa calcula un descuento incorrecto usando Java válido.',
          },
        },
        {
          id: 'B',
          text: {
            en: 'A required semicolon is missing from a statement.',
            es: 'Falta un punto y coma obligatorio en una instrucción.',
          },
        },
        {
          id: 'C',
          text: {
            en: 'A user types a different valid name than expected.',
            es: 'Un usuario escribe un nombre válido diferente del esperado.',
          },
        },
        {
          id: 'D',
          text: {
            en: 'A correctly written program prints an unwanted message.',
            es: 'Un programa escrito correctamente imprime un mensaje no deseado.',
          },
        },
      ],
      fields: [
        {
          id: 'q1',
          label: {
            en: 'Which problem can the Java compiler detect before the program runs? (2 points)',
            es: '¿Qué problema puede detectar el compilador de Java antes de que se ejecute el programa? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 2,
      section: 'A',
      topics: '1.2',
      points: 2,
      title: {
        en: 'Which declaration uses the most appropriate primitive type for the number of available seats?',
        es: '¿Qué declaración usa el tipo primitivo más apropiado para el número de asientos disponibles?',
      },
      prompt: {
        en: 'Which declaration uses the most appropriate primitive type for the number of available seats?',
        es: '¿Qué declaración usa el tipo primitivo más apropiado para el número de asientos disponibles?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'boolean seats = true;',
            es: 'boolean seats = true;',
          },
        },
        {
          id: 'B',
          text: {
            en: 'String seats = "20";',
            es: 'String seats = "20";',
          },
        },
        {
          id: 'C',
          text: {
            en: 'int seats = 20;',
            es: 'int seats = 20;',
          },
        },
        {
          id: 'D',
          text: {
            en: 'double seats = 20.5;',
            es: 'double seats = 20.5;',
          },
        },
      ],
      fields: [
        {
          id: 'q2',
          label: {
            en: 'Which declaration uses the most appropriate primitive type for the number of available seats? (2 points)',
            es: '¿Qué declaración usa el tipo primitivo más apropiado para el número de asientos disponibles? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 3,
      section: 'A',
      topics: '1.3',
      points: 2,
      title: {
        en: 'What does this code display? In the choices, / means a line break.',
        es: '¿Qué muestra este código? En las opciones, / significa un salto de línea.',
      },
      prompt: {
        en: 'What does this code display? In the choices, / means a line break.',
        es: '¿Qué muestra este código? En las opciones, / significa un salto de línea.',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'A / B / C',
            es: 'A / B / C',
          },
        },
        {
          id: 'B',
          text: {
            en: 'AB / "C"',
            es: 'AB / "C"',
          },
        },
        {
          id: 'C',
          text: {
            en: 'AB"C" on one line',
            es: 'AB"C" en una sola línea',
          },
        },
        {
          id: 'D',
          text: {
            en: 'AB / C (without quotation marks)',
            es: 'AB / C (sin comillas)',
          },
        },
      ],
      fields: [
        {
          id: 'q3',
          label: {
            en: 'What does this code display? In the choices, / means a line break. (2 points)',
            es: '¿Qué muestra este código? En las opciones, / significa un salto de línea. (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
      code: 'System.out.print("A");\nSystem.out.println("B");\nSystem.out.println("\\"C\\"");',
    },
    {
      number: 4,
      section: 'A',
      topics: '1.4',
      points: 2,
      title: {
        en: 'Assume input is a valid Scanner. Which statement reads an integer and stores it in quantity?',
        es: 'Supón que input es un Scanner válido. ¿Qué instrucción lee un entero y lo almacena en quantity?',
      },
      prompt: {
        en: 'Assume input is a valid Scanner. Which statement reads an integer and stores it in quantity?',
        es: 'Supón que input es un Scanner válido. ¿Qué instrucción lee un entero y lo almacena en quantity?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'int quantity = input.nextInt();',
            es: 'int quantity = input.nextInt();',
          },
        },
        {
          id: 'B',
          text: {
            en: 'input.nextInt(quantity);',
            es: 'input.nextInt(quantity);',
          },
        },
        {
          id: 'C',
          text: {
            en: 'int quantity == input.nextInt();',
            es: 'int quantity == input.nextInt();',
          },
        },
        {
          id: 'D',
          text: {
            en: 'quantity.nextInt();',
            es: 'quantity.nextInt();',
          },
        },
      ],
      fields: [
        {
          id: 'q4',
          label: {
            en: 'Assume input is a valid Scanner. Which statement reads an integer and stores it in quantity? (2 points)',
            es: 'Supón que input es un Scanner válido. ¿Qué instrucción lee un entero y lo almacena en quantity? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 5,
      section: 'A',
      topics: '1.5',
      points: 2,
      title: {
        en: 'Which statement about Java int values and casting is correct?',
        es: '¿Qué afirmación sobre los valores int y las conversiones de tipo en Java es correcta?',
      },
      prompt: {
        en: 'Which statement about Java int values and casting is correct?',
        es: '¿Qué afirmación sobre los valores int y las conversiones de tipo en Java es correcta?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'An int grows automatically to store any integer.',
            es: 'Un int crece automáticamente para almacenar cualquier entero.',
          },
        },
        {
          id: 'B',
          text: {
            en: 'Casting -3.8 to int rounds it down to -4.',
            es: 'Convertir -3.8 a int lo redondea hacia abajo a -4.',
          },
        },
        {
          id: 'C',
          text: {
            en: 'An int has a finite range, and (int) -3.8 is -3.',
            es: 'Un int tiene un rango finito, y (int) -3.8 es -3.',
          },
        },
        {
          id: 'D',
          text: {
            en: 'Integer overflow is always a compile-time error.',
            es: 'El desbordamiento de enteros siempre es un error de compilación.',
          },
        },
      ],
      fields: [
        {
          id: 'q5',
          label: {
            en: 'Which statement about Java int values and casting is correct? (2 points)',
            es: '¿Qué afirmación sobre los valores int y las conversiones de tipo en Java es correcta? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 6,
      section: 'A',
      topics: '1.6',
      points: 2,
      title: {
        en: 'What is printed?',
        es: '¿Qué se imprime?',
      },
      prompt: {
        en: 'What is printed?',
        es: '¿Qué se imprime?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: '1',
            es: '1',
          },
        },
        {
          id: 'B',
          text: {
            en: '2',
            es: '2',
          },
        },
        {
          id: 'C',
          text: {
            en: '3',
            es: '3',
          },
        },
        {
          id: 'D',
          text: {
            en: '4',
            es: '4',
          },
        },
      ],
      fields: [
        {
          id: 'q6',
          label: {
            en: 'What is printed? (2 points)',
            es: '¿Qué se imprime? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
      code: 'int stock = 9;\nstock %= 4;\nstock++;\nSystem.out.println(stock);',
    },
    {
      number: 7,
      section: 'A',
      topics: '1.7',
      points: 2,
      title: {
        en: 'Which description correctly distinguishes a library, an API, and API documentation?',
        es: '¿Qué descripción distingue correctamente una biblioteca, una API y la documentación de una API?',
      },
      prompt: {
        en: 'Which description correctly distinguishes a library, an API, and API documentation?',
        es: '¿Qué descripción distingue correctamente una biblioteca, una API y la documentación de una API?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'A library is documentation; its API is a running program.',
            es: 'Una biblioteca es documentación; su API es un programa en ejecución.',
          },
        },
        {
          id: 'B',
          text: {
            en: 'An API is only a website with examples.',
            es: 'Una API es solamente un sitio web con ejemplos.',
          },
        },
        {
          id: 'C',
          text: {
            en: 'Documentation executes the methods in a library.',
            es: 'La documentación ejecuta los métodos de una biblioteca.',
          },
        },
        {
          id: 'D',
          text: {
            en: 'A library supplies reusable code; an API exposes usable features; documentation describes how to use them.',
            es: 'Una biblioteca proporciona código reutilizable; una API expone funciones utilizables; la documentación describe cómo usarlas.',
          },
        },
      ],
      fields: [
        {
          id: 'q7',
          label: {
            en: 'Which description correctly distinguishes a library, an API, and API documentation? (2 points)',
            es: '¿Qué descripción distingue correctamente una biblioteca, una API y la documentación de una API? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 8,
      section: 'A',
      topics: '1.8',
      points: 2,
      title: {
        en: 'A comment says: Precondition: amount >= 0. What does that comment do?',
        es: 'Un comentario dice: Precondition: amount >= 0. ¿Qué hace ese comentario?',
      },
      prompt: {
        en: 'A comment says: Precondition: amount >= 0. What does that comment do?',
        es: 'Un comentario dice: Precondition: amount >= 0. ¿Qué hace ese comentario?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'Automatically rejects negative arguments.',
            es: 'Rechaza automáticamente los argumentos negativos.',
          },
        },
        {
          id: 'B',
          text: {
            en: 'States a requirement that the caller must respect unless the code validates it.',
            es: 'Establece un requisito que quien llama debe respetar, a menos que el código lo valide.',
          },
        },
        {
          id: 'C',
          text: {
            en: 'Makes amount a constant.',
            es: 'Convierte amount en una constante.',
          },
        },
        {
          id: 'D',
          text: {
            en: 'Returns true when amount is nonnegative.',
            es: 'Devuelve true cuando amount no es negativo.',
          },
        },
      ],
      fields: [
        {
          id: 'q8',
          label: {
            en: 'A comment says: Precondition: amount >= 0. What does that comment do? (2 points)',
            es: 'Un comentario dice: Precondition: amount >= 0. ¿Qué hace ese comentario? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 9,
      section: 'A',
      topics: '1.9',
      points: 2,
      title: {
        en: 'What is the signature of this method?',
        es: '¿Cuál es la firma de este método?',
      },
      prompt: {
        en: 'What is the signature of this method?',
        es: '¿Cuál es la firma de este método?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'double area',
            es: 'double area',
          },
        },
        {
          id: 'B',
          text: {
            en: 'area(width, height)',
            es: 'area(width, height)',
          },
        },
        {
          id: 'C',
          text: {
            en: 'area(int, double)',
            es: 'area(int, double)',
          },
        },
        {
          id: 'D',
          text: {
            en: 'public static area',
            es: 'public static area',
          },
        },
      ],
      fields: [
        {
          id: 'q9',
          label: {
            en: 'What is the signature of this method? (2 points)',
            es: '¿Cuál es la firma de este método? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
      code: 'public static double area(int width, double height)',
    },
    {
      number: 10,
      section: 'A',
      topics: '1.10',
      points: 2,
      title: {
        en: 'Which statement correctly calls the class method parseInt in Java Integer?',
        es: '¿Qué instrucción llama correctamente al método de clase parseInt de Integer en Java?',
      },
      prompt: {
        en: 'Which statement correctly calls the class method parseInt in Java Integer?',
        es: '¿Qué instrucción llama correctamente al método de clase parseInt de Integer en Java?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'int value = Integer.parseInt("12");',
            es: 'int value = Integer.parseInt("12");',
          },
        },
        {
          id: 'B',
          text: {
            en: 'int value = Integer.parseInt;',
            es: 'int value = Integer.parseInt;',
          },
        },
        {
          id: 'C',
          text: {
            en: 'Integer("12").parseInt();',
            es: 'Integer("12").parseInt();',
          },
        },
        {
          id: 'D',
          text: {
            en: 'int value = parseInt.Integer("12");',
            es: 'int value = parseInt.Integer("12");',
          },
        },
      ],
      fields: [
        {
          id: 'q10',
          label: {
            en: 'Which statement correctly calls the class method parseInt in Java Integer? (2 points)',
            es: '¿Qué instrucción llama correctamente al método de clase parseInt de Integer en Java? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 11,
      section: 'A',
      topics: '1.11',
      points: 2,
      title: {
        en: 'Which expression can produce every integer from 10 through 15, with both endpoints included?',
        es: '¿Qué expresión puede producir todos los enteros desde 10 hasta 15, incluidos ambos extremos?',
      },
      prompt: {
        en: 'Which expression can produce every integer from 10 through 15, with both endpoints included?',
        es: '¿Qué expresión puede producir todos los enteros desde 10 hasta 15, incluidos ambos extremos?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: '(int) Math.random() * 6 + 10',
            es: '(int) Math.random() * 6 + 10',
          },
        },
        {
          id: 'B',
          text: {
            en: '(int) (Math.random() * 5) + 10',
            es: '(int) (Math.random() * 5) + 10',
          },
        },
        {
          id: 'C',
          text: {
            en: '(int) (Math.random() * 6) + 10',
            es: '(int) (Math.random() * 6) + 10',
          },
        },
        {
          id: 'D',
          text: {
            en: '(int) (Math.random() * 6) + 9',
            es: '(int) (Math.random() * 6) + 9',
          },
        },
      ],
      fields: [
        {
          id: 'q11',
          label: {
            en: 'Which expression can produce every integer from 10 through 15, with both endpoints included? (2 points)',
            es: '¿Qué expresión puede producir todos los enteros desde 10 hasta 15, incluidos ambos extremos? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 12,
      section: 'A',
      topics: '1.12',
      points: 2,
      title: {
        en: 'In Rectangle selection = new Rectangle(4, 3);, which statement is correct?',
        es: 'En Rectangle selection = new Rectangle(4, 3);, ¿qué afirmación es correcta?',
      },
      prompt: {
        en: 'In Rectangle selection = new Rectangle(4, 3);, which statement is correct?',
        es: 'En Rectangle selection = new Rectangle(4, 3);, ¿qué afirmación es correcta?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'selection is the class, and Rectangle is the object.',
            es: 'selection es la clase y Rectangle es el objeto.',
          },
        },
        {
          id: 'B',
          text: {
            en: 'Rectangle is a class; selection stores a reference to an instance.',
            es: 'Rectangle es una clase; selection almacena una referencia a una instancia.',
          },
        },
        {
          id: 'C',
          text: {
            en: 'The variable stores the entire class definition.',
            es: 'La variable almacena toda la definición de la clase.',
          },
        },
        {
          id: 'D',
          text: {
            en: 'All objects of the class must share the same dimensions.',
            es: 'Todos los objetos de la clase deben compartir las mismas dimensiones.',
          },
        },
      ],
      fields: [
        {
          id: 'q12',
          label: {
            en: 'In Rectangle selection = new Rectangle(4, 3);, which statement is correct? (2 points)',
            es: 'En Rectangle selection = new Rectangle(4, 3);, ¿qué afirmación es correcta? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 13,
      section: 'A',
      topics: '1.13',
      points: 2,
      title: {
        en: 'The Java Rectangle API offers Rectangle() and Rectangle(int width, int height). Which signature matches new Rectangle(4, 3)?',
        es: 'La API Rectangle de Java ofrece Rectangle() y Rectangle(int width, int height). ¿Qué firma corresponde a new Rectangle(4, 3)?',
      },
      prompt: {
        en: 'The Java Rectangle API offers Rectangle() and Rectangle(int width, int height). Which signature matches new Rectangle(4, 3)?',
        es: 'La API Rectangle de Java ofrece Rectangle() y Rectangle(int width, int height). ¿Qué firma corresponde a new Rectangle(4, 3)?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'Rectangle()',
            es: 'Rectangle()',
          },
        },
        {
          id: 'B',
          text: {
            en: 'Rectangle(double, double)',
            es: 'Rectangle(double, double)',
          },
        },
        {
          id: 'C',
          text: {
            en: 'Rectangle(int, int)',
            es: 'Rectangle(int, int)',
          },
        },
        {
          id: 'D',
          text: {
            en: 'Rectangle(String, int)',
            es: 'Rectangle(String, int)',
          },
        },
      ],
      fields: [
        {
          id: 'q13',
          label: {
            en: 'The Java Rectangle API offers Rectangle() and Rectangle(int width, int height). Which signature matches new Rectangle(4, 3)? (2 points)',
            es: 'La API Rectangle de Java ofrece Rectangle() y Rectangle(int width, int height). ¿Qué firma corresponde a new Rectangle(4, 3)? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 14,
      section: 'A',
      topics: '1.14',
      points: 2,
      title: {
        en: 'Assume java.awt.Rectangle is imported. What happens when this code runs?',
        es: 'Supón que java.awt.Rectangle está importado. ¿Qué ocurre cuando se ejecuta este código?',
      },
      prompt: {
        en: 'Assume java.awt.Rectangle is imported. What happens when this code runs?',
        es: 'Supón que java.awt.Rectangle está importado. ¿Qué ocurre cuando se ejecuta este código?',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'It prints 0.0.',
            es: 'Imprime 0.0.',
          },
        },
        {
          id: 'B',
          text: {
            en: 'It creates an empty Rectangle.',
            es: 'Crea un Rectangle vacío.',
          },
        },
        {
          id: 'C',
          text: {
            en: 'It cannot compile because null is not allowed for references.',
            es: 'No puede compilar porque null no está permitido para referencias.',
          },
        },
        {
          id: 'D',
          text: {
            en: 'It throws NullPointerException at runtime.',
            es: 'Lanza NullPointerException durante la ejecución.',
          },
        },
      ],
      fields: [
        {
          id: 'q14',
          label: {
            en: 'Assume java.awt.Rectangle is imported. What happens when this code runs? (2 points)',
            es: 'Supón que java.awt.Rectangle está importado. ¿Qué ocurre cuando se ejecuta este código? (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
      code: 'Rectangle picture = null;\nSystem.out.println(picture.getWidth());',
    },
    {
      number: 15,
      section: 'A',
      topics: '1.15',
      points: 2,
      title: {
        en: 'Which expression checks whether a String variable name has exactly the same characters as "Ana"? Assume name is not null.',
        es: '¿Qué expresión comprueba si una variable String llamada name tiene exactamente los mismos caracteres que "Ana"? Supón que name no es null.',
      },
      prompt: {
        en: 'Which expression checks whether a String variable name has exactly the same characters as "Ana"? Assume name is not null.',
        es: '¿Qué expresión comprueba si una variable String llamada name tiene exactamente los mismos caracteres que "Ana"? Supón que name no es null.',
      },
      options: [
        {
          id: 'A',
          text: {
            en: 'name.equals("Ana")',
            es: 'name.equals("Ana")',
          },
        },
        {
          id: 'B',
          text: {
            en: 'name = "Ana"',
            es: 'name = "Ana"',
          },
        },
        {
          id: 'C',
          text: {
            en: 'name.length("Ana")',
            es: 'name.length("Ana")',
          },
        },
        {
          id: 'D',
          text: {
            en: 'name.substring("Ana")',
            es: 'name.substring("Ana")',
          },
        },
      ],
      fields: [
        {
          id: 'q15',
          label: {
            en: 'Which expression checks whether a String variable name has exactly the same characters as "Ana"? Assume name is not null. (2 points)',
            es: '¿Qué expresión comprueba si una variable String llamada name tiene exactamente los mismos caracteres que "Ana"? Supón que name no es null. (2 puntos)',
          },
          kind: 'choice',
          points: 2,
        },
      ],
    },
    {
      number: 16,
      section: 'B',
      topics: '1.1',
      points: 5,
      title: {
        en: 'Sequence and error types',
        es: 'Secuencia y tipos de errores',
      },
      prompt: {
        en: 'Answer each part. Do not run any code.',
        es: 'Responde cada apartado. No ejecutes ningún código.',
      },
      fields: [
        {
          id: 'q16a',
          label: {
            en: 'a) Write these steps in the correct order for a receipt program: print the receipt; read price and quantity; calculate the total. (2 points)',
            es: 'a) Escribe estos pasos en el orden correcto para un programa de recibos: imprimir el recibo; leer el precio y la cantidad; calcular el total. (2 puntos)',
          },
          kind: 'text',
          points: 2,
        },
        {
          id: 'q16b',
          label: {
            en: 'b) Classify the error in System.out.println("Ready") when the required semicolon is omitted: syntax, runtime, or logic. (1 point)',
            es: 'b) Clasifica el error en System.out.println("Ready") cuando se omite el punto y coma obligatorio: sintaxis, ejecución o lógica. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q16c',
          label: {
            en: 'c) A program computes an average with 7 / 2 and stores it in a double. It runs but reports the wrong average. Classify the error. (1 point)',
            es: 'c) Un programa calcula un promedio con 7 / 2 y lo almacena en un double. Se ejecuta pero muestra un promedio incorrecto. Clasifica el error. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q16d',
          label: {
            en: 'd) String name = null; System.out.println(name.length()); Classify the error that occurs when this executes. (1 point)',
            es: 'd) String name = null; System.out.println(name.length()); Clasifica el error que ocurre al ejecutarse. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
      ],
    },
    {
      number: 17,
      section: 'B',
      topics: '1.2–1.6',
      points: 5,
      title: {
        en: 'Trace arithmetic and casts',
        es: 'Seguimiento de aritmética y conversiones',
      },
      prompt: {
        en: 'Write the five output lines in order. Each correct line is worth 1 point.',
        es: 'Escribe las cinco líneas de salida en orden. Cada línea correcta vale 1 punto.',
      },
      fields: [
        {
          id: 'q17output',
          label: {
            en: 'Write the five output lines in order. Each correct line is worth 1 point. (5 points)',
            es: 'Escribe las cinco líneas de salida en orden. Cada línea correcta vale 1 punto. (5 puntos)',
          },
          kind: 'output',
          points: 5,
        },
      ],
      code: 'int count = 7;\ncount += 3;\ncount /= 4;\nSystem.out.println(count);\nSystem.out.println(7 / 2);\nSystem.out.println(7 / 2.0);\nSystem.out.println((int) -3.8);\nSystem.out.println((int) (3.6 + 0.5));',
    },
    {
      number: 18,
      section: 'B',
      topics: '1.7–1.10',
      points: 5,
      title: {
        en: 'Read a documented class method',
        es: 'Lectura de un método de clase documentado',
      },
      prompt: {
        en: 'Assume this supplied code is saved as TicketTools.java.',
        es: 'Supón que este código proporcionado está guardado como TicketTools.java.',
      },
      fields: [
        {
          id: 'q18a',
          label: {
            en: 'a) Write the method signature. (1 point)',
            es: 'a) Escribe la firma del método. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q18b',
          label: {
            en: 'b) From a different class, call the method with 3 tickets at price 500 and store the result in an int named cost. (1 point)',
            es: 'b) Desde otra clase, llama al método con 3 boletos a precio 500 y almacena el resultado en un int llamado cost. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q18c',
          label: {
            en: 'c) Does the precondition comment automatically block a negative argument? Explain briefly. (1 point)',
            es: 'c) ¿El comentario de precondición bloquea automáticamente un argumento negativo? Explica brevemente. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q18d',
          label: {
            en: 'd) Is the comment API documentation or a method call? (1 point)',
            es: 'd) ¿El comentario es documentación de la API o una llamada a un método? (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q18e',
          label: {
            en: 'e) Does return tickets * price; display a value on the screen? Explain what it does. (1 point)',
            es: 'e) ¿return tickets * price; muestra un valor en la pantalla? Explica qué hace. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
      ],
      code: 'public class TicketTools {\n    /** Pre: tickets >= 0 and price >= 0.\n     *  Post: returns tickets multiplied by price. */\n    public static int total(int tickets, int price) {\n        return tickets * price;\n    }\n}',
    },
    {
      number: 19,
      section: 'B',
      topics: '1.12–1.13',
      points: 5,
      title: {
        en: 'Classes, references, and constructors',
        es: 'Clases, referencias y constructores',
      },
      prompt: {
        en: 'The Java Rectangle API supplies Rectangle() and Rectangle(int, int). Assume the import is present.',
        es: 'La API Rectangle de Java proporciona Rectangle() y Rectangle(int, int). Supón que la importación está presente.',
      },
      fields: [
        {
          id: 'q19a',
          label: {
            en: 'a) How many Rectangle objects are created by these two lines? (1 point)',
            es: 'a) ¿Cuántos objetos Rectangle crean estas dos líneas? (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q19b',
          label: {
            en: 'b) Name the reference type and both reference variables. (1 point)',
            es: 'b) Indica el tipo de referencia y ambas variables de referencia. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q19c',
          label: {
            en: 'c) Write the constructor signature used by each line. (2 points)',
            es: 'c) Escribe la firma del constructor usado por cada línea. (2 puntos)',
          },
          kind: 'text',
          points: 2,
        },
        {
          id: 'q19d',
          label: {
            en: 'd) Name the root Java class from which all Java classes ultimately inherit. (1 point)',
            es: 'd) Indica la clase raíz de Java de la que heredan, en última instancia, todas las clases de Java. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
      ],
      code: 'Rectangle first = new Rectangle(4, 3);\nRectangle second = new Rectangle();',
    },
    {
      number: 20,
      section: 'B',
      topics: '1.14',
      points: 5,
      title: {
        en: 'Getter, setter, return, and print',
        es: 'Getter, setter, return e impresión',
      },
      prompt: {
        en: 'API: getWidth() returns the width as double; setSize(int, int) changes width and height and returns void.',
        es: 'API: getWidth() devuelve el ancho como double; setSize(int, int) cambia el ancho y el alto y devuelve void.',
      },
      fields: [
        {
          id: 'q20a',
          label: {
            en: 'a) Write the two output lines in order. (2 points)',
            es: 'a) Escribe las dos líneas de salida en orden. (2 puntos)',
          },
          kind: 'text',
          points: 2,
        },
        {
          id: 'q20b',
          label: {
            en: 'b) Identify the getter and setter calls. (1 point)',
            es: 'b) Identifica las llamadas al getter y al setter. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q20c',
          label: {
            en: 'c) What does a return statement inside a getter do? (1 point)',
            es: 'c) ¿Qué hace una instrucción return dentro de un getter? (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q20d',
          label: {
            en: 'd) Why would System.out.println(picture.setSize(2, 2)); fail to compile? (1 point)',
            es: 'd) ¿Por qué System.out.println(picture.setSize(2, 2)); no compilaría? (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
      ],
      code: 'Rectangle picture = new Rectangle(4, 3);\ndouble saved = picture.getWidth();\npicture.setSize(8, 6);\nSystem.out.println(saved);\nSystem.out.println(picture.getWidth());',
    },
    {
      number: 21,
      section: 'B',
      topics: '1.15',
      points: 5,
      title: {
        en: 'Read and extract text',
        es: 'Lectura y extracción de texto',
      },
      prompt: {
        en: 'Use String word = "BANANA";. Answer each part independently; each is worth 1 point.',
        es: 'Usa String word = "BANANA";. Responde cada apartado de forma independiente; cada uno vale 1 punto.',
      },
      fields: [
        {
          id: 'q21a',
          label: {
            en: 'a) What is the value of word.length()? (1 point)',
            es: 'a) ¿Cuál es el valor de word.length()? (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q21b',
          label: {
            en: 'b) What text is returned by word.substring(1, 4)? (1 point)',
            es: 'b) ¿Qué texto devuelve word.substring(1, 4)? (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q21c',
          label: {
            en: 'c) What value is returned by word.indexOf("NA")? (1 point)',
            es: 'c) ¿Qué valor devuelve word.indexOf("NA")? (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q21d',
          label: {
            en: 'd) Is word.compareTo("BAND") negative, zero, or positive? You do not need its exact value. (1 point)',
            es: 'd) ¿word.compareTo("BAND") es negativo, cero o positivo? No necesitas su valor exacto. (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
        {
          id: 'q21e',
          label: {
            en: 'e) After word.substring(1, 4); runs without an assignment, what does System.out.println(word); display? (1 point)',
            es: 'e) Después de ejecutar word.substring(1, 4); sin una asignación, ¿qué muestra System.out.println(word);? (1 punto)',
          },
          kind: 'text',
          points: 1,
        },
      ],
    },
    {
      number: 22,
      section: 'C',
      topics: '1.1–1.5, 1.11',
      points: 20,
      title: {
        en: 'Write GoalReport.java',
        es: 'Escribe GoalReport.java',
      },
      prompt: {
        en: 'Write a complete Java program named GoalReport. A student records a target, actual study minutes, and a number of study sessions. Read three integers in that order with Scanner. Assume goal and actual are nonnegative and sessions is greater than zero. Do not write input prompts.\n\nREQUIREMENTS\n1. Include the Scanner import, public class, and main method.\n2. Read goal, actual, and sessions, in that order.\n3. Calculate average minutes per session as a double. Preserve a fractional result when needed.\n4. Use Math.abs to calculate how far actual is from goal, regardless of which is larger.\n5. Print five lines, in order, with these exact labels: Goal: , Actual: , Sessions: , Average: , Difference: . Add each corresponding value after its label.\n\nSUPPLIED API / METHOD NOTES\nScanner input = new Scanner(System.in); creates a keyboard reader. input.nextInt() returns an int.\nMath.abs(int) returns the absolute value as int. No import is needed for Math.\nExample input, one integer per line: 60 / 45 / 2. Predict the output in the output field; no output is supplied.',
        es: 'Escribe un programa Java completo llamado GoalReport. Un estudiante registra una meta, los minutos reales de estudio y un número de sesiones de estudio. Lee tres enteros en ese orden con Scanner. Supón que goal y actual no son negativos y que sessions es mayor que cero. No escribas mensajes para solicitar la entrada.\n\nREQUISITOS\n1. Incluye la importación de Scanner, la clase pública y el método main.\n2. Lee goal, actual y sessions, en ese orden.\n3. Calcula el promedio de minutos por sesión como double. Conserva un resultado fraccionario cuando sea necesario.\n4. Usa Math.abs para calcular la distancia entre actual y goal, independientemente de cuál sea mayor.\n5. Imprime cinco líneas, en orden, con estas etiquetas exactas: Goal: , Actual: , Sessions: , Average: , Difference: . Agrega el valor correspondiente después de cada etiqueta.\n\nAPI / NOTAS DE MÉTODOS PROPORCIONADAS\nScanner input = new Scanner(System.in); crea un lector de teclado. input.nextInt() devuelve un int.\nMath.abs(int) devuelve el valor absoluto como int. Math no requiere importación.\nEntrada de ejemplo, un entero por línea: 60 / 45 / 2. Predice la salida en el campo de salida; no se proporciona la salida.',
      },
      fields: [
        {
          id: 'q22code',
          label: {
            en: 'Write your complete Java program GoalReport.java. (20 points)',
            es: 'Escribe tu programa Java completo GoalReport.java. (20 puntos)',
          },
          kind: 'code',
          points: 20,
        },
        {
          id: 'q22output',
          label: {
            en: 'Predict the five output lines for input 60 / 45 / 2. Practice, not separately scored. (0 points)',
            es: 'Predice las cinco líneas de salida para la entrada 60 / 45 / 2. Práctica, sin puntuación independiente. (0 puntos)',
          },
          kind: 'output',
          points: 0,
        },
      ],
    },
    {
      number: 23,
      section: 'C',
      topics: '1.2–1.4, 1.12–1.15',
      points: 20,
      title: {
        en: 'Write PhotoReport.java',
        es: 'Escribe PhotoReport.java',
      },
      prompt: {
        en: 'Write a complete Java program named PhotoReport. Use the real Java class java.awt.Rectangle to represent a rectangular image selection. This task does not open or draw a window.\n\nREQUIREMENTS\n1. Declare String title = "School Photo";. Create one Rectangle named photo with width 4 and height 3.\n2. Use the getters to calculate the original area as a double. Do this before resizing.\n3. Print Title: followed by the full title, Prefix: followed by the first six characters using substring, and Area: followed by the original area. Put each on its own line.\n4. Call setSize to change the same object to width 8 and height 6.\n5. Print Width: and Height: followed by the new getter results, on two separate lines. Include a space after every colon in the output labels.\n\nSUPPLIED API / METHOD NOTES\nImport java.awt.Rectangle. Rectangle(int width, int height) constructs an object. getWidth() and getHeight() return double. setSize(int width, int height) changes both dimensions and returns void. String.substring(from, to) includes from and excludes to.\nUse the fixed values above. Write the five expected output lines after your code in the output field.',
        es: 'Escribe un programa Java completo llamado PhotoReport. Usa la clase real de Java java.awt.Rectangle para representar una selección rectangular de una imagen. Esta tarea no abre ni dibuja una ventana.\n\nREQUISITOS\n1. Declara String title = "School Photo";. Crea un Rectangle llamado photo con ancho 4 y alto 3.\n2. Usa los getters para calcular el área original como double. Hazlo antes de cambiar el tamaño.\n3. Imprime Title: seguido del título completo, Prefix: seguido de los primeros seis caracteres usando substring y Area: seguido del área original. Coloca cada uno en su propia línea.\n4. Llama a setSize para cambiar el mismo objeto a ancho 8 y alto 6.\n5. Imprime Width: y Height: seguidos de los nuevos resultados de los getters, en dos líneas separadas. Incluye un espacio después de cada signo de dos puntos en las etiquetas de salida.\n\nAPI / NOTAS DE MÉTODOS PROPORCIONADAS\nImporta java.awt.Rectangle. Rectangle(int width, int height) construye un objeto. getWidth() y getHeight() devuelven double. setSize(int width, int height) cambia ambas dimensiones y devuelve void. String.substring(from, to) incluye from y excluye to.\nUsa los valores fijos anteriores. Escribe las cinco líneas de salida esperadas después de tu código en el campo de salida.',
      },
      fields: [
        {
          id: 'q23code',
          label: {
            en: 'Write your complete Java program PhotoReport.java. The program and predicted output are scored together. (20 points total)',
            es: 'Escribe tu programa Java completo PhotoReport.java. El programa y la salida predicha se califican juntos. (20 puntos en total)',
          },
          kind: 'code',
        },
        {
          id: 'q23output',
          label: {
            en: 'Predict the five output lines using the fixed values above. Included in the question’s 20 points.',
            es: 'Predice las cinco líneas de salida usando los valores fijos anteriores. Incluido en los 20 puntos de la pregunta.',
          },
          kind: 'output',
        },
      ],
    },
  ],
};
