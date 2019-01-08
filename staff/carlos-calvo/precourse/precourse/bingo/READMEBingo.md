NSTRUCCIONES DEL BINGO
===============================

# Estructura

### Clases y Métodos principales

1. Existe una class llamada Carton que gestiona todo lo relacionado con el carton. Métodos principales:
-showCarton() -->  Muestra cartón
-showCartonFinal() --> Muestra cartón final del juego
-Constructor() -- 5 números y un nombre
-CheckBola(numeroSalido) --> Marca con una X si ha salido la bola del bingo
-compruebaCarton() --> Comprueba si hay premio en el cartón

2. El juego empieza solicitando el nombre de los jugadores principales.
A partir de ahí comienza el juego asignando en el constructor de cartón unos números aleatorios.
3. Existe un array de números del bingo. Saca un número aleatorio correspondiente al índice del array. A continuación elimina esa posición. Lo aleatorio es realmente el índice de este array que se va reecortando a medida que avanza el juego.
4. CAda turno se comprueba si alguien ha ganado.

![Bingo](captura.png "bingo")

