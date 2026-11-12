import type { CurriculumUnit } from './types';

export const unit4: CurriculumUnit = {
  id: 'unit-4',
  number: 4,
  title: {
    en: 'Data Collections',
    es: 'Colecciones de datos',
  },
  description: {
    en: 'Collect responsibly, process arrays and lists, and trace searching, sorting, and recursion.',
    es: 'Recopila responsablemente, procesa arreglos y listas, y sigue búsquedas, ordenamientos y recursión.',
  },
  topics: [
    {
      id: '4.1',
      sourcePdfPage: 107,
      content: {
        en: {
          title: 'Ethical and Social Issues Around Data Collection',
          description: 'Collect less; question the sample.',
          goal: 'Compute a useful aggregate without storing identities.',
          explanation:
            'A useful data product starts with a narrow question and only the information needed to answer it. Anonymous counts can reduce exposure, but aggregation alone does not guarantee privacy. Collection methods, missing responses, and inaccurate records can also distort conclusions. Our small example summarizes voluntary responses; it cannot establish what every student needs.',
          takeaway:
            'An aggregate can answer a limited question without retaining names.',
          steps: [
            'Store three anonymous response counts.',
            'Combine the counts without adding identifiers.',
            'Report only the aggregate total.',
          ],
          practice: 'For anonymous counts {4, 0, 3}, what is their total?',
          practiceAnswer: '7',
          practiceFeedback:
            'Adding the three counts gives 7; no identity is needed.',
          practiceHints: [
            'Start with the first count, 4.',
            'The zero count does not change the sum.',
            'Add the final count, 3.',
          ],
          question:
            'Which change best supports the stated goal of publishing total participation?',
          choices: [
            'Store names and exact locations forever.',
            'Keep only the needed anonymous counts.',
            'Infer all students’ preferences from volunteers.',
          ],
          correct: 1,
          feedback:
            'Keeping only necessary counts reduces stored personal information; a volunteer sample still may be biased.',
          challenge:
            'For anonymous counts {2, 5, 1}, print how many groups have at least 3 responses. Do not add identifying fields.',
          hints: [
            'Start a counter at zero.',
            'Inspect each count and compare it with 3.',
            'Increment only when the threshold is met; print 1.',
          ],
          checklist: [
            'Use only anonymous counts.',
            'Test every group once.',
            'Print 1.',
          ],
        },
        es: {
          title: 'Aspectos éticos y sociales de la recopilación de datos',
          description: 'Recopila menos; examina la muestra.',
          goal: 'Calcula un agregado útil sin guardar identidades.',
          explanation:
            'Un producto de datos útil parte de una pregunta concreta y utiliza solo la información necesaria. Los conteos anónimos reducen la exposición, pero agregar datos no garantiza privacidad. El método de recopilación, las respuestas ausentes y los registros incorrectos pueden distorsionar las conclusiones. Este ejemplo resume respuestas voluntarias; no permite determinar qué necesita todo el alumnado.',
          takeaway:
            'Un agregado responde una pregunta limitada sin conservar nombres.',
          steps: [
            'Guarda tres conteos de respuestas anónimas.',
            'Suma los conteos sin añadir identificadores.',
            'Informa únicamente el total agregado.',
          ],
          practice: 'Para los conteos anónimos {4, 0, 3}, ¿cuál es el total?',
          practiceAnswer: '7',
          practiceFeedback:
            'La suma de los tres conteos es 7; no requiere identidades.',
          practiceHints: [
            'Empieza con el primer conteo, 4.',
            'El cero no cambia la suma.',
            'Añade el último conteo, 3.',
          ],
          question:
            '¿Qué cambio favorece el objetivo de publicar la participación total?',
          choices: [
            'Guardar nombres y ubicaciones exactas para siempre.',
            'Conservar solo los conteos anónimos necesarios.',
            'Inferir las preferencias de todos a partir de voluntarios.',
          ],
          correct: 1,
          feedback:
            'Conservar solo los conteos necesarios reduce la información personal almacenada; la muestra voluntaria aún puede tener sesgos.',
          challenge:
            'Con los conteos anónimos {2, 5, 1}, imprime cuántos grupos tienen al menos 3 respuestas. No añadas identificadores.',
          hints: [
            'Inicializa un contador en cero.',
            'Compara cada conteo con 3.',
            'Incrementa solo si alcanza el umbral; imprime 1.',
          ],
          checklist: [
            'Usa solo conteos anónimos.',
            'Evalúa cada grupo una vez.',
            'Imprime 1.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[] counts = {3, 5, 2};',
          '        int total = counts[0] + counts[1] + counts[2];',
          '        System.out.println(total);',
          '    }',
          '}',
        ],
        active: [2, 3, 4],
        output: ['', '', '10'],
        values: {
          en: ['counts = [3, 5, 2]', 'total = 10', 'total = 10'],
          es: ['counts = [3, 5, 2]', 'total = 10', 'total = 10'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[] counts = {2, 5, 1};\n        int groups = 0;\n        for (int count : counts) { if (count >= 3) groups++; }\n        System.out.println(groups);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[] counts = {2, 5, 1};\n        // Count groups with at least 3 responses and print the count.\n    }\n}\n',
      },
    },
    {
      id: '4.2',
      sourcePdfPage: 108,
      content: {
        en: {
          title: 'Introduction to Using Data Sets',
          description: 'Turn a collection into an answer.',
          goal: 'Plan a count over a small data set.',
          explanation:
            'A data set contains related observations, such as daily bicycle counts. Define the question before choosing an operation: a total, an average, and a threshold count describe different things. Process one observation at a time and keep a running result. A simple table with an observation column and a result column helps check the plan.',
          takeaway: 'The question determines what you accumulate.',
          steps: [
            'Start with four daily bicycle counts.',
            'Count the observations that reach 5.',
            'Report the number of qualifying days.',
          ],
          practice: 'How many values in {2, 5, 8, 4} are at least 5?',
          practiceAnswer: '2',
          practiceFeedback: 'Only 5 and 8 qualify, so the count is 2.',
          practiceHints: [
            'Check values individually.',
            'At least includes equality.',
            'Count qualifying observations, not their sum.',
          ],
          question:
            'Which result answers “How many days had at least 5 bicycles?”?',
          choices: [
            'The sum of bicycle counts.',
            'The largest bicycle count.',
            'The number of qualifying days.',
          ],
          correct: 2,
          feedback:
            'A threshold count increments once per qualifying day; a sum measures bicycles instead.',
          challenge:
            'Using {6, 2, 9, 3}, compute and print the total number of bicycles across all four days.',
          hints: [
            'Initialize total to 0.',
            'Add each observation to total.',
            'Print total after the traversal; expect 20.',
          ],
          checklist: [
            'Include all four observations.',
            'Use a sum rather than a threshold count.',
            'Print 20.',
          ],
        },
        es: {
          title: 'Introducción al uso de conjuntos de datos',
          description: 'Convierte una colección en una respuesta.',
          goal: 'Planifica un conteo sobre un conjunto pequeño.',
          explanation:
            'Un conjunto de datos reúne observaciones relacionadas, como conteos diarios de bicicletas. Define la pregunta antes de elegir la operación: un total, un promedio y un conteo por umbral describen cosas diferentes. Procesa cada observación y conserva un resultado acumulado. Una tabla con columnas para la observación y el resultado permite comprobar el plan.',
          takeaway: 'La pregunta determina qué debes acumular.',
          steps: [
            'Empieza con cuatro conteos diarios de bicicletas.',
            'Cuenta las observaciones que llegan a 5.',
            'Informa cuántos días cumplen la condición.',
          ],
          practice: '¿Cuántos valores de {2, 5, 8, 4} son al menos 5?',
          practiceAnswer: '2',
          practiceFeedback: 'Solo 5 y 8 cumplen; el conteo es 2.',
          practiceHints: [
            'Revisa cada valor por separado.',
            'Al menos incluye la igualdad.',
            'Cuenta observaciones; no sumes sus valores.',
          ],
          question:
            '¿Qué resultado responde “¿Cuántos días hubo al menos 5 bicicletas?”?',
          choices: [
            'La suma de las bicicletas.',
            'El mayor conteo de bicicletas.',
            'El número de días que cumplen la condición.',
          ],
          correct: 2,
          feedback:
            'El conteo aumenta una vez por día que cumple; la suma mide bicicletas.',
          challenge:
            'Con {6, 2, 9, 3}, calcula e imprime el total de bicicletas de los cuatro días.',
          hints: [
            'Inicializa total en 0.',
            'Añade cada observación a total.',
            'Imprime total después del recorrido; debe ser 20.',
          ],
          checklist: [
            'Incluye las cuatro observaciones.',
            'Calcula una suma en lugar de un conteo por umbral.',
            'Imprime 20.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[] days = {2, 5, 8, 4};',
          '        int busy = 0;',
          '        for (int n : days) {',
          '            if (n >= 5) {',
          '                busy++;',
          '            }',
          '        }',
          '        System.out.println(busy);',
          '    }',
          '}',
        ],
        active: [2, 6, 9],
        output: ['', '', '2'],
        values: {
          en: ['days = [2, 5, 8, 4]', 'busy = 2', 'busy = 2'],
          es: ['days = [2, 5, 8, 4]', 'busy = 2', 'busy = 2'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[] days = {6, 2, 9, 3};\n        int total = 0;\n        for (int n : days) { total += n; }\n        System.out.println(total);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[] days = {6, 2, 9, 3};\n        // Compute and print the total.\n    }\n}\n',
      },
    },
    {
      id: '4.3',
      sourcePdfPage: 109,
      content: {
        en: {
          title: 'Array Creation and Access',
          description: 'Allocate fixed storage and address its elements.',
          goal: 'Distinguish an array’s length from its last valid index.',
          explanation:
            'An array groups values of one element type in fixed-length storage. Java assigns default values when you allocate with new: an int element begins at zero. Brackets select a position using a zero-based index. The length field counts positions, so the last valid index is length minus one. Assigning an element does not resize the array.',
          takeaway: 'Length is a count; indices start at zero.',
          steps: [
            'Create an int array with three default zeros.',
            'Store 7 at index 1.',
            'Read the assigned element.',
          ],
          practice:
            'For new int[4], what is the value at index 3 before any assignment?',
          practiceAnswer: '0',
          practiceFeedback: 'Every int element is initialized to 0.',
          practiceHints: [
            'Allocation initializes every element.',
            'Index 3 is valid for length 4.',
            'The default int value is zero.',
          ],
          question: 'For an array of length 3, which index is invalid?',
          choices: ['0', '2', '3'],
          correct: 2,
          feedback:
            'Valid indices are 0, 1, and 2. Index 3 is outside this array.',
          challenge:
            'Create an int array of length 4, put 9 in its last position, and print that position using length.',
          hints: [
            'Allocate with new int[4].',
            'The last index is values.length - 1.',
            'Assign 9, then read the same index.',
          ],
          checklist: [
            'Allocate four elements.',
            'Use length - 1 for the final index.',
            'Print 9.',
          ],
        },
        es: {
          title: 'Creación y acceso a arreglos',
          description: 'Reserva espacio fijo y accede a sus elementos.',
          goal: 'Distingue la longitud del último índice válido.',
          explanation:
            'Un arreglo agrupa valores de un mismo tipo en un espacio de longitud fija. Java asigna valores predeterminados al reservar con new: cada elemento int comienza en cero. Los corchetes seleccionan una posición mediante un índice que empieza en cero. El atributo length cuenta posiciones; por eso el último índice es length menos uno. Asignar un elemento no cambia la longitud.',
          takeaway:
            'La longitud cuenta elementos; los índices empiezan en cero.',
          steps: [
            'Crea un arreglo int con tres ceros predeterminados.',
            'Guarda 7 en el índice 1.',
            'Lee el elemento modificado.',
          ],
          practice:
            'En new int[4], ¿qué valor tiene el índice 3 antes de asignar elementos?',
          practiceAnswer: '0',
          practiceFeedback: 'Cada elemento int se inicializa en 0.',
          practiceHints: [
            'La reserva inicializa todos los elementos.',
            'El índice 3 es válido para longitud 4.',
            'El valor int predeterminado es cero.',
          ],
          question: 'En un arreglo de longitud 3, ¿qué índice es inválido?',
          choices: ['0', '2', '3'],
          correct: 2,
          feedback:
            'Los índices válidos son 0, 1 y 2. El índice 3 está fuera del arreglo.',
          challenge:
            'Crea un arreglo int de longitud 4, guarda 9 en la última posición e imprime esa posición usando length.',
          hints: [
            'Reserva con new int[4].',
            'El último índice es values.length - 1.',
            'Asigna 9 y luego lee ese mismo índice.',
          ],
          checklist: [
            'Reserva cuatro elementos.',
            'Usa length - 1 para el último índice.',
            'Imprime 9.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[] values = new int[3];',
          '        values[1] = 7;',
          '        System.out.println(values[1]);',
          '    }',
          '}',
        ],
        active: [2, 3, 4],
        output: ['', '', '7'],
        values: {
          en: ['values = [0, 0, 0]', 'values = [0, 7, 0]', 'values[1] = 7'],
          es: ['values = [0, 0, 0]', 'values = [0, 7, 0]', 'values[1] = 7'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = new int[4];\n        values[values.length - 1] = 9;\n        System.out.println(values[values.length - 1]);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        // Create values, assign its last element, and print it.\n    }\n}\n',
      },
    },
    {
      id: '4.4',
      sourcePdfPage: 110,
      content: {
        en: {
          title: 'Array Traversals',
          description: 'Visit every element safely.',
          goal: 'Use an indexed traversal to update array contents.',
          explanation:
            'A traversal visits array elements in a chosen order. An indexed for loop gives access to positions and can replace stored values. An enhanced for loop supplies a copy of each element; assigning a new primitive value to that loop variable does not update the array. Keep an indexed loop condition strictly below length to avoid an invalid access.',
          takeaway: 'Use indices when replacing stored primitive elements.',
          steps: [
            'Create an array of three scores.',
            'Double every stored score using its index.',
            'Print the last doubled score.',
          ],
          practice:
            'After for (int n : values) { n = 0; }, what is values[0] if values began as {4, 6}?',
          practiceAnswer: '4',
          practiceFeedback:
            'Assigning n changes the loop variable, not the array element.',
          practiceHints: [
            'The enhanced loop copies each int value.',
            'n is a separate variable.',
            'No assignment targets values[0].',
          ],
          question: 'Which loop header visits every valid array index?',
          choices: [
            'int i = 0; i <= a.length; i++',
            'int i = 0; i < a.length; i++',
            'int i = 1; i < a.length; i++',
          ],
          correct: 1,
          feedback:
            'The strict bound avoids index length, while starting at zero includes the first element.',
          challenge:
            'For {2, 4, 6}, add 1 to every stored element using an indexed loop, then print the first and last values on separate lines.',
          hints: [
            'Start the index at 0.',
            'Assign values[i] = values[i] + 1.',
            'Print values[0] and values[values.length - 1].',
          ],
          checklist: [
            'Update all three array elements.',
            'Use i < values.length.',
            'Print 3 and 7 on separate lines.',
          ],
        },
        es: {
          title: 'Recorridos de arreglos',
          description: 'Visita todos los elementos sin salir del arreglo.',
          goal: 'Actualiza un arreglo mediante un recorrido con índices.',
          explanation:
            'Un recorrido visita los elementos en un orden elegido. Un for con índices permite acceder a posiciones y reemplazar valores almacenados. Un for mejorado entrega una copia de cada elemento; asignar otro valor primitivo a su variable no modifica el arreglo. Mantén la condición del índice estrictamente por debajo de length para evitar un acceso inválido.',
          takeaway:
            'Usa índices para reemplazar elementos primitivos almacenados.',
          steps: [
            'Crea un arreglo de tres puntajes.',
            'Duplica cada puntaje usando su índice.',
            'Imprime el último puntaje duplicado.',
          ],
          practice:
            'Después de for (int n : values) { n = 0; }, ¿cuánto vale values[0] si empezó como {4, 6}?',
          practiceAnswer: '4',
          practiceFeedback:
            'Asignar n modifica la variable del ciclo, no el elemento del arreglo.',
          practiceHints: [
            'El ciclo mejorado copia cada int.',
            'n es una variable independiente.',
            'Ninguna asignación modifica values[0].',
          ],
          question: '¿Qué encabezado visita todos los índices válidos?',
          choices: [
            'int i = 0; i <= a.length; i++',
            'int i = 0; i < a.length; i++',
            'int i = 1; i < a.length; i++',
          ],
          correct: 1,
          feedback:
            'El límite estricto evita el índice length y comenzar en cero incluye el primer elemento.',
          challenge:
            'Con {2, 4, 6}, suma 1 a cada elemento almacenado mediante índices. Después imprime el primero y el último en líneas separadas.',
          hints: [
            'Empieza el índice en 0.',
            'Asigna values[i] = values[i] + 1.',
            'Imprime values[0] y values[values.length - 1].',
          ],
          checklist: [
            'Actualiza los tres elementos.',
            'Usa i < values.length.',
            'Imprime 3 y 7 en líneas separadas.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[] scores = {2, 3, 4};',
          '        for (int i = 0; i < scores.length; i++) {',
          '            scores[i] *= 2;',
          '        }',
          '        System.out.println(scores[2]);',
          '    }',
          '}',
        ],
        active: [2, 4, 6],
        output: ['', '', '8'],
        values: {
          en: ['scores = [2, 3, 4]', 'scores = [4, 6, 8]', 'scores[2] = 8'],
          es: ['scores = [2, 3, 4]', 'scores = [4, 6, 8]', 'scores[2] = 8'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {2, 4, 6};\n        for (int i = 0; i < values.length; i++) { values[i]++; }\n        System.out.println(values[0]);\n        System.out.println(values[values.length - 1]);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {2, 4, 6};\n        // Increase every element, then print the first and last.\n    }\n}\n',
      },
    },
    {
      id: '4.5',
      sourcePdfPage: 111,
      content: {
        en: {
          title: 'Implementing Array Algorithms',
          description: 'Maintain a result while traversing.',
          goal: 'Find a maximum without assuming values are positive.',
          explanation:
            'Array algorithms combine a traversal with a purpose: finding extrema, accumulating totals, testing properties, or rearranging elements. A maximum scan needs a valid initial candidate. For a nonempty array, use its first element rather than zero, which fails when all values are negative. After each comparison, the candidate is the maximum of the elements processed so far.',
          takeaway:
            'Initialize an extremum from actual data when the array is nonempty.',
          steps: [
            'Initialize the candidate from the first negative value.',
            'Compare every remaining value with the candidate.',
            'Print the greatest value found.',
          ],
          practice: 'What maximum should be reported for {-8, -3, -6}?',
          practiceAnswer: '-3',
          practiceFeedback: 'Among these negative values, -3 is greatest.',
          practiceHints: [
            'All three values are below zero.',
            'A value closer to zero is greater here.',
            'Compare -8, then -3, then -6.',
          ],
          question:
            'Why is int max = 0 unsafe for arbitrary nonempty int arrays?',
          choices: [
            'Zero might not occur and can exceed every element.',
            'Arrays cannot contain zero.',
            'The array length changes during comparisons.',
          ],
          correct: 0,
          feedback:
            'With only negative elements, zero remains the candidate even though it is not an array value.',
          challenge:
            'For {7, 2, 9, 4}, compute the minimum with a traversal and print it.',
          hints: [
            'Initialize min to values[0].',
            'Replace min only when a smaller element appears.',
            'Print min after all comparisons.',
          ],
          checklist: [
            'Do not assume the minimum is zero.',
            'Inspect every element.',
            'Print 2.',
          ],
        },
        es: {
          title: 'Implementación de algoritmos con arreglos',
          description: 'Mantén un resultado durante el recorrido.',
          goal: 'Encuentra un máximo sin suponer valores positivos.',
          explanation:
            'Los algoritmos con arreglos combinan un recorrido con un propósito: encontrar extremos, sumar, evaluar propiedades o reorganizar elementos. Una búsqueda del máximo necesita un candidato inicial válido. En un arreglo no vacío, usa el primer elemento en lugar de cero, que falla si todos los valores son negativos. Tras cada comparación, el candidato representa el máximo de los elementos ya procesados.',
          takeaway:
            'Inicializa un extremo con un dato real si el arreglo no está vacío.',
          steps: [
            'Inicializa el candidato con el primer valor negativo.',
            'Compara los demás valores con el candidato.',
            'Imprime el mayor valor encontrado.',
          ],
          practice: '¿Qué máximo corresponde a {-8, -3, -6}?',
          practiceAnswer: '-3',
          practiceFeedback: 'Entre estos valores negativos, -3 es el mayor.',
          practiceHints: [
            'Los tres valores son menores que cero.',
            'Aquí, el más cercano a cero es mayor.',
            'Compara -8, luego -3 y finalmente -6.',
          ],
          question:
            '¿Por qué int max = 0 no sirve para cualquier arreglo int no vacío?',
          choices: [
            'Cero puede no aparecer y superar todos los elementos.',
            'Los arreglos no pueden contener cero.',
            'La longitud cambia durante las comparaciones.',
          ],
          correct: 0,
          feedback:
            'Si todos los elementos son negativos, cero queda como candidato aunque no pertenezca al arreglo.',
          challenge:
            'Con {7, 2, 9, 4}, calcula el mínimo mediante un recorrido e imprímelo.',
          hints: [
            'Inicializa min con values[0].',
            'Reemplaza min solo al encontrar un valor menor.',
            'Imprime min después de todas las comparaciones.',
          ],
          checklist: [
            'No supongas que el mínimo es cero.',
            'Examina todos los elementos.',
            'Imprime 2.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[] values = {-8, -3, -6};',
          '        int max = values[0];',
          '        for (int i = 1; i < values.length; i++) {',
          '            if (values[i] > max) {',
          '                max = values[i];',
          '            }',
          '        }',
          '        System.out.println(max);',
          '    }',
          '}',
        ],
        active: [3, 6, 9],
        output: ['', '', '-3'],
        values: {
          en: ['max = -8', 'max = -3', 'max = -3'],
          es: ['max = -8', 'max = -3', 'max = -3'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {7, 2, 9, 4};\n        int min = values[0];\n        for (int value : values) { if (value < min) min = value; }\n        System.out.println(min);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {7, 2, 9, 4};\n        // Find and print the minimum.\n    }\n}\n',
      },
    },
    {
      id: '4.6',
      sourcePdfPage: 112,
      content: {
        en: {
          title: 'Using Text Files',
          description: 'Read tokens with Scanner.',
          goal: 'Separate persistent file storage from token processing.',
          explanation:
            'A text file persists after a program ends. Real file reading uses new Scanner(new File("data.txt")); a method can declare throws IOException for opening failures. This deterministic example instead supplies embedded text through StringReader, so no external file is needed. Scanner token methods still behave normally: hasNext checks availability, nextInt reads an integer, and close releases resources.',
          takeaway:
            'The input source changes; token processing can stay the same.',
          steps: [
            'Connect Scanner to embedded text rather than an external file.',
            'Read and add all integer tokens.',
            'Close the scanner and print the total.',
          ],
          practice:
            'After reading the three integer tokens in "3 4 5", how many tokens remain?',
          practiceAnswer: '0',
          practiceFeedback:
            'Each nextInt consumes one token; all three have been read.',
          practiceHints: [
            'Count the original tokens.',
            'Each read consumes one integer token.',
            'Three reads exhaust three tokens.',
          ],
          question: 'Which construction reads a real file named data.txt?',
          choices: [
            'new Scanner(new File("data.txt"))',
            'new Scanner("data.txt")',
            'new File().nextInt()',
          ],
          correct: 0,
          feedback:
            'Scanner(File) reads file contents; Scanner(String) reads the characters in that string. File and IOException are in java.io.',
          challenge:
            'Using the supplied StringReader containing "6 1 8", read all integers with Scanner and print how many are greater than 5. Close the scanner.',
          hints: [
            'Initialize count to zero.',
            'While hasNext is true, read nextInt and test it.',
            'Increment for 6 and 8, close, then print 2.',
          ],
          checklist: [
            'Use the embedded source without an external file.',
            'Consume every token once.',
            'Close Scanner and print 2.',
          ],
        },
        es: {
          title: 'Uso de archivos de texto',
          description: 'Lee tokens con Scanner.',
          goal: 'Distingue el archivo persistente del procesamiento de tokens.',
          explanation:
            'Un archivo de texto persiste al terminar el programa. Para leerlo se usa new Scanner(new File("data.txt")); el método puede declarar throws IOException ante fallos de apertura. Este ejemplo usa texto incorporado con StringReader y no necesita archivos externos. Los métodos de Scanner conservan su comportamiento: hasNext comprueba disponibilidad, nextInt lee un entero y close libera recursos.',
          takeaway:
            'Puede cambiar la fuente sin cambiar el procesamiento de tokens.',
          steps: [
            'Conecta Scanner al texto incorporado, no a un archivo externo.',
            'Lee y suma todos los tokens enteros.',
            'Cierra Scanner e imprime el total.',
          ],
          practice:
            'Tras leer los tres tokens enteros de "3 4 5", ¿cuántos quedan?',
          practiceAnswer: '0',
          practiceFeedback:
            'Cada nextInt consume un token; ya se leyeron los tres.',
          practiceHints: [
            'Cuenta los tokens iniciales.',
            'Cada lectura consume un entero.',
            'Tres lecturas agotan tres tokens.',
          ],
          question: '¿Qué construcción lee un archivo real llamado data.txt?',
          choices: [
            'new Scanner(new File("data.txt"))',
            'new Scanner("data.txt")',
            'new File().nextInt()',
          ],
          correct: 0,
          feedback:
            'Scanner(File) lee el contenido del archivo; Scanner(String) lee los caracteres de esa cadena. File e IOException pertenecen a java.io.',
          challenge:
            'Con el StringReader suministrado que contiene "6 1 8", lee todos los enteros con Scanner e imprime cuántos superan 5. Cierra Scanner.',
          hints: [
            'Inicializa count en cero.',
            'Mientras hasNext sea true, lee nextInt y evalúalo.',
            'Incrementa para 6 y 8, cierra e imprime 2.',
          ],
          checklist: [
            'Usa el texto incorporado sin archivos externos.',
            'Consume cada token una vez.',
            'Cierra Scanner e imprime 2.',
          ],
        },
      },
      example: {
        lines: [
          'import java.io.StringReader;',
          'import java.util.Scanner;',
          'public class Main {',
          '    public static void main(String[] args) {',
          '        Scanner input = new Scanner(new StringReader("3 4 5"));',
          '        int total = 0;',
          '        while (input.hasNext()) {',
          '            total += input.nextInt();',
          '        }',
          '        input.close();',
          '        System.out.println(total);',
          '    }',
          '}',
        ],
        active: [4, 7, 10],
        output: ['', '', '12'],
        values: {
          en: [
            'tokens = 3, 4, 5',
            'total = 12; no tokens remain',
            'input closed; total = 12',
          ],
          es: [
            'tokens = 3, 4, 5',
            'total = 12; no quedan tokens',
            'input cerrado; total = 12',
          ],
        },
        solution:
          'import java.io.StringReader;\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(new StringReader("6 1 8"));\n        int count = 0;\n        while (input.hasNext()) { if (input.nextInt() > 5) count++; }\n        input.close();\n        System.out.println(count);\n    }\n}\n',
        starter:
          'import java.io.StringReader;\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(new StringReader("6 1 8"));\n        // Count tokens greater than 5, close input, and print the count.\n    }\n}\n',
      },
    },
    {
      id: '4.7',
      sourcePdfPage: 115,
      content: {
        en: {
          title: 'Wrapper Classes',
          description: 'Move between primitives, objects, and numeric text.',
          goal: 'Recognize parsing, boxing, and unboxing.',
          explanation:
            'Integer and Double wrap primitive numeric values in immutable objects. Autoboxing converts a primitive to its wrapper when needed; unboxing retrieves a primitive value. Parsing is a different operation: Integer.parseInt and Double.parseDouble interpret numeric text. Reassigning a wrapper variable points it to a value rather than mutating the original object. Unboxing a null reference fails.',
          takeaway:
            'Parsing reads text; boxing and unboxing cross the primitive–object boundary.',
          steps: [
            'Parse numeric text and box the resulting int.',
            'Unbox the Integer while computing a new primitive.',
            'Print the computed primitive value.',
          ],
          practice: 'What int is returned by Integer.parseInt("24")?',
          practiceAnswer: '24',
          practiceFeedback:
            'parseInt interprets decimal numeric text as an int.',
          practiceHints: [
            'The input is text representing a number.',
            'parseInt does not count characters.',
            'The digits represent twenty-four.',
          ],
          question: 'Which declaration correctly stores a boxed integer?',
          choices: [
            'Integer value = 7;',
            'Integer value = "7";',
            'int value = new String("7");',
          ],
          correct: 0,
          feedback:
            'Java autoboxes 7 into Integer; a String is not automatically parsed into an integer.',
          challenge:
            'Parse "2.5" with Double.parseDouble, store it in a Double variable, unbox it, multiply by 2, and print the result.',
          hints: [
            'Double.parseDouble returns a primitive double.',
            'Assigning it to Double performs boxing.',
            'Assign to double, multiply by 2, and print 5.0.',
          ],
          checklist: [
            'Parse the provided numeric text.',
            'Use both Double and double variables.',
            'Print 5.0.',
          ],
        },
        es: {
          title: 'Clases envoltorio',
          description: 'Pasa entre primitivos, objetos y texto numérico.',
          goal: 'Reconoce conversión de texto, boxing y unboxing.',
          explanation:
            'Integer y Double representan valores numéricos primitivos mediante objetos inmutables. El autoboxing convierte un primitivo en su envoltorio cuando se necesita; el unboxing recupera un valor primitivo. Interpretar texto es otra operación: Integer.parseInt y Double.parseDouble convierten texto numérico. Reasignar una variable envoltorio no modifica el objeto original. Aplicar unboxing a una referencia null provoca un error.',
          takeaway:
            'Interpretar texto y convertir entre primitivos y objetos son operaciones distintas.',
          steps: [
            'Interpreta el texto numérico y guarda el int como Integer.',
            'Obtén un primitivo al calcular un nuevo valor.',
            'Imprime el primitivo calculado.',
          ],
          practice: '¿Qué int devuelve Integer.parseInt("24")?',
          practiceAnswer: '24',
          practiceFeedback:
            'parseInt interpreta texto numérico decimal como int.',
          practiceHints: [
            'La entrada es texto que representa un número.',
            'parseInt no cuenta caracteres.',
            'Los dígitos representan veinticuatro.',
          ],
          question:
            '¿Qué declaración guarda correctamente un entero en un envoltorio?',
          choices: [
            'Integer value = 7;',
            'Integer value = "7";',
            'int value = new String("7");',
          ],
          correct: 0,
          feedback:
            'Java convierte automáticamente 7 en Integer; no interpreta un String como entero de manera automática.',
          challenge:
            'Interpreta "2.5" con Double.parseDouble, guárdalo en una variable Double, pásalo a double, multiplícalo por 2 e imprime el resultado.',
          hints: [
            'Double.parseDouble devuelve un double primitivo.',
            'Asignarlo a Double aplica boxing.',
            'Asigna a double, multiplica por 2 e imprime 5.0.',
          ],
          checklist: [
            'Interpreta el texto numérico suministrado.',
            'Usa variables Double y double.',
            'Imprime 5.0.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        Integer boxed = Integer.parseInt("12");',
          '        int result = boxed + 3;',
          '        System.out.println(result);',
          '    }',
          '}',
        ],
        active: [2, 3, 4],
        output: ['', '', '15'],
        values: {
          en: ['boxed = 12 (Integer)', 'result = 15 (int)', 'result = 15'],
          es: ['boxed = 12 (Integer)', 'result = 15 (int)', 'result = 15'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        Double boxed = Double.parseDouble("2.5");\n        double value = boxed;\n        System.out.println(value * 2);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        // Parse 2.5, box it, unbox it, double it, and print.\n    }\n}\n',
      },
    },
    {
      id: '4.8',
      sourcePdfPage: 117,
      content: {
        en: {
          title: 'ArrayList Methods',
          description: 'Grow, insert, replace, and remove elements.',
          goal: 'Distinguish insertion from replacement in ArrayList.',
          explanation:
            'An ArrayList stores object references and can change size. Use Integer rather than int as its generic element type. add(value) appends, add(index, value) inserts and shifts, and set(index, value) replaces without changing size. get reads an element; remove(index) deletes and shifts later elements left. Existing element indices run from zero through size() minus one.',
          takeaway: 'Insertion changes size; replacement does not.',
          steps: [
            'Append two boxed integers to an empty list.',
            'Insert 5 between them at index 1.',
            'Print the resulting list size.',
          ],
          practice:
            'A list [4, 9] executes set(0, 7). What is its size afterward?',
          practiceAnswer: '2',
          practiceFeedback:
            'set replaces one element and leaves the size unchanged.',
          practiceHints: [
            'There are initially two elements.',
            'set does not insert an element.',
            'The list becomes [7, 9].',
          ],
          question: 'What does add(1, 5) do to [4, 9]?',
          choices: [
            'Replaces 9, giving [4, 5].',
            'Inserts 5, giving [4, 5, 9].',
            'Removes index 1, giving [4].',
          ],
          correct: 1,
          feedback:
            'Insertion shifts the previous index-1 element right and increases size by one.',
          challenge:
            'Build [3, 8] in an ArrayList<Integer>, replace index 0 with 6, remove index 1, and print the remaining value.',
          hints: [
            'Append 3 and 8.',
            'Use set(0, 6), then remove(1).',
            'Read the remaining value with get(0).',
          ],
          checklist: [
            'Use ArrayList<Integer>.',
            'Replace before removing.',
            'Print 6.',
          ],
        },
        es: {
          title: 'Métodos de ArrayList',
          description: 'Añade, inserta, reemplaza y elimina elementos.',
          goal: 'Distingue insertar de reemplazar en ArrayList.',
          explanation:
            'Un ArrayList almacena referencias a objetos y puede cambiar de tamaño. Su tipo genérico debe ser Integer, no int. add(value) añade al final; add(index, value) inserta y desplaza; set(index, value) reemplaza sin cambiar el tamaño. get lee un elemento; remove(index) elimina y desplaza los posteriores hacia la izquierda. Los índices existentes van de cero a size() menos uno.',
          takeaway: 'Insertar cambia el tamaño; reemplazar no.',
          steps: [
            'Añade dos enteros a una lista vacía.',
            'Inserta 5 entre ellos en el índice 1.',
            'Imprime el tamaño resultante.',
          ],
          practice:
            'La lista [4, 9] ejecuta set(0, 7). ¿Qué tamaño tiene después?',
          practiceAnswer: '2',
          practiceFeedback: 'set reemplaza un elemento sin cambiar el tamaño.',
          practiceHints: [
            'Inicialmente hay dos elementos.',
            'set no inserta otro elemento.',
            'La lista queda [7, 9].',
          ],
          question: '¿Qué hace add(1, 5) sobre [4, 9]?',
          choices: [
            'Reemplaza 9 y produce [4, 5].',
            'Inserta 5 y produce [4, 5, 9].',
            'Elimina el índice 1 y produce [4].',
          ],
          correct: 1,
          feedback:
            'La inserción desplaza a la derecha el elemento que ocupaba el índice 1 y aumenta el tamaño.',
          challenge:
            'Construye [3, 8] en un ArrayList<Integer>, reemplaza el índice 0 con 6, elimina el índice 1 e imprime el valor restante.',
          hints: [
            'Añade 3 y 8 al final.',
            'Usa set(0, 6) y después remove(1).',
            'Lee el valor restante con get(0).',
          ],
          checklist: [
            'Usa ArrayList<Integer>.',
            'Reemplaza antes de eliminar.',
            'Imprime 6.',
          ],
        },
      },
      example: {
        lines: [
          'import java.util.ArrayList;',
          'public class Main {',
          '    public static void main(String[] args) {',
          '        ArrayList<Integer> list = new ArrayList<Integer>();',
          '        list.add(4);',
          '        list.add(9);',
          '        list.add(1, 5);',
          '        System.out.println(list.size());',
          '    }',
          '}',
        ],
        active: [5, 6, 7],
        output: ['', '', '3'],
        values: {
          en: ['list = [4, 9]', 'list = [4, 5, 9]', 'size = 3'],
          es: ['list = [4, 9]', 'list = [4, 5, 9]', 'size = 3'],
        },
        solution:
          'import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        list.add(3); list.add(8);\n        list.set(0, 6);\n        list.remove(1);\n        System.out.println(list.get(0));\n    }\n}\n',
        starter:
          'import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        // Build [3, 8], replace, remove, and print.\n    }\n}\n',
      },
    },
    {
      id: '4.9',
      sourcePdfPage: 119,
      content: {
        en: {
          title: 'ArrayList Traversals',
          description: 'Traverse safely while removing values.',
          goal: 'Avoid skipped elements after an ArrayList removal.',
          explanation:
            'Removing an ArrayList element shifts later elements to lower indices. A forward loop that always increments can therefore skip the element shifted into the current position. A backward indexed traversal avoids this problem because unvisited indices stay unchanged. An enhanced for loop is suitable for reading values, but adding or removing during that traversal can cause a ConcurrentModificationException.',
          takeaway:
            'Remove from the end toward the beginning to preserve unvisited positions.',
          steps: [
            'Create a list containing adjacent negative values.',
            'Visit indices backward and remove negative entries.',
            'Print the number of surviving entries.',
          ],
          practice:
            'Remove all negatives from [-2, -1, 4]. How many elements remain?',
          practiceAnswer: '1',
          practiceFeedback:
            'Both adjacent negatives are removed, leaving only 4.',
          practiceHints: [
            'There are two negative values.',
            'Both must be removed, even though adjacent.',
            'Only the positive entry survives.',
          ],
          question:
            'Why can unconditional i++ skip an element after remove(i)?',
          choices: [
            'All indices become negative.',
            'The next element shifts into index i.',
            'remove always deletes the entire list.',
          ],
          correct: 1,
          feedback:
            'The shifted element must be inspected at its new index; a backward traversal avoids skipping it.',
          challenge:
            'Create [2, 4, 5, 6], remove every even value using a backward indexed loop, and print the remaining value.',
          hints: [
            'Begin at size() - 1.',
            'A value is even when value % 2 == 0.',
            'Remove matching indices and finally print get(0).',
          ],
          checklist: [
            'Traverse backward.',
            'Remove all three even values.',
            'Print 5.',
          ],
        },
        es: {
          title: 'Recorridos de ArrayList',
          description: 'Recorre y elimina valores con seguridad.',
          goal: 'Evita saltar elementos después de una eliminación.',
          explanation:
            'Eliminar un elemento de ArrayList desplaza los posteriores hacia índices menores. Por eso, un ciclo hacia delante que siempre incrementa puede saltarse el elemento desplazado a la posición actual. Recorrer los índices hacia atrás evita el problema: los índices pendientes permanecen iguales. El for mejorado sirve para leer, pero añadir o eliminar durante ese recorrido puede provocar ConcurrentModificationException.',
          takeaway:
            'Elimina del final al principio para conservar las posiciones pendientes.',
          steps: [
            'Crea una lista con valores negativos adyacentes.',
            'Recorre los índices hacia atrás y elimina los negativos.',
            'Imprime cuántos elementos sobreviven.',
          ],
          practice:
            'Al eliminar todos los negativos de [-2, -1, 4], ¿cuántos elementos quedan?',
          practiceAnswer: '1',
          practiceFeedback:
            'Se eliminan ambos negativos adyacentes; solo queda 4.',
          practiceHints: [
            'Hay dos valores negativos.',
            'Deben eliminarse ambos aunque estén juntos.',
            'Solo sobrevive el positivo.',
          ],
          question:
            '¿Por qué un i++ incondicional puede saltar un elemento después de remove(i)?',
          choices: [
            'Todos los índices se vuelven negativos.',
            'El siguiente elemento pasa al índice i.',
            'remove siempre elimina toda la lista.',
          ],
          correct: 1,
          feedback:
            'El elemento desplazado necesita revisión en su nuevo índice; recorrer hacia atrás evita saltarlo.',
          challenge:
            'Crea [2, 4, 5, 6], elimina todos los pares con un ciclo de índices hacia atrás e imprime el valor restante.',
          hints: [
            'Empieza en size() - 1.',
            'Un valor es par cuando value % 2 == 0.',
            'Elimina los índices correspondientes e imprime get(0).',
          ],
          checklist: [
            'Recorre hacia atrás.',
            'Elimina los tres pares.',
            'Imprime 5.',
          ],
        },
      },
      example: {
        lines: [
          'import java.util.ArrayList;',
          'public class Main {',
          '    public static void main(String[] args) {',
          '        ArrayList<Integer> list = new ArrayList<Integer>();',
          '        list.add(-2);',
          '        list.add(-1);',
          '        list.add(4);',
          '        for (int i = list.size() - 1; i >= 0; i--) {',
          '            if (list.get(i) < 0) {',
          '                list.remove(i);',
          '            }',
          '        }',
          '        System.out.println(list.size());',
          '    }',
          '}',
        ],
        active: [6, 9, 12],
        output: ['', '', '1'],
        values: {
          en: ['list = [-2, -1, 4]', 'list = [4]', 'size = 1'],
          es: ['list = [-2, -1, 4]', 'list = [4]', 'size = 1'],
        },
        solution:
          'import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        list.add(2); list.add(4); list.add(5); list.add(6);\n        for (int i = list.size() - 1; i >= 0; i--) { if (list.get(i) % 2 == 0) list.remove(i); }\n        System.out.println(list.get(0));\n    }\n}\n',
        starter:
          'import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        list.add(2); list.add(4); list.add(5); list.add(6);\n        // Remove even values backward and print the survivor.\n    }\n}\n',
      },
    },
    {
      id: '4.10',
      sourcePdfPage: 120,
      content: {
        en: {
          title: 'Implementing ArrayList Algorithms',
          description: 'Analyze neighboring list values.',
          goal: 'Count increasing consecutive pairs without changing the list.',
          explanation:
            'ArrayList algorithms can summarize data, compare neighbors, identify duplicates, or rearrange entries. When comparing consecutive pairs, begin at index 1 and compare get(i) with get(i - 1). This covers each adjacent pair once without reading beyond either boundary. Keep the counter separate from the data so the original list remains available for other analyses.',
          takeaway:
            'A list with n elements has n - 1 adjacent pairs when n is positive.',
          steps: [
            'Build a list of four readings.',
            'Count pairs whose later value is greater.',
            'Print the number of increases.',
          ],
          practice: 'How many increasing adjacent pairs occur in [2, 5, 4, 7]?',
          practiceAnswer: '2',
          practiceFeedback: '2→5 and 4→7 increase; 5→4 does not.',
          practiceHints: [
            'There are three adjacent pairs.',
            'Compare each later value to its predecessor.',
            'Count 2→5 and 4→7.',
          ],
          question: 'What starting index allows get(i - 1) to be valid?',
          choices: ['-1', '0', '1'],
          correct: 2,
          feedback:
            'Starting at 1 makes the first previous index 0, while i remains below size().',
          challenge:
            'For [8, 5, 5, 2], count strictly decreasing adjacent pairs and print the count.',
          hints: [
            'Start i at 1.',
            'Compare get(i) < get(i - 1).',
            'Equal neighbors do not qualify; print 2.',
          ],
          checklist: [
            'Visit each adjacent pair once.',
            'Use strict less-than.',
            'Leave the list unchanged and print 2.',
          ],
        },
        es: {
          title: 'Implementación de algoritmos con ArrayList',
          description: 'Analiza valores vecinos de una lista.',
          goal: 'Cuenta pares consecutivos crecientes sin modificar la lista.',
          explanation:
            'Los algoritmos con ArrayList pueden resumir datos, comparar vecinos, detectar duplicados o reorganizar entradas. Para comparar pares consecutivos, empieza en el índice 1 y compara get(i) con get(i - 1). Así cubres cada par adyacente una vez sin salir de los límites. Mantén el contador separado de los datos para conservar la lista original para otros análisis.',
          takeaway:
            'Una lista con n elementos tiene n - 1 pares adyacentes si n es positivo.',
          steps: [
            'Construye una lista de cuatro mediciones.',
            'Cuenta los pares cuyo segundo valor es mayor.',
            'Imprime la cantidad de aumentos.',
          ],
          practice: '¿Cuántos pares adyacentes crecientes hay en [2, 5, 4, 7]?',
          practiceAnswer: '2',
          practiceFeedback: '2→5 y 4→7 aumentan; 5→4 no.',
          practiceHints: [
            'Hay tres pares adyacentes.',
            'Compara cada valor con su anterior.',
            'Cuenta 2→5 y 4→7.',
          ],
          question: '¿Qué índice inicial permite usar get(i - 1) válidamente?',
          choices: ['-1', '0', '1'],
          correct: 2,
          feedback:
            'Empezar en 1 produce el índice anterior 0; i debe permanecer por debajo de size().',
          challenge:
            'Con [8, 5, 5, 2], cuenta los pares adyacentes estrictamente decrecientes e imprime el conteo.',
          hints: [
            'Empieza i en 1.',
            'Compara get(i) < get(i - 1).',
            'Los vecinos iguales no cuentan; imprime 2.',
          ],
          checklist: [
            'Visita cada par adyacente una vez.',
            'Usa menor que estricto.',
            'Conserva la lista e imprime 2.',
          ],
        },
      },
      example: {
        lines: [
          'import java.util.ArrayList;',
          'public class Main {',
          '    public static void main(String[] args) {',
          '        ArrayList<Integer> list = new ArrayList<Integer>();',
          '        list.add(2);',
          '        list.add(5);',
          '        list.add(4);',
          '        list.add(7);',
          '        int rises = 0;',
          '        for (int i = 1; i < list.size(); i++) {',
          '            if (list.get(i) > list.get(i - 1)) {',
          '                rises++;',
          '            }',
          '        }',
          '        System.out.println(rises);',
          '    }',
          '}',
        ],
        active: [7, 11, 14],
        output: ['', '', '2'],
        values: {
          en: ['list = [2, 5, 4, 7]', 'rises = 2', 'rises = 2'],
          es: ['list = [2, 5, 4, 7]', 'rises = 2', 'rises = 2'],
        },
        solution:
          'import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        list.add(8); list.add(5); list.add(5); list.add(2);\n        int drops = 0;\n        for (int i = 1; i < list.size(); i++) { if (list.get(i) < list.get(i - 1)) drops++; }\n        System.out.println(drops);\n    }\n}\n',
        starter:
          'import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        list.add(8); list.add(5); list.add(5); list.add(2);\n        // Count strictly decreasing adjacent pairs and print the count.\n    }\n}\n',
      },
    },
    {
      id: '4.11',
      sourcePdfPage: 121,
      content: {
        en: {
          title: '2D Array Creation and Access',
          description: 'Address data by row and column.',
          goal: 'Read and modify a rectangular 2D array.',
          explanation:
            'A Java 2D array is an array whose elements are row arrays. In grid[row][column], the first index chooses a row and the second chooses an element within that row. grid.length counts rows; grid[0].length counts columns when the grid is nonempty and rectangular. Allocation supplies default values, and an initializer can supply explicit values for every row.',
          takeaway: 'First choose the row, then the column.',
          steps: [
            'Create a rectangular grid with two rows.',
            'Replace the element in row 1, column 0.',
            'Print the modified element.',
          ],
          practice: 'For int[][] g = {{1, 2, 3}, {4, 5, 6}}, what is g[1][2]?',
          practiceAnswer: '6',
          practiceFeedback: 'Row 1 is {4, 5, 6}; its index-2 element is 6.',
          practiceHints: [
            'The first index selects the second row.',
            'The second index selects the third column.',
            'Read the last value of {4, 5, 6}.',
          ],
          question:
            'For new int[2][3], which expression gives the number of columns?',
          choices: ['grid.length', 'grid[0].length', 'grid[2].length'],
          correct: 1,
          feedback:
            'grid[0] is a row of length 3; grid.length is 2, and row index 2 is invalid.',
          challenge:
            'Allocate a 2-by-3 int grid, store 9 in the bottom-right cell using length expressions, and print that cell.',
          hints: [
            'Use new int[2][3].',
            'The final row is grid.length - 1.',
            'Use that row’s length minus 1 for the final column.',
          ],
          checklist: [
            'Allocate two rows and three columns.',
            'Compute both final indices from lengths.',
            'Print 9.',
          ],
        },
        es: {
          title: 'Creación y acceso a arreglos bidimensionales',
          description: 'Ubica datos por fila y columna.',
          goal: 'Lee y modifica un arreglo rectangular bidimensional.',
          explanation:
            'En Java, un arreglo bidimensional es un arreglo de filas que también son arreglos. En grid[row][column], el primer índice elige una fila y el segundo un elemento de esa fila. grid.length cuenta filas; grid[0].length cuenta columnas si la matriz es rectangular y no vacía. La reserva asigna valores predeterminados; un inicializador permite indicar los valores de cada fila.',
          takeaway: 'Primero elige la fila y luego la columna.',
          steps: [
            'Crea una matriz rectangular de dos filas.',
            'Reemplaza el elemento de la fila 1, columna 0.',
            'Imprime el elemento modificado.',
          ],
          practice:
            'Para int[][] g = {{1, 2, 3}, {4, 5, 6}}, ¿cuánto vale g[1][2]?',
          practiceAnswer: '6',
          practiceFeedback:
            'La fila 1 es {4, 5, 6}; su elemento de índice 2 es 6.',
          practiceHints: [
            'El primer índice elige la segunda fila.',
            'El segundo elige la tercera columna.',
            'Lee el último valor de {4, 5, 6}.',
          ],
          question:
            'En new int[2][3], ¿qué expresión da el número de columnas?',
          choices: ['grid.length', 'grid[0].length', 'grid[2].length'],
          correct: 1,
          feedback:
            'grid[0] es una fila de longitud 3; grid.length es 2 y el índice de fila 2 es inválido.',
          challenge:
            'Reserva una matriz int de 2 por 3, guarda 9 en la esquina inferior derecha usando length e imprime esa celda.',
          hints: [
            'Usa new int[2][3].',
            'La última fila es grid.length - 1.',
            'La última columna es la longitud de esa fila menos 1.',
          ],
          checklist: [
            'Reserva dos filas y tres columnas.',
            'Calcula ambos índices finales usando longitudes.',
            'Imprime 9.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[][] grid = {{1, 2, 3}, {4, 5, 6}};',
          '        grid[1][0] = 8;',
          '        System.out.println(grid[1][0]);',
          '    }',
          '}',
        ],
        active: [2, 3, 4],
        output: ['', '', '8'],
        values: {
          en: [
            'grid = [[1, 2, 3], [4, 5, 6]]',
            'grid = [[1, 2, 3], [8, 5, 6]]',
            'grid[1][0] = 8',
          ],
          es: [
            'grid = [[1, 2, 3], [4, 5, 6]]',
            'grid = [[1, 2, 3], [8, 5, 6]]',
            'grid[1][0] = 8',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = new int[2][3];\n        int row = grid.length - 1;\n        int col = grid[row].length - 1;\n        grid[row][col] = 9;\n        System.out.println(grid[row][col]);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        // Allocate a 2-by-3 grid, set its bottom-right cell, and print.\n    }\n}\n',
      },
    },
    {
      id: '4.12',
      sourcePdfPage: 123,
      content: {
        en: {
          title: '2D Array Traversals',
          description: 'Choose the order of a nested traversal.',
          goal: 'Distinguish row-major from column-major order.',
          explanation:
            'Nested loops visit a rectangular 2D array. Row-major order completes one row before moving to the next; column-major order completes one column first. The outer loop controls which coordinate changes more slowly. An enhanced outer loop receives a row array, and an enhanced inner loop receives an element. Use indexed loops when stored values need replacement.',
          takeaway:
            'Swapping loop roles changes visitation order, not the data.',
          steps: [
            'Create a two-row grid.',
            'Traverse columns outside and rows inside.',
            'Print each visited value on its own line.',
          ],
          practice:
            'In column-major traversal of {{1, 2}, {3, 4}}, which value is visited second?',
          practiceAnswer: '3',
          practiceFeedback: 'The traversal visits 1, 3, 2, 4.',
          practiceHints: [
            'Keep column 0 fixed first.',
            'Move down through the rows.',
            'The second row’s column-0 value is 3.',
          ],
          question: 'Which outer loop fits row-major traversal?',
          choices: [
            'A loop over rows.',
            'A loop over columns only.',
            'A loop starting after the final row.',
          ],
          correct: 0,
          feedback:
            'Row-major order holds the row fixed while the inner loop visits its columns.',
          challenge:
            'Traverse {{2, 4}, {6, 8}} in row-major order and print each value on a separate line.',
          hints: [
            'The outer loop chooses a row.',
            'The inner loop visits columns in that row.',
            'Read grid[r][c] and print 2, 4, 6, 8.',
          ],
          checklist: [
            'Visit each cell once.',
            'Complete each row before the next.',
            'Print 2, 4, 6, 8 on separate lines.',
          ],
        },
        es: {
          title: 'Recorridos de arreglos bidimensionales',
          description: 'Elige el orden de un recorrido anidado.',
          goal: 'Distingue el recorrido por filas del recorrido por columnas.',
          explanation:
            'Los ciclos anidados visitan un arreglo bidimensional rectangular. El recorrido por filas completa una fila antes de pasar a la siguiente; el recorrido por columnas completa primero una columna. El ciclo externo controla la coordenada que cambia más lentamente. Un for mejorado externo recibe una fila y el interno recibe un elemento. Usa índices cuando necesites reemplazar valores almacenados.',
          takeaway:
            'Intercambiar las funciones de los ciclos cambia el orden de visita.',
          steps: [
            'Crea una matriz de dos filas.',
            'Recorre columnas por fuera y filas por dentro.',
            'Imprime cada valor visitado en su propia línea.',
          ],
          practice:
            'Al recorrer {{1, 2}, {3, 4}} por columnas, ¿qué valor se visita segundo?',
          practiceAnswer: '3',
          practiceFeedback: 'El recorrido visita 1, 3, 2, 4.',
          practiceHints: [
            'Primero mantén fija la columna 0.',
            'Avanza hacia abajo por las filas.',
            'La columna 0 de la segunda fila contiene 3.',
          ],
          question: '¿Qué ciclo externo corresponde a un recorrido por filas?',
          choices: [
            'Un ciclo sobre las filas.',
            'Un ciclo solo sobre las columnas.',
            'Un ciclo que empieza después de la última fila.',
          ],
          correct: 0,
          feedback:
            'El recorrido por filas mantiene la fila fija mientras el ciclo interno visita sus columnas.',
          challenge:
            'Recorre {{2, 4}, {6, 8}} por filas e imprime cada valor en una línea separada.',
          hints: [
            'El ciclo externo elige la fila.',
            'El interno visita las columnas de esa fila.',
            'Lee grid[r][c] e imprime 2, 4, 6, 8.',
          ],
          checklist: [
            'Visita cada celda una vez.',
            'Completa cada fila antes de la siguiente.',
            'Imprime 2, 4, 6, 8 en líneas separadas.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[][] grid = {{1, 2}, {3, 4}};',
          '        for (int c = 0; c < grid[0].length; c++) {',
          '            for (int r = 0; r < grid.length; r++) {',
          '                System.out.println(grid[r][c]);',
          '            }',
          '        }',
          '        // Traversal complete.',
          '    }',
          '}',
        ],
        active: [2, 5, 8],
        output: ['', '1\n3\n2\n4', '1\n3\n2\n4'],
        values: {
          en: [
            'grid = [[1, 2], [3, 4]]',
            'visited (0,0), (1,0), (0,1), (1,1)',
            'all 4 cells visited',
          ],
          es: [
            'grid = [[1, 2], [3, 4]]',
            'visitadas (0,0), (1,0), (0,1), (1,1)',
            'las 4 celdas visitadas',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{2, 4}, {6, 8}};\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[r].length; c++) { System.out.println(grid[r][c]); }\n        }\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{2, 4}, {6, 8}};\n        // Print all values in row-major order.\n    }\n}\n',
      },
    },
    {
      id: '4.13',
      sourcePdfPage: 124,
      content: {
        en: {
          title: 'Implementing 2D Array Algorithms',
          description: 'Summarize a selected region.',
          goal: 'Accumulate a column total across all rows.',
          explanation:
            'A 2D algorithm must define both the operation and the region: the whole grid, one row, one column, or another subsection. To sum a column, keep its index fixed and vary the row. For independent row totals, reset the accumulator at the start of each row. Correct bounds and accumulator placement are as important as the arithmetic.',
          takeaway: 'Fix one coordinate to analyze a row or column.',
          steps: [
            'Create a grid and select column 1.',
            'Add that column’s value from each row.',
            'Print the column total.',
          ],
          practice: 'What is the sum of column 0 in {{2, 7}, {5, 1}, {3, 4}}?',
          practiceAnswer: '10',
          practiceFeedback: 'Column 0 contains 2, 5, and 3, whose sum is 10.',
          practiceHints: [
            'Choose the first value from every row.',
            'Do not add column 1.',
            'Compute 2 + 5 + 3.',
          ],
          question:
            'To compute a separate sum for each row, where should sum = 0 be placed?',
          choices: [
            'Before all loops only.',
            'At the start of each row’s outer-loop iteration.',
            'After printing every total.',
          ],
          correct: 1,
          feedback:
            'Resetting inside the outer loop prevents one row’s total from carrying into the next.',
          challenge:
            'For {{2, 7}, {5, 1}, {3, 4}}, count all values greater than 4 and print the count.',
          hints: [
            'Use nested loops to visit the entire grid.',
            'Keep one counter outside both loops.',
            'Increment for 7 and 5, then print 2.',
          ],
          checklist: [
            'Visit all six cells.',
            'Use a strict > 4 condition.',
            'Print 2.',
          ],
        },
        es: {
          title: 'Implementación de algoritmos con arreglos bidimensionales',
          description: 'Resume una región seleccionada.',
          goal: 'Acumula el total de una columna en todas las filas.',
          explanation:
            'Un algoritmo bidimensional debe definir la operación y la región: toda la matriz, una fila, una columna u otra sección. Para sumar una columna, mantén fijo su índice y varía la fila. Para obtener totales independientes por fila, reinicia el acumulador al comenzar cada fila. Los límites y la ubicación del acumulador importan tanto como la aritmética.',
          takeaway: 'Fija una coordenada para analizar una fila o columna.',
          steps: [
            'Crea una matriz y selecciona la columna 1.',
            'Suma el valor de esa columna en cada fila.',
            'Imprime el total de la columna.',
          ],
          practice:
            '¿Cuál es la suma de la columna 0 en {{2, 7}, {5, 1}, {3, 4}}?',
          practiceAnswer: '10',
          practiceFeedback: 'La columna 0 contiene 2, 5 y 3; su suma es 10.',
          practiceHints: [
            'Elige el primer valor de cada fila.',
            'No sumes la columna 1.',
            'Calcula 2 + 5 + 3.',
          ],
          question:
            'Para calcular una suma independiente por fila, ¿dónde debe ir sum = 0?',
          choices: [
            'Solo antes de todos los ciclos.',
            'Al inicio de cada iteración del ciclo externo de filas.',
            'Después de imprimir todos los totales.',
          ],
          correct: 1,
          feedback:
            'Reiniciar dentro del ciclo externo evita arrastrar el total de una fila a la siguiente.',
          challenge:
            'Con {{2, 7}, {5, 1}, {3, 4}}, cuenta todos los valores mayores que 4 e imprime el conteo.',
          hints: [
            'Visita toda la matriz con ciclos anidados.',
            'Mantén un único contador fuera de ambos ciclos.',
            'Incrementa para 7 y 5; después imprime 2.',
          ],
          checklist: [
            'Visita las seis celdas.',
            'Usa la condición estricta > 4.',
            'Imprime 2.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[][] grid = {{2, 7}, {5, 1}, {3, 4}};',
          '        int total = 0;',
          '        for (int r = 0; r < grid.length; r++) {',
          '            total += grid[r][1];',
          '        }',
          '        System.out.println(total);',
          '    }',
          '}',
        ],
        active: [3, 5, 7],
        output: ['', '', '12'],
        values: {
          en: ['column = 1; total = 0', 'total = 7 + 1 + 4 = 12', 'total = 12'],
          es: ['column = 1; total = 0', 'total = 7 + 1 + 4 = 12', 'total = 12'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{2, 7}, {5, 1}, {3, 4}};\n        int count = 0;\n        for (int[] row : grid) {\n            for (int value : row) { if (value > 4) count++; }\n        }\n        System.out.println(count);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{2, 7}, {5, 1}, {3, 4}};\n        // Count values greater than 4 throughout the grid.\n    }\n}\n',
      },
    },
    {
      id: '4.14',
      sourcePdfPage: 125,
      content: {
        en: {
          title: 'Searching Algorithms',
          description: 'Look for a target without sorted data.',
          goal: 'Trace linear search and its not-found result.',
          explanation:
            'Linear search compares a target with elements one at a time. It works on unsorted collections and can stop when a match appears. A forward search that returns immediately reports the first matching index. If the traversal finishes without a match, return a documented sentinel such as -1. Searching a grid requires applying the same comparison across its rows.',
          takeaway: 'Check an element before declaring that the search failed.',
          steps: [
            'Provide an unsorted array and a target.',
            'Scan from index zero until the target appears.',
            'Print the first matching index.',
          ],
          practice: 'What first index contains 6 in {4, 6, 2, 6}?',
          practiceAnswer: '1',
          practiceFeedback: 'The first 6 is at zero-based index 1.',
          practiceHints: [
            'Indices begin at zero.',
            'Ignore later duplicates once the first match is found.',
            'The second element is the first match.',
          ],
          question: 'Where should a linear-search method return -1?',
          choices: [
            'After the first nonmatch.',
            'After all elements have been checked without a match.',
            'Before checking the first element.',
          ],
          correct: 1,
          feedback:
            'A nonmatch at one index says nothing about later elements; only an exhausted search establishes absence.',
          challenge:
            'Write a linear search for target 9 in {3, 7, 4}. Print its index if found, or -1 if absent.',
          hints: [
            'Initialize a result to -1.',
            'Scan all valid indices; on a match store the index and break.',
            'Print the result after the loop.',
          ],
          checklist: [
            'Do not require sorted input.',
            'Check the complete array when absent.',
            'Print -1.',
          ],
        },
        es: {
          title: 'Algoritmos de búsqueda',
          description: 'Busca un objetivo sin necesitar datos ordenados.',
          goal: 'Sigue la búsqueda lineal y su resultado de ausencia.',
          explanation:
            'La búsqueda lineal compara un objetivo con los elementos uno por uno. Funciona en colecciones desordenadas y puede detenerse al encontrar una coincidencia. Si recorre hacia delante y devuelve de inmediato, informa el primer índice coincidente. Si termina sin coincidencias, devuelve un indicador documentado como -1. Buscar en una matriz requiere aplicar la misma comparación a sus filas.',
          takeaway:
            'Revisa los elementos antes de declarar que la búsqueda falló.',
          steps: [
            'Proporciona un arreglo desordenado y un objetivo.',
            'Recorre desde cero hasta encontrar el objetivo.',
            'Imprime el primer índice coincidente.',
          ],
          practice: '¿Qué primer índice contiene 6 en {4, 6, 2, 6}?',
          practiceAnswer: '1',
          practiceFeedback:
            'El primer 6 está en el índice 1, contando desde cero.',
          practiceHints: [
            'Los índices empiezan en cero.',
            'Ignora duplicados posteriores al encontrar el primero.',
            'El segundo elemento es la primera coincidencia.',
          ],
          question: '¿Dónde debe devolver -1 un método de búsqueda lineal?',
          choices: [
            'Tras la primera discrepancia.',
            'Después de revisar todo sin encontrar coincidencia.',
            'Antes de revisar el primer elemento.',
          ],
          correct: 1,
          feedback:
            'Una discrepancia no descarta los elementos posteriores; solo agotar la búsqueda demuestra ausencia.',
          challenge:
            'Escribe una búsqueda lineal del objetivo 9 en {3, 7, 4}. Imprime su índice si aparece o -1 si está ausente.',
          hints: [
            'Inicializa el resultado en -1.',
            'Recorre los índices; si coincide, guarda el índice y usa break.',
            'Imprime el resultado después del ciclo.',
          ],
          checklist: [
            'No exijas datos ordenados.',
            'Revisa todo el arreglo si el objetivo no aparece.',
            'Imprime -1.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[] values = {4, 6, 2, 6};',
          '        int found = -1;',
          '        for (int i = 0; i < values.length; i++) {',
          '            if (values[i] == 6) {',
          '                found = i;',
          '                break;',
          '            }',
          '        }',
          '        System.out.println(found);',
          '    }',
          '}',
        ],
        active: [3, 6, 10],
        output: ['', '', '1'],
        values: {
          en: [
            'found = -1; target = 6',
            'found = 1; loop stopped',
            'found = 1',
          ],
          es: [
            'found = -1; target = 6',
            'found = 1; bucle detenido',
            'found = 1',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {3, 7, 4};\n        int target = 9;\n        int found = -1;\n        for (int i = 0; i < values.length; i++) {\n            if (values[i] == target) { found = i; break; }\n        }\n        System.out.println(found);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {3, 7, 4};\n        int target = 9;\n        // Search linearly and print the index or -1.\n    }\n}\n',
      },
    },
    {
      id: '4.15',
      sourcePdfPage: 126,
      content: {
        en: {
          title: 'Sorting Algorithms',
          description: 'Trace how a sorted region grows.',
          goal: 'Distinguish selection sort from insertion sort.',
          explanation:
            'Selection sort finds the smallest remaining value and swaps it into the next final position. Insertion sort instead takes the next unsorted value and shifts larger values within a sorted prefix to make space. Both repeat work over a shrinking unsorted region, but their intermediate states differ. Trace the boundaries and temporary variables rather than assuming every pass makes identical changes.',
          takeaway:
            'Selection chooses a minimum; insertion shifts a sorted prefix.',
          steps: [
            'Begin with three unsorted values.',
            'Selection sort places each remaining minimum at the front.',
            'Print the sorted values.',
          ],
          practice:
            'After the first selection-sort pass on {7, 3, 5}, what value is at index 0?',
          practiceAnswer: '3',
          practiceFeedback:
            'The first pass swaps the smallest value, 3, into index 0.',
          practiceHints: [
            'The unsorted region initially contains all three values.',
            'Find its smallest value.',
            'The first pass fixes that value at index 0.',
          ],
          question: 'Which action characterizes insertion sort?',
          choices: [
            'Always swapping the last two values.',
            'Shifting larger prefix values to insert the next value.',
            'Discarding all duplicate values.',
          ],
          correct: 1,
          feedback:
            'Insertion sort makes space within an already sorted prefix; it preserves all elements, including duplicates.',
          challenge:
            'Use insertion sort to sort {6, 2, 4} in ascending order, then print each value on a separate line.',
          hints: [
            'For each index from 1, save the current value.',
            'Shift larger prefix elements one position right.',
            'Insert the saved value at j + 1; print 2, 4, 6.',
          ],
          checklist: [
            'Use insertion sort rather than a library sort.',
            'Preserve all three values.',
            'Print 2, 4, 6 on separate lines.',
          ],
        },
        es: {
          title: 'Algoritmos de ordenamiento',
          description: 'Sigue el crecimiento de la región ordenada.',
          goal: 'Distingue selección de inserción.',
          explanation:
            'El ordenamiento por selección busca el menor valor restante y lo intercambia hacia su posición definitiva. El de inserción toma el siguiente valor pendiente y desplaza los mayores del prefijo ordenado para abrir espacio. Ambos repiten operaciones sobre una región pendiente que disminuye, pero producen estados intermedios distintos. Sigue los límites y las variables temporales sin suponer que cada pasada realiza los mismos cambios.',
          takeaway:
            'Selección elige un mínimo; inserción desplaza un prefijo ordenado.',
          steps: [
            'Empieza con tres valores desordenados.',
            'Selección coloca cada mínimo restante al principio.',
            'Imprime los valores ordenados.',
          ],
          practice:
            'Tras la primera pasada de selección sobre {7, 3, 5}, ¿qué valor ocupa el índice 0?',
          practiceAnswer: '3',
          practiceFeedback:
            'La primera pasada intercambia el menor valor, 3, hacia el índice 0.',
          practiceHints: [
            'La región pendiente contiene inicialmente los tres valores.',
            'Encuentra el menor.',
            'La primera pasada lo fija en el índice 0.',
          ],
          question: '¿Qué acción caracteriza el ordenamiento por inserción?',
          choices: [
            'Intercambiar siempre los dos últimos valores.',
            'Desplazar valores mayores del prefijo para insertar el siguiente.',
            'Descartar todos los duplicados.',
          ],
          correct: 1,
          feedback:
            'Inserción abre espacio dentro de un prefijo ordenado y conserva todos los elementos, incluidos los duplicados.',
          challenge:
            'Usa inserción para ordenar {6, 2, 4} de menor a mayor; después imprime cada valor en una línea separada.',
          hints: [
            'Desde el índice 1, guarda el valor actual.',
            'Desplaza una posición a la derecha los mayores del prefijo.',
            'Inserta el valor guardado en j + 1 e imprime 2, 4, 6.',
          ],
          checklist: [
            'Usa inserción sin una función de biblioteca.',
            'Conserva los tres valores.',
            'Imprime 2, 4, 6 en líneas separadas.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[] values = {7, 3, 5};',
          '        for (int i = 0; i < values.length - 1; i++) {',
          '            int min = i;',
          '            for (int j = i + 1; j < values.length; j++) {',
          '                if (values[j] < values[min]) {',
          '                    min = j;',
          '                }',
          '            }',
          '            int temp = values[i];',
          '            values[i] = values[min];',
          '            values[min] = temp;',
          '        }',
          '        for (int value : values) {',
          '            System.out.println(value);',
          '        }',
          '    }',
          '}',
        ],
        active: [2, 12, 15],
        output: ['', '', '3\n5\n7'],
        values: {
          en: [
            'values = [7, 3, 5]',
            'values = [3, 5, 7]',
            'values = [3, 5, 7]',
          ],
          es: [
            'values = [7, 3, 5]',
            'values = [3, 5, 7]',
            'values = [3, 5, 7]',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {6, 2, 4};\n        for (int i = 1; i < values.length; i++) {\n            int current = values[i];\n            int j = i - 1;\n            while (j >= 0 && values[j] > current) {\n                values[j + 1] = values[j];\n                j--;\n            }\n            values[j + 1] = current;\n        }\n        for (int value : values) { System.out.println(value); }\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {6, 2, 4};\n        // Implement insertion sort, then print each value.\n    }\n}\n',
      },
    },
    {
      id: '4.16',
      sourcePdfPage: 127,
      content: {
        en: {
          title: 'Recursion',
          description: 'Trace calls and returning values.',
          goal: 'Recognize a base case and progress toward it.',
          explanation:
            'A recursive method calls itself with a smaller problem until a base case returns directly. Each call has its own parameter and local variables, so pending operations resume as calls return. In sumTo, a nonnegative input decreases toward zero and the additions happen during return. AP CSA emphasizes tracing provided recursion; writing recursive methods is outside its assessed scope.',
          takeaway:
            'Termination needs a reachable base case and progress on every recursive path.',
          steps: [
            'Call sumTo with 3; calls descend to 0.',
            'Return from the base case and combine 1 + 2 + 3.',
            'Print the returned sum.',
          ],
          practice: 'For the provided sumTo method, what does sumTo(2) return?',
          practiceAnswer: '3',
          practiceFeedback: 'sumTo(2) is 2 + sumTo(1), which is 2 + 1 + 0.',
          practiceHints: [
            'sumTo(0) returns 0.',
            'sumTo(1) returns 1 + 0.',
            'sumTo(2) adds 2 to that result.',
          ],
          question: 'Which input is guaranteed to reach n == 0 using n - 1?',
          choices: [
            'A nonnegative integer.',
            'Any negative integer.',
            'Only Integer.MAX_VALUE.',
          ],
          correct: 0,
          feedback:
            'Nonnegative integers decrease to zero. A negative starting value moves away from the base case.',
          challenge:
            'Keep the supplied recursive sumTo helper unchanged. In main, call it for 4 and 0, printing each result on a separate line.',
          hints: [
            'Call the helper by name from main.',
            'sumTo(4) returns 4 + 3 + 2 + 1 + 0.',
            'Print the second call too; the base case returns 0.',
          ],
          checklist: [
            'Use the provided helper without editing it.',
            'Call sumTo for both required inputs.',
            'Print 10 and 0 on separate lines.',
          ],
        },
        es: {
          title: 'Recursión',
          description: 'Sigue las llamadas y los valores devueltos.',
          goal: 'Reconoce el caso base y el avance hacia él.',
          explanation:
            'Un método recursivo se llama a sí mismo con un problema menor hasta que un caso base devuelve directamente. Cada llamada tiene sus propios parámetros y variables; las operaciones pendientes continúan al regresar. En sumTo, una entrada no negativa disminuye hacia cero y las sumas se completan al retornar. AP CSA evalúa seguir recursión proporcionada, no escribir métodos recursivos.',
          takeaway:
            'La terminación requiere un caso base alcanzable y avance en cada camino recursivo.',
          steps: [
            'Llama sumTo con 3; las llamadas descienden hasta 0.',
            'Regresa del caso base y combina 1 + 2 + 3.',
            'Imprime la suma devuelta.',
          ],
          practice:
            'Con el método sumTo proporcionado, ¿qué devuelve sumTo(2)?',
          practiceAnswer: '3',
          practiceFeedback: 'sumTo(2) es 2 + sumTo(1), es decir, 2 + 1 + 0.',
          practiceHints: [
            'sumTo(0) devuelve 0.',
            'sumTo(1) devuelve 1 + 0.',
            'sumTo(2) suma 2 a ese resultado.',
          ],
          question: '¿Qué entrada garantiza alcanzar n == 0 mediante n - 1?',
          choices: [
            'Un entero no negativo.',
            'Cualquier entero negativo.',
            'Solo Integer.MAX_VALUE.',
          ],
          correct: 0,
          feedback:
            'Los enteros no negativos disminuyen hasta cero. Un valor inicial negativo se aleja del caso base.',
          challenge:
            'Conserva sin cambios el método recursivo sumTo proporcionado. Desde main, llámalo con 4 y 0 e imprime cada resultado en una línea.',
          hints: [
            'Llama al método por su nombre desde main.',
            'sumTo(4) devuelve 4 + 3 + 2 + 1 + 0.',
            'Imprime también la segunda llamada: el caso base devuelve 0.',
          ],
          checklist: [
            'Usa el método proporcionado sin modificarlo.',
            'Llama sumTo con las dos entradas.',
            'Imprime 10 y 0 en líneas separadas.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int result = sumTo(3);',
          '        System.out.println(result);',
          '    }',
          '    static int sumTo(int n) {',
          '        if (n == 0) return 0;',
          '        return n + sumTo(n - 1);',
          '    }',
          '}',
        ],
        active: [2, 7, 3],
        output: ['', '', '6'],
        values: {
          en: ['pending additions: 3 + 2 + 1 + 0', 'result = 6', 'result = 6'],
          es: ['sumas pendientes: 3 + 2 + 1 + 0', 'result = 6', 'result = 6'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        System.out.println(sumTo(4));\n        System.out.println(sumTo(0));\n    }\n    static int sumTo(int n) {\n        if (n == 0) return 0;\n        return n + sumTo(n - 1);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        // Call sumTo(4) and sumTo(0), printing both results.\n    }\n    static int sumTo(int n) {\n        if (n == 0) return 0;\n        return n + sumTo(n - 1);\n    }\n}\n',
      },
    },
    {
      id: '4.17',
      sourcePdfPage: 128,
      content: {
        en: {
          title: 'Recursive Searching and Sorting',
          description: 'Reduce search intervals and merge sorted halves.',
          goal: 'Trace recursive binary search on sorted data.',
          explanation:
            'Binary search requires sorted data. Compare with the middle value, then recursively search only the half that can contain the target; an empty interval returns -1. Merge sort also divides a problem, but recursively sorts both halves and merges their ordered results. Its merge step repeatedly takes the smaller available front value, preserving duplicates rather than discarding them.',
          takeaway:
            'Binary search selects one half; merge sort processes both halves and combines them.',
          steps: [
            'Search for 10 in a sorted array with bounds 0 through 4.',
            'Compare middle 6, then 10 in the right interval.',
            'Print the matching index returned through the calls.',
          ],
          practice:
            'For sorted {2, 4, 6, 8, 10}, what first mid index is computed from low = 0 and high = 4?',
          practiceAnswer: '2',
          practiceFeedback: 'Integer division gives mid = 0 + (4 - 0) / 2 = 2.',
          practiceHints: [
            'Use low + (high - low) / 2.',
            'The interval contains five positions.',
            'Its central zero-based index is 2.',
          ],
          question:
            'What does merging the sorted halves [1, 5] and [2, 4] produce?',
          choices: ['[1, 5, 2, 4]', '[1, 2, 4, 5]', '[5, 4, 2, 1]'],
          correct: 1,
          feedback:
            'Merging compares the current front values and takes the smaller one repeatedly, yielding ascending order.',
          challenge:
            'Keep the supplied recursive binarySearch helper unchanged. Search sorted {1, 3, 5, 7} for 5 and 6; print each returned index on a separate line.',
          hints: [
            'Use low = 0 and high = values.length - 1.',
            'Call the helper separately for both targets.',
            '5 is at index 2; absent 6 yields -1.',
          ],
          checklist: [
            'Keep the input sorted and helper unchanged.',
            'Supply inclusive initial bounds.',
            'Print 2 and -1 on separate lines.',
          ],
        },
        es: {
          title: 'Búsqueda y ordenamiento recursivos',
          description: 'Reduce intervalos y combina mitades ordenadas.',
          goal: 'Sigue una búsqueda binaria recursiva con datos ordenados.',
          explanation:
            'La búsqueda binaria requiere datos ordenados. Compara con el valor central y busca recursivamente solo en la mitad que pueda contener el objetivo; un intervalo vacío devuelve -1. El ordenamiento por mezcla también divide, pero ordena ambas mitades y combina sus resultados. La mezcla toma repetidamente el menor valor frontal disponible y conserva los duplicados en lugar de descartarlos.',
          takeaway:
            'Búsqueda binaria elige una mitad; mezcla procesa ambas y las combina.',
          steps: [
            'Busca 10 en un arreglo ordenado con límites 0 y 4.',
            'Compara el centro 6 y luego 10 en el intervalo derecho.',
            'Imprime el índice coincidente devuelto por las llamadas.',
          ],
          practice:
            'Para {2, 4, 6, 8, 10}, ¿qué primer índice mid resulta de low = 0 y high = 4?',
          practiceAnswer: '2',
          practiceFeedback: 'La división entera da mid = 0 + (4 - 0) / 2 = 2.',
          practiceHints: [
            'Usa low + (high - low) / 2.',
            'El intervalo contiene cinco posiciones.',
            'Su índice central, contando desde cero, es 2.',
          ],
          question:
            '¿Qué produce mezclar las mitades ordenadas [1, 5] y [2, 4]?',
          choices: ['[1, 5, 2, 4]', '[1, 2, 4, 5]', '[5, 4, 2, 1]'],
          correct: 1,
          feedback:
            'La mezcla compara los valores frontales actuales y toma repetidamente el menor para producir orden ascendente.',
          challenge:
            'Conserva sin cambios el método recursivo binarySearch proporcionado. Busca 5 y 6 en {1, 3, 5, 7} e imprime cada índice devuelto en una línea.',
          hints: [
            'Usa low = 0 y high = values.length - 1.',
            'Llama al método por separado para cada objetivo.',
            '5 está en el índice 2; la ausencia de 6 produce -1.',
          ],
          checklist: [
            'Conserva los datos ordenados y el método sin cambios.',
            'Proporciona límites iniciales inclusivos.',
            'Imprime 2 y -1 en líneas separadas.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '    public static void main(String[] args) {',
          '        int[] values = {2, 4, 6, 10, 12};',
          '        int found = binarySearch(values, 10, 0, values.length - 1);',
          '        System.out.println(found);',
          '    }',
          '    static int binarySearch(int[] a, int target, int low, int high) {',
          '        if (low > high) return -1;',
          '        int mid = low + (high - low) / 2;',
          '        if (a[mid] == target) return mid;',
          '        if (target < a[mid]) return binarySearch(a, target, low, mid - 1);',
          '        return binarySearch(a, target, mid + 1, high);',
          '    }',
          '}',
        ],
        active: [2, 3, 4],
        output: ['', '', '3'],
        values: {
          en: [
            'low = 0; high = 4; target = 10',
            'mid = 2 → right [3,4] → mid = 3; found = 3',
            'found = 3',
          ],
          es: [
            'low = 0; high = 4; target = 10',
            'mid = 2 → derecha [3,4] → mid = 3; found = 3',
            'found = 3',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {1, 3, 5, 7};\n        System.out.println(binarySearch(values, 5, 0, values.length - 1));\n        System.out.println(binarySearch(values, 6, 0, values.length - 1));\n    }\n    static int binarySearch(int[] a, int target, int low, int high) {\n        if (low > high) return -1;\n        int mid = low + (high - low) / 2;\n        if (a[mid] == target) return mid;\n        if (target < a[mid]) return binarySearch(a, target, low, mid - 1);\n        return binarySearch(a, target, mid + 1, high);\n    }\n}\n',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        int[] values = {1, 3, 5, 7};\n        // Call binarySearch for 5 and 6 and print each result.\n    }\n    static int binarySearch(int[] a, int target, int low, int high) {\n        if (low > high) return -1;\n        int mid = low + (high - low) / 2;\n        if (a[mid] == target) return mid;\n        if (target < a[mid]) return binarySearch(a, target, low, mid - 1);\n        return binarySearch(a, target, mid + 1, high);\n    }\n}\n',
      },
    },
  ],
};
