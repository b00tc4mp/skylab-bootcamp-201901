/*
Question and answers from :
 http://www.github.com/misan7 -> baseQuestions
 https://github.com/VGamezz19/pasaPalabra-SPA -> alterquestions1
 https://github.com/ander94lakx/Pasapalabra -> alterquestions1
 https://github.com/elancha98/pasapalabra/blob/master/pasapalabra.py -> philosophyQuestions
 https://github.com/alejovp/pasapalabra/blob/master/JS/Pasapalabra.js -> alterQuestions2
 https://github.com/marioterron/pasapalabra/blob/master/js/app.js -> alterQuestions3
*/

const baseQuestions = [
  {
    letter: "a",
    answer: "abducir",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"
  },
  {
    letter: "b",
    answer: "bingo",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"
  },
  {
    letter: "c",
    answer: "churumbel",
    status: NOT_ANSWERED,
    question: "CON LA C. Niño, crío, bebé"
  },
  {
    letter: "d",
    answer: "diarrea",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"
  },
  {
    letter: "e",
    answer: "ectoplasma",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"
  },
  {
    letter: "f",
    answer: "facil",
    status: NOT_ANSWERED,
    question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"
  },
  {
    letter: "g",
    answer: "galaxia",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"
  },
  {
    letter: "h",
    answer: "harakiri",
    status: NOT_ANSWERED,
    question: "CON LA H. Suicidio ritual japonés por desentrañamiento"
  },
  {
    letter: "i",
    answer: "iglesia",
    status: NOT_ANSWERED,
    question: "CON LA I. Templo cristiano"
  },
  {
    letter: "j",
    answer: "jabali",
    status: NOT_ANSWERED,
    question:
      "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: NOT_ANSWERED,
    question:
      "CON LA K. Persona que se juega la vida realizando una acción temeraria"
  },
  {
    letter: "l",
    answer: "licantropo",
    status: NOT_ANSWERED,
    question: "CON LA L. Hombre lobo"
  },
  {
    letter: "m",
    answer: "misantropo",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"
  },
  {
    letter: "n",
    answer: "necedad",
    status: NOT_ANSWERED,
    question: "CON LA N. Demostración de poca inteligencia"
  },
  {
    letter: "ñ",
    answer: "señal",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."
  },
  {
    letter: "o",
    answer: "orco",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"
  },
  {
    letter: "p",
    answer: "protoss",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"
  },
  {
    letter: "q",
    answer: "queso",
    status: NOT_ANSWERED,
    question:
      "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"
  },
  {
    letter: "r",
    answer: "raton",
    status: NOT_ANSWERED,
    question: "CON LA R. Roedor"
  },
  {
    letter: "s",
    answer: "stackoverflow",
    status: NOT_ANSWERED,
    question: "CON LA S. Comunidad salvadora de todo desarrollador informático"
  },
  {
    letter: "t",
    answer: "terminator",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"
  },
  {
    letter: "u",
    answer: "unamuno",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"
  },
  {
    letter: "v",
    answer: "vikingos",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"
  },
  {
    letter: "w",
    answer: "sandwich",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"
  },
  {
    letter: "x",
    answer: "botox",
    status: NOT_ANSWERED,
    question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"
  },
  {
    letter: "y",
    answer: "peyote",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"
  },
  {
    letter: "z",
    answer: "zen",
    status: NOT_ANSWERED,
    question:
      "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"
  }
];

const alterQuestions1 = [
  {
    letter: "c",
    answer: "cantidad",
    status: NOT_ANSWERED,
    question: "CON LA C. Más es un adverbio de… "
  },
  {
    letter: "c",
    answer: "comic",
    status: NOT_ANSWERED,
    question: "CON LA C. Historia contada en viñetas con dibujos y palabras."
  },
  {
    letter: "d",
    answer: "determinantes",
    status: NOT_ANSWERED,
    question: "CON LA D. Los artículos, demostrativos, posesivos, etc. Son…"
  },
  {
    letter: "d",
    answer: "diccionario",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Libro en el que aparece el significado de las palabras por orden alfabético."
  },
  {
    letter: "e",
    answer: "esdrújula",
    status: NOT_ANSWERED,
    question: "CON LA E. Palabra cuya sílaba tónica es la antepenúltima."
  },
  {
    letter: "e",
    answer: "estrofa",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Grupo de versos que riman entre sí o tratan de un tema determinado."
  },
  {
    letter: "f",
    answer: "frase",
    status: NOT_ANSWERED,
    question: "CON LA F. Tipo de enunciado que no tiene verbo."
  },
  {
    letter: "f",
    answer: "futuro",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Tiempo verbal que indica que la acción se va a realizar."
  },
  {
    letter: "h",
    answer: "hiato",
    status: NOT_ANSWERED,
    question: "CON LA H. Dos vocales juntas que forman dos sílabas distintas."
  },
  {
    letter: "h",
    answer: "homofonas",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Palabras que se pronunciamos igual, pero tienen significados diferentes."
  },
  {
    letter: "i",
    answer: "infinitivo",
    status: NOT_ANSWERED,
    question: "CON LA I. Forma no personal del verbo. "
  },
  {
    letter: "i",
    answer: "interrogativo",
    status: NOT_ANSWERED,
    question: "CON LA I. Enunciado que sirve para preguntar."
  },
  {
    letter: "j",
    answer: "jimenez",
    status: NOT_ANSWERED,
    question: "CON LA J. Apellido del autor de -Platero y yo-."
  },
  {
    letter: "j",
    answer: "adjetivo",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA J. Que expresa cualidad o estado de los nombres a los que se refiere."
  },
  {
    letter: "l",
    answer: "los",
    status: NOT_ANSWERED,
    question: "CON LA L. Artículo masculino plural"
  },
  {
    letter: "l",
    answer: "lope de vega",
    status: NOT_ANSWERED,
    question: "CON LA L. Gran escritor español perteneciente al Siglo de Oro."
  },
  {
    letter: "m",
    answer: "monosilaba",
    status: NOT_ANSWERED,
    question: "CON LA M. Palabra que contiene una sola sílaba."
  },
  {
    letter: "m",
    answer: "modos",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Los verbos españoles tienen tres: indicativo, subjuntivo e imperativo."
  },
  {
    letter: "n",
    answer: "numeral",
    status: NOT_ANSWERED,
    question: "CON LA N. Determinante que indica cantidad u orden."
  },
  {
    letter: "n",
    answer: "nombre",
    status: NOT_ANSWERED,
    question: "CON LA N. Así llamamos también al sustantivo."
  },
  {
    letter: "ñ",
    answer: "añorar",
    status: NOT_ANSWERED,
    question: "CONTIENE LA Ñ. Sinónimo de extrañar, echar de menos."
  },
  {
    letter: "ñ",
    answer: "niñez.",
    status: NOT_ANSWERED,
    question: "CONTIENE LA Ñ. Sinónimo de infancia."
  },
  {
    letter: "o",
    answer: "oracion",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Enunciado con sentido completo y que tiene al menos un verbo"
  },
  {
    letter: "o",
    answer: "ortografia",
    status: NOT_ANSWERED,
    question: "CON LA O. Conjunto de normas que regulan la escritura."
  },
  {
    letter: "p",
    answer: "polisemicas",
    status: NOT_ANSWERED,
    question: "CON LA P. Palabras con más de un significado."
  },
  {
    letter: "p",
    answer: "polisilabas",
    status: NOT_ANSWERED,
    question: "CON LA P. Palabras que tienen más de tres sílabas."
  },
  {
    letter: "q",
    answer: "enclenque",
    status: NOT_ANSWERED,
    question: "CONTIENE LA Q. Dícese de la persona débil, enfermiza, muy flaca."
  },
  {
    letter: "q",
    answer: "quijano",
    status: NOT_ANSWERED,
    question:
      "CON LA Q. Apellido real de Don Quijote antes de cambiarse de nombre."
  },
  {
    letter: "r",
    answer: "romances",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Los juglares recorrían las plazas de los pueblos recitándolos para divertir a la gente."
  },
  {
    letter: "r",
    answer: "receptor",
    status: NOT_ANSWERED,
    question: "CON LA R. El que recibe la información."
  },
  {
    letter: "s",
    answer: "sinonimo",
    status: NOT_ANSWERED,
    question: "CON LA S. Que tiene el mismo significado."
  },
  {
    letter: "s",
    answer: "sobreesdrujula",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Palabra cuya sílaba tónica es la anterior a la antepenúltima."
  },
  {
    letter: "t",
    answer: "tragedia",
    status: NOT_ANSWERED,
    question: "CON LA T. Obra de teatro que tiene un desenlace desgraciado."
  },
  {
    letter: "t",
    answer: "tonica",
    status: NOT_ANSWERED,
    question: "CON LA T. Nombre de la sílaba que pronunciamos con más fuerza."
  },
  {
    letter: "u",
    answer: "undecimo",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Adjetivo que sigue inmediatamente en orden al o a lo décimo."
  },
  {
    letter: "u",
    answer: "ultimo",
    status: NOT_ANSWERED,
    question: "CON LA U. Antónimo de Primero."
  },
  {
    letter: "v",
    answer: "verbo",
    status: NOT_ANSWERED,
    question: "CON LA V. Palabras que indican acción o estado."
  },
  {
    letter: "v",
    answer: "verso",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Cada uno de los renglones cortos que forman una poesía."
  },
  {
    letter: "x",
    answer: "extra",
    status: NOT_ANSWERED,
    question: "CONTIENE LA X. Prefijo que significa añadir algo..."
  },
  {
    letter: "x",
    answer: "auxiliar",
    status: NOT_ANSWERED,
    question: "CONTIENE LA X. El verbo haber es un verbo…"
  },
  {
    letter: "y",
    answer: "onomatopeya",
    status: NOT_ANSWERED,
    question: "CONTIENE LA Y. Vocablo que imita o recrea un sonido."
  },
  {
    letter: "y",
    answer: "yo",
    status: NOT_ANSWERED,
    question: "CON LA Y. Pronombre personal, 1ª persona del singular."
  },
  {
    letter: "z",
    answer: "raiz",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA Z. Conjunto de fonemas mínimo e irreductible que comparten las palabras de una misma familia."
  },
  {
    letter: "z",
    answer: "zumbido",
    status: NOT_ANSWERED,
    question: "CON LA Z. Ruido que hacen algunos insectos como las abejas."
  },
  {
    letter: "b",
    answer: "bisilaba",
    status: NOT_ANSWERED,
    question: "CON LA B. Palabra que tiene dos sílabas."
  },
  {
    letter: "b",
    answer: "beautiful",
    status: NOT_ANSWERED,
    question: "CON LA B. Bonita in english is… "
  },
  {
    letter: "a",
    answer: "antonimo",
    status: NOT_ANSWERED,
    question: "CON LA A. Palabra que significa lo contrario de una dada."
  },
  {
    letter: "a",
    answer: "acepcion",
    status: NOT_ANSWERED,
    question: "CON LA A. Cada uno de los significados que tiene una palabra."
  },
  {
    letter: "g",
    answer: "grave",
    status: NOT_ANSWERED,
    question: "CON LA G. Antónimo de leve."
  },
  {
    letter: "g",
    answer: "genero",
    status: NOT_ANSWERED,
    question: "CON LA G. Lo que nos indica si es masculino o femenino es el…"
  },
  {
    letter: "A",
    question: "CON LA A. Tienda de comestibles",
    status: NOT_ANSWERED,
    answer: "Abacería"
  },
  {
    letter: "A",
    question: "CON LA A. Calzado rústico, sandalias",
    status: NOT_ANSWERED,
    answer: "Albarca"
  },
  {
    letter: "B",
    question: "CON LA B. Persona de carácter desenvuelto y simpático",
    status: NOT_ANSWERED,
    answer: "Barbián"
  },
  {
    letter: "B",
    question: "CON LA B. Piel de carnero",
    status: NOT_ANSWERED,
    answer: "Badana"
  },
  {
    letter: "B",
    question:
      "CON LA B. Conjunto de hielos formados por la congelación del agua del mar en las zonas polares",
    status: NOT_ANSWERED,
    answer: "Banquisa"
  },
  {
    letter: "C",
    question:
      "CON LA C. Buey manso que se utiliza para facilitar el manejo del ganado bravío",
    status: NOT_ANSWERED,
    answer: "Cabestro"
  },
  {
    letter: "C",
    question: "CON LA C. Cayado",
    status: NOT_ANSWERED,
    answer: "Cachaba"
  },
  {
    letter: "D",
    question: "CON LA D. Regalos, presentes",
    status: NOT_ANSWERED,
    answer: "Dádivas"
  },
  {
    letter: "D",
    question: "CON LA D. Modelo, ejemplo",
    status: NOT_ANSWERED,
    answer: "Dechado"
  },
  {
    letter: "E",
    question: "CON LA E. Relativo al marfil",
    status: NOT_ANSWERED,
    answer: "Ebúrneo"
  },
  {
    letter: "E",
    question: "CON LA E. Escudo, arma defensiva",
    status: NOT_ANSWERED,
    answer: "Égida"
  },
  {
    letter: "F",
    question:
      "CON LA F. Persona de plena confianza de otra y desempeña así sus funciones",
    status: NOT_ANSWERED,
    answer: "Factótum"
  },
  {
    letter: "F",
    question: "CON LA F. Provisto de hoces o con forma de hoz",
    status: NOT_ANSWERED,
    answer: "Falcado"
  },
  {
    letter: "G",
    question:
      "CON LA G. Lenguaje oscuro por la impropiedad de la frase o por la confusión de las ideas",
    status: NOT_ANSWERED,
    answer: "Galimatías"
  },
  {
    letter: "G",
    question: "CON LA G. Mozo de labranza",
    status: NOT_ANSWERED,
    answer: "Gañán"
  },
  {
    letter: "H",
    question: "CON LA H. Desastre con muchas víctimas, Sacrifico",
    status: NOT_ANSWERED,
    answer: "Hecatombe"
  },
  {
    letter: "H",
    question: "CON LA H. Grecia e islas del mar Egeo",
    status: NOT_ANSWERED,
    answer: "Hélade"
  },
  {
    letter: "I",
    question: "CON LA I. Mamífero rumiante que vive en las montañas españolas",
    status: NOT_ANSWERED,
    answer: "Íbex",
    answer: "Íbice"
  },
  {
    letter: "I",
    question: "CON LA I. Lo mismo o el mismo",
    status: NOT_ANSWERED,
    answer: "Ídem"
  },
  {
    letter: "J",
    question: "CON LA J. Adorno de las caballerías",
    status: NOT_ANSWERED,
    answer: "Jaez"
  },
  {
    letter: "J",
    question: "CON LA J. Habla especial y enrevesada",
    status: NOT_ANSWERED,
    answer: "Jerigonza"
  },
  {
    letter: "K",
    question: "CON LA K. Comida que es aceptable según la Torah",
    status: NOT_ANSWERED,
    answer: "Kosher"
  },
  {
    letter: "K",
    question:
      "CON LA K. Arte marcial de origen Japones, basado en golpes secos realizados con el borde de la mano, los codos o los pies",
    status: NOT_ANSWERED,
    answer: "Karate"
  },
  {
    letter: "L",
    question: "CON LA L. Estandarte",
    status: NOT_ANSWERED,
    answer: "Lábaro"
  },
  {
    letter: "L",
    question: "CON LA L. Relativo a un lago",
    status: NOT_ANSWERED,
    answer: "Lacustre"
  },
  {
    letter: "M",
    question: "CON LA M. Mentira, embuste",
    status: NOT_ANSWERED,
    answer: "Macana"
  },
  {
    letter: "M",
    question: "CON LA M. Daño ligero que presenta la fruta",
    status: NOT_ANSWERED,
    answer: "Maca"
  },
  {
    letter: "N",
    question: "CON LA N. Abuso de poder favoreciendo a parientes o amigos",
    status: NOT_ANSWERED,
    answer: "Nepotismo"
  },
  {
    letter: "N",
    question: "CON LA N. Insignificante",
    status: NOT_ANSWERED,
    answer: "Nimio"
  },
  {
    letter: "O",
    question: "CON LA O. Viejo, Caduco, Pasado de moda, Inútil por vejez",
    status: NOT_ANSWERED,
    answer: "Obsoleto"
  },
  {
    letter: "O",
    question: "CON LA O. Masturbación",
    status: NOT_ANSWERED,
    answer: "Onanismo"
  },
  {
    letter: "P",
    question: "CON LA P. Jolgorio ruidoso y desordenado",
    status: NOT_ANSWERED,
    answer: "Pachanga"
  },
  {
    letter: "P",
    question: "CON LA P. Persona práctica",
    status: NOT_ANSWERED,
    answer: "Pragmático"
  },
  {
    letter: "Q",
    question:
      "CONTIENE LA Q. Que implica anarquía o está caracterizado por ella",
    status: NOT_ANSWERED,
    answer: "Anárquico"
  },
  {
    letter: "Q",
    question:
      "CONTIENE LA Q. Producto obtenido de la destilación de maderas resinosas, carbones, petróleo, pizarras y otros materiales vegetales y minerales.",
    status: NOT_ANSWERED,
    answer: "Alquitrán"
  },
  {
    letter: "R",
    question:
      "CON LA R. Segmento lineal que une el centro del círculo con la circunferencia",
    status: NOT_ANSWERED,
    answer: "Radio"
  },
  {
    letter: "R",
    question:
      "CON LA R. Conjunto de uvas sostenidas en un mismo tallo que pende del sarmiento",
    status: NOT_ANSWERED,
    answer: "Racimo"
  },
  {
    letter: "S",
    question:
      "CON LA S. Parte interior de un templo en el que se preservan las cosas sagradas",
    status: NOT_ANSWERED,
    answer: "Sagrario"
  },
  {
    letter: "S",
    question:
      "CON LA S. Exceder una persona u cosa a otra en la cualidad de la que se trata",
    status: NOT_ANSWERED,
    answer: "Sobrepujar"
  },
  {
    letter: "T",
    question: "CON LA T. Estigma, defecto",
    status: NOT_ANSWERED,
    answer: "Tara"
  },
  {
    letter: "T",
    question: "CON LA T. Lúgubre",
    status: NOT_ANSWERED,
    answer: "Tétrico"
  },
  {
    letter: "U",
    question: "CON LA U. Situar o instalar en determinado espacio o lugar",
    status: NOT_ANSWERED,
    answer: "Ubicar"
  },
  {
    letter: "U",
    question:
      "CON LA U. Aplicar a algo aceite u otra materia pingüe, extendiéndola superficialmente",
    status: NOT_ANSWERED,
    answer: "Ungir"
  },
  {
    letter: "V",
    question:
      "CON LA V. Tratado breve que contiene las nociones elementales de una ciencia u arte",
    status: NOT_ANSWERED,
    answer: "Vademécum"
  },
  {
    letter: "V",
    question:
      "CON LA V. Vapor que despiden los cuerpos en determinadas condiciones",
    status: NOT_ANSWERED,
    answer: "Vaho"
  },
  {
    letter: "W",
    question: "CONTIENE LA W. Vivienda rústica exenta de una única planta",
    status: NOT_ANSWERED,
    answer: "Bungalow"
  },
  {
    letter: "W",
    question:
      "CONTIENE LA W. Fruto de ésta planta, de piel marron y carne verde comestible",
    status: NOT_ANSWERED,
    answer: "Kiwi"
  },
  {
    letter: "X",
    question:
      "CONTIENE LA X. Deporte que consiste en la lucha de dos púgiles, con las manos enfundadas en guantes especiales y de conformidad con ciertas reglas",
    status: NOT_ANSWERED,
    answer: "Boxeo"
  },
  {
    letter: "X",
    question: "CONTIENE LA X. Puntual, fiel y cabal",
    status: NOT_ANSWERED,
    answer: "Exacto"
  },
  {
    letter: "Y",
    question: "CONTIENE LA Y. Abstenerse total o parcialmente de comer o beber",
    status: NOT_ANSWERED,
    answer: "Ayunar"
  },
  {
    letter: "Y",
    question: "CONTIENE LA Y. Macho vacuno castrado",
    status: NOT_ANSWERED,
    answer: "Buey"
  },
  {
    letter: "Z",
    question:
      "CON LA Z. alzado que no pasa del tobillo, con la parte inferior de suela y lo demás de piel, fieltro, paño u otro tejido, más o menos escotado por el empeine",
    status: NOT_ANSWERED,
    answer: "Zapato"
  },
  {
    letter: "Z",
    question: "CON LA Z. Muchacho que ha llegado a la adolescencia",
    status: NOT_ANSWERED,
    answer: "Zagal"
  }
];

