import type { ExtraActivity } from './types';

// Source pages are internal provenance. Blank lines in inputs separate independent runs.
// Students supply predictions; computed expected output and completed solutions are omitted.
export const unit2ExtraActivities: ExtraActivity[] = [
  {
    id: 'c1',
    topicId: '2.1',
    group: '2.1–2.5',
    title: {
      en: 'Algorithms in everyday tasks',
      es: 'Algoritmos en tareas cotidianas',
    },
    goal: {
      en: 'Describe sequence, selection, and repetition in a complete algorithm.',
      es: 'Describir secuencia, selección y repetición en un algoritmo completo.',
    },
    guided: {
      id: 'c1-guided',
      prompt: {
        en: 'Write a plain-language algorithm for buying three bus tickets. Include a balance check, a payment step, and repetition. Edit Algorithm.txt; no Java or execution is required.',
        es: 'Escribe un algoritmo en lenguaje cotidiano para comprar tres boletos de autobús. Incluye una revisión del saldo, un pago y repetición. Edita Algorithm.txt; no se requiere Java ni ejecución.',
      },
      steps: {
        en: [
          'Order the steps from the initial situation to three purchased tickets.',
          'Check the balance before payment and describe what happens when it is insufficient.',
          'Repeat the purchase process until three tickets have been bought; state the stopping condition.',
          'Mark one example each of sequence, selection, and repetition. Trace both sufficient and insufficient balance situations.',
        ],
        es: [
          'Ordena los pasos desde la situación inicial hasta obtener tres boletos.',
          'Revisa el saldo antes de pagar y describe qué ocurre si es insuficiente.',
          'Repite la compra hasta obtener tres boletos; indica la condición de parada.',
          'Marca un ejemplo de secuencia, selección y repetición. Traza casos con saldo suficiente e insuficiente.',
        ],
      },
      files: [
        {
          name: 'Algorithm.txt',
          code: '',
        },
      ],
      sourcePages: [3],
      entryPoint: null,
    },
    independent: {
      id: 'c1-independent',
      prompt: {
        en: 'Describe printing two copies of a document in plain language. Check that paper is available before printing. Edit Algorithm.txt.',
        es: 'Describe en lenguaje cotidiano cómo imprimir dos copias de un documento. Comprueba que haya papel antes de imprimir. Edita Algorithm.txt.',
      },
      steps: {
        en: [
          'Write the steps in the order they must happen.',
          'Include a paper-availability decision and what to do if paper is missing.',
          'Repeat until two copies have printed and state when repetition ends.',
          'Label sequence, selection, and repetition; trace cases with and without paper.',
        ],
        es: [
          'Escribe los pasos en el orden en que deben ocurrir.',
          'Incluye una decisión sobre disponibilidad de papel y qué hacer si falta.',
          'Repite hasta imprimir dos copias e indica cuándo termina la repetición.',
          'Identifica secuencia, selección y repetición; traza casos con papel y sin él.',
        ],
      },
      files: [
        {
          name: 'Algorithm.txt',
          code: '',
        },
      ],
      sourcePages: [3],
      entryPoint: null,
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'Sequence is an ordered set of steps. Selection chooses a path based on a condition.',
          'Repetition repeats steps until a goal or stopping condition is reached; include progress toward that goal.',
        ],
        es: [
          'Secuencia es un conjunto ordenado de pasos. Selección elige una ruta según una condición.',
          'Repetición ejecuta pasos hasta alcanzar una meta o condición de parada; incluye cómo avanzar hacia ella.',
        ],
      },
      guided: {
        en: [
          'Order the steps from the initial situation to three purchased tickets.',
          'Check the balance before payment and describe what happens when it is insufficient.',
        ],
        es: [
          'Ordena los pasos desde la situación inicial hasta obtener tres boletos.',
          'Revisa el saldo antes de pagar y describe qué ocurre si es insuficiente.',
        ],
      },
      independent: {
        en: [
          'Write the steps in the order they must happen.',
          'Include a paper-availability decision and what to do if paper is missing.',
        ],
        es: [
          'Escribe los pasos en el orden en que deben ocurrir.',
          'Incluye una decisión sobre disponibilidad de papel y qué hacer si falta.',
        ],
      },
    },
  },
  {
    id: 'c2',
    topicId: '2.2',
    group: '2.1–2.5',
    title: {
      en: 'Check a goal',
      es: 'Comprobar una meta',
    },
    goal: {
      en: 'Store relational comparisons in boolean variables.',
      es: 'Guardar comparaciones relacionales en variables boolean.',
    },
    guided: {
      id: 'c2-guided',
      prompt: {
        en: 'Complete Goals.java. Read goal and actual as ints; store over, under, and exactly equal comparisons in three boolean variables. Do not use if statements.',
        es: 'Completa Goals.java. Lee goal y actual como int; guarda las comparaciones de superar, quedar por debajo e igualar en tres variables boolean. No uses sentencias if.',
      },
      steps: {
        en: [
          'Use the existing Scanner input = new Scanner(System.in).',
          'Print Enter your goal: and read int goal; print Enter your actual amount: and read int actual.',
          'Declare three boolean variables, each initialized with a relational comparison.',
          'Print Went over goal?, Fell short of goal?, and Met goal exactly? followed by their corresponding boolean values, in that order.',
          'Predict all three values for goal/actual 45/35, 45/45, and 45/50, then run each pair and explain equality.',
        ],
        es: [
          'Usa el Scanner input = new Scanner(System.in) existente.',
          'Imprime Enter your goal: y lee int goal; imprime Enter your actual amount: y lee int actual.',
          'Declara tres variables boolean, cada una inicializada con una comparación relacional.',
          'Imprime Went over goal?, Fell short of goal? y Met goal exactly? seguidos por sus boolean correspondientes, en ese orden.',
          'Predice los tres valores para goal/actual 45/35, 45/45 y 45/50; ejecuta cada par y explica la igualdad.',
        ],
      },
      files: [
        {
          name: 'Goals.java',
          code: 'import java.util.Scanner;\npublic class Goals {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        // Read goal and actual.\n        // Declare the three boolean variables.\n        // Print each required question and its value.\n    }\n}\n',
        },
      ],
      sourcePages: [4, 5],
      inputs: '45\n35\n\n45\n45\n\n45\n50',
    },
    independent: {
      id: 'c2-independent',
      prompt: {
        en: 'Create ReadingGoal. Read two ints: target pages and completed pages. Store aboveTarget, belowTarget, and exactlyTarget without if statements.',
        es: 'Crea ReadingGoal. Lee dos int: páginas objetivo y páginas completadas. Guarda aboveTarget, belowTarget y exactlyTarget sin sentencias if.',
      },
      steps: {
        en: [
          'Create a Scanner and read target pages, then completed pages.',
          'Initialize the three named boolean variables with relational comparisons.',
          'Print Above target?, Below target?, and Exactly target? followed by their values, in that order.',
          'Predict, run, and compare 20/15, 20/20, and 20/25; explain which comparisons handle equality.',
        ],
        es: [
          'Crea un Scanner y lee las páginas objetivo y luego las completadas.',
          'Inicializa las tres variables boolean indicadas con comparaciones relacionales.',
          'Imprime Above target?, Below target? y Exactly target? seguidos por sus valores, en ese orden.',
          'Predice, ejecuta y compara 20/15, 20/20 y 20/25; explica qué comparaciones contemplan la igualdad.',
        ],
      },
      files: [
        {
          name: 'ReadingGoal.java',
          code: 'public class ReadingGoal {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [6],
      inputs: '20\n15\n\n20\n20\n\n20\n25',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'A relational expression produces true or false, which can be stored in boolean.',
          'Use > and < for strict comparisons and == for equality; = assigns a value. Printing a boolean does not require if.',
        ],
        es: [
          'Una expresión relacional produce true o false y se puede guardar en boolean.',
          'Usa > y < para comparaciones estrictas y == para igualdad; = asigna un valor. Imprimir un boolean no requiere if.',
        ],
      },
      guided: {
        en: [
          'Use the existing Scanner input = new Scanner(System.in).',
          'Print Enter your goal: and read int goal; print Enter your actual amount: and read int actual.',
        ],
        es: [
          'Usa el Scanner input = new Scanner(System.in) existente.',
          'Imprime Enter your goal: y lee int goal; imprime Enter your actual amount: y lee int actual.',
        ],
      },
      independent: {
        en: [
          'Create a Scanner and read target pages, then completed pages.',
          'Initialize the three named boolean variables with relational comparisons.',
        ],
        es: [
          'Crea un Scanner y lee las páginas objetivo y luego las completadas.',
          'Inicializa las tres variables boolean indicadas con comparaciones relacionales.',
        ],
      },
    },
  },
  {
    id: 'c3',
    topicId: '2.3',
    group: '2.1–2.5',
    title: {
      en: 'Update a restaurant bill',
      es: 'Actualizar una cuenta de restaurante',
    },
    goal: {
      en: 'Use if / else to update an object field.',
      es: 'Usar if / else para actualizar un campo de objeto.',
    },
    guided: {
      id: 'c3-guided',
      prompt: {
        en: 'Edit only public void addTip() in the supplied Bill.java. For 8 or more customers add 25%; otherwise add 20%. Update mealCost directly. Keep the supplied BillRunner.java unchanged and run BillRunner.',
        es: 'Edita solo public void addTip() en Bill.java. Para 8 clientes o más agrega 25%; en otro caso agrega 20%. Actualiza mealCost directamente. Conserva BillRunner.java sin cambios y ejecuta BillRunner.',
      },
      steps: {
        en: [
          'Identify mealCost and customers; preserve the fields, constructor, and displayTotal().',
          'Use one if / else; 8 belongs to the higher-rate branch.',
          'Assign the new total back to mealCost. Do not return or print in addTip(); displayTotal() prints afterward.',
          'Predict and run the unchanged runner with new Bill(100.00, 10) and new Bill(100.00, 5). Call addTip() once on each new Bill.',
          'Save the complete BillBoundaryRunner.java included here beside Bill.java. After compiling all three files with the command shown, run java BillBoundaryRunner to test new bills of cost 100 with 7, 8, and 9 customers. Predict, execute, and record all three results; keep both runners unchanged.',
        ],
        es: [
          'Identifica mealCost y customers; conserva los campos, el constructor y displayTotal().',
          'Usa un if / else; 8 pertenece a la rama de mayor porcentaje.',
          'Asigna el nuevo total a mealCost. No devuelvas ni imprimas en addTip(); displayTotal() imprime después.',
          'Predice y ejecuta el runner sin cambios con new Bill(100.00, 10) y new Bill(100.00, 5). Llama addTip() una vez en cada Bill nuevo.',
          'Guarda el BillBoundaryRunner.java completo incluido junto a Bill.java. Tras compilar los tres archivos con el comando mostrado, ejecuta java BillBoundaryRunner para probar cuentas nuevas de costo 100 con 7, 8 y 9 clientes. Predice, ejecuta y registra los tres resultados; conserva ambos runners sin cambios.',
        ],
      },
      files: [
        {
          name: 'Bill.java',
          code: 'public class Bill {\n    private double mealCost;\n    private int customers;\n    public Bill(double cost, int count) {\n        mealCost = cost;\n        customers = count;\n    }\n    public void addTip() {\n        // TODO: update mealCost based on customers.\n    }\n    public void displayTotal() {\n        System.out.println("The total cost including tip is: $" + mealCost);\n    }\n}\n',
        },
      ],
      sourcePages: [7, 8, 28, 29],
      helpers: [
        {
          name: 'BillRunner.java',
          code: 'public class BillRunner {\n    public static void main(String[] args) {\n        Bill bill1 = new Bill(100.00, 10);\n        bill1.addTip();\n        bill1.displayTotal();\n        Bill bill2 = new Bill(100.00, 5);\n        bill2.addTip();\n        bill2.displayTotal();\n    }\n}\n',
          readOnly: true,
        },
        {
          name: 'BillBoundaryRunner.java',
          code: 'public class BillBoundaryRunner {\n    public static void main(String[] args) {\n        System.out.println("Customers: 7");\n        Bill bill7 = new Bill(100.00, 7);\n        bill7.addTip();\n        bill7.displayTotal();\n        System.out.println("Customers: 8");\n        Bill bill8 = new Bill(100.00, 8);\n        bill8.addTip();\n        bill8.displayTotal();\n        System.out.println("Customers: 9");\n        Bill bill9 = new Bill(100.00, 9);\n        bill9.addTip();\n        bill9.displayTotal();\n    }\n}\n',
          readOnly: true,
        },
      ],
      entryPoint: 'BillRunner',
    },
    independent: {
      id: 'c3-independent',
      prompt: {
        en: 'Write ParkingFee.java. Store double total = 100 and int hours = 4. Add a 10% surcharge for 4 or more hours; otherwise add 5%. Print Total: followed by total. No keyboard input is required.',
        es: 'Escribe ParkingFee.java. Guarda double total = 100 e int hours = 4. Agrega un recargo de 10% para 4 horas o más; en otro caso agrega 5%. Imprime Total: seguido por total. No requiere entrada del teclado.',
      },
      steps: {
        en: [
          'Declare total and hours inside main.',
          'Use if / else to select the surcharge and update total.',
          'Print Total: followed by the updated total.',
          'Predict and run hours = 4; then change hours to 3 and 5, resetting total to 100 for each run. Record how the boundary affects the branch.',
        ],
        es: [
          'Declara total y hours dentro de main.',
          'Usa if / else para seleccionar el recargo y actualizar total.',
          'Imprime Total: seguido por el total actualizado.',
          'Predice y ejecuta hours = 4; luego cambia hours a 3 y 5, reiniciando total en 100 para cada ejecución. Registra cómo afecta la frontera a la rama.',
        ],
      },
      files: [
        {
          name: 'ParkingFee.java',
          code: 'public class ParkingFee {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [9],
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'A void method performs an action without returning a value. A field assignment changes the object state.',
          'An if / else selects exactly one branch. Apply a percentage to the original cost and store the updated total; repeated calls apply the change again.',
        ],
        es: [
          'Un método void realiza una acción sin devolver un valor. Asignar un campo cambia el estado del objeto.',
          'Un if / else selecciona exactamente una rama. Aplica el porcentaje al costo original y guarda el total actualizado; llamadas repetidas vuelven a aplicar el cambio.',
        ],
      },
      guided: {
        en: [
          'Identify mealCost and customers; preserve the fields, constructor, and displayTotal().',
          'Use one if / else; 8 belongs to the higher-rate branch.',
        ],
        es: [
          'Identifica mealCost y customers; conserva los campos, el constructor y displayTotal().',
          'Usa un if / else; 8 pertenece a la rama de mayor porcentaje.',
        ],
      },
      independent: {
        en: [
          'Declare total and hours inside main.',
          'Use if / else to select the surcharge and update total.',
        ],
        es: [
          'Declara total y hours dentro de main.',
          'Usa if / else para seleccionar el recargo y actualizar total.',
        ],
      },
    },
  },
  {
    id: 'c4',
    topicId: '2.3',
    group: '2.1–2.5',
    title: {
      en: 'Confirm a drink order',
      es: 'Confirmar una bebida',
    },
    goal: {
      en: 'Read whole-line text and select one confirmation.',
      es: 'Leer texto de una línea completa y elegir una confirmación.',
    },
    guided: {
      id: 'c4-guided',
      prompt: {
        en: 'Complete DrinkOrder.java. Read a drink name as a whole line and a nonnegative integer number of teaspoons of sugar. Confirm the named drink without sugar when sugar is 0, or with sugar otherwise.',
        es: 'Completa DrinkOrder.java. Lee el nombre de una bebida como línea completa y un entero no negativo de cucharaditas de azúcar. Confirma la bebida sin azúcar cuando sugar sea 0, o con azúcar en otro caso.',
      },
      steps: {
        en: [
          'Ask What would you like to drink? and read the drink with nextLine() to preserve names such as green tea.',
          'Ask How many teaspoons of sugar do you want? and read an int; assume nonnegative input.',
          'Use if / else to print exactly one confirmation including the drink variable.',
          "Use the exact form Great! Here's one [drink] without sugar. for zero or Great! Here's one [drink] with sugar. otherwise; replace [drink] with the stored name.",
          'Predict and test green tea/0 and coffee/4. Record why nextLine() matters.',
        ],
        es: [
          'Pregunta What would you like to drink? y lee la bebida con nextLine() para conservar nombres como green tea.',
          'Pregunta How many teaspoons of sugar do you want? y lee un int; supone entrada no negativa.',
          'Usa if / else para imprimir exactamente una confirmación que incluya la variable de la bebida.',
          "Usa la forma exacta Great! Here's one [drink] without sugar. para cero o Great! Here's one [drink] with sugar. en otro caso; sustituye [drink] por el nombre guardado.",
          'Predice y prueba green tea/0 y coffee/4. Registra por qué importa nextLine().',
        ],
      },
      files: [
        {
          name: 'DrinkOrder.java',
          code: 'import java.util.Scanner;\npublic class DrinkOrder {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        // Read drink as a line, then sugar as an int.\n        // Print exactly one confirmation.\n    }\n}\n',
        },
      ],
      sourcePages: [10, 11],
      inputs: 'green tea\n0\n\ncoffee\n4',
    },
    independent: {
      id: 'c4-independent',
      prompt: {
        en: 'Create DeliveryOrder. Read the item name as a whole line, then a nonnegative int distance in kilometers. Print Collect [item] at the store. when distance is 0; otherwise print Deliver [item] to the address. Replace [item] with the stored name.',
        es: 'Crea DeliveryOrder. Lee el nombre del artículo como línea completa y luego un int no negativo para la distancia en kilómetros. Imprime Collect [item] at the store. cuando la distancia sea 0; en otro caso imprime Deliver [item] to the address. Sustituye [item] por el nombre guardado.',
      },
      steps: {
        en: [
          'Create a Scanner; read the full item name before the integer distance.',
          'Use if / else to choose collection for zero or delivery otherwise.',
          'Print exactly one required message, preserving the item name and punctuation.',
          'Predict and test book/0 and school bag/5; explain how the space is preserved.',
        ],
        es: [
          'Crea un Scanner; lee el nombre completo del artículo antes de la distancia entera.',
          'Usa if / else para elegir recogida para cero o entrega en otro caso.',
          'Imprime exactamente un mensaje requerido, conservando el nombre y la puntuación.',
          'Predice y prueba book/0 y school bag/5; explica cómo se conserva el espacio.',
        ],
      },
      files: [
        {
          name: 'DeliveryOrder.java',
          code: 'public class DeliveryOrder {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [12],
      inputs: 'book\n0\n\nschool bag\n5',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'Scanner.nextLine() reads a whole line, including spaces; nextInt() reads an integer.',
          'Mutually exclusive alternatives belong in one if / else. Concatenation includes the stored text in a message.',
        ],
        es: [
          'Scanner.nextLine() lee una línea completa con espacios; nextInt() lee un entero.',
          'Las alternativas mutuamente excluyentes pertenecen a un if / else. La concatenación incluye el texto guardado en un mensaje.',
        ],
      },
      guided: {
        en: [
          'Ask What would you like to drink? and read the drink with nextLine() to preserve names such as green tea.',
          'Ask How many teaspoons of sugar do you want? and read an int; assume nonnegative input.',
        ],
        es: [
          'Pregunta What would you like to drink? y lee la bebida con nextLine() para conservar nombres como green tea.',
          'Pregunta How many teaspoons of sugar do you want? y lee un int; supone entrada no negativa.',
        ],
      },
      independent: {
        en: [
          'Create a Scanner; read the full item name before the integer distance.',
          'Use if / else to choose collection for zero or delivery otherwise.',
        ],
        es: [
          'Crea un Scanner; lee el nombre completo del artículo antes de la distancia entera.',
          'Usa if / else para elegir recogida para cero o entrega en otro caso.',
        ],
      },
    },
  },
  {
    id: 'c5',
    topicId: '2.4',
    group: '2.1–2.5',
    title: {
      en: 'Choose a smoothie boost',
      es: 'Elegir un complemento de batido',
    },
    goal: {
      en: 'Assign a value in every branch and use an object.',
      es: 'Asignar un valor en cada rama y usar un objeto.',
    },
    guided: {
      id: 'c5-guided',
      prompt: {
        en: 'Complete SmoothieRunner.java using one if / else if / else chain: 1 selects Protein, 2 Spinach, 3 Ginger, and all other integers default to Ginger. Use the supplied Smoothie.java unchanged. Its nutrient messages are exercise text.',
        es: 'Completa SmoothieRunner.java con una cadena if / else if / else: 1 elige Protein, 2 Spinach, 3 Ginger y cualquier otro entero usa Ginger. Conserva Smoothie.java sin cambios. Sus mensajes de nutrientes son texto del ejercicio.',
      },
      steps: {
        en: [
          'Keep the supplied menu and read boostInt as an int. Declare String boost before the decision.',
          'Assign boost in every branch, including the invalid-input branch, with the exact capitalization Protein, Spinach, or Ginger.',
          'For invalid input print Invalid number. You will receive ginger by default. and choose Ginger.',
          'Create Smoothie userSmoothie = new Smoothie(boost). Print You ordered a followed by the object, with a separating space, then print the result of userSmoothie.getNutrients().',
          'Predict and run choices 1, 2, 3, and 4. Explain why every branch must assign boost.',
        ],
        es: [
          'Conserva el menú suministrado y lee boostInt como int. Declara String boost antes de la decisión.',
          'Asigna boost en cada rama, incluida la de entrada inválida, con las mayúsculas exactas Protein, Spinach o Ginger.',
          'Para entrada inválida imprime Invalid number. You will receive ginger by default. y elige Ginger.',
          'Crea Smoothie userSmoothie = new Smoothie(boost). Imprime You ordered a seguido por el objeto, con un espacio separador, y luego imprime el resultado de userSmoothie.getNutrients().',
          'Predice y ejecuta las opciones 1, 2, 3 y 4. Explica por qué cada rama debe asignar boost.',
        ],
      },
      files: [
        {
          name: 'SmoothieRunner.java',
          code: 'import java.util.Scanner;\npublic class SmoothieRunner {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        System.out.println("What type of boost would you like?");\n        System.out.println("1. Protein");\n        System.out.println("2. Spinach");\n        System.out.println("3. Ginger");\n        int boostInt = input.nextInt();\n        String boost;\n        // Assign boost in every branch.\n        // Create the Smoothie object.\n        // Print the order and getNutrients() result.\n    }\n}\n',
        },
      ],
      sourcePages: [13, 14, 30],
      inputs: '1\n\n2\n\n3\n\n4',
      helpers: [
        {
          name: 'Smoothie.java',
          code: 'public class Smoothie {\n    private String boost;\n    public Smoothie(String chosenBoost) {\n        boost = chosenBoost;\n    }\n    public String getNutrients() {\n        if (boost.equals("Protein")) {\n            return "Your smoothie has extra protein!";\n        } else if (boost.equals("Spinach")) {\n            return "Your smoothie has extra vitamins!";\n        } else {\n            return "Your smoothie improves digestive health!";\n        }\n    }\n    public String toString() {\n        return "smoothie with a boost of " + boost.toLowerCase();\n    }\n}\n',
          readOnly: true,
        },
      ],
    },
    independent: {
      id: 'c5-independent',
      prompt: {
        en: 'Create PrintMode. Read an int: 1 selects Draft, 2 Standard, 3 Photo; all other integers select Standard. Print Mode: followed by the selected text.',
        es: 'Crea PrintMode. Lee un int: 1 elige Draft, 2 Standard, 3 Photo; cualquier otro entero elige Standard. Imprime Mode: seguido por el texto elegido.',
      },
      steps: {
        en: [
          'Create a Scanner and read one integer menu choice.',
          'Use an if / else if / else chain and assign a mode in every branch, including the default.',
          'Print Mode: followed by the selected text once. No support class is needed.',
          'Predict and test 1, 3, and 9; explain the default branch.',
        ],
        es: [
          'Crea un Scanner y lee una opción entera del menú.',
          'Usa una cadena if / else if / else y asigna un modo en todas las ramas, incluida la predeterminada.',
          'Imprime Mode: seguido por el texto elegido una sola vez. No necesitas una clase de apoyo.',
          'Predice y prueba 1, 3 y 9; explica la rama predeterminada.',
        ],
      },
      files: [
        {
          name: 'PrintMode.java',
          code: 'public class PrintMode {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [15],
      inputs: '1\n\n3\n\n9',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'A linked if / else if / else chain takes one path. An else can supply a default for unrecognized choices.',
          'A local variable must be assigned before use on every path. The supplied constructor accepts String; getNutrients() and toString() return String.',
        ],
        es: [
          'Una cadena if / else if / else toma una sola ruta. Un else puede dar un valor predeterminado para opciones desconocidas.',
          'Una variable local debe estar asignada antes de usarse en cada ruta. El constructor suministrado acepta String; getNutrients() y toString() devuelven String.',
        ],
      },
      guided: {
        en: [
          'Keep the supplied menu and read boostInt as an int. Declare String boost before the decision.',
          'Assign boost in every branch, including the invalid-input branch, with the exact capitalization Protein, Spinach, or Ginger.',
        ],
        es: [
          'Conserva el menú suministrado y lee boostInt como int. Declara String boost antes de la decisión.',
          'Asigna boost en cada rama, incluida la de entrada inválida, con las mayúsculas exactas Protein, Spinach o Ginger.',
        ],
      },
      independent: {
        en: [
          'Create a Scanner and read one integer menu choice.',
          'Use an if / else if / else chain and assign a mode in every branch, including the default.',
        ],
        es: [
          'Crea un Scanner y lee una opción entera del menú.',
          'Usa una cadena if / else if / else y asigna un modo en todas las ramas, incluida la predeterminada.',
        ],
      },
    },
  },
  {
    id: 'c6',
    topicId: '2.4',
    group: '2.1–2.5',
    title: {
      en: 'Classify a temperature',
      es: 'Clasificar una temperatura',
    },
    goal: {
      en: 'Use ordered ranges to print one category.',
      es: 'Usar intervalos ordenados para imprimir una categoría.',
    },
    guided: {
      id: 'c6-guided',
      prompt: {
        en: 'Complete TemperatureClassifier.java. Read an int Celsius temperature. Print exactly one category: Freezing for <= 0; Cold for 1–10; Mild for 11–20; Warm for 21–30; Hot for > 30. Use nested if or an if / else if chain.',
        es: 'Completa TemperatureClassifier.java. Lee una temperatura Celsius int. Imprime exactamente una categoría: Freezing para <= 0; Cold para 1–10; Mild para 11–20; Warm para 21–30; Hot para > 30. Usa if anidados o una cadena if / else if.',
      },
      steps: {
        en: [
          'Use the supplied Scanner and int temperature input.',
          'Order the checks so every category is reachable; each threshold belongs to the range ending there.',
          'Use one linked decision structure so only one category prints. Keep input.close().',
          'Predict and test -1, 0, 1, 10, 11, 20, 21, 30, and 31.',
          'In a separate written reflection, explain your chosen structure, its readability, how nesting would change it, and how you would add Extremely Hot above 40.',
        ],
        es: [
          'Usa el Scanner y la lectura de int temperature suministrados.',
          'Ordena las comprobaciones para que todas las categorías sean alcanzables; cada límite pertenece al intervalo que termina allí.',
          'Usa una sola estructura de decisión enlazada para imprimir una categoría. Conserva input.close().',
          'Predice y prueba -1, 0, 1, 10, 11, 20, 21, 30 y 31.',
          'En una reflexión escrita separada, explica la estructura elegida, su legibilidad, cómo cambiaría al anidar y cómo agregarías Extremely Hot por encima de 40.',
        ],
      },
      files: [
        {
          name: 'TemperatureClassifier.java',
          code: 'import java.util.Scanner;\npublic class TemperatureClassifier {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        int temperature = input.nextInt();\n        // Print exactly one category.\n        input.close();\n    }\n}\n',
        },
      ],
      sourcePages: [16, 17],
      inputs: '-1\n\n0\n\n1\n\n10\n\n11\n\n20\n\n21\n\n30\n\n31',
    },
    independent: {
      id: 'c6-independent',
      prompt: {
        en: 'Create BatteryStatus. Read an int from 0 to 100; assume valid input. Print Critical for 0–10, Low for 11–30, Ready for 31–80, and High for 81–100. Print exactly one category.',
        es: 'Crea BatteryStatus. Lee un int entre 0 y 100; supone entrada válida. Imprime Critical para 0–10, Low para 11–30, Ready para 31–80 y High para 81–100. Imprime exactamente una categoría.',
      },
      steps: {
        en: [
          'Read the integer battery level with Scanner.',
          'Choose ordered range checks in one linked decision structure.',
          'Print the exact selected category once.',
          'Predict and test 0, 10, 11, 30, 31, 80, 81, and 100, covering every interval endpoint and the next valid value at each transition. Explain boundary inclusion.',
        ],
        es: [
          'Lee el nivel entero de batería con Scanner.',
          'Elige comprobaciones de intervalos ordenadas en una estructura de decisión enlazada.',
          'Imprime la categoría exacta seleccionada una vez.',
          'Predice y prueba 0, 10, 11, 30, 31, 80, 81 y 100, cubriendo los extremos de cada intervalo y el siguiente valor válido en cada transición. Explica la inclusión de fronteras.',
        ],
      },
      files: [
        {
          name: 'BatteryStatus.java',
          code: 'public class BatteryStatus {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [18],
      inputs: '0\n\n10\n\n11\n\n30\n\n31\n\n80\n\n81\n\n100',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'Checking ordered thresholds can make earlier failed conditions establish the lower bound for later branches.',
          'A linked chain or nested alternatives prints one category. Test boundaries and neighboring values to find gaps or overlaps.',
        ],
        es: [
          'Revisar límites ordenados permite que condiciones anteriores falsas establezcan el límite inferior de ramas posteriores.',
          'Una cadena enlazada o alternativas anidadas imprimen una categoría. Prueba fronteras y valores vecinos para detectar huecos o solapamientos.',
        ],
      },
      guided: {
        en: [
          'Use the supplied Scanner and int temperature input.',
          'Order the checks so every category is reachable; each threshold belongs to the range ending there.',
        ],
        es: [
          'Usa el Scanner y la lectura de int temperature suministrados.',
          'Ordena las comprobaciones para que todas las categorías sean alcanzables; cada límite pertenece al intervalo que termina allí.',
        ],
      },
      independent: {
        en: [
          'Read the integer battery level with Scanner.',
          'Choose ordered range checks in one linked decision structure.',
        ],
        es: [
          'Lee el nivel entero de batería con Scanner.',
          'Elige comprobaciones de intervalos ordenadas en una estructura de decisión enlazada.',
        ],
      },
    },
  },
  {
    id: 'c7',
    topicId: '2.4',
    group: '2.1–2.5',
    title: {
      en: 'Theater discounts: one message',
      es: 'Descuentos del teatro: un mensaje',
    },
    goal: {
      en: 'Nest an age decision inside an open-day decision.',
      es: 'Anidar una decisión por edad dentro de una decisión de apertura.',
    },
    guided: {
      id: 'c7-guided',
      prompt: {
        en: 'Complete public static void getDiscount(int day, int age) in TheaterDiscounts.java with nested if statements. Days 1–7 mean Monday–Sunday. Assume age is nonnegative. Print exactly one message per call.',
        es: 'Completa public static void getDiscount(int day, int age) en TheaterDiscounts.java con if anidados. Los días 1–7 son lunes–domingo. Supone edad no negativa. Imprime exactamente un mensaje por llamada.',
      },
      steps: {
        en: [
          'Validate day before using it: outside 1–7 prints Invalid day. You may check the two invalid cases separately in a chain before using ||.',
          'For valid days 1–2 print Theater is closed.; do not calculate an age discount on closed days.',
          'Only inside the days 3–7 open branch, use nested selection: under 12 prints Child discount: 50% off.; ages 12–17 print Student discount: 15% off.; ages 65+ print Senior discount: 20% off.; otherwise print No discount.',
          'Keep getDiscount void; it prints rather than returning a discount. Preserve the supplied main call.',
          'Predict and test days 0, 1, 2, 3, 7, and 8 with a nonnegative age. On an open day test ages 11, 12, 17, 18, 64, and 65. Explain why invalid/closed calls cannot also print an age message.',
        ],
        es: [
          'Valida day antes de usarlo: fuera de 1–7 imprime Invalid day. Puedes comprobar ambos casos inválidos por separado en una cadena antes de usar ||.',
          'Para días válidos 1–2 imprime Theater is closed.; no calcules descuento por edad en días cerrados.',
          'Solo dentro de la rama abierta de días 3–7 usa selección anidada: menor de 12 imprime Child discount: 50% off.; de 12–17 imprime Student discount: 15% off.; de 65 en adelante imprime Senior discount: 20% off.; en otro caso imprime No discount.',
          'Conserva getDiscount como void; imprime en lugar de devolver un descuento. Conserva la llamada del main suministrado.',
          'Predice y prueba días 0, 1, 2, 3, 7 y 8 con edad no negativa. En un día abierto prueba edades 11, 12, 17, 18, 64 y 65. Explica por qué llamadas inválidas o cerradas no imprimen también un mensaje por edad.',
        ],
      },
      files: [
        {
          name: 'TheaterDiscounts.java',
          code: 'import java.util.Scanner;\npublic class TheaterDiscounts {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        int day = input.nextInt();\n        int age = input.nextInt();\n        getDiscount(day, age);\n    }\n    public static void getDiscount(int day, int age) {\n        // Choose exactly one message. Use nested if.\n    }\n}\n',
        },
      ],
      sourcePages: [19, 20],
      inputs:
        '0\n18\n\n1\n18\n\n2\n18\n\n3\n18\n\n7\n18\n\n8\n18\n\n3\n11\n\n3\n12\n\n3\n17\n\n3\n64\n\n3\n65',
    },
    independent: {
      id: 'c7-independent',
      prompt: {
        en: 'Create LibraryAccess. Read day (1–7) and nonnegative age. Invalid days print Invalid day. Days 6–7 print Library closed. On days 1–5, use a nested decision: under 16 prints Youth area.; otherwise print General area. Print exactly one message.',
        es: 'Crea LibraryAccess. Lee day (1–7) y edad no negativa. Días inválidos imprimen Invalid day. Días 6–7 imprimen Library closed. En días 1–5 usa una decisión anidada: menor de 16 imprime Youth area.; en otro caso imprime General area. Imprime exactamente un mensaje.',
      },
      steps: {
        en: [
          'Read day first, then age, as integers.',
          'Reject invalid days before deciding whether the library is closed.',
          'Nest the age decision inside the open-day branch and preserve all exact message strings.',
          'Predict and run day/age 0/10, 6/10, 3/15, and 3/16. Record which outer and inner checks run.',
        ],
        es: [
          'Lee primero day y luego age como enteros.',
          'Descarta días inválidos antes de decidir si la biblioteca está cerrada.',
          'Anida la decisión por edad dentro de la rama de apertura y conserva los mensajes exactos.',
          'Predice y ejecuta day/age 0/10, 6/10, 3/15 y 3/16. Registra qué comprobaciones externas e internas se ejecutan.',
        ],
      },
      files: [
        {
          name: 'LibraryAccess.java',
          code: 'public class LibraryAccess {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [21],
      inputs: '0\n10\n\n6\n10\n\n3\n15\n\n3\n16',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'Nested selection makes an inner decision conditional on reaching an outer branch. Validate the day before applying opening or age rules.',
          'A method named getDiscount can return void: its signature determines the contract. Mutually exclusive paths must each print one message.',
        ],
        es: [
          'La selección anidada hace que una decisión interna dependa de alcanzar una rama externa. Valida el día antes de aplicar reglas de apertura o edad.',
          'Un método llamado getDiscount puede devolver void: su firma determina el contrato. Cada ruta mutuamente excluyente debe imprimir un mensaje.',
        ],
      },
      guided: {
        en: [
          'Validate day before using it: outside 1–7 prints Invalid day. You may check the two invalid cases separately in a chain before using ||.',
          'For valid days 1–2 print Theater is closed.; do not calculate an age discount on closed days.',
        ],
        es: [
          'Valida day antes de usarlo: fuera de 1–7 imprime Invalid day. Puedes comprobar ambos casos inválidos por separado en una cadena antes de usar ||.',
          'Para días válidos 1–2 imprime Theater is closed.; no calcules descuento por edad en días cerrados.',
        ],
      },
      independent: {
        en: [
          'Read day first, then age, as integers.',
          'Reject invalid days before deciding whether the library is closed.',
        ],
        es: [
          'Lee primero day y luego age como enteros.',
          'Descarta días inválidos antes de decidir si la biblioteca está cerrada.',
        ],
      },
    },
  },
  {
    id: 'c8',
    topicId: '2.5',
    group: '2.1–2.5',
    title: {
      en: 'Refactor the seasonal rule',
      es: 'Refactorizar la regla de temporada',
    },
    goal: {
      en: 'Combine comparisons with OR and AND in one chain.',
      es: 'Combinar comparaciones con OR y AND en una cadena.',
    },
    guided: {
      id: 'c8-guided',
      prompt: {
        en: 'Complete Salmon.java using exactly one three-branch chain: if, else if, else. Read int month. Outside 1–12 is invalid; 8–11 inclusive is spawning season; all other valid months are not. These are the given exercise rules.',
        es: 'Completa Salmon.java usando exactamente una cadena de tres ramas: if, else if, else. Lee int month. Fuera de 1–12 es inválido; 8–11 inclusive es temporada de desove; los demás meses válidos no lo son. Estas son las reglas del ejercicio.',
      },
      steps: {
        en: [
          'Combine the two invalid possibilities in one condition using OR (||).',
          'Combine the lower and upper season limits in one condition using AND (&&).',
          'Put invalid handling first, season second, and the default last; do not use three independent if statements.',
          'Use exactly these messages for their branches: Invalid month. / Spawning season. / Not spawning season.',
          'Predict and test 0, 1, 7, 8, 11, 12, and 13. Explain why the season endpoints are inclusive.',
        ],
        es: [
          'Combina las dos posibilidades inválidas en una condición con OR (||).',
          'Combina los límites inferior y superior de temporada en una condición con AND (&&).',
          'Coloca primero el manejo inválido, luego temporada y al final la opción predeterminada; no uses tres if independientes.',
          'Usa exactamente estos mensajes en sus ramas: Invalid month. / Spawning season. / Not spawning season.',
          'Predice y prueba 0, 1, 7, 8, 11, 12 y 13. Explica por qué se incluyen los extremos de temporada.',
        ],
      },
      files: [
        {
          name: 'Salmon.java',
          code: 'import java.util.Scanner;\npublic class Salmon {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        int month = input.nextInt();\n        // One if / else if / else chain only.\n    }\n}\n',
        },
      ],
      sourcePages: [22, 23],
      inputs: '0\n\n1\n\n7\n\n8\n\n11\n\n12\n\n13',
    },
    independent: {
      id: 'c8-independent',
      prompt: {
        en: 'Create SchoolTerm. Read month. Use one if / else if / else chain. Outside 1–12 prints Invalid month.; months 2–6 inclusive print Term active.; other valid months print Break.',
        es: 'Crea SchoolTerm. Lee month. Usa una cadena if / else if / else. Fuera de 1–12 imprime Invalid month.; meses 2–6 inclusive imprimen Term active.; otros meses válidos imprimen Break.',
      },
      steps: {
        en: [
          'Read one integer month with Scanner.',
          'Use OR to combine invalid cases, then AND to check the inclusive term range.',
          'Print one exact message using one three-branch chain.',
          'Predict and test 0, 1, 2, 6, 7, 12, and 13. Record the two component comparisons for each compound condition.',
        ],
        es: [
          'Lee un mes entero con Scanner.',
          'Usa OR para combinar casos inválidos y luego AND para comprobar el intervalo inclusivo de clases.',
          'Imprime un mensaje exacto usando una cadena de tres ramas.',
          'Predice y prueba 0, 1, 2, 6, 7, 12 y 13. Registra las dos comparaciones componentes de cada condición compuesta.',
        ],
      },
      files: [
        {
          name: 'SchoolTerm.java',
          code: 'public class SchoolTerm {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [24],
      inputs: '0\n\n1\n\n2\n\n6\n\n7\n\n12\n\n13',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'OR (||) is true when either condition is true; use it for disjoint invalid regions.',
          'AND (&&) requires both conditions to be true; use it for a bounded interval. A final else handles values excluded by the previous branches.',
        ],
        es: [
          'OR (||) es verdadero si cualquiera de las condiciones es verdadera; úsalo para regiones inválidas separadas.',
          'AND (&&) exige ambas condiciones verdaderas; úsalo para un intervalo acotado. El else final maneja valores excluidos por las ramas anteriores.',
        ],
      },
      guided: {
        en: [
          'Combine the two invalid possibilities in one condition using OR (||).',
          'Combine the lower and upper season limits in one condition using AND (&&).',
        ],
        es: [
          'Combina las dos posibilidades inválidas en una condición con OR (||).',
          'Combina los límites inferior y superior de temporada en una condición con AND (&&).',
        ],
      },
      independent: {
        en: [
          'Read one integer month with Scanner.',
          'Use OR to combine invalid cases, then AND to check the inclusive term range.',
        ],
        es: [
          'Lee un mes entero con Scanner.',
          'Usa OR para combinar casos inválidos y luego AND para comprobar el intervalo inclusivo de clases.',
        ],
      },
    },
  },
  {
    id: 'c9',
    topicId: '2.5',
    group: '2.1–2.5',
    title: {
      en: 'Return the median of three numbers',
      es: 'Devolver la mediana de tres números',
    },
    goal: {
      en: 'Return a middle value using compound Boolean expressions.',
      es: 'Devolver el valor central con expresiones booleanas compuestas.',
    },
    guided: {
      id: 'c9-guided',
      prompt: {
        en: 'Complete public static int findMedian(int a, int b, int c) in FindMedian.java. Return the middle value after ordering the three inputs; duplicates are allowed. Do not print inside findMedian. Keep main storing and printing the returned value.',
        es: 'Completa public static int findMedian(int a, int b, int c) en FindMedian.java. Devuelve el valor central al ordenar las tres entradas; se permiten duplicados. No imprimas dentro de findMedian. Conserva main guardando e imprimiendo el valor devuelto.',
      },
      steps: {
        en: [
          'Work through the three values on paper; the median is the middle value, not their average.',
          'For a to be in the middle, it must be between b and c in either order. Build each ordering using AND and join the orderings using OR.',
          'Include equality so duplicates qualify. If a is not in the middle, check b in the same way.',
          'If neither a nor b qualifies, return c. Every execution path must return an int; preserve the supplied prompts and The median is output label in main.',
          'Predict and test different orderings, duplicates, all-equal values, and negatives. Use 8/2/5, 5/8/2, 2/5/8, 6/6/2, 4/4/4, and -8/-3/-5 as concrete cases; explain equality and return-path coverage.',
        ],
        es: [
          'Ordena los tres valores en papel; la mediana es el valor central, no su promedio.',
          'Para que a esté en medio debe estar entre b y c en cualquiera de los dos órdenes. Construye cada orden con AND y une los órdenes con OR.',
          'Incluye igualdad para aceptar duplicados. Si a no está en medio, comprueba b de la misma forma.',
          'Si ni a ni b cumplen, devuelve c. Cada ruta debe devolver int; conserva las preguntas suministradas y la etiqueta The median is en main.',
          'Predice y prueba distintos órdenes, duplicados, todos iguales y negativos. Usa 8/2/5, 5/8/2, 2/5/8, 6/6/2, 4/4/4 y -8/-3/-5 como casos concretos; explica igualdad y cobertura de rutas de retorno.',
        ],
      },
      files: [
        {
          name: 'FindMedian.java',
          code: 'import java.util.Scanner;\npublic class FindMedian {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        System.out.println("Enter the first integer:");\n        int first = input.nextInt();\n        System.out.println("Enter the second integer:");\n        int second = input.nextInt();\n        System.out.println("Enter the third integer:");\n        int third = input.nextInt();\n        int median = findMedian(first, second, third);\n        System.out.println("The median is " + median);\n    }\n    public static int findMedian(int a, int b, int c) {\n        // Return the median. Replace this comment.\n    }\n}\n',
        },
      ],
      sourcePages: [25, 26],
      inputs:
        '8\n2\n5\n\n5\n8\n2\n\n2\n5\n8\n\n6\n6\n2\n\n4\n4\n4\n\n-8\n-3\n-5',
    },
    independent: {
      id: 'c9-independent',
      prompt: {
        en: 'Create MiddleReading. Read three integer sensor readings and implement public static int middle(int a, int b, int c) to return the middle reading. main prints Middle reading: followed by the result. Do not sort or use Math methods.',
        es: 'Crea MiddleReading. Lee tres lecturas enteras de sensores e implementa public static int middle(int a, int b, int c) para devolver la lectura central. main imprime Middle reading: seguido por el resultado. No ordenes ni uses métodos Math.',
      },
      steps: {
        en: [
          'Read three ints in main and pass them to middle in the same order.',
          'Use compound comparisons, including equality, to identify and return the middle reading; do not print inside middle.',
          'Store the returned int in main and print Middle reading: followed by it. Ensure every path in middle returns an int.',
          'Predict and test 8/2/5, 5/8/2, 2/5/8, 6/6/2, and -8/-3/-5. Record argument-to-parameter mapping and explain how duplicates are handled without sorting or Math methods.',
        ],
        es: [
          'Lee tres int en main y pásalos a middle en el mismo orden.',
          'Usa comparaciones compuestas, incluida igualdad, para identificar y devolver la lectura central; no imprimas dentro de middle.',
          'Guarda el int devuelto en main e imprime Middle reading: seguido por él. Asegura que cada ruta de middle devuelva int.',
          'Predice y prueba 8/2/5, 5/8/2, 2/5/8, 6/6/2 y -8/-3/-5. Registra la relación entre argumentos y parámetros y explica duplicados sin ordenar ni usar métodos Math.',
        ],
      },
      files: [
        {
          name: 'MiddleReading.java',
          code: 'public class MiddleReading {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [27],
      inputs: '8\n2\n5\n\n5\n8\n2\n\n2\n5\n8\n\n6\n6\n2\n\n-8\n-3\n-5',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'A median of three is an input value that lies between the other two, inclusive. Duplicates can occupy the middle.',
          'AND combines the two bounds of an ordering; OR combines alternative orderings. return transfers a value to the caller, while println displays it.',
        ],
        es: [
          'La mediana de tres es un valor de entrada situado entre los otros dos, inclusive. Los duplicados pueden ocupar el centro.',
          'AND combina los dos límites de un orden; OR combina órdenes alternativos. return transfiere un valor a quien llama; println lo muestra.',
        ],
      },
      guided: {
        en: [
          'Work through the three values on paper; the median is the middle value, not their average.',
          'For a to be in the middle, it must be between b and c in either order. Build each ordering using AND and join the orderings using OR.',
        ],
        es: [
          'Ordena los tres valores en papel; la mediana es el valor central, no su promedio.',
          'Para que a esté en medio debe estar entre b y c en cualquiera de los dos órdenes. Construye cada orden con AND y une los órdenes con OR.',
        ],
      },
      independent: {
        en: [
          'Read three ints in main and pass them to middle in the same order.',
          'Use compound comparisons, including equality, to identify and return the middle reading; do not print inside middle.',
        ],
        es: [
          'Lee tres int en main y pásalos a middle en el mismo orden.',
          'Usa comparaciones compuestas, incluida igualdad, para identificar y devolver la lectura central; no imprimas dentro de middle.',
        ],
      },
    },
  },
];
