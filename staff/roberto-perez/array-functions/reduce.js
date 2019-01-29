/**
 *
 * @param {Array} arr - The array to operate on.
 * @param {Function} callback - The expresion to evaluate
 * @param {*} valorInicial - The acumulator of the reduction value.
 * 
 * @return {*}
 */
function reduce(arr, callback, valorInicial) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  if (!(callback instanceof Function)) {
    throw new TypeError(arr + " is not a function");
  }

  if (arr.length <= 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  var valorAnterior = 0;
  var indice = 1;
  var valorActual = arr[indice];
  var vector = arr;

  if (valorInicial) {
    valorAnterior = valorInicial;
    indice = 0;
    valorActual = arr[indice];
  }

  for (var i = indice; i < arr.length; i++) {
    valorActual = arr[i];
    valorAnterior = callback(valorAnterior, valorActual, i, vector);
  }

  return valorAnterior;
}
