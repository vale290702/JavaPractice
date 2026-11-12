import type { CurriculumUnit } from './types';

export const unit3: CurriculumUnit = {
  id: 'unit-3',
  number: 3,
  title: {
    en: 'Class Creation',
    es: 'Creación de clases',
  },
  description: {
    en: 'Design objects, initialize their state, and write methods with clear responsibilities.',
    es: 'Diseña objetos, inicializa su estado y escribe métodos con responsabilidades claras.',
  },
  topics: [
    {
      id: '3.1',
      sourcePdfPage: 87,
      content: {
        en: {
          title: 'Abstraction and Program Design',
          description: 'Turn a tutoring timer into a small class design.',
          goal: 'Separate stored facts from named actions before writing code.',
          explanation:
            'A useful class represents one idea with a small set of attributes and behaviors. A session timer needs minutes remaining, but its users do not need to know how that number is stored. Calling extend with a parameter names an action and makes it reusable. Start with a short design: what must each object remember, and what may clients ask it to do?',
          takeaway:
            'Attributes describe state; methods give useful actions names.',
          steps: [
            'List the timer’s state: minutes remaining.',
            'Name a behavior: extend by a requested amount.',
            'Use the method without repeating its implementation.',
          ],
          practice:
            'In the example, which identifier names the stored attribute? Enter one identifier.',
          practiceAnswer: 'minutes',
          practiceFeedback: 'minutes stores state; extend names a behavior.',
          practiceHints: [
            'Find the declaration outside the constructor and methods.',
            'Look for the private int field.',
            'The stored number has a time-related name.',
          ],
          question: 'Which design best uses procedural abstraction?',
          choices: [
            'Repeat minutes = minutes + 5 in every client.',
            'Provide extend(int extra) and call it with different values.',
            'Make a new class for each possible duration.',
          ],
          correct: 1,
          feedback:
            'extend gives a process a name and accepts different amounts, so clients can reuse the behavior.',
          challenge:
            'Complete Timer.extend so it adds extra to the stored minutes. Main creates a 20-minute timer, extends it by 5, and prints 25.',
          hints: [
            'Modify the existing minutes field.',
            'Add the parameter extra to its current value.',
            'The method is void because it changes state instead of returning a number.',
          ],
          checklist: [
            'I can identify the timer’s attribute.',
            'I can explain why extend is a behavior.',
            'I can reuse one method with different arguments.',
          ],
        },
        es: {
          title: 'Abstracción y diseño de programas',
          description:
            'Convierte un temporizador de tutoría en un diseño de clase.',
          goal: 'Separa los datos almacenados de las acciones antes de escribir código.',
          explanation:
            'Una clase útil representa una idea mediante unos pocos atributos y comportamientos. Un temporizador necesita recordar los minutos restantes, pero quien lo usa no necesita conocer su almacenamiento interno. Llamar a extend con un parámetro da nombre a una acción reutilizable. Comienza con un diseño breve: ¿qué debe recordar cada objeto y qué acciones podrán solicitarle otras partes del programa?',
          takeaway:
            'Los atributos describen el estado; los métodos dan nombre a acciones útiles.',
          steps: [
            'Enumera el estado: minutos restantes.',
            'Nombra un comportamiento: ampliar la duración.',
            'Usa el método sin repetir su implementación.',
          ],
          practice:
            'En el ejemplo, ¿qué identificador nombra el atributo almacenado? Escribe un identificador.',
          practiceAnswer: 'minutes',
          practiceFeedback:
            'minutes almacena el estado; extend nombra un comportamiento.',
          practiceHints: [
            'Busca la declaración fuera del constructor y los métodos.',
            'Localiza el campo private int.',
            'El número almacenado tiene un nombre relacionado con el tiempo.',
          ],
          question:
            '¿Qué diseño utiliza mejor la abstracción de procedimientos?',
          choices: [
            'Repetir minutes = minutes + 5 en cada cliente.',
            'Ofrecer extend(int extra) y llamarlo con distintos valores.',
            'Crear una clase para cada duración posible.',
          ],
          correct: 1,
          feedback:
            'extend da nombre a un proceso y acepta distintas cantidades, por lo que permite reutilizar el comportamiento.',
          challenge:
            'Completa Timer.extend para sumar extra a los minutos almacenados. Main crea un temporizador de 20 minutos, agrega 5 e imprime 25.',
          hints: [
            'Modifica el campo minutes existente.',
            'Suma el parámetro extra a su valor actual.',
            'El método es void porque cambia el estado sin devolver un número.',
          ],
          checklist: [
            'Puedo identificar el atributo del temporizador.',
            'Puedo explicar por qué extend es un comportamiento.',
            'Puedo reutilizar un método con distintos argumentos.',
          ],
        },
      },
      example: {
        lines: [
          'class Timer {',
          '  private int minutes;',
          '  public Timer(int initial) { minutes = initial; }',
          '  public void extend(int extra) { minutes += extra; }',
          '  public int remaining() { return minutes; }',
          '}',
          'public class Main {',
          '  public static void main(String[] args) {',
          '    Timer timer = new Timer(20);',
          '    timer.extend(5);',
          '    System.out.println(timer.remaining());',
          '  }',
          '}',
        ],
        active: [8, 9, 10],
        output: ['', '', '25'],
        values: {
          en: [
            'timer.minutes = 20',
            'timer.minutes = 25',
            'returned value = 25',
          ],
          es: [
            'timer.minutes = 20',
            'timer.minutes = 25',
            'valor devuelto = 25',
          ],
        },
        solution:
          'class Timer {\n  private int minutes;\n  public Timer(int initial) { minutes = initial; }\n  public void extend(int extra) { minutes += extra; }\n  public int remaining() { return minutes; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Timer timer = new Timer(20);\n    timer.extend(5);\n    System.out.println(timer.remaining());\n  }\n}',
        starter:
          'class Timer {\n  private int minutes;\n  public Timer(int initial) { minutes = initial; }\n  public void extend(int extra) {\n    // Add extra minutes here.\n  }\n  public int remaining() { return minutes; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Timer timer = new Timer(20);\n    timer.extend(5);\n    System.out.println(timer.remaining());\n  }\n}',
      },
    },
    {
      id: '3.2',
      sourcePdfPage: 89,
      content: {
        en: {
          title: 'Impact of Program Design',
          description:
            'Check a seat counter and consider who depends on its answer.',
          goal: 'Connect boundary testing, reliability, and responsible reuse.',
          explanation:
            'A registration program can save time, yet an incorrect seat count can leave a student without a place. Reliability means meeting the stated requirements under the conditions the program promises to support. Test ordinary inputs and boundaries, such as zero remaining seats. Also consider access, unintended effects, and permissions or license conditions when reusing code; a helpful purpose alone does not guarantee a responsible design.',
          takeaway:
            'Test the conditions users depend on, including boundaries.',
          steps: [
            'State the supported range: zero to capacity occupied seats.',
            'Check empty, full, and ordinary registrations.',
            'Consider who is affected if a seat count is incorrect.',
          ],
          practice:
            'For capacity 8 and occupied 8, what integer does seatsLeft return?',
          practiceAnswer: '0',
          practiceFeedback:
            '8 - 8 is 0; a full session has no remaining seats.',
          practiceHints: [
            'Use the subtraction in seatsLeft.',
            'Substitute 8 for both parameters.',
            'A full session has zero open places.',
          ],
          question:
            'Which check most directly tests the full-session boundary?',
          choices: ['seatsLeft(8, 3)', 'seatsLeft(8, 8)', 'seatsLeft(100, 1)'],
          correct: 1,
          feedback:
            'Equal capacity and occupancy tests the boundary where the remaining-seat count becomes zero.',
          challenge:
            'Implement seatsLeft as capacity minus occupied. Assume 0 <= occupied <= capacity. Print the results for (8, 0), (8, 8), and (8, 3): 8, 0, and 5 on separate lines.',
          hints: [
            'The contract guarantees valid nonnegative occupancy.',
            'Return a difference; printing belongs in main.',
            'Check both ends of the supported occupancy range.',
          ],
          checklist: [
            'I can name a consequence of an incorrect count.',
            'I can test empty and full sessions.',
            'I can check permission or license terms before reusing code.',
          ],
        },
        es: {
          title: 'Impacto del diseño de programas',
          description:
            'Verifica un contador de cupos y considera quién depende de su respuesta.',
          goal: 'Relaciona las pruebas de límites, la confiabilidad y la reutilización responsable.',
          explanation:
            'Un programa de inscripción puede ahorrar tiempo, pero un conteo incorrecto de cupos puede dejar a un estudiante sin lugar. La confiabilidad consiste en cumplir los requisitos bajo las condiciones que el programa promete admitir. Prueba entradas normales y límites, como una sesión llena. Considera también el acceso, los efectos imprevistos y los permisos o condiciones de licencia al reutilizar código ajeno.',
          takeaway:
            'Prueba las condiciones de las que dependen los usuarios, incluidos los límites.',
          steps: [
            'Define el rango admitido: entre cero y la capacidad de personas inscritas.',
            'Comprueba inscripciones vacías, completas e intermedias.',
            'Considera quién resulta afectado por un conteo incorrecto.',
          ],
          practice:
            'Con capacidad 8 y ocupación 8, ¿qué entero devuelve seatsLeft?',
          practiceAnswer: '0',
          practiceFeedback:
            '8 - 8 es 0; una sesión llena no tiene cupos disponibles.',
          practiceHints: [
            'Usa la resta de seatsLeft.',
            'Sustituye ambos parámetros por 8.',
            'Una sesión llena tiene cero lugares abiertos.',
          ],
          question:
            '¿Qué prueba revisa directamente el límite de una sesión llena?',
          choices: ['seatsLeft(8, 3)', 'seatsLeft(8, 8)', 'seatsLeft(100, 1)'],
          correct: 1,
          feedback:
            'Una capacidad igual a la ocupación prueba el límite donde los cupos restantes llegan a cero.',
          challenge:
            'Implementa seatsLeft como capacidad menos ocupación. Supón 0 <= occupied <= capacity. Imprime los resultados de (8, 0), (8, 8) y (8, 3): 8, 0 y 5 en líneas separadas.',
          hints: [
            'El contrato garantiza una ocupación válida y no negativa.',
            'Devuelve una diferencia; main se encarga de imprimir.',
            'Comprueba ambos extremos del rango admitido.',
          ],
          checklist: [
            'Puedo nombrar una consecuencia de un conteo incorrecto.',
            'Puedo probar sesiones vacías y llenas.',
            'Puedo revisar permisos o licencias antes de reutilizar código.',
          ],
        },
      },
      example: {
        lines: [
          'public class Main {',
          '  public static int seatsLeft(int capacity, int occupied) {',
          '    return capacity - occupied;',
          '  }',
          '  public static void main(String[] args) {',
          '    System.out.println(seatsLeft(8, 0));',
          '    System.out.println(seatsLeft(8, 8));',
          '    System.out.println(seatsLeft(8, 3));',
          '  }',
          '}',
        ],
        active: [5, 6, 7],
        output: ['8', '8\n0', '8\n0\n5'],
        values: {
          en: [
            'capacity = 8; occupied = 0',
            'capacity = 8; occupied = 8',
            'capacity = 8; occupied = 3',
          ],
          es: [
            'capacity = 8; occupied = 0',
            'capacity = 8; occupied = 8',
            'capacity = 8; occupied = 3',
          ],
        },
        solution:
          'public class Main {\n  public static int seatsLeft(int capacity, int occupied) {\n    return capacity - occupied;\n  }\n  public static void main(String[] args) {\n    System.out.println(seatsLeft(8, 0));\n    System.out.println(seatsLeft(8, 8));\n    System.out.println(seatsLeft(8, 3));\n  }\n}',
        starter:
          'public class Main {\n  public static int seatsLeft(int capacity, int occupied) {\n    // Replace this placeholder with the seat calculation.\n    return 0;\n  }\n  public static void main(String[] args) {\n    System.out.println(seatsLeft(8, 0));\n    System.out.println(seatsLeft(8, 8));\n    System.out.println(seatsLeft(8, 3));\n  }\n}',
      },
    },
    {
      id: '3.3',
      sourcePdfPage: 90,
      content: {
        en: {
          title: 'Anatomy of a Class',
          description:
            'Find fields, a constructor, and methods in a points card.',
          goal: 'Protect an object’s data while exposing useful operations.',
          explanation:
            'A class combines data with the operations that use it. Each PointsCard object owns a separate points field. The constructor establishes its starting state, while public methods provide an interface for clients. Marking the field private prevents other classes from changing it directly. This encapsulation makes the class responsible for how its state is read and changed, so implementation details stay behind the interface.',
          takeaway:
            'Keep instance data private and offer deliberate public operations.',
          steps: [
            'Locate points outside every method.',
            'Identify the constructor by its class name and lack of return type.',
            'Follow public add and getPoints through the object.',
          ],
          practice:
            'Which Java keyword prevents Main from directly accessing PointsCard.points?',
          practiceAnswer: 'private',
          practiceFeedback:
            'private restricts direct access to code inside PointsCard.',
          practiceHints: [
            'Inspect the field declaration.',
            'The access modifier appears before int.',
            'Choose the restrictive modifier, not public.',
          ],
          question:
            'Which statement correctly describes two PointsCard objects?',
          choices: [
            'They must share their points field.',
            'Each object has its own points field.',
            'Private fields cannot change.',
          ],
          correct: 1,
          feedback:
            'points is an instance field, so each object owns its own value; private limits access, not mutation.',
          challenge:
            'Complete PointsCard with a private points field, a constructor starting it at 2, add(int amount), and getPoints(). The supplied client should print 6.',
          hints: [
            'Declare points once in the class body.',
            'The constructor sets points to 2; add increases it by amount.',
            'getPoints must return an int without changing the field.',
          ],
          checklist: [
            'I can distinguish a field from a method.',
            'I can recognize the constructor.',
            'I can explain why private data supports encapsulation.',
          ],
        },
        es: {
          title: 'Anatomía de una clase',
          description:
            'Localiza campos, un constructor y métodos en una tarjeta de puntos.',
          goal: 'Protege los datos del objeto y ofrece operaciones útiles.',
          explanation:
            'Una clase combina datos con las operaciones que los utilizan. Cada objeto PointsCard posee un campo points independiente. El constructor establece el estado inicial y los métodos public ofrecen una interfaz para otras clases. Declarar el campo private impide modificarlo directamente desde otra clase. Esta encapsulación hace que la clase controle cómo se consultan y cambian sus datos, manteniendo los detalles internos detrás de su interfaz.',
          takeaway:
            'Mantén privados los datos de instancia y ofrece operaciones públicas deliberadas.',
          steps: [
            'Localiza points fuera de todos los métodos.',
            'Identifica el constructor por el nombre de la clase y la ausencia de tipo de retorno.',
            'Sigue las llamadas públicas add y getPoints.',
          ],
          practice:
            '¿Qué palabra clave de Java impide que Main acceda directamente a PointsCard.points?',
          practiceAnswer: 'private',
          practiceFeedback:
            'private restringe el acceso directo al código dentro de PointsCard.',
          practiceHints: [
            'Inspecciona la declaración del campo.',
            'El modificador de acceso aparece antes de int.',
            'Elige el modificador restrictivo, no public.',
          ],
          question:
            '¿Qué afirmación describe correctamente dos objetos PointsCard?',
          choices: [
            'Deben compartir su campo points.',
            'Cada objeto posee su propio campo points.',
            'Los campos privados no pueden cambiar.',
          ],
          correct: 1,
          feedback:
            'points es un campo de instancia: cada objeto tiene su valor. private limita el acceso, no los cambios.',
          challenge:
            'Completa PointsCard con un campo privado points, un constructor que lo inicie en 2, add(int amount) y getPoints(). El cliente debe imprimir 6.',
          hints: [
            'Declara points una sola vez dentro de la clase.',
            'El constructor asigna 2; add incrementa points en amount.',
            'getPoints debe devolver un int sin modificar el campo.',
          ],
          checklist: [
            'Puedo distinguir un campo de un método.',
            'Puedo reconocer el constructor.',
            'Puedo explicar cómo los datos privados apoyan la encapsulación.',
          ],
        },
      },
      example: {
        lines: [
          'class PointsCard {',
          '  private int points;',
          '  public PointsCard() { points = 2; }',
          '  public void add(int amount) { points += amount; }',
          '  public int getPoints() { return points; }',
          '}',
          'public class Main {',
          '  public static void main(String[] args) {',
          '    PointsCard card = new PointsCard();',
          '    card.add(4);',
          '    System.out.println(card.getPoints());',
          '  }',
          '}',
        ],
        active: [8, 9, 10],
        output: ['', '', '6'],
        values: {
          en: ['card.points = 2', 'card.points = 6', 'returned value = 6'],
          es: ['card.points = 2', 'card.points = 6', 'valor devuelto = 6'],
        },
        solution:
          'class PointsCard {\n  private int points;\n  public PointsCard() { points = 2; }\n  public void add(int amount) { points += amount; }\n  public int getPoints() { return points; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    PointsCard card = new PointsCard();\n    card.add(4);\n    System.out.println(card.getPoints());\n  }\n}',
        starter:
          'class PointsCard {\n  // Declare the private points field.\n  public PointsCard() {\n    // Initialize the field.\n  }\n  public void add(int amount) {\n    // Update the field.\n  }\n  public int getPoints() {\n    return 0; // Replace with the stored value.\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    PointsCard card = new PointsCard();\n    card.add(4);\n    System.out.println(card.getPoints());\n  }\n}',
      },
    },
    {
      id: '3.4',
      sourcePdfPage: 91,
      content: {
        en: {
          title: 'Constructors',
          description: 'Give each reading goal its own starting state.',
          goal: 'Initialize fields from constructor parameters.',
          explanation:
            'A constructor runs when new creates an object. It has the class’s name and no return type, and it sets the initial field values. Two calls with different arguments create two independent states. If you declare no constructor, Java supplies a no-parameter constructor with default field values. Once you write a constructor, Java no longer automatically supplies that no-parameter version.',
          takeaway:
            'A constructor establishes state; its name must match the class.',
          steps: [
            'Match the constructor name to ReadingGoal.',
            'Copy startPages into the pages field.',
            'Create two goals and compare their independent values.',
          ],
          practice:
            'What does first.getPages() return after new ReadingGoal(12)?',
          practiceAnswer: '12',
          practiceFeedback:
            'The constructor copies startPages, which is 12, into first’s pages field.',
          practiceHints: [
            'Find the argument in new ReadingGoal(12).',
            'That argument becomes the parameter startPages.',
            'The constructor assigns startPages to pages.',
          ],
          question:
            'A class declares only ReadingGoal(int startPages). Which expression is valid?',
          choices: [
            'new ReadingGoal()',
            'new ReadingGoal(12)',
            'ReadingGoal.new(12)',
          ],
          correct: 1,
          feedback:
            'The declared constructor requires one int argument; Java does not add a no-parameter constructor here.',
          challenge:
            'Complete ReadingGoal(int startPages) to initialize pages. Keep the accessor and client unchanged; print 12 and 30 on separate lines.',
          hints: [
            'The constructor must have no return type.',
            'Use the existing pages field rather than declaring a local pages variable.',
            'Assign startPages to pages so different arguments create different states.',
          ],
          checklist: [
            'I can write a constructor header.',
            'I can initialize an instance field from a parameter.',
            'I know when Java supplies a default constructor.',
          ],
        },
        es: {
          title: 'Constructores',
          description:
            'Asigna un estado inicial independiente a cada meta de lectura.',
          goal: 'Inicializa campos a partir de parámetros del constructor.',
          explanation:
            'Un constructor se ejecuta cuando new crea un objeto. Tiene el nombre de la clase, carece de tipo de retorno y establece los valores iniciales de los campos. Dos llamadas con argumentos diferentes crean estados independientes. Si no declaras ningún constructor, Java proporciona uno sin parámetros con valores predeterminados. Cuando escribes un constructor, Java deja de proporcionar automáticamente esa versión sin parámetros.',
          takeaway:
            'Un constructor establece el estado; su nombre debe coincidir con el de la clase.',
          steps: [
            'Haz coincidir el nombre del constructor con ReadingGoal.',
            'Copia startPages al campo pages.',
            'Crea dos metas y compara sus valores independientes.',
          ],
          practice:
            '¿Qué devuelve first.getPages() después de new ReadingGoal(12)?',
          practiceAnswer: '12',
          practiceFeedback:
            'El constructor copia startPages, que vale 12, al campo pages de first.',
          practiceHints: [
            'Busca el argumento de new ReadingGoal(12).',
            'Ese argumento se convierte en el parámetro startPages.',
            'El constructor asigna startPages a pages.',
          ],
          question:
            'Una clase declara solo ReadingGoal(int startPages). ¿Qué expresión es válida?',
          choices: [
            'new ReadingGoal()',
            'new ReadingGoal(12)',
            'ReadingGoal.new(12)',
          ],
          correct: 1,
          feedback:
            'El constructor declarado requiere un argumento int; Java no agrega aquí un constructor sin parámetros.',
          challenge:
            'Completa ReadingGoal(int startPages) para inicializar pages. Conserva el accesor y el cliente; imprime 12 y 30 en líneas separadas.',
          hints: [
            'El constructor no debe tener tipo de retorno.',
            'Usa el campo pages existente, sin declarar una variable local pages.',
            'Asigna startPages a pages para obtener estados distintos según el argumento.',
          ],
          checklist: [
            'Puedo escribir la cabecera de un constructor.',
            'Puedo inicializar un campo de instancia con un parámetro.',
            'Sé cuándo Java proporciona un constructor predeterminado.',
          ],
        },
      },
      example: {
        lines: [
          'class ReadingGoal {',
          '  private int pages;',
          '  public ReadingGoal(int startPages) { pages = startPages; }',
          '  public int getPages() { return pages; }',
          '}',
          'public class Main {',
          '  public static void main(String[] args) {',
          '    ReadingGoal first = new ReadingGoal(12);',
          '    ReadingGoal second = new ReadingGoal(30);',
          '    System.out.println(first.getPages());',
          '    System.out.println(second.getPages());',
          '  }',
          '}',
        ],
        active: [7, 8, 10],
        output: ['', '', '12\n30'],
        values: {
          en: [
            'first.pages = 12',
            'first.pages = 12; second.pages = 30',
            'first.pages = 12; second.pages = 30',
          ],
          es: [
            'first.pages = 12',
            'first.pages = 12; second.pages = 30',
            'first.pages = 12; second.pages = 30',
          ],
        },
        solution:
          'class ReadingGoal {\n  private int pages;\n  public ReadingGoal(int startPages) { pages = startPages; }\n  public int getPages() { return pages; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    ReadingGoal first = new ReadingGoal(12);\n    ReadingGoal second = new ReadingGoal(30);\n    System.out.println(first.getPages());\n    System.out.println(second.getPages());\n  }\n}',
        starter:
          'class ReadingGoal {\n  private int pages;\n  public ReadingGoal(int startPages) {\n    // Initialize pages from the parameter.\n  }\n  public int getPages() { return pages; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    ReadingGoal first = new ReadingGoal(12);\n    ReadingGoal second = new ReadingGoal(30);\n    System.out.println(first.getPages());\n    System.out.println(second.getPages());\n  }\n}',
      },
    },
    {
      id: '3.5',
      sourcePdfPage: 92,
      content: {
        en: {
          title: 'Methods: How to Write Them',
          description: 'Update a score and return its current value.',
          goal: 'Choose parameter types and return types that match a behavior.',
          explanation:
            'A method header states who may call it, what it returns, and which inputs it accepts. A void method can update an object without producing a return value. An accessor returns a value using an expression compatible with its declared type. Primitive arguments are copied into parameters, so changing a parameter alone does not change the caller’s variable. Keep returned values separate from console output.',
          takeaway: 'Use void for a command and a return type for a result.',
          steps: [
            'Read add’s int parameter as a copied input.',
            'Update the score field inside the void method.',
            'Return score from the int accessor and print it in main.',
          ],
          practice:
            'After a score starts at 0 and add(7) is called, what does getScore() return?',
          practiceAnswer: '7',
          practiceFeedback:
            'add increases the stored score by 7; the accessor returns that updated value.',
          practiceHints: [
            'Begin with the field’s initial value, 0.',
            'Apply score += amount with amount equal to 7.',
            'getScore returns the field, not the parameter.',
          ],
          question:
            'Which header fits a method that returns the current integer score?',
          choices: [
            'public void getScore()',
            'public int getScore()',
            'public getScore(int)',
          ],
          correct: 1,
          feedback:
            'The accessor needs an int return type and a return statement with the stored score.',
          challenge:
            'Implement add(int amount) and getScore() in Score. Add 7 to the initial score of 0 and print 7 using the supplied main.',
          hints: [
            'add changes score and has no returned result.',
            'getScore reads score without modifying it.',
            'Use return score in the accessor; do not print inside it.',
          ],
          checklist: [
            'I can match a method header to its task.',
            'I can distinguish a return from printing.',
            'I can explain why primitive parameters are copies.',
          ],
        },
        es: {
          title: 'Métodos: cómo escribirlos',
          description: 'Actualiza un puntaje y devuelve su valor actual.',
          goal: 'Elige tipos de parámetros y de retorno adecuados para un comportamiento.',
          explanation:
            'La cabecera de un método indica quién puede llamarlo, qué devuelve y qué entradas acepta. Un método void puede actualizar un objeto sin producir un valor de retorno. Un accesor devuelve una expresión compatible con su tipo declarado. Los argumentos primitivos se copian en los parámetros, por lo que cambiar solo el parámetro no cambia la variable del llamador. Distingue entre devolver valores e imprimirlos.',
          takeaway:
            'Usa void para una acción y un tipo de retorno para un resultado.',
          steps: [
            'Interpreta el parámetro int de add como una entrada copiada.',
            'Actualiza el campo score dentro del método void.',
            'Devuelve score desde el accesor int e imprímelo en main.',
          ],
          practice:
            'Si el puntaje comienza en 0 y se llama a add(7), ¿qué devuelve getScore()?',
          practiceAnswer: '7',
          practiceFeedback:
            'add aumenta el puntaje almacenado en 7; el accesor devuelve ese valor actualizado.',
          practiceHints: [
            'Comienza con el valor inicial del campo: 0.',
            'Aplica score += amount con amount igual a 7.',
            'getScore devuelve el campo, no el parámetro.',
          ],
          question:
            '¿Qué cabecera corresponde a un método que devuelve el puntaje entero actual?',
          choices: [
            'public void getScore()',
            'public int getScore()',
            'public getScore(int)',
          ],
          correct: 1,
          feedback:
            'El accesor necesita el tipo de retorno int y una sentencia return con el puntaje almacenado.',
          challenge:
            'Implementa add(int amount) y getScore() en Score. Suma 7 al puntaje inicial 0 e imprime 7 mediante el main proporcionado.',
          hints: [
            'add modifica score y no devuelve un resultado.',
            'getScore consulta score sin modificarlo.',
            'Usa return score en el accesor; no imprimas dentro de él.',
          ],
          checklist: [
            'Puedo relacionar una cabecera con su tarea.',
            'Puedo distinguir devolver de imprimir.',
            'Puedo explicar por qué los parámetros primitivos son copias.',
          ],
        },
      },
      example: {
        lines: [
          'class Score {',
          '  private int score = 0;',
          '  public void add(int amount) { score += amount; }',
          '  public int getScore() { return score; }',
          '}',
          'public class Main {',
          '  public static void main(String[] args) {',
          '    Score game = new Score();',
          '    game.add(7);',
          '    System.out.println(game.getScore());',
          '  }',
          '}',
        ],
        active: [7, 8, 9],
        output: ['', '', '7'],
        values: {
          en: ['game.score = 0', 'game.score = 7', 'returned value = 7'],
          es: ['game.score = 0', 'game.score = 7', 'valor devuelto = 7'],
        },
        solution:
          'class Score {\n  private int score = 0;\n  public void add(int amount) { score += amount; }\n  public int getScore() { return score; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Score game = new Score();\n    game.add(7);\n    System.out.println(game.getScore());\n  }\n}',
        starter:
          'class Score {\n  private int score = 0;\n  public void add(int amount) {\n    // Change the score here.\n  }\n  public int getScore() {\n    return 0; // Replace this placeholder.\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Score game = new Score();\n    game.add(7);\n    System.out.println(game.getScore());\n  }\n}',
      },
    },
    {
      id: '3.6',
      sourcePdfPage: 94,
      content: {
        en: {
          title: 'Methods: Passing and Returning References of an Object',
          description: 'Trace a shared counter through a method call.',
          goal: 'Distinguish a copied reference from a copied object.',
          explanation:
            'Java passes every argument by value. For an object argument, the copied value is a reference, so the parameter can still reach the same object as the caller. A method may change that object through its public methods when its specification allows it. Returning the parameter returns another reference to that same object. Reassigning the parameter, however, would not replace the caller’s variable.',
          takeaway:
            'A copied reference can share one mutable object; it does not clone it.',
          steps: [
            'Create one Counter and store its reference in original.',
            'Pass a copied reference into boost and mutate the shared counter.',
            'Return that reference and compare it with the original reference.',
          ],
          practice:
            'After boost(original) adds 3 to a counter starting at 4, what does original.get() return?',
          practiceAnswer: '7',
          practiceFeedback:
            'The parameter and original refer to the same counter, whose value changes from 4 to 7.',
          practiceHints: [
            'No new Counter is created inside boost.',
            'target.add(3) changes the existing object.',
            'Add 3 to its initial value of 4.',
          ],
          question: 'Why does original == result evaluate to true?',
          choices: [
            'The counter was cloned.',
            'Both variables refer to the same object.',
            'All Counter objects compare equal with ==.',
          ],
          correct: 1,
          feedback:
            'boost returns its parameter reference, so both variables identify the same counter; == compares references here.',
          challenge:
            'Complete boost to add 3 to its Counter parameter and return that same reference. Main should print 7 and then true.',
          hints: [
            'Use target.add(3) to mutate the permitted object.',
            'Return target instead of constructing another Counter.',
            'Do not reassign target to a replacement object.',
          ],
          checklist: [
            'I can trace two references to one object.',
            'I can distinguish mutation from parameter reassignment.',
            'I can explain a returned reference without assuming a clone.',
          ],
        },
        es: {
          title: 'Métodos: pasar y devolver referencias a un objeto',
          description: 'Sigue un contador compartido durante una llamada.',
          goal: 'Distingue una referencia copiada de un objeto copiado.',
          explanation:
            'Java pasa todos los argumentos por valor. Para un objeto, el valor copiado es una referencia, así que el parámetro puede alcanzar el mismo objeto que el llamador. El método puede modificarlo mediante sus métodos públicos cuando la especificación lo permite. Devolver el parámetro devuelve otra referencia al mismo objeto. Sin embargo, reasignar el parámetro no reemplazaría la variable del llamador.',
          takeaway:
            'Una referencia copiada puede compartir un objeto mutable; no lo clona.',
          steps: [
            'Crea un Counter y guarda su referencia en original.',
            'Pasa una referencia copiada a boost y modifica el contador compartido.',
            'Devuelve esa referencia y compárala con la original.',
          ],
          practice:
            'Si boost(original) suma 3 a un contador que empieza en 4, ¿qué devuelve original.get()?',
          practiceAnswer: '7',
          practiceFeedback:
            'El parámetro y original apuntan al mismo contador, cuyo valor cambia de 4 a 7.',
          practiceHints: [
            'No se crea otro Counter dentro de boost.',
            'target.add(3) modifica el objeto existente.',
            'Suma 3 al valor inicial 4.',
          ],
          question: '¿Por qué original == result produce true?',
          choices: [
            'El contador fue clonado.',
            'Ambas variables se refieren al mismo objeto.',
            'Todos los objetos Counter son iguales con ==.',
          ],
          correct: 1,
          feedback:
            'boost devuelve la referencia de su parámetro, por lo que ambas variables identifican el mismo contador; aquí == compara referencias.',
          challenge:
            'Completa boost para sumar 3 al Counter recibido y devolver esa misma referencia. Main debe imprimir 7 y luego true.',
          hints: [
            'Usa target.add(3) para modificar el objeto según lo permitido.',
            'Devuelve target en lugar de construir otro Counter.',
            'No reasignes target a un objeto de reemplazo.',
          ],
          checklist: [
            'Puedo seguir dos referencias a un objeto.',
            'Puedo distinguir mutación de reasignación del parámetro.',
            'Puedo explicar una referencia devuelta sin suponer una clonación.',
          ],
        },
      },
      example: {
        lines: [
          'class Counter {',
          '  private int value;',
          '  public Counter(int start) { value = start; }',
          '  public void add(int amount) { value += amount; }',
          '  public int get() { return value; }',
          '}',
          'public class Main {',
          '  public static Counter boost(Counter target) {',
          '    target.add(3);',
          '    return target;',
          '  }',
          '  public static void main(String[] args) {',
          '    Counter original = new Counter(4);',
          '    Counter result = boost(original);',
          '    System.out.println(original.get());',
          '    System.out.println(original == result);',
          '  }',
          '}',
        ],
        active: [12, 13, 15],
        output: ['', '', '7\ntrue'],
        values: {
          en: [
            'original.value = 4',
            'original.value = 7; result == original',
            'one Counter; value = 7',
          ],
          es: [
            'original.value = 4',
            'original.value = 7; result == original',
            'un Counter; value = 7',
          ],
        },
        solution:
          'class Counter {\n  private int value;\n  public Counter(int start) { value = start; }\n  public void add(int amount) { value += amount; }\n  public int get() { return value; }\n}\npublic class Main {\n  public static Counter boost(Counter target) {\n    target.add(3);\n    return target;\n  }\n  public static void main(String[] args) {\n    Counter original = new Counter(4);\n    Counter result = boost(original);\n    System.out.println(original.get());\n    System.out.println(original == result);\n  }\n}',
        starter:
          'class Counter {\n  private int value;\n  public Counter(int start) { value = start; }\n  public void add(int amount) { value += amount; }\n  public int get() { return value; }\n}\npublic class Main {\n  public static Counter boost(Counter target) {\n    // Mutate the counter, then return its reference.\n    return null;\n  }\n  public static void main(String[] args) {\n    Counter original = new Counter(4);\n    Counter result = boost(original);\n    System.out.println(original.get());\n    System.out.println(original == result);\n  }\n}',
      },
    },
    {
      id: '3.7',
      sourcePdfPage: 95,
      content: {
        en: {
          title: 'Class Variables and Methods',
          description:
            'Count all badges while keeping each badge’s label separate.',
          goal: 'Use static for shared state and class-level operations.',
          explanation:
            'An instance field belongs to one object, but a static field has one shared copy for the class. A constructor can increment that shared count whenever a badge is created. A static method can read the count without choosing a particular badge. It cannot directly read an instance label without an object reference. A final field cannot be reassigned after initialization; static final often describes a shared constant.',
          takeaway:
            'Instance state belongs to an object; static state belongs to its class.',
          steps: [
            'Separate each badge’s label from the shared created count.',
            'Increment created once during each construction.',
            'Read the total using Badge.getCreated(), a class method.',
          ],
          practice:
            'If created starts at 0 and two Badge objects are constructed, what does Badge.getCreated() return?',
          practiceAnswer: '2',
          practiceFeedback:
            'Both constructors increment the same static field, producing a shared count of 2.',
          practiceHints: [
            'There is one created field for the entire class.',
            'Each constructor adds 1 to that shared value.',
            'Count the two new Badge expressions.',
          ],
          question:
            'Which declaration makes a single shared count for all badges?',
          choices: [
            'private int created;',
            'private static int created;',
            'private final int created;',
          ],
          correct: 1,
          feedback:
            'static creates class-level storage. final alone prevents reassignment but does not make a field shared.',
          challenge:
            'Complete the Badge constructor to store its label and increment the shared created count. Complete getCreated(). The client should print 2.',
          hints: [
            'Keep label as an instance field so badges retain separate names.',
            'Increment the existing static created field once per constructor call.',
            'The static accessor returns created and is called using Badge.',
          ],
          checklist: [
            'I can distinguish static and instance fields.',
            'I can call a static accessor with the class name.',
            'I know final and static describe different properties.',
          ],
        },
        es: {
          title: 'Variables y métodos de clase',
          description:
            'Cuenta todas las insignias y conserva una etiqueta independiente para cada una.',
          goal: 'Usa static para datos compartidos y operaciones de clase.',
          explanation:
            'Un campo de instancia pertenece a un objeto; un campo static tiene una sola copia compartida por la clase. Un constructor puede aumentar ese conteo cada vez que crea una insignia. Un método static consulta el total sin elegir una insignia específica. No puede leer directamente una etiqueta de instancia sin una referencia a un objeto. Un campo final no puede reasignarse después de inicializarlo.',
          takeaway:
            'El estado de instancia pertenece al objeto; el estado static pertenece a la clase.',
          steps: [
            'Separa la etiqueta de cada insignia del conteo compartido created.',
            'Incrementa created una vez en cada construcción.',
            'Consulta el total con Badge.getCreated(), un método de clase.',
          ],
          practice:
            'Si created comienza en 0 y se construyen dos objetos Badge, ¿qué devuelve Badge.getCreated()?',
          practiceAnswer: '2',
          practiceFeedback:
            'Ambos constructores incrementan el mismo campo static y producen un conteo compartido de 2.',
          practiceHints: [
            'Existe un solo campo created para toda la clase.',
            'Cada constructor suma 1 al valor compartido.',
            'Cuenta las dos expresiones new Badge.',
          ],
          question:
            '¿Qué declaración crea un solo conteo compartido por todas las insignias?',
          choices: [
            'private int created;',
            'private static int created;',
            'private final int created;',
          ],
          correct: 1,
          feedback:
            'static crea almacenamiento de clase. final por sí solo impide reasignar, pero no comparte el campo.',
          challenge:
            'Completa el constructor Badge para guardar su etiqueta e incrementar created. Completa getCreated(). El cliente debe imprimir 2.',
          hints: [
            'Conserva label como campo de instancia para mantener nombres independientes.',
            'Incrementa el campo static created existente una vez por construcción.',
            'El accesor static devuelve created y se llama mediante Badge.',
          ],
          checklist: [
            'Puedo distinguir campos static y de instancia.',
            'Puedo llamar un accesor static con el nombre de la clase.',
            'Sé que final y static describen propiedades distintas.',
          ],
        },
      },
      example: {
        lines: [
          'class Badge {',
          '  private String label;',
          '  private static int created = 0;',
          '  public Badge(String text) { label = text; created++; }',
          '  public static int getCreated() { return created; }',
          '}',
          'public class Main {',
          '  public static void main(String[] args) {',
          '    Badge first = new Badge("Reader");',
          '    Badge second = new Badge("Helper");',
          '    System.out.println(Badge.getCreated());',
          '  }',
          '}',
        ],
        active: [8, 9, 10],
        output: ['', '', '2'],
        values: {
          en: [
            'Badge.created = 1; first.label = Reader',
            'Badge.created = 2; second.label = Helper',
            'shared count = 2',
          ],
          es: [
            'Badge.created = 1; first.label = Reader',
            'Badge.created = 2; second.label = Helper',
            'contador compartido = 2',
          ],
        },
        solution:
          'class Badge {\n  private String label;\n  private static int created = 0;\n  public Badge(String text) { label = text; created++; }\n  public static int getCreated() { return created; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Badge first = new Badge("Reader");\n    Badge second = new Badge("Helper");\n    System.out.println(Badge.getCreated());\n  }\n}',
        starter:
          'class Badge {\n  private String label;\n  private static int created = 0;\n  public Badge(String text) {\n    // Store the label and update the shared count.\n  }\n  public static int getCreated() {\n    return 0; // Replace this placeholder.\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Badge first = new Badge("Reader");\n    Badge second = new Badge("Helper");\n    System.out.println(Badge.getCreated());\n  }\n}',
      },
    },
    {
      id: '3.8',
      sourcePdfPage: 96,
      content: {
        en: {
          title: 'Scope and Access',
          description:
            'Separate a method parameter, a local result, and a stored field.',
          goal: 'Resolve variable names using their declaring blocks.',
          explanation:
            'A variable’s scope is the region where its name can be used. A method parameter and a local variable belong to that method’s block; they do not become fields. If a parameter shares a field’s name, the simple name selects the parameter inside that method. A field remains part of the object after a method returns, while a local calculation does not automatically update it.',
          takeaway:
            'Local calculations affect stored state only when you assign to the field.',
          steps: [
            'Identify the field base in the class body.',
            'Treat the parameter extra and variable result as local to preview.',
            'Return the temporary calculation without assigning to base.',
          ],
          practice:
            'If base is 10, what does getBase() return after preview(4)?',
          practiceAnswer: '10',
          practiceFeedback:
            'preview computes and returns 14 but never assigns a new value to the field base.',
          practiceHints: [
            'Locate all assignments to base.',
            'The preview method assigns only to its local result.',
            'Returning a calculation does not store it in base.',
          ],
          question: 'Where can the local variable result be used?',
          choices: [
            'Anywhere in Main.',
            'Inside preview after its declaration.',
            'Inside every method of Level.',
          ],
          correct: 1,
          feedback:
            'result is declared inside preview’s block, so its name is available there after declaration, not in other methods.',
          challenge:
            'Complete preview(int extra) using a local int result equal to base + extra, then return result. Do not change base. Main should print 14 and then 10.',
          hints: [
            'Declare result inside preview, without public or private.',
            'Compute base + extra into result.',
            'Return the local result and leave the base field unchanged.',
          ],
          checklist: [
            'I can identify a local variable’s block.',
            'I can distinguish local values from persistent fields.',
            'I know a parameter can shadow a field with the same name.',
          ],
        },
        es: {
          title: 'Alcance y acceso',
          description:
            'Separa un parámetro, un resultado local y un campo almacenado.',
          goal: 'Resuelve los nombres de variables según sus bloques de declaración.',
          explanation:
            'El alcance de una variable es la región donde puede utilizarse su nombre. Un parámetro y una variable local pertenecen al bloque del método; no se convierten en campos. Si un parámetro comparte nombre con un campo, el nombre simple selecciona el parámetro dentro del método. El campo permanece en el objeto después del retorno, pero un cálculo local no lo actualiza automáticamente.',
          takeaway:
            'Un cálculo local modifica el estado almacenado solo si asignas el resultado al campo.',
          steps: [
            'Identifica el campo base en el cuerpo de la clase.',
            'Considera extra y result como variables locales de preview.',
            'Devuelve el cálculo temporal sin asignarlo a base.',
          ],
          practice:
            'Si base vale 10, ¿qué devuelve getBase() después de preview(4)?',
          practiceAnswer: '10',
          practiceFeedback:
            'preview calcula y devuelve 14, pero nunca asigna otro valor al campo base.',
          practiceHints: [
            'Localiza todas las asignaciones a base.',
            'preview solo asigna a la variable local result.',
            'Devolver un cálculo no lo almacena en base.',
          ],
          question: '¿Dónde puede utilizarse la variable local result?',
          choices: [
            'En cualquier parte de Main.',
            'Dentro de preview después de su declaración.',
            'En todos los métodos de Level.',
          ],
          correct: 1,
          feedback:
            'result se declara dentro del bloque de preview: su nombre está disponible allí después de declararlo, no en otros métodos.',
          challenge:
            'Completa preview(int extra) con una variable local int result igual a base + extra y devuelve result. No cambies base. Main debe imprimir 14 y luego 10.',
          hints: [
            'Declara result dentro de preview, sin public ni private.',
            'Calcula base + extra y guárdalo en result.',
            'Devuelve el resultado local sin cambiar el campo base.',
          ],
          checklist: [
            'Puedo identificar el bloque de una variable local.',
            'Puedo distinguir valores locales de campos persistentes.',
            'Sé que un parámetro puede ocultar un campo del mismo nombre.',
          ],
        },
      },
      example: {
        lines: [
          'class Level {',
          '  private int base = 10;',
          '  public int preview(int extra) {',
          '    int result = base + extra;',
          '    return result;',
          '  }',
          '  public int getBase() { return base; }',
          '}',
          'public class Main {',
          '  public static void main(String[] args) {',
          '    Level level = new Level();',
          '    System.out.println(level.preview(4));',
          '    System.out.println(level.getBase());',
          '  }',
          '}',
        ],
        active: [10, 11, 12],
        output: ['', '14', '14\n10'],
        values: {
          en: [
            'level.base = 10',
            'preview(4) returned 14; level.base = 10; preview locals are out of scope',
            'level.base = 10; preview local variables are out of scope',
          ],
          es: [
            'level.base = 10',
            'preview(4) devolvió 14; level.base = 10; las variables locales de preview están fuera de alcance',
            'level.base = 10; las variables locales de preview están fuera de alcance',
          ],
        },
        solution:
          'class Level {\n  private int base = 10;\n  public int preview(int extra) {\n    int result = base + extra;\n    return result;\n  }\n  public int getBase() { return base; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Level level = new Level();\n    System.out.println(level.preview(4));\n    System.out.println(level.getBase());\n  }\n}',
        starter:
          'class Level {\n  private int base = 10;\n  public int preview(int extra) {\n    // Declare result, calculate the preview, and return it.\n    return 0;\n  }\n  public int getBase() { return base; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Level level = new Level();\n    System.out.println(level.preview(4));\n    System.out.println(level.getBase());\n  }\n}',
      },
    },
    {
      id: '3.9',
      sourcePdfPage: 97,
      content: {
        en: {
          title: 'this Keyword',
          description:
            'Use this to distinguish an object’s field from its parameter.',
          goal: 'Refer to the current object inside an instance operation.',
          explanation:
            'Inside a constructor or instance method, this refers to the object being initialized or receiving the call. When a parameter has the same name as a field, this.field explicitly chooses the stored field, while the simple name chooses the parameter. You can also pass this to another method as the current object. A static method has no current instance and therefore cannot use this.',
          takeaway:
            'this identifies the current object and resolves a shadowed field name.',
          steps: [
            'Recognize that both constructor parameter and field are named name.',
            'Read this.name as the current object’s field.',
            'Assign the parameter name to that field and inspect the accessor.',
          ],
          practice:
            'Which Java keyword fills the blank in ____.name = name to assign the current object’s field?',
          practiceAnswer: 'this',
          practiceFeedback:
            'this.name selects the field; the unqualified name on the right selects the parameter.',
          practiceHints: [
            'The field and parameter have the same identifier.',
            'You need a reference to the current object before the dot.',
            'The answer is Java’s four-letter self-reference keyword.',
          ],
          question: 'Where is this available?',
          choices: [
            'Inside a static method without an object.',
            'Inside an instance method or constructor.',
            'Only inside main.',
          ],
          correct: 1,
          feedback:
            'Instance methods and constructors have a current object. Static methods belong to the class and do not have this.',
          challenge:
            'Complete the Student constructor and rename method. Both receive a parameter named name; assign it to this.name. Main should print Ana and then Luz.',
          hints: [
            'Keep the parameter named name in both operations.',
            'Qualify the assignment’s left side with this.',
            'The accessor already returns the field; use it to check both assignments.',
          ],
          checklist: [
            'I can use this.field when a parameter shadows a field.',
            'I can identify the current object for an instance call.',
            'I know why a static method cannot use this.',
          ],
        },
        es: {
          title: 'La palabra clave this',
          description: 'Usa this para distinguir el campo de su parámetro.',
          goal: 'Haz referencia al objeto actual dentro de una operación de instancia.',
          explanation:
            'Dentro de un constructor o método de instancia, this se refiere al objeto que se inicializa o recibe la llamada. Cuando un parámetro tiene el mismo nombre que un campo, this.campo selecciona explícitamente el campo almacenado y el nombre simple selecciona el parámetro. También puedes pasar this a otro método como objeto actual. Un método static no tiene instancia actual y no puede usar this.',
          takeaway:
            'this identifica el objeto actual y distingue un campo ocultado por un parámetro.',
          steps: [
            'Observa que el parámetro y el campo se llaman name.',
            'Interpreta this.name como el campo del objeto actual.',
            'Asigna el parámetro name al campo y consulta el accesor.',
          ],
          practice:
            '¿Qué palabra clave de Java completa ____.name = name para asignar el campo del objeto actual?',
          practiceAnswer: 'this',
          practiceFeedback:
            'this.name selecciona el campo; el nombre sin calificar a la derecha selecciona el parámetro.',
          practiceHints: [
            'El campo y el parámetro tienen el mismo identificador.',
            'Necesitas una referencia al objeto actual antes del punto.',
            'La respuesta es la palabra clave de autorreferencia de cuatro letras.',
          ],
          question: '¿Dónde está disponible this?',
          choices: [
            'Dentro de un método static sin un objeto.',
            'Dentro de un método de instancia o constructor.',
            'Solo dentro de main.',
          ],
          correct: 1,
          feedback:
            'Los métodos de instancia y constructores tienen un objeto actual. Los métodos static pertenecen a la clase y no tienen this.',
          challenge:
            'Completa el constructor de Student y rename. Ambos reciben un parámetro llamado name; asígnalo a this.name. Main debe imprimir Ana y luego Luz.',
          hints: [
            'Conserva el parámetro name en ambas operaciones.',
            'Califica el lado izquierdo de la asignación con this.',
            'El accesor ya devuelve el campo; úsalo para verificar ambas asignaciones.',
          ],
          checklist: [
            'Puedo usar this.campo cuando un parámetro oculta el campo.',
            'Puedo identificar el objeto actual de una llamada de instancia.',
            'Sé por qué un método static no puede utilizar this.',
          ],
        },
      },
      example: {
        lines: [
          'class Student {',
          '  private String name;',
          '  public Student(String name) { this.name = name; }',
          '  public void rename(String name) { this.name = name; }',
          '  public String getName() { return name; }',
          '}',
          'public class Main {',
          '  public static void main(String[] args) {',
          '    Student student = new Student("Ana");',
          '    System.out.println(student.getName());',
          '    student.rename("Luz");',
          '    System.out.println(student.getName());',
          '  }',
          '}',
        ],
        active: [8, 10, 11],
        output: ['', 'Ana', 'Ana\nLuz'],
        values: {
          en: [
            'student.name = Ana',
            'student.name = Luz',
            'returned name = Luz',
          ],
          es: [
            'student.name = Ana',
            'student.name = Luz',
            'nombre devuelto = Luz',
          ],
        },
        solution:
          'class Student {\n  private String name;\n  public Student(String name) { this.name = name; }\n  public void rename(String name) { this.name = name; }\n  public String getName() { return name; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Student student = new Student("Ana");\n    System.out.println(student.getName());\n    student.rename("Luz");\n    System.out.println(student.getName());\n  }\n}',
        starter:
          'class Student {\n  private String name;\n  public Student(String name) {\n    // Assign the parameter to this object\'s field.\n  }\n  public void rename(String name) {\n    // Assign the replacement name to the field.\n  }\n  public String getName() { return name; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Student student = new Student("Ana");\n    System.out.println(student.getName());\n    student.rename("Luz");\n    System.out.println(student.getName());\n  }\n}',
      },
    },
  ],
};
