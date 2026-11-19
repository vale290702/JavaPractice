import type { ExtraActivity } from './types';

// Internal source provenance only; predictions and solutions belong to the learner.
export const unit1ObjectStringActivities: ExtraActivity[] = [
  {
    id: 'd7',
    topicId: '1.12',
    group: '1.10–1.15',
    title: {
      en: '1.12.3 · One class, separate rectangles',
      es: '1.12.3 · Una clase, rectángulos separados',
    },
    goal: {
      en: 'Distinguish a class from its instances and reference variables.',
      es: 'Distinguir una clase de sus instancias y variables de referencia.',
    },
    guided: {
      id: 'd7-guided',
      prompt: {
        en: "Use the supplied custom Rectangle class to create separate objects with width, height, and color. Do not import java.awt.Rectangle. Change only rect1's initial color to Orange, add rect4, and print all four.",
        es: 'Usa la clase Rectangle personalizada incluida para crear objetos separados con ancho, alto y color. No importes java.awt.Rectangle. Cambia solo el color inicial de rect1 a Orange, agrega rect4 e imprime los cuatro.',
      },
      steps: {
        en: [
          'Identify Rectangle as the class type and rect1, rect2, and rect3 as reference variables. Read the private width field and its constructor assignment.',
          "Keep rect1 dimensions 10 by 20, rect2 5 by 15 Blue, and rect3 8 by 8 Green. Change only rect1's constructor color from Red to Orange.",
          'Create rect4 with width 12, height 24, and color Yellow. Print rect1 through rect4, one object per line; toString supplies the format.',
          "Predict all lines before running. Explain why the class declaration does not fix every object's width and why changing rect1 arguments changes neither class code nor other objects.",
        ],
        es: [
          'Identifica Rectangle como tipo de clase y rect1, rect2 y rect3 como variables de referencia. Lee el campo privado width y su asignación en el constructor.',
          'Conserva las dimensiones 10 por 20 de rect1, rect2 de 5 por 15 Blue y rect3 de 8 por 8 Green. Cambia solo el color del constructor de rect1 de Red a Orange.',
          'Crea rect4 con ancho 12, alto 24 y color Yellow. Imprime rect1 a rect4, un objeto por línea; toString proporciona el formato.',
          'Predice todas las líneas antes de ejecutar. Explica por qué declarar la clase no fija el ancho de todos los objetos y por qué cambiar argumentos de rect1 no cambia el código de la clase ni los demás objetos.',
        ],
      },
      files: [
        {
          name: 'RectangleRunner.java',
          code: 'public class RectangleRunner {\n    public static void main(String[] args) {\n        Rectangle rect1 = new Rectangle(10, 20, "Red");\n        Rectangle rect2 = new Rectangle(5, 15, "Blue");\n        Rectangle rect3 = new Rectangle(8, 8, "Green");\n        // Change rect1\'s initial color; add rect4.\n        // Print all four objects.\n    }\n}\n',
        },
      ],
      sourcePages: [21, 22, 43],
      entryPoint: 'RectangleRunner',
    },
    independent: {
      id: 'd7-independent',
      prompt: {
        en: 'Create PosterRunner with custom Rectangles (20, 30, Red) and (40, 60, Blue). Print both; then change only the first constructor color to Green.',
        es: 'Crea PosterRunner con Rectangles personalizados (20, 30, Red) y (40, 60, Blue). Imprime ambos; luego cambia solo el color del primer constructor a Green.',
      },
      steps: {
        en: [
          'Declare two Rectangle references and construct the objects in the stated order using the supplied helper.',
          'Print each object on its own line and record a prediction before running.',
          'Change only the first constructor color to Green; predict which line changes, run again, and explain why the second object is unaffected.',
        ],
        es: [
          'Declara dos referencias Rectangle y construye los objetos en el orden indicado usando el apoyo incluido.',
          'Imprime cada objeto en su propia línea y registra una predicción antes de ejecutar.',
          'Cambia solo el color del primer constructor a Green; predice qué línea cambia, ejecuta otra vez y explica por qué no cambia el segundo objeto.',
        ],
      },
      files: [
        {
          name: 'PosterRunner.java',
          code: 'public class PosterRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [23, 43],
      entryPoint: 'PosterRunner',
    },
    helpers: [
      {
        name: 'Rectangle.java',
        code: 'public class Rectangle {\n    private int width;\n    private int height;\n    private String color;\n    public Rectangle(int w, int h, String c) {\n        width = w;\n        height = h;\n        color = c;\n    }\n    public String toString() {\n        return "Rectangle: " + width + " x " + height\n            + ", " + color;\n    }\n}\n',
        readOnly: true,
      },
    ],
    guide: {
      concepts: {
        en: [
          'A class defines fields and behavior; each new object receives its own constructor values.',
          'A reference variable names an object. Printing this custom Rectangle uses its supplied toString representation.',
        ],
        es: [
          'Una clase define campos y comportamiento; cada objeto nuevo recibe sus propios valores del constructor.',
          'Una variable de referencia identifica un objeto. Imprimir este Rectangle personalizado usa su representación toString incluida.',
        ],
      },
      guided: {
        en: [
          'Identify Rectangle as the class type and rect1, rect2, and rect3 as reference variables. Read the private width field and its constructor assignment.',
          "Keep rect1 dimensions 10 by 20, rect2 5 by 15 Blue, and rect3 8 by 8 Green. Change only rect1's constructor color from Red to Orange.",
        ],
        es: [
          'Identifica Rectangle como tipo de clase y rect1, rect2 y rect3 como variables de referencia. Lee el campo privado width y su asignación en el constructor.',
          'Conserva las dimensiones 10 por 20 de rect1, rect2 de 5 por 15 Blue y rect3 de 8 por 8 Green. Cambia solo el color del constructor de rect1 de Red a Orange.',
        ],
      },
      independent: {
        en: [
          'Declare two Rectangle references and construct the objects in the stated order using the supplied helper.',
          'Print each object on its own line and record a prediction before running.',
        ],
        es: [
          'Declara dos referencias Rectangle y construye los objetos en el orden indicado usando el apoyo incluido.',
          'Imprime cada objeto en su propia línea y registra una predicción antes de ejecutar.',
        ],
      },
    },
  },
  {
    id: 'd8',
    topicId: '1.13',
    group: '1.10–1.15',
    title: {
      en: '1.13.7 · Create a library system',
      es: '1.13.7 · Crear un sistema de biblioteca',
    },
    goal: {
      en: 'Match constructor arguments to parameter types and order.',
      es: 'Relacionar argumentos del constructor con tipos y orden de parámetros.',
    },
    guided: {
      id: 'd8-guided',
      prompt: {
        en: 'Create myLibrary as Library("Grand Central Library", "123 Main St", 5000), myBook as Book("The Hobbit", "J.R.R. Tolkien", 310), and myMember as Member("Alex Rivera", 7732, false). Print each object.',
        es: 'Crea myLibrary como Library("Grand Central Library", "123 Main St", 5000), myBook como Book("The Hobbit", "J.R.R. Tolkien", 310) y myMember como Member("Alex Rivera", 7732, false). Imprime cada objeto.',
      },
      steps: {
        en: [
          'Read the signatures Library(String, String, int), Book(String, String, int), and Member(String, int, boolean). Match argument count, order, and types.',
          'Declare each reference with the matching class type and use new with the stated values. Keep all helper classes unchanged.',
          'Predict and print myLibrary, myBook, and myMember in that order, one per line. The helpers provide toString.',
          'Explain why new Member("Alex", false, 7732) has the wrong signature and predict what happens if a constructor argument is omitted.',
        ],
        es: [
          'Lee las firmas Library(String, String, int), Book(String, String, int) y Member(String, int, boolean). Comprueba cantidad, orden y tipos de argumentos.',
          'Declara cada referencia con el tipo de clase correspondiente y usa new con los valores indicados. Conserva las clases de apoyo sin cambios.',
          'Predice e imprime myLibrary, myBook y myMember en ese orden, uno por línea. Las clases de apoyo proporcionan toString.',
          'Explica por qué new Member("Alex", false, 7732) tiene una firma incorrecta y predice qué sucede si se omite un argumento del constructor.',
        ],
      },
      files: [
        {
          name: 'SystemRunner.java',
          code: 'public class SystemRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [24, 25, 44, 45, 46],
      entryPoint: 'SystemRunner',
    },
    independent: {
      id: 'd8-independent',
      prompt: {
        en: 'Create BranchRunner with Library("West Branch", "8 Oak St", 1200), Book("Dune", "Frank Herbert", 412), and Member("Sam Lee", 901, true). Print each on its own line.',
        es: 'Crea BranchRunner con Library("West Branch", "8 Oak St", 1200), Book("Dune", "Frank Herbert", 412) y Member("Sam Lee", 901, true). Imprime cada uno en su propia línea.',
      },
      steps: {
        en: [
          'Match each argument to the corresponding constructor parameter and declare three references with the correct types.',
          'Construct the three objects with new. Use the provided helpers without changing them.',
          'Predict and print Library, Book, and Member in that order. Explain why the int and boolean arguments cannot exchange positions in Member.',
        ],
        es: [
          'Relaciona cada argumento con su parámetro del constructor y declara tres referencias de tipos correctos.',
          'Construye los tres objetos con new. Usa los apoyos incluidos sin modificarlos.',
          'Predice e imprime Library, Book y Member en ese orden. Explica por qué los argumentos int y boolean no pueden intercambiar posiciones en Member.',
        ],
      },
      files: [
        {
          name: 'BranchRunner.java',
          code: 'public class BranchRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [26, 44, 45, 46],
      entryPoint: 'BranchRunner',
    },
    helpers: [
      {
        name: 'Library.java',
        code: 'public class Library {\n    private String name;\n    private String address;\n    private int books;\n    public Library(String n, String a, int b) {\n        name = n;\n        address = a;\n        books = b;\n    }\n    public String toString() {\n        return "Library: " + name + ", " + address\n            + ", books=" + books;\n    }\n}\n',
        readOnly: true,
      },
      {
        name: 'Book.java',
        code: 'public class Book {\n    private String title;\n    private String author;\n    private int pages;\n    public Book(String t, String a, int p) {\n        title = t;\n        author = a;\n        pages = p;\n    }\n    public String toString() {\n        return "Book: " + title + ", " + author\n            + ", pages=" + pages;\n    }\n}\n',
        readOnly: true,
      },
      {
        name: 'Member.java',
        code: 'public class Member {\n    private String name;\n    private int id;\n    private boolean active;\n    public Member(String n, int i, boolean a) {\n        name = n;\n        id = i;\n        active = a;\n    }\n    public String toString() {\n        return "Member: " + name + ", id=" + id\n            + ", active=" + active;\n    }\n}\n',
        readOnly: true,
      },
    ],
    guide: {
      concepts: {
        en: [
          'new creates an instance and invokes a constructor whose parameter list matches the arguments.',
          'Printing an object calls its toString; a reference must use a compatible class type.',
        ],
        es: [
          'new crea una instancia e invoca un constructor cuya lista de parámetros coincide con los argumentos.',
          'Imprimir un objeto llama su toString; una referencia debe usar un tipo de clase compatible.',
        ],
      },
      guided: {
        en: [
          'Read the signatures Library(String, String, int), Book(String, String, int), and Member(String, int, boolean). Match argument count, order, and types.',
          'Declare each reference with the matching class type and use new with the stated values. Keep all helper classes unchanged.',
        ],
        es: [
          'Lee las firmas Library(String, String, int), Book(String, String, int) y Member(String, int, boolean). Comprueba cantidad, orden y tipos de argumentos.',
          'Declara cada referencia con el tipo de clase correspondiente y usa new con los valores indicados. Conserva las clases de apoyo sin cambios.',
        ],
      },
      independent: {
        en: [
          'Match each argument to the corresponding constructor parameter and declare three references with the correct types.',
          'Construct the three objects with new. Use the provided helpers without changing them.',
        ],
        es: [
          'Relaciona cada argumento con su parámetro del constructor y declara tres referencias de tipos correctos.',
          'Construye los tres objetos con new. Usa los apoyos incluidos sin modificarlos.',
        ],
      },
    },
  },
  {
    id: 'd9',
    topicId: '1.13',
    group: '1.10–1.15',
    title: {
      en: '1.13.8 · Match Camera overloads',
      es: '1.13.8 · Relacionar sobrecargas de Camera',
    },
    goal: {
      en: 'Select overloaded constructors by ordered argument types.',
      es: 'Elegir constructores sobrecargados según los tipos ordenados de argumentos.',
    },
    guided: {
      id: 'd9-guided',
      prompt: {
        en: 'Create and print three cameras: Camera("35mm", 10), Camera(24, 20), and Camera(50, 3). Use both overloaded constructors and keep Camera.java unchanged.',
        es: 'Crea e imprime tres cámaras: Camera("35mm", 10), Camera(24, 20) y Camera(50, 3). Usa ambos constructores sobrecargados y conserva Camera.java sin cambios.',
      },
      steps: {
        en: [
          "Read Camera(String, int) and Camera(int, int); list each call's argument types in order.",
          'Store each new Camera in a separate Camera reference and print them in the stated order.',
          'Predict each line using toString exactly: its prefix is "This is a camera with a maxiumum zoom of : ", including the spelling maxiumum. It prints maximumZoom only, not lens.',
          'Run and compare with your prediction. Explain which constructor new Camera("24", 5) selects versus new Camera(24, 5); a quoted number is a String.',
        ],
        es: [
          'Lee Camera(String, int) y Camera(int, int); enumera en orden los tipos de argumentos de cada llamada.',
          'Guarda cada nueva Camera en una referencia Camera separada e imprímelas en el orden indicado.',
          'Predice cada línea usando toString exactamente: su prefijo es "This is a camera with a maxiumum zoom of : ", incluida la escritura maxiumum. Imprime solo maximumZoom, no lens.',
          'Ejecuta y compara con tu predicción. Explica qué constructor elige new Camera("24", 5) frente a new Camera(24, 5); un número entre comillas es String.',
        ],
      },
      files: [
        {
          name: 'CameraRunner.java',
          code: 'public class CameraRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [27, 28, 47],
      entryPoint: 'CameraRunner',
    },
    independent: {
      id: 'd9-independent',
      prompt: {
        en: 'Create CameraKit. Construct Camera("50mm", 8), Camera(35, 12), and Camera("wide", 4), then print them in that order.',
        es: 'Crea CameraKit. Construye Camera("50mm", 8), Camera(35, 12) y Camera("wide", 4), e imprímelas en ese orden.',
      },
      steps: {
        en: [
          'List the argument types and selected constructor signature for all three calls.',
          'Store three Camera objects and print one per line using the supplied helper unchanged.',
          "Predict and run the output. Preserve the helper's maxiumum spelling and note that lens is stored but omitted from toString; explain why constructor selection depends on types.",
        ],
        es: [
          'Enumera los tipos de argumentos y la firma del constructor elegida en las tres llamadas.',
          'Guarda tres objetos Camera e imprime uno por línea usando el apoyo incluido sin cambios.',
          'Predice y ejecuta la salida. Conserva la escritura maxiumum del apoyo y observa que lens se guarda pero se omite de toString; explica por qué elegir constructor depende de los tipos.',
        ],
      },
      files: [
        {
          name: 'CameraKit.java',
          code: 'public class CameraKit {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [29, 47],
      entryPoint: 'CameraKit',
    },
    helpers: [
      {
        name: 'Camera.java',
        code: 'public class Camera {\n    private String lens;\n    private int maximumZoom;\n    public Camera(String description, int zoom) {\n        lens = description;\n        maximumZoom = zoom;\n    }\n    public Camera(int focalLength, int zoom) {\n        lens = focalLength + "mm";\n        maximumZoom = zoom;\n    }\n    public String toString() {\n        return "This is a camera with a maxiumum zoom of : "\n            + maximumZoom;\n    }\n}\n',
        readOnly: true,
      },
    ],
    guide: {
      concepts: {
        en: [
          'Overloaded constructors share a class name but have different parameter lists.',
          'String and int arguments select different signatures; stored fields do not all have to appear in toString.',
        ],
        es: [
          'Los constructores sobrecargados comparten el nombre de la clase pero tienen listas de parámetros diferentes.',
          'Los argumentos String e int eligen firmas diferentes; no todos los campos guardados tienen que aparecer en toString.',
        ],
      },
      guided: {
        en: [
          "Read Camera(String, int) and Camera(int, int); list each call's argument types in order.",
          'Store each new Camera in a separate Camera reference and print them in the stated order.',
        ],
        es: [
          'Lee Camera(String, int) y Camera(int, int); enumera en orden los tipos de argumentos de cada llamada.',
          'Guarda cada nueva Camera en una referencia Camera separada e imprímelas en el orden indicado.',
        ],
      },
      independent: {
        en: [
          'List the argument types and selected constructor signature for all three calls.',
          'Store three Camera objects and print one per line using the supplied helper unchanged.',
        ],
        es: [
          'Enumera los tipos de argumentos y la firma del constructor elegida en las tres llamadas.',
          'Guarda tres objetos Camera e imprime uno por línea usando el apoyo incluido sin cambios.',
        ],
      },
    },
  },
  {
    id: 'd10',
    topicId: '1.14',
    group: '1.10–1.15',
    title: {
      en: '1.14.5 · Change the correct balloon',
      es: '1.14.5 · Cambiar el globo correcto',
    },
    goal: {
      en: 'Implement a void mutator and trace separate object states.',
      es: 'Implementar un mutador void y trazar estados de objetos separados.',
    },
    guided: {
      id: 'd10-guided',
      prompt: {
        en: "Complete only inflate(double amount) in the editable Balloon.java: add amount to this object's radius without printing or returning a value. Assume radius and amount are nonnegative. Complete BalloonRunner to perform the stated sequence. Both files belong to this workspace.",
        es: 'Completa solo inflate(double amount) en Balloon.java editable: suma amount al radio de este objeto sin imprimir ni devolver un valor. Supone radio y cantidad no negativos. Completa BalloonRunner con la secuencia indicada. Ambos archivos pertenecen a este espacio de trabajo.',
      },
      steps: {
        en: [
          'Identify radius and color in Balloon.java. Preserve its constructor, changeColor, and toString; implement the blank inflate method.',
          'Create balloon1 as Balloon(5.0, "black") and balloon2 as Balloon(7.0, "Green"). Print both initial objects in that order.',
          'Inflate only balloon1 by 10.0 cm and change only balloon2 to Silver. Print both again in the same order.',
          "Before running BalloonRunner, trace each object's radius and color before and after both calls. Save both Java files, then run and explain why each receiver changes independently.",
        ],
        es: [
          'Identifica radius y color en Balloon.java. Conserva su constructor, changeColor y toString; implementa inflate, que está vacío.',
          'Crea balloon1 como Balloon(5.0, "black") y balloon2 como Balloon(7.0, "Green"). Imprime ambos objetos iniciales en ese orden.',
          'Infla solo balloon1 en 10.0 cm y cambia solo balloon2 a Silver. Imprime ambos otra vez en el mismo orden.',
          'Antes de ejecutar BalloonRunner, traza el radio y color de cada objeto antes y después de ambas llamadas. Guarda ambos archivos Java; ejecuta y explica por qué cada receptor cambia de forma independiente.',
        ],
      },
      files: [
        {
          name: 'BalloonRunner.java',
          code: 'public class BalloonRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
        {
          name: 'Balloon.java',
          code: 'public class Balloon {\n    private double radius;\n    private String color;\n    public Balloon(double r, String c) {\n        radius = r;\n        color = c;\n    }\n    public void inflate(double amount) {\n        // TODO: add amount to radius.\n    }\n    public void changeColor(String newColor) {\n        color = newColor;\n    }\n    public String toString() {\n        return "Balloon: radius=" + radius + " cm, color=" + color;\n    }\n}\n',
        },
      ],
      sourcePages: [30, 31, 48],
      entryPoint: 'BalloonRunner',
    },
    independent: {
      id: 'd10-independent',
      prompt: {
        en: 'Create DecorationRunner with Balloon(3.0, "White") and Balloon(4.0, "Blue"). Complete inflate in this worksheet\'s own editable Balloon.java and use that implementation here. Inflate only the second by 2.0, change only the first to Gold, then print both.',
        es: 'Crea DecorationRunner con Balloon(3.0, "White") y Balloon(4.0, "Blue"). Completa inflate en el Balloon.java editable de esta hoja y usa aquí esa implementación. Infla solo el segundo en 2.0, cambia solo el primero a Gold e imprime ambos.',
      },
      steps: {
        en: [
          'Implement the blank inflate method in the Balloon.java supplied in this independent workspace; preserve the other methods. Do not rely on a file saved in another worksheet.',
          'Create the two separate balloons with the specified radii and colors; call inflate on the second and changeColor on the first.',
          'Predict the final state of both balloons, then print first and second, one per line. Save both files and run DecorationRunner.',
          'Explain which field each method changes and why inflating the second object does not change the first. Assume nonnegative radii and amounts in centimeters.',
        ],
        es: [
          'Implementa inflate, que está vacío, en el Balloon.java incluido en este espacio independiente; conserva los demás métodos. No dependas de un archivo guardado en otra hoja.',
          'Crea los dos globos separados con los radios y colores indicados; llama inflate sobre el segundo y changeColor sobre el primero.',
          'Predice el estado final de ambos globos y luego imprime primero y segundo, uno por línea. Guarda ambos archivos y ejecuta DecorationRunner.',
          'Explica qué campo cambia cada método y por qué inflar el segundo objeto no cambia el primero. Supone radios y cantidades no negativos en centímetros.',
        ],
      },
      files: [
        {
          name: 'DecorationRunner.java',
          code: 'public class DecorationRunner {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
        {
          name: 'Balloon.java',
          code: 'public class Balloon {\n    private double radius;\n    private String color;\n    public Balloon(double r, String c) {\n        radius = r;\n        color = c;\n    }\n    public void inflate(double amount) {\n        // TODO: add amount to radius.\n    }\n    public void changeColor(String newColor) {\n        color = newColor;\n    }\n    public String toString() {\n        return "Balloon: radius=" + radius + " cm, color=" + color;\n    }\n}\n',
        },
      ],
      sourcePages: [32, 48],
      entryPoint: 'DecorationRunner',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'An instance method acts on its receiver object; different Balloon instances keep separate radius and color fields.',
          'A void mutator updates state without returning a value. Keep printing in the runner rather than inflate.',
        ],
        es: [
          'Un método de instancia actúa sobre su objeto receptor; distintas instancias Balloon mantienen campos radius y color separados.',
          'Un mutador void actualiza estado sin devolver un valor. Conserva la impresión en el runner en lugar de inflate.',
        ],
      },
      guided: {
        en: [
          'Identify radius and color in Balloon.java. Preserve its constructor, changeColor, and toString; implement the blank inflate method.',
          'Create balloon1 as Balloon(5.0, "black") and balloon2 as Balloon(7.0, "Green"). Print both initial objects in that order.',
        ],
        es: [
          'Identifica radius y color en Balloon.java. Conserva su constructor, changeColor y toString; implementa inflate, que está vacío.',
          'Crea balloon1 como Balloon(5.0, "black") y balloon2 como Balloon(7.0, "Green"). Imprime ambos objetos iniciales en ese orden.',
        ],
      },
      independent: {
        en: [
          'Implement the blank inflate method in the Balloon.java supplied in this independent workspace; preserve the other methods. Do not rely on a file saved in another worksheet.',
          'Create the two separate balloons with the specified radii and colors; call inflate on the second and changeColor on the first.',
        ],
        es: [
          'Implementa inflate, que está vacío, en el Balloon.java incluido en este espacio independiente; conserva los demás métodos. No dependas de un archivo guardado en otra hoja.',
          'Crea los dos globos separados con los radios y colores indicados; llama inflate sobre el segundo y changeColor sobre el primero.',
        ],
      },
    },
  },
  {
    id: 'd11',
    topicId: '1.14',
    group: '1.10–1.15',
    title: {
      en: '1.14.6 · Trace a bottle through calls',
      es: '1.14.6 · Trazar una botella mediante llamadas',
    },
    goal: {
      en: 'Trace state changes and distinguish overloaded instance methods.',
      es: 'Trazar cambios de estado y distinguir métodos de instancia sobrecargados.',
    },
    guided: {
      id: 'd11-guided',
      prompt: {
        en: "Investigate the supplied adapted WaterBottle contract, measured in liters: drink(amount) subtracts with a zero minimum; refill(amount) adds with a capacity maximum; refill() fills completely. Predict the template sequence and print the final object once. Output is defined by this helper's toString.",
        es: 'Investiga el contrato adaptado WaterBottle incluido, medido en litros: drink(amount) resta con mínimo cero; refill(amount) suma con máximo en la capacidad; refill() llena por completo. Predice la secuencia de la plantilla e imprime una vez el objeto final. La salida la define toString de este apoyo.',
      },
      steps: {
        en: [
          'Read the helper. Preconditions: capacity > 0, 0 <= initialWater <= capacity, and amount >= 0 for both amount-taking methods. Capacity stays fixed.',
          'Preserve the sequence: start (1.0, 0.4), drink(0.4), refill(0.3), drink(0.3), refill(), drink(0.4), then print once.',
          'Before running, make a table of water and capacity after construction and every call. Distinguish refill() from refill(0.3).',
          'Run and compare the final representation with your trace. In separate experiments on fresh bottles, test drink(2.0) and refill(2.0) to explain both clamps; restore the template afterward.',
        ],
        es: [
          'Lee el apoyo. Precondiciones: capacity > 0, 0 <= initialWater <= capacity y amount >= 0 para ambos métodos que reciben cantidad. La capacidad permanece fija.',
          'Conserva la secuencia: inicia con (1.0, 0.4), drink(0.4), refill(0.3), drink(0.3), refill(), drink(0.4) y luego imprime una vez.',
          'Antes de ejecutar, haz una tabla de agua y capacidad después de construir y de cada llamada. Distingue refill() de refill(0.3).',
          'Ejecuta y compara la representación final con tu traza. En experimentos separados con botellas nuevas, prueba drink(2.0) y refill(2.0) para explicar ambos límites; restaura luego la plantilla.',
        ],
      },
      files: [
        {
          name: 'BottleRunner.java',
          code: 'public class BottleRunner {\n    public static void main(String[] args) {\n        WaterBottle bottle = new WaterBottle(1.0, 0.4);\n        bottle.drink(0.4);\n        bottle.refill(0.3);\n        bottle.drink(0.3);\n        bottle.refill();\n        bottle.drink(0.4);\n        System.out.println(bottle);\n    }\n}\n',
        },
      ],
      sourcePages: [33, 34, 49],
      entryPoint: 'BottleRunner',
    },
    independent: {
      id: 'd11-independent',
      prompt: {
        en: "Create HikeBottle using the adapted WaterBottle helper. Start with capacity 2.0 L and water 0.5 L. Refill by 0.5 L, drink 0.25 L, print, refill completely, and print again. Use this helper's output format.",
        es: 'Crea HikeBottle usando el apoyo adaptado WaterBottle. Inicia con capacidad 2.0 L y agua 0.5 L. Agrega 0.5 L, bebe 0.25 L, imprime, llena por completo e imprime otra vez. Usa el formato de salida de este apoyo.',
      },
      steps: {
        en: [
          'Construct one bottle; track capacity separately from water. Assume capacity > 0 and initial water between zero and capacity.',
          'Use refill(double), drink(double), and refill() in the stated order, printing only at the two required points. Amounts are nonnegative liters; drink clamps at zero and refill(double) clamps at capacity.',
          'Predict both printed lines and every intermediate water value before running. Explain which overload fills completely and why capacity never changes.',
        ],
        es: [
          'Construye una botella; sigue la capacidad por separado del agua. Supone capacidad > 0 y agua inicial entre cero y capacidad.',
          'Usa refill(double), drink(double) y refill() en el orden indicado, imprimiendo solo en los dos puntos requeridos. Las cantidades son litros no negativos; drink limita en cero y refill(double) en la capacidad.',
          'Predice ambas líneas impresas y cada valor intermedio de agua antes de ejecutar. Explica qué sobrecarga llena por completo y por qué nunca cambia la capacidad.',
        ],
      },
      files: [
        {
          name: 'HikeBottle.java',
          code: 'public class HikeBottle {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [35, 49],
      entryPoint: 'HikeBottle',
    },
    helpers: [
      {
        name: 'WaterBottle.java',
        code: 'public class WaterBottle {\n    private double capacity;\n    private double water;\n    // Preconditions: capacity > 0; 0 <= water <= capacity.\n    public WaterBottle(double cap, double initialWater) {\n        capacity = cap;\n        water = initialWater;\n    }\n    // Precondition: amount >= 0.\n    public void drink(double amount) {\n        water = Math.max(0, water - amount);\n    }\n    public void refill(double amount) {\n        water = Math.min(capacity, water + amount);\n    }\n    public void refill() {\n        water = capacity;\n    }\n    public String toString() {\n        return "Water: " + water + " L / Capacity: "\n            + capacity + " L";\n    }\n}\n',
        readOnly: true,
      },
    ],
    guide: {
      concepts: {
        en: [
          'Instance calls can change water while leaving capacity unchanged; trace the state after every call.',
          'Overloads refill() and refill(double) have different effects. The supplied adapted helper clamps water to the interval from zero to capacity.',
        ],
        es: [
          'Las llamadas de instancia pueden cambiar water sin cambiar capacity; traza el estado después de cada llamada.',
          'Las sobrecargas refill() y refill(double) tienen efectos diferentes. El apoyo adaptado incluido limita water al intervalo de cero a capacity.',
        ],
      },
      guided: {
        en: [
          'Read the helper. Preconditions: capacity > 0, 0 <= initialWater <= capacity, and amount >= 0 for both amount-taking methods. Capacity stays fixed.',
          'Preserve the sequence: start (1.0, 0.4), drink(0.4), refill(0.3), drink(0.3), refill(), drink(0.4), then print once.',
        ],
        es: [
          'Lee el apoyo. Precondiciones: capacity > 0, 0 <= initialWater <= capacity y amount >= 0 para ambos métodos que reciben cantidad. La capacidad permanece fija.',
          'Conserva la secuencia: inicia con (1.0, 0.4), drink(0.4), refill(0.3), drink(0.3), refill(), drink(0.4) y luego imprime una vez.',
        ],
      },
      independent: {
        en: [
          'Construct one bottle; track capacity separately from water. Assume capacity > 0 and initial water between zero and capacity.',
          'Use refill(double), drink(double), and refill() in the stated order, printing only at the two required points. Amounts are nonnegative liters; drink clamps at zero and refill(double) clamps at capacity.',
        ],
        es: [
          'Construye una botella; sigue la capacidad por separado del agua. Supone capacidad > 0 y agua inicial entre cero y capacidad.',
          'Usa refill(double), drink(double) y refill() en el orden indicado, imprimiendo solo en los dos puntos requeridos. Las cantidades son litros no negativos; drink limita en cero y refill(double) en la capacidad.',
        ],
      },
    },
  },
  {
    id: 'd12',
    topicId: '1.15',
    group: '1.10–1.15',
    title: {
      en: '1.15.3 · Build and compare name tags',
      es: '1.15.3 · Crear y comparar etiquetas',
    },
    goal: {
      en: 'Use length, substring, and equals while preserving full-line text.',
      es: 'Usar length, substring y equals conservando texto de línea completa.',
    },
    guided: {
      id: 'd12-guided',
      prompt: {
        en: 'Read two nonempty full names. Implement displayNameTag(String name) and call it twice. Each tag prints exactly five lines: **********, the name, "Characters: " plus its length, "Last letter: " plus its final one-character substring, and **********. Finally print "Same name? " plus the result of comparing the two names with equals.',
        es: 'Lee dos nombres completos no vacíos. Implementa displayNameTag(String name) y llámalo dos veces. Cada etiqueta imprime exactamente cinco líneas: **********, el nombre, "Characters: " más su longitud, "Last letter: " más su substring final de un carácter y **********. Finalmente imprime "Same name? " más el resultado de comparar ambos nombres con equals.',
      },
      steps: {
        en: [
          'Read both names with nextLine(); preserve spaces and assume both names are nonempty. No input prompts are required.',
          'Use length() for the count and substring starting at length() - 1 for the final one-character String; spaces count as characters.',
          'Put the five tag-printing statements in the void method displayNameTag and call it for the first name, then the second. Use the exact border and labels specified above.',
          'Compare content with equals, not ==; print the labeled boolean after both tags. Predict and test Karel/Tracy, Ana/Ana, Ana/ana, and Sam Lee/Sam Lee in separate runs. Explain case sensitivity and the last valid index.',
        ],
        es: [
          'Lee ambos nombres con nextLine(); conserva espacios y supone ambos nombres no vacíos. No se requieren preguntas de entrada.',
          'Usa length() para contar y substring desde length() - 1 para obtener el String final de un carácter; los espacios cuentan como caracteres.',
          'Coloca las cinco impresiones de la etiqueta en el método void displayNameTag y llámalo para el primer nombre y luego para el segundo. Usa el borde y las etiquetas exactos indicados arriba.',
          'Compara contenido con equals, no ==; imprime el boolean etiquetado después de ambas etiquetas. Predice y prueba Karel/Tracy, Ana/Ana, Ana/ana y Sam Lee/Sam Lee en ejecuciones separadas. Explica la sensibilidad a mayúsculas y el último índice válido.',
        ],
      },
      files: [
        {
          name: 'NameTagGenerator.java',
          code: 'import java.util.Scanner;\npublic class NameTagGenerator {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        // Read two nonempty full names.\n        // Call displayNameTag twice, then compare with equals.\n    }\n    public static void displayNameTag(String name) {\n        // Print the five required lines.\n    }\n}\n',
        },
      ],
      sourcePages: [36, 37],
      entryPoint: 'NameTagGenerator',
      inputs: 'Karel\nTracy\n\nAna\nAna\n\nAna\nana\n\nSam Lee\nSam Lee',
    },
    independent: {
      id: 'd12-independent',
      prompt: {
        en: 'Create BadgeGenerator. Read two full-line product labels, each at least three characters long. For each label print exactly three lines: the label itself, "Characters: " plus its length, and "First three: " plus its first three characters. After both labels print "Same label? " plus their equals comparison.',
        es: 'Crea BadgeGenerator. Lee dos etiquetas de producto de línea completa, cada una con al menos tres caracteres. Por cada etiqueta imprime exactamente tres líneas: la etiqueta misma, "Characters: " más su longitud y "First three: " más sus primeros tres caracteres. Después de ambas imprime "Same label? " más su comparación con equals.',
      },
      steps: {
        en: [
          'Create a Scanner and read both labels with nextLine(); no input prompts are required. Preserve spaces and case.',
          'Print the required three lines for the first label and then the second. Use length() and substring with a beginning index included and an ending index excluded.',
          'Print the labeled equals result after both sets of lines. Predict and run Notebook/Notebook and Blue pen/blue pen separately.',
          'Explain why the first three characters need a different substring range from the last character, and why equals can distinguish case.',
        ],
        es: [
          'Crea un Scanner y lee ambas etiquetas con nextLine(); no se requieren preguntas de entrada. Conserva espacios y mayúsculas.',
          'Imprime las tres líneas requeridas para la primera etiqueta y luego la segunda. Usa length() y substring con índice inicial incluido e índice final excluido.',
          'Imprime el resultado etiquetado de equals después de ambos grupos de líneas. Predice y ejecuta Notebook/Notebook y Blue pen/blue pen por separado.',
          'Explica por qué los primeros tres caracteres requieren un intervalo substring diferente del último carácter y por qué equals puede distinguir mayúsculas.',
        ],
      },
      files: [
        {
          name: 'BadgeGenerator.java',
          code: 'public class BadgeGenerator {\n    public static void main(String[] args) {\n\n    }\n}\n',
        },
      ],
      sourcePages: [38],
      entryPoint: 'BadgeGenerator',
      inputs: 'Notebook\nNotebook\n\nBlue pen\nblue pen',
    },
    helpers: [],
    guide: {
      concepts: {
        en: [
          'String indexes begin at zero; length() - 1 is the final index for a nonempty String. substring excludes its ending index when one is supplied.',
          'equals compares String content with case sensitivity; a void display method can reuse the same printing steps for different names.',
        ],
        es: [
          'Los índices de String comienzan en cero; length() - 1 es el índice final de un String no vacío. substring excluye su índice final cuando se indica.',
          'equals compara el contenido de String con sensibilidad a mayúsculas; un método de presentación void puede reutilizar las mismas impresiones para distintos nombres.',
        ],
      },
      guided: {
        en: [
          'Read both names with nextLine(); preserve spaces and assume both names are nonempty. No input prompts are required.',
          'Use length() for the count and substring starting at length() - 1 for the final one-character String; spaces count as characters.',
        ],
        es: [
          'Lee ambos nombres con nextLine(); conserva espacios y supone ambos nombres no vacíos. No se requieren preguntas de entrada.',
          'Usa length() para contar y substring desde length() - 1 para obtener el String final de un carácter; los espacios cuentan como caracteres.',
        ],
      },
      independent: {
        en: [
          'Create a Scanner and read both labels with nextLine(); no input prompts are required. Preserve spaces and case.',
          'Print the required three lines for the first label and then the second. Use length() and substring with a beginning index included and an ending index excluded.',
        ],
        es: [
          'Crea un Scanner y lee ambas etiquetas con nextLine(); no se requieren preguntas de entrada. Conserva espacios y mayúsculas.',
          'Imprime las tres líneas requeridas para la primera etiqueta y luego la segunda. Usa length() y substring con índice inicial incluido e índice final excluido.',
        ],
      },
    },
  },
];
