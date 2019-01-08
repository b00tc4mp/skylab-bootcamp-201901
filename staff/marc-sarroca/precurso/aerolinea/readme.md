# Aerolinea

## Introduction

Interfaz de usuario para una aerolinea. Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global.

## Functional description

- Se preguntará por el nombre de usuario y dará la bienvenida.

- El usuario visualizará todos los vuelos disponibles

- El usuario verá el coste medio de los vuelos.
  También podrá ver cuantos vuelos efectúan escalas.

- Muestra al usuario los destinos de los ultimos 5 vuelos del dia.

## Technical Description

En este aprtado se muestra por partes el funcionamiento del codigo.

- Array con los vuelos.

![Array con los vuelos](/lab/precurso/images/flights.jpg)

- Codigo para usuario bienvenida:

```javascript
  if (person != null) {
  console.log("Bienvenido " + person)
  console.log('---------------------------------------')
```

- Codigo que muestra los vuelos diponibles, con el coste medio y las escalas.

```javascript
flights.forEach(function(obj) {
  count++;
  costSum += obj.cost;
  if (obj.scale === true) {
    console.log(
      "El vuelo " +
        obj.from +
        " => " +
        obj.to +
        " tiene un coste de: " +
        obj.cost +
        "$" +
        " con una escala"
    );
  } else {
    console.log(
      "El vuelo " +
        obj.from +
        " => " +
        obj.to +
        " tiene un coste de: " +
        obj.cost +
        "$" +
        " sin escalas"
    );
  }
});
console.log("---------------------------------------");
console.log("El coste medio es " + costSum / count + "$");
console.log("---------------------------------------");
console.log("Estos son los vuelos con escalas:");
```

- Codigo que muestra los vuelos diponibles, con el coste medio y las escalas ademas de los 5 ultimos del dia.

```javascript
flights.forEach(function(obj2){
if (obj2.scale === true){
	count2 ++
	console.log('El vuelo ' + obj2.from + ' => ' + obj2.to + ' tiene un coste de: ' + obj2.cost + '$' + ' con una escala')
}

})
console.log('Hay ' + count2 + ' vuelos con escalas')
console.log('---------------------------------------')
console.log('Estos son los ultimos 5 vuelos del dia:')

var flights2 = flights.splice(count3,(flights.length));
flights2.forEach(function(obj3){
	console.log('El vuelo ' + obj3.from + ' => ' + obj3.to + ' tiene un coste de: ' + obj3.cost + '$' + ' con una escala')

})

console.log('---------------------------------------')

}


```