const alterQuestions2 = [
  {
    letter: "a",
    answer: "alicia",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Esta niña viajó por un hollo hasta un lugar Fantástico!!"
  },
  {
    letter: "b",
    answer: "camberra",
    status: NOT_ANSWERED,
    question: "CON LA B. Es la Capital de Australia."
  },
  {
    letter: "c",
    answer: "calabozo",
    status: NOT_ANSWERED,
    question: "CON LA C. Donde deben terminar los criminales."
  },
  {
    letter: "d",
    answer: "danubio",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Rio famoso cuyo curso incluye partes de Alemania, Austria, Eslovaquia, Hungría, Croacia, Serbia, Rumania, Bulgaria, Moldavia y Ucrania"
  },
  {
    letter: "e",
    answer: "jedi",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA E. Defensor de la paz de gran poder y sabiduría, seguidor del Lado Luminoso de La Fuerza, que pertenece a una orden mística y monacal."
  },
  {
    letter: "f",
    answer: "afro",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA F. Tipo de peinado producido naturalmente por la textura de cabello afroide"
  },
  {
    letter: "g",
    answer: "golf",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Deporte de precisión cuyo objetivo es introducir una bola en los hoyos que están distribuidos en el campo con el menor número de golpes posibles."
  },
  {
    letter: "h",
    answer: "chat",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA H. Término proveniente del inglés que en español equivale a charla, también conocido como cibercharla."
  },
  {
    letter: "i",
    answer: "india",
    status: NOT_ANSWERED,
    question: "CON LA I. Es el segundo país con mayor población del mundo."
  },
  {
    letter: "j",
    answer: "ajo",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA J. Especie de planta utilizada para espantar vampiros!, perdón malas vibras!"
  },
  {
    letter: "k",
    answer: "kilo",
    status: NOT_ANSWERED,
    question:
      "CON LA K. Es la unidad de masa del Sistema Internacional de Unidades"
  },
  {
    letter: "l",
    answer: "luke",
    status: NOT_ANSWERED,
    question: "CON LA L. Nombre de pila del hijo de Darth Vader."
  },
  {
    letter: "m",
    answer: "manzana",
    status: NOT_ANSWERED,
    question: "CON LA M. Fruto prohibido del Edén."
  },
  {
    letter: "n",
    answer: "neo",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Alias del elegido para salvarnos de las máquinas en la saga The Matrix."
  },
  {
    letter: "ñ",
    answer: "niño",
    status: NOT_ANSWERED,
    question: "CONTIENE LA Ñ. Sinónimo de infante."
  },
  {
    letter: "o",
    answer: "developer",
    status: NOT_ANSWERED,
    question: "CONTIENE LA O. Desarrollador en inglés."
  },
  {
    letter: "p",
    answer: "playstation",
    status: NOT_ANSWERED,
    question: "CON LA P. Así se llama la consola de juegos de Sony."
  },
  {
    letter: "q",
    answer: "aquiles",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA Q. Héroe de la Guerra de Troya en la mitología Griega."
  },
  {
    letter: "r",
    answer: "reggae",
    status: NOT_ANSWERED,
    question: "CON LA R. Género musical desarrollado en Jamaica."
  },
  {
    letter: "s",
    answer: "asia",
    status: NOT_ANSWERED,
    question: "CONTIENE LA S. Es uno de los cinco continentes."
  },
  {
    letter: "t",
    answer: "torpe",
    status: NOT_ANSWERED,
    question: "CON LA T. Antónimo de ágil."
  },
  {
    letter: "u",
    answer: "autor",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA U. Es la persona que crea una obra, sea artística, literaria o científica."
  },
  {
    letter: "v",
    answer: "volante",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Tipo de control de dirección para vehículos terrestres.:"
  },
  {
    letter: "w",
    answer: "volkswagen",
    status: NOT_ANSWERED,
    question:
      "CONTIENE LA W. Fabricante de automóviles alemán con sede en Wolfsburgo, Baja Sajonia."
  },
  {
    letter: "x",
    answer: "excelente",
    status: NOT_ANSWERED,
    question: "CONTIENE LA X. Antónimo de mediocre."
  },
  {
    letter: "y",
    answer: "chucky",
    status: NOT_ANSWERED,
    question: "CONTIENE LA Y. Así se llama el muñeco diabólico..."
  },
  {
    letter: "z",
    answer: "zapato",
    status: NOT_ANSWERED,
    question: "CON LA Z. Accesorio de ropa para usar en los pies."
  }
];

const alterQuestions3 = [
  {
    letter: "a",
    question:
      "EMPIEZA POR A. Relato breve de un acontecimiento extraño, curioso o divertido, generalmente ocurrido a la persona que lo cuenta.",
    answer: "Anecdota",
    status: NOT_ANSWERED
  },
  {
    letter: "b",
    question:
      "EMPIEZA POR B. Pasta dulce y esponjosa, hecha con harina, huevos, levadura y otros ingredientes, que puede tener distintas formas",
    answer: "Bollo",
    status: NOT_ANSWERED
  },
  {
    letter: "c",
    question:
      "EMPIEZA POR C. Corriente de agua que cae desde cierta altura a causa de un brusco desnivel en su cauce, especialmente en un rio",
    answer: "Cascada",
    status: NOT_ANSWERED
  },
  {
    letter: "d",
    question:
      "EMPIEZA POR D. Arma blanca de hoja corta, ancha y puntiaguda, parecida a la espada pero de menor tamaño",
    answer: "Daga",
    status: NOT_ANSWERED
  },
  {
    letter: "e",
    question:
      "EMPIEZA POR E. Línea curva que describe varias vueltas alrededor de un punto, alejándose cada vez más de él",
    answer: "Espiral",
    status: NOT_ANSWERED
  },
  {
    letter: "f",
    question:
      "CONTIENE LA F. Que está descompuesto o podrido por la acción de diversos factores y determinados microorganismos",
    answer: "Putrefacto",
    status: NOT_ANSWERED
  },
  {
    letter: "g",
    question: "EMPIEZA POR G. Que se comporta de manera ruda, tosca o grosera",
    answer: "Garrulo",
    status: NOT_ANSWERED
  },
  {
    letter: "h",
    question: "CONTIENE LA H. Persona o animal que es grueso y de poca altura",
    answer: "Rechoncho",
    status: NOT_ANSWERED
  },
  {
    letter: "i",
    question:
      "EMPIEZA POR I. Que está en el espacio existente entre dos astros, o que tiene relación con él",
    answer: "Interestelar",
    status: NOT_ANSWERED
  },
  {
    letter: "j",
    question:
      "EMPIEZA POR J. Chile picante de unos 5 cm de largo, carnoso y de punta redonda, que se usa para condimentar ciertos guisos",
    answer: "Jalapeño",
    status: NOT_ANSWERED
  },
  {
    letter: "l",
    question: "CONTIENE LA L. Hombre pequeño y débil",
    answer: "Homunculo",
    status: NOT_ANSWERED
  },
  {
    letter: "m",
    question:
      "EMPIEZA POR M. Persona que sufre o muere por defender su religión o sus ideales. ",
    answer: "Martir",
    status: NOT_ANSWERED
  },
  {
    letter: "n",
    question: "EMPIEZA POR N. Tubo fluorescente que produce una luz brillante.",
    answer: "Neon",
    status: NOT_ANSWERED
  },
  {
    letter: "ñ",
    question: "CONTIENE LA Ñ. Dar a una cosa un color distinto del que tiene.",
    answer: "Teñir",
    status: NOT_ANSWERED
  },
  {
    letter: "o",
    question: "EMPIEZA POR O. Que conoce todas las cosas reales y posibles.",
    answer: "Omnisciente",
    status: NOT_ANSWERED
  },
  {
    letter: "p",
    question:
      "CONTIENE LA P. Calzado de lona, con suela de esparto, cáñamo o goma, que se sujeta al pie por presión o con unas cintas que se atan al tobillo.",
    answer: "Alpargata",
    status: NOT_ANSWERED
  },
  {
    letter: "q",
    question: "EMPIEZA POR Q. Que se puede romper fácilmente.",
    answer: "Quebradizo",
    status: NOT_ANSWERED
  },
  {
    letter: "r",
    question: "EMPIEZA POR R. Operación quirúrgica para restaurar la nariz.",
    answer: "Rinoplastia",
    status: NOT_ANSWERED
  },
  {
    letter: "s",
    question:
      "CONTIENE LA S. Falta de cuidado en la forma de vestir y en el aseo personal.",
    answer: "Desaliño",
    status: NOT_ANSWERED
  },
  {
    letter: "t",
    question: "EMPIEZA POR T. Persona alocada, bulliciosa y molesta.",
    answer: "Tabardillo",
    status: NOT_ANSWERED
  },
  {
    letter: "u",
    question:
      "CONTIENE LA U. Persona que rehúye el trato de otras personas y rechaza las atenciones y muestras de cariño.",
    answer: "Huraño",
    status: NOT_ANSWERED
  },
  {
    letter: "v",
    question:
      "EMPIEZA POR V. Tributo que el vasallo pagaba a su señor o servicio que le prestaba según este vínculo.",
    answer: "Vasallaje",
    status: NOT_ANSWERED
  },
  {
    letter: "x",
    question:
      "CONTIENE LA X. Punto culminante o de mayor satisfacción de la excitación sexual en las zonas erógenas o sexuales.",
    answer: "Climax",
    status: NOT_ANSWERED
  },
  {
    letter: "y",
    question:
      "CONTIENE LA Y. Toro castrado, que se utiliza como animal de tiro y del cual se aprovecha su carne.",
    answer: "Buey",
    status: NOT_ANSWERED
  },
  {
    letter: "z",
    question: "CONTIENE LA Z. Que es tonto o tiene poca rapidez mental.",
    answer: "Pazguato"
  }
];

const alterQuestions = [...alterQuestions1, ...alterQuestions2, ...alterQuestions3];

