import type { ExtraActivity } from './types';
import { practiceGuides } from './guides.ts';
import { unit2ExtraActivities } from './unit-2.ts';

// Adapted from the supplied student workbooks. Page numbers refer to each activity's group PDF.
// Only printed targets supplied by the workbook appear as expectedOutput; predictions remain student work.
const activities: (Omit<ExtraActivity, 'guide' | 'id'> & {
  id: keyof typeof practiceGuides;
})[] = [
  {
    id: 'a1',
    topicId: '1.1',
    group: '1.1–1.5',
    title: {
      en: 'ASCII art: one line at a time',
      es: 'Arte ASCII: una línea a la vez',
    },
    goal: {
      en: 'Print five lines with one println per line. Preserve spaces and punctuation.',
      es: 'Imprimir cinco líneas con una llamada println por línea. Conservar espacios y puntuación.',
    },
    guided: {
      id: 'a1-guided',
      prompt: {
        en: 'Re-create the puppy shown below. Each printed line must contain 13 characters, including spaces. The ruler is a counting aid; do not print it. Counting ruler (do not print): 1234567890123',
        es: 'Reproduce el cachorro mostrado. Cada línea impresa debe tener 13 caracteres, incluidos los espacios. La regla sirve para contar; no la imprimas. Regla para contar (no imprimir): 1234567890123',
      },
      steps: {
        en: [
          'Count the rows before coding: you need five println calls.',
          'Copy one row inside straight double quotes. Keep every space.',
          'Finish the call with ); and repeat for each row.',
          'Run and compare the shape. Count spaces at the end as characters.',
        ],
        es: [
          'Cuenta las filas antes de programar: necesitas cinco llamadas println.',
          'Copia una fila entre comillas dobles rectas. Conserva todos los espacios.',
          'Termina la llamada con ); y repite para cada fila.',
          'Ejecuta y compara la figura. Cuenta también los espacios finales.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [3],
      expectedOutput:
        "  __         \no-''|)_____/)\n|__/|_)     )\n   |  __  /  \n   (_/ (_/   ",
    },
    independent: {
      id: 'a1-independent',
      prompt: {
        en: 'Create the five-line house below. Use five println calls. Each printed row must contain 9 characters. Do not print the ruler. Counting ruler (do not print): 123456789',
        es: 'Crea la casa de cinco líneas mostrada. Usa cinco llamadas println. Cada fila impresa debe tener 9 caracteres. No imprimas la regla. Regla para contar (no imprimir): 123456789',
      },
      steps: {
        en: [
          'Copy the house exactly, including leading and trailing spaces.',
          'A printed backslash needs the Java escape \\\\ inside the String.',
          'Predict the five lines, run, and count each line.',
        ],
        es: [
          'Copia la casa exactamente, incluidos los espacios iniciales y finales.',
          'Para imprimir una barra invertida, usa el escape de Java \\\\ dentro del String.',
          'Predice las cinco líneas, ejecuta y cuenta cada línea.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [4],
      expectedOutput: '    ^    \n   / \\   \n  /___\\  \n  |   |  \n  |___|  ',
    },
    helpers: [],
  },
  {
    id: 'a2',
    topicId: '1.1',
    group: '1.1–1.5',
    title: {
      en: 'Debugging quotes and recording evidence',
      es: 'Depurar comillas y registrar evidencia',
    },
    goal: {
      en: 'Use compiler messages, compare output, and record why a correction works.',
      es: 'Usar mensajes del compilador, comparar la salida y registrar por qué funciona una corrección.',
    },
    guided: {
      id: 'a2-guided',
      prompt: {
        en: 'Build Main.java from the starter to print the seven target lines exactly, using one println per line. This is a reconstruction task, not a six-error debugging task.',
        es: 'Construye Main.java a partir del archivo inicial para imprimir exactamente las siete líneas del modelo, con una llamada println por línea. Esta es una reconstrucción, no una depuración de seis errores.',
      },
      steps: {
        en: [
          'Create one print statement for each expected line.',
          'Compare capitalization, spaces, punctuation, and line breaks.',
          'If your program does not compile, inspect the first compiler error and the line before it.',
          'Record the line, problem, category, correction, and result in Debugging.txt.',
          'Reflect: name two strategies, one challenge, and one rule to remember.',
        ],
        es: [
          'Crea una instrucción de impresión para cada línea esperada.',
          'Compara mayúsculas, espacios, puntuación y saltos de línea.',
          'Si tu programa no compila, revisa el primer error del compilador y la línea anterior.',
          'Registra la línea, el problema, la categoría, la corrección y el resultado en Debugging.txt.',
          'Reflexiona: menciona dos estrategias, un desafío y una regla para recordar.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
        {
          name: 'Debugging.txt',
          code: 'Entry / Entrada 1\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 2\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 3\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 4\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 5\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 6\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nReflection / Reflexión\nTwo strategies / Dos estrategias:\nOne challenge / Un desafío:\nOne rule to remember / Una regla para recordar:\n',
        },
      ],
      sourcePages: [5],
      expectedOutput:
        "Why do programmers prefer dark mode?\nBecause the light attracts bugs!\nProgramming is a way of thinking, not just a way of writing code.\n-Donald Knuth\nNo one in the brief history of computing has ever written a piece of perfect software.\nIt's unlikely that you'll be the first.\n-Andrew Hunt",
    },
    independent: {
      id: 'a2-independent',
      prompt: {
        en: 'This new program has six independent corrections. Make it print the target below. Record each correction in the debugging log; then explain two debugging strategies, one challenge, and one rule to remember.',
        es: 'Este nuevo programa necesita seis correcciones independientes. Haz que imprima la salida indicada. Registra cada corrección en el registro de depuración y explica dos estrategias de depuración, una dificultad y una regla para recordar.',
      },
      steps: {
        en: [
          'Do not rewrite the whole program first. Mark one problem at a time.',
          'Compile again after fixing a compiler problem.',
          'Once it compiles, compare the exact output to the target.',
          'Document both compilation problems and incorrect behavior.',
        ],
        es: [
          'No reescribas todo el programa primero. Marca un problema a la vez.',
          'Compila de nuevo después de corregir un problema de compilación.',
          'Cuando compile, compara la salida exacta con la salida requerida.',
          'Documenta tanto los problemas de compilación como el comportamiento incorrecto.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n        system.out.println("Practice");\n        System.out.println("Keep trying")\n        System.out.println("Use small steps";\n        System.out.println("Total: " + 2 + 3);\n        System.out.print("Done");\n        System.out.println("Next");\n        System.out.println("java");\n    }\n}\n',
        },
        {
          name: 'Debugging.txt',
          code: 'Entry / Entrada 1\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 2\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 3\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 4\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 5\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nEntry / Entrada 6\nLine / Línea:\nProblem and category / Problema y categoría:\nCorrection / Corrección:\nEvidence and result / Evidencia y resultado:\n\nReflection / Reflexión\nTwo strategies / Dos estrategias:\nOne challenge / Un desafío:\nOne rule to remember / Una regla para recordar:\n',
        },
      ],
      sourcePages: [6],
      expectedOutput:
        'Practice\nKeep trying\nUse small steps\nTotal: 5\nDone\nNext\nJava',
    },
    helpers: [],
  },
  {
    id: 'a3',
    topicId: '1.2',
    group: '1.1–1.5',
    title: {
      en: 'Social media variables: declare, then update',
      es: 'Variables de redes sociales: declarar y actualizar',
    },
    goal: {
      en: 'Distinguish a declaration from an update and choose int or double.',
      es: 'Distinguir una declaración de una actualización y elegir int o double.',
    },
    guided: {
      id: 'a3-guided',
      prompt: {
        en: 'Use the supplied SocialMediaVariables code. Predict its four numeric outputs. Test each change separately, restore the original, and explain the compiler result.',
        es: 'Usa el código SocialMediaVariables suministrado en Main.java. Predice sus cuatro salidas numéricas. Prueba cada cambio por separado, restaura el original y explica el resultado del compilador.',
      },
      steps: {
        en: [
          'Remove int from the first declaration. Is the name declared anywhere earlier?',
          'Restore int; try 353.5 in the int variable. Explain the type issue.',
          'Restore 353; assign 130 to the double variable. Predict how it prints.',
          'Restore 130.5; put int before the later snapchatsSent = 400;. Explain the duplicate declaration.',
          'Restore the code. Add instagramPosts: start at 0, print it, update to 10, and print again.',
        ],
        es: [
          'Quita int de la primera declaración. ¿Se declaró antes ese nombre?',
          'Restaura int; prueba 353.5 en la variable int. Explica el problema de tipos.',
          'Restaura 353; asigna 130 a la variable double. Predice cómo se imprimirá.',
          'Restaura 130.5; coloca int antes de la actualización snapchatsSent = 400;. Explica la declaración duplicada.',
          'Restaura el código. Agrega instagramPosts: inicia en 0, imprime, actualiza a 10 e imprime otra vez.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n        int snapchatsSent = 353;\n        System.out.println("Number of snapchats sent:");\n        System.out.println(snapchatsSent);\n        double youTubeVideosWatched = 130.5;\n        System.out.println("Number of YouTube videos watched:");\n        System.out.println(youTubeVideosWatched);\n        snapchatsSent = 400;\n        System.out.println("Number of snapchats sent:");\n        System.out.println(snapchatsSent);\n        youTubeVideosWatched = 240.4;\n        System.out.println("Number of YouTube videos watched:");\n        System.out.println(youTubeVideosWatched);\n    }\n}\n',
        },
      ],
      sourcePages: [7],
    },
    independent: {
      id: 'a3-independent',
      prompt: {
        en: 'Create a message tracker: messages starts at 24 and hoursOnline at 1.5. Print both with labels. Update them to 30 and 2.0 without redeclaring. Add posts starting at 0; print, update to 6, and print again.',
        es: 'Crea un registro de mensajes: messages empieza en 24 y hoursOnline en 1.5. Imprime ambos con etiquetas. Actualízalos a 30 y 2.0 sin volver a declararlos. Agrega posts con valor inicial 0; imprime, actualiza a 6 e imprime otra vez.',
      },
      steps: {
        en: [
          'Choose the type for each datum before writing code.',
          'Declare each local variable once in main.',
          'Print the starting values before updating them.',
          'Write a prediction for all six output lines before running.',
        ],
        es: [
          'Elige el tipo de cada dato antes de escribir código.',
          'Declara cada variable local una sola vez dentro de main.',
          'Imprime los valores iniciales antes de actualizarlos.',
          'Predice las seis líneas de salida antes de ejecutar.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [8],
    },
    helpers: [],
  },
  {
    id: 'a4',
    topicId: '1.3',
    group: '1.1–1.5',
    title: {
      en: 'New review: division, labels, and a tip',
      es: 'Repaso nuevo: división, etiquetas y propina',
    },
    goal: {
      en: 'Separate integer division, remainder, decimal division, and text joining.',
      es: 'Diferenciar división entera, residuo, división decimal y concatenación de texto.',
    },
    guided: {
      id: 'a4-guided',
      prompt: {
        en: 'A phone has 12 GB free. Each full download uses 5 GB. Predict the number of complete downloads, the GB left over, and the decimal quotient. Then calculate a 10% tip on a 2000 bill.',
        es: 'Un teléfono tiene 12 GB libres. Cada descarga completa ocupa 5 GB. Predice cuántas descargas completas caben, los GB sobrantes y el cociente decimal. Luego calcula una propina del 10% sobre una cuenta de 2000.',
      },
      steps: {
        en: [
          'Use 12 / 5 for complete downloads and 12 % 5 for the remainder.',
          'Use 12.0 / 5 for a decimal quotient. Explain why it differs.',
          'Calculate tip = bill * tipRate using tipRate = 0.10.',
          'Calculate the payment with the tip. Keep labels separate from calculations.',
        ],
        es: [
          'Usa 12 / 5 para las descargas completas y 12 % 5 para el residuo.',
          'Usa 12.0 / 5 para el cociente decimal. Explica por qué cambia.',
          'Calcula tip = bill * tipRate usando tipRate = 0.10.',
          'Calcula el pago con propina. Mantén las etiquetas separadas de los cálculos.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [9],
    },
    independent: {
      id: 'a4-independent',
      prompt: {
        en: 'Repeat with 17 GB free and 4 GB per download. Print complete downloads, remainder, and decimal quotient. Calculate a 15% tip on a bill of 3000; print the tip and payment, with labels.',
        es: 'Repite con 17 GB libres y 4 GB por descarga. Imprime descargas completas, residuo y cociente decimal. Calcula una propina del 15% sobre una cuenta de 3000; imprime la propina y el pago con etiquetas.',
      },
      steps: {
        en: [
          'Write all five predicted output lines before running.',
          'Use one decimal operand only where you need decimal division.',
          'Keep the payment addition inside parentheses when joining the label.',
        ],
        es: [
          'Escribe las cinco líneas de salida previstas antes de ejecutar.',
          'Usa un operando decimal solo donde necesites división decimal.',
          'Coloca la suma del pago entre paréntesis al unirla con la etiqueta.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [10],
    },
    helpers: [],
  },
  {
    id: 'a5',
    topicId: '1.4',
    group: '1.1–1.5',
    title: {
      en: 'New review: a purchase from keyboard input',
      es: 'Repaso nuevo: una compra con entrada del teclado',
    },
    goal: {
      en: 'Read values, calculate in order, and distinguish input from output.',
      es: 'Leer valores, calcular en orden y distinguir la entrada de la salida.',
    },
    guided: {
      id: 'a5-guided',
      prompt: {
        en: 'Read quantity, price per item, and payment as whole colones. Calculate and print total and change. Use 3, 500, and 2000 as your test inputs.',
        es: 'Lee la cantidad, el precio por artículo y el pago en colones enteros. Calcula e imprime el total y el vuelto. Usa 3, 500 y 2000 como entradas de prueba.',
      },
      steps: {
        en: [
          'Import Scanner before the class; create a reader inside main.',
          'Prompt and read quantity, price, and payment in that order.',
          'Calculate total only after the quantity and price have values.',
          'Calculate change as payment - total, then print both labeled results.',
        ],
        es: [
          'Importa Scanner antes de la clase; crea un lector dentro de main.',
          'Solicita y lee cantidad, precio y pago, en ese orden.',
          'Calcula el total solo después de que cantidad y precio tengan valores.',
          'Calcula el vuelto como payment - total; imprime ambos resultados con etiquetas.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [11],
      inputs: '3\n500\n2000',
    },
    independent: {
      id: 'a5-independent',
      prompt: {
        en: 'Create a notebook purchase program. Read count, price per notebook, and payment in whole colones. Print the total and change. Test with 4, 750, and 5000, then invent another valid purchase.',
        es: 'Crea un programa de compra de cuadernos. Lee cantidad, precio por cuaderno y pago en colones enteros. Imprime total y vuelto. Prueba con 4, 750 y 5000; luego inventa otra compra válida.',
      },
      steps: {
        en: [
          'Write down the three inputs and predict the two calculated results.',
          'Use the current stored values in each expression.',
          'Assume nonnegative amounts and a payment that covers the purchase.',
        ],
        es: [
          'Anota las tres entradas y predice los dos resultados calculados.',
          'Usa los valores almacenados actuales en cada expresión.',
          'Supón montos no negativos y un pago suficiente para cubrir la compra.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [12],
      inputs: '4\n750\n5000',
    },
    helpers: [],
  },
  {
    id: 'a6',
    topicId: '1.5',
    group: '1.1–1.5',
    title: {
      en: 'New review: convert before calculating',
      es: 'Repaso nuevo: convertir antes de calcular',
    },
    goal: {
      en: 'Identify when the cast happens and distinguish truncation from rounding.',
      es: 'Identificar cuándo ocurre la conversión y distinguir truncamiento de redondeo.',
    },
    guided: {
      id: 'a6-guided',
      prompt: {
        en: 'Trace the complete program. Predict first, second, third, and rounded. Explain each result before running.',
        es: 'Traza el programa completo. Predice first, second, third y rounded. Explica cada resultado antes de ejecutar.',
      },
      steps: {
        en: [
          'In first, evaluate the int division before storing in double.',
          'In second, convert 7 to double before dividing.',
          'In third, convert 3.9 to int by discarding its fraction.',
          'In rounded, do the addition inside the parentheses before the cast.',
        ],
        es: [
          'En first, evalúa la división int antes de almacenar en double.',
          'En second, convierte 7 a double antes de dividir.',
          'En third, convierte 3.9 a int descartando su parte fraccionaria.',
          'En rounded, realiza la suma entre paréntesis antes de la conversión.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n        double first = 7 / 2;\n        double second = (double) 7 / 2;\n        int third = (int) 3.9;\n        int rounded = (int) (3.6 + 0.5);\n        System.out.println(first);\n        System.out.println(second);\n        System.out.println(third);\n        System.out.println(rounded);\n    }\n}\n',
        },
      ],
      sourcePages: [13],
    },
    independent: {
      id: 'a6-independent',
      prompt: {
        en: 'Repeat the four comparisons using 11 / 4, decimal division of 11 by 4, a direct cast of 6.8, and rounding 6.8 with (int)(x + 0.5). Print four results and explain each.',
        es: 'Repite las cuatro comparaciones usando 11 / 4, división decimal de 11 entre 4, conversión directa de 6.8 y redondeo de 6.8 con (int)(x + 0.5). Imprime cuatro resultados y explica cada uno.',
      },
      steps: {
        en: [
          'Do not run until you have four predictions.',
          'For each division, mark the types of the operands at calculation time.',
          'Explain why casting alone and rounding do not always agree.',
        ],
        es: [
          'No ejecutes hasta tener cuatro predicciones.',
          'En cada división, marca los tipos de los operandos al calcular.',
          'Explica por qué la conversión directa y el redondeo no siempre coinciden.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [14],
    },
    helpers: [],
  },
  {
    id: 'b1',
    topicId: '1.6',
    group: '1.6–1.10',
    title: {
      en: 'Banking: interest, deposit, interest',
      es: 'Banca: interés, depósito, interés',
    },
    goal: {
      en: 'Translate a percentage to a decimal and use compound assignments in order.',
      es: 'Convertir un porcentaje a decimal y usar asignaciones compuestas en orden.',
    },
    guided: {
      id: 'b1-guided',
      prompt: {
        en: 'Read an initial balance and a deposit using nextDouble(). Use a 3% rate. Apply interest, add the deposit, then apply interest again. Test with 1000 and 200.',
        es: 'Lee un saldo inicial y un depósito con nextDouble(). Usa una tasa del 3%. Aplica interés, agrega el depósito y vuelve a aplicar interés. Prueba con 1000 y 200.',
      },
      steps: {
        en: [
          'Store 3% as 0.03, not 3.',
          'Read balance and print its initial value.',
          'Use balance *= (1 + interestRate); for the first interest update.',
          'Read the deposit and add it with +=.',
          'Apply the same interest update to the new balance and print it.',
        ],
        es: [
          'Almacena el 3% como 0.03, no como 3.',
          'Lee balance e imprime su valor inicial.',
          'Usa balance *= (1 + interestRate); para la primera actualización de interés.',
          'Lee el depósito y súmalo con +=.',
          'Aplica la misma actualización de interés al nuevo saldo e imprímelo.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [3],
      inputs: '1000\n200',
    },
    independent: {
      id: 'b1-independent',
      prompt: {
        en: 'Create the same process with a 2% interest rate. Read an initial balance and a deposit. Apply interest, deposit, then interest again. Test with 500 and 50; do not hard-code these two inputs.',
        es: 'Crea el mismo proceso con una tasa de interés del 2%. Lee un saldo inicial y un depósito. Aplica interés, depósito y luego interés otra vez. Prueba con 500 y 50; no fijes estas entradas en el código.',
      },
      steps: {
        en: [
          'Write the balance after each of the three updates in a trace table.',
          'Use *= for interest and += for the deposit.',
          'Explain why multiplying by only the rate would lose the original balance.',
        ],
        es: [
          'Escribe el saldo después de cada una de las tres actualizaciones en una tabla de seguimiento.',
          'Usa *= para el interés y += para el depósito.',
          'Explica por qué multiplicar solo por la tasa perdería el saldo original.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [4],
      inputs: '500\n50',
    },
    helpers: [],
  },
  {
    id: 'b2',
    topicId: '1.7',
    group: '1.6–1.10',
    title: {
      en: 'Use the String API to explore a subject',
      es: 'Explorar una materia con la API de String',
    },
    goal: {
      en: 'Read a whole line and use documented methods without guessing their return types.',
      es: 'Leer una línea completa y usar métodos documentados sin adivinar sus tipos de retorno.',
    },
    guided: {
      id: 'b2-guided',
      prompt: {
        en: 'Complete the subject reader. For Computer Science, predict the lower-case text, whether it contains computer, and its length. Keep the original subject as well as the lower-case result. toLowerCase() returns a lower-case String; contains(String text) returns a boolean testing that exact character sequence; length() returns an int counting characters, including spaces for these examples.',
        es: 'Completa el lector de materias. Para Computer Science, predice el texto en minúsculas, si contiene computer y su longitud. Conserva tanto la materia original como el resultado en minúsculas. toLowerCase() devuelve un String en minúsculas; contains(String text) devuelve un boolean que comprueba esa secuencia exacta; length() devuelve un int que cuenta caracteres, incluidos los espacios de estos ejemplos.',
      },
      steps: {
        en: [
          'Read the whole subject with nextLine(), not next().',
          'Save subject.toLowerCase() in subjectLowerCase.',
          'Call contains("computer") on that lower-case String and save the boolean.',
          'Call subject.length() with empty parentheses and save the int.',
          'Print the three results and count the space between the two words.',
        ],
        es: [
          'Lee la materia completa con nextLine(), no con next().',
          'Guarda subject.toLowerCase() en subjectLowerCase.',
          'Llama contains("computer") sobre ese String en minúsculas y guarda el boolean.',
          'Llama subject.length() con paréntesis vacíos y guarda el int.',
          'Imprime los tres resultados y cuenta el espacio entre las dos palabras.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [5],
      inputs: 'Computer Science',
    },
    independent: {
      id: 'b2-independent',
      prompt: {
        en: 'Ask for a favorite activity. Save it in activity, create a lower-case version, check whether it contains "chess", and print the length of the original text. Test with Playing Chess.',
        es: 'Pregunta por una actividad favorita. Guárdala en activity, crea una versión en minúsculas, comprueba si contiene "chess" e imprime la longitud del texto original. Prueba con Playing Chess.',
      },
      steps: {
        en: [
          'Read a full line so the space is preserved.',
          'Store the String returned by toLowerCase().',
          'Predict the boolean and count every character, including the space.',
        ],
        es: [
          'Lee una línea completa para conservar el espacio.',
          'Almacena el String devuelto por toLowerCase().',
          'Predice el boolean y cuenta todos los caracteres, incluido el espacio.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [6],
      inputs: 'Playing Chess',
    },
    helpers: [],
  },
  {
    id: 'b3',
    topicId: '1.8',
    group: '1.6–1.10',
    title: {
      en: 'Comments cannot hide an unchecked method body',
      es: 'Los comentarios no evitan revisar un método',
    },
    goal: {
      en: 'Distinguish temporarily commenting code from actually correcting it.',
      es: 'Distinguir comentar código temporalmente de corregirlo de verdad.',
    },
    guided: {
      id: 'b3-guided',
      prompt: {
        en: 'Try the supplied program. Comment out only brokenMethod(); and try again. Does the invalid code inside the method still need to compile? Restore the call, then temporarily comment the invalid declaration. Finally repair it and remove the temporary comment.',
        es: 'Prueba el programa suministrado. Comenta solo brokenMethod(); y vuelve a intentarlo. ¿Debe compilar el código inválido dentro del método? Restaura la llamada y comenta temporalmente la declaración inválida. Por último, repárala y elimina el comentario temporal.',
      },
      steps: {
        en: [
          'Run the unchanged code and record the first compiler problem.',
          'Comment only the call, not the method definition. Predict before compiling again.',
          'Restore the call. Comment only the invalid declaration inside the method.',
          'Restore the declaration and correct the type name permanently.',
          'Record what was a temporary diagnostic step and what actually repaired the code.',
        ],
        es: [
          'Ejecuta el código sin cambios y registra el primer problema del compilador.',
          'Comenta solo la llamada, no la definición del método. Predice antes de compilar otra vez.',
          'Restaura la llamada. Comenta solo la declaración inválida dentro del método.',
          'Restaura la declaración y corrige permanentemente el nombre del tipo.',
          'Registra qué paso fue un diagnóstico temporal y cuál reparó realmente el código.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("We can use comments to debug programs!");\n        brokenMethod();\n        System.out.println("This message will run once the error is fixed!");\n    }\n    public static void brokenMethod() {\n        string string = "This is an error!";\n    }\n}\n',
        },
      ],
      sourcePages: [7],
    },
    independent: {
      id: 'b3-independent',
      prompt: {
        en: 'Repeat the investigation on this new program. First comment only its call. Then temporarily comment the invalid declaration. Finally correct the declaration so that amount is a double value of 5.5, and restore the call.',
        es: 'Repite la investigación con este programa nuevo. Primero comenta solo su llamada. Luego comenta temporalmente la declaración inválida. Finalmente corrige la declaración para que amount sea un double con valor 5.5 y restaura la llamada.',
      },
      steps: {
        en: [
          'Compile at each stage and record the result.',
          'Explain why a method body is still checked even when not called.',
          'Do not leave the real correction hidden in a comment.',
        ],
        es: [
          'Compila en cada etapa y registra el resultado.',
          'Explica por qué se revisa el cuerpo de un método aunque no se lo llame.',
          'No dejes la corrección real oculta en un comentario.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Start");\n        brokenMethod();\n        System.out.println("End");\n    }\n    public static void brokenMethod() {\n        double amount = "5.5";\n    }\n}\n',
        },
      ],
      sourcePages: [8],
    },
    helpers: [],
  },
  {
    id: 'b4',
    topicId: '1.9',
    group: '1.6–1.10',
    title: {
      en: 'Mystery method: replace or add?',
      es: 'Método misterioso: ¿reemplazar o sumar?',
    },
    goal: {
      en: 'Use a returned value and distinguish replacement from addition to the old value.',
      es: 'Usar un valor devuelto y distinguir reemplazar de sumar al valor anterior.',
    },
    guided: {
      id: 'b4-guided',
      prompt: {
        en: 'Trace the pasted program first. Then follow the written requirement: add the returned calculation to the current number. Keep the method returning int rather than printing inside it.',
        es: 'Traza primero el programa original. Luego sigue el requisito escrito: suma el cálculo devuelto al número actual. Mantén el método devolviendo int en lugar de imprimir dentro de él.',
      },
      steps: {
        en: [
          'Trace the exact pasted line number = mysteryMethod(number);.',
          'Identify the argument value and what num receives.',
          'Calculate num * 15 and follow the return to main.',
          'Now rewrite the assignment so it adds that returned value to the old number.',
          'Print number only after storing the updated value.',
        ],
        es: [
          'Traza la línea original exacta number = mysteryMethod(number);.',
          'Identifica el valor del argumento y lo que recibe num.',
          'Calcula num * 15 y sigue el retorno hasta main.',
          'Ahora cambia la asignación para sumar el valor devuelto al número anterior.',
          'Imprime number solo después de almacenar el valor actualizado.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n        int number = 10;\n        number = mysteryMethod(number);\n        System.out.println(number);\n    }\n    public static int mysteryMethod(int num) {\n        return num * 15;\n    }\n}\n',
        },
      ],
      sourcePages: [9],
    },
    independent: {
      id: 'b4-independent',
      prompt: {
        en: 'Start number at 8. Write a supplied-style method named calculate that returns num * 4 as an int. Add its returned value to the current number. Print the final number once. Also predict what replacement alone would produce.',
        es: 'Inicia number en 8. Escribe un método de estilo similar llamado calculate que devuelva num * 4 como int. Suma su valor devuelto al número actual. Imprime el número final una sola vez. Predice también qué produciría solo reemplazarlo.',
      },
      steps: {
        en: [
          'Write the header with an int return type.',
          'Use return in the method instead of printing the calculation there.',
          'Show the old value, returned value, and updated value separately.',
        ],
        es: [
          'Escribe el encabezado con tipo de retorno int.',
          'Usa return en el método en vez de imprimir el cálculo allí.',
          'Muestra por separado el valor anterior, el valor devuelto y el valor actualizado.',
        ],
      },
      files: [
        {
          name: 'Main.java',
          code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [10],
    },
    helpers: [],
  },
  {
    id: 'b5',
    topicId: '1.10',
    group: '1.6–1.10',
    title: {
      en: 'Logging: keep the returned String',
      es: 'Registro: conservar el String devuelto',
    },
    goal: {
      en: 'Keep returned text, call another class with its name, and recognize a local static method.',
      es: 'Conservar el texto devuelto, llamar otra clase por su nombre y reconocer un método static local.',
    },
    guided: {
      id: 'b5-guided',
      prompt: {
        en: 'Use LogRunner with the supplied training Logger.java. Predict the log. Then change the low-memory warning into an error and ensure the restart info message appears. Investigate removing log = and removing Logger. separately, restoring each change afterward.',
        es: 'Usa LogRunner con el Logger.java de práctica suministrado. Predice el registro. Luego cambia la advertencia de memoria baja a error y asegúrate de que aparezca el mensaje informativo de reinicio. Investiga por separado quitar log = y quitar Logger.; restaura cada cambio después.',
      },
      steps: {
        en: [
          'Run the class with main: LogRunner. Logger supplies the called methods.',
          'Track the String returned by each Logger call and stored back in log.',
          'Remove one assignment but keep the call. Compare the saved log.',
          'Remove Logger. from a call in LogRunner. Check whether that method is defined locally.',
          'Keep resetLog as a local static call. Apply the required warning-to-error change.',
        ],
        es: [
          'Ejecuta la clase que tiene main: LogRunner. Logger aporta los métodos llamados.',
          'Sigue el String devuelto por cada llamada a Logger y almacenado de nuevo en log.',
          'Quita una asignación, conservando la llamada. Compara el registro guardado.',
          'Quita Logger. de una llamada en LogRunner. Comprueba si el método está definido localmente.',
          'Conserva resetLog como llamada static local. Aplica el cambio requerido de advertencia a error.',
        ],
      },
      files: [
        {
          name: 'LogRunner.java',
          code: 'public class LogRunner {\n    public static void main(String[] args) {\n        String log = "Computer System R48 Log:\\n";\n        log = Logger.logInfo(log, "Application started successfully.");\n        log = Logger.logWarning(log, "Low memory detected.");\n        log = Logger.logError(log, "An unexpected error occurred.");\n        log = Logger.logInfo(log, "Application restarted successfully.");\n        System.out.println(log);\n        log = resetLog("R52");\n        System.out.println();\n        System.out.println(log);\n    }\n    public static String resetLog(String systemNum) {\n        return "Computer System " + systemNum + " Log:\\n";\n    }\n}\n',
        },
      ],
      sourcePages: [11, 12, 20],
    },
    independent: {
      id: 'b5-independent',
      prompt: {
        en: 'Use Logger.java to build a log headed Network N07. Add an info message Connected., a warning Weak signal., and an error Connection lost. Store every return. Print the log, reset it with a local resetLog("N08"), and print the new header.',
        es: 'Usa Logger.java para crear un registro encabezado Network N07. Agrega un mensaje informativo Connected., una advertencia Weak signal. y un error Connection lost. Almacena cada retorno. Imprime el registro, reinícialo con un resetLog("N08") local e imprime el nuevo encabezado.',
      },
      steps: {
        en: [
          'Use the class name for calls to methods defined in Logger.',
          'Use the local name for resetLog inside LogRunner.',
          'Write the log after each assignment; a returned String must be kept to update log.',
        ],
        es: [
          'Usa el nombre de la clase al llamar métodos definidos en Logger.',
          'Usa el nombre local para resetLog dentro de LogRunner.',
          'Escribe el registro después de cada asignación; debes conservar el String devuelto para actualizar log.',
        ],
      },
      files: [
        {
          name: 'LogRunner.java',
          code: 'public class LogRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [13, 20],
    },
    helpers: [
      {
        name: 'Logger.java',
        code: 'public class Logger {\n    public static String logInfo(String log, String message) {\n        return log + "[INFO] " + message + "\\n";\n    }\n    public static String logWarning(String log, String message) {\n        return log + "[WARNING] " + message + "\\n";\n    }\n    public static String logError(String log, String message) {\n        return log + "[ERROR] " + message + "\\n";\n    }\n}\n',
        readOnly: true,
      },
    ],
  },
  {
    id: 'b6',
    topicId: '1.10',
    group: '1.6–1.10',
    title: {
      en: 'Converters: method name, type, argument',
      es: 'Conversores: nombre, tipo y argumento',
    },
    goal: {
      en: 'Use a documented helper and classify call errors precisely.',
      es: 'Usar una clase auxiliar documentada y clasificar con precisión los errores de las llamadas.',
    },
    guided: {
      id: 'b6-guided',
      prompt: {
        en: 'Trace the pasted UnitRunner with the supplied training UnitConverter.java. Match each call to a method header. The visible runner already looks compatible with these headers; do not invent three errors in that pasted version.',
        es: 'Traza el UnitRunner original con el UnitConverter.java de práctica suministrado. Relaciona cada llamada con el encabezado de un método. El programa visible ya es compatible con esos encabezados; no inventes tres errores en esa versión.',
      },
      steps: {
        en: [
          'Find the method spelling in the helper and copy it exactly.',
          'Check that each argument is compatible with double.',
          'Check that each returned double is stored in a compatible variable.',
          'Predict the conversions for 0 Celsius, 20 pounds, and 65 miles.',
          'To practise debugging afterward, choose Try it yourself: it contains a separate program with exactly three errors.',
        ],
        es: [
          'Busca la escritura exacta del método en la clase auxiliar y cópiala igual.',
          'Comprueba que cada argumento sea compatible con double.',
          'Comprueba que cada double devuelto se almacene en una variable compatible.',
          'Predice las conversiones de 0 Celsius, 20 libras y 65 millas.',
          'Para practicar depuración después, elige Inténtalo por tu cuenta: contiene otro programa con exactamente tres errores.',
        ],
      },
      files: [
        {
          name: 'UnitRunner.java',
          code: 'public class UnitRunner {\n    public static void main(String[] args) {\n        double fahrenheit = UnitConverter.celsiusToFahrenheit(0);\n        System.out.println("Fahrenheit: " + fahrenheit);\n        double kilograms = UnitConverter.poundsToKilograms(20);\n        System.out.println("Kilograms: " + kilograms);\n        double kilometers = UnitConverter.milesToKilometers(65);\n        System.out.println("Kilometers: " + kilometers);\n    }\n}\n',
        },
      ],
      sourcePages: [14, 21],
    },
    independent: {
      id: 'b6-independent',
      prompt: {
        en: 'Using the same UnitConverter.java, fix exactly three call/type issues in the program below. Convert 25 Celsius, 10 pounds, and 10 miles. Keep the helper unchanged and explain every correction.',
        es: 'Con el mismo UnitConverter.java, corrige exactamente tres problemas de llamada o tipo en este programa. Convierte 25 Celsius, 10 libras y 10 millas. No cambies la clase auxiliar y explica cada corrección.',
      },
      steps: {
        en: [
          'Mark the method-name issue, the return-type issue, and the argument-type issue.',
          'Compile after each correction.',
          'Predict approximate numeric results; compare to the actual printed double values.',
        ],
        es: [
          'Marca el problema del nombre del método, el del tipo de retorno y el del tipo del argumento.',
          'Compila después de cada corrección.',
          'Predice resultados numéricos aproximados y compáralos con los valores double impresos.',
        ],
      },
      files: [
        {
          name: 'UnitRunner.java',
          code: 'public class UnitRunner {\n    public static void main(String[] args) {\n        double fahrenheit = UnitConverter.celsiusToFarenheit(25);\n        System.out.println("Fahrenheit: " + fahrenheit);\n        int kilograms = UnitConverter.poundsToKilograms(10);\n        System.out.println("Kilograms: " + kilograms);\n        double kilometers = UnitConverter.milesToKilometers("10");\n        System.out.println("Kilometers: " + kilometers);\n    }\n}\n',
        },
      ],
      sourcePages: [15, 21],
    },
    helpers: [
      {
        name: 'UnitConverter.java',
        code: 'public class UnitConverter {\n    public static double celsiusToFahrenheit(double celsius) {\n        return celsius * 9.0 / 5 + 32;\n    }\n    public static double poundsToKilograms(double pounds) {\n        return pounds * 0.45359237;\n    }\n    public static double milesToKilometers(double miles) {\n        return miles * 1.609344;\n    }\n}\n',
        readOnly: true,
      },
    ],
  },
  {
    id: 'b7',
    topicId: '1.10',
    group: '1.6–1.10',
    title: {
      en: 'Greetings: read once, call three methods',
      es: 'Saludos: leer una vez y llamar tres métodos',
    },
    goal: {
      en: 'Read a complete name and call supplied void methods from another class.',
      es: 'Leer un nombre completo y llamar métodos void suministrados por otra clase.',
    },
    guided: {
      id: 'b7-guided',
      prompt: {
        en: 'Use the supplied training Hello.java. Ask for the user name, read a whole line, then call english, spanish, and french with that name. Predict the output for Matias.',
        es: 'Usa el Hello.java de práctica suministrado. Pide el nombre del usuario, lee una línea completa y llama english, spanish y french con ese nombre. Predice la salida para Matias.',
      },
      steps: {
        en: [
          'Create the Scanner and prompt for the name.',
          'Use nextLine so a name can include spaces.',
          'Inspect the supplied method headers: they are static void and accept one String.',
          'Call three methods through Hello, passing the same stored name.',
          'Do not try to assign their void results to a variable.',
        ],
        es: [
          'Crea el Scanner y solicita el nombre.',
          'Usa nextLine para admitir nombres con espacios.',
          'Revisa los encabezados suministrados: son static void y reciben un String.',
          'Llama tres métodos a través de Hello pasando el mismo nombre almacenado.',
          'No intentes asignar los resultados void a una variable.',
        ],
      },
      files: [
        {
          name: 'HelloRunner.java',
          code: 'public class HelloRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [16, 22],
      inputs: 'Matias',
    },
    independent: {
      id: 'b7-independent',
      prompt: {
        en: 'Read a full name and greet that person in this order: German, Spanish, English, French. Use four separate class-method calls from the supplied Hello.java. Test with Ana Maria and predict every output line.',
        es: 'Lee un nombre completo y saluda a esa persona en este orden: alemán, español, inglés y francés. Usa cuatro llamadas separadas a métodos de Hello.java. Prueba con Ana Maria y predice cada línea de salida.',
      },
      steps: {
        en: [
          'Do not hard-code Ana Maria into the calls.',
          'Pass the variable name to all four methods.',
          'Keep the requested language order; compare it with the printed order.',
        ],
        es: [
          'No fijes Ana Maria directamente en las llamadas.',
          'Pasa la variable del nombre a los cuatro métodos.',
          'Conserva el orden de idiomas solicitado y compáralo con el orden impreso.',
        ],
      },
      files: [
        {
          name: 'HelloRunner.java',
          code: 'public class HelloRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [17, 22],
      inputs: 'Ana Maria',
    },
    helpers: [
      {
        name: 'Hello.java',
        code: 'public class Hello {\n    public static void english(String name) {\n        System.out.println("Hello, " + name + "!");\n    }\n    public static void spanish(String name) {\n        System.out.println("Hola, " + name + "!");\n    }\n    public static void french(String name) {\n        System.out.println("Bonjour, " + name + "!");\n    }\n    public static void german(String name) {\n        System.out.println("Hallo, " + name + "!");\n    }\n}\n',
        readOnly: true,
      },
    ],
  },
  {
    id: 'b8',
    topicId: '1.10',
    group: '1.6–1.10',
    title: {
      en: 'Algebra tools: trust the documented interface',
      es: 'Herramientas de álgebra: usar la interfaz documentada',
    },
    goal: {
      en: 'Match mathematical inputs to method arguments and use the documented return type.',
      es: 'Relacionar datos matemáticos con argumentos de métodos y usar el tipo de retorno documentado.',
    },
    guided: {
      id: 'b8-guided',
      prompt: {
        en: 'Use Calculator.java as a supplied tool. Calculate the slope from (1,1) to (5,10), the distance from (2,3) to (6,7), and the roots of x² + 2x - 8 = 0.',
        es: 'Usa Calculator.java como herramienta suministrada. Calcula la pendiente de (1,1) a (5,10), la distancia de (2,3) a (6,7) y las raíces de x² + 2x - 8 = 0.',
      },
      steps: {
        en: [
          'Map (x1,y1,x2,y2) to the four arguments in that order.',
          'For the slope, calculate the changes in y and x first on paper.',
          'For the quadratic, identify a=1, b=2, c=-8; keep the minus sign.',
          'Store slope and distance in double, but roots in String.',
          'List three advantages of using the documented helper instead of repeating formulas in main.',
        ],
        es: [
          'Relaciona (x1,y1,x2,y2) con los cuatro argumentos en ese orden.',
          'Para la pendiente, calcula primero en papel los cambios en y y en x.',
          'En la ecuación cuadrática, identifica a=1, b=2, c=-8; conserva el signo negativo.',
          'Almacena pendiente y distancia en double, pero las raíces en String.',
          'Enumera tres ventajas de usar la clase auxiliar documentada en vez de repetir fórmulas en main.',
        ],
      },
      files: [
        {
          name: 'CalculatorRunner.java',
          code: 'public class CalculatorRunner {\n    public static void main(String[] args) {\n        double slope = Calculator.slope(1, 1, 5, 10);\n        System.out.println("Slope: " + slope);\n        double distance = Calculator.distance(2, 3, 6, 7);\n        System.out.println("Distance: " + distance);\n        String roots = Calculator.quadRoots(1, 2, -8);\n        System.out.println("Roots: " + roots);\n    }\n}\n',
        },
      ],
      sourcePages: [18, 23],
    },
    independent: {
      id: 'b8-independent',
      prompt: {
        en: 'Use the same helper. Find the slope from (0,0) to (4,6), distance from (1,1) to (4,5), and roots of x² - 5x + 6 = 0. Print three labeled results. Give three reasons for reusing Calculator.',
        es: 'Usa la misma clase auxiliar. Calcula la pendiente de (0,0) a (4,6), la distancia de (1,1) a (4,5) y las raíces de x² - 5x + 6 = 0. Imprime tres resultados con etiquetas. Da tres razones para reutilizar Calculator.',
      },
      steps: {
        en: [
          'Write a labeled list of argument values before coding.',
          'Check the helper preconditions: distinct x values for slope; a nonzero and real roots for the quadratic.',
          'Predict the results on paper, then call the methods without rewriting their bodies.',
        ],
        es: [
          'Escribe una lista etiquetada con los valores de los argumentos antes de programar.',
          'Revisa las precondiciones: valores x distintos para la pendiente; a distinto de cero y raíces reales para la cuadrática.',
          'Predice los resultados en papel y llama los métodos sin reescribir sus cuerpos.',
        ],
      },
      files: [
        {
          name: 'CalculatorRunner.java',
          code: 'public class CalculatorRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [19, 23],
    },
    helpers: [
      {
        name: 'Calculator.java',
        code: 'public class Calculator {\n    // Pre: x1 != x2.\n    public static double slope(double x1, double y1,\n                               double x2, double y2) {\n        return (y2 - y1) / (x2 - x1);\n    }\n    public static double distance(double x1, double y1,\n                                  double x2, double y2) {\n        double dx = x2 - x1;\n        double dy = y2 - y1;\n        return Math.sqrt(dx * dx + dy * dy);\n    }\n    // Pre: a != 0 and b*b - 4*a*c >= 0.\n    public static String quadRoots(double a, double b, double c) {\n        double discriminant = b * b - 4 * a * c;\n        double first = (-b + Math.sqrt(discriminant)) / (2 * a);\n        double second = (-b - Math.sqrt(discriminant)) / (2 * a);\n        return first + " and " + second;\n    }\n}\n',
        readOnly: true,
      },
    ],
  },
];

export const extraActivities: ExtraActivity[] = [
  ...activities.map((activity) => ({
    ...activity,
    guide: practiceGuides[activity.id],
  })),
  ...unit2ExtraActivities,
];
