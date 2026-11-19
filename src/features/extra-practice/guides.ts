import type { ActivityGuide } from './types';
import type { unit1ActivityTopics } from './metadata';

// Teaching references supplement the task data; these are delivered only after authentication.
export const practiceGuides: Record<
  keyof typeof unit1ActivityTopics,
  ActivityGuide
> = {
  a1: {
    concepts: {
      en: [
        'System.out.println("text"); prints the characters between the double quotes, then starts a new line. The quotes and semicolon are Java syntax; they are not printed.',
        'Spaces inside quotes are printed, including spaces at the beginning and end. A backslash is written as \\ in the output but needs \\\\ in a Java String. The ruler is only a counting aid.',
      ],
      es: [
        'System.out.println("texto"); imprime los caracteres entre las comillas dobles y luego inicia una línea nueva. Las comillas y el punto y coma son sintaxis de Java; no se imprimen.',
        'Los espacios dentro de las comillas se imprimen, incluso al inicio y al final. Una barra invertida se escribe como \\ en la salida, pero requiere \\\\ en un String de Java. La regla solo sirve para contar.',
      ],
    },
    guided: {
      en: [
        'Use Main.java and exactly five println calls to reproduce the puppy in Expected output. Every row must contain 13 printed characters, counting trailing spaces.',
        'Compare every row with the target. In your trace, number the five rows and record each row’s character count; explain how spaces affect the shape.',
      ],
      es: [
        'Usa Main.java y exactamente cinco llamadas println para reproducir el cachorro de Salida esperada. Cada fila debe contener 13 caracteres impresos, incluidos los espacios finales.',
        'Compara cada fila con el modelo. En tu traza, numera las cinco filas y anota cuántos caracteres tiene cada una; explica cómo afectan los espacios a la figura.',
      ],
    },
    independent: {
      en: [
        'Use Main.java and exactly five println calls to reproduce the house in Expected output. Every row must contain nine printed characters, including leading and trailing spaces.',
        'Preserve both roof backslashes with Java escapes. Do not print the ruler; record five row lengths and compare the actual shape with your prediction.',
      ],
      es: [
        'Usa Main.java y exactamente cinco llamadas println para reproducir la casa de Salida esperada. Cada fila debe tener nueve caracteres impresos, incluidos espacios iniciales y finales.',
        'Conserva las dos barras invertidas del techo usando escapes de Java. No imprimas la regla; registra la longitud de las cinco filas y compara la figura real con tu predicción.',
      ],
    },
  },
  a2: {
    concepts: {
      en: [
        'Java names are case-sensitive: System and system are different names. Each print call needs matching parentheses, straight double quotes around text, and a semicolon.',
        'A compiler error prevents execution. A program can compile and still print the wrong value, capitalization, or line breaks. print stays on the current line; println adds a line break. Numeric addition and joining text both use +, so parentheses can change the result.',
      ],
      es: [
        'Java distingue mayúsculas: System y system son nombres diferentes. Cada impresión requiere paréntesis completos, comillas dobles rectas alrededor del texto y punto y coma.',
        'Un error de compilación impide ejecutar. Un programa puede compilar e imprimir valores, mayúsculas o saltos de línea incorrectos. print continúa en la línea actual; println agrega un salto. La suma y la unión de texto usan +; los paréntesis pueden cambiar el resultado.',
      ],
    },
    guided: {
      en: [
        'Build a new program in Main.java that prints the seven target lines exactly, in order. This is a reconstruction task: there is no missing file to find and no requirement to invent six errors.',
        'Use Debugging.txt to record any problems you encounter: line, problem, compiler/output category, correction, and observed evidence. Finish by naming two debugging strategies, one challenge, and one rule to remember.',
      ],
      es: [
        'Construye en Main.java un programa nuevo que imprima exactamente las siete líneas del modelo, en orden. Es una reconstrucción: no necesitas buscar otro archivo ni inventar seis errores.',
        'En Debugging.txt registra los problemas que encuentres: línea, problema, categoría de compilación o salida, corrección y evidencia observada. Termina con dos estrategias de depuración, una dificultad y una regla para recordar.',
      ],
    },
    independent: {
      en: [
        'Repair the supplied Main.java one issue at a time. There are six corrections across Java syntax, numeric addition, line breaks, and letter case. The final output must match all seven target lines.',
        'Write six entries in Debugging.txt with line, problem/type, correction, and evidence. Also answer: Which two debugging strategies helped? What was difficult? Which rule will you remember?',
      ],
      es: [
        'Repara el Main.java incluido, un problema a la vez. Hay seis correcciones entre sintaxis de Java, suma numérica, saltos de línea y mayúsculas. La salida final debe coincidir con las siete líneas del modelo.',
        'Escribe seis entradas en Debugging.txt con línea, problema o tipo, corrección y evidencia. Responde también: ¿Qué dos estrategias te ayudaron? ¿Qué fue difícil? ¿Qué regla recordarás?',
      ],
    },
  },
  a3: {
    concepts: {
      en: [
        'A declaration introduces a variable with its type, for example int count = 2;. An update uses the existing name without declaring it again: count = 3;. Declare a local name only once in the same scope.',
        'int stores whole numbers; double can store fractional numbers. A whole-number value assigned to double is represented as a double when printed. Do not assign a fractional double directly to int.',
      ],
      es: [
        'Una declaración introduce una variable y su tipo, por ejemplo int count = 2;. Una actualización usa el nombre existente sin declararlo otra vez: count = 3;. Declara un nombre local una sola vez en el mismo ámbito.',
        'int almacena enteros; double permite fracciones. Un valor entero asignado a double se representa como double al imprimirlo. No asignes directamente un double fraccionario a int.',
      ],
    },
    guided: {
      en: [
        'Run Main.java. Predict the four numeric outputs before changing it; keep the existing labels and order. Perform each of the five tutor experiments separately and restore the original before the next experiment.',
        'For each experiment, record the changed line, whether it compiles, the compiler message or output, and your explanation. Finally declare instagramPosts at 0, print it, update it to 10 without redeclaring, and print again.',
      ],
      es: [
        'Ejecuta Main.java. Predice las cuatro salidas numéricas antes de modificarlo; conserva las etiquetas y el orden. Realiza por separado los cinco experimentos del tutor y restaura el original antes del siguiente.',
        'En cada experimento registra la línea cambiada, si compila, el mensaje o salida y tu explicación. Finalmente declara instagramPosts en 0, imprímelo, actualízalo a 10 sin redeclarar e imprime otra vez.',
      ],
    },
    independent: {
      en: [
        'In Main.java, use int messages = 24, double hoursOnline = 1.5, and int posts = 0. Update messages to 30, hoursOnline to 2.0, and posts to 6 without redeclaring.',
        'Print six labeled lines in this order: starting messages, starting hoursOnline, updated messages, updated hoursOnline, starting posts, updated posts. Choose clear labels; their exact wording is up to you.',
      ],
      es: [
        'En Main.java usa int messages = 24, double hoursOnline = 1.5 e int posts = 0. Actualiza messages a 30, hoursOnline a 2.0 y posts a 6 sin redeclarar.',
        'Imprime seis líneas etiquetadas en este orden: messages inicial, hoursOnline inicial, messages actualizado, hoursOnline actualizado, posts inicial y posts actualizado. Elige etiquetas claras; puedes decidir su texto exacto.',
      ],
    },
  },
  a4: {
    concepts: {
      en: [
        'With two int operands, / gives the whole-number quotient and % gives the remainder. With at least one double operand, / performs decimal division. Storing an int quotient in double does not restore its discarded fraction.',
        'Convert a percentage to a decimal rate before multiplying. tip = bill * tipRate and payment = bill + tip. When joining a label to a calculation, put the calculation in parentheses.',
      ],
      es: [
        'Con dos operandos int, / da el cociente entero y % el residuo. Con al menos un operando double, / realiza división decimal. Guardar un cociente entero en double no recupera la fracción descartada.',
        'Convierte el porcentaje en tasa decimal antes de multiplicar. tip = bill * tipRate y payment = bill + tip. Al unir una etiqueta con un cálculo, coloca el cálculo entre paréntesis.',
      ],
    },
    guided: {
      en: [
        'Use fixed values in Main.java: 12 GB free, 5 GB per download, bill 2000, and tipRate 0.10. This task does not require keyboard input.',
        'Predict and print five labeled results: complete downloads, remaining GB, decimal quotient, tip, and total payment. Use int for whole-number counts and double where decimals are required. Labels are your choice; currency formatting is not required.',
      ],
      es: [
        'Usa valores fijos en Main.java: 12 GB libres, 5 GB por descarga, cuenta de 2000 y tipRate de 0.10. Esta tarea no requiere entrada del teclado.',
        'Predice e imprime cinco resultados etiquetados: descargas completas, GB restantes, cociente decimal, propina y pago total. Usa int para cantidades enteras y double cuando se necesiten decimales. Elige las etiquetas; no se requiere formato monetario.',
      ],
    },
    independent: {
      en: [
        'Use fixed values: 17 GB free, 4 GB per download, bill 3000, and tipRate 0.15. Write your program in Main.java; no keyboard input is required.',
        'Predict and print the same five quantities: complete downloads, remaining GB, decimal quotient, tip, and total payment. Explain which division uses decimal operands and why. Labels are your choice; do not round values unless you explain it.',
      ],
      es: [
        'Usa valores fijos: 17 GB libres, 4 GB por descarga, cuenta de 3000 y tipRate de 0.15. Escribe el programa en Main.java; no se requiere entrada del teclado.',
        'Predice e imprime las mismas cinco cantidades: descargas completas, GB restantes, cociente decimal, propina y pago total. Explica cuál división usa operandos decimales y por qué. Elige las etiquetas; no redondees sin explicarlo.',
      ],
    },
  },
  a5: {
    concepts: {
      en: [
        'Add import java.util.Scanner; before the class. Inside main, create Scanner input = new Scanner(System.in);. input.nextInt() reads the next whole number typed by the user.',
        'Read all three values before calculating: total = quantity * price and change = payment - total. Amounts are whole colones, nonnegative, and the payment covers the purchase; input validation is not part of this task.',
      ],
      es: [
        'Agrega import java.util.Scanner; antes de la clase. Dentro de main crea Scanner input = new Scanner(System.in);. input.nextInt() lee el siguiente número entero que escriba el usuario.',
        'Lee los tres valores antes de calcular: total = quantity * price y change = payment - total. Los montos son colones enteros no negativos y el pago cubre la compra; no se pide validar entradas.',
      ],
    },
    guided: {
      en: [
        'In Main.java, prompt for and read quantity, price per item, and payment in that order. Enter 3, 500, and 2000 as three separate inputs, not as values hard-coded into the calculation.',
        'Print the total and change with clear labels, in that order. Predict both calculated values first, then record the actual console results. Prompt wording and result labels are your choice.',
      ],
      es: [
        'En Main.java solicita y lee cantidad, precio por artículo y pago, en ese orden. Introduce 3, 500 y 2000 como tres entradas separadas; no los escribas como valores fijos del cálculo.',
        'Imprime el total y el vuelto con etiquetas claras, en ese orden. Predice ambos valores calculados y luego registra los resultados reales. Puedes elegir el texto de las preguntas y etiquetas.',
      ],
    },
    independent: {
      en: [
        'Read notebook count, price per notebook, and payment in Main.java. First test 4, 750, and 5000 in that order. Then choose another nonnegative purchase whose payment is sufficient.',
        'For both tests, record the three inputs, predicted total and change, and actual results. Print total then change with labels; use the values read from the keyboard.',
      ],
      es: [
        'Lee cantidad de cuadernos, precio por cuaderno y pago en Main.java. Primero prueba 4, 750 y 5000 en ese orden. Luego elige otra compra no negativa con pago suficiente.',
        'En ambas pruebas registra las tres entradas, el total y vuelto previstos y los resultados reales. Imprime total y luego vuelto con etiquetas; usa los valores leídos del teclado.',
      ],
    },
  },
  a6: {
    concepts: {
      en: [
        'Java evaluates an expression before assigning it. (double) applied to an operand before / changes the division to decimal division; assigning an already computed int quotient to double does not.',
        'Casting a positive double to int discards the fractional part. For the positive values in this task, (int) (x + 0.5) implements rounding to the nearest integer. This rule is not a general rounding rule for negative values.',
      ],
      es: [
        'Java evalúa una expresión antes de asignarla. Aplicar (double) a un operando antes de / cambia a división decimal; guardar en double un cociente int ya calculado no lo cambia.',
        'Convertir un double positivo a int descarta su fracción. Para los valores positivos de esta tarea, (int) (x + 0.5) redondea al entero más cercano. Esa regla no sirve en general para valores negativos.',
      ],
    },
    guided: {
      en: [
        'Use the complete Main.java provided. Predict first, second, third, and rounded in that order before running; the program prints four lines without labels.',
        'For each line, show the operand types and evaluation order. Distinguish integer division, decimal division, direct truncation, and addition before casting. No keyboard input is needed.',
      ],
      es: [
        'Usa el Main.java completo incluido. Predice first, second, third y rounded, en ese orden, antes de ejecutar; el programa imprime cuatro líneas sin etiquetas.',
        'En cada línea muestra los tipos de operandos y el orden de evaluación. Distingue división entera, decimal, truncamiento directo y suma antes de convertir. No se necesita entrada del teclado.',
      ],
    },
    independent: {
      en: [
        'Write four expressions in Main.java: 11 / 4 stored in double, (double) 11 / 4 stored in double, (int) 6.8 stored in int, and (int) (6.8 + 0.5) stored in int.',
        'Print those four results in that order, one per line without labels, and explain each prediction before running. These values are fixed; no input is required.',
      ],
      es: [
        'Escribe cuatro expresiones en Main.java: 11 / 4 guardado en double, (double) 11 / 4 guardado en double, (int) 6.8 guardado en int e (int) (6.8 + 0.5) guardado en int.',
        'Imprime esos cuatro resultados en orden, uno por línea sin etiquetas, y explica cada predicción antes de ejecutar. Los valores son fijos; no se requiere entrada.',
      ],
    },
  },
  b1: {
    concepts: {
      en: [
        'Use import java.util.Scanner; and Scanner input = new Scanner(System.in);. input.nextDouble() reads a decimal number. Enter decimals with a period for this exercise.',
        'balance *= (1 + interestRate) keeps the original balance and adds interest. balance += deposit adds the deposit. Each update uses the balance produced by the previous update, so order matters.',
      ],
      es: [
        'Usa import java.util.Scanner; y Scanner input = new Scanner(System.in);. input.nextDouble() lee un número decimal. En esta práctica escribe los decimales con punto.',
        'balance *= (1 + interestRate) conserva el saldo original y agrega intereses. balance += deposit agrega el depósito. Cada actualización usa el saldo que dejó la anterior; el orden importa.',
      ],
    },
    guided: {
      en: [
        'In Main.java, use interestRate = 0.03. Read an initial balance of 1000, print it, apply interest, read a deposit of 200, add it, and apply interest again. The two test numbers must be keyboard inputs.',
        'Trace the balance after each of the three updates. Print the final balance as well as the initial balance, using clear labels of your choice. Record actual double output; two-decimal currency formatting is not required.',
      ],
      es: [
        'En Main.java usa interestRate = 0.03. Lee un saldo inicial de 1000, imprímelo, aplica intereses, lee un depósito de 200, súmalo y aplica intereses otra vez. Los dos números de prueba deben venir del teclado.',
        'Traza el saldo después de cada una de las tres actualizaciones. Imprime el saldo final además del inicial, con etiquetas claras a tu elección. Registra la salida real de double; no se exige formato de dos decimales.',
      ],
    },
    independent: {
      en: [
        'Use a 2% rate stored as 0.02. Read initial balance then deposit; test with 500 and 50. Apply interest, add deposit, then apply interest again. Use *= and +=; do not hard-code the inputs.',
        'Record all three updated balances in the trace. Print initial and final balances with clear labels, and explain why multiplying by only the rate would discard the original balance.',
      ],
      es: [
        'Usa una tasa del 2% guardada como 0.02. Lee saldo inicial y luego depósito; prueba con 500 y 50. Aplica intereses, suma el depósito y aplica intereses otra vez. Usa *= y +=; no fijes las entradas en el código.',
        'Registra los tres saldos actualizados en la traza. Imprime el saldo inicial y final con etiquetas claras y explica por qué multiplicar solo por la tasa perdería el saldo original.',
      ],
    },
  },
  b2: {
    concepts: {
      en: [
        'Use Scanner.nextLine() to read a complete line, including spaces. Calling next() would stop at the first space. Import java.util.Scanner and create the reader inside main.',
        'String.toLowerCase() returns a new String; save it because it does not change the original. contains(String text) returns a boolean and is case-sensitive. length() returns an int; count spaces too. These examples use simple Latin letters.',
      ],
      es: [
        'Usa Scanner.nextLine() para leer una línea completa con espacios. next() se detendría en el primer espacio. Importa java.util.Scanner y crea el lector dentro de main.',
        'String.toLowerCase() devuelve un String nuevo; guárdalo porque no modifica el original. contains(String text) devuelve boolean y distingue mayúsculas. length() devuelve int; cuenta también los espacios. Estos ejemplos usan letras latinas simples.',
      ],
    },
    guided: {
      en: [
        'In Main.java, read Computer Science into subject. Keep subject unchanged; store subject.toLowerCase() in subjectLowerCase, test whether that lower-case value contains "computer", and measure the original subject.length().',
        'Predict and print three results in order: lower-case text, the contains boolean, and the original length. Labels and the input prompt are your choice. Record how you counted the space.',
      ],
      es: [
        'En Main.java lee Computer Science en subject. Conserva subject sin cambios; guarda subject.toLowerCase() en subjectLowerCase, prueba si ese valor contiene "computer" y mide subject.length() en el original.',
        'Predice e imprime tres resultados en orden: texto en minúsculas, boolean de contains y longitud original. Puedes elegir etiquetas y pregunta de entrada. Registra cómo contaste el espacio.',
      ],
    },
    independent: {
      en: [
        'Read Playing Chess into activity with nextLine(). Keep the original, save its lower-case version, test that lower-case String for "chess", and get the original length.',
        'Print lower-case text, contains result, and original length in that order. Predict all three first; explain why the contains call uses the lower-case version.',
      ],
      es: [
        'Lee Playing Chess en activity con nextLine(). Conserva el original, guarda su versión en minúsculas, comprueba si esa versión contiene "chess" y obtiene la longitud original.',
        'Imprime texto en minúsculas, resultado de contains y longitud original, en ese orden. Predice los tres antes de ejecutar; explica por qué contains usa la versión en minúsculas.',
      ],
    },
  },
  b3: {
    concepts: {
      en: [
        '// comments out the rest of one source line. A compiler checks method bodies even if their calls are commented out; removing a call does not remove invalid code from the class.',
        'String is the Java reference type with a capital S. A double literal has no quotation marks; text in quotation marks is a String. Temporary comments can isolate an error but are not a permanent repair.',
      ],
      es: [
        '// convierte en comentario el resto de una línea. El compilador revisa los cuerpos de los métodos aunque sus llamadas estén comentadas; quitar una llamada no elimina código inválido de la clase.',
        'String es el tipo de referencia de Java con S mayúscula. Un literal double no lleva comillas; el texto entre comillas es String. Los comentarios temporales ayudan a aislar errores, pero no son una reparación definitiva.',
      ],
    },
    guided: {
      en: [
        'Investigate the provided Main.java in four stages: unchanged; only the brokenMethod() call commented; call restored and invalid declaration commented; declaration restored and permanently corrected.',
        'Record a prediction and compiler result for each stage. The final version must call brokenMethod(), contain a valid String declaration, and print both existing messages without changing their text or order.',
      ],
      es: [
        'Investiga el Main.java incluido en cuatro etapas: sin cambios; solo la llamada brokenMethod() comentada; llamada restaurada y declaración inválida comentada; declaración restaurada y corregida definitivamente.',
        'Registra una predicción y el resultado del compilador en cada etapa. La versión final debe llamar brokenMethod(), tener una declaración String válida e imprimir ambos mensajes existentes sin cambiar su texto ni orden.',
      ],
    },
    independent: {
      en: [
        'Repeat the four-stage investigation with the provided Main.java. Permanently correct amount so it is a double with value 5.5, not text, and restore the brokenMethod() call.',
        'The final program must print Start and End on separate lines in that order. Explain why commenting the call alone did not repair the declaration; record the compiler outcome at each stage.',
      ],
      es: [
        'Repite la investigación de cuatro etapas con el Main.java incluido. Corrige amount de forma permanente para que sea double con valor 5.5, no texto, y restaura la llamada brokenMethod().',
        'El programa final debe imprimir Start y End en líneas separadas y en ese orden. Explica por qué comentar solo la llamada no reparó la declaración; registra el resultado del compilador en cada etapa.',
      ],
    },
  },
  b4: {
    concepts: {
      en: [
        'A parameter receives the argument value when a method is called. return sends the computed value back to the caller; it does not print that value.',
        'number = calculate(number) replaces number. number += calculate(number) adds the returned value to the old number. In either case the call receives the value stored before the assignment.',
      ],
      es: [
        'Un parámetro recibe el valor del argumento al llamar al método. return envía el valor calculado a quien llamó; no lo imprime.',
        'number = calculate(number) reemplaza number. number += calculate(number) suma el valor devuelto al valor anterior. En ambos casos la llamada recibe el valor almacenado antes de la asignación.',
      ],
    },
    guided: {
      en: [
        'First trace Main.java exactly as supplied: number starts at 10 and mysteryMethod returns num * 15. Record old number, parameter num, returned value, and printed value.',
        'Then change only the assignment so it adds the return to the old number instead of replacing it. Keep an int return type, keep the multiplication in the method, and print number once after updating. Compare both runs.',
      ],
      es: [
        'Primero traza Main.java tal como está: number empieza en 10 y mysteryMethod devuelve num * 15. Registra number anterior, parámetro num, valor devuelto y valor impreso.',
        'Luego cambia solo la asignación para sumar el retorno al valor anterior en vez de reemplazarlo. Conserva el retorno int, la multiplicación dentro del método e imprime number una vez tras actualizar. Compara ambas ejecuciones.',
      ],
    },
    independent: {
      en: [
        'In Main.java, start int number at 8. Define public static int calculate(int num) that returns num * 4. In main, add its returned value to the old number.',
        'Print number once after the update. In your trace, compare the requested addition with replacement alone; keep calculation and return in calculate, and printing in main. No input is required.',
      ],
      es: [
        'En Main.java inicia int number en 8. Define public static int calculate(int num) que devuelva num * 4. En main suma su retorno al valor anterior de number.',
        'Imprime number una vez después de actualizar. En la traza compara la suma solicitada con reemplazar solamente; mantén el cálculo y return en calculate, y la impresión en main. No se requiere entrada.',
      ],
    },
  },
  b5: {
    concepts: {
      en: [
        'Logger.logInfo(String log, String message), Logger.logWarning(String log, String message), and Logger.logError(String log, String message) each return String. They append [INFO], [WARNING], or [ERROR], one space, the message, and a newline to the existing log.',
        'Store each returned String back in log. A call without assignment does not update the stored text. Prefix these external static methods with Logger.; resetLog is a local static method in LogRunner and returns a new header.',
      ],
      es: [
        'Logger.logInfo(String log, String message), Logger.logWarning(String log, String message) y Logger.logError(String log, String message) devuelven String. Agregan [INFO], [WARNING] o [ERROR], un espacio, el mensaje y un salto de línea al registro existente.',
        'Guarda cada String devuelto otra vez en log. Una llamada sin asignación no actualiza el texto almacenado. Usa Logger. para estos métodos estáticos externos; resetLog es un método estático local de LogRunner y devuelve un encabezado nuevo.',
      ],
    },
    guided: {
      en: [
        'Keep Logger.java unchanged beside LogRunner.java and run LogRunner. First trace the existing R48 log and the R52 reset, including newline characters. No keyboard input is required.',
        'Test removal of one log = assignment and of one Logger. prefix separately, restoring each experiment. In the final version, use logError for Low memory detected. and keep the Application restarted successfully. info entry. Preserve the other messages and reset.',
      ],
      es: [
        'Conserva Logger.java sin cambios junto a LogRunner.java y ejecuta LogRunner. Primero traza el registro R48 existente y el reinicio R52, incluidos los saltos de línea. No se requiere entrada del teclado.',
        'Prueba quitar una asignación log = y un prefijo Logger. por separado, restaurando cada experimento. En la versión final usa logError para Low memory detected. y conserva la entrada informativa Application restarted successfully. Mantén los otros mensajes y el reinicio.',
      ],
    },
    independent: {
      en: [
        'Build LogRunner.java with an initial header "Network N07\n". Append Connected. as info, Weak signal. as warning, and Connection lost. as error, in that order; store every returned value and print the accumulated log.',
        'Define a local static String resetLog(String systemNum) returning "Network " + systemNum + "\n". Call resetLog("N08"), store the return, and print the new header. Keep Logger.java unchanged; trace the log after every assignment.',
      ],
      es: [
        'Construye LogRunner.java con encabezado inicial "Network N07\n". Agrega Connected. como información, Weak signal. como advertencia y Connection lost. como error, en orden; guarda cada retorno e imprime el registro acumulado.',
        'Define un método local static String resetLog(String systemNum) que devuelva "Network " + systemNum + "\n". Llama resetLog("N08"), guarda el retorno e imprime el encabezado nuevo. Conserva Logger.java sin cambios; traza el registro tras cada asignación.',
      ],
    },
  },
  b6: {
    concepts: {
      en: [
        'UnitConverter.celsiusToFahrenheit(double celsius) returns double using celsius * 9.0 / 5 + 32. UnitConverter.poundsToKilograms(double pounds) returns double using pounds * 0.45359237. UnitConverter.milesToKilometers(double miles) returns double using miles * 1.609344.',
        'These are static methods: call them through UnitConverter without constructing an object. Each takes one numeric argument, accepts an int widened to double, and returns double. A quoted number is a String, not a numeric argument; store the returned value in a compatible type.',
      ],
      es: [
        'UnitConverter.celsiusToFahrenheit(double celsius) devuelve double usando celsius * 9.0 / 5 + 32. UnitConverter.poundsToKilograms(double pounds) devuelve double usando pounds * 0.45359237. UnitConverter.milesToKilometers(double miles) devuelve double usando miles * 1.609344.',
        'Son métodos estáticos: llámalos mediante UnitConverter sin crear un objeto. Cada uno recibe un argumento numérico, acepta int convertido a double y devuelve double. Un número entre comillas es String, no un argumento numérico; guarda el retorno en un tipo compatible.',
      ],
    },
    guided: {
      en: [
        'Run the supplied UnitRunner.java together with the complete UnitConverter.java shown here. The runner already compiles: this is a tracing task, not a search for three nonexistent errors.',
        'Predict the three labeled results in order: Fahrenheit for 0 Celsius, Kilograms for 20 pounds, and Kilometers for 65 miles. Match each call to its helper signature; show the input, formula substitution, return type, and stored variable. No keyboard input is needed.',
      ],
      es: [
        'Ejecuta el UnitRunner.java incluido junto al UnitConverter.java completo que aparece aquí. El programa ya compila: esta es una tarea de traza, no una búsqueda de tres errores inexistentes.',
        'Predice los tres resultados etiquetados en orden: Fahrenheit para 0 Celsius, Kilograms para 20 libras y Kilometers para 65 millas. Relaciona cada llamada con su firma; muestra entrada, sustitución en la fórmula, tipo devuelto y variable receptora. No se necesita entrada del teclado.',
      ],
    },
    independent: {
      en: [
        'Repair exactly three call/type problems in the supplied UnitRunner.java: method spelling, receiving type, and argument type. Keep UnitConverter.java unchanged. The requested conversions are 25 Celsius, 10 pounds, and 10 miles.',
        'Compile after each correction and record the changed line, compiler evidence, and reason. Keep the existing Fahrenheit, Kilograms, and Kilometers labels and their order; print the unrounded returned double values.',
      ],
      es: [
        'Repara exactamente tres problemas de llamada o tipo en UnitRunner.java: nombre del método, tipo receptor y tipo del argumento. Conserva UnitConverter.java sin cambios. Convierte 25 Celsius, 10 libras y 10 millas.',
        'Compila después de cada corrección y registra línea cambiada, evidencia del compilador y razón. Conserva las etiquetas Fahrenheit, Kilograms y Kilometers y su orden; imprime los double devueltos sin redondear.',
      ],
    },
  },
  b7: {
    concepts: {
      en: [
        'Hello.english(String name), Hello.spanish(String name), Hello.french(String name), and Hello.german(String name) are static void methods. Each accepts one String and prints one greeting; void means there is no returned value to assign.',
        'The exact prefixes are "Hello, ", "Hola, ", "Bonjour, ", and "Hallo, ". Each method adds the stored name and "!" then a newline. Use Scanner.nextLine() to keep spaces in a full name.',
      ],
      es: [
        'Hello.english(String name), Hello.spanish(String name), Hello.french(String name) y Hello.german(String name) son métodos static void. Cada uno recibe un String e imprime un saludo; void significa que no devuelve un valor para asignar.',
        'Los prefijos exactos son "Hello, ", "Hola, ", "Bonjour, " y "Hallo, ". Cada método agrega el nombre guardado, "!" y un salto de línea. Usa Scanner.nextLine() para conservar espacios en el nombre completo.',
      ],
    },
    guided: {
      en: [
        'Write HelloRunner.java beside the unchanged Hello.java. Import Scanner, ask for a name, read one full line, and pass that stored name to Hello.english, Hello.spanish, and Hello.french, in that order.',
        'Test with Matias. Predict all three greeting lines before running, including capitalization, comma, space, and exclamation mark. You choose the input prompt wording; do not assign void method calls to variables.',
      ],
      es: [
        'Escribe HelloRunner.java junto al Hello.java sin modificar. Importa Scanner, solicita un nombre, lee una línea completa y pasa el nombre guardado a Hello.english, Hello.spanish y Hello.french, en ese orden.',
        'Prueba con Matias. Predice las tres líneas de saludo antes de ejecutar, incluidas mayúsculas, coma, espacio y exclamación. Puedes elegir la pregunta de entrada; no asignes llamadas void a variables.',
      ],
    },
    independent: {
      en: [
        'Read Ana Maria as one full name in HelloRunner.java. Pass the stored variable to Hello.german, Hello.spanish, Hello.english, and Hello.french, in that order. Keep Hello.java unchanged.',
        'Predict four greeting lines, preserving the space in Ana Maria and each helper’s exact punctuation. Record actual output and explain why reading a full line and using four separate calls matters.',
      ],
      es: [
        'Lee Ana Maria como un solo nombre completo en HelloRunner.java. Pasa la variable guardada a Hello.german, Hello.spanish, Hello.english y Hello.french, en ese orden. Conserva Hello.java sin cambios.',
        'Predice cuatro líneas de saludo, conservando el espacio de Ana Maria y la puntuación exacta de cada método. Registra la salida real y explica por qué importan la línea completa y las cuatro llamadas separadas.',
      ],
    },
  },
  b8: {
    concepts: {
      en: [
        'Calculator.slope(double x1, double y1, double x2, double y2) returns double: (y2 - y1) / (x2 - x1). The x coordinates must differ. Calculator.distance with the same four arguments returns double: the square root of (x2 - x1)² + (y2 - y1)².',
        'Calculator.quadRoots(double a, double b, double c) returns String for ax² + bx + c = 0. It returns (-b + √(b² - 4ac)) / (2a), then " and ", then (-b - √(b² - 4ac)) / (2a). Require a != 0 and b² - 4ac >= 0. The complete helper includes these formulas; call it rather than copying the formulas into main.',
      ],
      es: [
        'Calculator.slope(double x1, double y1, double x2, double y2) devuelve double: (y2 - y1) / (x2 - x1). Las coordenadas x deben ser distintas. Calculator.distance con los mismos cuatro argumentos devuelve double: la raíz cuadrada de (x2 - x1)² + (y2 - y1)².',
        'Calculator.quadRoots(double a, double b, double c) devuelve String para ax² + bx + c = 0. Devuelve (-b + √(b² - 4ac)) / (2a), luego " and " y después (-b - √(b² - 4ac)) / (2a). Requiere a != 0 y b² - 4ac >= 0. La clase completa incluye las fórmulas; llámala sin repetirlas en main.',
      ],
    },
    guided: {
      en: [
        'Run CalculatorRunner.java with the unchanged Calculator.java. Use slope points (1,1) and (5,10), distance points (2,3) and (6,7), and quadratic coefficients a=1, b=2, c=-8. These are fixed arguments, not keyboard inputs.',
        'Predict the Slope, Distance, and Roots lines in their existing order. Trace the mapping of arguments to parameters, keep slope/distance as double and roots as String, and list three advantages of reusing the helper.',
      ],
      es: [
        'Ejecuta CalculatorRunner.java con Calculator.java sin cambios. Usa puntos (1,1) y (5,10) para pendiente, (2,3) y (6,7) para distancia y coeficientes a=1, b=2, c=-8. Son argumentos fijos, no entradas del teclado.',
        'Predice las líneas Slope, Distance y Roots en su orden actual. Traza la relación entre argumentos y parámetros, conserva pendiente y distancia como double y raíces como String, y enumera tres ventajas de reutilizar la clase.',
      ],
    },
    independent: {
      en: [
        'Write CalculatorRunner.java using slope points (0,0) and (4,6), distance points (1,1) and (4,5), and coefficients a=1, b=-5, c=6 for x² - 5x + 6 = 0. Keep Calculator.java unchanged.',
        'Print three labeled lines in order: Slope, Distance, Roots. Predict them first, check the helper preconditions, preserve the root order produced by quadRoots, and explain three reasons for reusing the helper. No keyboard input or custom rounding is needed.',
      ],
      es: [
        'Escribe CalculatorRunner.java usando puntos (0,0) y (4,6) para pendiente, (1,1) y (4,5) para distancia y coeficientes a=1, b=-5, c=6 para x² - 5x + 6 = 0. Conserva Calculator.java sin cambios.',
        'Imprime tres líneas etiquetadas en orden: Slope, Distance y Roots. Predícelas primero, verifica las precondiciones, conserva el orden de raíces de quadRoots y explica tres razones para reutilizar la clase. No se requiere entrada del teclado ni redondeo especial.',
      ],
    },
  },
};
