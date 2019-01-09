# Calculadora

## Introduction

Calculadora en javascript que realiza las funciones tipas de suma, resta, multiplicación y división.

## Functional description

El programa realiza las operaciones de suma, resta, multiplicación,
a parte se ha añadido las siguientes caracteristicas:

- El resultado se muestra únicamente con 3 decimales
- Si el usuario introduce un solo numero, muestra su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.

## Technical Description

- Se han creado las siguientes condiciones para añadirle las caracteristicas de más mencionadas anteriormente.

```javascript
if (num1 === '' && num2 === ''){
	console.log('Debes insertar almenos 1 numero')
}

if (isNaN(num1) === true || isNaN(num2) === true ){
	console.log('Uno de los caracteres no esta adminitdo')
}

if (isNaN(num1) === false && num2 ===''){
	raiz = Math.sqrt(num1)
	console.log('La raiz cuadara es ' + raiz.toFixed(3))
	    }

if (num1 === '' && isNaN(num2) === false){
	raiz = Math.sqrt(num2)
	console.log('La raiz cuadara es ' + raiz.toFixed(3))
		}else{
```

- Se han separado las operaciones en diferentes funciones

```javascript
var sum = function() {
  resultSum = num1 + num2;
  resultSum.toFixed(3);
  resultSum2 = "La suma es " + resultSum;
  return result.push(resultSum2);
};
sum();

var rest = function() {
  return result.push(num1 - num2);
};
rest();

var multi = function() {
  return result.push(num1 * num2);
};
multi();

var div = function() {
  return result.push(num1 / num2);
};

div();
```
