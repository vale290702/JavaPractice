import type { CurriculumUnit } from './types';

export const unit2: CurriculumUnit = {
  id: 'unit-2',
  number: 2,
  title: {
    en: 'Selection and Iteration',
    es: 'Selección e iteración',
  },
  description: {
    en: 'Make decisions, repeat work, process strings, and reason about execution counts.',
    es: 'Toma decisiones, repite tareas, procesa cadenas y analiza conteos de ejecución.',
  },
  topics: [
    {
      id: '2.1',
      sourcePdfPage: 68,
      content: {
        en: {
          title: 'Algorithms with Selection and Repetition',
          description:
            'Recognize sequence, selection, and repetition in one algorithm.',
          goal: 'Recognize sequence, selection, and repetition in one algorithm.',
          explanation:
            'An algorithm puts instructions in an order that solves a problem. Sequencing runs those instructions in order; selection chooses a path from a Boolean condition; repetition revisits instructions while a condition holds. These structures can work together. Trace the changing state carefully: moving an update before a decision can change the result.',
          takeaway: 'Order and decisions determine which actions repeat.',
          steps: [
            'Start with zero packed items and a target of three.',
            'Repeat the packing action while packed is below three.',
            'After three increments, the condition is false and the total prints.',
          ],
          practice:
            'Start at 1. Repeat “add 2” while the value is less than 6. What is the final value?',
          practiceAnswer: '7',
          practiceFeedback:
            'The values are 1, 3, 5, 7. At 7 the test is false.',
          practiceHints: [
            'Write the starting value before any action.',
            'Add 2 each time the current value is below 6.',
            'The last addition starts at 5; check its result against 6.',
          ],
          question: 'Which action is selection?',
          choices: [
            'Choose a route if it is raining',
            'Walk three steps in order',
            'Repeat walking until home',
          ],
          correct: 0,
          feedback: 'Choosing a route depends on a true or false condition.',
          challenge:
            'Pack four items using repetition, then print the packed count.',
          hints: [
            'Create a counter starting at zero.',
            'Repeat while the counter is below four.',
            'Increase the counter once per repetition, then print after the loop.',
          ],
          checklist: [
            'Identify the repeated action.',
            'State the stopping condition.',
            'Check the final counter.',
          ],
        },
        es: {
          title: 'Algoritmos con selección y repetición',
          description:
            'Reconocer secuencia, selección y repetición en un algoritmo.',
          goal: 'Reconocer secuencia, selección y repetición en un algoritmo.',
          explanation:
            'Un algoritmo organiza instrucciones para resolver un problema. La secuencia ejecuta instrucciones en orden; la selección elige un camino según una condición booleana; la repetición vuelve a ejecutar instrucciones mientras se cumple una condición. Estas estructuras pueden combinarse. Sigue los cambios de estado: mover una actualización antes de una decisión puede cambiar el resultado.',
          takeaway:
            'El orden y las decisiones determinan qué acciones se repiten.',
          steps: [
            'Empieza con cero artículos empacados y una meta de tres.',
            'Repite la acción de empacar mientras packed sea menor que tres.',
            'Después de tres incrementos, la condición es falsa y se imprime el total.',
          ],
          practice:
            'Empieza en 1. Repite «sumar 2» mientras el valor sea menor que 6. ¿Cuál es el valor final?',
          practiceAnswer: '7',
          practiceFeedback:
            'Los valores son 1, 3, 5, 7. En 7 la prueba es falsa.',
          practiceHints: [
            'Anota el valor inicial antes de actuar.',
            'Suma 2 cada vez que el valor actual sea menor que 6.',
            'La última suma empieza en 5; compara su resultado con 6.',
          ],
          question: '¿Qué acción representa selección?',
          choices: [
            'Elegir una ruta si llueve',
            'Dar tres pasos en orden',
            'Repetir pasos hasta llegar a casa',
          ],
          correct: 0,
          feedback:
            'Elegir una ruta depende de una condición verdadera o falsa.',
          challenge:
            'Empaca cuatro artículos mediante repetición e imprime la cantidad.',
          hints: [
            'Crea un contador que empiece en cero.',
            'Repite mientras el contador sea menor que cuatro.',
            'Incrementa el contador una vez por repetición e imprime después del ciclo.',
          ],
          checklist: [
            'Identifico la acción repetida.',
            'Establezco la condición de parada.',
            'Compruebo el contador final.',
          ],
        },
      },
      example: {
        lines: [
          'int packed = 0;',
          'while (packed < 3) {',
          '  packed++;',
          '}',
          'System.out.println(packed);',
        ],
        active: [0, 2, 4],
        output: ['', '', '3'],
        values: {
          en: ['packed = 0', 'packed = 1, 2, 3', 'packed = 3'],
          es: ['packed = 0', 'packed = 1, 2, 3', 'packed = 3'],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int packed = 0;\n    while (packed < 4) {\n      packed++;\n    }\n    System.out.println(packed);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int packed = 0;\n    // TODO\n    System.out.println(packed);\n  }\n}\n',
      },
    },
    {
      id: '2.2',
      sourcePdfPage: 69,
      content: {
        en: {
          title: 'Boolean Expressions',
          description: 'Evaluate relational expressions at their boundaries.',
          goal: 'Evaluate relational expressions at their boundaries.',
          explanation:
            'A relational expression produces true or false, not a numeric score. Use < and > for strict comparisons and <= and >= when equality also qualifies. For primitive values, == tests equality and != tests inequality. Assignment uses a single = instead. With object references, == compares identity rather than the contents of objects.',
          takeaway: 'Equality belongs to <= and >=, but not < or >.',
          steps: [
            'Store a score equal to the required threshold.',
            'Compare score with 10 using >=; equality qualifies.',
            'Print the resulting Boolean value.',
          ],
          practice: 'What is the value of 8 != 8?',
          practiceAnswer: 'false',
          practiceFeedback: 'Both operands are 8, so they are not unequal.',
          practiceHints: [
            'The operator is !=, not ==.',
            'Compare the two primitive integer values.',
            'Equal values make an inequality test false.',
          ],
          question: 'With int x = 5, which expression is true?',
          choices: ['x < 5', 'x >= 5', 'x != 5'],
          correct: 1,
          feedback: 'The >= operator includes the boundary value 5.',
          challenge:
            'Given temperature = 18 and limit = 20, print whether temperature is strictly below limit.',
          hints: [
            'Identify which value must be smaller.',
            'Use a strict relational operator.',
            'Print temperature < limit.',
          ],
          checklist: [
            'Distinguish = from ==.',
            'Test equal boundary values.',
            'Read true and false as Java keywords.',
          ],
        },
        es: {
          title: 'Expresiones booleanas',
          description: 'Evaluar expresiones relacionales en sus límites.',
          goal: 'Evaluar expresiones relacionales en sus límites.',
          explanation:
            'Una expresión relacional produce true o false, no una puntuación numérica. Usa < y > para comparaciones estrictas, y <= y >= cuando también se admite igualdad. Para valores primitivos, == compara igualdad y != compara desigualdad. La asignación usa un solo =. Con referencias a objetos, == compara identidad en lugar del contenido.',
          takeaway: 'La igualdad pertenece a <= y >=, pero no a < ni >.',
          steps: [
            'Guarda una puntuación igual al umbral requerido.',
            'Compara score con 10 mediante >=; la igualdad cumple.',
            'Imprime el valor booleano resultante.',
          ],
          practice: '¿Cuál es el valor de 8 != 8?',
          practiceAnswer: 'false',
          practiceFeedback:
            'Ambos operandos son 8, por lo que no son distintos.',
          practiceHints: [
            'El operador es !=, no ==.',
            'Compara los dos valores enteros primitivos.',
            'Los valores iguales hacen falsa la prueba de desigualdad.',
          ],
          question: 'Con int x = 5, ¿qué expresión es true?',
          choices: ['x < 5', 'x >= 5', 'x != 5'],
          correct: 1,
          feedback: 'El operador >= incluye el valor límite 5.',
          challenge:
            'Con temperature = 18 y limit = 20, imprime si temperature es estrictamente menor que limit.',
          hints: [
            'Identifica qué valor debe ser menor.',
            'Usa un operador relacional estricto.',
            'Imprime temperature < limit.',
          ],
          checklist: [
            'Distingo = de ==.',
            'Pruebo valores iguales en el límite.',
            'Leo true y false como palabras de Java.',
          ],
        },
      },
      example: {
        lines: [
          'int score = 10;',
          'boolean ready = score >= 10;',
          'System.out.println(ready);',
        ],
        active: [0, 1, 2],
        output: ['', '', 'true'],
        values: {
          en: ['score = 10', 'ready = true', 'ready = true'],
          es: ['score = 10', 'ready = true', 'ready = true'],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int temperature = 18;\n    int limit = 20;\n    System.out.println(temperature < limit);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int temperature = 18;\n    int limit = 20;\n    // TODO\n  }\n}\n',
      },
    },
    {
      id: '2.3',
      sourcePdfPage: 70,
      content: {
        en: {
          title: 'if Statements',
          description: 'Trace one-way and two-way decisions.',
          goal: 'Trace one-way and two-way decisions.',
          explanation:
            'An if statement runs its body only when its condition is true. An if-else statement selects exactly one of two bodies. Statements after the selection run regardless of the chosen branch. Use braces to make each body clear, and trace assignments only in the branch that executes; skipped assignments do not change a variable.',
          takeaway: 'Only the selected branch changes program state.',
          steps: [
            'Begin with a fee of 12 and a qualifying age of 9.',
            'The condition age < 12 is true, so replace the fee with 7.',
            'Print the fee after the selection finishes.',
          ],
          practice: 'int x = 4; if (x > 5) { x = 9; } What is x afterward?',
          practiceAnswer: '4',
          practiceFeedback:
            '4 > 5 is false, so the assignment to 9 is skipped.',
          practiceHints: [
            'Evaluate the condition using the initial x.',
            'Ask whether 4 exceeds 5.',
            'A skipped body leaves x unchanged.',
          ],
          question: 'How many branches execute in an if-else statement?',
          choices: ['Exactly one', 'Always two', 'Always zero'],
          correct: 0,
          feedback: 'The condition chooses the if body or the else body.',
          challenge:
            'For points = 65, print "pass" when points is at least 60; otherwise print "retry".',
          hints: [
            'There are two mutually exclusive outcomes.',
            'Use points >= 60 as the condition.',
            'Put one println in each branch.',
          ],
          checklist: [
            'Use a Boolean condition.',
            'Include equality at 60.',
            'Trace both possible branches.',
          ],
        },
        es: {
          title: 'Sentencias if',
          description: 'Seguir decisiones de una y dos ramas.',
          goal: 'Seguir decisiones de una y dos ramas.',
          explanation:
            'Una sentencia if ejecuta su cuerpo solo cuando la condición es true. Una sentencia if-else selecciona exactamente uno de dos cuerpos. Las instrucciones posteriores a la selección se ejecutan independientemente de la rama elegida. Usa llaves para delimitar cada cuerpo y sigue solo las asignaciones de la rama ejecutada; las omitidas no cambian una variable.',
          takeaway: 'Solo la rama seleccionada cambia el estado del programa.',
          steps: [
            'Empieza con una tarifa de 12 y una edad de 9.',
            'La condición age < 12 es true, así que cambia la tarifa a 7.',
            'Imprime la tarifa después de terminar la selección.',
          ],
          practice: 'int x = 4; if (x > 5) { x = 9; } ¿Cuánto vale x al final?',
          practiceAnswer: '4',
          practiceFeedback:
            '4 > 5 es false, así que se omite la asignación de 9.',
          practiceHints: [
            'Evalúa la condición con el x inicial.',
            'Pregunta si 4 supera 5.',
            'Un cuerpo omitido deja x sin cambios.',
          ],
          question: '¿Cuántas ramas se ejecutan en una sentencia if-else?',
          choices: ['Exactamente una', 'Siempre dos', 'Siempre cero'],
          correct: 0,
          feedback: 'La condición elige el cuerpo de if o el de else.',
          challenge:
            'Para points = 65, imprime "pass" si points es al menos 60; en otro caso imprime "retry".',
          hints: [
            'Hay dos resultados mutuamente excluyentes.',
            'Usa points >= 60 como condición.',
            'Coloca un println en cada rama.',
          ],
          checklist: [
            'Uso una condición booleana.',
            'Incluyo la igualdad en 60.',
            'Sigo ambas ramas posibles.',
          ],
        },
      },
      example: {
        lines: [
          'int fee = 12;',
          'int age = 9;',
          'if (age < 12) {',
          '  fee = 7;',
          '}',
          'System.out.println(fee);',
        ],
        active: [0, 3, 5],
        output: ['', '', '7'],
        values: {
          en: ['fee = 12, age = 9', 'fee = 7', 'fee = 7'],
          es: ['fee = 12, age = 9', 'fee = 7', 'fee = 7'],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int points = 65;\n    if (points >= 60) {\n      System.out.println("pass");\n    } else {\n      System.out.println("retry");\n    }\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int points = 65;\n    // TODO\n  }\n}\n',
      },
    },
    {
      id: '2.4',
      sourcePdfPage: 71,
      content: {
        en: {
          title: 'Nested if Statements',
          description: 'Trace nested decisions and ordered alternatives.',
          goal: 'Trace nested decisions and ordered alternatives.',
          explanation:
            'A decision can contain another decision. An inner condition is reached only when control enters its enclosing branch. An if-else-if chain checks alternatives in order and stops at the first true condition. Put more restrictive overlapping thresholds first, and use braces so each else clearly belongs to the intended if.',
          takeaway: 'An inner test needs its enclosing path to be reached.',
          steps: [
            'Set member to true and visits to 6.',
            'Enter the member branch, then test whether visits reaches 5.',
            'The inner true branch assigns a discount of 3 and it prints.',
          ],
          practice:
            'int x = 8; int y = 0; if (x > 5) { if (x < 10) { y = 2; } } What is y?',
          practiceAnswer: '2',
          practiceFeedback:
            '8 > 5 and then 8 < 10 are true, so the inner assignment runs.',
          practiceHints: [
            'Start with y equal to zero.',
            'Check the outer comparison before the inner one.',
            'Both comparisons succeed, so use the inner assignment.',
          ],
          question:
            'In an if-else-if chain, what happens after the first true condition?',
          choices: [
            'Remaining alternatives are skipped',
            'Every remaining condition runs',
            'The first body repeats',
          ],
          correct: 0,
          feedback: 'A single chain selects at most one body.',
          challenge:
            'For score = 83, print "A" at 90 or above, "B" at 80 or above, and "C" otherwise.',
          hints: [
            'Start with the highest threshold.',
            'Use else if for the second threshold.',
            'Use a final else for scores below 80.',
          ],
          checklist: [
            'Trace the outer branch first.',
            'Order overlapping thresholds carefully.',
            'Associate each else using braces.',
          ],
        },
        es: {
          title: 'Sentencias if anidadas',
          description: 'Seguir decisiones anidadas y alternativas ordenadas.',
          goal: 'Seguir decisiones anidadas y alternativas ordenadas.',
          explanation:
            'Una decisión puede contener otra. Una condición interna se alcanza solo cuando el control entra en su rama contenedora. Una cadena if-else-if comprueba alternativas en orden y se detiene en la primera condición verdadera. Coloca primero los umbrales más restrictivos que se superponen y usa llaves para asociar cada else con el if correcto.',
          takeaway:
            'Una prueba interna requiere alcanzar la rama que la contiene.',
          steps: [
            'Asigna true a member y 6 a visits.',
            'Entra en la rama de member y comprueba si visits alcanza 5.',
            'La rama interna verdadera asigna un descuento de 3 y se imprime.',
          ],
          practice:
            'int x = 8; int y = 0; if (x > 5) { if (x < 10) { y = 2; } } ¿Cuánto vale y?',
          practiceAnswer: '2',
          practiceFeedback:
            '8 > 5 y luego 8 < 10 son true, así que se ejecuta la asignación interna.',
          practiceHints: [
            'Empieza con y igual a cero.',
            'Comprueba la comparación externa antes de la interna.',
            'Ambas se cumplen; usa la asignación interna.',
          ],
          question:
            'En una cadena if-else-if, ¿qué ocurre después de la primera condición verdadera?',
          choices: [
            'Se omiten las alternativas restantes',
            'Se evalúan todas las condiciones restantes',
            'Se repite el primer cuerpo',
          ],
          correct: 0,
          feedback: 'Una sola cadena selecciona como máximo un cuerpo.',
          challenge:
            'Para score = 83, imprime "A" desde 90, "B" desde 80 y "C" en otro caso.',
          hints: [
            'Empieza con el umbral más alto.',
            'Usa else if para el segundo umbral.',
            'Usa un else final para valores menores que 80.',
          ],
          checklist: [
            'Sigo primero la rama externa.',
            'Ordeno bien los umbrales superpuestos.',
            'Asocio cada else mediante llaves.',
          ],
        },
      },
      example: {
        lines: [
          'boolean member = true;',
          'int visits = 6, discount = 0;',
          'if (member) {',
          '  if (visits >= 5) { discount = 3; }',
          '}',
          'System.out.println(discount);',
        ],
        active: [1, 3, 5],
        output: ['', '', '3'],
        values: {
          en: ['member = true, visits = 6', 'discount = 3', 'discount = 3'],
          es: ['member = true, visits = 6', 'discount = 3', 'discount = 3'],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int score = 83;\n    if (score >= 90) {\n      System.out.println("A");\n    } else if (score >= 80) {\n      System.out.println("B");\n    } else {\n      System.out.println("C");\n    }\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int score = 83;\n    // TODO\n  }\n}\n',
      },
    },
    {
      id: '2.5',
      sourcePdfPage: 72,
      content: {
        en: {
          title: 'Compound Boolean Expressions',
          description: 'Evaluate combined conditions and short-circuit guards.',
          goal: 'Evaluate combined conditions and short-circuit guards.',
          explanation:
            'Combine Boolean expressions with !, &&, and ||. Negation reverses a value, AND requires both operands, and OR accepts either or both. Precedence is ! before && before ||; parentheses make intent clearer. Java short-circuits: a false left operand of && or a true left operand of || prevents evaluation of the right operand.',
          takeaway: 'Guard unsafe operations with a condition on the left.',
          steps: [
            'Start with a zero divisor.',
            'The left condition divisor != 0 is false; division is skipped.',
            'The whole AND expression is false and prints safely.',
          ],
          practice: 'What is false || true && false?',
          practiceAnswer: 'false',
          practiceFeedback:
            'AND runs first: true && false is false, then false || false is false.',
          practiceHints: [
            'Check operator precedence.',
            'Evaluate true && false before the OR.',
            'Combine false with that result using ||.',
          ],
          question:
            'Which condition safely checks whether 12 / d exceeds 2 for an int d?',
          choices: [
            'd != 0 && 12 / d > 2',
            '12 / d > 2 && d != 0',
            'd == 0 && 12 / d > 2',
          ],
          correct: 0,
          feedback:
            'The nonzero check must be first so && can skip division when d is zero.',
          challenge:
            'With age = 15 and hasPass = true, print whether age is at least 12 and hasPass is true.',
          hints: [
            'Both requirements must hold.',
            'Combine age >= 12 and hasPass with &&.',
            'Print the combined expression directly.',
          ],
          checklist: [
            'Distinguish AND from inclusive OR.',
            'Apply operator precedence.',
            'Place safety checks before guarded expressions.',
          ],
        },
        es: {
          title: 'Expresiones booleanas compuestas',
          description:
            'Evaluar condiciones combinadas y guardas con cortocircuito.',
          goal: 'Evaluar condiciones combinadas y guardas con cortocircuito.',
          explanation:
            'Combina expresiones booleanas con !, && y ||. La negación invierte un valor, AND exige ambos operandos y OR acepta uno o ambos. La precedencia es ! antes de && antes de ||; los paréntesis aclaran la intención. Java cortocircuita: un operando izquierdo false en && o true en || impide evaluar el operando derecho.',
          takeaway:
            'Protege operaciones inseguras con una condición a la izquierda.',
          steps: [
            'Empieza con un divisor de cero.',
            'La condición izquierda divisor != 0 es false; se omite la división.',
            'Toda la expresión AND es false y se imprime sin dividir.',
          ],
          practice: '¿Cuánto vale false || true && false?',
          practiceAnswer: 'false',
          practiceFeedback:
            'AND se evalúa primero: true && false es false; luego false || false es false.',
          practiceHints: [
            'Comprueba la precedencia de operadores.',
            'Evalúa true && false antes del OR.',
            'Combina false con ese resultado mediante ||.',
          ],
          question:
            '¿Qué condición comprueba con seguridad si 12 / d supera 2 para un int d?',
          choices: [
            'd != 0 && 12 / d > 2',
            '12 / d > 2 && d != 0',
            'd == 0 && 12 / d > 2',
          ],
          correct: 0,
          feedback:
            'La comprobación de cero debe ir primero para que && omita la división cuando d sea cero.',
          challenge:
            'Con age = 15 y hasPass = true, imprime si age es al menos 12 y hasPass es true.',
          hints: [
            'Ambos requisitos deben cumplirse.',
            'Combina age >= 12 y hasPass mediante &&.',
            'Imprime directamente la expresión combinada.',
          ],
          checklist: [
            'Distingo AND de OR inclusivo.',
            'Aplico la precedencia de operadores.',
            'Coloco guardas antes de expresiones protegidas.',
          ],
        },
      },
      example: {
        lines: [
          'int divisor = 0;',
          'boolean large = divisor != 0 && 12 / divisor > 2;',
          'System.out.println(large);',
        ],
        active: [0, 1, 2],
        output: ['', '', 'false'],
        values: {
          en: [
            'divisor = 0',
            'large = false; division skipped',
            'large = false',
          ],
          es: [
            'divisor = 0',
            'large = false; división omitida',
            'large = false',
          ],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int age = 15;\n    boolean hasPass = true;\n    System.out.println(age >= 12 && hasPass);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int age = 15;\n    boolean hasPass = true;\n    // TODO\n  }\n}\n',
      },
    },
    {
      id: '2.6',
      sourcePdfPage: 73,
      content: {
        en: {
          title: 'Comparing Boolean Expressions',
          description:
            'Apply equivalence rules and distinguish identity from contents.',
          goal: 'Apply equivalence rules and distinguish identity from contents.',
          explanation:
            'Equivalent Boolean expressions agree for every possible input, not just one example. De Morgan’s laws negate both operands and exchange && with ||. For objects, == compares references; equals may compare contents, as String.equals does. A reference can also be null. Check for null before calling a method when an object may be absent.',
          takeaway:
            'Test all Boolean cases; compare String contents with equals.',
          steps: [
            'Create two separate String objects with matching contents.',
            'Compare references with ==; the objects are distinct.',
            'Compare contents with equals; the character sequences match.',
          ],
          practice: 'For a = true and b = false, what is !(a && b)?',
          practiceAnswer: 'true',
          practiceFeedback: 'a && b is false; negating that result gives true.',
          practiceHints: [
            'Evaluate the parentheses first.',
            'AND needs both operands to be true.',
            'Negate the false result.',
          ],
          question: 'Which expression is equivalent to !(a || b)?',
          choices: ['!a && !b', '!a || !b', 'a && b'],
          correct: 0,
          feedback:
            'De Morgan’s law negates each operand and switches OR to AND.',
          challenge:
            'Create separate Strings containing "map". Print their content equality, then print !a || !b for a = true and b = false.',
          hints: [
            'Use new String("map") twice for distinct objects.',
            'Call equals to compare their contents.',
            'Negate a and b separately and join with ||.',
          ],
          checklist: [
            'Distinguish references from contents.',
            'Transform both operands with De Morgan.',
            'Guard a possibly null receiver.',
          ],
        },
        es: {
          title: 'Comparación de expresiones booleanas',
          description:
            'Aplicar equivalencias y distinguir identidad de contenido.',
          goal: 'Aplicar equivalencias y distinguir identidad de contenido.',
          explanation:
            'Las expresiones booleanas equivalentes coinciden para toda entrada posible, no solo para un ejemplo. Las leyes de De Morgan niegan ambos operandos e intercambian && con ||. Para objetos, == compara referencias; equals puede comparar contenido, como String.equals. Una referencia también puede ser null. Comprueba null antes de llamar métodos cuando pueda faltar un objeto.',
          takeaway:
            'Prueba todos los casos booleanos; compara contenido String mediante equals.',
          steps: [
            'Crea dos objetos String separados con el mismo contenido.',
            'Compara referencias mediante ==; los objetos son distintos.',
            'Compara contenido con equals; las secuencias de caracteres coinciden.',
          ],
          practice: 'Para a = true y b = false, ¿cuánto vale !(a && b)?',
          practiceAnswer: 'true',
          practiceFeedback:
            'a && b es false; negar ese resultado produce true.',
          practiceHints: [
            'Evalúa primero los paréntesis.',
            'AND exige que ambos operandos sean true.',
            'Niega el resultado false.',
          ],
          question: '¿Qué expresión equivale a !(a || b)?',
          choices: ['!a && !b', '!a || !b', 'a && b'],
          correct: 0,
          feedback:
            'La ley de De Morgan niega cada operando y cambia OR por AND.',
          challenge:
            'Crea Strings separados con "map". Imprime su igualdad de contenido y luego !a || !b para a = true y b = false.',
          hints: [
            'Usa new String("map") dos veces para obtener objetos distintos.',
            'Llama equals para comparar su contenido.',
            'Niega a y b por separado y únelos con ||.',
          ],
          checklist: [
            'Distingo referencias de contenido.',
            'Transformo ambos operandos con De Morgan.',
            'Protejo un receptor que podría ser null.',
          ],
        },
      },
      example: {
        lines: [
          'String first = new String("sun");',
          'String second = new String("sun");',
          'System.out.println(first == second);',
          'System.out.println(first.equals(second));',
        ],
        active: [1, 2, 3],
        output: ['', 'false', 'false\ntrue'],
        values: {
          en: [
            'two distinct objects',
            'first == second: false',
            'first.equals(second): true',
          ],
          es: [
            'dos objetos distintos',
            'first == second: false',
            'first.equals(second): true',
          ],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    String first = new String("map");\n    String second = new String("map");\n    boolean a = true, b = false;\n    System.out.println(first.equals(second));\n    System.out.println(!a || !b);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    String first = new String("map");\n    String second = new String("map");\n    boolean a = true, b = false;\n    // TODO\n  }\n}\n',
      },
    },
    {
      id: '2.7',
      sourcePdfPage: 74,
      content: {
        en: {
          title: 'while Loops',
          description: 'Trace a while loop through its first false test.',
          goal: 'Trace a while loop through its first false test.',
          explanation:
            'A while loop tests its condition before every iteration, including the first. A false initial condition means zero iterations. Identify the initial state, the repeated body, and the update that moves toward termination. Trace the condition again after each update. Missing progress can cause an infinite loop, while an incorrect boundary causes an off-by-one error.',
          takeaway: 'Initialization, condition, and update must work together.',
          steps: [
            'Initialize a balance of 2.',
            'Double the balance while it is below 7: first 4, then 8.',
            'At 8 the condition fails; print the final balance.',
          ],
          practice:
            'int x = 3; while (x < 10) { x += 3; } What is the final x?',
          practiceAnswer: '12',
          practiceFeedback:
            'The body changes x to 6, 9, then 12. Only then does x < 10 become false.',
          practiceHints: [
            'List x before the first test.',
            'Add 3 after every successful test.',
            'The body still runs when x is 9.',
          ],
          question:
            'If a while condition is initially false, how often does its body run?',
          choices: ['0', '1', 'Infinitely'],
          correct: 0,
          feedback: 'while checks the condition before entering its body.',
          challenge:
            'Starting with water = 1, double it while it is below 20, then print the final amount.',
          hints: [
            'Use water < 20 as the loop condition.',
            'Multiply water by 2 inside the body.',
            'Print after termination; the result may exceed 20.',
          ],
          checklist: [
            'Check zero-iteration behavior.',
            'Ensure the update makes progress.',
            'Include the final false test in the trace.',
          ],
        },
        es: {
          title: 'Ciclos while',
          description: 'Seguir un ciclo while hasta su primera prueba falsa.',
          goal: 'Seguir un ciclo while hasta su primera prueba falsa.',
          explanation:
            'Un ciclo while prueba su condición antes de cada iteración, incluida la primera. Una condición inicial falsa implica cero iteraciones. Identifica el estado inicial, el cuerpo repetido y la actualización que acerca al final. Vuelve a evaluar la condición tras cada actualización. Sin progreso puede surgir un ciclo infinito; un límite incorrecto causa errores de una iteración.',
          takeaway:
            'La inicialización, la condición y la actualización deben coordinarse.',
          steps: [
            'Inicializa un saldo de 2.',
            'Duplica el saldo mientras sea menor que 7: primero 4 y luego 8.',
            'En 8 falla la condición; imprime el saldo final.',
          ],
          practice:
            'int x = 3; while (x < 10) { x += 3; } ¿Cuál es el x final?',
          practiceAnswer: '12',
          practiceFeedback:
            'El cuerpo cambia x a 6, 9 y luego 12. Solo entonces x < 10 se vuelve false.',
          practiceHints: [
            'Anota x antes de la primera prueba.',
            'Suma 3 tras cada prueba exitosa.',
            'El cuerpo todavía se ejecuta cuando x es 9.',
          ],
          question:
            'Si la condición de while es falsa inicialmente, ¿cuántas veces se ejecuta su cuerpo?',
          choices: ['0', '1', 'Infinitas veces'],
          correct: 0,
          feedback:
            'while comprueba la condición antes de entrar en el cuerpo.',
          challenge:
            'Empieza con water = 1, duplícalo mientras sea menor que 20 e imprime la cantidad final.',
          hints: [
            'Usa water < 20 como condición.',
            'Multiplica water por 2 dentro del cuerpo.',
            'Imprime al terminar; el resultado puede superar 20.',
          ],
          checklist: [
            'Compruebo el caso de cero iteraciones.',
            'Aseguro que la actualización progrese.',
            'Incluyo la prueba falsa final en el seguimiento.',
          ],
        },
      },
      example: {
        lines: [
          'int balance = 2;',
          'while (balance < 7) {',
          '  balance *= 2;',
          '}',
          'System.out.println(balance);',
        ],
        active: [0, 2, 4],
        output: ['', '', '8'],
        values: {
          en: ['balance = 2', 'balance = 4, 8', 'balance = 8; 8 < 7: false'],
          es: ['balance = 2', 'balance = 4, 8', 'balance = 8; 8 < 7: false'],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int water = 1;\n    while (water < 20) {\n      water *= 2;\n    }\n    System.out.println(water);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int water = 1;\n    // TODO\n  }\n}\n',
      },
    },
    {
      id: '2.8',
      sourcePdfPage: 75,
      content: {
        en: {
          title: 'for Loops',
          description: 'Track initialization, test, body, and update in order.',
          goal: 'Track initialization, test, body, and update in order.',
          explanation:
            'A for header groups initialization, a Boolean condition, and an update. Initialization runs once. Each successful test leads to the complete body, then the update, then another test. The update does not happen before the first body execution. A counter declared in the header is scoped to the loop; an equivalent while loop must preserve the execution order.',
          takeaway:
            'The update follows the body, then the condition is retested.',
          steps: [
            'Initialize total to zero and i to one.',
            'Run the body for i = 1, 2, 3; add each i to total.',
            'After i becomes four, the test fails and total prints.',
          ],
          practice:
            'How many body executions occur in for (int i = 2; i < 9; i += 2)?',
          practiceAnswer: '4',
          practiceFeedback: 'The body sees i equal to 2, 4, 6, and 8.',
          practiceHints: [
            'List the initial counter value.',
            'Advance by 2 after each body execution.',
            'Include 8 but exclude 10 because of i < 9.',
          ],
          question: 'When does a for loop update run?',
          choices: [
            'After each completed body',
            'Before initialization',
            'Only after the final false test',
          ],
          correct: 0,
          feedback: 'The cycle is test, body, update, test again.',
          challenge:
            'Use a for loop to sum the even integers from 2 through 10 inclusive, then print the sum.',
          hints: [
            'Start a sum at zero.',
            'Start i at 2, include 10, and increase i by 2.',
            'Add i to sum inside the body and print afterward.',
          ],
          checklist: [
            'Read all three header parts.',
            'Verify the last included counter.',
            'Preserve order when rewriting as while.',
          ],
        },
        es: {
          title: 'Ciclos for',
          description:
            'Seguir inicialización, prueba, cuerpo y actualización en orden.',
          goal: 'Seguir inicialización, prueba, cuerpo y actualización en orden.',
          explanation:
            'La cabecera de for agrupa inicialización, condición booleana y actualización. La inicialización ocurre una vez. Cada prueba exitosa lleva al cuerpo completo, luego a la actualización y después a otra prueba. La actualización no ocurre antes de la primera ejecución del cuerpo. Un contador declarado en la cabecera pertenece al ciclo; un while equivalente debe conservar el orden.',
          takeaway:
            'La actualización sigue al cuerpo y después se prueba la condición.',
          steps: [
            'Inicializa total en cero e i en uno.',
            'Ejecuta el cuerpo para i = 1, 2, 3; suma cada i a total.',
            'Cuando i pasa a cuatro, falla la prueba y se imprime total.',
          ],
          practice:
            '¿Cuántas ejecuciones del cuerpo ocurren en for (int i = 2; i < 9; i += 2)?',
          practiceAnswer: '4',
          practiceFeedback: 'El cuerpo ve i igual a 2, 4, 6 y 8.',
          practiceHints: [
            'Anota el valor inicial del contador.',
            'Avanza de 2 en 2 tras cada ejecución.',
            'Incluye 8 pero excluye 10 por i < 9.',
          ],
          question: '¿Cuándo se ejecuta la actualización de for?',
          choices: [
            'Después de cada cuerpo completo',
            'Antes de la inicialización',
            'Solo después de la prueba falsa final',
          ],
          correct: 0,
          feedback: 'El ciclo es prueba, cuerpo, actualización y nueva prueba.',
          challenge:
            'Usa for para sumar los enteros pares desde 2 hasta 10 inclusive e imprime la suma.',
          hints: [
            'Inicia una suma en cero.',
            'Inicia i en 2, incluye 10 y aumenta i en 2.',
            'Suma i a sum dentro del cuerpo e imprime al final.',
          ],
          checklist: [
            'Leo las tres partes de la cabecera.',
            'Verifico el último contador incluido.',
            'Conservo el orden al reescribir como while.',
          ],
        },
      },
      example: {
        lines: [
          'int total = 0;',
          'for (int i = 1; i <= 3; i++) {',
          '  total += i;',
          '}',
          'System.out.println(total);',
        ],
        active: [0, 2, 4],
        output: ['', '', '6'],
        values: {
          en: ['total = 0', 'i = 1, 2, 3; total = 1, 3, 6', 'total = 6'],
          es: ['total = 0', 'i = 1, 2, 3; total = 1, 3, 6', 'total = 6'],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int sum = 0;\n    for (int i = 2; i <= 10; i += 2) {\n      sum += i;\n    }\n    System.out.println(sum);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int sum = 0;\n    // TODO\n  }\n}\n',
      },
    },
    {
      id: '2.9',
      sourcePdfPage: 76,
      content: {
        en: {
          title: 'Implementing Selection and Iteration Algorithms',
          description: 'Combine digit extraction with an accumulator.',
          goal: 'Combine digit extraction with an accumulator.',
          explanation:
            'Selection inside repetition can count matches, accumulate sums, and track extrema. For positive decimal integers, n % 10 extracts the last digit and integer division n / 10 removes it. Divisibility tests use a zero remainder with a nonzero divisor. Initialize minimum and maximum from valid data; compute an average with floating-point division when fractional results matter.',
          takeaway: 'Extract, process, and remove one digit on each iteration.',
          steps: [
            'Begin with n = 352 and sum = 0.',
            'Extract and add the digits 2, 5, and 3, removing each afterward.',
            'When n reaches zero, print the digit sum 10.',
          ],
          practice: 'How many even digits are in the positive integer 4827?',
          practiceAnswer: '3',
          practiceFeedback: 'The even digits are 4, 8, and 2; 7 is odd.',
          practiceHints: [
            'Inspect one decimal digit at a time.',
            'A digit is even when digit % 2 == 0.',
            'Test 4, 8, 2, and 7 and count only matches.',
          ],
          question:
            'For positive int n, which expression removes its last decimal digit?',
          choices: ['n / 10', 'n % 10', 'n * 10'],
          correct: 0,
          feedback:
            'Integer division by 10 discards the remainder, removing the last digit.',
          challenge:
            'Count and print the even digits in the positive integer 6024. Treat zero as an even digit.',
          hints: [
            'Initialize count to zero and loop while n > 0.',
            'Get digit = n % 10; increment count if digit % 2 == 0.',
            'Use n /= 10 every iteration and print count afterward.',
          ],
          checklist: [
            'State the positive-input precondition.',
            'Process every digit once.',
            'Update n even when a digit does not match.',
          ],
        },
        es: {
          title: 'Implementación de algoritmos de selección e iteración',
          description: 'Combinar extracción de dígitos con un acumulador.',
          goal: 'Combinar extracción de dígitos con un acumulador.',
          explanation:
            'La selección dentro de la repetición permite contar coincidencias, acumular sumas y seguir extremos. Para enteros decimales positivos, n % 10 extrae el último dígito y la división entera n / 10 lo elimina. La divisibilidad exige residuo cero y divisor distinto de cero. Inicializa mínimo y máximo con datos válidos; calcula promedios mediante división decimal cuando importen las fracciones.',
          takeaway: 'Extrae, procesa y elimina un dígito en cada iteración.',
          steps: [
            'Empieza con n = 352 y sum = 0.',
            'Extrae y suma los dígitos 2, 5 y 3, eliminando cada uno después.',
            'Cuando n llega a cero, imprime la suma de dígitos 10.',
          ],
          practice: '¿Cuántos dígitos pares contiene el entero positivo 4827?',
          practiceAnswer: '3',
          practiceFeedback: 'Los dígitos pares son 4, 8 y 2; el 7 es impar.',
          practiceHints: [
            'Examina un dígito decimal a la vez.',
            'Un dígito es par cuando digit % 2 == 0.',
            'Prueba 4, 8, 2 y 7; cuenta solo coincidencias.',
          ],
          question:
            'Para un int n positivo, ¿qué expresión elimina su último dígito decimal?',
          choices: ['n / 10', 'n % 10', 'n * 10'],
          correct: 0,
          feedback:
            'La división entera por 10 descarta el residuo y elimina el último dígito.',
          challenge:
            'Cuenta e imprime los dígitos pares del entero positivo 6024. Considera cero como dígito par.',
          hints: [
            'Inicializa count en cero y repite mientras n > 0.',
            'Obtén digit = n % 10; incrementa count si digit % 2 == 0.',
            'Usa n /= 10 en cada iteración e imprime count al final.',
          ],
          checklist: [
            'Establezco la precondición de entrada positiva.',
            'Proceso cada dígito una vez.',
            'Actualizo n aunque un dígito no coincida.',
          ],
        },
      },
      example: {
        lines: [
          'int n = 352, sum = 0;',
          'while (n > 0) {',
          '  sum += n % 10;',
          '  n /= 10;',
          '}',
          'System.out.println(sum);',
        ],
        active: [0, 3, 5],
        output: ['', '', '10'],
        values: {
          en: ['n = 352, sum = 0', 'n = 35, 3, 0; sum = 2, 7, 10', 'sum = 10'],
          es: ['n = 352, sum = 0', 'n = 35, 3, 0; sum = 2, 7, 10', 'sum = 10'],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int n = 6024, count = 0;\n    while (n > 0) {\n      int digit = n % 10;\n      if (digit % 2 == 0) {\n        count++;\n      }\n      n /= 10;\n    }\n    System.out.println(count);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int n = 6024, count = 0;\n    // TODO\n    System.out.println(count);\n  }\n}\n',
      },
    },
    {
      id: '2.10',
      sourcePdfPage: 77,
      content: {
        en: {
          title: 'Implementing String Algorithms',
          description:
            'Traverse String positions without exceeding their bounds.',
          goal: 'Traverse String positions without exceeding their bounds.',
          explanation:
            'String algorithms visit positions or candidate substrings and build a result or count matches. A valid character position runs from zero through length() - 1. substring(i, i + 1) retrieves one character as a String. Keep substring endpoints within bounds. To reverse a String, traverse backward and append each character to a new result; Strings themselves are immutable.',
          takeaway: 'Use length() - 1 as the last valid character index.',
          steps: [
            'Set text to "cat" and result to an empty String.',
            'Visit indices 2, 1, 0 and append "t", "a", "c".',
            'After the traversal, print the newly built reverse.',
          ],
          practice: 'How many occurrences of "a" appear in "banana"?',
          practiceAnswer: '3',
          practiceFeedback: 'The characters at indices 1, 3, and 5 are "a".',
          practiceHints: [
            'Visit indices 0 through 5.',
            'Compare each one-character substring with "a" using equals.',
            'Count the matches at the three odd indices.',
          ],
          question:
            'Which loop header visits every character of String s once from left to right?',
          choices: [
            'for (int i = 0; i < s.length(); i++)',
            'for (int i = 0; i <= s.length(); i++)',
            'for (int i = 1; i < s.length(); i++)',
          ],
          correct: 0,
          feedback: 'Index zero is included and index length() is excluded.',
          challenge:
            'Count and print the lowercase "a" characters in "avocado" using substring and equals.',
          hints: [
            'Start count at zero and i at zero.',
            'Loop while i < text.length() and extract substring(i, i + 1).',
            'Increment only when that substring equals "a"; print after the loop.',
          ],
          checklist: [
            'Include the first and last characters.',
            'Compare String contents with equals.',
            'Keep the end index at most length().',
          ],
        },
        es: {
          title: 'Implementación de algoritmos con cadenas',
          description: 'Recorrer posiciones de String sin superar sus límites.',
          goal: 'Recorrer posiciones de String sin superar sus límites.',
          explanation:
            'Los algoritmos con cadenas visitan posiciones o subcadenas candidatas y construyen un resultado o cuentan coincidencias. Las posiciones válidas van desde cero hasta length() - 1. substring(i, i + 1) obtiene un carácter como String. Mantén los extremos de substring dentro de los límites. Para invertir una cadena, recórrela hacia atrás y agrega cada carácter a un resultado nuevo; String es inmutable.',
          takeaway: 'Usa length() - 1 como último índice válido de carácter.',
          steps: [
            'Asigna "cat" a text y una cadena vacía a result.',
            'Visita los índices 2, 1, 0 y agrega "t", "a", "c".',
            'Tras el recorrido, imprime la nueva cadena invertida.',
          ],
          practice: '¿Cuántas apariciones de "a" hay en "banana"?',
          practiceAnswer: '3',
          practiceFeedback: 'Los caracteres en los índices 1, 3 y 5 son "a".',
          practiceHints: [
            'Visita los índices del 0 al 5.',
            'Compara cada subcadena de un carácter con "a" mediante equals.',
            'Cuenta las coincidencias en los tres índices impares.',
          ],
          question:
            '¿Qué cabecera visita cada carácter de String s una vez de izquierda a derecha?',
          choices: [
            'for (int i = 0; i < s.length(); i++)',
            'for (int i = 0; i <= s.length(); i++)',
            'for (int i = 1; i < s.length(); i++)',
          ],
          correct: 0,
          feedback:
            'Se incluye el índice cero y se excluye el índice length().',
          challenge:
            'Cuenta e imprime los caracteres "a" minúsculos de "avocado" mediante substring y equals.',
          hints: [
            'Inicia count e i en cero.',
            'Repite mientras i < text.length() y extrae substring(i, i + 1).',
            'Incrementa solo si esa subcadena equals "a"; imprime después del ciclo.',
          ],
          checklist: [
            'Incluyo el primer y último carácter.',
            'Comparo contenido de String con equals.',
            'Mantengo el índice final como máximo en length().',
          ],
        },
      },
      example: {
        lines: [
          'String text = "cat", result = "";',
          'for (int i = text.length() - 1; i >= 0; i--) {',
          '  result += text.substring(i, i + 1);',
          '}',
          'System.out.println(result);',
        ],
        active: [0, 2, 4],
        output: ['', '', 'tac'],
        values: {
          en: [
            'text = "cat", result = ""',
            'i = 2, 1, 0; result = "t", "ta", "tac"',
            'result = "tac"',
          ],
          es: [
            'text = "cat", result = ""',
            'i = 2, 1, 0; result = "t", "ta", "tac"',
            'result = "tac"',
          ],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    String text = "avocado";\n    int count = 0;\n    for (int i = 0; i < text.length(); i++) {\n      if (text.substring(i, i + 1).equals("a")) {\n        count++;\n      }\n    }\n    System.out.println(count);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    String text = "avocado";\n    int count = 0;\n    // TODO\n    System.out.println(count);\n  }\n}\n',
      },
    },
    {
      id: '2.11',
      sourcePdfPage: 78,
      content: {
        en: {
          title: 'Nested Iteration',
          description:
            'Trace the complete inner loop for each outer iteration.',
          goal: 'Trace the complete inner loop for each outer iteration.',
          explanation:
            'A nested loop executes inside another loop. For each outer iteration, a normally completed inner loop runs all of its iterations before the outer update occurs. Reinitializing the inner counter allows it to start again. Rectangular iteration counts multiply; when the inner bound depends on the outer counter, add the separate inner counts instead of assuming a constant product.',
          takeaway: 'Restart the inner counter for every outer iteration.',
          steps: [
            'Start with count zero and row zero.',
            'Each of two rows runs three column iterations, increasing count.',
            'After both rows, print the six inner-body executions.',
          ],
          practice:
            'How many times does x++ run in for (int r = 1; r <= 3; r++) { for (int c = 1; c <= r; c++) { x++; } }?',
          practiceAnswer: '6',
          practiceFeedback:
            'The inner loop runs 1, 2, and 3 times for successive rows: 1 + 2 + 3 = 6.',
          practiceHints: [
            'The inner bound changes with r.',
            'Write the inner counts for r = 1, 2, 3.',
            'Add those counts instead of multiplying 3 by 3.',
          ],
          question:
            'Two outer iterations each contain four inner iterations. How many inner-body executions occur?',
          choices: ['8', '6', '4'],
          correct: 0,
          feedback:
            'Each outer iteration contributes four executions, so 2 * 4 = 8.',
          challenge:
            'Print three rows of four # characters using nested for loops and one newline after each row.',
          hints: [
            'Use an outer loop that runs three times.',
            'Inside it, print "#" four times with System.out.print.',
            'After the inner loop, call System.out.println() for the row break.',
          ],
          checklist: [
            'Reinitialize the inner counter.',
            'Place the row break outside the inner body.',
            'Count inner work for every outer iteration.',
          ],
        },
        es: {
          title: 'Iteración anidada',
          description:
            'Seguir el ciclo interno completo en cada iteración externa.',
          goal: 'Seguir el ciclo interno completo en cada iteración externa.',
          explanation:
            'Un ciclo anidado se ejecuta dentro de otro. En cada iteración externa, un ciclo interno que termina normalmente completa todas sus iteraciones antes de la actualización externa. Reinicializar el contador interno permite empezar de nuevo. Los conteos rectangulares se multiplican; si el límite interno depende del contador externo, suma los conteos internos separados en lugar de suponer un producto constante.',
          takeaway: 'Reinicia el contador interno en cada iteración externa.',
          steps: [
            'Empieza con count en cero y row en cero.',
            'Cada una de dos filas ejecuta tres columnas e incrementa count.',
            'Después de ambas filas, imprime las seis ejecuciones del cuerpo interno.',
          ],
          practice:
            '¿Cuántas veces se ejecuta x++ en for (int r = 1; r <= 3; r++) { for (int c = 1; c <= r; c++) { x++; } }?',
          practiceAnswer: '6',
          practiceFeedback:
            'El ciclo interno se ejecuta 1, 2 y 3 veces en filas sucesivas: 1 + 2 + 3 = 6.',
          practiceHints: [
            'El límite interno cambia con r.',
            'Anota los conteos internos para r = 1, 2, 3.',
            'Suma esos conteos en lugar de multiplicar 3 por 3.',
          ],
          question:
            'Dos iteraciones externas contienen cuatro iteraciones internas cada una. ¿Cuántas ejecuciones del cuerpo interno ocurren?',
          choices: ['8', '6', '4'],
          correct: 0,
          feedback:
            'Cada iteración externa aporta cuatro ejecuciones, así que 2 * 4 = 8.',
          challenge:
            'Imprime tres filas de cuatro caracteres # mediante for anidados y un salto de línea después de cada fila.',
          hints: [
            'Usa un ciclo externo que se ejecute tres veces.',
            'Dentro, imprime "#" cuatro veces mediante System.out.print.',
            'Después del ciclo interno, llama System.out.println() para terminar la fila.',
          ],
          checklist: [
            'Reinicializo el contador interno.',
            'Coloco el salto de fila fuera del cuerpo interno.',
            'Cuento el trabajo interno en cada iteración externa.',
          ],
        },
      },
      example: {
        lines: [
          'int count = 0;',
          'for (int row = 0; row < 2; row++) {',
          '  for (int col = 0; col < 3; col++) {',
          '    count++;',
          '  }',
          '}',
          'System.out.println(count);',
        ],
        active: [0, 3, 6],
        output: ['', '', '6'],
        values: {
          en: [
            'count = 0',
            'row = 0: count = 3; row = 1: count = 6',
            'count = 6',
          ],
          es: [
            'count = 0',
            'row = 0: count = 3; row = 1: count = 6',
            'count = 6',
          ],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    for (int row = 0; row < 3; row++) {\n      for (int col = 0; col < 4; col++) {\n        System.out.print("#");\n      }\n      System.out.println();\n    }\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    // TODO\n  }\n}\n',
      },
    },
    {
      id: '2.12',
      sourcePdfPage: 79,
      content: {
        en: {
          title: 'Informal Run-Time Analysis',
          description: 'Count a chosen statement and compare growth patterns.',
          goal: 'Count a chosen statement and compare growth patterns.',
          explanation:
            'Informal run-time analysis counts how often a specific statement executes as input size changes. Separate body executions from condition evaluations: a simple terminating loop tests its condition once more than it runs its body. Consecutive loops add their work; nested loops may multiply it. Compare growth using counts rather than claiming an exact duration, which also depends on the machine.',
          takeaway:
            'Specify which statement you count before comparing algorithms.',
          steps: [
            'Choose the inner count++ statement and set n to 3.',
            'Each of three outer iterations runs three inner iterations.',
            'The chosen statement runs 3 * 3 = 9 times and count prints.',
          ],
          practice:
            'A loop runs for i = 0 through i = 4 inclusive. How many times is its condition tested, including the final false test?',
          practiceAnswer: '6',
          practiceFeedback:
            'Five successful tests enter the body, and one final test ends the loop.',
          practiceHints: [
            'First count the included values 0, 1, 2, 3, 4.',
            'Each body execution requires a true test.',
            'Add one final false test to the five successful tests.',
          ],
          question:
            'If both bounds of an n by n nested loop double, how does the inner-body count change?',
          choices: [
            'It becomes four times as large',
            'It doubles',
            'It stays the same',
          ],
          correct: 0,
          feedback:
            'The count changes from n * n to (2 * n) * (2 * n), which is four times as large.',
          challenge:
            'For n = 4, count and print inner-body executions of nested loops with outer i from 1 through n and inner j from 1 through i.',
          hints: [
            'Use count = 0 before both loops.',
            'The inner bound is j <= i, not j <= n.',
            'Increment count once inside the inner body; the row counts are 1, 2, 3, 4.',
          ],
          checklist: [
            'Name the statement being counted.',
            'Distinguish tests from body executions.',
            'Sum changing inner-loop bounds.',
          ],
        },
        es: {
          title: 'Análisis informal del tiempo de ejecución',
          description:
            'Contar una instrucción elegida y comparar patrones de crecimiento.',
          goal: 'Contar una instrucción elegida y comparar patrones de crecimiento.',
          explanation:
            'El análisis informal cuenta cuántas veces se ejecuta una instrucción concreta al cambiar el tamaño de entrada. Separa ejecuciones del cuerpo y evaluaciones de condición: un ciclo simple que termina prueba su condición una vez más que su cuerpo. Los ciclos consecutivos suman trabajo; los anidados pueden multiplicarlo. Compara el crecimiento mediante conteos y no una duración exacta, que también depende de la máquina.',
          takeaway:
            'Especifica qué instrucción cuentas antes de comparar algoritmos.',
          steps: [
            'Elige la instrucción interna count++ y asigna 3 a n.',
            'Cada una de tres iteraciones externas ejecuta tres internas.',
            'La instrucción elegida se ejecuta 3 * 3 = 9 veces y se imprime count.',
          ],
          practice:
            'Un ciclo se ejecuta para i desde 0 hasta 4 inclusive. ¿Cuántas veces se prueba su condición, incluida la prueba falsa final?',
          practiceAnswer: '6',
          practiceFeedback:
            'Cinco pruebas exitosas entran al cuerpo y una prueba final termina el ciclo.',
          practiceHints: [
            'Cuenta primero los valores incluidos 0, 1, 2, 3, 4.',
            'Cada ejecución del cuerpo necesita una prueba true.',
            'Agrega una prueba false final a las cinco exitosas.',
          ],
          question:
            'Si se duplican ambos límites de un ciclo anidado n por n, ¿cómo cambia el conteo del cuerpo interno?',
          choices: [
            'Se vuelve cuatro veces mayor',
            'Se duplica',
            'Se mantiene igual',
          ],
          correct: 0,
          feedback:
            'El conteo cambia de n * n a (2 * n) * (2 * n), que es cuatro veces mayor.',
          challenge:
            'Para n = 4, cuenta e imprime las ejecuciones internas con i externo desde 1 hasta n y j interno desde 1 hasta i.',
          hints: [
            'Usa count = 0 antes de ambos ciclos.',
            'El límite interno es j <= i, no j <= n.',
            'Incrementa count una vez dentro del cuerpo interno; las filas cuentan 1, 2, 3, 4.',
          ],
          checklist: [
            'Identifico la instrucción contada.',
            'Distingo pruebas de ejecuciones del cuerpo.',
            'Sumo límites internos que cambian.',
          ],
        },
      },
      example: {
        lines: [
          'int n = 3, count = 0;',
          'for (int i = 0; i < n; i++) {',
          '  for (int j = 0; j < n; j++) {',
          '    count++;',
          '  }',
          '}',
          'System.out.println(count);',
        ],
        active: [0, 3, 6],
        output: ['', '', '9'],
        values: {
          en: [
            'n = 3, count = 0',
            'three rows of three: count = 9',
            'count = 9',
          ],
          es: [
            'n = 3, count = 0',
            'tres filas de tres: count = 9',
            'count = 9',
          ],
        },
        solution:
          'public class Main {\n  public static void main(String[] args) {\n    int n = 4, count = 0;\n    for (int i = 1; i <= n; i++) {\n      for (int j = 1; j <= i; j++) {\n        count++;\n      }\n    }\n    System.out.println(count);\n  }\n}\n',
        starter:
          'public class Main {\n  public static void main(String[] args) {\n    int n = 4, count = 0;\n    // TODO\n    System.out.println(count);\n  }\n}\n',
      },
    },
  ],
};
