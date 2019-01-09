# Aerolínea

## Introduction
Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global (var flights).

Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, el programa se comportará de la siguiente manera:

### ADMIN
Si eres **ADMIN**, la función debería permitir:

Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
Poder eliminar vuelos mediante el ID.

### USER
Si eres **USER** la función debería permitir:

Buscar por precio ( más alto, más bajo o igual), el usuario debería mostrar los datos de los vuelos encontrados y, indicando el ID, el programa responderá: "Gracias por su compra, vuelva pronto."

## Functional description
El programa inicia la ejecución cuando se hace la llamada a la función de **skylabAirlinesMain()** esta función a su vez llama a todas las demás funciones. No se hace uso de clases y todo está programado por medio de funciones. 

Tampoco se hace uso de ningún otro archivo, todo el código se recoge bajo el archivo llamado "project2.js"

El programa se inicia mostrando los vuelos disponibles y preguntando al usuario si se trata de un ADMIN o de un USER. Cada Rol tiene una serie de opciones únicas. 

#### Imagen de cómo se muestran los vuelos en la consola
![Imagen de cómo se muestran los vuelos en la consola](doc/skylabAirlinesMain.png)
use cases diagram => https://es.wikipedia.org/wiki/Lenguaje_unificado_de_modelado

# Technical description

La tecnología utilizada en esta práctica es únicamente javascript y se imprimen todos los resultados por consola