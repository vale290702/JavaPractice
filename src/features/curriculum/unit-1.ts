import type { CurriculumUnit } from './types';

export const unit1: CurriculumUnit = {
  id: 'unit-1',
  number: 1,
  title: {
    en: 'Using Objects and Methods',
    es: 'Uso de objetos y métodos',
  },
  description: {
    en: 'Start with algorithms and values, then use Java’s classes, objects, methods, and text operations.',
    es: 'Empieza con algoritmos y valores; luego usa clases, objetos, métodos y operaciones de texto de Java.',
  },
  topics: [
    {
      id: '1.1',
      sourcePdfPage: 37,
      content: {
        en: {
          title: 'Introduction to Algorithms, Programming, and Compilers',
          description: 'Turn a plan into instructions.',
          goal: 'Distinguish an algorithm, source code, compilation, and execution.',
          explanation:
            'An algorithm is an ordered plan for solving a problem. Java expresses that plan as source code. A compiler checks syntax and type rules before producing bytecode for the Java runtime. A program can compile and still fail while running or calculate the wrong result: syntax errors, runtime errors, and logic errors are different problems.',
          takeaway:
            'Compilation checks some rules; it does not prove that your algorithm solves the intended problem.',
          steps: [
            'Set the price before using it.',
            'Multiply the price by the quantity, 3.',
            'Print the computed total, 24.',
          ],
          practice:
            'The algorithm starts at 4, adds 2, then multiplies by 3. What is its final value?',
          practiceAnswer: '18',
          practiceFeedback: 'Sequence matters: (4 + 2) * 3 is 18.',
          practiceHints: [
            'Start with 4.',
            'Add 2 before multiplying.',
            'Multiply 6 by 3.',
          ],
          question:
            'A program compiles but uses addition instead of multiplication. What kind of error is this?',
          choices: ['Syntax error', 'Logic error', 'Missing compiler'],
          correct: 1,
          feedback:
            'The code is legal Java, but the algorithm does the wrong calculation.',
          challenge:
            'Store a price of 5 and a quantity of 4, compute their product, and print 20.',
          hints: [
            'Declare price and quantity before the calculation.',
            'Use * to multiply the values.',
            'Store the result in total and print it.',
          ],
          checklist: [
            'Declare the two inputs.',
            'Compute price * quantity.',
            'Print 20.',
          ],
        },
        es: {
          title: 'Introducción a algoritmos, programación y compiladores',
          description: 'Convierte un plan en instrucciones.',
          goal: 'Distingue un algoritmo, el código fuente, la compilación y la ejecución.',
          explanation:
            'Un algoritmo es un plan ordenado para resolver un problema. Java expresa ese plan mediante código fuente. El compilador comprueba reglas de sintaxis y tipos antes de producir bytecode para el entorno de Java. Un programa puede compilar y aun así fallar al ejecutarse o calcular un resultado incorrecto: los errores de sintaxis, ejecución y lógica son distintos.',
          takeaway:
            'Compilar comprueba algunas reglas; no demuestra que el algoritmo resuelva el problema previsto.',
          steps: [
            'Establece el precio antes de usarlo.',
            'Multiplica el precio por la cantidad, 3.',
            'Imprime el total calculado: 24.',
          ],
          practice:
            'El algoritmo empieza en 4, suma 2 y luego multiplica por 3. ¿Cuál es el valor final?',
          practiceAnswer: '18',
          practiceFeedback: 'El orden importa: (4 + 2) * 3 es 18.',
          practiceHints: [
            'Empieza con 4.',
            'Suma 2 antes de multiplicar.',
            'Multiplica 6 por 3.',
          ],
          question:
            'Un programa compila, pero suma en lugar de multiplicar. ¿Qué tipo de error es?',
          choices: [
            'Error de sintaxis',
            'Error de lógica',
            'Falta de compilador',
          ],
          correct: 1,
          feedback:
            'El código es Java válido, pero el algoritmo realiza un cálculo incorrecto.',
          challenge:
            'Guarda un precio de 5 y una cantidad de 4, calcula su producto e imprime 20.',
          hints: [
            'Declara price y quantity antes del cálculo.',
            'Usa * para multiplicar los valores.',
            'Guarda el resultado en total e imprímelo.',
          ],
          checklist: [
            'Declara los dos datos de entrada.',
            'Calcula price * quantity.',
            'Imprime 20.',
          ],
        },
      },
      example: {
        lines: [
          'int price = 8;',
          'int total = price * 3;',
          'System.out.println(total);',
        ],
        active: [0, 1, 2],
        output: ['', '', '24'],
        values: {
          en: ['price = 8', 'total = 24', 'total = 24'],
          es: ['price = 8', 'total = 24', 'total = 24'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int price = 5;\n        int quantity = 4;\n        int total = price * quantity;\n        System.out.println(total);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.2',
      sourcePdfPage: 39,
      content: {
        en: {
          title: 'Variables and Data Types',
          description: 'Give your data a name.',
          goal: 'Choose a type, store a value, and follow a value as it changes.',
          explanation:
            'A variable is a named place to store a value. In Java, its type tells the program what kind of value belongs there. Declare a variable before using it, and choose a name that explains its purpose. Primitive types such as int, double, and boolean store values; String is a reference type.',
          takeaway:
            'int stores whole numbers. String stores text. An assignment evaluates the expression on the right, then stores the result in the variable on the left.',
          steps: [
            'Declare score as an integer and give it the value 10.',
            'Read the current score, add 5, and store 15 back in score.',
            'Print score. The console shows 15.',
          ],
          practice:
            'After int age = 15; followed by age = age + 1;, what value does age hold?',
          practiceAnswer: '16',
          practiceFeedback:
            'The expression reads the old value, 15, adds 1, then stores 16.',
          question: 'Which declaration correctly stores the text Java?',
          choices: [
            'int language = "Java";',
            'String language = "Java";',
            'boolean language = "Java";',
          ],
          correct: 1,
          feedback:
            'String is the Java type for text. Text values use double quotation marks.',
          challenge:
            'Create an integer named points with a value of 20. Add 10 to it, then print the result.',
          practiceHints: [
            'Read the starting value of age: 15.',
            'Evaluate age + 1 using that starting value.',
            'Assign the sum back to age.',
          ],
          hints: [
            'Declare the variable with int points = 20;',
            'Update it with points = points + 10;',
            'Print the value using System.out.println(points);',
          ],
          checklist: [
            'Declare points as an int with value 20.',
            'Add 10 to the existing value.',
            'Print points; the expected output is 30.',
          ],
        },
        es: {
          title: 'Variables y tipos de datos',
          description: 'Dale un nombre a tus datos.',
          goal: 'Elige un tipo, guarda un valor y sigue sus cambios.',
          explanation:
            'Una variable es un espacio con nombre para guardar un valor. En Java, su tipo indica qué clase de valor puede contener. Declara la variable antes de usarla y elige un nombre que explique su propósito. Los tipos primitivos como int, double y boolean guardan valores; String es un tipo de referencia.',
          takeaway:
            'int guarda números enteros. String guarda texto. Una asignación evalúa la expresión de la derecha y reemplaza el valor de la variable.',
          steps: [
            'Declara score como entero y asígnale el valor 10.',
            'Lee el valor actual, suma 5 y guarda 15 en score.',
            'Imprime score. La consola muestra 15.',
          ],
          practice:
            'Después de int age = 15; y age = age + 1;, ¿qué valor tiene age?',
          practiceAnswer: '16',
          practiceFeedback: 'La expresión lee 15, suma 1 y guarda 16.',
          question: '¿Qué declaración guarda correctamente el texto Java?',
          choices: [
            'int language = "Java";',
            'String language = "Java";',
            'boolean language = "Java";',
          ],
          correct: 1,
          feedback:
            'String es el tipo de Java para texto. El texto se escribe entre comillas dobles.',
          challenge:
            'Crea un entero llamado points con valor 20. Súmale 10 e imprime el resultado.',
          practiceHints: [
            'Lee el valor inicial de age: 15.',
            'Evalúa age + 1 con ese valor inicial.',
            'Guarda la suma en age.',
          ],
          hints: [
            'Declara la variable con int points = 20;',
            'Actualízala con points = points + 10;',
            'Imprime el valor con System.out.println(points);',
          ],
          checklist: [
            'Declara points como int con valor 20.',
            'Suma 10 al valor existente.',
            'Imprime points; la salida esperada es 30.',
          ],
        },
      },
      example: {
        lines: [
          'int score = 10;',
          'score = score + 5;',
          'System.out.println(score);',
        ],
        active: [0, 1, 2],
        output: ['', '', '15'],
        values: {
          en: ['score = 10', 'score = 15', 'score = 15'],
          es: ['score = 10', 'score = 15', 'score = 15'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int points = 20;\n        points = points + 10;\n        System.out.println(points);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.3',
      sourcePdfPage: 40,
      content: {
        en: {
          title: 'Expressions and Output',
          description: 'Evaluate first, then print.',
          goal: 'Apply arithmetic precedence and distinguish print from println.',
          explanation:
            'An expression combines values and operators to produce a result. Multiplication, division, and remainder run before addition and subtraction unless parentheses change the order. Dividing two int values gives an integer quotient, dropping the fractional part. print writes without ending the line; println also starts a new line. String concatenation evaluates from left to right.',
          takeaway:
            '7 / 2 is 3, while 7.0 / 2 is 3.5. Parentheses make your intended order explicit.',
          steps: [
            'Multiply 3 by 4 before adding 2: result is 14.',
            'print writes 14 without a line break.',
            'println adds the text and finishes the line.',
          ],
          practice: 'What is the value of the Java expression 7 / 2?',
          practiceAnswer: '3',
          practiceFeedback:
            'Both operands are int, so integer division discards the fractional part.',
          practiceHints: [
            'Check the types of 7 and 2.',
            'Both literals are integers.',
            'Keep only the integer quotient.',
          ],
          question: 'Which expression evaluates to 20?',
          choices: ['2 + 3 * 4', '(2 + 3) * 4', '2 + (3 * 4)'],
          correct: 1,
          feedback:
            'Parentheses make the addition happen before multiplication.',
          challenge:
            'Calculate (6 + 4) / 2 and print the result, 5, on its own line.',
          hints: [
            'Group the addition with parentheses.',
            'Both operands are integers; this division is exact.',
            'Pass the expression or its stored result to println.',
          ],
          checklist: ['Add before dividing.', 'Calculate 5.', 'Use println.'],
        },
        es: {
          title: 'Expresiones y salida',
          description: 'Evalúa primero y luego imprime.',
          goal: 'Aplica la precedencia aritmética y distingue print de println.',
          explanation:
            'Una expresión combina valores y operadores para producir un resultado. Multiplicación, división y residuo se evalúan antes de suma y resta, salvo que los paréntesis cambien el orden. Dividir dos int produce un cociente entero, sin la parte fraccionaria. print escribe sin terminar la línea; println también inicia otra. La concatenación se evalúa de izquierda a derecha.',
          takeaway:
            '7 / 2 es 3, mientras que 7.0 / 2 es 3.5. Los paréntesis hacen explícito el orden deseado.',
          steps: [
            'Multiplica 3 por 4 antes de sumar 2: result vale 14.',
            'print escribe 14 sin salto de línea.',
            'println agrega el texto y termina la línea.',
          ],
          practice: '¿Qué valor tiene la expresión de Java 7 / 2?',
          practiceAnswer: '3',
          practiceFeedback:
            'Ambos operandos son int; la división entera descarta la parte fraccionaria.',
          practiceHints: [
            'Revisa los tipos de 7 y 2.',
            'Ambos literales son enteros.',
            'Conserva solo el cociente entero.',
          ],
          question: '¿Qué expresión produce 20?',
          choices: ['2 + 3 * 4', '(2 + 3) * 4', '2 + (3 * 4)'],
          correct: 1,
          feedback:
            'Los paréntesis hacen que la suma ocurra antes de multiplicar.',
          challenge:
            'Calcula (6 + 4) / 2 e imprime el resultado, 5, en su propia línea.',
          hints: [
            'Agrupa la suma entre paréntesis.',
            'Los operandos son enteros y esta división es exacta.',
            'Pasa la expresión o el resultado guardado a println.',
          ],
          checklist: ['Suma antes de dividir.', 'Calcula 5.', 'Usa println.'],
        },
      },
      example: {
        lines: [
          'int result = 2 + 3 * 4;',
          'System.out.print(result);',
          'System.out.println(" points");',
        ],
        active: [0, 1, 2],
        output: ['', '14', '14 points'],
        values: {
          en: ['result = 14', 'result = 14', 'result = 14'],
          es: ['result = 14', 'result = 14', 'result = 14'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int result = (6 + 4) / 2;\n        System.out.println(result);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.4',
      sourcePdfPage: 42,
      content: {
        en: {
          title: 'Assignment Statements and Input',
          description: 'Read a value and update it.',
          goal: 'Trace assignment and read an integer using Scanner.',
          explanation:
            'Assignment evaluates the expression on the right, then stores the result in the variable on the left. Reading input supplies values at runtime. Scanner can read text from System.in or another source. This deterministic example reads a supplied string so you can trace the same value every time; it is not an interactive keyboard input field.',
          takeaway:
            'nextInt reads the next integer token. Make sure the input actually contains an integer.',
          steps: [
            'Create a Scanner over the supplied text 12.',
            'Read the integer token into quantity.',
            'Print quantity: 12.',
          ],
          practice: 'After int x = 4; followed by x = x * 2;, what is x?',
          practiceAnswer: '8',
          practiceFeedback:
            'The expression uses the old x, 4, then stores 4 * 2 = 8.',
          practiceHints: [
            'Read the current value 4.',
            'Multiply it by 2.',
            'Store the result back in x.',
          ],
          question:
            'Which method reads an int token from a Scanner named input?',
          choices: ['input.nextInt()', 'input.length()', 'input.println()'],
          correct: 0,
          feedback:
            'nextInt belongs to Scanner and returns the next input integer.',
          challenge:
            'Use Scanner on the string "7", read an integer, add 3, print 10, and close the Scanner.',
          hints: [
            'Construct new Scanner("7").',
            'Store nextInt() in a variable, then add 3.',
            'Print the updated value and call close().',
          ],
          checklist: [
            'Read from the supplied string.',
            'Add 3 to the read value.',
            'Print 10 and close the reader.',
          ],
        },
        es: {
          title: 'Asignaciones y entrada',
          description: 'Lee un valor y actualízalo.',
          goal: 'Sigue una asignación y lee un entero con Scanner.',
          explanation:
            'La asignación evalúa la expresión de la derecha y guarda el resultado en la variable de la izquierda. La entrada proporciona valores al ejecutar. Scanner puede leer System.in u otra fuente. Este ejemplo determinista lee una cadena proporcionada para seguir siempre el mismo valor; no es un campo interactivo de entrada por teclado.',
          takeaway:
            'nextInt lee el siguiente token entero. Asegúrate de que la entrada contenga un entero.',
          steps: [
            'Crea un Scanner sobre el texto proporcionado 12.',
            'Lee el token entero en quantity.',
            'Imprime quantity: 12.',
          ],
          practice: 'Después de int x = 4; y x = x * 2;, ¿cuánto vale x?',
          practiceAnswer: '8',
          practiceFeedback:
            'La expresión usa el valor anterior de x, 4, y guarda 4 * 2 = 8.',
          practiceHints: [
            'Lee el valor actual: 4.',
            'Multiplícalo por 2.',
            'Guarda el resultado en x.',
          ],
          question:
            '¿Qué método lee un token int desde un Scanner llamado input?',
          choices: ['input.nextInt()', 'input.length()', 'input.println()'],
          correct: 0,
          feedback:
            'nextInt pertenece a Scanner y devuelve el siguiente entero de la entrada.',
          challenge:
            'Usa Scanner con la cadena "7", lee un entero, suma 3, imprime 10 y cierra el Scanner.',
          hints: [
            'Construye new Scanner("7").',
            'Guarda nextInt() en una variable y suma 3.',
            'Imprime el valor actualizado y llama a close().',
          ],
          checklist: [
            'Lee la cadena proporcionada.',
            'Suma 3 al valor leído.',
            'Imprime 10 y cierra el lector.',
          ],
        },
      },
      example: {
        lines: [
          'import java.util.Scanner;',
          'Scanner input = new Scanner("12");',
          'int quantity = input.nextInt();',
          'System.out.println(quantity);',
        ],
        active: [1, 2, 3],
        output: ['', '', '12'],
        values: {
          en: ['input contains "12"', 'quantity = 12', 'quantity = 12'],
          es: ['input contiene "12"', 'quantity = 12', 'quantity = 12'],
        },
        solution:
          'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner input = new Scanner("7");\n        int value = input.nextInt();\n        value = value + 3;\n        System.out.println(value);\n        input.close();\n    }\n}',
        starter:
          'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.5',
      sourcePdfPage: 43,
      content: {
        en: {
          title: 'Casting and Range of Variables',
          description: 'Be deliberate about numeric types.',
          goal: 'Use casts before arithmetic and recognize the finite int range.',
          explanation:
            'A cast requests a conversion to another primitive type. Casting double to int truncates toward zero; it does not round. Converting an operand to double before division preserves a fractional quotient. Java int has a finite range, from -2147483648 to 2147483647, and overflowing integer arithmetic wraps around rather than increasing that range.',
          takeaway:
            'Casting after integer division cannot restore a fraction that was already discarded.',
          steps: [
            'Truncate 7.9 toward zero: whole becomes 7.',
            'Cast 7 before division, so ratio is 3.5.',
            'Print the double value 3.5.',
          ],
          practice: 'What is (int) -3.8?',
          practiceAnswer: '-3',
          practiceFeedback:
            'Truncation moves toward zero, giving -3 rather than -4.',
          practiceHints: [
            'A cast to int does not round.',
            'Remove the fractional part.',
            'Keep the negative sign.',
          ],
          question: 'Which expression produces 2.5?',
          choices: ['(double) (5 / 2)', '(double) 5 / 2', '5 / 2'],
          correct: 1,
          feedback:
            'Casting 5 before division makes the division floating point.',
          challenge:
            'Compute the average of 7 and 8 using double division and print 7.5.',
          hints: [
            'Add 7 and 8.',
            'Cast the sum to double before dividing by 2.',
            'Print the double result.',
          ],
          checklist: [
            'Convert before division.',
            'Store the average as double.',
            'Print 7.5.',
          ],
        },
        es: {
          title: 'Conversiones y rango de las variables',
          description: 'Elige conscientemente los tipos numéricos.',
          goal: 'Usa conversiones antes de calcular y reconoce el rango finito de int.',
          explanation:
            'Una conversión explícita solicita otro tipo primitivo. Convertir double a int trunca hacia cero; no redondea. Convertir un operando a double antes de dividir conserva la parte fraccionaria. int tiene un rango finito, de -2147483648 a 2147483647, y un desbordamiento entero vuelve al otro extremo en lugar de ampliar el rango.',
          takeaway:
            'Convertir después de una división entera no recupera una fracción ya descartada.',
          steps: [
            'Trunca 7.9 hacia cero: whole vale 7.',
            'Convierte 7 antes de dividir: ratio vale 3.5.',
            'Imprime el valor double: 3.5.',
          ],
          practice: '¿Cuánto vale (int) -3.8?',
          practiceAnswer: '-3',
          practiceFeedback:
            'La truncación avanza hacia cero y produce -3, no -4.',
          practiceHints: [
            'Convertir a int no redondea.',
            'Elimina la parte fraccionaria.',
            'Conserva el signo negativo.',
          ],
          question: '¿Qué expresión produce 2.5?',
          choices: ['(double) (5 / 2)', '(double) 5 / 2', '5 / 2'],
          correct: 1,
          feedback:
            'Convertir 5 antes de dividir hace que la división use punto flotante.',
          challenge:
            'Calcula el promedio de 7 y 8 con división double e imprime 7.5.',
          hints: [
            'Suma 7 y 8.',
            'Convierte la suma a double antes de dividir entre 2.',
            'Imprime el resultado double.',
          ],
          checklist: [
            'Convierte antes de dividir.',
            'Guarda el promedio como double.',
            'Imprime 7.5.',
          ],
        },
      },
      example: {
        lines: [
          'int whole = (int) 7.9;',
          'double ratio = (double) 7 / 2;',
          'System.out.println(ratio);',
        ],
        active: [0, 1, 2],
        output: ['', '', '3.5'],
        values: {
          en: ['whole = 7', 'ratio = 3.5', 'ratio = 3.5'],
          es: ['whole = 7', 'ratio = 3.5', 'ratio = 3.5'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        double average = (double) (7 + 8) / 2;\n        System.out.println(average);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.6',
      sourcePdfPage: 45,
      content: {
        en: {
          title: 'Compound Assignment Operators',
          description: 'Update values with intention.',
          goal: 'Read +=, -=, *=, /=, %=, ++, and --.',
          explanation:
            'Compound assignment combines an operation with storing its result. For ordinary int calculations, score += 3 adds 3 to score and keeps the updated value. Increment and decrement change a variable by one. Trace one statement at a time rather than trying to memorize the whole sequence; integer division rules still apply to /=.',
          takeaway:
            'For these int examples, x += 2 has the same effect as x = x + 2.',
          steps: [
            'Initialize count to 4.',
            'Add 3 and store 7.',
            'Print the updated count.',
          ],
          practice: 'After int x = 10; x -= 3; x++; what is x?',
          practiceAnswer: '8',
          practiceFeedback: '10 - 3 is 7, and incrementing gives 8.',
          practiceHints: [
            'Start with 10.',
            'Subtract 3 first.',
            'Then add one with ++.',
          ],
          question: 'What does x *= 2 do for an int x?',
          choices: ['Adds 2 to x', 'Multiplies x by 2', 'Sets x to 2'],
          correct: 1,
          feedback:
            'The * operator multiplies before the updated value is stored.',
          challenge:
            'Start count at 6, double it with *=, decrement it once, then print 11.',
          hints: [
            'Declare int count = 6.',
            'Use count *= 2.',
            'Use count-- before printing.',
          ],
          checklist: ['Initialize 6.', 'Double, then decrement.', 'Print 11.'],
        },
        es: {
          title: 'Operadores de asignación compuesta',
          description: 'Actualiza valores con intención.',
          goal: 'Interpreta +=, -=, *=, /=, %=, ++ y --.',
          explanation:
            'La asignación compuesta combina una operación con guardar su resultado. En cálculos int habituales, score += 3 suma 3 a score y conserva el valor actualizado. Incremento y decremento cambian una variable en uno. Sigue cada sentencia por separado; las reglas de división entera también se aplican a /=.',
          takeaway:
            'En estos ejemplos int, x += 2 tiene el mismo efecto que x = x + 2.',
          steps: [
            'Inicializa count en 4.',
            'Suma 3 y guarda 7.',
            'Imprime el contador actualizado.',
          ],
          practice: 'Después de int x = 10; x -= 3; x++; ¿cuánto vale x?',
          practiceAnswer: '8',
          practiceFeedback: '10 - 3 es 7; el incremento produce 8.',
          practiceHints: [
            'Empieza con 10.',
            'Primero resta 3.',
            'Luego suma uno con ++.',
          ],
          question: '¿Qué hace x *= 2 para un int x?',
          choices: ['Suma 2 a x', 'Multiplica x por 2', 'Asigna 2 a x'],
          correct: 1,
          feedback:
            'El operador * multiplica antes de guardar el valor actualizado.',
          challenge:
            'Inicializa count en 6, duplícalo con *=, redúcelo en uno e imprime 11.',
          hints: [
            'Declara int count = 6.',
            'Usa count *= 2.',
            'Usa count-- antes de imprimir.',
          ],
          checklist: [
            'Inicializa en 6.',
            'Duplica y luego decrementa.',
            'Imprime 11.',
          ],
        },
      },
      example: {
        lines: ['int count = 4;', 'count += 3;', 'System.out.println(count);'],
        active: [0, 1, 2],
        output: ['', '', '7'],
        values: {
          en: ['count = 4', 'count = 7', 'count = 7'],
          es: ['count = 4', 'count = 7', 'count = 7'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int count = 6;\n        count *= 2;\n        count--;\n        System.out.println(count);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.7',
      sourcePdfPage: 46,
      content: {
        en: {
          title: 'Application Program Interface (API) and Libraries',
          description: 'Use a documented tool.',
          goal: 'Use an API contract instead of guessing what a library method does.',
          explanation:
            'A library provides reusable classes and methods. Its API describes the operations callers can use, including parameter types, return types, and behavior. You can use a method without knowing its implementation. Classes in java.lang, including String and Math, are available without an explicit import; other packages may require imports.',
          takeaway:
            'Read what the method promises, its required inputs, and the type it returns.',
          steps: [
            'Create a String with four characters.',
            'Use the documented length() method, which takes no arguments.',
            'Print its int result, 4.',
          ],
          practice:
            'How many arguments does the String method length() require?',
          practiceAnswer: '0',
          practiceFeedback:
            'The empty parameter list means no arguments are supplied.',
          practiceHints: [
            'Look inside the parentheses.',
            'No parameter types are listed.',
            'Count the required arguments.',
          ],
          question:
            'Which class is available through java.lang without an explicit import?',
          choices: ['Scanner', 'Math', 'File'],
          correct: 1,
          feedback:
            'Math is in java.lang. Scanner and File belong to other packages.',
          challenge:
            'Use the documented String.length() method on "planet" and print 6.',
          hints: [
            'Store "planet" in a String variable.',
            'Call length() on the variable, with no arguments.',
            'Print the returned integer.',
          ],
          checklist: [
            'Use a String instance.',
            'Call length(), not a guessed method name.',
            'Print 6.',
          ],
        },
        es: {
          title: 'Interfaz de programación de aplicaciones (API) y bibliotecas',
          description: 'Usa una herramienta documentada.',
          goal: 'Usa el contrato de una API en lugar de adivinar qué hace un método.',
          explanation:
            'Una biblioteca ofrece clases y métodos reutilizables. Su API describe las operaciones disponibles, incluidos tipos de parámetros, valores devueltos y comportamiento. Puedes usar un método sin conocer su implementación. Las clases de java.lang, como String y Math, están disponibles sin importación explícita; otros paquetes pueden necesitarla.',
          takeaway:
            'Lee qué promete el método, qué entradas necesita y qué tipo devuelve.',
          steps: [
            'Crea un String de cuatro caracteres.',
            'Usa length(), que no recibe argumentos.',
            'Imprime el resultado int: 4.',
          ],
          practice:
            '¿Cuántos argumentos necesita el método length() de String?',
          practiceAnswer: '0',
          practiceFeedback:
            'La lista vacía de parámetros significa que no se proporcionan argumentos.',
          practiceHints: [
            'Mira dentro de los paréntesis.',
            'No se enumeran tipos de parámetros.',
            'Cuenta los argumentos necesarios.',
          ],
          question:
            '¿Qué clase está disponible mediante java.lang sin importación explícita?',
          choices: ['Scanner', 'Math', 'File'],
          correct: 1,
          feedback:
            'Math pertenece a java.lang; Scanner y File pertenecen a otros paquetes.',
          challenge:
            'Usa el método documentado String.length() con "planet" e imprime 6.',
          hints: [
            'Guarda "planet" en una variable String.',
            'Llama a length() sin argumentos sobre esa variable.',
            'Imprime el entero devuelto.',
          ],
          checklist: [
            'Usa una instancia String.',
            'Llama a length(), no a un nombre inventado.',
            'Imprime 6.',
          ],
        },
      },
      example: {
        lines: [
          'String word = "code";',
          'int size = word.length();',
          'System.out.println(size);',
        ],
        active: [0, 1, 2],
        output: ['', '', '4'],
        values: {
          en: ['word = "code"', 'size = 4', 'size = 4'],
          es: ['word = "code"', 'size = 4', 'size = 4'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        String word = "planet";\n        System.out.println(word.length());\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.8',
      sourcePdfPage: 47,
      content: {
        en: {
          title: 'Documentation with Comments',
          description: 'Explain why the code exists.',
          goal: 'Distinguish comments, preconditions, and postconditions.',
          explanation:
            'Comments communicate intent to people and are not executed. Java supports single-line comments, block comments, and Javadoc comments for API documentation. A precondition states what must be true before a method runs; a postcondition describes the guaranteed result afterward. Stating a precondition does not automatically add a runtime check.',
          takeaway:
            'A useful comment explains purpose or a contract; it should not disagree with the actual code.',
          steps: [
            'Read the comment; it creates no variable and prints nothing.',
            'Compute 120 minutes.',
            'Print 120; the comment never appears in output.',
          ],
          practice:
            'How many executable statements are in: // note followed on the next line by int x = 3; ?',
          practiceAnswer: '1',
          practiceFeedback:
            'Only the declaration is executed; the comment is ignored.',
          practiceHints: [
            'Separate the two lines.',
            'A // comment is not executed.',
            'Count only the declaration.',
          ],
          question: 'Which describes a precondition?',
          choices: [
            'A required condition before a call',
            'The text printed after every call',
            'A compiler-generated variable',
          ],
          correct: 0,
          feedback:
            'A precondition is an assumption the caller must satisfy before the method runs.',
          challenge:
            'Add a purpose comment, convert 3 hours to minutes, and print 180.',
          hints: [
            'Describe the unit conversion with // or a block comment.',
            'Multiply 3 by 60.',
            'Print the result; comments should not change output.',
          ],
          checklist: [
            'Include a meaningful comment.',
            'Compute minutes correctly.',
            'Print only 180.',
          ],
        },
        es: {
          title: 'Documentación mediante comentarios',
          description: 'Explica por qué existe el código.',
          goal: 'Distingue comentarios, precondiciones y postcondiciones.',
          explanation:
            'Los comentarios comunican intención a las personas y no se ejecutan. Java admite comentarios de una línea, bloques y Javadoc para documentar APIs. Una precondición indica qué debe cumplirse antes de ejecutar un método; una postcondición describe el resultado garantizado después. Escribir una precondición no agrega automáticamente una comprobación en ejecución.',
          takeaway:
            'Un comentario útil explica el propósito o contrato y debe coincidir con el código.',
          steps: [
            'Lee el comentario: no crea variables ni imprime.',
            'Calcula 120 minutos.',
            'Imprime 120; el comentario no aparece en la salida.',
          ],
          practice:
            '¿Cuántas sentencias ejecutables hay en: // note seguido en otra línea por int x = 3; ?',
          practiceAnswer: '1',
          practiceFeedback:
            'Solo se ejecuta la declaración; se ignora el comentario.',
          practiceHints: [
            'Separa las dos líneas.',
            'Un comentario // no se ejecuta.',
            'Cuenta solo la declaración.',
          ],
          question: '¿Qué describe una precondición?',
          choices: [
            'Una condición necesaria antes de una llamada',
            'El texto impreso después de cada llamada',
            'Una variable generada por el compilador',
          ],
          correct: 0,
          feedback:
            'Una precondición es un supuesto que debe satisfacer quien llama al método.',
          challenge:
            'Agrega un comentario de propósito, convierte 3 horas a minutos e imprime 180.',
          hints: [
            'Describe la conversión con // o un comentario de bloque.',
            'Multiplica 3 por 60.',
            'Imprime el resultado; los comentarios no cambian la salida.',
          ],
          checklist: [
            'Incluye un comentario útil.',
            'Calcula correctamente los minutos.',
            'Imprime solo 180.',
          ],
        },
      },
      example: {
        lines: [
          '// Convert whole hours to minutes.',
          'int minutes = 2 * 60;',
          'System.out.println(minutes);',
        ],
        active: [0, 1, 2],
        output: ['', '', '120'],
        values: {
          en: ['no executable statement', 'minutes = 120', 'minutes = 120'],
          es: [
            'ninguna sentencia ejecutable',
            'minutes = 120',
            'minutes = 120',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        // Convert whole hours to minutes.\n        int minutes = 3 * 60;\n        System.out.println(minutes);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.9',
      sourcePdfPage: 48,
      content: {
        en: {
          title: 'Method Signatures',
          description: 'Match a call to its parameters.',
          goal: 'Identify a method by its name and ordered parameter types.',
          explanation:
            'A method header states its access, optional modifiers, return type, name, and parameters. In Java, the signature is the name together with the ordered parameter types; the return type is not part of it. Overloaded methods share a name but have different parameter lists. A caller supplies arguments compatible with the selected signature.',
          takeaway:
            'Changing only the return type cannot create a valid overload.',
          steps: [
            'Select max(int, int) for two int arguments.',
            'Select the double overload for double arguments.',
            'Print the result from the first call, 9.',
          ],
          practice: 'How many parameters are in the signature max(int, int)?',
          practiceAnswer: '2',
          practiceFeedback: 'There are two int parameter positions.',
          practiceHints: [
            'Look at the comma-separated types.',
            'Each listed type describes one parameter.',
            'Count both int entries.',
          ],
          question: 'Which pair can distinguish overloaded Java methods?',
          choices: [
            'Same name and parameters; different return types',
            'Same name; different parameter lists',
            'Different comments only',
          ],
          correct: 1,
          feedback:
            'Overload selection depends on the method name and parameter types, not only the return type.',
          challenge:
            'Call Math.min(int, int) with 8 and 3, store the returned int, and print 3.',
          hints: [
            'Supply two int arguments.',
            'Assign Math.min(8, 3) to an int variable.',
            'Print the stored result.',
          ],
          checklist: [
            'Use min, not max.',
            'Pass exactly two integers.',
            'Print 3.',
          ],
        },
        es: {
          title: 'Firmas de métodos',
          description: 'Relaciona una llamada con sus parámetros.',
          goal: 'Identifica un método por su nombre y tipos de parámetros ordenados.',
          explanation:
            'La cabecera de un método indica acceso, modificadores opcionales, tipo devuelto, nombre y parámetros. En Java, la firma es el nombre junto con los tipos de parámetros en orden; el tipo devuelto no forma parte de ella. Los métodos sobrecargados comparten nombre, pero tienen listas de parámetros distintas. La llamada debe proporcionar argumentos compatibles.',
          takeaway:
            'Cambiar solo el tipo devuelto no crea una sobrecarga válida.',
          steps: [
            'Selecciona max(int, int) para dos argumentos int.',
            'Selecciona la sobrecarga double para argumentos double.',
            'Imprime el resultado de la primera llamada: 9.',
          ],
          practice: '¿Cuántos parámetros hay en la firma max(int, int)?',
          practiceAnswer: '2',
          practiceFeedback: 'Hay dos posiciones de parámetros int.',
          practiceHints: [
            'Mira los tipos separados por comas.',
            'Cada tipo describe un parámetro.',
            'Cuenta las dos entradas int.',
          ],
          question:
            '¿Qué pareja puede distinguir métodos sobrecargados en Java?',
          choices: [
            'Mismo nombre y parámetros; distinto tipo devuelto',
            'Mismo nombre; distintas listas de parámetros',
            'Solo comentarios diferentes',
          ],
          correct: 1,
          feedback:
            'La sobrecarga depende del nombre y tipos de parámetros, no solo del tipo devuelto.',
          challenge:
            'Llama a Math.min(int, int) con 8 y 3, guarda el int devuelto e imprime 3.',
          hints: [
            'Proporciona dos argumentos int.',
            'Asigna Math.min(8, 3) a una variable int.',
            'Imprime el resultado guardado.',
          ],
          checklist: [
            'Usa min, no max.',
            'Pasa exactamente dos enteros.',
            'Imprime 3.',
          ],
        },
      },
      example: {
        lines: [
          'int biggest = Math.max(4, 9);',
          'double other = Math.max(4.5, 2.0);',
          'System.out.println(biggest);',
        ],
        active: [0, 1, 2],
        output: ['', '', '9'],
        values: {
          en: [
            'max(int, int) returns 9',
            'max(double, double) returns 4.5',
            'biggest = 9',
          ],
          es: [
            'max(int, int) devuelve 9',
            'max(double, double) devuelve 4.5',
            'biggest = 9',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int smallest = Math.min(8, 3);\n        System.out.println(smallest);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.10',
      sourcePdfPage: 50,
      content: {
        en: {
          title: 'Calling Class Methods',
          description: 'Call behavior on the class.',
          goal: 'Recognize static calls and use ClassName.method(arguments).',
          explanation:
            'A class method belongs to the class rather than a particular object and is declared static. Call a public class method through its class name and a dot, followed by the method name and arguments. Math methods are familiar examples. A returned value can be stored, printed, or used in another expression.',
          takeaway: 'Do not create a Math object to call Math.abs or Math.pow.',
          steps: [
            'Call abs through Math, passing -8.',
            'Pass the returned distance to another class method.',
            'Print the larger value, 8.',
          ],
          practice: 'What does Math.abs(-12) return?',
          practiceAnswer: '12',
          practiceFeedback:
            'abs returns the nonnegative magnitude for this input.',
          practiceHints: [
            'Identify the class Math.',
            'abs means absolute value.',
            'Remove the negative sign for -12.',
          ],
          question: 'Which is a class-method call?',
          choices: ['Math.abs(-4)', 'new Math()', 'Math = 4'],
          correct: 0,
          feedback:
            'The class name Math precedes the method and its argument list.',
          challenge: 'Use Math.abs on -9 and print the returned value 9.',
          hints: [
            'Call the method through Math.',
            'Pass -9 inside parentheses.',
            'Print or store its return value.',
          ],
          checklist: [
            'Use a static call.',
            'Do not instantiate Math.',
            'Print 9.',
          ],
        },
        es: {
          title: 'Llamadas a métodos de clase',
          description: 'Invoca comportamiento de la clase.',
          goal: 'Reconoce llamadas static y usa NombreClase.metodo(argumentos).',
          explanation:
            'Un método de clase pertenece a la clase y no a un objeto particular; se declara static. Para llamar a un método público de clase, usa el nombre de la clase y un punto, seguido del método y sus argumentos. Los métodos de Math son ejemplos habituales. Un valor devuelto puede guardarse, imprimirse o usarse en otra expresión.',
          takeaway:
            'No crees un objeto Math para llamar a Math.abs o Math.pow.',
          steps: [
            'Llama a abs mediante Math y pasa -8.',
            'Pasa distance a otro método de clase.',
            'Imprime el valor mayor: 8.',
          ],
          practice: '¿Qué devuelve Math.abs(-12)?',
          practiceAnswer: '12',
          practiceFeedback:
            'abs devuelve la magnitud no negativa para esta entrada.',
          practiceHints: [
            'Identifica la clase Math.',
            'abs significa valor absoluto.',
            'Para -12, elimina el signo negativo.',
          ],
          question: '¿Cuál es una llamada a un método de clase?',
          choices: ['Math.abs(-4)', 'new Math()', 'Math = 4'],
          correct: 0,
          feedback:
            'El nombre de clase Math precede al método y su lista de argumentos.',
          challenge: 'Usa Math.abs con -9 e imprime el valor devuelto: 9.',
          hints: [
            'Llama al método mediante Math.',
            'Pasa -9 entre paréntesis.',
            'Imprime o guarda su valor devuelto.',
          ],
          checklist: [
            'Usa una llamada estática.',
            'No crees una instancia de Math.',
            'Imprime 9.',
          ],
        },
      },
      example: {
        lines: [
          'int distance = Math.abs(-8);',
          'int larger = Math.max(distance, 5);',
          'System.out.println(larger);',
        ],
        active: [0, 1, 2],
        output: ['', '', '8'],
        values: {
          en: ['distance = 8', 'larger = 8', 'larger = 8'],
          es: ['distance = 8', 'larger = 8', 'larger = 8'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        int magnitude = Math.abs(-9);\n        System.out.println(magnitude);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.11',
      sourcePdfPage: 51,
      content: {
        en: {
          title: 'Math Class',
          description: 'Use numeric library operations.',
          goal: 'Use abs, pow, sqrt, and the bounds of random.',
          explanation:
            'Math provides static numeric operations. Math.pow returns a double power, and Math.sqrt returns a double square root. Math.random returns a double from 0.0 inclusive to 1.0 exclusive; scaling and casting can map it to integer ranges. The walkthrough uses deterministic operations so its exact results are repeatable.',
          takeaway:
            'For integers 1 through 6, use (int) (Math.random() * 6) + 1; the cast comes after scaling.',
          steps: [
            'Raise 3 to the second power, yielding 9.0.',
            'Take the square root, yielding 3.0.',
            'Print the double value 3.0.',
          ],
          practice:
            'What is the greatest integer that (int) (Math.random() * 6) + 1 can produce?',
          practiceAnswer: '6',
          practiceFeedback:
            'Scaling gives values below 6; truncation gives 0 through 5, then adding 1 gives 1 through 6.',
          practiceHints: [
            'Math.random() is less than 1.0.',
            'After multiplying and casting, the largest value is 5.',
            'Add 1 to that maximum.',
          ],
          question: 'Which expression has the double value 4.0?',
          choices: ['Math.sqrt(16)', 'Math.pow(4, 2)', 'Math.abs(-16)'],
          correct: 0,
          feedback: 'The nonnegative square root of 16 is 4.0.',
          challenge:
            'Compute Math.pow(2, 3), then print its square root. The output is approximately 2.8284271247461903.',
          hints: [
            'Use Math.pow for the power.',
            'Store its result in a double.',
            'Pass that result to Math.sqrt before printing.',
          ],
          checklist: [
            'Calculate 8.0 with pow.',
            'Take its square root.',
            'Keep the result as double.',
          ],
        },
        es: {
          title: 'Clase Math',
          description: 'Usa operaciones numéricas de la biblioteca.',
          goal: 'Usa abs, pow y sqrt, y comprende los límites de random.',
          explanation:
            'Math ofrece operaciones numéricas estáticas. Math.pow devuelve una potencia double y Math.sqrt una raíz cuadrada double. Math.random devuelve un double desde 0.0 incluido hasta 1.0 excluido; escalar y convertir permite obtener rangos enteros. El recorrido usa operaciones deterministas para poder repetir exactamente sus resultados.',
          takeaway:
            'Para enteros del 1 al 6, usa (int) (Math.random() * 6) + 1; convierte después de escalar.',
          steps: [
            'Eleva 3 al cuadrado y obtiene 9.0.',
            'Calcula la raíz cuadrada y obtiene 3.0.',
            'Imprime el valor double: 3.0.',
          ],
          practice:
            '¿Cuál es el mayor entero que puede producir (int) (Math.random() * 6) + 1?',
          practiceAnswer: '6',
          practiceFeedback:
            'Escalar produce valores menores que 6; truncar da de 0 a 5 y sumar 1 da de 1 a 6.',
          practiceHints: [
            'Math.random() es menor que 1.0.',
            'Tras multiplicar y convertir, el máximo es 5.',
            'Suma 1 a ese máximo.',
          ],
          question: '¿Qué expresión tiene el valor double 4.0?',
          choices: ['Math.sqrt(16)', 'Math.pow(4, 2)', 'Math.abs(-16)'],
          correct: 0,
          feedback: 'La raíz cuadrada no negativa de 16 es 4.0.',
          challenge:
            'Calcula Math.pow(2, 3) e imprime su raíz cuadrada. La salida es aproximadamente 2.8284271247461903.',
          hints: [
            'Usa Math.pow para la potencia.',
            'Guarda su resultado en un double.',
            'Pasa ese resultado a Math.sqrt antes de imprimir.',
          ],
          checklist: [
            'Calcula 8.0 con pow.',
            'Obtén su raíz cuadrada.',
            'Conserva el resultado como double.',
          ],
        },
      },
      example: {
        lines: [
          'double squared = Math.pow(3, 2);',
          'double root = Math.sqrt(squared);',
          'System.out.println(root);',
        ],
        active: [0, 1, 2],
        output: ['', '', '3.0'],
        values: {
          en: ['squared = 9.0', 'root = 3.0', 'root = 3.0'],
          es: ['squared = 9.0', 'root = 3.0', 'root = 3.0'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        double power = Math.pow(2, 3);\n        System.out.println(Math.sqrt(power));\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.12',
      sourcePdfPage: 52,
      content: {
        en: {
          title: 'Objects: Instances of Classes',
          description: 'Separate a blueprint from an object.',
          goal: 'Distinguish a class, an object, and a reference variable.',
          explanation:
            'A class defines the attributes and behaviors its objects provide. An object is a particular instance of a class. A reference variable lets your program refer to an object; it is not the object itself. String is a class, and a String object represents a particular sequence of characters. Different objects can contain the same text.',
          takeaway:
            'The variable name, the object, and the class are three different concepts.',
          steps: [
            'Create a particular String object.',
            'Copy the reference, not the object.',
            'Call a behavior of that referenced object and print 2.',
          ],
          practice:
            'How many String objects are created by new in this code: String a = new String("Hi"); String b = a; ? Count only objects explicitly created by new.',
          practiceAnswer: '1',
          practiceFeedback:
            'Only one new expression runs. Assigning a to b copies its reference.',
          practiceHints: [
            'Locate each new expression.',
            'The assignment b = a contains no new.',
            'Count only the explicit creation.',
          ],
          question: 'In String message = "Hi";, what is String?',
          choices: [
            'The variable name',
            'The class/type',
            'The printed output',
          ],
          correct: 1,
          feedback:
            'String names the class used as the reference type; message names the variable.',
          challenge:
            'Create a String object containing "Java", make another reference to it, and print its length through the second reference.',
          hints: [
            'Create the object with new String("Java").',
            'Assign the first reference to a second variable.',
            'Call length() through the second variable.',
          ],
          checklist: [
            'Create one explicit object.',
            'Share its reference.',
            'Print 4.',
          ],
        },
        es: {
          title: 'Objetos: instancias de clases',
          description: 'Distingue el modelo de un objeto.',
          goal: 'Distingue una clase, un objeto y una variable de referencia.',
          explanation:
            'Una clase define los atributos y comportamientos que ofrecen sus objetos. Un objeto es una instancia particular de una clase. Una variable de referencia permite referirse a un objeto; no es el objeto mismo. String es una clase y cada objeto String representa una secuencia concreta de caracteres. Objetos diferentes pueden contener el mismo texto.',
          takeaway:
            'El nombre de variable, el objeto y la clase son tres conceptos distintos.',
          steps: [
            'Crea un objeto String concreto.',
            'Copia la referencia, no el objeto.',
            'Llama a un comportamiento del objeto e imprime 2.',
          ],
          practice:
            '¿Cuántos objetos String crea new en este código: String a = new String("Hi"); String b = a; ? Cuenta solo los creados explícitamente con new.',
          practiceAnswer: '1',
          practiceFeedback:
            'Solo se ejecuta una expresión new. Asignar a a b copia la referencia.',
          practiceHints: [
            'Localiza cada expresión new.',
            'La asignación b = a no contiene new.',
            'Cuenta solo la creación explícita.',
          ],
          question: 'En String message = "Hi";, ¿qué es String?',
          choices: [
            'El nombre de variable',
            'La clase o tipo',
            'La salida impresa',
          ],
          correct: 1,
          feedback:
            'String nombra la clase usada como tipo de referencia; message nombra la variable.',
          challenge:
            'Crea un objeto String con "Java", crea otra referencia a él e imprime su longitud usando la segunda referencia.',
          hints: [
            'Crea el objeto con new String("Java").',
            'Asigna la primera referencia a otra variable.',
            'Llama a length() mediante la segunda variable.',
          ],
          checklist: [
            'Crea un objeto explícito.',
            'Comparte su referencia.',
            'Imprime 4.',
          ],
        },
      },
      example: {
        lines: [
          'String first = new String("Hi");',
          'String second = first;',
          'System.out.println(second.length());',
        ],
        active: [0, 1, 2],
        output: ['', '', '2'],
        values: {
          en: [
            'first refers to String "Hi"',
            'first and second refer to the same object',
            'length = 2',
          ],
          es: [
            'first referencia el String "Hi"',
            'first y second referencian el mismo objeto',
            'length = 2',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        String first = new String("Java");\n        String second = first;\n        System.out.println(second.length());\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.13',
      sourcePdfPage: 53,
      content: {
        en: {
          title: 'Object Creation and Storage (Instantiation)',
          description: 'Create an object and keep its reference.',
          goal: 'Trace new, constructor arguments, reference assignment, and null.',
          explanation:
            'The new operator creates an object by invoking a constructor and produces a reference to it. Assigning that reference to a compatible variable lets you use the object later. Copying a reference does not create another object. null means no object is currently referenced; calling an instance method through null causes a runtime error.',
          takeaway:
            'new String("cat") creates an object; assigning its reference to another variable does not.',
          steps: [
            'Invoke the String constructor and store its reference.',
            'Copy the reference into alias.',
            'Print the text through alias.',
          ],
          practice:
            'How many new expressions execute here: String a = new String("a"); String b = new String("b"); String c = a; ?',
          practiceAnswer: '2',
          practiceFeedback:
            'Two constructors are invoked explicitly. The last assignment copies a reference.',
          practiceHints: [
            'Find the new keywords.',
            'The first two statements each contain one.',
            'The third statement creates no object.',
          ],
          question:
            'What happens when you call length() through a String reference equal to null?',
          choices: [
            'It returns 0',
            'It throws a runtime exception',
            'It creates an empty String',
          ],
          correct: 1,
          feedback:
            'null refers to no object, so no instance method can be invoked through it.',
          challenge:
            'Create two distinct String objects containing "red" and "blue". Print their lengths on separate lines: 3 then 4.',
          hints: [
            'Use new String twice.',
            'Keep one reference for each object.',
            'Call length() and print each result.',
          ],
          checklist: [
            'Use two explicit constructions.',
            'Preserve both references.',
            'Print 3 and 4 on separate lines.',
          ],
        },
        es: {
          title: 'Creación y almacenamiento de objetos (instanciación)',
          description: 'Crea un objeto y conserva su referencia.',
          goal: 'Sigue new, los argumentos del constructor, la asignación de referencias y null.',
          explanation:
            'El operador new crea un objeto al invocar un constructor y produce una referencia a él. Guardar esa referencia en una variable compatible permite usarlo después. Copiar una referencia no crea otro objeto. null significa que no se referencia ningún objeto; llamar a un método de instancia mediante null causa un error en ejecución.',
          takeaway:
            'new String("cat") crea un objeto; asignar su referencia a otra variable no lo hace.',
          steps: [
            'Invoca el constructor String y guarda su referencia.',
            'Copia la referencia en alias.',
            'Imprime el texto mediante alias.',
          ],
          practice:
            '¿Cuántas expresiones new se ejecutan aquí: String a = new String("a"); String b = new String("b"); String c = a; ?',
          practiceAnswer: '2',
          practiceFeedback:
            'Se invocan explícitamente dos constructores. La última asignación copia una referencia.',
          practiceHints: [
            'Busca las palabras new.',
            'Las dos primeras sentencias contienen una cada una.',
            'La tercera no crea un objeto.',
          ],
          question:
            '¿Qué ocurre al llamar a length() mediante una referencia String que vale null?',
          choices: [
            'Devuelve 0',
            'Lanza una excepción en ejecución',
            'Crea un String vacío',
          ],
          correct: 1,
          feedback:
            'null no referencia un objeto; no se puede invocar un método de instancia mediante esa referencia.',
          challenge:
            'Crea dos objetos String distintos con "red" y "blue". Imprime sus longitudes en líneas separadas: 3 y luego 4.',
          hints: [
            'Usa new String dos veces.',
            'Conserva una referencia para cada objeto.',
            'Llama a length() e imprime cada resultado.',
          ],
          checklist: [
            'Usa dos construcciones explícitas.',
            'Conserva ambas referencias.',
            'Imprime 3 y 4 en líneas separadas.',
          ],
        },
      },
      example: {
        lines: [
          'String label = new String("cat");',
          'String alias = label;',
          'System.out.println(alias);',
        ],
        active: [0, 1, 2],
        output: ['', '', 'cat'],
        values: {
          en: [
            'label refers to "cat"',
            'alias and label share one reference',
            'alias prints "cat"',
          ],
          es: [
            'label referencia "cat"',
            'alias y label comparten una referencia',
            'alias imprime "cat"',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        String first = new String("red");\n        String second = new String("blue");\n        System.out.println(first.length());\n        System.out.println(second.length());\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.14',
      sourcePdfPage: 55,
      content: {
        en: {
          title: 'Calling Instance Methods',
          description: 'Ask a particular object to act.',
          goal: 'Identify the receiver, arguments, and return value of an instance call.',
          explanation:
            'An instance method is called through an object reference. In text.substring(1, 3), text is the receiver and 1 and 3 are arguments. The call uses that particular object and may return a value. A non-void return value can be stored or used in an expression. The reference must not be null.',
          takeaway:
            'ClassName.method(...) and objectReference.method(...) select different kinds of behavior; read the API.',
          steps: [
            'Create the String receiver.',
            'Invoke length() through text and store the result.',
            'Print the int returned by the call.',
          ],
          practice: 'What does "hello".length() return?',
          practiceAnswer: '5',
          practiceFeedback: 'The receiver contains five characters.',
          practiceHints: [
            'Identify the receiver text hello.',
            'Count its characters.',
            'length() returns the count as an int.',
          ],
          question:
            'In word.substring(1, 3), which expression is the receiver?',
          choices: ['word', '1', 'substring'],
          correct: 0,
          feedback: 'word supplies the object whose method is being called.',
          challenge:
            'Store "school" in text, call its length method, and print 6.',
          hints: [
            'Declare a String receiver named text.',
            'Call text.length(), using parentheses.',
            'Print the return value.',
          ],
          checklist: [
            'Use a non-null receiver.',
            'Call an instance method.',
            'Print 6.',
          ],
        },
        es: {
          title: 'Llamadas a métodos de instancia',
          description: 'Pide a un objeto concreto que actúe.',
          goal: 'Identifica el objeto receptor, los argumentos y el valor devuelto de una llamada de instancia.',
          explanation:
            'Un método de instancia se llama mediante una referencia a un objeto. En text.substring(1, 3), text es el receptor y 1 y 3 son argumentos. La llamada usa ese objeto particular y puede devolver un valor. Un valor no void puede guardarse o usarse en una expresión. La referencia no debe ser null.',
          takeaway:
            'NombreClase.metodo(...) y referenciaObjeto.metodo(...) seleccionan comportamientos distintos; consulta la API.',
          steps: [
            'Crea el String receptor.',
            'Invoca length() mediante text y guarda el resultado.',
            'Imprime el int devuelto por la llamada.',
          ],
          practice: '¿Qué devuelve "hello".length()?',
          practiceAnswer: '5',
          practiceFeedback: 'El receptor contiene cinco caracteres.',
          practiceHints: [
            'Identifica el texto receptor hello.',
            'Cuenta sus caracteres.',
            'length() devuelve la cantidad como int.',
          ],
          question: 'En word.substring(1, 3), ¿qué expresión es el receptor?',
          choices: ['word', '1', 'substring'],
          correct: 0,
          feedback:
            'word proporciona el objeto sobre el que se llama al método.',
          challenge:
            'Guarda "school" en text, llama a su método length e imprime 6.',
          hints: [
            'Declara un String receptor llamado text.',
            'Llama a text.length() con paréntesis.',
            'Imprime el valor devuelto.',
          ],
          checklist: [
            'Usa un receptor no null.',
            'Llama a un método de instancia.',
            'Imprime 6.',
          ],
        },
      },
      example: {
        lines: [
          'String text = "Java";',
          'int size = text.length();',
          'System.out.println(size);',
        ],
        active: [0, 1, 2],
        output: ['', '', '4'],
        values: {
          en: ['text = "Java"', 'text.length() returns 4', 'size = 4'],
          es: ['text = "Java"', 'text.length() devuelve 4', 'size = 4'],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        String text = "school";\n        int length = text.length();\n        System.out.println(length);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
    {
      id: '1.15',
      sourcePdfPage: 56,
      content: {
        en: {
          title: 'String Manipulation',
          description: 'Build and inspect text safely.',
          goal: 'Use zero-based indices, substring, concatenation, and immutable Strings.',
          explanation:
            'String objects are immutable: a method does not modify the existing text. substring(begin, end) returns characters from begin inclusive to end exclusive, using zero-based indices. Concatenation creates a new String. length gives the number of characters; indexOf returns a position or -1. Use equals for text content and compareTo for lexicographic order.',
          takeaway:
            'A valid substring range satisfies 0 <= begin <= end <= text.length().',
          steps: [
            'Index the letters J=0, a=1, v=2, a=3.',
            'Copy indices 1 and 2; exclude index 3.',
            'Print av; the original word remains Java.',
          ],
          practice: 'What does "banana".indexOf("na") return?',
          practiceAnswer: '2',
          practiceFeedback:
            'The first occurrence starts at index 2; counting begins at zero.',
          practiceHints: [
            'Number the characters from zero.',
            'Find the first n followed by a.',
            'Return its starting index, not its length.',
          ],
          question: 'What text is returned by "planet".substring(1, 4)?',
          choices: ['lan', 'lane', 'pla'],
          correct: 0,
          feedback: 'Indices 1, 2, and 3 are included; index 4 is excluded.',
          challenge:
            'Take the first three characters of "coding", append "!", and print cod!.',
          hints: [
            'Use substring(0, 3).',
            'Concatenate the returned String with "!".',
            'Store or directly print the new String.',
          ],
          checklist: [
            'Include indices 0 through 2.',
            'Leave coding unchanged.',
            'Print cod!.',
          ],
        },
        es: {
          title: 'Manipulación de String',
          description: 'Construye e inspecciona texto con cuidado.',
          goal: 'Usa índices desde cero, substring, concatenación y Strings inmutables.',
          explanation:
            'Los objetos String son inmutables: un método no modifica el texto existente. substring(inicio, fin) devuelve desde inicio incluido hasta fin excluido, con índices desde cero. Concatenar crea un String nuevo. length da la cantidad de caracteres; indexOf devuelve una posición o -1. Usa equals para comparar contenido y compareTo para orden lexicográfico.',
          takeaway:
            'Un rango válido cumple 0 <= inicio <= fin <= text.length().',
          steps: [
            'Asigna índices J=0, a=1, v=2, a=3.',
            'Copia los índices 1 y 2; excluye el 3.',
            'Imprime av; la palabra original sigue siendo Java.',
          ],
          practice: '¿Qué devuelve "banana".indexOf("na")?',
          practiceAnswer: '2',
          practiceFeedback:
            'La primera aparición empieza en el índice 2; se cuenta desde cero.',
          practiceHints: [
            'Numera los caracteres desde cero.',
            'Busca la primera n seguida de a.',
            'Devuelve su índice inicial, no su longitud.',
          ],
          question: '¿Qué texto devuelve "planet".substring(1, 4)?',
          choices: ['lan', 'lane', 'pla'],
          correct: 0,
          feedback: 'Se incluyen los índices 1, 2 y 3; se excluye el 4.',
          challenge:
            'Toma los primeros tres caracteres de "coding", agrega "!" e imprime cod!.',
          hints: [
            'Usa substring(0, 3).',
            'Concatena el String devuelto con "!".',
            'Guarda o imprime directamente el nuevo String.',
          ],
          checklist: [
            'Incluye los índices del 0 al 2.',
            'Deja coding sin cambios.',
            'Imprime cod!.',
          ],
        },
      },
      example: {
        lines: [
          'String word = "Java";',
          'String middle = word.substring(1, 3);',
          'System.out.println(middle);',
        ],
        active: [0, 1, 2],
        output: ['', '', 'av'],
        values: {
          en: [
            'word = "Java"',
            'middle = "av"; word = "Java"',
            'middle = "av"',
          ],
          es: [
            'word = "Java"',
            'middle = "av"; word = "Java"',
            'middle = "av"',
          ],
        },
        solution:
          'public class Main {\n    public static void main(String[] args) {\n        String word = "coding";\n        String result = word.substring(0, 3) + "!";\n        System.out.println(result);\n    }\n}',
        starter:
          'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      },
    },
  ],
};
