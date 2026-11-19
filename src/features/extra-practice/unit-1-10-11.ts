import type { ExtraActivity } from './types';

// Source pages are internal provenance; student predictions and completed solutions are omitted.
// Blank lines in inputs separate independent runs. Helpers apply to both worksheets.
export const unit1ClassMathActivities: ExtraActivity[] = [
  {
    id: 'd1',
    topicId: '1.10',
    group: '1.10–1.15',
    title: {
      en: '1.10.3 · Read and update a system log',
      es: '1.10.3 · Leer y actualizar un registro del sistema',
    },
    goal: {
      en: 'Save returned Strings from static methods.',
      es: 'Guardar Strings devueltos por métodos estáticos.',
    },
    guided: {
      id: 'd1-guided',
      prompt: {
        en: 'Investigate the supplied LogRunner with Logger.java. Predict before each experiment and restore the original before the next change. Then make the requested modifications in a copy.',
        es: 'Investiga LogRunner con Logger.java. Predice antes de cada experimento y restaura el original antes del siguiente cambio. Luego haz las modificaciones pedidas en una copia.',
      },
      steps: {
        en: [
          'Predict every printed line, including the newline in each log entry, println’s extra newline, and the empty println after resetLog.',
          'Remove log = from the first logInfo call; predict whether the returned String is saved, run, record, and restore.',
          'Remove Logger. from that call; predict whether LogRunner can resolve logInfo, compile, record the diagnostic, and restore.',
          'Explain why resetLog("R52") needs no class qualifier inside LogRunner, and trace the systemNum parameter.',
          'In a copy, change the Low memory detected. call from logWarning to logError. Immediately after it insert an info call with Application restarted successfully. Save its returned String. Preserve the already existing later restart call and all other messages; predict and compare both versions.',
        ],
        es: [
          'Predice cada línea impresa, incluidos el salto de línea de cada entrada, el salto adicional de println y el println vacío después de resetLog.',
          'Quita log = de la primera llamada logInfo; predice si se guarda el String devuelto, ejecuta, registra y restaura.',
          'Quita Logger. de esa llamada; predice si LogRunner puede encontrar logInfo, compila, registra el diagnóstico y restaura.',
          'Explica por qué resetLog("R52") no necesita el nombre de clase dentro de LogRunner y traza el parámetro systemNum.',
          'En una copia, cambia la llamada con Low memory detected. de logWarning a logError. Inmediatamente después inserta una llamada info con Application restarted successfully. Guarda su String devuelto. Conserva la llamada posterior de reinicio ya existente y los demás mensajes; predice y compara ambas versiones.',
        ],
      },
      files: [
        {
          name: 'LogRunner.java',
          code: 'public class LogRunner {\n    public static void main(String[] args) {\n        String log = "Computer System R48 Log:\\n";\n        log = Logger.logInfo(log, "Application started successfully.");\n        log = Logger.logWarning(log, "Low memory detected.");\n        log = Logger.logError(log, "An unexpected error occurred.");\n        log = Logger.logInfo(log, "Application restarted successfully.");\n        System.out.println(log);\n        log = resetLog("R52");\n        System.out.println();\n        System.out.println(log);\n    }\n    public static String resetLog(String systemNum) {\n        return "Computer System " + systemNum + " Log:\\n";\n    }\n}\n',
        },
      ],
      sourcePages: [3, 4, 39],
    },
    independent: {
      id: 'd1-independent',
      prompt: {
        en: 'Create BackupLog. Begin with Backup log followed by a newline. Use the supplied Logger, saving each returned String, and print the final log once.',
        es: 'Crea BackupLog. Comienza con Backup log seguido por un salto de línea. Usa Logger, guarda cada String devuelto e imprime el registro final una vez.',
      },
      steps: {
        en: [
          'Initialize the log header; no keyboard input is needed.',
          'Append an info message Copy started. and then a warning message Disk nearly full. using the exact punctuation.',
          'Save each return value and print once. Predict line breaks, run, and explain why discarding a returned String leaves the variable unchanged.',
        ],
        es: [
          'Inicializa el encabezado; no se necesita entrada de teclado.',
          'Agrega un mensaje info Copy started. y luego uno warning Disk nearly full. con la puntuación exacta.',
          'Guarda cada valor devuelto e imprime una vez. Predice los saltos, ejecuta y explica por qué descartar un String devuelto deja la variable igual.',
        ],
      },
      files: [
        {
          name: 'BackupLog.java',
          code: 'public class BackupLog {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [5, 39],
    },
    helpers: [
      {
        name: 'Logger.java',
        code: 'public class Logger {\n    public static String logInfo(String log, String message) {\n        return log + "[INFO] " + message + "\\n";\n    }\n    public static String logWarning(String log, String message) {\n        return log + "[WARNING] " + message + "\\n";\n    }\n    public static String logError(String log, String message) {\n        return log + "[ERROR] " + message + "\\n";\n    }\n}\n',
        readOnly: true,
      },
    ],
    guide: {
      concepts: {
        en: [
          'Logger.logInfo(String log, String message), logWarning(String log, String message), and logError(String log, String message) are public static methods returning String. They append [INFO] , [WARNING] , or [ERROR] , the message, and \\n; they do not print or change the caller’s variable.',
          'Strings are immutable: assign the returned String to retain an addition. ClassName.method(arguments) calls a static method in another class. Within LogRunner, resetLog(String systemNum) returns a new Computer System header ending in \\n; a same-class static call can omit LogRunner.',
        ],
        es: [
          'Logger.logInfo(String log, String message), logWarning(String log, String message) y logError(String log, String message) son métodos public static que devuelven String. Agregan [INFO] , [WARNING] o [ERROR] , el mensaje y \\n; no imprimen ni cambian la variable de quien llama.',
          'Los Strings son inmutables: asigna el String devuelto para conservar una adición. ClassName.method(argumentos) llama un método estático de otra clase. Dentro de LogRunner, resetLog(String systemNum) devuelve un encabezado Computer System terminado en \\n; una llamada estática de la misma clase puede omitir LogRunner.',
        ],
      },
      guided: {
        en: [
          'Predict every printed line, including the newline in each log entry, println’s extra newline, and the empty println after resetLog.',
          'Remove log = from the first logInfo call; predict whether the returned String is saved, run, record, and restore.',
        ],
        es: [
          'Predice cada línea impresa, incluidos el salto de línea de cada entrada, el salto adicional de println y el println vacío después de resetLog.',
          'Quita log = de la primera llamada logInfo; predice si se guarda el String devuelto, ejecuta, registra y restaura.',
        ],
      },
      independent: {
        en: [
          'Initialize the log header; no keyboard input is needed.',
          'Append an info message Copy started. and then a warning message Disk nearly full. using the exact punctuation.',
        ],
        es: [
          'Inicializa el encabezado; no se necesita entrada de teclado.',
          'Agrega un mensaje info Copy started. y luego uno warning Disk nearly full. con la puntuación exacta.',
        ],
      },
    },
  },
  {
    id: 'd2',
    topicId: '1.10',
    group: '1.10–1.15',
    title: {
      en: '1.10.5 · Check class-method calls',
      es: '1.10.5 · Comprobar llamadas a métodos de clase',
    },
    goal: {
      en: 'Match class names, arguments, and return types.',
      es: 'Relacionar nombres de clase, argumentos y tipos devueltos.',
    },
    guided: {
      id: 'd2-guided',
      prompt: {
        en: 'The supplied UnitRunner already contains valid calls. Keep it as the original working version; use UnitConverter.java and perform the separate new repair exercise below.',
        es: 'UnitRunner ya contiene llamadas válidas. Consérvalo como versión original funcional; usa UnitConverter.java y realiza el nuevo ejercicio de reparación separado.',
      },
      steps: {
        en: [
          'For each original call identify the class, exact method name, argument value/type, parameter type, and double return type. Predict, then run the unchanged runner.',
          'New repair exercise, separate from the correct original: in a copy replace the calls one at a time with unitconverter.celsiusToFahrenheit(0), UnitConverter.poundsToKilograms("20"), and UnitConverter.mileToKilometers(65).',
          'Compile each intentionally invalid call, record its diagnostic, and repair the class capitalization, numeric argument type, or method spelling using the helper signatures. Restore a compiling copy after each experiment.',
          'Explain why each returned double can be saved and printed later. Also test Celsius 0, pounds 0, and miles 0; predict using the formulas rather than assuming all zero inputs convert to zero.',
        ],
        es: [
          'En cada llamada original identifica la clase, el nombre exacto del método, valor/tipo del argumento, tipo del parámetro y retorno double. Predice y ejecuta el runner sin cambios.',
          'Nuevo ejercicio de reparación, separado del original correcto: en una copia sustituye las llamadas una a una por unitconverter.celsiusToFahrenheit(0), UnitConverter.poundsToKilograms("20") y UnitConverter.mileToKilometers(65).',
          'Compila cada llamada inválida, registra el diagnóstico y repara mayúsculas de clase, tipo numérico o nombre del método según las firmas. Restaura una copia que compile tras cada experimento.',
          'Explica por qué puedes guardar e imprimir después cada double devuelto. Prueba también Celsius 0, libras 0 y millas 0; predice con las fórmulas sin suponer que toda entrada cero produce cero.',
        ],
      },
      files: [
        {
          name: 'UnitRunner.java',
          code: 'public class UnitRunner {\n    public static void main(String[] args) {\n        double fahrenheit = UnitConverter.celsiusToFahrenheit(0);\n        System.out.println("Fahrenheit: " + fahrenheit);\n        double kilograms = UnitConverter.poundsToKilograms(20);\n        System.out.println("Kilograms: " + kilograms);\n        double kilometers = UnitConverter.milesToKilometers(65);\n        System.out.println("Kilometers: " + kilometers);\n    }\n}\n',
        },
      ],
      sourcePages: [6, 7, 40],
    },
    independent: {
      id: 'd2-independent',
      prompt: {
        en: 'Create TravelUnits. Convert 100 Celsius to Fahrenheit, 10 pounds to kilograms, and 5 miles to kilometers using UnitConverter.',
        es: 'Crea TravelUnits. Convierte 100 Celsius a Fahrenheit, 10 libras a kilogramos y 5 millas a kilómetros con UnitConverter.',
      },
      steps: {
        en: [
          'Identify the three exact static method signatures; no keyboard input is needed.',
          'Store each returned double in its own variable and print one labeled result per line: Fahrenheit: , Kilograms: , Kilometers: .',
          'Predict from the documented factors, run, compare, and explain why "10" cannot replace the numeric argument 10.',
        ],
        es: [
          'Identifica las tres firmas estáticas exactas; no se necesita entrada de teclado.',
          'Guarda cada double devuelto en su variable e imprime un resultado por línea con etiquetas Fahrenheit: , Kilograms: , Kilometers: .',
          'Predice con los factores documentados, ejecuta, compara y explica por qué "10" no puede sustituir al argumento numérico 10.',
        ],
      },
      files: [
        {
          name: 'TravelUnits.java',
          code: 'public class TravelUnits {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [8, 40],
    },
    helpers: [
      {
        name: 'UnitConverter.java',
        code: 'public class UnitConverter {\n    public static double celsiusToFahrenheit(double celsius) {\n        return celsius * 9.0 / 5.0 + 32;\n    }\n    public static double poundsToKilograms(double pounds) {\n        return pounds * 0.45359237;\n    }\n    public static double milesToKilometers(double miles) {\n        return miles * 1.609344;\n    }\n}\n',
        readOnly: true,
      },
    ],
    guide: {
      concepts: {
        en: [
          'UnitConverter.celsiusToFahrenheit(double celsius), poundsToKilograms(double pounds), and milesToKilometers(double miles) are public static methods returning double; they do not print. Java permits an int argument to widen to double, but not a String argument. Names are case-sensitive.',
          'The supplied formulas are celsius * 9.0 / 5.0 + 32, pounds * 0.45359237, and miles * 1.609344. There is no validation in this helper; use nonnegative pounds/miles for these tasks. Celsius may be zero or negative.',
        ],
        es: [
          'UnitConverter.celsiusToFahrenheit(double celsius), poundsToKilograms(double pounds) y milesToKilometers(double miles) son public static y devuelven double; no imprimen. Java permite ampliar un argumento int a double, pero no un String. Los nombres distinguen mayúsculas.',
          'Las fórmulas son celsius * 9.0 / 5.0 + 32, pounds * 0.45359237 y miles * 1.609344. Este apoyo no valida entradas; usa libras/millas no negativas. Celsius puede ser cero o negativo.',
        ],
      },
      guided: {
        en: [
          'For each original call identify the class, exact method name, argument value/type, parameter type, and double return type. Predict, then run the unchanged runner.',
          'New repair exercise, separate from the correct original: in a copy replace the calls one at a time with unitconverter.celsiusToFahrenheit(0), UnitConverter.poundsToKilograms("20"), and UnitConverter.mileToKilometers(65).',
        ],
        es: [
          'En cada llamada original identifica la clase, el nombre exacto del método, valor/tipo del argumento, tipo del parámetro y retorno double. Predice y ejecuta el runner sin cambios.',
          'Nuevo ejercicio de reparación, separado del original correcto: en una copia sustituye las llamadas una a una por unitconverter.celsiusToFahrenheit(0), UnitConverter.poundsToKilograms("20") y UnitConverter.mileToKilometers(65).',
        ],
      },
      independent: {
        en: [
          'Identify the three exact static method signatures; no keyboard input is needed.',
          'Store each returned double in its own variable and print one labeled result per line: Fahrenheit: , Kilograms: , Kilometers: .',
        ],
        es: [
          'Identifica las tres firmas estáticas exactas; no se necesita entrada de teclado.',
          'Guarda cada double devuelto en su variable e imprime un resultado por línea con etiquetas Fahrenheit: , Kilograms: , Kilometers: .',
        ],
      },
    },
  },
  {
    id: 'd3',
    topicId: '1.10',
    group: '1.10–1.15',
    title: {
      en: '1.10.6 · Greet with class methods',
      es: '1.10.6 · Saludar con métodos de clase',
    },
    goal: {
      en: 'Call void methods with a full-line String argument.',
      es: 'Llamar métodos void con un argumento String de línea completa.',
    },
    guided: {
      id: 'd3-guided',
      prompt: {
        en: 'Read one full name and greet it using at least three different methods from the supplied Hello.java.',
        es: 'Lee un nombre completo y salúdalo con al menos tres métodos distintos del Hello.java incluido.',
      },
      steps: {
        en: [
          'Ask for a name and read it with the existing Scanner using nextLine() so spaces are retained.',
          'Choose at least three of english, spanish, french, german, russian, chinese; each takes the name as one String. Call Hello.method(name) without constructing an object.',
          'Do not wrap void calls in println: each greeting method prints directly. Predict greeting order, run with Sam Lee and Ana, and explain the difference between printing and returning.',
        ],
        es: [
          'Pide un nombre y léelo con el Scanner existente mediante nextLine() para conservar espacios.',
          'Elige al menos tres de english, spanish, french, german, russian, chinese; cada uno recibe el nombre como un String. Llama Hello.method(name) sin construir un objeto.',
          'No pongas llamadas void dentro de println: cada método imprime directamente. Predice el orden, ejecuta con Sam Lee y Ana y explica la diferencia entre imprimir y devolver.',
        ],
      },
      files: [
        {
          name: 'HelloRunner.java',
          code: 'import java.util.Scanner;\npublic class HelloRunner {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        // Ask for and read a name.\n        // Call at least three Hello methods.\n    }\n}\n',
        },
      ],
      sourcePages: [9, 10, 41],
      inputs: 'Sam Lee\n\nAna',
    },
    independent: {
      id: 'd3-independent',
      prompt: {
        en: 'Create WelcomeTeam. Read a full name and greet it in German, Russian, and Chinese, in that order, using Hello.',
        es: 'Crea WelcomeTeam. Lee un nombre completo y salúdalo en alemán, ruso y chino, en ese orden, usando Hello.',
      },
      steps: {
        en: [
          'Import Scanner, create it for System.in, and read one full line.',
          'Pass the same name to Hello.german, Hello.russian, and Hello.chinese; do not store a return value.',
          'Predict and run Sam Lee; also try a single-letter name A. Explain which method controls the wording and which argument supplies the name.',
        ],
        es: [
          'Importa Scanner, créalo para System.in y lee una línea completa.',
          'Pasa el mismo nombre a Hello.german, Hello.russian y Hello.chinese; no guardes un valor devuelto.',
          'Predice y ejecuta Sam Lee; prueba también el nombre de una letra A. Explica qué método controla el saludo y qué argumento aporta el nombre.',
        ],
      },
      files: [
        {
          name: 'WelcomeTeam.java',
          code: 'public class WelcomeTeam {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [11, 41],
      inputs: 'Sam Lee\n\nA',
    },
    helpers: [
      {
        name: 'Hello.java',
        code: 'public class Hello {\n    public static void english(String name) {\n        System.out.println("Hello, " + name + "!");\n    }\n    public static void spanish(String name) {\n        System.out.println("Hola, " + name + "!");\n    }\n    public static void french(String name) {\n        System.out.println("Bonjour, " + name + "!");\n    }\n    public static void german(String name) {\n        System.out.println("Hallo, " + name + "!");\n    }\n    public static void russian(String name) {\n        System.out.println("Privet, " + name + "!");\n    }\n    public static void chinese(String name) {\n        System.out.println("Ni hao, " + name + "!");\n    }\n}\n',
        readOnly: true,
      },
    ],
    guide: {
      concepts: {
        en: [
          'All six Hello methods are public static void with one String name parameter: english, spanish, french, german, russian, chinese. Their exact printed prefixes are Hello, / Hola, / Bonjour, / Hallo, / Privet, / Ni hao, followed by a space, the name, and !; println ends the line.',
          'A void method supplies no value to assign or pass to println. Scanner.nextLine() returns the full next line including spaces, excluding the line separator. Use a nonempty name in these tasks; no Hello object is needed.',
        ],
        es: [
          'Los seis métodos de Hello son public static void con un parámetro String name: english, spanish, french, german, russian, chinese. Sus prefijos exactos son Hello, / Hola, / Bonjour, / Hallo, / Privet, / Ni hao, seguidos por espacio, nombre y !; println termina la línea.',
          'Un método void no aporta un valor para asignar o pasar a println. Scanner.nextLine() devuelve la próxima línea completa con espacios, sin el separador de línea. Usa un nombre no vacío; no necesitas un objeto Hello.',
        ],
      },
      guided: {
        en: [
          'Ask for a name and read it with the existing Scanner using nextLine() so spaces are retained.',
          'Choose at least three of english, spanish, french, german, russian, chinese; each takes the name as one String. Call Hello.method(name) without constructing an object.',
        ],
        es: [
          'Pide un nombre y léelo con el Scanner existente mediante nextLine() para conservar espacios.',
          'Elige al menos tres de english, spanish, french, german, russian, chinese; cada uno recibe el nombre como un String. Llama Hello.method(name) sin construir un objeto.',
        ],
      },
      independent: {
        en: [
          'Import Scanner, create it for System.in, and read one full line.',
          'Pass the same name to Hello.german, Hello.russian, and Hello.chinese; do not store a return value.',
        ],
        es: [
          'Importa Scanner, créalo para System.in y lee una línea completa.',
          'Pasa el mismo nombre a Hello.german, Hello.russian y Hello.chinese; no guardes un valor devuelto.',
        ],
      },
    },
  },
  {
    id: 'd4',
    topicId: '1.10',
    group: '1.10–1.15',
    title: {
      en: '1.10.7 · Use a mathematical API',
      es: '1.10.7 · Usar una API matemática',
    },
    goal: {
      en: 'Use compatible return types and respect API preconditions.',
      es: 'Usar tipos de retorno compatibles y respetar precondiciones.',
    },
    guided: {
      id: 'd4-guided',
      prompt: {
        en: 'Use Calculator.java to calculate slope from (1,1) to (5,10), distance from (2,3) to (6,7), and real roots of x² + 2x - 8 = 0. Call the supplied methods rather than implementing their formulas in main.',
        es: 'Usa Calculator.java para calcular pendiente de (1,1) a (5,10), distancia de (2,3) a (6,7) y raíces reales de x² + 2x - 8 = 0. Llama los métodos incluidos sin implementar sus fórmulas en main.',
      },
      steps: {
        en: [
          'Read every signature and precondition. For point methods pass x1, y1, x2, y2 in that order.',
          'Store slope and distance in doubles; pass a=1, b=2, c=-8 to quadRoots and store its result as a String.',
          'Print one result per line with labels Slope: , Distance: , Roots: . Predict from these exact inputs, run, and compare.',
          'Name three advantages of using the API. For boundary reasoning consider equal x coordinates and a zero discriminant: explain which calls meet preconditions without invoking an invalid slope.',
        ],
        es: [
          'Lee cada firma y precondición. Para puntos pasa x1, y1, x2, y2 en ese orden.',
          'Guarda pendiente y distancia en double; pasa a=1, b=2, c=-8 a quadRoots y guarda su resultado en String.',
          'Imprime un resultado por línea con etiquetas Slope: , Distance: , Roots: . Predice con estas entradas exactas, ejecuta y compara.',
          'Nombra tres ventajas de usar la API. Considera coordenadas x iguales y discriminante cero: explica qué llamadas cumplen precondiciones sin invocar una pendiente inválida.',
        ],
      },
      files: [
        {
          name: 'CalculatorRunner.java',
          code: 'public class CalculatorRunner {\n    public static void main(String[] args) {\n        // Call the three Calculator methods.\n        // Store the results using compatible types.\n        // Print the labeled results.\n    }\n}\n',
        },
      ],
      sourcePages: [12, 13, 42],
    },
    independent: {
      id: 'd4-independent',
      prompt: {
        en: 'Create SurveyCalculator. Find slope and distance from (0,0) to (3,4), and real roots of x² - 5x + 6 = 0 using Calculator.',
        es: 'Crea SurveyCalculator. Calcula pendiente y distancia de (0,0) a (3,4) y raíces reales de x² - 5x + 6 = 0 con Calculator.',
      },
      steps: {
        en: [
          'Map both points to the four parameters and coefficients to a, b, c; check the preconditions.',
          'Call the three static methods, store compatible values, and print Slope: , Distance: , Roots: on separate lines. No keyboard input is required.',
          'Predict, run, compare, and explain why the roots result uses String rather than double. Also predict the distance between identical points and discuss whether their slope meets its precondition.',
        ],
        es: [
          'Relaciona los puntos con los cuatro parámetros y los coeficientes con a, b, c; revisa precondiciones.',
          'Llama los tres métodos estáticos, guarda valores compatibles e imprime Slope: , Distance: , Roots: en líneas separadas. No se requiere teclado.',
          'Predice, ejecuta, compara y explica por qué el resultado de raíces usa String y no double. Predice también la distancia entre puntos idénticos y analiza si su pendiente cumple la precondición.',
        ],
      },
      files: [
        {
          name: 'SurveyCalculator.java',
          code: 'public class SurveyCalculator {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [14, 42],
    },
    helpers: [
      {
        name: 'Calculator.java',
        code: 'public class Calculator {\n    // Precondition: x1 != x2.\n    public static double slope(double x1, double y1,\n                               double x2, double y2) {\n        return (y2 - y1) / (x2 - x1);\n    }\n    public static double distance(double x1, double y1,\n                                  double x2, double y2) {\n        return Math.sqrt(Math.pow(x2 - x1, 2)\n                         + Math.pow(y2 - y1, 2));\n    }\n    // Preconditions: a != 0 and b*b - 4*a*c >= 0.\n    public static String quadRoots(double a, double b, double c) {\n        double root = Math.sqrt(b * b - 4 * a * c);\n        double first = (-b + root) / (2 * a);\n        double second = (-b - root) / (2 * a);\n        return first + " and " + second;\n    }\n}\n',
        readOnly: true,
      },
    ],
    guide: {
      concepts: {
        en: [
          'Calculator.slope(double x1, double y1, double x2, double y2) returns double (y2-y1)/(x2-x1); requires x1 != x2. Calculator.distance with the same parameters returns double sqrt((x2-x1)²+(y2-y1)²); equal points are allowed. Both are public static and do not print.',
          'Calculator.quadRoots(double a, double b, double c) is public static and returns String: first root + " and " + second root. Requires a != 0 and discriminant b*b-4*a*c >= 0. It uses (-b+sqrt(discriminant))/(2*a), then (-b-sqrt(discriminant))/(2*a); zero discriminant is allowed. Math.sqrt(double) returns the square root as double; Math.pow(double, double) returns the first argument raised to the second.',
        ],
        es: [
          'Calculator.slope(double x1, double y1, double x2, double y2) devuelve double (y2-y1)/(x2-x1); requiere x1 != x2. Calculator.distance con los mismos parámetros devuelve double sqrt((x2-x1)²+(y2-y1)²); permite puntos iguales. Ambos son public static y no imprimen.',
          'Calculator.quadRoots(double a, double b, double c) es public static y devuelve String: primera raíz + " and " + segunda raíz. Requiere a != 0 y discriminante b*b-4*a*c >= 0. Usa (-b+sqrt(discriminante))/(2*a) y luego (-b-sqrt(discriminante))/(2*a); permite discriminante cero. Math.sqrt(double) devuelve la raíz cuadrada como double; Math.pow(double, double) eleva el primer argumento al segundo.',
        ],
      },
      guided: {
        en: [
          'Read every signature and precondition. For point methods pass x1, y1, x2, y2 in that order.',
          'Store slope and distance in doubles; pass a=1, b=2, c=-8 to quadRoots and store its result as a String.',
        ],
        es: [
          'Lee cada firma y precondición. Para puntos pasa x1, y1, x2, y2 en ese orden.',
          'Guarda pendiente y distancia en double; pasa a=1, b=2, c=-8 a quadRoots y guarda su resultado en String.',
        ],
      },
      independent: {
        en: [
          'Map both points to the four parameters and coefficients to a, b, c; check the preconditions.',
          'Call the three static methods, store compatible values, and print Slope: , Distance: , Roots: on separate lines. No keyboard input is required.',
        ],
        es: [
          'Relaciona los puntos con los cuatro parámetros y los coeficientes con a, b, c; revisa precondiciones.',
          'Llama los tres métodos estáticos, guarda valores compatibles e imprime Slope: , Distance: , Roots: en líneas separadas. No se requiere teclado.',
        ],
      },
    },
  },
  {
    id: 'd5',
    topicId: '1.11',
    group: '1.10–1.15',
    title: {
      en: '1.11.4 · Generate random integer ranges',
      es: '1.11.4 · Generar intervalos enteros aleatorios',
    },
    goal: {
      en: 'Derive integer counts and respect exclusive endpoints.',
      es: 'Derivar cantidades de enteros y respetar extremos exclusivos.',
    },
    guided: {
      id: 'd5-guided',
      prompt: {
        en: 'Keep the 20–25 inclusive example. Then print a die roll 1–6 inclusive, points deducted 10–30 inclusive, a 0/1 success flag, and an integer strictly between 1,000,000 and 2,000,000. Treat the last as a numeric range exercise.',
        es: 'Conserva el ejemplo 20–25 inclusive. Luego imprime un dado 1–6 inclusive, puntos descontados 10–30 inclusive, una bandera 0/1 y un entero estrictamente entre 1,000,000 y 2,000,000. Trata el último como ejercicio numérico de intervalos.',
      },
      steps: {
        en: [
          'List each allowed minimum and maximum first. For strictly between endpoints use the next integer above the lower endpoint and the previous integer below the upper endpoint.',
          'Find each inclusive count, multiply Math.random() by the count, cast that product to int, then shift by the minimum; do not cast Math.random() before multiplying.',
          'Print the four new values after the example, in the requested order. Predict ranges, not a single output, and run repeatedly to check membership.',
          'Explain why the example uses count 6 and shift 20. Explain why a finite sample cannot establish that an endpoint is impossible; justify exclusions using the expression.',
        ],
        es: [
          'Anota primero mínimo y máximo permitidos. Para extremos exclusivos usa el siguiente entero después del inferior y el anterior al superior.',
          'Calcula la cantidad inclusiva, multiplica Math.random() por ella, convierte ese producto a int y desplaza por el mínimo; no conviertas Math.random() antes de multiplicar.',
          'Imprime los cuatro valores nuevos después del ejemplo en el orden pedido. Predice intervalos, no una salida única, y ejecuta repetidamente para revisar pertenencia.',
          'Explica por qué el ejemplo usa cantidad 6 y desplazamiento 20. Explica por qué una muestra finita no demuestra que un extremo sea imposible; justifica las exclusiones con la expresión.',
        ],
      },
      files: [
        {
          name: 'RandomGenerator.java',
          code: 'public class RandomGenerator {\n    public static void main(String[] args) {\n        int example = (int) (Math.random() * 6) + 20;\n        System.out.println(example);\n        // Generate and print the four requested values.\n    }\n}\n',
        },
      ],
      sourcePages: [15, 16],
    },
    independent: {
      id: 'd5-independent',
      prompt: {
        en: 'Create QueueNumbers. Print a random service window from 4 through 9 inclusive and an integer ticket number strictly between 100 and 200.',
        es: 'Crea QueueNumbers. Imprime una ventanilla aleatoria de 4 a 9 inclusive y un número entero de turno estrictamente entre 100 y 200.',
      },
      steps: {
        en: [
          'Derive the allowed minimum, maximum, and integer count for each range before coding.',
          'Use Math.random(), multiplication, an int cast, and a shift; print window first and ticket second. No keyboard input is required.',
          'Predict valid ranges and run repeatedly. Explain each count and whether 4, 9, 100, and 200 can occur; prove the endpoint rules from the formula rather than from missing values in a sample.',
        ],
        es: [
          'Deriva mínimo, máximo y cantidad permitida de enteros para cada intervalo antes de programar.',
          'Usa Math.random(), multiplicación, conversión int y desplazamiento; imprime ventanilla primero y turno después. No se requiere teclado.',
          'Predice intervalos y ejecuta repetidamente. Explica cada cantidad y si pueden salir 4, 9, 100 y 200; demuestra los extremos con la fórmula y no por valores ausentes en una muestra.',
        ],
      },
      files: [
        {
          name: 'QueueNumbers.java',
          code: 'public class QueueNumbers {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [17],
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'Math.random() is a static Math method requiring no arguments or import. It returns a double r with 0.0 <= r < 1.0. For a nonnegative product, casting to int discards the fractional part.',
          'For inclusive integer bounds min <= max, count = max-min+1 and (int)(Math.random()*count)+min gives integers in that interval. For integer endpoints L and U with strict inequalities, first set min=L+1 and max=U-1; require at least one allowed integer. Use counts and shifts within int limits here.',
        ],
        es: [
          'Math.random() es un método estático de Math sin argumentos ni importación. Devuelve double r con 0.0 <= r < 1.0. Para un producto no negativo, convertir a int descarta la parte fraccionaria.',
          'Para límites enteros inclusivos min <= max, cantidad = max-min+1 y (int)(Math.random()*cantidad)+min produce enteros de ese intervalo. Para extremos enteros L y U exclusivos, primero usa min=L+1 y max=U-1; debe existir al menos un entero permitido. Aquí usa cantidades y desplazamientos dentro del límite int.',
        ],
      },
      guided: {
        en: [
          'List each allowed minimum and maximum first. For strictly between endpoints use the next integer above the lower endpoint and the previous integer below the upper endpoint.',
          'Find each inclusive count, multiply Math.random() by the count, cast that product to int, then shift by the minimum; do not cast Math.random() before multiplying.',
        ],
        es: [
          'Anota primero mínimo y máximo permitidos. Para extremos exclusivos usa el siguiente entero después del inferior y el anterior al superior.',
          'Calcula la cantidad inclusiva, multiplica Math.random() por ella, convierte ese producto a int y desplaza por el mínimo; no conviertas Math.random() antes de multiplicar.',
        ],
      },
      independent: {
        en: [
          'Derive the allowed minimum, maximum, and integer count for each range before coding.',
          'Use Math.random(), multiplication, an int cast, and a shift; print window first and ticket second. No keyboard input is required.',
        ],
        es: [
          'Deriva mínimo, máximo y cantidad permitida de enteros para cada intervalo antes de programar.',
          'Usa Math.random(), multiplicación, conversión int y desplazamiento; imprime ventanilla primero y turno después. No se requiere teclado.',
        ],
      },
    },
  },
  {
    id: 'd6',
    topicId: '1.11',
    group: '1.10–1.15',
    title: {
      en: '1.11.6 · Calculate travel time',
      es: '1.11.6 · Calcular tiempo de recorrido',
    },
    goal: {
      en: 'Return a square-root calculation and print it in the caller.',
      es: 'Devolver un cálculo de raíz cuadrada e imprimirlo en quien llama.',
    },
    guided: {
      id: 'd6-guided',
      prompt: {
        en: 'For an object starting at rest with constant positive acceleration, use t = sqrt(2*d/a). Read a nonnegative distance in meters, use acceleration 3.0 m/s², return seconds from calculateTime, and print them in main.',
        es: 'Para un objeto que parte del reposo con aceleración constante positiva, usa t = sqrt(2*d/a). Lee distancia no negativa en metros, usa aceleración 3.0 m/s², devuelve segundos desde calculateTime e imprímelos en main.',
      },
      steps: {
        en: [
          'The supplied import java.util.Scanner; is already correct; preserve it. Read distance with the existing nextDouble() call.',
          'Complete public static double calculateTime(double acceleration, double distance) with the formula and a return statement. Its empty body must be completed before this template compiles. Do not print in this method.',
          'In main pass acceleration 3.0 first and distance second; store the returned double and print it followed by the unit s.',
          'Predict and run separate distances 0, 150, and 600; explain the zero-distance boundary, argument order, and why acceleration must be positive in this simplified model.',
        ],
        es: [
          'La importación incluida import java.util.Scanner; ya es correcta; consérvala. Lee distance con el nextDouble() existente.',
          'Completa public static double calculateTime(double acceleration, double distance) con la fórmula y return. Debes completar el cuerpo vacío para que compile. No imprimas en este método.',
          'En main pasa primero aceleración 3.0 y luego distancia; guarda el double devuelto e imprímelo seguido por la unidad s.',
          'Predice y ejecuta por separado distancias 0, 150 y 600; explica el límite de distancia cero, el orden de argumentos y por qué la aceleración debe ser positiva en este modelo simplificado.',
        ],
      },
      files: [
        {
          name: 'TrafficEngineer.java',
          code: 'import java.util.Scanner;\npublic class TrafficEngineer {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        double distance = input.nextDouble();\n        // Call calculateTime with acceleration 3.0.\n        // Print the result and its unit.\n    }\n    public static double calculateTime(double acceleration,\n                                       double distance) {\n        // Return the formula result.\n    }\n}\n',
        },
      ],
      sourcePages: [18, 19],
      inputs: '0\n\n150\n\n600',
    },
    independent: {
      id: 'd6-independent',
      prompt: {
        en: 'Create RampCheck with a double-returning calculateTime(double acceleration, double distance) method using the same model. In main call it with acceleration 2.0 and distance 100.0.',
        es: 'Crea RampCheck con calculateTime(double acceleration, double distance) que devuelve double usando el mismo modelo. En main llámalo con aceleración 2.0 y distancia 100.0.',
      },
      steps: {
        en: [
          'Define the static method, keep acceleration first and distance second, and return the formula result without printing.',
          'In main store the returned seconds, then print Time: followed by the result and s. No keyboard input is required.',
          'Predict and run the fixed call. In a separate test change distance to 0.0 with acceleration still 2.0; explain the boundary and why a return value lets main choose the output label.',
        ],
        es: [
          'Define el método estático, conserva aceleración primero y distancia después y devuelve el resultado sin imprimir.',
          'En main guarda los segundos devueltos e imprime Time: seguido del resultado y s. No se requiere teclado.',
          'Predice y ejecuta la llamada fija. En una prueba separada cambia distancia a 0.0 y conserva aceleración 2.0; explica el límite y por qué un retorno permite que main elija la etiqueta.',
        ],
      },
      files: [
        {
          name: 'RampCheck.java',
          code: 'public class RampCheck {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [20],
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'Math.sqrt(double value) is a static method returning a double square root. Math is in java.lang, so no Math import is needed. Use a nonnegative radicand for a real square root.',
          'calculateTime(double acceleration, double distance) returns double seconds using sqrt(2*distance/acceleration). Preconditions: acceleration > 0 and distance >= 0; units are m/s² and meters, assuming rest and constant acceleration. Use Math.sqrt for the root. Return sends a value to main; println displays it.',
        ],
        es: [
          'Math.sqrt(double value) es estático y devuelve la raíz cuadrada como double. Math está en java.lang y no necesita importación. Usa radicando no negativo para una raíz real.',
          'calculateTime(double acceleration, double distance) devuelve segundos como double con sqrt(2*distance/acceleration). Precondiciones: acceleration > 0 y distance >= 0; unidades m/s² y metros, suponiendo reposo inicial y aceleración constante. Usa Math.sqrt para la raíz. return envía un valor a main; println lo muestra.',
        ],
      },
      guided: {
        en: [
          'The supplied import java.util.Scanner; is already correct; preserve it. Read distance with the existing nextDouble() call.',
          'Complete public static double calculateTime(double acceleration, double distance) with the formula and a return statement. Its empty body must be completed before this template compiles. Do not print in this method.',
        ],
        es: [
          'La importación incluida import java.util.Scanner; ya es correcta; consérvala. Lee distance con el nextDouble() existente.',
          'Completa public static double calculateTime(double acceleration, double distance) con la fórmula y return. Debes completar el cuerpo vacío para que compile. No imprimas en este método.',
        ],
      },
      independent: {
        en: [
          'Define the static method, keep acceleration first and distance second, and return the formula result without printing.',
          'In main store the returned seconds, then print Time: followed by the result and s. No keyboard input is required.',
        ],
        es: [
          'Define el método estático, conserva aceleración primero y distancia después y devuelve el resultado sin imprimir.',
          'En main guarda los segundos devueltos e imprime Time: seguido del resultado y s. No se requiere teclado.',
        ],
      },
    },
  },
];