const philosophyQuestions = [
  {
    letter: "a",
    answer: "Abstracción",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Acto mental en el que conceptualmente se aísla un objeto o una propiedad de un objeto."
  },
  {
    letter: "a",
    answer: "Academia",
    status: NOT_ANSWERED,
    question: "CON LA A. Nombre de la escuela de filosofía de Platón "
  },
  {
    letter: "a",
    answer: "Accidentes o Atributos",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Según Aristóteles cualidades que tiene un sujeto, que no existen por sí mismos, sino en relación con el sujeto. Los percibimos a través de los sentidos."
  },
  {
    letter: "a",
    answer: "Agente",
    status: NOT_ANSWERED,
    question:
      "CON LA A. El que obra o actúa, por contraposición a quien sufre, recibe o padece la acción. "
  },
  {
    letter: "a",
    answer: "Acrítico",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Característica del pensamiento arcaico, que no analiza su metodología. "
  },
  {
    letter: "a",
    answer: "Acto",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Acción cumplida. La existencia en cuanto perfección o realización de la potencia "
  },
  {
    letter: "a",
    answer: "Aditivas",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Cualidades que presenta la materia cuyo valor depende de la suma de los valores de sus componentes. "
  },
  {
    letter: "a",
    answer: "Aforamiento",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Protección ante la ley de una imputación por ciertas condiciones laborales."
  },
  {
    letter: "a",
    answer: "Aforismo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Sentencia breve y doctrinal que se propone como regla en una ciencia o arte"
  },
  {
    letter: "a",
    answer: "Agnosticismo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Teoría que afirma la imposibilidad de conocer la existencia de dios."
  },
  {
    letter: "a",
    answer: "Agustín de Hipona (San)",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Fue el máximo pensador del cristianismo del primer milenio.  Dedicó gran parte de su vida a escribir sobre filosofía y teología. En el s. V, cristianiza a Platón. Subordina la razón a la fe."
  },
  {
    letter: "a",
    answer: "Aletheia",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Término con el que los antiguos griegos se referían a la verdad, entendida como “quitar el velo a lo que está cubierto”. Descubrimiento"
  },
  {
    letter: "a",
    answer: "Alma",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Principio de vida de los seres vivos. Es el objeto de la psicología"
  },
  {
    letter: "a",
    answer: "Almagesto",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Libro que escribió Ptolomeo donde plasma sus sistema basado en el método de epiciclo-deferente"
  },
  {
    letter: "a",
    answer: "Altruismo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Diligencia en procurar el bien ajeno aun a costa del propio"
  },
  {
    letter: "a",
    answer: "Amistad",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Comunidad de dos o más personas unidas entre sí por lazos de espíritu o afectos profundos y estables. Algunas escuelas filosóficas antiguas la supusieron superior al amor, en razón de su mayor serenidad y permanencia"
  },
  {
    letter: "a",
    answer: "Anacrónico",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Dícese de aquello que no corresponde o no parece corresponderse con la época en la que se hace"
  },
  {
    letter: "a",
    answer: "Anacronismo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Realidad descontextualizada,  fuera de lugar o de tiempo"
  },
  {
    letter: "a",
    answer: "Análisis",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Método de estudio o investigación consistente en descomponer un todo en sus elementos más simples y estudiarlo en éstos o a partir de éstos"
  },
  {
    letter: "a",
    answer: "Analogía (Razonamiento por)",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Tipo de razonamiento no deductivo, que consiste en obtener conclusiones a partir de premisas en las que se comparan elementos distintos"
  },
  {
    letter: "a",
    answer: "Animismo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Creencia en que todas las cosas están animadas por espíritus, es la base de la magia."
  },
  {
    letter: "a",
    answer: "Anselmo de Canterbury",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Monje benedictino , del s. XI, que para demostrar la existencia de Dios por medio de la razón propuso un procedimiento deductivo, a priori o analítico que va de la idea a la existencia, de la causa a los efectos."
  },
  {
    letter: "a",
    answer: "Antítesis",
    status: NOT_ANSWERED,
    question:
      "CON LA A. En el sentido que le otorgaba Aristóteles: contraposición. Para Hegel: el segundo momento del proceso dialéctico"
  },
  {
    letter: "a",
    answer: "Antropocentrismo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Doctrina que sitúa al ser humano como medida de todas las cosas"
  },
  {
    letter: "a",
    answer: "Antropología",
    status: NOT_ANSWERED,
    question: "CON LA A. Ciencia que estudia al ser humano"
  },
  {
    letter: "a",
    answer: "Antropomorfismo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Interpretación de la naturaleza en general a imagen de las tendencias o del comportamiento humano"
  },
  {
    letter: "a",
    answer: "Apodíctica",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Dícese de toda verdad absolutamente evidente, es decir, de la que no se puede dudar"
  },
  {
    letter: "a",
    answer: "Arcaico (Pensamiento)",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Tipo de pensamiento de carácter irracional que intentaba explicar la realidad y que se orienta confiando en la fe, la imaginación y la tradición"
  },
  {
    letter: "a",
    answer: "Arché",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Según los filósofos presocráticos, el sustrato permanente, primer principio, naturaleza y fin de toda la realidad"
  },
  {
    letter: "a",
    answer: "Argumentar",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Defender una postura presentando razones de forma estructurada y coherente"
  },
  {
    letter: "a",
    answer: "Aristarco (de Samos)",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Astrónomo y matemático griego, primera persona, que se conozca, que propone el modelo heliocéntrico del Sistema Solar, colocando el Sol, y no la Tierra, en el centro del universo conocido"
  },
  {
    letter: "a",
    answer: "Aristocracia",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Forma de gobierno en que el poder está en manos de los nobles y de las clases sociales altas."
  },
  {
    letter: "a",
    answer: "Aristóteles",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Filósofo y científico macedonio, discípulo de Platón, que propuso nuevas teorías como la del primer motor inmóvil"
  },
  {
    letter: "a",
    answer: "Astronomía",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Ciencia que estudia la composición y las leyes que rigen los cuerpos celestes"
  },
  {
    letter: "a",
    answer: "Ateísmo",
    status: NOT_ANSWERED,
    question: "CON LA A. Postura de aquellos que niegan la existencia de Dios"
  },
  {
    letter: "a",
    answer: "Atomismo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. En la antigüedad, teoría cosmológica que suponía al mundo compuesto de unidades indivisibles y homogéneas de carácter material"
  },
  {
    letter: "a",
    answer: "Atributo",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Propiedad  que acompaña siempre a una esencia y por la que se manifiesta (sin formar parte de la misma)"
  },
  {
    letter: "a",
    answer: "Autodeterminación",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Poder de determinarse a sí mismo, propio del ser dotado de voluntad (apetito racional) y, por lo mismo, libre"
  },
  {
    letter: "a",
    answer: "Autonomía (moral)",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Característica de la moral kantiana que supone al obrar moral independiente de cualquier norma o fin exterior al hombre mismo"
  },
  {
    letter: "a",
    answer: "Autoridad",
    status: NOT_ANSWERED,
    question:
      "CON LA A. Poder que ejerce un hombre o un grupo en la sociedad. En su uso habitual se aplica a un poder no basado en la mera fuerza, sino legitimado en sí mismo o por un poder más alto"
  },
  {
    letter: "a",
    answer: "Averroísmo (latino)",
    status: NOT_ANSWERED,
    question: "CON LA A. Filosofía que sostiene la teoría de la doble verdad"
  },
  {
    letter: "b",
    answer: "Bacon, Francis",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Célebre filósofo, político, abogado y escritor inglés del s. XVII. Considerado uno de los padres del empirismo, sus obras y pensamientos ejercieron una influencia decisiva en el desarrollo del método científico mecanicista"
  },
  {
    letter: "b",
    answer: "Barroco",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Época cuya característica típica es la tensión entre contrastes irreconcidiables"
  },
  {
    letter: "b",
    answer: "Beatitud",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Estado de felicidad cumplida o perfecta concomitante a la posesión contemplativa y afectiva de Dios"
  },
  {
    letter: "b",
    answer: "Biblia",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Conjunto de libros canónicos del judaísmo y del cristianismo, que según las religiones judía y cristiana, transmite la palabra de Dios."
  },
  {
    letter: "b",
    answer: "Bien",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Valor supremo otorgado a aquello que se presenta como deseable en grado sumo para todo ser humano. Para Platón, además, es causa de la existencia y el conocimiento"
  },
  {
    letter: "b",
    answer: "Big Bang",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Modelo científico que trata de explicar el origen del Universo y del sistema solar y su desarrollo posterior ofreciendo como teoría la de que el Universo se produjo por una gran explosión, y afirma que éste aún sigue expandiéndose"
  },
  {
    letter: "b",
    answer: "Big-Crunch",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Proceso de involución que iniciaría el Universo, según la teoría del Universo cerrado"
  },
  {
    letter: "b",
    answer: "Biología",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Ciencia que tiene como objeto de estudio a los seres vivos y, más específicamente, su origen, su evolución y sus propiedades"
  },
  {
    letter: "b",
    answer: "Bondad",
    status: NOT_ANSWERED,
    question:
      "CON LA B. En su sentido más inmediato dícese de la acción humana (voluntaria) cuando se ajusta a las normas de su rectitud o moralidad"
  },
  {
    letter: "b",
    answer: "Bóveda",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Los antiguos griegos creían que las estrellas estaban fijas en una…"
  },
  {
    letter: "b",
    answer: "Budismo",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Doctrina filosófica y religiosa derivada del brahmanismo fundada en la India en el s. VI a. C"
  },
  {
    letter: "b",
    answer: "Burocracia",
    status: NOT_ANSWERED,
    question:
      "CON LA B. Modo de organizar los recursos públicos según la especialización, profesionalización y jerarquía del funcionario"
  },
  {
    letter: "c",
    answer: "Cambio",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Actualización en cada individuo de la forma que le es propia y que sólo posee en potencia"
  },
  {
    letter: "c",
    answer: "Caóticos",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Dícese de los procesos deterministas que solo pueden suceder del modo en el que lo hacen, pero no es posible predecirlos, porque ello exige un nivel de precisión absoluto en la medida de los valores de las variables que intervienen en el estado inicial del proceso, requisito imposible de alcanzar."
  },
  {
    letter: "c",
    answer: "Capitalismo",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Sistema económico autodestructivo, según Marx, y dirigido hacia el futuro en el que las riquezas se obtienen poseyendo capitales y en el que un obrero trabaja para otro"
  },
  {
    letter: "c",
    answer: "Cartesiano",
    status: NOT_ANSWERED,
    question: "CON LA C. Lo referente al sistema filosófico de Descartes"
  },
  {
    letter: "c",
    answer: "Catarsis",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Purificación o liberación interior de las pasiones (literalmente, purga). A la tragedia antigua y a los espectáculos circenses se les suponía un valor purificador de este tipo"
  },
  {
    letter: "c",
    answer: "Categorías",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Según Aristóteles géneros supremos del ser, de la realidad. Son: la sustancia (ser en sí) y el accidente (ser en otro). "
  },
  {
    letter: "c",
    answer: "Categórico",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Cualquier proposición o argumentación no sometida a condiciones. Se diferencia así de las hipotéticas y de las disyuntivas."
  },
  {
    letter: "c",
    answer: "Causa",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Acto o acontecimiento que produce un efecto y es determinante para la existencia de este"
  },
  {
    letter: "c",
    answer: "Causalidad",
    status: NOT_ANSWERED,
    question: "CON LA C. Principio que afirma que todo efecto tiene una causa"
  },
  {
    letter: "c",
    answer: "Celeste",
    status: NOT_ANSWERED,
    question:
      "CON LA C. En la cosmología aristotélica región supralunar, inmutable y perfecta"
  },
  {
    letter: "c",
    answer: "Certeza",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Estado de la mente en el que ésta se adhiere a un juicio sin temor a errar"
  },
  {
    letter: "c",
    answer: "Ciencia",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Sistema de conocimientos sobre algún sector específico de la realidad, obtenidos de un modo racional, que posee métodos de trabajo concretos y criterios de comprobación y verificación"
  },
  {
    letter: "c",
    answer: "Cinismo",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Del griego “perro”, doctrina filosófica griega, fundada por Antístenes y Diógenes, que se desarrolló en Grecia en el s-IV a. C a modo de reinterpretación de la filosofía socrática, buscando la felicidad en una vida alejada de la civilización"
  },
  {
    letter: "c",
    answer: "Clasificación",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Operación lógica consistente en distribuir en partes u ordenar un todo confuso, empleando criterios previamente elegido."
  },
  {
    letter: "c",
    answer: "Compasión",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Participación en el dolor de otros, en tanto que dolor o sufrimiento. Los estoicos y Espinosa (panteístas) la rechazan como opuesta a la comprensión racional del mundo. Nietzsche la incluye en 'la moral de los débiles'."
  },
  {
    letter: "c",
    answer: "Complejo",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Noción divulgada por el psicoanálisis de Freud para designar las asociaciones perturbadoras del subconsciente reprimido con vivencias de la conciencia actual"
  },
  {
    letter: "c",
    answer: "Comportamiento",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Según la escuela psicológica behaviorista : la respuesta de un organismo vivo a un estímulo exterior. En su sentido habitual se dice de la conducta humana en relación con una norma moral, profesional, etcétera. "
  },
  {
    letter: "c",
    answer: "Comunismo",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Sociedad sin clases en la que los medios de producción son propiedad del propio pueblo"
  },
  {
    letter: "c",
    answer: "Concepto",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Representación intelectual (abstracta) de un objeto. Acto o producto de la concepción intelectual o intelección"
  },
  {
    letter: "c",
    answer: "Conclusión",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Proposición final de un razonamiento obtenida por inducción o por deducción de las premisas o antecedente"
  },
  {
    letter: "c",
    answer: "Concreto",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Cuanto se ofrece en la realidad existencial, singular e individual. Se opone a abstracto."
  },
  {
    letter: "c",
    answer: "Conmutativa",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Tipo de justicia consistente en dar a cada uno lo suyo en las transacciones, según una norma de igualdad aritmética"
  },
  {
    letter: "c",
    answer: "Conservación",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Dícese del instinto que consiste en una tendencia innata del animal a la defensa de la propia vida y de lo necesario para su mantenimiento"
  },
  {
    letter: "c",
    answer: "Constitucionalización",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Reconocimiento legal, en cada Estado, de los valores de la dignidad, libertad, igualdad, justicia y pluralismo"
  },
  {
    letter: "c",
    answer: "Contingente",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Realidad o fenómeno que puede suceder o no; referido a un ser, que puede ser o no"
  },
  {
    letter: "c",
    answer: "Contractualismo",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Teoría que afirma que el origen de la sociedad y de la organización política reside en un acuerdo."
  },
  {
    letter: "c",
    answer: "Copérnico",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Astrónomo del Renacimiento que formuló la teoría heliocéntrica del Sistema Solar"
  },
  {
    letter: "c",
    answer: "Cosmogonía",
    status: NOT_ANSWERED,
    question: "CON LA C. Explicación sobre el origen y la formación del mundo"
  },
  {
    letter: "c",
    answer: "Cosmos",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Del griego “orden”, palabra utilizada desde la antigüedad hasta la época moderna para referirse al mundo, concebido como un todo ordenado. Una unidad cerrada y finita formada por dos regiones diferentes"
  },
  {
    letter: "c",
    answer: "Cosmología",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Ciencia que se pregunta por el origen y estructura del universo"
  },
  {
    letter: "c",
    answer: "Costumbre",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Puede tomarse como sinónimo de hábito. En otro sentido más preciso se aplica preferentemente a los hábitos colectivos"
  },
  {
    letter: "c",
    answer: "Creación",
    status: NOT_ANSWERED,
    question: "CON LA C. Producción ex nihilo (desde la nada). "
  },
  {
    letter: "c",
    answer: "Creacionismo",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Teoría que supone el origen del mundo (y del alma humana especialmente) en la acción de Dios"
  },
  {
    letter: "c",
    answer: "Creencia",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Conocimiento adquirido por la FE o que es objeto de ella"
  },
  {
    letter: "c",
    answer: "Critica",
    status: NOT_ANSWERED,
    question:
      "CON LA C. Función de la filosofía que nos aleja del dogmatismo, de los prejuicios y que nos permite comprender el mundo"
  },
  {
    letter: "c",
    answer: "Cuantitativo",
    status: NOT_ANSWERED,
    question: "CON LA C. Tipo de cambio que comprende crecimiento y disminución"
  },
  {
    letter: "c",
    answer: "Cuerpo",
    status: NOT_ANSWERED,
    question: "CON LA C. Todo objeto de naturaleza material"
  },
  {
    letter: "c",
    answer: "Cúmulo de Galaxias",
    status: NOT_ANSWERED,
    question:
      "CON LA C. (dos palabras): unidad fundamental para estudiar el Universo en una escala adecuada. "
  },
  {
    letter: "d",
    answer: "Daimón",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Término utilizado por Sócrates para designar al alma que actúa en el hombre, entendida como una especie de voz de la conciencia o como la sumisión a la voluntad del dios que actúa en la vida del filósofo como contrapeso de otras inclinaciones o tendencias"
  },
  {
    letter: "d",
    answer: "De Broglie",
    status: NOT_ANSWERED,
    question:
      "CON LA D. (dos palabras): Físico francés que desarrollo la teoría de la dualidad onda corpúsculo."
  },
  {
    letter: "d",
    answer: "Decisión",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Momento final del acto voluntario en el cual el sujeto corta la deliberación y se inclina por una de sus opciones"
  },
  {
    letter: "d",
    answer: "Deductivo",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Tipo de razonamiento en el que se parte de unos datos más generales que la conclusión que se saca de ellos."
  },
  {
    letter: "d",
    answer: "Definir",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Determinar, fijar, lo que una cosa es, extrayendo lo que tienen en común todos los individuos de la misma clase."
  },
  {
    letter: "d",
    answer: "Deísmo",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Corriente de pensamiento que afirma la existencia de un Dios puramente natural o racional, pero sin determinaciones concretas reveladas ni de carácter personal"
  },
  {
    letter: "d",
    answer: "Deliberación",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Momento del acto voluntario en que la razón presenta a la voluntad (y esta sopesa) los motivos y los contramotivos para actuar o para hacerlo en un sentido o en otro"
  },
  {
    letter: "d",
    answer: "Democracia",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Doctrina política a favor del sistema de gobierno en el que el pueblo ejerce la soberanía mediante la elección libre de sus dirigentes"
  },
  {
    letter: "d",
    answer: "Demócrito",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Filosofo de la naturaleza que propuso la teoría atómica en el s. V a. C."
  },
  {
    letter: "d",
    answer: "Demonio",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Ser semidivino al que se atribuye un papel intermediario entre los dioses y los hombres. En el cristianismo son denominados así los ángeles caídos tras la rebelión de Lucifer"
  },
  {
    letter: "d",
    answer: "Deontología",
    status: NOT_ANSWERED,
    question: "CON LA D. Tratado o estudio de los deberes"
  },
  {
    letter: "d",
    answer: "Demagogia",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Política consistente en halagar las aspiraciones populares para obtener o conservar el poder"
  },
  {
    letter: "d",
    answer: "Descartes",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Filósofo, matemático y físico francés, considerado como el padre de la geometría analítica y de la filosofía moderna, así como uno de los nombres más destacados de la revolución científica"
  },
  {
    letter: "d",
    answer: "Destino",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Fuerza desconocida que se cree obra sobre los hombres y los sucesos"
  },
  {
    letter: "d",
    answer: "Determinismo",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Teoría que afirma que todo lo que sucede en la naturaleza está prefijado de antemano"
  },
  {
    letter: "d",
    answer: "Devenir",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Proceso mediante el cual algo se hace o llega a ser. La realidad entendida como proceso o cambio, que a veces se opone a ser"
  },
  {
    letter: "d",
    answer: "Dialéctica",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Situación de cambio en la que se enfrentan elementos contrarios, pero de cuya oposición surge una nueva fase que supera la anterior"
  },
  {
    letter: "d",
    answer: "Dignidad",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Cualidad esencial de la persona que hace de ella un ser valioso por su libertad. Lleva implícita la exigencia de que ningún ser humano sea tratado como un medio sino, siempre, como un fin en sí mismo. "
  },
  {
    letter: "d",
    answer: "Diógenes",
    status: NOT_ANSWERED,
    question: "CON LA D. El más famoso cínico. Habitaba en un tonel"
  },
  {
    letter: "d",
    answer: "Dios",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Ser supremo omnipotente y personal en religiones teístas y deístas "
  },
  {
    letter: "d",
    answer: "Distributiva",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Tipo de justicia consistente en dar a cada uno lo suyo en las transacciones, según sus méritos y circunstancias"
  },
  {
    letter: "d",
    answer: "Divinidad",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Referencia al Dios único y absoluto de las religiones monoteístas, o bien a un dios de las religiones politeístas, u otra entidad similar a un dios"
  },
  {
    letter: "d",
    answer: "Dogma",
    status: NOT_ANSWERED,
    question: "CON LA D. Verdad de fe"
  },
  {
    letter: "d",
    answer: "Dogmatismo",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Actitud carente de espíritu crítico, que afirma verdades sin admitir discusión"
  },
  {
    letter: "d",
    answer: "Dolor",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Uno de los polos de la vida afectivo-emotiva, opuesta al placer, y consistente en un encogimiento y sufrimiento del sujeto ante una situación o agente desfavorable o pernicioso"
  },
  {
    letter: "d",
    answer: "Dualismo",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Teoría metafísica que explica la realidad desde dos dimensiones o sustancias diferentes y opuestas, una material y otra espiritual."
  },
  {
    letter: "d",
    answer: "Duda",
    status: NOT_ANSWERED,
    question:
      "CON LA D. Estado de incertidumbre de la mente en la que ésta oscila entre opiniones u opciones diversas"
  },
  {
    letter: "d",
    answer: "Duración",
    status: NOT_ANSWERED,
    question: "CON LA D. Condición de los seres temporales, en devenir o cambio"
  },
  {
    letter: "e",
    answer: "Einstein (Albert)",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Científico alemán que elaboró la teoría de la relatividad"
  },
  {
    letter: "e",
    answer: "Electromagnéticas (ondas)",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Tipo de ondas que viajan por el vacio cósmico a la velocidad de la luz"
  },
  {
    letter: "e",
    answer: "Electrón",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Partícula subatómica con una carga eléctrica elemental negativa"
  },
  {
    letter: "e",
    answer: "Emergentes",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Dícese de las cualidades que posee la materia y que no se encuentran en sus niveles anteriores."
  },
  {
    letter: "e",
    answer: "Emoción",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Estado anímico acompañado de un tono sentimental (placer o dolor), por el que el sujeto -animal u hombre- se da cuenta o vive la conveniencia o nocividad de un objeto sensible"
  },
  {
    letter: "e",
    answer: "Empédocles",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Filósofo griego autor de la teoría de los cuatro elementos o “raíces” constitutivos de la realidad: tierra, aire, fuego y agua"
  },
  {
    letter: "e",
    answer: "Empírico",
    status: NOT_ANSWERED,
    question: "CON LA E. Lo referente a la experiencia sensible"
  },
  {
    letter: "e",
    answer: "Empirismo",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Teoría filosófica propuesta por Locke y Hume que dice que el origen y el valor del conocimiento depende de la experiencia (sentidos)."
  },
  {
    letter: "e",
    answer: "Ente",
    status: NOT_ANSWERED,
    question: "CON LA E. Aquello que es, en cualquiera de los sentidos de ser"
  },
  {
    letter: "e",
    answer: "Entendimiento",
    status: NOT_ANSWERED,
    question:
      "CON LA E. En términos generales, la facultad de pensar, más concretamente, la capacidad humana de penetrar en las cosas sensibles y abstraer de ellas el universal representándolo en forma de concepto"
  },
  {
    letter: "e",
    answer: "Epiciclo",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Círculo que, en la astronomía ptolemaica, se suponía descrito por un planeta alrededor de un centro que se movía en otro círculo alrededor de la Tierra"
  },
  {
    letter: "e",
    answer: "Epicuro de Samos",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Filósofo griego que fundó una escuela alrededor del año 300 a.C. donde desarrollaba la ética del placer de Aristipo. Resumió su filosofía en lo que llamó las ‘’cuatro hierbas curativas’’: A los dioses no hay que temerlos. La muerte no es algo de lo que haya que preocuparse. Es fácil conseguir lo bueno. Lo terrible es fácil de soportar"
  },
  {
    letter: "e",
    answer: "Epísteme",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Término griego que equivale a ciencia. Depende de la realidad, no de nuestra forma de verla. Es un conocimiento racional, sistemático. Es crítico. Explica la totalidad de lo real"
  },
  {
    letter: "e",
    answer: "Epistemología",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Disciplina filosófica que analiza los fundamentos y métodos del conocimiento científico"
  },
  {
    letter: "e",
    answer: "Eppur si mouve",
    status: NOT_ANSWERED,
    question:
      "CON LA E. (tres palabras): famosa frase en latín pronunciada por Galileo Galilei después de abjurar la visión heliocéntrica del mundo ante el tribunal de la Santa Inquisición"
  },
  {
    letter: "e",
    answer: "Escepticismo",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Doctrina que afirma que la verdad no existe, o que, si existe, el hombre es incapaz de conocerla. También alude a la incredulidad o duda acerca de la verdad o eficacia de cualquier cosa"
  },
  {
    letter: "e",
    answer: "Escepticismo",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Actitud que mantiene que la mente humana es incapaz de alcanzar un conocimiento verdadero, acabado y completo de la realidad"
  },
  {
    letter: "e",
    answer: "Esclavitud",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Institución jurídica en la que se admitía la posesión del hombre por el hombre"
  },
  {
    letter: "e",
    answer: "Esencia",
    status: NOT_ANSWERED,
    question: "CON LA E. Aquello que hace que algo sea lo que es y no otra cosa"
  },
  {
    letter: "e",
    answer: "Esferas homocéntricas",
    status: NOT_ANSWERED,
    question:
      "CON LA E. (dos palabras): modelo de Eudoxo de Cnido que dice que el movimiento de un planeta es el resultado del giro de varias esferas a velocidades distintas y en torno a ejes de diferente inclinación."
  },
  {
    letter: "e",
    answer: "Espectroscopio",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Objeto que nos permite estudiar las radiaciones electromagnéticas, identificar las fuentes de donde parten las ondas y reconstruir las condiciones que han encontrado durante el viaje"
  },
  {
    letter: "e",
    answer: "Espíritu",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Término utilizado para referirse a lo mental, el entendimiento, la conciencia, las esencias, el alma, etc."
  },
  {
    letter: "e",
    answer: "Estado",
    status: NOT_ANSWERED,
    question:
      "CON LA E. El poder y la organización jurídica y coercitiva de una comunidad. También se aplica este término a la misma comunidad nacional (España, Francia, etcétera) en cuanto regida y organizada por un solo poder supremo"
  },
  {
    letter: "e",
    answer: "Estética",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Ciencia de lo bello y del arte. En su origen, este término significa tratado de las sensaciones"
  },
  {
    letter: "e",
    answer: "Estímulo",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Objeto capaz de excitar un sentido o facultad superior o de provocar una respuesta en el ser vivo."
  },
  {
    letter: "e",
    answer: "Estoicismo",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Corriente filosófica de la época helenística. Creada por Zenón de Citio en el s. III a.C., entre sus pensadores destacan Séneca y Epícteto"
  },
  {
    letter: "e",
    answer: "Éter",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Sólido cristalino, considerado en la época clásica el elemento celeste del que estaban hechas las estrella, los planetas y las esferas que las transportan"
  },
  {
    letter: "e",
    answer: "Eternidad",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Se dice de una duración sin fin. Boecio la definió (propia sólo de Dios) como 'posesión total, perfecta y simultánea de una vida sin límite'."
  },
  {
    letter: "e",
    answer: "Ética",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Disciplina de la filosofía que se ocupa del estudio racional de la moral, la virtud, el deber, la felicidad y el buen vivir"
  },
  {
    letter: "e",
    answer: "Eudemonismo",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Doctrina moral que establece como fin último subjetivo del hombre la felicidad"
  },
  {
    letter: "e",
    answer: "Evidencia",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Claridad en el objeto por el que se manifiesta la verdad en su conocimiento y se origina el estado de certeza"
  },
  {
    letter: "e",
    answer: "Experimentación",
    status: NOT_ANSWERED,
    question: "CON LA E. Observación provocada"
  },
  {
    letter: "e",
    answer: "Eudoxo de Cnido",
    status: NOT_ANSWERED,
    question:
      "CON LA E. Astrónomo de la academia platónica, elaboró un modelo denominado ‘’de las esferas homocéntricas’’"
  },
  {
    letter: "f",
    answer: "Factible",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Lo que puede hacerse en el campo de las cosas materiales"
  },
  {
    letter: "f",
    answer: "Facultad",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Potencia o poder del alma para la realización de alguna de sus funciones"
  },
  {
    letter: "f",
    answer: "Falacia",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Falsedad. Sofisma o razonamiento falso presentado con apariencia de verdadero, engañoso por lo tanto"
  },
  {
    letter: "f",
    answer: "Falsación",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Procedimiento epistemólogico que defiende que las teorías no pueden ser verificadas, Las teorías serán aceptadas provisionalmente si no pueden ser refutadas con un contra-ejemplo"
  },
  {
    letter: "f",
    answer: "Fantasía",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Función atribuida a la imaginación, la llamada imaginación creadora o combinadora, por la que se entremezclan contenidos imaginativos procedentes de momentos y orígenes diversos, creando situaciones nuevas o imágenes originales en su combinación o estructura"
  },
  {
    letter: "f",
    answer: "Fatalidad",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Forma de determinismo, en el que se supone que cuanto acontece responde a la voluntad de los dioses o fuerzas mágicas superiores"
  },
  {
    letter: "f",
    answer: "Fetichismo",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Fase de la explicación mitológica en la que se atribuye a los objetos materiales una vida análoga a la humana"
  },
  {
    letter: "f",
    answer: "Fe",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Disposición del creyente a abandonarse en las manos de Dios y a aceptar humildemente su palabra"
  },
  {
    letter: "f",
    answer: "Fe",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Creencia en algo sin necesidad de que haya sido confirmado por la experiencia o la razón, o demostrado por la ciencia"
  },
  {
    letter: "f",
    answer: "Felicidad",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Estado de armonía o plenitud interior, reflejo subjetivo de la recta ordenación de la vida hacia su verdadero fin"
  },
  {
    letter: "f",
    answer: "Fenómeno",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Término de origen griego que se traduce por “aparecer” y que es usado por Kant para referirse al “para mí” de la realidad"
  },
  {
    letter: "f",
    answer: "Fetichismo",
    status: NOT_ANSWERED,
    question:
      "CON LA F. También llamado animismo, teoría que cree que los objetos materiales tienen poderes extraordinarios"
  },
  {
    letter: "f",
    answer: "Fideísmo",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Teoría que mantiene que la razón es insuficiente para conocer la realidad de Dios, sólo mediante la fe y la ayuda de Dios se puede conocer su existencia y las verdades por Él reveladas"
  },
  {
    letter: "f",
    answer: "Fijismo",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Postura opuesta al evolucionismo, basada en la no evolución de los seres vivos"
  },
  {
    letter: "f",
    answer: "Filantropía",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Amistad o amor del hombre hacia los otros humanos. Algunos sistemas éticos pretenden basar el deber moral en este impulso y sentimiento"
  },
  {
    letter: "f",
    answer: "Filosofía",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Etimológicamente, amor a la sabiduría Saber racional, totalizador y de segundo grado que se ocupa de “todo cuanto hay”. Es radical y su crítica es más profunda que la de las ciencias"
  },
  {
    letter: "f",
    answer: "Fin",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Último extremo, término o acabamiento de algo íntegro, o de una etapa de ese todo"
  },
  {
    letter: "f",
    answer: "Finalismo",
    status: NOT_ANSWERED,
    question: "CON LA F. Sinónimo de teleologismo, es la base del organicismo"
  },
  {
    letter: "f",
    answer: "Finito",
    status: NOT_ANSWERED,
    question: "CON LA F. Que tiene límite. Limitado"
  },
  {
    letter: "f",
    answer: "Forma",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Dentro de la teoría hilemorfista aristotélica, 'un principio activo, causa u origen de las perfecciones específicas de un ser, y principio de inteligibilidad'. Se opone a materia"
  },
  {
    letter: "f",
    answer: "Fundamento",
    status: NOT_ANSWERED,
    question: "CON LA F. Causa o razón de ser de algo"
  },
  {
    letter: "f",
    answer: "Física",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Ciencia natural que estudia las propiedades y el comportamiento de la energía y la materia, así como al tiempo, el espacio y las interacciones de estos cuatro conceptos entre sí."
  },
  {
    letter: "f",
    answer: "Freud, Sigmund",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Médico austriaco (1856-1939), fundador del psicoanálisis"
  },
  {
    letter: "f",
    answer: "Fundado",
    status: NOT_ANSWERED,
    question:
      "CON LA F. Dícese del conocimiento que es capaz de demostrar sus afirmaciones"
  },
  {
    letter: "g",
    answer: "Galileo Galilei",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Astrónomo, filósofo, matemático y físico italiano del siglo XVII, relacionado con la revolución científica. Critica los fundamentos de la física aristotélica y propone sus propias leyes del movimiento"
  },
  {
    letter: "g",
    answer: "Generación",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Producción de algo; paso del no ser al ser. Se le opone corrupción"
  },
  {
    letter: "g",
    answer: "Gloria",
    status: NOT_ANSWERED,
    question: "CON LA G. Bienaventuranza o contemplación de Dios"
  },
  {
    letter: "g",
    answer: "Género",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Grupo biológico que agrupa a especies que comparten ciertos caracteres"
  },
  {
    letter: "g",
    answer: "Geocentrismo",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Teoría astronómica que consideraba  la Tierra como centro del universo"
  },
  {
    letter: "g",
    answer: "Geoestaticismo",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Principio platónico que entiende que la Tierra no tiene movimiento, está inmóvil"
  },
  {
    letter: "g",
    answer: "Giordano",
    status: NOT_ANSWERED,
    question:
      "CON LA G. De apellido Bruno, filósofo italiano del s. XVI, acusado de panteísta fue quemado en la hoguera por hereje"
  },
  {
    letter: "g",
    answer: "Globalización",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Proceso mediante el cual la economía, la cultura, la política, el medio ambiente… sufren los efectos de la interdependencia internacional y de la disolución de las fronteras"
  },
  {
    letter: "g",
    answer: "Gnoseología",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Disciplina filosófica que se ocupa del estudio del origen y el fundamento del conocimiento en general"
  },
  {
    letter: "g",
    answer: "Gnosticismo",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Teoría filosófico-religiosa de la época helenística que suponía a la razón una superioridad sobre la fe (o pistis), de modo tal, que el contenido de ésta sería sólo una popularización de ese saber más alto"
  },
  {
    letter: "g",
    answer: "Gracia",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Don gratuito, no debido ni merecido. En teología, un don sobrenatural que eleva nuestra condición a hijos de Dios y nos ayuda en el cumplimiento moral"
  },
  {
    letter: "g",
    answer: "Gravedad",
    status: NOT_ANSWERED,
    question:
      "CON LA G. Fuerza que provoca un gran cuerpo celeste sobre otros. Es distinta en cada planeta y determina la masa de sus cuerpos"
  },
  {
    letter: "h",
    answer: "Hábito",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Tendencia que se adquiere por la repetición de los actos y que nos dispone a realizarlos con mayor facilidad, rapidez, perfección y con menor consciencia. También se le ha llamado 'segunda naturaleza'"
  },
  {
    letter: "h",
    answer: "Hecho",
    status: NOT_ANSWERED,
    question: "CON LA H. Cuanto acontece o sucede en la Naturaleza"
  },
  {
    letter: "h",
    answer: "Hombre",
    status: NOT_ANSWERED,
    question: "CON LA H. Animal racional"
  },
  {
    letter: "h",
    answer: "Hecho",
    status: NOT_ANSWERED,
    question: "CON LA H. Todo cuanto acontece o sucede en la naturaleza"
  },
  {
    letter: "h",
    answer: "Hedonismo",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Teoría moral que identifica el bien con el placer y que habitualmente se asocia con la posición defendida por Epicuro de Samos y su escuela"
  },
  {
    letter: "h",
    answer: "Hegel",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Filósofo romántico alemán nacido en 1770 que utilizó el método dialéctico para explicar el despliegue de la realidad"
  },
  {
    letter: "h",
    answer: "Heisemberg",
    status: NOT_ANSWERED,
    question: "CON LA H. Físico que formula en principio de incertidumbre"
  },
  {
    letter: "h",
    answer: "Helenismo",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Período de la cultura griega que va desde Alejandro Magno hasta Augusto, y se caracteriza sobre todo por la absorción de elementos de las culturas de Asia Menor y de Egipto."
  },
  {
    letter: "h",
    answer: "Heliocentrismo",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Sistema astronómico que considera al Sol como el centro del universo "
  },
  {
    letter: "h",
    answer: "Heráclito (de Éfeso)",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Filósofo de la naturaleza en la época clásica que afirmaba que ‘’Todo fluye’’, es decir, todo está en movimiento y nada dura eternamente. Opinaba que había una ‘’razón universal’’ que dirigía todos los cambios en la naturaleza"
  },
  {
    letter: "h",
    answer: "Hermenéutica",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Ciencia de la interpretación de textos religiosos, jurídicos y literarios. Por extensión, método de comprensión interpretativa de todo fenómeno humano"
  },
  {
    letter: "h",
    answer: "Heterogéneo",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Formado por componentes o partes de distinta naturaleza"
  },
  {
    letter: "h",
    answer: "Hilemorfismo",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Teoría aristotélica según la cual todos los seres están compuestos de materia y forma."
  },
  {
    letter: "h",
    answer: "Hipócrates",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Fundador de la ciencia griega de la medicina que afirmaba que la protección más importante contra la enfermedad era la moderación y una vida sana. Formuló un juramento que lleva su nombre y que hoy en día equivale a guardar el secreto profesional para los médicos"
  },
  {
    letter: "h",
    answer: "Hipótesis",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Antecedente de una proposición condicional. Enunciado que sólo se puede probar por sus consecuencias"
  },
  {
    letter: "h",
    answer: "Hipótesis",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Suposición o conjetura que el científico propone provisionalmente para interpretar o dar solución a determinados hecho problemáticos"
  },
  {
    letter: "h",
    answer: "Hipotético",
    status: NOT_ANSWERED,
    question: "CON LA H. Que está sometido a alguna condición"
  },
  {
    letter: "h",
    answer: "Homero",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Poeta épico griego al que la tradición atribuye la composición de la Iliada y la Odisea"
  },
  {
    letter: "h",
    answer: "Homogéneo",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Dícese de aquello que posee el mismo género o naturaleza. Formado por elementos con una serie de características comunes referidas a su clase que permiten una relación entre ellos de semejanza"
  },
  {
    letter: "h",
    answer: "Hubble, Edwin Powell",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Astrónomo que en 1928 sugiere la hipótesis de la expansión del Universo y que descubre la aplicación a la luz del efecto Doppler"
  },
  {
    letter: "h",
    answer: "Humanismo",
    status: NOT_ANSWERED,
    question: "CON LA H. Doctrina que muestra al hombre como centro del mundo"
  },
  {
    letter: "h",
    answer: "Hume",
    status: NOT_ANSWERED,
    question:
      "CON LA H. Filósofo inglés del s. XVIII que separó las conexiones entre fe y razón y que solo admitía como origen del conocimiento la existencia de sensaciones seguras"
  },
  {
    letter: "i",
    answer: "Idealismo (trascendental)",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Concepción epistemológica y metafísica propuesta por Immanuel Kant en el s. XVIII que establece que el conocimiento está limitado debido al condicionamiento de la mente humana"
  },
  {
    letter: "i",
    answer: "Ideas",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Para Platón es la verdadera realidad,  eterna,  inmutable, inteligible..."
  },
  {
    letter: "i",
    answer: "Ideas innatas",
    status: NOT_ANSWERED,
    question:
      "CON LA I. (dos palabras) ideas y principio que posee el entendimiento humano en sí mismo y que no proceden de la experiencia"
  },
  {
    letter: "i",
    answer: "Identidad",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Idea que las personas se forman sobre quiénes son y sobre lo que tiene sentido para ellas"
  },
  {
    letter: "i",
    answer: "Ideología",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Sistema de valores, creencias y opiniones de un grupo social determinado"
  },
  {
    letter: "i",
    answer: "Ignorancia",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Falta de conocimientos. Según Sócrates esta era la razón que incitaba a la reflexión filosófica"
  },
  {
    letter: "i",
    answer: "Ilógico",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Lo que carece de fundamento racional o es incoherente. Falta de lógica"
  },
  {
    letter: "i",
    answer: "Ilustración",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Época histórica y movimiento cultural e intelectual europeo –especialmente en Francia e Inglaterra–que se desarrolló desde fines del siglo XVII hasta el inicio de la Revolución francesa"
  },
  {
    letter: "i",
    answer: "Imagen",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Representación sensible de un objeto. Reproducción de un objeto sensible en ausencia del mismo"
  },
  {
    letter: "i",
    answer: "Imaginación",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Capacidad de los humanos que les permite proyectarse hacia el futuro"
  },
  {
    letter: "i",
    answer: "Inconsciente",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Término introducido por Leibniz para designar a las pequeñas percepciones que no alcanzan el límite de la consciencia. El psicoanálisis freudiano ha dado un amplio desarrollo a esta función psíquica"
  },
  {
    letter: "i",
    answer: "Individualismo",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Postura que destaca la importancia del individuo frente al grupo"
  },
  {
    letter: "i",
    answer: "Indeterminismo",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Forma de pensamiento que sostiene que los actos de la voluntad son espontáneos y no determinados"
  },
  {
    letter: "i",
    answer: "Inducción",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Forma de razonamiento con el cual, de casos particulares documentados y enumerados, se obtiene una conclusión o ley universal"
  },
  {
    letter: "i",
    answer: "Inductivo (Pensamiento)",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Dícese del razonamiento en el que se parte de unos datos menos generales que la conclusión a la que se llega. La conclusión nunca posee un carácter necesario, es solamente probable"
  },
  {
    letter: "i",
    answer: "Infundado",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Que no demuestra la verdad o falsedad de sus afirmaciones"
  },
  {
    letter: "i",
    answer: "Ingenio",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Facultad inventiva de la mente, de carácter predominantemente práctico, muy relacionada con la imaginación creadora o fantasía"
  },
  {
    letter: "i",
    answer: "Inmanente",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Principio o causa cuya acción está dentro de la experiencia, de la naturaleza. Se opone a trascendente"
  },
  {
    letter: "i",
    answer: "Inmortalidad",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Condición de no ser afectado por la muerte, propia del alma en tanto que sustancia espiritual"
  },
  {
    letter: "i",
    answer: "Innatismo",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Teoría que supone en el espíritu humano ideas o conocimientos prácticos que nacen con el mismo"
  },
  {
    letter: "i",
    answer: "Instinto",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Fuente de tendencias apetitivas y de movimientos de carácter innato, específico y complejo. Son más fuertes en el animal, porque en el hombre se suplen en parte por la inteligencia"
  },
  {
    letter: "i",
    answer: "Instrumentalismo",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Corriente de pensamiento que considera las teorías científicas simples instrumentos con los que explicamos las relaciones que se dan entre los elementos de un conjunto de fenómenos observables y que nos permiten predecir su comportamiento"
  },
  {
    letter: "i",
    answer: "Intelecto",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Del latin intus - legere (leer dentro). En la filosofía aristotélica, escolástica y en gran parte de la moderna, hasta Kant, este término designa la facultad de todo conocimiento universal"
  },
  {
    letter: "i",
    answer: "Inteligencia",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Capacidad que posee todo ser vivo de adaptarse a su entrono para obtener algún beneficio"
  },
  {
    letter: "i",
    answer: "Inteligible",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Lo que puede ser entendido. El objeto del entendimiento o intelecto"
  },
  {
    letter: "i",
    answer: "Interacción",
    status: NOT_ANSWERED,
    question: "CON LA I. Acción recíproca o mutua"
  },
  {
    letter: "i",
    answer: "Interdisciplinariedad",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Cualidad de la filosofía. Según esta, dicha disciplina otorga cierta unidad a todo el cuerpo de conocimientos"
  },
  {
    letter: "i",
    answer: "Interpretación",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Acción de referir un signo a su significado, aclarando así su sentido"
  },
  {
    letter: "i",
    answer: "Intersubjetividad",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Principio que defiende que la validez de los argumentos viene dada por el consenso, e implica un uso del lenguaje"
  },
  {
    letter: "i",
    answer: "Introspección",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Método psicológico por el que el sujeto observa y describe sus fenómenos psíquicos como vivencias propias"
  },
  {
    letter: "i",
    answer: "Intuición",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Conocimiento por relación directa con el objeto conocido. Se opone a conocimiento intelectivo o discursivo"
  },
  {
    letter: "i",
    answer: "Invención",
    status: NOT_ANSWERED,
    question: "CON LA I. Hallazgo o descubrimiento"
  },
  {
    letter: "i",
    answer: "Ironía",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Actitud que infravalora el objeto tratado, considerándolo desde fuera y críticamente. Fue famosa la utilizada por Sócrates, para destruir el falso saber que carece de fundamento racional"
  },
  {
    letter: "i",
    answer: "Irracional",
    status: NOT_ANSWERED,
    question: "CON LA I. Que carece de razón"
  },
  {
    letter: "i",
    answer: "Iusnaturalismo",
    status: NOT_ANSWERED,
    question:
      "CON LA I. Teoría sobre el derecho natural en su versión moderna (Grocio, Hobbes), que desposee a éste de su origen divino para concebirlo como fruto de la razón"
  },
  {
    letter: "j",
    answer: "Jenófanes",
    status: NOT_ANSWERED,
    question:
      "CON LA J. Filósofo griego de la escuela de Elea, s. VI a.C., que criticó la visión antropomórfica de los dioses griegos"
  },
  {
    letter: "j",
    answer: "Jesucristo",
    status: NOT_ANSWERED,
    question: "CON LA J. Hijo de Dios, Mesías y salvador"
  },
  {
    letter: "j",
    answer: "Jónica,(escuela): ",
    status: NOT_ANSWERED,
    question:
      "CON LA J. Escuela filosófica griega del s. VI a.C. Sus principales representantes fueron los filósofos de la escuela de Mileto. Su rasgo común es la visión naturalista de la realidad"
  },
  {
    letter: "j",
    answer: "Juicio",
    status: NOT_ANSWERED,
    question:
      "CON LA J. Acto mental por medio del cual nos formamos una opinión de algo. Proceso por el que decidimos conscientemente que algo es de un modo u otro"
  },
  {
    letter: "j",
    answer: "Juicio",
    status: NOT_ANSWERED,
    question:
      "CON LA J. En su sentido lógico, forma del pensamiento por la que un concepto es afirmado o negado"
  },
  {
    letter: "j",
    answer: "Judaísmo",
    status: NOT_ANSWERED,
    question:
      "CON LA J. Religión fundada por Abraham y transmitida por su hijo Isaac y luego por Jacob. Se considera la religión de los descendientes de Israel (nombre dado por Dios a Jacob)."
  },
  {
    letter: "j",
    answer: "Justicia",
    status: NOT_ANSWERED,
    question:
      "CON LA J. Virtud que inclina a dar a cada uno lo que le corresponde o le pertenece. Aquello que, según el derecho o la razón, debe hacerse"
  },
  {
    letter: "k",
    answer: "Kant",
    status: NOT_ANSWERED,
    question:
      "CON LA K. Filósofo de la Ilustración que adelantó importantes trabajos en los campos de la ciencia, el derecho, la moral, la religión y la historia, inclusive creía haber logrado un compromiso entre el empirismo y el racionalismo"
  },
  {
    letter: "k",
    answer: "Kant",
    status: NOT_ANSWERED,
    question:
      "CON LA K. Filósofo alemán del s. XVIII que realiza una síntesis superadora de los planteamientos racionalistas y empiristas y formula el problema del origen y de los límites del conocimiento desde un punto de vista nuevo"
  },
  {
    letter: "k",
    answer: "Kepler",
    status: NOT_ANSWERED,
    question:
      "CON LA K. Primer filósofo del siglo XVII que sostuvo que los planetas recorren órbitas elípticas con el Sol en uno de sus focos y que en el universo rigen las mismas leyes siendo la Tierra un planeta más"
  },
  {
    letter: "k",
    answer: "Keynes",
    status: NOT_ANSWERED,
    question:
      "CON LA K. Economista que propuso utilizar conjuntamente las señales del mercado y las directrices del Estado para resolver los problemas económicos, dando lugar a una economía mixta entre el sistema de economía de mercado y el sistema de economía planificada"
  },
  {
    letter: "k",
    answer: "Kierkegaard",
    status: NOT_ANSWERED,
    question:
      "CON LA K. Filósofo y teólogo nacido en Copenhague en 1813, de quien hereda su melancolía la filosofía. Se le considera padre del existencialismo"
  },
  {
    letter: "k",
    answer: "Berkeley",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA K) influyente filósofo irlandés  cuyo principal logro fue el desarrollo de la filosofía conocida como idealismo subjetivo, resumido en la frase: «ser es ser percibido o percibir»"
  },
  {
    letter: "k",
    answer: "Lamarck, Jean Baptiste",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA K) naturalista francés del s, XIX, padre del transformismo, Formuló la primera teoría de la evolución biológica, en 1802 acuñó el término «biología» para designar la ciencia de los seres vivos y fue el fundador de la paleontología de los invertebrados"
  },
  {
    letter: "k",
    answer: "Locke",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA K) pensador inglés considerado el padre del empirismo y del liberalismo moderno. Fue la persona que, junto a Hume, desarrolló la idea del método de conocimiento empirista"
  },
  {
    letter: "k",
    answer: "Ockham",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA K) Filósofo inglés del s. XIV al que se le atribuye la frase: «en igualdad de condiciones, la explicación más sencilla suele ser la correcta»"
  },
  {
    letter: "k",
    answer: "Shakespeare, William",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA K) escritor anglosajón. Su cita más famosa es: ''ser o no ser, ésa es la cuestión'."
  },
  {
    letter: "l",
    answer: "Laicismo",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Posición adoptada por quienes postulan un discurso totalmente ajeno al discurso religioso, independientemente de que se trate de esta o aquella religión"
  },
  {
    letter: "l",
    answer: "Lamettrie",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Médico y filósofo francés que escribió a mediados del s.XVII un libro que tiene como título: “L’Homme-machine” que significa: “El hombre máquina”."
  },
  {
    letter: "l",
    answer: "Laplace",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Matemático francés que expresó un concepto extremadamente mecánico.  Desarrolló a su vez la ecuación conocida con su propio nombre y compartió la doctrina filosófica del determinismo científico"
  },
  {
    letter: "l",
    answer: "Legitimidad",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Término que hace referencia a la validez del poder político, es decir, al fundamento por el cual los gobernados están obligados a obedecer"
  },
  {
    letter: "l",
    answer: "Leviatán",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Monstruo bíblico que, según Santo Tomás, tiene como función castigar a los pecadores"
  },
  {
    letter: "l",
    answer: "Ley científica",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Explicación de carácter universal que describe cómo sucederá un fenómeno concreto"
  },
  {
    letter: "l",
    answer: "Leyenda",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Narración de hechos naturales, sobrenaturales o mezclados, que se transmite de generación en generación en forma oral o escrita"
  },
  {
    letter: "l",
    answer: "Libertad",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Capacidad de obrar sin impedimentos, de autodeterminarse, lo que supone la posibilidad de elegir tanto los fines como los medios que se consideren adecuados para alcanzar dichos fines"
  },
  {
    letter: "l",
    answer: "Libido",
    status: NOT_ANSWERED,
    question: "CON LA L. En lenguaje freudiano, tendencia sexual"
  },
  {
    letter: "l",
    answer: "Local",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Nombre del movimiento de la física aristotélica que comprende el cambio de lugar, y se divide en movimiento natural o violento"
  },
  {
    letter: "l",
    answer: "Lógica",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Disciplina estudia las condiciones que debe tener todo pensamiento coherente"
  },
  {
    letter: "l",
    answer: "Logos",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Palabra griega que alude tanto al orden o ley que rige la realidad, la a razón humana que intenta descubrir ese orden culto y a la palabra que expresa ese pensamiento"
  },
  {
    letter: "l",
    answer: "Lutero",
    status: NOT_ANSWERED,
    question:
      "CON LA L. Teólogo y fraile católico agustino que comenzó e impulsó la reforma religiosa en Alemania, y en cuyas enseñanzas se inspiró la Reforma Protestante y la doctrina teológica y cultural por él impulsada, cuya denominación está altamente relacionada con su nombre"
  },
  {
    letter: "m",
    answer: "Magia",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Explicación pre-racional cuyo objetivo es dar solución a problemas de tipo práctico"
  },
  {
    letter: "m",
    answer: "Mal",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Noción correlativa en oposición a bien. Se dice de la acción moral que no se ajusta a la norma"
  },
  {
    letter: "m",
    answer: "Maniqueos",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Pertenecientes a una secta mitad religiosa mitad filosófica que creía que el mundo está dividido en bien y mal, luz y oscuridad"
  },
  {
    letter: "m",
    answer: "Mariposa",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Nombre del efecto en el que pequeñas variaciones métricas tienen repercusiones enormes en el resultado final, hasta el punto de ser impredecibles"
  },
  {
    letter: "m",
    answer: "Matemáticas",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Ciencia que se caracteriza por el rigor, exactitud y validez universal  de sus demostraciones que fue la principal herramienta de la Ciencia Mecanicista"
  },
  {
    letter: "m",
    answer: "Materia",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Aquello de lo que las cosas están hechas, que percibimos por los sentidos, permanece a pesar de los cambios y que tiene la posibilidad de convertirse en otra cosa "
  },
  {
    letter: "m",
    answer: "Materialismo",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Teoría filosófica que reduce todos los fenómenos de la naturaleza a magnitudes físicas concretas"
  },
  {
    letter: "m",
    answer: "Mecanicismo",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Doctrina filosófica del siglo XVII, que afirma que la única forma de causalidad es la influencia física entre las entidades que conforman el mundo material, cuyos límites coincidirían con el mundo real"
  },
  {
    letter: "m",
    answer: "Mediato",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Tipo de conocimiento que se obtiene a través de distintos pasos intermedios, ejemplo de este tipo de conocimiento son la inducción, la deducción y la reflexión"
  },
  {
    letter: "m",
    answer: "Memoria",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Facultad de conocimiento por la que reproducimos sensaciones, percepciones o contenidos ideales pasados en tanto que pasados. Facultad sensitiva de conocimiento, común al hombre y al animal"
  },
  {
    letter: "m",
    answer: "Mentalidad",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Conjunto de creencias, ideas, actitudes y hábitos de un hombre (o de un pueblo, civilización, etc)"
  },
  {
    letter: "m",
    answer: "Mentira",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Falta a la verdad con intención de engañar. Se distingue del error en que, en éste, falta esa intención"
  },
  {
    letter: "m",
    answer: "Metafísica",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Disciplina de la filosofía que estudia la realidad desde sus primeros principios o causas"
  },
  {
    letter: "m",
    answer: "Método",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Etimológicamente, 'camino hacia'. Todo sistema o técnica para la investigación de lo que es o del hacer. Se divide en deductivo, inductivo…"
  },
  {
    letter: "m",
    answer: "Microcosmos",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Llámase así al hombre por cuanto en su ser abarca y compendia todas las funciones y modos de ser que existen en el Cosmos"
  },
  {
    letter: "m",
    answer: "Milagro",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Hecho excepcional de origen sobrenatural que consiste en la suspensión en un caso de alguna de las leyes naturales. Se atribuye a la Providencia divina, en orden a un bien superior "
  },
  {
    letter: "m",
    answer: "Mileto",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Antigua ciudad griega de la costa occidental de Anatolia, donde nació el filósofo y científico griego Tales"
  },
  {
    letter: "m",
    answer: "Misterio",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Algo que se desconoce y que no puede afrontarse con el conocimiento sensible ni intelectual por obedecer a causas superiores a las facultades humanas de conocimiento. Puede ser objeto de revelación y, en el hombre, de fe"
  },
  {
    letter: "m",
    answer: "Misticismo",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Doctrina que admite un posible acceso en este mundo a la vida contemplativa de lo sobrenatural. Conjunto de vías y procedimientos para alcanzarla"
  },
  {
    letter: "m",
    answer: "Mito",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Relato tradicional que se refiere a acontecimientos prodigiosos, protagonizados por seres sobrenaturales o extraordinarios, tales como dioses, semidioses, héroes, monstruos o personajes fantásticos"
  },
  {
    letter: "m",
    answer: "Mitología",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Conjunto de mitos relativamente cohesionado y relatos que forman parte de una determinada religión o cultura"
  },
  {
    letter: "m",
    answer: "Monoteísmo",
    status: NOT_ANSWERED,
    question: "CON LA M. Creencia en la existencia de un solo Dios"
  },
  {
    letter: "m",
    answer: "Monismo",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Teoría metafísica que afirma que todo lo que existe se explica a partir de una sola sustancia o elemento"
  },
  {
    letter: "m",
    answer: "Movimiento",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Cualquier cambio de un ser. Aristóteles lo definió como el tránsito de la potencia al acto"
  },
  {
    letter: "m",
    answer: "Motor inmóvil",
    status: NOT_ANSWERED,
    question:
      "CON LA M. (palabra compuesta) según Aristóteles, explicación fundamento y garantía de la eternidad del movimiento"
  },
  {
    letter: "m",
    answer: "Muerte",
    status: NOT_ANSWERED,
    question:
      "CON LA M. Término de la vida por disolución de los elementos del ser vivo o separación del alma"
  },
  {
    letter: "n",
    answer: "Nada",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Término empleado en dos sentidos: como negación de ser o no-ser absoluto"
  },
  {
    letter: "n",
    answer: "Naturaleza",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Conjunto de realidades que forman la totalidad del universo, a excepción de las producidas artificialmente por el ser humano"
  },
  {
    letter: "n",
    answer: "Necesario",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Dícese de la realidad o fenómeno que no puede no ser ni puede cambiar"
  },
  {
    letter: "n",
    answer: "Neoplatonismo  ",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Corriente Filosófica más destacable en la antigüedad que estaba inspirada sobre todo en la teoría de las ideas platónica"
  },
  {
    letter: "n",
    answer: "Neopositivismo",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Llamado también “empirismo lógico”, o “positivismo lógico”, es uno de los movimientos filosóficos más importantes de la primera mitad del siglo XX. Se suele situar su nacimiento y desarrollo en el período de entreguerras"
  },
  {
    letter: "n",
    answer: "Nihilismo",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Término que se aplica a algunas teorías para indicar que sus consecuencias, directamente o por 'reducción al absurdo', conducen a la negación de la realidad o a su no inteligibilidad"
  },
  {
    letter: "n",
    answer: "Nombre",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Palabra o conjunto de símbolos designativos de un objeto"
  },
  {
    letter: "n",
    answer: "Nominalismo",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Teoría filosófica para la cual los universales no tienen existencia objetiva, no existen ni como formas separadas ni como esencias ni como conceptos; son simples nombres. Guillermo de Ockam (siglo XIV) es su defensor más conocido"
  },
  {
    letter: "n",
    answer: "Nomos",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Para los griegos, ley política incuestionable que garantiza la libertad individual y regula la actividad política hasta dentro. Término opuesto a physis, a ley natural"
  },
  {
    letter: "n",
    answer: "Normas",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Conjunto de valores que deben regir el comportamiento moral del individuo, propias de la ética o estudio de los valores"
  },
  {
    letter: "n",
    answer: "Nous",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Visión intelectual de la verdad, conocimiento intelectual e inmediato de las esencias de las cosas"
  },
  {
    letter: "n",
    answer: "Noúmeno",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Término griego utilizado por Kant para referirse al “en sí” de la realidad, límite incognoscible del conocimiento"
  },
  {
    letter: "n",
    answer: "Nuclear (Fuerza)",
    status: NOT_ANSWERED,
    question:
      "CON LA N. Fuerza que tiene origen exclusivamente en el interior de los núcleos atómicos"
  },
  {
    letter: "o",
    answer: "Objeción",
    status: NOT_ANSWERED,
    question: "CON LA O. Argumento que contradice una tesis propuesta"
  },
  {
    letter: "o",
    answer: "Objetividad",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Se dice de la intención de ver o expresar la realidad tal como es"
  },
  {
    letter: "o",
    answer: "Objetivismo  ",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Tesis filosófica según la cual la verdad es una y la misma para todos los seres racionales y no depende de ningún factor físico, psicológico o cultural de las personas que la piensan. Es la teoría contraria al relativismo"
  },
  {
    letter: "o",
    answer: "Observación",
    status: NOT_ANSWERED,
    question: "CON LA O. Comprobación simple de un hecho"
  },
  {
    letter: "o",
    answer: "Ocasión",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Circunstancia o realidad que facilita el ejercicio de la causalidad"
  },
  {
    letter: "o",
    answer: "Odín",
    status: NOT_ANSWERED,
    question: "CON LA O. Dios de la mitología nórdica padre de Thor"
  },
  {
    letter: "o",
    answer: "Odio",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Según Empédocles, fuerza cósmica opuesta al Amor o Amistad y que es la causa de la separación, de la desagregación de los elementos"
  },
  {
    letter: "o",
    answer: "Oligarquía",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Gobierno ejercido por unos pocos. Se considera corrupción de la aristocracia , gobierno de los mejores"
  },
  {
    letter: "o",
    answer: "Omnipotente",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Poder sin límites, inagotable, infinito. En la religión monoteísta lo tiene Dios"
  },
  {
    letter: "o",
    answer: "Omnisciente",
    status: NOT_ANSWERED,
    question: "CON LA O. Saber absoluto poseído por Dios"
  },
  {
    letter: "o",
    answer: "Onírico",
    status: NOT_ANSWERED,
    question: "CON LA O. Referido a los sueños"
  },
  {
    letter: "o",
    answer: "Ontología",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Ciencia que estudia el ser en cuanto ser y sus atributos trascendentes"
  },
  {
    letter: "o",
    answer: "Opinión  ",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Nombre que da Platón a una de las formas de conocimiento. Este conocimiento se fundamenta en la percepción, se refiere al Mundo Sensible, a las cosas espacio-temporales, a las entidades corporales, y, en la escala de los conocimientos, es el género de conocimiento inferior e incluye lo que llama “conjetura” y la “creencia”"
  },
  {
    letter: "o",
    answer: "Oráculo",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Respuesta que da una deidad por medio de sacerdotes, una Pitonisa griega y romana o incluso a través de interpretaciones de señales físicas"
  },
  {
    letter: "o",
    answer: "Orden",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Colocación de las cosas en el lugar que les corresponde"
  },
  {
    letter: "o",
    answer: "Organicismo",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Postura filosófica que considera a los universos y a sus piezas como conjuntos orgánicos y - ya sea por analogía o literalmente - como organismos vivos"
  },
  {
    letter: "o",
    answer: "Origen",
    status: NOT_ANSWERED,
    question: "CON LA O. En sentido cronológico, inicio"
  },
  {
    letter: "o",
    answer: "Oscura",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Materia que forma el 90% de la materia total del Universo"
  },
  {
    letter: "o",
    answer: "Ousía  ",
    status: NOT_ANSWERED,
    question:
      "CON LA O. Término griego. En latín 'substantia'. Etimológicamente significa 'lo que está debajo'. El ser independiente del cual se predican los atributos"
  },
  {
    letter: "p",
    answer: "Pagano  ",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Que no es cristiano, sino de cualquier otra religión, en especial de aquellas en que se adora a varios dioses"
  },
  {
    letter: "p",
    answer: "Panteísmo",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Actitud filosófica que afirma la identidad entre Dios y el mundo y niega la transcendencia de Dios"
  },
  {
    letter: "p",
    answer: "Parapsicología",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Pretendida ciencia de fenómenos y facultades psíquicos superiores a los conocidos o inasequibles por los procedimientos conocidos"
  },
  {
    letter: "p",
    answer: "Paradigma",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Visión científica del mundo que predomina en cada época histórica"
  },
  {
    letter: "p",
    answer: "Paralaje",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Desviación angular de la posición aparente de un objeto, dependiendo del punto de vista elegido. Los griegos rechazaron la teoría de Aristarco de Samos sobre la traslación terrestre, alegando que en el movimiento estelar no se observaba este fenómeno"
  },
  {
    letter: "p",
    answer: "Parménides",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Filósofo presocrático  que se basaba principalmente en la razón y afirmaba que las sensaciones no son de fiar, que nos ofrecen una imagen errónea de la realidad"
  },
  {
    letter: "p",
    answer: "Parte",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Entidad menor que el todo y ceñida por sus propios límites"
  },
  {
    letter: "p",
    answer: "Pecado",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Transgresión voluntaria de la ley moral, en cuanto ofensa a Dios de quien es la ley"
  },
  {
    letter: "p",
    answer: "Pedagogía",
    status: NOT_ANSWERED,
    question: "CON LA P. Práctica de la educación o teoría de la misma"
  },
  {
    letter: "p",
    answer: "Pena",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Castigo o privación para el culpable de una infracción de la ley positiva o de la ley natural"
  },
  {
    letter: "p",
    answer: "Pensamiento",
    status: NOT_ANSWERED,
    question:
      "CON LA P. En general, la actividad mental o espiritual. En particular, la actividad racional o discursiva"
  },
  {
    letter: "p",
    answer: "Percepción",
    status: NOT_ANSWERED,
    question: "CON LA P. Captación sensible del objeto como tal"
  },
  {
    letter: "p",
    answer: "Persona",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Etimológicamente, máscara que en la tragedia griega expresaba el carácter del actor. Según la definición clásica de Boecio: 'Sustancia individual de naturaleza racional'"
  },
  {
    letter: "p",
    answer: "Personalidad",
    status: NOT_ANSWERED,
    question: "CON LA P. Carácter o modo de ser y reaccionar de una persona"
  },
  {
    letter: "p",
    answer: "Pitágoras",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Filósofo y matemático griego considerado el primer matemático puro, autor de un famoso teorema matemático"
  },
  {
    letter: "p",
    answer: "Planetas",
    status: NOT_ANSWERED,
    question:
      "CON LA P. En la antigua Grecia, estrellas que no mantienen su distancia relativa y que se mueven siguiendo trayectorias irregulares"
  },
  {
    letter: "p",
    answer: "Platón",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Filósofo griego seguidor de Sócrates y maestro de Aristóteles. En 387 fundó la Academia. Intentó también plasmar en un Estado real su original teoría política, razón por la cual viajó tres veces a Siracusa, Sicilia, con intenciones de poner en práctica allí su proyecto"
  },
  {
    letter: "p",
    answer: "Politeísmo",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Sistema religioso cuyos seguidores creen en la existencia de múltiples dioses o divinidades, normalmente organizadas en una jerarquía o panteón"
  },
  {
    letter: "p",
    answer: "Política",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Disciplina filosófica que se ocupa de la actividad, en virtud de la cual una sociedad libre, compuesta por hombres libres, resuelve los problemas que le plantea su convivencia colectiva"
  },
  {
    letter: "p",
    answer: "Posible",
    status: NOT_ANSWERED,
    question: "CON LA P. Aquello que puede ser"
  },
  {
    letter: "p",
    answer: "Positivismo",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Teoría fundada por A. Comte, según la cual el único saber posible es el de las ciencias experimentales o físico-matemáticas, con exclusión de la metafisica y la teología"
  },
  {
    letter: "p",
    answer: "Postulado",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Proposición no demostrable cuya verdad se acepta de modo provisional como punto de partida previo y necesario para el estudio del problema"
  },
  {
    letter: "p",
    answer: "Potencia",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Principio de movimiento o cambio. En el aristotelismo, principio metafísico (capacidad de ser) que, unido al acto , explica la realidad del movimiento"
  },
  {
    letter: "p",
    answer: "Práctico",
    status: NOT_ANSWERED,
    question: "CON LA P. Lo referente a la acción"
  },
  {
    letter: "p",
    answer: "Pragmatismo",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Sistema filosófico que establece como criterio de verdad la utilidad en orden a la acción"
  },
  {
    letter: "p",
    answer: "Pre-estructural (Nivel)",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Dícese del nivel de organización de la materia en el que se incluyen las partículas elementales"
  },
  {
    letter: "p",
    answer: "Prejuicio",
    status: NOT_ANSWERED,
    question: "CON LA P. Afirmación previa al conocimiento adecuado de una cosa"
  },
  {
    letter: "p",
    answer: "Presocráticos",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Filósofos del primer periodo de la filosofía griega, anterior a Sócrates"
  },
  {
    letter: "p",
    answer: "Principio",
    status: NOT_ANSWERED,
    question: "CON LA P. Punto de partida o fundamento de algo o de un proceso"
  },
  {
    letter: "p",
    answer: "Problema",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Lo que es desconocido, pero puede abordarse por la razón o los sentidos. Lo que supone una opción o alternativa difícil o una incertidumbre"
  },
  {
    letter: "p",
    answer: "Proposición",
    status: NOT_ANSWERED,
    question: "CON LA P. Expresión del juicio"
  },
  {
    letter: "p",
    answer: "Protágoras",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Filósofo sofista a quién se atribuye la afirmación: “El hombre es la medida de todas las cosas”"
  },
  {
    letter: "p",
    answer: "Protón",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Partícula subatómica con una carga eléctrica elemental positiva"
  },
  {
    letter: "p",
    answer: "Providencia",
    status: NOT_ANSWERED,
    question:
      "CON LA P. El gobierno divino del mundo, en cuanto considera o posee ánimo paternal hacia cada hombre"
  },
  {
    letter: "p",
    answer: "Pseudo-conocimiento",
    status: NOT_ANSWERED,
    question: "CON LA P. Falso conocimiento"
  },
  {
    letter: "p",
    answer: "Psicoanálisis",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Teoría psicológica sobre el origen subconsciente de los fenómenos psíquicos. Método terapéutico en psiquiatría"
  },
  {
    letter: "p",
    answer: "Psicología",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Nombre atribuido a Melanchton para designar la ciencia del alma y los fenómenos psíquicos"
  },
  {
    letter: "p",
    answer: "Ptolomeo",
    status: NOT_ANSWERED,
    question: "CON LA P. Filósofo autor del Almagesto"
  },
  {
    letter: "p",
    answer: "Puro",
    status: NOT_ANSWERED,
    question:
      "CON LA P. Lo que no está mezclado con otras cosas o corrompido. En lenguaje kantiano, a priori o independiente de la experiencia"
  },
  {
    letter: "q",
    answer: "Quarks",
    status: NOT_ANSWERED,
    question:
      "CON LA Q. En física de partículas, junto con los leptones, son los constituyentes fundamentales de la materia. Varias especies combinadas de manera específica forman partículas tales como protones y neutrones"
  },
  {
    letter: "q",
    answer: "Quarks",
    status: NOT_ANSWERED,
    question:
      "CON LA Q. Son los constituyentes fundamentales de la materia. Varios de estos se combinan de manera específica para formar partículas tales como átomos"
  },
  {
    letter: "q",
    answer: "Quintaesencia",
    status: NOT_ANSWERED,
    question:
      "CON LA Q. Un supuesto quinto elemento, distinto de los cuatro de la antigua física cualitativa, en el que se encontraría el sustrato o la clave de los demás"
  },
  {
    letter: "q",
    answer: "Adquirida",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Q) dícese de la conducta o de los comportamientos que se adquieren por la practica o repetición de determinados actos "
  },
  {
    letter: "q",
    answer: "Arquímedes",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Q) físico, ingeniero, inventor, astrónomo y matemático griego. Conocido especialmente por sus fundamentos en hidrostática, estática y el principio de la palanca, dijo “denme un punto fijo y yo moveré el mundo”"
  },
  {
    letter: "q",
    answer: "Autarquía",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Q) Sistema económico que permite a un estado bastarse con sus propios recursos"
  },
  {
    letter: "q",
    answer: "Equidad",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Q) Cualidad que mueve a dar a cada uno lo que merece"
  },
  {
    letter: "q",
    answer: "Monarquía",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Q) Forma de gobierno en que la soberanía es ejercida por una persona, que la recibe con carácter vitalicio y hereditario  "
  },
  {
    letter: "q",
    answer: "Poliarquía",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Q) Forma de gobierno en la que hay múltiples centros de poder e inexistencia de un ordenamiento jurídico público unitario  "
  },
  {
    letter: "q",
    answer: "Psique",
    status: NOT_ANSWERED,
    question: "(CONTIENE LA Q)  Alma o conciencia (etimológicamente, soplo). "
  },
  {
    letter: "q",
    answer: "Tomás de Aquino",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Q) (dos palabras): importante teólogo y filósofo medieval del s. XII  que cristianizó a Aristóteles  "
  },
  {
    letter: "r",
    answer: "Racional   ",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Se dice del ser vivo que tiene capacidad para pensar o razonar"
  },
  {
    letter: "r",
    answer: "Razón",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Facultad en virtud de la cual el ser humano es capaz de identificar conceptos, cuestionarlos, hallar coherencia o contradicción entre ellos y así inducir o deducir otros distintos de los que ya conoce"
  },
  {
    letter: "r",
    answer: "Razonar",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Pensar, ordenando ideas y conceptos para llegar a una conclusión"
  },
  {
    letter: "r",
    answer: "Reacción",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Acción en sentido opuesto e igual a otra determinada. En psicología, respuesta a un estímulo"
  },
  {
    letter: "r",
    answer: "Realidad",
    status: NOT_ANSWERED,
    question:
      "CON LA R. (De modo general) Conjunto de lo existente, contrario a lo que consideramos ficticio, ilusorio, aparente o meramente posible"
  },
  {
    letter: "r",
    answer: "Realismo",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Doctrina epistemológica (relativa al conocimiento científico) que afirma que el hombre puede conocer el mundo exterior e independiente del pensamiento"
  },
  {
    letter: "r",
    answer: "Recuerdo",
    status: NOT_ANSWERED,
    question: "CON LA R. El acto de la memoria "
  },
  {
    letter: "r",
    answer: "Reflexión",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Acto por el que el hombre presta atención a sus propias operaciones psíquicas, o a la coherencia de sus razonamientos"
  },
  {
    letter: "r",
    answer: "Refutar",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Contradecir con argumentos y razones lo que otros dicen"
  },
  {
    letter: "r",
    answer: "Relatividad",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Teoría física y cosmológica formulada por Einstein, que mostró la insuficiencia de la llamada mecánica clásica sistematizada por Newton"
  },
  {
    letter: "r",
    answer: "Relativismo",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Concepto que sostiene que los puntos de vista no tienen verdad ni validez universal, sino sólo una validez subjetiva según los diferentes marcos de referencia"
  },
  {
    letter: "r",
    answer: "Religión",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Actividad humana que suele abarcar creencias y prácticas sobre cuestiones de tipo existencial, moral y sobrenatural"
  },
  {
    letter: "r",
    answer: "Remordimiento",
    status: NOT_ANSWERED,
    question: "CON LA R. Dolor por la transgresión propia de la ley moral"
  },
  {
    letter: "r",
    answer: "Renacimiento",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Periodo de florecimiento cultural a finales del s. XIV, en el que vuelve a nacer el arte y la cultura de la antigüedad. Sus principales representantes se dan en el arte, aunque también se produjo una renovación en las ciencias. Italia fue el lugar de nacimiento y desarrollo de este movimiento"
  },
  {
    letter: "r",
    answer: "Representativo",
    status: NOT_ANSWERED,
    question:
      "CON LA R. En política, sistema de delegación de poderes o de facultades consultivas por parte de los miembros de una comunidad política"
  },
  {
    letter: "r",
    answer: "Responsabilidad",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Propiedad de la vida moral por la cual el sujeto se siente causa u origen de su actuación moral (y de sus consecuencias) por cuanto es fruto de su libertad o libre albedrío"
  },
  {
    letter: "r",
    answer: "Retrogradación",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Movimiento aparente de retroceso en forma de bucle que realizan los planetas y que modifica sus posiciones respecto a las estrellas fijas"
  },
  {
    letter: "r",
    answer: "Retórica",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Arte de convencer o persuadir mediante el uso del razonamiento y el lenguaje"
  },
  {
    letter: "r",
    answer: "Revelación",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Manifestación de las verdades sobrenaturales hechas al hombre, sea por vía directa o histórica, sea por vía natural o innata"
  },
  {
    letter: "r",
    answer: "Revolución",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Destrucción violenta de un orden cualquiera -principalmente de un régimen político- en virtud de unos nuevos supuestos teóricos o prácticos"
  },
  {
    letter: "r",
    answer: "Rito",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Práctica mítico-mágica para propiciar o conjurar las fuerzas sobrenaturales. Acto religioso establecido"
  },
  {
    letter: "r",
    answer: "Rol",
    status: NOT_ANSWERED,
    question: "CON LA R. Pauta de conducta, papel que desempeña una persona"
  },
  {
    letter: "r",
    answer: "Romanticismo",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Movimiento filosófico del final del s. XVIII que influye en la literatura y el arte del XIX, especialmente en Alemania. Actitud sentimental e historicista, hostil a las reglas y cánones, por lo que se suele oponer al clasicismo"
  },
  {
    letter: "r",
    answer: "Rousseau, Jean Jacques",
    status: NOT_ANSWERED,
    question:
      "CON LA R. Escritor, pedagogo  y filósofo suizo del s. XVIII máximo representante de la filosofía del contrato social como forma de explicación del Estado"
  },
  {
    letter: "s",
    answer: "Sabiduría",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Posesión del supremo conocimiento, es decir, de lo que podemos considerar un conocimiento perfecto. Para Aristóteles, conocimiento de los primeros principios y las causas de la realidad"
  },
  {
    letter: "s",
    answer: "Sacrificio",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Destrucción o inmolación de un bien -o su renuncia-, realización de un esfuerzo o aceptación de un dolor, en honor a Dios"
  },
  {
    letter: "s",
    answer: "Sagrado",
    status: NOT_ANSWERED,
    question:
      "CON LA S. El objeto religioso, o cuanto posee una realidad o una significación directamente sobrenatural"
  },
  {
    letter: "s",
    answer: "Salvación",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Liberación de un mal que amenaza a un hombre -en su cuerpo o en su alma-, o a un pueblo. Logro de la bienaventuranza eterna"
  },
  {
    letter: "s",
    answer: "Sartre",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Filósofo francés del s. XX, exponente del existencialismo y marxismo humanista"
  },
  {
    letter: "s",
    answer: "Semitas",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Civilización de origen arábiga que se ha extendido gracias al cristianismo y al islam, con una visión lineal de la historia y creencia en un solo Dios"
  },
  {
    letter: "s",
    answer: "Sensación",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Acto de las facultades sensitivas de conocimiento externo o sentido externo. En otro sentido, impresión vaga de algo que acontece o se avecina"
  },
  {
    letter: "s",
    answer: "Sensualidad",
    status: NOT_ANSWERED,
    question: "CON LA S. Propensión a los placeres sensibles"
  },
  {
    letter: "s",
    answer: "Sentencia",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Juicio, opinión o máxima. En sentido jurídico, resolución de un tribunal de justicia"
  },
  {
    letter: "s",
    answer: "Sentimiento",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Sinónimo de emocion. Fuente u origen de la vida emocional"
  },
  {
    letter: "s",
    answer: "Sentidos",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Cada una de las facultades que tienen el hombre y los animales para percibir las impresiones del mundo exterior"
  },
  {
    letter: "s",
    answer: "Ser",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Aquello que todos los seres, existentes o posibles, tienen en común. Es el objeto de la Ontología"
  },
  {
    letter: "s",
    answer: "Simpatía",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Capacidad de acción recíproca o comunidad de sentimientos compartidos"
  },
  {
    letter: "s",
    answer: "Sincretismo",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Sistema que trata de conciliar teorías o doctrinas diferentes u opuestas"
  },
  {
    letter: "s",
    answer: "Sinonimia",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Identidad de sentido de dos términos o expresiones lingüísticas"
  },
  {
    letter: "s",
    answer: "Sinopsis",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Mirada de conjunto. Expresión resumida y ordenada de un conjunto lógico o existencial"
  },
  {
    letter: "s",
    answer: "Sintetizar",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Reunir varios elementos de modo que formen un todo individualizado"
  },
  {
    letter: "s",
    answer: "Sistema",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Conjunto de elementos o ideas que se relacionan y sostienen entre sí"
  },
  {
    letter: "s",
    answer: "Soberanía popular",
    status: NOT_ANSWERED,
    question:
      "CON LA S. (dos palabras): expresión utilizada para indicar que el poder emana y reside en el pueblo, entendido como le totalidad de los ciudadanos"
  },
  {
    letter: "s",
    answer: "Sobrenatural",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Lo que, relacionándose con la naturaleza o sucediendo en ella, no se debe a su causalidad, sino a fuerzas superiores de origen divino"
  },
  {
    letter: "s",
    answer: "Socialismo",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Teoría política que propugna la organización de la sociedad sobre bases colectivistas, es decir, anulando la propiedad privada de bienes de producción y transfiriéndola al Estado. Su forma más radical es el comunismo"
  },
  {
    letter: "s",
    answer: "Socialización",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Proceso mediante el cual los individuos adquieren e interiorizan las normas y modelos de conducta propios de una sociedad"
  },
  {
    letter: "s",
    answer: "Sociedad",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Agrupación de individuos que comparten una cultura que ha sido desarrollada con el objetivo principal de satisfacer unas necesidades básicas"
  },
  {
    letter: "s",
    answer: "Sociología",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Nombre dado por A. Comte a una ciencia de la realidad social con métodos semejantes a los de las ciencias particulares o físico-matemáticas"
  },
  {
    letter: "s",
    answer: "Sócrates",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Filósofo clásico ateniense. Fue maestro de Platón, quien tuvo a Aristóteles como discípulo, siendo estos tres los representantes fundamentales de la filosofía de la Antigua Grecia"
  },
  {
    letter: "s",
    answer: "Sofista",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Filósofos griegos contemporáneos de Sócrates que vendían sus enseñanzas consistentes en adquirir determinados conocimientos con fines prácticos, sin pretensión por la verdad"
  },
  {
    letter: "s",
    answer: "Subconsciente",
    status: NOT_ANSWERED,
    question: "CON LA S. Sinónimo de inconsciente"
  },
  {
    letter: "s",
    answer: "Subjetivismo",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Doctrina que defiende que todo conocimiento depende del sujeto que conoce"
  },
  {
    letter: "s",
    answer: "Subliminal",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Lo que está por debajo del límite de la consciencia. Dícese de lo inconsciente, de lo subconsciente"
  },
  {
    letter: "s",
    answer: "Sustancia",
    status: NOT_ANSWERED,
    question:
      "CON LA S. Su significado más general es el de 'fundamento' de la realidad (significado que adquiere ya de forma clara con Aristóteles) 'lo que está debajo', lo que 'permanece' bajo los fenómenos, lo 'subsistente'"
  },
  {
    letter: "t",
    answer: "Talante",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Actitud o modo subjetivo de enfrentarse a algo (o a la vida en general)."
  },
  {
    letter: "t",
    answer: "Técnica",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Término que hace referencia tanto a la habilidad del ser humano para producir instrumentos como para el ejercicio de ciertas actividades que siguen unas reglas y un plan previo./Acción racional específicamente humana"
  },
  {
    letter: "t",
    answer: "Teísmo",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Creencia en un Dios creador y único y en la posibilidad de que el ser humano pueda conocer con seguridad su existencia y atributos"
  },
  {
    letter: "t",
    answer: "Teleología",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Concepción de la naturaleza que establece Aristóteles en la cual afirma que todos los movimientos se realizan de acuerdo a un fin"
  },
  {
    letter: "t",
    answer: "Temperamento",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Conjunto de disposiciones de un hombre en razón de sus condiciones somáticas, o (según los antiguos) de los humores que predominan en su organismo"
  },
  {
    letter: "t",
    answer: "Tendencia",
    status: NOT_ANSWERED,
    question: "CON LA T. Todo impulso vital hacia la acción"
  },
  {
    letter: "t",
    answer: "Teocentrismo",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Explicación de la realidad que tiene como principal punto de referencia a Dios"
  },
  {
    letter: "t",
    answer: "Teocracia",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Sociedad en la que la autoridad política se piensa que proviene de Dios. Los individuos que ostenten el poder estarán legitimados si son designados por dios o por sus ministros"
  },
  {
    letter: "t",
    answer: "Teología",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Es el estudio y conjunto de conocimientos acerca de la divinidad"
  },
  {
    letter: "t",
    answer: "Teoría",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Conjunto de leyes confirmadas y relacionadas entre sí que explican un ámbito de la realidad"
  },
  {
    letter: "t",
    answer: "Tesis",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Proposición inicial de una discusión o demostración. La primera fase del ritmo dialéctico en el sistema hegellano"
  },
  {
    letter: "t",
    answer: "Tiempo",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Según los escolásticos, 'número o medida del movimiento, según un antes y un después'. Para Kant, una forma a priori de la Razón pura"
  },
  {
    letter: "t",
    answer: "Tiranía",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Forma de gobierno en la que ejerce el poder uno solo, en su propio beneficio. Según Aristóteles es corrupción de la monarquía, y, como corrupción de lo mejor, es la peor forma de gobierno"
  },
  {
    letter: "t",
    answer: "Todo",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Aquello en lo cual no falta ninguna de sus partes constitutivas"
  },
  {
    letter: "t",
    answer: "Tolerancia",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Nombre dado a la libertad de expresión y culto religioso. Virtud (en la escuela liberal) para la convivencia ciudadana"
  },
  {
    letter: "t",
    answer: "Totalitarismo",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Teoría política en la que el Estado pretende abarcar y dirigir la vida toda de los ciudadanos"
  },
  {
    letter: "t",
    answer: "Tomás de Aquino (Sto.)",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Teólogo y filósofo católico del siglo XIII que cristianizó a Aristóteles autor de cinco vías que trataban de demostraban la existencia de Dios"
  },
  {
    letter: "t",
    answer: "Tradición",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Entrega del contenido espiritual de una generación a otra. Herencia cultural o transmisión de creencias y actitudes"
  },
  {
    letter: "t",
    answer: "Trascendente",
    status: NOT_ANSWERED,
    question:
      "CON LA T. Aquello cuyo fundamento sobrepasa los límites de la experiencia o de la naturaleza"
  },
  {
    letter: "t",
    answer: "Traslación",
    status: NOT_ANSWERED,
    question: "CON LA T. Movimiento que realiza la tierra cada año"
  },
  {
    letter: "u",
    answer: "Ubicuidad",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Poder (sobrenatural) de encontrarse en más de un sitio a la vez"
  },
  {
    letter: "u",
    answer: "Unidad",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Lo que es en sí uno e indivisible. Cualidad de todo cuanto posee una identidad consigo mismo"
  },
  {
    letter: "u",
    answer: "Unificar",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Hacer de muchas cosas una o un todo, uniéndolas, mezclándolas o reduciéndolas a una misma especie"
  },
  {
    letter: "u",
    answer: "Universales",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Dícese de los términos que pueden predicarse de más de un sujeto"
  },
  {
    letter: "u",
    answer: "Universidad",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Institución formada por un grupo de centros de enseñanza, llamados facultades, donde se imparte la enseñanza superior"
  },
  {
    letter: "u",
    answer: "Universo",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Totalidad del espacio y del tiempo, de todas las formas de la materia, la energía y el impulso, las leyes y constantes físicas que las gobiernan"
  },
  {
    letter: "u",
    answer: "Universo",
    status: NOT_ANSWERED,
    question: "CON LA U. Conjunto de las cosas creadas, mundo"
  },
  {
    letter: "u",
    answer: "Unívoco",
    status: NOT_ANSWERED,
    question: "CON LA U. Término que posee un solo sentido y significado"
  },
  {
    letter: "u",
    answer: "Uno",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Elemento de un grupo o clase cualquiera. Nombre dado por Plotino a Dios en cuanto principio por emanación y superación de los contrarios"
  },
  {
    letter: "u",
    answer: "Útil",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Lo que es medio para otra cosa o sirve para su consecución o realización"
  },
  {
    letter: "u",
    answer: "Utilitarismo",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Doctrina filosófica que sitúa la utilidad como principio de lo moral "
  },
  {
    letter: "u",
    answer: "Utopía",
    status: NOT_ANSWERED,
    question:
      "CON LA U. Proyecto, idea o sistema social irrealizable en el momento en el que se plantea"
  },
  {
    letter: "v",
    answer: "Vacío cósmico",
    status: NOT_ANSWERED,
    question:
      "CON LA V. (dos palabras): Lugar por donde viajan las ondas electromagnéticas"
  },
  {
    letter: "v",
    answer: "Valor",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Cualidad que poseen algunas realidades, por lo cual son estimables"
  },
  {
    letter: "v",
    answer: "Veracidad",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Condición de un juicio o razonamiento que expresa lo que realmente piensa el que lo emite. Equivale a sinceridad"
  },
  {
    letter: "v",
    answer: "Verdad",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Condición del juicio por la cual expresa lo que realmente es"
  },
  {
    letter: "v",
    answer: "Verdad formal",
    status: NOT_ANSWERED,
    question:
      "CON LA V. (dos palabras): criterio de verdad utilizado en las proposiciones analíticas, proposiciones formales, propias de las ciencias formales. Su verdad se fundamenta en la coherencia lógica o no contradicción de la proposición con el resto de las proposiciones del sistema"
  },
  {
    letter: "v",
    answer: "Verificabilidad",
    status: NOT_ANSWERED,
    question: "CON LA V. Comprobabilidad. Lo que puede comprobarse"
  },
  {
    letter: "v",
    answer: "Veritas",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Nombre de la diosa de la verdad en la mitología romana, hija de Saturno"
  },
  {
    letter: "v",
    answer: "Vida",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Descriptivamente, lo que posee un principio interno de automovimiento y una organicidad de sus partes o elementos"
  },
  {
    letter: "v",
    answer: "Vidrios ópticos",
    status: NOT_ANSWERED,
    question: "CON LA V. (dos palabras) Objetos que pulía el filósofo Spinoza"
  },
  {
    letter: "v",
    answer: "Violentos",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Según Aristóteles, tipo de movimiento local que transportan los elementos fuera de su lugar natural"
  },
  {
    letter: "v",
    answer: "Virtud",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Cualidad que según Aristóteles, consiste en un término medio entre dos extremos malos, el uno por exceso y el otro por defecto"
  },
  {
    letter: "v",
    answer: "Vitalismo",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Teoría que coloca la vida (o los valores vitales) por encima de cualquier otra realidad o valor, suponiendo lo demás subordinado a los intereses de la vida"
  },
  {
    letter: "v",
    answer: "Vivencia",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Experiencia vivida o que puede vivirse Término genérico para cualquier fenómeno psíquico"
  },
  {
    letter: "v",
    answer: "Voluntad",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Facultad de hacer o no hacer una cosa. Capacidad para determinarse uno mismo"
  },
  {
    letter: "v",
    answer: "Voluntarismo",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Teoría metafísica que hace depender las leyes naturales no de su carácter racional, sino de la pura voluntad divina"
  },
  {
    letter: "v",
    answer: "Voltaire",
    status: NOT_ANSWERED,
    question:
      "CON LA V. Gran pensador francés, uno de los principales representantes de la Ilustración, enfatizó el poder de la razón humana, de la ciencia y el respeto hacia la humanidad"
  },
  {
    letter: "w",
    answer: "Wilson",
    status: NOT_ANSWERED,
    question:
      "CON LA W. Uno de los dos físicos norteamericanos descubridor del eco del Big Bang"
  },
  {
    letter: "w",
    answer: "Darwin",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA W) biólogo e investigador de la naturaleza. Fue el científico de los tiempos modernos que más que ningún otro desafió la visión de la Biblia sobre el lugar del hombre en la Creación de Dios"
  },
  {
    letter: "w",
    answer: "Darwin",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA W) Naturalista inglés que postuló que todas las especies de seres vivos han evolucionado con el tiempo a partir de un antepasado común"
  },
  {
    letter: "w",
    answer: "Hawking, Stephen",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA W) matemático y físico británico del siglo XX. En astrofísica se le debe una importante contribución al estudio de los agujeros negros"
  },
  {
    letter: "w",
    answer: "Newton",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA W) Unidad de fuerza del Sistema Internacional que equivale a la fuerza necesaria para que un cuerpo de 1 kilogramo adquiera una aceleración de un metro por segundo al cuadrado"
  },
  {
    letter: "w",
    answer: "Newton, Isaac",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA W) físico, filósofo, teólogo, inventor, alquimista y matemático inglés, que describió la ley de la gravitación universal y estableció las bases de la mecánica clásica mediante las leyes que llevan su nombre"
  },
  {
    letter: "w",
    answer: "Rawls, John",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA W) filósofo moralista norteamericano (1921). Es uno de los más destacados teóricos del liberalismo, reelaboró la teoría clásica del contrato social, postulando una situación originaria desde la cual los miembros de la sociedad decidirían los principios de justicia"
  },
  {
    letter: "x",
    answer: "Anaxágoras",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) filosofo griego presocrático que hizo de Atenas el centro de la filosofía y fue maestro de Sócrates.  Para explicar la realidad afirmó la existencia de un número infinito de partículas materiales, homeomerías, y de  un principio ordenador de esa materia, el nous"
  },
  {
    letter: "x",
    answer: "Anaximandro",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) filósofo de la escuela de jonia, discípulo de Tales de Mileto. Afirmó que el arjé de todas las cosas es to ápeiron, lo indefinido, lo inderterminado"
  },
  {
    letter: "x",
    answer: "Anaxímenes",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) filósofo de la escuela de jonia, discípulo de Anaximandro. Afirmó que el arjé de todas las cosas es el aire"
  },
  {
    letter: "x",
    answer: "Ataraxia",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) estado de tranquilidad espiritual, que, según el epicureísmo y el estoicismo, sería el principio de la felicidad"
  },
  {
    letter: "x",
    answer: "Axiología",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) Saber reflexivo acerca de los valores, su jerarquía y su naturaleza"
  },
  {
    letter: "x",
    answer: "Axioma",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) Proposición clara y evidente que no necesita demostración"
  },
  {
    letter: "x",
    answer: "Eudoxo",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) Filósofo y astronómico pupilo de Platón que explico el modelo de las esferas homocéntricas"
  },
  {
    letter: "x",
    answer: "Existencia",
    status: NOT_ANSWERED,
    question: "(CONTIENE LA X) hecho de ser, de existir"
  },
  {
    letter: "x",
    answer: "Existencialismo",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) Doctrina filosófica que trata de fundar el conocimiento de toda realidad sobre la experiencia inmediata de la existencia propia"
  },
  {
    letter: "x",
    answer: "Experiencia",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) conocimiento de la vida adquirido por las circunstancias o situaciones vividas"
  },
  {
    letter: "x",
    answer: "Éxtasis",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) Fase culminante  de la ascensión mística hacia Dios. Coronación de la vida contemplativa religiosa"
  },
  {
    letter: "x",
    answer: "Extensión",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) Característica fundamental de los cuerpos, por la que son susceptibles de medición espacial. Descartes la consideró la propiedad radical de la sustancia corpórea, al modo como el pensamiento lo era del alma o sustancia pensante"
  },
  {
    letter: "x",
    answer: "Extraño",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) partícula elemental que pertenece a la segunda generación de quarks"
  },
  {
    letter: "x",
    answer: "Doxa",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) término griego que equivale a opinión y que designa un tipo de conocimiento que depende de los sentidos y que explica de modo limitado una parte de la realidad"
  },
  {
    letter: "x",
    answer: "Heterodoxia",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) desacuerdo con los dogmas de una fe o los principios de una norma o doctrina que se considera cierta"
  },
  {
    letter: "x",
    answer: "Inextenso",
    status: NOT_ANSWERED,
    question: "(CONTIENE LA X) Que carece de materia"
  },
  {
    letter: "x",
    answer: "Marx",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) Filósofo, intelectual y militante comunista alemán, padre del socialismo científico y del comunismo moderno autor del “Manifiesto comunista” y “El Capital”."
  },
  {
    letter: "x",
    answer: "Marxismo",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) Doctrina consistente en interpretar el idealismo dialéctico de Hegel como materialismo dialéctico, y que aspira a conseguir una sociedad sin clases"
  },
  {
    letter: "x",
    answer: "Ortodoxia",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA X) conjunto de doctrinas y opiniones conformes a la Revelación y a las decisiones oficiales de la Iglesia"
  },
  {
    letter: "y",
    answer: "Yo",
    status: NOT_ANSWERED,
    question:
      "CON LA Y. Pronombre que designa la realidad personal de quien habla o escribe.  El sujeto humano en cuanto persona"
  },
  {
    letter: "y",
    answer: "Disyunción",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Y) En la lógica formal, se trata de una proposición en la que se atribuye al sujeto varios predicados sin precisar cuál le corresponde, pero afirmando que uno de ellos ha de convenirle"
  },
  {
    letter: "y",
    answer: "Ley",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Y) en ciencia, dícese de las fórmulas que recogen y expresan las relaciones universales y necesarias de los fenómenos"
  },
  {
    letter: "y",
    answer: "Mayéutica",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Y) Método socrático de enseñanza basado en el diálogo entre maestro y discípulo con la intención de llegar al conocimiento de la esencia o rasgos universales de las cosas"
  },
  {
    letter: "y",
    answer: "Physis",
    status: NOT_ANSWERED,
    question: "(CONTIENE LA Y) Término griego que significa naturaleza"
  },
  {
    letter: "y",
    answer: "Proyección",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Y) en el psicoanálisis, mecanismo de defensa por el que el sujeto atribuye a otras personas los propios motivos, deseos o emociones, como forma de ocultación involuntaria de las motivaciones rechazadas por el superyó"
  },
  {
    letter: "y",
    answer: "Superyo",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Y) en el psicoanálisis, instancia de la mente del individuo que tiene entre sus funciones la de conciencia moral, y se forma por interiorización de las exigencias de los padres"
  },
  {
    letter: "z",
    answer: "Zenón",
    status: NOT_ANSWERED,
    question:
      "CON LA Z. Filósofo griego de la escuela eleática, discípulo de Parménides,  se le recuerda por el amplio arsenal conceptual con que defendió las tesis de su maestro"
  },
  {
    letter: "z",
    answer: "Zodiaco",
    status: NOT_ANSWERED,
    question:
      "CON LA Z. Zona o faja celeste por el centro de la cual pasa la Eclíptica, indica el espacio en que se contienen los planetas que se apartan de la Eclíptica comprende los 12 signos, casas o constelaciones que recorre el Sol en su curso anual aparente"
  },
  {
    letter: "z",
    answer: "Analizar",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Z) Descomponer un  todo en los elementos que lo constituyen"
  },
  {
    letter: "z",
    answer: "Azar",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Z) Acaecimiento o suceso imprevisible por ser fruto de una coincidencia fortuita de series causales diversas"
  },
  {
    letter: "z",
    answer: "Azarosos",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Z) dícese de los fenómenos que pueden suceder de varios modos. Son propios de la realidad subatómica. Están regidos por leyes probabilísticas"
  },
  {
    letter: "z",
    answer: "Leibniz, Wilhelm",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Z) fue uno de los grandes pensadores de los siglos XVII. Se le reconoce como 'El último genio universal', junto con René Descartes y Spinoza, es uno de los tres grandes racionalistas del siglo XVII"
  },
  {
    letter: "z",
    answer: "Lorenz",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Z) científico que descubrió los sistemas caóticos, los presididos por el efecto mariposa"
  },
  {
    letter: "z",
    answer: "Nietzsche",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Z) Filósofo y escritor alemán, del siglo XIX vitalista e irracionalista. Decide que Dios no existe.  El único valor supremo será la voluntad de vivir del individuo"
  },
  {
    letter: "z",
    answer: "Razón",
    status: NOT_ANSWERED,
    question: "(CONTIENE LA Z) Facultad del hombre de pensar o discurrir"
  },
  {
    letter: "z",
    answer: "Spinoza",
    status: NOT_ANSWERED,
    question:
      "(CONTIENE LA Z) filósofo panteísta de la comunidad judía holandesa, expulsado por heterodoxo y que trabaja el vidrio óptico"
  }
];
