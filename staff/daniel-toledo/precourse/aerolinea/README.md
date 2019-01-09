# AEROLINEA

## Introduction

La aerolinea es un proyecto del precurso del bootcam SkyLab. En este proyecto se simula una aerolinea donde se muestran los vuelos con un id, origen, destino, precio y si tienen escala.

El usuario, dependiendo de si es USER or ADMIN podrá comprar o cambiar los vuelos.

## Functional description

El codigo empieza preguntando por el nombre del usuario. Una vez insertado el nombre, se muestran todos los vuelos con 
```javascript
console.log()
```
Una vez mostrados los vuelos, se pide al usuario si es ADMIN, USER , o quiere SALIR.

Si es ADMIN puede BORRAR un vuelo identificando lo con su id o CREAR añadiendo un id, origen, destino, precio y si tiene escala o no.

En el caso de que el usuario seleccione USER, podrá buscar el vuelo por precio. En el console del browser se mostrarán los vuelos mas caros, mas baratos e iguales a ese precio. Una vez el usuario visualice la nueva ordenación de los vuelos, podrá comprar su vuelo indicando su id.

## Technical description

- JavaScript